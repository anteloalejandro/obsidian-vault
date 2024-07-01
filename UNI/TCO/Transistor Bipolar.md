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
xmin = 0,
ymin = 0,
xlabel = $x$,
ylabel = $y$,

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=blue]{10^(x)};
\addplot+[color=blue]{10^5 * ln(x)/ln(10)};

\end{axis}
\end{tikzpicture}

\end{document}
```
