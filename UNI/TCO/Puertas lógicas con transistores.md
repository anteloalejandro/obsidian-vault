
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

Si $A = B = 0V$, ambos transistores están en la zona de corte, por lo que es como si no formasen parte del circuito, así que $V_{out} = V_{in}$.

Si, por ejemplo, $A$ es igual a $V_{in}$ , el resultado es siempre un 0 lógico independientemente del valor de $B$, porque siguiendo el modelo de funcionamiento en la zona activa, tendríamos que $A - V_{BE(ON)} = 0$

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] {} to[R=$R$] ++(2,0) -- ++(0,-1) 
  node[circ] (junct) {} -- ++(-1,0) -- ++(0,-1)
  ++(0,0) -- ++(-0.5,0) node[circ] {} node[ground] {} -- ++(-0.5,0)
  ++(0,0) to[battery1, invert, l=$V_\gamma {=} V_{BE(ON)}$] ++(0,1)
  ++(0,0) node[ocirc, label=A] {}
      

  (junct) -- ++(1,0) node[npn, anchor=C] (Q2) {}
  ++(0,0) -- ++(1,0) node[anchor=south] {$V_{out}$}
  (Q2.E) node[ground] {}
  (Q2.B) -- ++(0,-2) -- ++(-3,0) node[anchor=east] {B}
  ;
\end{circuitikz}
\end{document}
```

# NAND

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[circ,label=$V_{in}$] {} to[R=R] ++(2,0) node[circ] (junct) {}
  (junct) -- ++(1,0) node[anchor=west] {$V_{out}$}
  (junct) -- ++(0,-0.5) node[npn, anchor=C] (Q1) {}
  (Q1.B) to[R=$R_A$] ++(-2,0) node[anchor=east] {A}
  (Q1.E) node[npn, anchor=C] (Q2) {}
  (Q2.B) to[R=$R_B$] ++(-2,0) node[anchor=east] {B}
  (Q2.E) node[ground] {}
  
  
  ;
\end{circuitikz}
\end{document}
```

A diferencia de la NOR, la puerta NAND está hecha con transistores en serie (aunque la salida sigue en paralelo).

Si $A = B = 0V$, ambos transistores están en la zona de corte, por lo que es como si no formasen parte del circuito, así que $V_{out} = V_{in}$.

Si $A = B = V_{in}$ , $V_{out}$ es igual a la diferencia entre $A$ y $V_{in}$, que es 0.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] to[R=R] ++(2,0)
    node[circ, label=$V_{out}$]
  ++(0,0) -- ++(0,-1) -- (0.5) node[circ] (junct1) {}
  (junct1) node[ground] {}
  (junct1) -- ++(0.5,0) to[battery1, invert, l=$V_{BE(ON)}$] ++(0,1)
  ++(0,0) node[ocirc, label=A]

  (junct1) -- ++(0,-0.5) -- ++(1,0) node[circ] {} node[ground] {}
  
  ;
\end{circuitikz}
\end{document}
```
