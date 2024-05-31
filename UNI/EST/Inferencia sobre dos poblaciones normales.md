---
todo: true
---

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

Pero, en caso contrario, la $t$ calculada es igual al siguiente cociente que se sigue una distribución t Student con $n_{x} + n_{y} - 2$ grados de libertad:
$$
t = \frac{\overline{X}-\overline{Y}}{\sqrt{\frac{S^{2}_{p}}{n_{x}} + \frac{S^{2}_{p}}{n_{y}}}} \sim t_{n_{x} + n_{y} - 2}
$$
Y la $S^{2}_{p}$ es igual a:
$$
S^{2}_{p} = \frac{(n_{x} - 1)s^{2}_{x} + (n_{y} - 1)s^{2}_{y}}{n_{x} + n_{y} - 2}
$$

# Notas

- Dos muestras dependientes 
- Volver a la misma muestra
- Se usa t Student en vez de chi-cuadrado.



# Diferencia 

**Comparación de medias, muestras dependientes.**

$H_{0} : = \overline{X} - \overline{Y} = 0 \Rightarrow \overline{X} = \overline{Y}$
