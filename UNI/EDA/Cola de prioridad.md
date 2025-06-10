---
titles:
  - Montículo Binario
  - Cola de Prioridad
  - MonticuloBinario
  - ColaPrioridad
  - Heap
---
# Interfaz

La cola de prioridad sólo permite insertar valores y eliminar y obtener el mínimo de los valores de la colección. En caso de que no haya un mínimo, actuará como una cola FIFO.

```java title:ColaPrioridad.java
public interface ColaPrioridad<E extends Comparable <E>> {
    void insertar(E e);
    /** SII !esVacia() */ E eliminarMin();
    /** SII !esVacia() */ E recuperarMin();
    boolean esVacia();
}
```

# Implementación

La implementación será un Montículo Binario, que es un Árbol Binario (AB), es decir, un árbol en el que todos los nodos tienen como máximo un hijo izquierdo y derecho.

## Condiciones

Para que dicho árbol se considere un Montículo Binario, debe mantener las siguientes condiciones tanto antes de operar sobre él, como después:
- **Propiedad Estructural:** El árbol debe ser completo, es decir, todos los niveles del árbol tienen que estar llenos a excepción del último, que puede no estarlo. Además, en este último nivel se mantendrán los nodos a la izquierda y los huecos vacíos a la derecha.
- **Propiedad de Ordenación:** En la raíz del árbol siempre está el valor más prioritario, al que nos referiremos como mínimo. Como todos los subárboles deben ser también montículos binarios, esto se deberá cumplir no sólo para la raíz, sino para todos los nodos, los hijos de cualquier nodo siempre deberán ser menores que él.

Nótese que la propiedad de ordenación no asegura que los nodos estén ordenados, sólo que los hijos son menores que los padres.

## Representación en memoria

El *heap* se representa mediante un array redimensionable  siguiendo el método de Eytzinger. Con este método se almacena el i-ésimo nodo en la i-ésima posición, dejando sin ocupar la posición 0. Gracias a éste método, se pueden representar y navegar fácilmente los niveles y la relación entre nodos padres e hijos.
- `elArray[1]` es la raíz
- `elArray[i]` es el nodo i
- Si `i` es par es hijo izquierdo y en caso contrario es hijo derecho
- `elArray[2*i]` y `elArray[2*i+1]` son los hijos izquierdo y derecho del nodo `i`
- `elArray[i/2]` es el padre del nodo `i`, a no ser que `i` sea la raíz

## Métodos esenciales

La clase MonticuloBinario tiene los atributos `{java} static final int C_P_D`, `{java} E[] elArray` y `{java} int talla`, y se inicializa así:

```java
public MonticuloBinario(int n) {
    elArray = (E[]) new Comparable[n];
    talla = 0;
}
public MonticuloBinario() { this(C_P_D); }
public boolean esVacía() { return talla == 0; }
```

El valor mínimo se encuentra en la raíz, así que obtenerlo es trivial.
```java
public E recuperarMin() { return elArray[1]; }
```

Al eliminarlo, sin embargo, se debe mantener la estructura del AB y elegir un nuevo nodo raíz. Para conseguirlo, se intercambian los valores de la raíz con el del último nodo en el array y se reduce la talla del mismo, dejando al que era el último nodo como raíz temporalmente y volviendo efectivamente inaccesible a la antigua raíz.

Sin embargo, el nodo que estaría en ese momento como raíz no es válido, ya que no es el más prioritario, por lo que se emplea una estrategia de **hundido** en la que se va intercambiando al nodo actual (empezando por la raíz) por el menor de sus hijos hasta que se llegue al final o no haya ningún hijo menor.

Nótese que en vez de mover nodos, se intercambiarán sus valores. Tampoco nos molestaremos en guardar la raíz al final, pues no se va a usar de todos modos.

![[Cola de prioridad - hundido.png]]

```java
public void eliminarMin() {
    // intercambiar y eliminar
    E min = elArray[1];
    elArray[1] = elArray[talla--];
    // mantener ordenación
    hundir(1);
    
    return min;
}

/** Omega(1), O(log n) */
public void hundir(int pos) {
    E aHundir = elArray[pos];
    int hijo = pos * 2;
    boolean esHeap = false;
    while (hijo <= talla && !esHeap) {
        // elegir el menor de los hijos,
        // sólo si el hijo actual no es el último
        if (hijo < talla
            && elArray[hijo+1].compareTo(elArray[hijo]) < 0) {
            hijo++;
        }
        
        // Si el menor de los hijos es menor que su padre,
        // mover al hijo a la posición del padre y avanzar
        if (elArray[hijo].compareTo(aHundir) < 0) {
            elArray[pos] = elArray[hijo];
            pos = hijo;
            hijo = hijo*2;
        } else {
            esHeap = true;
        }
    }
    // en vez de guardar el valor a hundir en cada iteración, se guarda sólo aquí
    elArray[pos] = aHundir;
}
```

Insertar sigue el proceso contrario; se aumenta la talla y se inserta al final, y se sigue una estrategia de **reflotado** que consiste en intercambiarlo reiteradamente con su padre hasta que éste tenga mayor prioridad que él.

```java
public void insertar(E e) {
    if (talla == elArray.length - 1) duplicarArray();
    elArray[++talla] = e;
    reflotar(talla);
}

/** Omega(1), O(log n), Theta(1) en promedio */
public void reflotar(int pos) {
    E aFlotar = elArray[pos];
    int padre = pos / 2;
    while (pos > 0 && aFlotar.compareTo(elArray[padre]) < 0) {
        elArray[pos] = elArray[padre];
        pos = padre;
        padre = padre / 2;
    }
    elArray[pos] = aFlotar;
}
```

## Métodos adicionales

### Arreglar AB para que sea un Heap

Para arreglar un AB todo lo que hay que hacer es hundir (o reflotar) uno a uno todos los nodos, lo que implicaría un $\Theta(n)$. Sin embargo, se puede hacer con $O(\log n)$ si hundimos los nodos que tengan hijos desde abajo hasta arriba.

```java
// solución inocente
public void arreglar() {
    for (int i = 1; i <= talla; i++) {
        hundir(i);
    }
}

// solución óptima, recursiva
public void arreglar() { arreglar(1); }
private void arreglar(int i) {
    // detener si no tiene hijos, o sea, si es una hoja
    if (i > talla/2) return;
    
    // arreglar los hijos, si existen
    if (2*i <= talla) arreglar(2*i);
    if (2*i+1 <= talla) arreglar(2*i+1);
    
    hundir(i);
}
```