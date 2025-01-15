```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [
  state,
  initial,
] {$q_0$};
\node (q1) [state, accepting, right = of q0] {$q_1$};
\node (q2) [state, above right = of q1] {$q_2$};
\node (q3) [state, below right = of q1] {$q_3$};
\node (q4) [state, accepting, below right = of q2] {$q_4$};

\path [-stealth]
  (q0) edge node {a,b} (q1)
  (q1) edge node {a} (q2)
  (q1) edge [bend left] node {b} (q3)
  (q3) edge [bend left] node {a} (q1)
  (q3) edge [loop below] node {b} (q3)
  (q2) edge node {b} (q4)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```
