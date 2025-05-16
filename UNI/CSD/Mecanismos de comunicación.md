
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
- **Asíncrona:** El emisor recibe la confirmación cuando el middleware recibe el mensaje. Esencialmente, avisa de que se ha enviado bien por su lado, pero no de si el receptor lo ha recibido. Es lo que usa UDP, y prácticamente no hay bloqueo.
- **Síncrona de entrega:** El receptor responde al middleware al recibir el mensaje, y el middleware responde a su vez al emisor.  Usado por TCP y, por extensión, servicios REST.
- **Síncrona de respuesta:** El receptor responde al middleware sólo tras haber procesado el mensaje, y el middleware responde entonces al emisor. Usado por RPC, ROI y servicios SOAP.

# Persistencia

Cuando el middle tiene una cola de mensajes por entregar, se habla de **comunicación persistente**. En este caso, no es estrictamente necesario que el receptor esté disponible a la hora de enviar el mensaje, ya que el middleware lo almacena en la cola hasta que el receptor esté listo.

Por defecto, sólo las colas de mensajes usan comunicación persistente, pues son los únicos que usan direccionamiento indirecto (es decir, los únicos que pasan a través de un intermediario antes de enviar el mensaje).

# Java RMI

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

## Implementación

Java RMI la implementación de middleware ROI de Java.

### Servidor de nombres

Almacena para cada objeto su nombre simbólico y una referencia. Reside en un nodo cualquiera de la aplicación usando la orden `rmiregistry`, y se puede acceder desde el resto de nodos (clientes) y el propio servidor haciendo uso de la interfaz `Registry`.
![[Interfaz Registry Java RMI.png]]

El registro se hace mediante los métodos `bind` y `rebind`, la operación inversa se hace con `unbind`. Se puede obtener un listado de nombres con `list` y obtener el objeto remoto con `lookup`.

### Paso de objetos como argumentos

Al invocar un método remoto al que se le pasa un objeto, si dicho objeto implementa la interfaz Remote se **pasa por referencia**. Dicho objeto puede no estar en el servidor de nombres, pero se pasará por referencia igualmente.

Si no implementa esta interfaz se serializa y se pasa por valor, en cuyo caso **se crea una copia independiente**, a diferencia de lo que sucede con los métodos normales.

### Ejemplo

```java
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.LocalRegistry;
import java.rmi.server.UnicastRemoteObject;

// Interfaz de los objetos remotos "Hello"
interface Hello extends Remote {
    String greet() throws RemoteException;
}

// Clase para los objetos remotos "Hello"
// Extender UnicastRemoteObject hace que registren en el ORB
class HelloImpl extends UnicastRemoteObject implements Hello {
    HelloImpl() throws RemoteException {...}
    public String greet() throws RemoteException { return "Hello, world!"; }
}

abstract class Server {
    public static void serve(String host, int port) {
        Registry reg = LocateRegistry.getRegistry(host, port);
        reg.rebind("helloObj", new HelloImpl());
        System.out.println("Hello server ready");
    }
}

abstract class Client {
    public static void run(String host, int port) {
        Registry reg = LocateRegistry.getRegistry(host, port);
        Hello h = (Hello) reg.lookup("helloObj");
        System.out.println(h.greet());
    }
}
```

## Características

- Se abstrae el uso de primitivas de comunicación.
- Estructura y contenido determinados por Java.
- Direccionamiento directo (al nodo en el que reside el objeto).
- Comunicación síncrona en respuesta (se espera a que el método termine).
- No persistente (el objeto remoto debe estar activo).


# Java JMS

Es una API de java que permite enviar y recibir mensajes. Los mensajes se envían a un destino que hace de intermediario, y este destino lo enviara al receptor. El emisor y el receptor no tienen por qué conocerse entre sí, solo estar de acuerdo en el formato de los mensajes y en el destino. Al implementar una cola de mensajes, es persistente.

Se prefiere el uso frente a RMI cuando la comunicación es inmediata o cuando no queremos que sea necesario conocer las interfaces de los destinatarios. 

## Componentes

- **Proveedor:** Implementa un sistema de mensajería, que proporciona herramientas administrativas.
- **Cliente:** Produce o envía mensajes.
- **Mensajes:** Tienen un formato predefinido, con cabecera, propiedades y cuerpo.
- **Factorías de conexiones:** Se crean con las herramientas del proveedor. Las usan los clientes para crear conexiones con el sistema de mensajería.
- **Destinos:** También se crean con las herramientas del proveedor. Es a donde van a parar los mensajes, y a donde se deben ir a buscar.
    - Cola de mensajes. Para comunicación entre un cliente y otro. Modelo Emisor-Receptor.
    - Temas. Para comunicación entre un cliente y múltiples otros. Modelo Publicador-Suscriptor.

## Implementación

Los `JMSProducer` y `JMSConsumer` comparten un `JMSContext` y envían objetos `Message` a un objeto `Destination`.

### Productor

```java
import javax.naming.*;
import javax.jms.*;
public class Producer {
    public static void main(String[] args) {
        try {
            // crear contexto para conectar con el proveedor
            Context jndiCtx = new InitialContext();
            // Iniciar conexión con la factoría del proveedor
            var connectionFactory = ConnectionFactory jndiCtx.lookup("myFactory");
            // Obtener destino (cola de mensajes) creado por el proveedor
            Queue queue = Queue jndiCtx.lookup("myQueue");
            // Crear contexto y productor
            JMSContext context = connectionFactory.createContext();
            JMSProducer producer = context.createProducer();
            // Crear y enviar mensaje
            TextMessage = context.createTextMessage();
            message.setText("Hello, world!");
            message.setBooleanProperty("Important", true);
            producer.send(queue, message);
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
        System.out.println("Message sent");
        System.exit(0);
    }
}
```

### Consumidor

```java
import javax.naming.*;
import javax.jms.*;
public class Consumer {
    public static void main(String[] args) {
        try {
            // crear contexto para conectar con el proveedor
            Context jndiCtx = new InitialContext();
            // Iniciar conexión con la factoría del proveedor
            var connectionFactory = ConnectionFactory jndiCtx.lookup("myFactory");
            // Obtener destino (cola de mensajes) creado por el proveedor
            Queue queue = Queue jndiCtx.lookup("myQueue");
            // Crear contexto y productor
            JMSContext context = connectionFactory.createContext();
            // Crear consumidor y recibir mensajes
            JMSConsumer consumer = context.createConsumer(queue);
            while (true) {
                Message m = consumer.receive(100000);
                if (m == null) break;
                System.out.println(m);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
        System.out.println("Timeout, buh bye!");
        System.exit(0);
    }
}
```

## Características

- Primitivas básicas de envío y recepción
- Estructura y contenido acordado de antemano
- Direccionamiento indirecto a través del proveedor.
- Sincronización asíncrona.
- Persistente.

# RESTful

Son servicios web con arquitectura cliente-servidor que utiliza HTTP no para pedir páginas web, sino mensajes.

Son servicios sin estado que cierran la conexión una vez enviada la información.

Cada recurso está identificado con una URI con (opcionalmente) parámetros y utilizan codificación en texto (normalmente JSON o XML).

Reutiliza los métodos y códigos de error de HTTP.

## Características

- Uso de primitivas de envío y recepción.
- Contenido codificado con HTTP y JSON.
- Direccionamiento directo al ordenador que ofrece el servicio.
- Síncrono en entrega o respuesta.
- No persistente (no guarda el estado).