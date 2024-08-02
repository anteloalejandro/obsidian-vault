Generalización de la [[Distribución de Bernoulli]] que se puede aplicar a cualquier [[Clasificación de variables|variable discreta]] dada una muestra de tamaño $n$ de una población de tamaño potencialmente infinito, donde $X$ es el número de veces que ocurre $A$ en la muestra con una probabilidad de $p$. Cada realización de un experimento es un ensayo de Bernoulli.
$$
X \sim B(n,p)
$$
$P(X = x)$ o simplemente $P(x)$ probabilidad de $x$ éxitos en $n$ ensayos, con una probabilidad de éxito $p$ por cada ensayo.
$$
P(x) = C^{n}_{x} · p^{x} · (1-p)^{n-x} = \frac{n!}{x!·(n-x)!} · p^{x} · (1-p)^{n-x}
$$

# Suma de distribuciones binomiales

La suma de $N$ variables independientes binomiales con la misma probabilidad es otra variable binomial.
$$
X_{1}\sim (n_{1},p) + \dots + X_{N}\sim (n_{N},p) = Y \sim B(n_{i} + \dots + n_{N}, p)
$$
Donde $Y = X_{1} + \dots + X_{N}$. Por tanto, se puede reducir a esto:
$$
\sum\limits_{i=1}^{N}X_{i}\sim B\left( \sum\limits_{i=1}^{N} n_{i},p \right)
$$

# Forma de la distribución binomial

La forma de esta distribución dependerá de los valores de $n$ y $p$. Cuanto más se acerca $p$ a $0$ más [[Estadísticos descriptivos#Asimetría|asimetría]] positiva presenta la curva, mientras que si está más cerca de $1$ presenta asimetría negativa. Además, cuando más se aleje de $0.5$, más altos serán los picos.

Por otro lado, la $n$ simplemente detalla el número de ensayos, así que afecta a como de distribuido está el diagrama resultante.

![[binomial-distribution.gif]]
[¿Por qué tiene forma de distribución normal?](https://stats.stackexchange.com/questions/176425/why-is-a-binomial-distribution-bell-shaped)

# Media

La [[Estadísticos descriptivos#Media|media]] en una distribución binomial es:
$$
\mu_{x}= E(x) =n·p
$$

# Varianza

La [[Estadísticos descriptivos#Varianza|varianza]] en una distribución binomail es:
$$
\sigma_{x}^{2} = \mu_{x}·(1-p) = n·p·(1-p)
$$

# Estimación gráfica de la probabilidad

$P(x)$ se puede estimar gráficamente dada una gráfica con todos los puntos que forman la distribución binomial especificada. Por ejemplo, dada la distribución $X \sim B(n=11, p=0.2)$, se puede ver que $P(3) \simeq 0.22$

![[binomial-distribution-example.png]]