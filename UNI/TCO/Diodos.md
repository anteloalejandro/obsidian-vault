
La función de un diodo es permitir el paso de corriente en una sola dirección, de misma forma que lo hace una válvula con el agua.

Esencialmente, actúa como una pequeña pila en oposición a la corriente cuando la corriente fluye de ánodo a cátodo, y como un aislante si fluye de cátodo a ánodo.

```tikz
\usepackage{circuitikz}
\begin{document}

\begin{circuitikz}

\draw 
  (0,1) node[](diode) {}
  (diode) -- ++(1,0) to[empty diode] ++(1,0) -- ++(1,0)
  (diode)++(0,-1) to[short, i=I] ++(3, 0)
  ;
\path
  (diode) node[circ, label=Ánodo (A)] {}
  ++(3,0) node[circ, label=Cátodo (K)] {};

\draw[->, double] (diode)++(4.5, -0.5) -- ++(2,0);

\draw 
  (diode)++(7,0) node[](switch) {}
  (switch) -- ++(1,0) to[cute closed switch] ++(1,0) -- ++(1,0)
  (switch)++(0,-1) to[short, i=I] ++(3, 0)
  ;
\end{circuitikz}
\end{document}
```

```tikz
\usepackage{circuitikz}
\begin{document}

\begin{circuitikz}

\draw 
  (0,1) node[](diode) {}
  (diode) -- ++(1,0) to[empty diode] ++(1,0) -- ++(1,0)
  (diode)++(0,-1) to[short, i<=I] ++(3, 0)
  ;
\path
  (diode) node[circ, label=Ánodo (A)] {}
  ++(3,0) node[circ, label=Cátodo (K)] {};

\draw[->, double] (diode)++(4.5, -0.5) -- ++(2,0);

\draw 
  (diode)++(7,0) node[](switch) {}
  (switch) -- ++(1,0) to[cute open switch] ++(1,0) -- ++(1,0)
  (switch)++(0,-1) to[short, i<={I{=}0}] ++(3, 0)
  ;
\end{circuitikz}
\end{document}
```


# Funcionamiento

Los diodos están formados por semiconductores (generalmente silicio) [[Dopaje de semiconductores|dopados]] de tipo P y tipo N.