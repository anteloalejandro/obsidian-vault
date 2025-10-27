

# Tasa de Acierto

Se hace una lectura de memoria, en realidad se comprueba primero la caché. Si los datos buscados están ya en caché, lo consideramos un **acierto** o *hit*, y en caso contrario se considera **fallo** o *miss* y se debe buscar en memoria principal.

Ambos casos tienen tiempos asociados distintos, pero el tiempo de acierto es mucho más rápido que el tiempo de fallo, ya que en este segundo se suma el tiempo de acceso a la memoria principal. De hecho, generalmente el tiempo de acierto será igual al tiempo de ciclo del procesador.

$$
T_{\text{acierto}} = T_{MC} = T_{ciclo} = f^{-1}
$$

La caché está organizada en bloques de modo que al traer un dato se trae consigo todos los datos del mismo bloque, haciendo que haya más aciertos que fallos al leer datos en sucesión.

La tasa de aciertos $H$ de un programa se define como la proporción entre aciertos de caché y accesos a memoria, y se expresa en forma de probabilidad.

$$
H = \frac{\text{aciertos}}{accesos} = \frac{\text{accesos} - \text{fallos}}{accesos}
$$

A partir de la tasa de aciertos $H$ y la tasa de fallos $1-H$ se puede calcular el tiempo medio de acceso a los datos.

$$
T_{m} = H·T_{\text{acierto}} + (1-H) · T_{\text{fallo}}
$$

# Directorio

La caché está realmente formada por dos memorias diferentes, la **memoria de código y datos**, normalmente denominada simplemente memoria caché, y la **memoria de control** o directorio.

El propósito del directorio es almacenar bits de control para cada bloque de memoria caché, es decir, el directorio tendrá tantas entradas como bloques tenga la memoria caché.

Como mínimo, el directorio contendrá la **etiqueta** del bloque, que hace las veces de identificador del bloque, y el bit de validez.

Adicionalmente, según sus [[#Políticas de escritura]], se debe o no añadir un bit de modificado que indique si el bit ha sido escrito en MC pero no en MP, y según su [[#Función de correspondencia]] se deben añadir $l$ bits de contador para escoger la vía a la que añadir los bloques que corresponden al mismo conjunto.

$$
\begin{gather}
\text{Entrada Directorio} = \text{Bit Validez} + \text{Etiqueta} + \overbrace{ \text{Bit Modificado} }^{ \text{con writeback} } + \overbrace{l \text{ Bits contador} }^{ \text{con } l \neq 0 } \\ \\

\text{Tamaño Directorio = Líneas de caché} \times \text{Entrada Directorio}
\end{gather}
$$

# Función de correspondencia

Una función de correspondencia sirve para separar una dirección de memoria en campos con tal de poder usarla para poder ubicarla.

En las direcciones de una memoria principal de $2^{n}B$ con tamaño de bloque de $2^{m}B$ se distinguen dos secciones: El número de bloque o página y el desplazamiento dentro de dicha página.

![[Direcciones memoria principal.excalidraw|100%]]

Si asociamos cada dirección de una **memoria principal** de $2^{n}B$ con una dirección de una **caché** de $2^{k}$ con de bloque (línea) de $2^{m}B$, dicha caché estará formada por $2^{k-m}$ líneas con $2^{m}B$ de datos cada una. En cierto sentido, los $k$ bits menos significativos se dividen igual del mismo modo que las direcciones de la memoria principal, pero usando los tamaños de la memoria caché en su lugar.

![[Direcciones caché.excalidraw|100%]]

A esto se le conoce como **función de correspondencia directa**, ya que para una dirección de MP dada corresponde una sola dirección de MC. Dada una dirección de MP, sus $n-k$ bits más significativos serán su etiqueta, los siguientes $k-m$ bits más significativos serán la línea en caché a la que corresponde y los últimos $m$ bits son el desplazamiento dentro de dicha línea.

Aunque múltiples direcciones de MP corresponden a la misma dirección de MC, la caché solo puede albergar los datos de cada una de estas a la vez, lo que puede llevar a situaciones en las que dos direcciones que comparten memoria se saquen de la caché entre sí en un bucle que tiene que leer a las dos, provocando más fallos de caché.

Para poder almacenar varios datos con el mismo valor en el campo de línea, se hace uso de una **función de correspondencia asociativa por conjuntos**, donde en vez de líneas se tienen conjuntos con $2^{l}$ vías, cada una de las cuales pudiendo guardar una línea de datos. Al guardar un dato en la MC, se escoge un conjunto igual que se hacía con las líneas, y se guarda en cualquiera de las vías libres, según los [[#Algoritmos de reemplazo]].

Sin embargo, este proceso **le resta $l$ bits a las direcciones de conjunto** para poder diferenciar las direcciones que acabarán en vías diferentes dentro del mismo conjunto (En realidad, la correspondencia directa es idéntica a ésta, pero con $l=0$.). Estos bits no se usarán para identificar la vía en la que están, sino para poder diferenciar unas direcciones de otras en el mismo conjunto, así que se añadirán directamente a la etiqueta.

![[Direcciones caché asociativa.excalidraw|100%]]

El último tipo de función de correspondencia es la **totalmente asociativa**, en la que sólo hay un conjunto en toda la caché, que contiene todas las líneas. En este caso, no harían falta bits de conjunto, de modo que la dirección estaría formada enteramente por los campos etiqueta y desplazamiento, similar a lo que sucede con las direcciones de la memoria principal.

A las vías de un conjunto se accede en paralelo, minimizando el impacto del tiempo de acceso a una línea de caché. Solo se considerará fallo de caché si fallan todas las vías.

# Políticas de escritura

Si solo se escriben datos en MC o en MP, el contenido en ambas será incongruente.
Para solucionarlo se aplican una política de escritura.

En caso de acierto:

- Escritura directa (*write through*): Se escribe en MC y MP. Arregla el problema de la congruencia, la información entre ambas siempre será igual. Sin embargo, es un método más lento.

- Escritura posterior (*write back*): Escribe sólo en MC y marca el bit de modificado o *dirty bit*, que tendría que estar presente en la memoria de control. Escribirá en MP sólo cuando se vaya a sobrescribir el bloque de MC por un bloque diferente. Reduce mucho el tráfico de instrucciones de escritura, pero hay cierta incongruencia entre MP y MC.

En caso de fallo:

- Con ubicación (*write allocate*): Similar al fallo de lectura; si no existe el bloque, trae el bloque de MP a MC y escribe el dato en MC.

- Sin ubicación (*write no allocate*): Sólo escribe en MP, y no escribe en MC. Es decir, los fallos no harán cambios en MC, por lo que sólo se modifican los valores en caché que ya hayan sido leídos previamente. Se usa en conjunto con la escritura directa.

# Algoritmos de reemplazo

## Aleatorio

Se toma una línea al azar. No es necesario añadir ningún bit más en la memoria de control.

## FIFO

Es necesario añadir un contador a la memoria de control. Cada vez que se acceda a un bloque del conjunto, se incrementan los contadores de todas sus vías.

Con $2^{l}$ vías, harán falta $l$ bits para cada contador. Al tener cada vía un contador propio, esto se traduce en $2^{l} · l$ bits necesarios para los contadores de un conjunto. Esto no significa que los bits de contador del directorio tengan esa magnitud, pues al haber una entrada por cada línea, habrá $2^{l}$ entradas con $l$ bits de contador cada una.

Cuando las vías estén llenas, el bloque con mayor contador será el sustituido.
## LRU

Funciona igual al FIFO, pero en vez de incrementar los contadores con cada acceso, se incrementa el contador asociado al bloque que se ha accedido, y el resto se queda igual.

En el peor de los casos, LRU es idéntico al FIFO.

# Tipos de fallos

Los tipos de fallo de la caché son mutuamente excluyentes.

- **Fallos de arranque:** solo suceden la primera vez que se referencia un bloque.
- **Fallos de capacidad:** solo suceden si toda la caché está llena
- **Fallos de conflicto o colisión:** suceden cuando el conjunto está lleno pero la caché no. Por tanto, se produce solo en las directas y asociativas, ya que en las completamente asociativas se daría un fallo de capacidad.