
# Sincronización de relojes físicos

Para sincronizar el reloj de un cliente $Cc$ con el reloj de un servidor $Cs$ el cliente primero pedirle al servidor que le diga el tiempo actual, lo que tendrá cierto retraso antes de llegar. El servidor procesará su petición y le enviará una respuesta con el tiempo actual, que de nuevo sufrirá un retardo. El cliente entonces calcula la diferencia entre el instante de envío y el de recepción según su reloj interno, divide entre dos, y suma el tiempo que envío el servidor.

$$
Cc' = Cs + \frac{Cc_{0} - Cc_{1}}{2}
$$

Si el valor resultante es más grande que el reloj interno, con tal de no retrasar la hora del dispositivo, se pausará el reloj hasta que funcione de nuevo, y en caso contrario se actualizará diretamente el reloj.

En cualquier caso, este método de sincronización, llamado **algoritmo de Cristian**, asume que el tiempo de ida y de vuelta son iguales, aunque en la práctica $Cc_{0}$ tiende a compensar las diferencias de $Cc_{1}$ y viceversa.

Existe una versión mejorada de este método, el **algoritmo de Berkley**, en la que el servidor coge las diferencias entre el tiempo del servidor y los tiempos del cliente $Cs - \frac{Cc_{0} - Cc_{1}}{2}$ y reenvía la media de todos los que ha obtenido a todos sus clientes, a modo de ajuste. De esta forma, los relojes están perfectamente sincronizados, pero no necesariamente ajustados a la hora real exacta.

Aun así, la sincronización de relojes físicos nunca de puede hacer de forma exacta, así que sólo se puede depender de ello en casos en los que la precisión milimétrica no es importante.

# Relojes lógicos de Lamport

En vez de sincronizar los eventos en base a una fecha y hora concretas, podemos usar una relación *happens-before* para crear unos relojes lógicos.

Si un evento tiene una relación *happens-before* con otro evento, el reloj lógico del primero será mayor que el del segundo. Nótese que no es necesariamente cierto en viceversa.

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

Estos relojes lógicos sólo establecen un orden parcial entre eventos, ya que sabemos que ciertos eventos ocurren antes que otros, pero no podemos ordenar todos los eventos en una sola fila. Para dotar de un orden total a los eventos se añade como sufijo el índice del proceso o nodo al que pertenecen y, si el valor de su reloj coincide, se ordenan en base al sufijo.

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

Para obtener una instantánea del estado global, lo ideal sería que fuese perfectamente precisa, pero como en el mundo real las instantáneas se obtienen a través de mensajes, no pueden serlo. Lo que buscamos es que sea consistente, es decir, que no se refleje en la instantánea ninguna entrega sin que esté registrado también su envío.

Para calcular esta instantánea se emplea el algoritmo de **Chandy-Lamport**, que requiere de conexiones entre todos los nodos (topología completa) en ambos sentidos (de A a B y de B a A) y con canales de comunicación FIFO. 

Dicho algoritmo sigue los siguientes pasos:
1. Un nodo, llamado iniciador, guarda su estado local y envía un mensaje MARCA al resto de nodos.
2. Cuando un nodo recibe MARCA por un canal, si no lo ha hecho ya, guarda su estado y también envía MARCA todos los nodos nodos, cierra el canal por el que le ha llegado MARCA y escucha respuestas por el resto de canales.
3. Conforme van llegando respuestas MARCA a los nodos que ya habían guardado su estado, estos anotan todos los mensajes recibidos por cada canal.
4. Cuando los nodos reciben todas sus respuestas envían su estado al nodo iniciador (excluyendo al propio iniciador) y finalizan.