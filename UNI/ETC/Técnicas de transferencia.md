

Una transferencia es una operación por la que se mueven los datos entre la memoria principal y el periférico.

Según el volumen de la información, se categorizan los periféricos en...
- **Transferencias de caracteres.** Se transfiere como máximo una palabra del procesador cada vez, por lo que es típico en periféricos sencillos con requisitos de velocidad bajos, como teclados y ratones. Las transferencias se realizan mediante **lecturas/escrituras en los registros de la interfaz**.
- **Transferencias de bloques.** Se transfieren bloques de tamaños superiores a la palabra del procesador. Los bloques tienen un significado concreto diferente para cada periférico, por ejemplo, el sector de un disco duro. Para transferir un bloque, se transfieren bytes o palabras individuales seguidas, que según la interfaz física del dispositivo se transferirán a una velocidad u otra.

![[Técnicas de transferencia - velocidades.png]]

Según el tipo de transferencia y el método usado para la [[Sincronización]], la velocidad de transferencia se ve limitada por uno de dos factores:
- SDTR (*Sustained Data Transfer Type*), limitada por la latencia del periférico, es decir, lo que tarda en estar preparado para cada transferencia.
- IODTR (*Input/Output Data Transfer Rate*), limitado por la CPU y el Bus, es decir, lo que le cuesta a la CPU leer el dato de la interfaz, escribirlo en memoria, y actualizar punteros y contadores.

# Transferencia por programa

En este tipo de transferencias, también llamadas PIO (*Programmed Input/Output*), la CPU lleva a cabo la transferencia mediante instrucciones de tipo Load/Store, como cuando se accede a la memoria principal.

![[Técnicas de transferencia - PIO.png]]

La transferencia de caracteres (simple) es la que se hace mediante sincronización sin más, ya sea por consulta de estado o por interrupciones.

La transferencia de caracteres, sin embargo, sí que difiere.

## Transferencia de bloques

Los periféricos hacen uso de buffers internos en vez de un sólo registro, a los que el procesador puede acceder mediante registros de datos o como memoria del sistema.

La transferencia se hace entre el buffer interno del dispositivo y un buffer de memoria principal con capacidad para uno o más bloques, que generalmente estará reservado de antemano. Cada buffer tiene una dirección base y un puntero o contador que indica el punto actual de la transferencia, y sólo se dará por terminada la operación una vez el puntero llegue al final del espacio reservado.

Tanto el buffer de memoria principal como el puntero deben ser implementados y gestionados a mano por el programador.

En la transferencia de bloques usando interrupciones palabra a palabra, cada palabra produce una nueva interrupción, y se terminará la operación cuando se haya acabo de procesar la n-ésima interrupción. Si se usan interrupciones en modo bloque, sólo se emite una interrupción una vez se llena todo el bloque, tras lo que se leerán todos los caracteres del bloque uno a uno.
### Ejemplo consulta de estado

```asm
.data
buffer: space 512
# OTRAS VARIABLES

.text
# preparación del bucle
    la $a0, buffer # puntero al buffer, absoluto
    li $a1, 512 # n bytes del buffer
# preparar el periferico para consulta de estado
    la $t0, <dir_base>
    la $t1, <coordenadas_sector>
    sw $t1, <id_sector>($t0)
    li $t1, <bits_de_control> # deshabilita interrupción
    sw $t1, <ordenes>($t0)
    jal Leer_Bloque
    
# OTRO CÓDIGO...

Leer_Bloque:
    la $t0, <dir_base>
bucle:
    lb $t1, <estado>($t0)
    andi $t1, $t1, 0x01 # máscara bit R
    beqz $t1, bucle # sincronización
    # transferencia
    lb $a2, <datos>($t0)
    sb $a2, 0($a0)
    # actualizar puntero y contador
    addi $a0, $a0, 1
    addi $a1, $a1, -1
    bnez $a1, bucle # repetir hasta leer todos los datos
    jr $ra

```

### Ejempo por interrupciones modo bloque

```mips
.kdata
buffer: .space 512
# OTRAS VARIABLES...

.ktext
# programación del periférico
    la $t0, <dir_base>
    li $t1, <coordenadas_sector>
    sw $t1, <id_sector>($t0)
    li $t1, <bits_de_control> # habilita interrupción
    sw $t1, <ordenes>($t0)
    jal suspender_proceso

# OTRO CÓDIGO...

Int_R:
    la $a0, buffer # puntero al buffer, absoluto
    li $a1, 512 # n bytes del buffer
    la $t0, <dir_base>
bucle: # en interrupción palabra a palabra, se haría sin bucle
    # transferencia (lectura)
    lb $a2, datos($t0)
    sb $a2, 0($a0)
    # actualiza puntero y contador
    addi $a0, $a0, 1
    addi $a1, $a1, -1
    bnez $a1, bucle # lee el siguiente caracter del bloque

    # cancela e *inabilita* interrupción
    li $t1, <bits_control>
    sw $t1, <ordenes>($t0)
    
    jal despierta_proceso
    b retexc
```

# Transferencia por acceso directo a memoria

En la DMA (*Direct Memory Access*), la propia interfaz física del dispositivo se encarga de la transferencia a nivel de hardware, sin intervención de la CPU, a través ***Bus Mastering***.

Para hacer esto posible, incorpora además dos registros nuevos: uno para el puntero del buffer y otro para el contador de **palabras** (en lugar de bytes), que se habrán de llenar de antemano y se modificarán solos con cada transferencia. Sin embargo, esta vez no hace falta comprobar que el puntero del buffer llegue hasta el final porque el fin de la transferencia se indica con una interrupción. Si es necesario que una operación de entrada/salida se inicie manualmente, generalmente se hará mediante una syscall.

Nótese que un dispositivo que funciona por DMA puede funcionar con PIO, ya que tiene los mismos registros, con dos registros adicionales.

## Compartición del bus

Cuando se usan periféricos con DMA la CPU tiene que compartir el bus con los propios periféricos, denominados *Bus Masters*. Por tanto, el sistema necesita un **árbitro de bus** para distribuir el uso del bus entre los distintos maestros.

La función del árbitro es recibir las peticiones para usar el bus (*BusRequest*) y conceder acceso al mismo según un esquema de prioridades (*BusGrant*).

Si el bus se encuentra en el chipset de la CPU, se denomina **arbitraje centralizado**, pero si está en la interfaz del periférico es **arbitraje distribuido**.

![[Técnicas de transferencia - árbitro de bus.png]]![[Técnicas de transferencia - cronograma árbitro.png]]

## Ejemplo disco

```mips title=kernel.handler
.ktext
fun666:
    # preparar puntero y contador
    la $t0, <dir_base>
    sw $a0, <puntero>($t0)
    li $t1, 128 # 512B = 128 palabras
    sw $t1, <contador>($t0)
    # parámetros
    sw $a1, <id_sector>($t0)

    # órdenes
    li $t1, <bits_de_control> # orden leer_sector y habilita interrupción
    sw $t1, <ordenes>($t0)

    jal suspender_proceso
    b retexc

fun 667:
# MÁS CÓDIGO...

intR:
    jal activar_proceso
    j retexc

# EL RESTO DEL CÓDIGO
```

```mips title=user.asm
.data
buffer: .space 512

.text
# petición de lectura de disco
    li $v0, 666 # Read($a0 = puntero, $a1 = id_sector)
    la $a0, buffer
    li $a1, <id_sector>
    syscall
```