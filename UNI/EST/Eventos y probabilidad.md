
# Eventos

Un evento es un suceso que puede ocurrir o no. Tiene que ser posible que ocurra y que no ocurra. Al conjunto de todos los eventos se llama **espacio muestral**.

Si se coge, por ejemplo, los puntos que puede dar un dado, su espacio muestral es:
$$
E = \set{1, 2, 3 ,4 ,5, 6}
$$
Donde los miembros de $E$ son las variables aleatorias.

A los eventos, al igual que al espacio muestral, los trataremos como conjuntos, y se podrán realizar las mismas operaciones con ellos: Unión, intersección, complementario, incluido en, etc.

Existen fenómenos con **carácter determinista**, es decir, que bajo las mismas condiciones siempre sucede el mismo evento, pero en estadística estudiamos fenómenos aleatorios o que simplemente no son deterministas. Por tanto, asumimos que hay [[Variabilidad|variabilidad]], pero que hay cierta tendencia o regularidad que nos permite hacer afirmaciones respecto a los resultados, aunque no sean completamente ciertos.

La [[#Probabilidad|probabilidad]] nos permite asociar grados de certeza a estas afirmaciones.

## Tipos de evento

Hay 4 tipos de evento:
- Evento elemental: formado por un solo elemento o resultado
- Evento compuesto: formado por más de un resultado o elemento
- Evento seguro: evento que sucede siempre
- Evento imposible: evento que no sucede nunca

Por ejemplo, en el caso de dados, si $A = \text{sale número par}$, A sería el siguiente evento compuesto:
$$A = \set{2, 4, 6}$$

Dos eventos pueden ser excluyentes o incompatibles si no tienen elementos en común. Es decir, si ocurre uno no puede ocurrir el otro.
$$
A\text{ y } B \text{ son excluyentes } \Leftrightarrow A\cap B = \emptyset
$$

# Probabilidad

La probabilidad es la proporción de casos favorables entre los casos posibles e indica como de probable es que suceda un evento dado. Es gracias a estas conclusiones que se puede llevar a cabo [[Estadística inferencial|inferencia estadística]].

$$
P(A) = \left(\frac{\text{Casos favorables}}{\text{Casos posibles}}\right) \in [0,1]
$$
# Propiedades

## Probabilidad de la unión de eventos

![[Unión.excalidraw|100%]]

Cuando dos eventos A y B tienen miembros en común, la probabilidad de la unión de ambos no se puede calcular simplemente sumando las probabilidades ambos eventos por separado, ya que hay miembros repetidos que no estarían duplicados en la unión pero sí al sumar por separado. Pero usando teoría de conjuntos, se puede deducir que...
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

## Probabilidad de la inversa

Probabilidad de la inversa de un evento es igual a 1 menos la probabilidad del evento.
$$
P(\overline{A}) = 1 - P(A)
$$

## Probabilidad condicional

La probabilidad condicional de A dado B es la probabilidad de que se de el evento A sabiendo que se ha dado el evento B, es decir, la proporción de miembros de la población para los que se cumple A *dentro* de la subpoblación constituida por los miembros de la población que verifican el evento B, y se expresa así:
$$
P(A|B) = P(A / B) = \frac{P(A\cap{B})}{P(B)}
$$

### Independencia de sucesos

Dos eventos son independientes si y solo si...
- $P(A|B) = P(A)$
- $P(AB) = P(A|B) · P(B) = P(A) · P(B)$
- $P(A|B) = P(A|\overline{B})$
... siempre y cuando $B \neq 0$.

Estas reglas se pueden usar para determinar si un evento es independiente del otro, pero cabe destacar que no es una relación que se aplique en ambas direcciones; 

Siempre se asume que son dependientes a no ser que se indique lo contrario o algo lo demuestre.
