
Una pseudoinstrucción podría equivaler a multiples instrucciones.

```
Son iguales:
move $rt, $rs
addi $rt, $rs, 0
add $rt, $rs, $0
```

Sin embargo, no todas las instrucciones equivalentes son igual de eficientes.

Las instrucciones lógicas son más rápidas que las aritméticas, que son a su vez más rápidas que las de carga/almacenamiento.

# Load Inmediate `li`

```
li $rt, small ==> addi $rt, $0, small

li $rt, big   ==> lui $rt, big_{31..16}
                  ori $rt, $rs, big_{15..0}
```

Load Address funciona exactamente igual, pero es una pseudoinstrucción diferente únicamente para darle sentido semántico diferente a las dos instrucciones.