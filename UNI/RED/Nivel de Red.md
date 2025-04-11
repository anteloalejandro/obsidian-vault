# Nivel de Red

## Redes de datagramas

Los routers solo han de implementar las capas de red, enlace y físico. Al carecer de capa de transporte, el router no implementa TCP y, por tanto, no hay ninguna de las seguridades de TCP mientras el paquete viaja entre routers.

## Encaminamiento

El *Forwarding* o reenvío es mover los paquetes recibidos desde en enlace de entrada al enlace de salida adecuado de entre los múltiples que puede tener. Se emplean **tablas de reenvío**, coloquialmente llamadas tablas de enrutamiento.

El Enrutamiento o *routing* es el cálculo de las rutas a tomar por los paquetes, haciendo uso de **algoritmos de enrutamiento**. Mediante este proceso se actualizan las tablas de reenvío.

Se usa el término **encaminamiento** para referirse a ambas cosas.

## IPv4

Ofrece un servicio *best effort*, que no es fiable y no establece conexiones. Tampoco mantiene información de estado sobre los datagramas y se gestionan de forma independiente aunque puedan estar relacionados.

## *Type of Service*

El datagrama IP en IPv4 tiene una sección de 4 bits llamados *TOS* (Type of Service), de los cuales 3 son para la prioridad.

## Fragmentación

La capa de enlace establece un tamaño máximo de trama (*MTU*), limitando el tamaño del campo de datos de la capa de red. Cuando se pasa de una red a otra, el MTU puede cambiar de modo que el paquete ya no quepa entero, por lo que en la cabecera hay una sección de 32 bits que contiene una identificación que comparten todos los paquetes en los que se ha partido el paquete original y un desplazamiento para indicar el orden dentro del grupo. Además, en el espacio restante de los 32 bits hay una sección de flags que indica si el paquete ha sido fragmentado y si este fragmento ha sido el último del grupo.

Una vez fragmentado, aunque el MTU permita paquetes de mayor tamaño, se mantiene fragmentado hasta llegar a su destino.

## *Time to Live*

Para evitar que un paquete de vueltas durante un tiempo y número de enlaces determinado, en la cabecera hay un campo TTL que se decrementa con cada router por el que pasa el paquete. Una vez llega a 0, se descarta. **Primero se decrementa** el TTL y luego se comprueba si es cero, por lo que el router lo descarga si al recibirlo el TTL es 1.

Es decir, el TTL, no es un tiempo, sino un contador.

Segun el RFC1700, el TTL inicial recomendado es 64.

## Protocolo

El campo protocolo de la cabecera indica el tipo de protocolo de la capa de transporte al que corresponde el paquete. Además de UDP y TCP, incluye ICMP, que se usa para el informe de errores en la capa de red.

## *Checksum*

Como el TTL cambia en cada salto, el checksum ha de ajustarse antes de ser enviado.

## Protocolo ARP

A nivel de red local, los equipos no se identifican usando su dirección IP. El procolo ARP sirve para preguntar a todos los equipos de la red local qué equipo tiene la IP que se está buscando, usando las direcciones físicas.

## Coincidencias en tabla de enrutamiento

En caso de que una dirección coincida con dos subredes diferentes, se coge aquella en la que más bits coincidan (prefijo más largo). En caso de que también coincidan la misma cantidad de bits, se escoge en función a un atributo llamado peso.

El la IP del siguiente salto es `0.0.0.0` quiere decir que dicho salto forma parte de la red local de la interfaz.

## Minimización de tablas de enrutamiento

1. Si la ruta y la interfaz coinciden con `default`, se eliminan las entradas directamente.
2. Si coinciden la ruta y la interfaz, pero no con el default, comprobar la agregación.
    1. Si no se puede agregar, pero si se puede añadiendo la red destino de otra entrada con ruta diferente con una máscara mayor a la que tendría después de agregarse, se pueden agregar las redes (excluyendo la añadida) porque al enrutar se escoge la entrada con mayor máscara, evitando los conflictos.
    2. Agregar normalmente.

**EL ORDEN IMPORTA**, hacer el 2.2 antes que el 2.1 puede hacer que la tabla de enrutamiento no sea del todo mínima.

## IPv6


Según el prefijo puede ser unicast local, unicast global, multicast, reservada...


### Unicast global

Unicast global -> Dirección pública IPv4

El prefijo global (45 bits) se usa para identificar la red. Después hay 16 bits de subred, y finalmente 64 bits de interfaz, que identifican al equipo.

Los bits de interfaz se sacan de la dirección MAC. La mac está compuesta de 6 octetos, pero los bits de interfaz tienen 8 octetos. Para convertirlo se siguen los siguientes pasos:
- Justo a mitad de la mac, se añaden los octetos `FF:FE`.
- Se invierte el séptimo (penúltimo) bit más significativo.

### Unicast local

Equivalente a Direcciones privadas IPv4, sólo se usan en redes locales. Son autoconfiguradas, se generan enteramente en el host.

Al contrario que las globales, que son jerárquicas (redes -> subredes -> host), son planas.

Primero, se identifica que se trata de una unicast global porque empieza con `FE:80/10`. Luego tiene los 48 bits siguientes a 0. Los 64 bits restantes son los bits de interfaz, que se sacan directamente dirección MAC mediante el mismo proceso que las Unicast globales.

### Multicast

Para **enviar** a múltiples hosts en un ámbito determinado. El ámbito viene dado por los bits de ámbito, y también hay 112 bits que identifican al grupo al que se va a hacer el multicast.

### IPv4 codificadas

`::FFFF:<IPv4>`

### Inválidas (sólo para documentación)

`2001:DB8::/32`

### Otras direcciones

::/128 -> El host no tiene dirección asignada
::1/128 -> loopback / localhost

### Encapsulamiento de tráfico

Para permitir el enrutamiento de paquetes de IPv6 por redes en las que hay tramos que sólo entienden IPv4 se añade una cabecera IPv4 extra al paquete original, cuyo origen y destino no serán los del paquete original, sino que corresponde al router anterior y al router posterior de dicho tramo, que deberán entender tanto direcciones IPv4 como IPv6. Una vez llega a este nuevo destino, se deshace de la cabecera IPv4 y el paquete continua su curso normalmente.

## Algoritmos de enrutamiento

Los algoritmos de enrutamiento se aplican a zonas de hasta 100 routers. Sin embargo, también se pueden aplican entre zonas.

Pueden ser centralizados (si un nodo calcula las tablas para todos), pero generalmente son distribuidos, dónde cada uno calcula la suya y contribuyen a las tablas de sus vecinos. También suelen ser dinámicos, de modo que se actualizan solos conforme se actualiza la información que reciben, sin intervención manual.

## Enrutamiento por estado del enlace

1. Cada router identifica a sus vecinos y al coste que tiene llegar a ellos.
2. Cada router crea un paquete con esta información que envía a todos los routers de la zona.
3. Cada router debe construir el grafo de red por su cuenta, calcular el camino más corto a cada destino usando el [[Algoritmo de Dijkstra]], y construir su nueva tabla de enrutamiento.

El paquete de estado de enlace contiene la identidad del emisor, un número de secuencia, la lista de vecinos y su distancia a ellos (como se ha dicho antes) y su TTL, tras el cual caducará la información y deberá volver a calcularse.

## Enrutamiento por vector de distancias

En este caso se calcula la distancia a un destino, de X a Y. Necesita saber el coste de tiempo a los vecinos. (Ecuación de Bellman-Ford)

$$
d_{x}(y) = min_{v}\{ c(x,v) + d_{v}(y) \}
$$

Se almacenan los costes a cada vecino en su vector de vecinos. Cuando no se sabe el tiempo a un vecino se considera que es infinito, y se propaga el vector a los vecinos. Este proceso se repite, sustituyendo en el vector que le han pasado los tiempos que mejoran a los anteriores hasta llegar al mínimo.

La idea de este algoritmo es que ya no hace falta saber de antemano el tiempo a todos los nodos de la zona, sólo el tiempo a los vecinos. Dichos vecinos calcularán este mismo tiempo por su cuenta en caso de que no lo sepan, para lo que los vecinos de estos vecinos deberán calcular sus tiempos, y así sucesivamente.

Como se hace en pasos secuenciales, puede dar problemas si uno de los nodos se cae después que otro haya calculado su tiempo a él.