
# Modelo básico

Primero tenemos una **cinta de entrada** o memoria, compuesta por celdas número potencialmente infinito de celdas, de izquierda a derecha.

En cada celda hay un **símbolo** perteneciente al alfabeto $\Gamma$. El símbolo por defecto es el símbolo vacío o blanco $B$.

También hay un cabezal de lectura-escritura, que **tiene** que llevar a cabo alguna siguientes acciones, **sin quedarse ocioso**:
- Lectura destructiva
- Escritura
- Moverse a la izquierda
- Moverse a la derecha
- ~~Quedarse quieto~~

Tenemos un **control finito** formado por un estado perteneciente a un conjunto finito de estados $Q$, y la función de transición $f$ que determina, paso a paso, la evolución de la computación.

Entre los miembros del conjunto de estados se encuentran un conjunto inicial $q_{0}$ y unos estados finales $F \subseteq Q$.

Además, se define un alfabeto de entrada $\Sigma \subseteq \Gamma - \{ B \}$, de modo que las palabras que pueden ser entrada a la máquina pertenecen a $\Sigma^{*}$.

Las funciones de transición son una función parcial de la forma $f : Q \times \Gamma \to Q \times \Gamma \times \{ L,R \}$, es decir, dados un estado y símbolo del alfabeto de cinta, devuelve un nuevo estado, símbolo y una posición a la que desplazarse, que puede ser $L$ (izquierda) o $R$ (derecha).

Si el estado al que se llega, $p$, dado $f(q, a) = (p,b,D) : q,p\in Q ,\, a,b \in \Gamma,\,D\in \{ L,R \}$, no está definido, el cabezal **no se desplaza** y se mantiene el estado original $q$.

La **instantánea** de la máquina de Turing está formado por la posición del cabezal, en contenido de la cinta, y el estado del control finito. Formalmente:
$$
M = \left( \Sigma, \Gamma, Q, f, B, q_{0}, F \right) 
$$

Añadiremos también, siendo $x \in \Sigma^{*}$, la notación $M(x)\downarrow$ para denotar que la máquina $M$ termina la computación al procesar la palabra $x$, *independientemente de si acepta la palabra o no*. Del mismo modo, $M(x)\uparrow$ para denotar que $M$... 

Podemos expresar la instantánea de la máquina con la siguiente notación, donde $i$ es la posición del cabezal y $n$ el último dígito antes de una secuencia infinita de blancos.
$$
a_{1} a_{2} \dots a_{i-1} \ q \ a_{i}a_{i+1} \dots a_{n}
$$

> [!example] Notación de la instantánea en distintos casos
> **Cabezal dentro de la secuencia de infinita de blancos**
> $a_{1}a_{2} \dots a_{n}BB \dots q$
> 
> **Cabezal en secuencia de blancos, con una palabra al final**
> $a_{1}a_{2}\dots a_{n} B p BB\dots a'$

## Alcanzabilidad

Es la capacidad de llevar de un estado de la máquina de Turing, representado por una instantánea, a otra.

- Directa  $I_{1} \vdash_{M} I_{2}$: Alcanzable en un paso, mediante una sola transición de una $f$ cualquiera.
- Indirecta $I_{1} \vdash^{*}_{M} I_{2}$.
    - Se alcanza aplicando la propiedad transitiva a $\vdash_{M}$.
    - Se puede llegar en 0 pasos a si mismo (propiedad reflexiva), es decir, $I \vdash^{*}_{M} I$.

Por tanto, existe una relación de alcanzabilidad indirecta entre $I_{1}$ e $I_{2}$ si y sólo si son iguales o si hay una $I_{3}$ alcanzable directamente desde $I_{1}$ a partir de la cual se puede alcanzar indirectamente la $I_{2}$. 

$$
I_{1} \vdash^{*}_{M} I_{2} \iff (I_{1}=I_{2}) \lor (\exists I_{3}: I_{1} \vdash_{M} I_{3} \vdash^{*}_{M}I_{2})
$$

Es decir, sabemos que es alcanzable si, a partir del estado inicial, podemos ir llegando a estados siguientes hasta llegar a uno que sea igual al estado final.

## Lenguaje reconocido

Todas aquellas cadenas $x$ del alfabeto de entrada para las cuales se puede llegar desde el estado inicial $q_{0}$ a una instantánea cuyo estado es un estado final (obviamente, el contenido de la cinta debe además estar formado por símbolos del alfabeto de salida). 

$$
L(M) = \{ x \in \Sigma^{*} : q_{0}x \vdash^{*}_{M} \alpha p \beta,\,  p \in F,\,  \alpha,\beta \in \Gamma^{*} \}
$$

Dos máquinas son equivalentes si ambas reconocen el mismo lenguaje.

El estado $p \in F$ podría continuar la ejecución, pero asumiremos que los estados finales también detienen la ejecución. Esto no es problema porque todas las máquinas de Turing en las que se continúa en el estado final existe una máquina equivalente que se detiene en sus estados finales.

Teniendo esto en cuenta, si $q_{0} \in F$, la máquina empieza bloqueada (el cabezal no se mueve) pero podemos seguir metiendo palabras, por lo que $L(M) = \Sigma^{*}$. Hay una máquina equivalente que también acepta $\Sigma^{*}$, así que también diremos que $q_{0}$ no puede ser final porque no necesitamos que lo sea.

# Tipos de lenguajes

$\mathcal{L}_{R} \subset \mathcal{L}_{REN}, \mathcal{L}_{REN} = \mathcal{L}_{0}$

## Lenguajes Recursivamente Enumerables

Son los lenguajes que pueden reconocer las máquinas de Turing. Equivalen al $\mathcal{L}_{0}$ en la jerarquía de Chomsky, que es la clase de los lenguajes que se pueden formar a partir de una $x \in \Sigma^{*}$ usando cualquier regla o conjunto de reglas, sin restricciones.

$$
\mathcal{L}_{REN} = \mathcal{L}_{0}
$$

Al procesar una cadena, una máquina de Turing puede hacer 3 cosas:
- Al procesar $x$ se detiene en un estado final tras un número de transiciones, en cuyo caso **se acepta $\boldsymbol x$**. Esta es el único caso en el que sucede.
  $M(x)↓ \land\ p \in F \iff x \in L(M)$
- Al procesar $x$ se detiene en un estado *no* final tras un número de transiciones, por lo que **no se acepta $\boldsymbol x$**.
  $M(x)↓ \land \ p \not\in F \implies x \not\in L(M)$
- Al procesar $x$ no se detiene en un número finito de pasos, por lo que nunca alcanza en un estado final y **no se acepta $\boldsymbol x$**. 
  $M(x) ↑ \implies x \not\in L(M)$

> [!warning] Reconocer *no* significa aceptar
> Las máquinas de Turing **reconocen** cualquier $x \in \Sigma^{*}$, pero no **aceptan** necesariamente cualquier $x \in \Sigma^{*}$.

Como puede darse el caso de proceso de una cadena no se detenga, se introduce una incertidumbre respecto al resultado al aplicar este tipo de máquinas al mundo real: "¿No se detiene porque no se acepta, o porque no ha encontrado el resultado *todavía*?".

Lo importante aquí es que podemos hacer una máquina de Turing que **acepte** cadenas que pertenezcan a un $L \in \mathcal{L}_{REN}$, pero no podemos hacer una máquina que las rechace.

Además, como no se garantiza la finalización y por tanto puede no tener una salida, el procesado de cadenas no se considera un algoritmo, sino un procedimiento.

## Lenguajes Recursivos

Los lenguajes recursivos son todos aquellos lenguajes recursivamente enumerables para los que, para cualquier cadena de entrada, el procesamiento de dicha cadena siempre se detiene, con o sin aceptación.

$$
\mathcal{L}_{R} \subset \mathcal{L}_{REN}
$$

Además, según la jerarquía de Chomsky son un subconjunto de las gramáticas incontextuales, que a su vez son un subconjunto de las gramáticas contextuales.

$$
\mathcal{L}_{R} = \mathcal{L}_{3} \subset \mathcal{L}_{2} \subset \mathcal{L}_{1} \subset \mathcal{L}_{0}
$$

Por tanto, a diferencia de en las máquinas de Turing que aceptan todos lenguajes de la clase $\mathcal{L}_{REN}$, las que sólo aceptan los $\mathcal{L}_{R}$ sólo contemplan dos posibilidades al procesar una cadena:
- Detenerse y **aceptar**
- Detenerse y **rechazar**

La principal ventaja de estos lenguajes es que podemos hacer una máquina que, dada una cadena de entrada válida, la **acepte o rechace**, en lugar de sólo poder aceptarla.

## Ejemplo

$$
\begin{align}
L(M) &= \{ a^{n}b^{n} : n \geq 1 \} \\
M &= (\{ a,b \}, \{ a,b,X,Y,B \}, \{ q_{0},q_{1},q_{2},q_{3},q_{4} \}, f, B, q_{0}, {q_{4}})
\end{align}
$$


| $f$     | a               | b   | X   | Y               | B   |
| ------- | --------------- | --- | --- | --------------- | --- |
| $q_{0}$ | $(q_{1}, X, R)$ |     |     | $(q_{3}, Y, R)$ |     |

Este algoritmo cambia, en orden, las $a$ por $X$ y las $b$ por $Y$.
- Si hay más $a$ o más $b$, avanza en una dirección hasta que se sale
- Si no son contiguas...

# Funciones computables

Hasta ahora se ha discutido como usar máquinas de Turing para reconocer lenguajes, pero también se puede usar para computar funciones.

> [!info] Como ya no estamos buscando aceptar o rechazar cadenas, $F = \emptyset$.

Por simplicidad, consideraremos funciones parciales (es decir, no definidas para todas las entradas) con diferente número de datos de entrada y de salida, todos ellos números enteros.

$$
\begin{align}
g: \mathbb{N}^{m} &\to \mathbb{N}^{k} \\
g(n_{1},\dots, n_{m}) &= (i_{1},\dots,i_{k})
\end{align}
$$

Las máquinas tendrán como alfabeto de entrada $\Sigma = \{ 0,1 \}$, y codificaremos la entrada de la máquina de la siguiente forma:
- Un número $n$ se codifica mediante $n$ ceros: $n \to 0^{n}$.
- El $1$ sirve como separador de cada número de la tupla de entrada: $(n_{1},\dots n_{m}) \to 0^{n_{1}} 1 \dots 1 0^{n_{m}}$

El alfabeto de salida se codifica igual que el de entrada $\Gamma = \Sigma = \{ 0,1 \}$, aunque la cinta de salida sigue pudiendo tener celdas en blanco.

Sin embargo, para que la función codificada por la máquina se considere válida para una entrada, la salida resultante **no debe tener símbolos $B$ intercalados**.

En caso contrario, se considera que la entrada no es válida (indefinida) para empezar. Si que puede tener un número indeterminado de $B$ al principio y al final de la salida, que se obviarán en el resultado final.

La máquina detendrá la computación cuando se quede sin transiciones válidas para el estado actual. A menudo se define un **estado de aceptación** $q_{f}$ que no tiene transiciones.

## Funciones alfabéticas

Aparte de las numéricas, se puede calcular funciones alfabéticas de la forma $g: \Sigma^{*} \to \Delta^{*}$, donde $B \not\in \Sigma,\Delta$, que convierten cadenas de un alfabeto a cadenas equivalentes en otro alfabeto. Es decir, la máquina $M$, que implementa la función $g$, **transduce** cadenas $x \in \Sigma^{*}$ a cadenas $y \in \Delta^{*}$ de acuerdo con la **transducción** $g$.

Las funciones numéricas de la forma $g': \mathbb{N} \to \mathbb{N}$ se pueden considerar también funciones alfabéticas gracias a la codificación en $\{ 0,1 \}$ discutida anteriormente ($\mathbb{N} \equiv \{ 0 \}^{*}$). Del mismo modo, existen funciones alfabéticas de codificación $cod: \Sigma^{*} \to \mathbb{N}$ que convierten palabras en el lenguaje de entrada un número natural, y funciones alfabéticas de decodificación $dec: \mathbb{N} \to \Delta^{*}$ que transforman un número natural en una palabra del alfabeto de salida.

Así, podemos transformar $g(x) = y$ en $dec(g'(cod(x))) = y$ y pasar toda la lógica necesaria para la transformación a la $g'$, que sólo trabaja con números, siempre y cuando la codificación y decodificación también se implementen correctamente.

De este modo, podemos asumir que no se pierde generalidad ni funcionalidad al trabajar solamente con funciones numéricas.

## Funciones características

Como se ha mencionado en las funciones alfabéticas, a todo lenguaje $L \subseteq \Sigma^{*}$ se le pueden asociar funciones parciales de la forma $f:\Sigma^{*} \to \{ 0 \}^{*}$.

En las funciones características dicha función, llamada $\eta_{L,\Sigma}$ en lugar de $f$, se cumple que el lenguaje está formado exclusivamente por aquellas cadenas que dan como resultado $\lambda$.

$$
L = \{ x \in \Sigma^{*} : \eta_{L, \Sigma}(x) = \lambda \}
$$

Es decir, $\eta$ es una función característica que representa el lenguaje, aceptando sólo aquellas palabras que devuelven $\lambda$ al usarlas como entrada.

Por tanto, podemos decir que $L$ es recursivamente enumerable si y sólo si existe una función $\eta_{L,\Sigma}$ que sea computable.

$$
L \in \mathcal{L}_{REN} \iff \exists \eta_{L,\Sigma} \text{ turing-computable}
$$

También podemos trabajar con funciones *totales* $\varphi_{L,\Sigma} : \Sigma^{*} \to \{ 0 \}^{*}$ de forma que:
- $x \in L \implies \varphi_{L,\Sigma} = \lambda$
- $x \not\in L \implies \varphi_{L, \Sigma} \in \{ 0 \}^{+}$

Al ser totales, podemos relacionar estas funciones con los lenguajes recursivos, en vez de con $\mathcal{L}_{REN}$. Concretamente, diremos que el lenguaje es recursivo sólo si hay alguna de estas funciones que sea computable, y que si no es recursivo no hay ninguna.
$$
\begin{align}
L \in \mathcal{L}_{R} &\iff \exists \varphi_{L,\Sigma} \text{ turing-computable} \\
L \in \mathcal{L}_{REN} - \mathcal{L}_{R} &\implies \not\exists \varphi_{L,\Sigma} \text{ turing-computable}
\end{align}
$$
# 
$\eta$ devuelve $\lambda$ si la entrada pertenece al lenguaje.