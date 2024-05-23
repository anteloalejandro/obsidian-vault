---
todo: true
---

La distribución $\chi^2$ se usa en el estudio de la distribución de la varianza o [[Estadísticos descriptivos#Cuasi varianza|cuasi-varianza muestral]] de una población que se [[Distribución normal|distribuye normalmente]]. 

La variable aleatoria $Y$ sigue una distribución $\chi^2$ con $v$ grados de libertad si es la suma de $v$ variables independientes que siguen la distribución $N(0,1)$.
$$
Y = \sum\limits^{v}_{i=1}X^{2}_{i} \Rightarrow Y \sim \chi^{2}_{v}
$$

Es una distribución asimétrica que solo toma valores positivos cuya [[Probabilidad#Función de masa de probabilidad|función de probabilidad]] depende de los grados de libertad.

![[Chi-square.jpg]]

Si $S^{2}$ es la varianza en una muestra de tamaño $n$ extraída de una población normal de varianza $\sigma^2$, se cumple esta distribución:
$$(n-1)\frac{S^{2}}{\sigma^{2}} \sim \chi^{2}_{n-1}$$
Por lo que en la práctica en vez de usar $v = n$ grados de libertad, se usan $v = n-1$ grados de libertad. La relación entre esta ecuación y la distribución $\chi^2$ es útil al hacer cálculos de probabilidades con la varianza poblacional o muestral según se sepa una o la otra.

Por ejemplo, para estimar la probabilidad de que la varianza muestral de muestras aleatorias de tamaño 10 de una población normal con varianza poblacional 9 sea menor que un valor $K$, se despeja la ecuación $(n-1) \frac{S^{2}}{\sigma^{2}} = 9 · \frac{S^{2}}{9} = S^2$, de modo que $S^{2} \sim \chi^{2}_{9}$, por lo que la probabilidad de que $S^2$ sea menor a $K$ sería $P(S^{2} < K) = P(\chi^{2}_{9} < K)$, es decir, se podría calcular con la función de probabilidad de $\chi^2$.

Generalizando, podemos decir que:

$$
\begin{align*}
P(S^{2} < K) &= P(\chi^{2}_{n-1} < \sigma)
\end{align*}
$$

La función de probabilidad se puede calcular usando una tabla como la siguiente, donde $\alpha$ es la probabilidad de estar después del punto $\chi^2_{v}$  y $v$ los grados de libertad.

![[Tabla chi-cuadrado.png]]