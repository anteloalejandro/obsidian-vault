
# Flujo magnético

El flujo magnético es similar a el flujo eléctrico, $d\phi = \vec{B} · d\vec{S}_{\perp}$.

La principal diferencia es que las líneas de campo **siempre son cerradas**, es decir, siempre acaban donde empiezan.

Esto tiene la implicación de que para cualquier **superficie cerrada**, por cada línea de campo que sale de una superficie, otra entra. Es decir, $\phi = \int \vec{B}\,d\vec{S}_{\perp} = 0$. Esto **no se aplica en la práctica**.

![[Inducción del campo magnético - Flujo superficie cerrada.png]]

Si $\vec{B}$ no es uniforme, calcular $d\phi$ se complica, y a menudo habrá que cambiar la variable $d$ por una unidad en el eje X o Y, según en cual el campo si es constante, y cambiar $dS$ por el area en función de la nueva variable. Por ejemplo, si el campo magnético es constante en el eje Y, el flujo magnético en un rectángulo de altura $b$ y base $a$ producido por un conductor a una distancia $d$ sería:

$$
\begin{align}
d\phi &= B·dS = \frac{\mu_{0}}{2\pi d}I·dS = \frac{\mu_{0}}{2\pi x}I·b\,dx \\
\phi &= \int_{d}^{a-d} \frac{\mu_{0}}{2\pi x}I·b\,dx = \frac{\mu_{0}}{2\pi}I·b·\int_{d}^{a-d} \frac{1}{x} \, dx = \frac{\mu_{0}}{2\pi}I·b·[\ln x]_{d}^{a-d}
\end{align}
$$

En esencia, hay que coger un trozo de superficie en el que el campo sí sea constante, y calcular la integral a partir de ahí.

# Ley de Faraday

La corriente inducida en una espira depende de la velocidad de cambio en el flujo magnético que la atraviesa.

$$
|\varepsilon| = \frac{d\phi}{dt}
$$