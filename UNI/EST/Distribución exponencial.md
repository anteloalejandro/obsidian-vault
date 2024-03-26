
Se utiliza para modelar el **tiempo transcurrido** entre dos sucesos.
$$
T \sim Exp(\alpha)
$$
Donde la variable aleatoria $T$ es el **tiempo transcurrido** entre sucesos y $\alpha$ es el parámetro (que a menudo se expresa como $\lambda$), que es a su vez la **inversa del promedio** de unidades/tiempo, es decir, la inversa de $\lambda$ en [[Distribución de Poisson|Poisson]].

![[Exponencial vs Poisson.excalidraw|100%]]

La probabilidad se calcula a partir de la [[Probabilidad#Función de masa de probabilidad|función de densidad]] $f$. Por ejemplo, sea $T = \text{Años que dura un televisor}$, la probabilidad de que un televisor dure exactamente 5 años se expresaría $f(5)$.
$$P(t) = f(t) = \alpha e^{-\alpha t}\text{, para todo t > 0}$$


La [[Probabilidad#Función de distribución acumulativa|función de distribución acumulada]] se usa para medir la probabilidad de que el suceso se de durante la totalidad de un rango.
$$
F(t) = f(T < t) = 1 - e^{-\alpha t}
$$
Además, a partir de esta fórmula se puede concluir que:
$$
\begin{align*}
f(T > t) &= 1 - F(t) = 1 - 1 - e^{-\alpha t} \\
f(T > t) &= e^{-\alpha t}
\end{align*}
$$
Volviendo al caso del televisor, la probabilidad de que aguante más de 5 años se expresaría $f(T > t)$.

Se asume que la distribución exponencial no tiene memoria, es decir, que el comportamiento futuro es independiente del comportamiento pasado y actual. Esto implica que se asume que los fallos dependen de accidentes y no del desgaste. Es ideal para medir la probabilidad de accidentes aleatorios (como desastres naturales o accidentes). Gracias a esta propiedad se puede deducir que $P(T > 12 | T > 9) = P(T > 3)$, ya que si sabemos que el televisor ha aguantado 9 años, la probabilidad  de que aguante 12 años en total es la probabildad de que aguante otros 3.

# Media y varianza

La [[Estadísticos descriptivos#Media|media]] y la [[Estadísticos descriptivos#Varianza|varianza]] están estrechamente relacionados en la distribución exponencial.
$$\mu_{t} = E(t) = \frac{1}{\alpha}$$
$$\sigma^{2}_{t} = \mu_{t}^{2} = \frac{1}{\alpha^{2}}$$