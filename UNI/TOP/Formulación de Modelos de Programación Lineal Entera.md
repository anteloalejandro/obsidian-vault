
# Problemas de Transporte y Distribución

El objetivo de estos problemas es **distribuir** un producto desde varios **orígenes** hasta otros varios **destinos**, de modo que se **minimize el coste del envío** y se satisfaga la **oferta y demanda**.

Requiere de muchas variables y restricciones, así que el método simplex, que escala con la cantidad de variables, es muy costoso.

Los coeficientes de las variables de decisión $a_{ij}$ en las restricciones son mayoritariamente 0, y las que no siguen un patrón específico, de lo que surge una versión simplificada del Simplex, llamado Simplex de Transporte, que reduce la estructura espacial del problema.

Siendo $x_{ij}$ la cantidad a transportar desde $i$ hasta $j$, este tipo de problemas se formulan como:

$$
\begin{align}
\text{Min}\ z = &\sum_{i}\sum_{j}c_{ij}x_{ij} \\
&\sum_{j=1}^{n} x_{ij} \leq f_{i} & i = 1,\dots,m \\
&\sum_{i=1}^{m} x_{ij} \geq d_{j} & j=1,\dots,n \\
&x_{ij} \geq 0 & \forall i,j
\end{align}
$$
- $x_{ij}$ es la cantidad a transportar desde $i$ hasta $j$.
- $c_{ij}$ suele ser el coste de transportar desde $i$ hasta $j$.
- $f_{i}$ es la cantidad disponible en la fuente u origen.
- $d_{j}$ es la cantidad demandada en el destino.

El problema está equilibrado si la suma de ofertas es igual a la suma de demandas, es decir, si $\sum_{i}f_{i} = \sum_{j}d_{j}$.

> [!example] Ejemplo
> Una compañía fabrica automóviles en 3 plantas y los envía a 4 regiones del país. Las plantas pueden suministrar las cantidades que se indican en la siguiente tabla. Las demandas de los clientes por región se incluyen en la última fila de la tabla, así como los costes de enviar un automóvil desde cada planta a cada región.
> 
> |               | Región 1 | Región 2 | Región 3 | Región 4 | *Capacidad* |
> | ------------- | -------- | -------- | -------- | -------- | --------- |
> | **Planta 1**  | 131      | 218      | 266      | 120      | *450*       |
> | **Planta 2**  | 250      | 116      | 263      | 278      | *500*       |
> | **Planta 3**  | 178      | 132      | 122      | 180      | *300*       |
> | ***Demanda*** | *450*    | *200*    | *300*    | *300*    |           |
> La compañía desea conocer cuál es el plan de distribución a coste mínimo con el que satisfacer las demandas de las 4 regiones sin sobrepasar las capacidades de las plantas fabricantes.
> 
> *Plantea un modelo de programación lineal que permita a la compañía determinar el plan de distribución con el coste mínimo, cumpliendo la capacidad de las plantas y las demandas regionales.*
> 
> > [!success]- Solución
> > **Variables de decisión**
> > 
> > - La cantidad de automóviles a enviar desde la Planta $i$ hasta la Región $j$: $x_{ij}$.
> > 
> > **Función Objetivo**
> > 
> > $$
> > \text{Min}\ z = \begin{align}
> > & 131x_{11} + 218x_{12} + 266x_{13} + 120x_{14} \\
> > +\ & 250x_{21} + 116x_{22} + 263x_{23} + 278x_{24} \\
> > +\ & 178x_{31} + 132x_{32} + 122x_{33} + 180x_{34}
> > \end{align}
> > $$
> > 
> > **Restricciones**
> > 
> > $$
> > \begin{align}
> > [\text{Capacidad Planta 1}] &: x_{11} + x_{12} + x_{13} + x_{14} \leq 450 \\
> > [\text{Capacidad Planta 2}] &: x_{21} + x_{22} + x_{23} + x_{24} \leq 500 \\
> > [\text{Capacidad Planta 3}] &: x_{31} + x_{32} + x_{33} + x_{34} \leq 300 \\
> > \\
> > [\text{Demanda Región 1}] &: x_{11} + x_{21} + x_{31} \geq 450 \\
> > [\text{Demanda Región 2}] &: x_{12} + x_{22} + x_{32} \geq 200 \\
> > [\text{Demanda Región 3}] &: x_{13} + x_{23} + x_{33} \geq 300 \\
> > [\text{Demanda Región 4}] &: x_{14} + x_{24} + x_{34} \geq 300 \\
> >   \\
> > [\text{no-neg}] &: x_{ij} \geq 0 \quad \forall i,j
> > \end{align}
> > $$

## Variantes

Podemos encontrarnos con los siguientes cambios respecto al formato usual:
- Realizar un servicio en lugar de enviar un producto.
- Maximizar beneficios en lugar de minimizar costes.
- Evitar combinaciones imposibles.
- Almacenes o puntos de transbordo, con restricciones de equilibrio.
- Varios productos distintos a envíar.

# Problemas de Asignación

En los problemas de asignación el objetivo es averiguar la asignación óptima, es decir, de menor coste, de $n$ trabajadores (o máquinas) a $n$ trabajos (o puestos, tareas, etc).

Esencialmente, tenemos asignaciones de trabajadores a trabajos con un coste conocido, y se tiene que averiguar quién debe hacer qué.

La escala de este problema hace viable usar el Simplex, pero no se aprovechan las características propias de este tipo de problemas. En su lugar, se puede usar el Algoritmo Húngaro o se puede considerar esta clase de problemas como un caso particular del problema de transporte donde cada origen y destino solo puede enviar o recibir 1 unidad de "producto".

La formulación del problema viene a ir siendo la siguiente:

$$
\begin{align}
\text{Min}\ z = & \sum_{i}\sum_{j}c_{ij}x_{ij} \\
& \sum_{j=1}^{n}x_{ij}=1 & i=1,\dots,n \\
& \sum_{i=1}^{n}x_{ij}=1 & j=1,\dots,n \\
& x_{ij} \in \{ 0,1 \} & \forall i,j
\end{align}
$$
- $x_{ij}$ indica si a $i$ se le asigna $j$ ($x_{ij}=1$) o no ($x_{ij}=0$).
- $c_{ij}$ es el coste de asignar $i$ a $j$.

## Problema de Asignación *Generalizado*

Es una variante del problema de asignación más general. Se pueden ver los siguientes cambios:
- $m$ trabajadores para $n$ trabajos.
- Además de los costes de asignación $c_{ij}$ se añade:
    - Valores límite $b_{i}$ en las restricciones que representan la **cantidad de recurso disponible** para $i$.
    - Coeficientes $a_{ij}$ en las restricciones que representan la **cantidad de recurso necesario** para que $i$ pueda hacer el trabajo $j$.

Las restricciones añadidas se traducen en $n$  restricciones de la forma $\sum_{j=1}^{n} a_{ij} x_{ij} \leq b_{i},\ i=1,\dots,n$

> [!NOTE] El "recurso" generalmente es el tiempo del trabajador $i$

## Problema de Asignación *Cuadrática*

Son problemas cuadráticos porque **la función objetivo** viene definida por **parejas de variables en forma de producto**.

> [!example] Ejemplo
> Se tienen $n$ módulos electrónicos, y $n$ posiciones en los que colocarlos. Sea $t_{ik}$ el número de cables que conectan los módulos $i,k$, y sea $d_{jl}$ la distancia entre las posiciones $j,l$ de la placa. *Buscamos asignar todos los módulos minimizando la longitud total de cable utilizado*.
> 
> **Variables de decisión**
> 
> Si a $i$ se le asigna $j$, $x_{ij} = 1$, en caso contrario, $x_{ij} = 0$.
> 
> **Función objetivo**
> 
> *No sabemos los datos exactos de las incógnitas, así que se expresa directamente con las incógnitas.*
> 
> $$
> \text{Min}\ z = \sum_{i=1}^{n}\sum_{j=1}^{n}\sum_{k=1}^{n}\sum_{l=1}^{n} t_{ik}\ d_{jl}\ x_{ij}\ x_{kl}
> $$
> *Es "cuadrático" por $x_{ij}\ x_{kl}$.*
> 
> **Restricciones**
> 
> $$
> \begin{align}
> [\text{suma asignaciones a módulo}_{i}]&: \sum_{j=1}^{n} x_{ij} = 1 & i=1,\dots,n \\
> [\text{suma asignaciones a posición}_{j}]&: \sum_{i=1}^{n} x_{ij} = 1 & j=1,\dots,n \\
> [\text{no-neg}] &: x_{ij} \in \{ 0,1 \} & \forall i,j
> \end{align}
> $$
> *Nótese que la $i$ representa el módulo, y la $j$ la posición*

# Problemas de optimización combinatoria

Son problemas en los que las variables de decisión son **enteros** y el espacio de soluciones está formado por **subconjuntos de los números naturales**. El objetivo de este tipo de problemas consiste en hallar el mejor valor de entre un número **finito o numerable** de soluciones viables.

La enumeración de los conjuntos de este problema resulta casi imposible incluso para problemas de tamaño moderado.