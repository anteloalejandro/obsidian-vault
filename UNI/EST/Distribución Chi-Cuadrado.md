---
todo: true
---

La distribución $\chi^2$ se usa en el estudio de la distribución de la varianza o [[Estadísticos descriptivos#Cuasi varianza|cuasi-varianza muestral]] de una población que se [[Distribución normal|distribuye normalmente]]. La variable aleatoria $Y$ sigue una distribución $\chi^2$ con $v = n-1$ grados de libertad si es la suma $n$ variables independientes que siguen la distribución $N(0,1)$.

$$
Y = \sum\limits^{v}_{i=1}X^{2}_{i} \Rightarrow Y \sim \chi^{2}_{v}
$$

Es una distribución asimétrica que solo toma valores positivos cuya [[Probabilidad#Función de masa de probabilidad|función de probabilidad]] depende de los grados de libertad.

![[Chi-square.jpg]]

Se puede calcular usando una tabla como la siguiente, donde $\alpha$ es la probabilidad de rechazo (columnas) y $v$ los grados de libertad (filas).

![[Tabla chi-cuadrado.png]]

Es un modelo de distribución asimétrico que depende de los *grados de libertad* ($v/\alpha$), medida que normalmente está relacionada con el tamaño  de la muestra ($v/\alpha = n-1$). Por ejemplo, $P(\chi^{2}_{31} > 49.50) \simeq 0.025$. Es decir, deja una cola con alrededor de un $2.5\%$ de los datos.