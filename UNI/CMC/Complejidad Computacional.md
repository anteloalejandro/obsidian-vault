
Es una disciplina que establece y analiza el consumo de recursos computacionales necesarios para resolver una tarea, obviando las características de sus implementaciones o las plataformas en la que se ejecutan. Los recursos suelen ser el tiempo o el espacio necesarios para encontrar la solución.

# Problemas y lenguajes

Hay una correspondencia entre los problemas de decisión y los lenguajes formales.

- Problema: Cuenta con $\Pi$ parámetros.
- Instancia: Cuenta con $I_{\Pi}$ valores.
- Lenguaje: Cuenta con cadenas $w \in L(\Pi, e)$.

$L(\Pi, e) \subseteq \Sigma^{*}$ es el lenguaje formado por aquellas cadenas que codifican **instancias del problema** $\Pi$ con solución afirmativa, codificadas mediante un esquema $e$.

Pasamos los parámetros a valores definidos, que pasamos a un lenguaje. A partir de ese lenguaje se pasa a una máquina de Turing aceptora de dicho lenguaje, que recibe como entrada la $w$ y devuelve si $w \in L(\Pi, e)$ o no.

Para poder calcular la complejidad del problema $\Pi$, la máquina de Turing debe detenerse siempre, por lo que $L(\Pi, e)$ debe ser recursivo o finito.

# Axiomática de Blum

Establece condiciones para medir la complejidad de los problemas independientemente de la máquina (abstracta o real) que ejecute la resolución. Se basa en la definición de funciones recursivas que capturan la esencia de cuándo y cómo se pueden definir medidas de complejidad.

Consideremos el conjunto de todas las funciones computables $\{ \varphi_{i} : i \in \mathbb{N} \}$. Una medida de complejidad $\gamma$ se define como un conjunto de funciones computables que cumplen los siguientes axiomas:
1.  $\forall i \in \mathbb{N} \quad \text{dominio}(\gamma_{i}) = \text{dominio}(\varphi_{i})$
2. Existe una función computable total de la forma $\text{coste}: \mathbb{N} \times \mathbb{N} \times \mathbb{N} \to \{ 0,1 \}$, definida como $\text{coste}(i,n,k) = \begin{cases} 1 & \text{si } \gamma_{i}(n) = k \\ 0 & \text{en otro caso} \end{cases}$.

> [!example]- Ejemplo 1
> Considere un conjunto de funciones computables $\{ \gamma_{i} \}$ de la forma $\forall i,n \in \mathbb{N}\quad \gamma_{i}(n) = k$, siendo $k$ una constante.
> 
> - Cumple el segundo axioma, porque se puede definir la función coste, que en este caso siempre dará $1$.
> - NO cumple el primer axioma porque el dominio de $\gamma_{i}$ más grande que el de $\varphi_{i}$; $\gamma_{i}$ siempre da el mismo resultado ($k$) aun cuando $\varphi_{i}$. Por ejemplo, si el programa nunca acaba, $y_{i}$ sigue siendo igual a $k$.

> [!example]- Ejemplo 2
> Considere un conjunto de funciones computables $\{ \gamma_{i} \}$ de forma que $\forall i,n \in \mathbb{N} \quad \gamma_{i}(n) = \varphi_{i}(n)$.
> 
> - Trivialmente, cumple el primer axioma.
> - NO cumple el segundo axioma porque no se puede calcular el coste de problemas indecidibles, que forman parte de $\{ \varphi_{}{i} \}$ y, por tanto, forman parte de $\{ \gamma_{i} \}$.

> [!example]- Ejemplo 3
> Considere el conjunto de funciones computables $\{ \text{TIME}_{i} \}$ de forma que $\forall i,n \in \mathbb{N} \quad \text{TIME}_{i}(n)$ es el tiempo para calcular $\varphi_{i}(n)$ en una máquina de Turing $M_{i}$ capaz de calcularla.
> 
> - Se cumple el primer axioma porque $\text{TIME}_{i}$ finaliza si y solo si $\varphi_{i}$ también lo hace. $\text{TIME}_{i}(n) ↓ \iff \varphi_{i}(d)↓$, así que el dominio es el mismo.
> - Se cumple el segundo axioma, porque se puede establecer como coste el propio valor de $\text{TIME}_{i}(n)$.
> 
> ***$TIME$ es una medida de complejidad***

> [!example]- Ejemplo 4
> Considere el conjunto de funciones computables $\{ \text{SPACE}_{i} \}$ tal que $\forall i,n \in \mathbb{N} \quad \text{SPACE}_{i}(n)$ es el número de celdas inicialmente en blanco que la máquina $M_{i}$ utiliza para calcular $\varphi_{i}(n)$.
> 
> - Se cumple el primer axioma, porque como si $\varphi_{i}(n)↑$ no hay un valor definido para $\text{SPACE}_{i}(n)$, se cumple que $\text{SPACE}_i(n)↓\iff \varphi_{i}(n)↓$.
> - Se cumple el segundo axioma, porque se puede establecer como coste el valor de $\text{SPACE}_i(n)$.
> 
> ***$SPACE$ es una medida de complejidad***

# Complejidad espacial y temporal

Podemos aceptar como base un modelo de cálculo una máquina de Turing multi-cinta con $k+1$ cintas: Una de entrada (sólo lectura) y todas las demás. La máquina puede ser determinista o no.

Tenemos entonces 4 tipos de complejidad espacial o temporal:
- **Complejidad espacial determinista**
    - $\text{DSPACE}(S(n))$ es la clase de los lenguajes aceptados por MT deterministas con complejidad espacial $S(n)$.
    - Dada una MT determinista multi-cinta $M$, $M$ está acotada en espacio por $S(n)$ si por cada cadena de entrada de longitud $n$, $M$ explora **como máximo** $S(n)$ celdas **en cada cinta**. En este caso, la complejidad espacial de $L(M)$ es $S(n)$.
- **Complejidad temporal determinista**
    - $\text{DTIME}(T(n))$
    - Dada una MT determinista multi-cinta $M$, $M$ está acotada en tiempo por $T(n)$ si por cada cadena de entrada de longitud $n$, existe por lo menos una secuencia de movimientos de forma que $M$ realiza como máximo $T(n)$ movimientos/transiciones antes de parar. En este caso, la complejidad temporal de $L(M)$ es $T(n)$.
- **Complejidad espacial no determinista**
    - $\text{NSPACE}(S(n))$
    - Dada una MT no determinista multi-cinta $M$, $M$ está acotada en espacio por $S(n)$ si para cada cadena de longitud $n$, existe por lo menos una **secuencia mínima de movimientos** de forma que $M$ acepta la cadena de entrada y explora como máximo $S(n)$ celdas **en cada cinta**.
- **Complejidad temporal no determinista**
    - $\text{NTIME}(T(n))$
    - Dada una MT no determinista multi-cinta $M$, $M$ está acotada en tiempo por $T(n)$ si para cada cadena de longitud $n$, existe por lo menos una **secuencia mínima de movimientos** que acepta $M$ y no supera $T(n)$ movimientos.

La función $T$ debe ser una función recursiva total de forma que, para cada valor de $n$,existe una MT determinista que para cada entrada posible de longitud $n$ la máquina para tras **exactamente** $T(n)$ pasos. A esto se le llama **función constructiva en el tiempo**.

De forma similar, la función $S$ debe ser una función recursiva total de forma que existe una MT determinista que para cada entrada de tamaño $n$, se finaliza con **exactamente** $S(n)$ celdas con contenido (no blanco) y **no se ha escrito ninguna otra** celda durante la computación (no vale tirar para atrás borrando celdas escritas).

Algunos ejemplos de $T$ y $S$ incluyen...
- $n^{k},\,k\geq 1$, siendo $k$ cte.
- $n!$
- $2^{cn}$, siendo $c$ cte.

# Estimación de la complejidad

En una máquina RAM, podemos usar dos criterios para estimar el coste de las instrucciones individuales: Coste uniforme y coste logarítimo.

En coste uniforme, cada instrucción tiene un tiempo fijo para ejecutarse y cada entero ocupa exactamente un registro.

En coste logarítmico, cada instrucción requiere de una cantidad de unidades de tiempo definidas por una función logarítmica que tiene como entrada la magnitud de los enteros que participan en la instrucción, y cada entero ocupa un número de registros definidos por una función logarítmica de su magnitud.


> [!NOTE] 
> Dado un coste logarítmico $O(k·b^{k})$, tomando $n \simeq b^{k}$:
> - $b$ es la base
> - $k$ es el número de dígitos
> Por ejemplo, en base 2, un programa que almacene el número 8 y finalice, tendrá una complejidad espacial de $O(3·2^{3})$ (aunque en realidad sería cte, porque no hay incógnitas).
