
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

# Teorema CAP

El teorema CAP (*Consistency, Availability, Partitions*) propone que es imposible conseguir un sistema que tenga al mismo tiempo mucha consistencia, mucha disponibilidad y mucha tolerancia a particiones, pero que sacrificando una de las tres componentes se pueden obtener las otras dos.

Las combinaciones más populares que tienen en cuenta este teorema son **CP, CA y AP**.

# Mecanismos para la tolerancia a fallos

## Detectores de fallos

## Servicios de pertenencia a grupo

## Replicación


# Middleware

Conceptualmente, es una capa de software entre el nivel de aplicación y el de transporte, que comparten todos los nodos de un sistema distribuido, a los que les ofrece servicios más allá de lo que puede el sistema operativo, del cual es agnóstico.

![[sd-middleware.excalidraw|100%]]

Un sistema distribuido no tener middleware, puede estar compuesto simplemente de nodos en una red forzados a actuar como un sistema distribuido programando toda la complejidad que esto conlleva "a pelo". El middleware, sin embargo, permite abstraer el sistema simplificando la lógica y facilitando la portabilidad e interoperabilidad.

A un sistema distribuido sin middleware se le denomina  "puro", mientras que los que sí lo usan son **Sistemas Distribuidos Extendidos**.

## Tipos de middleware

Existen diferentes tipos de middleware, que utilizan abstracciones diferentes para la comunicación y crean diferentes tipos de Sistemas Distribuidos Extendidos.

### Orientados a Objetos

Utilizados por lenguajes orientados a objetos, como [[Java RMI|Java con su RMI]]. Permite invocar a métodos de objetos como si todos fuesen locales, haciendo uso de los **Objetos Remotos**, que residen en otros nodos. A menudo abstrae el hecho de si el objeto es remoto o no.

### Orientados a Comunicaciones

Tienen elementos de comunicación intermedios ¿?

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