# Llamadas al sistema


## POSIX

Portable Operating System Interface

# Controlador vs Manejador

# Estados

Acceso a E/S -> Suspendido
Tabla de recursos creada **pero no cargada en memoria** -> Nuevo

# Procesos

Fork copia la imagen de memoria de un proceso a otro proceso nuevo.
Exec carga la imagen de memoria de un programa del disco, por lo que todo lo que haya después de él no se ejecutará (a no ser que falle), por lo que habrá de usarse junto a procesos hijos.

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

# Hilos

Los hilos de ejecución cumplen una función similar a los procesos hijos, pero son más ergonómicos. En lugar de ser padres e hijos, todos son más bien como hermanos, están en igualdad de condiciones. También se les denominan procesos ligeros y si el sistema operativo no tiene soporte multihilo se les trata como procesos.

Tienen la función adicional de poder sincronizar sus datos, y comparten las variables globales a diferencia de los procesos hijos.

## El problema del productor/consumidor


- Wikipedia https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem



# Gestión de procesos

## Acceso a sección crítica

Los protocolos de acceso a secciones críticas, es decir, las secciones que pueden causar condiciones carrera, deben cumplir 3 cosas:

- Exclusión mutua: Sólo puede haber un proceso cada vez en la sección crítica.
- Progreso: Si ningún proceso está en sección crítica y hay otros que quieren entrar, la decisión de qué proceso debe entrar ha de ser **finita** y **depender sólo de los procesos que quieren entrar**.
- Espera limitada: El tiempo de espera de un proceso a la hora de entrar debe ser finito, es decir, todos los procesos que lo requieran deben poder entrar eventualmente.

A través de software, se puede solucionar el problema con código a nivel de usuario a través del Algoritmo de Dekker.

### Soluciones software

```c
void *hilo(void *p) {
  while (1) {
    while (llave == 1)
      ;
    llave = 1;
    /*SECCIÓN CRÍTICA*/
    llave = 0;
    /*SECCIÓN RESTANTE*/
  }
}
```

| t   | A                                                             | B                                   |
| --- | ------------------------------------------------------------- | ----------------------------------- |
| i   | termina SECCIÓN CRÍTICA, llave = 0                            | llave = 1 → espera a que A acabe    |
| i+2 | ejecuta SECCIÓN RESTANTE                                      | llave = 0 → empieza SECCIÓN CRÍTICA |
| i+3 | A vuelve a entrar, llave = 0, así que empieza SECCIÓN CRÍTICA | sigue en SECCIÓN CRÍTICA            |
Se da el caso de que puede haber dos hilos en la sección crítica a la vez

*Algoritmo de dekker*
```c
void *hilo_I(void *p) {
  while (1) {
    while (llave != I)
      ;
    llave = I;
    /*SECCIÓN CRÍTICA*/
    llave = J;
    /*SECCIÓN RESTANTE*/
  }
}
void *hilo_J(void *p) {
  while (1) {
    while (llave != J)
      ;
    llave = J;
    /*SECCIÓN CRÍTICA*/
    llave = I;
    /*SECCIÓN RESTANTE*/
  }
}
```

En esta solución, cada hilo tiene su código própio, lo que arregla el problema anterior, pero no cumple la regla de progreso porque la entrada del resto de hilos depende del hilo que está ejecutando la sección crítica, no de los hilos que quieren entrar.

### Soluciones hardware

Si se tiene acceso a ellas, que generalmente solo se tiene en modo privilegiado, se puede hacer uso de las instrucciones DI (disable interrupts) y EI (disable interrupts) para excluir al resto de hilos de ejecutar ciertas secciones de código. Sin embargo, está solución es muy poco eficiente.

Se puede usar, en caso de estar disponible, la instrucción atómica del procesador`test_and_set` para asignar variables en una sola instrucción sin interrupciones, pero sigue estando limitado a asignaciones individuales. Gracias a la instrucción `test_and_set` se puede usar la solución de la llave sin que haya problemas, pero no cumple la regla de espera limitada porque nadie puede quitarle acceso al proceso que está en posesión de la llave.

### Espera activa y pasiva (polling)

Las instrucciones tipo `test-and-set` son de **espera activa**: El protocolo de entrada impide que el proceso entre en su sección crítica, pero al hacer uso de un bucle vacío, consume tiempo de CPU. Además, el planificador no puede saber si ese tiempo de CPU va a ser aprovechado por un proceso en espera o por el proceso que está en marcha, y todos los turnos que le de al proceso en espera están desaprovechados.

Una solución es el abandono voluntario de la CPU por parte del hilo en espera, a través de funciones como `usleep` o `pthread_yield`, pues su implementación no hace uso de espera activa.

Otra solución es el de las colas gestionadas por eventos. El sistema operativo ofrece objetos en los que un proceso se puede suspender hasta que otro despierte: los semáforos y los *mutex*.

### Productor consumidor

En el problema del productor-consumidor, si el array está lleno y el planificador le da el turno al productor antes que al consumidor, el productor cogerá la llave y se quedará en un bucle infinito sin devolverla. <small>¿Qué regla se incumple aquí?</small>