# Factorial
$$
n!
\begin{cases}
n · (n-1)!, & \text{si } n>=1\\
1,  & \text{si n=0}
\end{cases}
$$
```java
public static long factorial(int n) {
	if (n <= 1) return 1;
	return n * factorial(n - 1);
}
```

# N-ésima potencia

$$
a^{n}
\begin{cases}
a · a^{(n-1)},  & \text{si n} > 1 \\
1,  & \text{si } n = 0
\end{cases}
$$
```java
public static long power(int a, int n) {
    if (n == 0) return 1;
    if (n < 0) return -1;
    return a * power(a, n-1);
}
```

# Resto de la división entera

$$
[a] \text{ en } \mathbb{z}_b
\begin{cases}
[a-b],  & \text{si } a>=b \\\\
[a], & \text{si } a < b
\end{cases}
$$

```java
public static int remainder(int a, int b) {
    if (a-b <= 0) return a;
    return remainder(a-b, b);
}
```

# Máximo común denominador con el algorítmo de Euclides

$$
MCD(a, b) \begin{cases}
MCD(b, a)  & \text{si } b > a \\
MCD(b, a(\mod b))  & \text{si } b \neq 0 \\
a & \text{si b = 0}
\end{cases}
$$
```java
public static int mcd(int a, int b) {
    if (b == 0) return a;
    if (b > a) return mcd(b, a);
    return mcd(b, a%b);
}
```

# N-ésimo número en la secuencia fibonacci

$$
a_{n} = a_{n-1} + a_{n-2}
$$
```java
  public static int fibonacci(int n) {
    if (n < 0) return -1;
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
  }
```

```ad-info
Este es un ejemplo de recursión múltiple, donde cada llamada al método `fibonacci` genera otras dos llamadas.
```
