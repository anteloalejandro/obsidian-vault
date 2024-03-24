La estadística descriptiva es la parte de la estadística descriptiva que se encarga de representar, ya sea [[Representaciones gráficas#Gráficas bidimensionales|gráficamente]] o a través de medidas como la covarianza o coeficiente de correlación.

# Covarianza

Medida de la dirección de una relación lineal entre dos variables.
El promedio de todas las variables en todas las direcciones.
Es la diferencia entre todas las distancias entre la media y los puntos.

$$Cov(x, y) = S_{xy}= \frac{1}{n-1} \sum\limits^{n}_{i=1}(x_{i}- \overline{x})(y_{i}- \overline{y})$$
*Nótese que es, esencialmente, la [[Estadísticos descriptivos#Varianza|varianza]] con dos variables $x$ e $y$.*

Dará un número positivo o negativo
- Si $Cov(x, y) > 0$, se mueven en la misma dirección (pendiente positiva)
- Si $Cov(x, y) < 0$, se mueven en direcciones opuestas (pendiente negativa)
- Si $Cov(x, y) = 0$, x e y son independientes.

# Coeficiente de correlación

Al igual que la covarianza, mide la dirección de una relación lineal, pero el coeficiente de correlación mide además la fuerza de la relación.
$$r = \frac{Cov(x,y)}{s_{x}s_{y}}$$
Cuanto más grande es su valor absoluto, más relacionadas están. Cabe destacar que $r\in [-1,1]$.

Si $|r| < 0.3$, se dice que la relación es demasiado débil para que se consideren relacionadas. Si es positivo o negativo se aplica lo mismo que con la covarianza, ya que es directamente proporcional a esta.