---
todo: true
---
# Conmutación de circuito

Se tiene que reservar una ruta de conexión y unos recursos que usarán los paquetes especificados, y ningún otro paquete puede usar esa ruta y recursos hasta que se libere la conexión.

Por tanto, para haber concurrencia, si no hay varios carriles por ruta, se tiene que dividir la carga en diferentes frecuencias o utilizar un algoritmo estilo Round Robin, lo que fraccionaría de velocidad de la red.

# Conmutación de paquete

Hay bloques de información de longitud arbitraria, llamados paquetes, que se envían de nodo a nodo por una ruta no predeterminada. 

Cada uno de estos nodos funcionan por separado, por lo que todos y cada uno de ellos tiene que estar codificado con información sobre su formado, de donde viene, y a donde tiene que ir, que se guarda en una sección llamada cabecera o *header*. Por tanto, el tamaño del mensaje recibido supera al del mensaje enviado. Cuanto menor sea la longitud de cada paquete, más grande es el mensaje recibido finalmente.

Los propios nodos tienen una tabla de enrutamiento que indica los nodos que tienen acceso a según que redes, y un nodo por defecto llamado puerta de enlace o *gateway* al que enviar los paquetes en caso de que no haya ninguna ruta.

## Fragmentación

El router no puede analizar la cabecera hasta que recibe el paquete entero, por lo que reducir la longitud del paquete puede aumentar la capacidad de la red para procesar los paquetes en paralelo. 

Sin embargo, reducir mucho el tamaño del paquete puede aumentar tanto el tamaño del mensaje que acabe siendo igual o más lento que antes. 

Normalmente, puede haber tantos paquetes en paralelo como saltos de nodo a nodo hay.

# Tiempos

## Tiempo de procesamiento

Es el tiempo que tarda el router en decidir por que ruta mandar el paquete.

## Tiempo en cola

El tiempo que se pasa un paquete en la cola antes de ser enviado.

## Tiempo de propagación

Es el tiempo que tarda el primer bit en llegar al otro extremo. Es directamente proporcional al la longitud del medio físico.

$$
T_{prop} = \frac{D}{V_{prop}}
$$

## Tiempo de transmisión

Lo que se tarda desde que llega el primer bit hasta que llega el último bit. No tiene en cuenta ningún tipo de latencia o retardo.

$$
T_{trans} = \frac{L_{paquete}}{V_{trans}}
$$

En comunicaciones y redes, las unidades son múltiplos de 10, en vez de múltiplos de 2. Es decir, $1Kbps \neq 1024bps,\ 1Kbps = 1000bps$.

## Cálculo de los tiempos

El tiempo de un equipo al router es $t_{A} = t_{trans} + t_{prop}$,  mientras que de router a router se han de sumar todos los tiempos.

Nótese que como el router no puede analizar la cabecera hasta tener el paquete, tampoco puede empezar a mandar la información de ese paquete al siguiente nodo. Por tanto, sean A y B dos nodos enviando paquetes al router R, y A tenga un tiempo de propagación menor que B, el tiempo que tarda el primer paquete en llegar de B a R es el máximo entre la suma de los tiempos de propagación y transmisión de B ($t_{B}$) y la suma de los tiempos de propagación y transmisión de A, más los tiempos de transmisión de R ($t_{A} + t_{trans_{R}}$).

## Esquema espacio-temporal del tránsito de paquetes

![[Esquema redes 1.png]]
