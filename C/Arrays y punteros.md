
Si se guarda un array en una variable `int a[]` esta es, por definición, un puntero al elemento en primera posición.

```c
int a[] = {1, 2, 3};
int *b = &a[0];
int *c = a;

a == b == c; // las tres variables tienen el mismo valor
```

Al incrementar un puntero, no se incrementa su valor como se haría con un entero o un número en coma flotante, sino que se desplaza el puntero al siguiente *objeto*. Cuántos bytes se desplaza exactamente depende del `sizeof()` del tipo del puntero, por lo que dados un `char *c` y un `int *i`, `c++` desplazaría el puntero un bit y `i++` típicamente desplazaría el puntero 4 bits.

Este es exactamente el comportamiento que tienen los índices en los arrays, por lo que dado el array  `int a[]`, las expresiones `a[i]` y `*(a+i)` son equivalentes.

Las únicas diferencias entre punteros y arrays es que al definir un array también reservas un espacio, cuyos valores serán generalmente puestos a 0, pero no puedes reasignar la variable una vez asignada, a diferencia de un puntero, que se puede reasignar mediante incrementos o operaciones aritméticas pero no reserva ningún espacio.

```c
int a[] = {1, 2, 3};
int *b = a;

// ILEGAL
a++;
a = a + 1;

// LEGAL
b++;
b = b + 1;
b[0];
```

Aprovechando la relación entre arrays y punteros, también se puede definir una variable que sea una sección de un array, pero este sección no puede ser definida como un array por las limitaciones de asignación de estos.

```c
char str[] = "hello world";
char *slice = (*(&str)) + 6;
printf("%s\n", slice); // --> world
```