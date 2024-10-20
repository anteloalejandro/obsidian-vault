
Un programa es el archivo binario ejecutable resultado de un proceso de compilación y enlazado. Es una entidad pasiva, su estado no cambia con el tiempo, solo a través de la intervención de un programador o usuario.

Un proceso es un **programa en ejecución** que consume recursos.

# Estados de un proceso

![[estados proceso.excalidraw|100%]]

Como puede haber múltiples procesos preparados y suspendidos, estas dos fases tienen [[Planificación de procesos|colas de procesos]] que se gestionan con algún u otro algoritmo con tal de que todos los procesos tengan algo de tiempo de CPU y que las operaciones de entrada-salida se puedan llevar a cabo concurrentemente con los procesos en ejecución. De hecho, hay varias colas de suspendido: Una para los procesos que están esperando el resultado de una [[Llamadas al sistema]] o evento, y una por cada dispositivo de entrada-salida.

# Process Context Block

Un PCB es la estructura de datos en la que el SO guarda la abstracción de un proceso. Consiste de tres grandes partes: 
- **Identificación:** contiene identificadores de grupo, usuario, proceso y proceso padre.
- **Contexto:** contiene contexto del procesador, es decir, el contador de programa, el puntero actual a la pila, los valores de los registros, etc.
- **Control:** contiene el estado del proceso, eventos en ejecución, mapa de memoria y demás.

# Procesos hijos, huérfanos y zombies

Mediante la [[Llamadas al sistema#POSIX|llamada POSIX]] `fork`, un proceso puede crear copias de si mismo denominadas **procesos hijos**, que son copias exactas del mapa de memoria de un proceso exceptuando el resultado de la propia llamada a `fork`, permitiendo así crear subrutinas concurrentes con el proceso padre.

Sin embargo, al ser concurrentes, no hay forma de saber a ciencia cierta cual de los dos procesos se va a acabar antes, si el hijo o el padre.

Cuando el padre termina antes que los hijos, se llama los últimos **procesos huérfanos**, que serán "adoptados" por el proceso `init`, el proceso padre de todos los procesos.

Si el proceso hijo termina antes que el padre, a los hijos se les denomina **procesos zombie** hasta que el padre se termine o los termine expresamente a través de una llamada `wait`. Estos procesos zombie no los gestionará el proceso `init` y seguirán gastando espacio en memoria, pues su tabla de memoria no se borra.