Es una distribución de probabilidad en la que solo se consideran dos casos: éxito ($p$) y fracaso ($1-p$). También se define una variable aleatoria $X \in \set{0,1}$ de modo que $P(0) = (1-p) \land P(1) = p$. 

Además, $\forall{x} \notin \set{0,1},\ P(x) = 0$, es decir, no puede ocurrir un caso que no sea éxito o fracaso.

Dado cualquier evento $A$ con una $P(A) = p$, se dice que la variable aleatoria $X$ sigue la distribución de Bernoulli y puede ser definida como '*El número de veces que ocurre el evento $A$ con una probabilidad de $p$ en una sola realización del experimento*', es decir, consideramos que en cada repetición del mismo experimento, la probabilidad de $A$ es $p$ cada vez.

# Media

La [[Estadísticos descriptivos|media]] (también llamada esperanza matemática o esperanza estadística) en la distribución de Bernoulli es...
$$
\begin{align*}
\mu_{x} &= E(X) = \sum\limits_{x}xP(x) = 0·(1-p) + 1·p\\
\mu_{x} &= p
\end{align*}
$$
# Varianza

La [[Estadísticos descriptivos#Varianza|varianza]] es...
$$
\begin{align*}
\sigma_{x}^{2} &= E[(X-\mu_{x})^{2}] = \sum\limits_{x}(x-\mu_{x})^{2}P(x)\\
\sigma_{x}^{2} &= (0-p)^{2}·(1-p)+(1-p)^2·p\\\\
\sigma_{x}^{2} &= p(1-p)
\end{align*}
$$
# Combinaciones

El **número de combinaciones** posibles con $x$ éxitos en $n$ ensayos independientes (intentos) es...
$$C_{x}^{n} = \frac{n!}{x!·(n-x)!}$$