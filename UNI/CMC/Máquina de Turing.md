
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

- Directa: En un paso. $\vdash_{M}$
- Indire

## Lenguaje reconocido

Todas aquellas cadenas del alfabeto de entrada llegamos desde el estado inicial a una instantánea cuyo estado es un estado final. Si dos máquinas son equivalentes si ambas reconocen el mismo lenguaje.

El estado $p \in F$ podrían continuar la ejecución, pero asumiremos que los estados finales también detienen la ejecución. Esto no es problema porque todas las máquinas de Turing en las que se continúa en el estado final existe una máquina equivalente que se detiene en sus estados finales.

Teniendo esto en cuenta, si $q_{0} \in F$, la máquina empieza bloqueada (el cabezal no se mueve) pero podemos seguir metiendo palabras, por lo que $L(M) = \Sigma^{*}$. Hay una máquina equivalente que también acepta $\Sigma^{*}$, así que también diremos que $q_{0}$ no puede ser final porque no necesitamos que lo sea.

## Palabra reconocida

# Tipos de lenguajes

$\mathcal{L}_{R} \subset \mathcal{L}_{REN}, \mathcal{L}_{REN} = \mathcal{L}_{0}$

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

función parcial: no definida para todas las entradas

$\eta$ devuelve $\lambda$ si la entrada pertenece al lenguaje.