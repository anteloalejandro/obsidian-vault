
# Notación

Un **espacio de representación** es un vector en el que se representan los objetos. Tenemos que decidir que valor representa un objeto mediante técnicas de **preproceso** y **extracción de características**.

Para el *dataset* IRIS, podemos obtener una gráfica como la siguiente, en la que se grafica la anchura y longitud de los pétalos de los diferentes tipos de pétalos.

![[Aprendizaje de funciones discriminantes - dataset iris.png]]

La anchura y longitud son las características extraídas, mientras que los "tipos" de flor serían las **clases**.

Para el conjunto de las clases $\mathbb{C}$, usualmente representado como $\mathbb{C} = \{ 1,2,\dots, C \}$, cada objeto $x \in U$ se manifiesta dentro de un "Universo" $U$. Suponemos que éste objeto sólo pertenece a una sola clase $c(x) \in \mathbb{C}$.

Para el espacio de representación $E$, que generalmente es $E = \mathbb{R}^{D}$, dado el resultado del preproceso y la extracción $y = y(x)$ aplicados a un objeto $x \in U$, se incluyen los posibles resultados de $y$, es decir, $\{ y : y = y(x),\, x \in U\} \subset E$.

Para el clasificador $G : E \to \mathbb{C}$, $G$ se obtiene aprendiendo $N$ **muestras *etiquetadas*** $(y_{1}, c_{1}), \dots, (y_{N}, c_{N}) \in E \times \mathbb{C}$. Usando este clasificador, se estima la clase de un nuevo objeto $x \in U$ como $\hat{c} = \hat{c}(x) = G(y(x))$.

# Funciones discriminantes

Un clasificador cualquiera $G$ en $C$ clases se puede expresar con $C$ **funciones discriminantes** de la forma $g_{c} : E\to \mathbb{R},\, 1\leq c \leq C$ y una regla de clasificación que coja el mayor de los valores de $g_{c}$ para un resultado $y$ dado.

$$
G = (g_{1}, g_{2}, \dots, g_{C}), \quad \hat{c} = G(y) \equiv \underset{1\leq c\leq C}{\text{arg max}}\, g_{c}(y)
$$

![[Aprendizaje de funciones discriminantes - funciones discriminantes.png]]

# Fronteras de decisión

Un clasificador divide el espacio de representación en $C$ **regiones de decisión** $R_{1}, \dots, R_{C}$, de forma que la frontera de decisión $R_{i}$ es el espacio formado por los valores de $y \in E$ para los cuales  $g_{i}(y) = \underset{c}{\text{arg max}}\, g_{c}(y) \equiv G(y) = \hat{c}$.

Las **fronteras de decisión** son el lugar geométrico para en el que se intersecan dos funciones discriminatorias $g_{i}(y)$ y $g_{j}(y)$, es decir, el espacio en el que $g_{i}(y) = g_{j}(y),\, i \neq j$. El espacio será la **hipersuperficie** en la que se intersecan, por lo que...
- Si $E \equiv R^{3}$, la frontera será un plano.
- Si $E \equiv R^{2}$, la frontera será una recta (o curva si es una frontera no lineal).
- Si $E \equiv R^{1}$, la frontera será un punto.

Generalizando, se puede averiguar la frontera de decisión de una clase $i$ arbitraria averiguando cual, de entre el resto de funciones discriminantes, es igual a la función discriminante $g_{i}(y)$. Es decir, es el lugar geométrico formado por $\{\, y \in E : g_{i}(y) = \underset{j\neq i}{\max} \{ g_{j}(y) \} \, \}$.
Por ejemplo, para una frontera de decisión de $E \equiv R^{1}$:
![[Aprendizaje de funciones discriminantes - frontera decisión R1.png]]

Como otro ejemplo, las fronteras de decisión del *dataset* IRIS, que tiene $E \equiv R^{2}$:
![[Aprendizaje de funciones discriminantes - frontera de decisión R2.png]]

# Clasificadores equivalentes

Dos clasificadores $(g_{1}, \dots, g_{C}),\,(g'_{1}, \dots, g'_{C})$ son equivalentes si las fronteras de decisión resultantes son exactamente las mismas, o lo que es lo mismo, si para los mismos valores de $y$ se induce la misma clase aunque el resultado de la función discriminante sea diferente.

Por tanto, si $f: \mathbb{R} \to \mathbb{R}$ es una función monótona creciente cualquiera, entonces los clasificadores $(g_{1}, \dots, g_{C}),\, (f(g_{1}), \dots, f(g_{C}))$ son equivalentes.