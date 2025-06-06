
# Paralelo vs Serie

En un bus paralelo hay tantas vías como bits tiene la palabra (ancho de palabra $w$), y toda la palabra se envía a la vez por todas estas vías, cada bit por una de las vías. El ancho de banda es $B = f · w · \frac{1}{8} \pu{ MB/s }$.

En un bus en serie la palabra se envía bit a bit por una de las vías. A menudo, para sincronizar al emisor y al receptor se usan unos bits para codificar el reloj en cada envío, de modo que si tiene una codificación `8b/10b` hace falta enviar 10 bits reales para poder enviar 10 bits de información, y el ancho de banda sería $B = f · \frac{8}{10} · \frac{1}{8} \pu{ MB/s }$. Nótese que se pueden enviar palabras al mismo tiempo por todas las vías, en cuyo caso el ancho de banda se multiplicaría por el número de vías.

![[Estructuras de interconexión - bus paralelo y serie.png]]

# Interconexión de buses

## Puentes

Los puentes sirven para extender un bus o unir dos buses y poder conectar más dispositivos usando el mismo espacio de direccionamiento. El propio puente se comporta como un dispositivo cualquiera.

El ancho de banda será **el menor de los anchos de banda** de los buses implicados. Es decir, conexiones entre un lado del puente tendrán el ancho de banda de ese lado del puente, pero conexiones entre dos lados del puente tendrán como ancho de banda el menor de los anchos de los dos lados.
## Adaptadores

Los adaptadores de bus ofrecen una interfaz a los programas y los dispositivos que estén conectados a ellos tienen un espacio de direccionamiento compartido pero separado del del bus.

# Jerarquía de buses

## Bus controlador del sistema

Se conectan mediante el *Northbridge* (un sistema de puentes) la CPU, memoria principal y un bus de expansión para periféricos. Normalmente, también sale del *Northbridge* un puente hacia el *Southbridge*, que tiene más expansión aún para dispositivos que usan el bus de sistema y el bus de entrada/salida.

## Bus de sistema

Conectado con el bus controlador usando un puente, permite conectar dispositivos mapeados en el espacio de direccionamiento del procesador. Se considera bus del sistema la parte que está más allá del bus de expansión en el bus controlador.

## Buses de entrada/salida

Se conectan mediante adaptadores al bus del sistema, cada uno de los cuales puede dar acceso a múltiples dispositivos.

# Audio

Cada canal de audio, de los que hay múltiples tanto para entrada como para salida, transmite $f_{m}$ (frecuencia de muestreo) muestras por segundo, que está representada con $q$ bits (usualmente 16 o 24 bits). Por lo tanto, el ancho de banda se calcula como $B = n · f_{m} · q · \frac{1}{8} \pu{ B/s }$.

En el caso del audio comprimido, que es como suele estar almacenado, tiene una tasa de bits fija, como 128Kbps.

# Gráficos

Cada píxel se expresa con número concreto de bits, llamada profundidad de color: 8 bits, 16 bits, 24 bits, etc. Con una profundidad de color de $n$ bits, se pueden representar $2^{n}$ colores.

El espacio en memoria que ocupa una imagen o fotograma es el producto de la resolución y la profundidad de color, expresada en bytes. Por ejemplo, con una relación de aspecto de 16:9, una resolución de 1080p y una profundidad de color de 24 bits, un fotograma ocuparía en la memoria gráfica $1920 · 1080 · 24 · \frac{1}{8} \pu{ B }$.

Una imagen estática no consume ancho de banda ya que es una cosa puntual, pero para mostrar una secuencia de imágenes hay que actualizar la memoria gráfica cada cierto intervalo, expresado en fotogramas por segundo. Para calcular la banda ancha ocupada en el ejemplo anterior con una tasa de fotogramas por segundo de 30, basta con multiplicar el resultado anterior por 30: $1920 · 1080 · 24 · 30 · \frac{1}{8} \pu{ B/s }$. 

De nuevo, si el vídeo está comprimido, se lee con una tasa fija de bits por segundo.

# Transferencias

La memoria principal es el recurso central del que se leen las instrucciones y datos y en el que se almacenan las variables, y para acceder a ella todo el tráfico debe pasar primero por el controlador del sistema (el *Northbridge*).

![[Estructuras de interconexión - Controlador del sistema.png]]

Si los dispositivos trabajan mediante MDA, las transferencias pasan de la MP al periférico y viceversa ($\mathrm{MP \leftrightarrow Periférico}$), pero si trabajan mediante PIO la CPU debe hacer de intermediaria ($\mathrm{MP \leftrightarrow CPU \leftrightarrow Periférico}$).

Para calcular el tiempo de transferencia cuando no hay restricciones de tiempo real (es decir, no trabajamos con audio ni vídeo), se divide el volumen de los datos entre el ancho de banda, $T = \frac{\text{volumen}}{\text{ancho de banda}}$.

Cuando sí que hay restricciones de tiempo real, el tiempo que tarda la transferencia la duración total del archivo, de modo que si el ancho de banda no es suficiente, se perderán datos.