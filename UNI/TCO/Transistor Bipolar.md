---
todo: true
---

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

% ETIQUETAS Y TÍTULO %
xlabel = $x$,
ylabel = $y$,

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none] (x*x, x) node[below, pos=.75, anchor=east]{$f(x)$};

\end{axis}
\end{tikzpicture}

\end{document}
```
