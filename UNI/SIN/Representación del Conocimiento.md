
#  Sistemas basados en reglas

Son una secuencia de reglas (precondiciones) similares a la que seguiría una persona con tal de dar un resultado o predicción similar al que daría una persona.

Se divide en tres capas:
- Base de Reglas: Información procedural: relaciones que sabemos entre hechos que se dan lugar a nuevos hechos de forma **dinámica**.
- Base de Hechos: Información declarativa: cosas básicas y **estáticas** que sabemos de antemano.
- Motor de inferencia: Gobierna las bases de reglas y hechos. Va ejecutando reglas en base a los hechos conocidos. Normalmente, ya está programado y no se modifica.

Has dos formas en las que pueden funcionar los motores de inferencia:
- Encadenamiento hacia delante: *¿Qué reglas puede aplicar a este hecho, y qué resultado da?*
- Encadenamiento hacia atrás: *¿Qué me hace falta para cumplir esta regla?*

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

El CLIPS, se pueden precalcular hechos para la base de hechos usando `deffacts`:

```
(deffacts bloques_Rep1
    (torre max altura 3)
    (bloque torre 1 A B C torre 2 E D grua nada)
)

(deffacts bloques_Rep2
    ...
)
```

## Reglas

Las reglas están compuestas de **patrones** y **tests**. Para que la regla sea aplicable si:
- Existen hechos en la Base de Hechos que casan con LHS.
- Todos los tests en LHS dan True.

RHS será el resultado de aplicar la regla.

```
(defrule <nombre> ["comentario"]
    (<patron>)+
    (test <test>)*
    =>
    (<patron>)+
)
```

Los test van en notación polaca (prefijo): `<test> ::= (<op> <arg> <arg>)`
### Variables

#### Simples

Dado el patrón `(padre ?x ?y)`, `x` e `y` serán variables. Por tanto, solo coincidirá con hechos en la base de hechos que empiecen con padre y tengan exactamente 2 constantes. Si tuviesemos múltiples patrones, el valor de `x`, `y` y el resto de variables de este estilo siempre será el mismo en todo.

El nombre de la variable se puede omitir (dejando sólo `?`) si sólo se quiere coincidir con el patrón pero no importa el valor.

#### Multievaluadas

Dado el patron `(muestra ?id C G $?xs C G)`, `xs` es una variable multievaluada, que coincidirá con una lista de cero o más elementos.

Este patrón coincidiría con el hecho `(muestra 1 C G C T A T C G)`, donde `id = 1` y `xs` podría ser `CTAT` o `CTGT`.