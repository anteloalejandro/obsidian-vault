
# Exclusión mutua distribuida

Consiste en limitar el acceso a la sección crítica a los nodos de un algoritmo distribuido.

## Algoritmo Centralizado

En una de las soluciones, el **algoritmo centralizado** (de Lamport), se designa un nodo como coordinador (o líder) al que se le pasarán mensajes SOLICITAR que harán de peticiones de acceso a la sección crítica.

El mensaje contendrá su reloj lógico y según su valor se escogerá a uno u otro nodo en caso de que hayan llegado o estén en espera varios nodos. Si dos nodos tienen el mismo reloj lógico, se escoge según el subíndice del reloj, que corresponde al índice del nodo. Sin embargo, a no ser que la sección crítica esté libre, el líder no contesta a los clientes de momento, y estos últimos se quedan escuchando.

Cuando el nodo que tiene posesión de la sección crítica termina de necesitarla, envía un mensaje LIBERAR al líder, y entonces el líder contesta al cliente que ha elegido con un CONCEDER. Cualquier otro nodo que estuviese esperando, seguirá esperando hasta que se vuelva a liberar.

![[Exclusión mutua centralizada.png]]

## Algoritmo distribuido

En el **algoritmo distribuido** (de Ricart-Agrawala), en lugar de haber un coordinador, se le envía el mensaje TRY a todos los nodos del sistema.

Sólo se podrá entrar a la sección crítica si todos los nodos del sistema distribuido le dan el OK. Además, cuando un nodo sale de la sección crítica, le da el OK a todos los que estaban esperando su respuesta, uno de los cuales ya habrá recibido el OK del resto de nodos y tomará el control de la sección crítica.

Si un nodo no quiere entrar en la sección crítica lo dará automáticamente a quien le haya mandado un TRY, pero si sí quiere entrar, con tal de evitar interbloqueos, sólo le dará el OK si su propio reloj lógico es mayor que el del emisor. En caso contrario lo anotará como que está a la espera de un OK.

Nótese que para evitar interbloqueos los relojes lógicos de los eventos tienen que estar ordenados totalmente mediante sufijos.

![[Exclusión mutua distribuida.png]]

## Algoritmo en anillo

En las **topologías en anillo** (de Le Lann) se utiliza un *token* o **testigo** que se va pasando al siguiente nodo de la red. Sólo se podrá acceder a la sección crítica si el nodo tiene el testigo en ese momento, y mientras tanto no lo pasará.

![[Exclusión mutua en anillo.png]]

# Elección de líder

Un algoritmo de elección de líder es necesario para el funcionamiento de muchos otros algoritmos distribuidos. Además, esta clase de algoritmos no se limitan a escoger un líder una vez, sino que permiten escoger nuevos líderes conforme los anteriores van fallando.

## Algoritmo "Bully"

La idea de este algoritmo es que el líder siempre sea el nodo activo con el identificador más grande (aka, el más fuerte).

Cuando un nodo detecta que el líder a caído, inicia una votación enviando un mensaje ELECCIÓN a todos los nodos con identificador mayor al suyo.

Los nodos que estén activos y hayan recibido un mensaje, contestarán al nodo anterior con un mensaje OK, indicando que participará en la votación. Al recibir este mensaje, el nodo que inició la votación se retira de la misma, sabiendo que no puede ganar.

Los nodos que han recibido el mensaje ELECCIÓN también mandarán el mismo mensaje a los nodos con identificador mayor a ellos, repitiendo el proceso. Aquel nodo que no reciba ningún OK será porque no hay ningún nodo activo mayor que el, así que se declarará líder e informará al resto de nodos.

![[Elección de líder Bully.png]]

## Algoritmo en anillo

Al igual que en el algoritmo Bully, se puede elegir un nuevo líder por iniciativa de uno de los nodos, pero en este caso los nodos están dispuestos en forma de anillo (aunque no uno estricto, pues se pueden saltar nodos) a través del cual se enviarán los mensajes.

Cuando un nodo empieza la votación, construye un mensaje ELECCIÓN que contiene el iniciador (él mismo) y una lista con los nodos participantes (él incluido), y lo envía al siguiente nodo.

El nodo que recibe en mensaje elección responde con un OK y manda un nuevo mensaje ELECCIÓN al siguiente nodo con su identificador añadido a la lista de participantes.

Este proceso se repite, reenviando mensajes ELECCIÓN saltándose los nodos que no contesten.

Una vez el mensaje ELECCIÓN llega de vuelta al iniciador, con toda la lista de participantes rellenada, elige al participante con identificador más alto como líder e informa al resto de nodos mediante un mensaje COORDINADOR que se propaga por el anillo.

![[Elección de líder en anillo.png]]

Cabe destacar que a menudo el mensaje COORDINADOR no es necesario, pues basta con que el nodo sepa que él no es el líder. Además, aún cuando hace falta, el mensaje se puede mandar mediante broadcast sin respetar la estructura del anillo.

# Consenso

El consenso es el acuerdo que deben alcanzar todos los nodos participantes en un algoritmo distribuido respecto al valor de una variable. Por ejemplo, la elección de líder es un problema de consenso con "líder" como variable.

En los problemas de consenso, los nodos participantes aportan sus estimaciones y acaban poniéndose de acuerdo en aceptar la decisión aportada por uno de ellos. Por tanto, resultados combinados o derivados no forman parte de este tipo de problemas.

Una solución correcta a este problema debe tener estas propiedades:
- **Terminación**: Todo nodo acaba generando su decisión.
- **Integridad uniforme**: Todo nodo acepta una sola decisión.
- **Validez uniforme**: Toda decisión ha sido aportada por un nodo.
- **Acuerdo**: Todos los nodos toman la misma decisión.

## Algoritmo distribuido

Tenemos $N$ nodos en una red totalmente conexa, algunos de los cuales pueden estar inactivos por cualquier razón, pero se desconoce quienes son. Hemos de suponer que ningún nodo falla **durante** la ejecución del algoritmo, sólo antes. Además,  solo se van a tolerar $\left\lfloor  \frac{n-1}{2}  \right\rfloor$ nodos caídos.

Todos los nodos difunden su estimación inicial al resto de nodos, junto su identificador. A partir de ahí, en base a algún criterio como, por ejemplo, hacer caso al que tenga el identificador más bajo, los nodos tomarán su decisión.