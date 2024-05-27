
Es una familia de distribuciones simétricas cuya forma depende de sus grados de libertad $v$. Estas distribuciones tienden a la [[Distribución normal#Distribución normal estandarizada|distribución normal estandarizada]] conforme aumentan los grados de libertad $v$ y se vuelven más [[Estadísticos descriptivos#Curtosis|planicúrtica]] conforme disminuye $v$.

![[t-student.png]]
*Nótese que como $v = n-1$, al variar la $n$ y la $v$ sucede lo mismo*

# Media y varianza muestrales de una población normal

Dado $X \sim N(0,1)$ e $Y \sim \chi^{2}_{v}$, siendo estas dos variables aleatorias independientes, se cumple que el siguiente coeficiente sigue una distribución t Student con $v$ grados de libertad:
$$
t = \frac{X}{\sqrt{\frac{Y}{v}}} \sim t_{v}
$$

De forma similar, $X \sim N(\mu, \sigma)$, el siguiente coeficiente con la media y varianza muestrales sigue una distribución t Student con $n-1$ grados de libertad:
$$
t = \frac{\overline{X}-\mu}{\sqrt{\frac{S^{2}}{n}}} \sim t_{n-1}
$$
Esto es reminiscente de una de las [[Distribuciones en el muestreo#Propiedades de la media muestral|propiedades de la media muestral de una población normal]], que dice que esta misma ecuación, cambiando $S^2$ por $\sigma^{2}$ hace que en su lugar se distribuya normalmente.

# Función de distribución acumulativa 

La [[Probabilidad#Función de distribución acumulativa|Función de distribución acumulativa]] de la distribución t Student se puede calcular con tablas, donde $\alpha$ es la probabilidad de estar en una de las colas delimitada por el punto crítico $\pm{t}$ y $v$ los grados de libertad. Usualmente calcula para las dos colas de la distribución por separado, que al ser simétrica dicha distribución simplemente implica usar $\frac{\alpha}{2}$ en vez de $\alpha$ .

![[t-student-cdf.png]]

![[t-student-tabla.png]]
