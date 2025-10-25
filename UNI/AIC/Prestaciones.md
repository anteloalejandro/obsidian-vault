
# Productividad

Dos puntos de vista: Usuario y administrador. El usuario quiere tiempo de respuesta, mientras que el administrador quiere cantidad de trabajo por unidad de tiempo (*throughput* o productividad).

$$
P = \frac{\text{Trabajos}}{T}
$$

# Aceleración

Al comparar dos máquinas $X$ e $Y$, siendo $Y$ la más lenta de las dos, siempre se mira la mejora de prestaciones de $X$ respecto a $Y$. En caso de haber un conjunto de máquinas $X_{1} + X_{2} + \dots + X_{n}$ se establece como $Y$ la más lenta de entre todas y se compara cada una de las $X$ con ésta.

Dependiendo del tipo de medida, podemos obtener las productividades $P_{X} > P_{Y}$ o los tiempos $T_{Y} > T_{X}$.

Para estos valores, la **aceleración** $S$ se calcula como la proporción entre el más grande y el más pequeño, de modo que $S > 1$ siempre.
$$
S = \frac{T_{y}}{T_{x}} = \frac{P_{x}}{P_{y}} = 1 + \frac{n}{100}
$$

El $1+ \frac{n}{100}$ es para expresarlo como porcentaje en números pequeños. Por ejemplo, si es $1.5$ **veces** más rápido se suele decir que es un $50\%$ **más** rápido.

# Tiempo de ejecución

El tiempo de ejecución de CPU de un procesador es:
$$
\begin{align}
T_{ej} &= \frac{\text{segundos}}{\text{programa}} 
\\&= \text{Instrucciones} \times \frac{\text{segundos}}{\text{instrucción}} 
\\&= \text{Instrucciones} \times \frac{\text{ciclos}}{instrucción} \times \frac{\text{segundos}}{\text{ciclo}}
 
\\&= \underbrace{ I \times CPI }_{ \text{ciclos totales} } \times T_{\text{ciclo}}
\end{align}
$$

Sin embargo, para reducir el tiempo de ejecución no basta con reducir uno de los tres productos, pues no son independientes.

Dado un juego de instrucciones, el tiempo de ciclo depende de cuán rápido se puede ejecutar la instrucción más lenta. Del mismo modo, se puede bajar el número de ciclos por instrucción, pero suele venir a coste del número de instrucciones (más instrucciones más pequeñas) o de subir el periodo del procesador.

## Ley de Amdahl

Como afecta una sola mejora en una parte de un proceso al proceso total.

Dado un proceso que tarda un tiempo $t = F + (1-F)$, tras aplicar una aceleración de $S$ sobre $F$, el tiempo del proceso pasa a ser $t' = t\frac{F}{S} + t(1-F)$.

Al efecto que tiene la aceleración $S$ aplicada sobre $F$ en el tiempo total de ejecución del proceso, se le llama aceleración global $S'$, y es la proporción entre el tiempo de ejecución original y el tiempo de ejecución tras la aceleración (asumiendo que la $S > 1$).

$$
S' = \frac{t}{t'} = \frac{1}{F / S - (1-F)}
$$

Además, tomar el límite de aceleración global cuando $S \to \infty$ también nos da a entender como de beneficioso puede ser mejorar una parte del proceso en un caso ideal.

$$
\lim_{ S \to \infty } S' = \frac{1}{1-F + \cancelto{ 0 }{ \frac{F}{S} }} = \frac{1}{1-F}
$$

Si en vez de definir $t$ como $t = F + (1-F)$ lo definimos como $F_{1} + F_{2}$, y aplicamos aceleraciones $S_{1}$ y $S_{2}$ a estas dos partes, obtenemos un nuevo tiempo de ejecución $t' = t \frac{F_{1}}{S_{1}} + t \frac{F_{2}}{S_{2}}$, por lo que la nueva aceleración global pasa a ser:

$$
S' = \frac{t}{t'} = \frac{1}{F_{1} / S_{1} + F_{2} / S_{2}}
$$
Esto se puede generalizar para una cantidad $n$ de partes y aceleraciones, de modo que para $t = F_{1} + F_{2} + \dots + F_{n}$, aceleración global es...
$$
S' = \left[ \sum_{i=1}^n \frac{F_{i}}{S_{i}} \right]^{-1}
$$
... donde cualquier $S_{i}$ podría ser **mayor o igual** a 1.

Así mismo, una cada aceleración $S_{i}$ puede estar compuesta por múltiples aceleraciones $S_{i,1} + S_{i,2} + \dots + S_{i,m}$, en cuyo caso $S_{i} = \prod\limits^m S_{i,j}$