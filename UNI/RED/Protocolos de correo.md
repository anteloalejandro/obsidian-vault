
![[esquema cliente servidor correo.excalidraw|100%]]

Los clientes de correo de cada usuario envían su correo cada uno a un servidor diferente, y para que los usuarios reciban el correo uno de otro, los propios servidores se tienen que comunicar entre sí, por lo que **todo servidor de correo es, además, un cliente de correo**. El correo se envía a través del protocolo SMTP (hoy en dia, ESMTP) y se leen a través del protocolo POP3 (descarga de correo), IMAP (acceso remoto) y, en algunas aplicaciones web, HTTP.

# SMTP

La cabecera y cuerpo están separados por un CRLF, y en el cuerpo sólo está, predeciblemente, el cuerpo del mensaje. En la cabecera están el destinatario (principal, secundario, cc ocultos), el asunto, fecha, a que correo es respuesta, etc.

Funciona por TCP por el puerto 25 y el texto se codifica en ASCII de 7 bits. La transferencia se divide en 3 fases: Establecimiento, transferencia y cierre.

## Órdenes

- HELO nombre de dominio: Identifica el nombre de dominio del cliente o su IP.
- MAIL FROM: dirección-origen (no tiene que ver con cabecera from)
- RCPT TO: dirección-destion (no tiene que ver con cabecera to)
- DATA: mensaje, con sus cabeceras y cuerpo. Termina con un `<CR><LF>.<CR><LF>`, o sea, con un solo punto en una línea sin nada más.
- EXIT: sale grácilmente
- RSET: aborta

## Respuestas

El cliente toma la iniciativa, pero es el servidor el que empieza la conversación. El cliente realmente solo pide conexión, y es el servidor quien le responde con un código de estado, tras lo que el cliente puede empezar a usar las órdenes.

## ESMTP

Hay múltiples extensiones dipsonibles para SMTP. Cuando el cliente quiere acceder a una de estas extensiones, saluda con un EHLO en vez de HELO, y si el servidor lo entiende, responderá con un 250 por cada extensión que tiene disponible, seguido de la propia extensión.

# POP3

Conexión TCP al puerto 110. Descarga los correos del servidor web (generalmente el servidor los elimina tras esto). A diferencia de SMTP, POP3 tiene las fases de Autorización, Transferencia y actualización.

## Órdenes

- USER usuario
- PASS contraseña
- STAT: devuelve # de mensajes y su tamaño
- LIST: lista los mensajes y sus tamaños
- RETR msg: leer (retrieve) un mensaje
- DELE  msg: borra un mensaje
- QUIT: termina grácilmente. Se eliminan los mensajes no guardados
- RSET: aborta. No se elimina ningún mensaje
- (opcional) TOP msg line: lista las cabeceras de un mensaje más el # de líneas especificadas.

## Respuestas

Códigos de estado +OK y -ERR. Si hay repuestas multilinea terminan con `<CR><LF>.<CR><LF>` en vez de un CRLF. Al igual que SMPT, el cliente inicia la conexión pero el servidor es el primero en responder.

## Cierre de sesión

No conserva el estado entre sesiones, sesión = conexión → descarga y/o borrado → cierre. Cada sesión es única e independiente, por lo que la organización es limitada (nada de carpetas o etiquetas).


# IMAP


