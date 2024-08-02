---
links:
  - https://www.geeksforgeeks.org/data-aggregation-in-java-using-collections-framework/
  - https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html
  - https://www.geeksforgeeks.org/set-in-java/
---
La agregación de datos es el proceso de combinar múltiples de datos de una o varias fuentes en un solo resultado. Puede involucrar agrupaciones, filtrado o cálculos que den como resultado un conjunto de datos relevante.

La forma principal en la que se llevan a cabo estas operaciones es mediante los tipos de dato que heredan de la interfaz `Collection`.
Al declarar cualquier variable perteneciente a esta interfaz se ha de especificar el tipo de la colección (como `Collection<String> myVar`).

Una colección representa un grupo de objetos, llamados elementos. Dichos elementos pueden estar repetidos o no, ordenados o no, limitados en cantidad o no, etc., según el tipo de colección, pero la interfaz `Collection` provee de una API común a todos los tipos de colecciones.

# Métodos importantes

## `add` y `addAll` *(opcional)[^1]*

Son métodos que se usan para añadir elementos a una colección, y generalmente los añaden al final de la misma. `add` se usa para añadir un sólo elemento mientras que `addAll` introduce todos los elementos de una colección en otra colección.

## `contains` y `containsAll`

Estos métodos se utilizan para comprobar si existe uno o varios elementos equivalentes a alguno de los que está en la colección. De nuevo,  `contains` recibe un sólo objeto mientras que `containsAll` recibe una colección.

## `remove`, `removeAll` y `retainAll` *(opcional)[^1][^2]*

Borran el/los elementos equivalentes a los especificados. `remove` recibe un un sólo objeto y borra sólo elemento, aunque este se repita múltiples veces, y `removeAll` elimina todos los objetos que coincidan con cualquiera de los valores de la colección que recibe como parámetro. `retainAll` sólo conserva aquellos elementos que comparten la colección que lo invoca y la colección que recibe como parámetro

Por otro lado, `clear()` simplemente elimina todos los elementos de la colección indiscretamente.

## `clear` *(opcional)[^1]*

## `toArray`

Devuelve la colección convertida en un array. No se le pasan parámetros.

## `size`

Devuelve la cantidad de elementos en la colección.

# Recorrer colecciones

La interfaz `Collection` no asegura ninguna forma de obtener los elementos que contiene (exceptuando la opción de copiar todos los elementos a un array, que es una operación lenta y cara). Con tal de poder obtener sus elementos y, principalmente, poder recorrer la colección, las colecciones heredan la clase [[El patrón iterador|`Iterable`]], que también permite que se puedan recorrer usando el bucle *foreach*:

```java
Collection<Integer> myCollection = Arrays.asList(1, 2, 3);
for (Integer element : myCollection) {
  // DO SMTH
}
```

# Listas, conjuntos y mapas

Hay tres interfaces principales que implementan `Collection` a partir de las cuales se crean la mayoría del resto de interfaces y clases de colecciones: `List`, `Set` y `Map`.

## Listas

Las listas son colecciones de un mismo tipo en las que los elementos tienen un criterio de ordenación, es decir, se les puede ordenar. También permiten elementos repetidos.

La clase principal que implementa `List` es `ArrayList`, que se puede instanciar así:

```java
List<Double> list = new ArrayList<>();
```

La clase `List`, además de lo que incluye `Collection`, tiene el método `get(int index)` para obtener un valor en una posición concreta, `indexOf(Object o)` y `lastIndexOf(Object o)` para obtener el primer o último objeto igual al deseado, y añade, opcionalmente, un argumento a `add` y `addAll` para especificar la posición en la que escribir.

## Conjuntos

La interfaz `Set` representa los conjuntos tal y como son en matemáticas: un grupo de elementos que no tiene por que tener orden y donde no hay elementos repetidos.

La principal clase que implementa `Set` es `HashSet`:

```java
Set<String> mySet = new HashSet<>();
```

### Conjuntos ordenados

La interfaz `SortedSet` hereda de `Set` y sirve para representar conjuntos que sí que tienen un criterio de ordenación. La principal clase que la implementa es `TreeSet`:

```java
SortedSet<Character> sortedLetters = new TreeSet<>();
```

`TreeSet` realmente implementa `NavigableSet`, que a su vez hereda de `SortedSet`. Esta interfaz también provee de una forma de recorrer el conjunto.

#### Criterios de ordenación propios

Al insertar letras en este conjunto se ordenarán automáticamente en base al criterio de operación natural de las letras, a no ser que se especifique un criterio de ordenación propio usando un `Comparator` (que a partir de Java 8 se puede hacer con una expresión lambda).

```java
SortedSet<Character> sortedLetters = new TreeSet<>((c1, c2) -> {
  return Character.compare(
    Character.toLowerCase(c1), Character.toLowerCase(c2)
  );
});
sortedLetters.addAll(Arrays.asList('c', 'A', 'b'));
```

## Maps

La interfaz `Map` modela el concepto matemático de [[Aplicaciones, inyectividad y sobreyectividad#Aplicación|aplicación]], un conjunto de elementos para el que a cada elemento tiene una relación con un y sólo un elemento de otro conjunto.

La principal clase que implementa esta interfaz es `HashMap`:

```java
Map<Integer, String> monthToStringMap = new HashMap<>(Map.of(
  1, "enero",
  2, "Febrero",
  3, "Marzo"
));
monthToStringMap.put(1, "Enero");
```

Al primer valor del Map se le denomina *key*, y al segundo *value*. El método `Map.of` crea un Map inmutable a partir de pares `key, value`.

Si se conoce la clave correspondiente a un valor se puede obtener éste último usando el método `get`, y se puede obtener un `Set` con las claves con el método `keySet`.

Para los Maps, las funciones para añadir elementos no se llaman `add` o `addAll`, sino `put`, `putIfAbsent` y `putAll` (que recibe un `Map` como parámetro).

[^1]: Sólo se puede usar desde colecciones mutables.
[^2]: Sólo se puede usar en colecciones con elementos comparables