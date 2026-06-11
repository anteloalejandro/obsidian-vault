
Siglas de *Beliefs, desires, intentions*.

Es una teoría de razonamiento práctico para **agentes con recursos**

> [!example] Ejemplo de regla
> $(\text{Int Ai} ) \to \neg (\text{Bel Ai} )$ significa "Si lo hace es que no cree en ello", es decir, hace algo porque aún no existe.

Dado un objetivo $X$ y un conjunto de reglas...
$$
\begin{align}
P &\to R \\
R &\to H \\
Q &\to T \\
T &\to X
\end{align}
$$
Seguimos la traza de reglas "hacia atrás", es decir, vemos qué regla da $X$ (en este caso $T\to X$), cogemos el precedente como nuevo objetivo (en este caso $T$), y repetimos el proceso hasta llegar a la primera.

# Deseos

Los deseos son objetivos que el agente quiere cumplir. Al igual que con las personas, los deseos no tienen que ser congruentes; dos deseos se pueden contradecir o un deseo puede llevar a una solución que se considera indeseable para otro.

# Intenciones

Las intenciones son resultado del proceso de **deliberación**, en el que se razona qué deseos se van a alcanzar.

- Las intenciones deben ser coherentes, es decir, **a diferencia de los deseos**, no puede haber unas intenciones que contradigan otras.
- Si un agente decide unas intenciones, éste debe ***creer*** que son posibles y que él las puede lograr. Es posible que crea esto, pero que no sea cierto.
- No es necesario planificar todos los **efectos colaterales** de cumplir con sus intenciones. Si un agente cree que cumplir una intención $I$ dará lugar a una intención $Y$, puede planificar qué hará para cumplir $Y$ pero no tiene por qué.
- Querer ir al dentista, y creer que me va a doler, no significa que esté buscando el dolor (problema del *deal package*).

Los agentes razonan un plan de acción para cumplir con sus intenciones, que podrá o no fallar. Si el plan falla pero la situación no ha cambiado, deberán volver a intentar **cumplir con las mismas intenciones con un plan de acción diferente**.

#  Creencias

Las creencias es la información que tiene el agente que él considera cierta.

Los agentes tienen unas creencias iniciales que se pueden ir actualizando durante el transcurso de la ejecución.

Son, a efectos prácticos, una base de datos interna del agente, inicializada antes de la ejecución del mismo.

# Razonamiento dirigido por objetivos

Esta es la forma en la que se decide el plan de acción para cumplir con las intenciones u objetivos.

Se hace mediante un **planificador** que recibe las intenciones del agente, el estado del entorno, y el conjunto de todas las acciones disponibles, y devuelve el plan.

# Estrategias de compromiso

Se aplican tras la fase de deliberación, cuando ya se han calculado las intenciones. Se aplican tanto a las intenciones como a las acciones planificadas para cumplir dichos fines.

- Ciego: Si ya lo he decidido, aunque desde el momento en el que se tomó la decisión hasta ahora la decisión deje de ser válida, lo intentaré aún si es imposible.
- Inquebrantable: Lo mismo, pero si es imposible no lo hará. Sí lo hará si es inválido pero posible. Si la intención es imposible de cumplir, buscará un nuevo plan hasta que encuentre uno posible.
- Sin prejuicios: Sólo mantendrá una intención mientras la considere válida. Básicamente, aplica un nuevo filtro a las instrucciones después de calcular el plan inicial y antes de recalcular el plan en caso de ser imposible. A esto se le llama **reconsideración de intenciones**.

Podemos considerar dos estrategias de reconsideración.
- Agentes atrevidos: No se paran a reconsiderar. Funcionan bien en entornos con bajo dinamismo.
- Agentes cautos: Tras realizar una acción, se **paran** a reconsiderar. Funcionan bien en entornos con alto dinamismo.