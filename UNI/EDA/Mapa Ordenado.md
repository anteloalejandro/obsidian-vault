
Un mapa ordenado es un colección que soporta las operaciones de un Mapa (de forma eficiente, pero no tanto como el Mapa) además de las de conjuntos ordenados por clave, que permiten operar sobre sucesores, predecesores, mínimos y máximos. Es un balance entre los beneficios de un Mapa y una Lista Ordenada, con un coste máximo de $\log n$.

# Interfaz

La interfaz `MapOrdenado` extiende de `Map` y añade métodos para obtener directamente la entrada (no sólo el valor) correspondiente a la clave mínima, máxima, sucesora y antecesora.

```java title=MapOrdenado.java
public interface MapOrdenado<C extends Comparable<C>, V> extends Map<C, V> {
    EntradaMap<C, V> recuperarEntradaMin(); // Entrada de clave mínima
    C recuperarMin(); // Clave mínima
    EntradaMap<C, V> recuperarEntradaMax(); // Entrada de clave máxima
    C recuperarMax(); // Clave máxima
    EntradaMap<C, V> sucesorEntrada(C c); // Siguiente Entrada a c en orden
    C sucesor(C c); // Siguiente clave a c en el orden
    EntradaMap<C, V> predecesorEntrada(C c); // Entrada anterior a c en orden
    C predecesor(C c); // Clave anterior a c en el orden
    ...
}
```

# Implementación

## Representación

Para representar la estructura se podría usar un HashMap o incluso un lista ordenada, pero en cualquier caso habría operaciones que tendrían tiempo constante o logarítmico, pero otras que tendrían tiempo lineal. En su lugar, el Mapa Ordenado se representa mediante un [[Árbol Binario de Búsqueda]] Equilibrado (ABB equilibrado), para el que todas las operaciones tendrían en promedio un tiempo logarítmico.

La clase `ABBMapOrdenado` tendrá como atributo `ABB<EntradaMap<C, V>> abb` cuyos nodos almacenan una entrada formada por un par clave-valor, por lo que para, por ejemplo, obtener un valor del ABB se llama a la función `recuperar` del objeto `abb`. Nótese que la clase `EntradaHash<C, V>` extiende `Comparable` pero sólo compara en base a `C`.

```java title=ABBMapOrdenado.java
public class ABBMapOrdenado<C extends Comparable<C>, V> implements MapOrdenado<C, V>
{
    protected ABB<EntradaMap<C, V>> abb;
    public ABBMapOrdenado() { abb = new ABB<EntradaMap<C, V>>(); }
    public boolean esVacio() { return abb.esVacio(); }
    public int talla() { return abb.talla(); }
    public V recuperar(C c) {
        EntradaMap<C, V> e = abb.recuperar(new EntradaMap<C, V>(c, null));
        if (e == null) { return null; }
        return e.getValor();
    }
    ...
}
```