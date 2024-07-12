
Al igual que la [[Distribución binomial|binomial]], la distribución de Poisson se usa para determinar la probabilidad $p$ de que una variable aleatoria se dé un cierto número de veces $n$ dentro de un intervalo continuo (generalmente el **tiempo**).

$$
X \sim Ps(\lambda)
$$
El parámetro $\lambda$ es el número esperado de eventos por unidad, también conocido como esperanza matemática o [[Estadísticos descriptivos#Media|media]].

La una distribución de Poisson para una variable aleatoria es igual a la distribución de binomial de ese misma variable cuando $n \rightarrow \infty \land p \rightarrow 0$, pero se considera que con $n > 30 \land p < 0.1$ es una aproximación válida a la distribución binomial.

En la distribución de Poisson se hacen una serie de suposiciones:
- La probabilidad es igual en cualquier subintervalo.
- No puede haber más de una ocurrencia en cada subintervalo.
- Las ocurrencias son independientes.

La probabilidad $P(x)$ es la probabilidad de x éxitos durante un tiempo o espacio determinado, dado un $\lambda > 0$.
$$
P(x) = \frac{e^{-\lambda}\lambda^{x}}{x!}
$$

# Media y varianza

La media en la distribución de Poisson es:
$$
\mu_{x} = E(x) = n·p = \lambda
$$
Por otro lado, la [[Estadísticos descriptivos#Varianza|varianza]] es la siguiente:
$$
\sigma_{x}^{2} = E[(x-\mu_x)^2] = \lambda
$$

Por tanto, podemos concluir que $\mu_{x} = \sigma_{x}^{2} = \lambda$.

# Ábaco de Poisson

El ábaco de Poisson es una gráfica con probabilidades precalculadas para diferentes valores de $\lambda$ que sirve para aproximar el valor de $\lambda$ en función de una probabilidad o el porcentaje en función de $\lambda$.

![[poisson-abaqus.png]]

En el eje X están los posibles valores de $\lambda$, en el eje Y la [[Probabilidad#Función de distribución acumulativa|probabilidad acumulada]] y las curvas representan los diferentes valores de $x$ en $P(X \leq x)$. Sabiendo la $x$ y una de las dos otras incógnitas, se puede estimar la tercera.

# Suma de distribuciones de Poisson

La suma de $N$ variables independientes de Poisson con la misma probabilidad es otra variable de Poisson.
$$
X_{1}\sim Ps(\lambda_{1}) + \dots + X_{N}\sim Ps(\lambda_{N}) = 
\sum\limits_{i=1}^{N}X_{i} \sim Ps\left(\sum\limits_{i=1}^{N}\lambda_{i} \right)
$$