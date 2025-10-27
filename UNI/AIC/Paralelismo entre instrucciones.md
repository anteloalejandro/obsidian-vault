

Las dependencias pueden hacer que un procesador tenga muchos ciclos de parada, impidiendo que otras instrucciones se estén ejecutando al mismo tiempo en otras fases.

La capacidad de las instrucciones de ejecutarse simultáneamente se denomina *Instruction Level Parallelism* o ILP, y es lo que hace que el CPI de un procesador segmentado se mantenga cercano a 1.

Dos instrucciones son independientes si se pueden ejecutar simultáneamente sin problemas o, lo que es lo mismo, si se pueden reordenar sin que tenga ningún efecto en el tiempo de ejecución ni el resultado.

# Dependencias

Dos instrucciones son independientes si se pueden ejecutar simultáneamente sin problemas o, lo que es lo mismo, si se pueden **reordenar** sin que tenga ningún efecto en el tiempo de ejecución ni el resultado.

## Dependencia de datos

Dadas dos instrucciones $i$ y $j$, donde $i$ va antes que $j$, existe una dependencia de datos o de flujo si:
- $i$ produce un resultado usado por $j$.
- $j$ usa un resultado producido por una instrucción $k$, que a su vez depende de $i$.

Los resultados pueden estar en registros o en memoria.

Dan lugar a **posibles riesgos** *Read After Write*, o RAW.

## Dependencias de nombre

Son dependencias que suceden sólo cuando dos instrucciones usan los mismos registros o posiciones de memoria **sin que haya dependencias de flujo**.

Por tanto, y como indica el nombre, se pueden arreglar simplemente cambiándole el nombre a los registros utilizados, sin que afecte a la corrección del código.

#### Antidependencia

La instrucción $i$ lee de un registro o posición de memoria sobre el que $j$ escribe posteriormente. $j$ no podría escribir inmediatamente, a pesar de que $i$ no afecta a su resultado en ningún caso.

Dan lugar a **posibles riesgos** *Writer After Read*, o WAR.

#### Dependencia de salida

La instrucción $i$ escribe sobre un registro o posición de memoria sobre el que $j$ quiere escribir después. Asumiendo que no haya dependencias de flujo adicionales, el resultado de $j$ no se ve afectado por lo que escribe $i$, pues no lo toma como entrada.

Dan lugar a **posibles riesgos** *Write After Write*, o WAW.

## Dependencia de control

Las instrucciones de salto afectan a la siguiente ejecución que se va a ejecutar, por lo que toda instrucción posterior a una a la que se puede saltar, tiene una dependencia de control con el salto, incluida aquella a la que se salta.

Dan lugar a **posibles riesgos** de control.

# Técnicas para mejorar el ILP

Estas técnicas se aplican a nivel de **bloque básico**, que son los bloques de instrucciones delimitado por instrucciones de salto.

```
...
beqz t1, label   # ← forma parte del bloque básico anterior
instruction1     # | BLOQUE BÁSICO
instruction2     # |
instruction3     # |
...              # |
beqz t1, label   # |
```

Las técnicas se pueden aplicar de forma **estática**, donde se encarga el compilador y siempre de la misma forma en todas las máquinas, o de forma **dinámica**, donde se encarga el propio hardware haciendo que en cada máquina puedan darse efectos diferentes y que no funcione en máquinas que no soporten esto.

En la gestión estática, junto al renombrado de variables, destacan el *Loop-Unrolling* y el *Software-Pipelining*, que tratan de extender el tamaño de los bloques básicos para poder reorganizar mejor las instrucciones.

## *Loop Unrolling*

Consiste en convertir $n$ iteraciones de un bucle en $n / k$ iteraciones, donde $k$ es una constante. Esto aumenta en $k$ el tamaño de un bloque básico y reduce a $n / k$ el número de saltos.

Al tener más instrucciones en un sólo bloque, hay más oportunidades para reorganizar las instrucciones y encontrar combinaciones de instrucciones que eliminen o limiten los ciclos de paradas producidos por riesgos estructurales y de datos.

![[Paralelismo entre instrucciones - loop unrolling.png]]

Por ejemplo, dado el siguiente código de ejemplo tipo DAXPY:

```
start:
        addi t1, gp, y # t1 = direcci´on de y
        addi t2, gp, z # t2 = direcci´on de z
        fld f0, a(gp) # f0 = a
        addi t3, t1, 512 # 64 elementos son 512 bytes
loop:
        fld f2, 0(t1) # L
        fadd.d f4, f0, f2 # A
        fsd f4,0(t2) # S
        addi t1, t1, 8
        addi t2, t2, 8
        sub t4, t3, t1
        bnez t4, loop
```

El bucle se podría desenrollar así, produciendo código equivalente (excepto que sería ligeramente más rápido por ejecutar menos instrucciones de datos).

```
start:
        addi t1, gp, y # t1 = direcci´on de y
        addi t2, gp, z # t2 = direcci´on de z
        fld f0, a(gp) # f0 = a
        addi t3, t1, 512 # 64 elem. son 512 bytes
loop:
        fld f2, 0(t1)       # (1.1)
        fadd.d f4, f0, f2   # (1.2)
        fsd f4,0(t2)        # (1.3)
        fld f2, 8(t1)       # (2.1)
        fadd.d f4, f0, f2   # (2.2)
        fsd f4,8(t2)        # (2.3)
        fld f2, 16(t1)      # (3.1)
        fadd.d f4, f0, f2   # (3.2)
        fsd f4,16(t2)       # (3.3)
        fld f2, 24(t1)      # (4.1)
        fadd.d f4, f0, f2   # (4.2)
        fsd f4,24(t2)       # (4.3)
        addi t1, t1, 32     # 4 veces 8 = 32
        addi t2, t2, 32
        sub t4, t3, t1
        bnez t4, loop
```

Y los riesgos de control se resolverían reordenando instrucciones y renombrando registros.

```
start:
        addi t1, gp, y # t1 = direcci´on de y
        addi t2, gp, z # t2 = direcci´on de z
        fld f0, a(gp) # f0 = a
        addi t3, t1, 512 # 64 elem. son 512 bytes
loop:
        fld f2, 0(t1)         # (1.1)
        fld f6, 8(t1)         # (2.1)
        fld f10, 16(t1)       # (3.1)
        fld f14, 24(t1)       # (4.1)
        fadd.d f4, f0, f2     # (1.2)
        fadd.d f8, f0, f6     # (2.2)
        fadd.d f12, f0, f10   # (3.2)
        fadd.d f16, f0, f14   # (4.2)
        fsd f4,0(t2)          # (1.3)
        fsd f8,8(t2)          # (2.3)
        fsd f12,16(t2)        # (3.3)
        fsd f16,24(t2)        # (4.3)
        addi t1, t1, 32
        addi t2, t2, 32
        sub t4, t3, t1
        bnez t4, loop
```

## Software Pipelining

La idea es a grandes rasgos la misma que con el Loop Unrolling, pero en este caso se transforma un bucle cuyas iteraciones son independientes pero las iteraciones dentro de cada una son dependientes en un bucle con iteraciones dependientes pero instrucciones independientes, de forma similar a la segmentación de las fases de un procesador.

![[Paralelismo entre instrucciones - software pipelining.png]]

Las diferentes operaciones actúan de fases, y las fases en la misma columna see ejecutan simultáneamente.

![[Paralelismo entre instrucciones - software pipelining ejemplo.png]]