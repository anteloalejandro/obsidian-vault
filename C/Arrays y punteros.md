
Si se guarda un array en una variable `int a[]` esta es, por definición, un puntero al elemento en primera posición.

```c
int a[] = {1, 2, 3};
int *b = &a[0];
int *c = a;

a == b && b == c; // las tres variables tienen el mismo valor
```

Al incrementar un puntero, no se incrementa su valor como se haría con un entero o un número en coma flotante, sino que se desplaza el puntero al siguiente *objeto*. Cuántos bytes se desplaza exactamente depende del `sizeof()` del tipo del puntero, por lo que dados un `char *c` y un `int *i`, `c++` desplazaría el puntero un bit y `i++` típicamente desplazaría el puntero 4 bits.

Este es exactamente el comportamiento que tienen los índices en los arrays, por lo que dado el array  `int a[]` y el puntero `int *p`, las expresiones `a[i]`, `p[i]` y `*(p+i)` son equivalentes.

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
b[1] = b[0];
b = a + 1; // es legal porque no se modifica a
```

Aprovechando la relación entre arrays y punteros, también se puede definir una variable que sea una sección de un array, pero esta sección no puede ser definida como un array porque no se puede asignar nada a un array que no sea un `{...}` al inicializarlo.

```c
char str[] = "hello world";
char *slice = &str[6]; // str + 6 también es válido
printf("%s\n", slice); // --> world
```

Sin embargo, al pasar arrays a una función, independientemente de si el parámetro correspondiente en la función se ha definido como puntero o array, lo que se copia es el puntero al primer elemento, por lo que se pueden usar exactamente igual que un puntero. Por ello los parámetros se suelen definir como punteros para evitar ambigüedades.

```c
void fun(char str[]) {
  // es legal, pero modifica una copia del puntero,
  // así que no tiene ningún efecto
  str++;
}
int main() {
  char str[] = "hello world";
  fun(str);
}
```

Los punteros que apuntan a miembros de un mismo array se pueden comparar de forma intuitiva igual que se haría con `int`, `char` o `double`, de modo que si `p < q` es cierto, el puntero `p` apunta a una posición del array anterior a la que apunta `q`. En caso de que los punteros no apunten a miembros de un mismo array, el comportamiento no está definido, con la excepción del elemento siguiente al último.