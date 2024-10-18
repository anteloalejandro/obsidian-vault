---
todo: true
---


Los autómatas finitos son dispositivos abstractos que procesan señales. Mandan señales que indican si la palabra se acepta o no se acepta.

# AFD

Se puede visualizar como un grafo dirigido y etiquetado. A los nodos los llamaremos *estados*. A los arcos o aristas se les llama *transiciones*, y estarán etiquetados con símbolos pertenecientes al alfabeto de entrada. Al *estado inicial* se le distingue señalándole con una flecha que viene de la nada. A los estados finales se les representa dibujando el nodo con un doble círculo.

De cada estado **no pueden** salir dos estados con la misma etiqueta.

Si de cada uno de los estados del AFD sale transición con cada uno de los símbolos, diremos que ese AFD está especificado (aka: completo).

![[AFD-1.png]]
^ Este grafo no está completo porque de 2 no sale ninguna b.

La palabra es aceptada por un AFD si existe un camino que empieze en un estado inicial y termine en un estado final recorriendo las transiciones que coinciden con cada símbolo de la palabra.
![[AFD-aceptada.png]]

En todo AFD válido **existe alguna palabra aceptada**, y para cada palabra hay como mucho un camino. Además, si el AFD es completo, siempre existe un camino para formar cualquier palabra, pero sólo formarán parte del lenguaje aquellas que terminen en el estado final.

![[AFD-completo-incompleto.png]]

## Ejemplos de AFD

![[AFD-crear.png]]
![[AFD-crear.png]]

$$
\begin{document}
\usetikzlibrary{graphs, rf}
\end{document}
$$