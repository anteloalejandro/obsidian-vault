
# Gráficas univariables
## Histograma
Se usa para representar gráficamente un conjunto de datos contínuos. También se puede para datos discretos, pero sólo si son muchos.

En un histograma tiene sentido juntar las barras, porque si existen valores entre los dos que se muestran.

Muestra, más o menos, si la distribución de los datos sigue la campana de Gauss.

Si agrupas mucho, se pierde precisión, pero si lo haces poco, tienes complejidad innecesaria y un nivel de detalle innecesario. Cuanto menores los intevalos, mayor la cantidad de barras.

## Histograma de frecuencias acumuladas

Relacionado con la frecuencia absoluta acumulada.

A la línea que dibujan las barras se le llama polígono de frecuencias.

## Histogramas estratificados

Con barras coloreadas en función del estrato

## Anómalos vs asimetría

Los anomalos están relacionados vagamente con la simetría, pero un histograma puede no presentar valores anómalos a pesar de ser asimétrico.

## Diagrama de caja y bigotes (boxplot)

Longitud máxima del bigote: 1.5$RI$ por la derecha e izquierda desde el tercer y primer cuartil respectivamente. Esto hace que queden fuera muchos valores anómalos.

Su utilidad viene al compararlos con otros boxplots (boxplots comparativos), ya que dan ideas generales de tendencias.


# Estadística bidimesional

Combinar variables por pares. Se puede combinar quanti con quanti y cuali con cuali.

## Tablas de contingencia (cuali + cuali)

También llamada tabla de frecuancias cruzadas. La tabla de frecuencias se usaba para las cualitativas, así que para combinar dos cualitativas se combinan dos tablas.

Son la interseccion entre dos grupos de atributos, que están uno en filas y otro en columnas. Pueden tener cantidades, porcentajes o ambas.

|  | Alta Calidad | Media Calidad | Baja Calidad | Total |
| ---- | ---- | ---- | ---- | ---- |
| **Proveedor 1** | 20<br>19.05% | 25<br>23.81% | 30<br>28.57% | 75 |
| **Proveedor 2** | 15 | 10 | 15 | 30 |
| **Total** | 35 | 35 | 35 | 105 |

En las columnas/filas del total o subtotal van las frecuencias marginales, que suman un 100%.

## Gráficos de dispersión (quanti + quanti)

Una gráfica en la que se usa un eje por cada variable. Los puntos probablemente no formarán una sola línea, pero se puede dibujar una línea que representa la dirección general de los datos.

Las dos variables tienen que tener algún tipo de relación, y sólo vamos a ver las lineales. Si no es lineal, la línea pasa a ser una curva.

Cuanto más alejados están los puntos respecto a la línea, más débil es la relación.

Dadas las varaibles A y B, si la pendiente es positiva, se dice que cuanto más A más B. Si es negativa, cuanto más A menos B.

Si los datos no tienen ninguna relación, los puntos se distribuyen de forma más o menos equitativa por el gráfico, haciendo imposible dibujar una línea en ninguna relación concreta.

## Covarianza

Medida de la dirección de una relación lineal entre dos variables.
El promedio de todas las variables en todas las direcciones.
Es la diferencia entre todas las distancias entre la media y los puntos.

$$Cov(x, y) = S_{xy}= \frac{1}{n-1} \sum\limits^{n}_{i=1}(x_{i}- \overline{x})(y_{i}- \overline{y})$$

Dará un número positivo o negativo
- Si > 0 se mueven en la misma dirección (pendiente positiva)
- Si < 0 se mueven en direcciones opuestas (pendiente negativa)
- Si = 0, x e y son independientes.

## Coeficiente Correlación

Una medida tanto de la direccción como de la fuerza de una relación lineal entre dos variables.

$$r = \frac{Cov(x,y)}{s_{x}s_{y}}$$
Cuanto más grande es su valor absoluto, más relacionadas están. Si su valor absoluto es < 0.3, se dice que no están correlacionadas, ya que es demasiado débil. Si es positivo o negativo se aplica lo mismo que con la covarianza, ya que es directamente proporcional a esta.
