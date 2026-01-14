
# Conexión

Las conexiones entre sockets se hacen cuando uno de los nodos usa `bind` para empezar a escuchar por la URL indicada, y otros usan `connect` para conectarse al que está escuchando. Sólo puede haber un nodo escuchando por tupla URL-puerto, excepto cuando se usa el comodín, que también escucha por todos los puertos.

Al utilizar sockets asincrónicos ninguno de los nodos tiene que volver a abrir la conexión (independientemente de si son el que ha hecho `bind` o `connect`); se vuelven a conectar automáticamente cuando la otra parte vuelve a iniciar la conexión o es sustituida.

# Tipos de Socket

## Req y Res

Son los dos sockets sincrónicos con los que cuenta ZeroMQ.

Ambos son sockets bidireccionales, pero `Req` sólo envía peticiones y recibe respuestas, y `Res` recibe respuestas y envía peticiones.

Estos sockets, además de ser sincrónicos, procesan mensajes de forma secuencial uno a uno, guardando los mensajes que les quedan por procesar en una cola.

Es decir, `Req`, tras mandar una petición, no puede mandar otra hasta que reciba y procese su respuesta, y todas las peticiones que intente hacer mientras no la haya recibido se guardarán en una cola ordenada.

Del mismo modo, `Res` sólo puede recibir una nueva petición tras haber respondido a la que estaba procesando.

## Push y Pull

Estos sockets asincrónicos sólo pueden enviar y recibir mensajes respectivamente, pero pueden gestionar múltiples al mismo tiempo.

## Pub y Sub

Estos sockets se usan para enviar y recibir mensajes en difusión.

El socket sub se subscribe a un tema mediante el método `subscribe(tema)`, y el socket pub envía mensajes normalmente, pero envía como primera sección del mensaje un buffer con el tema, como `send([tema, msg])`.

Internamente, el propio publicador recibe los mensajes producidos por `subscribe` y mantiene registro de qué suscriptores quieren recibir mensajes de qué temas, que utiliza automáticamente cada vez que hace `send`.

Los `send` van a todos los suscriptores que se suscriben a ese tema, y cada suscriptor puede suscribirse a múltiples temas.

En realidad, `tema` es un prefijo y tiene como valor por defecto una cadena nula, de modo que si no se especifica ningún tema todos los suscriptores recibirán todos los mensajes enviados por el publicador.

## Dealer y Router

Son los homónimos asincrónicos de Req y Res, lo que implica que también son bidireccionales. Al ser asincrónicos, pueden gestionar múltiples mensajes a la vez sin necesidad responder/ser respondido.

Se pueden usar Dealers para comunicarse con Res, y Req para comunicarse con Routers, pero ambos tipos de sockets tienen expectativas diferentes respecto al formato del mensaje.

Los Dealers cuentan con un **delimitador**, que es una cadena vacía que separa la cabecera y cuerpo del mensaje. El socket Rep está programado para sólo exponer el cuerpo del mensaje y añadir automáticamente la cabecera en la respuesta.

Por otro lado, cuando el Req envía una petición al Router, añade automáticamente el delimitador y envía el mensaje. Si el Req no ha especificado un `identity` el Router le asignará uno al conectarse por primera vez.

Al recibir el mensaje, el Router añadirá la `identity` como cabecera y un separador. El Router meterá el mensaje en la cola de envío correspondiente al `identity` (que ha creado durante la conexión). Al enviar la respuesta, quita la cabecera pero mantiene el separador, y al recibir esta respuesta el Req, quita el separador y expone el cuerpo del mensaje a la aplicación.

