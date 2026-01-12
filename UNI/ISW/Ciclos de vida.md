
# *Code-and-fix*

Consiste en programar la funcionalidad sobre la marcha, sin seguir ningún patrón de desarrollo definido, y entregar el producto "acabado" al cliente.

Cuando se hacen programas relativamente complejos, este modelo produce inevitablemente programas con errores impredecibles que se tendrán que ir arreglando conforme surjan (de ahí el *fix*), lo que conlleva un conste de mantenimiento constante

# Desarrollo en cascada

También llamado modelo clásico, consiste en definir una serie de fases por las que se van avanzando poco a poco, volviendo a una fase anterior en caso de que haya problemas durante alguna.

Las fases son las siguientes:
1. **Análisis.** Es donde se define la especificación del programa y se planea el desarrollo y los recursos necesarios.
2. **Diseño.** Es cuando se diseñan las clases, funciones, interfaces, etc.
3. **Codificación.** Se implementan los diseños en código.
4. **Pruebas Unitarias.** Comprueban que los componentes individuales que componen el código (funciones y clases) funcionen correctamente. Si fallan se vuelve a la fase de **codificación**.
5. **Pruebas de Integración.** Comprueban que los componentes individuales del código funcionan se pueden comunicar correctamente entre sí. Si fallan se vuelve a la **fase de diseño**.
6. **Pruebas de aceptación.** Comprueban que el programa completo hace lo que el cliente pedía. En caso de que fallen se debe volver a la **fase de análisis** y empezar todo el desarrollo desde el principio, porque quiere decir que no hemos hecho bien la especificación.

Una vez pasadas las pruebas de aceptación, tenemos un programa válido finalizado al que sólo quedará mantener a lo largo del tiempo. Por suerte, como este modelo conduce a la creación de programas más robustos gracias a toda la planificación previa y las fases de pruebas, la fase de mantenimiento será mucho más sencilla.

> [!important] Nótese que **no se tiene un programa completo**, sea completamente válido o no, hasta el final del desarrollo.

![[Ciclos de vida - cascada.png]]

En la práctica, por diversos motivos, el modelo se acaba deformando de forma que todas la pruebas recaen también sobre la codificación y los cambios que se tengan que hacer durante el mantenimiento pueden hacernos empezar desde la fase de codificación de nuevo.

![[Ciclos de vida - cascada deformada.png]]

En cualquier caso, si bien se produce código de mayor calidad, el desarrollo acaba siendo más lento.

Además, si estamos en un proyecto en el que los requisitos no están claros o pueden cambiar fácilmente y seguimos este modelo, tendremos que volver a comenzar el desarrollo desde el principio cada vez.

## Cascada con prototipado

En esta versión del modelo se trata de validar la propia especificación, no sólo el código, mediante prototipos (hechos de cualquier manera) que la implementen para comprobar como de bien funciona.

Es decir, hacemos en análisis, construimos el prototipo en base a la especificación producida y comprobamos que el programa hace lo tiene que hacer. Si todo está bien, se sigue normalmente el desarrollo en cascada y, si no, se vuelve a empezar la fase de análisis.

![[Ciclos de vida - cascada con prototipado.png]]

Este modelo ayuda cuando aún no se tienen del todo claros los requisitos gracias a la contribución del cliente durante la validación del prototipo y da como resultado código de mayor calidad a cambio de un mayor tiempo de desarrollo.

También, por priorizar la velocidad de desarrollo del prototipo, se pueden adquirir sesgos durante el prototipado que resulten ser malas decisiones para el proyecto final.

# Programación Automática

Este modelo trata de automatizar en medida de lo posible la construcción del software para impedir errores humanos.

Se hace uso de **lenguajes formales de especificación** para definir la especificación. Dicha especificación también hará las veces de prototipo del producto de forma directa o generando el código del prototipo a través de la misma.

Por tanto, cualquier cambio que se haya que hacer durante la validación se ha de hacer únicamente en la especificación.

Como hace uso de un lenguaje formal, el desarrollo puede ser más complicado y limita el tipo de programas que se puede hacer, pero no necesita de pruebas porque, si la especificación está bien, todo estará bien.

El código se generará, en medida de lo posible, a partir del lenguaje formal haciendo uso de algún compilador. Normalmente, no todo podrá ser generado de forma automática, pero se reducen los errores al pasar de la fase de especificación a la de diseño (porque no hay fase de diseño) y al implementar el código (porque las restricciones y relaciones impuestas por la especificación ya estarán representadas).

![[Ciclos de vida - programación automática.png]]

Las principales ventajas que tiene frente al modelo clásico son:
- El prototipado usa un lenguaje estándar en vez de estar hecho "de aquella manera".
- El mantenimiento y (casi) cualquier otro tipo de cambio se harán únicamente sobre la especificación.
- Minimización del error humano.

Sin embargo, todo esto viene a costa del gran esfuerzo de supone el uso de los lenguajes formales.

# Incremental

Es un modelo de **[[#^desarrollo-evolutivo|Desarrollo evolutivo]]** que aplican iterativamente todas las fases del desarrollo en cascada para un **incremento** del producto final. Cada incremento es una versión incompleta, sin todas las características, del producto final.


> [!info] Desarrollo evolutivo
> Es un tipo de desarrollo en el que se produce periódicamente una versión incompleta pero funcional del programa final, lo que le aporta adaptabilidad a requisitos cambiantes. ^desarrollo-evolutivo

![[Ciclos de vida - incremental.png]]

Al trabajar con una escala reducida del proyecto final, es posible desarrollar proyectos que no serían factibles con el modelo tradicional con mano de obra reducida.

Idealmente, cada incremento debería ser valorada por el usuario, y su *feedback* se usa para determinar como hacer el siguiente incremento. Esto es lo que le da la adaptabilidad a este tipo de desarrollos.

La dificultad reside en que no hay forma segura de como de grande debería ser el incremento en cada iteración.

# En espiral

El modelo en espiral es otro [[#^desarrollo-evolutivo|modelo evolutivo]], pero este consiste en repetir 4 fases en orden hasta llegar al final del desarrollo:
- **Planificación.**
    - La primera vez, se hace la recopilación de requisitos y planificación inicial.
    - Después, se ajustan los requisitos y planificación en base a los comentarios recopilados del cliente en la fase de evaluación.
- **Análisis de riesgo.**
    - Una nueva fase que trata de minimizar los riesgos (principalmente costes) que puedan surgir del desarrollo. Se hace porque con este modelo nunca tenemos del todo claro cuál es la meta final.
    - La primera vez, se hace en base a los requisitos iniciales.
    - Las veces siguiente, se toma en cuenta la reacción del cliente.
- **Ingeniería.**
    - Esta es la fase en la que se lleva el desarrollo propiamente dicho: programación, testeo, investigación sobre librerías, etc.
    - Produce productos utilizables (pero no completos) cada vez.
- **Evaluación.** En esta fase se pide el *feedback* del cliente.

![[Ciclos de vida - espiral.png]]

Las desventajas las encapsula la propia existencia de la fase de análisis de riesgos. Como no sabemos la forma que tomará el producto final, solo la que tomará cada iteración, la escala del proyecto de podría salir de control o se podría llegar a un callejón sin salida, por lo que hay que evaluar constantemente la viabilidad de lo que estamos haciendo.

# Metodologías de desarrollo

Definen el qué, quién, cómo y cuándo.

Se establecen relaciones entre las partes del proceso de desarrollo - roles, artefactos, y actividades - y las personas y herramientas que se emplearán en estas partes.

![[Ciclos de vida - metodología.png]]

Las metodologías tradicionales (RUP) se centran mucho en la fase de análisis con tal de evitar errores a futuro, mientras que las más recientes (ágiles) se centran en una constante iteración y interacción con el usuario final.