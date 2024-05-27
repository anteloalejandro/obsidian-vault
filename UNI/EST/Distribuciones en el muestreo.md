---
todo: true
---
# Estadísticos como variables aleatorias

Supongamos que hay una población con una variable aleatoria $X$. Para sacar conclusiones sobre dicha variable aleatoria de ha de obtener una [[Población y muestra|muestra]] aleatoria constituida por $n_{i}$ individuos de la población.

Del mismo modo, se pueden obtener múltiples muestras de tamaños diferentes, cada una con sus propios [[Estadísticos descriptivos]], como $\overline{X}$ o $S$. El conjunto de todas las muestras posibles que se pueden extraer de esta población es, por tanto, una nueva **población compuesta de las posibles muestras** o, dicho de otro modo, el conjunto de partes de la población. Como cada uno de los miembros de esta nueva población tiene sus propios estadísticos descriptivos, estos serán **variables aleatorias** válidas **para la nueva población** de muestras.

![[Población y población de muestras.excalidraw|100%]]

Es decir, cualquier estadístico descriptivo es una nueva variable aleatoria para la población de muestras, por lo que puede ser distribuido y **tendrá sus propios estadísticos y parámetros**.

# Distribución de estadísticos

Todos los estadísticos pueden considerarse variables aleatorias y, como tales, la población de las muestras tendrán una media y desviación típica que dependerán de la distribución de la población original.

## Distribución de la media muestral

Dada la [[Estadísticos descriptivos#Media|media muestral]] $\overline{X} = \frac{1}{n} \sum\limits_{i=1}^{n}X_{i}$, cada una de las $X_{i}$ son **miembros de la muestra**, que a su vez son miembros de la población. Si sacamos las medias de todas las muestras posibles para la población, cada una de estas medias muestrales puede ser diferente, pero hacer **media de *todas* las medias muestrales** es exactamente igual a la media poblacional.
$$
\begin{align*}
E(\overline{X}) &= E\left(\frac{X_{1}+\dots+X_{n}}{n}\right) = \frac{E(X_{1})+\dots+E(X_{n})}{n} = \mu\\
E(\overline{X}) &= \mu
\end{align*}
$$
Por otro lado, y siguiendo con la definición de la media muestral, y teniendo en cuenta que la suma de las varianzas de todos los miembros de la población original es , podemos decir que la **varianza de *todas* las medias muestrales** es exactamente igual a la varianza poblacional dividida entre $n$.
$$
\begin{align*}
Var(\overline{X}) &= Var\left(\frac{X_{1}+\dots+X_{n}}{n}\right) = \frac{Var(X_{1}) + \dots + Var(X_{n})}{n^{2}} = \frac{n\sigma^{2}}{n^{2}}\\
Var(\overline{X}) &= \frac{\sigma^{2}}{n}
\end{align*}
$$
### Ejemplo

Por ejemplo, dada la población $\set{18, 20, 22, 24}$, que tendría de media poblacional $\mu = 21$ usando [[muestreo con reemplazo]] se obtiene la siguiente tabla de medias de la muestras de tamaño 2 permitiendo repeticiones:

|        | 18  | 20  | 22  | 24  |
| ------ | --- | --- | --- | --- |
| **18** | 18  | 19  | 20  | 21  |
| **20** | 19  | 20  | 21  | 22  |
| **22** | 20  | 21  | 22  | 23  |
| **24** | 21  | 22  | 23  | 24  |

Y la media de todas estas medias muestrales es 21, que es idéntica a la media poblacional.



## Varianza muestral

$$
Var(\overline{X}) = Var\left(\frac{X_{1}+\dots+X_{n}}{n}\right) = \frac{Var(X_{1})+\dots+Var(X_{n})}{n^2}
$$

# NOTAS
![[Estadístico y parámetro.excalidraw|100%]]
Hay dos métodos para comprobar si la estimación de los parámetros hecha a partir de los estadísticos de la muestra son correctos: Prueba de hipótesis e intervalo de confianza

# Representación de estadísticos vs parámetros

Media poblacional: $\mu$
Media muestral: $\overline{X}$ 

Desviación poblacional: $\sigma$
Desviación muestral: $S$

# Propiedades de la media muestral

## Idea 1

Supongamos una población de 4 personas, con una variable aleatoria $X = \set{\text{Edad de la persona}}$ con espacio muestral $\set{18,20,22,24}$.

La media poblacional sería $\frac{18+20+22+24}{4}=21$ y la distribución sería uniforme porque todos tienen la misma probabilidad de aparecer.

Si tomamos todas las posibles muestras de dos miembros (permitiendo repetidos, en este caso) las medias de muchas de las muestras no coincide, y la distribución para a ser una normal. Dicho esto la media de las medias de la muestra sí es igual a la media poblacional. Aparte de todo esto, la desviación estándar se ha reducido al tomar todas las muestras respecto a tomarla de la población (no se si es importante).

Es decir, cuantas más muestras tomemos, más se acercará la media de las medias muestrales a la media poblacional, y la media de todas las medias muestrales es igual a la media poblacional.

## Idea 2

La desviación estándar de la media muestral es:

$$\sigma_{\overline{X}} = \frac{\sigma}{\sqrt{n}}$$

Es decir, cuanto más alta la $n$, más baja es la desviación y, por tanto, más se parece la media muestral a la media poblacional.

Además, por el [[Distribución normal#Teorema central del límite|teorema central del límite]], si $n\geq 30$, como $\overline{X} = \frac{X_{1}+\dots+X_{n}}{n}$, $\overline{X}$ es una distribución normal de la forma $\overline{X} \sim N(\mu, \sigma_{\overline{X}})$.

## Idea 3

Se usa la cuasi-varianza $s'$ para calcular fácilmente la varianza poblacional.

## Idea 4

La

# Distribuciones

Estas distribuciones se usan principalmente para tamaños de muestra pequeños, ya que para tamaños muy grandes se suele usar la normal.
[[Distribución Chi-Cuadrado]]