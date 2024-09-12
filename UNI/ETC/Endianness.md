
  La unidad más pequeña con la que se trabaja en la memoria son los bytes. *Endianness*  se refiere a las formas de organizar los bytes en memoria en cada bloque de memoria de tamaño igual al tamaño de palabra del procesador. Estos bloques de memoria tienen el mismo orden independientemente del *Endianness*, que es generalmente de menor a mayor dirección de memoria.

Es comparable al lenguaje, habiendo algunos que se escriben de derecha a izquierda y otros de izquierda a derecha, pero por mucho que cambie el orden de las letras dentro de una línea, las lineas se siguen leyendo de arriba hacia abajo.

# MSByte y LSByte

MSByte, *Most Significant Byte* o El byte más significativo, es el byte que más cambiaría un número en caso de ser modificado.

Del mismo modo, el LSByte es el byte que menos afecta al número al ser modificado.

![[MSByte.png]]

# Big Endian

El byte más significativo se almacena en la posición de memoria más baja, y los bytes sucesivos se van almacenando en posiciones más altas hasta la siguiente línea de memoria.

# Little Endian

El byte más significativo se almacena en la posición de memoria más alta, y los bytes sucesivos se van almacenando en posiciones más bajas hasta la siguiente línea de memoria.

**La mayoría de PCs usan este formato.**

# Big Endian vs Little Endian

![[Endianness.png]]