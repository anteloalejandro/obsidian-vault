las variables cuantitativas (decimales) y estadísticas cualitativas (enteros) son variables aleatorias (v.a.).

Los estadísticos estiman los parámetros, que son teóricos y conciernen a la población.

# Posición central

## Media

$$\overline{x} = \frac{1}{n}\sum\limits^{n}_{i=1}x_{i}$$


La media se ve muy afectada por valores anómalos, así que no es un buen parámetro de distribución si hay muchos

Con los valores anómalos y son reales se deben quedar, no se pueden quitar.

La media de los salarios, por ejemplo, no es una buena medida. Va a haber unas pocas personas con salario muy alto que va a hacer que el salario media tienda hacia ahí

## Mediana

El punto que está en el centro de todo el conjunto de datos.
Deja un 50% de valores a la izquierda y un 50% de valores a la derecha.
Si es impar, será uno de los valores ya existentes.

Los valores tienen que estar ordenados en menor a mayor bajo algún criterio de ordenación

$Md = \frac{n+1}{2}$, dnde n el número de elementos

$$\set{1, 2, 3, 5, 6} \to Md = 3$$
$$\set{1, 2, 3, 5, 10} \to Md = 3$$

## Moda

El valor que más se repite. Si tienes valores cuantitativos (decimales) es muy improbable que se repitan así que no suele tener demasiado valor

# Dispersión

## Varianza

Una cantidad que mide el grado de dispersión en una muestra

El promedio de todas las distancias hasta la muestra.

$$
s^{2} =\frac{1}{n}\sum\limits^{n}_{i=1}(x_{i}-\overline{x})^{2}
$$

## Desviación estándar

$$
s =\sqrt{s^2}
$$
El signo de $s$ sin elevar al cuadrado dependerá de si la varianza es menor o mayor que la media.

A una distancia de una desviación estándar (a partir de la media, por los dos lados), se espera que haya un 68% de los datos, y a dos desviaciones estándar, un 95%.
## Cuasi varianza

En la varianza de divide entre $n$ y en la cuasi varianza de divide entre $n-1$
$$
s^{2} =\frac{1}{n-1}\sum\limits^{n}_{i=1}(x_{i}-\overline{x})^{2}
$$

## Rango

Es la diferencia entre los valores más grandes y los más pequeños

Es una medida de propagación, pero poco usada.
$$\text{Max}-\text{Min}$$
## Coeficiente de variación

La desviación típica con respecto al valor total de la media

$$CV = \frac{s}{\overline{x}}$$

Como no tiene dimensiones ni unidades y es una proporción, puede emplearse para comparar la dispersión de variables con escalas y naturalezas diferentes, pero puede verse afectado por valores anómalos o datos asimétricos al depender de la media. Ej.: Comparar la dispersión entre peso y altura.

Cuando se reporte media, se ha de acompañar con la desviación típica y el coeficiente de variación.

# Posición
## Cuartiles y percentiles

1 cuartil es un cuarto. Los cuartiles son 3 puntos ($Q_{1}, Q_{2}, Q_{3}$) que dividen a la distribución en cuartos, similar a como la mediana lo divide en dos. De hecho, $Q_{2}=MD$.
$$Q_{i} = \frac{i}{4}·(n+1)$$
Si el cuartil está entre dos valores, es la media de esos dos valores.

Los percentiles son igual que los cuatriles dividen en 4, los percentiles dividen entre 100 secciones. El percentil 0 y 100 no existen, así que hay 99 percentiles.
$$
P_{i}=\frac{i}{100}·(n+1)
$$


## Rango intercualtílico

La diferencia entre $Q_3$ y $Q_1$. Es un 50% de los datos centrales.

$$II= Q_{3} - Q_{1}$$
Es más resistente a los valores anómalos que los cuartiles y percentiles.

# Forma

## Asimetría

Se refiere a como de simétrica es la distribución normal (campana de Gauss). Si hay valores anómalos pierde simetría. Hay simetrías positivas y negativas.

En la campana de Gauss, si la cola está a la derecha, hay valores que tiran hacia la derecha, por tanto es positiva. Si la cola está a la izquierda, la simetría es negativa.

Los datos nunca son perfectamente simétricos, así que se emplean coeficientes de simetria.
$$
CA = \frac{1}{s^{3}} \sum\limits \frac{(x_{i}-\overline{x})^{3}}{N-1}
$$
$$
CA_{std}= \frac{CA}{\sqrt\frac{6}{N}}
\begin{cases}
|CA_{std}|\leq 2 & \Leftrightarrow \text{es simétrico} \\
CA_{std} < -2 & \Leftrightarrow \text{simetría negativa} \\
CA_{std} > 2 & \Leftrightarrow \text{simetría positiva}
\end{cases}
$$
$$$$

## Curtosis

Apuntalamiento, como de puntiaguda es la distribución normal. Si hay mucho apuntalamiento, nos da a entender que tenemos poca variedad/cantidad de datos.

Si es plana, planícurtica, si es puntiaguta, leptocúrtica, si es normal, mesocúrtica

# Representaciones gráficas

## Tabla de frecuencia

Se usa para variables cualitativas (enteros), pero se puede usar para variables quantitativas (decimales).

Es una tabla agrupando los elementos en filas y contando cuantos elementos entran en cada grupo.

| Color | Frecuencia absoluta (cantidad) | Frecuencia Relativa (porcentaje) |
| ---- | ---- | ---- |
| Negro | 10 | $10/23 = 43.4\%$ |
| Azul | 5 | $5/23$ |
| Rojo | 5 | ... |
| Verde | 2 |  |
| Amarillo | 1 |  |

Para variables quantitativas se suele hacer rangos para tratarlas como cualitativas.

Si los grupos son ordenables, también se añaden las columnas de frecuencia absoluta acumulada y frecuencia relativa acumulada, en las que se suma el valor de la fila superior (sumatorio).

## Diagrama de barras

Para frecuencia absoluta

## Diagrama por sectores

Para frecuencia relativa

## Tallo y hoja (stem and leaf)
