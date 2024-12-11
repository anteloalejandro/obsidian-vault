
# Efecto de operaciones sobre unidades

Cojamos, por ejemplo, la fórmula del trabajo. Los vectores no afectan a las unidades, solo a la dirección. Los diferenciales, al trozos infinitesimales, también tienen la misma unidad. Sin embargo, las **derivadas e integrales si cambian la unidad**  (por ejemplo, $\int x \, dx = \frac{x^{2}}{2}$).
$$
\begin{gather}
W = \int \vec{F} d\vec{r} \\

\end{gather}
$$
# Seno y coseno como componentes de la hipotenusa
Dado un triángulo rectángulo de lado $a$, altura $b$ e hipotenusa $c$, siendo $\theta$ el ángulo entre $a$ y $c$ podemos decir que:
$$
\begin{align}
a = c·\cos \theta \\
b = c·\sin \theta
\end{align}
$$
El seno y el coseno no son más que las componentes del vector unitario de la hipotenusa. Es decir, si decimos que $\vec{u_{c}} = (\cos \theta, \sin \theta)$, sabemos que $\vec{c} = c·\vec{u_{c}} = c(\cos \theta, \sin \theta) = (a,b)$. Además, de esa misma relación se puede extraer que el vector unitario se puede calcular como $\vec{u_{c}} = \frac{\vec{c}}{c}$.

# Producto escalar

Dados dos vectores $\vec{u}$ y $\vec{v}$, el producto escalar $\vec{u} · \vec{v}$ es el producto de las magnitudes de la proyección ortogonal sobre $\vec{v}$ de $\vec{u}$, escrita $proy_{\vec{v}}\vec{u}$, y $\vec{v}$. También se puede expresar como la suma de los productos de las componentes de ambos vectores.

![[Vectores, trigonometría y unidades 2024-12-10 20.37.21.excalidraw]]
$$
\vec{u} · \vec{v} = \left| \vec{v} \right| · \left| proy_{\vec{v}}\vec{u} \right| = |\vec{v}| · |\vec{u}| · \cos \theta = u_{x}v_{x} + u_{y}v_{y} + \dots
$$

Centrándonos en la relación entre el producto vectorial y el coseno del ángulo, se puede observar que si los vectores son ortogonales, el producto vectorial será siempre 0, y si son paralelos, será siempre el producto de sus magnitudes.
$$
\begin{align}
\vec{u} \perp \vec{v} &\implies \vec{u} · \vec{v} = 0 \\
\vec{u} \parallel \vec{v} &\implies  \vec{u}·\vec{v} = |\vec{u}|·|\vec{v}|
\end{align}
$$

De ahí también se pueden extrapolar relaciones entre los vectores unitarios de los ejes.
$$
\begin{gather}
\hat{\imath}·\hat{\imath} = \hat{\jmath}·\hat{\jmath} = \hat{k}·\hat{k} = 1 \\
\hat{\imath}·\hat{\jmath} = \hat{\imath}·\hat{k} = \hat{\jmath}·\hat{k} = 0 \\
\end{gather}
$$
# Producto vectorial

Dados los vectores $\vec{u}$ y $\vec{v}$, el producto vectorial $\vec{u} \times \vec{v}$ produce un vector perpendicular al plano formado el área entre ambos vectores. Esto tiene la consecuencia de que aunque los vectores existan exclusivamente en 2 dimensiones, su producto vectorial existirá en 3 dimensiones. Además, invertir el orden de los operandos es equivalente a invertir la dirección del vector resultante.

![[Vectores, trigonometría y unidades 2024-12-10 21.33.15.excalidraw]]

Si se rota el sistema de coordenadas para que el plano formado por los vectores sea horizontal, el vector resultante irá hacia arriba en caso de que los operandos estén en el orden dado por seguir en sentido antihorario los vectores del plano.

El calculo del determinante se hace calculando el determinante de una matriz $3\times n$, donde $n$ es el número de dimensiones. La primera línea de esta matriz son los vectores unitarios de los ejes, y la segunda y tercera son las componentes del primer y el segundo vector respectivamente.

$$
\vec{u} \times \vec{v} = \begin{vmatrix}
\hat{\imath} & \hat{\jmath} & \hat{k} \\
u_{x} & u_{y} & y_{z} \\
v_{x} & v_{y} & v_{z}
\end{vmatrix} = 
\begin{align}
\hat{\imath}u_{y}v_{z} &- \hat{\imath}v_{y}u_{z} \\
u_{x}\hat{\jmath}v_{z} &- v_{x}\hat{\jmath}u_{z} \\
u_{x}v_{y}\hat{k} &- v_{x}u_{y}\hat{k}
\end{align}
$$

Además, la magnitud del producto vectorial se puede calcular como el seno del producto de las magnitudes de ambos vectores.

$$
|\vec{u} \times \vec{v}| = |\vec{u}| · |\vec{v}| · \sin \theta
$$

Hacer productos vectoriales entre los vectores unitarios de los ejes da los siguientes resultados:
$$
\begin{gather}
\hat{\imath} · \hat{\imath} = \hat{\jmath} · \hat{\jmath} = \hat{k} · \hat{k} = 0 \\
\begin{matrix}
\hat{\imath}·\hat{\jmath} = \hat{k} & \hat{\jmath} · \hat{k} = \hat{\imath} & \hat{k} · \hat{\imath} = \hat{\jmath} \\
\hat{\jmath}·\hat{\imath} = -\hat{k} & \hat{k}·\hat{\jmath}=-\hat{\imath} & \hat{\imath}·\hat{k} = -\hat{\jmath}
\end{matrix}
\end{gather}
$$

# Derivación de vectores

Para calcular la derivada de un vector $\vec{v}$ respecto a una sola variable $t$, se ha de sumar la derivada de cada componente por el vector unitario del eje correspondiente.
$$
\frac{ d }{ dt } \vec{v} = \frac{ d\vec{v} }{ dt } = \left( \frac{ dv_{x} }{ dt }  \right) \hat{\imath} + \left( \frac{dv_{y}}{dt} \right) \hat{\jmath} + \left( \frac{dv_{z}}{dt} \right) \hat{k}
$$

Si, en cambio, se quiere tomar la derivada respecto a múltiples variables, se ha de calcular una derivada parcial por cada una de las variables y sumar los resultados. El método para calcular las derivadas parciales es idéntico al usado para calcular las derivadas respecto a una sola variable.
$$
\frac{ \partial \vec{v} }{ \partial x } + \frac{ \partial \vec{v} }{ \partial y } + \frac{ \partial \vec{v} }{ \partial z } 
$$
# Integración de vectores

## Integración sobre una línea

Dado $\int_{A}^{B} \vec{v} \, d\vec{r}$, siendo $A$ y $B$ dos puntos en el espacio, si la línea $L = B-A$ es paralela a un eje, $d\vec{r}$ es la diferencial de la distancia en dicho eje.

$$
\begin{matrix}
B - A \parallel Y \implies \int_{A}^{B} \vec{v} \, d\vec{r} = \int_{A}^{B} (v_{x}\hat{\imath} + v_{y}\hat{\jmath} + v_{z}\hat{k}) \, dy\hat{\jmath}  = \int_{A_{y}}^{B_{y}} v_{y} \, dy 
\end{matrix}
$$

Por otro lado, si $\vec{v} \parallel d\vec{r}$, independientemente de $A$ o $B$, al ser 0 el ángulo, $\int_{A}^{B} \vec{v} \, d\vec{r} = \int_{A}^{B} v \, dr$.

## Integración sobre un espacio

Dado $\int_{S} \vec{v} \, d\vec{S}$, siendo $\vec{S}$ un vector normal de una superficie de magnitud $S = |\vec{S}|$, si $\vec{S}$ es paralelo a un eje, $d\vec{S}$ es igual a la magnitud de la superficie por el vector unitario de dicho eje.

$$
\vec{S} \parallel Y \implies \int_{S} \vec{v} \, d\vec{S} = \int_{S} (v_{x}\hat{\imath} + v_{y}\hat{\jmath} + v_{z}\hat{k}) \, dS\hat{\jmath} = \int_{S} v_{y} \, dS
$$
