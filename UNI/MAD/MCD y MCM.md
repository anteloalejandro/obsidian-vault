# Definición
$MCD(a, b)$: El mayor entero que divide a ambos, o el producto de los factores primos comunes.
$MCM(a,b)$: El menor entero divisible entre ambos, o el producto de factores comunes o no comunes con el mayor exponente.

# Algoritmo de Euclides para el MCD
Dada la [[Múltiplos, divisores, cociente y resto|fórmula de la división]] $b = a·c+r$, al hacer $\frac{b}{a}$, siempre que $b>a>0$, $MCD(b,a) = MCD(a,r)$
$$
MCD(b, a)
\begin{cases}
MCD(a,r) & \text{si }b>a>0 \\
MCD(a,b) & \text{si }a>b>0 \\
0 & \text{si } a=0
\end{cases}
$$
---
$MCD(126, 24)$

| $i$ |  | 0 | 1 | 2 | 3 | 4 | 5 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|  | $cociente$ |  | 5 | 4 |  |  |  |
| $dividendo$ | $divisor$ | *126* | *24* | **6** | 0 |  |  |
| $resto$ |  | 6 | 0 |  |  |  |  |
