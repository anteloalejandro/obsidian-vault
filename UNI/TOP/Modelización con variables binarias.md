
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

Si la producción sólo estuviese acotada inferiormente, podríamos pensar que la restricción sería $L_{j} · \delta_{j} \leq x_{j}$, pero esto no garantiza que el valor de. Como no tenemos una cota inferior, simplemente inventamos una $M_{j}$.
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

# Relación entre variables binarias

Dadas $\delta_{A}, \delta_{B}, \delta_{C}$, las operaciones lógicas se modelizan así:


| Lógica                         | PL                               |
| ------------------------------ | -------------------------------- |
| $\delta_{A} \lor \delta_B$     | $\delta_{A} + \delta_{b} \geq 1$ |
| $\delta_{A} \oplus \delta_{B}$ | $\delta_{A} + \delta_{B}=1$      |
| $\delta_{A} \land \delta_{B}$  | $\delta_{A}=1; \delta_{B} = 1$   |

Dadas las variables binarias $\delta_{A}, \delta_{B}, \delta_{i} y \delta_{j}$, se pueden dar los siguientes casos a la hora de modelizar relaciones (también llamadas implicaciones):

$$
\begin{matrix}
\underset{i=1,\dots,n}{
    \begin{Bmatrix}
    \delta_{A} \\ \text{SOME } \delta_{i} \\ \text{ALL } \delta_{i}
    \end{Bmatrix}
}
\implies
\underset{j=1,\dots,m}{
    \begin{Bmatrix}
    \delta_{B} \\ \text{SOME } \delta_{j} \\ \text{ALL } \delta_{j}
    \end{Bmatrix}
}
\\
\text{SOME } \delta_{i} \equiv \delta_{1} \lor \dots \lor \delta_{n}
\\
\text{ALL } \delta_{i} \equiv \delta_{1} \land \dots \land \delta_{n}
\end{matrix}
$$

Sin embargo, al modelizar sistemas de programación lineal, se deben usar enteros, y las relaciones entre variables binarias se tienen que convertir a operaciones con enteros.

## Caso 1:  $\boldsymbol {\delta_{A} \implies \delta_{B}}$

Es el caso más trivial. Por ejemplo, podríamos tener la relación $\delta_{A} = 1 \implies \delta_{B} = 1$. Como la operación no es bidireccional, sólo las siguientes opciones son posibles:

| $\delta_{A}$ | $\delta_{B}$ |
| ------------ | ------------ |
| 0            | 0            |
| 0            | 1            |
| 1            | 1            |

Es decir, el único caso que no puede darse es en el que $\delta_{A} = 1, \delta_{B} = 0$. Por tanto, la forma más sencilla de representar esto con variables enteras es $\boldsymbol {\delta_{A} \leq \delta_{B}}$.

Si, por el contrario, tenemos la relación $\delta_{A} = 0 \implies \delta_{B} = 0$, la única opción no válida es $\delta_{A}=0, \delta_{B}=1$, por lo que ahora se debe cumplir la relación $\boldsymbol{\delta_{A} \geq \delta_{B}}$.

Para casos con 0 y 1, como $\delta_{A} = 0 \implies \delta_{B} = 1$, la tabla de opciones posibles luce así:

| $\delta_{A}$ | $\delta_{B}$ |
| ------------ | ------------ |
| 0            | 1            |
| 1            | 0            |
| 1            | 1            |

La relación con enteros es un poco más complicada, pero se puede aprovechar que las variables binarias sólo tienen valor 0 o 1 para crear la expresión $\boldsymbol{1-\delta_{A} \leq \delta_{B}}$.

| $\delta_{A}$ | $\delta_{B}$ | $1-\delta_{A}$ | $\leq$ |
| ------------ | ------------ | -------------- | ------ |
| 0            | 0            | 1              | NO     |
| 0            | 1            | 1              | SÍ     |
| 1            | 0            | 0              | SÍ     |
| 1            | 1            | 0              | SÍ     |
En definitiva, las relaciones binarias $\delta_{A} \implies \delta_{B}$ se modelan como $\text{expr}_{A} \leq \text{expr}_{B}$, donde $\text{expr}_{i} = \begin{cases} \delta_{i} & \text{buscamos 1} \\ 1-\delta_{i} & \text{buscamos 0} \end{cases}$. Esto también se cumple para $\delta_{A} = 0 \implies \delta_{B} = 0$.

## Caso 2: $\boldsymbol{\delta \implies \mathrm{SOME}\ \delta_{i}}$

SOME es un *shorthand* de $\bigvee_{j=1}^{n} \delta_{j} = 1$, que viene a significar que **alguna** de las variables binarias debe ser 1. El caso $\delta = 1 \implies \text{SOME } \delta_{j}=1$ pasa ha expresarse con variables enteras como:

$$
\delta = 1 \implies \bigvee_{j=1}^{n} \delta_{j} = 1 \ \boldsymbol \equiv \  \delta \leq \sum_{j=1}^{n} \delta_{j}
$$

Así permitimos que cuando $\delta = 0$, todas otras variables puedan ser 0 o 1, pero que cuando $\delta=1$, al menos una debe serlo también.

Para crear una expresión donde $\delta = 0$ se vuelve aplicar la técnica de $1-\delta$ en la desigualdad, pero para crear una donde TODAS sean 0, debemos usar ALL en vez de SOME.

## Caso 3: $\boldsymbol{\delta \implies \mathrm{ALL}\  \delta_{i}}$

ALL es un *shorthand* de $\bigwedge_{j=1}^{n} \delta_{j} = 1$, que significa que **todas** las variables binarias deben ser 1. El caso $\delta = 1 \implies \text{ALL}\ \delta_{i} = 1$ se representa como $n$ expresiones de la forma $\delta=1 \implies \delta_{j} = 1$ iguales a las del caso 1.

$$
\delta = 1 \implies \bigwedge_{j=1}^{n} \delta_{j} = 1
\equiv
\begin{Bmatrix}
    \delta=1 \implies \delta_{1} = 1 \\
    \dots \\
    \delta=1 \implies \delta_{n} = 1
\end{Bmatrix}
\equiv
\begin{matrix}
    \delta=1 \leq \delta_{1} = 1 \\
    \dots \\
    \delta=1 \leq \delta_{n} = 1
\end{matrix}
$$
Si sumamos todos los $\delta_{j}$, el valor que tendrá la suma si todos son 1 será, obviamente, $n$. Por tanto, podemos expresar las desigualdades anteriores con una sola desigualdad:

$$
n · \delta \leq \sum_{j=1}^{n} \delta_{j}
$$

Así, si $\delta = 1$, sólo se cumplirá la desigualdad si todos los $d_{j}$ suman $n$, y si $\delta = 0$ todo el lado izquierdo de la desigualdad es 0 y el lado derecho siempre se cumple.

## Caso 4: $\boldsymbol{\mathrm{SOME}\ \delta_{i} \implies \delta}$

En este caso si **alguna** de las variables binarias $\delta_{i}$ es 1, entonces $\delta=1$. Dicho de otro modo, sólo se permite que $\delta=0$ si todas las demás son 0. La forma más sencilla de implementar esto $\delta = \max \{ \delta_{i} \}$.

Si no se puede usar la función $\max$, se puede expresar haciendo $n$ restricciones de la forma $\delta_{j} \leq \delta$, de modo que para que se cumplan todas $\delta$ debe ser mayor que todas las demás variables binarias. Al igual que en el caso 3, se pueden condensar todas estas desigualdades en una sola.
$$
\begin{gather}
\delta_{1} \leq \delta \\
\dots \\
\delta_{j} \leq \delta
\end{gather}
\equiv
\sum_{j=1}^{n} \delta_{n} \leq n · \delta
$$

## Caso 5: $\boldsymbol{\mathrm{SOME}\ \delta_{i} \implies \mathrm{SOME}\ \delta_{j}}$

En este caso se busca que si **alguna** de las variables binarias de un conjunto es 1, **alguna** de las variables binarias del otro conjunto también lo sean.

Esto se puede ver como un caso general del $\mathrm{SOME}\ \delta_{i} \implies \delta$, en el que en vez de tener $n$  expresiones de la forma $\delta_{i} \leq \delta$, tenemos $\boldsymbol n$ expresiones de la forma $\delta_{i} \leq \delta'_{1} + \dots + \delta'_{m}$, donde $\delta'_{j}$ son las variables binarias del segundo conjunto, y $m$ el tamaño de éste.

En este caso no se puede simplificar más, por lo que siempre tendremos esas $n$ expresiones. Lo que sí podemos hacer es compactar cada una de las expresiones con una suma.

$$
\delta_{i} \leq \sum_{j=1}^{m}\delta'_{j}
$$

## Caso 6: $\boldsymbol{\mathrm{SOME}\ \delta_{i} \implies \mathrm{ALL}\ \delta_{j}}$

Ahora se busca que si **cualquiera** de las variables binarias del primer conjunto es 1, que **todas** las del segundo lo sean también.

Se puede ver como la combinación de $n$ relaciones de la forma $\delta \implies \text{ALL}\ \delta_{j}$, siendo $n$ la talla del primer conjunto, por lo que tendríamos $n$ expresiones de la forma...

$$
m · \delta_{i} \leq \sum_{j=1}^{m} \delta'_{j}
$$

## Caso 7: $\boldsymbol{\mathrm{ALL}\ \delta_{i} \implies \delta}$

Para esta relación se busca que $\delta$ sólo esté obligada a ser 1 si todas las demás variables binarias también lo son. Dicho de otro modo, si hay alguna variable binaria que no sea 1, entonces $\delta$ puede ser lo que quiera.

Por tanto tenemos que forzar que si todas las $\delta_{i} = 1$, entonces $\delta = 1$, pero que si hay alguna que no, $\delta$ no tenga restricciones. La forma de conseguir esto es con la expresión...
$$
\sum_{i=1}^{n} \delta_{i} \leq \delta + (n-1)
$$

Así, tenemos los siguientes casos:
- $\exists \delta_{i} = 0 \iff \sum \delta_{i} \leq (n-1)$, por lo que el valor de $\delta$ no importa.
- $\forall \delta_{i} = 1 \iff \sum \delta_{i} = n \geq (n-1)$, por lo que sólo será cierto si $\delta=1$.

## Caso 8: $\boldsymbol{\mathrm{ALL}\ \delta_{i} \implies \mathrm{SOME}\ \delta_{j}}$

En esta relación se busca que alguna de las variables del segundo conjunto sea 1 sólo si todas las variables del primer conjunto también lo son. 

Es un caso general de $\text{ALL}\ \delta_{i} \implies \delta$, aplicado a $m$ variables binarias en el lado derecho en lugar de 1. Aplicando la lógica del caso anterior, se puede describir esta relación entre variables binarias con una sola desigualdad:

$$
\sum_{i=1}^{n} \delta_{i} \leq (n-1) + \sum_{j=1}^{m} \delta'_{j}
$$

Así, cuando $\forall \delta_{i} = 1$, bastará con que una sola de las variables binarias del segundo conjunto sea 1 para que se cumpla la desigualdad.

## Caso 9: $\boldsymbol{\mathrm{ALL}\ \delta_{i} \implies \mathrm{ALL}\ \delta_{j}}$

Aquí se obliga a que si todas las variables del primer conjunto son 1, obligatoriamente todas las variables del segundo conjunto deberán serlo también.

Esto se puede ver como $m$ casos $\text{ALL}\ \delta_{i} \implies \delta$ independientes, por lo que tendremos $m$ expresiones de la forma:

$$
\sum_{i=1}^{n} \delta_{i} \leq \delta_{j}' + (n-1)
$$

# Relación entre restricciones

Las restricciones en los modelos de programación lineal con enteros a menudo se pueden expresar en términos de relaciones entre variables binarias.

Por ejemplo, consideremos la condición *"Si se fabrica alguna **silla o armario**, se debe fabricar **alguna mesa**"*. Siendo $s,a,m$ el número de sillas, armarios y mesas, respectivamente, podríamos expresarlo con lógica binaria:

$$
(s\geq 1) \lor (a \geq 1) \implies (m\geq 1)
$$

Siguiendo el caso 4 de las reglas de relación entre variables binarias, obtenemos la siguiente expresión:

$$
(s\geq 1) + (a \geq 1) = 2 (m\geq 1)
$$

<strong style="text-align: center; display: block">
ESTO ESTÁ MAL, HAY QUE HACER OTRA COSA
</strong>
