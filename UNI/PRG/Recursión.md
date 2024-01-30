
# Introducción
Cualquier proceso, estructura, etc. que **se define en función de si mismo** es recursivo.
Una función, por tanto, es recursiva si su solución requiere de una solución previa para un caso más sencillo.
Por ejemplo, la factorial se puede definir de la siguiente forma:
$$
n!
\begin{cases}
1, & n=0 \\
n·(n-1)!, & n>0
\end{cases}
$$
Dónde para sacar el factorial de, por ejemplo, $n=2$, es necesario conocer el factorial de $n=1$, para el que es necesario conocer el de $n=0$, el cual sí se sabe.

Del mismo modo, un algoritmo es recursivo si se invoca a si mismo variando los argumentos en cada sucesiva iteración de forma que se llegue a un caso para el que la respuesta sí se sepa. A éste caso para el que ya se conoce la respuesta, se le llama **caso base**, y los casos que dan lugar a recursión, **caso general**.

Por tanto, un algoritmo recursivo ha de ser dividido en dos partes:
- El caso base, para el que, generalmente, se devolverá inmediatamente una respuesta pre-calculada cuando los parámetros cumplan cierta condición.
- El caso general, para el que se tiene que establecer algún tipo de relación o diferencia con uno anterior o posterior de forma que repetir el proceso se vaya acercando al caso base sin pasarlo.

También habrá que asegurarse de que el algoritmo termina independientemente de la entrada (Ej: si $n<0$, no se puede hacer $n = n·(n-1)!$ porque nunca se alcanzaría el caso base), y de que la solución es independientemente de la entrada.

Muchas fórmulas y equivalencias matemáticas son recursivas y recurrentes, lo que las hace simples de implementar utilizando métodos recursivos. Por ejemplo, para el factorial:

```java
public static long factorial(int n) {
	// Cubre el caso base y evita bucles infinitos en n < 0
	if (n <= 0) return 1;
	// Caso General: n! = n * (n-1)!
	return n * factorial(n - 1);
}
```

[[Fórmulas implementadas recursivamente en Java]]

# Tipos de recursión

Existen, esencialmente, dos tipos de recursión: La recursión lineal y la múltiple.

En las recursiones lineales hay sólo una llamada recursiva en cada iteración, mientras que en las recursiones múltiples hay múltiples llamadas por cada iteración. Por tanto, en las lineales se crea una secuencia o cola de llamadas, mientras que en las múltiples se crea un árbol.

# Recursividad y la pila de llamadas

Cada vez que se llama a un método está se mete en la **pila de llamadas**. Las pilas son una estructura de datos en la que cada uno de los nodos apunta al siguiente miembro en la lista y cuando se inserta o elimina un nodo se hace al principio (o *top*), similar a una pila de platos.
![[Stack|100%]]

En lo que a métodos pertañe, sólo el método que está en el tope de la pila está en ejecución, y solo sale de la pila cuando termina de ejecutarse, pero si el método en ejecución llama a otro método, éste último se añade a la pila, deteniendo así la ejecución del método que lo llamó hasta que termine, y así sucesivamente.
![[Factorial Call Stack|100%]]
Las llamadas a funciones a si mismas, por su lado, están asociadas a un **registro de activación** propio que se apila sobre la pila de llamadas.

Como las funciones recursivas abusan de la pila de llamadas, la memoria que utilizan incrementa muy rápidamente con cada recursión, por lo que son susceptibles al *stack overflow*, el nombre que recibe el evento de que la pila de llamadas se quede sin espacio. Aún así, la causa más común de *stack overflow* es la recursión infinita causada por problemas de lógica en la función recursiva, que en Java provoca la excepción StackOverflowError.

