
# Sacrificios por el teorema CAP

Por el teorema CAP, en los sistemas escalables siempre habrá que sacrificar la consistencia, disponibilidad y la tolerancia al particionado.

## Particionado

No se admitirá que la red se particione, y habrá que garantizar la conectividad.

No es realista ni especialmente útil, así que no se recomienda.

## Disponibilidad

Se adoptara el modelo de partición primaria, en el que sólo el grupo mayoritario de nodos funcionales seguirá funcionando. Estos nodos funcionarán con consistencia fuerte.

## Consistencia

La opción que se suele elegir.

Se hace uso de un modelo particionable en el que los grupos siguen funcionando a pesar de haber sido aislados, con lo que se sacrifica la consistencia entre grupos y se optará por una consistencia eventual.

# Replicación multi-máster

Los dos modelos tradicionales de replicación están pensados para asegurar consistencia fuerte, de modo que no son del todo aptos para los sistemas que queremos montar, en los que sacrificamos consistencia.

De esta necesidad nace el modelo de replicación multi-máster, que se basa en el modelo pasivo añadiendo unas cuantas características:
1. Hay múltiples réplicas primarias, llamadas máster.
2. Cada solicitud la atiende un máster, pero puede ser un máster distinto cada vez.
3. La respuesta se envía de inmediato al cliente esperar a la replicación en las réplicas secundarias.
4. Las posibles modificaciones se envían al resto de réplicas secundarias y másters.

Sigue teniendo las ventajas que tiene el modelo pasivo (bajo consumo, admite operaciones no deterministas, etc.) y aumenta la escalabilidad a costa de la posibilidad de que si un máster se cae las peticiones en curso se puedan perder, dando lugar a problemas de consistencia más fácilmente. Además, conserva los problemas de gestión de fallos del modelo pasivo.

# NoSQL

Las bases de datos eliminan algunas de las funciones y garantías de las bases de datos SQL con tal de simplificar el almacenamiento de información, sobretodo el almacenamiento distribuido y escalable.

Los hay de tres grandes tipos:
- Clave-valor: Solo constan de una clave y un valor, no hay soporte para ningún tipo de estructura o consulta compleja
    - Ejemplo: Redis y DynamoDB
- Basado en documentos: Usan un formato como JSON, XML, YAML o derivdados para estructurar la información, pero los documentos no tienen una estructura fija concreta. Además, suelen admitir objetos como campos.
    - Ejemplo: MongoDB, CouchDB
- Basados en registros extensibles: En este caso si usan tablas, pero admiten un número y tipo variable de columnas que pueden particionarse por columnas o por filas. Esto da lugar a *sharding*.