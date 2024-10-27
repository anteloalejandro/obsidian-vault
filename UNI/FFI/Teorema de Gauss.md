
# Flujo del campo eléctrico

El flujo es el campo eléctrico que pasa por una superficie. Pasa toda superficie de igual tamaño, el flujo se maximizará si la superficie es ortogonal al campo eléctrico, pues más líneas de campo atravesarán la superficie. Del mismo modo, para cualquier superficie, el flujo será 0 si la superficie es paralela al campo.

![[flujo maximo y nulo.png]]

Es decir, cuando más cerca esté la superficie de ser ortogonal al campo eléctrico, mayor será el flujo eléctrico. Evidentemente, el flujo eléctrico también es directamente proporcional al tamaño de la superficie.

Dado el vector normal de la superficie $d\vec{s}$, se saca la proyección de $d\vec{s}$ sobre $\vec{E}$, al que llamaremos $d\vec{s}_{\perp}$, que será el vector normal de una proyección de $ds$ ortogonal a $\vec{E}$. Cuanto más cerca esté el campo de ser ortogonal a la superficie $ds$, más grande será $d\vec{s}_{\perp}$, por lo que más grande será el producto escalar.

![[diferencial de superficie.png]]

$$
\phi = \int \vec{E}\, d\vec{s}_{\perp} = \int |\vec{E}|·|d\vec{s}_{\perp}| = \int E\, ds_{\perp} = \int E \cos \theta \,ds
$$

En una figura tridimensional, el flujo es igual a la diferencia entre el flujo que sale y entra de la figura. Se pueden dar 3 casos:

1. Todas las líneas de campo que entran en la figura por una superficie salen por otra. $\phi = 0$.
2. Hay más líneas entrantes que salientes. A estos cuerpos se les llama **sumideros**. $\phi < 0$.
3. Hay más líneas salientes que entrantes. A estos cuerpos se les llama **fuentes**. $\phi > 0$.

# Teorema de gauss

![[Pasted image 20241027113733.png]]

Dada una esfera de radio $R$, que contiene en el centro una carga $q$, se puede calcular el flujo eléctrico $\phi$ de la siguiente manera:

$$
\begin{gather}
d\phi = \vec{E}\,d\vec{s}_{\perp} = |\vec{E}| · |d\vec{s}| · \cos \theta \\
\phi = \int |\vec{E}| · |d\vec{s}| · \cos \theta \\
\end{gather}
$$

Al ser una esfera, $R$ es constante en todos los puntos de la superficie de la esfera, por lo que $|\vec{E}|$ también es constante en lo que respecta a $ds$.

$$
\begin{align}
\phi &= |\vec{E}| \int |d\vec{s}| = |\vec{E}| \int ds = |\vec{E}| · s \\
\phi &= \frac{Q}{4\pi\varepsilon_{0}R^{2}} · 4\pi R^{2} = \frac{Q}{\varepsilon_{0}}
\end{align}
$$

El flujo no depende de $R$, es decir, que el resultado **para toda esfera** es que el flujo es constante en todos los puntos de la esfera y es directamente proporcional a la carga (y por tanto al # de líneas de campo). Lo que sucede en realidad es que es proporcional al campo y al radio, pero en la esfera el campo y el radio son inversamente proporcionales, así que se anulan en el flujo.

Además, el campo eléctrico es una **densidad de flujo** eléctrico, ya que es la proporción de flujo por superficie.

$$
|\vec{E}| = \frac{d\phi}{ds_{\perp}}
$$

En realidad, se pueden aplicar estos resultados a cualquier figura, no solo a esferas (solo que la simplificación vendría de la fórmula de cada superficie).

Al ser independiente del tamaño y forma de la figura, podemos calcular el flujo que pasa por una figura modelando otra que esté completamente encerrada por la figura original y que a su vez encierre completamente al origen de la carga.

![[Pasted image 20241027211528.png]]

> [!info] Teorema de Gauss
> $$
> \begin{align}
> \phi = \phi_{enc} = \int \vec{E}\,d\vec{S}_{\perp} = \frac{Q_{enc}}{\varepsilon_{0}}
> \end{align}
> $$

## Campo dentro y fuera de una esfera de densidad $\rho$ constante y $Q$ conocido.

### Campo fuera de la esfera

Primero se modela una esfera gaussiana de radio $R > r$ centrada en el mismo punto que la original. Es decir, habrá una nueva esfera "de mentira" por fuera de la esfera original. 

![[Pasted image 20241027213024.png]]

Habiéndolo modelado como una esfera sencilla, teniendo en cuenta al envolver a la esfera por fuera $Q_{enc} = Q$, el campo eléctrico de la esfera gaussiana es simplemente:

$$
\begin{gather}
\phi = \frac{Q}{\varepsilon_{0}} = \int \vec{E}\,d\vec{S} = \int |\vec{E}| · |d\vec{S}| = E·S \\
E · 4\pi R^{2} = \frac{Q}{\varepsilon_{0}} \\
E = \frac{Q}{4\pi R^{2} \varepsilon_{0}}
\end{gather}
$$

### Campo dentro de la esfera

Primero modelaremos una esfera gaussiana de radio $r < R$ centrada en el mismo punto que la esfera original. Ahora la carga encerrada es la carga de la esfera gaussiana, y sabemos que $Q_{enc} < Q$.

![[Pasted image 20241027213425.png]]

Tengamos en cuenta que la densidad de carga es $\rho = \frac{Q}{\text{Volumen}}$.

$$
\begin{gather}
\phi = \frac{Q_{enc}}{\varepsilon_{0}} = \frac{\rho · \mathrm{Vol}_{enc}}{\varepsilon_{0}}
\end{gather}
$$