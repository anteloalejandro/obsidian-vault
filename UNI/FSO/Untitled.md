# Llamadas al sistema


## POSIX

Portable Operating System Interface

# Controlador vs Manejador

# Estados

Acceso a E/S -> Suspendido
Tabla de recursos creada **pero no cargada en memoria** -> Nuevo

# Procesos

Fork copia la imagen de memoria de un proceso a otro proceso nuevo.
Exec carga la imagen de memoria de un programa del disco.

~~Si el padre acaba antes que el hijo sin hacer wait, el hijo es zombie.~~
~~Si el padre acaba antes que el hijo por un error, se queda huérfano.~~

Proceso zombie: El padre se vuelve zombie si el hijo termina antes que el padre y el padre no hace wait. El padre sigue vivo, pero no hace nada.

Proceso huérfano: El proceso se queda huérfano si se termina antes que el hijo. Los procesos huérfanos son adoptados por init.

En resumen, nos interesa gestionar los zombies, porque afectan al rendimiento, pero los huérfanos los gestiona el sistema operativo.

# Señales

Son el mecanismo del sistema operativo para hacer llegar información a un proceso. Los procesos pueden hacerse cargo de gestionar la mayoría de señales como quieran.

# Planificación de procesos

## Tipos de procesos

Hay dos grandes tipos, limitados por CPU y limitados por E/S.

## Algoritmo de planificación

- No expulsivos: No pueden arrebatarle a un proceso la CPU
  - FIFO: 
  - Shortest Job First: Como FIFO pero si tienes varios a la vez escoges los más rápidos primero. Tendrías que saber cual tarda más. Esto reduce el tiempo medio de espera en cola.
- Expulsivos: El sistema operativo le arrebata el control cuando quiera
  - FILO
  - Shortest Remaining Time First: SJF expulsivo. Se evalúa el tiempo más corto cuando hay un proceso nuevo. Reduce aún más el tiempo de espera medio, pero la evaluación también toma tiempo cada vez.
  - Planificación por prioridades: Se asigna una prioridad a cada proceso y cada vez que llega un proceso se coge al de mayor prioridad.
  - Round Robin, planificación circular: A cada proceso se le asigna un tiempo de CPU, llamado *quantum*. Cuando el tiempo de CPU supere el quantum, se manda a la cola de preparados. Cuando no hay nadie en ejecución se coge otro proceso de la cola de preparados. Esto puede aumentar el tiempo medio de espera, pero permite repartir equitativamente el tiempo de CPU de todos los procesos, lo que resulta en una mejor experiencia de usuario.

Hay diferentes colas para diferentes tipos de proceso, y cada una de ellas puede utilizar un algoritmo diferente.

