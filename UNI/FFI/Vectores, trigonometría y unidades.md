
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