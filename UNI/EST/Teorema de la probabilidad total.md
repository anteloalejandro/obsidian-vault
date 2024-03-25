
Supongamos que dentro del espacio muestral tenemos un evento $B$ que es un subconjunto de éste. Supongamos además, que dividimos el espacio muestral en particiones [[Eventos#Tipos de evento|mutuamente excluyentes]] con intersección en $B$, llamadas $\set{A_{1}, \dots, A_{n}}$. Si se desconoce la probabilidad de $B$ pero sí las de todas las $A_{i}$ y $P(B|A_{i})$ se puede averiguar $P(B)$.

![[total_probability.png|100%]]
$$
\begin{align*}
P(B) & = P((A_{1} \cap B) \cup (A_{2} \cap B) \cup \dots \cup (A_{n} \cap B))\\
& = P(A_{1} \cap B) + P(A_{2} \cap B) + \dots + P(A_{n} \cap B)\\
& = P(A_{1})·P(B|A_{1}) + \dots + P(A_{n})·P(B|A_{n})
\end{align*}
$$
Nótese que cada par $(A_{i} \cap B)$ es independiente del resto, ya que toda $A_{i}$ es mutuamente excluyente del resto, haciendo que se pueda aplicar las propiedades de la [[Probabilidad#Probabilidad de la unión de eventos|probabilidad de la unión de eventos]], pero $A_{i}$ y $B$ no son independientes entre sí, así que en el último paso no se aplican las propiedades de la [[Probabilidad#Independencia de sucesos|independencia de sucesos]].

Por tanto, el teorema de la probabilidad total es el siguiente:
$$
\sum\limits_{i=1}^{n}P(A_{i})·P(B|A_{i})
$$