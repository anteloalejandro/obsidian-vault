
Se divide el espacio muestral en diferentes eventos (grupos) exclusivos denominados $A_i$ y se coge además un evento $B$ que es transversal a una o más particiones (puede parcial o completamente en una o varias).

- $\sum\limits{P(A_{i})}$ es 1
- $\sum\limits{P(B|A_{i})}$ no tiene por qué ser 1
- $P(B|A_{i}) + P(\overline{B}|A_{i})$ es 1
Si sabes $P(A_{i})$ y sabes $P(B|A_{i})$ se puede conocer $P(B)$:

$$
\begin{align}
P(B) &= P((A_{1}\cap B) \cup (A_{2} \cap B) \cup \dots \cup (A_{n} \cap B))\\
&= P(B|A_{1})·P(A_{1}) + \dots
\end{align}
$$