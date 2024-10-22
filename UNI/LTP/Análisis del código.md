
**Léxico:** Válida que todos los tokens sean válidos individualmente
```java
int 1x = 3; // 1x no es un token válido
```

**Sintáctico:** Comprueba que los tokens tengan un orden correcto.
```java
int 3 = x; // entero literal no puede ir en ese lado de la asignación
```

**Semántico:** Comprueba que el sentido de los tokens sea coherente
```java
int x = '3'; // no se puede almacenar un char dentro de una variable int
```