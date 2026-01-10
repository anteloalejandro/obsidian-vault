
El objetivo de la gestión dinámica de instrucciones es evitar los ciclos de parada que ocurren naturalmente en la fase ID, para acercar todo lo posible el CPI a 1. Evitar estas paradas implica detectar y gestionar dependencias entre las instrucciones y permitir que las instrucciones independientes se puedan mover para maximizar el uso de CPU.

Para esto se añade una etapa *Issue* después de la ID que hace las siguientes comprobaciones antes de mandar los datos a la ruta correcta:
- Si el operador implicado está disponible y también lo están los operandos de la instrucción, se ejecuta inmediatamente.
- Si el operador implicado no está disponible, la instrucción espera.
- Si algún operando de la instrucción no está disponible (que sucederá por dependencias de datos), la instrucción debe esperar.

Sin embargo, es menester resolver dos cuestiones que derivan de esto:
- **¿Dónde "esperan" las instrucciones dependientes antes de resolverse?**
    - [ ] Si se detiene en la etapa *Issue* se detiene la decodificación de instrucciones y no se llega al operador. No funcionaría bien porque se también se retrasa a operaciones posteriores que no tienen dependencias al no ser decodificadas del todo.
    - [x] Si se detiene en la etapa correspondiente al propio operador, la instrucción queda correctamente codificada y asignada su operador. 
    - [ ] Con la forma inocente de hacer las cosas, si hay una instrucción independiente detrás de una que se ha detenido (aunque no sea en la etapa *Issue*) y ambas usan el mismo operador, la instrucción independiente se quedará en la etapa *Issue* al no poder entrar en la siguiente etapa por estar ya ocupada, por lo que habrá retrasos de nuevo en todas las instrucciones posteriores, que no serán decodificadas.
    - [x] La forma de arreglarlo es haciendo uso de **estaciones de reserva** que mantengan una cola operandos para cada uno de los operadores (operadores virtuales), permitiendo que haya **múltiples instrucciones esperando en un operando**, en vez de en Issue.
- **¿Como se continúa la ejecución cuando desaparece la dependencia?**
    - Se genera un **grafo de dependencias** de las instrucciones de forma que en la etapa *Issue* se añaden dependencias al grafo, y la etapa *Writeback* las resuelve y elimina.

# Grafo de dependencias

![[Gestión dinámica de instrucciones - diagrama gestión dinámica.png]]

Para el grafo de dependencias, disponemos inicialmente de:
1. Un conjunto de marcas que numeran a las instrucciones (`1`, `2` `3`, ...)
2. Un sistema de marcas que permite asociar operadores y registros a las instrucciones o marcar cualquiera de los dos como liberado (`-`).
3. Un conjunto de registros libres con un valor inicial (pueden haberse ejecutado instrucciones antes).
4. Un conjunto de operadores virtuales libres.

A grandes rasgos, al entrar una nueva instrucción en la fase *Issue* se hace lo siguiente:
- Por cada uno de los registros fuente de la instrucción, comprueba si está marcado en el banco de registros (es decir, no está libre).
    - Si lo está, mira la marca y se conecta la entrada del operador que usaría dicho registro directamente a la salida del operador que tiene esa marca.
    - Si no, se añade el valor contenido en el registro directamente al operador.
- Para el registro destino de la instrucción, pone la marca de esta instrucción en el banco de registros.
    - Si hubiese ya una marca se sobrescribe, pero esto no afecta a las marcas puestas sobre los operadores y, por tanto, tampoco afecta a las dependencias entre instrucciones. Sí que implica que nunca se guardará realmente el valor calculado por la instrucción cuya marca estaba antes, lo que es ideal porque se iba a sobrescribir igualmente y las instrucciones que lo necesitan siguen teniendo acceso a él en el grafo.

Similarmente, cuando una instrucción llega a la fase *Writeback* se hace lo siguiente:
- Se resuelve la operación, que implica escribir el resultado de ésta en el operando o registro al que esté conectada la salida del operador.
- La marca del registro destino se borra del banco de registros, dejando el registro libre de nuevo.

De esta forma, los riesgos RAW se resuelven encadenando operadores virtuales, y los riesgos WAW se resuelven haciendo que sólo la última instrucción en la cadena de dependencias sea la que escriba realmente en el registro, aunque la etapa WB de ésta aparezca antes.

Los riesgos WAR se resuelven automáticamente si se construye y actualiza el grafo en la etapa *Issue* de cada instrucción.

## Ejemplo de grafo de dependencias

![[Gestión dinámica de instrucciones - ejemplo gestión dinámica 1.png]]

![[Gestión dinámica de instrucciones - ejemplo gestión dinámica 2.png]]

![[Gestión dinámica de instrucciones - ejemplo gestión dinámica 3.png]]

![[Gestión dinámica de instrucciones - ejemplo gestión dinámica 4.png]]

![[Gestión dinámica de instrucciones - ejemplo gestión dinámica 5.png]]

Si en esta última diapositiva la instrucción (3) llegase antes a writeback que la (2), con la que tiene riesgo WAR, no habría problema porque en el operador ya está el valor que habría contenido F4 en este punto. O bien el valor F4 se ha cargado en el operador al llegar a la fase *Issue* de (2) o (como es este caso), se vuelva un resultado que se habría escrito en F4 antes de que apareciese la fase *Issue* de (3).

Es gracias a esto a lo que se arreglan los riesgos WAR, aunque el WB suceda fuera de orden.