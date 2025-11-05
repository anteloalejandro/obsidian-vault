
Para juegos...
- Deterministas
- Por turnos
- Dos jugadores
- Suma cero
- Información perfecta

# Función de utilidad

Nos dice cómo de bueno es el estado para el jugador actual (MIN o MAX). Trivialmente, para las siguientes jugadas.
- MAX Gana: $f(n) = +\infty$
- MAX Pierde: $f(n) = -\infty$
- Empate: $f(n) = 0$

Normalmente, buscaremos **la mejor siguiente jugada** dado el estado actual, ya que no tenemos control sobre la siguiente jugada.

A menudo también se asume que el otro jugador va a jugar bien, por lo que se pueden descartar los caminos en los que el otro jugador hace jugadas malas.

## Tres en raya

Particularmente, en el tres en raya, se puede tomar como función de utilidad el número de filas, columnas y diagonales en las que puede ganar MAX menos en las que puede ganar MIN.

De nuevo, si la jugada es ganadora para MAX, es $+\infty$, y si lo es para MIN, $-\infty$.

# MINIMAX

Explora el árbol de búsqueda en anchura hasta un determinado nivel.

A los nodos hoja (que no son necesariamente las últimas jugadas posibles) se les aplica la función de utilidad.

Tras calcularlo, se va trayendo uno de los valores de las hojas a sus antecesores. En cada paso del volcado, si el antecesor al que se traen los valores en dicho paso es MAX, se trae el más grande y, si es MIN, se trae el más pequeño. Este proceso se repite hasta llegar a la raíz, donde finalmente se toma la decisión.

Este algoritmo tiene la particularidad de que si en los hijos directos de la raíz hay dos nodos con el mismo valor, no se diferencia entre cual podría dar mejor resultado; independientemente de los descendientes son iguales. A estos valores se les denomina **mesetas**.

Como se genera todo el árbol en anchura hasta cierto punto, la complejidad espacial y temporal del algoritmo aumentan exponencialmente con el nivel máximo de profundidad.

# Alfa-Beta

Se sustituye la búsqueda en anchura por una búsqueda en profundidad hasta cierto nivel, lo que conlleva ciertos cambios.

1. Se inicializan los nodos que se van creando como $-\infty$ si son MAX, y $+\infty$ si son MIN.
2. Una vez se llega al final, se hace un volcado provisional de la primera hoja que se ha generado a su padre. Si dicho padre tiene más hijos, se comparan los hijos conforme se van generando y se hace el volcado provisional si:
    - Si el padre es MAX y es más grande que el valor provisional actual.
    - Si el padre es MIN y es más pequeño que el valor provisional actual.
3. Cuando el nodo no tiene más hijos, el valor pasa a ser definitivo.
4. Se hace el backtracking se repite el proceso hasta que la raíz no tenga más hijos, momento en el que el valor de la raíz pasa a ser definitivo.
5. Elige la jugada con valor igual al valor definitivo de la raíz.

El resultado de este proceso hace exactamente el mismo recorrido que el de anchura, es decir, recorre todos los nodos igual. Sin embargo, se introduce la posibilidad de hacer podas del árbol utilizando el algoritmo $\alpha-\beta$.

En este algoritmo los valores para los MIN pasan a llamarse $\beta$ y los valores para los MAX pasan a llamarse $\alpha$.

Las $\alpha$ son cotas inferiores del valor de la jugada, y las $\beta$ son cotas superiores. Esto es porque el valor del padre directo de las hojas se va propagando para arriba, independientemente de que su padre sea MIN o MAX.

Gracias a esto, mientras estamos generando nodos (se calculan $\alpha$ o $\beta$ provisionales), si detectamos que la cota inferior de un nodo es mayor que la cota superior de uno de sus antecesores ($\alpha > \beta$), se pueden obviar el resto de hijos del árbol sin generar.

Además, si las hojas están adecuadamente ordenadas, las probabilidades de poda aumentan.