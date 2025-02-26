
La memoria cache está por una memoria SRAM que es donde están los bloques, y una memoria de control o directorio, donde se almacenan los bits de control para la gestión de cada bloque.

Los bits de control del directorio están compuestos por un bit que indica si el bloque es válido, y los bits de etiqueta.

Para encontrar un bloque en la cache el tiempo se calcula así:

$$
T = T_{\text{búsqueda}} + T_{\text{acceso}}
$$

# Función de correspondencia

La función de correspondencia de bloques, que determina el tiempo de búsqueda, establece un rango de búsqueda.

Cuando llega un bloque de la MP hay que decidir donde almacenarlo, y cuando se quiere leer uno de la MC, hay que decidir por donde buscarlo.

Para ello, todas las líneas (bloques) se clasifican en conjuntos de $2^{l}$ líneas (vías). La función de correspondencia mapea un bloque de MP a una vía en la MC. Esencialmente, el la MP los $l$ bits de menos peso de la dirección que se usan para identificar el bloque, se usarán para identificar el conjunto. Al restante, los llamamos bits de etiqueta.

En las funciones de correspondencia directas, $l=0$, es decir, solo hay una línea por vía. En las totalmente asociativas, hay un sólo conjunto que contiene tantos vías como líneas tiene la caché.

A las vías de un conjunto se accede en paralelo, minimizando el impacto del tiempo de acceso a una línea de caché. Solo se considerará fallo de caché si fallan todas las vías (líneas).

# Tipos de fallos

Los tipos de fallo de la caché son mutuamente excluyentes.

- Fallos de arranque solo suceden la primera vez que se referencia un bloque.
- Fallos de capacidad solo suceden si toda la caché está llena
- Fallos de conflicto o colisión sucede cuando el conjunto está lleno pero la caché no. Por tanto, se produce solo en las directas y asociativas, ya que en las completamente asociativas se daría un fallo de capacidad.

# Políticas de escritura

Si solo se escriben datos en MC o en MP, el contenido en ambas será incongruente.
Para solucionarlo se aplican una política de escritura.

En caso de acierto:

- Escritura directa (*write through*): Se escribe en MC y MP. Arregla el problema de la congruencia, la información entre ambas siempre será igual. Sin embargo, es un método más lento.

- Escritura posterior (*write back*): Escribe sólo en MC y marca el bit de modificado o *dirty bit*, que tendría que estar presente en la memoria de control. Escribirá en MP sólo cuando se vaya a sobreescribir el bloque de MC. Reduce mucho el tráfico de instrucciones de escritura, pero hay cierta incongruencia entre MP y MC.

En caso de fallo:

- Con ubicación (*write allocate*): Similar al fallo de lectura; si no existe el bloque, trae el bloque de MP a MC y escribe el dato.

- Sin ubicación (*write no allocate*): Sólo escribe en MP, y no escribe en MC. Es decir, los fallos no harán cambios en MC. Se usa en conjunto con la escritura directa.

# Algoritmos de reemplazo

## Aleatorio

Se toma una línea al azar. No es necesario añadir ningún bit más en la memoria de control.

## FIFO

Es necesario añadir un contador a la memoria de control. Cada vez que se acceda a un bloque del conjunto, se incrementan los contadores. Con $2^{l}$ vías, harán falta $l$ bits parar el contador. ¿Hay un contador por cada vía/bloque?

Cuando las vías estén llenas, el bloque con mayor contador será el sustituido.
## LRU

Funciona igual al FIFO, pero en vez de incrementar los contadores con cada acceso, se incrementa el contador asociado al bloque que se ha accedido, y el resto se queda igual.

En el peor de los casos, LRU es idéntico al FIFO.

# Memoria de control

$\text{lineas} · [\, \text{Bit de validez} + \text{etiqueta} + \text{bit de modificado (si escritura posterior)} + \text{bit de contador (si asociación no directa)} \,]$