
El tiempo de ejecución de un programa es el producto de tres términos: $T_{e} = I \times CPI \times T$. Si usamos procesadores segmentados y gestión dinámica de instrucciones, obtenemos un $CPI \simeq 1$, así que si queremos mejorar el $T_{e}$, tenemos unas pocas opciones:
- Reducir el número de instrucciones ejecutadas $I$. Consiste en aumentar el trabajo que se puede hacer con cada instrucción. Se consigue con **Procesadores VLIW**.
- Reducir el periodo de reloj $T$. Requiere de segmentar un ciclo en más etapas, es decir, usar **Procesadores supersegmentados**. 
- Reducir el número de ciclos por instrucción $CPI$. Nuestro $CPI$ ya es cercano al óptimo, así que la única forma es aumentar las instrucciones lanzadas por ciclo mediante **Procesadores Superescalares**.

# Procesadores Superescalares

Son procesadores capaces de lanzar una instrucción por **vía** por cada ciclo de reloj, por lo que en un caso ideal, siendo $m$ el número de vías:
$$
IPC = CPI^{-1} = m \implies CPI = \frac{1}{m} \implies T_{\text{superescalar}} = T_{\text{segmentado}} · m
$$

Llamamos vía al conjunto de segmentos que llevan a cabo las etapas de ejecución de un ciclo. Al tener varias vías puede tener, simultáneamente, $m$ instrucciones en la misma fase.

![[Lanzamiento múltiple de instrucciones - 2 vías.png]]

A nivel de hardware, $m$ veces la maquinaria necesaria para tener un procesador segmentado tradicional, hace falta:
- Acceso simultáneo a $m$ instrucciones para las $m$ fases IF.
- Acceso simultáneo a $m$ datos en caché, por lo que ésta debe suministrar $m$ palabras por ciclo y, por tanto, tendrá que ser más ancha (palabras más grandes) o estar compuesta de $m$ módulos.
- Decodificación de $m$ instrucciones simultáneas, y comprobación de las dependencias de datos entre dichas instrucciones simultáneas y las anteriores. Dificulta mucho la decodificación, haciendo que se requieran más ciclos de decodificación.
- Lectura de más operandos en la fase *Issue*. Hacen falta $2m$ puertos de lectura tanto en el banco de registros como en el ROB.
- Ejecución simultánea de $m$ instrucciones, para la fase EX y similares.
- Escritura en memoria y en registros simultánea, para lo que harán falta $m$ buses comunes de datos y $m$ puertos de escritura en el ROB.
- Poder hacer *Commit* a $m$ instrucciones a la vez, para lo que también harán falta $m$ puertos de escritura en el banco de registros.

En definitiva, además de los requisitos esperables, también hay que multiplicar por $m$ todo lo que transmita, lea o escriba memoria, además del aumento en el número de riesgos y la penalización cada vez que se insertan ciclos de parada para evitarlos ($m$ instrucciones perdidas).

Otra implicación es que las instrucciones de salto se vuelven muy disruptivas. Considerando los siguientes ejemplos:

1. La instrucción a la que se salta puede no estar alineada, haciendo que busque hasta $m-1$ instrucciones anteriores que no se van a utilizar.
```
# m = 2
inst:         IF I EX WB C
beqz t1,L:    IF I EX WB C
L-4:             IF <no sirve> # se salta por encima, pero se busca igual
L:               IF I EX WB C
```

2. La propia instrucción de salto puede no estar alineada, haciendo que hasta $m-1$ instrucciones posteriores se descarten en caso de salto.
```
# m = 2
beqz t1,L:     IF I EX WB C
inst:          IF <no sirve> # Se busca a la vez que beqz, pero no se usa
L-4:              IF <no sirve> # Además, se salta una dirección no alineada,
L:                IF I EX WB C
```

Es decir, los procesadores superescalares no siempre ofrecen grandes beneficios, a pesar de que siempre implican un aumento de complejidad grande.

Para reducir esa complejidad, a costa de algunos de esos beneficios, se pueden imponer limitaciones respecto a qué instrucciones pueden lanzarse simultáneamente, dando lugar a un **procesador superescalar no uniforme**, que se beneficia mucho de tener un compilador que sepa reordenar aquellas instrucciones que se puedan aprovechar de esta arquitectura.


> [!example] Superescalar de 2 vías que sólo replica la unidad de enteros, puede combinar...
> - 2 instrucciones aritméticas enteras
> - 1 instrucción aritmética entera + 1 de coma flotante
> - 1 load/store + 1 aritmética entera o de coma flotante
>     - Sólo una instrucción puede acceder a memoria en cada ciclo
> - 1 instrucción de salto + 1 load/store o 1 aritmética entera o de coma flotante

# Procesadores VLIW

VLIW, las siglas de *Very Long Instruction Word*, se refiere a palabras con un formato de instrucción largo, capaces de codificar $p$ operaciones en una sola instrucción. No implementan ninguna forma de convertir varias instrucciones en una, así que se valen del compilador.

Normalmente las instrucciones tendrán un formato predefinido, como `Mem1 | Mem2 | FP1 | FP2 | Entera o salto` ($p = 5$).

![[Lanzamiento múltiple de instrucciones - VLIW.png]]

En un caso ideal, al igual que con los superescalares, el rendimiento puede aumentar respecto a un procesador segmentado en un factor de $p$.

En este caso el aumento en la complejidad del hardware es menor, pero tenemos el problema añadido de que ahora hemos cambiado el formato de las instrucciones, por lo que ya no son compatibles a nivel binario con un procesador segmentado tradicional ni con otros procesadores VLIW con otros formatos de instrucción, lo que aumenta aún más la dependencia del compilador y de la calidad de código que éste genera.

# Procesadores supersegmentados

Son procesadores con un periodo de reloj $t$ veces inferior gracias a tener $k·t$  etapas en lugar de $k$. El $CPI$ sigue siendo ideal sigue siendo 1, pero se ha reducido el periodo dando como resultado una mejora de $t$ veces en las prestaciones.
$$
\begin{align}
T_{\text{segmentado}} &= I \times CPI \times T \\
T_{\text{super-segmentado}} &= I \times CPI \times T' = I \times CPI \times \frac{T}{t} \\ \\
\end{align}
$$

No basta con sacar de la nada $t$ veces más segmentos, sin embargo. Este valor de $t$ es el **grado de supersegmentación**, que indica cuantas veces se ha segmentado cada segmento. Es decir, tenemos las mismas $k$ fases, pero cada una de ellas se divide en más etapas o segmentos.

En la mayoría de casos no se extrae mucho rendimiento, pero como hay ciertas fases (principalmente las de ejecución) que son más lentas a menudo es beneficio super-segmentar estar fases.