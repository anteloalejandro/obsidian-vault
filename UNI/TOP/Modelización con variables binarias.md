
Se usan variables que, en lugar de ser enteras, representan valores que solo pueden tomar como valor 0 o 1.

# Producción acotada

Consideremos la fabricación de un producto $j$, el cual puede producirse o no $x_{j}$. En caso de producirse sólo puede hacerse un nivel comprendido entre $L_{j}$ y $U_{j}$. Para modelizar esta restricción, definimos la siguiente variable binaria.

$$
\begin{align}
\delta_{j} = \begin{cases}
1 \to \text{Si se fabrica el producto } j \\
0 \to \text{Si no se fabrica el producto} j
\end{cases}
\\ \\
L_{j} · \delta_{j} \leq x_{j} \leq U_{j} · \delta_{j}
\end{align}
$$

Si la producción sólo estuviese acotada inferiormente, podríamos pensar que la restricción sería $L_{j} · \delta_{j} \leq x_{j}$, pero esto no garantiza el cumplimiento de la cota inferior (¿?). Como no tenemos una cota inferior, simplemente inventamos una $M_{j}$.
$$
L_{j} · \delta_{j} \leq x_{j} \leq M_{j} · \delta_{j}
$$

Si consideramos el caso en el que debemos decidir si realizar o no una actividad $x_{j}$ cuyo coste tiene una componente fija $K_{j}$ y una componente variable $c_{j} x_{j}$, tendríamos que el coste de $x_{j}$ daría resultado al siguiente modelo **no lineal**:
$$
\text{coste}(x_{j}) = \begin{cases}
0 & \to x_{j} = 0 \\
K_{j} + c_{j} x_{j} & \to x_{j} \geq 0
\end{cases}
$$

Pero, al usar variables binarias, se queda como un modelo lineal:
$$
\text{coste}(x_{j}) = K_{j}\delta_{j} + c_{j}x_{j}
$$
Sin embargo, así no se cubren soluciones en las que $\delta_{j} = 0$ y $x_{j} \neq 0$, que se evita, de nuevo, usando una restricción con una cota superior inventada $M_{j}$. Hay formulaciones alternativas de $\text{coste}$, pero no son lineales.
$$
x_{j} \leq M_{j} \delta_{j}
$$

# Variables en un conjunto de valores

Si una variable $x_{j}$ sólo puede tomar ciertos valores $x_{j} \in \{ a_{1},\dots,a_{n} \}$, tendremos $n$ variables binarias $\delta_{ij} \in \{ 0,1 \}$.

$$
\begin{align}
\delta_{ij} = \begin{cases}
1 \to x_{j} = a_{i} \\
0 \to x_{j} \neq {i}
\end{cases}
\\ \\
\sum_{i=1}^{n} \delta_{ij} = 1 && \forall j
\end{align}
$$

# Disyunción de restricciones

A veces tenemos dos restricciones, pero necesitamos que se cumpla **exactamente una**. Esto no funciona con los modelos discutidos hasta ahora, porque se deben cumplir todas.

La solución es establecer una $\delta$ tal que sea 0 si la primera restricción es la activa, y 1 si la segunda es la activa. Por ejemplo, si la restricción es de cota superior, haríamos algo como:

$$
\begin{align}
[R_{1}] &: a_{1}x_{1} a_{2}x_{2} \leq b_{1} + M · \delta \\
[R_{2}] &: a_{3}x_{1} a_{4}x_{2} \leq b_{2} + M · (1-\delta)
\end{align}
$$

Gracias a la $M$ y $\delta$, se sustituye lo que sería $R_{1}$ por una restricción redundante cuando $\delta=1$, y $R_{2}$ por una restricción redundante (directamente está fuera de la gráfica) cuando $\delta=0$.

![[Modelización con variables binarias - disyunción.png]]

Siendo más generales, si queremos cumplir sólo $k$ de $m$ restricciones, debemos utilizar $m$ variables binarias y añadir una restricción extra que nos diga que sólo puede haber $k$ activas.

$$
\begin{gather}
\delta_{i} = \begin{cases}
1 \to \text{la restricción } i \text{ es activa} \\
0 \to \text{en otro caso}
\end{cases}
\\ \\
f_{1}(x_{1},\dots,x_{n}) \leq b_{1} + M(1-\delta_{1}) \\
\dots \\
f_{m}(x_{1},\dots,x_{n}) \leq b_{m} + M(1-\delta_{m}) \\
 \\
\sum_{i=1}^{m} \delta_{i} = k
\end{gather}
$$

Para hacer que la restricción sea una cota inferior en lugar de una superior, debemos restar $M(1-\delta_{i})$ en lugar de sumar.

# Varios *rhs* válidos en una restricción

Puede darse una situación en la que, para una restricción $f(x_{1},\dots,x_{n}) \leq d$, haya $m$ para la $d$.

$$
\begin{align}
f(x_{1},\dots,x_{n}) \leq &\sum_{i=1}^{m} d_{i} · \delta_{i} \\
&\sum_{i=1}^{m} \delta_{i} = 1
\end{align}
$$

# Relación entre variables

Dadas $\delta_{A}, \delta_{B}, \delta_{C}$, las operaciones lógicas se modelizan así:


| Lógica                         | PL                               |
| ------------------------------ | -------------------------------- |
| $\delta_{A} \lor \delta_B$     | $\delta_{A} + \delta_{b} \geq 1$ |
| $\delta_{A} \oplus \delta_{B}$ | $\delta_{A} + \delta_{B}=1$      |
| $\delta_{A} \land \delta_{B}$  | $\delta_{A}=1; \delta_{B} = 1$   |
