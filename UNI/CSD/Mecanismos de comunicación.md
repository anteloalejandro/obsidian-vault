
# Mensajes según su estructura

- Sin una estructura definida, sólo contenido
    - Ejemplos: Sockets y REST
- Cabecera + contenido
    - La cabecera es un conjunto de campos
    - Ejemplos: Colas de mensajes
- Alto nivel, transparente al programador
    - Determinada por el middleware
    - Ejemplos: RPC, ROI, SOAP

# Sincronización

En el tiempo que pasa entre que el emisor envía un mensaje y recibe una respuesta, se queda bloqueado. Según cuando llegue la respuesta, estaremos hablando de uno de dos tipos de sincronización:
- Asíncrona: El emisor recibe la confirmación cuando el middleware recibe el mensaje. Esencialmente, avisa de que se ha enviado bien por su lado, pero no de si el receptor lo ha recibido. Es lo que usa UDP, y prácticamente no hay bloqueo.
- Síncrona de entrega: El receptor responde al middleware al recibir el mensaje, y el middleware responde a su vez al emisor.  Usado por TCP y, por extensión, servicios REST.
- Síncrona de respuesta: El receptor responde al middleware sólo tras haber procesado el mensaje, y el middleware responde entonces al emisor. Usado por RPC, ROI y servicios SOAP.

# Persistencia

Cuando el middle tiene una cola de mensajes por entregar, se habla de **comunicación persistente**. En este caso, no es estrictamente necesario que el receptor esté disponible a la hora de enviar el mensaje, ya que el middleware lo almacena en la cola hasta que el receptor esté listo.

Por defecto, sólo las colas de mensajes usan comunicación persistente, pues son los únicos que usan direccionamiento indirecto (es decir, los únicos que pasan a través de un intermediario antes de enviar el mensaje).

# Remote Object Invocation

Los objetos remotos pueden ser usado desde ordenadores en los que no están físicamente almacenados en memoria. Los objetos remotos se instancian en un servidor y se usan desde clientes locales y remotos.

Este modelo facilita la transparencia de **ubicación** y la escalabilidad, además de permitir usar el paradigma orientado a objetos.

## Tipos de invocaciones

Hay dos tipos de invocaciones: **local** y **remota**.

En la invocación local los objetos residen no solo en el mismo nodo, sino también en el mismo proceso. La invocación remota, por tanto, se hace cuando se accede a un objeto en otro proceso, ya sea en el mismo nodo o en otro diferente.

## Elementos

- **Proxy:** Es un objeto que se guarda en el cliente y tiene la misma interfaz que el objeto remoto y contiene una referencia a él. Se crea en *runtime* cuando se **accede al objeto remoto por primera vez**.
- **Esqueleto:** Se utiliza en el proceso servidor. Es lo que recibe las peticiones de los clientes y desde donde se ejecuta el método al que se ha llamado mediante invocación remota, por lo que los métodos que se invocan desde otros procesos se **ejecutan en el proceso original**. Se crea cuando se **crea el objeto remoto**.
- **Object Request Broker:** El ORB es el componente principal del middleware. Se encarga de identificar y localizar los objetos remotos y realizar las invocaciones remotas, además de gestionar el ciclo de vida de estos objetos (a la *garbage collector*).

## Proceso de una invocación

1. El proceso cliente invoca el método del proxy del objeto remoto.
2. El proxy empaqueta los argumentos y llama al ORB, que gestiona la invocación y hace llegar el mensaje al esqueleto en el servidor.
3. El esqueleto desempaqueta los argumentos e invoca el método. El esqueleto se queda bloqueado hasta que se finalice.
4. El método finaliza y se desbloquea el esqueleto.
5. El esqueleto empaqueta los resultados y llama al ORB, que le hace llegar el mensaje al proxy.
6. El proxy desempaqueta los resultados y los devuelve en el proceso cliente.

## Paso de argumentos

En el **paso por valor** empaqueta (o **serializa**) el estado del objeto del nodo invocador, tras lo que se transmite al nodo invocado, en el que se crea una copia del objeto. Los cambios hechos en el objeto original durante o tras este proceso no afectan a la copia y viceversa.

En el **paso por referencia** sólo se copia la referencia del nodo invocador al invocado, por lo que cualquier modificación se verá reflejada en cualquier nodo que acceda al mismo objeto remoto.

## Creación de objetos

Los objetos se pueden crear **desde el cliente** o **desde el servidor**.

En el primer caso, el cliente le manda a crear un objeto y se espera hasta que la factoría lo crea y la pasa una copia de la referencia.

En el segundo, habría un proceso servidor que registra el objeto remoto en el servidor de nombres a la vez que crea el objeto, y si un cliente conoce el nombre del objeto, podrá acceder a él a través del servidor de nombres.