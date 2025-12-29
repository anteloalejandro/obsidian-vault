
# Teoría de la probabilidad

## El problema de la calificación

Se llama así a la imposibilidad práctica de conocer y comprobar todas las **calificaciones** (aka. condiciones) que habría que garantizar para asegurar el cumplimiento de una acción o evento.

Es decir, es muy difícil saber todas las condiciones que hay que comprobar y es imposible saber si las hemos comprobado todas o nos hemos dejado alguna.

## Inferencia probabilística

El conocimiento probabilístico de un problema se puede representar con una tabla que tiene como índice todas las permutaciones posibles de los valores de las variables aleatorias de interés, y como entrada para cada índice la probabilidad de que se de esa permutación en específico.

Por ejemplo, dadas las variables aleatorias...
$$
\begin{align}
& \text{Dolor}: & D \in \{ 0, 1 \}  \\
& \text{Caries} : & C \in \{ 0, 1 \} \\
& \text{Hueco} : & H \in \{ 0, 1 \}
\end{align}
$$
... podríamos tener una tabla como la siguiente para representar $P(D = d, C = c, H = h)$.

| d      | c   | h   | P                |
| ------ | --- | --- | ---------------- |
| $0$    | $0$ | $0$ | $0.576$          |
| $0$    | $0$ | $1$ | $0.008$          |
| $0$    | $1$ | $0$ | $0.144$          |
| $0$    | $1$ | $1$ | $0.072$          |
| $1$    | $0$ | $0$ | $0.064$          |
| $1$    | $0$ | $1$ | $0.012$          |
| $1$    | $1$ | $0$ | $0.016$          |
| $1$    | $1$ | $1$ | $0.108$          |
| *Suma* |     |     | $\mathit{1.000}$ |

A partir de esta tabla, podemos averiguar que $P(D = 0, C = 0, H = 0) = 0.576$ y que $P(C = 1)$ es igual a la suma de todas las permutaciones para las que $c = 1$, es decir, $0.34$. A esto se le conoce como la **regla de la suma** y la **regla del producto**.


> [!NOTE] Regla de la suma
> 
> $$
> P(x) = \sum_{y} P(x, y)
> $$
> Donde $y$ puede ser una lista de variables $a, b, \dots$

> [!NOTE] Regla del producto
> $$
> P(x, y) = P(x)P(y \mid x) = P(y)P(x \mid y)
> $$
> Por lo que para sacar la probabilidad de $x$ dado $y$ se puede hacer $P(x \mid y) = P(x, y) / P(y)$

> [!NOTE] Teorema de Bayes
> Se basa en la regla del producto, y permite actualizar el conocimiento sobre una hipótesis $y$ después de observar una evidencia $x$.
> $$
> P(y \mid x) = \frac{P(x,y)}{P(x)} = \frac{P(y)P(x \mid y)}{P(x)}
> $$
> Es particularmente útil para calcular $P(y \mid x)$ a partir de un $P(x \mid y)$ ya conocido.


Si no tenemos la tabla completa, que en ejemplos más complicados es lo más común, se pueden usar estas reglas para calcular la probabilidad de un suceso.

## Independencia

Decimos que $x$ e $y$ son independientes si sabiendo que sucede $x$ la probabilidad de que suceda $y$ no cambia y viceversa, es decir, que una variable aleatoria no nos da información sobre el valor de otra. Además, si son independientes, $P(x, y) = P(x)P(y)$

$$
\begin{align}
x\text{ e }y\text{ son independientes}
&\iff P(x \mid y) = P(x) \\
&\iff P (y \mid x) = P(y) \\
&\iff P(x, y) = P(x)P(y)
\end{align}
$$
Si no tenemos las probabilidades de todas las permutaciones necesarias para calcular si son independientes, se debe hacer una suposición informada sobre si lo son o no. Por ejemplo, en el caso de las caries y los huecos, sabemos que ambos sucesos están relacionados aunque no tengamos los datos, y también sabemos que el tiempo meteorológico en el momento en el que asisten a la consulta es independiente a ambos.
