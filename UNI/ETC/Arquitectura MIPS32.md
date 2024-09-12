

Es una arquitectura RISC desarrollada en el MIT, que hoy en día se sigue utilizando en sistemas empotrados. Es una arquitectura con pocas instrucciones pero, al ser sencilla, es ideal para la enseñanza. Sus instrucciones siguen un diseño fragmentado en el que se basarían el resto de procesadores RISC posteriores.

# Tamaños de datos

Todos los tipos de datos tienen que empezar en una posición tal que quepa todo sin pasar a la siguiente fila. Cada fila tiene 32 bits (4 bytes).

Los tipos de datos principales de esta arquitectura son 3: `byte`, `half` y `word`, de 1, 2 y 4 bytes de tamaño respectivamente. Están representados en Complemento a 2.

También, soporta el tipo `ascii` para introducir caracteres, que ocupa también 1 byte (por carácter), y `asciiz`, que es idéntico a `ascii`, pero introduce un carácter nulo adicional al final.

Además, también tiene soporte para números reales en formato IEEE 754 en forma de `float` y `double`, que ocupan 4 y 8 bytes respectivamente.

# Memoria

Para la memoria, el byte es la unidad mínima direccionable, por lo que los accesos a memoria de hacen de byte a byte. Cada byte tiene un índice numérico de 32 bits, generalmente expresado en formato hexadecimal, que lo identifica. Es decir, a cada posición de memoria le corresponde un byte.

![[MIPS memory.png|100px]]

# Arquitectura de carga/almacenamiento

Las instrucciones aritméticas son las únicas que pueden acceder a la memoria, lo que simplifica el diseño e interpretación del lenguaje ensamblador.


# FPU