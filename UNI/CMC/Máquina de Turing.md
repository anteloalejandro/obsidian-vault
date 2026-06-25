
# Modelo básico

Primero tenemos una **cinta de entrada** o memoria, compuesta por celdas número potencialmente infinito de celdas, de izquierda a derecha.

En cada celda hay un **símbolo** perteneciente al alfabeto $\Gamma$. El símbolo por defecto es el símbolo vacío o blanco $B$.

También hay un cabezal de lectura-escritura, que **tiene** que llevar a cabo alguna siguientes acciones, **sin quedarse ocioso**:
- Lectura destructiva
- Escritura
- Moverse a la izquierda
- Moverse a la derecha
- ~~Quedarse quieto~~

Tenemos un **control finito** formado por un estado perteneciente a un conjunto finito de estados $Q$, y la función de transición $f$ que determina, paso a paso, la evolución de la computación.

Entre los miembros del conjunto de estados se encuentran un conjunto inicial $q_{0}$ y unos estados finales $F \subseteq Q$.

Además, se define un alfabeto de entrada $\Sigma \subseteq \Gamma - \{ B \}$, de modo que las palabras que pueden ser entrada a la máquina pertenecen a $\Sigma^{*}$.

Las funciones de transición son una función parcial de la forma $f : Q \times \Gamma \to Q \times \Gamma \times \{ L,R \}$, es decir, dados un estado y símbolo del alfabeto de cinta, devuelve un nuevo estado, símbolo y una posición a la que desplazarse, que puede ser $L$ (izquierda) o $R$ (derecha).

Si el estado al que se llega, $p$, dado $f(q, a) = (p,b,D) : q,p\in Q ,\, a,b \in \Gamma,\,D\in \{ L,R \}$, no está definido, el cabezal **no se desplaza** y se mantiene el estado original $q$.

La **instantánea** de la máquina de Turing está formado por la posición del cabezal, en contenido de la cinta, y el estado del control finito. Formalmente:
$$
M = \left( \Sigma, \Gamma, Q, f, B, q_{0}, F \right) 
$$

Añadiremos también, siendo $x \in \Sigma^{*}$, la notación $M(x)\downarrow$ para denotar que la máquina $M$ termina la computación al procesar la palabra $x$, *independientemente de si acepta la palabra o no*. Del mismo modo, $M(x)\uparrow$ para denotar que $M$... 

Podemos expresar la instantánea de la máquina con la siguiente notación, donde $i$ es la posición del cabezal y $n$ el último dígito antes de una secuencia infinita de blancos.
$$
a_{1} a_{2} \dots a_{i-1} \ q \ a_{i}a_{i+1} \dots a_{n}
$$

> [!example] Notación de la instantánea en distintos casos
> **Cabezal dentro de la secuencia de infinita de blancos**
> $a_{1}a_{2} \dots a_{n}BB \dots q$
> 
> **Cabezal en secuencia de blancos, con una palabra al final**
> $a_{1}a_{2}\dots a_{n} B p BB\dots a'$

## Alcanzabilidad

Es la capacidad de llevar de un estado de la máquina de Turing, representado por una instantánea, a otra.

- Directa  $I_{1} \vdash_{M} I_{2}$: Alcanzable en un paso, mediante una sola transición de una $f$ cualquiera.
- Indirecta $I_{1} \vdash^{*}_{M} I_{2}$.
    - Se alcanza aplicando la propiedad transitiva a $\vdash_{M}$.
    - Se puede llegar en 0 pasos a si mismo (propiedad reflexiva), es decir, $I \vdash^{*}_{M} I$.

Por tanto, existe una relación de alcanzabilidad indirecta entre $I_{1}$ e $I_{2}$ si y sólo si son iguales o si hay una $I_{3}$ alcanzable directamente desde $I_{1}$ a partir de la cual se puede alcanzar indirectamente la $I_{2}$. 

$$
I_{1} \vdash^{*}_{M} I_{2} \iff (I_{1}=I_{2}) \lor (\exists I_{3}: I_{1} \vdash_{M} I_{3} \vdash^{*}_{M}I_{2})
$$

Es decir, sabemos que es alcanzable si, a partir del estado inicial, podemos ir llegando a estados siguientes hasta llegar a uno que sea igual al estado final.

## Lenguaje reconocido

Todas aquellas cadenas $x$ del alfabeto de entrada para las cuales se puede llegar desde el estado inicial $q_{0}$ a una instantánea cuyo estado es un estado final (obviamente, el contenido de la cinta debe además estar formado por símbolos del alfabeto de salida). 

$$
L(M) = \{ x \in \Sigma^{*} : q_{0}x \vdash^{*}_{M} \alpha p \beta,\,  p \in F,\,  \alpha,\beta \in \Gamma^{*} \}
$$

Dos máquinas son equivalentes si ambas reconocen el mismo lenguaje.

El estado $p \in F$ podría continuar la ejecución, pero asumiremos que los estados finales también detienen la ejecución. Esto no es problema porque todas las máquinas de Turing en las que se continúa en el estado final existe una máquina equivalente que se detiene en sus estados finales.

Teniendo esto en cuenta, si $q_{0} \in F$, la máquina empieza bloqueada (el cabezal no se mueve) pero podemos seguir metiendo palabras, por lo que $L(M) = \Sigma^{*}$. Hay una máquina equivalente que también acepta $\Sigma^{*}$, así que también diremos que $q_{0}$ no puede ser final porque no necesitamos que lo sea.

# Tipos de lenguajes

$\mathcal{L}_{R} \subset \mathcal{L}_{REN}, \mathcal{L}_{REN} = \mathcal{L}_{0}$

## Lenguajes Recursivamente Enumerables

Son los lenguajes que pueden reconocer las máquinas de Turing. Equivalen al $\mathcal{L}_{0}$ en la jerarquía de Chomsky, que es la clase de los lenguajes que se pueden formar a partir de una $x \in \Sigma^{*}$ usando cualquier regla o conjunto de reglas, sin restricciones.

$$
\mathcal{L}_{REN} = \mathcal{L}_{0}
$$

Al procesar una cadena, una máquina de Turing puede hacer 3 cosas:
- Al procesar $x$ se detiene en un estado final tras un número de transiciones, en cuyo caso **se acepta $\boldsymbol x$**. Esta es el único caso en el que sucede.
  $M(x)↓ \land\ p \in F \iff x \in L(M)$
- Al procesar $x$ se detiene en un estado *no* final tras un número de transiciones, por lo que **no se acepta $\boldsymbol x$**.
  $M(x)↓ \land \ p \not\in F \implies x \not\in L(M)$
- Al procesar $x$ no se detiene en un número finito de pasos, por lo que nunca alcanza en un estado final y **no se acepta $\boldsymbol x$**. 
  $M(x) ↑ \implies x \not\in L(M)$

> [!warning] Reconocer *no* significa aceptar
> Las máquinas de Turing **reconocen** cualquier $x \in \Sigma^{*}$, pero no **aceptan** necesariamente cualquier $x \in \Sigma^{*}$.

Como puede darse el caso de proceso de una cadena no se detenga, se introduce una incertidumbre respecto al resultado al aplicar este tipo de máquinas al mundo real: "¿No se detiene porque no se acepta, o porque no ha encontrado el resultado *todavía*?".

Lo importante aquí es que podemos hacer una máquina de Turing que **acepte** cadenas que pertenezcan a un $L \in \mathcal{L}_{REN}$, pero no podemos hacer una máquina que las rechace.

Además, como no se garantiza la finalización y por tanto puede no tener una salida, el procesado de cadenas no se considera un algoritmo, sino un procedimiento.

## Lenguajes Recursivos

Los lenguajes recursivos son todos aquellos lenguajes recursivamente enumerables para los que, para cualquier cadena de entrada, el procesamiento de dicha cadena siempre se detiene, con o sin aceptación.

$$
\mathcal{L}_{R} \subset \mathcal{L}_{REN}
$$

Además, según la jerarquía de Chomsky son un subconjunto de las gramáticas incontextuales, que a su vez son un subconjunto de las gramáticas contextuales.

$$
\mathcal{L}_{R} = \mathcal{L}_{3} \subset \mathcal{L}_{2} \subset \mathcal{L}_{1} \subset \mathcal{L}_{0}
$$

Por tanto, a diferencia de en las máquinas de Turing que aceptan todos lenguajes de la clase $\mathcal{L}_{REN}$, las que sólo aceptan los $\mathcal{L}_{R}$ sólo contemplan dos posibilidades al procesar una cadena:
- Detenerse y **aceptar**
- Detenerse y **rechazar**

La principal ventaja de estos lenguajes es que podemos hacer una máquina que, dada una cadena de entrada válida, la **acepte o rechace**, en lugar de sólo poder aceptarla.

## Ejemplo

$$
\begin{align}
L(M) &= \{ a^{n}b^{n} : n \geq 1 \} \\
M &= (\{ a,b \}, \{ a,b,X,Y,B \}, \{ q_{0},q_{1},q_{2},q_{3},q_{4} \}, f, B, q_{0}, {q_{4}})
\end{align}
$$


| $f$     | a               | b   | X   | Y               | B   |
| ------- | --------------- | --- | --- | --------------- | --- |
| $q_{0}$ | $(q_{1}, X, R)$ |     |     | $(q_{3}, Y, R)$ |     |

Este algoritmo cambia, en orden, las $a$ por $X$ y las $b$ por $Y$.
- Si hay más $a$ o más $b$, avanza en una dirección hasta que se sale
- Si no son contiguas...

# Funciones computables

Hasta ahora se ha discutido como usar máquinas de Turing para reconocer lenguajes, pero también se puede usar para computar funciones.

> [!info] Como ya no estamos buscando aceptar o rechazar cadenas, $F = \emptyset$.

Por simplicidad, consideraremos funciones parciales (es decir, no definidas para todas las entradas) con diferente número de datos de entrada y de salida, todos ellos números enteros.

$$
\begin{align}
g: \mathbb{N}^{m} &\to \mathbb{N}^{k} \\
g(n_{1},\dots, n_{m}) &= (i_{1},\dots,i_{k})
\end{align}
$$

Las máquinas tendrán como alfabeto de entrada $\Sigma = \{ 0,1 \}$, y codificaremos la entrada de la máquina de la siguiente forma:
- Un número $n$ se codifica mediante $n$ ceros: $n \to 0^{n}$.
- El $1$ sirve como separador de cada número de la tupla de entrada: $(n_{1},\dots n_{m}) \to 0^{n_{1}} 1 \dots 1 0^{n_{m}}$

El alfabeto de salida se codifica igual que el de entrada, aunque la cinta de salida sigue pudiendo tener celdas en blanco.

$$\Gamma = \Sigma + \{ B \} = \{ 0,1, B \}$$

Sin embargo, para que la función codificada por la máquina se considere válida para una entrada, la salida resultante **no debe tener símbolos $B$ intercalados**.

En caso contrario, se considera que la entrada no es válida (indefinida) para empezar. Si que puede tener un número indeterminado de $B$ al principio y al final de la salida, que se obviarán en el resultado final.

La máquina detendrá la computación cuando se quede sin transiciones válidas para el estado actual. A menudo se define un **estado de aceptación** $q_{f}$ que no tiene transiciones.

## Funciones alfabéticas

Aparte de las numéricas, se puede calcular funciones alfabéticas de la forma $g: \Sigma^{*} \to \Delta^{*}$, donde $B \not\in \Sigma,\Delta$, que convierten cadenas de un alfabeto a cadenas equivalentes en otro alfabeto. Es decir, la máquina $M$, que implementa la función $g$, **transduce** cadenas $x \in \Sigma^{*}$ a cadenas $y \in \Delta^{*}$ de acuerdo con la **transducción** $g$.

Las funciones numéricas de la forma $g': \mathbb{N} \to \mathbb{N}$ se pueden considerar también funciones alfabéticas gracias a la codificación en $\{ 0,1 \}$ discutida anteriormente ($\mathbb{N} \equiv \{ 0 \}^{*}$). Del mismo modo, existen funciones alfabéticas de codificación $cod: \Sigma^{*} \to \mathbb{N}$ que convierten palabras en el lenguaje de entrada un número natural, y funciones alfabéticas de decodificación $dec: \mathbb{N} \to \Delta^{*}$ que transforman un número natural en una palabra del alfabeto de salida.

Así, podemos transformar $g(x) = y$ en $dec(g'(cod(x))) = y$ y pasar toda la lógica necesaria para la transformación a la $g'$, que sólo trabaja con números, siempre y cuando la codificación y decodificación también se implementen correctamente.

De este modo, podemos asumir que no se pierde generalidad ni funcionalidad al trabajar solamente con funciones numéricas.

## Funciones características

Como se ha mencionado en las funciones alfabéticas, a todo lenguaje $L \subseteq \Sigma^{*}$ se le pueden asociar funciones parciales de la forma $f:\Sigma^{*} \to \{ 0 \}^{*}$.

En las funciones características dicha función, llamada $\eta_{L,\Sigma}$ en lugar de $f$, se cumple que el lenguaje está formado exclusivamente por aquellas cadenas que dan como resultado $\lambda$.

$$
L = \{ x \in \Sigma^{*} : \eta_{L, \Sigma}(x) = \lambda \}
$$

Es decir, $\eta$ es una función característica que representa el lenguaje, aceptando sólo aquellas palabras que devuelven $\lambda$ al usarlas como entrada.

Por tanto, podemos decir que $L$ es recursivamente enumerable si y sólo si existe una función $\eta_{L,\Sigma}$ que sea computable.

$$
L \in \mathcal{L}_{REN} \iff \exists \eta_{L,\Sigma} \text{ turing-computable}
$$

También podemos trabajar con funciones *totales* $\varphi_{L,\Sigma} : \Sigma^{*} \to \{ 0 \}^{*}$ de forma que:
- $x \in L \implies \varphi_{L,\Sigma} = \lambda$
- $x \not\in L \implies \varphi_{L, \Sigma} \in \{ 0 \}^{+}$

Al ser totales, podemos relacionar estas funciones con los lenguajes recursivos, en vez de con $\mathcal{L}_{REN}$. Concretamente, diremos que el lenguaje es recursivo sólo si hay alguna de estas funciones que sea computable, y que si no es recursivo no hay ninguna.
$$
\begin{align}
L \in \mathcal{L}_{R} &\iff \exists \varphi_{L,\Sigma} \text{ turing-computable} \\
L \in \mathcal{L}_{REN} - \mathcal{L}_{R} &\implies \not\exists \varphi_{L,\Sigma} \text{ turing-computable}
\end{align}
$$

# Construcción de Máquinas de Turing

Son procedimientos de alto nivel para facilitar la definición de máquinas complejas sin alterar el modelo subyacente.

## Parametrización de estados

Consiste en representar los estados posibles mediante tuplas de $n$ parámetros, de forma que cada estado está representado por una tupla diferente.

$$
\begin{gather}
M = (\Sigma, \Gamma, Q, f, B, q_{0}, F)\\
Q \subseteq \{
   [p_{1},p_{2},\dots,p_{n}]: p_{i} \in \mathcal{P}_{i},\,
   i = 1,\dots,n
\}
\end{gather}
$$

Esto es útil cuando queremos estados complejos que incluyan, por ejemplo, los caracteres que se están leyendo. 

> [!example] Ejemplo: *Técnica de Almacenamiento*
> Sabemos que los estados de normal tienen la forma $q \in Q$, por lo que las funciones de transición $f$ son $f : Q \times \Gamma \to Q \times \Gamma \times \{ L,R \}$.
> 
> Podríamos cambiar la $Q$ por $Q' = Q \times \Gamma \times \Gamma$, de modo que los estados ahora podrían almacenar caracteres y considerarse estados distintos.
> 
> Dados $A,B,C \in \Gamma$ cualesquiera y $q,p \in Q$, se puede ahora definir, por ejemplo, la transición $f([q, A, B], C) = ([p,B,C], C, R)$, de modo que al encontrar el símbolo $C$ en la cinta, estando en el estado $[q,A,B]$, cambiamos al estado $[p,B,C]$ avanzando a la derecha dejando el símbolo $C$ intacto.
> 
> El comportamiento de esta función de transición es el de una cola buffer de tamaño 2, que expulsa la $A$ y mete la $C$, sin sobrescribir nada manteniendo en el estado los 2 últimos símbolos visitados.
> 
> A partir de aquí se pueden hacer modificaciones para cambiar lo que hacemos (en lugar de no sobrescribir $C$) en función de los 2 últimos caracteres leídos y/o el valor del carácter actual. También se puede extender para mantener los últimos $n$ caracteres leídos.

## Cinta con varias bandas o sectores

Esta técnica consiste en considerar que la banda se divide horizontalmente en $n$ sectores/bandas, de modo que cada celdilla está compuesta de $n$ subceldillas, cada una correspondiente a un sector.

Cada sector puede tener un alfabeto diferente, $\Gamma_{i}$, pero todos contienen el símbolo $B$. El alfabeto de la cinta "real" estará, por tanto, compuesto de todos los distintos alfabetos de cada uno de los sectores.

$$
\Gamma = \Gamma_{1} \times \dots  \times \Gamma_{n}
$$

Del mismo modo, se considera que una celdilla está en blanco cuando todas sus subceldillas también lo están. Por tanto, en la definición de la máquina $M$, se cambia el símbolo blanco por $\mathcal{B} = [B,..,B]$.

![[Máquina de Turing - cinta con sectores.png]]

Siempre fijaremos un sector concreto como el **sector de entrada**, que como el nombre indica es el que recibe la palabra de entrada. Así, siendo el $i$-ésimo sector el sector de entrada, el alfabeto de entrada queda como $\Sigma = \{ [B,\dots,a_{i},\dots,B]:a_{i} \in \Sigma_{i} \}$, siendo cada $\Sigma_{i} = \Gamma_{i} - \{ \mathcal{B} \}$.

> [!example] Ejemplo
> Podríamos tener un sector de entrada en el que se procesasen los datos, con un sector extra para llevar el registro de los caracteres cambiados, para los que marcaríamos su posición correspondiente en la cinta extra con un `~`.
> 
> Así, podríamos definir una función de transición que conviNOTErtiese, por ejemplo, el símbolo $a$ en $b$ y registrase el cambio en la cinta extra.
> 
> $$
> f(q, [a, B]) = (p, [b, \sim ], R)
> $$
> 
> ![[Máquina de Turing - ejemplo varios sectores.png]]

Nótese que a menudo se junta esta técnica con la parametrización de estados para llevar mejor cuenta de con qué sector se quiere operar en cada momento.

## Desplazamiento del contenido

Permite trasladar el contenido de una cinta un número predeterminado $k$ de posiciones hacia la derecha.

Supongamos que en el instante actual tenemos en la cinta una palabra $\alpha \in (\Sigma - X)^{*}$ seguida del relleno con símbolos blancos, siendo $X$ el símbolo de relleno (que puede ser $B$ o no).

Si dividimos el contenido de la cinta en $\alpha = \alpha_{1}\alpha_{2}, \alpha_{1} \neq \lambda$, buscaremos transformar el contenido de la cinta en $a_{1}X^{k}a_{2}$, desplazando el sufijo $a_{2}$ en $k$ posiciones, insertando la palabra de relleno $X^{k}$ antes de él.

Para conseguir esto, tendremos que cambiar la $Q$ (aplicando parametrización de estados) por un estado de la forma $[q,a_{1},\dots,a_{k}],\, a_{i} \in \Sigma$. Por ejemplo, para $k=2$:
- El estado inicial del desplazamiento es $[q,X,X]$, de forma que el cabezal esté en la posición de inicio de $\alpha_{2}$. La $q$ es nuestro estado de "continuación".
- El estado final del desplazamiento es $[p, B,B]$, de forma que el cabezal esté en el último símbolo de $X^{k}$, o sea, desplazado $k$ posiciones respecto al inicio del procedimiento. La $p$ es nuestro estado de "parada".
- Se definen en la función de transición de la máquina las transiciones necesarias para aplicar el desplazamiento:
    - $f([q,A_{1},A_{2}], A) = ([q,A_{2},A], A_{1}, R)$ para $A_{1} \neq B \neq A_{2}$ y un $A \in \Gamma$ cualquiera.
        - Al encontrar símbolo $A$, se inserta en la cola del estado, se escribe el estado expulsado de la cola y se desplaza a la derecha, manteniendo el estado $q$ (de continuación).
    - $f([q,A_{1},B],B) = ([p,B,B], A_{1},L)$ para $A_{1} \neq B$.
        - Si nos encontramos, específicamente, símbolo blanco $B$ y ya hemos tenemos uno en la cola, hacemos lo mismo que la transición anterior, pero además cambiamos al estado $p$ (de parada).
    - $f([p,B,B],A) = ([p,B,B],A,L)$ para $A \neq X$.
        - Cuando se alcanza el estado de parada del desplazamiento, se retrocede en la cadena insertada hasta poner el cabezal en la última $X$.
- La máquina seguirá operando a partir de este punto de acuerdo al resto de transiciones. Se tendrá que tener en cuenta que el lo que lee actualmente el cabezal es, específicamente, la última $X$, no el símbolo siguiente.

Así, como el estado que inicia el desplazamiento es $[q,X,X]$, se insertan dos $X$ en la cinta guardando los 2 símbolos borrados, y se avanza por el resto de la cinta escribiendo los símbolos que vamos sacando del buffer y guardando en el buffer los símbolos que vamos sobreescribiendo. Se continua así hasta que se alcanzan 2 blancos, en cuyo caso se retrocede hasta la última $X$ escrita.

Para soportar un número arbitrario (pero aún predefinido) de $k$ simplemente se tienen que extender esto para usar tuplas de tamaño de $k$ deseado.

# Modificaciones de las Máquinas de Turing

## Cinta infinita en ambos sentidos

Es igual que la máquina de Turing clásica, pero esta es infinita en ambos sentidos. Esto tiene la implicación de que la ejecución no se puede detener por retroceder en la primera celdilla.

Para acomodar este sistema, se considera como inicio de la entrada la primera celdilla que no es un $B$, asumiendo que $x \neq \lambda$. Para describir las instantáneas, sólo se consideran los símbolos que van desde el primer no-blanco hasta el último no-blanco.

Trivialmente, cualquier lenguaje aceptado por una máquina tradicional también es aceptado por una máquina con cinta infinita en ambos sentidos, ya que se puede establecer como inicio de cinta una celdilla cualquiera precedida por una celdilla preestablecida con un símbolo especial, sea $\not C$, antes de iniciar la simulación de movimientos/transiciones.

Del mismo modo, cualquier lenguaje aceptado por una máquina de este tipo también es aceptado por una máquina tradicional con varios sectores, ya que que se puede considerar el primer sector como la parte "derecha" del ejemplo anterior y el segundo sector como la parte izquierda *invertida*, comenzando con el símbolo de inicio $\not C$.

Así, avanzar el cabezal hacia delante por la cinta implica avanzar por el lado derecho o retroceder por el izquierdo. Sin embargo, sólo con esto no se simula bien la cinta infinita por ambos sentidos porque *no sabemos si estamos en el lado derecho o izquierdo* de la cinta. Para arreglar esto se cambia, con parametrización de estados, el estado de la máquina tradicional por uno de la forma $Q': Q \times \{ u,d \}$, de modo que cada nuevo estado es una tupla con un estado normal y un símbolo que indica si estamos en la cinta superior (lado derecho) o inferior (lado izquierdo), respectivamente.

![[Máquina de Turing - cinta en ambos sentidos.png]]

## Máquinas multicinta

Esta modificación implica que cada máquina depende de un número $k$ fijo de cintas independientes en ambos sentidos, cada una de ellas cabezales independientes pero compartiendo un control finito (estado).

En cada parte del proceso se leen los símbolos a los que apunta cada cabezal simultáneamente, y se elige una transición en base a dichos símbolos y el estado del control finito. Cada cinta puede escribir y moverse de forma independiente. De hecho, en este modelo permitimos que algunos de los cabezales se queden inmóviles. Teniendo todo esto en cuenta, la función de transición tiene la forma:

$$
\begin{align}
f: Q \times \Gamma \times \dots \times \Gamma &\to Q \times \Gamma \times \dots \times \Gamma \times M \times \dots \times M \\
f(q, X_{1}, \dots, X_{k}) &= (p,\,  Y_{1},\dots Y_{k},\,  m_{1},\dots,m_{k}) \\
m_{i} &\in M = \{ L,R, \lambda \} \\
X_{i},Y_{i} &\in \Gamma
\end{align}
$$

![[Máquina de Turing - multicinta.png]]

Evidentemente, todos los lenguajes que acepta la máquina tradicional también los acepta está máquina, que simplemente es un caso más general de la de cinta infinita en ambos sentidos.

Demostrar lo contrario es más complicado. Primero, obviemos el límite de la cinta por la izquierda. Es decir, lo modelaremos con una cinta infinita por ambos lados. Esto no implica ninguna pérdida se generalidad ya que sabemos que son equivalentes.

Para simular este clase de máquina utilizaremos una con una sola cinta y múltiples sectores. Concretamente, por cada cinta de la máquina multicinta tendremos 2 sectores: uno con el contenido y uno justo después con la posición simulada del cabezal, que se guardará usando un símbolo especial `~` en la misma posición en la que estaría dicho cabezal. Así, tendremos $2k$ sectores en nuestra máquina de una cinta.

![[Máquina de Turing - simulación multicinta.png]]

El cabezal real de la máquina se sitúa primero en aquella marca que esté más a la izquierda y va avanzando hacia la derecha hasta que recoge todas las marcas. Conforme va recogiendo marcas, se guarda en el control finito (además del estado) los símbolos leídos en el sector con el contenido correspondiente a cada marca usando parametrización de estados.

Con todos los símbolos para cada cinta recogidos, ejecuta un paso de la simulación aplicando todos los cambios uno a uno, y repite el proceso en el siguiente paso. Por tanto, realizar $n$ movimientos de la máquina multicinta implica realizar $n^{2}$ pasos de la máquina simuladora, lo cual es muy ineficiente temporalmente.

Si finalmente quisiéramos hacerlo con una máquina completamente estándar en vez de con la infinita por ambos lados, tendríamos que duplicar el número de sectores: Por cada sector infinito por ambos lados haría falta un sector estándar.

## Máquinas indeterministas

Esta clase de máquinas son equivalentes con el modelo tradicional (o con el modelo infinito en ambos sentidos) en todo menos en una cosa: La función de transición devuelve múltiples tuplas posibles.

$$
f: Q \times \Gamma \to \mathcal{P}(Q \times \Gamma \times \{ L,R \})
$$

$\mathcal{P}(A)$ es el conjunto potencia o las particiones de $A$, es decir, es el conjunto de todos los subconjuntos formados por elementos de $A$. Recordemos que el resultado de $f(q,a)$ es un *miembro* de las particiones, es decir, un subconjunto de elementos formados por $Q \times \Gamma \times \{ L,R \}$, o sea, un **subconjunto de transiciones**. De esta forma, y sabiendo que el número de elementos de los subconjuntos de nuestras transiciones es finito:
- $f(q,a) = \emptyset$ si no hay transiciones a escoger.
- $f(q,a) = \{ (q_{i}, b_{i}, m_{i}) : i = 1,\dots,n_{q,a} \}$, siendo $n_{q,a}$ el número de transiciones posibles para unos valores de $q,a$ dados.

La máquina, en cada paso de la ejecución, tendrá que elegir entre una de las transiciones de forma no determinista; no podemos ejecutarlas todas a la vez. Sin embargo, todas las transiciones (escogidas o no) a las que se puede llegar desde una instantánea tienen una relación de alcanzabilidad directa con ésta.

$$
I \vdash I_{k} \quad k = 1,\dots,n_{q,a}
$$

Por tanto, para cada entrada dada, en lugar de que una ejecución sea una secuencia de pasos, se convierte en un árbol (grafo dirigido acíclico) en la que cada instantánea se ramifica en múltiples otras, y tenemos tantas secuencias posibles como caminos que lleven de la raíz a las hojas.

![[Máquina de Turing - máquina indeterminista.png]]

> [!info] Llamamos *grado de indeterminismo* al valor máximo de $n_{q,a}$.

### Lenguaje aceptado por la máquina indeterminista

Se define prácticamente igual que en la máquina tradicional, $L(M) = \{ x \in \Sigma^{*} : q_{0}x \vdash^{*}_{M} \alpha p \beta, p \in F \}$. En este caso esto implica que el lenguaje está formado por aquellas palabras que lleguen a **algún camino** que termine en aceptación (detenerse + llegar a estado final).

Sin embargo, tenemos aún más complicaciones a la hora de implementar este tipo de máquinas que con las tradicionales que aceptan $\mathcal{L}_{REN}$:
- Podemos encontrar caminos que rechacen o acepten, así que tenemos que explorar exhaustivamente el árbol aunque fallemos todo el tiempo por si algún camino terminase en aceptación.
- Podemos encontrar caminos que nunca finalicen su ejecución, lo cual es particularmente peliagudo por lo que se menciona en el punto anterior.

Evidentemente, como las máquinas deterministas son un caso específico de las indeterministas, pero con grado de indeterminismo de $1$, si una máquina determinista acepta un lenguaje, también lo puede hacer una indeterminista.

De nuevo, demostrar que si el lenguaje pertenece a una máquina indeterminista también pertenece a uno determinista es más complicado.

Consideremos primero que el grado de indeterminismo de una máquina $M$ es $r$. Llevaremos a cabo *secuencias de computación* de longitud $p$ con tal de evitar ejecuciones infinitas. La búsqueda sigue teniendo que ser exhaustiva (DFS), pero sólo hasta el nivel de profundidad $p$ indicado. La longitud de estas secuencias irá aumentando hasta que encontremos algún camino que resulte en aceptación tras probar todas las de la longitud dada.

Lo importante aquí es que, siguiendo este método, podemos establecer un orden canónico:
- Primero las secuencias de menor $p$.
- Si tienen el mismo $p$, aplicar el orden canónico al índice del estado asociado a la secuencia:
    - $f(q,a) = \{ (q_{i}, b_{i}, m_{i}): i = 1,\dots,n_{q,a} \}$
    - Las secuencias de computación son secuencias instantáneas, que vienen dadas por la aplicación de una transición de posible de $f(q,a)$.
    - Al estar numeradas por $i = 1,\dots,n_{q,a}$ las transiciones posibles de un $f(q,a)$, podemos establecer un orden canónico.
    - Ejemplo con $q=2,r=3$:
        1. Elijo la primera transición, y en el siguiente paso, la primera: $1,1$
        2. Elijo la primera transición, y en el siguiente paso, la segunda: $1,2$
        3. Elijo la primera transición, y en el siguiente paso, la tercera: $1,3$
        4. Elijo la segunda transición, y en el siguiente paso, la primera: $2,1$
        5. ...
    - Nótese que en cada paso podemos tener un número diferente de transiciones posibles $n_{q,a} \leq r$.

Diremos que una secuencia de computación $i_{1},\dots,i_{p}$ es plausible si se puede puede aplicar $i_{j}$ en el $j$-ésimo paso de ejecución a partir de la configuración inicial $q_{0}x$.

Para la simulación usaremos una máquina multicinta sin pérdida de generalidad, ya que sabemos que se puede traducir a una máquina tradicional. Tendremos la siguiente estructura:
- Una cinta de entrada en la que se mete la entrada $x$.
- Una cinta en la que se generan secuencias de computación en orden canónico, donde cada una de las celdas puede tener uno de $r$ valores posibles esto define nuestro lenguaje de entrada/salida para esta cinta.
- Una cinta de trabajo en la que se lleva a cabo la simulación de la secuencia.

Y el algoritmo de simulación es el siguiente:
1. Meter la cadena de entrada $x$ en la cinta de trabajo.
2. Generar una nueva secuencia de computación en orden canónico.
3. Aplicar los movimientos de la secuencia de computación a la cinta de trabajo.
4. Si se ha llegado a un estado de aceptación, finaliza. Si no, vuelve al paso 2.

Este algoritmo se traduce en pasar por hasta $r^{i}$ configuraciones para encontrar la solución óptima ubicada en una profundidad de $i$.

# Generadores de Turing

Otro uso de las máquinas de Turing, además de aceptar lenguajes y computar funciones, es generar lenguajes.

Para generar lenguajes se utilizará una máquina multicinta *sin* cinta de entrada, designando una de las cintas como cinta de salida. El cabezal de la cinta de salida sólo puede avanzar hacia la derecha, y sólo avanza si se escribe un símbolo distinto a al blanco $B$.

La cinta de salida tiene sus propios alfabetos de entrada $\Sigma_{S}$ y salida $\Gamma_{S}$, teniendo este último un símbolo extra (además del $B$) de separación, $\#$. $\Sigma_{S} = \Gamma_{S} - \{ B, \# \}$.

Como no estamos buscando aceptar ningún lenguaje, $F = \emptyset$. Además, todas las cintas deben empezar completamente llenas de blancos.

El lenguaje generado por la máquina generadora $M$ se define como el conjunto de todas aquellas palabras $x \in \Sigma_{S}^{*}$ para las que $\#x\#$ aparece en la cinta de salida en algún momento. 

$$
L = G(M) \equiv \#x_{1}\#x_{2}\#\dots
$$

Nótese que una palabra puede aparecer más de una vez en la salida, con que aparezca una vez es suficiente. Esto puede ser problemático a la hora de demostrar si una palabra es generada o no (podríamos encontrarnos generando infinitamente la misma palabra). Por tanto, queremos encontrar un $M'$ que genere las mismas palabras que $M$, pero una sola vez cada una de ellas.

La forma más sencilla de implementarlo es copiando la estructura de $M$ pero añadiendo una cinta más, que será la nueva cinta de salida. En la vieja cinta de salida se levanta la restricción de moverse para atrás, de modo que podemos copiar las palabras de la salida de $M$ a la de $M'$ comprobando antes si no se han repetido en la salida de $M$.

## Caracterización de los lenguajes recursivamente enumerables

Las máquinas de Turing aceptan (o no) lenguajes $L \in \mathcal{L}_{REN}$. Por tanto, si no existe una máquina que acepte un determinado lenguaje, dicho lenguaje no es recursivamente enumerable. Entonces, buscaremos relacionar las máquinas generadoras y las máquinas aceptoras de forma que si existe una debe existir la otra. Si conseguimos demostrar esto, podremos asegurar que $L \in \mathcal{L}_{REN}$ si existe cualquiera de los tipos de máquinas.

Supongamos una máquina aceptora $M$ cuyo lenguaje aceptado es $L(M) \in \mathcal{L}_{REN}$ y una máquina generadora $M'$ de forma que $G(M') = L(M) \subseteq \Sigma^{*}$.

Si ya tenemos la $M$ construida, se podríamos construir la $M'$ a partir de ella de la siguiente forma:
- Creamos un generador de palabras de $\Sigma^{*}$ en orden canónico.
- La salida del generador en orden canónico se usa como entrada para la $M$.
- La salida de la $M$ serán todas las palabras posibles que acepta $M$, escritas una sola vez, y en orden. Por tanto, la salida de $M$ será la de $M'$.

Esta aproximación tiene el problema de que podríamos llegar (de hecho, si $L \in \mathcal{L}_{REN} - \mathcal{L}_{R}$, en algún punto llegaríamos sí o sí) a una palabra en la que $M(x)↑$.

La solución radica en:
- Usar un generador de pares $(i,j)$ ordenados de números naturales, que generará un nuevo par en cada paso de la simulación.
- Modificar el generador en orden canónico para que solo suelte la $i$-ésima palabra (dada por el par $i,j$).
- Modificar la $M$ para que sólo pueda llevar a cabo $j$ movimientos, que recibirá como parámetro del generador de pares. Si se pasa, no acepta la palabra, por lo que sabemos que ahora $M$ siempre se detiene, por lo que la $M$ con $j$ ahora acepta un lenguaje $\mathcal{L}_{R}$.
- Cada palabra que acepte $M$ en $j$ movimientos formará parte de la salida de $M'$, pero independientemente de si se acepta o no, se volverá a generar un par y se repetirá el proceso.

![[Máquina de Turing - Generador REN.png]]

> [!NOTE] Generador de Pares
> Genera pares de la forma `#(1,1)#(2,1)#(1,2)#(3,1)#(2,2)#(1,3)#...` que no se repiten.
> ![[Máquina de Turing - generador de pares.png]]

Con esto tenemos demostrado que para cualquier aceptor $M$, podemos crear un generador $M'$. Ahora resta demostrar lo contrario: para un generador $M$, debemos poder crear un aceptor $M$ de forma que $L(M) = G(M')$.

Esto es más sencillo aún, pues sólo es necesaria una máquina de Turing que compare si dos cadenas son iguales. Una vez creada, la entrada de $M$ se pasa dicha máquina, junto a una $x_{i}$ generada por $M'$ cada vez.

Si y sólo si el comparador dice que son iguales, entonces la palabra forma parte $L(M)$. Si el comparador dice que son diferentes, se genera una nueva palabra y se vuelve a intentar. Así, $M$ podrá aceptar sólo las palabras que $M'$ puede generar, y acepta todas las que se pueden generar, así que $L(M) = G(M)$.

![[Máquina de Turing - Aceptor REN.png]]

## Caracterización de los lenguajes recursivos

Para demostrar ahora que se un lenguaje es recursivo si y solo si hay un generador de Turing que enumere sus palabras, debemos ser más estrictos.
- Las palabras generadas deben estar en orden canónico
- Debemos demostrar que se puede hacer un generador $M'$ en orden canónico de cualquier lenguaje $L \in \mathcal{L}_{R}$ aceptado por una máquina de Turing $M$.
- Debemos demostrar que si un generador $M'$ devuelve las palabras del lenguaje en orden canónico, existe una máquina Turing $M$ que siempre acepta el lenguaje y siempre finaliza (por tanto, el lenguaje aceptado es $\mathcal{L}_{R}$).

Crear un generador a partir de una máquina de Turing que sólo acepta $\mathcal{L}_{R}$ es sencillo:
- Se usa un generador de palabras en orden canónico.
- La salida del generador en orden canónico se usa como entrada del aceptor $M$.
- Como $M$ tiene señal de aceptación y rechazo, todas las palabras aceptadas (que ya estarán en o.c.) forman parte de la salida.
- Se acepte o se rechace, se vuelve a generar una nueva palabra en o.c.

![[Máquina de Turing - Generador Recursivo.png]]

Para crear el aceptor a partir del generador, no sólo volveremos a necesitar el la máquina comparadora de igualdad, sino también una comparadora de orden canónico.

La comparadora de o.c. se usa para saber cuando ya no tiene sentido generar más palabras, pues si la palabra generada es mayor que la entrada, sabemos que todas las siguientes palabras generadas también lo serán, y por tanto ya no existe la posibilidad de que $x \in G(M')$.

![[Máquina de Turing - Aceptor Recursivo.png]]

Con esto queda demostrado el teorema.

# Propiedades de los $\mathcal{L}_{REN}$ y $\mathcal{L}_{R}$

## Los $L \in \mathcal{L}_{R}$ son cerrados para el complemento

-  El complemento de un lenguaje son todas aquellas palabras formadas con símbolos del mismo alfabeto que NO forman parte de él.
- "Cerrado" quiere decir que el complemento sigue perteneciendo a la misma clase:  $L, \overline{L} \in \mathcal{L}_{R}$.

Podemos, a partir de una máquina Turing que acepte el lenguaje $L(M) \in \mathcal{L}_{R}$ y, por tanto, siempre se detenga, una máquina Turing $M'$ que use como salida de aceptación la de rechazo de $M$, y como salida de rechazo la de aceptación de $M$.

## Los $L \in \mathcal{L}_{REN} - \mathcal{L}_{R}$ *no* son cerrados para el complemento

Asumimos un $L \in \mathcal{L}_{REN}$, por lo que existe una máquina de Turing $M$ que lo acepta, pero puede no detenerse.

Para que $\overline{L}$ fuese cerrado en este caso, tendría que existir una máquina $M'$ que aceptase las palabras que *no* forman parte de $L$, y por tanto se detuviese ante ellas. En ese caso, podríamos formar una máquina $M''$ que aceptase las palabras que forman el lenguaje usando la $M$ como señal de aceptación y rechazase *deteniéndose* las palabras que no forman parte del lenguaje usando $M'$ como señal de rechazo.

![[Máquina de Turing - complemento de REN.png]]

Por tanto, si $L,\overline{L} \in \mathcal{L}_{REN}$ hemos encontrado una máquina $M''$ que acepta el lenguaje y siempre se detiene, lo que implica que $L$ y, por consiguiente, $\overline{L}$, son necesariamente **recursivos**.

## Los $L \in L_{R}$ son cerrados para la unión y la intersección

Dados los lenguajes $L(M)$ y $L'(M')$, podemos construir una máquina $M''$ que forme la unión de ambos lenguajes $L''(M'') = L \cup L'$ y siempre se detenga.

- Si $x$ es aceptado por $M$, es aceptado por $M''$.
- Si $x$ no es aceptado por $M$...
    - ... pero sí por $M'$, es aceptado por $M''$
    - ... y tampoco por $M'$, es rechazado por $M''$

![[Máquina de Turing - unión recursivos.png]]

De forma análoga, podemos hacer un $M''$ que forme la intersección de ambos lenguajes y siempre se detenga.

- Si $x$ es aceptado por $M$...
    - ... y también por $M'$, es aceptado por $M''$
    - ... pero no por $M'$, es rechazado por $M''$
- Si $x$ es rechazado por $M$, es rechazado por $M''$.

![[Máquina de Turing - intersección recursivos.png]]

## Todos los $L \in \mathcal{L}_{REN}$ también son cerrados para la unión e intersección

Como aquí no necesitamos la señal de rechazo tampoco en la unión, podemos atar dos máquinas $M,M'$ obviando las señales de rechazo.

Para la unión, podemos conectar ambas salidas como salida de $M''$ a la vez, en paralelo. Si una de las dos se detiene, la otra seguirá mandando señal, y consideramos que no hay conflicto si ninguna se detiene.

![[Máquina de Turing - unión REN.png]]

Para la intersección tenemos que hacer que $M'$ sólo se active cuando $M$ acepte el lenguaje, y en este caso la salida de $M''$ es la salida de $M'$. La $x$ sigue yendo a ambas máquinas a la vez.

![[Máquina de Turing - intersección REN.png]]

## Más proposiciones

- Los $L \in \mathcal{L}_{R}$ también son cerrados para la concatenación clausura $L^{*}$, clausura positiva $L^{+}$ y reverso $L^{r}$.
- También lo el resto de $L \in \mathcal{L}_{REN}$.
- Los $L \in \mathcal{L}_{R}$ sólo son cerrados para los homomorfismos $h: \Delta^{*} \to \Gamma^{*}$ (codificación) para los que $h(a) \neq \lambda,\,\forall a \in \Delta^{*}$.
- Los $L \in \mathcal{L}_{R}$ sí son cerrados para los homomorfismos inversos $h^{-1}: \Gamma^{*} \to \Delta^{*}$ (decodificación).
- Los $L \in \mathcal{L}_{REN} - \mathcal{L}_{R}$ son cerrados para los homomorfismos y homomorfismos inversos.