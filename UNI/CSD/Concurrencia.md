
# Hoare vs Lampson-Redell

En Hoare el hilo en ejecución (el que hace el `notify`) se mete en una cola especial, y un hilo que estaba esperando pasa a ejecutarse. Por tanto, el estado cuando se ejecuta el notify y cuando se despierta el hilo es el mismo.

En Lampson-Redell, cuando el hilo en ejecución ejecuta el `notify` sigue ejecutándose, pero el hilo en la cola de espera asociada pasa a la cola de entrada al monitor. Como el estado puede cambiar antes de que el hilo que ha sido notificado puede haber vuelto a cambiar (ya sea por el hilo actualmente en ejecución, o por otro hilo que se le haya adelantado en la cola de espera), la condición que hizo que se notificase dicho hilo ya no tiene por qué cumplirse, así que ha de reevaluarse la condición.

# Monitores en Java

En Java, las propias clases hacen las veces de monitor, y en vez de tener múltiples variables condición hay una sola, que es el propio objeto `this`.

# Condiciones de Coffman

Son una lista de condiciones que, si ha habido interbloqueo, se han dado todas. Por tanto, **si se dan todas hay riesgo de interbloqueo**.

- Exclusión mutua
- Retención y espera
- No explusión
- Espera circular

Si hay espera circular, hay que buscar un proceso que no esté esperando a ningún recurso. En ese caso, hay que asumir que acaba y libera los recursos que posee. Hay que seguir haciendo esto hasta que se llegue a un caso en el que no haya nadie esperando recursos, haciendo que no se cumpla retención y espera y por tanto evitando interbloqueos.

# Soluciones al interbloqueo

- Prevención: Diseñar un sistema que rompa alguna condición de Coffman
- Evitación: Hacer un GAR y denegar cualquier solicitud que provocase un ciclo.
- Detección y recuperación: Se monitoriza el sistema periódicamente y se aborta la actividad involucrada
- Ignorar el problema

## Prevención

- Exclusión mutua: Normalmente es inherente al problema y no se puede romper. Se ignora.
- Retención y espera
    - Se pide inicialmente lo que se vaya a necesitar, y solo se actua una vez se obtiene. Soltarlo cuando se acabe. (o todo o nada)
    - Pedir de forma no bloqueante (tryLock).
    - Inanición de hilos. Si un hilo se queda mucho tiempo esperando, se aborta.
- No expulsión: Permitir la expulsión con, por ejemplo, prioridades. Puede causar un *livelock*, es decir, dos recursos pueden expropiarse constantemente un recurso sin llegar a hacer nada con el.
- Espera circular: Establecer un orden solicitud.

### Espera circular

Romper la simetría impide que se se de una espera circular. Si hay uno o varios que no sigan el mismo orden, se queda bloqueado antes de recibir un recurso que quiere otro, impidiendo interbloqueos.

## Evitación

Consiste en detectar si una tarea va a producir un interbloqueo justo antes de lanzarla, y gestionar la excepción en caso de que lo haga.

# Inconvenientes de las primitivas de sincronización de java

- Hay una única variable condición (ergo, una única cola en la que esperan los procesos del monitor).
- Java usa Lampson-Redell, lo que obliga a usar estructuras del tipo `while (expresión lógica) wait();`
- No hay forma de saber si el monitor está ocupado antes de entrar en él. Puede dar lugar a interbloqueos en el caso de los 5 filósofos comensales.
- No se puede establecer un tiempo máximo de espera al solicitar entrada al monitor. Se pueden ir colando otros hilos.
- Las herramientas que garantizas la exclusión mutua están orientadas a bloques, no se puede cerrar y abrir libremente.
- No se puede extender la semántica, por lo que la exclusión mutua entre Lectores y Escritores es mutua entre todos y no puede no haber exclusión mutua entre lectores.

# Locks

Los locks de `java.util.concurrent.locks` dan clases e interfaces para la  gestión de múltiples locks.

- Permite especificar como se gestiona la cola
- Diferentes tipos de locks
- `tryLock()` no suspende al invocador si el lock ya ha sido cerrado por otro hilo, por lo que no es necesario quedarse esperando. Con esto se puede romper la condición Coffman de retención y espera.

## Condition

Condition es una interfaz que define una variable condición.

Da acceso a los métodos...
- `await`, equivalente a `wait`
- `signal`, equivalente a `notify`
- `signalAll`, equivalente a `notifyAll`

Los métodos no se llaman igual a los que se heredan de `Object` con tal de dar acceso a ambos.

Para crear objetos `Condition` se usa `lock.newCondition()`, donde `lock` es una instancia de una clase que implemente la interfaz `Lock`.

Con estos objetos ya no es necesario despertar a todos los hilos con `signalAll`, ya que podemos tener una cola para cada caso y despertar sólo a los de la cola adecuada, lo que además es más eficiente que usar `notifyAll`, como se debía hacer con las primitivas en Java.

## ReentrantLock

Implementa un lock reentrante, en el que si un hilo cierra el lock y el mismo hilo vuelve a tratar de cerrarlo no se queda esperando. Los locks "tienen dueño".

Resuelve limitaciones de las sentencias y métodos *synchronized*, ya que permite...
- Solicitar un plazo máximo de espera (`tryLock()`).
- Definir diferentes variables condición (`newCondition()`).
- Abrir y cerrar locks en diferentes secciones de código y métodos (`lock()`, `unlock()`).
- Interrumpir a los hilos que intentan adquirir un lock con `interrupt()`.
- Establecer el parámetro *fairness* que hace que la cola de espera siga un algoritmo FIFO.

Hay dos `tryLock`, uno que no recibe argumentos y sale inmediatamente si no está libre el lock, y uno que recibe una magnitud y una unidad de tiempo, que espera a que el lock se libere sólo durante el tiempo especificado. Este último puede ser interrumpido.

Los locks deberían utilizarse protegiendo la sección crítica con `lock.lock()`, y envolviendo la sección crítica en un *try-finally*, donde se hará `lock.unlock()` en el finally para asegurar que el lock se libera.

# Colecciones concurrentes

Versiones (tanto interfaces como implementaciones) thread-safe de colecciones como `HashMap`, `List`, `Queue` y demás, proveídas por `java.util.concurrent`.

Las interfaces extienden las ya existentes en Java, pero provee de métodos equivalentes que sí deben ser thread-safe. Las implementaciones hacen uso de los métodos "normales" de dichas estructuras, así que para evitar condiciones de carrera se deben usar los métodos thread-safe. Por ejemplo, en una Lista concurrente se debería usar `put(E element)` en vez de `add(E element)`, ya que el último añade sin exclusión mutua.

# Variables atómicas

Una serie de clases del paquete `java.util.concurrent.atomic` que da versiones Thread-safe de tipos de datos comunes sin hacer uso de Locks. También incluye métodos que hacen las veces de los operadores que se podrían usar con los tipos de datos equivalentes.

Existen, entre otros:
- `AtomicBoolean`
- `AtomicInteger`
- `AtomicLong`
- `AtomicLongArray`
- `AtomicReference<T>`

Nótese que por mucho que se pueda acceder y modificar estas variables con exclusión mutua, no es suficiente para sustituir otros métodos (como los Locks), ya que no se puede asegurar exclusión mutua para accesos y modificaciones a múltiples variables a la vez.

# Semaphore

El semáforo se "cierra" con `acquire` y se "abre" con `release`, pero no hace falta cerrarlo antes de abrirlo.

Se establece un valor inicial que servirá para...
- `> 0`, limitar cuantos hilos puede haber en ejecución en una sección crítica.
- `<= 0`, forzar a que un hilo vaya después que otro/s.

Nótese que, a diferencia de C, en Java los semáforos **si pueden tener valores negativos**. Otra diferencia con C los métodos `acquire` y `release` pueden recibir el número de llamadas a las que equivale, de modo que `acquire(2)` es igual a `acquire(); acquire();`.

También tiene versiones no interrumpibles de éstos métodos, así como un `tryAcquire()` que evita que el hilo se suspenda.

# CyclicBarrier

Hace las veces de válvula: Hasta que no llegue cierto número de hilos no se abre, y una vez se abre entran todos. No pueden pasar hilos nuevos hasta que se vayan todos y se vuelva a abrir la barrera.

En su constructor se puede definir una tarea a hacer una vez se "derribe" la barrera. La hace sólo el último hilo en esperar.

También, su método `await` acepta opcionalmente un timeout, tras el cual la barrera se abre automáticamente aunque no todos los hilos hayan llegado. En este caso lanza una `BrokenBarrierException` a los otros hilos.

# CountDownLatch

Hace las veces de cuenta atrás antes de un pistoletazo de salida a todos los hilos que están esperando. Similar a la `CyclicBarrier`, pero sólo se puede abrir una vez.

Un número indefinido de hilos se queda esperando conforme hacen llamadas a `await`, y una vez su contador alcanza 0 (mediante `countDown()`), se despiertan a la vez. Decrementar el contador no duerme al hilo que lo hace.