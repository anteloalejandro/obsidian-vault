

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

# Campos generados por distribuciones continuas

Según el tipo de distribución de cuerpo, se usa un valor diferente para el diferencial de la carga puntual $q$, donde $\lambda$, $\sigma$ y $\rho$ son la carga uniforme por todo el cuerpo según si es una figura en una, dos o tres dimensiones.

$$
\begin{align}
dq &= \lambda dl & [\lambda] &= \pu{ C/m } \\
dq &= \sigma ds  & [\sigma] &= \pu{ C/m2 } \\
dq &= \rho dV  & [\rho] &= \pu{ C/m3 }
\end{align}
$$

Además, el diferencial del campo eléctrico es la fuerza electrostática por el diferencial de carga.

$$
d\vec{E} = dq\vec{F}
$$

## Cálculo del campo eléctrico de varilla con $\lambda$ cte.

Dada una varilla cargada, calcularemos el campo eléctrico en un punto de la varilla, que está a una distancia (dibujando una línea ortogonal) $R$.

El diferencial de carga $dq$ será la carga de una sección infinitesimal de dicha varilla. Como tal, se puede tratar como un punto, y se puede dibujar una línea desde $dq$ al punto en $R$, que nos informará de en que dirección irá el $d\vec{E}$ producido por $dq$ desde el punto de vista del punto. 

![[Pasted image 20241027020033.png]]

Dado que $dq$ la carga de una sección infinitesimal arbitraria de la varilla, no bastará con calcular el $d\vec{E}$ para un sólo valor de $dq$ para obtener el campo eléctrico sobre el punto, sino que habrá que hacer la suma de todos los posibles $d\vec{E}$. Es decir, integraremos $d\vec{E}$ para obtener $\vec{E}$.

$$
\vec{E} = \int d\vec{E}
$$
De momento, cojamos sólo la componente $x$ de $\vec{E} = (E_{x}, E_{y})$

$$
E_{x} = \int |d\vec{E}| \cos \theta = \int dE \cos \theta
$$
![[Pasted image 20241027021127.png]]

Al ser la varilla ortogonal a $E_{x}$, sabemos que $dq = \lambda dl = \lambda dy$, que no es lo mismo que $dr$ o $d\vec{E}$ porque estas podrían no ser ortogonales.

$$
\begin{align}
E_{x} &= \int \frac{1}{4\pi\varepsilon_{0}r^{2}} ·\cos \theta· dq = \int \frac{\lambda dy}{4\pi\varepsilon_{0}r^{2}} · \cos \theta
\end{align}
$$

El problema es que en principio ahora hay tres variables que importan a la hora de integrar: $y,r,\theta$ (nótese que $R$ es cte). Por suerte, las tres variables son dependientes; modificar una modifica todas las demás.

Por convenio, vamos a escoger siempre usar el ángulo $\theta$ como punto de referencia. Es importante recordar que la derivada del coseno es la inversa del cuadrado del coseno.
$$
\frac{d}{d\theta}(\tan \theta) = \frac {1}{\cos ^{2}\theta} d\theta
$$

Siendo $r$ la distancia del punto $(0, y)$ hasta el punto $(R, 0)$, por lo que $r$ es la hipotenusa del triángulo que tiene como catetos a $y$ y $R$.

$$
\begin{align}
R = r·\cos \theta \iff r &= \frac{R}{\cos \theta} \\
y = r · \sin \theta = R· \frac{\cos \theta}{\sin \theta} = R · \tan \theta \iff dy &= \frac{R}{\cos ^{2}\theta} d\theta
\end{align}
$$

Ahora que ya tenemos todas las variables en términos de $\theta$, se puede calcular la componente $x$ del campo eléctrico.

$$
\begin{align}
E_{x} &= \int_{\theta_{min}}^{\theta_{max}} \frac{\lambda}{4\pi\varepsilon_{0}}· \left(\frac{R}{\cos \theta}\right)^{-2} · \frac{R}{\cos ^{2}\theta} · \cos \theta · d\theta \\
&= \frac{\lambda}{4 \pi \varepsilon_{0}} \int_{\theta_{min}}^{\theta_{max}} \frac{1}{R} ·\cos \theta \, d\theta = \frac{\lambda}{4\pi\varepsilon_{0}R} \int_{\theta_{min}}^{\theta_{max}} \cos \theta \, \theta \\
E_{x} &= \frac{\lambda}{4\pi\varepsilon_{0}R} \left[\sin \theta \right]^{\theta_{max}}_{\theta_{min}} = \frac{\lambda}{4\pi\varepsilon_{0}R} (\sin \theta_{max} - \sin \theta_{min})
\end{align}
$$

Si modelamos la varilla como una varilla de longitud infinita, los ángulos máximos y mínimos serían infinitamente cercanos a $\theta_{max} = 90º$ y $\theta_{min} = -90º$, así que los senos darían $1-(-1) = 2$.

$$
E_{x} = \frac{\lambda}{2\pi\varepsilon_{0}R}
$$

Se aquí se puede extrapolar $E_{y}$ cambiando los senos por cosenos y a partir de ahí se puede sacar $E_{x}$.

# Pie de página

[^1]: [[Condensadores#Capacidad]]
[^2]: [[Campo conservativo]]