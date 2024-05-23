---
todo: true
---
[[Distribuciones en el muestreo]]

# Notas 

Demostrar si hay una diferencia significativa entre el conocimiento previo y lo que muestran los datos.
# Pasos

1. Análisis descriptivo de la muestra. Estimar la media poblacional y desviación típica poblacional a partir de la muestra.
2. Contraste de hipótesis. Comprobar si los valores estimados se ajustan a lo esperado de la población.
3. Intervalo de confianza. Comprobar con una seguridad razonable los valores entre los que están la desviación típica y media poblacionales.

# Normalidad de los datos / Análisis descriptivo

La mayor parte de técnicas de inferencia asumen que las poblaciones siguen una distribución normal.

Para comprobar si se da el caso, se pueden usar estadísticos formales, pero es poco útil en la práctica. En su lugar, a menudo es más conveniente hacer un análisis descriptivo de los datos, que se haría así:

- Hacer un histograma (40 o 50 datos como mínimo)
- Diagrama Box and Whisker
- Papel probabilístico normal
- Analizar parámetros muestrales (asimetría y curtosis)

# Contraste de hipótesis

Primero hay que definir la hipótesis de salida a contrastar, que refleja el conocimiento previo de la situación. Por ejemplo, $\mu = 2000$. A partir de ahí se sacan una **Hipótesis nula** ($H_{0}: \mu = 2000$) y una **Hipótesis alternativa** ($H_{1} : \mu \neq 2000$).

$H_{0}$ es cierta $\Leftrightarrow$ $\overline{X}$ será parecida a 2000 ($\overline{X}-2000 \simeq 0$)
$H_{0}$ no es cierta $\Leftrightarrow$ $H_{1}$ es cierta

Para poder asegurar que $\overline{X}$ es parecida o no a la hipótesis nula, es necesario relacionar la media muestral con la media poblacional usando una [[Distribución t Student]].
$$
\overline{X} - 2000 \simeq 0 \Rightarrow \overline{X} - \mu \simeq 0 \Rightarrow \frac{\overline{X}-\mu}{\frac{S}{\sqrt{n}}} \simeq 0 \Rightarrow H_{0} \text{ es cierta}
$$

Tiene que comprobarse si el resultado obtenido encaja en la distribución t Student obtenida $\frac{\overline{X}-\mu}{S/\sqrt{n}} \sim t_{n-1}$, al que llamaremos $k$. Para ello, se calcula la probabilidad $P(t_{n-1} > |t|) \leq \alpha$, donde $\alpha$ es, por convenio, 0.05 (para tener una confianza del 95%).
$$
P(t^{a=0.05}_{n-1} > |t|) \leq 0.05 \Rightarrow 
P(t^{a=0.025}_{n-1} > t) \leq 0.025
$$
Éste cálculo de probabilidad nos da un resultado, $p$. Si $k\in{[-p,p]}$, consideraremos que la hipótesis nula es aceptable.

# Intervalo de confianza

Consiste en calcular un intervalo que tenga una probabilidad elevada ($1-\alpha$) de contener el valor desconocido de $\mu$.

$$
\begin{align*}
P(t_{n-1} < |\alpha|) = 1-\alpha \\
P\left(-t_{n-1}·\left(\frac{\alpha}{2}\right) < t_{n-1} < t_{n-1}\right)
\end{align*}
$$
