---
todo: true
---

Los [[Diodos]], resistencias y demás pueden crear diferencias de tensión, pero no añadir más tensión al circuito. A diferencia de estos, los transistores son activos, es decir, se tienen que alimentar, por lo que si que pueden añadir tensión al circuito, por lo que se suelen usar para amplificar señales ya existentes.

Otra diferencia con los diodos es que en vez de ser una [[Unión P-N]], están formados por una unión N-P-N o (P-N-P), cuyos terminales corresponden a los pines Emisor, Base y Colector, o E-B-C, respectivamente.

En un BJT N-P-N, la base es el de tipo P y es la parte más fina y menos cargada de todas, el colector es algo más grande pero es el que más carga tiene y el emisor es el lado más grande, pero está menos cargado que el colector.

![[diagrama unión n-p-n.excalidraw|100%]]

Por estar formado de un tipo de [[Dopaje de semiconductores|semiconductor dopado]] entre otros dos del otro tipo, se puede modelar un transistor BJT como un par de diodos en dirección opuesta:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[npn] (Q1) {}
  (4,0) node[] (Q2) {}

  (Q1.B) node[anchor=east] {\small B}
  (Q1.C) node[anchor=west] {\small C}
  (Q1.E) node[anchor=west] {\small E}
  ;
\draw
  (Q2) node[anchor=east] {C} to[diode, invert] ++(1, 0) -- ++(1,0)
  ++(0,0) node[circ] (junction) {}
  ++(0,0) -- ++(1,0) to[diode] ++(1,0) node[anchor=west] {E}
  (junction) -- ++(0,-1) node[anchor=north] {B}
  ;

\draw[->, double] (Q1.center)++(1,0) -- ++(2,0);

\end{circuitikz}
\end{document}
```


# Curvas características y recta de carga
```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{00FF00}
\definecolor{linecolor2}{HTML}{0000FF}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis lines=middle,
xtick={0},
ytick={0},

% ETIQUETAS Y TÍTULO %
xmin = 0, xmax=12,
ymin = 0, ymax=12,
xlabel = $V_{CE}$,
ylabel = $I_C$,

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\draw[color=linecolor1]
  (0,0) .. controls (0.25,0) and (1,0) .. (1,2)
  (1,2) -- (1,8)

  (1,8) .. controls (1, 9.5) and (2, 10) .. (10,10)
  (1,6) .. controls (1, 7.5) and (2, 8) .. (10,8)
  (1,4) .. controls (1, 5.5) and (2, 6) .. (10,6)
  (1,2) .. controls (1, 3.5) and (2, 4) .. (10,4)
  ;

\addplot[color=linecolor2, domain=0:12] {-0.75*x + 7};



\end{axis}
\end{tikzpicture}

\end{document}
```


# Funcionamiento

En un transistor bipolar N-P-N, la base es tan estrecha que sólo una pequeña parte de los electrones puede llenar huecos, el resto viajan por el colector, que es el que menor carga negativa tiene, lo que acaba produciendo una corriente convencional positiva desde el emisor.

La amplificación sucede al pasar una corriente por el colector, que lo hace más positivo y, por tanto, aumenta la diferencia con el emisor, aumentando la corriente que sale de éste.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node []
  ;
\end{circuitikz}
\end{document}
```
