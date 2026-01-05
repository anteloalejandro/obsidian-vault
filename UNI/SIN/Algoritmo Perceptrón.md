
El objetivo es, dadas $N$ muestras de aprendizaje etiquetadas $(\mathrm{y}_{1}, c_{1}), \dots, (\mathrm{y}_{N}, c_{N})$, encontrar los $C$ vectores de pesos $\mathrm{a}_{i},\,1 \leq i \geq C$ que clasifiquen lo más correctamente posible las muestras **de aprendizaje** dadas. Es decir, *intentamos* que se cumpla:
$$
\begin{align}
\forall i \neq c_{1},& \quad
    \mathrm{a}_{c_{1}}^{t}\mathrm{y}_{1} > \mathrm{a}_{i}^{t}\mathrm{y}_{1} \\
\forall i \neq c_{2},& \quad 
    \mathrm{a}_{c_{2}}^{t}\mathrm{y}_{2} > \mathrm{a}_{i}^{t}\mathrm{y}_{2} \\
&\dots \\
\forall i \neq c_{N},& \quad 
    \mathrm{a}_{c_{N}}^{t}\mathrm{y}_{N} > \mathrm{a}_{i}^{t}\mathrm{y}_{N} \\
\end{align}
$$

> [!info]
> Nótese que $\mathrm{a}_{c_n}^{t}\mathrm{y}_{m}$ representa el producto escalar del vector de pesos correspondiente a la clase $n$ y del vector de representación del objeto correspondiente a la clase $m$, donde $n$ y $m$ pueden ser o no iguales.
> - Si $n = m$, se da que $\hat{c}_{m} = \underset{c}{\mathrm{arg max}}\, \mathrm{a}_{c}^{t}\mathrm{y}_{m} = \mathrm{a}_{c_{n}}^{t}\mathrm{y}_{m}$.
> - Si $n \neq m$, se da que $\hat{c}_{m} = \underset{c}{\mathrm{arg max}}\, \mathrm{a}_{c}^{t}\mathrm{y}_{m} > \mathrm{a}_{c_{n}}^{t}\mathrm{y}_{m}$.

> [!warning] Esto sólo es así por como están distribuidas las muestras en este caso particular, con una muestra por clase y correspondiendo la n-ésima muestra a la n-ésima clase.

Una solución a este problema es ajustar unos **pesos iniciales** mediante el **algoritmo perceptrón** de forma iterativa.

# Datos de entrada

Como datos de entrada tenemos, obviamente, el conjunto de datos de entrenamiento $\{ \mathrm{y}_{n}, c_{n} \}_{n=1}^{N}$ y el conjunto de vectores de peso iniciales $\{ \mathrm{a}_{c} \}_{c=0}^{C}$.

A estos se incluye un número máximo de iteraciones del algoritmo $M$. Pero además contamos con datos de entrada que afectan al aprendizaje de diferente forma según si los datos de entrenamiento son linealmente separables:

- La tasa de aprendizaje $\alpha$ es un escalar por el que se multiplica $\mathrm{y_{n}}$ en cada iteración del algoritmo, y determina cuánto se ajustan los pesos durante el aprendizaje.
    - Si $\alpha$ es demasiado grande, el algoritmo puede oscilar o divergir.
    - Si es demasiado pequeño, la convergencia es más suave pero requiere de más iteraciones.
    - *Si son linealmente separables*
        - Si $\alpha > 0$, converge a una solución exacta en un número finito de iteraciones.
- El sesgo o margen $b \in [0, 1]$ es un escalar que permite ajustar las fronteras de decisión.
    - *Si son linealmente separables*
        - Si $b = 0$ las fronteras de decisión serán correctas, pero pueden quedar mucho más cerca de los datos de una región de decisión que del resto, lo que dará peores resultados fuera de los datos de entrenamiento.
        - Si $b$ es suficientemente grande, se obtienen fronteras de decisión bien centradas entre las regiones de decisión.
    - *Si **no** son linealmente separables*
        - Si $b = 0$ no se garantiza que el resultado converja ni tenga buena calidad.
        - Si $b > 0$ tampoco hay garantía, pero con valores de $b$ y $M$ suficientemente grandes se obtienen, normalmente, buenas fronteras de decisión con error de clasificación muy bajo.
        - Esto es lo que hace que el parámetro $M$ sea necesario.

## Ejemplos

$b = 0$, datos de entrenamiento linealmente separables.
![[Aprendizaje de funciones discriminantes - separable margen nulo.png]]

$b > 0$, datos de entrenamiento linealmente separables.
![[Aprendizaje de funciones discriminantes - separable margen positivo.png]]

Datos de entrenamiento no linealmente separables.
![[Aprendizaje de funciones discriminantes - no separable.png]]

# Funcionamiento

- El algoritmo se repite hasta que no se cometan errores (o se haya superado el número máximo de iteraciones $M$).
    - Durante cada iteración del algoritmo, se itera por cada $\mathrm{y}_{n}$.
        - Por cada iteración de $\mathrm{y}_{n}$, se itera por todas las clases $c \in [0, C]$ menos la que ya sabemos que corresponde a $\mathrm{y}_{n}$.
            - Por cada iteración de $c$ se comprueba si $\mathrm{a}_{c}^{t} \mathrm{y}_{n} + b > \mathrm{a}_{c_{n}}^{t} \mathrm{y}_{n}$. Si es el caso:
                - Se ha cometido un error
                - $\mathrm{a}_{c}$ pasa a ser $\mathrm{a}_{c} - \alpha · \mathrm{y}_{n}$
        - Si se ha cometido un error:
            - $\mathrm{a}_{c_{n}}$ pasa a ser $\mathrm{a}_{c_{n}} + \alpha · \mathrm{y}_{n}$

> [!NOTE]
> Nótese que $\mathrm{a}_{c_{n}}$ es el vector de pesos del vector que debería reconocer la clase correctamente, mientras que los $a_{c}$ que pasan la condición son los vectores de pesos que se han identificado incorrectamente.
> 
> A los primeros se les suma $\alpha · \mathrm{y}_{n}$, mientras que a los segundos se les resta.

Siendo $m$ el número de muestras bien clasificadas y $N$ el número de muestras:

$$
\begin{align}
&\textbf{Repeat} \\
&\quad m \gets 0 \\
&\quad \textbf{For Each} \ \mathrm{y}_{n} \\
&\quad \quad err \gets \texttt{false} \\
&\quad \quad \textbf{For Each} \ c \in [0, C] : c \neq c_{n} \\
&\quad \quad \quad \textbf{If} \ 
   \mathrm{a}_{c}^{t} \mathrm{y}_{n} + b > \mathrm{a}_{c_{n}}^{t} \mathrm{y}_{n} \\
&\quad \quad \quad \quad \mathrm{a}_{c} \gets \mathrm{a}_{c} - \alpha · \mathrm{y}_{n} \\
&\quad \quad \quad \quad err \gets \texttt{true} \\
&\quad \quad \textbf{If} \ err = \texttt{true} \\
&\quad \quad \quad \mathrm{a}_{c_{n}} \gets \mathrm{a}_{c_{n}} + \alpha · \mathrm{y}_{n} \\
&\quad \quad \textbf{Else} \\
&\quad \quad \quad m \gets m+1 \\
&\textbf{Until} \ m \geq N
\end{align}
$$

# Datos de salida

El algoritmo devuelve un conjunto de vectores de pesos $\{ \mathrm{a}_{c} \}^{*}$ tal que se minimicen los errores cometidos por $\{ \mathrm{a}_{c} \}$.

$$
\{ \mathrm{a}_{c} \}^{*} =
\underset{\{ \mathrm{a}_{c} \}}{\mathrm{argmin}} \
\sum_{n} \left[
    \max_{c \neq c_{n}} \left(
        \mathrm{a}_{c}^{t} \mathrm{y}_{n} + b 
    \right)
    >
    \mathrm{a}_{c_{n}}^{t}\mathrm{y}_{n}
\right], \quad
\left[B\right] = \begin{cases}
1 \text{ si } B = \texttt{true}\\
0 \text{ si } B = \texttt{false}
\end{cases}
$$