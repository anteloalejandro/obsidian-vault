

*En Obdisian, requiere el plugin TikZJax*

# `pgfplots`

## Propiedades de `addplot`

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{FBB76B}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}

%% PLOTS BEGIN HERE %%
% \addplot{x^2}; % default % %
\addplot[color=linecolor1, dashed, label={$x^2$}]{x^2} node[below, pos=.25, anchor=east]{$y=x^2$}; % above, below, right, left %
\addplot[color=blue, mark=*, domain=-3:3]{2*x}; % mark datapoints %
\addplot+[color=green, samples=5]{x^2}; % set n of datapoints %

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
% LIMITES DE LA GRÁFICA %
xmin=-10, xmax=10, 
ymin=-20, ymax=20,
domain=-10:10, % Valor mínimo y máximo para las gráficas %

% LÍNEAS DE LA GRÁFICA %
xtick={0,5,10},
xticklabels={$A$, $B$, $C$},
xticklabel style={anchor=south west},
ytick={0,5,10,15,20},
xmajorgrids=true,
ymajorgrids=true,
grid style=dashed,

% CENTRADO DE LA GRÁFICA %
axis lines=middle,

% ETIQUETAS Y TÍTULO %
xlabel = $x$,
ylabel = $y$,
title={Plot},

% LEYENDAS. at={(x, y)}, dónde 1 es un extremo y 0 el otro %
legend style={at={(1.1,0.5)}, anchor=west},
legend entries={$y = x^2$},

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=blue]{2*x};

\end{axis}
\end{tikzpicture}

\end{document}
```


# `circuitikz`

Los circuitos se definen en el bloque `circuitikz` con el comando `\draw`, tras el cual va una lista de parámetros  coordenada-enlace, separados por espacios. Las coordenadas tienen el formato `(0,1)` y los enlaces pueden ser una línea con `--` o un componente con `to[<nombre_componente>]`. Finalmente, el comando draw se termina con un `;` que, en caso de que se quiera hacer un circuito cerrado, se ha de preceder por la primera coordenada de la lista de parámetros.

Por ejemplo, un circuito simple se puede definir como:

```latex
\draw 
  (0,0) to[battery]
  (0,4) to[ammeter]
  (4,4) --
  (4,0) to[lamp]
  (0,0);
```

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) to[battery]
  (0,4) to[ammeter]
  (4,4) --
  (4,0) to[lamp]
  (0,0);
\end{circuitikz}
\end{document}

```

## Circuitos en paralelo

Para añadir una sección en paralelo al circuito anterior, simplemente se han de añadir nuevos parámetros de la siguiente forma

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) to[battery]
  (0,4) to[ammeter]
  (4,4) --
  (4,0) to[lamp, *-*]
  (0,0);

\end{circuitikz}
\end{document}

```
