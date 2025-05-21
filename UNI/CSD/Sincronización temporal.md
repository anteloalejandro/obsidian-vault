
# Relojes lógicos de Lamport

En vez de sincronizar los eventos en base a una fecha y hora concretas, podemos usar una relación *happens-before* para crear unos relojes lógicos.

Si un evento tiene una relación *happens-before* con otro evento, el reloj lógico del primero será mayor que el del segundo.

$$
a \to b \implies L(a) < L(b)
$$

Todos los eventos del mismo proceso tienen una relación *happens-before* con la evento anterior, y aumentaremos en 1 su reloj. Así, cuando dos eventos del mismo proceso tengan una relación *happens-before* entre ellos, el que ocurra después tendrá el mismo reloj que la siguiente evento del proceso que ocurra antes, ergo serán concurrentes. Por tanto, el valor de $L(a)$ indica el **mínimo** de eventos que han ocurrido antes de $a$, incluyendo el propio $a$.

Nótese que si el reloj lógico es igual, son concurrentes, pero que sean concurrentes no implica que tengan el mismo valor; se puede dar el caso de que dos procesos con reloj lógico diferente sí sean concurrentes.

$$
L(a) = L(b) \implies a \parallel b
$$
Para ordenar totalmente procesos parcialmente ordenados se añade a los relojes lógicos de cada una de los eventos del proceso un sufijo.

Nótese que cuando se envía un mensaje $m$ de $a$ a $b$, el valor de $m$ será el que tiene $a$, no el que tiene $b$.

# Relojes vectoriales

El problema de los relojes lógicos es que aunque $L(a) < L(b)$, no podemos saber si $a$ y $b$ son concurrentes. Para solucionarlo, en vez de tener un reloj para cada proceso, con un valor diferente para cada evento, tendremos un vector con tantas componentes como procesos.

Cada vez que tenemos una relación *happens-before* **directa**, es decir, una que no se obtenga a través de la propiedad transitiva, se aumenta, el valor de la componente correspondiente al proceso del evento que ocurre antes en el vector del evento que ocurre después es igual al valor en la misma componente del vector del evento que ocurre antes más uno. Es decir, si $e_{11} =  \{ 1, 0, 0 \}$ y $e_{11} \to_{directa} e_{12}$, la primera componente de $e_{12}$ será $2$.

Gracias a esto, podemos saber cuantos eventos han ocurrido **como mínimo** en cada proceso antes del evento actual. Si $a = \{ 2, 3, 5 \}$ sabemos que han sucedido 2 eventos en el proceso 1, 3 en el proceso 2 y 5 en el proceso 3 antes de que el proceso actual se lleve a cabo.

Un vector será menor que otro si todas las componentes son menores o iguales y una de las componentes es estrictamente menor. Si ninguna es menor que otra, son concurrentes.
$$
\begin{gather}
V(x) < V(y) \iff (\forall{i} \quad x_{i} \leq y_{i})  \land (\exists i \quad x_{i} < y_{i}) \iff x \to y \\
(V(x) \not\lt V(y) \land V(y) \not\lt V(x)) \implies x \parallel y
\end{gather}
$$

# Estados globales

El estado global está formado por el estado de cada nodo y por los mensajes enviados **pero no entregados**.

Esto se puede usar en el un recolector de objetos remotos no utilizados, con el que dejaríamos de compartir un recurso si ningún nodo lo está utilizando y **no se le está enviando a ninguno**.

Para obtener una instantánea del estado global, lo ideal sería que fuese perfectamente precisa, pero como en el mundo real las instantáneas se obtienen a través de mensajes, no pueden serlo. Lo que buscamos es que sea consistente, es decir, que corte de forma que todos los mensajes que están en tránsito en un punto del corte estén en tránsito en todos los puntos de corte.

# Problemas algorítmicos en Sistemas Distruibuidos

## Exclusión mutua distribuida

Consiste en limitar el acceso a la sección crítica a los nodos de un algoritmo distribuido.

En una de las soluciones, el **algoritmo centralizado** (Lamport), se designa un nodo como coordinador (o líder) al que se le pasarán mensajes que harán de peticiones de acceso a la sección crítica. El mensaje contendrá su reloj lógico y según su valor se escogerá a uno u otro nodo. Si dos nodos tienen el mismo reloj lógico, se escoge según el subíndice del reloj, que corresponde al índice del nodo.

En el **algoritmo distribuido** (Ricart-Agrawala), en lugar de haber un coordinador, se le envía el mensaje a todos los nodos del sistema. Sólo se podrá entrar a la sección crítica si todos los nodos del sistema distribuido le dan el OK. Si un nodo no quiere entrar en la sección crítica lo dará automáticamente, pero si sí quiere sólo le dará el OK si su reloj lógico en mayor.

En las **topologías en anillo** (Le Lann) se utiliza un *token* o **testigo** que se va pasando al siguiente nodo de la red. Sólo se podrá acceder a la sección crítica si el nodo tiene el testigo en ese momento, y mientras tanto no lo pasará.

## Elección de líder

Para elegir un líder, se puede elegir a uno que tenga el mayor (o menor) identificador al inicio del sistema distribuido. Si se diese el caso de que el líder deja de estar operativo, los nodos mandan mensajes ELECCIÓN a los que mayor identificador tengan, y si están activos responderán con un OK.