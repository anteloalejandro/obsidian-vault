```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw
  (0,0) node[ocirc, label=$+V_{BB}$] (V_BB) {}
  (V_BB) to[i=$I_B$] ++(1,0)
  ++(0,0) to[R=$R_B$] ++(1,0)
  ++(0,0) -- ++(1,0)
  node[npn, anchor=B](Q) {}
  (Q.C) -- ++(0,1)
  ++(0,0) to[R=$R_C$] ++(0,1)
  ++(0,0) -- ++(0,1) node[ocirc, label=$+V_{CC}$] {}
  (Q.E) -- ++(0,0) node[ground] {}
  % salida inversor
  (Q.C)++(0,0.5) -- ++(1,0) node[circ, label=$V_{out}$] {}
  ;

\path 
  % (Q.center) coordinate(center) node[anchor={center}] {Q}
  (Q.B) node[anchor=south] {\small B}
  (Q.C) node[anchor={north west}] {\small C}
  (Q.E) node[anchor={south west}] {\small E}
  ;

\end{circuitikz}
\end{document}
```