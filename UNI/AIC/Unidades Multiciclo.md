
Hay instrucciones complejas que toman mucho más tiempo para completar que el resto. Esto nos deja dos opciones: O aumentamos el periodo de reloj (disminuir frecuencia), que afectaría a todas las instrucciones o, mejor, permitimos que esas instrucciones tomen múltiples ciclos.

Entre estas operaciones usualmente se encuentran operaciones de multiplicación y división de enteros, y todas las instrucciones de coma flotante.

La parte que hace que estas instrucciones tarden más siempre es la fase de ejecución, así que permitiremos que esta fase dure más tiempo que para el resto de instrucciones. Esto implica lógica adicional en la fase ID para discernir entre el tipo de fase de ejecución que se llevará a cabo.

![[Unidades Multiciclo - fases de ejecución.png]]

Estos operadores multiciclo pueden ser de dos tipos:
1. Convencionales: Forman una sola fase más larga. Solo puede haber una instrucción en ejecución al mismo tiempo.
2. Segmentados: Al igual que el resto del procesador, se dividen en más fases. Puede haber instrucciones en cada una de las fases, pero no puede haber más de una en la misma.

Además, se distinguen dos parámetros característicos comunes para ambas fases:
1. Latencia o tiempo de evaluación $T_{ev}$, que indica como de larga es toda la ejecución de la instrucción.
2. Tasa de iniciación $IR$, que es la inversa de cuanto se tarda en empezar a ejecutar una instrucción del mismo tipo justo después de otra. Si el procesador está segmentado, $IR = 1$, pero si es convencional y dura $n$ veces más que un ciclo, $IR = \frac{1}{n}$.

Obviando conflictos estructurales, se pueden ejecutar múltiples instrucciones simultáneas siempre y cuando no utilicen la misma fase de ejecución, aunque los operadores sean no segmentados.

![[Unidades Multiciclo - ejecución operaciones multiciclo.png]]

Además, las operaciones multiciclo rara vez escriben en memoria principal, así que se puede obviar la fase MEM en ellos y dejarlo solo para las operaciones normales que tienen fase EX.

![[Unidades Multiciclo - varios operadores sin mem.png]]

# Riesgos estructurales

Además de los riesgos de datos que se producen porque las instrucciones ya no duran lo mismo y, por tanto, puede acabar antes una que hay empezado más tarde, se añaden riesgos estructurales que no dependen de los registros utilizados, si no de conflictos físicos entre fases.

## Operaciones no segmentadas simultáneas

Cuando se usan operadores no segmentados, aunque no haya riesgos de datos ni de control, sigue existiendo un riesgo estructural, pues la fase de ejecución es un solo bloque, en el que solo puede haber una instrucción sin importar cuanto dure.

Para solucionarlo se deben insertan ciclos de parada en ID, lo cual ralentiza mucho al procesador.

![[Unidades Multiciclo - riesgo no segmentadas.png]]

## Escritura simultánea en bancos de registros

Al acabar a destiempo, puede darse la situación de que dos instrucciones tengan que escribir en el banco de registros en el mismo golpe de reloj.

![[Unidades Multiciclo - riesgo banco de registros.png]]

Se puede arreglar añadiendo ciclos de parada, pero además se pueden añadir diferentes bancos de registros para diferentes instrucciones, según su duración.

Sin embargo, el número de registros es limitado, así que dividirlos en muchos bancos para cada posible tipo de instrucción no es eficiente. Por ello, normalmente se discierne entre dos bancos de registros diferentes: Uno para operaciones con coma flotante (que son especialmente largas) y otro para todos los demás.

![[Unidades Multiciclo - multiples bancos de registros.png]]

Aún así, limitar el número de bancos de registros nos deja con el mismo problema, aunque a menor escala; si hay instrucciones con duraciones diferentes que quieren escribir en el mismo banco de registros, habrá que insertar ciclos de parada.

![[Unidades Multiciclo - ciclos de parada multiples registros.png]]

