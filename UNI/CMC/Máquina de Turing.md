
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

Si el estado al que se llega, sea $f(q, a, D) : q\in Q ,\, a \in \Gamma$, no está definido, el cabezal **no se desplaza** y se mantiene el estado original.

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
