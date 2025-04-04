
Sistema informático que responde a los estímulos dentro de un plazo de tiempo determinado. Es decir, no basta con que lleve a cabo las acciones correctas, también tiene que hacerlo en el intervalo de tiempo correcto.

Los sistemas de tiempo real actúan sobre un sistema, denominado sistema controlado, para conseguir que éste tenga un comportamiento determinado.

# Estímulo y respuesta

Las tareas tienen una *deadline* que limita el tiempo total que puede tardar el estímulo y la respuesta juntos.

Según la firmeza de la *deadline*, se divide en tres tipos:
- Hard: La respuesta fuera de plazo es inadmisible (control de frenado)
- Firm: La repuesta fuera de plazo es inútil (procesado de vídeo o audio)
- Soft: La respuesta fuera de plazo tiene utilidad, aunque sea reducida.

![[Sistemas de tiempo real 2025-03-14 17.44.02.excalidraw|100%]]

# Caraterísticas

- Concurrencia: las componentes del sistema que controla el STR funcionan simultáneamente, y el STR debe atenderlo y controlarlo adecuadamente.
- Interacción con dispositivos físicos.
- Fiabilidad y seguridad: Si falla, tiene que gestionarse de forma que el sistema quede en un estado seguro.
- Determinismo temporal: acciones en intervalos de tiempo determinados (pero no necesariamente eficientes).

# Soporte

No todos los sistemas operativos admiten la creación de sistemas de tiempo real, de hecho, la mayoría de sistemas operativos no son aptos para ello, incluidos Windows, MacOS y Linux (exceptuando RTLinux y Linux con el realtime kernel).

# Planificación

Un paradigma de planificación está formado por un **algoritmo de planificación**, que determina el orden de acceso de las tareas a los recursos del sistema (generalmente CPU) en caso de que múltiples quieran acceder a la vez, y un **método de análisis** que permite calcular el comportamiento temporal del sistema, para ver si se cumplen los requisitos del sistema en el peor caso.

Han de usarse prioridades fijas expulsivas para las tareas, por lo que debemos saber de antemano cual es el coste de cada tarea en el peor caso.

El "peor caso" se da cuando todas las tareas se ejecutan a la vez (instante crítico).

# Análisis

- Asumiremos que hay conjunto estático de tareas $\tau = \{ \tau_{1} , \tau_{2} , \dots , \tau_{n} \}$
- Todas las tareas son periódicas, es decir, se repiten constantemente, con periodo $T_{i}$.
- El tiempo de ejecución máximo o tiempo de cómputo de cada tarea es $C_{i}$
- Las tareas tienen un plazo máximo o *deadline*   $D_{i} \leq T_{i}$.
- Las tareas son independientes
- Los cambios de contexto no tienen coste
- Las tareas no se pueden suspender voluntariamente, tiene que pasar algo que les impida continuar

![[Sistemas de tiempo real - cronograma.png]]

Entre el instante de activación, que se repite cada periodo, y el *deadline*, la tarea tiene que haber acabado su cómputo en el peor caso ($C_{i}$). En caso contrario, el sistema no cumple las condiciones para ser de tiempo real.

## Tiempos

El **hiperperiodo** es el [[MCD y MCM|MCM]] entre el periodo las tareas, y es el periodo mínimo tras el que se repite la planificación.

El **tiempo de respuesta** de una tarea es la suma del tiempo de cómputo y el tiempo total que no se está ejecutando por **interferencias de tareas más prioritarias**. Es decir, el tiempo que pasa desde que acaba el cómputo hasta que empieza el nuevo periodo no cuenta. Se cuenta a partir del punto de activación de la tarea.

$$
R_{i} = C_{i} + I_{i}
$$

El **tiempo máximo de las interferencias** $I_{i}$ es igual a la suma de los productos del número de activaciones de las tareas más prioritarias por los tiempos de cómputo de las tareas más prioritarias:

$$
I_{i} = \sum_{j\in hp(i)} \left\lceil  \frac{R_{i}}{T_{j}}  \right\rceil C_{j}
$$

## Test de planificabilidad

Con el modelo que usamos para análisis, tenemos que siempre es cierto que...
- Si las tareas cumplen con sus tiempos dentro de un hiperperiodo, lo cumplirán **siempre**.
- Si en un instante crítico una tarea cumple su primer plazo siempre cumplirá todos los plazos posteriores.
- Sólo podemos asegurar que se cumplirán los plazos si para todas las tareas es cierto que $R_{i} \leq D_{i}$

Por las definiciones anteriores de $R_{i}$ e $I_{i}$, sabemos que se puede calcular el primero como:

$$
R_{i} = C_{i} + \sum_{j\in hp(i)} \left\lceil  \frac{R_{i}}{T_{j}}  \right\rceil C_{j}
$$

Esto, sin embargo, presenta el problema de que para poder calcular $R_{i}$, tenemos que saber $R_{i}$ de antemano. Además, la ecuación no es ni continua (por culpa del *ceil*) ni lineal, por lo que no se puede resolver analíticamente. Sin embargo, si se puede resolver mediante recurrencia:

$$
\begin{align}
w^{0}_{i} &= C_{i} + \sum_{j\in hp(i)}C_{j}  \\
w^{n+1}_{i} &= C_{i} + \sum_{j\in hp(i)} \left\lceil  \frac{w^{n}_{i}}{T_{j}}  \right\rceil C_{j}
\end{align}
$$

Detendremos la recurrencia en uno de los casos siguientes, y según cuando la paremos, sabremos el tiempo de respuesta o determinaremos que el sistema no es un STR válido.
$$
\begin{align}
w^{n+1}_{i} = w^{n}_{i} &\implies R_{i} = w^{n}_{i} \\
w^{n+1}_{i} > D_{i} &\implies \text{No se cumple el plazo}
\end{align}
$$

# Inversión de prioridad

Puede invalidar la planificación anterior.

Sucede cuando una tarea de prioridad alta comparte semáforo con una tarea de prioridad baja. Si la de prioridad baja cierra el semáforo y es interrumpida por tareas de prioridad media, la tarea de prioridad alta también se retrasará, aunque tenga una prioridad superior a todas las demás.

Se suele dar cuando no hay instante crítico.

# Protocolo de techo de prioridad inmediato

A los semáforos se les asigna una prioridad, igual a la prioridad más alta de entre los procesos que lo utilizan. Este es el techo de prioridad.

Cuando una tarea cierra el semáforo, la tarea adquiere la prioridad del techo del semáforo, a no ser que dicha prioridad sea más baja (sólo pasa al combinar semáforos). Al abrir el semáforo, recupera su prioridad.

Con este protocolo se consigue que si una tarea se puede quedar bloqueada a pesar de tener más prioridad, sólo pasa al principio. No deja de haber inversión de prioridad, pero se acota cuanto se bloquean las tareas prioritarias, de modo que las tareas prioritarias tienden a acabar antes que las no prioritarias (sólo hay inversión de prioridad al principio). La tarea menos prioritaria tarda exactamente lo mismo en finalizar.

## Factor de bloqueo

El factor de bloqueo de una tarea es el tiempo máximo que se va a quedar sin ejecutarse por culpa de una tarea menos prioritaria. En este protocolo, es igual al tiempo que están las tareas menos prioritarias en una sección crítica que comparten con la tarea actual.

El factor de bloqueo de cada una de las tareas es igual a la sección crítica de la tarea de menor prioridad. En caso de que haya varias tareas de menor prioridad **que causen bloqueo**, nos quedamos con el bloqueo máximo entre las ellas. En caso de la tarea menos prioritaria, $B_{n}$, el factor de bloqueo siempre será 0.

$$
\begin{align}
B_{i} &= max \{ \text{Tareas con menor prioridad producen bloqueo} \} = max\{ C_{k,s} \} \\
B_{n} &= 0
\end{align}
$$

Este factor de bloqueo forma parte del tiempo de respuesta de la tarea, de modo que la fórmula ahora queda como:

$$
w_{i} = B_{i} + C_{i} + \sum_{w\in hp(i)} \left\lceil  \frac{R_{i}}{T_{j}}  \right\rceil C_{j}
$$