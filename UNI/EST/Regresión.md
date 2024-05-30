---
todo: true
---
Teniendo datos actuales o del pasado sacar la relación que hay entre ellos de modo que se pueda sacar un modelo, en forma de ecuación (como la suma de mínimos cuadrados), de modo que se pueda estimar el valor resultante de un dato que no se ha obtenido.

[[Representaciones gráficas#Gráficos de dispersión]]

Como para cada valor de x en la gráfica puede haber varios valores de y, no solo es una ecuación en vez de una función, sino que además, a la hora de estimar los valores en base a la ecuación, los valores de esos puntos, fluctúan en base a la [[Distribución normal]].
$$y = a+bx + u$$
La $u$ en la ecuación anterior es el error generalmente diremos que es 0, menos cuando tengamos que calcular el error para un valor dado. Los modelos determinísticos tienen una $u$ muy baja, mientras que los modelos estocásticos / modelos aleatorios tienen una $u$ muy alta. Generalmente, cuanta más variedad y cantidad de datos, menor es la $u$.

La $y$ será la variable cuantitativa y $x$ la variable cualitativa, mientras que 
 la $a$ es el Intercepto y la $b$ es la Pendiente.

En principio, $a$ sería el valor de $y$ cuando la pendiente es 0, pero eso en estadística a menudo no tiene sentido. Por ejemplo, en la relación entre altura y peso, la $a$ sería el peso cuando la altura es 0, lo cual no es posible. Por tanto, a menudo la $b$ es un binomio con el valor mínimo mínimo restando a una incógnita.

Como los puntos de la muestra pueden estar por encima o por debajo de la ecuación estimada, se usan los cuadrados con tal ignorar el signo. De ahí, el estar trabajando con sumas de cuadrados (SS).

Cuando hablemos de poblaciones: $Y_{t} = \alpha + \beta · x_{t}$, es decir, se usan caracteres griegos al igual que con los parámetros y estadísticos.

Hay tres hipótesis que se deben cumplir para aplicar un modelo de regresión lineal:
- **Hipótesis de normalidad**: La variable sigue una dist. normal 
- **Hipótesis de homocedasticidad:** La varianza condicional de Y para un valor de X es constante para cualquier valor de X, es decir, X e Y son independientes [[Probabilidad#Independencia de sucesos]].

La calidad del ajuste lo determina el coeficiente de ??, $r^2$.

Las estimaciones no son necesariamente válidas para estimar valores fuera del rango de los datos obtenidos. Las predicciones que hagamos a partir de los datos obtenidos debe limitarse a predicciones dentro del rango de datos obtenidos.

El modelo de regresión tiene su propia [[Análisis de la varianza (ANOVA)|ANOVA]]. Los grados de libertad del numerador es igual al número de monomios en la ecuación que dependen de la $x$, mientras que los grados de libertad del denominador depende del error/residual y es igual a ??.

En un ANOVA bien hecho todos los factores son significativos y la R-cuadrado se aproxima al 95%.

---
$$E(A / B) = a + b · B$$
$$
b = r · \frac{S_{A}}{S_{B}} = \frac{Cov_{A, B}}{S_{A}·S_{B}} · \frac{S_{A}}{S_{B}}
$$
$$
a = \overrightarrow{y} - \overrightarrow{x}·B
$$

---

Si el modelo elegido modelo adecuadamente los datos, pasa algo ¿? con la gráfica del residuo que nos dice si hay que cambiar el modelo (hay mucha dispersión). %%pdf regresión%%

Si al cambiar el modelo a, por ejemplo, una ecuación de segundo grado, y el nuevo factor es significativo, significa que este nuevo modelo es más preciso que el anterior.

Si hay un $\beta_{2}x^2$, $\beta_{2}$ indica que hay una curvatura. junto a $\beta_1$ da a entender si crece, decrece y demás 
Si hay un $\beta_{3}x^3$, $\beta_{3}$ indica la curvatura de la función de regresión aumenta ($\beta_{3} > 0$) o disminuye ($\beta_{3}>0$) 