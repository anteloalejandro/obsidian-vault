# Creación

**Usando Registros**
```java
// Employee.class
package records;

public record Employee(
  long id,
  String firstName,
  String lastName,
  int age,
  String email
) { }
```

**Usando Clases**
```java
// Employee.class
package classes;

public class Employee {
    long id;
    String firstName;
    String lastName;
    int age;
    String email;


    public Employee(long id, String firstName, String lastName, int age, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
```

# Instancia, uso y principales diferencias
Instanciar la Clase y el Registro es idéntico, ya que los Registros son, esencialmente, clases.
```java
public static void main(String[] args) {
	Employee e = new Employee(1l, "John", "Doe", 38, "johndoe@example.com");
	System.out.println(e);
}
```
Lo que si difiere es, por ejemplo, el método `toString()`. Con el Registro da, para este objeto, `Employee[id=1, firstName=John, lastName=Doe, age=38, email=johndoe@example.com]`, mientras que con la Clase da `classes.Employee@6b95977`, porque el Registro tiene una implementación básica del método, mientras que la Clase deja el método por defecto. Otro ejemplo sería el método `equals()`, que por defecto en las Clases comprueba si dos objetos comparten la misma dirección de memoria, pero en los Registros comprueba si todos los atributos tienen el mismo valor.

El compilador crea Getters para los Registros, pero estos no siguen las reglas de estilo que se suelen seguir en las clases. En su lugar, los crea sin prefijos:
```java
public static void main(String[] args) {
    Employee e = new Employee(1l, "John", "Doe", 38, "johndoe@example.com");
    System.out.printf(
        "%d --> %s %s, age: %d, email: %s\n",
        e.id(), e.firstName(), e.lastName(), e.age(), e.email()
    );
}
```

Por último, cabe destacar que si no se especifica un constructor en una Clase, tiene por defecto un constructor sin argumentos que no establece ningún valor para las propiedades y dicho constructor desaparece si se especifica algún otro, mientras que en los Registros no existe un constructor vacío por defecto, si no que se crea un **constructor canónico** que tiene como argumentos todos los especificados en el registro y que no desaparece aunque se especifiquen más constructores.
# Uso de registros
Los Registros no están limitados a la implementación que da por defecto el compilador, ya que se puede sobreescribir cualquier cosa que haya implementado éste por defecto y además se pueden añadir métodos como en cualquier otra Clase.

```java
public record Point(int x, int y) {
    static boolean isOutsideGraph;

    public Point {
        isOutsideGraph = y < 0 || x < 0;
    }

    public Point(int x) {
        this(x, x);
    }

    public int distanceFrom(Point p) {
        final int xDistance = Math.abs(this.x - p.x);
        final int yDistance = Math.abs(this.y - p.y);
        return (int)(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    }
}
```

Observaciones:
1. Los atributos normales se ponen entre los paréntesis, pero los estáticos se ponen en el cuerpo del Registro.
2. Se puede sobreescribir el constructor canónico con `public Point(int x, int y) {/*do smth*/}`, pero se puede usar un **constructor compacto** que inserta lo que haya entre claves al principio del constructor canónico compilado. No se pueden modificar propiedades normales en este constructor.
3. Se pueden añadir atributos estáticos y métodos, pero el compilador no los tendrá en cuenta a la hora de implementar Getters, `toString()` , `equals()` o cualquier otro método.