
#  Sistemas basados en reglas

Son una secuencia de reglas (precondiciones) similares a la que seguiría una persona con tal de dar un resultado o predicción similar al que daría una persona.

Se divide en tres capas:
- Base de Reglas: Información procedural: relaciones que sabemos entre hechos que se dan lugar a nuevos hechos de forma **dinámica**.
- Base de Hechos: Información declarativa: cosas básicas y **estáticas** que sabemos de antemano.
- Motor de inferencia: Gobierna las bases de reglas y hechos. Va ejecutando reglas en base a los hechos conocidos. Normalmente, ya está programado y no se modifica.

Has dos formas en las que pueden funcionar los motores de inferencia:
- Encadenamiento hacia delante: *¿Qué reglas puede aplicar a este hecho, y qué resultado da?*
- Encadenamiento hacia atrás: *¿Qué me hace falta para cumplir esta regla?*

Los SBR resuelven problemas usando reglas en lugar de algoritmo, es decir, el usuario no describe paso a paso como resolver un problema, sino que declara hechos y reglas, y deja que el motor de inferencia resuelva el problema.

Las reglas están formadas por una **premisa o precondición**, seguidas de una **conclusión o acción**, a los que de forma genérica también se les llama antecedente y consecuente, o LHS y RHS.

Sólo cuando el patrón de la premisa de una regla coincide (mediante *pattern-matching*) con un hecho existente en la base de datos, se ejecuta la acción asociada. En caso de que se puedan aplicar varias reglas o la misma regla a distintos datos, el motor de inferencia elegirá cuál se lleva a cabo.

Entre las acciones que se pueden realizar se encuentran **añadir y borrar hechos**, consultas al usuario y llamadas (`print`, `read`, etc).

# CLIPS

## Hechos

Los hechos están formados de un **símbolo** y una lista (con cero o más elementos) de **constantes**.

```
<fact> ::= (<symbol> <constant>*)
<constant> ::= <symbol> | <string> | <integer> | <float> | <instance-name>
```

Por ejemplo:

```
// Una persona con pares atributo-valor, donde...
// - nombre: string
// - edad: integer
// - trabajo: símbolo
(persona nombre "John" edad 24 trabajo periodista)

// lista de "jarras" con identificador y atributos
(jarras_agua jarra X contiene 0 capacidad 4 jarra Y contiene 1 capacidad 3)
// alternativamente...
(jarra_agua X contiene 0 capacidad 4)
(jarra_agua Y contiene 1 capacidad 3)

// n puzle
(n-puzle 1 2 3 4 5 6 7 8 0)
```

Se pueden insertar los hechos inciales para la base de hechos usando `deffacts`:

```
(deffacts bloques_Rep1
    (torre max altura 3)
    (bloque torre 1 A B C torre 2 E D grua nada)
)

(deffacts bloques_Rep2
    ...
)
```

*Nótese que cada uso de `deffacts` ha de tener un nombre único.*

En la base de hechos cada hecho individual (no cada bloque `deffacts`) tendrá su propio identificador asignado automáticamente por el motor de inferencia.
## Reglas

```
(defrule <nombre> ["comentario"]
    (<patron>)+
    (test <test>)*
    =>
    (<patron>)+
)
```

CLIPS extiende las capacidades de las reglas mediante `test`. Los tests son expresiones condicionales que se pueden añadir al LHS que sólo se evaluarán si hay coincidencia de patrón, y al evaluar a `false` impedirán que se ejecute la acción.

Los test van en notación polaca (prefijo): `<test> ::= (<op> <arg> <arg>)`

Los patrones ahora pueden incluir, además de constantes, **variables** de distintos tipos.

### Variables

#### Simples

Dado el patrón `(padre ?x ?y)`, `x` e `y` serán variables. Por tanto, solo coincidirá con hechos en la base de hechos que empiecen con padre y tengan exactamente 2 constantes. Si tuviesemos múltiples patrones, el valor de `x`, `y` y el resto de variables de este estilo siempre será el mismo en todo.

El nombre de la variable se puede omitir (dejando sólo `?`) si sólo se quiere coincidir con el patrón pero no importa el valor.

#### Multievaluadas

Dado el patron `(muestra ?id C G $?xs C G)`, `xs` es una variable multievaluada, que coincidirá con una lista de cero o más elementos.

Este patrón coincidiría con el hecho `(muestra 1 C G C T A T C G)`, donde `id = 1` y `xs` podría ser `CTAT` o `CTGT`.

### Acciones

Multiples acciones se pueden llevar a cabo en el RHS de una regla. Estas se ejecutarán en orden de arriba abajo.

```
(defrule pinta-bloque
        ?fa <- (bloque A color rojo)
        ?fb <- (disponible pintura verde)
    =>
        (retract ?fa ?fb)
        (assert (bloque A color verde))
        (printout t “Bloque pintado de verde “ crlf))
```

Las acciones principales que se llevarán a cabo son `assert` y `retract`, que añaden y eliminan hechos de la BH respectivamente. Habilitan la resolución de problemas no triviales, principalmente búsquedas de distintos tipos.

```
(defrule move_left ;; move blank cell to right (n-puzzle)
    ?fa <- (puzzle ?y0 ?x0 0) ;; blank cell
    ?fb <- (puzzle ?y1 ?x1 ?piece) ;; another cell
    (test (< ?x0 3) ;; check bounds
    ;; check if they are on the same row,
    ;; and if the second cell if right before the blank cell
    (test ( and (= ?x1 (+ ?x0 1) ) (= ?y0 ?y1) ))
    =>
    (retract ?fa ?fb) ;; delete both cells
    ;; recreate the cells, swapping their positions
    (assert (puzzle ?x0 ?y0 ?cell))
    (assert (puzzle ?x1 ?yi 0))
)
```

# Funcionamiento del MI

Siendo BH la base de hechos, BR la base de reglas, CC el conjunto conflicto (instancias de reglas, también llamado Agenda) e InstRule una instancia de la regla, el motor de inferencia sigue el siguiente algoritmo cada vez que tiene que resolver una regla:

```
BH = hechos iniciales
CC = Matching(BH, BR) ;; hace el pattern matching de hechos y reglas, y lo devuelve en forma de conjunto
while objetivo not in BH and CC != emptyset
     ;; selecciona una regla del conjunto en base al
     ;; criterio del motor de inferencia
    InstRule = Select(CC)
    ;; ejecuta y obtiene los cambios en el estado
    (added_facts, deleted_facts, deleted_rules) = 
        eval(InstRule)
    BH = difference(BH, deleted_facts)
    BH = union(BH, added_facts)
    CC = difference(CC, deleted_rules)
    ;; añade a CC nuevas instancias de reglas,
    ;; teniendo en cuenta los nuevos hechos añadidos
    CC = union(CC, Matching(BH, BR))
end_while
if objetivo in BH
    then return EXITO
    else return FALLO
else
```

En `Matching` se crean las instancias de las reglas, cada una asociada a un conjunto diferente de hechos. 

## Resolución de conflictos

La resolución de conflictos se aplica durante la fase de `Matching` del motor de inferencia para obviar operaciones innecesarias o cíclicas.

### Duplicación

Ya que las tanto las reglas como los hechos se guardan con propio identificador, podrían darse casos en los que se generen reglas o hechos idénticos (o funcionalmente idénticos) y se guarden ambos en la base de reglas/hechos.

Sin embargo, CLIPS no admite (al menos por defecto) la duplicación de hechos y reglas, aunque tengan distinto identificador.

### Refracción

Lo que sí puede suceder es que una misma regla se acabe ejecutando varias veces con los mismos datos si, por ejemplo, se actualiza la base de datos con una operación y se revierte la operación como en el ejemplo siguiente.

![[Representación del Conocimiento - ejemplo refracción.png]]

La refracción es el proceso que sigue CIPS para evitar que se inserten de nuevo en el conjunto conflicto instancias de reglas idénticas a otras que se acaban de eliminar.

## Prioridades

Por defecto, el motor de inferencia aplica una estrategia predeterminada a la selección de reglas instanciadas; si varias reglas coinciden escogerá la primera de ellas que ha sido insertada. CLIPS cuenta con las siguientes estrategias:
- DFS: Da más prioridad a las más recientes (LIFO)
- BFS: Da más prioridad a las más antiguas (FIFO)
- Aleatoria

*Nótese tras seleccionar y ejecutar una regla, actualiza el conjunto conflicto.*

Se puede alterar el orden en el que se evalúan las reglas añadiendo una declaración especial a `defrule`, llamada `salience`, con la que se asigna prioridad a las reglas (a mayor valor, mayor prioridad). Si no se añade, el MI asume que tiene prioridad 0.

Esto se puede utilizar como una forma emular estructuras condicionales independientes del orden de declaración, como en el siguiente ejemplo:

```
;; Escoge personas para jugar al basket, seleccionando
;; primero a los que miden 2m o más y, si no quedan más
;; a cualquier otra persona.
;; 
;; Deja en la BH a los jugadores no escogidos.
(defrule sobre_2m
    (declare (salience 30)) ;; mayor prioridad
    (test (>= ?alt 2)) ;; condición
    ?f1 <- (altura ?per ?alt)
    ?f2 <- (contador ?numper)
    =>
    (retract ?f1 ?f2)
    (assert (contador (+ ?numper 1)))
)

(defrule bajo_2m
    (declare (salience 10)) ;; menor prioridad
    ;; no hace falta comprobar condición,
    ;; solo se ejecuta si alt < 2
    ?f1 <- (altura ?per ?alt)
    ?f2 <- (contador ?numper)
    =>
    (retract ?f1 ?f2)
    (assert (contador (+ ?numper 1)))
)

;; Se evalúa antes que todas las anteriores.
;; Si evalúa a TRUE, cierra el MI.
(defrule final_ok
    (declare (salience 100))
    (contador 5)
    =>
    (halt) ;; detiene el MI
    (printout "Ya tenemos bastantes jugadores", CRLF)
)

;; Se evalúa cuando no hay más reglas que coincidan.
;; Es decir, cuando no quedan más jugadores Y contador != 5.
(defrule final_err
    (declare (salience 100))
    (contador 5)
    =>
    (halt)
    (printout "No hay suficientes jugadores", CRLF)
)
```