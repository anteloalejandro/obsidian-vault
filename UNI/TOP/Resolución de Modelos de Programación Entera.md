
Los modelos de programación entera son problemas en las que las variables del problema están definidas como números enteros. A diferencia de los modelos de programación lineal convencionales, en este tipo de problemas no se cumple la hipótesis de divisibilidad, ya que la división puede hacer que una de nuestras variables resulte en un número real.

Hay tres tipos de PPL entera:
- **Pura**, si todas las variables son enteras.
- **Mixta**, si algunas son enteras y otras continuas.
- **Binaria**, si todas las variables enteras son, además, binarias.

Las PPLE mixtas son las más comunes, pero a diferencia de las otras tiene infinitas soluciones.

Los PPLE **no cumplen la propiedad** de convexidad que sí cumplen los modelos de programación lineal clásicos. Esta propiedad es **necesaria para el algoritmo Simplex**.

Se introduce el concepto de **Relajación Lineal**, que es el problema de programación lineal resultante de obviar que las variables deben ser enteras. Al tener menos restricciones, el valor óptimo de la Relajación Lineal siempre es mejor o igual que el de la PPLE original (mayor si es maximización, menor si es minimización).

![[Resolución de Modelos de Programación Entera - Relajación lineal.png]]

Una opción que tenemos para solucionar los PPLE es hacer su Relajación Lineal y truncar los decimales de la solución. No podemos redondear, porque redondear puede darnos soluciones más allá de la región factible. Esto, sin embargo, no nos proporciona una solución óptima, sólo una posible.

Aparte de esto, tenemos dos posibles métodos para resolver esta clase de problemas. 

Primero, están los **algoritmos de planos de corte**, se saca la Relajación Lineal del problema, mientras la solución del problema no sea entera, se añaden restricciones (planos de corte) que cumple cualquier solución posible del problema original pero no cumple la solución óptima de la relajación lineal. Al final, se alcanza una solución óptima en un número finito de cortes, pero no es eficiente.

Segundo, están los algoritmos de bifurcación y acotación, también llamadas técnicas *branch and bound*. Estos algoritmos enumeran soluciones de forma que no es necesario comprobar todas las combinaciones posibles de valores de las variables. Es aplicable a PPLE puras o mixtas y se puede interrumpir en cualquier punto para obtener una solución aproximada, si calcular la solución real es excesivamente lento.

## Bifurcación y Acotación

1. Se considera sólo la relajación lineal del problema.
2. Si la solución obtenida no es entera, se selecciona una de las variables que aún tiene valor continuo, denotada por $x_{s} = a,b$ ($a$ es la parte entera y $b$ la decimal), y se crean dos problemas hijos del problema actual: uno en el que añadimos la restricción $x_{s} \geq a+1$ y otro en el que se añade la restricción $x_{s} \leq a$. A esta operación se le llama **Bifurcación**.
3. Se repite el proceso, seleccionando problemas en **cierto orden**, donde cada uno de los problemas con solución no entera genera 2 hijos cada vez. Cada uno de los problemas con solución entera se convierte en candidata a solución óptima. La mejor de las candidatas, llamada **incumbente**, se utiliza como *baseline* para el proceso de **Poda**, en el que se obvian problemas descendientes que no darían soluciones óptimas.


> [!NOTE] Restricciones del *Branch and Bound*
> Por la forma en la que se definen las restricciones de la bifurcación, la desigualdad funciona, a efectos prácticos, como una igualdad, ya que la variable siempre tendrá el valor del lado derecho de la igualdad.
>
> Esto sucede porque el valor óptimo de la función usando números reales siempre quiere tener un $x_{s} \leq a+1$ y $x_{s} \geq a$, es decir, se intentan acercar todo lo posible al valor original, que es el límite entre lo que hemos permitido y el original.
> 
> Esto sólo se aplica de un nodo a su hijo directo, pues una restricción posterior en otra variable puede modificar el valor de otras en la función objetivo.


> [!NOTE] Soluciones del *Branch and Bound*
> B&B va obteniendo soluciones cada vez más próximas a la solución óptima del PPLE, por lo que cuando se obtenga una solución entera para la relajación lineal, dicha solución también será la óptima para el problema original.


La poda consiste en dejar de explorar problemas descendientes que sabemos que no van a mejorar.
- Si la solución de un nodo es entera, ya es óptima para todo su subárbol, así que no seguimos explorando sus descendientes.
- Si la solución de un nodo no es entera y el valor de la función objetivo es peor que la mejor cota entera disponible, ninguno de sus descendientes será mejor, así que los obviamos.
- Si un nodo no tiene solución no tiene sentido tratar de generar sus descendientes.

> [!note] Cota Entera
> La cota entera (inferior si el objetivo es maximizar, superior si es minimizar) es la mejor solución hasta la fecha de un subproblema con solución entera.

Hay dos ordenes que podemos elegir para seleccionar que descendiente queremos solucionar:
- Cota más reciente: Esencialmente, es DFS. Requiere poca memoria pero tiene que examinar más nodos por norma general.
- Mejor cota (Jumptracking): Consiste en elegir el nodo con mejor valor óptimo entero o continuo. Consume mucha memoria en problemas grandes, pero recorre menos problemas.