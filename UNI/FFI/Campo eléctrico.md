
Es importante recordar que la derivada del coseno es la inversa del cuadrado del coseno.
$$
\frac{d}{d\theta}(\tan \theta) = \frac {1}{\cos ^{2}\theta}
$$
# Carga eléctrica

Es una propiedad fundamental de la materia, igual que lo son la masa y el volumen, cuya unidad mínima es la carga del electrón. Se mide en Culombios, $\mathrm{C}$.

$$
-\ce{ e- } = \ce{ e+ } = 1.6 · 10^{-19} \pu{C}
$$

# Ley de Coulomb

## Fuerza electrostática

Dadas dos cargas $q_{1}$ y $q_{2}$ a una distancia $r$, aparecen dos **fuerzas iguales en sentido contrario** que intentan juntar o separar las cargas.

$$
\begin{align}
|\vec{F}| = F &= K \frac{q_{1}·q_{2}}{r^{2}} \\
\vec{F} = F · \vec{u_{F}} &= K \frac{q_{1}·q_{2}}{r^{2}} \left( \cos \theta, \sin \theta \right) 
\end{align}
$$

Esta fórmula cubre la diferencia entre atracción y repulsión a través de la dirección de $\vec{u_{F}}$, ya que toda $\vec{F}_{A}$ produce una $-\vec{F}_{B}$.

Arbitrariamente, decidimos que una de las dos cargas es la que ejerce la fuerza que experimenta la otra. El vector $\vec{r}$ siempre va desde quien crea la fuerza hasta quien la experimenta y tiene la misma dirección que la fuerza, es decir, $\vec{u}_{r} = \vec{u}_{F}$.

![[fuerza electrostática.png]]

La constante $K$ es necesaria para que la fórmula de la fuerza tenga las unidades correctas, y es aproximadamente igual a $9·10^{9}$. Las unidades de la fuerza son metros partido Faradio[^1].

$$
\begin{gather}
K = \frac{1}{4\pi\varepsilon_{0}} = \pu{ 9e9 m/F } \\
\Downarrow \\
\varepsilon_{0} = \text{permitividad del vacío} = \pu{ 8.85e-12 F/m }
\end{gather}
$$

> [!info] Fuerza electrostática
> Podemos reescribir la fórmula de la fuerza electrostática expandiendo $K$
> $$
> \vec{F} = \frac{q_{1}·q_{2}}{4\pi\varepsilon r^{2}} \vec{u}_{r}
> $$
> 

## Campo eléctrico

La fuerza electrostática solo aparece cuando hay múltiples cargas, pero la carga es una propiedad de la materia que, al igual que la masa, provoca una **distorsión en el espacio** aún cuando hay una sola carga en el vacío. 

$$
\vec{E} = K \frac{q}{r^{2}} \vec{u}_{r}
$$

La distorsión tiene un efecto radial y es conservativo[^2], es decir, se puede modelar como una cantidad infinita de vectores de igual magnitud saliendo del centro, llamados **líneas de campo**.

![[campo eléctrico.png]]

Al añadir otra carga es cuando ambas experimentan la fuerza electrostática, que es igual al producto del campo eléctrico y la nueva carga. De aquí se puede deducir además las unidades del campo deben ser unidades de fuerza entre unidades de carga.

$$
\begin{gather}
\vec{F} = q · \vec{E} \iff \vec{E} = \frac{\vec{F}}{q} \\
\left[ \vec{E} \right] = \pu{ N/C } 
\end{gather}
$$

Además, también se deduce que el campo y la fuerza son iguales si $q = 1\mathrm{C}$.

### Principio de superposición

Dadas tres cargas $q_{1},q_{2},q_{3}$, el campo eléctrico en el punto $A$ es igual a la suma de los campos eléctricos, teniendo en cuenta la distancia de cada carga a $A$.

$$
\vec{E}_{A} = \sum_{i=1}^{n} \vec{E}_{i} = \sum_{i=1}^{n} \frac{q_{i}}{4\pi\varepsilon_{0}r_{i}^{2}} \vec{u}_{r_{i}}
$$
![[suma de campos.png]]

### Interacción entre líneas de campo

Cuando interactúan dos cargas, sigue habiendo dos campos eléctricos distintos, pero ambos se afectan entre ellos. Desde el punto de vista de las líneas de campo...

- **Si ambas cargas son positivas/negativas:** las líneas de campo se originan en la carga y se doblan para evitar cruzarse
- **Si una carga es positiva y la otra negativa**: las líneas de campo se originan en las cargas y se unen, formando cada par de líneas una única línea que va desde una carga hasta otra.

![[líneas de campo.png]]

Las líneas de curvan por la dependencia cuadrática que tiene el campo (y por tanto las líneas de campo) con la respecto a la carga. Por esta relación, las lineas de campo paralelas que se alejan no podrán curvarse lo suficiente para ir a la otra carga.

Generalmente se dibujan con más líneas de campo las cargas que mayor campo eléctrico producen.


![[trayectoria linea de campo.png]]

Cuando se trabaja con superficies paralelas en vez de con cargas puntuales, la trayectoria en el centro perpendicular a las superficies en el centro y se curva en los extremos.

![[línea de campo superficie.png]]

Sin embargo, si las modelamos como superficies infinitas, al no tener extremos, las líneas de campo siempre serán perpendiculares a las superficies.

# Pie de página

[^1]: [[Condensadores#Capacidad]]
[^2]: [[Campo conservativo]]