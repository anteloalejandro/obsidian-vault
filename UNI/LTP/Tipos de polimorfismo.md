
# Polimorfismo *Ad-Hoc*

Trabaja sobre un set limitado de tipos no necesariamente relacionados.

**Coacción/Coerción:** Forzar la conversión de un tipo de dato a otro.
```java
long n = 1; // coacción implícita
int m = (int) n // coacción explícita
```

**Sobrecarga:** Elementos con la misma etiqueta se diferencian usando tipos.
```run-java
public static void main(String[] args) {
    print("hello");
}
public static void print(int a) {System.out.println("int: "+ a);}
public static void print(String b) {System.out.println("String: " + b);}

```

# Universal

Trabaja sobre una cantidad indefinida de tipos con una estructura común.

**Paramétrico (genericidad):** Una función o clase se declara con un tipo cualquiera, que se puede entender como un parámetro más.
```run-java
class Main {
  public static void main(String[] args) {
    (new Printer<Integer>(10)).print();
  }
}

class Printer<T> {
  T value;
  public Printer(T value) { this.value = value; }
  public void print() {
    System.out.println(value.getClass().getSimpleName() + ": " + value);
  }
}
```

**Herencia:** Las subclases extienden las propiedades y comportamiento de sus superclases.
```run-java
class Main extends Cat {
  public static void main(String[] args) {
    meow();
  }
}

class Cat { protected static void meow() {System.out.println("meow!");} }
```
