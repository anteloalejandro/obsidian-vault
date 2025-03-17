# Estímulo y respuesta

Las tareas tienen una *deadline* que limita el tiempo total que puede tardar el estímulo y la respuesta juntos.

Según la firmeza de la *deadline*, se divide en tres tipos:
- Hard: La respuesta fuera de plazo es inadmisible (control de frenado)
- Firm: La repuesta fuera de plazo es inútil (procesado de vídeo o audio)
- Soft: La respuesta fuera de plazo tiene utilidad, aunque sea reducida.

![[Sistemas de tiempo real 2025-03-14 17.44.02.excalidraw]]

# Soporte

No todos los sistemas operativos admiten la creación de sistemas de tiempo real, de hecho, la mayoría de sistemas operativos no son aptos para ello, incluidos Windows, MacOS y Linux (exceptuando RTLinux y Linux con el realtime kernel).

# Planificación

Han de usarse prioridades fijas expulsivas para las tareas, por lo que debemos saber de antemano cual es el coste de cada tarea en el peor caso.

El "peor caso" se da cuando todas las tareas se ejecutan a la vez (instante crítico).

El hiperperiodo es el [[MCD y MCM|MCM]] ente las tareas, y es el periodo mínimo tras el que se repite la planificación.

Si en un instante crítico una tarea cumple su primer plazo (deadline), siempre cumplirá todos los plazos posteriores.

Tiempo de respuesta = tiempo finalización primera tarea - tiempo activación de la primera tarea. Tiempo de activación es el tiempo desde el que intenta ejecutarse, aunque otra tarea con más prioridad le impida ejecutarse. En el instante crítico, es el propio instante crítico para todas las tareas.

El tiempo de respuesta se puede calcular sin tener que hacer un cronograma mediante una recurrencia. Se termina de recurrir cuando $w^{n+1} = w^{n}$ o $w^{n+1} > D_{i}$ (el propio $w^{n+1}$ ya no entraría).

$$
\begin{align}
w^{n+1}_{i} &= C_{i} + \sum_{j \in hp(i)} \left( \left\lceil  \frac{w^{n}_{i}}{T_{j}}  \right\rceil · C_{j}  \right ) \\
w_{i}^{0} &= C_{i} + \sum_{j\in hp(i)}C_{j}
\end{align}
$$

# Inversión de prioridad

Puede invalidar la planificación anterior.

Sucede cuando una tarea de prioridad alta comparte semáforo con una tarea de prioridad baja. Si la de prioridad baja cierra el semáforo y es interrumpida por tareas de prioridad media, la tarea de prioridad alta también se retrasará, aunque tenga una prioridad superior a todas las demás.

Se suele dar cuando no hay instante crítico.
# Protocolo de techo de prioridad inmediato

A los semáforos se les asigna una prioridad, igual a la prioridad más alta de entre los procesos que lo utilizan. Este es el techo de prioridad.

Cuando una tarea cierra el semáforo, la tarea adquiere la prioridad del techo del semáforo, a no ser que dicha prioridad sea más baja (sólo pasa al combinar semáforos). Al abrir el semáforo, recupera su prioridad.

Con este protocolo se consigue que si una tarea (entre las que comparten el mismo semáforo)  se puede quedar bloqueada a mitad de ejecución por no tener suficiente prioridad,  sólo pasa al principio. No deja de haber inversión de prioridad, pero se acota cuanto se bloquean las tareas prioritarias.