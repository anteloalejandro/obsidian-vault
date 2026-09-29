# Matrices de confusión binarias

Si tenemos, por ejemplo, un test de cáncer pensado para el público general que siempre responde que el usuario no tiene cáncer, acertará prácticamente siempre, pero no es realmente útil. Es decir, en casos donde la vasta mayoría del tiempo los elementos son de una clase, la precisión no es particularmente útil.

Esta parte va de tener herramientas para ajustar el umbral de decisión.

Expresamos el clasificador binario como:
$$
y^{*} = \mathbb{I}(p_{1} \geq 1 - \tau)
$$
Donde el umbral es $1-\tau$, del cual sólo tocaremos el $\tau$.
- $\tau = 0$: sólo aceptamos valores para los que estamos 100% seguros, es decir, sólo si $p(y = 1 \mid x) = 1$
- $\tau=1$: aboslutamente todo se clasifica como positivo

$N$ es el número de negativos reales, y $\hat{N}_{\tau}$ el número de negativos predichos, según $\tau$. Lo mismo se aplica a $P$.

En el caso del test de cáncer, el recall (cobertura) $TPR_{\tau} = \frac{TP_{\tau}}{P} = 1$, mientras que la specificity $TNR_{\tau} = \frac{TN_{\tau}}{N} = 0$.  También se suele comparar PPV (precisión, como de a menudo lo que yo digo que es cierto, es realmente cierto) y TPR.

TPR generalmente es el más importante.

De entre la tabla el más importante es el PPV (de los positivos predichos, cuántos eran realmente positivos) o *precision* (no confundir con *accuracy*).

$$
TNR = \frac{TN}{TN + FP}
$$

ROC
- Recall (TPR)
- FPR

Se divide TPR entre FPR para cada posibles valores de $\tau$ de 0 a 1. Cuanto más cerca esté un clasificador del extremo superior izquierdo (TPR = 1, NPR = 0), mejor es es el clasificador.

**Las matrices de confusión de sacan a partir de datos de evaluación (validación o test)**.

## Construcción de una curva ROC.

No tiene sentido hacer un incremento arbitrario, es mejor ir subiendo $\tau$ (bajando 1-$\tau$) hasta alcanzar directamente uno de los p(y = 1 | x_i), porque si no el resultado no cambia.

Por tanto, ordenamos las muestras por probabildad, y establecemos 1-$\tau$ a la de mayor probabilidad. En la siguiente iteración, a la de siguiente mayor, y así sucesivamente. Es decir, cuantas más muestras, más suave la curva.

Supongamos un clasificador perfecto (0 para las que son negativas, siempre, 1 para las positivas, siempre). La curva ROC tendría 2 puntos:
- $\tau = 1$: clasificaremos todo como positivo (FPR = 1)
- $\tau < 1$: clasificamos todo correctamente
- La curva ROC resulta en dos puntos: (1,1) (0,1).

Supongamos un clasificador aleatorio. $\tau$ determinaría aproximadamente el número de falsos positivos y falsos negativos. Acabamos con una recta de (0,0) a (1,1).
$$
\begin{align}
\text{FPR}_{\tau} &= FP_{\tau} \simeq \frac{N\tau}{N} = \tau \\
\text{TPR}_{\tau} &= TP_{\tau} \simeq \frac{P\tau}{P} = \tau
\end{align}
$$

En el clasificador realista tenemos:
- Si $\tau = 0 \implies FPR_{0} = 0, TPR \simeq 0$
- Si $\tau = 1 \implies FPR_{1} = TPR_{1} = 1$
- Por tanto, los extremos son iguales al clasificador aleatorio. Un clasificador mejor al aleatorio (que es lo normal) para el resto de valores de $\tau$ es mejor que la aleatoria.

Podemos estimar como de bueno es un clasificador como el área bajo su curva teniendo en cuenta la curva completa (AUC).

Otra forma es mediante el EER, en la que cogemos la recta que va de (0,1) a (1,0) y se coge el punto en el que cruza la curva, y se coge la altura en ese punto (TPR, que sería igual a la anchura o FPR en este punto).

## Curva PR

Si importa principalmente detectar positivos.

No usa TN en la formula (no está incluido en PPV ni TPR). En ROC sí que esta porque:

$$
FPR = 1-TNR = 1 - \frac{TN}{N}
$$
$$
\frac{0}{0} \implies 1
$$

Supongamos un clasificador perfecto:
- $\tau = 1 \implies \mathcal{P} = \frac{TP}{P} = \frac{P}{N}, \mathcal{R} = \frac{P}{P} = 1$
- $\tau < 1 \implies P = \frac{TP}{P} = \frac{P}{P} = 1 = \mathcal{R}$
- resulta en una recta de (1,1) a (1, P/N).

Idealmente querríamos un TPR y PPV altos, pero la curva tiende a bajar conforme avanza.

Es habitual que la precisión PPV vaya dando tumbos. PPV, en el peor caso, se queda en el porcentaje de positivas reales del problema. Esto sucede porque comparamos dos cosas que, matemáticamente, están muy poco relacionadas (no normalizamos).

Para evitar los desvaríos de la curva, se suele interpolar.

- AP: Se calcula a través del área bajo la curva, para comparar dos curvas
- mAP: AP de medias de curvas
- mAp@: Para $k$ clases. Para cada clase, se hace una matriz de confusión con $clase_{i}$ vs las demás clases.

## FScores

Si importa mucho encontrar positivos

Si $\beta=0$, F es sólo P, el recall no importa
Si $\beta \to \infty$ F es sólo R, *precision* no importa
Si $\beta = 0.5$ P es el doble de importante que recall
Si $\beta = 2$ R importa el doble que *precision*.

$\beta$ Decide cómo de importante es el Recall, pero no crece de forma lineal.

$F_{1}$ es la media armónica.

Las gráficas de P16 muestran a traves de areas separadas por líneas el valor de F para cada combinación de P y R, dada una $\beta$. En realidad, dentro de cada area hay un continuo, pero así se ve a groso modo el valor. También se ve, por tanto, la diferencia entre la media armónica y la aritmética. Si dibujamos una recta P = R, se ve que con $\beta=1$ ambos lados son simétricos, pero conforme cambia $\beta$ hay un sesgo hacia P o R.

No usamos la media aritmética (en su lugar la armónica) porque con ella podríamos tener un precision grande ocultando que el recall es horrible (incluso 0) y viceversa.

Normalmente queremos buena precisión y recall, así que por defecto usaremos $F_{1}$.

### FScores con multiples clases

Usamos el $F_{1}$. Se usa la misma estrategia que con curvas PR, matrices de confusión yo vs demás.

Para la clase $A \in \mathcal{C}$:

| y = c | $\hat{\text{otro}}$ | $\hat{c}$ |
| ----- | ------------------- | --------- |
| otro  |                     |           |
| c     |                     |           |

- macro avg: Pongamos que una clase tiene un valor de F mucho más alta que las demás. La macro acaba con un valor bajo, porque todas las clases aportan lo mismo al valor final. Normalmente queremos centrarnos en que lo que haga bien lo haga mejor, o corregir lo que hace mal, y macro no consigue ninguna de forma eficaz.
- weighted avg: Pondera las clases según su probabilidad. Es decir, le da más peso a las más probables, por lo que mejora lo que el clasificador ya hace bien.
- micro avg: Calcula las sumas de TP, FP, FN y calcula la $F_{1}$ en base a ellas. En un problema normal, acaba siendo igual a la accuracy $\frac{TP}{M}$. Sólo util con múltiples etiquetas (muchos clasificadores binarios en paralelo).
