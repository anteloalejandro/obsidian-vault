---
links:
  - https://nva-resource-storage-755923822223.s3.eu-west-1.amazonaws.com/d6b749ec-a4ea-4ef2-babd-6c3e77f2b315?response-content-type=application%2Fpdf&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJHMEUCIQCvORaTKrQNzv%2FrkvrrPA2Tz4MxEUCe3PBmWwqEiwejggIgEJACCdALGeRl4morlAUaVBCnI4tj8KjRbIWTfo3AYa0q%2BQQItP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARADGgw3NTU5MjM4MjIyMjMiDAIYDwd%2FHEBKCvBEeSrNBFIG5o1Fe3p%2BCRzOhQ9BmWST7CGmiXgSsZdJiJ6rx7GGwgAUav9UUHKrDC5ZSdVpmJ3bWDJAqsZoeDbLXhdJ6qVxbSCkAI7FSoPIDaMgPxaMWpHsnd6JpeNV25aizsIuU6MfnCj0OrT502%2BVgyxpsk6tRPtTq7Fb4G5ljKtCqe613kjLIEXm2v1ybS45VNiWRTk%2BpXSYtvdlRbRcfexPLBu4KWHBYfaRZuSY0fNOXJC0yjzKLgbrLrYXcdE75QVp%2FHsUW%2B9ZS3R94l975DIBqCi9ERYUFU9Rztt8xlGq1utw0rUYdpKg8pKy7V2vILHyMaOf1IjtGcimXfXP4a5yzKdVlfl%2FRCI8U%2BSawt2QAVF%2BYEhcHaIWkHek7SaRKAk6%2Fvi%2B9t2xKZ2c1qeqZnZ4dD9WgC7ZZCkVp3QPIxsqR01W77mtOtlKn47V8iYrbAvmY0xQkX6LokOLqC%2Fyr6hnMXgOzE7UwEs%2B%2BYff7NFohsDT4Of%2F8D547GLQTheAW%2BC7rZ1VVrD3NVwQFW1FnmRlt21SV9V0arogz1N8AgFe0IGzKU13A6E3NPyEnSsx6XSrM6K%2FvazgBUt1i8FpOTAiqB2ewOZOqI6ezmXxmRgesflDtfFLQ%2Bt9I0Ke4NOWmnpi%2FY8ZSRC%2FKx6AW2QiHpmfH8xXOnsZ%2F7QItUotItS7vLaVkuxKBypqnlojRD8NgMuV7NzmE03ho2mypSD0%2BeK77Jm71iggvPbjPFAkjZx2Y0RsOa8%2B2aFjvJVgFrQ8F4%2BppIijh8K3f10iXsvvoRswrOrxzwY6owGNNMqhUwL3EvlwLv83pMSqWyXCoE5IgyrPS%2B3BpQpm%2FByHium3cxeyECHaDb3F1gYTTMz1%2F6Tdb%2BEaRib49hLOSl40jRY6jtPXNXqRoTwUrtFJjhJUnICQtzRtwNigun7qRYPNe%2FMhEHWV3WzKCojneSNRXZI0M6e0gpt5FiaSu03%2B3FeGYhCh2zqMMdLLfMwGCw%2FTfTqCua2KW78Taix8eDEd&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260507T122100Z&X-Amz-SignedHeaders=host&X-Amz-Credential=ASIA3AAESE2H7UDB4W7L%2F20260507%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Expires=600&X-Amz-Signature=966f0c08d36f7c6f3269f1aae8059fd1a50d3be836d88a31eb0f5b025f448598
---
# Introducción

El proyecto consiste en examinar si un agente inteligente puede aprender a jugar a un videojuego usando los mismos datos de entrada (controles) y datos de salida (imagen del juego) que un humano.

El juego en cuestión en Quake II, un *shooter* en primera persona. La idea usar visión por computador para reconocer y cartografiar el entorno, y para poder discriminar a los enemigos de otros elementos.

Cartografiar el entorno pretende imitar el comportamiento de los jugadores humanos, que van formándose una idea mental del entorno que habita su personaje mediante la exploración y recuerdos del pasado. Este entendimiento de su entorno también se usa para tomar decisiones sobre como avanzar. 

# Arquitecturas de agentes

El artículo distingue entre varios tipos de agente

## Agentes Estrictamente Reactivos

Eligen sus acciones sin tener información sobre el pasado; sólo entienden el estado actual y deciden que hacer a partir de él.

$$
Ag: E \to Ac
$$

## Agentes basados en utilidad

Este tipo de agente que dispone de antemano de varias ejecuciones $R$ para conseguir un objetivo dado un conjunto de acciones.

Las "utilidades" son evaluaciones numéricas de cuán buena es una ejecución del agente, en basadas en lo que el agente puede percibir de su entorno.

$$
u : R \to \mathbb{R}
$$

Dentro de las ejecuciones que ya conoce, escoge aquella con mayor valor para la función de utilidad $u$.

## Agentes basados en objetivos

Son agentes que hacen un plan sobre las acciones que deben realizar para cumplir un objetivo, en base a dicho objetivo y su conocimiento sobre el problema.

## Agentes BDI

Son agentes racionales que siguen un modelo el modelo de Creencias-Deseos-Intenciones (BDI) que intenta explicar el comportamiento humano.

> [!NOTE] Características de un agente racional
> - Reactividad: Perciben su entorno y responden a tiempo a los cambios que ocurren en él.
> - Proactividad: Trabajan con iniciativa para cumplir sus objetivos.
> - Habilidad social: Son capaces de interactuar y colaborar con otros agentes (entre los que se pueden encontrar humanos) para cumplir sus objetivos.

Las Creencias son lo que el agente "sabe" sobre su entorno y sobre si mismo, y se pueden corregir, borrar o añadir usando su percepción y/o otras creencias. Su conocimiento es necesariamente correcto, de ahí el nombre de Creencias.

Los Deseos representan lo que motiva al agente a actuar. Esto no quiere decir que los deseos sean los Objetivos, ya que mientras estos últimos deben ser congruentes, unos deseos pueden estar en conflicto con otros.

Las Intenciones representan el Deseo que el agente se ha comprometido a priorizar. Por tanto, las Intenciones son producto de Creencias y Deseos.

## Arquitecturas híbridas

Las arquitecturas híbridas se introducen como solución a cómo crear un agente que muestre comportamiento tanto reactivo como proactivo.

Este tipo de arquitecturas consiste siempre de por lo menos dos capas (una para comportamiento reactivo, otra para el comportamiento proactivo). Podemos diferenciar dos tipos de arquitecturas híbridas: Horizontales y Verticales.

En las horizontales todas las capas reciben la misma entrada (percepción) a la vez, y todas producen una salida (acción) que, generalmente, será distinta. Para compaginar las distintas salidas, necesitan además de una función de control que decide qué capa tiene control del agente en un momento dado, o que acción dará mejor resultado.

![[agente-horizontal.png|500]]

En las verticales, las capas se apilan de modo que la salida de una se vuelve la entrada de otra. Pueden funcionar con una o dos pasadas. Si funcionan en una pasada, la entrada va a la primera capa, y la salida sale de la última. En dos pasadas se hace el camino de ida y vuelta, de modo que la salida también sale de la primera capa.

![[agente-vertical.png]]

## Arquitectura *TouringMachines*

Es una arquitectura basada en tres capas que producen sugerencias de acciones que el agente debería tomar de forma continua. Es principalmente una arquitectura híbrida horizontal modificada.

La parte híbrida consiste en tres capas de control:
- Reactiva: Formado por un agente puramente reactivo, reacciona a cambios inmediatos en el entorno.
- Planificación: Esta capa es la que provee al agente de comportamiento proactivo. No crea planes desde cero, sino que se utiliza unos *esquemas* prehechos, de entre los cuales busca uno válido para la situación actual en base a su entrada y sus objetivos.
- Modelado: Se usa para representar y categorizar las entidades del entorno. La capa de modelado genera metas que se pasan (mediante el Subsistema de Control) a la capa de planificación para que las resuelva.

Antes de la parte híbrida, la entrada pasa por un perceptrón y por el Subsistema de Control, y después de la parte híbrida pasan de nuevo por el Susbsistema de Control y un Subsistema de Acciones que elige finalmente cual de las acciones generadas por las distintas capas se acabará ejecutando.

El Subsistema de Control se dedica a permitir o impedir el paso de información desde o hacia las capas de control en base a una serie de reglas.