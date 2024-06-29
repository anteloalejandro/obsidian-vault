
La función de un diodo es permitir el paso de corriente en una sola dirección, de misma forma que lo hace una válvula con el agua.

Esencialmente, actúa como una pequeña pila en oposición a la corriente cuando la corriente fluye de ánodo a cátodo, y como un aislante si fluye de cátodo a ánodo.

```tikz
\usepackage{circuitikz}
\begin{document}


\begin{circuitikz}

\draw 
  (0,1) -- (1,1) to[empty diode] (3,1) -- (4,1)
  (0, 0) to[short, i=I] (4, 0)
  ;
\path
  (0,0) node[circ, label=Ánodo (A)] {}
  (4,0) node[circ, label=Cátodo (K)] {};

\draw[->, double] (5.5, 0.5) -- ++(1,0);


\end{circuitikz}



\end{document}
```


![[Diodo.excalidraw|100%]]

