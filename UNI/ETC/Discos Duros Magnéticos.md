
# Dispositivos magnéticos

Un medio (superficie) se cubre con una capa de material ferromagnético que contiene múltiples [dominios magnéticos](https://es.wikipedia.org/wiki/Dominio_magn%C3%A9tico), que pueden ser orientados usando una corriente eléctrica y conservan su orientación cuando dejan de recibirla, es decir, actúan como dipolos. La orientación de estos dominios se usa para codificar información en formato binario.

Una punta o cabecera se coloca muy próxima a esta superficie y se carga eléctricamente para cambiar la orientación de los dominios.

# Organización de los discos duros

Un disco duro magnético tradicional se divide en en platos o discos; superficies circulares que pueden rotar sobre su propio eje. Cada uno de estos discos se subdivide en 2 cadas, que se subdividen a su vez en pistas, que son circunferencias cada una de un diámetro, formadas a su vez por sectores, la unidad más pequeña a la que se puede hacer referencia. Es disco duro cuenta también con tantas cabeceras como caras usables hay en el disco, que están perfectamente alineadas y se mueven sobre el mismo eje simultáneamente para acceder a diferentes pistas.

![[Discos Duros Magnéticos - Organización.png]]

## Coordenadas

Se podría entender a cada cara como una tabla en dos dimensiones, las pistas serían las filas y los sectores las celdas de cada fila, en las que se guarda la información. Como un disco duro tiene múltiples caras, es como si la información estuviese codificada en 3 dimensiones. Sin embargo, al acceder todas las cabeceras al mismo tiempo sólo podemos acceder a una sección bidimensional de este espacio. Por la forma que tienen los discos, esta sección se asemeja a un cilindro (en realidad es más como un rectángulo con dos aristas en extremos opuestos pegadas), por lo que recibe ese mismo nombre. De aquí sale uno sistema de coordenadas, ya en desuso, para hacer referencia a los sectores, el sistema CHS (o *Cylinder, Head, Sector*).

Hoy en día se abstrae la complejidad de este modelo tridimensional en pos de un sistema de numeración lineal llamado LBA (*Logical Block Address*) en el que los sectores se numeran desde el 0 hacia arriba, aunque el propio disco duro acaba traduciendo estas posiciones numéricas a coordenadas CHS de forma completamente transparente.

## Sectores

Los sectores almacenan una estructura de datos que además de contener los datos, típicamente $\pu{ 512 B }$, guardados marcan la separación entre sectores, un identificador para el propio sector e incluso información redundante para la detección de errores. 

Estos sectores, también llamados *sectores físicos*, no deben confundirse con los *sectores lógicos* con los que trabajan los sistemas operativos. Sin embargo, aunque los sistemas operativos abstraigan el tamaño de los sectores físicos, suelen asignar tamaños de $2^{n}$ sectores físicos con tal de asegurar la **localidad espacial**.

# Capacidad del disco duro

## Unidades de almacenamiento

A menudo las unidades de los dispositivos de almacenamiento no son consistentes; $4\mathrm{GB}$ puede significar que hay $\pu{ 4e9 B }$ o que hay $\pu{ 2^{32} B} \simeq \pu{ 4.3e9 }$ reales, según si el programador ha decido hacer el cálculo en sentido binario o en sentido decimal.

Por esto mismo, la IEC ha impuesto un estándar (que no todo el mundo cumple):

| Símbolo | Nombre   | Valor     |
| ------- | -------- | --------- |
| KB      | Kilobyte | $10^{3}$  |
| MB      | Megabyte | $10^{6}$  |
| GB      | Gigabyte | $10^{9}$  |
| TB      | Terabyte | $10^{12}$ |
| KiB     | Kibibyte | $2^{10}$  |
| MiB     | Mebibyte | $2^{20}$  |
| GiB     | gibibyte | $2^{30}$  |
| TiB     | Tebibyte | $2^{40}$  |

## Dimensiones físicas

Dado que la superficie de cada cara es directamente proporcional al número de pistas y, por tanto, al almacenamiento total, el tamaño del chasis o carcasa de los discos duros limita el máximo de datos que pueden albergar. Los discos duros magnéticos para ordenadores de sobremesa tienen carcasas e 2.5 o 3.5 pulgadas.

## Densidad de información

Los dos factores más importantes a la hora de determinar cuanto espacio puede almacenar un disco son la densidad de sectores en cada pista y la densidad de pistas en cada cara (*line track density*), que se calcula en $\text{tpi}$, o Pistas Por Pulgada.

También hay que tener en cuenta que no toda la superficie circular de la cara de puede utilizar, ya que la parte central que sirve de eje para rotar no puede tener pistas. Es decir, el número de pistas de una cara (y, por tanto, el número de cilindros de un disco), viene determinado por los diámetros de la pista más cercana al centro y la más alejada al centro.

## Distribución de los sectores

Si bien el tamaño de los sectores permanece constante a lo largo de todo el disco, la cantidad de sectores en cada pista puede variar al ser cada una de un diámetro diferente, por lo que el cálculo de la densidad de sectores por unidad de área es diferente según como estén distribuidos los sectores. Se distinguen 3 tipos.

### CAV

En CAV, o *Constant Angular Velocity*, el número de sectores por cada pista es constante y los discos rotan a una velocidad constante. Para conseguir que haya el mismo número de sectores, éstos simplemente ocupan más espacio cuanto más se alejan del centro, sin cambiar su capacidad. Aún así, al girar el disco a velocidad constante respecto al ángulo, leer completamente un sector toma el mismo tiempo en cualquier pista.

![[Discos Duros Magnéticos - CAV.png]]

Sea $H$ el número de cabeceras, $C$ el número de cilindros, $S$ el número de sectores en cada pista y $B$ la capacidad en bytes de cada vector, la capacidad total de un disco duro con esta distribución es simplemente el producto de todos estos.

$$
Capacidad(\mathrm{CAV}) = H · C·S·B
$$

Este sistema ha quedó en desuso hace tiempo, habiendo sido relegado a su uso en *floppies*. Se debe a que la capacidad depende mucho de la densidad de información que se pueda conseguir en la pista más cercana al centro, pero esa misma densidad se ve desaprovechada en el resto de pistas.

### CLV

Con *Constant Linear Velocity* la longitud de los vectores es la misma en todas las pistas. Para conseguir leer cada sector a la misma velocidad, se ajusta la velocidad de los discos según  su pista (cuanto más alejado está un disco, más lento va). 

![[Discos Duros Magnéticos - CLV.png]]

Comparado con CAV, se aprovecha mejor la densidad de información máxima que puede proveer el medio, a costa de una mayor complejidad en los componentes electrónicos que controlan el disco. Por esto mismo, no se usa en discos magnéticos, sino en CDs (de ahí el acrónimo *Compact Disk*) en los que toda esa complejidad la acarrea el lector, no el dispositivo de almacenamiento.

### ZCAV / ZBR

Como indican las siglas ZCAV (*Zone Constant Angular Velocity*), los cilindros del disco se agrupan en múltiples zonas que abarcan múltiples pistas. Todas las pistas de una misma zona tendrán el mismo número de sectores.

![[Discos Duros Magnéticos - ZBR.png]]

Esencialmente, cada zona está organizada como en CAV, pero hay diferentes tamaños y velocidades de rotación como en CLV, haciendo que esta distribución sea un punto medio entre los dos, proveyendo de una mejor densidad de sectores que CAV con menos complejidad que CLV.

Los discos duros modernos optan por usar ZBR (*Zone Bit Recording*), la única diferencia siendo que la velocidad rotatoria es constante (por lo que la velocidad angular sólo es constante dentro de la misma zona), de modo que la velocidad de lectura siempre es mayor en las zonas más alejadas del centro.

Gracias a que en una misma zona se usa CAV, la capacidad se puede calcular como una suma de discos CAV con diferentes densidades de sector por pista.

$$
Capacidad(\mathrm{ZCAV}) = sum
\begin{cases}
 H·\sum_{z} (C_{z} · S_{z}) · B & \text{Si } C_{z} \text{ no es cte.} \\
 \\
 H·C_{z} · \sum_{z}(S_{z}) · B & \text{Si } C_{z} \text{ es cte.} 
\end{cases}
$$

# Rendimiento del disco duro

## Temporización

Los discos modernos giran a una velocidad constante que ronda entre las 4500 y 15000 revoluciones por minuto ($\mathrm{rpm}$). Las operaciones de disco se llevan a cabo cuando recibe comandos de su adaptador, que siempre deben indicar a que sector hacen referencia. La temporización de estos accesos depende de varias partes:

- El brazo de las cabeceras debe estar posicionado de forma que éstas estén en el cilindro (conjunto de pistas) adecuado. El tiempo que se tarda llevar a cabo esta acción se llama tiempo de búsqueda o *seek time*, y se mide en milisegundos. Este tiempo no es constante, sino que depende de lo lejos que resulten estar las cabeceras de la posición en la que deben estar, por lo que los fabricantes dan un tiempo de espera medio y un tiempo de espera a su vecino inmediato, *track-to-track seek time*.
- Una vez está la cabecera en el lugar correcto, también debe esperar a que la rotación del disco mueva al sector hasta donde está la cabecera. A este tiempo, también medido en milisegundos, se le conoce como latencia rotacional, o *rotational latency*. A mayor velocidad rotacional, o *swindle speed*, menor latencia. El tiempo medio es el tiempo que tarda en hacer media rotación.
- Finalmente, el tiempo de transferencia es lo que se tarda en modificar la información del sector, que dependerá de la velocidad de rotación del disco y la longitud del sector (que vendrá dada por la densidad de la pista).

### Cálculo de Tiempos

![[Discos Duros Magnéticos - tiempos.png]]

## Almacenamiento óptimo de ficheros

Las operaciones sobre ficheros involucran a conjuntos sectores, y si estos estuviesen repartidos aleatoriamente por todo el disco, habría mucha latencia rotacional y tiempo de búsqueda para operar sobre cada uno de los sectores. Para minimizar el impacto de estos dos tipos de retraso, tanto los adaptadores de entrada y salida como los propios sistemas operativos llevan a cabo optimizaciones a la hora de asignar sectores a los ficheros:

- Un archivo que cabe entero en una pista trata de guardarse secuencialmente, eliminando los retrasos después de encontrar el primer sector.
- Si no cabe en una sola pista se intenta guardar en el mismo cilindro, por lo que tampoco hay retrasos más allá del primer bloque, ya que el cambio de cabeceras está ajustado para que no tome tiempo adicional.
- Si no cabe en un cilindro, se tratará de guardar en cilindros adyacentes. En este caso, el único retraso más allá de la búsqueda del bloque inicial será *track-to-track seek time* cada vez que se cambie de cilindro.
- En cualquier otro caso, el almacenamiento no puede ser óptimo, pero el sistema operativo elegirá lo más parecido al caso óptimo (generalmente, algo similar al punto anterior).

Otro aspecto a tener en cuenta es la interfaz por la que viajan los datos del bus al disco y viceversa, que pondrá limites a la velocidad máxima que se puede alcanzar en un disco duro. Sin embargo, el cuello en los discos duros magnéticos prácticamente nunca es la interfaz.