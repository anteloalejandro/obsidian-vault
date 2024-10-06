---
todo: true
---

Es una arquitectura RISC desarrollada en el MIT, que hoy en día se sigue utilizando en sistemas empotrados. Es una arquitectura con pocas instrucciones pero, al ser sencilla, es ideal para la enseñanza. Sus instrucciones siguen un diseño fragmentado en el que se basarían el resto de procesadores RISC posteriores.

# Tamaños de datos

Todos los tipos de datos tienen que empezar en una posición tal que quepa todo sin pasar a la siguiente fila. Cada fila tiene 32 bits (4 bytes). Cada fila utiliza el formato [[Endianness#Little Endian|Little Endian]].

Los tipos de datos principales de esta arquitectura son 3: `byte`, `half` y `word`, de 1, 2 y 4 bytes de tamaño respectivamente. Están representados en Complemento a 2.

También, soporta el tipo `ascii` para introducir caracteres, que ocupa también 1 byte (por carácter), y `asciiz`, que es idéntico a `ascii`, pero introduce un carácter nulo adicional al final.

Además, también tiene soporte para números reales en formato IEEE 754 en forma de `float` y `double`, que ocupan 4 y 8 bytes respectivamente.

# Memoria

Para la memoria, el byte es la unidad mínima direccionable, por lo que los accesos a memoria de hacen de byte a byte. Las **direcciones de memoria**, números de 32 bits que hacen las veces de índice, apuntan al inicio de estos bytes. Es decir, cada dirección de memoria apunta a un byte.

![[MIPS memory.svg]]

Ya que las direcciones de memoria son de 32 bits, y que a cada dirección le corresponde un byte, la máxima memoria que se puede tener es $2^{32} \text{ bytes} = 4294967296 \text{ bytes} \simeq 4.3 \text{GB}$.

Estos 4 gigabytes se dividen por la mitad en dos espacios:
- **Espacio de usuario**, del `0x00000000` al `0x7FFFFFFF`, es la región de memoria reservada para los programas que ejecuta el usuario.
- **Espacio de sistema**, del `0x80000000` al `0xFFFFFFFF`, es la región de memoria reservada para el sistema operativo y sus componentes

## Espacio de usuario

En los 2GB a los que tiene acceso el usuario en la arquitectura MIPS de 32 bits, la memoria se subdivide además en 3 zonas más.

La **Zona de Código**, que empieza en el `0x00400000` y termina donde empieza la zona de datos, es donde se almacenan las instrucciones de los programas que ejecuta el usuario.

La **Zona de Datos** y la **Zona de Pila** comparten el espacio entre las direcciones `0x10000000` y `0x80000000`, sin que haya un límite bien definido entre ellas. En su lugar, en la zona de datos las palabras se empiezan a almacenar en la menor dirección de memoria, siguiendo un orden creciente para las palabras sucesivas, mientras que en la pila se empieza por la más grande y sigue un orden decreciente. Típicamente se usa la zona de datos para la memoria que se reserva antes de ejecutar el programa, que no varía y la zona de pila para la memoria que se tiene que reservar mientras se ejecuta el programa, ya que puede variar.

![[MIPS user memory.svg]]

# Registros

La arquitectura MIPS32, al tener un ancho de palabra de 32, tiene un total de 32 registros, que van del `$0` al `$31`. Además, cuenta con una unidad aritmético-lógica para hacer cálculos que cuenta con otros dos registros, LO y HI, que son utilizados por instrucciones como la división o la multiplicación. Todos estos registros pueden almacenar un sólo número de 32 bits, exceptuando el `$0`, que siempre contiene un 0.

# Arquitectura de carga/almacenamiento

Las instrucciones aritméticas no pueden acceder a la memoria, solo a los registros, lo que simplifica el diseño e interpretación del lenguaje ensamblador.
