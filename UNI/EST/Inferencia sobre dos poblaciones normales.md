
![[Inferencia sobre una población normal#Pasos]]

# Comparación de medias de muestras dependientes

Se usa en muestras emparejadas o repetidas en diferentes momentos. 

En vez de hacer uso de los valores de $X$ o $Y$, se hace uso de la diferencia entre ellos, $d_{i} = X_{i} - Y_{i}$.

Las hipótesis son de la forma $H_{0} : \mu_{x} - \mu_{y} = 0$ y la $t$ calculada es idéntica a la del [[Inferencia sobre una población normal#Contraste de hipótesis (media)|contraste de hipótesis para la media]] en la inferencia sobre una población normal, cambiando la $\overline{X} - \mu$ por $\overline{d}$, la $S$ por $S_{d}$ y la $n$ es el número de pares.
$$
t = \frac{\overline{d}}{\sqrt{\frac{S^{2}_{d}}{n}}} \sim t_{n-1}
$$

# Comparación de medias de muestras independientes

Se usa en poblaciones diferentes no relacionadas.

Hay que diferenciar entre dos casos. Si se conocen $\sigma^{2}_{x}$ y $\sigma^{2}_{y}$, no hace falta calcular un valor de $t$, ya que se usa la [[Distribución normal#Distribución normal estandarizada|distribución normal estandarizada]] $Z$ en su lugar.

Pero, en caso contrario, la $t$ calculada es igual al siguiente cociente que se sigue una [[Distribución t Student]] con $n_{x} + n_{y} - 2$ grados de libertad:
$$
t = \frac{\overline{X}-\overline{Y}}{\sqrt{\frac{S^{2}_{p}}{n_{x}} + \frac{S^{2}_{p}}{n_{y}}}} \sim t_{n_{x} + n_{y} - 2}
$$
Y la $S^{2}_{p}$ es igual a:
$$
S^{2}_{p} = \frac{(n_{x} - 1)s^{2}_{x} + (n_{y} - 1)s^{2}_{y}}{n_{x} + n_{y} - 2}
$$

Es importante destacar que la $\alpha$ variara en función de si la hipótesis alternativa cubre una o dos colas al igual que en la [[Inferencia sobre una población normal]].

# Comparación de varianzas de muestras independientes

Al igual que en la [[Inferencia sobre una población normal]], distinguimos entre tres hipótesis nulas diferentes:
- $\sigma^{2}_{x} = \sigma^{2}_{y}$: Dos colas
- $\sigma^{2}_{x} \leq \sigma^{2}_{y}$: Cola superior
- $\sigma^{2}_{x} \geq \sigma^{2}_{y}$: Cola inferior
Pero, en vez de usar distribuciones $\chi^2$, hace uso de la [[Distribución F de Fisher]], ya que el siguiente cociente sigue dicha distribución:
$$
F = \frac{S^{2}_{x}/\sigma^{2}_{x}}{S^{2}_{y}}{\sigma^{2}_{y}} \sim F_{v}
$$
Los grados de libertad $v$ de $F_v$ dependerán de las hipótesis:
$$
\begin{align*}
H_{1}: \sigma^{2}_{x} > \sigma^{2}_{y} \Leftrightarrow & F > F_{n_{x}-1,\ n_{y}-1}^{\alpha}\\
H_{1}: \sigma^{2}_{x} < \sigma^{2}_{y} \Leftrightarrow & F < F_{n_{x}-1,\ n_{y}-1}^{1-\alpha}\\
H_{1}: \sigma^{2}_{x} \neq \sigma^{2}_{y} \Leftrightarrow & F > F_{n_{x}-1,\ n_{y}-1}^{\alpha/2} \text{ o } F < F_{n_{x}-1,\ n_{y}-1}^{1-\alpha/2}
\end{align*}
$$
![[f-fisher-crit.png]]