
Alcance estático es lo que usan todos los lenguajes de programación modernos. Si hay una variable declarada en un ámbito más específico, se considera que son dos variables completamente separadas.

```run-java
static int x = 10;
public static void main(String args[]) {
  System.out.println(x);
  changeVar();
  System.out.println(x);
  int x = 1;
  System.out.println(x);
  printVar();
}
public static void changeVar() { x = 0; }
public static void printVar() { System.out.println(x); }
```

En alcance dinámico, sin embargo, aunque se declare una variable en un ámbito más específico, se considera que son la misma variable. En el programa anterior, la salida si Java usase alcance dinámico sería:

```
10
0
1
1 // int x = 1 en main ha cambiado el valor de static int x.
```