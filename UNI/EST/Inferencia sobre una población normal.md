---
todo: true
---
[[Distribuciones en el muestreo]]

![[Estadística inferencial]]

# Pasos

1. **[[#Análisis descriptivo]] de la muestra:** Estimar la media poblacional y desviación típica poblacional a partir de la muestra.
2. **[[#Contraste de hipótesis]]:** Comprobar si los valores estimados se ajustan a lo esperado de la población.
3. [[#Intervalos de confianza]]: Comprobar con una seguridad razonable los valores entre los que están la desviación típica y media poblacionales.

# Análisis descriptivo

La mayor parte de técnicas de inferencia asumen que las poblaciones siguen una [[Distribución normal]].

Para comprobar si se da el caso, se pueden usar estadísticos formales, pero es poco útil en la práctica. En su lugar, a menudo es más conveniente hacer un análisis descriptivo de los datos, haciendo uso de diferentes [[Representaciones gráficas]] y [[Estadísticos descriptivos]], como:

- Histograma (40 o 50 datos como mínimo)
- Diagrama Box and Whisker
- Papel probabilístico normal
- Coeficientes de asimetría y curtosis

# Contraste de hipótesis

Primero hay que definir la hipótesis de salida a contrastar, que refleja el conocimiento previo de la situación. Por ejemplo, $\mu = 2000$. A partir de ahí se sacan una **Hipótesis nula** ($H_{0}: \mu = 2000$) y una **Hipótesis alternativa** ($H_{1} : \mu \neq 2000$, $H_{1}: u > 2000$, etc.).

$H_{0}$ es cierta $\Leftrightarrow$ $\overline{X}$ será parecida a 2000 ($\overline{X}-2000 \simeq 0$)
$H_{0}$ no es cierta $\Leftrightarrow$ $H_{1}$ es cierta

Para poder asegurar que $\overline{X}$ es suficientemente parecida (o no) a la hipótesis nula, es necesario relacionar la media muestral con la media poblacional usando una [[Distribución t Student]].

Primero, sabemos que, si $X \sim N(\mu, \sigma)$:
$$
t = \frac{\overline{X}-\mu}{\sqrt{\frac{S^{2}}{n}}} \sim t_{n-1}
$$

Es decir, hay que comprobar si la $t$ calculada con el coeficiente anterior es igual al valor obtenido de una distribución t Student con $n-1$ grados de libertad, para un $\alpha$ concreto.

La función de probabilidad a calcular cambiará según de la hipótesis alternativa: Si $H_{1}$ es $\mu \neq \mu_{0}$ mide el área bajo dos colas delimitadas por $\pm t_{n-1}$ y si $H_1$ es $\mu < \mu_0$ o $\mu > \mu_0$ es el área bajo una de las colas, que al ser t Student una distribución simétrica es igual en ambos casos al área de la cola delimitada por $t_{n-1}$. 
$$
\begin{align*}
\text{Si } \mu \neq \mu_{0} \Rightarrow P(t^{\alpha}_{n-1} > |t|) &\leq \alpha \\
P\left(t^{\alpha / 2}_{n-1} > t\right) &\leq \frac{\alpha}{2}\\\\
\text{Si } \mu < \mu_{0} \text{ o } \mu > \mu_0 \Rightarrow P(t^{\alpha}_{n-1} > t) &\leq \alpha
\end{align*}
$$

A $\alpha$ también se le llama *Riesgo de especie*, y representa el área bajo la curva de la o las colas, o lo que es lo mismo, el porcentaje de población para el que se cumple la función de probabilidad. A este área se le llama *Área de rechazo*, ya que si la $t$ calculada es superior de la $t_{n-1}$ y entra en este área, se rechaza la hipótesis nula. A lo contrario del riesgo de primera especie, $1-\alpha$, se le llama *Nivel de confianza*. Si no se especifica

Tiene que comprobarse si el resultado obtenido encaja en la distribución t Student obtenida $\frac{\overline{X}-\mu}{S/\sqrt{n}} \sim t_{n-1}$, al que llamaremos $k$. Para ello, se calcula la probabilidad $P(t_{n-1} > |t|) \leq \alpha$, donde $\alpha$ es, por convenio, 0.05 (para tener una confianza del 95%).
$$
P(t^{a=0.05}_{n-1} > |t|) \leq 0.05 \Rightarrow 
P(t^{a=0.025}_{n-1} > t) \leq 0.025
$$
Éste cálculo de probabilidad nos da un resultado, $p$. Si $k\in{[-p,p]}$, consideraremos que la hipótesis nula es aceptable.

# Intervalos de confianza

Consiste en calcular un intervalo que tenga una probabilidad elevada ($1-\alpha$) de contener el valor desconocido de $\mu$.

$$
\begin{align*}
P(t_{n-1} < |\alpha|) = 1-\alpha \\
P\left(-t_{n-1}·\left(\frac{\alpha}{2}\right) < t_{n-1} < t_{n-1}\right)
\end{align*}
$$