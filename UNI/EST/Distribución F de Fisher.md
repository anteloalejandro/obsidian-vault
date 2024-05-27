---
todo: true
---
%%
F es un ratio de poblaciones/varianzas, por lo que tiene dos grados de libertad independientes $n_{1}-1$ y $n_{2}-1$ .

Es otra distribución asimétrica cuya forma depende de los grados de libertad.

Se usa una tabla bidimensional, en la que cada eje corresponde a una variable independiente.%%

Es una familia de distribuciones asimétricas cuya forma viene dada por dos grados de libertad, generalmente denominados como grados de libertad del numerador y el denominador. Cada uno de los grados de libertad pertenece a una variable aleatoria diferente, es decir, esta distribución sirve para analizar la relación entre dos variables aleatorias.

![[f-fisher.png]]

Siendo $X_{1}$ y $X_{2}$ dos variables aleatorias independientes que siguen una [[Distribución Chi-Cuadrado]] con $v_1$ y $v_2$ grados de libertad respectivamente, se dice que el siguiente cociente sigue una distribución F de Fisher.
$$
F = \frac{X_{1} \mathbin{ / } v_{1}}{X_{2} \mathbin{ / } v_{2}} \sim F_{v_{1}, v_{2}}
$$

# Comparación de varianzas

La distribución F de Fisher se utiliza a menudo para  comparar la varianza de dos factores distintos, de forma similar al [[Estadísticos descriptivos bidimensionales#Coeficiente de correlación|coeficiente de correlación]].

Si $S^{2}_{1}$ y $S^{2}_{2}$ son varianzas de dos muestras independientes de poblaciones normales de tamaño $n_1$ y $n_2$ y varianza poblacional $\sigma^{2}_{1}$ y $\sigma^{2}_{2}$ respectivamente, el siguiente cociente se distribuye como como una variable F de Fisher con $n_{1}-1$ y $n_{2} - 1$ grados de libertad, donde $S^{2}_{1}$ es la varianza muestral más grande, y $S^2_1$ la más pequeña.
$$
F = \frac{S^2_{1} \mathbin{ / } \sigma^2_{1}}{S^2_{2} \mathbin{ / } \sigma^2_{2}} \sim F_{n_{1}-1, n_{2}-1}
$$

Además, si las dos varianzas poblacionales son igual, como en el caso de que ambas muestras se hayan cogido de la misma población, se puede simplificar la ecuación para dejar sólo las varianzas muestrales.
$$
F = \frac{S^{2}_{1}}{S^{2}_{2}} \sim F_{n_{1}-1, n_{2}-1}
$$