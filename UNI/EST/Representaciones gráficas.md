Hay esencialmente dos tipos de representaciones gráficas, las unidimensionales y las bidimensionales. 

# Gráficas unidimensionales

## Diagrama de barras

*Para frecuencia absoluta*
```chart
type: bar
labels: [Nº de robots]
series:
  - title: 0
    data: [10]
  - title: 1
    data: [35]
  - title: 2
    data: [60]
  - title: 3
    data: [55]
tension: 0.2
width: 80%
labelColors: false
fill: false
beginAtZero: true
bestFit: false
bestFitTitle: undefined
bestFitNumber: 0
```
## Diagrama por sectores

*Para frecuencia relativa*

```chart
type: pie
labels: [0,1,2,3]
series:
- title: Nº de robots
  data: [6.25, 21.88, 37.50, 34.37]
labelColors: true
```
## Tallo y hoja (stem and leaf)

Se usa principalmente para ver como se agrupan las magnitudes de datos numéricos discretos (por ejemplo, si hay muchas personas entre 20 y 30 años, pocos entre 40 y 50, etc).

$\text{datos } = \set{15, 16, 21, 22, 23, 32, 26, 26, 30, 32, 41}$
```
STEM  LEAF
 1     5 6
 2     1 3 3 6 6
 3     0 2
 4     1
```

## Histograma

Es similar al diagrama de barras, pero las barras representan un intervalo en vez de un valor concreto.

Se usa para representar gráficamente un conjunto de datos continuos. También se puede para datos discretos, pero sólo si son muchos.

En un histograma, a diferencia del diagrama de barras, si se juntan las barras, porque sí existen valores entre los dos que se muestran.

Muestra, más o menos, si la distribución de los datos sigue la campana de Gauss.

Si el intervalo es muy grande, se pierde precisión, pero si es muy pequeño, tienes complejidad innecesaria y un nivel de detalle innecesario. Por ejemplo, a la hora de medir el crecimiento económico de una empresa a lo largo de un año, no tiene sentido que los intervalos sean de un día.

![[Histogram_example.svg]]

### Histograma de frecuencias acumuladas

Relacionado con la frecuencia absoluta acumulada. En vez de parecerse a una [[Distribución normal]], se parece a una función creciente. Nos da información, por ejemplo, de cuántos miembros hay por encima o por debajo de cierto valor.

A la línea que dibujan las barras se le llama polígono de frecuencias.

![[frecuency-histogram.png]]

## Histogramas estratificados

Idéntico a un histograma normal, pero con secciones de cada barra coloreadas para representar la presencia de cada estrato de la población.

![[stratified-histogram.png]]

### Anómalos y asimetría en los histogramas

Los valores anómalos están relacionados vagamente con la simetría, pero un histograma puede ser asimétrico y sin que haya valores anómalos.

## Diagrama de caja y bigotes (boxplot)

Es un diagrama basado en los [[Estadísticos descriptivos#Cuartiles y percentiles|cuartiles]] y el [[Estadísticos descriptivos#Rango intercualtílico|rango intercuartílico]], por lo que es fácil de montar aún teniendo pocos datos.

Consiste en una caja que representa a este último, con una línea en el centro para la mediana, con dos líneas a los extremos de la caja denominadas bigotes.

La longitud máxima del bigote es de $1.5·RI$, de modo que si hay valores extremadamente fuera de lo normal, se quedan fuera del rango del diagrama y se consideran anómalos. Cada bigote se extiende hasta último el valor que no supera este máximo.

![[boxplot.png]]

Tienen dos utilidades principales: Primero, al igual que con el histograma, es posible utilizarlos para observar visualmente patrones tales como la dispersión. Segundo y más importante, se pueden usar en conjunto con otros boxplots para hacer comparaciones más informadas (boxplots comparativos).

![[comparative-boxplot.png]]

# Gráficas bidimensionales

Consiste en crear gráficas que combinen pares de variables diferentes. Se combinan variables con la misma [[Clasificación de variables|clasificación]], es decir, se pueden combinar dos variables cualitativas o dos variables cuantitativas, pero no se pueden mezclar.

## Tablas de contingencia

También llamada **tabla de frecuencias cruzadas**. Es similar a la [[Tablas de frecuencias|tabla de frecuencias]], pero en vez de clasificar la información por columnas, se hace por columnas y filas, usándose estas para representar dos variables diferentes.

Del mismo modo que la tabla de frecuencias se usa para representar una variable cualitativa, en esta tabla se representa un par de variables cualitativas.

En cada celda queda representada la intersección entre los dos grupos de atributos (por ejemplo, 'productos de alta calidad enviados por el Proveedor 1'), y pueden estar representada en forma de frecuencia absoluta o relativa (%)

|                 | Alta Calidad | Media Calidad | Baja Calidad | Total |
| --------------- | ------------ | ------------- | ------------ | ----- |
| **Proveedor 1** | 20<br>       | 25<br>        | 30<br>       | 75    |
| **Proveedor 2** | 15           | 10            | 15           | 30    |
| **Total**       | 35           | 35            | 35           | 105   |

En las columnas/filas del total van las frecuencias marginales, que suman un 100%.

## Gráficos de dispersión

Una gráfica en la que se usa un eje por cada variable (cuantitativa) y se ponen puntos según como interceda cada dato. Lo más probable es que los puntos no formen una sola línea bien definida, pero se puede dibujar una siguiendo la dirección general hacia la que van los puntos.

Las dos variables tienen que tener algún tipo de relación, sino los puntos estarán completamente dispersos y no se podrá sacar ninguna conclusión. Cuanto más alejados están los puntos respecto a la línea, más débil es la relación entre las dos variables.

Si los datos no tienen ninguna relación, los puntos se distribuyen de forma más o menos equitativa por el gráfico, haciendo imposible dibujar una línea en ninguna relación concreta.

La relación entre las dos variables puede ser lineal o exponencial, pero de momento sólo se verán relaciones lineales, que forman lineas rectas.

Dadas las variables A y B, si la pendiente es positiva, se dice que cuanto más A más B (directamente proporcional). Si es negativa, cuanto más A menos B (inversamente proporcional).

![[scatter-plot.png|100%]]

Lo juntos o separados que estén los puntos de la línea se mide mediante el [[Estadísticos descriptivos bidimensionales#Coeficiente de correlación|coeficiente de correlación]] ($r$).

![[scatter-plot-correlation.png|100%]]