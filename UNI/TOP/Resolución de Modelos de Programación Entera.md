
Los modelos de programación entera son problemas en las que las variables del problema están definidas como números enteros. A diferencia de los modelos de programación lineal convencionales, en este tipo de problemas no se cumple la hipótesis de divisibilidad, ya que la división puede hacer que una de nuestras variables resulte en un número real.

Hay tres tipos de PPL entera:
- **Pura**, si todas las variables son enteras.
- **Mixta**, si algunas son enteras y otras continuas.
- **Binaria**, si todas las variables enteras son, además, binarias.

Las PPLE mixtas son las más comunes, pero a diferencia de las otras tiene infinitas soluciones.

Los PPLE **no cumplen la propiedad** de convexidad que sí cumplen los modelos de programación lineal clásicos. Esta propiedad es **necesaria para el algoritmo Simplex**.

Se introduce el concepto de **Relajación Lineal**, que es el problema de programación lineal resultante de obviar que las variables deben ser enteras. Al tener menos restricciones, el valor óptimo de la Relajación Lineal siempre es mejor o igual que el de la PPLE original, siempre y cuando el problema sea de maximización.

![[Resolución de Modelos de Programación Entera - Relajación lineal.png]]

Una opción que tenemos para solucionar los PPLE es hacer su Relajación Lineal y truncar los decimales de la solución. No podemos redondear, porque redondear puede darnos soluciones más allá de la región factible.

Aparte de esto, tenemos dos posibles métodos para resolver esta clase de problemas. 

Primero, están los **algoritmos de planos de corte**, se saca la Relajación Lineal del problema, mientras la solución del problema no sea entera, se añaden restricciones (planos de corte) que cumple cualquier solución posible del problema original pero no cumple la solución óptima de la relajación lineal. Al final, se alcanza una solución óptima en un número finito de cortes, pero no es eficiente.

Segundo, están los algoritmos de bifurcación y acotación, también llamadas técnicas *branch and bound*. Estos algoritmos enumeran soluciones de forma que no es necesario comprobar todas las combinaciones posibles de valores de las variables. Es aplicable a PPLE puras o mixtas y se puede interrumpir en cualquier punto para obtener una solución aproximada, si calcular la solución real es excesivamente lento.

## Bifurcación y Acotación

1. Se considera sólo la relajación lineal del problema.
2. Si la solución obtenida no es entera, se selecciona una de las variables que aún tiene valor continuo, denotada por $x_{s} = a,b$ ($a$ es la parte entera y $b$ la decimal), y se crean dos problemas hijos del problema actual: uno en el que añadimos la restricción $x_{s} \geq a+1$ y otro en el que se añade la restricción $x_{s} \leq a$. A esta operación se le llama **Bifurcación**.
3. Se repite el proceso, seleccionando problemas en **cierto orden**, donde cada uno de los problemas con solución no entera genera 2 hijos cada vez. Cada uno de los problemas con solución entera se convierte en candidata a solución óptima. La mejor de las candidatas, llamada **incumbente**, se utiliza como *baseline* para el proceso de **Poda**, en el que se obvian problemas descendientes que no darían soluciones óptimas.


> [!NOTE] Title
> B&B va obteniendo soluciones cada vez más próximas a la solución óptima del PPLE, por lo que cuando se obtenga una solución entera para la relajación lineal, dicha solución también será la óptima para el problema original.


La poda consiste en dejar de explorar problemas descendientes que sabemos que no van a mejorar.
- Si la solución de un nodo es entera, ya es óptima para todo su subárbol, así que no seguimos explorando sus descendientes.
- Si la solución de un nodo no es entera y el valor de la función objetivo es peor que la mejor cota entera disponible, ninguno de sus descendientes será mejor, así que los obviamos.

La cota entera (inferior si el objetivo es maximizar, superior si es minimizar) es la mejor solución hasta la fecha de un subproblema con solución entera o la mejor solución de un problema con solución no entera tras truncar todas las variables de decisión, según cual sea mejor.

Por ejemplo, si tenemos un problema con $\max z = 3x_{1} + 4x_{2}$ y encontramos $x_{1}=1.5, x_{2}=2, z=12.5$, la (posible) cota entera no es $\lfloor 12.5 \rfloor = 12$, sino $3\lfloor x_{1} \rfloor + 4\lfloor x_{2} \rfloor = 9$.

Hay dos ordenes que podemos elegir para seleccionar que descendiente queremos solucionar:
- Cota más reciente: Esencialmente, es DFS. Requiere poca memoria pero tiene que examinar más nodos por norma general.
- Mejor cota (Jumptracking): Consiste en elegir el nodo con mejor valor óptimo entero o continuo. Consume mucha memoria en problemas grandes, pero recorre menos problemas.