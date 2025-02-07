
Una conexión TCP está definida por las IP y puertos **locales y externos**, lo que permite tener múltiples conexiones al mismo puerto del servidor. Como cada conexión es una relación entre un sólo cliente y un sólo servidor, no permite una difusión real.

Un datagrama UDP ocupa 8 bytes para la cabecera y hasta 64 bytes menos lo que ocupe la cabecera de la capa IP.

# Control de flujo

Emisor y receptor se sincronizan en el envío de información.

Cada extremo en una comunicación disponen de un buffer de recepción, donde se van almacenando los datos recibidos correctamente y en orden, mientras el nivel de transporte lee estos datos a su ritmo.

Si el nivel de aplicación es lento en las lecturas, el emisor podría provocar un desbordamiento del buffer, por lo que se lleva a cabo un control de flujo mediante una *ventana de recepción*, `V_rec`, que indica el espacio libre en el receptor. Es el propio receptor quien informa al emisor de como de grande es esta ventana, y el tamaño es dinámico y puede tomar el valor cero para detener los envíos.

El tamaño de la ventana de recepción, normalmente, es el tamaño total del buffer menos el tamaño de los datos sin leer en dicho buffer.

El emisor no envía datos equivalentes al tamaño de la `V_rec`, sino que resta el tamaño de todos los datos enviados y no reconocidos, ya que asume que los datos no reconocidos llegarán eventualmente y llenarán el `V_rec`. El resto de ese tamaño, lo llena con datos por enviar. Es decir, la ventana de transmisión del emisor ha de ser menor o igual que la ventana de recepción del receptor.

Sin embargo, como se pueden dar bloqueos si la ventana de transmisión es 0 y se recibe un reconocimiento diciendo que la ventana de recepción es 0, se permite que el emisor aún pueda enviar segmentos de 1 byte con tal de enviar reconocimientos, que serán respondidos con reconocimientos del emisor en caso de que `V_rec` deje de ser 0.

# Control de error

Se hace mediante ARQ, automatic resend request (maomeno), además del control de errores basado en el checksum y la ventana deslizante.

La ventana deslizante tendrá un tamaño fijado con el receptor mediante el `V_rec`.

# Congestión en la red

Se origina en los routers, ya que conectan varios dispositivos y redes con diferentes anchos de banda. Si los paquetes tienen que salir por un extremo que no tiene suficiente ancho de banda para seguirle el ritmo a el/los extremo/s por donde entran los paquetes, se van llenando los buffers del router. Una vez se llenan los buffers, y una vez se llenan los buffers se empiezan a descartar paquetes.

La congestión tiene dos efectos principales.
- El incremento del RTT que conllevan puede hacer que salte un timeout en el emisor y que acabe reenviando paquetes que iban a llegar a su destino igualmente, contribuyendo a congestionar más la red.
- El descarte de paquetes implica que los paquetes se tienen que volver a enviar, haciendo de nuevo reconocimientos y demás, malgastando recursos en ambos extremos de la red.

Es por esto que TCP trata también de reducir la congestión, haciendo un reparto equitativo de la capacidad entre todos los flujos TCP limitando el envío de tráfico de cada emisor en función de la congestión.

Si bien esto no soluciona el problema de las diferencias de bandas anchas, si que mitiga mucho el problema cuando la diferencia de banda ancha se da por tener que pasar los paquetes de múltiples extremos a un sólo extremo, que es un caso común.

Es el emisor el que se debe encargar de limitar su envío de tráfico, para lo que debe resolver tres problemas:
- **Cómo limitar el tráfico.**
- **Cómo detectar la congestión.**
- Cómo variar la tasa de transmisión en función de la congestión **(qué algoritmo utilizar)**.

## Limitar el tráfico

Se hace uso de una **ventana de congestión**, que es una estimación de cuánto puede transmitir la red para cada conexión y depende de las condiciones de la red.

La función de la ventana de congestión es la de poner un tope superior a la **ventana de transmisión**, que es la que indica cuánta información se puede enviar a una conexión. Nótese que esta ventana tiene dos topes superiores: la ventana de congestión, propia del emisor, y la ventana de reconocimientos, propia del receptor.

$$
\text{Vent. Transmisión} = min(\text{Vent. reconocimientos}, \text{Vent. Congestión})
$$

Tanto la ventana de reconocimientos como la de congestión se miden en bytes, pero a menudo esta última también se expresa en número de segmentos, redondeado para arriba.

## Detección de la congestión

En TCP se supone siempre que la pérdida de un segmento es debida a la congestión. Aunque no es cierto en la práctica, supone una buena aproximación de todos modos.

La idea es que un segmento solo se puede perder por dos motivos: Un timeout o la recepción de 3 ACKs duplicados (es decir, 4 segmentos con el mismo campo de reconocimiento). Esto es lo que se conoce como **indicio negativo**, y cada vez que sucedan se reduce la tasa de envío.

Del mismo modo, si se recibe un ACK que reconoce datos que habían estado sin reconocer, lo que consideramos un **indicio negativo**, se incrementa la tasa de envío. Por esto se dice que el timeout, a la larga, tiene más peso que los ACKs duplicados, porque estos últimos se compensan al recibir ACKs que confirmen el envío todos los recibidos desde el duplicado.

La tasa de envío se incrementa o disminuye mediante la ventana de congestión.

## Gestión de la ventana de congestión

Al comenzar, en vez de que la ventana de transmisión sea igual a la ventana de recepción, se limita la ventana de congestión a un valor pequeño, generalmente 2 segmentos. Esto se conoce como **arranque lento**.

Tras esto, el tamaño de la ventana de congestión crece en 1 segmento con cada ACK nuevo. Si empezamos con una ventana de congestión de dos segmentos, se envían 2 segmentos y llegan ACKs para ambos, pasamos a tener 2+2=4 segmentos en la ventana, si ahora se envían 4 segmentos y llegan ACKs para todos, tenemos 4+4=8. Esto continua así hasta que la red empieza a saturarse haciendo que se pierdan segmentos. En definitiva, el tamaño de la ventana de congestión (y por consiguiente, la ventana de transmisión), en un caso ideal, **crece exponencialmente** ($2^n$) hasta que alcanza un tope.
$$
\text{Vent. congestión} \leftarrow \text{Vent. congestión} + 1 \text{ segmento}
$$
Además, se hace uso de un **Umbral** de modo que cuando la ventana de congestión lo supera sólo se incrementa en 1 su tamaño cuando se han recibido tantos ACKs como segmentos se han enviado, pasando de un crecimiento exponencial a uno lineal. Por ejemplo, si el umbral es 4 y la ventana es 8, sólo incrementará en 1 la ventana una vez lleguen 8 ACKs. A esta fase se le llama **evasión de la congestión**.

La reducción de la ventana de congestión consta de dos partes. Primero, se reduce el umbral. Luego, si ha ocurrido un timeout, la ventana de congestión se pone a 1 segmento, y si en su lugar ha habido 3 ACKs duplicados la ventana de congestión se iguala al umbral.

$$
\begin{gather}
\text{Umbral} = max\left( \frac{\text{Vent. transmisión}}{2}, 2 \text{ segmentos}\right) \\ \\
\text{Vent. congestión} = 
\begin{cases}
1  & \text{Si ha habido }timeout \\
\text{Umbral} & \text{Si ha habido 3 ACKs}
\end{cases}
\end{gather}
$$