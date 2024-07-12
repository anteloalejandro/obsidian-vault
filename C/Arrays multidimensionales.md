
En C, los arrays multidimensionales no se pueden pasar fácilmente como argumentos para funciones, pues no se pueden comportar igual que un un puntero a un puntero.

Dado un array multidimensional `int table = [100][10]`, si intentamos escribir una función que reciba este array como parámetro no se puede hacer algo del estilo de `parse_table(int **table)`, a pesar de que con arrays unidimensionales esta notación [[Arrays y punteros|sí es válida]]. El motivo es que table sí se comporta como un puntero, pero se comporta específicamente como un puntero a arrays con 10 posiciones, por lo que la función debería escribirse como `parse_table(int table[][10])` o `parse_table(int (*table)[10])`.

Se puede sobrepasar este problema haciendo array de punteros, que se puede escribir como `int *table_p[100]`. Estos punteros se pueden asignar a los arrays correspondientes a las filas y, como ya se ha creado `table` anteriormente, ese espacio ya este reservado en el *stack* y no causa un *segfault*, aunque se gasta memoria adicional al tener que crear el array de punteros.

```c
void parse_table_1(int **table);
void parse_table_2(int (*table)[5]);
void parse_table_3(int (*table)[10]);

int main() {
  int table[100][10] = {
    { /*...*/ }, { /*...*/ }, { /*...*/ }, // ...
  };
  int *table_p[100];
  for (int i = 0; i < 100; i++) {
    table_p[i] = table[i];
  }

  parse_table_1(table);   // WRONG
  parse_table_2(table);   // WRONG
  parse_table_3(table);   // RIGHT
  parse_table_1(table_p); // RIGHT
}
```

De forma un poco contraintuitiva, al derreferenciar `table_p` no se obtiene un array de 100 enteros, sino el primero de 100 punteros a enteros (sin inicializar, es decir, *aún* no apuntan a ningún entero). En resumidas cuentas, `int *table_p[100]` se puede leer como "un array de tamaño 100 que contiene punteros a enteros", mientras que `int (*table_p)[100]` se leería como "un puntero a un array con 100 enteros"

```c
int a = 5;
int b = 10;
int *table[10];

table[0] = &a;
table[1] = &b;
```

```c
int arr[10];
int (*table)[10] = &arr;

// Now you can access elements of arr through table,
// so it is not an actual table
(*table)[0] = 5;
(*table)[1] = 10;
```