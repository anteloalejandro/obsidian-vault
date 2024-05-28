
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

En ambos métodos se descompone la matriz $A$ en una suma de 3 matrices $(L + D + U)$, donde $D$ es la diagonal que se saca con `diag(diag(A))` y $L$ y $U$ son triangulares cuya diagonal es $\overrightarrow{0}$ que se sacan restando $D$ a las funciones `tril(A)` y `triu(A)`, respectivamente.

Para ambos métodos es necesaria una aproximación inicial. Mientras converja, cualquier aproximación vale, así que se puede usar `ones(4,1)`, `zeros(4,1)` o incluso `A\b` (aunque esta última carecería de sentido).

## Método de Jacobi

$$
\begin{align*}
& A\overrightarrow{x} = \overrightarrow{b} \Leftrightarrow (L + D + U)\overrightarrow{x} = \overrightarrow{b} \Leftrightarrow (L + U)\overrightarrow{x} + D\overrightarrow{x} = \overrightarrow{b} \\ & \overrightarrow{x} = D^{-1}·\left(\overrightarrow{b} - (L + U)\overrightarrow{x}\right)\\
& x_k = D^{-1}·\left(\overrightarrow{b} - (L + U)x_{k-1}\right)\\
\end{align*}
$$
$(L + U)$ en específico se puede sacar retándole $D$ a $A$:  `LU = A - D`.

```c
// Dada la matriz ampliada [A b]
D = diag(diag(A));
LU = A - D;
x = zeros(4,1);
for i = 1:10 do x = inv(D)*(b - LU*x); end
```

## Método de Gauss-Seider

$$
\begin{align*}
& A\overrightarrow{x} = \overrightarrow{b} \Leftrightarrow (L + D + U)\overrightarrow{x} = \overrightarrow{b} \Leftrightarrow (L + D)\overrightarrow{x} + U\overrightarrow{x} = \overrightarrow{b} \\
& (L + D)\overrightarrow{x} = \overrightarrow{b} - U\overrightarrow{x}\\
& (L + D)x_{k} = \overrightarrow{b} - Ux_{k-1}
\end{align*}
$$
No se puede continuar operando porque en Gauss-Seider no se siempre se puede inviertir $(L+D)$, por lo que se queda como parte de la recurrencia multiplicando a la $x_{k}$. $(L+D)$ es simplemente el resultado de $tril(A)$

```c
// Dada la matriz ampliada [A b]

D = diag(diag(A));
LD = tril(A);
U = triu(A) - D;
x = zeros(4,1);

// asumiento que LD es invertible
for i = 1:10 do x = inv(L+D)*(b-U*x)

```