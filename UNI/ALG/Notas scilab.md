
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
x = A\b + lambda_1*k(:,1) + lambda_1*k(:,2) //...

// rref, se tiene que expresar la ecuación paramétrica a mano
R = rref([A b])
x = ...
```

# Dominancia diagonal

Una matriz $A$ es estrictamente dominante diagonalmente si todos los miembros de la diagonal tienen mayor magnitud que la suma de las magnitudes del resto de elementos de la misma columna.
$$
A\text{ es diagonal} \Leftrightarrow \forall{i \neq j} : |a_{i,i}| > |a_{i,j}|
$$

Es posible que una matriz no estrictamente dominante diagonalmente pueda serlo simplemente haciendo permutaciones.

```c
// Ejemplo permutación
A(:, [1 2 3]) = A(:, [2 1 3])
```

# Aproximación de un SCD

Los métodos de Jacobi y Gauss-Seider son mucho más eficientes para calcular/aproximar una SCD grande, siempre y cuando se cumplan las siguiente condiciones:

- Que la recurrencia **converja**.
- Que la matriz sea **cuadrada**.
- Que la diagonal no **tenga ningún 0**.

Las recurrencias de ambos métodos convergerán siempre y cuando la matriz sea estrictamente dominante diagonalmente, pero puede darse el caso de que converjan sin cumplir esta condición. Este último caso se da más a menudo en Gauss-Seider que en Jacobi.

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
No se continua operando porque en Gauss-Seider no se siempre se puede inviertir $(L+D)$, por lo que se queda como parte de la recurrencia multiplicando a la $x_{k}$. $(L+D)$ es simplemente el resultado de $tril(A)$

```c
// Dada la matriz ampliada [A b]

D = diag(diag(A));
LD = tril(A);
U = triu(A) - D;
x = zeros(4,1);

// asumiento que LD es invertible
for i = 1:10 do x = inv(L+D)*(b-U*x); end

```

# Vectores y matrices estocásticos

*Estocástico* →De Probabilidad.

Un vector $v_{p}$ es estocástico si la suma de sus magnitudes es exactamente igual a uno. Una matriz $P$ es estocástica si todas sus columnas son vectores estocásticos.

## Cadena de Markov

La ley de la cadena de Markov dice que dado un vector estocástico $x_{0}$ y una matriz estocástica P, $x_{1} = P·x_{0}$ también es estocástico, al igual que lo es $x_{2} = P·x_{1} = P^{2} · x_{0}$. Esto se aplica para todo $k\in \mathbb{N}$, por lo que podemos sacar una recurrencia y una ecuación:
$$
\begin{align*}
x_{k}= P·x_{k-1}\\
x_{k} = P^{k}·x_{0}
\end{align*}
$$
La cadena de Markov propiamente dicha es el conjunto de todos los vectores estocásticos que se obtienen de este modo:
$$
\set{x_{0}, x_{1}, x_{2}, \dots, x_k}
$$
### Matriz estocástica regular

Una matriz estocástica $P$ es regular si y sólo si $\exists k \in \mathbb{N} : 0 \notin P^{k}$, es decir, si alguna potencia de P carece de ceros. Por norma general, si conforme aumenta la $k$ el número de ceros disminuye, es probable que sí que haya recurrenciasun valor de $k$ para el que se cumpla esto.

Finalmente, si $P$ es estocástica regular la cadena de Markov es estable y convergerá a un $x_{k}$ único, independientemente del valor de $x_{0}$.

## Vectores estacionarios

Un vector estacionario $v_{e}$ es aquel $x_{k}$ de una cadena de Markov **convergente** de modo que los $x$ siguientes son iguales a $x_{k}$, es decir, idealmente sería $x_{k}$ cuando $k \to \infty$. De ahí el nombre "estacionario", ya que no cambia sin importar cuanto aumente la $k$. Como la $v_{e}$ no cambia por mucho que se continúe por la cadena de Markov, se puede inferir que
$$
\begin{align*}
k \to \infty \Rightarrow \ & P·v_{e} = v_{e}\\
& P·v_{e} - v_{e} = \overrightarrow{0}\\
& (P-I)v_{e} = \overrightarrow{0}
\end{align*}
$$
Es decir, el vector estacionario $v_{e}$ es la solución homogénea de la matriz ampliada $\begin{bmatrix} (P-I) & | & v_{e} \end{bmatrix}$, o lo que es lo mismo, el kernel de $(P-I)$

Es importante recordar que en Scilab `kernel(A)` da una única solución, pero en realidad es un sistema compatible indeterminado, lo que implica que tiene uno o más parámetros por el que habrá que multiplicar cada una de las columnas, dando como resultado infinitas soluciones.

```c
// Dada la matriz estocástica P
k = kernel(P - eye(P));
ve = lambda_1 * k(:,1) + lambda_2 * k(:,2) //...
```

Sin embargo, si la matriz es estocástica **regular**, hay un sólo vector estacionario de probabilidad llamado $v_{ep}$  exactamente igual a $x_{k}$ cuando $k \to \infty$  que se obtiene dividiendo $v_{e}$ entre la suma de las componentes de $v_{e}$. Al dividir $v_e$ entre sus componentes, los parámetros se cancelan, de modo que si se conoce que la matriz $P$ es estocástica regular, se puede calcular el $v_{ep}$ de este modo:
$$
v_{ep} = \frac{v_{e}}{\sum\limits{\text{componentes de }v_e}}
$$
Y en Scilab, al cancelarse los parámetros:

```c
// Dada la matríz estocástica regular P

k = kernel(P - eye(P))
vep = k/sum(K);
```

Alternativamente, se puede estimar el vector estacionario único haciendo iteraciones de la cadena de Markov hasta que la diferencia entre un vector y el siguiente sea irrisoria.

```c
// Dada la matriz estocástica regular P, ya que sabemos que convergerá

// x inicial, ha de ser estocástica
x0 = 1/4 * ones(4, 1); 
// Ver y comparar múltiples elementos de la cadena de Markov
x = x0;
for i = 1:10 do x = P*x end
// Sacar el n-ésimo elemento de la cadena de Markov
x = P^10 * x0
```