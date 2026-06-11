
# Actos de habla

Son una forma de entender los mensajes que manda un agente (emisor/locutor) a otro (receptor). Divide el mensaje en 3 partes:
1. Locución: Es lo que se dice.
2. Ilocución: Es la intención detrás de lo que se dice.
3. Perlocución: Son los resultados reales de la locución.

Según la hipótesis $F(P)$, todo acto de habla consiste en una fuerza $F$ aplicada a una proposición $P$. En este caso, las fuerzas son las **Performativas** (clasificación de ilocuciones) y las proposiciones son el contenido (la locución en sí misma).

Como performativas podemos encontrar...
- Información
- Pregunta
- Orden
- Petición
- Promesa
- Oferta
- ...

Los actos de habla (o declaraciones en general) no son ciertas o falsas, pueden ser exitosas o fallidas. Un acto de habla puede fallar por diversos motivos:
- **Enunciación**: El mensaje llega corrompido o el destinatario no lo entiende.
- **Interpretación**: El destinatario lo entiende, pero incorrectamente.
- **Consecución final**: El destinatario lo entiende correctamente, pero no puede llevar a cabo la acción solicitada.

# KQML

Es un lenguaje de comunicación estilo LISP pensado para agentes, sobretodo los que siguen modelos más complejos como el [[Arquitecturas BDI|BDI]].

Cada mensaje en KQML es un acto de habla, y cada primitiva del lenguaje es una performativa.

El lenguaje está dividido en 3 capas:
- **Contenido**
    - Tiene el contenido del mensaje, en cualquier lenguaje.
    - KQML sólo se preocupa de saber dónde empieza y dónde acaba.
- **Mensaje**
    - La parte central de KQML, determina todos los **tipos de interacción** que puede realizar un agente.
    - Identifica el protocolo, acto de habla, performativas y ontología (contexto).
- **Comunicación**
    - Identifican las características y parámetros del mensaje.
    - Emisor, receptor, identificadores, respuestas...

## Estructura del lenguaje

El lenguaje está formado por una lista de objetos. Los objetos están formados, a su vez, de una primitiva que identifica que clase de mensaje es (performativa) y una lista de atributos clave-valor.

```lisp
(ask-one ; primitiva de pregunta (espera una respuesta)
    :sender Pepe ; nivel de comunicación
    :content(PRECIO TELEFONICA ?precio) ; nivel de contenido, indica el formato
    :receiver servidor-bolsa ; nivel de comunicación
    :reply-with accion-telefonica ; nivel de comunicación (propia de ask-one)
    :language LPROLOG ; nivel de mensaje
    :ontology IBEX; nivel de mensaje
)

(tell ; primitiva de respuesta
    :sender servidor-bolsa ; nivel de comunicación
    :content(PRECIO TELEFONICA 19) ; nivel de contenido, con el formato indicado
    :receiver Pepe ; nivel de comunicación
    :in-reply-to accion-telefonica ; nivel de comunicación (propia de tell)
    :language LPROLOG ; nivel de mensaje
    :ontology IBEX ; nivel de mensaje
)
```

> [!NOTE] Sabemos que `tell` es una respuesta específicamente a `ask-one` porque sus valores de `reply-with` y `in-reply-to` son iguales.

| Nombre          | Significado                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| `tell`          | S comunica una información que se encuentra en su BC                                  |
| `evaluate`      | S quiere que R evalúe la expresión                                                    |
| `reply`         | S comunica a R una respuesta esperada                                                 |
| `ask-if`        | S quiere saber si la expresión se encuentra en la BC de R                             |
| `ask-about`     | S quiere conocer todo el conocimiento de R relacionado con la expresión               |
| `ask-one`       | S quiere que R conteste a una pregunta                                                |
| `stream-about`  | Versión en respuesta múltiple de ask-about                                            |
| `achieve`       | S quiere que R convierta en verdadera la expresión en su BC                           |
| `standby`       | S quiere que R esté preparado para responder a una performative                       |
| `ready`         | S está preparado para responder a R                                                   |
| `next`          | S quiere que R le devuelva la siguiente respuesta (de una consulta múltiple)          |
| `advertise`     | S está preparado para responder a una determinada performative                        |
| `register`      | S puede responder a performatives de un determinado agente                            |
| `broadcast`     | S quiere que R envíe la performative a todas los agentes conectados                   |
| `recommend-one` | S quiere el nombre de un agente que pueda contestar a una performative                |
| `recruit-one`   | S quiere que R le proporcione el nombre de otro agente que conteste a la performative |
- "S" es el emisor
- "R" es el receptor
- "BC" es la base de conocimientos