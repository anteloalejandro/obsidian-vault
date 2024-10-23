---
todo: true
---

# Capacidad

Sabemos que el potencial depende de la carga, la forma y el material. En concreto, el potencial es directamente proporcional a la carga, por lo que si reescribimos el potencial de una esfera para que para que $V_{\text{esfera}} = \frac{Q}{C}$...
$$
\begin{align}
V_{\text{esfera}} &= \frac{Q}{4\pi\varepsilon_{0}r} \\
\frac{V_{\text{esfera}}}{Q} &= \frac{1}{4\pi\varepsilon_{0}r} \\
\frac{Q}{V_{\text{esfera}}} &= 4\pi e_{0}r = C
\end{align}
$$

Por lo que, generalizando para cualquier otra forma, obtenemos...
$$
V = \frac{Q}{C} \iff C = \frac{Q}{V} \iff Q = V·C
$$

Usar $C$ como constante es una forma de abstraer la forma y material del conductor en el cálculo de la carga y el potencial. Por ejemplo, una conductor más grande tendría una $C$ más grande, pero si te la dan como constante, no necesitas saber que forma o tamaño tiene.

También podemos deducir que un dispositivo que pueda acumular una carga alta teniendo un potencial bajo tendrá una capacidad muy alta.

La unidad de $C$ es el Faradio, o $\pu{ F }$, y se suele medir en $\mu F$ o $mF$.

$$
[C] = \left[ \frac{Q}{V} \right] = \pu{ C/V } = \pu{ A/Vs } = \pu{ F }
$$

# Condensador

El condensador es el sistema formado por dos conductores con influencia electroestática total, aunque en la práctica no sea completamente total.

Por ejemplo, dos superficies cargadas positiva y negativamente serían condensadores perfectos si fuesen infinitas porque al no haber extremos las líneas de campo no se pueden curvas en los extremos, pero como en la práctica eso es imposible, siempre va a haber alguna línea de campo que se curve.

![[esquema condensador.png]]

La capacidad de este condensador teórico sería $C = \frac{Q}{\Delta V}$, o simplemente $C = \frac{Q}{V}$.

Por Gauss, también podemos sacar el campo eléctrico y la carga encerrada:
$$
\begin{gather}
E = \frac{\sigma}{2\varepsilon_{0}} + \frac{\sigma}{2\varepsilon_{0}} = \frac{\sigma}{\varepsilon_{0}}
 \\
Q = \sigma·S
\end{gather}
$$

Y de ahí podemos sacar el potencial:
$$
\Delta V = -\int E\,dd = \frac{\sigma}{\varepsilon }d
$$

Y de ahí, finalmente la capacidad:
$$
C = \Delta V^{-1} · Q = \frac{\varepsilon_{0}}{\sigma d}·\sigma S = \frac{\varepsilon_{0}S}{d}
$$
Por tanto, sabemos que cuanto **mayor es el condensador** y **menor sea la distancia** entre las dos partes, más **grande es su capacidad**.

## Ejercicio capacidad condensador

Dado un condensador formado por dos conductoras esferas concéntricas con cargas $Q_{1}$ y $Q_{2}$, siendo $R_{1}$ el radio de la esfera central y $R_{2}$ la distancia hasta el interior de la segunda esfera, podemos calcular el potencial en la esfera central siguiendo el [[Conductores cargados en equilibrio#Principio de superposición|principio de superposición]].

$$
\begin{gather}
E = \frac{Q}{4\pi\varepsilon_{0} r} \\
V_{R_{1},R_{2}} = -\int_{R_{2}}^{R_{1}} \frac{Q}{4\pi\varepsilon_{0}r} \, dr = -\frac{Q}{4\pi \varepsilon_{0}}\left[ \frac{1}{r} \right]_{R_{2}}^{R_{1}} = \frac{Q}{4\pi\varepsilon_{0}}\left[ \frac{1}{R_{2}} - \frac{1}{R_{1}} \right] = \frac{Q}{4\pi\varepsilon_{0}}\left[ \frac{R_{2}-R_{1}}{R_{2}·R_{1}}\right] 
\end{gather}
$$

Habiendo sacado el potencial, se puede calcular también la capacidad de la esfera central.

$$
C = \frac{Q}{V} = \frac{4\pi\varepsilon_{0}R_{2}R_{1}}{Q(R_{2}-R_{1})} · Q = \frac{4\pi\varepsilon_{0}R_{2}R_{1}}{R_{2}-R_{1}}
$$

Por tanto, podemos entender que lo único que le importa a la capacidad es el tamaño y la forma.

Ahora bien, si en este ejemplo quisiésemos un condensador esférico ideal, es decir, uno con $R_{1} \simeq R_{2}$, siendo $d$ la diferencia infinitesimal entre $R_{1}$ y $R_{2}$, que la capacidad es igual a la fórmula de la capacidad del condensador ideal calculada antes.
$$
C \simeq \frac{\varepsilon_{0} (4\pi R^{2})}{d} = \frac{\varepsilon_{0}S}{d}
$$

> [!success] Resultados
> Se ha comprobado que la capacidad depende únicamente de la forma y la distancia entre las superficies.
> 
> Además, se ha comprobado que cuando se modela un condensador en términos del condensador ideal, la fórmula de la capacidad siempre acaba teniendo la forma...
> $$
> C = \frac{\varepsilon_{0}S}{d}
> $$

# Asociación de condensadores

Podemos asociar a los condensadores en serie o en paralelo.

![[Condensadores en serie y paralelo.png]]

En el condensador en paralelo, el potencial no cambia en ninguno de los puntos, mientras la carga antes de la disyunción es igual a la suma de las cargas tras la disyunción.

En el condensador en serie, la carga no cambia en ningún punto, pero potencial al inicio es la suma de las caídas de potencial en todos los puntos más el potencial en el otro extremo.

En el primer circuito de la figura anterior podemos establecer las siguientes relaciones:
$$
\begin{gather}
V_{A} = V_{C_{1}} = V_{C_{2}} = V_{C_{3}} = V_{B} \\
Q_{A} = Q_{C_{1}} + Q_{C_{2}} + Q_{C_{3}} = Q_{B} \\ \\
\sum_{i} C_{i} = C_{\text{eq}} = \frac{Q_{C_{1}} + Q_{C_{2}} + Q_{C_{3}}}{V} = \frac{\sum_{i} Q_{i}}{V}
\end{gather}
$$

Mientras que en el segundo circuito se pueden establecer estas:
$$
\begin{gather}
V_{A} = V_{C_{1}} + V_{C_{2}} + V_{C_{3}} + V_{B} \\
Q_{A} = Q_{C_{1}} = Q_{C_{2}} = Q_{C_{3}} = Q_{B} \\ \\
V_{C_{\text{eq}}} = V_{A} - V_{B} = \sum_{i}V_{C_{i}} \\
\sum_{i}C_{i} = C_{\text{eq}} = \frac{Q}{V_{C_{\text{eq}}}}
\end{gather}
$$

Por lo que poner condensadores en paralelo es equivalente a tener un sólo condensador con la superficie combinada de los 3 en la fórmula del condensador ideal, y ponerlos en serie es equivalente a tener un sólo condensador cuya distancia es igual a la suma de las distancias entre todos ellos.