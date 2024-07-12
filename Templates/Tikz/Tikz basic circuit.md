```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,4) to[battery1, l=$V_0$, i=$I_0$] (0,0)
  (0,4) to[R=$R_1$] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0)
  ;
\end{circuitikz}
\end{document}
```
