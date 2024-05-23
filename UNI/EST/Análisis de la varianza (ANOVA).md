---
todo: true
---
Un test de hipótesis usualmente usado para múltiples poblaciones. A pesar de llamarse análisis de la varianza, lo que se analiza es la media.

Hay dos tipos: ANOVA simple (un factor) y ANOVA compuesta (dos factores).

# Simple  

Cuanto más juntos estén los puntos alineados en el eje vertical, menos variación respecto a la media muestral hay.

Varianza dentro del grupo vs varianza entre los grupos.

# Compuesto (dos factores)

Se añade otro factor de la misma población, por lo que la variable aleatoria medida puede variar por una cosa o por otra.

Primero tiene que analizar si uno de los factores depende de otro. [[Probabilidad#Independencia de sucesos]]

Si, al trazar una línea por los puntos del mismo grupo, las lineas no se cruzan, generalmente la interacción no es significativa. En caso contrario, siempre lo es.

# Notas

A mayor variación entre los grupos mayor la $F$. Cuanto menor la variación entre grupos más se acerca a 1, lo que querrá decir que el factor por el que se dividen los grupos no es significativo.

Aunque sepamos que el factor importa, no sabemos necesariamente cuál o cuáles de los grupos están causando que este sea el caso. Al sacar los intervalos LSD, aquel o aquellos que no se solapen con otros grupos son los causantes. En forma de gráfico, serán los que estén en alturas que hacen que no se toque con el resto de intervalos.

En el gráfico de interacción, cuanto más paralelas sean las líneas menos importa la interacción. En un caso ideal en la que la interacción no importe nada, serían, perfectamente paralelas, pero en el mundo real se pueden cruzas y seguir sin tener una interacción significativa.

La regla de los *p-value* dice que si es mayor a $\alpha$, siendo $\alpha$ la probabilidad de error aceptada (noseque de especie), se acepta la hipótesis nula, y en caso contrario no. Esto da el mismo resultado que comparar la $F$ crítica y la $F$ observada, pero el *p-value* no se puede calcular a mano.