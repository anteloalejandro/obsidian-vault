
# Conceptos

- Camino: Sólo existe un camino de la raíz a un nodo cualquiera
- Longitud: El número de aristas que componen un camino
- Profundidad: Longitud del camino que va desde la raíz a un nodo dado. La raíz tiene una profundidad de 0
- Altura: Longitud del camino que va desde el nodo hasta la hoja más profunda. La altura del árbol es la altura del nodo raíz.
- Talla: El número de nodos que forman el árbol.
- Árbol binario: árbol con dos hijos como máximo, izquierdo y derecho.
    - Hay como máximo $2^{i}$ nodos en el nivel $i$
    - En un árbol de altura `H`, hay hasta $2^{H+1}-1$ nodos y $2^{H}$
    - Es completo si tiene todos los niveles llenos menos el último, que no tiene por que estar lleno. En el último los nodos tienen que estar tan a la izquierda como sea posible.

# Recorrido de árboles binarios

- En anchura, Breadth First Search (BFS): Se recorre los nodos nivel a nivel, de izquierda a derecha.
- En profundidad, Depth First Search (DFS): Los nodos se recorren bajando por las ramas del árbol y registrando los nodos siguiendo un orden predefinido.
    - Pre-order: Raíz (registrar), izquierda, derecha.
    - In-order: Izquierda, raíz (registrar), derecha.
    - Post-order: Izquierda, derecha, raíz (registrar).

![[Árbol Binario de Búsqueda - Recorrido.png]]

# Condiciones

Para que un árbol binario se considere un Árbol Binario de Eúsqueda (ABB) Equilibrado, primero deben asegurarse las siguientes condiciones antes y después de operar con él:
- **Propiedad Estructural:** Debe ser un AB equilibrado, es decir, un árbol todo lo similar posible al completo. En definitiva, no tiene que haber diferencias de altura entre nodos superiores a 1, pero puede haber múltiples nodos con una sola hoja.
- **Propiedad de Ordenación:** Debe estar organizado de forma que todos los hijos a la izquierda de un nodo cualquiera sean menores o iguales que dicho nodo (mayor prioridad), y que todos los nodos a la derecha sean estrictamente mayores (menor prioridad).

Si se cumplen estas condiciones, todos los subárboles de un ABB equilibrado serán, a su vez, un ABB equilibrado.

Además, los ABB pueden codificar en sus aristas el intervalo de datos que se pueden alcanzar usando esa arista y la de todos los descendientes siguientes. Las implementaciones en código no usan este método exactamente, pero la idea es útil para entender donde hay que buscar e insertar los valores sin tener que hacer una búsqueda exhaustiva de los valores que existen.

![[Árbol Binario de Búsqueda - Aristas ABB.png]]

El equilibrio depende en gran medida de cómo se inserten los datos. Para crear un ABB equilibrado dado un conjunto de datos se coge el elemento central `v[mitad]` y se inserta como raíz, cuyos hijos serán las raíces de los ABB generados por `v[0] .. v[mitad-1]` y `v[mitad+1] .. v[talla-1]`, y así sucesivamente. Sin embargo, al ir insertando nuevos valores, el árbol va a acabar cada vez menos equilibrado con el tiempo.

# Implementación

Para la implementación se hace una clase `ABB` que da acceso al usuario a los métodos correspondientes y tiene como atributo `raiz` un `NodoABB`, que contiene el dato del nodo, una referencia a sus dos hijos y la talla del nodo.

```java title=ABB.java
public class ABB<E extends Comparable<E>> {
    protected NodoABB<E> raiz;
    public ABB() { raiz = null; }
    public boolean esVacio() { return raiz == null; }
    public int talla() { return talla(raiz); }
    protected int talla(NodoABB<E> actual) {
        if (actual == null) { return 0; }
        return actual.talla;
    }
    ...
}
```

```java title=NodoABB
class NodoABB<E> {
    protected E dato;
    protected NodoABB<E> izq, der;
    protected int talla;
    NodoABB(E e) {
        dato = e;
        izq = null; der = null;
        talla = 1;
    }
}
```

## Métodos

La carga lógica de la obtención de los datos la lleva la clase `NodoABB`, que cuenta con un método `recuperar` que devuelve el nodo que contiene el dato `E e` dentro del árbol que tiene como raíz a `NodoABB<E> actual`, recorriendo in-order ¿? dicho árbol comparando ambos datos y eligiendo un camino en base a la comparación.

```java title=NodoABB.java
// DFS In-order, O(log n)
protected NodoABB<E> recuperar(E e, NodoABB<E> actual) {
    if (actual == null) return null;
    NodoABB<E> res = actual;
    int cmp = e.compareTo(actual.dato);
    if (cmp < 0) res = recuperar(e, actual.izq);
    else if (cmp > 0) res = recuperar(e, actual.der);
    else return res;
}
```
```java title=ABB.java
protected E recuperar(E e) {
    Nodo<E> nodo = recuperar(e, raiz);
    return nodo == null ? null : nodo.dato;
}
```

Para insertar se utiliza a grandes rasgos la misma lógica, pero si se encuentra el nodo se actualiza el valor y si no se crea un nodo nuevo. Como la talla se tiene que actualizar en todos los progenitores del nodo que se cambie, así que después de decidir donde guardar el nodo mediante la comparación y llamadas recursivas a `insertar`, se sobrescribe la talla como `res.talla = 1 + talla(res.izq) + talla(res.der)`, y al actualizar la talla primero en los nodos inferiores y luego en los superiores, todos los superiores tendrán su talla correctamente actualizada. Nótese que el método `insertar` devuelve la raíz, ya que se podría haber insertado el nuevo nodo como raíz.

```java title=NodoABB.java
protected NodoABB<E> insertar(E e, NodoABB<E> actual) {
    if (actual == null) return new NodoABB<E>(e);
    
    NodoABB<E> res = actual;
    int cmp = e.compareTo(actual.dato);
    if (cmp < 0) res.izq = insertar(e, actual.izq);
    else if (cmp > 0) res.der = insertar(e, actual.der);
    else res.dato = e;
    
    res.talla = 1 + talla(res.izq) + talla(res.der);
    return res;
}
```
```java title=ABB.java
protected NodoABB<E> insertar(E e) {
    raiz = insertar(e, raíz);
}
```
Eliminar también sigue una lógica similar, pero al averiguar el nodo que debe eliminar se tiene que mantener todos los nodos descendientes. En vez de recorrer uno a uno todos los nodos por debajo del nodo a eliminar e ir reformando el árbol, se hace uso del método `recuperarMin` para obtener "directamente" el mínimo de la derecha (que siempre será raíz válida del subárbol actual) y `eliminarMin` para borrar dicho mínimo, cuyo valor ya habrá sido copiado al nodo actual.

```java title=NodoABB.java
protected NodoABB<E> eliminar(E e, NodoABB<E> actual) {
    if (actual == null) return new NodoABB<E>(e);
    
    Nodo<E> res = actual;
    int cmp = e.compareTo(actual.dato);
    if (cmp < 0) res.izq = eliminar(e, actual.izq);
    else if (cmp > 0) res.der = eliminar(e, actual.der);
    else {
        if (actual.izq == null) return actual.izq;
        else if (actual.der == null) return actual.der;
        else {
            res.dato = recuperarMin(actual.der).dato;
            res.der = eliminarMin(actual.der);
        }
    }
    res.talla = 1 + talla(res.izq) + talla(res.der);
}
```
```java title=ABB.java
protected NodoABB<E> eliminar(E e) {
    raiz = eliminar(e, raíz);
}
```

Las funciones para recuperar y eliminar el mínimo consisten simplemente en recorrer la rama izquierda del árbol hasta alcanzar la hoja, que se hace en $O(\log n)$. Para eliminar se tiene que sustituir la referencia que tiene el padre de él con el hijo derecho del mínimo, si no se perderán todos esos valores. Con los máximos sucede lo mismo, pero recorriendo la rama derecha.

```java title=NodoABB.java
protected NodoABB<E> recuperarMin(NodoABB<E> actual) {
    if (actual.izq == null) return actual;
    return recuperarMin(actual.izq);
}
protected NodoABB<E> eliminarMin(NodoABB<E> actual) {
    if (actual.izq == null) return actual.der;
    // cuando actual.izq sea el mínimo, lo sobrescribirá con actual.izq.der
    actual.izq = eliminarMin(actual.izq);
    talla--;
    return actual;
}
```
![[Árbol Binario de Búsqueda - eliminarMin.png]]

El sucesor es el siguiente elemento ordinalmente, es decir, el mínimo de su hijo derecho. Sin embargo, no es tan simple como buscar el nodo y calcular su sucesor, pues también debemos ser capaces de calcular el sucesor de un nodo que no existe o, lo que es lo mismo, el siguiente valor más grande.

En definitiva, el sucesor es **el primer nodo al que se vuelve por la izquierda**, de modo que aunque el nodo cuyo sucesor se busca no exista en el árbol se puede recorrer igual.

```java title=NodoABB.java
protected NodoABB<E> sucesor(E e, NodoABB<E> actual) {
    if (actual == null) return null;
    NodoABB<E> res = null;
    if (e.compareTo(actual.dato)) {
        // Recorrer por la izquierda. Si se ha llegado al final,
        // vuelve por la izquierda y el resultado es el nodo actual.
        res = sucesor(e, actual.izq);
        if (res == null) res = actual;
    } else {
        // Recorrer por la derecha. Si se llega al final,
        // vuelve por la derecha y no hay sucesor.
        res = sucesor(e, actual.der);
    }
    return res;
}
```
```java title=ABB.java
public E sucesor(E e) {
    NodoABB<E> nodo = raiz.sucesor(e, raiz);
    return nodo == null ? null : nodo.dato;
}
```

Finalmente, el método `seleccionar` coge el k-ésimo dato más pequeño (por tanto, con $k=1$ es igual al mínimo). Lo primero que hay que tener en cuenta es que se puede acotar la búsqueda al árbol derecho o izquierdo según si $k$ es superior o no a la talla del hijo izquierdo; si es superior no puede estar en el subárbol que tiene como raíz el hijo izquierdo. Además, si $k = \mathrm{talla}+1$, el elemento a seleccionar es precisamente el actual.

```java title=NodoABB.java
protected NodoABB<E> seleccionar(int k, NodoABB<E> actual) {
    int tallaIzq = actual.izq == null ? 0 : actual.izq.talla;
    if (k <= tallaIzq) return seleccionar(k, actual.izq);
    else if (k == tallaIzq+1) return actual;
    else return seleccionar(k, actual.der);
}
```