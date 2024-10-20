
La planificación es el acto de decidir qué procesos deben de ser los siguientes en salir de la cola en la que están actualmente, y cuáles deben entrar en qué cola. Por ejemplo, un planificador se encarga de decidir que procesos salen de la cola de preparados para entrar al estado de ejecución, y también se encarga de decidir cuando un proceso debe salir del estado de ejecución para dárselo a otro.

Cabe destacar que podemos divider a los procesos en dos tipos significativamente diferente: los procesos **limitados por CPU** y los procesos **limitados por E/S**. Además, estudios estadísticos indican que la mayoría de los procesos tienen un gran número de ráfagas de CPU cortas, y unas pocas ráfagas de duración largas.

# Criterios de planificación

Hay diferentes métricas relevantes que se pueden optimizar a la hora de diseñar la planificación, y diferentes métricas pueden ser convenientes en diferentes contextos:

- **Utilización de CPU:** Mantener la CPU tan ocupada como sea posible. Es lo ideal en la mayoría de situaciones. $\frac{T_{\text{CPU}}}{T_{\text{total}}}$
- **Tasa de rendimiento:** Maximizar el número de tareas completadas por unidad de tiempo. $\frac{N_{procesos}}{T_{total}}$
- **Tiempo de retorno:** Tiempo de llegada entre la llegada de un proceso y su finalización. Hace que las tareas cortas acaben antes.
  $T_{\text{salida}} - T_{\text{entrada}} = \sum T_{\text{CPU}} + \sum T_{\text{E/S}} + \sum T_{\text{cola}}$
- **Tiempo de espera:** Minimizar el tiempo de que un proceso está en la cola de procesos preparados. Da oportunidad a procesos más largos, pero aumenta el tiempo de retorno. $\sum T_{\text{cola}}$
- **Tiempo de respuesta:** Minimizar el tiempo que transcurre desde que llega un proceso a la cola hasta que ejecuta su primera instrucción. Permite que varios procesos cumplan por lo menos parte de sus tareas.
- **Equidad:** Garantizar que cada proceso obtiene una proporción equitativa de CPU. Tiende a aumentar el tiempo de ejecución, pero en entornos de usuario gráficos permite que varias aplicaciones se ejecuten, a ojos del usuario, "simultáneamente".

La ejecución concurrente en sí misma ya implica una mejora en todas estas métricas.

# Algoritmos de planificación

Cada cola de un sistema operativo emplea un algoritmo de planificación, que establecen las reglas para sacar a procesos de sus colas o incluso de la propia CPU. A su vez, cada recurso puede implementar varias colas con diferentes prioridades y algoritmos.

# No expulsivos

Las colas que implementan algoritmos no expulsivos no pueden sacar a los procesos del recurso que gestionan hasta que este se termine.

- **FIFO/FCFS:** El primer proceso que llega es el primero en acabar de ejecutarse.
- **Shortest Job First:** Como FIFO pero si hay varios a la vez se escogen los más rápidos primero. Esto reduce el tiempo medio de espera en cola.

# Expulsivos

En estas colas los procesos pueden ser expulsados de su recurso en cualquier momento, según lo decida el propio algoritmo. Sin embargo, suelen tener que ser evaluados en cada ciclo, lo que toma tiempo.

- **Shortest Remaining Time First:** SJF expulsivo. Se evalúa el tiempo de ejecución de un proceso cuando entra por primera vez a la cola, y si es más corto que los demás, accede al recurso. Reduce aún más el tiempo de espera medio.
- **Planificación por prioridades:** Se asigna una prioridad a cada proceso y cada vez que llega un proceso se coge al de mayor prioridad.
- **Round Robin, planificación circular:** A cada proceso se le asigna un tiempo de CPU, llamado *quantum*. Cuando el tiempo de CPU supere el quantum, se manda a la cola de preparados. Cuando no hay nadie en ejecución se coge otro proceso de la cola de preparados. Esto puede aumentar el tiempo medio de espera, pero permite repartir equitativamente el tiempo de CPU de todos los procesos, lo que resulta en una mejor experiencia de usuario.