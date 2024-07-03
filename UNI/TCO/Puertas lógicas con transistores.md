
# NOR

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] {} to[R=$R$] ++(2,0) -- ++(0,-1) 
    node[circ] (junct) {} -- ++(-1,0) node[npn, anchor=C] (Q1) {}
  (Q1.B) -- ++(-1,0) node[anchor=east] {A} (Q1.E) node[ground] {}

  (junct) -- ++(1,0) node[npn, anchor=C] (Q2) {}
  ++(0,0) -- ++(1,0) node[anchor=south] {$V_{out}$}
  (Q2.E) node[ground] {}
  (Q2.B) -- ++(0,-2) -- ++(-3,0) node[anchor=east] {B}
  ;
\end{circuitikz}
\end{document}
```

La puerta lógica NOR se hace con dos o más transistores conectados en paralelo a la misma fuente de alimentación.

Si $A = B = 0V$, ambos transistores están en la zona de corte, por lo que es como si no formasen parte del circuito.

Si, por ejemplo, $A$ es igual a $V_{in}$ , el resultado es siempre un 0 lógico independientemente del valor de $B$, porque siguiendo el modelo de funcionamiento en la zona activa, tendríamos que $A - V_{BE(ON)} = 0$

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] {} to[R=$R$] ++(2,0) -- ++(0,-1) 
    node[circ] (junct) {} -- ++(-1,0) -- ++(0,-1)
    ++(0,0) -- ++(-0.5,0) node[circ] {} node[ground] {} -- ++(-0.5,0)
    ++(0,0) -- ++(1,0) 
      node[battery1, invert, label=$V_\gamma = V_{BE(ON)}$] {}

  (junct) -- ++(1,0) node[npn, anchor=C] (Q2) {}
  ++(0,0) -- ++(1,0) node[anchor=south] {$V_{out}$}
  (Q2.E) node[ground] {}
  (Q2.B) -- ++(0,-2) -- ++(-3,0) node[anchor=east] {B}
  ;
\end{circuitikz}
\end{document}
```
