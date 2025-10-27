
La predicción dinámica consiste en mantener información sobre instrucciones o saltos anteriores para tratar de determinar si un salto se va a dar o no, en vez de siempre suponer que se va a dar o siempre suponer que no se va a dar.

Según el tipo de predictor, intentaremos...
- Predecir la...
    - Condición
    - Condición y dirección
- ... A partir de...
    - Algunos bits del PC de la instrucción de salto
    - Todos los bits del PC de la instrucción de salto
- ... Almacenados con [[Memoria caché#Función de correspondencia|correspondencia]]...
    - Directa
    - Totalmente asociativa
    - Asociativa por conjuntos
- ... En la etapa...
    - ID o posterior (tras decodificar el salto)
    - IF (en la etapa de búsqueda)

# *Branch Prediction Buffers*

Los BPB, también llamados *Branch History Table* o BHT, intentan predecir **la condición** a partir de **algunos bits** de la dirección de la instrucción de salto, usando correspondencia **directa**.

Está formado por una tabla indexada de un tamaño determinado con los bits de menor peso (menos los dos primeros, porque las direcciones siempre son múltiples de 4) de la instrucción de salto, donde cada entrada (que habrán de ser inicializadas) de ésta contiene la predicción de la condición: *taken* o *not-taken*.

Al poder guardar una cantidad limitada de instrucciones indexadas y usar asociación directa, las instrucciones se pueden sobrescribir si sus últimos bits de dirección coinciden. A pesar de esto, gracias al principio de localidad de saltos, este tipo de predictor sigue siendo muy eficiente para predecir cosas como bucles.

El algoritmo predictor consiste en un [[Autómatas finitos|autómata de estados finitos]] que se actualiza tras calcular la condición real.

Por ejemplo, para el caso trivial de un BPB de un bit, tendríamos el siguiente autómata.
![[Predicción Dinámica de Saltos - BPB de un bit.png]]

Para más bits la cosa se complica, ya que se introducen estados intermedios. Para el caso de dos bits, tendríamos:
- *Strongly not taken* (00)
- *Weakly not taken* (01)
- *Weakly taken* (10)
- *Strongly taken* (11)

La idea general es que queremos que una predicción falle más veces antes de cambiarla; en el caso de dos bits, queremos que falle dos veces. Para averiguar si queremos saltar o no, simplemente se coge el MSB de la predicción.

Hay dos formas de diseñar un BPB con más de un bit, que influyen en su comportamiento: con **histéresis** y con **saturación**.

Con saturación es la más sencilla, pues consiste en mantener un contador e incrementarlo cada vez que el salto es efectivo y decrementarlo en caso contrario. Esto tiene el efecto de que en los valores intermedios hacen falta menos fallos de los esperados para cambiar la predicción, pudiendo en el peor caso cambiar en cada intento y fallarlos todos.

La histéresis intenta solucionar esto haciendo que una vez se cambie de predicción, siempre hagan falta $n$ fallos para cambiar de idea. Esto lo consigue mediante una máquina de estados como la siguiente (para 2 bits):

![[Predicción Dinámica de Saltos - BPB con histéresis.png]]

## Predictor de dos niveles

El predictor anterior sólo tenía si la instrucción dada ha saltado anteriormente o no, lo que se conoce como **Predictor Bimodal**.

El predictor de dos niveles, en cambio, basa su predictor en los saltos de la instrucción actual o **cualquier otro salto** ejecutado previamente.

Esto puede resultar en una mejora del rendimiento en ciertas secuencias del tipo if-else, pero puede empeorarlo en otras.

Como mejora sobre esta idea, está el predictor *gselect*, que en lugar de una tabla, utiliza una tabla para cada estado (incluidos intermedios) posible con $n$ bits y un historial que almacena los resultados de los últimos saltos de tamaño $m$ bits. Por ejemplo, para $n = 2$ y $m = 2$:
![[Predicción Dinámica de Saltos - gselect.png]]

El resultado de este predictor es que se adapta a diferentes secuencias de saltos. Es decir, para el ejemplo anterior, si las últimas $n$ veces que dos saltos no han sido efectivos el siguiente ha sido efectivo, cuando el predictor se encuentre con dos saltos no efectivos predecirá que el siguiente va a serlo.

Nótese que el tamaño del historial $m$ determina cuantas instrucciones tiene en cuenta, y el tamaño del los predictores $n$ determina como de fácil cambia de idea.

## Predictor híbrido

Simplemente saca las entradas de dos predictores diferentes a un multiplexor y como señal de selección para éste usa un selector, que utilizara algún algoritmo para elegir la predicción a usar.

Normalmente el selector llevará un conteo de cual de los dos predictores acierta más, y seleccionará ese.

# *Branch Target Buffers*

Los BTB predicen la **condición y dirección** a partir de la **dirección completa** de la instrucción de salto con correspondencia **totalmente asociativa** (aunque puede serlo de otro tipo).

Están formados por una tabla con 3 campos diferentes:
- Dirección de la instrucción de salto
- Precondición
- Dirección de destino

Al calcular también la dirección de destino, la predicción se debe hacer durante la fase IF, si no tendría que haber ciclos de parada en ID para esperar a la predicción, anulando las ganancias de rendimiento.

El funcionamiento es el siguiente:
- En la fase IF:
    - Si existe la dirección de la instrucción en la BTB, sabemos que es un salto sin decodificar. Si, además, la precondición en esa misma entrada es "salta", busca la dirección de destino de la BTB y las instrucciones siguientes a esta.
    - Si no, busca las instrucciones siguientes a la actual.
- En la fase ID:
    - Calcula la condición y dirección del salto, y actualiza la BTB.
        - Si existe la dirección de la instrucción en la BTB, actualiza los bits de la precondición.
        - Si no, añade la entrada completa a la BTB.
    - Comprueba la predicción de IF.
        - Si la predicción **no** ha acertado, cancelar instrucciones lanzadas, buscar instrucciones a partir de la dirección correcta.

Dan lugar a básicamente el mismo número de ciclos de parada medios que un *predict-not-taken* a costa de maquinaría más compleja, pero sólo si todas las instrucciones tienen el mismo coste (uniciclo). Cuando hay instrucciones que pueden estar más de un ciclo en la fase de ejecución, las ganancias del BTB son muy significativas.

