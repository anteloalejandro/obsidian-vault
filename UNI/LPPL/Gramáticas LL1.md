## Gramáticas LL1

Lo es si y sólo si:
$$
\text{PRIM}(\alpha \ \text{SIG}(A)) \cap \text{PRIM}(\beta \ \text{SIG}(A)) = \emptyset
$$

- `·` es concatenación
- No es ambigua
- No es recursiva a izquierdas ($A \to A\alpha$ no se puede dar)

$$
PRIM(SIG(A)) = SIG(A)
$$

Aplicamos la $\alpha_{i}$ de todas las $\alpha_{i} \to A$ para la cual $x \in \text{PRIM}(\alpha_{i} · \text{SIG}(A))$.

Si $\alpha_{i}$ no es vacio, PRIM es $\alpha_{i}$, si no es SIG(A).

Para comprobar si  la gramática es LL1 creamos una tabla de análisis con todas las producciones y si en una celda hay dos valores en lugar de 1, ya no es LL1.

- $(N \cup \Sigma \cup \{ \$ \})$: filas (no terminales + terminales)
- $(\Sigma \cup \{  \$ \})$: columnas (terminales)
- $\{ (r: A \to \beta), \text{sacar}, \text{aceptar}, \text{error} \}$: valor celda (salida de función)

La tabla se inicializa con error.

Pasamos por todas las producciones y para cada una de los consecuentes $\beta$ de las transiciones, se calculan los terminales $a \in prim(\beta sig(A))$, insertamos `TA[A, a] <- (r: A->B)`.

Se recorren los terminales $a \in \Sigma$ para sacar los $T[a,a]$.

Aquellas celdas en las que quede un `$`, serán aceptadas.

# Transformación de gramáticas

El objetivo es tratar de conseguir gramáticas LL1 a partir de otras que, inicialmente, no lo sean.

Contamos principalmente con 2 herramientas: Factorización y eliminación de recursividad a izquierdas.

## Factorización

Básicamente, sacar factor común.

```
A -> alpha beta | alpha beta2 | alpha beta3 | gamma
# es equivalente a:
A -> alpha A' | gamma
A' -> beta | beta2 | beta3 # A' es no-terminal
```

La ventaja aquí es que cuando recibimos el $\alpha$, el analizador sintáctico puede analizarlo mirando el único token hacia delante que puede mirar, sin tener que tomar decisiones (no puede tomarlas?)

## Eliminación de recursión a izquierdas

Consiste en cambiar recursividad a izuiqerdas en recursividad a derechas

```
A -> A alpha1 | A alpha2 | beta1 | beta2

# eliminación
A -> beta1 A' | beta2 A'
A' -> alpha1 A' | alpha2 A' | espilon
```

El $\varepsilon$ está por dos motivos: Permitimos que existan las $\beta$ sin estar seguidas de nada, y permitimos que $A'$ tenga algún camino que no resulte en recursión infinita.

```
A -> Sx
S -> Ay
# Traducimos
A -> Ayx
S -> Ay
# eliminamos
A -> A'
A' -> yxA' | epsilon
```

Inicialmente tenemos recursividad si aplicamos sustición A o si sustituimos S. Hemos decidido traducir la S primero, pero es perfectamente posible que al aplicar S no hubiesemos conseguido una gramática LL1 y aplicando la A sí. Por tanto, para comprobar si es LL1, hay que probar **todas las sustituciones**.