Son resultados de los [[Población y muestra#Estadísticas muestrales y parámetros poblacionales|datos extraídos de una muestra]] representados de diferentes formas, ya sean gráficas o funciones.

# Posición central

## Media

$$\overline{x} = \mu = \frac{1}{n}\sum\limits^{n}_{i=1}x_{i}$$


La media se ve muy afectada por valores anómalos, así que no es un buen parámetro de distribución si hay muchos

Con los valores anómalos y son reales se deben quedar, no se pueden quitar.

La media de los salarios, por ejemplo, no es una buena medida. Va a haber unas pocas personas con salario muy alto que va a hacer que el salario media tienda hacia arriba.

## Mediana

El punto que está en el centro de todo el conjunto de datos. Deja un 50% de valores a la izquierda y un 50% de valores a la derecha.

Si es impar, será uno de los valores ya existentes, será la media entre los dos valores centrales.

Los valores tienen que estar ordenados en menor a mayor bajo algún criterio de ordenación.

$Md = \text{el número en la posición } \frac{n+1}{2}$, dónde $n$ es el número de elementos.

Se ve menos afectado por los valores anómalos que la media, de modo que:

$$\set{1, 2, 3, 5, 6} \to Md = 3$$
$$\set{1, 2, 3, 5, 10} \to Md = 3$$
## Moda


El valor que más se repite. Si tienes valores cuantitativos (decimales) es muy improbable que se repitan así que no suele tener demasiado valor

## Media, mediana y moda en la distribución normal 

![[Comparison_mean_median_mode.svg]]

Si los datos coinciden con una [[Distribución normal|distribución normal]], la media, mediana y moda son idénticas. Cuanto más de alejan de ese modelo, más dispares son entre ellas, donde la media es la que más se aleja del pico, seguida por la mediana, mientras que la moda se mantiene en el pico.

# Dispersión

## Varianza

Una cantidad que mide el grado de dispersión en una muestra

Es el promedio de todas las distancias hasta la media de la muestra.

$$
S^{2} = \sigma^{2} =\frac{1}{n}\sum\limits^{n}_{i=1}(x_{i}-\overline{x})^{2}
$$

## Desviación estándar

$$
S = \sigma =\sqrt{S^2}
$$
El signo de $s$ sin elevar al cuadrado dependerá de si la varianza es menor o mayor que la media.

A una distancia de una desviación estándar (a partir de la media, por los dos lados), se espera que haya un 68% de los datos, y a dos desviaciones estándar, alrededor de un 95% ([[Distribución normal]]). Por esta relación y por el hecho de que se expresa en las mismas unidades que la variable aleatoria que se está midiendo, se considera **más fácil de interpretar** que la varianza.

![[standard-deviation-diagram.jpg]]

Al igual que la media (ya que es resultada de una media de diferencias), la desviación estándar (así como la varianza) se ve muy afectada por valores anómalos.

## Cuasi varianza

En la varianza de divide entre $n$ y en la cuasi varianza de divide entre $n-1$
$$
S^{2} =\frac{1}{n-1}\sum\limits^{n}_{i=1}(x_{i}-\overline{x})^{2}
$$

## Rango

Es la diferencia entre los valores más grandes y los más pequeños

Es una medida de propagación, pero poco usada.
$$\text{Max}-\text{Min}$$
## Coeficiente de variación

La desviación típica con respecto al valor total de la media

$$CV = \frac{S}{\overline{x}}$$

Como no tiene dimensiones ni unidades y es una proporción, puede emplearse para comparar la dispersión de variables con escalas y naturalezas diferentes (por ejemplo, comparar peso y altura), pero puede verse afectado por valores anómalos o datos asimétricos al depender de la media.

*Cuando se reporte media, se ha de acompañar con la desviación típica y el coeficiente de variación.*

# Posición
## Cuartiles y percentiles

1 cuartil es un cuarto. Los cuartiles son 3 puntos ($Q_{1}, Q_{2}, Q_{3}$) que dividen a la distribución en cuartos, similar a como la mediana lo divide en dos. De hecho, $Q_{2}=Md$.
$$Q_{i} = \text{Número en la posición } \frac{i}{4}·(n+1)$$
Si el cuartil está entre dos valores, es la media de esos dos valores.

Los percentiles son igual que los cuartiles dividen en 4, los percentiles dividen entre 100 secciones. El percentil 0 y 100 no existen, así que hay 99 percentiles.
$$
P_{i}= \text{Número en la posición } \frac{i}{100}·(n+1)
$$

## Rango intercualtílico

La diferencia entre $Q_3$ y $Q_1$. Es un 50% de los datos centrales.

$$RI= Q_{3} - Q_{1}$$
Es más resistente a los valores anómalos que los cuartiles y percentiles.

![[Rango intercualtílico.excalidraw|100%]]
# Forma

## Asimetría

Se refiere a como de simétrica es la [[Distribución normal|distribución normal]] (campana de Gauss). Si hay valores anómalos pierde simetría. Hay simetrías positivas y negativas.

En la campana de Gauss, si la cola está a la derecha, hay valores que tiran hacia la derecha, por tanto es positiva. Si la cola está a la izquierda, la simetría es negativa.

![[Relationship_between_mean_and_median_under_different_skewness.png]]

Los datos nunca son perfectamente simétricos, así que se emplean coeficientes de asimetría para determinar, de forma aproximada, el tipo de simetría que tiene.
$$
CA = \frac{1}{S^{3}·(n-1)}\sum\limits_{i=1}^{n}(x_{i}-\overline{x})^3
$$
*Nótese la similitud con la varianza*
$$
CA_{std}= \frac{CA}{\sqrt\frac{6}{N}}
\begin{cases}
|CA_{std}|\leq 2 & \Leftrightarrow \text{es simétrico} \\
CA_{std} < -2 & \Leftrightarrow \text{simetría negativa} \\
CA_{std} > 2 & \Leftrightarrow \text{simetría positiva}
\end{cases}
$$

Alternativamente, se puede saber si tiene simetría positiva o negativa utilizando las propiedades de la media y la mediana.

$$
\overline{x} - Md\ 
\begin{cases}
\ =0 \Rightarrow \text{Es perfectamente simétrico} \\
\ > 0 \Rightarrow \text{Tiene simetría positiva} \\
\ < 0 \Rightarrow \text{Tiene simetría negativa}
\end{cases}
$$
## Curtosis

Apuntalamiento, o cómo de puntiaguda es la distribución normal. Si hay mucho apuntalamiento, nos da a entender que tenemos poca variedad/cantidad de datos.

Si es plana, planícurtica, si es puntiaguta, leptocúrtica, si es normal, mesocúrtica.

No se ha de confundir con la dispersión de la distribución normal. Es menester fijarse en que si la curtosis es alta, la distribución es más puntiaguda y la base es **igual o más ancha** y si la curtosis es baja, al revés.

La siguiente imagen **no es un ejemplo de curtosis**, sino de dispersión/varianza.
![[not-kurtosis.png]]

Esta imagen **sí es un ejemplo de kurtosis**
![[kurtosis.png]]

Más información en [este enlace](https://stats.stackexchange.com/questions/84158/how-is-the-kurtosis-of-a-distribution-related-to-the-geometry-of-the-density-fun).

Se puede determinar la curtosis utilizando una fórmula:

$$
CC = -3 + \frac{1}{S^{4}·(n-1)}\sum\limits_{i=1}^{n}(x_{i}-\overline{x})^{4}
$$