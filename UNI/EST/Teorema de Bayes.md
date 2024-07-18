
Es una extensión de la [[Probabilidad#Probabilidad condicional|probabilidad condicional]] y la [[Teorema de la probabilidad total|probabilidad total]] desarrollada por Thomas Bayes que se utiliza para revisar las previsiones previamente calculadas en función de nueva información.

$$
P(A_{i}|B) = \frac{P(A_{i})·P(B|A_{i})}{\sum\limits_{j=1}^{n} P(A_{j}) · P(B|A_{j})} = \frac{P(A_{i}) · P(B|A_{i})}{P(B)}
$$

# Paradoja del test médico

Supongamos que tenemos una muestra de 1000 mujeres y que un 1%, es decir, 10 de ellas, tienen cáncer de mama. 

Supongamos además que a todas estas mujeres se les hace un test para detectar el cáncer de mama, y que un 9 de las 10 mujeres que tienen cáncer se identifican correctamente, y que para 89 de las 990 mujeres que no tienen cáncer el test resulta en un falso positivo, mientras que para el resto el test identifica correctamente que no tienen cáncer.

En este caso, aunque es correcto decir que el test acierta en un ~90% de los casos, si calculamos la probabilidad de que el test acierte en caso de dar positivo, es decir, la probabilidad de una de las 1000 mujeres esté en el grupo de 10 mujeres que realmente tiene cáncer, sabiendo que el test ha salido positivo, obtenemos...

$$
\begin{align}
P(A_{i} | B) &= P( i\text{ tiene cáncer } | \text{ test positivo}) \\ \\
&= \frac{9}{}
\end{align}
$$

[[https://www.youtube.com/shorts/xIMlJUwB1m8]]