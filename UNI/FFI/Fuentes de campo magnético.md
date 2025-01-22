
# Ley de Biot y Savart

El campo magnético $\vec{B}$ creado por una corriente eléctrica es perpendicular a la dirección de la corriente y es directamente proporcional a la intensidad e inversamente proporcional a la distancia de ella.

Siendo $\vec{r}$ la distancia de una sección infinitesimal $d\vec{l}$ del cable, y $\mu_{0}$ la permitividad magnética en el vacío, el campo magnético generado en el vacío por un elemento de corriente $I\,d\vec{l}$ en un punto concreto es:

$$
d\vec{B} = \frac{\mu_{0}}{4\pi} · \frac{I\,d\vec{l}\times \vec{r}}{r^{3}} = \frac{\mu_{0}}{4\pi} · \frac{Id\vec{l} \times \vec{u}_{r}}{r^{2}}
$$

Además, $d\vec{l} \times \vec{r}$ nos dice la dirección hacia la que va el diferencial de campo magnético.

![[Fuentes de campo magnético - Biot y Savart.png]]

Por tanto, el campo magnético generado por todo el cable por el que pasa la corriente, es el siguiente

$$
\vec{B} = \frac{\mu_{0}}{4\pi}I·\int_{A}^{B} \frac{d\vec{l}\times \vec{r} }{r^{3}}
$$

La peculiaridad aquí es que sólo podremos saber la dirección de $\vec{B}$ si todos los $d\vec{l}$ posibles están en el mismo plano y $\vec{r}$ también está en ese plano, en cuyo caso $\vec{B}$ será perpendicular al plano.

# Líneas de campo magnético

En una varilla vertical infinitesimalmente gruesa, cualquier punto $p$ que cojamos dará en una altura concreta dará como resultado un vector que es tangencial a una circunferencia de radio $|\vec{r}|$, siendo $\vec{r}$ el vector desde el $d\vec{l}$ en dicha altura hasta $p$, ya que $d\vec{l}\times \vec{r}$ nunca irá hacia fuera o dentro de la varilla (donde va $\vec{r}$) ni hacia arriba o abajo (donde va $d\vec{l}$). Por tanto, para todos los puntos en una misma altura, el diferencial de campo magnético o, lo que es lo mismo, la línea de campo magnético, da vueltas alrededor de la varilla. Hay una línea de campo por cada altura y valor de $|\vec{r}|$, por lo que el campo magnético luce así:

![[Fuentes de campo magnético - Lineas de campo.png]]

En este caso, la magnitud del campo magnético en una línea de campo a una distancia $R$ de la varilla es...

$$
B_{\text{varilla}} = \frac{\mu_{0}}{2R}I
$$

En el caso contrario; cuando tenemos una espira circular horizontal por la que pasa corriente y queremos saber el campo magnético en un punto arbitrario, sabemos que todo lo que esté en el eje central irá hacia arriba o hacia abajo, y que todo lo que esté justo encima o justo debajo del eje irá en la misma dirección porque las desviaciones se anularían, aunque el campo sería más débil. La magnitud del campo magnético, siendo $d$  la distancia desde cualquier punto de la espira hasta el punto dado, sería...

$$
B_{\text{espira}} = \frac{\mu_{0}}{2\pi d}
$$

Sin embargo, al alejarnos del centro, esto deja de ser cierto por la influencia de todas las secciones de cable de la espira, aunque cuanto más cerca estemos del propio cable, más se parecerá a la primera figura.

# Ley de Ampère

La ley de Ampère relaciona una línea cerrada $C$ con la intensidad que pasa por un conductor que produce dicha línea de campo. Nótese de que las $I_{i}$ en una dirección se restarán con las que vayan en la dirección contraria.

$$
\int_{C} \vec{B}·d\vec{l} = \mu_{0}\sum_{i}I_{i}
$$

![[Fuentes de campo magnético - Ley de Ampère.png]]

Tiene dos usos principales:
- Calcular campos magnéticos en casos en los que exista simetría
- Calcular la integral de la línea de campo, para lo que $C$ debería tener dos propiedades:
  - El módulo del campo magnético $B$ es constante en todos los puntos de la línea cerrada, es decir, $C$ coincide exactamente con una línea de campo.
  - El vector campo magnético $\vec{B}$ debe ser paralelo a la línea $C$ en todos los puntos de esta.
  $$\vec{B} \parallel d\vec{l} \implies \int \vec{B}·d\vec{l} = \int B·dl = B·L = \mu_{0}\sum I_{i}$$
## Ley de Ampère sobre un toroide

![[Fuentes de campo magnético - Ampère sobre toroide.png]]

El campo magnético será uniforme en todos los puntos dentro del toroide.

$N·I$ es la suma de las intensidades $\sum_{i}I_{i}$.

El campo magnético en el hueco del toroide será igual a cero, porque ninguna línea de campo pasará por ahí.

Para calcular el campo magnético fuera del toroide, nos inventamos una superficie que esté en el mismo plano que el toroide y tenga de radio la distancia del centro al punto. En este caso, por cada sección de la espira que atraviese en campo en una dirección, habrá una que atraviese el campo en dirección contraria, por lo que la suma de las intensidades será 0.

$$
B = \begin{cases}
0 & \text{si }d \neq r \\
\frac{\mu_{0}}{2\pi r}I·n & \text{si } d = r
\end{cases}
$$

En conclusión, **sólo habrá campo magnético por dentro del toroide**.

## Ley de Ampère sobre un solenoide

Si cogemos el toroide y lo "estiramos", obtenemos como resultado un **solenoide**. Normalmente, el campo magnético en un solenoide no es uniforme, de modo que no cumpliría con las propiedades del toroide.

Sin embargo, si consideramos un solenoide donde $L \gg r$, siendo $L$ la longitud total de la espira y $r$ la longitud del solenoide, el campo magnético si puede considerarse uniforme, de modo que si que comparte las propiedades del toroide.

$$
B = \frac{\mu_{0}}{L}I·n
$$

También aparece un momento magnético $\vec{\mu}= n · I\vec{S}$ por todo el cilindro que forma la espira, que da lugar a un **momento magnético por ud. de volumen**, también conocido como magnetización o $\vec{M}$.

$$
\vec{M} = \frac{\vec{\mu}}{\text{Volumen}} = \frac{n·I\vec{S}}{S·L} = \frac{\vec{B}}{\mu_{0}}
$$

![[Fuentes de campo magnético - Ampère sobre solenoide.png]]

Nótese que a **mayor número de vueltas más larga es la espira en relación a la longitud del solenoide** y por tanto más cierta es la asunción de que $L\gg r$. También cabe destacar que el **momento magnético $\vec{\mu}$ va en la dirección contraria hacia la que fluye la corriente**, por la forma en la que fluye la corriente.
# Fuerza entre dos conductores rectilíneos

Dadas dos varillas paralelas de longitud infinita etiquetadas como 1 y 2, ambas emiten un campo magnético uniforme y ejercen fuerzas la una sobre la otra y, al ser de longitud infinita, la fuerza ejercida sería infinita ya que depende de la $\ell$. Sin embargo, la $B$ solo depende de la intensidad y la distancia, así que si es medible. Como la fuerza total no se puede medir, se mide la fuerza por unidad de longitud, es decir, $\frac{F}{\ell}$, de cada una de las barillas.

$$
\begin{gather}
B_{i} = \frac{\mu_{0}}{2\pi d}I_{i} \\
\frac{F_{1}}{\ell} = \frac{F_{2}}{\ell} = \frac{\mu_{0}}{2\pi d}I_{1}I_{2}
\end{gather}
$$

Si las corrientes tienen **direcciones iguales**, es decir, si la fuerza es positiva, la fuerza tiene un **efecto atractivo**. En caso contrario, el efecto es repulsivo.