
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