
La iniciativa la tiene el periférico, que avisa mediante interrupciones. Hace falta una nueva linea para la señal *Interrupt Request*, o IntR. Cada vez que el dispositivo está preparado se activa esta señal, tras lo que el procesador interrumpe lo que está haciendo para llevar a cabo la ruta de servicio, también llamada manejador (*handler*) de la interrupción, para atender a la operación e entrada-salida. Esto permite que el procesador pueda hacer otras cosas mientras espera a que el dispositivo esté disponible.

La salida IntR, activa a nivel alto, se suele sacar de hacer un AND sobre el bit *Ready* del registro de estado y un nuevo bit *Interrupt Enable* del registro de control. La salida va directamente a la CPU.

# Secuencia de eventos


# Soporte a las interrupciones

