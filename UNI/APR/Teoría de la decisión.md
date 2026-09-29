# Teoría de la decisión

- Modelo no paramétrico: Referido a los pesos de los modelos lineales, es decir, la matriz $W$. En esta familia de modelos no se guardan parámetros, y en su lugar se utilizan los propios ejemplos de entrenamiento.

No siempre es necesariamente mejor coger la opción más probable (por ejemplo, si clasificar mal en una clase concreta tiene consecuencias mucho peores que el resto, se le puede dar más peso a dicha clasificación)

## Inferencia bayesiana

Calculo de la posterior $p(H \mid x)$ mediante la regla de bayes para **actualizar** creencias sobre cantidades ocultas $H$ a partir de un dato $x$.

En inferencia bayesiana, hay un **agente** que debe escoger una acción de un conjunto de acciones $a \in \mathcal{A}$.

También tenemos un **estado de la naturaleza** $h \in \mathcal{H}$ que desconocemos y tendrán un impacto que afectará a los costes y beneficios. Si me apuesto a que no va a llover y no cojo el paraguas, el estado de la naturaleza es si va a llover (y por tanto, si me voy a mojar) o no, no la probabilidad de que pase.

En base a la $a$ y el $h$, tendremos una función de pérdida $\ell(h,a)$ que nos indique el coste/beneficio de tomar una acción según el estado de la naturaleza que ocurre o acabe ocurriendo. Normalmente, $l$ será una penalización según lo malo que es el resultado.

| $\ell(h,a)$ | Paraguas | No paraguas |
| ----------- | -------- | ----------- |
| Llueve      | 5        | 20          |
| No llueve   | 5        | 0           |

El riesgo esperado a posteriori $R(a \mid x)$ es el riesgo que podemos tener una vez observamos la $x$.

Si supiesesmos el valor concreto de la $a$, podríamos dar el riesgo exacto, pero el problema es que no sabemos cuál es la a que deberíamos tomar para minimizar el riesgo. En su lugar, utilizamos el valor esperado $\mathbb{E}$. El valor esperado es algo así como "el coste promedio del riesgo cada acción ponderado por la probabilidad de que suceda en un entorno dado".

Por cada e.n. posible, calculamos el coste de una acción concreta $a$, que es el producto de la función de pérdida $\ell(h,a)$ y la probabilidad a posteriori de que ocurra dicho e.n. $p(h \mid x)$, y cogemos la suma de estos costes.

$$
R(a \mid x) = \mathbb{E}_{p(h \mid x)}(l(h, a)) = \sum_{h \in \mathcal{H}} \ell (h, a) · p(h \mid x)
$$

La **política óptima** consistiría en coger el mínimo de los $R(a \mid x)$

> [!info] Leyenda
> - Agente => Clasificados
> - $\mathcal{A}$ => conjunto de clases => $\mathcal{Y}$
> - $a$ => la clase que elige el clasificador => $\hat{y}$
> - $\mathcal{H}$ => conjunto de clases, igual que $\mathcal{A}$ => $\mathcal{Y}$
> - $h$ => la clase verdadera => $y$

Una función de coste muy usada es $\ell_{01}(y, \hat{y}) = \mathbb{I}(y = \hat{y})$: 0 si $y = \hat{y}$, 1 si no. Sin embargo, puede interesar que el coste de error no sea 1, sino un número mayor (o peor).

Tomemos $R(\hat{y} \mid x) = \sum_{y} \ell_{01}(y, \hat{y}) p(y \mid x)$. Podemos descomponerlo en:

$$
\begin{align}
& \ell_{01}(\hat{y}, \hat{y}) · p(\hat{y} \mid x) + \sum_{y \neq \hat{y}} \ell_{01}(y, \hat{y}) p(y \mid x) \\
=& 0 + \sum_{y \neq \hat{y}} p(y \mid x) \\
=& \sum_{y \neq \hat{y}} p(y \mid x) = 1 - p(\hat{y} \mid x)
\end{align}
$$

En este caso, la decisión óptima pasa a ser;
$$
y^{*} = argmin_{\hat{y}} (1-p(\hat{y} \mid x)) = argmax_{\hat{y}} p(\hat{y} \mid x)
$$

Por tanto, acabamos con la misma decisión óptima que con los modelos lineales, que sólo es válido si asumimos que todos los errores valen lo mismo.

Matriz de decisión/confusión:
- columns => error
- fila: decisión final
- $M_{i,\hat{\jmath}}$: Número de muestras de la clase $i$ que se han clasificado como clase $\hat{\jmath}$.
- Una matriz de decisión perfecta es igual a la matriz de identidad.
- Nos sirve para ver que clases confunde a menudo nuestro clasificador.
- Puede interesar hacer una matriz que separe una clase del resto (una clase para la clase separada, y una clase para el conjunto del resto de clases), haciendo una matriz 2x2.

Clasificar => número concreto (clase)
Regresión lineal => número real (infinitas clases) => $h,a$ pasan a ser valores reales.

Cuando pasamos a problemas de regresión, calculamos la pérdida mediante $\ell_{2}(h,a) = (h-a)^{2}$, por lo que el valor de la $R$ cambia.

Usando las propiedades de $\mathbb{E}_{h\mid x}$, por ser un sumatorio que depende sólo de $h$ y $x$:
$$
\begin{align}
R(a \mid x) &= \mathbb{E}_{h \mid x}[(h-a)^{2}] \\
&= \mathbb{E}_{h \mid x} [h^{2} - 2ah + a^{2}] \\
&= \mathbb{E}_{h \mid x} [h^{2}] - \mathbb{E}_{h \mid x}[2ah] + \mathbb{E}_{h \mid x}[a^{2}] \\
&= \mathbb{E}_{h \mid x} [h^{2}] - 2a \mathbb{E}_{h \mid x}[h] + [a^{2}]
\end{align}
$$

Si graficamos $R(a \mid x)$ con la $a$ en el eje $X$ y $R(a \mid x)$ en el eje $Y$, el valor óptimo es aquel valor de $a$ para el cual obtenemos el mínimo valor de la gráfica, es decir, un valle.

Por tanto, podemos encontrar un mínimo local usando derivadas.

$$
\begin{align}
\frac{\partial R(a \mid x)}{\partial a} &= 0 \\
0 - 2\mathbb{E}_{h \mid x} [h] + 2a &= 0 \\
a &= \mathbb{E}_{h \mid x} [h] = \int h · p(h \mid x) \ dh
\end{align}
$$

Con esto sólo obtenemos un mínimo o máximo local, por lo que las funciones de coste de diseñan de forma que sólo haya un mínimo y que este esté antes del máximo (como ReLU).

Así pues, el estimador de Bayes que toma la decisión óptima, es:
$$
\pi^{*}(x) = \text{argmin}_{a\in \mathcal{A}} \ R(a \mid x)
$$
## Clasificación sensible al coste

Coste de acierto = 0
Coste error > 0

El ejemplo de probabilidad binaria (dos clases) con positiva 0, negativa 1 de máxima probabilidad es, dado que $p(y=0 \mid x) = p_{0}, p(y = 1 \mid x) = p_{1}$:
$$
y^{*} = argmax_{\hat{y}}\ p(\hat{y} \mid x) = \begin{cases}
0 & \text{si } (p_{0} > p_{1}) = (p_{0} > 1-p_{0}) = p_{1} < 0.5 \\
1 & \text{si } (p_{0} \leq p_{1}) = p_{0} < 0.5
\end{cases}
$$

Ahora, perdida binaria (columna 1 => $y$, columna 2 => $\hat{y}$):
$$
\ell(y, \hat{y}) = \begin{pmatrix}
\ell_{00} & \ell_{01} \\
\ell_{10} & \ell_{11}
\end{pmatrix}
$$

$$
\begin{align}
R(\hat{y} = 0 \mid x) &= \ell_{00} · p_{0} + \ell_{10}·p_{1} = \ell_{10}p_{1}\\
R(\hat{y} = 1 \mid x) &= \ell_{01} $ p_{0} + \ell_{11}·p_{1} = \ell_{01}p_{0}
\end{align}
$$
Nótese que el coste de acierto ($\ell_{00}$ y $\ell_{11}$) siempre es 0.

En este caso, el predictor es:
$$
\pi^{*}(x) = \begin{cases}
0 &\text{si } R(\hat{y} = 0 \mid x) < R(\hat{y} = 1 \mid x)\\
1 &\text{si no} 
\end{cases}
$$

$$
\begin{align}
R(\hat{y} = 0 \mid x) < R(\hat{y} = 1 \mid x)\\
\ell_{01}p_{1} < \ell_{01}p_{0} \\
\ell_{01}p_{1} < \ell_{01} (1-p_{1})\\
\ell_{10}p_{1} + \ell_{01}p_{1} < \ell_{01} \\
p_{1} < \frac{\ell_{01}}{\ell_{10} + \ell_{01}} \\
p_{1} < \frac{1}{\frac{\ell_{10}}{\ell_{01}} + 1} \\
p_{1} < \frac{1}{c + 1} \\
\end{align}
$$
Importante destacar entonces, que lo importante es la proporción entre los dos costes de error $\frac{l_{10}}{l_{01}}$, no sus valores absolutos.

## Pérdida con opción a rechazo

Añadimos una nueva salida del clasificador, llamada rechazo, generalmente representado como 0. Así, $\mathcal{H} = \mathcal{Y}$, pero ahora $\mathcal{A} = \mathcal{Y} \cup \{ 0 \}$.

$$
\ell(y, a) = \begin{cases}

\end{cases}
$$
 Denotamos los costes como $\lambda$, y $\lambda_{r}$ es el coste de rechazo.

Aprovechando que podemos sacar de la suma al término con $\ell(\hat{y},\hat{y}) = 0$, podemos calcular el coste de las clases "normales" (no rechazo) como:
$$
\begin{align}
R(\hat{y} \mid x) &= \ell(\hat{y},\hat{y}) p(\hat{y} \mid x) + \sum_{y\neq \hat{y}} \ell(y, \hat{y})p(y \mid x) \\
&= 0 + \lambda_{e} \sum_{y\neq y} p(y \mid x) \\
&= \lambda_{e}(1-p(\hat{y} \mid x))
\end{align}
$$

Así, la opción óptima, sin contar el rechazo (aka, opción **más probable**) vuelve a ser la predicción que maximiza la probabilidad.
$$
y^{*} = argmin_{\hat{y}} \ \lambda_{e} (1 - p(\hat{y} \mid x)) = argmax_{\hat{y}}\ p(\hat{y} \mid x)
$$

Teniendo en cuenta que el coste de una predicción $\ell(y, 0)$ es $\lambda_{r}$ para cualquier $y$, el riesgo de decidir no tomar ninguna acción ($\hat{y} = 0$) es $\lambda_{r}$.
$$
\begin{align}
R(\hat{y} = 0 \mid x) = \sum_{y} \ell(y, 0) p(y \mid x) \\
= \lambda_{r} \sum_{y}p(y \mid x)
= \lambda_{r} · 1
= \lambda_{r}
\end{align}
$$

Así, la elección final $\pi^{*}$ sólo cogerá la opción más probable si su coste es menor que el coste del rechazo.
$$
\begin{align}
R(y^{*} \mid x) &< R(\hat{y} = 0 \mid x) \\
\lambda_{e}(1-p(y^{*} \mid x)) &< \lambda_{r} \\
\lambda_{e} - \lambda_{r} &< \lambda_{e}p(y^{*} \mid x) \\
\frac{\lambda_{e} - \lambda_{r}}{\lambda_{e}} &< p(y^{*} \mid x) \\
p(y^{*} \mid x) &> 1 - \frac{\lambda_{r}}{\lambda_{e}}\\
(p(y^{*} \mid x) = p^{*}) &> (1 - \frac{\lambda_{r}}{\lambda_{e}} = \lambda^{*})
\end{align}
$$

Así, la decisión óptima con rechazo es:
$$
\pi^{*}(x) = \begin{cases}
y^{*} & \text{si } p^{*} > \lambda^{*} \\
0 & \text{si no}
\end{cases}
$$

Si $\lambda^{*} = 0.5$ tenemos el clásico clasificador de máxima probabildad.
