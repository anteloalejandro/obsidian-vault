
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

# Regresión logística

Tenemos los siguientes datos:
- $x \in \mathbb{R}^{D}$ es un vector de $D$ dimensiones.
- $\mathrm{W} \in \mathbb{R}^{D\times C}$ es una matriz de pesos iniciales en la que cada fila representa los pesos de una clase.
- Un clasificador $G = (g_{1}, \dots, g_{C})$
- Un vector de logits $a = f(x, \mathrm{W}) = (g_{1}(x), \dots, g_{C}(x)) = \mathrm{W}^{t}x$, que tiene un tamaño de $C$. Es lo mismo que el clasificador $G$, pero aplicado a la muestra $x$.
- $\mu = \mathcal{S}(a)$ es la distribución de probabilidades para la muestra $x$.

Siendo $x \in \mathbb{R}^{D}$ un vector de $D$ dimensiones, $\mathrm{W} \in \mathbb{R}^{D\times C}$ una matriz de pesos iniciales en las que cada fila representa los pesos de una clase, $a = f(x, \mathrm{W}) = \mathrm{W}^{t}x$ el resultado de aplicar la función predictora de logits a $x$, y $\mu = \mathcal{S(a)}$ la función que nos devuelve el vector de probabilidades, la **regresión logística es**:
$$
p(y \mid x, \mathrm{W}) = \text{Cat}(y \mid \mu)
$$

Como resultado de la regresión logística tendremos $C$ vectores $\mu_{1}, \dots, \mu_{C}$ que corresponden cada uno a una variable categórica $y$, cada uno de tamaño $D$, que contienen la distribución de probabilidad.

> [!important] $\mu_{c} = \mathcal{S}(a)_{c} = p(y = c \mid x, \mathrm{W})$

En resumidas cuentas, ahora la estimación de la probabilidad de que una clase sea correcta depende de la muestra $x$ y se pueden aplicar distintos clasificadores/FDs.

# Aprendizaje por máxima verosimilitud

El objetivo es establecer una forma de aprender la matriz de pesos $\mathrm{W}$ a partir de un conjunto de datos de entrenamiento $\mathcal{D} = \{ (x_{n}, y_{n}) \}_{n=1}^{N}$, donde $x_{n}$ es una muestra e $y_{n}$ la variable categórica para el conjunto de las clases.

Para ello se hace uso de la *log-verosimilitud* condicional, que es el logaritmo natural de $\mathcal{D}$ expresado en función de $\mathrm{W}$. Siendo $\mu_{n} = \mathcal{S(a_{n})}$ y $a_{n} = \mathrm{W}^{t}x_{n}$, se define como:

$$
\begin{align}
\text{LL}(\mathrm{W}) &= \log p(\mathcal{D} \mid \mathrm{W}) \\
&= \log \prod_{n=1}^{N} p(y_{n} \mid x_{n}, \mathrm{W}) 
 = \sum_{n=1}^{N} \log p(y_{n} \mid x_{n, \mathrm{W}}) \\
&= \sum_{n=1}^{N} \log Cat(y_{n} \mid \mu_{n})
 = \sum_{n=1}^{N} \log \prod_{c=1}^{C} \mu_{nc}^{y_{nc}} \\
&= \sum_{n=1}^{N} \sum_{c=1}^{C} y_{nc} \log \mu_{nc}
\end{align}
$$

Más concretamente, para el **aprendizaje por máxima verosimilitud**, escogeremos el valor de $\mathrm{W}$ que mayor probabilidad, es decir, mayor valor de $\text{LL}$ dé.

$$
\mathrm{W}^{*} = \underset{\mathrm{W}}{\mathrm{argmax}}\ \text{LL}(\mathrm{W})
$$

## Aprendizaje por mínima NLL

El riesgo empírico log-pérdida $\mathcal{L}(\mathrm{W})$ es igual la neg-log-verosimilitud, que a su vez es la log-verosimilitud dividido entre el número de muestras $N$ y multiplicado por $-1$.
$$
\mathcal{L}(\mathrm{W}) = \text{NLL}(\mathrm{W}) = - \frac{1}{2} \text{LL}(\mathrm{W})
$$

Si planteamos el aprendizaje por máxima verosimilitud desde el punto de vista de la minimización de errores, entonces escogeremos el vector de pesos que menor valor de NLL dé:

$$
W^{*} = \underset{\mathrm{W}}{\text{argmin}}\ \text{NLL}(\mathrm{W})
$$

# Aprendizaje con descenso por gradiente

El descenso por gradiente es un algoritmo iterativo para minimizar la función $\mathcal{L}(\theta)$ a partir de un valor inicial para el vector de parámetros $\theta_{0}$.

Dados...
- un **factor de aprendizaje** $\eta_{i} > 0$ que puede ser un valor pequeño constante $\forall i,\,\eta_{i} = \eta$
- la **dirección de descenso más pronunciada**, que la negativa del gradiente de $\mathcal{L}(\theta_{i})$, que se escribe $- \nabla \mathcal{L}(\theta_{i})$
... El algoritmo del descenso por gradiente de define así:

$$
\theta_{i+1} = \theta_{i} - \eta_{i} \nabla \mathcal{L}(\theta_{i})
$$

Mientras $\eta$ no sea excesivamente grande y la función $\mathcal{L}$ sea convexa, siempre se converge a un mínimo global (en caso contrario se convergería a un mínimo local). Por tanto valores de $\theta_{0}$ mejor adaptados al problema convergerán más rápido, pero en cualquier caso siempre se convergerá.

Como establecemos $\mathcal{L}(\theta) = \text{NLL}(\theta)$ y $\text{NLL}$ cumple estas características, sabemos que siempre converge.

En lo que respecta al gradiente $\nabla \mathcal{L}(\theta_{i})$, lo dejaremos simplemente como:

$$
\nabla \mathcal{L}(\theta_{i}) = \frac{\partial \ \text{NLL}}{\partial \ \mathrm{W}} = \frac{1}{N} \sum_{i=1}^{N} x_{n} (\mu_{n} - y_{n})^{t}
$$
