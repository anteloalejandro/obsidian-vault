

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



%%
Por tanto, también se presta atención al ILP que hay en un sólo bloque básico.

Si asumimos que estadísticamente el 15% de las instrucciones son saltos, tendríamos que en cada bloque básico hay unas 6 o 7 instrucciones, que normalmente tendrán dependencias.
%%