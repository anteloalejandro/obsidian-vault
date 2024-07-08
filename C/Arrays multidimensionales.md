
En C, los arrays multidimensionales no se pueden pasar fácilmente como argumentos para funciones, pues no se pueden comportar igual que un un puntero a un puntero.

Dado un array multidimensional `int table = [100][10]`, si intentamos escribir una función que reciba este array como parámetro no se puede hacer algo del estilo de `parse_table(int **table)`, a pesar de que con arrays unidimensionales esta notación [[Arrays y punteros|sí es válida]]. El motivo es que table sí se comporta como un puntero, pero se comporta específicamente como un puntero a arrays con 10 posiciones, por lo que la función debería escribirse como `parse_table(int table[][10])` o `parse_table(int (*table)[10])`.

Se puede sobrepasar este problema haciendo array de punteros, que se puede escribir como `int *table_p[10]`. De forma un poco contrain

```c
void parse_table_1(int **table);
void parse_table_2(int (*table)[5]);
void parse_table_3(int (*table)[10]);

int main() {
  int table[100][10] = {
    { /*...*/ }, { /*...*/ }, { /*...*/ }, // ...
  };
  int *table_p[10]

  parse_table_1(table); // WRONG
  parse_table_2(table); // WRONG
  parse_table_3(table); // RIGHT
}
```