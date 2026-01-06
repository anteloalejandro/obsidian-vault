
# *Clustering* particional

El *clustering* es otra forma de referirse al aprendizaje no supervisado, y el *clustering* no particional es uno de los métodos más comunes.

Partimos de una **función criterio** $J$ que evalúa la calidad de cualquier partición $\Pi$ de $N$ datos en $C$ *clusters* o agrupaciones:

$$
J\left( \Pi \right) : \Pi = \{ X_{1}, \dots, X_{C} \}
$$

La resolución del problema del *clustering* se aproxima sacando el valor de $\Pi$ para el cual $J\left( \Pi \right)$ es mínimo:

$$
\Pi^{*} = \underset{\Pi}{\text{argmin}}\ J(\Pi)
$$

Concretamente, nuestra función $J$ será la **Suma de Errores Cuadráticos** o SEC, que es la suma de las distorsiones del *cluster* $J_{c}$, que a su vez es la suma del cuadrado de la resta entre cada elemento $x \in X_{c}$ y la media o **centroide** del *cluster* $m_{c}$, siendo $n_{c}$ la talla de éste.

$$
J(\Pi) = \sum_{c=1}^{C} J_{c}, \quad J_{c}  =\sum_{x \in X_{c}}\left| x - m_{c} \right|^{2}, \quad m_{c} = \frac{1}{n_{c}}\sum_{x \in X_{c}}x
$$

La base de este criterio es que se asume que cada cluster puede ser representado por un solo punto, en este caso $m_{c}$, y el resto de puntos versiones distorsionadas de éste.

En un plano de dos dimensiones, los clusters se representan de la siguiente forma, donde los $\circ$ representan las muestras $x$ y los $\bullet$ son los centroides $m_{c}$ de clusters formados por los $\circ$ a los que están unidos.

# Algoritmo c-medias

Dada una partición $\Pi = \{ X_{1} , \dots , X_{n} \}$, el incremento de la SEC a causa de mover un dato $x$ del cluster $X_{i}$ al $X_{j}$, siendo $n_{c}$ la talla del cluster $X_{c}$ antes de mover la muestra, es igual a:

$$
\Delta J = \frac{n_{j}}{n_{j} + 1} \left| x - m_{j} \right|^{2} - \frac{n_{i}}{n_{i}-1} \left| x - m_{i} \right|^{2}
$$

Dado que la $J$ mide **errores**, sólo consideraremos que una modificación será beneficiosa si $\Delta J < 0$.

El algoritmo de c-medias (versión de Duda y Hart) consiste simplemente en:
1. Encontrar un cluster $X_{j^{*}} : j^{*} = \underset{j}{\text{argmin}}\ \Delta J$ al que transferir $x \in X_{i}$. Alternativamente, podemos coger el primero que encontremos que de lugar a $\Delta J<0$.
2. Si $\Delta J < 0$, transferir $x$ a $X_{j}$ y actualizar las medias, tallas y el valor de $J$ ($J_{i+1} = J_{i} + \Delta J_{i}$).
3. Repetir paso (1) si ha habido alguna transferencia.

Si se cumple la condición de Duda y Hart, definida como $\left| x - m_{j} \right|^{2} < \left| x - m_{i} \right|^{2}$, se puede usar el algoritmo convencional:
1. Calcular las medias de los clusters
2. Reclasificar los datos según medias más cercanas

Nótese que la versión de Duda y Hart siempre garantiza un mínimo local, la versión convencional sólo lo garantiza si se cumple la condición de Duda y Hart pero se puede usar igualmente, y ninguna de las dos versiones garantiza un mínimo global para la SEC.