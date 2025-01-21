
Una red eléctrica es un conjunto de **dipolos** interconectados. Ejemplos de dipolos incluyen los generadores (activos) y las resistencias (pasivos). Si los dipolos muestran un comportamiento lineal entre tensión e intensidad, se considera una **red lineal**.

Un **nudo** es una sección de la red donde se unen tres o más cables. Si dos nudos contiguos tienen el mismo potencial se pueden modelar como si fuesen el mismo nudo. Se llama **ramas** a cada una de las secciones que dividen a todos los nudos diferentes.

Por tanto, en todos los extremos de un nudo hay la misma tensión y todos los puntos de una rama tienen la misma intensidad.

![[Redes eléctricas - Nudos.png]]

Las **mallas** son "subcircuitos" cerrados dentro de un circuito con ramas y *ninguna otra malla en su interior*. Si tiene mallas en su interior, se considera un **lazo**.

![[Redes eléctricas - Malla.png]]

# Leyes de Kirchoff

**La ley de los nudos** de Kirchoff dice que la suma de las corrientes entrantes en un nudo es igual a la suma de las corrientes salientes del mismo nudo.

$$
I_{\text{entrantes}} = I_{\text{salientes}} \iff \sum I_{n} = 0
$$

**La ley de las mallas** de Kirchoff dice que la diferencia potencial entre dos puntos es igual a la suma de las caídas potenciales entre los dos puntos.

$$
V_{A} - V_{B} = \sum V_{k} \iff \sum V_{n} = 0
$$

Para resolver un circuito usando nudos, mallas y las leyes de Kirchoff, se deben identificar primero las mallas y tratar cada una de ellas como una ecuación. Para formar la ecuación se debe elegir un sentido en el que correrá hipotéticamente la corriente de la malla (en caso de que el sentido sea incorrecta, la corriente simplemente saldrá negativa). Diferentes secciones de la malla, al estar conectada con otras mallas, tendrán diferentes corrientes aunque no fuese el caso si las tratásemos como circuitos independientes, ya que habrá que sumar o restar las corrientes entrantes o salientes de un mismo nudo en otras mallas. Son estas diferencias entre corrientes lo que forman cada ecuación, que se resolverá como un sistema de ecuaciones.

![[Redes eléctricas - Cálculo Kirchoff.png]]

En caso de que haya receptores y la dirección elegida para la intensidad no sea correcta no basta invertir su dirección, ya que el valor absoluto tampoco será correcto. Por tanto, hay que volver a calcular dicha malla con la dirección correcta.

# Principio de superposición

Si hay un circuito con varios generadores, la solución del circuito es la suma algebraica de las soluciones de cada generador ideal actuando en solitario.

![[Redes eléctricas - Principio de superposición.png]]

# Teorema de Thevenin

