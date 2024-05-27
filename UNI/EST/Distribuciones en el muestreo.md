
# Estadísticos como variables aleatorias

Supongamos que hay una población con una variable aleatoria $X$. Para sacar conclusiones sobre dicha variable aleatoria de ha de obtener una [[Población y muestra|muestra]] aleatoria constituida por $n_{i}$ individuos de la población.

Del mismo modo, se pueden obtener múltiples muestras de tamaños diferentes, cada una con sus propios [[Estadísticos descriptivos]], como $\overline{X}$ o $S$. El conjunto de todas las muestras posibles que se pueden extraer de esta población es, por tanto, una nueva **población compuesta de las posibles muestras** o, dicho de otro modo, el conjunto de partes de la población. Como cada uno de los miembros de esta nueva población tiene sus propios estadísticos descriptivos, estos serán **variables aleatorias** válidas **para la nueva población** de muestras.

![[Población y población de muestras.excalidraw|100%]]

Es decir, cualquier estadístico descriptivo es una nueva variable aleatoria para la población de muestras, por lo que puede ser distribuido y **tendrá sus propios estadísticos y parámetros**.

# Distribución de estadísticos

Todos los estadísticos pueden considerarse variables aleatorias y, como tales, la población de las muestras tendrán una media y desviación típica que dependerán de la distribución de la población original.

Gracias a esto se pueden estimar [[Parámetros|parámetros]] poblacionales a partir de los estadísticos de estas nuevas variables aleatorias.

## Distribución de la media muestral

Dada la [[Estadísticos descriptivos#Media|media muestral]] $\overline{X} = \frac{1}{n} \sum\limits_{i=1}^{n}X_{i}$, cada una de las $X_{i}$ son **miembros de la muestra**, que a su vez son miembros de la población. Si sacamos las medias de todas las muestras posibles para la población, cada una de estas medias muestrales puede ser diferente, pero hacer **media de *todas* las medias muestrales** es exactamente igual a la media poblacional.
$$
\begin{align*}
E(\overline{X}) &= E\left(\frac{X_{1}+\dots+X_{n}}{n}\right) = \frac{E(X_{1})+\dots+E(X_{n})}{n} = \mu\\
E(\overline{X}) &= \mu_{\overline{X}} = \mu
\end{align*}
$$

Por otro lado, y siguiendo con la definición de la media muestral, podemos decir que la **varianza de *todas* las medias muestrales** es exactamente igual a la varianza poblacional dividida entre $n$.
$$
\begin{align*}
Var(\overline{X}) &= Var\left(\frac{X_{1}+\dots+X_{n}}{n}\right) = \frac{Var(X_{1}) + \dots + Var(X_{n})}{n^{2}} = \frac{n\sigma^{2}}{n^{2}}\\
Var(\overline{X}) &= \sigma^{2}_{\overline{X}} = \frac{\sigma^{2}}{n}
\end{align*}
$$

Lo importante de esto último es que, como consecuencia, cuanto mayor sea el número de muestras $n$ más se acercará la varianza de $\overline{X}$ a 0 y, por tanto, más se acercará la media de las $\overline{X}$ a la media poblacional, permitiendo así estimar el parámetro a través del estadístico sin tomar medidas a todos los miembros de la población.

Además, por el [[Distribución normal#Teorema central del límite|Teorema central del límite]], como $\overline{X}$ es una suma de variables aleatorias independientes $X_{i}$, si $n > 30$ consideramos que $\overline{X} \sim N(\mu_{\overline{X}} = \mu, \sigma_{\overline{X}})$.

### Ejemplo

Por ejemplo, dada la población $\set{18, 20, 22, 24}$, que tendría de media poblacional $\mu = 21$ usando [[muestreo con reemplazo]] se obtiene la siguiente tabla de medias de la muestras de tamaño 2 permitiendo repeticiones:

|        | 18  | 20  | 22  | 24  |
| ------ | --- | --- | --- | --- |
| **18** | 18  | 19  | 20  | 21  |
| **20** | 19  | 20  | 21  | 22  |
| **22** | 20  | 21  | 22  | 23  |
| **24** | 21  | 22  | 23  | 24  |

Y la media de todas estas medias muestrales es 21, que es idéntica a la media poblacional.




## Distribución de la varianza muestral

Dada la [[Estadísticos descriptivos#Varianza|varianza muestral]] o, en este caso en específico, la casi-varianza muestral $S^{2} =\frac{1}{n-1}\sum\limits^{n}_{i=1}(X_{i}-\overline{X})^{2}$, la **media de *todas* las varianzas muestrales** es exactamente igual la varianza poblacional, al igual que el caso anterior de la media muestral.
$$
\begin{align*}
E(S^{2}) &= E\left( \frac{(X_{1} - \overline{X})^{2}+ \dots + (X_{n} - \overline{X})^{2}}{n-1} \right) = \sigma^{2}\\
E(S^{2}) &= \mu_{S^{2}} = \sigma^{2}
\end{align*}
$$
Esta relación solo es completamente cierta con la cuasi-varianza, pero a la hora de aproximar o estimar parámetros, la diferencia no suele ser notable.

Al igual que con la distribución de la media muestral, cuanto mayor sea el número de muestras $n$, más se va a acercar la media de las varianzas muestrales a la varianza poblacional.


## Propiedades de la media muestral
Cuando la población original se distribuye normalmente, $\overline{X}$ siempre se distribuirá normalmente, independientemente del tamaño de la muestra $n$.

Al ser $\overline{X}$ una distribución normal, se puede transformar en una [[Distribución normal#Distribución normal estandarizada|distribución normal estandarizada]] del mismo modo que se haría con cualquier otra distribución normal.
$$
\frac{\overline{X}-\mu}{\frac{\sigma}{\sqrt{n}}} \sim N(0,1)
$$
Además, al ser $\frac{\sigma}{\sqrt{n}}$ la desviación estándar de la media muestral, y $\mu$ igual a la media de la media muestral, también se puede expresar así:
$$
\frac{\overline{X} - \mu_{\overline{X}}}{\sigma_{\overline{X}}} \sim N(0,1)
$$

## Relación entre la media y varianza muestrales

Si $X$ es una distribución normal, la media muestral y la varianza **siempre son independientes** al ser tratadas como variables aleatorias.