
Las llamadas al sistema son el mecanismo del que provee el sistema operativo a los programas en espacio de usuario para acceder a los recursos del ordenador. Son interfaces que abstraen la complejidad del hardware en forma de librerías de funciones.

# Cambio de modo

Los **procesadores** contienen un **bit de modo** que sirve para indicar en qué modo de ejecución están, usuario (1) o núcleo (0). 

Evidentemente, en modo usuario no se puede modificar este bit. En su lugar, el proceso tiene que mandar una señal de [[Interrupciones|interrupción]] en forma de una llamada al sistema, tras lo cual el propio sistema operativo pondrá el bit de modo a 0, y ejecutará el servicio correspondiente a la llamada. Finalmente, el sistema operativo volverá a poner el bit de modo a 1 y devolverá el resultado de la llamada, permitiendo al programa continuar su curso.

![[cambio de modo.excalidraw|100%]]

# POSIX

Las llamadas al sistema varían de SO a SO, pero el estándar POSIX define una serie de llamadas comunes entre cualquier sistema operativo que implemente el estándar que están disponibles en las librerías `<unistd.h>` y `<sys/*>` (donde `*` es el nombre de una cabecera válida) de C.

