---
todo: true
---

Las [[Paquetes|cabeceras de un paquete]] están compuestas de varios trozos, cada uno de ellos correspondiente a uno de los niveles del Modelo TCP/IP. Cada uno de los trozos solo puede ser interpretado por la misma capa en el nodo que recibe el paquete. Por tanto, los mensajes de la Capa de Aplicación tienen como destinatario la misma capa del nodo destino.

Estos mensajes se van traduciendo en el nodo origen a la siguiente capa más profunda hasta que llega a la capa Física, que enviará el mensaje a la capa física del nodo destino, el cual hará el proceso inverso, es decir, ira convirtiendo el mensaje a capas más superficiales.

![[tcp-ip.png]]

## Capa de Aplicación

- Información: Mensaje
- Protocolos: HTTP
- Paquete tras añadir su cabecera: Mensaje
## Capa de Transporte

- Información: Puerto origen y destino
- Protocolos: UPD o TCP
- Paquete tras añadir su cabecera: Segmento TCP o Datagrama UPD

## Capa de Red

Encamina la información al final
A su sección de la cabecera se le llama 

- Información: Dirección IP origen y destino
- Protocolo: IP
- Paquete tras añadir su cabecera: Datagrama o paquete IP

## Capa de Enlace

Movimiento local, se encarga **solo** del siguiente salto en el camino. Por tanto, tiene como dirección de destino el Gateway (Router), no el nodo destino.

La dirección en esta parte de la cabecera es la dirección **MAC**, así que se tiene que traducir la dirección IP de la puerta de enlace que está en la tabla de enrutamiento a una dirección MAC.

- Información: Dirección MAC origen y destino
- Protocolos: Ethernet
- Paquete tras añadir su cabecera: Trama

## El Router en el modelo TCP/IP

Los router no tienen toda la pila de protocolos TCP/IP, porque no transmiten mensajes, solo paquetes, así que no requieren la capa de transporte y aplicación, solo la red red, físico y enlace. Sin embargo, los nodos de la red sí que usan toda la pila de protocolos.

Los routers pertenecen a múltiples redes, de modo que tienen dos tarjetas de red, y por tanto dos capas de enlace y capas físicas. Es decir, se pasa el paquete a sí mismo antes de mandárselo al siguiente nodo.

Además, como tiene que cambiar la dirección MAC del destino del siguiente salto, y el propio router es la MAC de origen del siguiente salto, tiene que modificar las cabeceras de la capa de enlace. En conclusión, **modifica el paquete**, pero no su contenido.

Nótese que como la IP origen y destino no cambian, consideramos que la solo tiene una capa de red.