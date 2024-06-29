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

En realidad, la relación la diferencia de tensión y la corriente por el diodo destacada en el apartado anterior hacen referencia a un modelo simplificado del diodo, no al funcionamiento real de este.

El modelo se utiliza porque es una aproximación suficientemente buena del funcionamiento real en la gran mayoría de los casos, pero en ocasiones los fabricantes proveen también de la **curva característica** que modela con precisión la relación entre $V_D$ e $I_D$ en forma de gráfica.

Si, además, se calcula la **recta de carga** del diodo en el circuito actual usando los puntos de corte $V_D=0$ e $I_D = 0$, se obtiene el **punto de trabajo** $Q$, cuyas componentes corresponden a la tensión y corriente exactas del diodo en el circuito actual.

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
xtick={0.7},
xticklabels={$V_\gamma$},
xlabel = $V_D$,
ylabel = $I_D$,

clip=false % No permitir que el texto sobrepase la gráfica % %

]

\draw[thick, color=linecolor1] plot[smooth, tension=0.75] coordinates{
  (-6,-0.2) (-3, -0.2) (0,0)
};
\draw[thick, color=linecolor1] plot[smooth, tension=0.75] coordinates{
  (0,0) (0.5, 1) (1,3)
};
\draw[thick, color=linecolor1] plot[smooth, tension=0.75] coordinates{
  (1,3) (1.5, 6) (2, 12)
};

\draw (2,6) node[anchor=west, color=linecolor1] {Curva característica};

\addplot[color=linecolor2, domain=0:3.6] {-0.8*x + 3} node[color=linecolor2, right, pos=0, anchor=east]{Recta de carga};
\addplot[mark=*] coordinates{(0.85, 2.3)} node[anchor=west, outer sep=3pt] {$Q{=}(V_{DQ}, I_{DQ})$};

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