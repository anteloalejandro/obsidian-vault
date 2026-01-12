
Es una forma de montar sistemas en la que tenemos capas apiladas bien diferenciadas  de forma que las capas superiores se montan haciendo uso de los servicios de las inferiores, pero nunca al revés. En cierto sentido, hay una relación cliente/servidor entre las capas inferiores (dan servicio) y las superiores (hacen peticiones).

El beneficio de trabajar con capas es separar la complejidad en componentes bien definidos con dependencias mínimas de otros componentes. Precisamente por esto, se recomienda trabajar con capas **cerradas**, que sólo pueden acceder a los servicios de la capa inmediatamente inferior.

Otra ventaja es que, gracias a la separación de preocupaciones, se pueden asignar personas o equipos distintos a trabajar en las distintas capas de forma paralela.

Las capas pueden ser cualquier división entre las partes de un programa, pero generalmente se uso, por lo menos como punto de partida, una arquitectura de 3 capas:
- **Presentación.** La parte con la que interactúa el usuario y recibe su entrada.
- **Lógica de negocio.** Se encarga de darle el groso de la funcionalidad a la aplicación.
- **Persistencia.** Se encarga del almacenamiento de los datos (qué, cuándo y cómo).

Este modelo es suficientemente flexible como para poder tener varias instancias de cada capa (por ejemplo, una BBDD principal con una BBDD caché) sin necesidad de cambiar significativamente el funcionamiento del resto de capas.

Además, las capas se pueden dividir en sub-capas cuando crecen demasiado o, más comúnmente, combinar de una de dos formas:
- **Clientes ligeros:** se combinan la capa de negocio y de datos, integrándolas más cercanamente en una capa que define la aplicación. Permite fácilmente tener varias instancias de la capa de presentación a cada aplicación, dando lugar a la arquitectura que se suele asociar a los servidores web.
- **Clientes pesados:** aquí se combinan la capa de presentación y negocio y, a veces, también la de negocio y datos. Se usa a menudo para hacer interfaces más interactivas, pero complica mucho razonar sobre el estado de la aplicación en cada cliente. Es lo que conseguimos con *frameworks full-stack* como *React*.


> [!warning] Niveles vs. Capas
> Las capas hacen referencia a la segmentación lógica, mientras que los niveles hacen referencia a la ubicación física de los servicios.
> 
> Es decir, aunque haya varias máquinas cliente, no quiere decir que haya varias instancias de la capa de presentación. Cada instancia podría ser, por ejemplo, una página web diferente.
> 
> ![[Arquitectura multicapa - niveles.png]]




# Diseño de la persistencia

Con el arquitectura en 3 capas, la persistencia consiste de:
- Las clases e interfaces que representan los datos almacenados, pero no los objetos y métodos.
- El lugar en el que están almacenados, o mecanismo de persistencia (BBDD o archivos)
- El patrón de acceso a la BBDD.

Existen dos patrones de acceso: *Data Access Object* y el patrón repositorio.

## *Data Access Object*

Abstrae el mecanismo de persistencia ofreciendo una interfaz de acceso a los datos que no depende del mecanismo, con métodos para operaciones CRUD básicas.

Desde la capa de negocio de usa una **implementación** de `BusinessObject` que permite a ésta acceder a los datos delegando las operaciones de lectura/escritura a un `DataAccessObject` en la capa de persistencia. El `DataAccessObject` devolverá una **instancia de una implementación** de un `DataTransferObject`.

El `DataAccessObject` a su vez accede a un `DataSource`, del que obtiene un `ResultSet` a partir del que creará el `DataTransferObject`.

![[Arquitectura multicapa - DAO.png]]

La ventaja de este modelo es que los `BusinessObjects` no tienen por qué tener por qué saber nada sobre como está guardada o representada la información en la base de datos, lo que además implica que se puede reemplazar todo el sistema gestor de base de datos (`DataSource`) modificando sólo el `DataAccessObject`.

Sin embargo, esto conlleva tener más código, lo que lleva a más complejidad y menos eficiencia.

## Patrón repositorio

Se ofrece una interfaz `Repository<T>` a la capa de lógica de negocio que permite interactuar con la BBDD mediante operaciones del tipo `Insert`, `Delete`, `Exists`, `GetById`, `GetAll` y similares.

> [!info] Clase `T`
> Las operaciones de `Repository` se definen para la clase genérica `T`, que será la clase de los objetos de negocio, en vez de hacer instancias para cada tipo de dato posible. 
> 
> En este caso `T` si que corresponde directamente con los datos almacenados en la base de datos.

Además, contamos con una interfaz`UoW` (siglas de *Unit of Work*), que define funciones para mantener un registro de las modificaciones que se han hecho sobre los objetos de lógica de negocio y provee las funciones `Commit` y `Rollback` para efectuar y deshacer los cambios, respectivamente.

La idea es que una implementación de `Repository` puede también implementar `UoW` (o podemos tener un clase aparte) y así evitar tener que guardar cada modificación que hagamos sobre el estado de la aplicación por partes, con el objetivo de evitar representar estados intermedios inválidos.
