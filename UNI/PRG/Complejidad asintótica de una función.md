Es una aproximación al coste de ejecución de una función en la que en vez de calcular el coste exacto se averigua como crece ese coste según los datos de entrada que se introduzcan. Está estrechamente relacionado con los [[Límites|límites]].


# Notación asintótica 

Dadas dos funciones $g(n)$ y $f(n)$, compararíamos el crecimiento entre dos funciones así:
$$
\begin{align*}
g(n) \gg f(n) & \Leftrightarrow \lim_{n\to\infty} \frac{g(n)}{f(n)} = \infty \\
g(n) \ll f(n) & \Leftrightarrow \lim_{n\to\infty} \frac{g(n)}{f(n)} = 0 \\
g(n) \approx f(n) & \Leftrightarrow \lim_{n\to\infty} \frac{g(n)}{f(n)} = k \\
\end{align*}
$$

Mientras que en la notación asintótica se expresa así:
$$
\begin{align*}
g(n) \gg f(n) & \Leftrightarrow  f(n)\in O(g(n)) \\
g(n) \ll f(n) & \Leftrightarrow  f(n)\in \Omega(g(n)) \\
g(n) \approx f(n) & \Leftrightarrow  f(n)\in \Theta(g(n)) \\
\end{align*}
$$

En la notación asintótica, se obvian los productos y sumas constantes.
$$
\begin{align*}
f(n) \in O(2·g(n)) & \Leftrightarrow f(n) \in O(g(n))\\
f(n) \in O(2+g(n)) & \Leftrightarrow f(n) \in O(g(n))
\end{align*}
$$

Además, la suma de dos funciones tiene la complejidad asintótica de la más grande.
$$f(n) \in g(n) \Leftrightarrow f(n) + g(n) \in \Theta(g(n))$$

# Análisis de casos 

A menudo las funciones tienen condiciones bajo las cuales se terminan más rápido, se repiten menos, o hacen operaciones menos costosas. Por norma general, averiguan el mejor y peor caso posible y se calcula la complejidad asintótica de cada uno de ellos por separado.

Para denotar los casos mejores y peores de una función se usa $T_{m}(n) \in \Omega(\dots)$ y $T_{p}(n) \in \Theta(\dots)$ respectivamente. Si no hay casos mejores ni peores, se suele usar $O$ o $\Theta$. 

## Complejidad promedio 

Coger el mejor y peor caso no siempre es relevante al no ser casos representativos de cómo se usa la función en la vida real. Esto se soluciones calculando el coste promedio de la función, pero esto requiere de saber todos los casos que se van a comprobar ($I$), su complejidad ($T$) además de la probabilidad ($P$) de que sucedan.

$$
T_{\mu}(n) = \sum\limits_{i\in{I}} P_{i}·T_{i}(n)
$$

Para obtener estos datos a menudo es necesario hacer tests o estudios experimentales, por lo que no es útil al hacer un estudio más teórico.

# 