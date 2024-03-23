
# Definición y propiedades

## Eventos y espacio muestral

Suceso que puede ocurrir o no. Tiene que ser posible que ocurra y que no ocurra.

El conjunto de todos los eventos se llama **espacio muestral**.

Existen fenómenos con carácter determinista, pero en estadística estudiamos fenómenos aleatorios o que simplemente no son deterministas, y se trata de aproximar resultados en base a tendencias en los datos. Por tanto, asumimos que hay variabilidad, pero que hay cierta tendencia o regularidad.

Si se coge, por ejemplo, un dado, su espacio muestral es:
$$
E = \set{1, 2, 3 ,4 ,5, 6}
$$
Donde los miembros de $E$ son las variables aleatorias.

A los eventos, al igual que el espacio muestral, los trataremos como conjuntos, y se podrán realizar las mismas operaciones con ellos: Unión, intersección, complementario, incluido en, etc.

Hay 4 tipos de evento:
- Evento elemental: formado por un solo elemento o resultado
- Evento compuesto: formado por más de un resultado o elemento
- Evento seguro: evento que sucede siempre
- Evento imposible: evento que no sucede nunca.

Por ejemplo, en el caso de dados, si $A = \text{sale número par}$, A sería el siguiente evento compuesto:
$$A = \set{2, 4, 6}$$

Dos eventos pueden ser excluyentes o incompatibles si no tienen elementos en común.
$$
A\cap B = \emptyset
$$

Dos sucesos son independientes si y solo si...
$$
P(A|B) = P(A) \land P(B|A) = P(B) 
$$
mientras las probabilidades no sean 0.

Además, si y solo si dos sucesos son independientes:
$$
P(A\cap B) = P(A) · P(B)
$$

Si son dependientes, la probabilidad condicional es: 

$$
P(\frac{A}{B}= P(A\cap{B})
$$

Siempre se asume que son dependientes a no ser que se indique lo contrario o algo lo demuestre.