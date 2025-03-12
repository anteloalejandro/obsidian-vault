# Periféricos

La interacción entre un periférico y la CPU de un ordenador requiere de adaptadores de entrada y salida, "localizados" entre el bus del sistema y el propio periférico, que abstraen los detalles específicos de cada adaptador con tal de que la CPU lo entienda.

Las tareas de un adaptador de E/S, también conocido como *driver* o controlador, son:

- **Comunicación con el procesador**
- **Comunicación con el dispositivo periférico**
- **Control y temporización**
- **Transferencia de datos**
- **Control de errores**

# Interfaz de entrada y salida

La interfaz es un conjunto de registros (de tamaño no necesariamente homogéneo) en el adaptador de un periférico que permiten a los programas comunicarse él a través de una interfaz.

En MIPS, el procesador entiende los registros como direcciones de memoria sobre los que escribirá datos o del que leerá datos. Al igual que con la memoria, cada interfaz tiene una dirección base y un tamaño, y a cada registro se accede sumando un *offset* a la dirección base.

Cada periférico puede tener registros diferentes del resto, pero hay ciertos registros que son comunes a la mayoría:

- Registro ESTADO
- Registro ORDENES
- Registros de DATOS, que pueden ser de entrada, salida o E/S.

![[Diagrama interfaz entrada-salida.excalidraw|100%]]

## Señales de acceso

Según su modo de acceso, la forma en la que se habilitan los registros es diferente:

- Los registros de escritura, que son **en los que se debe escribir** (como el registro de órdenes), cuentan con una entrada por flanco de subida $\mathrm{CLK}$, a los que llegará la señal de acceso $\overline{\mathrm{WR}}$. Sólo estarán activos cuando lo marque $\mathrm{CLK}$, es decir, sólo durante el instante en el que $\mathrm{\overline{WR}}$ pase de 0 a 1. Por tanto, para escribir habrá que poner esta señal a 0 y esperar al próximo flanco de subida, que lo marcará el reloj del procesador.
- Los registros de lectura, que son **de los que se debe leer** (como el registro de estado), cuentan con una entrada $\mathrm{\overline{OE}}$ a la que llega la señal de acceso $\mathrm{\overline{RD}}$. Sólo estarán activos cuando lo marque $\mathrm{\overline{OE}}$, es decir, mientras $\mathrm{\overline{RD}}$ sea 0.

Las señales de lectura y escritura son mutuamente excluyentes, pues no se debe poder leer y escribir al mismo tiempo, y sólo se selecciona un registro cada vez. Además, con tal de seleccionar unos registros u otros, se [[#Selección de la interfaz|combinan con otras señales]] mediante puertas lógicas, y la salida de estas será lo que realmente vaya a la entrada que activa el registro.

## Esquemas de direccionamiento

Si bien siempre se accede a los periféricos como si fuesen memoria, hay dos formas en las que se puede llevar a cabo el direccionamiento según su espacio de direccionamiento (o **mapa de memoria**):

- ***Memory-mapped IO:*** Si el espacio de direcciones para los periféricos se comparte con la memoria principal. Es este esquema es el más simple de implementar, pero las direcciones para periféricos opacan direcciones de memoria principal. Al compartir espacio con la memoria principal, las lecturas y escrituras usan las mismas instrucciones que con la memoria principal. **Éste es el esquema que implementa MIPS.**
- ***IO-mapped IO:*** Si los periféricos tienen su propio espacio de direcciones. No se opacan direcciones de memoria principal, así que hay más memoria disponible y el número de dispositivos no está limitado por la memoria. Sin embargo, requiere de una señal de control $\mathrm{M / \overline{IO}}$ adicional para indicar al procesador si el acceso debe hacerse a la memoria o un periférico, por lo que deben también crearse nuevas instrucciones que, a diferencia de las usadas para la memoria, activen esta señal. **Éste es el esquema que implementa x86**.

## Selección de la interfaz

El tamaño de las direcciones viene dado por la cantidad de **líneas de dirección** que se reservan para acceder al adaptador. Cada línea de dirección transporta un bit. Ciertos de esos bits formarán la dirección base (DB) que identifica al adaptador y el resto identificarán al registro dentro del adaptador (*offset*).

Con tal de poder acceder a todos los registros de una interfaz con el *offset*, si hay $2^{p}$ registros, los $\lceil \log_{2}(2^{p}) \rceil = p$ bits menos significativos de la dirección corresponden al *offset*, mientras que los restantes $n-p$ bits identifican a la dirección base.

A nivel de hardware, para diferenciar cuándo se va a acceder a un adaptador o a otro, se utiliza una señal $\mathrm{\overline{SEL}_{Interfaz}}$, que es la salida de una puerta NAND cuyas entradas son a nivel alto para los bits de la dirección base que deberían ser 1, y a nivel bajo para los que deberían ser 0. Esta señal se usa para habilitar a nivel bajo un decodificador que recibirá como entrada los bits que no se usan para la dirección base. Las salidas de dicho decodificador, llamadas $\mathrm{\overline{SEL}_{Reg\,i}}$, serán las que se usen para identificar a qué registro de la interfaz se debe acceder. 

Nótese que, en caso de usar *IO-mapped IO*, la puerta NAND recibirá una entrada extra a nivel bajo con la señal $\mathrm{M / \overline{IO}}$, por lo que sólo se operará sobre la interfaz si dicha señal es 0.

![[Sistema de Entrada y Salida - selección interfaz.png]]

Las salidas $\mathrm{\overline{SEL}_{Reg\,i}}$ se combinan con la señal $\mathrm{\overline{WR}}$ o $\mathrm{\overline{RD}}$ (según sea un registro de lectura o escritura) y con la señal $\mathrm{\overline{SEL}_{Interfaz}}$ mediante una puerta OR, salida de la cual será la entrada de $\mathrm{CLK}$ o $\mathrm{\overline{OE}}$, de modo que un registro sólo será accesible sí es el registro correcto de la interfaz correcta y la señal de lectura o escritura indica que se puede hacer la operación necesaria.

![[Sistema de Entrada y Salida - seleccion registro.png]]

Este modelo funciona correctamente, pero requiere que el tamaño de los registros (aka, el tamaño de palabra) sea de un sólo byte. En tamaños de registro más grandes, como los 32 bits (4 bytes) que usa el MIPS, en lugar de usar un decodificador para los bits de registro, la puerta NAND recibe los 16 bits más significativos y su salida se usa para habilitar un comparador que compara los $16 - p$ bits con una entrada preestablecida que encaja con los mismos bits en la dirección del adaptador. La salida de dicho comparador será $\mathrm{\overline{SEL}_{Interfaz}}$.

De los $p$ bits restantes, que siempre deberán ser más de 3 con tal de que las direcciones de los registros sean múltiples de 4, se cogerán los $p-2$ más significativos y se usará un decodificador igual que en la figura anterior (o, si $p-2=1$ como en la figura siguiente, una simple puerta NOT).

![[Sistema de Entrada y Salida - selección de interfaz con comparador.png]]

### Señales *Byte Enable*

El ejemplo de la figura anterior podría perfectamente corresponder con un dispositivo en MIPS, salvo una pequeña diferencia: Al no gastar $A_{1}$ ni $A_{0}$, sólo se puede trabajar con el tamaño de registro entero, es decir, **se pueden usar words, pero no halves o bytes**, por lo que todos los accesos al adaptador deberán ser a través de $sw$ o $lw$, incluso si se quiere leer un sólo byte.

Para solucionar este problema, las instrucciones tienen valores predefinidos para las señales de control $\mathrm{\overline{BE}}_{0}$, $\mathrm{\overline{BE}}_{1}$, $\mathrm{\overline{BE}}_{2}$ y $\mathrm{\overline{BE}}_{3}$, las llamadas *Byte Enable*, que indican un rango de bytes del registro que se va a leer. Estas, combinadas con la señal de selección del registro usando una puerta NOR con entradas a nivel bajo en los bits que corresponden a las *Byte Enable* que **no** deben estar habilitadas, permiten indicar a cuántos y cuáles bytes del registro se va a acceder.

![[Sistema de Entrada y Salida - Byte enable.png]]