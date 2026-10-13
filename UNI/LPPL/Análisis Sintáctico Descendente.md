L(G): pertenece al lenguaje
$\chi$: Secuencia de producciones para obtener el resultado.
`yylex()`: next token

El objetivo es llegar a la cadena vacía y sacar el proceso seguido.

# Análisis sintáctico descendente

Sólo miramos qué terminales podemos sacar a partir del precedente que encajen con el patrón que buscamos.

- Primeros:
    - Por delante de lo que busco
    - Primeros es cualquier símbolo terminal que puede aparecer al principio de $\alpha$ en $\alpha \to ^{*} x\beta$.
- Siguientes: 
    - Por detrás de lo que busco.
    - Dado el símbolo inicial S, ...? Sólo para no terminales. No puede incluir $\varepsilon$.

$ representa el final de la entrada. siempre pertenece a siguientes. todas las gramáticas finalizan en $.

util para saber si el análisis es bueno sin hacer todo el análisis

$$
\begin{align}
\text{PRIM}(S) = \{ a,b \} \\
\text{SIG}(S) = \{ c, $ \}
\end{align}
$$
- Si vemos que no empieza por a o b, sabemos que ya no va a dar bien.
- Si al acabar no resulta en c seguido de `$`, tampoco es correcto.

```
# primeros de A: {x}
A -> D
D -> x

# primeros de A: {x}
A -> DFG
D -> x
F -> y
G -> z

# primeros de A: {x, y}
A -> DFG
D -> x | epsilon
F -> y
G -> z

# primeros de A: {x, y}, ahora añade la y porque A puede ser xBeta o yBeta, al poder ser D epsilon (vacío)
A -> DFG
D -> x | epsilon
F -> y
G -> z

# primeros de A: {x, y, z, epsilon}, sólo se puede añadir epsilon si TODAS pueden acabar en epsilon.
A -> DFG
D -> x | epsilon
F -> y | epsilon
G -> z | epsilon
```

```
S -> A
A -> B % A | B C
B -> D | D * B
D -> x | (C)
D -> +x | -x
```
$$
\begin{align}
\text{PRIM}(S) &= \text{PRIM}(A) \\
\text{PRIM}(A) &= \text{PRIM}(B\%A) \cup \text{PRIM}(BC) \\
\text{PRIM}(B\%A) &= \text{PRIM}(B) \\
\text{PRIM}(BC) &= \text{PRIM}(B) \\
\text{PRIM}(B) &= \text{PRIM}(D) \cup \text{PRIM}(D*B) \\
\text{PRIM}(D) &= \text{PRIM}(x) \cup \text{PRIM}((C)) = \{ x, ( \} \\
\text{PRIM}(D*B) &= \text{PRIM}(D) = \{ x, ( \} \\
\text{PRIM}(C) &= \text{PRIM}(+x) \cup \text{PRIM}(-x) = \{ +,- \} \\
\end{align}
$$


```
S -> Bb | Dc
B -> aB | epsilon
D -> dD | epsilon

PRIM(S) = PRIM(Bb) or PRIM(Dc)
PRIM(B) = {a, epsilon}
PRIM(D) = {d, epsilon}
PRIM(Bb) = PRIM(aBb) or PRIM(epsilon b) = {a, b}
PRIM(Dc) = PRIM(dDc) or PRIM(epsilon c) = {d, epsilon}
```
En la gramática LL1 no se puede añadir, por ejemplo S -> Sf o S -> fS, porque no puede tener bucles izquierdos.

$$
\text{SIG}(A) = \text{flatten} \{ r = \begin{cases}
\text{PRIM}(\beta) - \{ \varepsilon \} \cup \text{SIG}(B) & \text{si } \beta \to ^{*} \varepsilon \\
\text{PRIM}(\beta) & \text{si no}\\
\end{cases} \mid B \to \alpha A\beta \}
$$
Si $\beta$ puede hacer transición vacía, se añade además los siguientes de $B$.

Nótese que ahora no miramos las producciones de cada terminal, si no el PRIM de la subcadena que tiene después.

```
S -> aABC
A -> a | bbD
B -> a | epsilon
C -> b | epsilon
D -> c | epsilon

# SIG(A) = PRIM(BC) - {epsilon} + SIG(S), porque PRIM(BC) incluye epsilon.
# SIG(C) = PRIM(epsilon) - {epsilon} + SIG(S), porque no tiene nada detrás
# SIG(D) = PRIM(epsilon) - {epsilon} + SIG(A), porque está en la transición de A
```

Creo que el siguiente del inicial siempre es {$}

```
E -> T E'
E' -> epsilon | + T E'
T -> F T'
T' -> epsilon | * F T'
F -> num | (E) | id
```

[[Gramáticas LL1]]
[[Análisis Sintáctico Descendente]]

# Análisis sintáctico

Comprueba que los tokens corresponden con la especificación formal del lenguaje.

Por ejemplo, lanza error si falta un `;`.

Usaremos gramáticas de chomsky e **independientes del contexto**.

- Derivación directa:
    - $\delta A \gamma \Rightarrow \delta \beta \gamma \iff \exists(A \to \beta) \in P;\ \delta,\gamma \in (N \cup \Sigma)^{*}$
- Derivación: secuencia de derivaciones directas. $\Rightarrow ^{*}$
- Derivación a izquierdas (o derechas). Se reescribe el no-terminal más a la izquierda (o derecha).
- Las hojas del árbol sintáctico (de izquierda a derecha) es igual completar la derivación hasta que no se pueda derivar más. Por tanto, si se puede derivar, se puede hacer un árbol.
- La gramática es ambigua si dos árboles pueden dar exactamente el mismo resultado (hojas).

```
omega = "id + id * id"

# A DERECHAS
E
E + E
#   ↑ Elijo, de entre los no terminales, el de la derecha
E + E * E
E + E * id
E + id * id
id + id * id

# A IZQUIERDAS
E
E + E
#↑ Elijo, de entre los no terminales, el de la izquierda
id + E
id + E * E
id + id * E
id + id * id
```

En el ejemplo anterior, la primera transformación podría ser `E + E` o `E * E`, por tanto tenemos dos árboles que dan el mismo resultado, así que son anbigüos. De hecho, la transformación correcta, por precedencia de operadores, la transformación correcta debería ser `E + E`, por que la que más arriba está en el árbol es la que se ejecuta última.

## Reconocedor Autómata a pila

Se usa para formar una pila a partir del autómata.

$$
(q, a \alpha, z \omega z_{0})
$$
- $\omega$ es el contenido de la pila menos la cabeza y cola (cuando transicionamos, la $z$ no se pierde al añadir $\beta$, si no que lo que valía la $z$ ahora esta en $\omega$).
- $z$ es la cabeza de la pila
- $z_{0}$ es la cola de la pila
- $a$ es el terminal al que apunta la cinta
- $\alpha$ es el resto de terminales de la cinta

[[Análisis Sintáctico Descendente]]