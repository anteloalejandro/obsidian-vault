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
axis lines=right,

% ETIQUETAS Y TÍTULO %
xlabel = $x$,
ylabel = $y$,
title={Plot},

% LEYENDAS. at={(x, y)}, dónde 1 es un extremo y 0 el otro %
legend style={at={(1.1,0.5)}, anchor=west},
legend entries={$y = 2x$},

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none]{2*x} node[below, pos=.75, anchor=east]{$y=2x$};
\addplot[mark=*] coordinates {(1,2)} node[above]{$(1,2)$};

\end{axis}
\end{tikzpicture}

\end{document}
```
