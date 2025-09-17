---
titles:
  - Búsqueda No Informada
  - Búsqueda en Espacio de Estados
  - Búsqueda Ciega
---
Partir de un **estado inicial** y tratar de alcanzar un (o más de un) **estado final** pasando por **estados intermedios** que se pueden alcanzar usando un **conjunto de acciones** accesibles desde el estado en el que esté en cada momento.

Los **caminos** son secuencias de acciones hasta llegar a un estado $s_{n}$. El coste de un estado, denominado $g(n)$ o $g(s_{n})$, es la suma de los costes de las acciones que conforman el camino más corto hasta el $n$-ésimo estado.

El **espacio de estados** son todos los estados que se pueden alcanzar en algún momento.

El **espacio de búsqueda** es la lista de estados en los que se va a buscar en un punto concreto de un algoritmo de búsqueda.

# Algoritmos de búsqueda

## *Tree Search*

1. `node` es el estado inicial.
2. `node` es solución? Si lo es, FIN.
3. Generar hijos de `node`, que son los estados a los que se puede llegar desde él mediante las acciones que tiene disponibles (expansión).
4. `node` pasa a ser uno de los nodos que no ha sido expandido, según la **estrategia de búsqueda**. Si no hay, FALLO.
5. Ir al paso 2.

A los nodos sin expandir de les llama **conjunto frontera** o **lista *OPEN***. Esta lista es la única estructura de datos que utiliza este algoritmo de búsqueda.

## *Graph Search*

El **espacio de estados** son todos los estados que se pueden alcanzar en algún momento, mientras que el **espacio de búsqueda** es la lista de estados en los que se va a buscar en un punto concreto de un algoritmo de búsqueda.

En *tree search*, al sólo guardar los estados expandidos (hojas), si el grafo tiene ciclos se pueden dar estados repetidos, que pueden dar lugar a bucles infinitos o caminos redundantes y poco eficientes.

Este algoritmo arregla este problema haciendo dos cambios:
- Convierte OPEN en una cola de prioridad.
- Añade una lista CLOSED.

Para cada estrategia de búsqueda se define una **función de evaluación** $f(n)$ que devuelve un valor numérico para el nodo $n$ con tal de ordenarlos crecientemente. Normalmente, $f(n) = g(n)$, pero no tiene por qué ser el caso.

1. Inicializar OPEN con el nodo inicial y CLOSED con una lista vacía.
2. `node = pop(OPEN)`. Es decir, se coge el nodo en OPEN con menor $f(n)$.
3. `push(CLOSED, node)`
4. Si `node` es solución, FIN
5. Generar hijos de `node`
6. Para cada hijo `n` de `node`
    1. Aplicar $f(n)$
    2. Si no está ni en CLOSED ni OPEN, es un nodo nuevo, y se mete en OPEN.
        1. Si `n` está en OPEN pero su $f(n)$ es mejor que el ya existente, se reemplaza en OPEN.
    3. Si no, pero sí **hay reexpansión** y $f(n)$ es menor que el nodo repetido en CLOSED, se reexpande, aka se elimina el nodo en CLOSED y se mete el nuevo nodo en OPEN.
7. Volver al paso 2.

A pesar de arreglar los problemas presentes en *Tree Search*, al necesitar dos listas ocupa más o menos el doble de espacio.

# Estrategias de Búsqueda

## BFS

Se escogen los nodos de menor profundidad en la lista OPEN, por lo que $f(n) = \mathrm{nivel}(n)$.

Trata de escoger todas las opciones de árbol, por lo que es **completa** y, si todas las acciones tienen el mismo coste, devuelve una solución **óptima**.

La complejidad temporal se basa en el factor de ramificación $b$ (hijos generados por cada padre en promedio) y la profundidad $d$.
- Nodos expandidos: $1 + b + b^{2} + \dots + b^{d} \in O(b^{d})$
- Nodos generados: $1+ b^{1} + b^{2} + \dots + b^{d} + (b^{d+1} - b) \in O(b^{d+1})$

## Coste uniforme

En esta estrategia, $f(n) = g(n)$. En este caso, aunque en OPEN haya un nodo que sea solución, se cogerá siempre el que menor recorrido tenga, lo que da como resultado un camino igual o más corto.

Es una estrategia **completa** y **óptima**, pero la complejidad espacial y temporal no se puede saber de forma exacta.

La complejidad se aproxima como $O(b^{C^{*} / \varepsilon})$, donde $C^{*}$ es el coste de la solución óptima y $\varepsilon$ es el coste mínimo de una acción.

## DFS

Aquí la función de evaluación premia los niveles más profundos. Por eficiencia, al no saber cuál será la profundidad total de árbol, $f(n) = -\mathrm{nivel}(n)$, por lo que esta estrategia tiene la particularidad de tener valores negativos.

Este algoritmo tiene la necesidad de hacer *backtracking* cuando no se puede seguir avanzando por un nodo. Para ello se ha de mantener una lista PATH donde se almacenan los nodos por los que se ha pasado para llegar al nodo actual, inclusive.

Al hacer backtracking, se hace lo siguiente:
1. Eliminar `n` de PATH.
2. Si $\text{parent}(n)$ no tiene más hijos en OPEN, moverse a él.
3. Si $\text{parent}(n)$ tiene hijos en open, escoger el siguiente nodo en la lista, aka el nodo más profundo.

Para evitar profundizar mucho por unos pocos caminos, se puede definir una profundidad máxima a partir de la cual se hace *backtracking* de forma forzosa.

No es una estrategia ni completa ni óptima, pero es rápida y con alta eficiencia espacial.

Nótese que este algoritmo **sólo se usa en *Tree Search***.

## Profundización iterativa

Se aplica DFS con un límite de profundidad $m$, pero se va aumentando el valor de $m$ en uno cada vez que se queda sin nodos que buscar y se vuelve a empezar desde el principio.

A pesar de repetir los pasos anteriores a la solución varias veces, genera menos nodos que la estrategia en anchura porque en éste último caso tiene que generar todos los hijos de cada nodo en el último nivel antes de llegar al nodo solución. Esto implica que, incluso en factores de ramificación bajos, al crecer BFS exponencialmente, ID es más eficiente.