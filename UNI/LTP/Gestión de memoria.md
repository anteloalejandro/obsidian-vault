
# Almacenamiento estático

Sucede durante tiempo de compilación. Es el más eficiente y rápido, pero es incompatible con recursión y estructuras cuya forma no está clara hasta ejecutar el código (estructuras dinámicas).

Usado en variables globales, constantes, y casos en los que el compilador detecta que es posible.

# Almacenamiento dinámico

Se calcula y almacenan datos durante tiempo de ejecución. Los datos se almacenan en dos estructuras en memoria, el *Stack* y el *Heap*.

## Stack

Al inicio de la ejecución se reserva un bloque de memoria disponible. El espacio se va gastando desde la última dirección disponible hacia la primera (crece hacia arriba). Tiene una estructura FILO, es decir, el espacio se va liberando desde el principio hasta el final.

En este espacio únicamente se almacenan los datos de tamaño fijo, como variables primitivas, estructuras, y punteros.

## Heap

Los bloques de memoria se reservan y liberan en momentos arbitrarios.

El Heap es necesario para guardar datos de tamaño variable, como objetos, pero también pueden guardar datos de tamaño fijo. En cualquier caso, el espacio gastado por estos datos se tiene que desasignar, lo que en función del lenguaje y entorno de ejecución se habrá de hacer de forma explícita, se hará de forma implícita, o habrá un *garbage collector* que se encargará de hacerlo durante la ejecución del programa.