
Los diodos pueden usarse en paralelo a un circuito para limitar la corriente máxima de esta forma:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ] (junction) {}
  (junction) -- ++(1,0) node[label=$V_{out}$] {}
  (junction) -- ++(0,-1) to[empty diode, label=D, v=$V_\gamma$] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$] nod
  ;
\end{circuitikz}
\end{document}
```


```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{00FF00}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis x line=center,
axis y line=left,

% ETIQUETAS Y TÍTULO %
xmin = 0,
ymin = -10,
ymax = 10,
xlabel = t,
ylabel = V,
ytick={5},
xtick={0},
yticklabels={$V_1$},
ymajorgrids=true

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none,samples=100, domain=0:10]{10*sin(deg(x))} node[below, pos=.75, anchor=east]{$V_{in}$};
\addplot+[color=blue,mark=none,samples=100, domain=0:10]{10*sin(deg(x)) <= 4.5 ? 10*sin(deg(x)) : sin(deg(x))+4.5} node[below, pos=.75, anchor=east]{$V_{out}$};
% \addplot[mark=*] coordinates {(1,2)} node[above]{$(1,2)$};

\end{axis}
\end{tikzpicture}

\end{document}
```


# Simulación de un recortador

$$
\begin{matrix}
V_{\gamma} \simeq 0.5V &
V_{in} = 5V &
R = 1k\Omega
\end{matrix}
$$
```circuitjs
$ 1 0.000005 10.20027730826997 50 5 50 5e-11
R 400 320 320 320 0 1 40 5 0 0 0.5
r 400 320 544 320 0 1000
d 544 320 544 384 2 default
v 544 480 544 384 0 0 40 2 0 0 0.5
g 544 480 544 560 0 0
w 544 320 736 320 0
d 544 240 544 320 2 default
g 544 144 544 112 0 0
v 544 240 544 144 0 0 40 2 0 0 0.5
x 700 368 762 371 4 24 V_out
x 298 364 346 367 4 24 V_in
o 5 64 0 4098 5 0.0125 0 4 5 3 0 0 0 3
38 8 F1 0 0 5 -1 Lower\sbound
38 3 F1 0 0 5 -1 Upper\sbound

```

