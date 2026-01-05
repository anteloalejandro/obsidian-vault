
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

> [!example]
> $y = 2 \underset{\text{one-hot}}{\to} y = (0,1,0)^{t}$ y $\theta = (0.5, 0.5, 0)^{t}$ en notación *one-hot*.
> $$
> \text{Cat}\left(y = (0, 1, 0)^{t} \mid \theta = (0.5, 0.5, 0)^{t}\right) = 0.5^{0} · 0.5^{1} · 0.5^{0} = 0.5
> $$

# Codificación *softmax*

Todo clasificador $G$ definido mediante funciones discriminantes $( g_{1}, \dots, g_{C} )$ puede representarse mediante un clasificador equivalente $G'$ con **funciones discriminantes normalizadas** probabilísticamente $( g'_{1}, \dots, g'_{C} )$ [[Aprendizaje de funciones discriminantes#Clasificadores equivalentes]]. El objetivo es que $\sum_{c}g_{c}(x) = 1$.

La **función *softmax*** sirve para transformar el vector de **logits** $(g_{1}(x),\dots, g_{C}(x))$ que conforman un clasificador en un vector normalizado $(g'_{1}(x), \dots, g'_{C}(x))$.

Primero, se hace uso de $e$ para sacar un una función discriminatoria que sea equivalente, es decir, que se pueda emplear para que dé como resultado la misma clase.

$$
\begin{matrix}
\begin{align}
c(x) &= \underset{c}{\mathrm{argmax}}\ g_{c}(x) \\

&= \underset{c}{\mathrm{argmax}}\ e^{g_{c}(x)},
&& \text{por ser } f(x) =e^{x} \text{ monótona y creciente} \\

&= \underset{c}{\mathrm{argmax}}\ \frac{e^{g_{c}(x)}}{\sum_{c}e^{g_{c}(x)}},
&& \text{por ser } f(x) = x·k \text{ monótona y creciente}
\\
\end{align}
\\
\big\Downarrow
\\
g'_{c}(x) = \dfrac{e^{g_{c}(x)}}{\sum_{c}e^{g_{c}(x)}}
\end{matrix}
$$


> [!important] Nótese siempre se cumple que $\forall c,\,g'_{c}(x) \in [0, 1]$ y que $\sum_{c}g'_{c}(x) = 1$


En base a esta definición de $g'_{c}(x)$, definimos la función *softmax* $\mathcal{S}$ como la función que dado un clasificador $G$, devuelve un clasificador equivalente normalizado $G' \in [0,1]^{C}$ (o lo que es lo mismo, uno **estocástico**).

$$
G' = \mathcal{S}(G) = S\left( (g_{1}, \dots, g_{C}) \right) = (g'_{1}, \dots, g'_{C}) = \left( \dfrac{e^{g_{1}}}{\sum_{c}e^{g_{c}}}, \dots,  \dfrac{e^{g_{C}}}{\sum_{c}e^{g_{c}}}\right) 
$$

# Modelo probabilístico de clasificación

En el modelo probabilístico de clasificación, se predicen las probabilidades de **todas las clases** a partir de un clasificador en codificación *softmax* sacado a partir de una **función predictora de *logits*** $f: \mathcal{X} \to \mathbb{R}^{C}$ de que depende un un vector de parámetros $\theta$ tal que $f(x, \theta) = G$.

Siendo $x$ la muestra e $y$ la variable categórica (es decir, la etiqueta de clase incógnita) en notación *one-hot*.
$$
p(y \mid x, \theta) = \text{Cat}(y \mid \mathcal{S}(G)) = \prod_{c} \mathcal{S}(G)_{c}^{y_{c}}
$$
Lo importante aquí es que la función predictora $f(x, \theta)$, y por consiguiente $S(G)$ puede ser diferente para para cada clase, denotado por $S(G)_{c}$.