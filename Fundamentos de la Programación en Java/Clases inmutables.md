---
links:
  - https://howtodoinjava.com/java/basics/how-to-make-a-java-class-immutable/
---

Una clase inmutable es toda aquella clase a partir de la cual se pueden crear instancias cuyos valores no cambian bajo ningún concepto. Es decir, 'clase inmutable' se refiere a la *inmutabilidad del objeto*, no de la clase per se.

# Cómo crear una clase inmutable

- **Hacer que todos los atributos sean constantes**, haciendo uso de la palabra clave `final`.
- **No permitir que subclases sobrescriban los métodos**, que se puede conseguir con `final class myClass {}`, aunque eso evita que se pueda heredar.
- **Prestar atención a los atributos inmutables con campos mutables**, como las listas, mapas o colecciones, que si se obtiene su referencia se pueden cambiar los valores que contienen. Si se necesita un *getter* para uno de estos campos éste deberá primero hacer una copia y devolver **la copia**.
- **No proveer a la clase de *setters*** y hacer que los campos sean privados. Va estrechamente relacionado con el punto anterior.

```java
final class Person {
  private final long id;
  private final String name;
  private final String lastName;
  private final List<String> addresses;

  public Person(long id, String name, String lastName, List<String> addresses) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.addresses = addresses;
  }

  public long getId() { return id; }
  public String getName() { return name; }
  public String lastName() { return lastName; }
  public List<String> getAddresses() {
    // Copy list using the ArrayList(List) constructor.
    return new ArrayList<String>(this.addresses);
  }
}
```

# *Records* e inmutabilidad

Los `Record` están cerca de ser inmutables por defecto, ya que de por sí sólo tienen *getters* y todos los atributos son inmutables y privados y no se puede heredar. Lo único que les falta por abarcar es asegurarse de que no se puedan mutar los campos de los atributos inmutables, en caso de que los tengan.

Por tanto, para crear un `Record` inmutable se tienen que sobreescribir los *getters* por defecto para los atributos que puedan contener campos. Por ejemplo, en el caso anterior:

```java
public Record(long id, String name, String lastName, List<String> addresses) {
  List<String> addresses() {
    return new ArrayList<String>(addresses);
  }
}
```

# Ejemplos de clases inmutables
- `java.lang.String`
- Todas las clases que corresponden a un tipo de dato primitivo, como `Integer`, `Double`, `Char`, etc...
- `java.math.BigInteger` y `java.math.BigDecimal`
- `java.lang.StackTraceElement`
- Las clases `enum`.
- Los tipos de fecha y hora de `java.time`.