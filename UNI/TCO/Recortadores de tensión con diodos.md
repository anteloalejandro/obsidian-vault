
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
xlabel = $x$,
ylabel = $y$,

% LEYENDAS. at={(x, y)}, dónde 1 es un extremo y 0 el otro %
legend style={at={(1.1,0.5)}, anchor=west},
legend entries={$y = 2x$},

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none]{sin(deg(x))} node[below, pos=.75, anchor=east]{$y=2x$};
\addplot[mark=*] coordinates {(1,2)} node[above]{$(1,2)$};

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

