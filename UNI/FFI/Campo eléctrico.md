

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

# Trabajo

El trabajo es la energía transferida a o desde un objeto, que está formada por la fuerza aplicada a dicho objecto y un vector de dirección que indica hacia donde se hace el trabajo.

Dada una carga puntual $Q$, el campo eléctrico generado en un punto $P$ cualquiera será igual a $\vec{E} = \frac{Q}{4\pi\varepsilon_{0}r^{2}}\vec{u}_{r}$, donde $\vec{u}_{r}$ es un vector unitario de $Q$ a $P$. Si colocamos una carga $q$ en $P$ y aplicamos un desplazamiento infinitesimal $d\vec{l}$, el trabajo que hace la carga $Q$ sobre $q$ para llevar a cabo dicho desplazamiento será igual a $dW = \vec{F} · d\vec{l}$. Además, el desplazamiento está formado por dos componentes $d\vec{l} = (dr, dt) = dr·\vec{u}_{r} + dt·\vec{u}_{t}$, donde $\vec{u}_{t}$ es perpendicular a $\vec{u}_{r}$, y $dt$ a $dr$. Por tanto, el trabajo ejercido para llevar a cabo un desplazamiento infinitesimal es:

$$
\begin{align}
dW &= \vec{F}·d\vec{l} = q \frac{Q}{4\pi\varepsilon_{0} r^{2}}\vec{u}_{r} · (dr · \vec{u}_{r} + dt · \vec{u}_{t}) = q \frac{Q}{4\pi\varepsilon_{0}r^{2}}·(dr · \cancelto{ 1 }{ \vec{u}_{r} · \vec{u}_{r} } + dt · \cancelto{ 0 }{ \vec{u}_{t} · \vec{u}_{r} })\\
 dW &= \frac{qQ}{4\pi\varepsilon_{0}r^{2}}dr = F·dr
\end{align}
$$

![[Trabajo del campo eléctrico.png]]

Para calcular el trabajo que ejerce una carga $Q$ para llevar la carga $q$ del punto $A$ al punto $B$ siguiendo una línea (no necesariamente recta) $L$,  siendo $\vec{r}_{B}$ el vector de $Q$ a $B$ y $\vec{r}_{A}$ el vector de $Q$ a $A$, hay que sumar todas las secciones infinitesimales que forman $L$, que son las $d\vec{l}$.

$$
\begin{align}
W^{L}_{AB} &= W_{AB} = \int_{A}^{B} \vec{F}\, d\vec{l} = \int_{r_{A}}^{r_{B}} \frac{qQ}{4\pi\varepsilon_{0}r^{2}}\, dr = \frac{qQ}{4\pi\varepsilon_{0}} \int_{r_{A}}^{r_{B}} \frac{1}{r^{2}}\,dr = - \frac{qQ}{4\pi\varepsilon_{0}} · \left( \frac{1}{r_{B} } - \frac{1}{r_{A}} \right) \\
W_{AB} &= \frac{qQ}{4\pi\varepsilon_{0}r_{A}} - \frac{qQ}{4\pi\varepsilon_{0}r_{B}}
\end{align}
$$

*Nótese que el trabajo sólo depende de las cargas y las distancias entre ellas, por lo que cualquier camino, sea directo o dando vueltas, requerirá exactamente el mismo trabajo, así que $L$ no importa.*

![[Trabajo del campo eléctrico sobre una línea.png]]

El trabajo sólo es una magnitud, pero en función de si es positivo o negativo se puede extrapolar algo más de información. Cuando el trabajo es positivo, significa que el propio campo eléctrico es el que ejerce el trabajo, pero si es negativo, significa que hay una fuerza externa ejerciendo el trabajo, que vence al campo eléctrico.

Si ambas cargas son del mismo signo, la fuerza que actúa entre ellas es repulsiva, y en caso contrario atractiva. En caso de que que sea repulsiva y $B$ esté más alejado de $Q$ que $A$, la fuerza además es positiva, y en caso contrario negativa. Del mismo modo, si la fuerza es atractiva y $B$ está más cerca de $Q$ que $A$, es positiva y, en caso contrario, negativa.

Así, aparecen de forma natural las siguientes propiedades del trabajo:
$$
\begin{matrix}
W^{L}_{AB} = W^{L'}_{AB} = W_{AB} &&& W_{AB} = -W_{BA} &&& W_{AA} = 0
\end{matrix}
$$

A los campos que cumplen estas propiedades se les llama **campos conservativos**, que son aquellos en los que aplicar un trabajo (o, análogamente, un desplazamiento) implica que la energía empleada para llevarlo a cabo se transforma en energía potencial que puede ser devuelta.

## Energía potencial electrostática

En el campo eléctrico, el trabajo para llevar una carga de A a B se puede escribir como **la diferencia de energía potencial** de la carga en dos puntos diferentes. A la energía potencial en cada punto, la llamamos $U$.
$$
W_{AB} = \frac{qQ}{4\pi\varepsilon_{0}r_{A}} - \frac{qQ}{4\pi\varepsilon_{0}r_{B}} = U_{A} - U_{B}
$$

Como es inversamente proporcional a la distancia, a la energía potencial electrostática de cualquier carga en el infinito se la define así:
$$
U_{r=\infty} = \frac{qQ}{4\pi\varepsilon_{0}r} = 0
$$
Por lo que la energía potencial en un punto, también conocido como la **energía potencial desde la carga generadora** representa el trabajo que hace falta para llevar una carga desde ese punto hasta el infinito.
$$
W = \frac{qQ}{4\pi\varepsilon_{0}}\int_{r}^{\infty} \frac{1}{r^{2}} \, dr = -\frac{qQ}{4\pi\varepsilon_{0}} · \left( 0 - \frac{1}{r} \right)  = \frac{qQ}{4\pi\varepsilon_{0}r} = U_{r}
$$

## Potencial eléctrico

El potencial eléctrico es una magnitud escalar que representa el nivel energético de un **punto** (y no de una carga, eso es la energía potencial) del espacio. Su análogo en campos gravitatorios es la altura.

No depende de la carga sobre la que se ejerce el trabajo, sólo del campo eléctrico al que da lugar la carga generadora.

$$
V = \frac{U_{r}}{q} = \frac{Q}{4\pi\varepsilon_{0}r} = E·r
$$
En caso de haber múltiples cargas puntuales, el potencial en cualquier punto no es más que la suma de cada uno de los potenciales por separado, por el principio de superposición.

$$
V = \sum_i \frac{Q_{i}}{4\pi\varepsilon_{0}r_{i}} = \frac{1}{4\pi\varepsilon_{0}}\sum_{i} \frac{Q_{i}}{r_{i}}
$$

Podemos sacar el potencial eléctrico a partir de la definición del trabajo y la energía potencial:

$$
\begin{align}
dW &= \vec{F}\,d\vec{l} = q\vec{E}\,d\vec{l} = dU_{r}\\
dV_{r} &= \frac{dU_{r}}{q} = \vec{E}\,d\vec{l} \\
V_{r} &= \int_{r}^{\infty} \vec{E}\,d\vec{l} = \int_{r}^{\infty} E\,dl
\end{align}
$$

Y, además, la diferencia de potencial entre $A$ y $B$, siendo el primero el punto inicial y el segundo el final, se define de forma muy similar al trabajo entre dos puntos.
$$
\begin{align}
\Delta V = V_{A} - V_{B} = \int_{A}^{B} \vec{E} \, d\vec{l} = \int_{A}^{B} E \, dl 
\end{align}
$$

Es importante destacar que dada la relación entre el potencial y el trabajo, si el potencial es el mismo en dos puntos el trabajo necesario para mover una carga cualquiera de un punto a otro es 0.


# Pie de página

[^1]: [[Condensadores#Capacidad]]
[^2]: [[Campo conservativo]]