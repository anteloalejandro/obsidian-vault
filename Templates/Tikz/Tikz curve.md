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
axis lines=middle,
xmin=0, xmax=15, 
ymin=0, ymax=15,
% ETIQUETAS Y TÍTULO %
ticks=none,
xlabel = $x$,
ylabel = $y$,
]

\draw[thick] plot[smooth, tension=1.5] coordinates{
  (1,1) (1.5, 2) (3, 10) (4, 5)
};

\end{axis}

\end{tikzpicture}
\end{document}
```