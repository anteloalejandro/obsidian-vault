
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

## Funciones discriminantes lineales

En las **funciones discriminantes lineales** podemos definir $g_{c}(y)$ como:

$$
g(y) = \sum_{i=1}^{d} a_{i}y_{i} + a_{0} = a^{t}y + a_{0}
$$

Donde $a_{0}$ es el **peso umbral**, $a$ es el **vector de pesos** y $d$ es la dimensión. Normalmente el vector de pesos o y el peso umbral serán diferentes para cada clase.

Este tipo de función tiene $d+1$ parámetros, es decir, linealmente dependiente de la dimensión.

Cuando todas las funciones discriminantes de un clasificador son lineales, el **clasificador también es lineal**.

## Funciones discriminantes cuadráticas

En el caso de las **funciones discriminantes cuadráticas** tenemos que son de la forma:

$$
g(y) =
\sum_{i=1}^{d} \sum_{j=1}^{d} a_{ij}y_{i}y_{j} + \sum_{i=1}^{d} a_{i}y_{i} + a_{0} =
y^{t}Ay + a^{t}y + a_{0}
$$

Donde $A$ es la **matriz de pesos**, $a$ es el **vector de pesos**, $a_{0}$ el **peso umbral** y $d$ la dimensión.

Estas funciones tienen un número de parámetros que escala cuadráticamente con la dimensión.

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

# Notación homogénea

La notación homogénea es una forma de representar los vectores, generalmente la representación $y \in E \equiv \mathbb{R}^{D}$ de un objeto $x \in U$, además del vector de pesos $a$.

Se denota usando `mathrm`, por ejemplo $y \underset{\text{pasa a}}{\to} \mathrm{y}$, del mismo modo que $a \underset{\text{pasa a}}{\to} \mathrm{a}$. Se definen de la siguiente forma:

$$
\mathrm{y} =
(1, y_{1}, \dots, y_{D})^{t}, \quad \mathrm{a}_{c} = (a_{c 0}, a_{c 1}, \dots, a_{c D})^{t}
$$

> [!important] Nótese que $\mathbf{y}$ **empieza con un** $1$ en la primera posición, del mismo modo que $\mathbf{a}$ **empieza con** $a_{0}$.

La función discriminatoria pasa de ser $g_{c}(y) = a_{c}^{t}y + a_{c 0}$ a ser $g_{c}(y) = \mathrm{a}_{c}^{t} \mathrm{y}$. Las funciones dan el mismo resultado, pero con esta notación incorporamos el escalar $a_{0}$ dentro del propio vector para solo operar con vectores.

Por tanto, la regla de clasificación pasa a ser:
$$
\hat{c} = G(y) \equiv g_{c}(y) =  \underset{c}{\text{argmax}}\, \mathrm{a}_{c}^{t} \mathrm{y}
$$

> [!info]
> Nótese que la $y$ usada como argumento de $g_{c}$ y $G$ y la $\mathrm{y}$ como resultado de $g_{c}$ **son diferentes**. Es decir, tanto la función de discriminación lineal como el generalizador reciben el vector $y \in E$, pero devuelven el producto de escalar de los vectores $\mathrm{a}_{c} · \mathrm{y}$.

# Probabilidad empírica del error de decisión

Siendo $p$ la probabilidad *verdadera* (y por tanto, teórica) de que se de un error de decisión en el sistema, la estimación empírica $\hat{p}$ puede obtenerse contabilizando el número de errores de decisión $N_{e}$ que se producen en una **muestra de evaluación** formada por $N$ muestras.

$$
\hat{p} = \frac{N_{e}}{N}
$$

Si $N$ es muy grande, se podemos asumir que $\hat{p}$ se distribuye normalmente de forma que $\hat{p} \sim \mathcal{N}\left( p, \frac{P(1-p)}{N} \right)$, por lo que para obtener un intervalo de confianza del 95% o, lo que es lo mismo, un error de primera especie de 0.05, tenemos que tener un error absoluto $\epsilon$ de:

$$
P(\hat{p} - \epsilon \leq p \leq \hat{p} + \epsilon) = 0.95, \quad 
\epsilon = 1.96 \sqrt{ \frac{\hat{p}(1-\hat{p})}{N} }
$$

Y por tanto $p = \hat{p} \pm \epsilon$.

# Métodos de partición de datos

Dado un conjunto de datos *etiquetados*, podemos separarlos para usarlo en la fase de entrenamiento (que determina los pesos) y en la fase de evaluación (que comprueba que los pesos funcionan bien con datos más allá del entrenamiento) de las siguientes maneras:

1. **Resustitución o *Resubstitution***
    - Todos los datos disponibles se usan en ambas fases.
    - Es demasiado optimista, no da buenos resultados y no permite saber como de útil son los pesos para objetos $x \in U$ que no formen parte de los datos que ya tenemos.
2. **Partition o *Hold Out***
    - Los datos se subdividen en un subconjunto para el entrenamiento y otro para el test.
    - Se desaprovechan datos que podrían usarse para entrenar. Por esto mismo, se intenta que el subconjunto de entrenamiento sea más grande.
3. **Validación Cruzada en $B$ bloques o *B-fold Cross Validation***
    - Los datos se dividen aleatoriamente en $B$ bloques, y se entrena a tantos sistemas como bloques haya. En cada sistema se excluye de los datos de entrenamiento a un bloque distinto, que se usará para la fase de evaluación.
    - Aumenta el coste computacional al tener que entrenar varios sistemas, y se siguen dejando bastantes datos para la fase de evaluación.
4. **Exclusión individual o *Leaving One Out***
    - Funciona igual que la anterior, pero los bloques son de tamaño $1$ siempre. Esto quiere decir que cada dato se usa como único test de un sistema diferente, entrenado con los $n-1$ datos restantes.
    - Se maximizan los datos que se usan para el entrenamiento, pero también aumenta mucho el coste computacional.