
# Corrección de errores

- Forward Error Correction:
    - Añade información que permite que el receptor reconstruya la información correcta.
    - Detección y recuperación.
- Automatic Repeat Request:
    - El emisor retransmite la información
    - Detección y reenvío.

# IEEE 802.3 (Ethernet)

- Se identifica a los dispositivos según la MAC.
    - 48 bits en ROM
        - Hexadecimal (6 octetos)
        - LSB del mayor octeto para indicar si es individual o de un grupo
        - 2ndo LSB del mayor octeto para si es universal o local
        - El resto de los 3 octetos de MSB para el prefijo del fabricante
        - Los 3 octetos menos significativos para identificar la tarjeta de red
    - Tipos:
        - Unicast
        - Broadcast: FF-FF-FF-FF-FF-FF
        - Multicast: 1s en la cabecera de la dirección
    - Planas, no hay jerarquía
- Sólo sobre LAN
- Protocolo ARP (traduce IP a MAC) para averiguar el destino.
    1. Se envía una petición por broadcast (nivel de enlace)
    2. El nodo aludido guarda la MAC de A y contesta con la suya
    3. Los nodos no aludidos también guardan la MAC de A
    4. El nodo emisor la guarda la MAC de D hasta que caduca

# IEEE 802.11 (Wi-Fi)

A diferencia de las tramas de ethernet o de capas superiores del [[Modelo TCP-IP]], aquí se usan de **tres a cuatro direcciones**, en vez de sólo origen y destino.

Los sistemas de distribución (DS) permiten conectar **puntos de acceso** (es decir, switches inalámbricos) con la red cableada u otros puntos de acceso. Los puntos de acceso forman un **conjunto de servicio básico** (BSS) con los clientes que se conectan a él, que esta identificado por la interfaz inalámbrica del punto de acceso. Si los ordenadores se conectan entre sí actuando como puntos de acceso sin conectarse a un sistema de distribución, se forma un conjunto de servicio independiente (IBSS).

La cabecera se estructura así:
- 2 bytes de control
    - Versión del protocolo, actualmente 0.
    - Tipo, que puede ser Management (`00`), Control (`01`), o Data (`10`). Se extienden de aquí subtipos, ocupando un total de 2 bits extra.
    - Bits ToDS y FromDS.
    - More Fragments.
    - etc.
- 2 bytes de duración
- 6 bytes de dirección
- 6 bytes de dirección
- 6 bytes de dirección
- 2 bytes de control de secuencia, formado por el número de fragmento y por el número de secuencia
- 6 bytes de dirección
- de 0 a 2312 bytes de datos
- 4 bytes de CRC

Los bits de dirección serán para uno de 5 posibles valores, en función de qué valgan ToDS y FromDS.
- BSSID, que corresponderá con la dirección física del punto de acceso en BSS y será un valor aleatorio en un IBSS.
- RA o *recipient add*, que no es necesariamente el destino, sino el punto de acceso que recibe la señal y la decodifica en una trama 802.11.
- DA o *destination add*, que será el punto de acceso de procesa el paquete contenido en la trama. Sólo responderá a las tramas de su BSS.
- TA o *transmitter add*, que no es necesariamente el emisor, sino el punto de acceso que se encarga de convertir la trama en una señal inalámbrica.
- SA o *source add*, que será el punto de acceso que crea la trama.

![[Nivel de Enlace - Direccionamiento inalámbrico.png]]

Según los bits de control, se diferencian las siguientes situaciones:
- `00`: Transmisión en la que no intervienen puntos de acceso.
- `01`: El punto de acceso envía una trama a un nodo. En este caso el punto de acceso es un RA, ya que el paquete debe haberlo recibido de un BSS diferente, y el nodo es el DA.
- `10`: Un nodo envía una trama de a un punto de acceso. Aquí el nodo sería el SA y el punto de acceso el TA.
- `11`: Indica que es una trasmisión entre puntos de acceso, por lo que el emisor es el TA y el receptor el RA.

Las direcciones siempre están estructuradas de forma que cumplen las siguientes reglas:
- **Siempre** están presentes los extremos de la transmisión: DA y SA.
- La primera dirección es el destino esta sección de la transmisión y la segunda el origen.
- La tercera dirección siempre es el tercer implicado en la transmisión que no está actuando en esta sección.
- Cuando un extremo de la transmisión envía sus datos, se pone su BSSID en la primera o segunda dirección según corresponda.
- Cuando se transmite entre puntos de acceso, la tercera y cuarta dirección son para el DA y SA respectivamente.