
# Comprobar compatibilidad

Comprobando rangos directamente
```c
rank(A) == rank([A b]) // debe ser cierto
rank(A) == size(A, 2)  // debe ser cierto
```

O bien hacer `rref` y comprobarlo a mano.
# Solucionar SCD

Directamente, $A\overrightarrow{x} = \overrightarrow{b}$   →  `A\b`
```c
x = A\b
```

Usando `rref` se tiene que extraer las columnas con la solución después
```c
R = rref([A b])
x = R(:, 4)
```

# Solucionar SCI

```c
// Directamente, cada columna del kernel será multiplicado por un escalar diferente (o igual). A\b saca la solución particular, y Kernel(A) es la homogénea (b = (0, 0, ..., 0))
k = kernel(A);
x = A\b + lambda_1*k(1) + lambda_1*k(2) ...

// rref, se tiene que expresar la ecuación paramétrica a mano
R = rref([A b])
x = ...
```

# Dominancia diagonal

Una matriz es estrictamente dominante diagonalmente si todos los miembros de la diagonal tienen mayor magnitud que la suma de las magnitudes del resto de elementos de la misma columna.
$$
A\text{ es diagonal} \Leftrightarrow \forall{i \neq j} : |a_{i,i}| > |a_{i,j}|
$$

Es posible que una matriz no estrictamente dominante diagonalmente pueda serlo simplemente haciendo permutaciones.

```c
// Ejemplo permutación
A(:, [1 2 3]) = A(:, [2 1 3])
```

# Método eficiente de una SCD

Los métodos de Jacobi y Gauss-Seider son mucho más eficientes para calcular/aproximar una SCD grande, siempre y cuando se cumplan las siguiente condiciones:

- Que la recurrencia **converja**.
- Que la matriz sea **cuadrada**.
- Que la matriz ampliada sea **SCD**.
- Que la diagonal no **tenga ningún 0**.

Ambas convergerán siempre y cuando la matriz sea estrictamente dominante diagonalmente, pero puede darse el caso de que convergan sin cumplir esta condición. Este último caso se da más a menudo en Gauss-Seider que en Jacobi.

En ambos métodos se descompone la matriz $A$ en una suma de 

## Método de Jacobi

Consiste en 