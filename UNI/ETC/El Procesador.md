
# Arquitectura de Von Neumann

Esta arquitectura tiene tres componentes principales: El procesador, La memoria y la Entrada/Salida. Toda la información procesada, almacenada y transmitida, esta codificada en binario. Con tal de representar esta información de forma que el usuario la pueda entender se ha de codificar y decodificar la información a diversos formatos.

A la hora de representar la información en muy bajo nivel, se utiliza principalmente la representación hexadecimal.

El procesador está constantemente ejecutando las instrucciones de un programa.

# Arquitecturas

Las arquitecturas son *lo que sabe hacer el procesador*: El juego de instrucciones, los tipos de datos, el número de registros, y la longitud de palabra.

La longitud de palabra es la cantidad de bits que se puede leer en un solo acceso a la memoria. Hoy en día existen principalmente dos tipos de longitud de palabra: $2^5 = 32$ bits y $2^6 = 64$ bits.

- x86, x86-64
- MIPS-32, MIPS-64

# Arquitectura MIPS

Es una arquitectura RISC desarrollada en el MIT, que hoy en día se sigue utilizando en sistemas empotrados. Es una arquitectura con pocas instrucciones pero, al ser sencilla, es ideal para la enseñanza. Sus instrucciones siguen un diseño fragmentado en el que se basarían el resto de procesadores RISC posteriores.

## Tamaños de datos (32 bits)

*Todos los tipos de datos tienen que empezar en una posición tal que quepa todo sin pasar a la siguiente fila. Cada fila tiene 32 bits (4 bytes) en este caso.*

- `byte`: 8 bits
- `half`: 2 bytes
- `word`: 4 bytes.

## Arquitectura de carga/almacenamiento

Las instrucciones aritméticas son las únicas que pueden acceder a la memoria, lo que simplifica el diseño e interpretación del lenguaje ensamblador.


## FPU


## Registros

## Memoria

## Pseudo-instrucciones

## Contador programa

## Registro de instrucciones