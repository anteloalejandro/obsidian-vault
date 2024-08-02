---
links:
  - https://blogs.oracle.com/javamagazine/post/new-switch-expressions-in-java-12
---

Java ha incluido un nuevo tipo de sentencia `switch` que carece de la palabra clave `break` y en su lugar siempre detiene el flujo de las comparaciones.

Estas sentencias no usan realmente la sintaxis de las expresiones lambda, ya que ni siquiera devuelven ningún valor, pero es una muy similar.
# Ejemplos
## Ejemplo básico

```java
switch (event) {
  case PLAY -> System.out.println("PLAY event!");
  case STOP -> System.out.println("STOP event");
  default -> System.out.println("Unknown event");
}
```

## Instrucciones de múltiples líneas

```java
switch (event) {
  case PLAY -> {
    System.out.println("PLAY event!");
    counter++;
  }
  case STOP -> System.out.println("STOP event");
}
```

## Múltiples casos con el mismo resultado

```java
switch (event) {
  case PLAY -> 
    System.out.println("The user has triggered the play button");
  case STOP, PAUSE -> 
    System.out.println("The user needs to relax");
}
```

# Comprobación exhaustiva de Enums

Otra diferencia que tiene el nuevo Switch estilo lambda es que si compruebas los valores de un Enum, te fuerza a comprobar todos los posibles valores. En caso contrario, soltará un error de compilación.

```java
public enum Event {
  PLAY, PAUSE, STOP
}
```

```java
switch (event) {
  case PLAY ->
    System.out.println("User has triggered the play button");
  case STOP ->
    System.out.println("User needs to relax");
}; // compile error
```

# Switch como expresión

Supongamos que tenemos un booleano, llamado `isTrue`, y queremos guardar el mensaje `"Sí"` si es correcto y `"No"` si es falso. Hay principalmente dos formas de cumplir esto: Mediante expresiones y mediante sentencias.

*Sentencia*
```java
String message;
if (isTrue) {
  message = "Sí";
} else {
  message = "No";
}
```

*Expresión*
```java
String message = isTrue ? "Sí" : "No"
```

Es decir, las sentencias ejecutan instrucciones, mientras que las expresiones devuelven valores. Con los nuevos Switches se puede hacer lo mismo.

*Switch como expresión*
```java
String log = switch (event) {
  case PLAY -> "User has triggered the play button";
  case STOP -> "User needs a break";
  default -> "No event log";
}
```