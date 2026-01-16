
# Definiciones de "errores"

- Defecto (fault): Condición anómala, error de diseño
- Error: Manifestación de un Defecto, el estado previsto difiere del actual.
- Fallo (failure): Incapacidad de llevar a cabo las funciones para las que está diseñado un elemento, por culpa de un Error.

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

Si la operación de escritura es breve, puede ser ejecutada en todas las réplicas inmediatamente sin mucho coste. Si por el contrario la operación de escritura es costosa, pero modifica pocos datos, interesará más ejecutarla en una sola réplica y propagar las modificaciones al resto.

La forma de decidir sobre qué réplica se escribe y como propagar y sincronizar los cambios entre las réplicas es lo que define el modelo de replicación a utilizar.

### Replicación pasiva

1. El cliente envía su petición a la réplica primaria, que es la misma para todos los clientes, y ésta ejecuta la operación.
2. La réplica primaria propaga las modificaciones a las secundarias
3. Tras acabar de replicar, responde al cliente.

Este modelo es fácil de implementar ya que no se necesitan algoritmos distribuidos y sólo hay que enviar mensajes a los secundarios. No hay requisitos especiales, así que se puede aplicar a cualquier sistema. Notablemente, permite que las operaciones de lectura las atiendan también los secundarios.

Sin embargo, la reconfiguración, por muy simple que sea, es costosa cuando falla la réplica primaria, lo que lleva a problemas de disponibilidad. Además, **no soporta la detección de fallos bizantinos** porque tenemos un sólo punto de error.

En definitiva, si tenemos tiempos de procesamiento prolongados y/o las modificaciones de las operaciones de escritura son pequeñas, elegiremos este modelo.

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

Tenemos dos clases de consistencia:
- **Centrada en datos**
    - Entre los procesos que replican la información, normalmente los servidores.
    - Se refiere al estado del servidor cuando se **envía** la respuesta. Para cuando el cliente la reciba el estado en el servidor ya podrá haber cambiado y haber dejado de ser consistente.
    - *Asumimos este tipo de consistencia*
- **Centrada en usuario**
    - Se refiere al estado observado por un cliente determinado, el cual ha podido acceder a diferentes servidores.
    - Cuenta con 4 garantías:
        - *Read your writes*
        - *Monotonic reads*
        - *Writes follow reads*
        - *Monotonic writes*

En entornos escalables de alta disponibilidad, no se puede tener consistencia perfecta todo el tiempo, así que sólo se exige una Consistencia Final (*eventual consistency*). Esto se define como la capacidad del sistema de que todos sus nodos converjan al mismo estado cuando deja de haber escrituras y están más ociosos.

Tampoco significa esto que se admita cualquier inconsistencia entre las réplicas, pues la Consistencia Centrada en Datos y el algoritmo utilizado definen que divergencias se permiten.

Se dividen en dos grandes grupos: Si las escrituras y lecturas permiten que la réplica mantenga el control del flujo de datos sin esperar, hablamos de modelos de consistencia rápidos, y en caso contrario, modelos de consistencia lentos.

## Notación para las ejecuciones

En la notación tradicional las lecturas se denotan como $R(\text{variable})\ \text{valor}$ (la lectura sobre la variable devuelve valor) y las escrituras como $W(\text{variable})\ \text{valor}$ (se escribe valor sobre la variable), pero el problema es que no hay forma de representar cuando dicho valor ha llegado a los demás procesos.

![[Gestión de fallos - notación tradicional.png]]

También utilizaremos una nueva notación en la que el significado de $R$ pasa de ser "lectura" a ser "recibe", de modo que $R(\text{variable})\ \text{valor}$ se usa cuando queremos decir que un proceso ha recibido el nuevo valor para la variable.

Así sabemos que valor tendrá cualquier lectura que se produzca en el diagrama, así que podemos representar las lecturas mediante un punto sin más.

![[Gestión de fallos - notación propuesta.png]]

Con el ejemplo de la figura anterior, sabemos que se usa consistencia estricta porque las lecturas (puntos azules) se producen después de que el proceso que las hace sea notificado del último cambio de valor hecho.
## Modelos de consistencia lentos

Los modelos de consistencia lentos son aquellos en los que un proceso que necesita de algoritmos de consenso para decidir si puede devolver el valor que ha calculado al proceso que lo ha invocado.

![[Gestión de fallos - modelo lento 1.png]]
![[Gestión de fallos - modelo lento 2.png]]


> [!important] Todos los modelos lentos son **más** consistentes que la consistencia eventual.


### Consistencia estricta

La consistencia estricta consiste en que todos los procesos siempre saben cuál es el último valor modificado para cada variable antes de leerlo. Dicho de otro modo, sólo es estricta si cada vez que un proceso hace una lectura de una variable, obtiene su valor más reciente.

Este tipo de consistencia es la más fuerte, pues es equivalente a la proporcionada por una máquina no replicada.

Hace muchas asunciones (no pueden suceder dos escrituras a la vez y que las escrituras se propagan inmediatamente) y requiere de un reloj global capaz de etiquetar cada evento de lectura y escritura, lo que lo vuelve prácticamente imposible de implementar en el mundo real sin volverlo exageradamente lento (se usan difusiones de orden total para las lecturas y escrituras).

Tampoco tiene sentido hablar de tiempo global en un sistema distribuido en el que cada réplica se puede unir en cualquier moment.

![[Gestión de fallos - Consistencia estricta.png]]

### Consistencia secuencial

La consistencia secuencial exige que todos los procesos observen la misma secuencia de valores para todas las variables.

El resultado de una ejecución es el mismo que si las operaciones de todos sucedieran en algún orden secuencial entre procesos, y estos se pusieran de acuerdo sobre el orden en el que se han hecho las escrituras.

Nótese que cada proceso puede avanzar a su ritmo, siempre y cuando la secuencia de valores sea la misma, aunque este orden no coincida con el orden real de las escrituras.

![[Gestión de fallos - Consistencia Secuencial.png]]

En la figura anterior, tenemos que  $P_{1}:W(x)1$ y $P_{2}:W(x)3$. A pesar de que se escribe el 1 antes que el 3, todos los procesos que están haciendo lecturas están de acuerdo con que el valor de $x$ primero es 3, y luego es 1.

> [!info] Aunque el $P_{2}$ no lee el 3, se asume que lo ha leído porque es él quien lo escribe.

El motivo por el que el hilo 4 puede leer $R(x)2$ antes incluso de que se haga escritura correspondiente, es que en la implementación de este algoritmo $W(x)v$ indica cuando se **finaliza** la escritura, pero ésta debe propagarse antes.

Por tanto, las lecturas no es necesario difundirlas y se efectúan inmediatamente, pero las lecturas necesitan de difusión de orden total.

### Consistencia caché

La consistencia caché requiere que las escrituras realizadas **sobre una misma variable** sean vistas en el mismo orden por todos los procesos. Además, si varias escrituras sobre una misma variable se hacen sobre el mismo proceso, esas escrituras deben propagarse en ese mismo orden.

Es similar a la secuencial, pero esa necesitaba que el orden fuese el mismo para todas las escrituras, independientemente de la variable. Esto implica que si se cumple la secuencial, también se cumple la caché.

Lo que si se permite es entremezclar la propagación de distintas variables.

![[Gestión de fallos - Consistencia caché.png]]

En la figura anterior, tras $P_{2}:W(y)3$ y $P_{2}:W(x)4$, todos los procesos están de acuerdo en que el primer valor de la secuencia de $y$ es 3, y que el primero de la secuencia de $x$ es 4, pero no tienen por qué estar de acuerdo respecto a si empieza antes $x$ o $y$.

Sí que tienen que estar de acuerdo en el orden en el que se propaga $x$ y, específicamente, todos han de estar de acuerdo en que el 1 precede al 2 porque aparecen en ese orden dentro del proceso 1.

> [!info] Al igual que en el secuencial, $W(x)v$ denota finalización de la escritura, por eso puede aparecer $P_{1}:R(x)4$ antes de $P_{2}:W(x)4$

### Consistencia procesador

Se da cuando se cumplen simultáneamente los modelos caché y FIFO.

![[Gestión de fallos - jerarquía de modelos.png]]

Es decir, es como caché pero si, en vez de que las escrituras sobre una variable en un mismo proceso se deban propagar en orden, todas las escrituras de un proceso se tienen que propagar en orden, pero permitiendo entremezclar propagaciones de otros procesos, a diferencia del secuencial.
## Modelos de consistencia rápidos

Son aquellos en los que el proceso que ejecuta la operación que no necesita interactuar con otros procesos antes de retornar el control a aquel que lo ha invocado.

Para las escrituras, implica que se propagará el valor a los demás procesos posteriormente y ya verán ellos lo que hacen.

Para las escrituras, implica que se puede devolver el valor local al invocador inmediatamente sin necesidad de coordinarnos con otros procesos.

![[Gestión de fallos - modelo rápido 1.png]]
![[Gestión de fallos - modelo rápido 2.png]]


> [!important] Todos los modelos rápidos son **menos** consistentes que la consistencia eventual

### Consistencia causal

Hace uso de relojes lógicos para establecer relaciones del tipo *happens-before*. Cualquier operación que no tenga una relación de este tipo se puede ejecutar en cualquier orden.

![[Gestión de fallos - Consistencia causal.png]]

 En la figura anterior, hay que garantizar que $P_{2} : W(x)3$ se propague después de $P_{1}:W(x)1$ porque el proceso 2 resulta haber leído la escritura hecha por el proceso 1 antes hacer su escritura, pero hay que garantizar que $P_{2}:W(x)3$ se propague antes de $P_{1}:W(x)2$.

Es por esto por lo que el $P_{1}:R(x)3$ es válido. Se entiende que el proceso 2 simplemente es más lento enviando escrituras que el proceso 1.

### Consistencia FIFO

En el modelo FIFO sólo se respeta el orden de escritura a nivel de proceso, las escrituras de diferentes procesos se intercalan con libertad en el proceso que las lee.

Es decir, si tenemos las escrituras $P_{1}:W(x)1,\,P_{1}:W(x)3,\,P_{2}(x)2,\,P_{2}(x)4$, la lectura $P_{3}:R(x)1, P_{3}:R(x)2, P_{3}:R(x)3, P_{3}:R(x)4$ sería correcta, igual que lo sería $P_{3}:R(x)2, P_{3}:R(x)1, P_{3}:R(x)3, P_{3}:R(x)4$, pero $P_{3}:R(x)3, P_{3}:R(x)2, P_{3}:R(x)1, P_{3}:R(x)4$ no lo sería porque se habría recibido $P_{1}:W(x)3$ antes que $P_{1}:W(x)1$, y ese no es el orden en el que se ha enviado.

Como ejemplo más complejo, tenemos el siguiente:
![[Gestión de fallos - consitencia fifo.png]]

Es un modelo rápido de implantar y no produce bloqueos, pero ofrece una consistencia muy débil.