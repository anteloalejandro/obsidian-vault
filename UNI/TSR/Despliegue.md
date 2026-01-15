
El despliegue es el acto de instalar e iniciar los componentes de un servicio y mantener activo el servicio, añadiendo, eliminando, reiniciando y actualizando componentes conforme van haciendo falta.

> [!summary] Despliegue: Instalación, activación, actualización y adaptación.

Normalmente los componentes cooperan entre sí, así que existirán dependencias entre los ellos. Además, como los nodos de la red pueden ser heterogéneos, tenemos que asegurarnos de que los nodos pueden correr en los nodos que lancemos.

# Despliegue automatizado

Los sistemas distribuidos ofrecen servicios a clientes remotos. Podemos definir este servicio como la unión de una aplicación y su despliegue.

Los servicios necesitan un *Service Level Agreement* o Acuerdo de Nivel de Prestaciones que define:
- **Definición funcional:** Qué hace.
- **Rendimiento:** Qué capacidad tiene, que tiempos de respuesta se esperan, etc.
- **Disponibilidad:** Porcentaje del tiempo que se garantiza que el servicio estará operativo. Para servicios de alta disponibilidad, será de 99.9\%.

Por tanto, el despliegue tiene que asegurar que se cumplen estas propiedades en todo momento. Por ejemplo, si el servicio cae, debe volverse a lanzar, si los nodos están saturados y no pueden cumplir las expectativas de rendimiento, se lanzarán más nodos, etc.

En cualquier cosa que no sea una aplicación trivial, el despliegue es demasiado complejo como para adaptarnos dinámicamente a las necesidades y carencias del servicio. Es por esto que se necesita automatizar el proceso.

Hacer el despliegue a base de *scripting* es posible pero inviable, por lo que se hace uso de herramientas de automatización que nos proveen de dos cosas:
- Una configuración para cada componente. Se puede crear una configuración específica para cada instancia del componente en base a ésta. Consta de:
    - Lista de parámetros de configuración.
    - Descripciones de las dependencias.
    - Variables de entorno.
- Un plan de configuración global. Según el plan de configuración, se llevarán a cabo tres pasos:
    - Forma un plan de conexión entre componentes, en el que se listan los componentes disponibles y las dependencias entre ellos.
    - Decide dónde se instala cada instancia.
    - Enlaza las dependencias, incluyendo aquellas con servicios externos.

> [!example]- En el caso de un bróker enruta N clientes a N trabajadores, tendríamos...
> - Una instancia de bróker
>     - Con argumentos `frontendPort` y `backendPort`
> - Varias instancias del cliente
>     - Con dependencia al bróker
>     - Que necesitan diferenciarse con un argumento `id`
>     - Que necesitan saber la `frontendUrl`
> - Varias instancias de worker
>     - Con dependencia al bróker
>     - Que necesitan diferenciarse con un argumento `id`
>     - Que necesitan saber la `backendUrl`
> 
> ![[Despliegue - ejemplo bróker.png]]

Para la resolución de dependencias hay dos técnicas. La más directa es definir la forma de resolverlas en el propio código de cada componente, leyendo los datos necesarios para configurarse a sí mismo de un fichero o mediante algún otro servicio. La más recomendable, sin embargo, es la **inyección de dependencias**, con el que la aplicación (no los componentes) expone nombres locales para las interfaces necesarias y los **contenedores** rellenan las variables con instancias de objetos.

## Contenedores

Los contenedores son una herramienta que envuelven y mantienen a otros componentes, proporcionándoles un entorno aislado con puntos de acceso virtuales que se corresponderán de alguna manera con los puntos de acceso reales del anfitrión. 

Esto tiene la ventaja de que, a la hora de programar el componente, no es necesario saber que interfaces estarán disponibles en la máquina real en el momento del despliegue.

Además, son capaces de crear, gestionar y destruir el entorno en el que se ejecuta el componente, permitiendo, por ejemplo, instalar las versiones especificadas del software necesario para su ejecución cada vez que inicie el contenedor.

## Inyección de dependencias

La inyección de dependencias hace que un componente sólo necesite conocer la interfaz del otro para interactuar con él.

Normalmente, esto lo gestionará automáticamente la herramienta usada para crear y orquestar los contenedores, así que el código de los dos contenedores no cambiará.

# Despliegue en la nube

## *Infrastructure as a Service*

Cuando usas un servicio de éste tipo, lo que te ofrecen es la infraestructura básica sobre la que montar tu aplicación, como si te diesen una flota de ordenadores.

IaaS se basa en la virtualización, pudiendo tener cada máquina virtual distintos tamaños.

Permite ajustar (manualmente) los recursos designados a cada nodo (núcleos, memoria, ubicación, SO...), pero no permite elegir características de red y tiene ayudas limitadas a la recuperación una vez una de estas máquinas virtuales falla.

## *Platform as a Service*

Estos servicios te ofrecen un entorno completo e integrado en el que montar tu aplicación, con despliegue completamente automatizado. A diferencia del IaaS, no hay un concepto de "máquina" en la que instalar cosas, sólo un puñado de servicios o componentes y una forma de conectarlos entre sí.

En los PaaS, el SLA es el elemento central, y todos los componentes usarán los parámetros que provee.

Hoy en día también cubren el escalado automático de servicios sencillos.

# Docker

Docker es un programa para crear y gestionar contenedores.

A diferencia de las máquinas virtuales, los contenedores de docker comparten el kernel con el sistema operativo anfitrión, así que no podemos usar cualquier sistema operativo dentro del contenedor. Eso sí, aunque compartamos el kernel, las librerías y binarios no se comparten, por lo que se puede incluso instalar distribuciones enteras de Linux si el anfitrión también es Linux.

A pesar de que compartir el kernel hace que es aislamiento no sea completamente perfecto, lo que hace que el anfitrión sea más susceptible a ciertos ataques, tiene la ventaja de que el *overhead* es mucho menor. 

Los contenedores, además de su propio sistema de archivos, cuentan con uno de sólo lectura para la comunicación entre contenedores (transparente al programador) y se pueden directorios compartidos con el anfitrión y otros contenedores.

Los contenedores se construyen a partir de **imágenes**, que son plantillas (de sólo lectura) que contienen instrucciones para crear un contenedor e instalar todo el software necesario.

Las imágenes se almacenan en **depósitos**, ya sea en la máquina local o en un repositorio global online, como DockerHub, que permite compartir imágenes con otros usuarios. Además, podemos crear nuevas imágenes a partir de una imagen base y un conjunto de instrucciones (ej.: Ubuntu:24.04 + instalar node).

Los contenedores son el resultado de ejecutar una imagen, es decir, son una instancia de éstas. Concretamente, los contenedores son el conjunto de recursos que necesita la imagen para ejecutarse.

## Dockerfile

Dockerfile es el nombre del archivo de configuración de docker a partir del cual se crean las imágenes. Cuenta con las siguientes opciones:
- `FROM <base_image>` especifica la imagen a partir de la cual se creará la nueva imagen.
- `WORKDIR <path>` indica el directorio de trabajo en el anfitrión para las ordenes `RUN`, `CMD` y `ENTRYPOINT`.
- `RUN <order>` ejecuta una orden en el SHELL del anfitrión durante la creación de la imagen.
- `CMD <order>` establece una orden que ejecutar en el SHELL del contenedor. Sólo se ejecuta la última `CMD` especificada.
- `ENTRYPOINT <orden>` igual que `CMD`, pero el contenedor finaliza al terminarse la orden. De nuevo, sólo se ejecuta la última `CMD` o `ENTRYPOINT` especificada.
- `ADD <origin> <destination>` copia ficheros de un lugar en el anfitrión o internet a la destinación especificada dentro de la imagen. Expande ficheros comprimidos.
- `COPY <origin> <destination>` es igual que `ADD`, pero no expande ficheros comprimidos.
- `EXPOSE <port>` expone un puerto por el que el contenedor puede atender o hacer peticiones.

Con estas opciones podemos definir múltiples componentes de un servicio, pero hay que definir manualmente cada uno de ellos.

Por ejemplo, podemos usar el siguiente Dockerfile para hacer un bróker...
```
FROM tsr-zmq
COPY ./tsr.js tsr.js # copiamos la librería
RUN mkdir broker
WORKDIR broker
COPY ./broker.js mybroker.js # copiamos el programa
EXPOSE 9998 9999 # exponemos los puertos
CMD node mybroker 9998 9999 # el broker usa los puertos expuestos.
```
... pero tendríamos que poner directamente los puertos del bróker en cada punto que se quieran utilizar.

Esto se da con cualquier componente del que haga falta saber los puertos, como suele ser el caso con los servidores, y el número del puerto no está centralizado en un solo lugar, lo que hace fácil provocar errores al copiar mal el número o cambiarlo a futuro.

La solución es utilizar el programa `docker-compose`.

## Docker compose

Docker compose es un programa adicional de docker que permite organizar las diferentes imágenes y contenedores que podamos querer lanzar desde una máquina.

El fichero de configuración `docker-compose` consta un atributo `services` que define los servicios que componen la aplicación. Cada entrada de `services` tendrá un nombre identificativo y los siguientes atributos:
- `image`, el nombre de la imagen a partir de la cual se crean los contenedores que ofrecen este servicio.
- `build`, el directorio en el que esta el Dockerfile y los archivos que éste usa.
- `links`, en el que se especifican otros servicios definidos en este archivo con los que se enlazará el servicio actual.
- `environment`, que establecerá las variables de entorno de los contenedores.
- `expose`, que establece que puertos se van a exponer.

> [!example]-  `docker-compose.yml` para el bróker, cliente y trabajador
> 
> ```yaml
> version: '2'
> services:
>   cli:
>     image: client
>     build: ./client/
>     links:
>       - bro
>     environment:
>       - BROKER_HOST=bro
>       - BROKER_PORT=9998
>   wor:
>     image: worker
>     build: ./worker/
>     links:
>       - bro
>     environment:
>       - BROKER_HOST=bro
>       - BROKER_PORT=9999
>   bro:
>     image: broker
>     build: ./broker/
>     expose:
>       - "9998"
>       - "9999"
> ```

Con el comando `{bash}docker compose up` se construyen las imágenes (si fuese necesario) y se lanza un contenedor por cada imagen, estableciendo las variables de entorno y sustituyendo las variables por valores concretos.

Además, con el atributo `--scale <service>=<n>` se pueden lanzar $n$ instancias de `service`.

## Órdenes comunes

Información sobre las imágenes en este dispositivo
```sh
docker images # o `docker image ls`
```

Instrucciones usadas para crear una imagen derivada
```sh
docker history <imagen>
```

Ejecutar un contenedor a partir de una imagen
```sh
docker run [opciones] <imagen> <programa a ejecutar>
# Opciones útiles
# - `-i -t`: modo interactivo, pasa la entrada de teclado al contenedor
# - `-d`: ejecuta de fondo, imprimiendo la id por pantalla
# - `-p <host_port>:<container_port>`: mapea un puerto y lo hace accesible
```

Crear nueva imagen a partir del estado actual del contenedor
```sh
# útil con `docker run -i -t <imagen> bash` para modificar el estado desde
# el propio contenedor.
docker commit <contenedor en ejecución> <nueva imagen>
```

Crear imagen a partir de un Dockerfile en el directorio actual
```sh
docker build -t <nueva imagen> .
```

Mostrar procesos en ejecución
```sh
docker ps
```

Borrar imagen
```sh
docker rmi <imagen>
```

Detener contenedor
```sh
docker stop <contenedor> # detiene, se puede reanudar con `docker start`
docker kill <contenedor> # detiene por completo, mata todos los procesos
```

Mostrar *logs* de un contenedor
```sh
docker logs <contenedor>
```