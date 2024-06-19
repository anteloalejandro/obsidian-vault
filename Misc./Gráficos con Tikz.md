

*En Obdisian, requiere el plugin TikZJax*

# `pgfplots`

## Propiedades de `addplot`

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}

%% PLOTS BEGIN HERE %%
% \addplot{x^2}; % default % %
\addplot[color=red, dashed, label={$x^2$}]{x^2} node[below, pos=.25, anchor=east]{$y=x^2$};
\addplot[color=blue, mark=*]{2*x}; % mark datapoints %
\addplot[color=green, samples=5]{x^2}; % set n of datapoints %


\end{axis}
\end{tikzpicture}

\end{document}
```

## Propiedades de `axis`

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
xmin=-5, xmax=5, 
ymin=-10, ymax=10, 
axis lines=middle,
xlabel = $x$,
ylabel = $y$,
title={Plot},
legend style={at={(0,0)}, anchor=east},
legend entries={$y = x^2$}
]

%% PLOTS BEGIN HERE %%
\addplot[color=blue, mark=*]{2*x};


\end{axis}
\end{tikzpicture}

\end{document}
```
