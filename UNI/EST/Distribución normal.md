
Es una distribución de probabilidad continua en forma de campana de Gauss donde la media, mediana y moda son iguales, están en el centro y determinan la [[Estadísticos descriptivos#Posición|localización]] (dónde está centrada), y la varianza y desviación estándar determinan la [[Estadísticos descriptivos#Dispersión|dispersión]]. La importancia de la distribución normal viene de que dada una muestra suficientemente grande de una variable aleatoria, la distribución de probabilidad se asemeja a la normal.
$$X \sim N(\mu_{x}, \sigma_{x}^{2})$$

La distribución normal tiene la característica especial de que a una distancia de una desviación estándar por la izquierda y por la derecha de la media hay un ~68% de los miembros de la población, a dos desviaciones estándar un ~97% y a tres un ~99%.

![[standard-deviation-diagram.jpg|100%]]

La probabilidad se calcula haciendo uso de su [[Probabilidad#Función de masa de probabilidad|función de densidad]], que se calcula de la siguiente manera:
$$
P(x) = f(x) = \frac{1}{\sqrt{2\pi\sigma^{2}}}·e^{\frac{-(x-\mu)^{2}}{2\sigma^{2}}}
$$
Y con la [[Probabilidad#Función de distribución acumulativa|función de distribución acumulativa]] se puede calcular la probabilidad dentro de un intervalo. Gráficamente sería el área debajo de la curva dentro del intervalo, lo que intuitivamente se traduce al porcentaje de miembros de la población para los que se cumple el evento.
$$F(x) = P(X \leq x) = \sum\limits_{i=1}^{n}f(x_{i})$$

# Distribución normal estandarizada

Cualquier distribución normal con cualquier combinación de media y varianza puede transformarse en una distribución normal estandarizada con variable aleatoria $Z$, $\sigma_{z}^{2} = 0$ y $\mu_{z} = 1$, o dicho de otra forma, en la distribución normal $Z \sim N(0,1)$.

![[standard-normal-distribution.png]]

A partir de esta se puede calcular la función de densidad o la función de densidad acumulada para cualquier $Z$ y extrapolar el resultado a la distribución normal original. El valor de $Z$ se calcula así:
$$Z = \frac{X-\mu_{x}}{\sigma}$$

# Tabla normal tipificada 

Es una tabla que tiene precalculados los resultados de la función de distribución acumulativa para diferentes valores de $Z$. En el siguiente caso, se mira una columna o otra según el valor del segundo decimal de $Z$.

![[tabla-normal-tipificada.png]]

Es importante tener cuidado con el número que se obtiene como resultado, ya que se tiene que entender si corresponde al área entre el valor dado de $Z$ y el máximo o ese mismo valor y el mínimo.

En este caso, según se indica en el dibujo en la parte superior de la imagen, el valor de $Z$ es una distancia respecto a la media, y si esta distancia es negativa da el área hasta el mínimo y si es positiva da el área hasta el máximo.

# Papel probabilístico normal

Es una gráfica similar a un [[Representaciones gráficas#Gráficos de dispersión|gráfico de dispersión]] en el que se representan sobre el papel distintos valores de $X$ donde en el eje horizontal están dichos valores y en el eje vertical el resultado de la función de distribución acumulativa.

En el caso del papel probabilístico de la distribución normal los diferentes puntos se sitúan, más o menos, a lo largo de una recta y, por norma general, cuando más se ajusten a esa recta, más similar a la distribución normal estandarizada es.

Además, según como se curve la línea, se puede observar gráficamente el tipo de [[Estadísticos descriptivos#Asimetría|asimetría]]; si la inclinación baja en algún punto de la recta es asimetría positiva, y si sube es asimetría negativa. Si inclinación baja y sube en dos o más puntos diferentes, podemos asumir que hay una mezcla de poblaciones dispares.

![[papel-probabilistico-normal.png]]

Usando esta gráfica y sabiendo que corresponde a una distribución normal se puede aproximar el valor correspondiente a la media aprovechando que la media y la mediana han de ser muy similares y deduciendo que el valor de la mediana ha de ser aquel para el cual la probabilidad es 50%.

Aprovechando de nuevo esa lógica se puede averiguar también el valor de la desviación estándar, ya que también sabemos que a una distancia de $\sigma$ por la derecha y por la izquierda de la media se encuentra el 68% de los valores, lo que implica que en $\mu - \sigma$ habrá un $50\% - 34\% = 16\%$ y en $\mu + \sigma$ habrá un $50\% + 34\% = 84\%$. Sacando los valores correspondientes en la gráfica se puede despejar $\sigma$.

# Teorema central del límite

El teorema central del límite, en lo que a la distribución normal respecta, dice que:
$$
n \to \infty, \sum\limits^{n}_{i=1}(X_{i})  \sim N \left(\mu = \sum\limits^{n}_{i=1}\mu_{i},\  \sigma^{2} = \sum\limits^{n}_{i=1}\sigma^{2}_{i} \right)
$$
Es decir, que si $n$ tiende a infinito, la suma de las distribuciones normales es igual a una nueva distribución cuya variable aleatoria es la suma de las variables, cuya media es la suma de las medias y cuya varianza es la suma de las varianzas. En la práctica, mientras la $n$ sea suficientemente grande se considera que este resultado es una aproximación suficientemente buena.

Este teorema quiere decir, esecialmente, que al sumar variables independientes aleatorias, cuantas más se sumen más se parecerá el resultado a una distribución normal.

Cabe destacar que al aplicar este teorema a la **resta de dos variables aleatorias** $X$ e $Y$, la distribución aleatoria de la variable aleatoria $A$ resultante tiene como media la **resta de las medias** y como varianza la **suma de las varianzas**.
$$A \sim N(\mu_{a}=\mu_{x}-\mu_{y}, \sigma_{a}=\sigma_{x}^{2}+\sigma_{y}^{2})$$
# Aproximación a la distribución normal

Ya que el teorema central del límite da a entender que la suma de suficientes variables aleatorias da como resultado una distribución normal, se pueden aproximar las sumas de otros tipos de distribuciones a una nueva distribución normal.

## Binomial

Dada la [[Distribución binomial|distribución binomial]] $X \sim B(n, p)$, consideramos que la aproximación a la normal es suficientemente acertada si $\sigma_{x}^{2} = np(1-p) \geq 9$.

La $Z$ se calcularía igual que en la distribución normal estandarizada:
$$
Z = \frac{X-\mu_{x}}{\sigma_{x}} = \frac{X-np}{\sqrt{np(1-p)}}
$$

## Poisson 

Dada la [[Distribución de Poisson|distribución de Poisson]] $X \sim Ps(\lambda)$, consideramos que la aproximación a la normal es suficientemente acertada si $\sigma^{2}_{x} = \lambda \geq 9$

La $Z$ se calcularía igual que en la distribución normal estandarizada, teniendo en cuenta que en Poisson $\mu = \sigma$ :
$$
Z = \frac{X-\mu_{x}}{\sigma_{x}} = \frac{X-\lambda}{\sqrt{\lambda}}
$$

## Correcciones por continuidad

Al aproximar la binomial y Poisson (distribuciones para variables discretas) a la distribución normal (distribución para variables continuas) se producen errores de precision por continuidad. En resumidas cuentas, sumaremos o restaremos $0.5$ para asegurarnos de que cogemos o excluimos al valor concreto de $x$ según se dé.

![[Correción por continuidad.excalidraw|100%]]