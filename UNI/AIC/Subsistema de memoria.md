
# Prestaciones

El tiempo de acceso a caché, siendo $TA$ el tiempo de acierto, $TF$ la tasa de fallos y $PF$ la penalización por cada fallo, se define como:
$$
T_{acceso} = TA + TF \times PF
$$

Con estos datos, podemos definir el tiempo de ejecución del código como:
$$
T_{ej} = T_{ej\ cpu} + T_{extra\ memoria}
$$

Donde el tiempo de ejecución de CPU se define como $I\times CPI\times T$ y el tiempo extra por la memoria como:
$$
\begin{align}
T_{extra} &= \text{Ciclos de parada por memoria} \times T \\
&= Fallos \times PF \times T \\
&= I \times API \times TF \times PF \times T\\
\end{align}
$$

Por lo que, de nuevo, el tiempo de ejecución pasa a ser:
$$
T_{ej} = I\times CPI \times T + I \times API \times TF \times PF \times T
$$

La caché L1 se divide en caché da datos y caché de instrucciones, y cada una de ellas tiene un API (accesos por instrucción), pero el resto de características deberían ser iguales.

$$
\begin{align}
API_{\text{L1}} &= \frac{\text{Accesos}_{\text{L1}}}{I} = \text{Accesos}_{\text{L1I}} + \text{Accesos}_{\text{L2I}} \\
\text{Accesos}_{\text{L1I}} &= \frac{I}{I} = 1 \\
\text{Accesos}_{\text{L2I}} &= \frac{\text{Loads} + \text{Stores}}{I} \\
API_{\text{L1}} &= 1 + \frac{\text{Loads}+\text{Stores}}{I}
\end{align}
$$

Del mismo modo, la fórmula de los fallos de caché L1 también se complica.

$$
\begin{align}
T_{\text{extra L1}} &= (Fallos_{\text{L1I}} + Fallos_{\text{LID}}) \times PF \times T \\
&= I \times (API_{\text{L1I}} \times TF_{\text{L1I}} + API_\text{L1D} \times TF_{\text{L1D}} ) \times PF \times T \\
&= I \times API \times TF' \times PF \times T \\
\end{align}
$$


> [!important] Tasa de fallos unificada
> Si las **penalizaciones** de fallo $PF$ no son iguales para los dos tipos de caché L1 o cambian según si la operación es de lectura o escritura, no se puede usar la tasa de fallos unificada $TF'$.
> 
> $$
> \begin{align}
> T_{\text{extra L1}} = & I \times  \frac{I}{I} + TF_{\text{L1I}} + PF_{\text{L1I}} \times T + \\
> & I \times  \frac{Loads}{I} + TFL_{\text{L1D}} + PFL_{\text{L1D}} \times T + \\
> & I \times  \frac{Stores}{I} + TFS_{\text{L1D}} + PFS_{\text{L1D}} \times T \\
> \end{align}
> $$

Finalmente, cabe destacar ejecución fuera de orden, los fallos de lectura de datos no se detienen hasta que deje de haber entradas disponibles en el ROB o estaciones de reserva. En este caso se multiplica $PFL_{\text{L1D}}$ por $FNS$ (la fracción no solapada).

![[Prestaciones de la memoria - fraccion no solapada.png]]

# Mejora de prestaciones de caché

La forma de mejorar las prestaciones de una unidad de memoria caché son reducir PF, TF o TA.

## Reducción de la penalización por fallo

### Cachés multinivel

La caché L1 se integra la *pipeline*, así que debe ser tan rápida como el procesador, lo que limita su tamaño. Una caché L2, aparte de no tener división entre Datos e Instrucciones, puede ser más grande a cambio de ser más lenta. Hace las veces de *fallback* de la L1.

Añadir una caché L2 cambia la PF de la L1, y por consiguiente el tiempo de acceso a L1:
$$
\begin{gather}
PF_{\text{L1}} = TA_{\text{L2}} + TF_{\text{L2}}  \times PF_{\text{L2}}  \\
T_{\text{acceso L1}} = TA_{\text{L1}}  + TF_{\text{L1}} \times (
TA_{\text{L2}} + TF_{\text{L2}}  \times PF_{\text{L2}})
\end{gather}
$$

> [!important] Nótese que los términos que más influyen a $PF_{\text{L1}}$ son $TF$ y $PF$


También surge la necesidad de diferenciar entre las tasas de fallos locales y la tasa de fallos global.

$$
\begin{align}
TF_{\text{L1}} &= \frac{\text{Fallos L1}}{\text{Aciertos L1}} \\
TF_{\text{L2}} &= \frac{\text{Fallos L2}}{\text{Aciertos L2}} \\
TF_{\text{Global L2}} &= TF_{\text{L1}} \times TF_{\text{L2}} 
\end{align}
$$


> [!info] Fallos quitando la caché L1
> Aunque la tasa de fallos global dependa de L1 y L2, si quitásemos la L1 no tendríamos menos fallos, ya que todos los fallos que cubre la L1 los cubriría la L2. Esto sí, todo sería más lento.

Hay dos formas de gestionar la diferencia de datos entre L1 y L2: la inclusión y exclusión multinivel.
- **Inclusión:** Si están en L1 están en L2.
    - Más coherencia, solo hace falta comprobar L2.
    - Si el tamaño de bloque de L2 y hay reemplazo en L2, primero hay que invalidar bloques en L1 aumentando la tasa de fallos en L1.
- **Exclusión:** No comparten ningún dato.
    - Se aprovecha mejor el espacio.
    - Si falla en L1 y acierta en L2, se hace un intercambio.
    - Si falla en ambas, sólo se trae a L1.
    - Difícil implementación.

### *Critical Word First* y *Early Restart*

La penalización por fallo depende de la latencia $L$, el ancho de banda $B_{w}$ y el tamaño de bloque $B$ de la memoria.

$$
PF = L + \frac{1}{B_{w}} B
$$

![[Subsistema de memoria - PF.png]]

Si hay que convertirlo de ciclos de bus de memoria a ciclos de procesador, $PF' = PF · \frac{f_{cpu}}{f_{mem}}$.

Lo notable aquí es que, a priori, hay que esperar a que cargue todo el bloque, aunque sólo se quiera una palabra de él. CWR y ER son dos técnicas que permiten cargar la palabra sin haber cargado todo el bloque.

- **Early Restart:** Se traen las palabras del bloque una a una en orden, pero cuando se llega a la palabra solicitada se le entrega al procesador y sigue la marcha.
- **Critical Word First:** Se busca primero la palabra solicitada y se le entrega al procesador, y luego de trae el resto del bloque en orden circular.

Estas técnicas son especialmente beneficiosas si se usan tamaños de bloque grandes o si a menudo el siguiente acceso a memoria no hace referencia al mismo bloque que se está cargando (es decir, si no se aplica el principio de localidad espacial).

### Buffers de escritura

Como la memoria principal y las memorias caché de nivel inferior son más lentas que L1 y el procesador, las escrituras pueden causar ciclos de parada.

Para mitigar el problema en los niveles inferiores de caché se hace uso de buffers de escritura (para escribir en el nivel superior) que desacoplan la escritura del procesador.

Sin embargo, si el buffer de escritura se llena y se intentan hacer más escrituras, se dan ciclos de parada hasta que se libere una entrada.

Esto, de nuevo, se puede mitigar con la técnica de *Write Merging*, consiste en combinar entradas consecutivas en una sola entrada.

![[Subsistema de memoria - write merging.png]]

Con esto se reducen el número de accesos al escribir varias palabras a la vez en lugar de una sola, lo que es interesante cuando los puertos de escritura son el cuello de botella, como con las GPU.
## Reducción de la tasa de fallos

### Fallos de bloque

Podemos separar los fallos de bloque en tres tipos:
- **Arranque:** Son un porcentaje bajo de los fallos gracias al principio de localidad espacial.
    - Se reducen aumentando el tamaño de bloque, pero esto también aumenta la penalización de fallo al tener que traer más bloques cada vez, por lo que no interesa.
- **Capacidad:** Suceden cuando la caché no puede almacenar todos los bloques necesarios durante la ejecución de un programa, produciendo reemplazos.
    - Se reducen aumentando el tamaño de la caché, pero eso aumenta el tiempo en caso de acierto. Por esto usamos ya L1 y L2.
- **Conflicto:** Sucede en las caches asociativas cuando el conjunto al que debería ir el dato está lleno, por lo que provoca un reemplazo a pesar de haber espacio.
    - Se reducen aumentando el número de vías, pero la complejidad aumenta rápidamente y con ella el consumo energético y a veces incluso el tiempo en caso de acierto.

### Fallos de instrucciones

La idea general es mejorar la localidad espacial reordenando instrucciones mediante un compilador.

Por ejemplo, el *Branch Straightening* tenemos que si tenemos una condición que provoca un salto a una sección de código que no está seguida a la instrucción de salto condicional, invierte la condición y mueve los bloques de código para que el salto y el bloque estén juntos.

![[Subsistema de memoria - branch straightening.png]]

### Fallos de datos

La idea es mejorar la localidad espacial o temporal modificando el orden en el que el código accede a los datos.

El siguiente es un ejemplo de optimización de la localidad espacial
![[Subsistema de memoria - acceso por filas.png]]

Y el **blocking** es un ejemplo clásico de mejora de localidad temporal:
![[Subsistema de memoria - blocking.png]]

## Reducción del tiempo en caso de acierto

El tiempo se puede mejorar usando predictores de vía para reducir los fallos de bloque por conflicto sin aumentar el tiempo de acceso.

- Si el predictor falla el tiempo de acceso se eleva (por ejemplo a 3 ciclo).
- Si el predictor acierta se reduce el tiempo de acceso a 1 ciclo.

Sólo nos interesará si tenemos predictores muy buenos, ya que el tiempo de acierto se calcula como:
$$
t_{\text{acierto}} = \text{\% aciertos} \times TA_{\text{acierto}} + \text{\% fallos} \times TA_{\text{fallo}}
$$

# Mejora de prestaciones de MP

Las celdas que componen la RAM almacenan un bloque y se organizan en matrices de $2^{n}$ filas y $2^{m}$ columnas

La búsqueda en esta matriz sigue estos dos pasos:
- Primero se transmite la dirección de fila.
    - Señal RAS.
    - Se lee la fila entera que contiene el bloque deseado.
    - Se guarda en el buffer de fila, que guarda más de 1KB de datos.
- Luego se transmite la columna.
    - Señal CAS.
    - Se accede a los datos del bloque deseado usando la columna como índice en la fila que contiene el bloque.
    - Los datos se transfieren al controlador de memoria.

![[Subsistema de memoria - búsqueda de bloque.png]]

En consiguientes búsquedas, si el bloque requerido ya está en el buffer de fila no es necesario volver a cargarlo. En caso contrario, se ha de cerrar la fila con una estructura destructiva y cargar la nueva. A esto se le conoce como **precarga**.

El bus de memoria por el que se envían los datos tiene una frecuencia $f_{mem} \neq f_{cpu}$ y un ancho de 64 bits, por lo que el tiempo para realizar una operación se expresa en ciclos de bus.

Estas memorias son del tipo SDRAM (*Synchronous Dynamic Random Access Memory*), y la hay de dos categorías:
- SDR: Realiza una transferencia por ciclo.
- DDR: Realiza dos transferencias por ciclo, por lo que puede tardar hasta la mitad.

Es decir, si medimos las **transferencias por bloque**, tendríamos que para transferir un bloque de 64 Bytes harían falta $(64 · 8) \mathbf{/} 64 = 8$ transferencias, que tardarían dos 8 ciclos en enviarse con memoria SDR pero 4 ciclos si se usa memoria DDR.

Dadas las siguientes órdenes...
- PRECHARGE: Cerrar fila.
- ACTIVATE: Abrir fila.
- READ: Leer columna desde el buffer de fila.
- WRITE: Escribir dato
... tendríamos un cronograma con el siguiente para 4 transferencias consecutivas de 8B de una memoria SDR.

![[Subsistema de memoria - cronograma básico.png]]

Primero se hace la recarga de la fila, que implica una escritura en el buffer de la fila, de ahí la señal en RAS\* y WE\*. Después tenemos la señal RAS\* de nuevo al leer la fila y cargarla en el buffer. Finalmente llegamos a la fase de lectura del dato en la que hay una señal CAS\* porque se lee la columna indicada, tras lo que se envían los datos.

> [!important] Si la fila estuviese ya abierta, empezaríamos directamente desde la fase *Read*.

La temporazación de la RAM viene definida por los siguientes datos:
![[Subsistema de memoria - temporización.png]]
- $CL$ (*CAS Latency*): Número máximo de ciclos entre el envío de la dirección de columna (CAS, fase Read) y el comienzo de la ráfaga.
- $t_{\text{RCD}}$ (*RAS to CAS Delay*): Número mínimo de ciclos entre la apertura de la fila (RAS, fase Active) y el acceso a columna (CAS, fase Read).
- $t_{\text{RP}}$ (*RAS Precharge*): Número mínimo de ciclos entre la precarga y la lectura de la siguiente fila (Active).
- $t_{\text{RAS}}$ (*Active to Precharge Delay*): Número mínimo de ciclos entre la activación de una file (Read) y su precarga.

La latencia $L$ se define como el tiempo mínimo que tiene que pasar desde una precarga hasta el comienzo de la siguiente ráfaga. $L = t_{\text{RP}} + t_{\text{RCD}} + CL$.

La latencia de escritura $L_{r}$ es simplemente el tiempo que pasa desde que se lee la columna hasta que se puede comenzar la ráfaga. $L_{r} = CL$.

A partir de esto, la penalización por fallo (en ciclos de bus) es igual al producto de la latencia y la tasa de fallos, más el producto de la latencia de escritura y la tasa de aciertos más los ciclos de transferencia que que se pueden hacer. Nótese que aquí $TA$ es la tasa de aciertos.
$$
\begin{align}
PF &= L·(1- TA_{b}) + L_{r}·TA_{b} + \frac{B}{B_{w}} \\
PF_{\text{acierto}} &= L_{r} + \frac{B}{B_{w}} \\
PF_{\text{fallo}} &= L + \frac{B}{B_{w}}
\end{align}
$$

En la práctica, $L_{r} = CL$ suele ser $L / 3$, y a menudo también se da que $t_{\text{RP}} = T_{\text{RCD}} = CL = L / 3$.

## Políticas del controlador

Encontramos principalmente de 2 tipos:
- FIFO / FCFS
- FR-FIFO / FR_FCFS: Prioriza primero los bloques que ya estén en el buffer de fila, y después prioriza según FIFO. Depende mucho de la localidad espacial.

## Organización de la memoria

La memoria se divide chips, que a su vez se dividen en bancos a los que se puede acceder en paralelo y que tienen su propio buffer de fila y matriz de celdas.

Las interfaces (tamaño de palabra en bits) son estrechas. Normalmente se usan chips DRAM x8, x4, o x16.

Cada módulo ha de tener como mínimo un rango, que son los grupos de chips que se pueden formar con 64 bits. Por ejemplo, con interfaz x8 y 16 chips tendríamos $\frac{64}{16 · 8} = 2$ rangos. Los chips de un mismo rango no comparten datos pero sí los buses de dirección y órdenes, así hacen todo a la vez.