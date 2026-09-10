


> [!NOTE] Componentes Principales
> Combinaciones lineales de las variables originales del dataset, creadas mediante PCA.
> 
> Cada PC es ortogonal a las demás, de modo que cada variable representa una dimensión diferente de las dimensiones de los datos.


# *Eigenvalue Decomposition*

> [!NOTE] Vectores Característicos (Eigenvectors)
> Dada una transformación linear $T$, su vector característico $\mathbf{v}$ es cualquier vector que no ve afectada su dirección por dicha transformación. Es decir, es un vector distinto a cero que al aplicar la transformación lo único que hace es escalarse por un factor $\lambda$, su *eigenvalue* o raíz característica.
> $$
> T\mathbf{v} = \lambda \mathbf{v}
> $$

Factorización de una matriz en 3 factores: $A = QDQ^{-1}$, donde $D$ es una matriz diagonal con los *eigenvalues* de $A$, y $Q$ es una matriz cuyas columnas corresponden a los *eigenvectors* de $A$.

Los *eigenvalues* los obtenemos mediante la ecuación característica de $\lambda$.
$$
\det(\mathbf{A} - \lambda \mathbf{I}) = 0
$$
La ecuación característica nos dará un polinomio con una multiplicidad dada. El número de *eigenvalues* posibles será igual a la multiplicidad, y se pueden calcular resolviendo los posibles casos de la ecuación.

Esta técnica sólo se puede usar con **matrices cuadradas diagonalizables**, por lo que en lugar de usar la matriz deseada directamente, sacamos su matriz de covarianzas $\mathbf{\Sigma}$.

La matriz de covarianzas, dada una matriz de datos $\mathbf{X}$, se saca a través de la matriz centrada $\mathbf{\tilde{X}} = \mathbf{X} - \mathbf{1}_{N}\overline{x}^{t}$, donde $\overline{x}^{t}$ es la media empírica de los datos.

$$
\mathbf{\Sigma} = 
$$

# *Singular Value Decomposition* (SVD)

