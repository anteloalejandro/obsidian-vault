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
\draw (-2,2) .. controls (-1,0) and (1,0) .. (2,2);

\end{axis}
\end{tikzpicture}

\end{document}
```
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
xtick={0},
xlabel = $V_D$,
ylabel = $I_D$,
clip=false % No permitir que el texto sobrepase la gráfica % %

]

\draw
		node [] (0) at (0, 0) {}
		node [] (1) at (0.75, 1) {}
		node [] (2) at (1.25, 5.5) {}
		node [] (3) at (2, 6.5) {}
		node [] (4) at (9.5, 6.5) {}
		node [] (5) at (1, 3.25) {}
		node [] (6) at (1.75, 4.25) {}
		node [] (7) at (9.5, 4.25) {}
		node [] (8) at (0.75, 1) {}
		node [] (9) at (1.5, 2) {}
		node [] (10) at (9.5, 2) {}

\draw [bend right, looseness=1.50] (0.center) to (1.center);
\draw (1.center) to (2.center);
\draw [bend left, looseness=1.25] (2.center) to (3.center);
\draw (3.center) to (4.center);
\draw [bend left, looseness=1.25] (5.center) to (6.center);
\draw (6.center) to (7.center);
\draw [bend left, looseness=1.25] (8.center) to (9.center);
\draw (9.center) to (10.center);


;

\end{axis}
\end{tikzpicture}
\end{document}
```
