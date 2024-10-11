---
todo: true
---

# Modelo Cliente-servidor

El cliente siempre es el que pide el servicio, y solo se comunica con el servidor.

Con servidor no nos referimos a máquina física, un sólo servidor pueden ser múltiples máquinas físicas.

Son aplicaciones asimétricas, la misma aplicación se divide en cliente y servidor.

Por norma general, la IP de los clientes puede ser dinámica, mientras que la IP del servidor es fija, aunque puede tener varias.

# Modelo P2P

Todos los nodos de una red P2P hacen de cliente o servidor según haga falta, todos pueden hacer peticiones y repuestas a cualquier otro nodo de la red.

Las direcciones de IP de todos los nodos son dinámicas.

Son muy escalables pero difíciles de administrar.

# Modelo híbrido

Los pares se registran en un servidor, y dichos pares buscan a otros pares en un servidor. Una vez localizados otros pares la comunicación pasa a ser P2P y no pasa a través del servidor.

Por ejemplo, la mensajería instantánea es P2P.

# Comunicación entre procesos

Los servidores, clientes y pares, son procesos. Dichos procesos se comunican entre ellos según el protocolo utilizado en la capa de aplicación.

# Identificación de los procesos

Los procesos se identifican en la red a través los puertos. Los nodos tienen hasta 2^16 puertos.

- Del 0 al 1023: Puertos reservados. Están reservados para protocolos como HTTP.
- Del 1024 al 49151: Puertos registrados. Se usan para otros procesos de cara a internet.
- El resto: Se usan para procesos privados.

# Sockets

Los sockets son la interfaz entre el nivel de Aplicación y el de Transporte, por lo que el usuario no necesita programar este paso del proceso.

# Protocolos de transporte

TCP: Orientado a la conexión, para transferencia de archivos. Control de flujo y congestión.
UDP: Sin conexión, para streaming de datos, difusiones y preguntas/respuesta rápidas.