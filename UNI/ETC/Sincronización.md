# Sincronización

Se hace para saber si un periférico está preparado o no para la transferencia de datos.  Está listo si, siendo de entrada, tienen nuevos datos para tranferir y, si es de lectura, si ya ha procesado los datos anteriores.

Hay dos tipos de tipos de sincronización:
- Por consulta de estado: La iniciativa la tiene el procesador, y mediante un bucle se consulta al periférico sobre su disponibilidad.
- Por Interrupciones: La iniciativa la tiene el periférico, y avisa cuando está disponible mediante una interrupción.

## Sincronización por consulta de estado

Una interfaz típica cuenta con un registro de estado, uno de control y otro de datos.

El registro de estado tiene un bit ready que, al estar a 1, indica que el periférico está preparado.

El registro de control tiene un bit Cancel que, al estar a 1, indica que la operación se va a cancelar. Además, al cancelar la operación, el bit ready se pone a 0.

El bucle consiste en esperar hasta que Ready esté en 1, tras lo que se pone el bit de Cancel a 1 y se hace la transferencia. Tras la transferencia, el bit de R se pone de nuevo a 0.