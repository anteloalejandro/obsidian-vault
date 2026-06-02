
# Algoritmo simplex

El algoritmo simplex se compone de las siguientes etapas:
- Inicialización: Se encuentra una solución básica inicial $SB_{0}$.
- Prueba de optimalidad: Si la solución básica actual $SB_{i}$ es óptima, se finaliza el algoritmo, si no, se pasa a iteración.
- Iteración: Se encuentra una solución básica factible $SB_{i+1}$ adyacente mejor que la actual.

> [!info] Solución Básica
> Es una solución del sistema con $n$ variables de decisión y holgura, y $m$ restricciones, para la cual se han igualado a 0 $n-m$ y se ha resuelto el sistema de $m$ ecuaciones con $m$ variables.
> 
> *El punto extremo siempre es solución básica*.
> 
> En definitiva, tendremos $n-m$ variables **no básicas** (iguales a 0) y las $m$ variables restantes serán **básicas** (distintas a 0).
> 
> *Buscaremos soluciones que, además de básicas, sean **factibles**.*
> 
> Una solución básica también será **adyacente** si sus conjuntos **sólo distan en una variable básica**.

Ahora ser verá el funcionamiento de la tabla simplex en base al siguiente ejemplo:

**Función objetivo**
$$
Max\ z = 3x_{1} + 5x_{2}
$$

**Restricciones**
$$
\begin{align}
& x_{1} \leq 4 \\
& 2x_{2} \leq 12 \\
& 3x_{1} + 2x_{2} \leq 18 \\
& x_{1}, x_{2} \geq 0
\end{align}
$$

**Restricciones en forma estándar**
$$
\begin{align}
& x_{1} &+x_{3} & & &= 4 \\
& 2x_{2} & & +x_{4} & &=12 \\
& 3x_{1} + 2x_{2} & & & +x_{5} &= 18 \\
& x_{j} \geq 0 \quad 1 \leq j \leq 5
\end{align}
$$

## Tabla Simplex


| Ecuación: VB | $x_{1}$ | $x_{2}$ | $x_{3}$ | $x_{4}$ | $x_{5}$ | $b_{i}$     |
| ------------ | ------- | ------- | ------- | ------- | ------- | ----------- |
| E1: $x_{3}$  | 1       | 0       | 1       | 0       | 0       | 4           |
| E2: $x_{4}$  | 0       | 2       | 0       | 1       | 0       | 12          |
| E3: $x_{5}$  | 3       | 2       | 0       | 0       | 1       | 18          |
| **CR**       | **-3**  | **-5**  | **0**   | **0**   | **0**   | **$z = 0$** |
^simplex-1

### Inicialización

En la tabla simplex, se dan las siguientes condiciones:
- Las variables básicas son aquellas que tienen en su coeficiente (celda) valor **0 en todas las filas menos una**.
- Si es básica, cuando su coeficiente no es 0, **es 1**.
- Cada ecuación **solo tiene una** variable básica con valor no-cero, o sea, 1.
- La ultima ecuación es una excepción, es el **coeficiente reducido**. Lo que hacemos es pasar reorganizar la función objetivo $z = 3x_{1}+5x_{2} \to z - 3x_{1} - 5x_{2} = 0$ y en lugar del $b_{i}$ obtenemos el valor de la función objetivo para estos coeficientes (inicialmente siempre 0).

*Dadas estas condiciones, las variables de holgura siempre serán las variables básicas iniciales sin importar el modelo.*

Para la solución factible inicial, se toma 0 como valor para todas las variables de decisión, en este caso $x_{1},x_{2} = 0$. En realidad, como ya se ha mencionado antes en cada iteración se cogen las no básicas y se les pone valor 0.

Esto tiene la ventaja de que siempre sabemos la solución a golpe de vista. Por ejemplo, en este caso, la solución básica es $x_{1}=x_{2}=0,\,x_{3}=4,\,x_{4}=12,\,x_{5}=18,\, z=0$

Para comprobar que la solución es **factible**, se miran los coeficientes de las variables básicas en la fila CR. Si todas son igual o mayores que 0, es factible.

### Optimalidad

Para comprobar si la solución es óptima, tenemos que entender primero que representan los coeficientes de las variables no básicas en la tabla simplex.

Dada la fila de una ecuación, los coeficientes son cuanto decrementa la variable básica que tiene en $1$ la dicha fila por cada unidad de variable correspondiente a la ecuación que **entra en la solución**. En el ejemplo, por cada $x_{2}$ que entra en la solución, $x_{4}$ decrementa en 2 y $z$ *incrementa* en 5 porque el coeficiente es negativo.

**Por tanto, si aún se puede incrementar el valor de $z$, aún no tenemos la solución óptima.** Como buscamos soluciones básicas adyacentes, sólo escogeremos haremos que entre una de las variables, la que mayor incremento dé, y tendremos que hacer que otra salga.


> [!info]+ Entrar y sacar variables de la base
> Entrar variables en la base hace referencia a hacerlas variables básicas. En cada iteración meteremos una variable en la base hasta alcanzar la solución óptima, pero como hemos de tener exactamente $m$ variables básicas, una de las que ya son básicas tendrá que salir.
> 
> La variable que sale de la base se calcula a partir de los valores en la columna de la variable que entra en la base. Cada celda o cociente de esa columna (excluyendo el CR) está asociada a una variable básica, más concretamente a una disminución del valor de la variable por cada unidad que entra en la base.
> 
> Como el valor de estas variables debe mantenerse superior o igual a 0, no se puede disminuir su valor tanto como se quiera, y tendremos que limitar las unidades que entran en la base para que todas las variables básicas sean iguales o superiores a 0.
> 
> En el ejemplo anterior, cada unidad de $x_{2}$ introducida en la base disminuye en 2 a $x_{4}$ y a $x_{5}$, y en 0 a $x_{3}$. Por tanto, la máxima reducción que se puede hacer es la máxima que cumpla $12 - 2·x_{2_{\text{introducida}}} \geq 0$ y $18 - 2·x_{2_{\text{introducida}}} \geq 0$, que sería 6. La variable que saldrá es la que nos limite más la cantidad de $x_{2}$ que podemos introducir en la base, que en este caso es $x_{4},\,b_{2} = 12$, que será reemplazado por $x_{2}$ en la próxima tabla que se construya.
> 
> La forma más sencilla es hacer la división entera de $b_{i}$ y la $i$-ésima celda de la columna de la variable que entra en la base, y coger el mínimo.
> 
> No se acaba aquí el proceso, sin embargo. Ahora que sabemos por cuál se va a sustituir, necesitamos que la nueva columna $x_{2}$ tenga el mismo valor que la vieja columna $x_{4}$ para mantener la matriz de identidad (sólo un 1 por variable básica, al que llamaremos **pivote**, y el resto de la columna en 0, **semipivotes**).
> 
> Esto se consigue tratando a la tabla de nuevo como un sistema de ecuaciones y aplicando operaciones matriciales como con el método de Gauss, por lo que afectará a otros resultados de otras columnas.
> 
> Por norma general, intentaremos que el pivote primero tenga valor 1 haciendo una división, y luego reduciremos los semipivotes mediante restas con el pivote.
> 
> En este ejemplo, haremos las operaciones $\frac{1}{2} R_{2} \to -2R_{2} + R_{3} \to 5R_{2} + R_{4}$.

Cuando se alcance la solución óptima, extraer otros dos datos de la línea CR:
- Los coeficientes asociados a variables de holgura dan el coste de oportunidad de dichas variables.
- Los coeficientes asociados a variables decisión dan el coste reducido de dichas variables.

### Iteración

**Tabla simplex, segunda iteración**

Recordemos que la tabla estaba así...
![[#^simplex-1]]

...y que hemos decidido meter la $x_{2}$ en la base y sacar a la $x_{4}$...

| Ecuación: VB | $x_{1}$ | $x_{4}$ | $x_{3}$ | $x_{2}$ | $x_{5}$ | $b_{i}$     |
| ------------ | ------- | ------- | ------- | ------- | ------- | ----------- |
| E1: $x_{3}$  | 1       | 0       | 1       | 0       | 0       | 4           |
| E2: $x_{2}$  | 0       | 1       | 0       | 2       | 0       | 12          |
| E3: $x_{5}$  | 3       | 0       | 0       | 2       | 1       | 18          |
| **CR**       | **-3**  | **0**   | **0**   | **-5**  | **0**   | **$z = 0$** |
Ahora hemos de aplicar las operaciones $\frac{1}{2} R_{2} \to -2R_{2} + R_{3} \to 5R_{2} + R_{4}$ para mantener la matriz de identidad formada por las variables básicas.

| Ecuación: VB | $x_{1}$ | $x_{4}$ | $x_{3}$ | $x_{2}$ | $x_{5}$ | $b_{i}$      |
| ------------ | ------- | ------- | ------- | ------- | ------- | ------------ |
| E1: $x_{3}$  | 1       | 0       | 1       | 0       | 0       | 4            |
| E2: $x_{2}$  | 0       | 1/2     | 0       | 1       | 0       | 6            |
| E3: $x_{5}$  | 3       | -1      | 0       | 0       | 1       | 6            |
| **CR**       | **-3**  | **5/2** | **0**   | **0**   | **0**   | **$z = 30$** |

El nuevo estado de la tabla simplex nos dice que el valor de la función objetivo ha mejorado de 0 a 30 y que cambiar $x_{4}$ resultaría en un valor de $z$ inferior. 

**Tabla simplex, tercera iteración**

Sólo queda $x_{1}$ por meter en la base, que provoca una disminución por unidad introducida de $1$ en $x_{3} = 4$ y de $3$ en $x_{5} = 6$. Ya que $6 / 3 = 2 < 4 / 1 = 4$, será $x_{5}$ el que salga.

Se tendrán que hacer las operaciones $\frac{1}{3} R_{3},\,-R_{3} + R_{1},\,3R_{3} + R_{4}$, además de intercambiar las columnas, lo que da el siguiente resultado:

| Ecuación: VB | $x_{5}$ | $x_{4}$                | $x_{3}$ | $x_{2}$ | $x_{1}$ | $b_{i}$      |
| ------------ | ------- | ---------------------- | ------- | ------- | ------- | ------------ |
| E1: $x_{3}$  | -1/3    | 1/3                    | 1       | 0       | 0       | 2            |
| E2: $x_{2}$  | 0       | 1/2                    | 0       | 1       | 0       | 6            |
| E3: $x_{1}$  | 1/3     | -1/3                   | 0       | 0       | 1       | 2            |
| **CR**       | **1**   | *5/2 - 1 =*<br>**1.5** | **0**   | **0**   | **0**   | **$z = 36$** |
Como cambiar las cualquiera de las variables no básicas resultaría en una disminución de $z$, hemos alcanzado la solución óptima, que es $x_{1}=2,\,x_{2}=6$, y el valor óptimo, que es $z=36$.

También sabemos que los dos coeficientes que quedan en la fila CR, que están asociados a variables de holgura, nos dan el coste de oportunidad de la restricción. Concretamente:
- Costes de oportunidad:
    - En un aumento en una unidad de $x_{5}$, el valor de $z$ bajará en 1.
    - En un aumento en una unidad de $x_{4}$, el valor de $z$ bajará en 1.5.
    - $x_{3}$ es básica y de holgura, así que no hay coste de oportunidad.
- Holguras
    - $x_{4}$ y $x_{5}$ son variables de holgura no básicas, lo que quiere decir que para la restricción 2 y 3 no hay holgura (limitativas). Esto también implica que la solución está en la intersección de ambas restricciones.
    - $x_{3}$ es básica y tiene 2 como valor, así que la restricción 1 tiene 2 unidades de holgura (hacia la izquierda).

# Simplex Revisado

Es una versión modificada del simplex con tablas que trata de reducir la cantidad de cálculos y memoria.

Volviendo al ejemplo del simplex...
![[#^simplex-1]]

En la primera iteración del problema, sólo necesitamos saber:
- El contenido de la columna $b_{i}$ para saber el valor de las variables básicas. No hace falta la matriz de identidad, porque ya sabemos que en la primera iteración siempre son las de holgura.
- Las celdas correspondientes a las variables no básicas (que serán las de decisión) de la línea CR.
- La columna que se va a insertar en la base, según el valor de las celdas no básicas de CR, para determinar la variable que va a salir de la base.
- El valor de la función objetivo.

En todas las subsecuentes iteraciones también es suficiente con esta información a la hora de determinar los pasos a seguir.

Algunos de estos datos, sin embargo, dependen de otros datos de la tabla que a priori no son obligatorios. Por tanto, el objetivo es encontrar unas fórmulas que nos permitan sacar los datos necesarios en cada iteración.

Primero pasaremos de representar los modelos de programación lineal en forma estándar a representarlos en **forma matricial**, y convertir este modelo en forma matricial a la nomenclatura del Simplex revisado.

$$
\begin{matrix}
\text{Max}\ z = c^{t}x \\
Ax = b \\
x \geq 0
\end{matrix}
\Huge\equiv\normalsize
\begin{matrix}
\text{Max}\ z = c^{t}_{B}\ x_{B} + c^{t}_{NB}\ x_{NB} \\
B\ x_{B} + NB\ x_{NB} = b \\
x_{B},x_{NB} \geq 0
\end{matrix}
$$

> [!NOTE] Nomenclatura del Simplex Revisado
> $x_{B}$: Vector de variables básicas
> $c^{t}_{B}$: Vector de coeficientes asociados a variables básicas en la función objetivo
> $x_{NB}$: Vector de variables no básicas
> $c^{t}_{NB}$: Vector de coeficientes asociados a variables no básicas en la función objetivo
> $B$: Matriz cuyas columnas son vectores $c_{B}^{t}$.
> $NB$: Matriz cuyas columnas son vectores $c^{t}_{NB}$.
> $b$: Vector de los lados derechos de las restricciones

> [!NOTE] Cálculo de la solución
> Para calcular el valor de una solución $x_{B}$, se deberá despejar a partir del sistema de ecuaciones de las restricciones $B\ x_{B} + NB\ x_{NB} = b$. Normalmente restaríamos, pero como estamos trabajando con matrices directamente multiplicamos ambos lados por $B^{-1}$.
> $$
> \begin{align}
> B^{-1}B\ x_{B} + B^{-1}NB\ x_{NB} &= B^{-1}b \\
> x_{B} + B^{-1}NB\ x_{NB} &= B^{-1}b &  B^{-1}B \text{ es matriz de identidad} \\
> x_{B} &= B^{-1}b &  x_{NB} = 0 \\
> \end{align}
> $$
> Por tanto, la solución se puede sacar a partir los coeficientes de las variables básicas y de el lado derecho de las restricciones.

> [!NOTE] Cálculo de las Variables Básicas
> Para calcular cuáles son las nuevas variables básicas necesitamos la columna de los coeficientes de la variable que entra (para lo que hace también falta las variables no básicas en CR).
> 
> Haciendo el producto de matrices $B^{-1}\ NB$ obtenemos una nueva matriz que es igual a la parte no básica de la tabla simplex después de haber hecho el cambio de columnas y aplicar Gauss para conservar la matriz de identidad de las variables básicas.
> 
> Siendo $a_{i}$ columna de $NB$, podemos generalizar y decir que, para sacar la columna de una variable no básica cualquiera, podemos hacerlo haciendo el producto $y_{i} = B^{-1}\ a_{i}$.
>
> Por tanto, para sacar la columna de variables no básicas con la que calcular que variable sale de la base, cogemos la columna $JE$, que es la que mejor básica tiene en CR y por tanto la que va a entrar en la base, y sacamos su $y_{JE}$.
> 
> Para calcular los valores no básicos en la línea CR, debemos calcular los $c_{j} - z_{j}$. $c_{j}$ se conoce porque es la $j$-ésima columna de $B$, pero $z_{j}$ hay que calcularlo.
> $$
> z_{j} = \sum^{m}_{i} c_{i} a_{ij} = c^{t}_{B} y_{j} = \underbrace{ (c^{t}_{B}B^{-1}) }_{ \text{común } \forall z_{j} }a_{j}
> $$
> El $JE$ será la $j$ del $c_{j}-z_{j}$ de mejor valor.

> [!NOTE] Valor de la función objetivo
> El **valor** de la función objetivo para una solución básica dada se calcula simplemente con el producto de los coeficientes básicos y las variables básicas.
> $$
> z = c^{t}_{B}\ x_{B}
> $$

Como conclusión, el único dato que hace falta calcular, que no esté ya en el modelo original es $B$ o su inversa $B^{-1}$, por lo que se agiliza mucho la computación y, sobre todo, el uso de memoria respecto a la tabla simplex. Los datos propios del modelo, además, son constantes, así que no hace falta actualizarlos en cada iteración.

Además, ya que sólo dependemos de $B$, que tiene una dimensión de $m\times m$, la complejidad del Simplex revisado sólo depende del número de restricciones, a diferencia de la tabla Simplex que también depende de las variables.

Para no calcular $B$ y $B^{-1}$ cada vez, usaremos $B^{-1}$ todo el tiempo y le aplicaremos las mismas operaciones que le aplicaríamos a $B$ para formar la matriz de identidad, como si $B^{-1}$ tuviese los mismos valores que $B$. Esto implica que el resultado de $B^{-1}$ no tiene necesariamente por qué ser la matriz de identidad.