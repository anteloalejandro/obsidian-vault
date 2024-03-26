
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
