
Un agente es un sistema capaz de actuar automáticamente en un entorno dado con el fin de alcanzar unos objetos marcados. Para ello tiene que percibir dicho entorno, decidir que hacer, y actuar sobre él reiteradamente.

Como ejemplos de agentes simples tendríamos un termostato o un bot que responde automáticamente a correos con una o varias respuestas predeterminadas. Estos son casos triviales en los que **decidir** que hacer no tiene ninguna complicación.

# Entornos de agente

En entornos complejos, los agentes no tienen control completo sobre su entorno, pero sí pueden influir sobre él. A veces los fallos pueden ocurrir por las acciones de otros agentes. Esto es lo que se conoce como control parcial.

Tener influencia en vez de control implica que las acciones del agente pueden tener el efecto deseado o fallar, por lo que los entornos no son deterministas y los agentes deben tener estar preparados para los posibles fallos.

Además, los entornos pueden ser completamente observables (**accesibles**) o sólo parcialmente observables (**inaccesibles**). 

# Agentes software

Antes, se entendía al agente como los nodos de un sistema distribuido, donde cada uno se encarga de resolver partes diferentes de un problema.

Después, en sistemas multiagente, se entiende a un agente como una parte autónoma de un sistema, cada uno de los cueles tiene:
- Información o capacidad (generalmente incompleta) para solucionar un problema.
- Capacidad para decidir dinámicamente las tareas que deben realizar, y capacidad para acordar con otros agentes quién debería llevar a cabo esa tarea.

# Razonamiento

El razonamiento de bajo nivel consiste en percibir el entorno (sensores) y reaccionar a él, mientras que el razonamiento de alto nivel añade entre medias el elemento de la cognición.

La "cognición" es como llamamos a la capacidad de decidir qué hacer con tal de cumplir un objetivo.


> [!NOTE] Racional no es...
> - Omnisciente
> - Clarividente
> - Exitoso


# Reactividad

Un programa estático (asumiendo que el entorno también lo es), se puede ejecutar a ciegas.

En el mundo real, sin embargo, los entornos son dinámicos.

Se entiende como reactividad a la capacidad del agente de reaccionar a los cambios del entorno y dar respuestas correctar teniendo el cuenta el nuevo estado del entorno. 

Esto no significa que la respuesta tiene que darse rápido o antes de que el entorno vuelva a cambiar. La repuesta tiene simplemente que ser válida para el estado que haya a la hora de llevarla a cabo (predicir es una opción)

# Proactividad

No queremos que se limiten a reaccionar a su entorno, también queremos que actúen aunque no haya pasado nada.

# Sociabilidad

Queremos que las soluciones tengan en cuenta al resto de agentes del entorno.

Esto puede ser porque es estrictamente necesario o porque es más eficiente.

- Cooperación
- Coordinación
- Negociación
    - los gentes harán cosas si eso les ayuda a cumplir sus objetivos
    - hay un componente de toma-y-daca que tiene que ver con la coordinación
    - *Objects do it for free, Agents do it for money*

# Agente fuerte

Los agentes débiles tienen autonomía, proactividad, reactividad y sociabilidad, pero los **agentes fuertes** tienen, además:
- Movilidad: Capacidad de moverse por una red de comunicación
- Veracidad: No comunica información falsa (intencionalmente)
- Benevolencia: Siempre intenta realizar su tarea asignada sin contradecirse.
- Racionalidad: Sus objetivos son concretos y claros, e intenta llevarlos a cabo.

# Agentes como sistemas intencionales

> Lola cogió su paraguas porque creía que estaba lloviendo y no quería mojarse

Este forma de describir las acciones de una persona hacen uso de la psicología popular. Podemos predecir y explicar el comportamiento de alguien entendiendo sus creencias, deseos y capacidades cognitivas.

Del mismo modo, el un sistema intencional  es aquel compuesto por entidades cuyo comportamiento puede ser predicho atribuyendo creencias, deseos y perspicacia racional.

Si tiene creencias y deseos, pero no creencias y deseos sobre creencias y deseos, hablamos de un sistema intencional de primer orden.

En los sistemas intencionales de segundo un agente orden tiene creencias y deseos sobre las creencias y deseos de otros agentes y de sí mismo.

# Agentes de razonamiento deductivo

Paradigma conocido como **IA Simbólica**, usa lógica proposicional y reglas de de deducción, donde la base de hechos contiene las creencias expresadas usando dicha lógica proposicional (lógica de predicados en primer orden). [[Representación del Conocimiento#Sistemas basados en reglas]].

Tenemos dos problemas clave:
- **Problema de transducción**. Cómo pasar la información cruda recibida por los sensores a una representación lógica útil.
- **Problema de la representación / razonamiento**. A qué nivel hay que representar la información, y cuánta de la información recibida merece la pena conservar.

Este tipo de agentes consta de:
- Una teoría $Q$, que generalmente es un conjunto de reglas.
- Una BBDD lógica $\Delta$ que describe el estado actual del mundo.
- El conjunto de acciones $Ac$.
- $\Delta \mid Q \phi$, que significa que una teoría $\phi$ puede ser probada e insertada en $\Delta$ usando $Q$.

Podemos elegir la decisión a tomar escogiendo la primera acción aplicable al estado actual (iterando por todas hasta que encontremos una $a$ aplicable usando $\Delta \mid Q\ a$). Si las reglas están bien ordenadas, puede funcionar correctamente.

Para evitar bucles infinitos sólo usaremos la disyunción para conectar expresiones, es decir, expresiones de la forma $A \lor B$, de forma que si $A$ o $B$ no existen, elegimos la otra expresión.


# Arquitectura de subsunción

Para IA reactiva, sin necesidad de la representación simbólica de los datos como con los agentes de razonamiento deductivo.

En la arquitectura de subsunción de Rodney Brooks, contamos con un **conjunto de comportamientos**, donde cada uno de los comportamientos es un par formado por una condición $c \subseteq P$ ($P$ es el conjunto de Percepciones posibles) y una acción $a \in Ac$.

$$
\text{Beh} = \{ (c,a) : c \subseteq P \land a \in Ac \}
$$

Un comportamiento $(c,a)$ puede *dispararse*, lo que implica que $a$ es **candidata** a ejecutarse, cuando el estado del entorno $s \in E$ de lugar a percepciones que incluyan **todas** las percepciones de $c$. Es decir, la acción se ejecutará si se cumplen todas las percepciones de la condición. Nótese que se puede disparar más de un comportamiento a la vez (secuencia de if, en lugar de if-else).

$$
\text{disparados} = \{ (c, a) \in Beh : c \subseteq \text{percibir}(s) \}
$$
Sin embargo, sólo se puede ejecutar una acción a candidata a la vez. Para elegir cuál se va a ejecutar, los comportamientos se organizan en capas con anterioridad de forma que las capas más bajas inhiben a las más altas.

Las capas bajas representan comportamientos más "primitivos". Un ejemplo intuitivo de capa baja podrían ser los reflejos de una persona; toman el control del cuerpo de forma involuntaria y existen para lidiar con situaciones que necesitan atención inmediata.

# Formalización

## Entorno

Un entorno es una secuencia de estados $E = \{ s_{1},s_{2}, \dots \}$ y los agentes tienen disponibles un conjunto finito de acciones que transforman el entorno $Ac = \{ \alpha_{1}, \alpha_{2}, \dots \}$.

$$
r: s_{0} \overset{\alpha_{0}}{\to} s_{1} \overset{\alpha_{1}}{\to} s_{2} \overset{\alpha_{2}}{\to} s_{3} \to \dots
$$

$R$ es el conjunto de secuencias $r$ posibles, y $R^{A}$ es todas aquellas secuencias que tienen como última acción la $A$ y $R^{E}$ las que acaban con el estado $E$.

Los entornos pueden ser modelados mediante una función de transición que representa su comportamiento, $\tau: R^{A} \to P(E)$, donde $P$ son las partes de $E$, es decir, el conjunto de todos los posibles subconjuntos del estado. Por tanto, a cada miembro de $R^{A}$ le corresponde un conjunto de estados posibles (miembros de $P(E)$), así que no es determinista (varios estados posibles en vez de uno solo). Si $\tau(r) = \emptyset$ no hay estado sucesor.

En definitiva, los entornos son tuplas de la forma $Env = (E, s_{0}, \tau)$.
## Agente

Se modela como una función que recibe una historia que acaba en un estado (es decir, un miembro de $R^{E}$) y devuelve una acción de su conjunto de acciones $Ac$.

$$
Ag: R^{E} \to Ac
$$

Según esta definición los agentes, a diferencia del entorno, sí son deterministas.

## Agente Reactivo

No cumple siquiera con la definición de agente débil, simplemente reacciona a cambios del estado.

$$
\text{acción}: E \to A
$$

No necesita siquiera una representación interna del entorno, ni una historia de como se ha llegado al estado.

## Agentes basados en modelos

Tienen un estado interno $\in I$ en base al cual deciden que acción tomar sobre el entorno.

$$
\begin{align}
\text{acción} &: E \to P \\
\text{percibir} &: I \to Ac \\
\text{actualizar estados} &: I \times P \to I
\end{align}
$$
Primero perciben, después actualizan el estado y, finalmente, actúan en base al nuevo estado.
## Agentes basados en objetivos

Además de un estado interno, tenemos un conjunto de objetivos $G$, cada uno de los cuales describe uno o varios estados objetivo pertenecientes al entorno.

$$
\begin{align}
\text{acción} &: I \times G \to Ac \\
\text{actualizar objetivos} &: G \times P \to G 
\end{align}
$$

Ahora las acciones dependen del estado interno y del objetivo que se tenga actualmente. Tiene que actualizar los objetivos después de actualizar el estado interno y antes de llevar a cabo una acción.
## Agentes basados en utilidades

Otra forma de trabajar con objetivos. Construimos agentes para que realicen tareas por nosotros.

Para elegir qué debe hacer el agente, tendremos una función de utilidad $u$ que mida el rendimiento y hacemos que el agente trate de maximizar el valor de esta función (racionalidad).

Hay varias soluciones propuestas para la función de utilidad:
- Calcular cuán bueno es un **estado** dado: $u : E \to \mathbb{R}$.
    - El agente seleccionará siempre las acciones que le lleven al mejor estado que puede alcanzar en este instante.
    - Carece de visión o planificación a largo término
- Calcular como de buena es una **ejecución**: $u : R \to \mathbb{R}$.
    - Tiene visión a largo plazo.
    - Se pueden incorporar probabilidades de futuros estados.
    - Difícil de calcular con exactitud.

Denotamos como $P(r \mid Ag,Env)$ la probabilidad de que ocurra la ejecución $r$ cuando el agente $Ag$ está en un entorno $Env$. Por ser una probabilidad, se ha de cumplir que $\sum P(r \mid Ag, Env) = 1$.

Así pues, la utilidad esperada de un agente se denota como la suma de los productos de la probabilidad de una ejecución y la utilidad de estos.

$$
EU(Ag, Env) = \sum_{r \in R(Ag,Env)} [u(r) · P(r | Ag, Env)]
$$

Un agente óptimo (dado un entorno) será aquel que maximice la función de utilidad.

$$
Ag_{opt} = \arg\max_{Ag \in AG}\ EU(Ag, Env)
$$

Dada esta definición, el agente óptimo no es necesariamente el mejor siempre, sólo es el que esperamos que haga mejor las cosas de media.