
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

# Intenciones

Las intenciones son resultado del proceso de **deliberación**, en el que se razona qué deseos se van a alcanzar.

- Las intenciones deben ser coherentes, es decir, **a diferencia de los deseos**, no puede haber unas intenciones que contradigan otras.
- Si un agente decide unas intenciones, éste debe ***creer*** que son posibles y que él las puede lograr. Es posible que crea esto, pero que no sea cierto.
- No es necesario planificar todos los **efectos colaterales** de cumplir con sus intenciones. Si un agente cree que cumplir una intención $I$ dará lugar a una intención $Y$, puede planificar qué hará para cumplir $Y$ pero no tiene por qué.
- Querer ir al dentista, y creer que me va a doler, no significa que esté buscando el dolor (problema del *deal package*).

Los agentes razonan un plan de acción para cumplir con sus intenciones, que podrá o no fallar. Si el plan falla pero la situación no ha cambiado, deberán volver a intentar **cumplir con las mismas intenciones con un plan de acción diferente**.

# Razonamiento dirigido por objetivos

Esta es la forma en la que se decide el plan de acción para cumplir con las intenciones u objetivos.

# Estrategias de compromiso

- Ciego: Si ya lo he decidido, aunque desde el momento en el que se tomó la decisión hasta ahora la decisión deje de ser válida, lo intentaré aún si es imposible.
- Inquebrantable: Lo mismo, pero si es imposible no lo hará. Sí lo hará si es inválido pero posible.