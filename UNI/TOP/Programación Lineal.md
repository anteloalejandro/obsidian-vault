
Un modelo de programación matemática lineal se compone de una **función objetivo** y una serie de **restricciones**, ambos expresados en términos de unas **variables de decisión** del problema.

> [!NOTE]- Variables de decisión
> Las **variables de decisión** son aquellos aspectos del problema que se pueden **controlar** y se les puede dar un valor numérico. Son lo que se busca averiguar para resolver el problema.
> $$
> x_{j} \geq 0 \quad j = 1,2,\dots,n
> $$

> [!NOTE]- Parámetros de decisión
> Los **parámetros de decisión** son constantes que no se pueden controlar.
> 
> Según con qué estén relacionados, se les denota de una forma u otra:
> - $c_{j}$ para los coeficientes de las variables de decisión en la **función objetivo**.
> - $b_{i}$ para los valores límite en la mano derecha de **las restricciones**.
> - $a_{ij}$ para los coeficientes de las variables de decisión en **las restricciones**.
> 

> [!NOTE]- Restricciones
> Las **restricciones** son limitaciones que se deben cumplir.
> 
> Se distingue entre restricciones de requerimiento $\geq$, limitación $\leq$ o igualdad $=$.
> $$
> \begin{gather}
> a_{11}x_{1} + a_{12}x_{2} + \dots a_{1n}x_{n} \leq,=,\geq b_{1} \\
> \dots \\
> a_{m 1}x_{1} + a_{m 2}x_{2} + \dots a_{m n}x_{n} \leq,=,\geq b_{m}
> \end{gather}
> $$
> *En programación lineal siempre añadiremos una restricción que indique que todas las variables son no-negativas*

> [!NOTE]- Función objetivo
> La **función objetivo** define la efectividad del sistema en base unas variables de decisión. Las hay de minimización y maximización.
> $$
> Min, Max \quad z = c_{1}x_{1} + c_{2}x_{2} + \dots + c_{n}x_{n}
> $$

En concreto, lo que diferencia a la programación lineal de otros tipos de programación matemática, es que no se pueden multiplicar variables de condición entre sí, por lo que sólo produce funciones de optimización y restricciones lineales.

# Formulación de modelos

Por norma general, se siguen vagamente los siguientes pasos:
1. Identificar *verbalmente* las **variables decisión**. Ayuda tener claro qué órdenes o acciones deben ser obtenidas del modelo.
2. Expresar el **objetivo** del modelo.
3. Expresar la **función objetivo** que cumple con dicho objetivo en términos de las variables de decisión.
4. Expresar cada restricción en palabras, prestando atención a su tipo (requerimiento, limitación o igualdad).
5. Expresar cada restricción en términos de las variables de decisión y comprobar que las unidades son consistentes.

Si bien se puede hacer cada modelización a medida siguiendo los pasos anteriores, también se suele hacer uso de **modelos tipo**. Estos son problemas comunes en la realidad para los que ya tenemos, en lineas generales, un modelo con una estructura y características existentes bien definidas.

## Planificación de la producción

Son tipos de problemas en las que se tiene que **planificar la producción** (o realización de actividades) de diferentes cosas **maximizando el beneficio** o **minimizando el coste**, teniendo en cuenta una serie de restricciones de **disponibilidad de recursos**, **demanda mínima**, y demás.

> [!example] Ejemplo
> Una compañía vende tres productos: $P_{1}$, $P_{2}$, $P_{3}$. La demanda semanal de cada producto es de 100 unidades. La compañía puede comprar los productos de un suministrador independiente a los siguientes costes:
> 
> 
> 
> | $P_{1}$ | $P_{2}$ | $P_{3}$ |     |
> | ------- | ------- | ------- | --- |
> | 1.8     | 1.2     | 0.9     | €   |
> 
> También puede fabricarlos ella misma utilizando su capacidad de producción, para lo cual necesita procesar cada artículo a través de dos líneas de ensamblaje, en cada una de las cuales dispone de 40h de trabajo semanales.
> 
> Las horas de trabajo que necesita cada unidad de artículo en cada línea vienen dadas por la siguiente tabla:
> 
> 
> 
> 
> |         | L1  | L2  |
> | ------- | --- | --- |
> | $P_{1}$ | 4   | 5   |
> | $P_{2}$ | 7   | 6   |
> | $P_{3}$ | 2   | 3   |
> 
> Los costes de producción por unidad de producto fabricada son respectivamente 1.5, 1 y 0.7 euros.
> 
> *Plantea un modelo de programación lineal que permita saber cuántos productos de cada tipo se debe comprar y cuántos debe fabricar para satisfacer la demanda y minimizar los costes totales.*
> 
> > [!success]- Solución
> > **Variables decisión** ← lo que podemos controlar
> > 
> > - Productos comprados de tipo $i$: $PC_{i}\quad i=1,2,3$.
> > - Productos fabricados de tipo $i$: $PF_{i}\quad i=1,2,3$.
> > 
> > **Función objetivo** ← lo que debemos conseguir
> > 
> > Debemos minimizar los costes de producción. Los costes vienen dados por cuántas unidades de cada tipo compramos al suministrador independiente y cuántas se producen en la fábrica, y en todos los casos tienen un coste diferente.
> > $$
> > Min \quad z = 1.8 PC_{1} · 1.2 PC_{2} · 0.9 PC_{3} + 1.5PF_{1} + 1PF_{2} + 0.7PF_{3}
> > $$
> > 
> > **Restricciones** ← limitaciones, disponibilidad de recursos, demanda, etc.
> > 
> > *Por disponibilidad de recursos (horas de trabajo semanales / ud)*
> > $$
> > \begin{align}
> > \text{L1} &: 4PF_{1} + 7PF_{2} + 2PF_{3} \leq 40 \\
> > \text{L2} &: 5PF_{1} + 6PF_{2} + 3PF_{3} \leq 40
> > \end{align}
> > $$
> > 
> > *Por demanda (ud / semana)*
> > $$
> > \begin{align}
> > \text{Demanda } P_{1} &: PC_{1} + PF_{1} \geq 100 \\
> > \text{Demanda } P_{2} &: PC_{2} + PF_{2} \geq 100 \\
> > \text{Demanda } P_{3} &: PC_{3} + PF_{3} \geq 100 \\
> > \end{align}
> > $$
> > 
> > *No-negatividad*
> > $$
> > \text{no-neg } : PC_{i},\, PF_{i} \geq 0 \quad i = 1,2,3
> > $$
> 

## Mezclas y dietas

Son comunes en la industria alimentaria, metalúrgica y petrolífera. Consisten en **combinar conjuntos de materias primas** en un producto final terminado, buscando que el **coste por unidad de producto final** sea mínimo (o, en el caso de las dietas, maximizar el valor nutricional) cumpliendo ciertos **estándares de calidad**. 

En estos casos las variables hacen referencia a la cantidad (normalmente un porcentaje o proporción) de materia primera que ha de incluirse en la mezcla.

> [!example] Ejemplo
> La compañía DíazCafé mezcla tres tipos de granos de café (Brasil, Colombia y Perú) para ser molido y vendido al por menor.
> 
> Cada grano tiene, entre otras características, el aroma y la intensidad, y la compañía tiene un catador que puede valorar estas características en una escala de 1 a 100.
> 
> Las propiedades del grano de café según su procedencia son las que se incluyen en la siguiente tabla.
> 
> 
> | Grano    | Aroma | Intensidad | Coste / kg | Disponibildad (kg) |
> | -------- | ----- | ---------- | ---------- | ------------------ |
> | Brasil   | 75    | 15         | 0.5 €      | 1 500 000          |
> | Colombia | 60    | 20         | 0.6 €      | 1 200 000          |
> | Perú     | 85    | 18         | 0.7 €      | 2 000 000          |
> 
> La compañía desea obtener una mezcla con un ratio de aroma de al menos un 78 y un ratio de fuerza de al menos 16. El suministro de los distintos tipos de grano está limitado a las cantidades que se indican en la tabla, y todo el grano se suministra según un acuerdo previo.
> 
> *DíazCafé desea obtener 4 millones de kilogramos de mezcla al menor coste posible*
> 
> > [!success]- Solución
> > **Variables decisión**
> > 
> > Cantidad de cada tipo de café (kg): $B,C,P$.
> > 
> > **Función objetivo**
> > $$
> > Min\ z = 0.5B + 0.6C + 0.7P
> > $$
> > 
> > **Restricciones**
> > 
> > *Por mezcla de materias primas*
> > 
> > Tenemos que sacar una proporción, pero no se puede ni multiplicar ni dividir variables de decisión. Si podemos, a pesar de todo, multiplicar en ambos lados de la igualdad/desigualdad.
> > $$
> > \begin{align}
> > \text{intensidad} &: 15B + 20C + 18P \geq 16 · (P + B + C) \\
> > \text{aroma} &: 75B + 60C + 85P \geq 78 · (P + B + C)
> > \end{align}
> > $$
> > 
> > *Por disponibilidad*
> > $$
> > \begin{align}
> > \text{Demanda B}&: B \leq \pu{ 1.5e6 } \\
> > \text{Demanda C}&: C \leq \pu{ 1.2e6 } \\
> > \text{Demanda P}&: P \leq \pu{ 2e6 }
> > \end{align}
> > $$
> > 
> > *Por requisitos*
> > $$
> > \text{mezcla }: B+C+P = \pu{ 4e6 }
> > $$
> > 
> > *No-negatividad*
> > $$
> > \text{no-neg}: B,C,P \geq 0
> > $$
> 

## Planificación multiperiodo - intervalos

También conocida como modelo planificación dinámica, este modelo consiste en optimizar la **producción o mezcla** a lo largo de **varios periodos de tiempo** regulares (semanas, meses, etc.), por lo que se busca saber **qué producir y cuándo hacerlo**. Se usan cuando algunos parámetros (constantes) fluctúan en el transcurso de dichos periodos.

Tienen la particularidad de que se puede elaborar un producto / mezcla durante un periodo, **almacenarlo**, y venderlo o usarlo en los periodos siguientes. Hacen uso de **sub-modelos**, como los de mezcla o producción, que se relacionan mediante **variables de inventario** que pasan de un periodo al siguiente, como el almacenamiento.

Entre las restricciones comunes en este tipo de problemas se incluyen:
- Capacidad de almacenamiento de los recursos disponibles
- Demanda a satisfacer en cada periodo
- **Equilibrio** entre las unidades disponibles y producidas

En esencia, cada periodo es un pequeño problema de modelado, con un montón de hermanos que tienen las mismas variables y parámetros, pero cada uno con su versión con valores potencialmente distintos. Además, tenemos restricciones que tendrán que cumplirse antes de pasar al siguiente periodo.

> [!info] Restricciones
> Las restricciones más comunes, siendo $i$ el periodo actual, son de la forma...
> $$
> \begin{align}
> \text{Ventas}_{i} &\leq \text{Disponibilidad}_{i} \\
> \text{Ventas}_{i} + \text{Inventario}_{i}
> &= \text{Producción}_{i} + \text{Inventario}_{i-1} 
> \end{align}
> $$
> Sin embargo, nos podemos encontrar con cualquiera de las siguientes variaciones:
> - Las $\text{Ventas}_{i}$ pueden estar fijadas de antemano o no
> - Puede haber **mermas** (pérdidas de producto) que hagan que **sólo una parte** de $\text{Producción}_{i-1}$ sea aprovechable durante el periodo $i$.
> - Cuando se trabaja con **inversiones**, en cada periodo $i$ se reciben los rendimientos de las inversiones de todos los periodos anteriores.

# Resolución gráfica

Para resolver gráficamente un problema de programación lineal, debemos entender primero dos conceptos:
- **Solución posible:** Es un valor que satisface simultáneamente todas las restricciones del sistema.
- **Región factible:** Es el área creada por todas las soluciones posibles del sistema.

La resolución gráfica sólo es práctica para resolver problemas con dos variables $x_{1},x_{2}$, pero ayuda a conceptualizar el resto de métodos de resolución.

Para resolver gráficamente primero necesitamos un plano con $x_{1}$ y $x_{2}$ como ejes. Como está la restricción de no-negatividad en cualquier modelo de programación lineal, el plano estará exclusivamente en el primer cuadrante del plano cartesiano.

Primero se grafican las restricciones, para lo que se dibuja una recta como si fuesen una igualdad.

 Una vez estén todas las rectas dibujadas, habrá que representar la intersección entre las áreas formadas por las restricciones, que será el área en el que se cumplen todas y, por tanto, la región factible. Para ello, por cada restricción, si es una limitación $\leq$ se considera el área a la izquierda de la recta, y si es un requerimiento $\geq$ el área a la derecha.

![[Programación Lineal - región factible.png]]

Con esto tenemos todas las posibles soluciones, pero no la solución óptima. Para calcularla se deben graficar las líneas isométricas a la función objetivo, simplemente dándole valores arbitrarios a la $z$ que irán subiendo o bajando según el objetivo sea maximizar o minimizar.

![[Programación Lineal - isobeneficio.png]]

Así, en algún momento se llegará al último valor de $z$ para el cual la función objetivo toca la región factible, llamado **punto extremo**, que es el punto en el que se obtienen las $x_{1},x_{2}$ que optimizan el valor de $z$.

![[Programación Lineal - resolución gráfica.png]]

> [!NOTE] ¿Cuántas soluciones óptimas?
> Es posible que la recta de la función objetivo sea paralela a una de las restricciones que dibujan los límites de la región factible. En ese caso habrá infinitas soluciones a lo largo de ese lado de la región factible, en vez de una sola.
> 
> En el resto de los casos, si hay solución factible, estará en una esquina en la que intercedan dos restricciones.

Una restricción puede ser redundante, es decir, hay restricciones que, aunque las quitemos, no afectan a la solución óptima. El motivo más común es que haya otra que acote más la región factible o que la función objetivo crece en una dirección distinta a por donde acota la restricción.

![[Programación Lineal - restricción redundante.png]]

# Forma estándar de un problema lineal

Un problema está en forma estándar si se cumplen todas las siguientes condiciones:
- Todas las restricciones son igualdades
- Todas las variables de decisión son no-negativas.

La forma de convertir a todas las restricciones en igualdades es introduciendo una **variable de holgura** en cada restricción con una desigualdad, y pasando dicha desigualdad en una igualdad.


> [!NOTE] Holgura
> La holgura es la diferencia entre el lado izquierdo y derecho de una restricción.
> 
> Representa cuánto puede moverse una restricción antes de afectar a la solución óptima. En el ejemplo de la región factible, dadas las restricciones de la siguiente figura, DEPTO2 y DEPTO3 son limitativas porque la solución óptima está en su intersección ($C$), así que sus variables de holgura son $x_{5} = x_{3} = 0$
> 
> Por otro lado, DEPTO1 es un recurso sobrante con una holgura de $x_{4} = 4-2 = 2$
> 
> ![[Programación Lineal - holgura.png]]


La holgura representa como de lejos pueden estar los valores de la recta formada por la restricción sin dejar de ser soluciones posibles.

Esta variable sumará o restará al lado izquierdo según la dirección de la desigualdad. Intuitivamente, la variable sumará si la desigualdad es $\leq$ para que las soluciones posibles captadas por la restricción, que están a la izquierda de la recta, pasen a estar pegados a ella.

$$
\begin{align}
a_{ij}x_{j} \leq b_{i} &\longrightarrow a_{ij}x_{j} + x_{holgura} = b_{i} \\
a_{ij}x_{j} \geq b_{i} &\longrightarrow a_{ij}x_{j} - x_{holgura} = b_{i}
\end{align}
$$

Si dada una solución óptima, una de las restricciones tiene una variable de holgura con valor 0, se dice que esa restricción es **limitativa**, activa, o un cuello de botella. En caso contrario, se dice que es una **restricción de holgura**.

# Análisis de sensibilidad

Dado un  problema lineal, el análisis de sensibilidad nos da herramientas para estudiar no sólo la solución óptima, si no también como de susceptible a cambios es y como volver a calcular la solución óptima tras el cambio en un parámetro sin volver a resolver todo el modelo.

## A.S. de los coeficientes la función objetivo

Intenta determinar el intervalo de variación de los parámetros de decisión $c_{i}$ de la función objetivo para los que la solución óptima de la función objetivo **no cambia**.

> [!warning] Solución óptima vs valor óptimo
> Que la solución óptima no cambie quiere decir que el valor de las variables de decisión y holgura no cambia.
> No ha de confundirse con el valor óptimo de la función objetivo, que es el valor de $z$, que puede cambiar si la variable de decisión asociada a $c_{i}$ es distinta de 0.

Gráficamente, la nueva función óptima $z$ tendrá un ángulo distinto, por lo que podemos saber si la solución óptima ha cambiado haciendo de nuevo las rectas isométricas de $z'$.

![[Programación Lineal - análisis de sensibilidad coeficientes.png]]

También sabemos que cualquier cambio en $c_{i}$ en una dirección siempre produce el mismo cambio (aumento o disminución) en el valor óptimo siempre que esté dentro del intervalo de variación, y cualquier cambio igual en la dirección opuesta produce el cambio contrario.

Concretamente, si se modifica el coeficiente de $x_{1}$ en la función objetivo, cada incremento de una unidad en el coeficiente se traduce en un incremento del valor óptimo igual a la componente $x_{1}$ del punto extremo (solución óptima). En el ejemplo anterior, cada incremento de una unidad en el coeficiente resulta en un incremento de 2 en $z$.

Los límites se calculan (en el caso de la resolución gráfica, con dos variables) sacando dos valores $z'$ y $z''$ que pasan por el punto extremo (en el ejemplo, $C$). El punto extremo está formado la intersección entre dos restricciones no redundantes $R_{1},R_{2}$, por lo que $z'$ modificará su $c'_{i}$ para que ser para ser paralelo con $R_{1}$ y $z''$ su $c''_{i}$ para ser paralelo con $R_{2}$.

Las funciones objetivo $z'$ y $z''$, usando las variables de la solución óptima, tendrán cada una un valor límite de $c_{i}$.

## A.S. vector de recursos

Calcula el **coste de oportunidad** de una restricción, que es a su vez la variación de la función objetivo por unidad añadida al $b_{i}$ (lado derecho) de la restricción. Los cambios en $b_{i}$ se traducen desplazamientos de la recta de la restricción, que a su vez dan lugar a aumentos o disminuciones en la región factible.

Asumiendo que el cambio en $b_{i}$ está dentro del intervalo de análisis de sensibilidad:
- Dada una restricción $\leq$ limitativa, la región factible **aumenta** conforme aumenta $b_{i}$, por lo que la función objetivo siempre será igual o mejor.
- Si la restricción es, en cambio, una $\geq$ limitativa, la región factible disminuye conforme aumenta $b_{i}$, así que la función objetivo siempre será igual o peor.
- Si no es limitativa la región factible se queda igual, así que no hay cambios en la solución óptima. Las restricciones tampoco afectan a los coeficientes de $z$, así que tampoco cambia el valor óptimo.
- En cualquier caso, las variables que son 0 siguen siéndolo y las que no siguen sin serlo. Es decir, **la solución básica no cambia**.

El intervalo de sensibilidad se saca sencillamente a partir de la variable de holgura.

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
Max\ z = c^{t}x \\
Ax = b \\
x \geq 0
\end{matrix}
\Huge\equiv\normalsize
\begin{matrix}
Max\ z = c^{t}_{B}\ x_{B} + c^{t}_{NB}\ x_{NB} \\
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