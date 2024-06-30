---
todo: true
---
La función de un diodo es permitir el paso de corriente en una sola dirección, de misma forma que lo hace una válvula con el agua.

Esencialmente, actúa como una pequeña pila en oposición a la corriente cuando la corriente fluye de ánodo a cátodo, y como un aislante si fluye de cátodo a ánodo.

```tikz
\usepackage{circuitikz}
\begin{document}

\begin{circuitikz}

\draw 
  (0,1) node[](diode) {}
  (diode) -- ++(1,0) to[empty diode] ++(1,0) -- ++(1,0)
  (diode)++(0,-1) to[short, i=I] ++(3, 0)
  ;
\path
  (diode) node[circ, label=Ánodo (A)] {}
  ++(3,0) node[circ, label=Cátodo (K)] {};

\draw[->, double] (diode)++(4.5, -0.5) -- ++(2,0);

\draw 
  (diode)++(7,0) node[](switch) {}
  (switch) -- ++(1,0) to[battery1, l=$V_{\gamma}$] ++(1,0) -- ++(1,0)
  (switch)++(0,-1) to[short, i=I] ++(3, 0)
  ;
\end{circuitikz}
\end{document}
```

```tikz
\usepackage{circuitikz}
\begin{document}

\begin{circuitikz}

\draw 
  (0,1) node[](diode) {}
  (diode) -- ++(1,0) to[empty diode] ++(1,0) -- ++(1,0)
  (diode)++(0,-1) to[short, i<=I] ++(3, 0)
  ;
\path
  (diode) node[circ, label=Ánodo (A)] {}
  ++(3,0) node[circ, label=Cátodo (K)] {};

\draw[->, double] (diode)++(4.5, -0.5) -- ++(2,0);

\draw 
  (diode)++(7,0) node[](switch) {}
  (switch) -- ++(1,0) to[cute open switch] ++(1,0) -- ++(1,0)
  (switch)++(0,-1) to[short, i<={I{=}0}] ++(3, 0)
  ;
\end{circuitikz}
\end{document}
```

# Parámetros

La **tensión lindar** $V_{\gamma}$ es una constante propia del diodo. Provoca una caída de tensión cuando el diodo conduce.

La **diferencia de tensión** del diodo $V_{D}$ es la diferencia entre la tensión en el ánodo $V_{A}$ y la tensión en el cátodo $V_{K}$. Cuando el diodo está conduciendo esa tensión es igual a la tensión lindar, y cuando no conduce no significa que $V_D$ es menor a la tensión lindar.
$$
\begin{gather}
V_{D} = V_{A} - V_{K}\\
\text{El diodo conduce} \implies V_{D} = V_{\gamma}\\
\text{El diodo no conduce} \iff V_{D} < V_{\gamma}
\end{gather}
$$

La **corriente por el diodo** $I_{D}$ es, simplemente, la corriente que pasa por el diodo. Si la corriente que va de ánodo a cátodo no sucede nada con la corriente, pero si va de cátodo a ánodo pasa a ser 0.
$$
I_{D} = 
\begin{cases}
I_{\tiny\overrightarrow{AK}} & \text{ si } I_{\tiny\overrightarrow{AK}} > 0\\
0 & \text{ si } I_{\tiny\overrightarrow{AK}} \leq 0

\end{cases}
$$

# Curva característica y recta de carga

En realidad, la relación la diferencia de tensión y la corriente por el diodo destacada en el apartado anterior hacen referencia a un modelo simplificado del diodo, llamado **diodo ideal**, no al funcionamiento real de este.

El modelo se utiliza porque es una aproximación suficientemente buena del funcionamiento real en la gran mayoría de los casos, pero en ocasiones los fabricantes proveen también de la **curva característica** que modela con precisión la relación entre $V_D$ e $I_D$ en forma de gráfica.

En la recta de carga también puede verse a menudo la **corriente de fuga** $I_{s}$, que es la carga máxima que deja pasar el diodo cuando no conduce. En la mayoría de los diodos esta corriente es tan pequeña (se mide $\mu A$ o $\eta A$) que es despreciable.

Si se calcula la **recta de carga** del diodo en el circuito actual usando los puntos de corte $V_D=0$ e $I_D = 0$ se obtiene el **punto de trabajo** $Q$, cuyas componentes corresponden a la tensión y corriente exactas del diodo en el circuito actual.

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{FF5C50}
\definecolor{linecolor2}{HTML}{50C5FF}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis lines=middle,
xmin=-6, xmax=6, 
ymin=-2, ymax=15,
% ETIQUETAS Y TÍTULO %
ytick={0},
xtick={0},
xlabel = $V_D$,
ylabel = $I_D$,
clip=false % No permitir que el texto sobrepase la gráfica % %

]

\draw[thick, color=linecolor1] plot[smooth, tension=0.75] coordinates{
  (-6,-0.2) (-3, -0.2) (0,0)
};
\draw[thick, color=linecolor1] plot[smooth, tension=1] coordinates{
  (0,0) (0.2,0.1) (0.4,0.15) (0.5, 0.3) (0.6, 0.6) (0.7, 1)
  (0.9,2) (1,3) (1.25, 6) (1.5, 12)
};


\draw (2,6) node[anchor=west, color=linecolor1] {Curva característica};

\addplot[color=linecolor2, domain=0:3.6] {-0.8*x + 3}
  node[color=linecolor2, right, pos=0, anchor=east]{Recta de carga};
\addplot[mark=*] coordinates{(0.9, 2.2)}
  node[anchor=west, outer sep=3pt] {$Q{=}(V_{DQ}, I_{DQ})$};
\addplot[color=gray, dashed, domain={0:-6}]{-0.2}
  node[color=gray, anchor=east, left, pos=1]{$-I_S$};

\addplot[mark=|, line width=0.2mm] coordinates{(0.7, 0)}
  node[anchor=north, outer sep=3pt] {$V_\gamma$};

\draw[color=gray] plot[] coordinates{ (0.7, 0) (0.7, 12) }
  node[color=gray, anchor={south west}]{Recta característica del diodo ideal};

\end{axis}

\end{tikzpicture}
\end{document}
```

Si simplifica un circuito hasta que el resultado final sea una pila, una resistencia y un diodo, el cálculo de los puntos de corte de la recta de carga se simplifica mucho:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ground] {}
  (1,0) to [battery1, l=$V_0$, i=$I_D$] (0,0)
  (1,0) -- (2,0) to[R=$R_1$] (3,0) -- (4,0)
  (4,0) to[empty diode, v^=$V_D$, i_=$I_D$] (6,0) -- (6.25,0) node[ground] {}
  ;
\end{circuitikz}
\end{document}
```
$$
\begin{gather}
V_{0} - I_{D}·R_{1} - V_{D} = 0 \iff I_{D} = \frac{V_{0}-V_{D}}{R_{1}} \iff V_{D} = V_{0} - I_{D}·R_{1}\\
I_{D} = 0 \iff V_{D} = V_{0}\\
V_{D} = 0 \iff I_{D} = \frac{V_{0}}{R_{1}}
\end{gather}
$$

# Funcionamiento

Los diodos están formados por una [[Unión P-N]], en la que el Ánodo es el terminal del material Tipo P y el Cátodo el terminal del material Tipo-N.

Para que la corriente convencional fluya solamente de ánodo a cátodo, el flujo de electrones ha de ir en dirección contraria, de cátodo a ánodo.

Al conectar correctamente una pila al diodo, con el lado positivo de la pila conectado al ánodo y el lado negativo conectado al cátodo, el material Tipo-N recibirá más electrones y, en caso de que haya suficiente tensión como para superar la tensión lindar de la unión, esos electrones pasarán al material Tipo-P hasta que lo rebasen en salgan por el extremo del cátodo, hasta el lado positivo de la pila. En caso de que la tensión no supere a la tensión lindar, los electrones no podrán pasar de un lado a otro y no habrá ningún tipo de corriente.

# Tipos de diodo

## Diodo de unión

Es el tipo más básico de unión, y está formado por una [[Unión P-N]]. Tiene una tensión lindar de alrededor de $0.7V$ y una corriente de fuga que se mide en $\eta A$

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=1.5]
  (0,0) to[diode, *-*, l=Diodo de Unión, v=$\sim 0.7V$] (2,0)
  ;
\end{circuitikz}
\end{document}
```

## Diodo ideal

Es un modelo simplificado del diodo que en vez de tener una curva característica tiene una recta de pendiente infinita en $V_{\gamma}$ , es decir, solo tiene dos valores de $I_{D}$: 0 y el máximo. En un esquema se diferencia visualmente del diodo normal pintando todo el interior del diodo. Cualquier diodo así, sin importar el tipo, está siendo explícitamente modelado como un diodo ideal.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=1.5]
  (0,0) to[full diode, *-*, l=Diodo Ideal, v=$V_\gamma$] (2,0)
  ;
\end{circuitikz}
\end{document}
```

## Diodo Schottky

Estos diodos tienen la ventaja de que se conmutan (es decir, cambian de 1 lógico a 0 lógico y viceversa) muy rápidamente. Lo consiguen sustituyendo el [[Dopaje de semiconductores|semiconductor Tipo-P]] por un conductor, generalmente aluminio. Es por esto que su uso principal es en circuitos digitales de alta velocidad.

La tensión lindar de estos diodos ronda los $0.4V$, por lo que además de conmutar más rápido consume menos energía y necesita menores diferencias de tensión para conmutar.

A pesar de que la corriente de fuga es muy superior al diodo de unión, midiéndose en $\mu A$ en vez de $\eta A$, sigue siendo despreciable.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=1.5]
  (0,0) to[Schottky diode, *-*, l=Diodo Schottky, v=$\sim 0.4V$] (2,0)
  ;
\end{circuitikz}
\end{document}
```

## Diodo LED

Los LED (*Light Emitting Diodes*) emiten luz en función de su composición química. En vez de usar silicio dopado sin más, usan semiconductores adecuados según la frecuencia de luz que se quiera obtener, como $GaAs$, $GaAsP$, o $SiC$, que generalmente están en la cuarta o quinta columna de la tabla periódica.

La luminosidad del LED, que se mide en lúmenes, es directamente proporcional a la corriente que pasa por él ($I_{D}$). Los LED que emiten luz visible tienden a necesitar entre $10mA$ y $20mA$ para ser fácilmente visibles, pero la corriente exacta la indica el fabricante.
 
```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=1.5]
  (0,0) to[led, *-*] (2,0)
  (1,0.75) node[] {Diodo LED}
  ;

\end{circuitikz}
\end{document}

```

### Funcionamiento del LED

Los electrones libres de un material están en la banda de conducción. Para que un electrón vuelva a la capa de valencias, que es menos energética, ha de perder energía.

En los LED, para que los electrones bajen a la capa de valencia para rellenar los huecos en el Ánodo, es energía se pierde en forma de fotón.

En este caso, los electrones habrán de perder más energía cuanto mayor sea el espacio entre ambas bandas, lo que cambiará lo energéticos que sean los fotones, que a su vez determinan el color de la luz emitida. También es por esto por lo que la luminosidad es proporcional a la corriente, pues al duplicar la corriente, pasan el doble de electrones y, por tanto, se producen el doble de fotones.

Siendo $h$ la constante de Planck, $\nu$ la frecuencia, $c$ la velocidad de la luz y $\lambda$ la longitud de onda, la energía del un fotón es directamente proporcional a $h$ y a $\nu$, pero inversamente proporcional a $\lambda$. Ya que lambda es la única de estas incógnitas que no es constante, el color del fotón es una función de la longitud de onda.
$$
E_{G} = \frac{h\nu}{\lambda} \implies f(\lambda) \mapsto \text{color}
$$

## Fotodiodos

Cumplen la función contraria al LED, pero internamente son muy similares. En vez de tener una sola curva característica, tiene una curva por cada nivel de intensidad, que convergen en $V_D \geq 0$, 

# Usos

- [[Puertas lógicas con diodos]]
- [[Recortadores de tensión con diodos]]
- [[Circuitos con LED]]