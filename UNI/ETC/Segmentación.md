---
todo: true
---

Para segmentar un proceso, tiene que poder partirse en etapas independientes ordenadas. Por ejemplo, una cadena de montaje.

Dado un proceso dividido en $K$ etapas independientes, para terminar $n$ procesos segmentados se tardará lo que tarden $K + n -1$ etapas, asumiendo que todas las etapas tardan lo mismo.

La lectura/escritura de los registros está sincronizada con el reloj, por lo que solo suman tiempo una vez (escriben y leen todos a la vez, conforme indique el reloj).

# Registros

Los registros guardan toda la información necesaria para su etapa correspondiente

# Etapas en MIPS

Tienen que funcionar de forma independiente, podrán estar ejecutándose todas a la vez.

En LI y DI no sabemos aún que instrucción se está ejecutando.
La de EX la utilizan todas las instrucciones
M solo la utilizan lw/sw
ER la usan todas menos sw.

Por tanto, $\tau$ podrá variar en función de que instrucción se ejecute

La aceleración ideal, es decir, lo mucho que aumenta la velocidad de las instrucciones por segundo al segmentar, es, como mucho, igual al numero de segmentos. Sin embargo, la aceleración máxima suele ser significativamente menor a esta.

## Etapa `LI`

Función:  Lectura en memoria de instrucciones
Ud. funcional: Memoria de instrucciones

### Etapa `DI`

función: Decodificar Instrucción, leer RS y RT
Ud. funcional: UC, banco de registros (leer), extensor

### Etapa `EX`

función: Cálculos
Ud. funcional: ALU

### Etapa `M`
función: Leer/escribir en memoria
ud. funcional: memoria de datos

### Etapa `ER`

función: escribir en banco de registros
ud. funcional: banco de registros (escribir)

No causa conflicto con DI, porque lectura y escritura se pueden hacer en paralelo.

# Segmentación con instrucciones de salto (`beq`)

  Las instrucciones de salto usan las mismas etapas que el resto, pero la etapa EX varía un poco.

La ALU ahora tiene dos salidas más, Z y S, donde Z es 1 si R es 0 y S es 1 si R es negativo.

Los conflictos suceden porque se está leyendo cuando aún no se ha escrito, por hacer las cosaas de forma segmentada.

# Conflictos

Conflictos estructurales es tener un elemento (dato?) que se usa en varias etapas pero solo puede operar una instrucción a la vez. Por ejemplo, la memoria, aunque ese caso lo evitamos porque tenemos registros y memoria por separado ¿?.

Conflicto de datos es varias instrucciones intentando acceder al mismo dato en un registro.

Conflicto de control depende de la implementación de las instrucciones de salto.

Soluciones:
- Un compilador añade instrucciones NOP
- El hardware "emula" instrucciones NOP a través de ciclos de parada.

Todas las instrucciones son *productoras* menos sw y salto.
Todas las instrucciones son consumidoras

Las dependencias ocurren cuando una instrucción consume un registro que produce una anterior. Si, además, no se ha llegado en las instrucciones anteriores a la etapa de escritura (ER) cuando la instrucción actual llega a decodificar la instrucción (DI) hay riesgo de que el valor del registro cambie.

En MIPS32 esto siempre sucede en las dos instrucciones anteriores a la consumidora (actual). Por tanto, el compilador puede simplemente añadir dos instrucciones vacías (NOP) entre las productoras y la consumidora.

También se puede cambiar el bit de escritura y lectura en banco de registros para que se active por nivel en vez de por flanco, pero hay que ajustar los tiempos de ciclo para poder asegurar que las lecturas y escrituras se hacen correctamente (esto no lo hacemos).

En casos en los que hay dependencia de datos se pueden añadir circuitos para detectar cuando sucede esto para repetir la etapa DI (insertar ciclos de espera), que sería similar a poner instrucciones NOP ya que la fase LI de la siguiente instrucción no sucede hasta la última DI. Para la dependencia de control se hace lo mismo con la etapa LI.

El CPI también cambia.
$$
\begin{gather}
ciclos = (n + 4) + Paradas\\
CPI = \frac{{ciclos-4}}{n} = \frac{{(n + 4 + P)-4}}{n} = \frac{{n+P}}{n}
\end{gather}
$$
Con NOPs simplemente nos olvidamos de las paradas y añadimos los ciclos NOP a la fórmula

## Conflicto de control (flujo)