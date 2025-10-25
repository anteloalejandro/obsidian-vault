
Las unidades segmentadas de instrucciones dividen la circuitería necesaria para llevar a cabo las instrucciones en etapas diferentes que pueden ejecutarse simultáneamente entre ellas, idealmente con una instrucción en cada fase.

Estas etapas, al estar segmentadas, se conectan entre sí mediante registros inter-etapa que almacenan el último valor calculado por la etapa anterior, que será el valor usado por la posterior.

En arquitecturas RISC como MIPS y RISCV, las instrucciones se dividen en 5 etapas:
1. ***Instruction Fetching*, IF**
    - Lee la instrucción (aún codificada) indicada por el PC de la memoria.
    - Normalmente, para soportar saltos condicionales, el siguiente PC no está disponible durante estos hasta que la ALU acabe de calcular el salto condicional, tras la fase EX, lo que produce dos ciclos de parada al saltar.
2. ***Instruction Decoding*, ID**
    - Lee los valores de los operandos en el banco de registros y/o extiende el signo del valor inmediato.
    - Decodifica la instrucción.
    - Si no se puede hacer uso de los registros para evitar riesgos de datos, se para en esta fase para no leer valores incorrectos.
3. ***Execution*, EX**
    - Ejecuta operaciones aritméticas y calcula direcciones para el PC y la fase MEM (para instrucciones load/store).
4. ***Memory*, MEM**
    - Lee y/o escribe en memoria los datos recibidos por la fase EX, por lo que en las operaciones aritméticas no importa lo que haga.
5. ***Write in register Bank*, WB**
    - Escribe los valores en el registro de destino, que ha sido transportado de un  registro interfase al siguiente desde la etapa ID.

![[Ruta de datos segmentada.png]]

# Cortocircuitos

Un cortocircuito no es más que conectar directamente el valor de un registro inter-etapa a otro con tal de evitar esperar a que se finalicen todas las etapas y para evitar paradas.

## De aritmética a aritmética

Hay dos casos en los que se produce un riesgo de datos entre dos instrucciones aritméticas A y B, si están suficientemente cerca (2 instrucciones o menos):

1. A escribe en un registro del que B lee después.
2. **A escribe en un registro en el que B escribe después.**

El segundo caso no se puede arreglar mediante cortocircuitos, pero para el primero se puede aprovechar el hecho de que el resultado está disponible en el registro EX/MEM, que es dos fases antes de la escritura en los registros.

Por tanto, al cortocircuitar los resultados de EX/MEM al registro ID/EX, se pueden evitar **completamente** los ciclos de parada en este caso.

![[Ruta de datos - cortocircuito EX ID.png]]

## De load a aritmética

Cuando una instrucción aritmética va a leer un dato de un registro para el que se tiene que cargar el valor desde la memoria mediante una instrucción load, el valor ya no está disponible al final de la fase EX, en el registro inter-etapa EX/MEM como pasaba en el caso anterior.

En su lugar está disponible, como muy pronto, en el registro MEM/WB. Al cortocircuitar de este registro al ID/EX, aunque es más rápido que esperar a la escritura del registro, no se pueden impedir completamente los ciclos de parada, habiendo siempre uno siempre y cuando la instrucción aritmética sea inmediatamente posterior a la load.

![[Ruta de datos - cortocircuito MEM ID.png]]

Nótese que la misma solución se aplica también a las instrucciones store que van tras una load.

## Instrucciones de salto

Por culpa