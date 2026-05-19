---
links:
  - https://www.gamesec-conf.org/2020/GameSec_Proceeding_2020/Paper%20invited%205.pdf
---
Los juegos en consideración, derivados de los juegos de polis y cacos, presentan un escenario el que hay dos grupos en oposición, intrusos y defensores, donde los intrusos tratan de traspasar un perímetro alrededor de un objetivo sin ser interceptados y neutralizados por los defensores, que a su vez tratarán de neutralizar a los intrusos antes de alcanzar el perímetro.

Esto presenta una complicación adicional frente a los juegos de polis y cacos donde hay múltiples miembros en un grupo pero un sólo individuo en el otro grupo (como el escondite-pilla-pilla), pues la dimensionalidad del problema nos impide aplicar ciertas técnicas de forma inocente.

Cuando, como en este caso, hay una región que debe ser protegida, el problema se vuelve una variante del *[target guarding problem]*, que ha sido de gran relevancia en aplicaciones de defensa militar con misiles.

# Descripción del problema

El problema sucede en un plano bidimensional, en el que tenemos unas "partículas" sin forma ni tamaño definido, tan sólo una posición y velocidad.

Esas partículas se dividen entre intrusos $A$ y defensores $D$, cada uno con un número potencialmente diferente de miembros.

La variable de control es la velocidad de cada uno de ellos, que podrán controlar y cambiar al instante sin acelerar o decelerar. Si que tienen, sin embargo, una restricción de velocidad máxima, de modo que $\nu_{A} \leq \nu_{D} = 1$, por lo que los intrusos serán, como máximo, igual de rápidos que los defensores.

También se hacen las siguientes asunciones:
1. Los defensores se mueven a lo largo del borde perímetro; no se mueven ni por dentro ni por fuera de el.
2. La región a defender, es decir, siempre hay una recta que conecta dos puntos cualquiera de la región de modo que la recta está completamente cerrada en el perímetro.
3. Cada agente, tanto defensores como intrusos, tiene información completa sobre el estado del problema.
4. La intercepción sucede siempre que la distancia entre intruso y defensor sea 0, sin importar quien haya iniciado el contacto. También consideraremos captura a cualquier maniobra que haga que el intruso no pueda alcanzar el perímetro en tiempo finito.
5. Por cada intruso que alcanza el perímetro, sube en uno la puntuación de los intrusos.

El función objetivo $Q$ es la puntuación de los intrusos, de modo que los defensores buscan minimizar $Q$ mientras que los intrusos buscan maximizarla.

El objetivo del problema es, entonces, encontrar un equilibrio entre las estrategias de ambos grupos $\mathbf{\Gamma}_{D},\,\mathbf{\Gamma}_{A}$.
$$
Q^{*} = \underset{\mathbf{\Gamma}_{D}}{\min} \underset{\mathbf{\Gamma}_{A}}{\max} Q = 
\underset{\mathbf{\Gamma}_{A}}{\max} \underset{\mathbf{\Gamma}_{D}}{\min} Q
$$

# Solución

## Uno contra uno

En un 1v1, podemos simplificar el problema como uno en el que el intruso busca maximizar la distancia con el defensor en el momento de alcanzar el perímetro y el defensor busca minimizarla.

En este caso, la estrategia óptima del defensor siempre es moverse hacia el intruso, mientras que la estrategia del intruso siempre será moverse en línea recta hacia un punto medio entre el centro del perímetro (camino más corto) y un punto que le permita alejarse del defensor.

![[Sistemas Multiagente en Juegos de Defensa de Perímetros - 1v1.png]]

## Dos contra uno

Con dos defensores contra un intruso, la estrategia óptima del intruso en el uno contra tendría que elegir entre uno de los dos defensores, en cuyo caso pueden pasar una de dos cosas:
- El otro defensor no puede alcanzar a tiempo al intruso, en cuyo caso el intruso gana.
- El intruso acaba acercándose más al otro defensor, y éste consigue capturarle.

Por tanto, ahora la estrategia óptima del intruso es dependiente del contexto; hay veces donde es mejor ignorar a uno de ellos, y otras donde es mejor ir a un punto medio.

Sin embargo, la estrategia de los defensores, pese a cambiar respecto al 1v1, siempre es la misma: La estrategia de pinza, donde cada defensor se acerca al intruso desde un lado distinto.

Una conclusión importante en el artículo es que la región de victoria para los defensores (es decir, el conjunto de posiciones en las que ganan los defensores si todos los agentes siguen su estrategia óptima) es mayor en el 2v1 que en la intersección de dos 1v1, por lo que se concluye que la colaboración entre agentes aporta una ventaja más allá de la que aportan los números.

## Políticas de coordinación a nivel de equipo

Dado que resolver este problema en escalas arbitrarias de $N_{D}$ defensores y $N_{A}$ intrusos es imposible, el artículo denota varias estrategias.

### Defensa uno-a-uno

En el ejemplo del 1v1 el juego se vuelve particularmente trivial para los defensores. Esta estrategia consiste en asignar cada defensor a un intruso, tratando de forzar un problema muchos-contra-muchos en varios problemas uno-contra-uno.

Cada asignación óptima de defensor a intruso se llama *match*, y el artículo da un límite superior para el valor de $Q$, donde $N_{MM}$ es el número de *matches*.
$$
Q^{*} \leq Q_{MM} = N_{A} - N_{MM}
$$

Si bien esta solución se ha aplicado a otros escenarios y a veces puede ser una solución válida, no tiene en cuenta la coordinación entre defensores (que ya se ha destacado antes que aumenta las probabilidades de victoria) ni la coordinación entre intrusos.

### Defensa dos-a-uno

De forma similar al uno-a-uno, la idea es asignar a cada intruso un par de defensores evitando, de nuevo, asignaciones redundantes.

La conclusión del artículo sobre esta estrategia es que hay más combinaciones posibles y, por tanto, las probabilidades de victoria son mayores.
$$
Q^{*} \leq Q_{MIS} = N_{A} - N_{MIS} \leq Q_{MM}
$$

Una de las desventajas de esta solución es evidente: Hacen falta dos defensores para cada intruso, por lo que solo funciona bien con juegos muy desbalanceados a favor de los defensores.

La otra desventaja es el coste computacional, pues el algoritmo utilizado (*Maximum Independent Set*) es NP-hard, por lo que el coste aumenta en sobremanera conforme aumenta el número de agentes.

### Descomposición Local del juego

La descomposición local consiste en dividir el plano en espacios de juegos más reducidos pero, a diferencia de los dos métodos anteriores, es mucho más sensible al contexto.

El juego se descompone en regiones locales de juego, o LGR por sus siglas en inglés. Por cada par de defensores, se calcula la región de victoria para los intrusos que definen estos dos defensores. Cada una de estas regiones es un LGR.

Todos los intrusos fuera de cualquier LGR pueden, por tanto, ser capturados, por lo que a partir de ahí podemos calcular una quota superior: $Q_{LG} \leq$ la región con más intrusos fuera de ella.

Del mismo modo, todo defensor fuera de un LGR cualquiera no puede capturar ninguno de los intrusos dentro de dicho LGR.

El artículo también saca la conclusión de que, para un LGR, la puntuación máxima que se puede alcanzar es, siendo $k$ el índice para las parejas de defensores y los intrusos dentro del LGR formado por dichas parejas:
$$
\max \{ q_{k} = n_{A}^{k} - n_{D}^{k},\, 0 \} 
$$

Por tanto, los intrusos pueden maximizar su puntuación mínima asegurada escogiendo los LGRs para los que más puntuación pueden ganar.
$$
Q_{LG} = \max_{\mathbf{G}} \sum_{k\in \mathbf{G}} \left( \max \{ q_{k}, 0 \} \right) 
$$

Nótese $Q_{LG}$ es una puntuación **mínima** para los intrusos (la primera cota inferior de todo el artículo, de hecho), por lo que $Q^{*} \geq Q_{LG}$.

La estrategia de los defensores en este caso consiste en:
- Ignorar intrusos incapturables.
- Si, para un par de defensores, $q_{k} = 0$, evitar que entren más intrusos mediante la estrategia dos-a-uno.
- Defensa uno-a-uno para el resto de intrusos.