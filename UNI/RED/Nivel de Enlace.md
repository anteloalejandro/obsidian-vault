
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
        - MSB para indicar si es individual o de un grupo
        - 2ndo MSB para si es universal o local
        - El resto de los 3 octetos de MSB para el prefijo del fabricante
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