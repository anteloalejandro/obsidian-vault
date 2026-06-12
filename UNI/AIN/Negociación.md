
# Topología

Se pueden categorizar según el número de participantes...
- 1 vs 1, como el regateo o la relación comprador-vendedor.
- 1 vs n, como las subastas
- n vs n, toma de decisiones en equipo

... según el número de atributos...
- Monoatributo
    - Precio
- Multiatributo
    - Negociaciones de servicios: previo, plazo, calidad, ...
    - Viajes: lugar, transporte, alojamiento, precio, extras, ...
    - Laboral: salario, duración, jornada, beneficios, ...

... según el tipo de relación...
- A corto plazo, como una compra puntual
- A largo plazo, como una alianza estratégica
- Ninguna relación, como un mediador entre disputas


... según la intervención de terceros (negociaciones)...
- Negociación mediada
- Negociación no mediada

... y más.

En casa caso habrá que valorar uno de los siguientes tipos de solución, según la topología del problema.
- Distributiva: Que una parte gane valor hace que el resto lo pierda.
- Integrativa: Se busca encontrar una solución win-win.
- Mixta: Se dan ambos casos anteriores.

# Social Choice

El *Social Choice* consiste de un conjunto de actores (personas o agentes) cada uno de los cuales tiene sus propias **preferencias** (objetivos, deseos, creencias, ...). Los actores deberán comunicarse para tomar una decisión conjunta (aka en equipo). Las votaciones son un claro ejemplo de *Social Choice*.

Expresaremos problemas de esta índole mediante la siguiente notación:

- Los **votantes** son un conjunto de agentes $N = \{ 1,\dots, n \}$, y son los actores que expresan sus preferencias.
- Las **opciones**, posibilidades o candidatos $O = \{ o_{1},\dots,o_{m} \}$ son las diferentes cosas de entre las cuales pueden elegir los votantes.
- Tenemos relaciones de preferencia entre las opciones para cada uno de los agentes $a$.
    - Preferencia estricta: $o_{1} \succ_{a} o_{2}$
    - Preferencia débil: $o_{1} \succeq_{a} o_{2}$
    - Indiferencia: $o_{1} \sim_{a} o_{2}$
- $F_{N}$ es la función de *Social Choice* o criterio del ganador.

El problema fundamental de este tipo de problemas es combinar todas las preferencias de todos los agentes para tomar una decisión de grupo que refleje las preferencias todos ellos. Se proponen dos soluciones: **Funciones de Bienestar Social** y **Funciones de Elección Social**.

## Funciones de Bienestar Social

Definimos $\Pi(O)$ como el conjunto de las ordenaciones de las opciones según las preferencias de cada agente, todas agregadas.

Para una agente, una ordenación (miembro de $\Pi(O)$), podría verse así:
$$
\{ o_{1} \succ_{a} o_{2}, o_{2} \succ_{a} o_{3}, \dots \} = \{ o_{1} \succ_{a} o_{2} \succ_{a} o_{3} \succ_{a} \dots \}
$$

La función de bienestar social, entonces, trata de determinar una nueva ordenación a partir de las ordenaciones (miembros de $\Pi(O)$) de cada uno de los $n$ agentes, intentando contentarlos a todos.

$$
F_{N} : \Pi(O) \times \underset{n \text{ veces}}{\dots} \times \Pi(O) \to \Pi(O)
$$

Se usa cuando hay que obtener una lista de opciones ordenadas. Por ejemplo, cuando no sabemos si podemos tomar la que queremos o en problemas en los que hay que obtener un podio de ganadores.

## Funciones de Selección Social

Este tipo de funciones son básicamente iguales que las de bienestar social, pero sólo calculan una opción ideal. Son útiles en votaciones tradicionales, como en las elecciones.

$$
F_{N} : \Pi(O) \times \underset{n \text{ veces}}{\dots} \times \Pi(O) \to O
$$

## Condiciones Condorcet

Una opción $o$ dada es **ganadora Condorcet** si es preferente a todas las demás opciones para una mayoría de agentes. Similarmente, la perdedora Condorcet es aquella que es preferente frente a todas las demás opciones para la menor cantidad de agentes.

Asimismo, $F_{N}$ es ganadora Condorcet si y sólo si la opción que escoge también lo es. Además, cumplirá el Criterio Condorcet Perdedor si excluye a la opción perdedora de entre sus opciones ganadoras. ¿?

Por ejemplo, dadas las siguientes preferencias de 3 agentes...
$$
\begin{align}
a \succ_{1} b \succ_{1} c \\
b \succ_{2} c \succ_{2} a \\
a \succ_{3} c \succ_{3} b \\
\end{align}
$$
- El ganador es $a$, pues es preferente para 2 de los agentes.
- El perdedor es $c$, pues a diferencia de $b$ que es preferible para un agente, $c$ no lo es para ninguno.


> [!NOTE] Paradoja de Condorcet
> Sucede cuando tenemos preferencias en las que no hay ganadores ni perdedores, como la siguiente.
> $$
> \begin{align}
> a \succ_{1} b \succ_{1} c \\
> b \succ_{2} c \succ_{2} a \\
> c \succ_{3} a \succ_{3} b \\
> \end{align}
> $$
> En estos casos, sin importar qué opción elijamos, la mayoría de los votantes estarán disconformes.

## Criterio de Pareto

Este criterio dice que si $\forall a\in Agentes,\,o \succ_{a} o'$, entonces...
- Si $F_{N}$ es Beneficio Social, $o$ debe tener preferencia ante $o'$ (aparecer antes).
- Si $F_{N}$ es Selección Social, $F_{N}(O) \neq o'$, pero no necesariamente se tiene que cumplir que $F_{N}(O) = o$.

# Votaciones

## Comparación por Pares

### Método de Dodgson

Elige al ganador Condorcet. Si no existe elige al más próximo (Ganador de Dodgson), que es aquel para el que se necesite el menor número de cambios en el sistema para convertirlo en ganador Condorcet.

Requiere comprobar todos los ránkings de todos los agentes, y por culpa del cálculo del más próximo se vuelve un problema NP-Hard.

> [!example] Ganador de Dodgson
> En el siguiente ejemplo, no hay ganador de Condorcet.
> $$
> \begin{align}
> \text{5 agentes}: a \succ b \succ c \\
> \text{4 agentes}: b \succ c \succ a \\
> \text{3 agentes}: c \succ a \succ b
> \end{align}
> $$
> Nótese que no importa que 5 agentes prefieran a $a$. En lo que hay que fijarse es:
> - $a \succ b$, porque $a$ gana a $b$ en 8 casos, y pierde en $4$.
> - $b \succ c$, porque $b$ gana a $c$ en 9 casos, y pierde en 3.
> - $c \succ a$ porque $c$ gana a $a$ en 7 casos, y pierde en 5.
> 
> Tenemos una dependencia cíclica, y por tanto ningún ganador de Condorcet.
> 
> Recordemos que $o_{1} \succ o_{2} \succ o_{3}$ es un shorthand de $o_{1} \succ o_{2}, o_{2} \succ o_{3}$, y por tanto un cambio a $n$ posiciones de distancia, implica $n$ cambios.
> 
> Entonces, el cambio mínimo para que cada uno de ellos gane es:
> - $a$ gana a $b$, pero pierde contra $c$ 5 a 7. Cambiar dos agentes cualesquiera que tengan un $c \succ a$ adyacente (que en este caso son todos), hace que $a$ gane a $c$ 7 a 5. Por tanto, $a$ puede ganar con 2 cambios.
> - $b$ gana a $c$, pero pierde contra $a$ 4 a 8. Podemos cambiar 3 agentes cualesquiera que tengan un $a \succ b$ adyacente haciendo que $b$ gane a $a$ 7-5. Por tanto, $b$ necesita 3 pasos para ganar.
> - $c$ gana a $a$, pero pierde 3-9 contra b. Ahora se pueden cambiar 4 de los agentes, del mismo modo, para que $c$ gane.
> 
> ***Por tanto, $a$, que es el que perdía por menos diferencia, es el ganador de Dodgson.***

## Regla de Copeland

El índice de Copeland indica a cuántas opciones "supera" una $o$ dada. $o$  supera a $o'$ si tiene precedencia en más casos.

$$
\begin{gather}
IC(o) = \sum_{\begin{matrix} o' \neq o \\ o \in O \end{matrix}} p(o, o') \\
p(o, o') = \begin{cases}
1& \#(o \succ o') > \#(o' \succ o)\\
0& \text{en otro caso}
\end{cases}
\end{gather}
$$

La regla de Copeland, entonces, busca la opción con mayor índice de Copeland si no se encuentra una ganadora de Condorcet.

$$
\underset{o\in O}{\arg\max}\ IC(o)
$$

Implica un paso completo por las preferencias, a menudo múltiples veces.

## Posicionales

### Pluralidad

En este caso, se escoge la que gane frente a todas las demás opciones para el mayor número de agentes. Es similar a como funcionan las elecciones.

Tiene un posible problema: si tenemos 100 agentes y 3 opciones $O = \{ a,b,c \}$, puede darse el caso de que...
- 40 voten por $a$
- 30 voten por $b$
- 30 voten por $c$

Aquí ganaría $a$ por mayoría, a pesar de que en realidad la mayoría de agentes NO quieren que gane $a$.

Se puede solucionar, por ejemplo, haciendo varias rondas con eliminación.

### Conteo de Borda

A diferencia de la pluralidad, considera el orden de preferencia total. Los votos se ponderan no sólo según cuántos agentes han votado por esa opción, si no también por la posición que le ha dado el agente frente a todas las demás opciones, multiplicando por $0$ la última opción y por $n-1$ la primera.

> [!example] Conteo de Borda vs Pluralidad
> En el siguiente ejemplo, no hay ganador de Condorcet.
> $$
> \begin{align}
> \text{5 agentes}: a \succ b \succ c \\
> \text{4 agentes}: b \succ c \succ a \\
> \text{3 agentes}: a \succ c \succ b
> \end{align}
> $$
> Con **pluralidad**, contaríamos 8 votos para $a$, 4 para $b$ y 0 para $c$, con lo que $a$ ganaría.
> 
> Con Conteo de Borda, contaríamos:
> - $5·2 + 4·0 + 3·2 = 16$ votos para $a$
> - $5 · 1 + 4 · 1 + 3 · 0 = 13$ votos para $b$
> - $5 · 0 + 4 · 1 + 3 · 1 = 7$ votos para $c$

## Posicionales con Comparación

### Pluralidad a dos rondas

Se aplica pluralidad una vez, se elimina al perdedor (por votos) y se vuelve a aplicar pluralidad sin importar que haya un ganador claro o no.

Esto se puede extender trivialmente a $n$ rondas. Puede ser interesante aplicar rondas hasta que sólo queden dos opciones.

### Sistema de Hare

En este caso sólo se aplican rondas extra de pluralidad mientras haya un empate. En cuanto hay una opción con la mayoría de votos (pluralidad) se elige como ganador.

## Basados en Agenda

En estos casos se predefine un orden para los candidatos, por ejemplo $a \to b \to c \to d$ y compiten de dos a dos: Primero $a$ contra $b$, el ganador entre los dos contra $c$, el ganador entre estos dos últimos contra $d$, y así sucesivamente.

## Grafos de mayorías

Son formas visuales de detectar dependencias entre las diferentes opciones. Es especialmente importante para detectar dependencias cíclicas.

![[Negociación - grafos de mayorías.png]]

## Teorema de Arrow

Dada una función de bienestar social $W$, Arrow define como criterios justos y lógicos (según él) como:
- $P(W)$: Debe cumplir el **Criterio de Pareto**
- $IIA(W)$: Debe cumplir la **Independencia de Alternativas Irrelevantes**, es decir, el orden entre dos candidatos debe ser determinado solo por el orden relativo entre los candidatos en cada uno de los agentes.
- $\neg D(W)$: Debe ser **No Dictatorial**, es decir, no existe un sólo agente cuyas preferencias siempre determinen el bienestar social.

El teorema de Arrow, sin embargo, describe que mientras haya más de 3 opciones, se cumpla el criterio de Pareto y la Independencia de Alternativas Irrelevantes, el bienestar social será necesariamente dictatorial.

$$
\lvert O \rvert  > 3 \land P(W) \land \text{IIA}(W) \implies D(W)
$$

En definitiva, según el teorema de Arrow, no existe una forma exacta y justa de representar la voluntad colectiva.

# Subastas

## Subasta Inglesa

Es un tipo de subasta en la que sólo se considera un producto a la vez por su funcionamiento, así que es un problema en el que hay 1 vendedor y n compradores.

1. El vendedor ajusta un precio inicial (mínimo) para el producto
2. Los compradores pujan por él con un valor mayor que el anterior. La puja suele ser pública.
3. Se termina cuando se cumple la condición de terminación establecida.
    - Tiempo límite total
    - No recibir pujas en cierto tiempo
4. El ganador paga lo que pujó (puja máxima).

Cuenta con una estrategia dominante: Pujar con un incremento tan pequeño como se pueda hasta que el resto de agentes alcancen su máximo.


## Subasta Japonesa

Otro ejemplo en el que sólo se considera un producto cada vez.

1. El vendedor da un precio inicial (mínimo) para el producto
2. Los compradores se comprometen públicamente a aceptar el precio. Si no, abandonan la puja para siempre.
3. El vendedor es el que incrementa el precio a su discreción, hasta que sólo queda un comprador.
4. El ganador paga el precio **de la ronda anterior**. El vendedor no le puede poner un precio cuando ya sólo queda él.

La estrategia dominante es **decir la verdad**: Continuar con el proceso siempre que el límite máximo de dinero del agente lo permita.

## Subasta holandesa

De nuevo, sólo se considera un producto cada vez, pero ahora el precio es descendente.
1. El vendedor da un precio inicial (máximo) para el producto.
2. El precio va descendiendo mientras un reloj o temporizador va bajando (baja a cada tick).
3. La subasta termina cuando un comprador acepta la oferta.

***No tiene estrategias dominantes***

Es particularmente usado cuando se quiere vender rápido; la presión que ejerce el sistema sobre los agentes les incentiva a tomar decisiones apresuradas.

## Subasta de sobre cerrado

Esta es, en realidad, una familia de subastas en la que también se considera un sólo producto. Son los únicos que veremos de puja privada.

1. Los compradores pujan un valor al mediador sin saber lo que pujan los demás.
2. Gana el comprador con la puja más alta.

Las variantes difieren en el **precio a pagar**. En la subasta cerrada de primer precio, se paga el precio de la puja más alta, en la de segundo precio, gana el comprador con la puja más alta pero paga el precio de la segunda puja más alta. Se puede extender trivialmente este sistema hasta el $k$-ésimo precio.

La variante de primer precio **no tiene estrategia dominante**, porque pujar por nuestro máximo significaría también perderlo todo, y eso no es estrategia dominante.

Las otras variantes **sí tienen estrategia dominante**, porque pujando nuestro precio máximo maximizamos las posibilidades de ganar pero no influye en lo que nos gastamos. A efectos prácticos, acaba sucediendo lo mismo que con la subasta inglesa o la japonesa: el agente con más dinero paga únicamente la cantidad mínima que no pueden pagar los demás.

## Comparación de subastas

- Si los agentes son ajenos al riesgo, todas son igual de buenas desde el punto de vista del beneficio esperado.
- Las subastas con estrategias dominantes son, por regla general, más baratas computacionalmente, aunque hay que considerar el coste de las comunicaciones.
- Desde el punto de vista del beneficio real, las peores subastas son la holandesa y el sobre cerrado de primer precio, pues incentivan a pagar más al no saber cuánto es lo mínimo que se puede pagar para ganar.

## Problemas con las subastas

- Los compradores pueden colaborar entre sí para afectar al resultado. Son susceptibles la subasta inglesa, japonesa y la de sobre cerrado de segundo precio, al tener estrategia dominante basada en las acciones del resto de pujantes.
- El propio subastador, o un colaborador suyo, puede pujar por el producto para inflar su valor. Si gana sin querer, no pierde ni gana nada, pero si pierde, ha hecho que el ganador pague más de lo que debería.

## Subastas por más de una unidad

Para llevar a cabo subastas en las que se venden múltiples unidades del mismo producto, hay que considerar:
- Si la puja es divisible o no (todo o nada)
- Si es divisible, ¿pagan todos los ganadores lo mismo?
- Si los distintos ganadores pagan lo mismo, ¿pagan la cantidad más alta de entre los ganadores o la más baja?
- ¿Cómo se hacen los desempates? Tiempo, cantidad, precio, etc...

Hay ciertas subastas que ya tienen reglas definidas para esto:
- **Subasta japonesa**: En vez de decir si o no, se dice el número de unidades que se compromete a comprar el agente. La subasta termina cuando la demanda iguala o supera el número de unidades disponibles.
- **Subasta holandesa**: En la subasta holandesa, en vez de decir si compras o no compras al precio actual, se indican cuantas unidades comprarías. Si esa cantidad no es igual a todas las unidades disponibles, continúa.

## Subastas combinatorias

Estas son subastas en las que tenemos $m$ bienes potencialmente distintos a subastas y $n$ agentes pujadores.

Contamos con una función de evaluación para cada agente que indica lo "bueno" que es un conjunto de bienes por el que se puja para él. Se cumple la **libre disposición**, que indica que si a un conjunto le metes más cosas, es mejor. Esto siempre es cierto porque lo "bueno" que es el conjunto no tiene en cuenta el precio que se paga por él, solo el valor que aporta al agente (es decir, cuánto lo quiere).

Una asignación es una lista de subconjuntos de bienes $g_{1},\dots,g_{n}$, uno para cada agente $Ag_{i}$, tal que los subconjuntos para cada agente no se solapen ni se dupliquen. Al conjunto de asignaciones de conjuntos de bienes $G$ a los agentes $Ag$ es $alloc(G, Ag)$.

La asignación se puede hacer tratando de maximizar el bienestar social, calculando la suma de todas las utilidades de cada agente.

$$
F_{N}(g_{1},\dots g_{n}) = \sum_{a \in Ag} u_{a}(g_{a})
$$
Entonces, la subasta combinatoria se puede definir como la asignación que maximice la función $F_{N}$ dadas las funciones de evaluación de cada agente.

$$
g_{1}^{*},\dots g_{n}^{*} =
\underset{
    \large
    \begin{matrix}
        \forall a\in A \\
        g_{a} \in alloc(G, Ag)
    \end{matrix}
}{\arg\max}\
F_{N}(g_{1},\dots,g_{n})
$$