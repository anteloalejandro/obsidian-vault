
La probabilidad es la proporción de casos favorables entre los casos posibles e indica como de probable es que suceda un evento dado. Es gracias a estas conclusiones que se puede llevar a cabo [[Estadística inferencial|inferencia estadística]].

$$
P(A) = \left(\frac{\text{Casos favorables}}{\text{Casos posibles}}\right) \in [0,1]
$$


# Probabilidad de la unión de eventos

![[Unión.excalidraw|100%]]

Cuando dos [[Eventos|eventos]] A y B tienen miembros en común, la probabilidad de la unión de ambos no se puede calcular simplemente sumando las probabilidades ambos eventos por separado, ya que hay miembros repetidos que no estarían duplicados en la unión pero sí al sumar por separado. Pero usando teoría de conjuntos, se puede deducir que...
$$
A \cup B = A \cup \overline{A}\cap B = A \cup B - AB
$$
Por lo que la probabilidad de la unión $A + B$ es...
$$
P(A\cup B) = P(A) + P(B) - P(A\cap B)
$$

De ahí también se puede extrapolar que si y solo si A y B son sucesos excluyentes, la probabilidad de la unión de ambos eventos es igual a la suma de las probabilidades de cada evento, ya que $P(A\cap B) = P(\emptyset) = 0$.
$$
\begin{align}
A \text{ y } B \text{ son excluyentes } & \Leftrightarrow P(A+B) = P(A) + P(B) \\
A \text{ y } B \text{ no son excluyentes } & \Leftrightarrow P(A+B) = P(A) + P(B) - P(A·B)
\end{align}
$$

# Probabilidad de la inversa

Probabilidad de la inversa de un evento es igual a 1 menos la probabilidad del evento.
$$
P(\overline{A}) = 1 - P(A)
$$

# Probabilidad condicional

La probabilidad condicional de A dado B es la probabilidad de que se de el evento A sabiendo que se ha dado el evento B, es decir, la proporción de miembros de la población para los que se cumple A *dentro* de la subpoblación constituida por los miembros de la población que verifican el evento B, y se expresa así:
$$
P(A|B) = P(A / B) = \frac{P(A\cap{B})}{P(B)}
$$

De aquí podemos sacar, además, la siguiente conclusión
$$
P(A \cap B) = P(A|B) · P(B)
$$

![[Bayes_theorem_visual_proof.svg]]

# Independencia de sucesos

Dos eventos $A$ y $B$ son [[Población y muestra#Independencia|independientes]] si y solo si...
- $P(A|B) = P(A)$
- $P(A|B) = P(A|\overline{B})$
- $P(A \cap B) = P(A|B) · P(B) = P(A) · P(B)$
- $\overline{A}$ y $\overline{B}$ son independientes
... siempre y cuando $B \neq 0$.

Estas reglas se pueden usar para determinar si un evento es independiente del otro, pero cabe destacar que no es una relación que se aplique en ambas direcciones.

Siempre se asume que son dependientes a no ser que se indique lo contrario o algo lo demuestre.

# Función de masa de probabilidad

La función de masa de probabilidad (*PDF*) de una [[Clasificación de variables|variable aleatoria discreta]] es un a lista los resultados posibles para esa variable acompañados de su probabilidad, que se suele ser expresada en forma de tabla con estos dos campos como columnas, o en un diagrama similar al [[Representaciones gráficas#Diagrama de barras|diagrama de barras]].

![[probability-mass-function.png]]

# Función de distribución acumulativa

La función de distribución acumulativa o función de probabilidad acumulativa (*CDF*) es la probabilidad de que la variable esté por debajo de un $x$ dado, y se calcula sumando la probabilidad de $x$ con la probabilidad de todos los posibles valores anteriores. A diferencia de la distribución de probabilidad, es una función monótonamente creciente.
$$
F(x_{i}) = P(X\leq x_{i}) = P(x_{1}) + \dots + P(x_{i}) = \sum\limits_{j=1}^{i}P(x_{j})
$$