
# Cositas

## Beliefs

Colección de literales representados como predicados

```
tall(john)
likes(john, music)
```

Se puede añadir anotaciones entre `[]`, que se usarán normalmente para anotar de dónde viene ese conocimiento

```
colour(box1, blue)[source(percept)] # el agente lo ha percibido
colour(box1, blue)[source(bob)] # se lo ha comunicado otro agente
```

La negación de denota con la virgulilla `~`.

Se puede hacer uso de reglas para inferir nueva información a partir de conocimiento que ya se sabe.

```
likely_colour(C,B)
    :- colour(C,B)[source(S)] & (Self == S) ...
```

## Goals

Las *test goals* `?` sirven para instanciar una variable a partir de información en la base de creencias

```
?bank_balance(BB)
```

Las *achievement goals* `!` expresan un estado al que se quiere llegar.

```
!own(house)
```

## Plans

Los planes tienen tres partes:
- Evento disparador
- Contexto que determina si el plan es aplicable
- Cuerpo, que son las acciones que componen el plan

```
+!prepare(Something): NumOfPeople(N) & Stock(Something) & S>N <- <body>
```

Dentro del cuerpo de un plan hay una secuencia compuesta por varias o ninguna de las siguientes instrucciones, separadas por `;`.
- *Actions*
- *Achievement goals* se puede usar `!!` para ejecutarlo en paralelo
- *Test goals*
- *Mental Notes*. Sirven para añadir `+`, eliminar `-` y sustituir `+-` creencias.
- *Expression*. Expresiones similares a Prolog

## Recuperación frente a fallos

Al crear una *goal* se añade un evento de fallo `-!g(goal deletion event)` que elimina el evento añadido cuando se produce un error durante su ejecución. Se pueden *stackear* eventos de fallo que llegarán antes de este.