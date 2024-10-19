
El sistema operativo cumple dos funciones principales. La primera es proveer a los programadores de aplicaciones, así como a las propias aplicaciones, de una serie de **abstracciones sobre los recursos y hardware** con tal de que estos puedan hacer uso de ellos. La segunda es **gestionar** dichos recursos y hardware.

# Kernel

Es el componente principal del sistema operativo; una pieza de software que siempre está ejecutándose y hace de puente entre el hardware y el software.

Provee de una capa de abstracción de hardware o *HAL*, controladores de dispositivos, gestores de ficheros, procesos y memoria, y una interfaz de llamadas al sistema que habilita a las utilidades del sistema y al resto de aplicaciones interactuar eficientemente con los recursos del ordenador.

![[Estructura del kernel.excalidraw|100%]]

## Arquitectura del kernel

Un kernel puede tener una de múltiples arquitecturas:
- **Micronúcleo:** Proporciona sólo las abstracciones básicas del hardware y los servicios mínimos. El acceso de recursos se implementa a través de múltiples "servidores" individuales que corren en espacio de usuario. <small>Mach, QNX</small>
- **Monolítico:** Todos los componentes son parte de un único sólo componente que se carga en memoria como un sólo proceso. <small>Linux, BSD</small>
- Híbrido: un micronúcleo modificado que incluye además componentes técnicamente no esenciales cuya velocidad de ejecución es crítica. <small>Windows NT, MacOS X</small>

# Utilidades del sistema

Son el conjunto de herramientas básicas que son necesarias para llevar a cabo tareas comunes y básicas, que simplifican la interacción entre el sistema operativo y los usuarios. Hay utilidades que corren en modo usuario, al igual que el resto de aplicaciones del sistema, así que no siempre hay una distinción clara entre lo que es una utilidad del sistema y una simple aplicación.

En Linux, comúnmente, se utilizan las utilidades GNU.