
# Flujo magnético

El flujo magnético es similar a el flujo eléctrico, $d\phi = \vec{B} · d\vec{S}_{\perp}$.

La principal diferencia es que las líneas de campo **siempre son cerradas**, es decir, siempre acaban donde empiezan.

Esto tiene la implicación de que para cualquier **superficie cerrada**, por cada línea de campo que sale de una superficie, otra entra. Es decir, $\phi = \int \vec{B}\,d\vec{S}_{\perp} = 0$. Esto **no se aplica en la práctica**.

![[Inducción del campo magnético - Flujo superficie cerrada.png]]

Si $\vec{B}$ no es uniforme, calcular $d\phi$ se complica, y a menudo habrá que cambiar la variable $d$ por una unidad en el eje X o Y, según en cual el campo si es constante, y cambiar $dS$ por el area en función de la nueva variable. Por ejemplo, si el campo magnético es constante en el eje Y, el flujo magnético en un rectángulo de altura $b$ y base $a$ producido por un conductor a una distancia $d$ sería:

$$
\begin{align}
d\phi &= B·dS = \frac{\mu_{0}}{2\pi d}I·dS = \frac{\mu_{0}}{2\pi x}I·b\,dx \\
\phi &= \int_{d}^{a+d} \frac{\mu_{0}}{2\pi x}I·b\,dx = \frac{\mu_{0}}{2\pi}I·b·\int_{d}^{a+d} \frac{1}{x} \, dx = \frac{\mu_{0}}{2\pi}I·b·[\ln x]_{d}^{a+d}
\end{align}
$$

En esencia, hay que coger un trozo de superficie en el que el campo sí sea constante, y calcular la integral a partir de ahí.

# Ley de Faraday

Al meter y sacar un imán por el hueco una bobina solenoide, se genera un campo magnético que produce una corriente, del mismo modo que al pasar una corriente por la bobina se produce un campo magnético. Dependiendo de la dirección en la que se mueva el imán, la corriente irá en una dirección u otra, por lo que se trata de corriente alterna.

La corriente inducida en una espira depende de la velocidad de cambio en el flujo magnético que la atraviesa, tanto el aumento como la reducción del flujo inducen una corriente. Al cambio de flujo a lo largo del tiempo se le llama fuerza electromotriz, o $\varepsilon$.

$$
|\varepsilon| = \frac{d\phi}{dt}
$$

Dado que $\phi = \int B·dS·\cos \alpha$, los cambios en la magnitud del flujo magnético, el tamaño de la superficie y el ángulo de ésta producen cambios en el flujo, y por tanto una corriente y un potencial.

![[Inducción del campo mangético - Cambio en el campo magnético.png]]
![[Inducción del campo mangético - Cambios en la superficie de la espira.png]]
![[Inducción del campo mangético - Cambios en el ángulo.png]]

# Ley de Lenz

La ley de Lenz propone que las polaridades de la fuerza electromotriz $\varepsilon$ y la dirección de la intensidad de corriente inducidas por campo magnético siempre son opuestas a la dirección de cambio. En el ejemplo del imán anterior, meter el imán produce una corriente hacia fuera, y sacarlo produce una corriente hacia dentro. Nótese que **no se opone al flujo, sino a la dirección de las variaciones**.

La corriente inducida por el campo magnético siempre intenta mantener o compensar el flujo actual; si el campo disminuye, la corriente inducida tiene que dar como resultado un campo en la dirección del campo, y si el campo aumenta, tiene que dar un campo en dirección contraria.