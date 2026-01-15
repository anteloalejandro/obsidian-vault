
# Conexión

Las conexiones entre sockets se hacen cuando uno de los nodos usa `bind` para empezar a escuchar por la URL indicada, y otros usan `connect` para conectarse al que está escuchando. Sólo puede haber un nodo escuchando por tupla URL-puerto, excepto cuando se usa el comodín, que también escucha por todos los puertos.

Al utilizar sockets asincrónicos ninguno de los nodos tiene que volver a abrir la conexión (independientemente de si son el que ha hecho `bind` o `connect`); se vuelven a conectar automáticamente cuando la otra parte vuelve a iniciar la conexión o es sustituida.

# Tipos de Socket

## Req y Rep

Son los dos sockets sincrónicos con los que cuenta ZeroMQ.

Ambos son sockets bidireccionales, pero `Req` sólo envía peticiones y recibe respuestas, y `Rep` recibe respuestas y envía peticiones.

Estos sockets, además de ser sincrónicos, procesan mensajes de forma secuencial uno a uno, guardando los mensajes que les quedan por procesar en una cola.

Es decir, `Req`, tras mandar una petición, no puede mandar otra hasta que reciba y procese su respuesta, y todas las peticiones que intente hacer mientras no la haya recibido se guardarán en una cola ordenada.

Del mismo modo, `Rep` sólo puede recibir una nueva petición tras haber respondido a la que estaba procesando.

## Push y Pull

Estos sockets asincrónicos sólo pueden enviar y recibir mensajes respectivamente, pero pueden gestionar múltiples al mismo tiempo.

## Pub y Sub

Estos sockets se usan para enviar y recibir mensajes en difusión.

El socket sub se subscribe a un tema mediante el método `subscribe(tema)`, y el socket pub envía mensajes normalmente, pero envía como primera sección del mensaje un buffer con el tema, como `send([tema, msg])`.

Internamente, el propio publicador recibe los mensajes producidos por `subscribe` y mantiene registro de qué suscriptores quieren recibir mensajes de qué temas, que utiliza automáticamente cada vez que hace `send`.

Los `send` van a todos los suscriptores que se suscriben a ese tema, y cada suscriptor puede suscribirse a múltiples temas.

En realidad, `tema` es un prefijo. Por tanto, si el suscriptor quisiese recibir todos los mensajes tendría que asegurarse de usar `subscribe("")` para captar cualquier tema posible. Si no se llama a `subscribe` en ningún momento, no recibirán ningún mensaje.

## Dealer y Router

Son los homónimos asincrónicos de Req y Rep, lo que implica que también son bidireccionales. Al ser asincrónicos, pueden gestionar múltiples mensajes a la vez sin necesidad responder/ser respondido.

Se pueden usar Dealers para comunicarse con Rep, y Req para comunicarse con Routers, pero ambos tipos de sockets tienen expectativas diferentes respecto al formato del mensaje.

Los Dealers necesitan especificar un **delimitador**, que es una cadena vacía que separa la cabecera y cuerpo del mensaje. El socket Rep está programado para sólo exponer el cuerpo del mensaje y añadir automáticamente la cabecera en la respuesta.

![[Middleware ZeroMQ - dealer.png]]

Por otro lado, cuando el Req envía una petición al Router, añade automáticamente el delimitador y envía el mensaje. Si el Req no ha especificado un `identity` el Router le asignará uno al conectarse por primera vez.

Al recibir el mensaje, el Router añadirá la `identity` como cabecera y un separador. El Router meterá el mensaje en la cola de envío correspondiente al `identity` (que ha creado durante la conexión). 

Al enviar la respuesta se tiene que añadir la `identity` del receptor como cabecera. Utiliza dicha cabecera para elegir a quién tiene que enviar la respuesta (generalmente será el propio emisor) y quita la cabecera pero mantiene el separador.

Ejemplo:
```js
const router = zmq.socket("router");
router.bindSync("http://127.0.0.1:8000");
router.on('message', (id, _, msg) =>
    // `id` es el `identity` del emisor
    // al emisor le llegará ["", "response"]
    router.send([id, "", "response"])
);
```

Cuando recibe la respuesta el Req, quita el separador y expone el cuerpo del mensaje a la aplicación.


> [!info] Router tiene una cola de envío y una de recepción por cada conexión


# Patrones de comunicaciones

## Push/Pull

Usando sockets push y pull se puede establecer una cadena de nodos que procesan la información, o *pipeline*. 

![[Middleware ZeroMQ - push-pull.png]]

En el ejemplo, el proceso A envía datos a los procesos B y C. ZeroMQ hace que los envíos de un socket a múltiples sockets con cola de recepción se hagan en Round-Robin, por lo que la carga de A se distribuirá entre B y C.

B y C, además del socket Pull para recibir mensajes de A, cuentan con un socket Push con el que envían los mensajes al nodo final, el proceso D. De nuevo, ZeroMQ hace que los envíos de múltiples nodos a uno solo se hagan por orden de llegada.

## Pub/Sub

El patrón Pub/Sub es el que habilita las difusiones en ZeroMQ.

La forma que tiene de repartir la carga es algo diferente. Cuando un Pub manda un mensaje, en vez de repartirse entre los que estén escuchando siguiendo Round-Robin, se envían a todos los nodos interesados simultáneamente.

La difusión, además, no tiene persistencia; al conectarse un nuevo nodo no se le reenvían los mensajes ya enviados al resto. Lo mismo sucede si el suscriptor está temporalmente inalcanzable.

## Bróker Router/Dealer

Se pueden utilizar sockets Router y Dealer para hacer un proxy que haga las veces de puerta de acceso y balanceador de carga a los servidores, proporcionando transparencia de replicación al no saber los clientes cuántos servidores hay ni cuál es su ubicación.

El bróker está compuesto de tres partes, normalmente en una sola máquina:
- Un frontend con un socket Router que recibe y gestiona peticiones del tipo Req por parte de los servidores.
- Un backend compuesto por un socket Dealer que envía y captura respuestas de los servidores en Round-Robin.
- Código que hace de pegamento entre los dos. Podría, por ejemplo, denegar peticiones sospechosas antes de enviarlas siquiera al servidor.

![[Middleware ZeroMQ - router-dealer.png]]

Alternativamente, se puede montar un bróker usando Router en el backend y frontend, pero se tendrían que cambiar los servidores a Req, éstos tendrían que enviar una petición al backend (porque lo único que puede enviar el Router son respuestas) y el bróker tendría que gestionar manualmente el reparto de tareas a los servidores.