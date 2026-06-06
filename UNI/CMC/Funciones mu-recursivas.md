# Funciones $\mu$-recursivas

## funciones básicas

Primero definimos una función básica `cero`

$$
c() = 0
$$

Es así porque el output de la máquina de turing es el número de 0 que hay en la máquina, y si no acemos nada no hay ningún 0.

Luego definimos una función sucesor $s: \mathbb{N} \to \mathbb{N}$ de forma que $s(n) = n + 1$, que simplemente añade un 0 tras la entrada.

Con estas dos funciones, podemos definir cualquier número natural:

$$
n \equiv s ^{n}(c())
$$

Las funciones de selección son funciones de la forma $p_{i,k}(n_{1},\dots,n_{k}) = n_{i}$, es decir, una función que selecciona el i-ésimo argumento de una lista de argumentos. Particularmente, $p_{0,k}(n_{1},\dots,n_{k}) = c() = 0$

## operadores de composición

Definimos un operador de sustitución como un $h(n_{1}, \dots, n_{m})$ que, dadas $k$ funciones $g_{i}$ con los mismos argumentos que $h$, aplica una función primitiva recursiva $f$ a todas las $g_{i}$

También definimos un operador de recursión primitiva que, dadas las funciones $f(n_{1},\dots,n_{k})$ y $g(i,j, n_{1}, \dots, n_{k})$, el operador de composición $h$ se define como la función que descompone $h(s(n), n_{1},\dots n_{k})$ en $g(h(n,n_{1},\dots,n_{k}), n, n_{1}, \dots, n_{k})$ (nótese que $s(n) = n+1$). Es decir, $h$ ejecuta recursivamente $g$ a lo largo de $n$ veces

## otros operadores

Nótese que se tiene que definir una función en términos de funciones recursivas ya existentes.

También se usa $p_{1}$ para ejecutar de nuevo una función junto con sus argumentos.

El caso base siempre es 0.

En prod, no se puede usar $c()$ porque se tiene que preservar el argumento

$$
\begin{align}
\text{suma}(0,n) &= s^n(c()) = p_{1}(n) = n \\
\text{suma}(n,m) &= s(p_{1}(\text{suma}(n,m), n, m))
\end{align}
$$

$$
\begin{align}
pred(0) &= c() = 0 \\
pred(s(n)) &= p_{1}(pred(n), n) = n
\end{align}
$$

$dif(n,m) = m-n$
$$
\begin{align}
\text{dif}(0,m) &= p_{1}(m) \\
\text{dif}(s(n),m) &= pred(p_{1}(\text{dif(n,m)}, n, m)) = pred(\text{dif}(n,m))
\end{align}
$$

$$
\begin{align}
\text{prod}(0,m) &= p_{0}(m) \\
\text{prod}(s(n), m) &= \text{suma}(p_{1}(\text{prod}, n, m), p_{3}(\text{prod}, n, m)) = \text{suma}(\text{prod}(n), m)
\end{align}
$$