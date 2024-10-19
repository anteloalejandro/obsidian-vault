
Ofrece abstracciones de hardware para ejecutar varios sistemas operativos o programas, llamados *guests* desde el mismo hardware, llamado *host*.

Cuando las arquitecturas de CPU son diferentes, se requiere además de **emulación de hardware** para traducir las instrucciones de una máquina a otra.

# Hipervisores

Los hipervisores son los elementos que implementan la virtualización a **nivel de software**.

Los hipervisores de tipo 1, también llamados *Bare Metal* o nativos, se ejecutan directamente en el hardware del anfitrión, mientras que los hipervisores de tipo 2, o *hosted*, son aplicaciones que se ejecutan sobre el sistema operativo.

![[hypervisor-comparison.png]]

Sin embargo, la distinción entre estos dos tipos no está clara, ya que los módulos de kernel como KVM esencialmente convierten al propio sistema operativo en un hipervisor de tipo 1.