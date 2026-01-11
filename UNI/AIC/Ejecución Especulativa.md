
La idea de la ejecución especulativa es, dada una predicción de salto, ejecutar la ruta de ejecución predicha de forma preventiva de modo que, si resulta ser cierta, no hemos perdido nada de tiempo. La palabra aquí es **ejecutar**, a diferencia de la predicción de saltos normal, no solo buscamos y decodificamos la instrucción, sino que también entramos en la fase de ejecución o una fase equivalente, pudiendo ir incluso hasta la fase de WB.

La dificultad reside en que si ejecutamos la ruta de ejecución predicha y la predicción no es correcta, habremos cambiado el estado de los registros o incluso de la memoria de forma irreversible, pero si evitamos ejecutar código que pueda causar este tipo de problemas no ganamos básicamente nada de rendimiento.

La solución, a grandes rasgos, consiste en:
1. Tener registros de reserva para evitar sobrescribir registros que puedan ser utilizados en caso de que la predicción falle.
2. Insertar ciclos de parada cuando no haya suficientes registros de reserva y haya conflictos.
3. Lo más importante, no efectuar ningún cambio "real" en WB o MEM.

Sin embargo, si no guardamos ningún, no conseguimos guardar ninguna clase de estado. Para guardar los cambios añadiremos una última fase, *Commit*, que será en la que se guarden finalmente los cambios.

La particularidad de esta fase es que siempre se lleva a cabo según el orden de ejecución de las instrucciones y nunca se va a ejecutar antes de comprobar si la predicción de salto es correcta.

Las fases de ejecución y escritura se pueden dar fuera de orden, y en principio no haría falta hacer más cambios en el resto de fases porque ya van inherentemente en orden, pero combinaremos ID e *Issue* en una sola fase I (también simplemente llamada *Issue* a veces) .

# Ruta de datos

La ruta de datos se complica considerablemente, ya que además de las estaciones de reserva de operandos para la gestión dinámica de instrucciones, tenemos un *Reorder Buffer* o ROB que controla la fase de *Commit*, todo ello comunicado por un *Common Data Bus*, CDB o bus común de datos.

![[Ejecución Especulativa - Ruta de datos.png]]

Las transferencias por el bus de datos se realizan en dos fases:
1. **Fase de preparación**. Durante la etapa *Issue*. Se conoce el orden y el destino de la transferencia, pero el valor concreto que se va a transferir.
2. **Fase de transferencia.** Durante la etapa *Writeback*. Se realiza la transferencia, pues ya se ha obtenido el dato.

También es importante saber que:
- Todo elemento que genera un resultado por el bus difunden dicho resultado junto un código que identifica la instrucción que lo ha producido. Notablemente:
    - Operadores virtuales / estación de reserva de los operadores.
    - Buffers de carga.
- Todo elemento que lee datos del bus tiene asignada una marca que identifica la instrucción de la que esperan el resultado. Notablemente:
    - Estaciones de reserva.
    - Buffers de carga.
    - Buffers de almacenamiento.
- El bus funciona por difusión; cuando un elemento vuelca un dato, escribe su código, todos los elementos escuchan y, si su marca coincide con el código del elemento, leen el dato.

# *Reorder Buffer*

El ROB se encarga de:
- **Mantener el orden de las instrucciones**
    - En la etapa *Issue* se reserva una entrada en el ROB, que se usará como marca.
- **Almacenamiento temporal**
    - En la etapa *Writeback* se escribe en la entrada correspondiente del ROB en vez de en el registro destino.
    - Además, toda instrucción dependiente obtendrá sus operandos del ROB en vez de los registros que causan la dependencia.
- **Excepciones**
    - Durante la fase *Commit* no se pueden dejar excepciones sin gestionar porque resultarían en estados intermedios extraños, así que en caso de excepción también se anota en el ROB en la entrada correspondiente.

Cuando se llega a la etapa *Commit*, es decir, cuando se ejecuta la instrucción más antigua del ROB, si no hay saltos condicionales o la predicción es correcta...
- Si ha habido una excepción, se lanza la rutina de servicio necesaria.
- Se escribe el resultado desde el ROB al registro destino o a la posición de memoria correcta.
- Se libera la entrada del ROB.

Sin embargo, si la predicción falla y se llega a la fase *Commit*, se borra todo el contenido del ROB después de la instrucción de salto, marcas y todo, por lo que tampoco se lleva a cabo ninguna escritura o excepción que sucediese en las instrucciones de la ruta de instrucciones predicha.


> [!info] Escritura con dependencias en la fase *Commit*
> Nótese que si bien en [[Gestión dinámica de instrucciones]] decíamos que no se hacían escrituras si había una instrucción posterior que fuese a escribir en el mismo sitio porque no era necesario, **siempre se escribe** cuando una instrucción llega a *Commit*, aunque el registro este marcado por otra instrucción.
> 
> Esa otra instrucción simplemente sobrescribirá el cambio más tarde, porque simplifica la lógica.


# Algoritmo de Tomasulo

