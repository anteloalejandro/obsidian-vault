
Una distribución de probabilidad que tiene probabilidades iguales para todos los subintervalos dentro de un intervalo. Por ejemplo, la función `Math.random()` de Java presenta una distribución uniforme en la que todos los valores entre 0 y 1 tienen la misma probabilidad de suceder, y todos los valores fuera de ese intervalo también tienen la misma probabilidad de suceder (0). Se expresa así:
$$
X \sim U(a, b)
$$
Donde $a$ es el valor mínimo que puede tomar $X$ y $b$ es el valor máximo.

![[uniform-distribution.jpeg]]

La probabilidad se calcula de la siguiente manera:
$$
P(x) = f(x) = 
\begin{cases}
\frac{1}{b-a} & \text{si } a\leq x \leq b \\ \\

0 & \text{si no}
\end{cases}
$$

# Media

La [[Estadísticos descriptivos#Media|media]] en la distribución uniforme es:
$$
\mu_{x} = \frac{a+b}{2}
$$

# Varianza 

La [[Estadísticos descriptivos#Varianza|varianza]] en la distribución uniforme es:
$$
\sigma_{x}^{2} = \frac{(b-a)^{2}}{12}
$$