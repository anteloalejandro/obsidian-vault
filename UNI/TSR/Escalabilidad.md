
# Sacrificios por el teorema CAP

Por el teorema CAP, en los sistemas escalables siempre habrá que sacrificar la consistencia, disponibilidad y la tolerancia al particionado.

## Particionado

No se admitirá que la red se particione, y habrá que garantizar la conectividad.

No es realista ni especialmente útil, así que no se recomienda.

## Disponibilidad

Se adoptara el modelo de partición primaria, en el que sólo el grupo mayoritario de nodos funcionales seguirá funcionando. Estos nodos funcionarán con consistencia fuerte.

## Consistencia

La opción que se suele elegir.

Se hace uso de un modelo particionable en el que los grupos siguen funcionando a pesar de haber sido aislados, con lo que se sacrifica la consistencia entre grupos y se optará por una consistencia eventual.

# Replicación multi-máster

Los dos modelos tradicionales de replicación están pensados para asegurar consistencia fuerte, de modo que no son del todo aptos para los sistemas que queremos montar, en los que sacrificamos consistencia.

De esta necesidad nace el modelo de replicación multi-máster, que se basa en el modelo pasivo añadiendo unas cuantas características:
1. Hay múltiples réplicas primarias, llamadas máster.
2. Cada solicitud la atiende un máster, pero puede ser un máster distinto cada vez. El cliente mandará la solicitud a uno de los másters que conozca.
3. La respuesta se envía de inmediato al cliente esperar a la replicación en las réplicas secundarias.
4. Las posibles modificaciones se envían al resto de réplicas secundarias y másters. Al resto de másters normalmente se le mandarán los cambios cuando se esté ocioso.

Sigue teniendo las ventajas que tiene el modelo pasivo (bajo consumo, admite operaciones no deterministas, etc.) y aumenta la escalabilidad a costa de la posibilidad de que si un máster se cae las peticiones en curso se puedan perder, dando lugar a problemas de consistencia más fácilmente.

Además, conserva los problemas de gestión de fallos del modelo pasivo, de modo que no puede detectar fallos bizantinos.

Como cada máster actúa por su cuenta, no podremos asegurar ningún modelo de consistencia fuerte, así que tendremos que depender de la consistencia eventual.

# NoSQL

Las bases de datos eliminan algunas de las funciones y garantías de las bases de datos SQL con tal de simplificar el almacenamiento de información, sobretodo el almacenamiento distribuido y escalable.

Los hay de tres grandes tipos:
- Clave-valor: Solo constan de una clave y un valor, no hay soporte para ningún tipo de estructura o consulta compleja
    - Ejemplo: Redis y DynamoDB
- Basado en documentos: Usan un formato como JSON, XML, YAML o derivdados para estructurar la información, pero los documentos no tienen una estructura fija concreta. Además, suelen admitir objetos como campos.
    - Ejemplo: MongoDB, CouchDB
- Basados en registros extensibles: En este caso si usan tablas, pero admiten un número y tipo variable de columnas que pueden particionarse por columnas o por filas. Esto da lugar a *sharding*.

# Elasticidad

Tradicionalmente se ha intentado que los servicios proporcionados sean escalables, es decir, que tienen que ser capaces de tolerar altos volúmenes de carga.

Esto implica que se hacia una gran inversión en servidores y redes de alta velocidad, a pesar de que no siempre se usa todo ese hardware. Todo esto implica costes altos, tanto en inversión inicial como en el mantenimiento posterior.

La solución son los sistemas elásticos, que además de ser escalables son **adaptables**. La adaptabilidad implica que a cada aplicación se le asigna sólo los recursos que necesita en ese momento, de forma precisa, dinámica y autónoma.

Los sistemas elásticos disminuyen los costes para sus usuarios porque el proveedor, al poder minimizar los recursos que utiliza (número de máquinas, consumo eléctrico, etc.) puede bajar más los precios. Todo esto mientras se mantienen, como mínimo, las prestaciones exigidas en el SLA.

Un servicio elástico requiere de:
- **Sistema de monitorización**
    - De la carga soportada.
    - Del rendimiento.
- **Sistema de actuación**
    - Para automatizar la reconfiguración en base al rendimiento obtenido en función del SLA.
    - Usa técnicas reactivas, por lo que puede causar sobreajustes cuando hay cambios rápidos.
    - Necesita, por tanto, técnicas reactivas para evitar los sobreajustes.

## Módulo `cluster`

Cuando, por razones de escalabilidad, necesitamos múltiples instancias de un componente en NodeJS, tendremos que lanzar nuevos procesos de `node`.

El módulo `cluster` está para facilitar la creación y gestión de una *pool* de procesos Node, llamados trabajadores o *Workers*, que se repartirán el trabajo de forma automática mediante Round-Robin.

Las características básicas de un Cluster son:
- Todos los Workers de un Cluster comparten los mismos puertos, sin que haya conflictos entre ellos.
- Los Workers son supervisados y creados por el proceso inicial o *Master*, que es el que ha creado el resto de Workers.
- El Master puede valerse de eventos (`fork, online, listening`, ...) para supervisar el estado de estos Workers. Los Workers, a su vez, usan IPC para comunicarse con el Master.

Ejemplo básico de cluster.
```js
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
let server = ...;
let port = ...;

if (cluster.isMaster) {
    // El master lanza los Workers
    for (let i = 0; i < numCPUs; i++) cluster.fork();
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Los workers lanzan instancias del servidor
    server.listen(port);
}
```

El objeto `cluster` tiene un atributo `workers` que es un hash de los Workers activos, indexados por su `id`. Cada llamada al método `cluster.fork()` añade una entrada a `cluster.workers`, mientras que los eventos `disconnect` y `exit` eliminan la entrada.

Cada Worker puede acceder a sus atributos `cluster.worker`, entre los que se encuentran:
- `id`
- `exitedAfterDisconnect`, que permite saber si el `exit` ha sido voluntario (`true`) o una muerte forzada por otro proceso.
- `process` es un objeto que permite identificar y gestionar el proceso sobre el que corre el Worker. Cuenta con los siguientes métodos:
    - `send(msg)` envía un mensaje al Master, que podrá leerlos mediante el evento `message`.
    - `disconnect()` desconecta al Worker del Master, pero no lo detiene necesariamente.
    - `kill()` para detener el proceso, y con él al Worker.

Ejemplo de cluster con monitorización de carga:
```js
const cluster = require("cluster");
const http = require("http");

if (cluster.isMaster) {
    let numReqs = 0;
    setInterval(() => console.log(`Reqs = ${numReqs}`), 1000);
    
    function messageHandler(msg) {
        // el máster comprueba el formato del mensaje
        // e incrementa el contador según el contenido del mismo
        if (msg.cmd && msg.cmd == "notifyRequest") numReqs++;
    }
    
    const numCPUs = require("os").cpus().length
    for (let i = 0; i < numCPUs; i++) cluster.fork()
    
    for (const worker of cluster.workers)
        cluster.workers[i].on("message", messageHandler);
} else {
    http.server((req, res) => {
        res.writeHead(200); res.end("Hello, World!\n");
        // Se envía un objeto al máster tras responder al cliente
        process.send({ cmd: "notifyRequest" });
    }).listen(8000);
}

```

## Escalabilidad con múltiples máquinas

Con `cluster` y Docker, podemos desplegar múltiples componentes en una sola máquina. pero a menudo una máquina no es suficiente para ofrecer un servicio escalable y elástico.

El primer paso para arreglarlo es el uso de los proxies inversos, que permiten el acceso a múltiples servidores a partir de un sólo proceso que enruta las peticiones a los servidores disponibles y balancea las cargas entre ellos.

Se puede utilizar, por ejemplo, el paquete `node-http-proxy`. Por ejemplo:
```js
const proxyServer = require("http-proxy");
const port = ...;
const servers = [
    {host: ..., port: ...},
    {host: ..., port: ...},
];

proxyServer.createServer((req, ser, proxy) => {
    let target = servers.shift(); // extrae el primer elemento
    proxy.proxyRequest(req, res, target);
    servers.push(target); // lo mete al final
}).listen(port);
```

O, con el programa `nginx`:
```nginx
http {
    upstream app {
        server s1.example.com;
        server s2.example.com;
        server s3.example.com;
    }
    server {
        listen 80;
        location / { proxy_pass http://app; }
    }
}
```

# Cuellos de botella

Algunas causas de contención incluyen:
- Algoritmos centralizados en tareas pesadas
    - Se arregla distribuyendo el servicio
- Herramientas de sincronización
    - Se puede arreglar, en caso de que las tareas que se sincronizan son sencillas, centralizando más la tarea.
    - También se puede arreglar con programación asincrónica.
- Tráfico excesivo
    - Se puede reducir el tráfico de datos dentro de una aplicación replicando los recursos y manteniendo consistencia, transformando así los accesos remotos en accesos locales.

# Arquitectura de MongoDB

MongoDB es una base de datos NoSQL de tipo almacén de documentos que usa objetos en formato BSON para formar colecciones.

Cuenta con un shell `mongo` para interactuar directamente con el SGBD, que proporciona una interfaz de JS con la que hacer consultas y ejecutar otros comandos. Este shell servirá para interactuar, como mínimo, con un servidor o *daemon* `mongod`, que deberá ser iniciado previamente. Alternativamente se puede, en lugar de `mongo`, usar un programa para el que haya un *driver* de MongoDB, como el paquete `mongoose` de JavaScript.

Además, en se puede particionar la BBDD en varias instancias de `mongod`, cada uno de los cuales puede contener o colecciones que el resto no tenga o, mejor aún, subconjuntos ("shards") de cada una de las colecciones. Cada una de estas particiones podrá, además, ser replicada.

Los subconjuntos están formados por fragmentos ("chunks") que no podrán superar los 64MB. MongoDB intentará que todos los subconjuntos tengan más o menos el mismo número de fragmentos.

El pegamento entre los procesos `mongod` y los clientes `mongos` son los **servidores de configuración**, que guardan los metadatos de la BBDD y saben que entradas forman cada partición y en qué nodo está cada partición. Estos servidores están replicados obligatoriamente, ya que mantienen información crítica necesaria para agregar los datos de todas las particiones.

Las peticiones de los clientes `mongos` pasar primero por los servidores de configuración, que le indicará al cliente en qué partición están los datos que está buscando. Entonces, el propio cliente `mongos` irá a buscarlos a esa partición.

## Replicación en MongoDB

MongoDB implementa un modelo de replicación basado en pasivo, con ciertas diferencias.
- La propagación es asincrónica por defecto; se responde a las consultas antes de propagar los cambios a las réplicas.
- Las réplicas también pueden ejecutar consultas, a discreción del cliente.
- Cualquier `mongod` puede ser reemplazado de forma transparente por un "*replica set*", que agrupa las réplicas en una especie de arquitectura multi-máster. Está limitado a 50.
- En vez de dos (primario y secundario), hay tres roles:
    - **Primario:** El único que atiende a las operaciones de escritura. También atiende lecturas.
    - **Secundario:** Mantienen copia de los datos del primario y pueden atender peticiones de sólo lectura.
    - **Árbitro:** Participa en votaciones para elegir un primario en caso de fallo. No atiende peticiones del cliente ni mantiene datos. Puede haber hasta 7 votantes a la vez.

Respecto a la gestión de fallos, MongoDB **renuncia a la disponibilidad** en caso de la partición, y utiliza el modelo de partición primaria, de modo que podrá continuar al haber particiones sólo si hay una mayoría de réplicas correctas. Todo esto es transparente al programador.

Para asegurarnos de que tenemos grupos mayoritarios, intentaríamos asegurarnos de tener un número impar de máquinas. En caso de tener un número par, podemos designar una de ellas como árbitro.