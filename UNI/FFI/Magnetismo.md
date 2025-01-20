
Los campos magnéticos son extremadamente similares a los eléctricos, seguimos tratando con líneas de campo con negativos y positivos que se atraen (o repelen en caso de que sean iguales). La principal diferencia es que **no puede existir un cuerpo que tenga un campo magnético únicamente positivo o negativo** (monopolo), todo cuerpo que manifiesta un campo magnético debe tener dos polos, Norte y Sur.

El campo magnético se mide en *Tesla* o *Gauss* ($1\text{ G} = 10^{4}\text{ T}$).

# Fuerza sobre una carga en movimiento

Mediante resultados experimentales, observa que cuando una carga eléctrica puntual $q$ se mueve con velocidad $\vec{v}$ dentro de un campo magnético $\vec{B}$, aparece una fuerza $\vec{F}$ sobre la carga.

$$
\vec{F} = q\vec{v} \times \vec{B}
$$
Por tanto, si $\vec{v}$ y $\vec{B}$ son paralelos, $\vec{F} = 0$. Además, si la carga es negativa, la dirección del movimiento se invierte.

![[Magnetismo - Carga puntual en movimiento.png]]

La idea principal aquí es que se puede encontrar la dirección del campo magnético buscando la dirección de $\vec{v}$ para la que $F = 0$.

# Efecto Hall

Ocurre cuando una corriente $I$ circula por un conductor dentro de un campo magnético perpendicular a $I$.

Supongamos un cuerpo tridimensional a través del cual pasa una corriente $I$ y un campo magnético $\vec{B}$ perpendicular a esta. Esto implica que los electrones se mueven con una velocidad $\vec{v}$ que va en sentido contrario a $I$, por lo que $\vec{B}$ también es perpendicular a $\vec{v}$. Por tanto, se producirá una fuerza $\vec{F}_{m}$ hacia abajo que desviará a los electrones hacia la dirección indicada por $\vec{v} \times \vec{B}$, que será necesariamente una cara diferente a la que atraviesa $I$ y a la que atraviesa $\vec{B}$. Como resultado, se produce una diferencia de carga eléctrica entre las caras que solo atraviesa el producto vectorial, en vez de entre las caras que atraviesa la corriente o el campo magnético.

![[Magnetismo - Efecto Hall 1.png]]

Por tanto, aparece un campo eléctrico *entre* estas dos caras que produce una fuerza eléctrica $\vec{F}_{e}$ en dirección contraria a $\vec{F}_{m}$, por lo que también aparece una diferencia potencial.

![[Magnetismo - Efecto Hall 2.png]]

Para las cargas que siguen la trayectoria marcada por $\vec{v}$, se cumple necesariamente que $\vec{F}_{e}$ anula a $\vec{F}_{m}$, es decir, que $F_{e} - F_{m} = 0 \iff F_{e} = F_{m}$. Además, al ser $\vec{v}$ y $\vec{B}$ perpendiculares, $|\vec{v} \times \vec{B}| = \vec{v} · \vec{B} · \cancelto{ 1 }{ \sin 90º } = v·B$. Por tanto...

$$
\begin{align}
\vec{F}_{m} = \vec{F}_{e} &= q·v·B \\
E &= v·B \\
\end{align}
$$

Además, la diferencia potencial entre estas dos caras $V_{H}$, llamada *voltaje de Hall* es igual directamente proporcional a la velocidad de los electrones, la magnitud del campo magnético y la distancia entre las dos caras cargadas.

$$
V_{H} = E·d = v·B·d = \frac{I}{n·q·S} ·B·d
$$

Este es la base del funcionamiento de los teslámetros, medidores de campo magnético.

# Fuerza en un conductor con corriente dentro de un campo magnético

En un trozo de conductor de longitud infinitesimal $dl$, el número de cargas es $n · S · dl$, siendo $n$ el la densidad de portadores de carga y $S$ la superficie de las caras de los extremos de la figura.

$$
d\vec{F} = (q\vec{v} \times \vec{B}) ·nS\, dl
$$

Al ser la corriente $I = J·S = n·q·v·S$, también se puede expresar $d\vec{F}$ en términos de la corriente.

$$
d\vec{F} = I\,d\vec{l} \times \vec{B}
$$
![[Magnetismo - Fuerza en un conductor.png]]

Por tanto, en cualquier cable conductor, la fuerza magnética es...

$$
\vec{F} = \int_{a}^{b} I \, d\vec{l}\times \vec{B} = I\int_{a}^{b} d\vec{l}\times \vec{B}
$$

Además, si el campo magnético es uniforme, se puede simplificar más aún, ya que podemos ignorar la forma del cable.

$$
\vec{F} = I\int_{a}^{b} d\vec{l} \times \vec{B} = I \, \left( \int_{a}^{b} d\vec{l} \right) \times \vec{B} = I \vec{\ell}_{ab} \times \vec{B}
$$

![[Magnetismo - Fuerza en conductor uniforme.png]]

Como podemos ignorar la forma del cable conductor, cualquier cable que empiece y acabe en el mismo punto tendrá la misma $\vec{F}$.