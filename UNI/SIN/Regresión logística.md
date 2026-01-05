
# Codificación *one-hot*

Se aplica a una **variable categórica** $y$ que toma un valor entre $C$ posibles valores, $\{ 1,\dots, C \}$.

Las variables categóricas son variables aleatorias que toman un valor de un conjunto finito de categorías no necesariamente ordenadas. Podrían ser, por ejemplo, un color en espacio RGB, pero lo usaremos para etiquetas de clase.

El trabajo de la notación *one-hot* es convertir estas variables categóricas en un vector de tamaño $C$. Para el valor en la $i$-ésima posición de dicho vector, se comprueba si $y$ es igual al $i$-ésimo valor en el conjunto de posibles valores $\{ 1,\dots,C \}$ y si se cumple el valor es $1$ pero en caso contrario es $0$.

$$
y \in \{ 1,\dots,C \} \quad \underset{\text{one-hot}}{\to} \quad 
y = \begin{pmatrix} y_{1} \\ \dots \\ y_{C} \end{pmatrix} =
\begin{pmatrix} \mathbb{I}(y = 1) \\ \dots \\ \mathbb{I}(y = C) \end{pmatrix} \in \{ 0,1 \}^{C}
, \quad \mathbb{I}(x) = \begin{cases} 1 \text{ si } x \text{ es } \texttt{true} \\ 0 \text{ si } x \text{ es } \texttt{false} \end{cases}
$$


> [!important] Como **solo una** de las condiciones se cumplirá, sólo una dará 1 y $\sum_{c}y_{c} = 1$

# Distribución categórica

Una **distribución categórica** es una distribución de probabilidades que indica la probabilidad de que una variable categórica $y$ ocurra dado un vector de parámetros $\theta \in [0, 1]^{C} : \sum_{c}\theta_{c} = 1$.

$$
p(y \mid \theta) = \text{Cat}(y \mid \theta) = \prod_{c=1}^{C} \theta_{c}^{y_{c}}
$$

Por ejemplo, para $y = 2 \underset{\text{one-hot}}{\to} y = (0,1,0)^{t}$ en notación *one-hot*.
$$
\text{Cat}\left(y = (0, 1, 0)^{t} \mid \theta = (0.5, 0.5, 0)^{t}\right) = 0.5^{0} · 0.5^{1} · 0.5^{0} = 0.5
$$
