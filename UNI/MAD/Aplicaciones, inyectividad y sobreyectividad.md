
# Función

Sean $A$ y $B$ dos conjuntos. $f: A\to B$ es una función si todos los miembros de tienen una imagen o ninguna.

![[función.excalidraw|100%]]
![[no función.excalidraw|100%]]

# Aplicación

$f: A \to B$ es una aplicación si, además de ser una función, todo el conjunto $A$ forma parte del dominio.
$$
D(f)=A \Leftrightarrow f \text{ es aplicación}
$$
![[aplicación.excalidraw|100%]]

## Aplicaciones inyectivas

La aplicación $f: A \to B$ es inyectiva si para todo $b$ incluido en $f(A)$ hay una sola anti-imagen que no se repite, o lo que es lo mismo, que no hay ningún miembro de $A$ que comparta imagen con ningún otro.
$$
f \text{ es aplicación} \land \{x,y \in A \mid Im(x) \neq Im(y)\} \Leftrightarrow f \text{ es inyectiva}
$$
![[aplicación inyectiva.excalidraw|100%]]

## Aplicaciones sobreyectivas

La aplicación $f: A \to B$ es sobreyectiva si todo el conjunto $B$ forma parte de la imagen de $f$.
$$
f \text{ es aplicación} \land B = Im(f) \Leftrightarrow f \text{ es inyectiva}
$$
![[aplicación sobreyectiva.excalidraw|100%]]

## Aplicaciones biyectivas

La aplicación $f: A \to B$ es biyectiva si y sólo si es sobreyectiva e inyectiva.
$$
f \text{ es inyectiva } \land f \text{ es sobreyectiva} \Leftrightarrow f \text{ es biyectiva}
$$
A las relaciones biyectivas también se las llama relaciones de uno a uno, o relaciones 1:1.

![[aplicación biyectiva.excalidraw|100%]]

## Aplicación de identidad
La aplicación $id_{A}: A \to A$ es a. de identidad de $A$ si y sólo si para cualquier miembro de $A$, el resultado de la función es él mismo.
$$
\forall{a\in{A}} \mid id_{A}(a) = a \Leftrightarrow id_{A}\text{ es a. de identidad de } A
$$