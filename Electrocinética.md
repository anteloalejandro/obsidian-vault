
Sinónimo de corriente continua o alterna. En electroestática se estudia como los cuerpos llegan a un equilibrio, en electrocinética se estudia como se comportan al **sustentar un estado de desequilibrio**, generalmente una pila o batería.

Una diferencia clave es mientras que en electroestática los conductores tienen un campo eléctrico por dentro de 0 en todos los puntos, en electrocinética el campo eléctrico sigue la dirección de la corriente.

# Corriente

$$
I = \frac{dq}{dt}
$$

La corriente es la medida de las cargas (electrones) que pasan por unidad de tiempo por un punto, y se mide en Amperios, $A$.

En electrocinética generalmente modelamos la corriente $I$ como el **flujo de cargas positivas**, es decir, va en dirección opuesta a donde va la carga real, los electrones.

## La densidad de corriente

La densidad de corriente es la cantidad de corriente que pasa por una superficie, y se mide en $\pu{ A/m2 }$.

$$
\begin{gather}
I = \int \vec{J} \, \vec{ds} \iff dI = \vec{J} · \vec{ds} = \underbrace{ |\vec{J}|·|\vec{ds}|·\cos \theta }_{ \text{Por ser producto escalar} } \\
\Downarrow \\
|\vec{J}| = \frac{dI}{\underbrace{ |\vec{dS}_{\perp}| }_{ |\vec{dS}|·\cos \theta }}
\end{gather}
$$

Alternativamente, se puede entender la densidad de corriente como el producto de la densidad de carga por la velocidad a la que va dicha carga.

$$
\begin{gather}
\vec{J} = \rho_{q} ·\vec{v} = \mathrm{\frac{carga}{volumen}} · \vec{v} = \frac{N·e}{\text{volumen}}·\vec{v} = n·e·\vec{v} \\
N \text{ es el número de electrones, cada uno con carga } e \text{. } \\
n \text{ es } \frac{N}{\text{volumen}} \text{.}
\end{gather}
$$

# Ley de Ohm

Al aplicar una fuerza sobre un cuerpo, este sufre una aceleración, $\vec{F} = m·\vec{a}$. Sin embargo, al aplicar esta fuerza a un cuerpo que existe en un medio, el medio siempre ejerce algún tipo de resistencia al movimiento que transforma parte de la energía gastada y aumenta conforme aumenta la fuerza, como la fricción, hasta que se llega a un equilibrio denominado velocidad terminal.

Con los electrones pasa algo similar, pero su masa es tan pequeña que llegan a la velocidad terminal de inmediato, por lo que podemos decir que viajan a velocidad constante.

Según el modelo de Drude, no aceleran hasta el infinito porque durante el trayecto chocan con los átomos del medio por el que están viajando, generando calor como resultado de cada choque.

Cuanto mayor es el número de cargas que pasan por un punto para un campo eléctrico dado, más conductivo es el material. A esta relación se le llama **conductividad**.

$$
\vec{J} = \sigma \vec{E} \iff \sigma=  \frac{\vec{J}}{\vec{E}}
$$

A la inversa de la conductividad, es decir, la capacidad de un medio de impedir el paso de los electrones se le llama resistividad, a la que se denota con $\rho$ y cuya unidad son los ohmios por metro, $\pu{ \Omega·m }$.

$$
\rho = \sigma ^{-1} = \frac{\vec{E}}{\vec{J}}
$$

La resistividad y la conductividad forman parte de la Ley de Ohm **microscópica**, y sólo es válida para conductores óptimos o lineales.

Desde el punto de vista práctico o macroscópico, se usa algo denominado *Resistencia*, que es la proporción entre la corriente que pasa por una sección punto y la caída de voltaje que se produce entre el principio y el final de esa sección (que a menudo se expresa simplemente como $V$ en vez de $\Delta V$). Usa $\Omega$ como unidad.

$$
R = \frac{\Delta V}{I}
$$

En resumidas cuentas, la resistividad se usa para describir la capacidad **de un material** de impedir el paso de electrones, y la resistencia la capacidad de **una configuración** de hacer lo mismo (porque la del material es insignificante).

Nótese que la ley de Ohm solo se aplica cuando las relaciones entre densidad y flujo o potencial y corriente **son lineales** o aproximaciones cuando está cerca de serlo pero no lo es.

## Identidad de $R$

Primero, recordemos que $\rho = \frac{\vec{J}}{\vec{E}}$ y $|\vec{J}| = \frac{dI}{|\vec{dS}|·\cos \theta }$, y asumamos que el conductor ya es ortogonal al flujo.

$$
\begin{align}
- \Delta V &= \int_{B}^{A} \vec{E} \, d\vec{r} = \int_{B}^{A} \rho\vec{J} \, d\vec{r} = \int_{B}^{A} \rho · |\vec{J}| · |d\vec{r}| · \cancelto{ 1 }{ \cos 0 } \\
\Delta V &= \int_{A}^{B} \rho · \frac{dI}{d\vec{S}} |d\vec{r}| = I \int_{A}^{B} \frac{\rho}{S} \, dr \\
\Delta V &= I·R \implies R = \int_{A}^{B} \frac{\rho}{S} \, dr
\end{align}
$$
Es decir, la resistencia es, esencialmente, la resistividad a lo largo de una distancia $r$, y es inversamente proporcional a el grosor ya que la $S$ es la superficie ortogonal al flujo.