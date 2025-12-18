
# Definiciones de "errores"

- Defecto (fault): Condición anómala, error de diseño
- Error: Manifestación de un defecto, el estado previsto difiere del actual
- Fallo (failure): Incapacidad de llevar a cabo las funciones para las que está diseñado un elemento

Los defectos llevan a errores si no se detectan y tratan, que llevan a fallos cuando no hay redundancia.

# Tolerancia a fallos

La tolerancia a fallos es la capacidad de un sistema de funcionar aunque haya cierta cantidad de fallos, sin afectar notablemente a la experiencia de usuario, y se suele conseguir mediante replicación.

Un servicio correctamente diseñado es tolerante a fallos suyos y de los otros servicios de los que dependa.

# Partición

Una partición es cuando un grupo de nodos queda aislado del resto del sistema. Esto nos permite aislar nodos que estén dando problemas. Hay dos formas de llevar a cabo el particionado:
1. En un sistema particionable, cada uno de los grupos aislados puede continuar con su trabajo, y hará falta algún protocolo de reconciliación para que puedan volver a prestar servicio.
2. En un modelo de partición primaria, sólo continua el grupo que tenga la mayoría de nodos. Por tanto, es más volátil, pero más fácil de implementar.

# Replicación

La replicación se usa para asegurar la disponibilidad de un componente. Tiene las siguientes características:
- Cada réplica debe estar en una máquina física distinta.
- Las máquinas no deben depender de una sola fuente de fallos. En la práctica, implica usar cosas como un SAI para evitar que se apaguen si se corta el suministro temporalmente.
- Las réplicas tienen que funcionar igual aunque una de ellas falle, las operaciones en curso en la réplica fallida serán completadas por las demás.
- Las réplicas activas se usan como base para restaurar las caídas.
- Las operaciones de lectura se pueden hacer en cualquier réplica, pero las de escritura se deben aplicar en todas las réplicas.

## Modelos de replicación

Si la operación de escritura es breve, puede ser ejecutada en todas las replican inmediatamente sin mucho coste. Si por el contrario la operación de escritura es costosa, pero modifica pocos datos, interesará más ejecutarla en una sola réplica y propagar las modificaciones al resto.

La forma de decidir sobre qué réplica se escribe y como propagar y sincronizar los cambios entre las réplicas es lo que define el modelo de replicación a utilizar.

### Replicación pasiva

1. El cliente envía su petición a la réplica primaria, que es la misma para todos los clientes, y ésta ejecuta la operación.
2. La réplica primaria propaga las modificaciones a las secundarias
3. Tras acabar de replicar, responde al cliente.

Este modelo es fácil de implementar ya que no se necesitan algoritmos distribuidos y sólo hay que enviar mensajes a los secundarios. No hay requisitos especiales, así que se puede aplicar a cualquier sistema. Notablemente, permite que las operaciones de lectura las atiendan también los secundarios.

Sin embargo, la reconfiguración, por muy simple que sea, es costosa cuando falla la réplica primaria, lo que lleva a problemas de disponibilidad. Además, no soporta la detección de fallos bizantinos porque tenemos un sólo punto de error.

En definitiva, si tenemos tiempos de procesamientos prolongados y/o las modificaciones de las operaciones de escritura son pequeñas, elegiremos este modelo.

### Replicación activa

1. El cliente manda la petición a todas las réplicas.
2. Cada réplica procesa la operación independientemente de las demás.
3. Cada réplica va respondiendo al cliente conforme termina, y éste (normalmente) elegirá la respuesta mayoritaria.

**Sólo es posible si el servicio es determinista**, lo que limita mucho los problemas a los que se puede aplicar.

Este modelo tiene varias implicaciones.
1. Mayor gasto computacional, porque todas las réplicas participan en el cálculo a la vez.
2. Si se necesita consistencia fuerte, los algoritmos de consenso son pesados.
3. Al encadenar servicios, hay que filtrar las peticiones para evitar que el número de peticiones escale exponencialmente.

La principal ventaja es que la reconfiguración en caso de fallo es trivial, porque sencillamente no hay que hacer nada ya que cada réplica es independiente. Por supuesto, esto también implica que no hay una fase de propagación, aunque si puede haber fase de consenso.

Por tanto, se aplicará este modelo si cada petición tiene un coste computacional pequeño y/o se hacen grandes modificaciones.

# Consistencia

En entornos escalables de alta disponibilidad, no se puede tener consistencia perfecta todo el tiempo, así que sólo se exige una Consistencia Final (*eventual consistency*). Esto se define como la capacidad del sistema de que todos sus nodos converjan al mismo estado cuando deja de haber escrituras y están más ociosos.

Tampoco significa esto que se admita cualquier inconsistencia entre las réplicas, pues la Consistencia Centrada en Datos y el algoritmo utilizado definen que divergencias se permiten.

Se dividen en dos grandes grupos: Si las escrituras y lecturas permiten que la réplica mantenga el control del flujo de datos sin esperar, hablamos de modelos de consistencia rápidos, y en caso contrario, modelos de consistencia lentos.

## Modelos de consistencia lentos

### Consistencia estricta

La idea es consistencia completa en todo momento; todos los procesos saben a la hora de leer cual es la última modificación sin importar que proceso la haya hecho.

Hace muchas asunciones (no pueden suceder dos escrituras a la vez, las escrituras se propagan inmediatamente) y requiere de un reloj global capaz de etiquetar cada evento de lectura y escritura, lo que lo vuelve prácticamente imposible de implementar en el mundo real.

Tampoco tiene sentido hablar de tiempo global en un sistema distribuido en el que cada réplica se puede unir en cualquier momento.

![[Gestión de fallos - Consistencia estricta.png]]

### Consistencia secuencial

El resultado de una ejecución es el mismo que si las operaciones de todos sucedieran en algún orden secuencial entre procesos, que se ponen de acuerdo sobre en orden en el que se han hecho las escrituras.

Nótese que no propagan los valores al hacer la escritura, sólo se ponen de acuerdo en quién ha escrito antes, así que al escribir en un proceso una variable, el resto de procesos no tienen idea del nuevo valor, y sólo tienen en cuenta su valor actual.

![[Gestión de fallos - Consistencia Secuencial.png]]

### Consistencia caché

Asegura que todos los procesos ven todas las escrituras en el mismo orden preestableciendo un orden en el que pueden suceder. En el siguiente ejemplo, 1 y 3 tienen una relación *happens-before* y por tanto son secuenciales, pero podemos decidir que la escritura 4 vaya antes que estas aunque resulte haber sucedido después.

![[Gestión de fallos - Consistencia caché.png]]

### Consistencia procesador

Se da cuando se cumplen simultáneamente este modelo y el FIFO.

## Modelos de consistencia rápidos

### Consistencia causal

Hace uso de relojes lógicos para establecer relaciones del tipo *happens-before*. Cualquier operación que no tenga una relación de este tipo se puede ejecutar en cualquier orden.

![[Gestión de fallos - Consistencia causal.png]]

### Consistencia FIFO

En el modelo FIFO sólo se respeta el orden de escritura a nivel de proceso, las escrituras de diferentes procesos se intercalan con libertad.