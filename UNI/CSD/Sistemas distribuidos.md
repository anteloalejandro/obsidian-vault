
# Definición

Conjunto de ordenadores independientes que **fingen ser un sólo servidor**. Están formadas por:
- **Máquinas autónomas:** No comparten hardware, ejecutan código y fallan de forma independiente.
- **Algoritmos distribuidos:** Cada nodo ejecuta una parte del algoritmo concurrentemente con el resto de nodos del sistema distribuido, que usualmente se comunican entre sí y se sincronizan mediante mensajes. Si se abstrae mucho, se puede entender al propio sistema distribuido como una colección de algoritmos distribuidos.

# Características

## Transparencia de distribución

Se define como capacidad del sistema de fingir ser una sola máquina. No lo mismo que un sistema en red cualquiera, donde varias máquinas colaboran sin fingir ser la misma ($\text{Sistema distribuido} \implies \text{Sistema en red}$). Lo que importa para determinar si un sistema es o no distribuido es la experiencia del usuario.

Para conseguir esta característica se deben ocultar diferentes aspectos, llamados **Ejes de transparencia**. Aunque hay más, los tres principales son:
- **Transparencia de ubicación:** Se oculta la ubicación física de los recursos, es decir, en qué máquina o servidor están. Para ello los recursos identificar con **nombres simbólicos únicos**, y se accede a ellos gracias a un **Servicio de Nombres**, que localiza y busca recursos.
- **Transparencia de fallos:** Se oculta el hecho de que los componentes del sistema pueden fallar, y se trata de impedir que el fallo afecte al usuario. Para ello se utilizan **detectores de fallos** que monitorizan de forma constante a los nodos, **replicación** para recuperar el estado del sistema antes del fallo, y **algoritmos tolerantes a fallos** que reaccionan adecuadamente al fallo de uno o más nodos.
- **Transparencia de replicación:** Se oculta el hecho de que los recursos pueden estar replicados en varios nodos a la vez. La replicación de los recursos, que se hace para otorgar tolerancia a fallos, puede causar problemas de consistencia entre el estado actual del mismo recurso en diferentes nodos, pero eso no tiene que afectar al usuario. Se emplean algoritmos de balanceo de carga, que deciden qué replica sirve cada petición, y algoritmos de replicación que aseguren la consistencia entre replicas, siempre y cuando sea factible.

Irónicamente, en este contexto *transparencia* sería más correctamente descrito como *opacidad*.

## Transparencia de 

# Middleware

Conceptualmente, es una capa de software entre el nivel de aplicación y el de transporte, que comparten todos los nodos de un sistema distribuido, a los que les ofrece servicios más allá de lo que puede el sistema operativo, del cual es agnóstico.

![[sd-middleware.excalidraw|100%]]

Un sistema distribuido no tener middleware, puede estar compuesto simplemente de nodos en una red forzados a actuar como un sistema distribuido programando toda la complejidad que esto conlleva "a pelo". El middleware, sin embargo, permite abstraer el sistema simplificando la lógica y facilitando la portabilidad e interoperabilidad.

A un sistema distribuido sin middleware se le denomina  "puro", mientras que los que sí lo usan son **Sistemas Distribuidos Extendidos**.

## Tipos de middleware

Existen diferentes tipos de middleware, que utilizan abstracciones diferentes para la comunicación y crean diferentes tipos de Sistemas Distribuidos Extendidos.

### Orientados a Objetos

Utilizados por lenguajes orientados a objetos, como [[Java RMI|Java con su RMI]]. Permite invocar a métodos de objetos como si todos fuesen locales, haciendo uso de los **Objetos Remotos**, que residen en otros nodos. A menudo abstrae el hecho de si el objeto es remoto o no.

### Orientados a Comunicaciones

Tienen elementos de comunicación intermedios ¿?

### Orientados a Eventos

Los nodos emiten mensajes a los que el resto de nodos pueden estar esperando o no. Una vez llegue el mensaje, los nodos ejecutarán alguna función asociada al mensaje. Se incluye en este tipo de middleware los modelos suscribibles. 