
# Definición y características principales
La Programación Orientada Objeto está basada en el concepto de Objeto, que es una estructura de datos que contiene datos o atributos (propiedades) y comportamiento o funcionalidad (métodos).
Los Objetos son creados o instanciados a partir de una [[#Clases|Clase]], una suerte de plantilla que define cuáles son sus atributos y funcionalidad.

Las características principales por las que se suele definir la POO son:
- Polimorfismo
- [[#Encapsulación]]
- Herencia
- Abstracción

# Modularidad
La facilidad o capacidad de un programa para separarse en módulos que ayuden a la comprensión, mantenimiento y escalabilidad del código.
En Java el código se divide modularmente creando clases en diferentes archivos, agrupadas bajo un paquete, que corresponde a un directorio.

# Encapsulación
La capacidad de ocultar detalles de implementación/funcionamiento interno.
La idea es crear una interfaz, contrato o API que haga accesible a los usuarios las funcionalidad deseadas, mientras se ocultan todos los atributos y métodos que hacen que se puedan llevar a cabo dichas funciones.

# Reutilización
Lo fácil que es utilizar la funcionalidad expuesta y las diversas Clases e Interfaces sin conocer los detalles de implementación.

# Legibilidad
Lo fácil que es para otra persona entender el código. Se consigue adhiriéndose a las reglas y guías de estilo, además de modularizando y encapsulando adecuadamente el código

# Cohesión
Cuanto mejor definida y más específica es la funcionalidad de una Clase y sus métodos, más cohesiva es. Esto hace que sea más fácil de depurar y mantener.

# *Low coupling*
Se basa en reducir todo lo posible la dependencia entre unas clases y otras para poder funcionar. Si no se cumple este principio, mantener el código se vuelve difícil porque los cambios pueden tener efectos secundarios y refactorizar adecuadamente el código se vuelve un trabajo arduo.

# Clases, Registros e Interfaces

## Clases
Las Clases son la base a partir de la cual se instancian los objetos. A partir de la Clase se puede definir los atributos y definir e implementar la funcionalidad.

Las Clases se crean a base de tipos de datos ya existentes, agregándolos para crear un tipo de dato nuevo con, potencialmente, nueva funcionalidad.

También con *métodos de factoría* o *métodos constructores*, que son los que se encargan de instanciar los objetos. En éstos, normalmente, se provee a las propiedades de valores iniciales. Como suele ser un proceso repetitivo, Java provee de [[#Registros]] o *Records* para simplificar este paso.

Además, pueden extender los atributos y funcionalidades de otra clase mediante la herencia. Para evitar colisiones entre propiedades y métodos de múltiples clases, sólo se puede heredar o extender una sola Clase, a la que se suele llamar Padre, aunque una Clase puede ser heredada por muchas diferentes. Otra restricción de la herencia es que se tiene que utilizar el método constructor del padre, aunque luego se pueden sobreescribir las propiedades y los métodos heredados.

Los atributos y funcionalidad de las Clases puede ser de dos tipos: Específico de cada instancia o compartido entre todas las instancias (también llamado estático).

## Interfaces
Una interfaz es, esencialmente, una Clase en la que **no se puede implementar nada, sólo definir**. Es decir, se puede declarar que propiedades tendrán los objetos y cómo serán los métodos, pero no se puede implementar su funcionamiento. 

Las Interfaces, al igual que las Clases, sirven para crear tipos nuevos, pero no se pueden instanciar Objetos a partir de éstas sin más.

Otra diferencia importante con las Clases es que otras Clases (o Interfaces) pueden "heredar" de múltiples Interfaces sin problemas, ya al no poder implementar el comportamiento no es posible acabar con un objeto con comportamiento inesperado o indefinido pero las Clases que hereden de una interfaz deberán implementar todos los métodos especificados individualmente. A esta "herencia" se le llama *implementación* en vez de *extensión*.

## Registros
Los Registros o *Records* son tipos especiales de Clase introducidos en Java 16 que dejan al compilador que se encargue la encapsulación, de los métodos constructores y de la implementación de algunos métodos comunes a todos los objetos, como `toString()`.

[[Clases vs Registros]]