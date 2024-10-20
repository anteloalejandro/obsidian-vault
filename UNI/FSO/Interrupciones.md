
Los sistemas operativos son programas dirigidos por eventos. Entre estos eventos se encuentran las excepciones y las **interrupciones hardware y software**. El sistema operativo hace de **servidor** a la espera de que le soliciten trabajo mediante dichos eventos.

# Interrupciones y excepciones

Estas señales las pueden producir los controladores de dispositivos (Interrupción de E/S), el sistema operativo (Interrupción de reloj), o los propios programas cuando quieren solicitar algún permiso al sistema operativo (*Trap*).

Además, las excepciones se producen cuando hay errores, de modo que una excepción de hardware puede implicar errores de paridad de memoria o cortes de corriente, mientras que una excepción de software sucede cuando un programa sufre un error inesperado, como tratar de acceder a una dirección de memoria prohibida.

Sea cual sea el caso, el sistema operativo se activa para gestionar el evento.

# Mecanismo de interrupción

![[interrupcion.excalidraw|100%]]

Cuando se da una señal de interrupción, el sistema operativo toma el control y lleva a cabo las siguientes acciones:
- Termina la ejecución de la instrucción actual.
- Guarda los valores de los registros y el contador de programa, también llamados [[Procesos#Process Context Block|contexto del procesador]].
- Inhabilita la llegada de nuevas instrucciones.
- Salta a la dirección de las instrucciones del servicio de interrupción, que están alojadas en el espacio reservado para el sistema operativo.
- Ejecuta la rutina del servicio.
- Al finalizar, restaura el contexto y vuelve al programa interrumpido.

# Modos de ejecución del procesador

Los procesos pueden ejecutarse en la CPU en uno de dos modos de ejecución: **modo núcleo** y **modo usuario**. Estos modos indican diferentes niveles de privilegios en la **ejecución de instrucciones máquina**.

Desde el modo núcleo no hay restricción alguna y se puede ejecutar cualquier instrucción, pero en modo usuario no se puede acceder a nada de lo que cubra el [[Estructura de un Sistema Operativo#Kernel|Kernel]]. En definitiva, cualquier cosa que tenga que ver con acceder a los recursos de la máquina queda prohibida en modo usuario. Estas **instrucciones privilegiadas** se asocian a tres tipos de protección: Protección de E/S, protección de la memoria y protección del procesador.

Con tal de que el sistema operativo pueda orquestar correctamente el acceso a los recursos del ordenador, todos los procesos ajenos al éste se ejecutan en modo usuario obligatoriamente, permitiéndoseles pasar temporalmente a modo kernel cuando envían señales de interrupción al sistema operativo y éste lo considere conveniente.