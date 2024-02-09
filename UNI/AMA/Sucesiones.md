# Conceptos generales
Las sucesiones son [[Aplicaciones, inyectividad y sobreyectividad#Aplicación|aplicaciones]] de la forma
$$
f: \mathbb{N} \to \mathbb{R}\ ;\ f(n)=a_{n}
$$
donde $a_{n}$ es el término general de la sucesión.

Tienen tres representaciones.
$$
\set{a_{n}}^{+\infty}_{n=1}, \set{a_{n}}_{n\geq{1}}, \set{a_{n}}
$$
Y se pueden expresar además de estas dos formas:
- **Forma explícita**
$$\left\{\frac{1}{n+1}\right\},\set{n!}_{n\geq0}$$
- **Forma recurrente**
$$
\begin{cases}
a_{n}=a_{n-1} + \frac{1}{n} \\
a_{1}=1
\end{cases},
\begin{cases}
a_{n} = n·a_{n-1} \\
a_{0} = 1
\end{cases}
$$
# Sucesiones monótonas
Son aquellas sucesiones que siempre crecen o decrecen
$$\set{a_{n}}\text{ decrece} \Leftrightarrow a_{n}\geq a_{n-1} \text{, para } \forall{n\in \mathbb{N}}$$
$$\set{a_{n}}\text{ crece} \Leftrightarrow a_{n}\leq a_{n-1} \text{, para } \forall{n\in \mathbb{N}}$$
```desmos-graph
top=30; bottom=0;
left=0; right=10
---
f(n)=n^2+1|#ccc
g(n)=\frac{1}{n}|#ccc

(0,f(0))|blue|label:n²+1
(1,f(1))|blue
(2,f(2))|blue
(3,f(3))|blue
(4,f(4))|blue
(5,f(5))|blue
(6,f(6))|blue
(7,f(7))|blue
(0,g(0))|red
(1,g(1))|red
(2,g(2))|red|label:1/n
(3,g(3))|red
(4,g(4))|red
(5,g(5))|red
(6,g(6))|red
(7,g(7))|red
(8,g(8))|red
(9,g(9))|red
```
$$
\set{n^{2}+1}\Rightarrow \text{creciente},
\left\{\frac{1}{n}\right\}\Rightarrow \text{decreciente}
$$

También hay sucesiones que ni crecen ni decrecen, como, por ejemplo:
$$
\begin{align}
a_{n+2}&=a_{n+1}-a_{n}\\
a_1&=a_2=1
\end{align}
\begin{cases}
a_3&=0 \\
a_4=a_3-1&=-1 \\
a_5=a_{4}-a_{3}&=-1 \\
a_6=a_5-a_4&=0 \\
a_7=a_6-a_5&=1
\end{cases}
$$
# Sucesiones acotadas
$\set{a_{n}}$ es **acotada superior** por $k\in \mathbb{R}$ si $n\leq k,\ \forall{n\in \mathbb{N}}$
$\set{a_{n}}$ es **acotada inferior** por $k\in \mathbb{R}$ si $n\geq k,\ \forall{n\in \mathbb{N}}$
$\set{a_{n}}$ es **acotada** si se dan los dos casos anteriores

Si ${a_n}$ es acotada $\Rightarrow |\set{a_n}|$ es acotada superior

# Sucesiones convergentes
$\set{a_{n}}$ converge a $\alpha\in\mathbb{R}$ si para cualquier $\varepsilon>0$ existe un $n_0\in\mathbb{N}$ tal que:
$$
n\geq{n_{0}} -> |a_{n}-\alpha|<\varepsilon
$$
Donde $\alpha$ es $\lim_{n \to \infty}{a_n}$ y $\alpha$ se puede representar como
$$
\lim_{n \to \pm\infty}{a_{n}},\ a_{n}\xrightarrow{n \to \pm\infty}\alpha
$$
O, simplemente como
$$
\lim_{n\to\pm\infty}{a_{n}},\ a_{n}\rightarrow\alpha \Leftrightarrow \text{es convergente}
$$
Es decir, $\set{a_{n}}$ converge si su límite cuando $n$ es $\pm\infty$ es un número real.

# Sucesiones divergentes
${a_n}$ es divergente siempre que no es divergente.
$$
\lim_{n\to\pm\infty}{a_{n}},\ a_n \rightarrow \pm\infty \Leftrightarrow \text{es divergente}
$$
# Teorema de la Convergencia Monótona
Si $\set{a_n}$ es creciente y acotada superior o es decreciente y acotada inferior, ${a_{n}}$ es **convergente**.

Por tanto, si $\set{a_{n}}$ es creciente, pero no es acotada superior, se dirige a $+\infty$.
Por tanto, si $\set{a_{n}}$ es decreciente, pero no es acotada inferior, se dirige a $-\infty$.