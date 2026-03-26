
Libros importantes:
- An Introduction to Information Retrieval
- Speech and Language Processing

# Índices
[[Aprendizaje de funciones discriminantes]]

## Índice invertido

- Se extraen tokens.  Se deciden los *stop characters*. Se crea una lista de pares clave-valor con el tóken o término como clave y el documento como valor
- Se procesan lingüísticamente los tokens. Incluye **ordenación** en base a los tokens.
- Los tokens procesados se indexan. Es decir, se crea un mapa con el token como clave y una lista de los documentos en los que aparece como valor. También se añade la frecuencia del documento al mapa.

Es *fully inverted index* si al mapa se le añade un lista de las posiciones en las que ocurre cada palabra en un documento dado, además de la suma de ocurrencias en dicho documento. Este tipo de índices **codifican todo el documento**, es decir, se puede reconstruir el documento original a partir del índice. Además, suele ocupar menos espacio que el documento original porque evita repeticiones de cadenas de texto.

# Procesado booleano de consultas

## B-Tree

- No es necesariamente binario. Se tiene que decidir de antemano la cantidad de ramas por nodo.
- Siempre está equilibrado.

## Consultas de más de un término

### A AND B

Para hacer un AND en dos entradas del mapa/diccionario, es decir, dos listas enlazadas ordenadas, se puede usar un algoritmo estilo mergesort, en el que se tiene un puntero para cada lista y se avanza el primero, el segundo o los dos según si el valor apuntado por el primero es más pequeño, el valor apuntado por el segundo es más pequeño o los dos son iguales, respectivamente.

### A AND (NOT B)

- Si son diferentes, avanzas el más pequeño.
    - Si el más pequeño es el B, no haces nada porque está en B y no en A.
    - Si el más pequeño es el A, lo añades a la lista, porque está en A y no en B.
- Si son iguales, avanzas los dos, y no se añade a la lista porque está en los dos.
- Si la B acaba antes que A, todos los elementos restantes de A se añaden a la lista.

# Tokenización

Tenemos los siguiente problemas:
- Lenguajes con tildes. ¿En *L'ensamble* guardamos la L, la L', o el determinante sin contraer Le?
    - Francés, Valenciano.
- Lenguajes aglutinantes. Una frase puede acabar siendo una palabra sin separación
    - Japonés, Chino.
    - Alemán, Turco, Vasco.
- Lenguajes de derecha a izquierda. El árabe se escribe de derecha a izquierda, pero los números de derecha a izquierda...

## Stop words

Son palabras con muy poco significado, como determinantes, preposiciones y conjunciones en castellano, que hacen de tejido conjuntivo. Las usamos para separar palabras.

Sin embargo, si usamos esto como caracteres de separación sin cuidado perdemos expresiones importantes como "**En un** lugar **de La** Mancha" o "Vitamina **A**".

# Normalización

La normalización sirve para que pequeñas variaciones en un término (palabra del diccionario) no haga que se interprete como dos términos distintos.
- U.S.A -> USA
- *résumé* -> *resume*

## Lematización

Eliminar las variantes o inflexiones de las palabras, guardando sólo un lexema o la forma en infinitivo.

Requiere de conocimiento extensivo del lenguaje.

## *Stemming*

Quitar o sustituir sufijos y prefijos conocidos. Podemos inventarnos sufijos y prefijos.

Es una solución más inocente que la lematización, pero tiene efectos similares si está bien implementado.

# Postings

*Posting List* es la entrada de nuestro mapa/diccionario.

## Skip list

Añade cada $n$ nodos un puntero adicional (*skipping pointer*) a el nodo $n$ posiciones siguientes. Así, cuando hacemos consultas, podemos comprobar los valores futuros para saber si el valor que buscamos está entre los $n$ nodos siguientes. Si no lo está, podemos saltarnos directamente esos nodos.

Hacer que el tamaño de $n$ sea muy grande hace que haya pocos saltos, que serán efectivos pocas veces, pero que serán muy beneficiosos cuando sucedan. Si $n$ es muy pequeño, los saltos serán más frecuentes pero menos beneficiosos.

# Tablas Hash

Se usan para implementar diccionarios, y la complejidad asintótica en notación *Big O* para la búsqueda, inserción y borrado es de $O(1)$ en un caso ideal.

En casos no triviales, es necesario usar cubetas junto a la función hash, ya que no tenemos acceso a un mapeo 1 a 1 entre las claves que se quieren representar y la cantidad de claves que se pueden representar con regiones de memoria limitadas.

Cuando la función hash de dos claves coincide, es decir, cuando hemos de meter ambos valores en la misma cubeta, tenemos una **colisión**. Cuantas más colisiones más se aleja de ser $O(1)$.

Alternativamente, en lugar de usar cubetas, se puede hacer uso de diferentes estrategias de direccionamiento abierto con tal de ahorrar memoria. En todos los casos, el direccionamiento abierto consiste en otra posición alternativa en caso de colisión. Asúmase que $B$ es el tamaño del bloque de memoria e $i$ es el número de intentos, con $h_{0}(x) = h(x)$.
- Redispersión lineal
    - Busca la siguiente posición. No es eficiente porque da lugar a una larga secuencia de intentos con el tiempo (**amontonamiento**.
    - $h_{i}(x) = (h_{i-1}(x) + 1) \text{ MOD } B$
- Redispersión aleatoria
    - Como la lineal, pero se coge un $c$ que no tenga factores primos con $B$.
    - $h_{i}(x) = (h_{i-1}(x) + c) \text{ MOD } B$
- Redispersión con otra función hash
    - Sólo es eficiente para $B$ primos (para que se cumpla la condición de redispersión aleatoria siempre).
    - Se añade una función hash extra de la forma $f(x) = (x \text{ MOD } (B-1)) + 1$, de modo que siempre sumará, por lo menos, 1.
    - $h_{i}(x) = (h_{i-1} + f(x)) \text{ MOD } B$

# BTree

Los BTree son similares a los árboles binarios de búsqueda, con la principal diferencia de que permiten un número variable (con un máximo fijo) de hijos por cada nodo, ayudando así a mitigar el problema del balanceo de los árboles binarios.

El número máximo de hijos por cada nodo se denomina **orden** $k$.

Cada nodo $n$ tiene un número $m_{n} \leq k$ de punteros en uso a sus hijos. Además, cada nodo guarda $m_{n}-1$ símbolos (o sea, datos) a modo de **claves**.

Las claves se guardan de forma ordenada mientras quepan. Al intentar añadir un dato, no se irá al nodo raíz de golpe aunque tenga espacio, si no que irá recorriendo el árbol comparando su valor con el de las claves de los nodos que recorre.
- Si el dato $d$ es mayor que la clave en $i$-ésima posición, se va a buscar al hijo $i+1$.
- Si es menor que todas las claves, se va a buscar al hijo $0$.

Una vez se llega la hoja correspondiente, pueden pasar dos cosas:
- El nodo tiene espacio para otra clave, y se inserta ordenadamente ese nodo.
- El nodo no tiene espacio, así que tiene que rebalancearse el árbol al meterse ordenadamente.

Rebalancear al añadir consiste en:
- Calcular la mediana (valor central) **tras añadir** el nodo como clave, y dividir el nodo en lado izquierdo, pivote (mediana) y lado derecho.
- Se añade como clave del padre del nodo original. Si no tiene padre, se crea uno, y si en el padre no caben más claves, también se rebalanceará (recursivamente).
- Siendo $i$ la posición del pivote en las claves del padre, los punteros $i$ e $i+1$ del padre apuntarán al lado derecho e izquierdo respectivamente. Así, puntero que tenía el padre al nodo original se divide en dos.

![[Rebalanceo BTree.png]]

# Trie

El Trie es un árbol que representa conjuntos de cadenas, es decir, un diccionario de cadenas.

Cada nodo representa un prefijo, y sus hijos son las cadenas que tienen ese prefijo. Las ventajas principales de esta estructura es que no se redimensionan (aunque pueden acabar desbalanceadas), reduce el consumo de memoria al reducir subcadenas redundantes, y la complejidad de recorrer el árbol depende en la longitud de las cadenas, no en su cantidad.

Si no se añade ningún campo extra, al recorrer el árbol no queda claro si lo visto hasta ahora es una palabra válida completa o sólo una porción de palabra. Para distinguir este caso, aprovecharemos que sólo hay un camino que lleve a cada palabra y pondremos un booleano en cada nodo que se marca como `true` si el camino hasta dicho nodo es una palabra válida.

Cabe destacar que los prefijos tendrán como longitud un sólo carácter, y empiezan con un nodo raíz que no representa ningún carácter.

![[Trie.png]]

# Búsqueda con comodín

El comodín o *wildcard*  (\*) se usa en una consulta para representar que allá donde está el comodín puede haber cualquier combinación de caracteres.

Podemos distinguir dos casos triviales:
- Comodín al final de palabra (`word*`):
    - Se usa un árbol de cualquiera (idealmente un Trie) para recorrer las letras hasta llegar a donde está el comodín, y a partir de ahí se buscan todas las ramas y aúnan los caminos que dan palabras válidas.
- Comodín al inicio de palabra (`*word`):
    - Se usa un BTree reverso en el que se guardan las palabras escritas al revés.

Se puede encontrar un comodín en cualquier posición en mitad de la palabra (`wor*d`) haciendo la intersección entre ambas técnicas.

## Índice permuterm

Es un listado de las posibles rotaciones (shifts) de la palabra (añadiendo un `$` al final de la misma para conservar el final de la palabra original como punto de referencia)

Por ejemplo, el índice permuterm de `hello` sería:
- `hello$`
- `ello$h`
- `llo$he`
- `llo$he`
- ...
- `$hello`

Gracias a esto podemos coger cualquier búsqueda con comodín y desplazar el comodín al principio o al final para volverlo un caso trivial.

Por ejemplo, podríamos usar sólo Tries y guardar los prefijos no de la palabra, si no de todos sus índices permuterm. Así, podemos pasar la búsqueda `wor*d` a `wor*d$` y a `d$wor*`. Esto aumentaría el consumo de memoria, pero Trie de por sí gasta poca memoria y se reducirían los tiempos de búsqueda.

## Índice de $k$-gramas

Consiste en almacenar las posibles secuencias de $k$ caracteres de cada palabra, añadiendo `$` para marcar el principio y final de palabra.

La idea es construir un diccionario invertido (en el que los $k$-gramas son la clave, y el valor es una lista de las palabras que contienen ese $k$-grama) para hacer búsquedas rápidas en base a los k-gramas.

Así, si queremos hacer la búsqueda con comodín de `wor*d` sólo tendremos calcular la intersección entre las búsquedas `$wor` y `d$`.

En principio, para hacer esta búsqueda necesitaríamos como mínimo dos índices de $k$-gramas: el de $k=3$ y el de $k=1$.

Gestiona mejor el espacio que el permuterm, pero es menos flexible, ya que se tiene que predifinir hasta que nivel de $k$-gramas se va a calcular.

### Búsqueda con $k$ máxima

Como no podemos tener un número infinito de índices de $k$-gramas, necesitamos una forma de buscar términos usando $k$-gramas limitados.

Por ejemplo, para la consulta `mon*` podríamos hacer la intersección entre `$m`, `mo` y `on`.

Sin embargo, esto no equivale a consulta original, si no a `mo*n*` (o a `m*on*`, que es lo mismo), por lo que además de sacar todas las palabras deseadas, sacará también otras como `moon`.

La solución aquí es filtrar los resultados después de calcularlos.

# Corrección de Errores

Para corregir una palabra incorrectamente correcta, necesitamos definir primero qué palabra conocida es más similar. Para ello, también tendremos que definir qué es "similar".

Buscaremos la mínima distancia de edición, que es la mínima cantidad de borrados, inserciones y sustituciones de caracteres que hacen falta para que una palabra se convierta en una conocida.

- Las sustituciones son casos en los que un carácter se cambia por otro
- Los borrados son casos en los que un carácter se sustituye por nada
- Las inserciones son casos en los que sale un carácter nuevo de donde antes no había nada.

# Evaluación de sistemas de Recuperación de la Información

La idea es comparar dos sistemas RI y saber determinar cual es mejor.

Para determinar que cualifica como "mejor", compararemos la siguientes métricas objetivas:
- Eficacia (precisión y cobertura/recall)
- Eficiencia temporal o espacial

Para comprobar estas medidas objeticos, necesitaremos una colección de documentos, una colección de consultas y una colección de **juicios de relevancia**.

Los juicios de relevancia (gold standard o ground truth) son consultas para las que ya sabemos cuál debe ser el resultado correcto.

La forma estándar de valorar la relevancia es binaria; se valora si el documento es válido o no para cada consulta. Lo usaremos para devolver un conjunto de documentos relevantes, sin ponderar.


El rendimiento se ajusta ajustando parámetros mediante un conjunto de desarrollo (entrenamiento) y otro conjunto de testing que sirve para comprobar que el ajuste es válido para entradas diferentes al conjunto de desarrollo.

La precisión es los positivos ciertos entre la suma de positivos ciertos y falsos, y la cobertura es la suma de positivos ciertos entre la suma de positivos ciertos y falsos negativos.

La F-medida combina la métrica y la posición dado un parámetro $\beta$ (que generalmente es 1).

$$
F = \frac{(\beta^{2}+1)P ·R}{\beta^{2}P+R} \underset{\beta=1}{=} F_{1} = \frac{2PR}{P+R}
$$

Usamos precisión y cobertura interpolada para cuando, en la tabla y gráfica de la precisión y cobertura, no fluctúe mucho el resultado al comprobar 1 doc con 2 docs, 2 con 3, 3 con 4, etc. La tabla es acumulada. En el ejemplo siguiente, habiendo 4 documentos relevantes:

| n docs    | 1    | 2    | 3   | 4   | 5    | 6   |
| --------- | ---- | ---- | --- | --- | ---- | --- |
| Relevante | S    | N    | S   | N   | S    | S   |
| Precision | 1/1  | 1/2  | 2/3 | 2/4 | 3/5  | 4/6 |
| Recall    | 0.25 | 0.25 | 0.5 | 0.5 | 0.75 | 1   |
La precisión interpolada se basa en los valores de Recall, ordenados de 0 a 1, y coge la precisión más grande que hay a la derecha (inclusivo por la izquierda) de ese punto. En base a la tabla no interpolada anterior, la interpolada sería:

| R   | 0   | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P   | 1   | 1   | 1   | 2/3 | 2/3 | 2/3 | 4/6 | 4/6 | 4/6 | 4/6 | 4/6 |

Además, si tenemos varias consultas, podemos calcular la tabla de precisión interpolada para cada una de ellas, y crear una nueva tabla con la media de las precisiones interpoladas.

La precisión media se calcula sumando la precisión para cada documento relevante (0 si el documento es relevante pero no ha sido devuelto por el sistema), dividido entre el número de documentos relevantes (encontrados y no encontrados). Si tenemos varias consultas de test, se puede hacer la *Mean Average Precision* o MAP calculando la media de las precisiones medias.

R-Precisión es, siendo $R$ el número de documentos relevantes, el número total de documentos relevantes encontrados entre los $R$ primeros documentos devueltos por el sistema, dividido entre $R$. Por ejemplo, para la tabla anterior, tendríamos $R\textendash Precision = \frac{2}{4} = 0.5$.

El inconveniente de todas estas medidas (menos la precisión) es que requiere saber cuantos documentos relevantes hay de antemano.

Para superar este inconveniente, se usa la *Precision-at-$k$*, que es exactamente igual pero se limita la búsqueda a $k$ documentos. Si bien es menos estable y la $k$ se debe coger de forma arbitraria, en muchos contextos el usuario espera encontrar lo que busca en unas pocas primeras respuestas.

# Modelo de Espacio Vectorial

El objetivo del modelo de espacio vectorial es medir la relevancia de los documentos respecto a la consulta del usuario. En base a esa relevancia, que se medirá en el rango $[0,1]$, se ordenan los documentos y se muestra un número determinado al usuario para que elija.

La "relevancia" en este caso es el grado de emparejamiento consulta-documento, que mide como de cerca está la consulta de un documento dado.

## Métricas

De forma trivial, si un término de la consulta no aparece en el documento, la puntuación que aportará el término al grado de emparejamiento es nula. Esto no quiere decir que la puntuación dependa necesariamente de la frecuencia de aparición de los términos.

## *Bag of Words*

Para medir como de cerca están dos conjuntos $A$ y $B$, que en nuestro caso serían consulta y documento, podemos usar las siguientes métricas:
- Solapamiento
    - $\text{overlap}(A,B) = |A \cap B|$
    - Es la cantidad de elementos en la intersección de $A$ y $B$.
    - No está normalizado, por lo que prioriza mucho los documentos con muchas palabras.
    - Es válido si $A$ y $B$ tienen tamaños similares, pero las consultas suelen ser muy pequeñas.
- Coeficiente de Jaccard
    - $\text{jaccard}(A,B) = \frac{|A \cap B|}{|A \cup B|}$
    - Es la cantidad de elementos en la intersección, divido por la cantidad de elementos en la unión (que no la suma) entre los dos conjuntos.
    - Está normalizado en base a la unión de los conjuntos, por lo que si ambos son iguales da 1, y si son completamente diferentes da 0, sin importar el tamaño de los conjuntos.


Estas métricas no consideran el orden o importancia de los términos. De ahí que se les conozca como métricas para *Bag of Words*.

## Frecuencia de término

Definimos la frecuencia del término $t$ en el documento $d$ como $f_{t,d}$, y es simplemente el número absoluto de veces que ocurre $t$ en $d$.

Cuanto más aparece un término de la consulta en un documento, más probable es que ese documento sea importante. Sin embargo, esta relación no es necesariamente, y de hecho no suele ser, lineal.

En su lugar a cada frecuencia de término $f_{t,d}$ se le asigna un **peso**, representado como $tf_{t,d}$.

Un ejemplo muy común es el log-pesado, que es una función de escala logarítmica con respecto a $f_{t,d}$, por lo que un sólo término repetido hasta el hartazgo no tiene una influencia excesiva sobre la relevancia del documento.

$$
tf_{t,d} = \begin{cases}
1 + \log_{10} f_{t,d} & \text{si } f_{t,d} > 0 \\
0 & \text{en otro caso}
\end{cases}
$$

Finalmente, la relevancia del documento $d$ para la consulta $q$ en base a la frecuencia de los términos de la consulta se mide como la suma de los $tf_{t,d}$ de todos los términos $t$ de la consulta que existen en el documento.

$$
\sum_{t\in q\cap d} tf_{t,d} = \sum_{t\in q \cap d} (1+\log f_{t,d})
$$

## Frecuencia de documento

No se debe confundir con la frecuencia de término.

La idea es comprobar como de importante es un término. Generalmente, los términos menos comunes son más específicos y, por tanto, más importantes. Es decir, mediremos la frecuencia de aparición de los términos en todos nuestros documentos de antemano para asignar un peso a cada uno de ellos.

La frecuencia de documento $df_{t}$ de un término $t$ se define como el número de documentos que contienen el término $t$. No se tiene en cuenta cuántas veces aparece en cada uno de los documentos, sólo si aparece o no.

La medida que nos importa realmente es la frecuencia de documento inversa, que le da más importancia a los documentos **menos frecuentes**. De nuevo, es una función logarítmica, por lo que tiene la característica adicional de impedir que los resultados se inclinen mucho hacia un lado.
$$
idf_{t} = \log_{10}\left( \frac{N}{df_{t}} \right)
$$

## Pesado

La medida principal del peso de un término $t$ de una consulta es el producto de los pesos obtenidos en base a su frecuencia de término y frecuencia de documento. Se le denomina pesado tf-idf.

$$
w_{t,d} = tf_{t,d} · idf_{t} = (1+\log(f_{t,d})) · \log(N / df_{t})
$$
Este peso devuelve valores...
- Altos cuando $t$ sucede muchas veces dentro de unos pocos documentos.
- Bajo cuando sucede pocas veces o es muy general.


# Modelo de espacio vectorial

Siendo $V$ el número de términos diferentes en la colección de documentos, se puede representar a los documentos y consultas como un vector en un espacio $V$-dimensional, donde cada término es un eje y la magnitud de la componente de cada término depende de su peso $w_{t,d}$.

Una vez hecha la representación es espacio vectorial, se pueden ordenar los documentos en base a su proximidad con el vector de la consulta. Como sólo queremos ordenarlos, se puede coger como métrica la inversa de la distancia.

Sin embargo, esto vuelve a la comparación muy sensible a las magnitudes de los vectores. Como la consulta tiene siempre una magnitud muy pequeña respecto a los documentos, esto puede hacer que documentos menos similares tengan prioridad.

Como ejemplo, si tenemos un documento $d$, y a partir de él creamos $d' = d + d$ tendremos dos documentos cuya distancia, a pesar de que son extremadamente similares, es bastante grande.

Para ignorar la magnitud podríamos ordenar en base a las distancias entre los vectores unitarios, es decir, normalizar, pero también podemos simplemente ordenar el base al ángulo entre los vectores, que da el mismo resultado.

De hecho, como a mayor ángulo menos importancia, podemos evitar tener que hacer la inversa calculando el su lugar el coseno del ángulo, que también está normalizado y produce el mismo orden.

![[Consultas en espacio vectorial.png]]

## Longitud-Normalización

Para calcular la similitud manualmente, es más fácil normalizar primero los vectores.

$$
\cos(\vec{q}, \vec{d}) = \frac{\vec{q}·\vec{d}}{|\vec{q}| \ |\vec{d}|} = \frac{\vec{q}}{|\vec{q}|} · \frac{\vec{d}}{|\vec{d}|} = \frac{\sum ^{V}q_{i}d_{i}}{\sqrt{ \sum ^{V}q_{i}^{2} } \sqrt{ \sum ^{V}d_{i}^{2} }}
$$

La idea es calcular por separado el vector normal de documento y de la consulta. Una vez obtenidos los vectores normales, la función coseno se calcula trivialmente como el producto de los vectores normales:

$$
\cos(\vec{u}_{q}, \vec{u}_{d}) = \vec{u}_{q} · \vec{u}_{d}
$$

## Esquemas de pesado

Los esquemas de pesado son la forma en la que se mide la **frecuencia de término** $tf_{t,d}$, la **frecuencia de documento** $df_{t}$ y la forma en la que se **normalizan los vectores**.

Los esquemas de codifican como `ddd·qqq`, siendo las `d` los parámetros del pesado del vector de documentos y las `q` el pesado del vector de consulta, y dan como resultado el producto entre ambos.

En el esquema descrito hasta ahora no se distingue entre pesado para consulta y documento, y concretamente tendríamos un pesado `ltc·ltc`

Podríamos tener perfectamente un pesado `lnc·ltc`, en el que para el vector de documentos se usa una frecuencia **no** normalizada (cada documento suma 1).