---
titles:
  - Búsqueda heurística
---
 Consiste en mejorar la búsqueda con una **heurística**, es decir, con información extra que no forma parte del problema pero que se puede inferir o encontrar por otros medios. Es decir, las búsquedas informadas son menos generales que las informadas.

La heurística no está necesariamente para encontrar la solución más óptima, sino la más rápida.

# Búsqueda Voraz

Este algoritmo de tipo primero-el-mejor incluye una **función heurística** $h(n)$ que es componente de la función $f(n)$. Esta función es una estimación o conjetura sobre cuanto cuesta llegar desde el nodo $n$ hasta el nodo objetivo.

La búsqueda voraz coge el nodo que parece estar más cerca del objetivo, pues es ingenuo y asume que es el nodo que más rápido llevará a la solución. En resumen, $f(n) = h(n)$, donde si $n$ es el nodo objetivo, $f(n) = 0$.

Por ejemplo, para calcular el camino entre dos ciudades por carretera, podríamos crear una tabla con las distancias en línea recta de todas las ciudades a la ciudad destino, buscando previamente dicha información en mapas, y usarlo como $h(n)$.

Nótese que $h(n)$ se usa para elegir entre los nodos en la lista OPEN.

Se puede usar este algoritmo en Tree Search y Graph Search, pero sólo es completa en Graph Search, (en Tree Search, puede haber bucles infinitos), y en ningún caso es necesariamente óptimo.

En el peor caso, si la heurística es muy mala, la complejidad temporal y espacial son de $O(b^{m})$, donde $m$ es la profundidad máxima que puede alcanzar el espacio de búsqueda, aunque normalmente es mucho más rápido.

# Búsqueda A*

Funciona igual al Voraz, pero ahora $f(n) = h(n) + g(n)$.

Es decir, combina el coste real que conlleva ir al nodo actual, y el coste estimado de ir desde el nodo actual al objetivo, con lo que se obtiene una estimación del coste total del camino solución en cado de pasar por él.

La diferencia entre la búsqueda A y la A* es que se añade la restricción adicional de que $h(n)$ es **admisible**. Para que una heurística sea admisible, no debe sobrestimar el coste para lograr el objetivo. Formalmente:
- $\forall n, h(n) \leq h^{*}(n) \implies h(n) \, \text{es admisible}$, donde $h^{*}(n)$ es el coste real (desconocido). Esto también implica que la heurística admisible de cualquier nodo a la solución ha de ser 0, pues en este caso $h^{*}(n) = 0$.
- Al utilizar el heurístico admisible, se alcanza la solución óptima.
- $h(n) \geq 0$, por lo que $h(G) = 0$ para cualquier objetivo $G$.

La heurística del ejemplo del algoritmo Voraz es admisible, pues el camino en línea recta de una ciudad a otra siempre será menor o igual que el camino yendo por carretera.

Con este algoritmo siempre se consigue la solución óptima porque sólo se cogerá el nodo objetivo cuando sea el más prioritario en la lista OPEN, que al tener en cuenta el $g(n)$ y ser $h(n) = 0$, sólo sucederá si es el camino más corto.

Por este mismo motivo, tampoco hay que tener cuidado con los ciclos, por lo que también es una búsqueda completa. Eso sí, Graph Search sigue dando menos pasos.

El coste termporal es de $O(b^{C^{*}/\text{min coste acción}})$.

## Conocimiento heurística

Las heurísticas están entre dos puntos:
- $\forall n\quad h(n) = 0$, conocimiento mínimo
- $\forall n \quad h(n) = h^{*}(n)$, conocimiento máximo

Por tanto, si tenemos dos heurísticas admisibles, la mejor será la que más se acerque al conocimiento máximo. Es decir, queremos heurísticas por debajo del conocimiento máximo, pero lo más cercano a él.
- $\forall n \quad h_{2}(n) \geq h_{1}(n) \iff h_{2} \text{ domina a } h_{1}$

Aun así, en problemas complejos se recomienda reducir el espacio de búsqueda, haciendo que pueda interesar que $h(n) > h^{*}(n)$.

## Optimalidad

$$
\begin{align}
f(n) = g(n) + h(n) &\leq g(n) + h^{*}(n) = g(G) \\
f(n) &\leq g(G)
\end{align}
$$
Por tanto, si $h(n)$ es admisible, $f(n)$ es una cota inferior de la solución real.

Supongamos que tenemos una solución no óptima $G_{2}$ y un nodo $n$ que llevaría a la solución óptima en OPEN. Para coger $G_{2}$ con A*, se tendría que cumplir que $f(n) \geq f(G_{2})$, por lo que $g(G) \geq f(n) \geq g(G_{2})$, que implicaría o que $G$ es peor que $G_{2}$, ergo no habría sido óptima para empezar.

### Sin expansión

Para que A* sea óptima sin rexpansión en Graph Search, además de admisible tiene que ser **consistente** (o monótona). Para serlo, si para cada nodo $n$ y cada sucesor $n'$ de $n$ generado con una acción $a$, se cumple que $h(n) \leq h(n') + \mathrm{Action Cost}(n, a, n')$. Si en un solo caso no se cumple, no es consistente.

# Generación de heurísticas

## Heurísitcas para el n-puzzle.

En el n-puzzle, sabemos que, como mínimo, habrá que mover las fichas que no están bien colocadas, por lo que sería una heurística válida para el problema, pues es una cota inferior de los movimientos que habría que hacer.

Sin embargo, es una estimación muy baja de la cantidad de movimientos reales que habrá que hacer.

Una alternativa es la Distancia de Manhattan, que es la suma de la cantidad de posiciones que se tiene que mover cada ficha si no hay fichas de por medio, que también es admisible. Además tiene siempre tiene valor más grande que la anterior, así que **domina** a la anterior.

# Evaluación de las funciones heurísticas

## Coste computacional

Que una heurística domine no la hace necesariamente mejor. Puede dominar pero ser peor porque es coste computacional de calcularla sea tan alto que no compense.

## Factor de ramificación

Dos heurísticas pueden ser igual de dominantes pero tener factores de ramificación $b^{*}$ diferentes, resultando en menor coste espacial. Cuanto menor sea $b*$, mejor es la heurística. De hecho, el caso ideal es $b^{*} = 1$, caso en el que iríamos de cabeza a la solución siempre.

# Algoritmo de búsqueda IDA*

El objetivo es reducir el altísimo coste en memoria del algoritmo A\*. Es una versión híbrida del de [[Búsqueda No Informada#Profundización iterativa|profundidad iterativa]] (ID) y el A\*.

Al "olvidar" nodos (dejan de estar en OPEN y PATH una vez de hace backtracking, en vez de mantenerse siempre en CLOSED), el consumo de memoria es menor.

Además, se calcula un valor límite de f, y todos los nodos cuya f(n) sea superior a ese valor no se meten en la lista OPEN. El valor límite se establece como el valor de f para el mejor de los nodos descartados (el valor más bajo en la lista OPEN al sacar el nodo). Esto es similar a cuando en ID no se cogen valores superiores al límite de g(n) establecido.

Al ser un híbrido, los nodos en la lista OPEN están ordenados en base al nivel (g(n)), y NO la función de evaluación f. **La función f solo se usa para calcular el valor límite**.

Al acabar la iteración, se escoge como límite el menor f(n) de los nodos que se han ignorado por tener un f(n) demasiado alto. Es decir, aparte de OPEN, PATH y el valor límite de f, hay que guardar el **siguiente** valor límite de f.

El resultado es un algoritmo que da el mismo resultado que el A* haciendo más iteraciones, pero con muchos menos nodos en memoria simultáneamente.

Un defecto del algoritmo es que si hay mucha disparidad entre valores de f(n) acaba generando pocos nodos cada vez, por lo que hace más iteraciones y acaba siendo lento. Por tanto, generalmente es útil para algoritmos para los que el coste de todas las acciones es el mismo (costes uniformes/unitarios), como el n-puzzle.