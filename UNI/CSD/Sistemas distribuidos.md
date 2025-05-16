
# Definición

Conjunto de ordenadores independientes que **fingen ser un sólo servidor**. Están formadas por:
- **Máquinas autónomas:** No comparten hardware, ejecutan código y fallan de forma independiente.
- **Algoritmos distribuidos:** Cada nodo ejecuta una parte del algoritmo concurrentemente con el resto de nodos del sistema distribuido, que usualmente se comunican entre sí y se sincronizan mediante mensajes. Si se abstrae mucho, se puede entender al propio sistema distribuido como una colección de algoritmos distribuidos.

# Características

## Transparencia de distribución

Se define como capacidad del sistema de fingir ser una sola máquina. No lo mismo que un sistema en red cualquiera, donde varias máquinas colaboran sin fingir ser la misma ($\text{Sistema distribuido} \implies \text{Sistema en red}$). Lo que importa para determinar si un sistema es o no distribuido es la experiencia del usuario.

Para conseguir esta característica se deben ocultar diferentes aspectos, llamados **Ejes de transparencia**. Aunque hay más, los tres principales son:
- **Transparencia de ubicación:** Se oculta la ubicación física de los recursos, es decir, en qué máquina o servidor están. Para ello los recursos identificar con **nombres simbólicos únicos**, y se accede a ellos gracias a un **Servicio de Nombres**, que localiza y busca recursos.
- **Transparencia de fallos:** Se oculta el hecho de que los componentes del sistema pueden fallar, y se trata de impedir que el fallo afecte al usuario. Para ello se utilizan **detectores de fallos** que monitorizan de forma constante a los nodos, [[#Replicación|replicación]] para recuperar el estado del sistema antes del fallo, y **algoritmos tolerantes a fallos** que reaccionan adecuadamente al fallo de uno o más nodos.
- **Transparencia de replicación:** Se oculta el hecho de que los recursos pueden estar replicados en varios nodos a la vez. La replicación de los recursos, que se hace para otorgar tolerancia a fallos, puede causar problemas de consistencia entre el estado actual del mismo recurso en diferentes nodos, pero eso no tiene que afectar al usuario. Se emplean algoritmos de balanceo de carga, que deciden qué replica sirve cada petición, y algoritmos de replicación que aseguren la consistencia entre replicas, siempre y cuando sea factible.

Irónicamente, en este contexto *transparencia* sería más correctamente descrito como *opacidad*.

Las abstracciones necesarias para ofrecer transparencia tienen un coste elevado, pero mejoran la experiencia del usuario. A mayor transparencia, mayor coste y mayor calidad.

La transparencia total no siempre es necesaria o conveniente en todos los ejes. Esto puede ser porque un sistema concreto necesita priorizar cosas que vuelvan imposible un tipo concreto de transparencia, o porque el coste de la transparencia total sea prohibitivo.

## Disponibilidad

La disponibilidad es la probabilidad de que los usuarios puedan acceder a los servicios que ofrece el sistema.

Se consideran sistemas **altamente disponibles** si la probabilidad es mayor al 99.999%, aunque para los sistemas **críticos** las probabilidades son mucho mayores.

Hay 3 factores que afectan a la disponibilidad, y los sistemas distribuidos se deben diseñar alrededor de ellos: los fallos, el mantenimiento y los ataques.

### Fallos

Pueden fallar tanto nodos como redes, y los sistemas deben es tolerantes a fallos, es decir, poder funcionar aun habiendo cierta cantidad de fallos.

El mecanismo básico para conseguir tolerancia a fallos es la **replicación**, por el cual los nodos del servicio se consideran réplicas que llevan a cabo la misma tarea en conjunto, por lo que un fallo en uno o varios nodos, si bien puede afectar al rendimiento, no implica que el servicio deje de funcionar completamente.

La replicación, sin embargo, trae consigo el problema de la consistencia, es decir, el grado de similitud (o diferencia) entre las réplicas. Podemos catalogar los requisitos de consistencia de un sistema distribuido en dos tipos:
- **Consistencia fuerte:** Todas las réplicas buscan ser iguales entre sí en todo momento. Esto es esencialmente imposible, así que se opta por hacer que el servicio **dé la misma respuesta independientemente de la réplica** que atienda al usuario. Para usuario es como si fuese perfectamente consistente.
- **Consistencia débil:** En este caso no es necesario que el usuario reciba la misma repuesta en cualquier caso, así que las réplicas pueden diferir.

Hay dos ejes en los que categorizar los tipos de fallos: **Simples** o **compuestos**, y **Detectables** o **Indetectables**. 

- **Simples y detectables.** Se hace uso de la replicación y, cuando se detecta que una réplica ha fallado, se le impide ofrecer servicio y se le excluye de las comunicaciones.
    - *Fallo de parada:* Un nodo se detiene. Se puede detectar mediante pings periódicos.
    - *Fallo de temporización:* Un nodo tarda demasiado en responder. Se puede detectar mediante pings periódicos o, preferiblemente, mediante temporizadores asociados a cada petición.
    - *Fallo de respuesta detectable:* Un nodo proporciona una respuesta incorrecta, pero detectable. Otro nodo puede detectarlo usando rangos válidos de respuesta.
- **Simples indetectables.** También conocidos como fallos bizantinos. Un sólo nodo falla de forma arbitraria o con una respuesta incorrecta que no se puede identificar como tal. Pueden ser causado por errores en el software o hardware, o por ataques maliciosos. Para evitar este tipo de fallos en los sistemas ultra-disponibles, se emplea la replicación junto con **algoritmos de quorum**, en los que todas las réplicas contestan pero sólo se elige la respuesta mayoritaria.
- **Fallos compuestos.** Normalmente se tratan igual que una sucesión de fallos simples, ya sean detectables o indetectables.
    - *Detectables:* Se tratan uno a uno de forma independiente.
    - *Indetectables:* Se asume que la mayoría de nodos no estarán afectados y por tanto estos podrán seguir ofreciendo el servicio.
    - *Particiones:* Son fallos compuestos que acaban dejando dividido al sistema en varios subgrupos que no se pueden comunicar. La mejor forma de prevenirlos es tener en cuenta el [[#Teorema CAP|Teorema CAP]].

### Mantenimiento

Todo sistema, distribuido o no, requiere mantenimiento, pero los usuarios deben poder acceder al servicio mientras se lleva a cabo.

### Ataques

Todo sistema distribuido es objeto potencial de ataques maliciosos, por lo que se debe poder impedir que sucedan en medida de la posible, detectar cuando han sucedido y corregirse si ha sucedido.

## Escalabilidad

Para hacer un sistema escalable se aplican las siguientes técnicas:
- **Distribuir la carga**.
- **Distribuir los datos.**
- **Replicación.**
- ***Caching.***

Nótese que cuando más escalable es un sistema distribuido, más necesario es sacrificar la consistencia, ya que es más probable que ocurran particiones.

Cuando es absolutamente necesario que haya una consistencia fuerte, se opta por el particionado cuidadoso de los datos. Por ejemplo, se pueden distribuir las entradas de las tablas de las bases de datos que usa el sistema distribuido en varias zonas, en las que cada una es consistente.

## Seguridad

La seguridad de un sistema distribuido implica ofrecer un servicio disponible y correcto sólo a los usuarios legítimos del sistema. Para ello se debe garantizar...
- **Autenticación**
- **Integridad**
- **Confidencialidad**
- **Disponibiliidad**

# Mecanismos para la tolerancia a fallos

## Detectores de fallos

La detección de fallos se lleva a cabo en cada nodo, que se encargará de monitorizar a uno o varios nodos y emitir **sospechas de fallo** al servicio de pertenencia a grupo.

## Servicios de pertenencia a grupo

Este servicio se encarga de decidir qué nodos han fallado en base a la información proporcionada por los nodos vivos. Ante una o varias sospechas de fallo se inicia una **fase de acuerdo** para determinar qué nodos han fallado, y si se determina que alguno ha fallado este servicio lo expulsará y notificará al resto de nodos del fallo, que procederán a ignorar todos los mensajes de dichos nodos.

Nótese que es posible que esté fallando el nodo que emite la sospecha, y también será expulsado si los demás nodos están de acuerdo que ese es el caso.

Gracias a este sistema, cualquier fallo simple detectable **pasa a ser un fallo de parada**.

## Replicación

Cada servicio se configura con múltiples réplicas y, ante los fallos, éstas se ignoran a las que fallan y continúan dando servicio.

### Replicación pasiva

De entre todas las réplicas, sólo una será la **primaria**, siendo el resto **secundarias**. Sólo la réplica primaria está activa, y el resto no procesan peticiones (aka, son pasivas).

La réplica primaria, además, manda un mensaje a todas las secundarias con el nuevo estado cada vez que éste cambia, llamado *checkpoint*. Si el checkpoint se envía y la primaria espera las respuestas antes de contestar al cliente, el sistema tendrá **consistencia fuerte**, y si el checkpoint se envía más tarde, **consistencia débil**.

La reconfiguración es diferente para primarias y secundarias. Cuando falla una secundaria, todo lo que tiene que pasar es que la primaria deje de enviar checkpoints a esa secundaria. Sin embargo, en caso de fallo de réplica primaria, se tiene que elegir qué secundaria va a tomar el rol de primaria, parar lo que se tiene que comprobar cual tiene el estado más reciente y todas las réplicas deben estar de acuerdo. Durante este proceso, el sistema dejará de estar disponible al no haber una réplica primaria. También hay que dar a conocer el cambio réplica principal al cliente.

La principal ventaja es que no requiere de gestionar la exclusión mutua entre varias máquinas y que se puede usar en servicios que se comporten de forma no determinista, que en los servicios en red son la mayoría.

### Replicación activa

En este modelo, también conocido como replicación mediante **máquina de estados**, todas las réplicas son iguales; todas procesan peticiones y contestan al cliente.

Todas las máquinas deben actuar por su cuenta de forma determinista, por lo que el modelo de ejecución es muy restrictivo, impidiendo incluso que cada réplica use concurrencia internamente.

También requiere de **algoritmos de difusión** que proporcionen la misma secuencia de mensajes en el mismo orden en todas las réplicas para que todas mantengan el mismo estado, lo que conlleva un coste elevado.

La reconfiguración es sencilla, pues al tener todas las réplicas el mismo estado todo lo que hay que hacer es excluir a la que falle.

# Disponibilidad a gran escala

En sistemas en gran escala, se asume que las particiones van a ocurrir, por lo que los sistemas se diseñan teniendo en cuenta este hecho.

Por esto, siguiendo el [[#Teorema CAP]], toca elegir entre sacrificar disponibilidad o consistencia.

Hoy en día premia más la disponibilidad, así que los sistemas de diseñan no sólo de forma que puedan funcionar estando particionados, sino que esas particiones acaben convergiendo y volviéndose consistentes de nuevo con el tiempo, lo que se denomina **consistencia eventual**.

# Teorema CAP

El teorema CAP (*Consistency, Availability, Partitions*) propone que es imposible conseguir un sistema que tenga al mismo tiempo mucha consistencia, mucha disponibilidad y mucha tolerancia a particiones, pero que sacrificando una de las tres componentes se pueden obtener las otras dos.

Las combinaciones más populares que tienen en cuenta este teorema son **CP, CA y AP**.

# Middleware

Conceptualmente, es una capa de software entre el nivel de aplicación y el de transporte, que comparten todos los nodos de un sistema distribuido, a los que les ofrece servicios más allá de lo que puede el sistema operativo, del cual es agnóstico.

![[sd-middleware.excalidraw|100%]]

Un sistema distribuido no tener middleware, puede estar compuesto simplemente de nodos en una red forzados a actuar como un sistema distribuido programando toda la complejidad que esto conlleva "a pelo". El middleware, sin embargo, permite abstraer el sistema simplificando la lógica y facilitando la portabilidad e interoperabilidad.

A un sistema distribuido sin middleware se le denomina  "puro", mientras que los que sí lo usan son **Sistemas Distribuidos Extendidos**.

## Tipos de middleware

Existen diferentes tipos de middleware, que utilizan abstracciones diferentes para la comunicación y crean diferentes tipos de Sistemas Distribuidos Extendidos.

### Orientados a Objetos

Utilizados por lenguajes orientados a objetos, como [[Mecanismos de comunicación|Java con su RMI]]. Permite invocar a métodos de objetos como si todos fuesen locales, haciendo uso de los **Objetos Remotos**, que residen en otros nodos. A menudo abstrae el hecho de si el objeto es remoto o no.

### Orientados a Comunicaciones

Tienen elementos de comunicación intermedios.

### Orientados a Eventos

Los nodos emiten mensajes a los que el resto de nodos pueden estar esperando o no. Una vez llegue el mensaje, los nodos ejecutarán alguna función asociada al mensaje. Se incluye en este tipo de middleware los modelos suscribibles. 

## Ejemplos de middleware

### Java Message Service

Es un middleware Orientado a Mensajes de relativamente bajo nivel.

La principal componente del JMS es un **proveedor** que se encarga de gestionar todas las comunicaciones. A pesar de lo que pueda dar a entender, puede estar formado por varias máquinas y ser en sí mismo un sistema distribuido.

El proveedor ofrece sus servicios a **clientes**, que pueden ser **productores o consumidores**, mediante una cola.

Alternativamente, en vez de una relación uno-a-uno como es el productor-consumidor, JMS provee de un mecanismo uno-a-muchos en el que un **publicador** añade mensajes a un tema o *Topic* al que se suscriben múltiples **suscriptores**, a los que el proveedor difunde el mensaje.

### Java Remote Method Invocation

Es un middleware Orientado a Objetos de alto nivel en el que se pueden usar objetos de máquinas remotas y sus métodos casi como si fuesen objetos locales.