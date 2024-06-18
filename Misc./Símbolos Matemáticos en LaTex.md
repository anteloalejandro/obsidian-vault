---
tags:
  - Math
---
*[Lista completa de símbolos matemáticos](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols#Negated_binary_relations)*

# Operaciones básicas

## Fracciones
`\frac{numerator}{denominator}`
 ``
$$\frac{A+B}{C+D}$$
$$q_{1} + \frac{1}{q_{2}+ \frac{1}{q_{3}+ \frac{1}{\dots}}}$$
## Sumatorios
`\sum_{n=1}^{N} n`
$$\sum\limits _{n\geq1} a_n·x^n$$
`_{A}^{B}` se usa generalmente para subíndices e índices

## Integrales
`\int_{a}^{b} x dx`
$$\int_{0}^{\infty}x dx$$
## Límites
`\lim_{x \to n} {x}`
$$\lim_{n \to \infty}{\frac{1}{n}}$$
## Tendencia
`a \xrightarrow[world]{hello} b`
$$a_{n}\xrightarrow{n\to\pm\infty}\alpha$$
## Raíces
`\sqrt[n]{x}`
$$\sqrt[3]{\frac{x}{y}}$$
## Equaciones condicionales o con varias soluciones

$$
f(x)= 
\begin{cases}
  \frac{x^{2}-x}{x} & \text{si } x\geq 1 \\
  0                 & \text{si no}
\end{cases}
$$
$$
5x+4y=1
\begin{cases}
x_{0}&=1 \\
y_{0}&=-1
\end{cases}
$$
## Conjuntos y sucesiones
`\set{a, b, c, \dots}`
`\{ a_n \}`
`\left\{ frac{a}{b} \right\}` $\longrightarrow$ para expresiones con más altura o expresiones anidadas.
$$
\set{n^{2}+1}\Rightarrow \text{creciente},
\left\{\frac{1}{n}\right\}\Rightarrow \text{decreciente}
$$

# Lógica preposicional

- Negación: $\overline{P}$, $\neg P$
- Conjunción: $P \land Q$
- Disyunción: $P \lor Q$
- Implicador: $P \Rightarrow Q$, $P \implies Q$
- Coimplicador: $P \Leftrightarrow Q$, $P \iff Q$
- Equivalencia: $P\equiv Q$
- Para todo $x$: $\forall{x}$
- Existe un $y$: $\exists{y}$

# Conjuntos
- Complemento: $A^{c}$
- Conjunción: $A \cap B$
- Disyunción: $A \cup B$
- Diferencia: $A \setminus B$
- Subconjunto: $A \subset B$, $A \subseteq B$
- Incluido en: $x\in A$
- Para todo $x$: $\forall{x}$
- Existe un $y$: $\exists{y}$
- Conjunto vacío: $\emptyset$, $\varnothing$


# Símbolos comunes

## Caracteres griegos
$$
\pi, \theta, \alpha, \beta, \gamma, \dots
$$
## Caracteres hebreos
$$\aleph, \aleph_{0}, \aleph_{1}$$
## Comparación
$$
\begin{align*}
a<b\\
a\leq{b}\\
b\geq{a}\\
b>a\\
a\ll{b}\\
b\gg{a}\\
a\approx{b}\\
a=b\\
a\equiv{b}\\
a\simeq{b}\\
a\sim{b}
\end{align*}
$$
Las negaciones añaden un caracter `n` tras la $\backslash$.

```tikz
\begin{document} \begin{tikzpicture}[domain=0:4] \draw[very thin,color=gray] (-0.1,-1.1) grid (3.9,3.9); \draw[->] (-0.2,0) -- (4.2,0) node[right] {$x$}; \draw[->] (0,-1.2) -- (0,4.2) node[above] {$f(x)$}; \draw[color=red] plot (\x,\x) node[right] {$f(x) =x$}; \draw[color=blue] plot (\x,{sin(\x r)}) node[right] {$f(x) = \sin x$}; \draw[color=orange] plot (\x,{0.05*exp(\x)}) node[right] {$f(x) = \frac{1}{20} \mathrm e^x$}; \end{tikzpicture} \end{document}
```
