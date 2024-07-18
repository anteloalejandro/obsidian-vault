
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
&= \frac{\frac{10}{1000} · \frac{9}{10}}{\frac{9+89}{1000}} = \frac{10 · 0.9}{9+89} = \frac{9}{98} \simeq 0.091 \simeq \frac{1}{11}
\end{align}
$$

Por tanto, a pesar de que el test acierta en un ~90% de las mujeres, si todo lo que sabes de una mujer es que el test ha dado positivo, la probabilidad de que dicha mujer tenga realmente cáncer es muy baja.

El principal culpable de esto es la probabilidad de que una mujer tenga cáncer independientemente de si el test acierto o no, $P(A_i)$, que al ser de un 1% baja mucho la probabilidad de acierto en caso de el test sea cierto.

Si, por otro lado, se comprueba el caso contrario, es decir, la probabilidad de que una mujer no tenga cáncer sabiendo que el test ha dado negativo, obtenemos...

$$
\begin{align}
P(\neg A_{i}|\neg B) &= P(i \text{ no tiene cáncer} | \text{ test negativo}) \\
&= \frac{\frac{990}{1000} · \frac{901}{990}}{\frac{902}{1000}} = \frac{0.99 · 0.9\overline{10}}{0.902} \simeq 0.81 \simeq \frac{10}{11}
\end{align}
$$

Por lo que se concluye que esta clase de test médicos son mucho más útiles para confirmar que *no se tiene* la patología comprobada, que para comprobar que *sí se tiene*.

<small>
Basado en este vídeo de <a href="https://www.youtube.com/watch?v=lG4VkPoG3ko">3blue1brown</a>
</small>