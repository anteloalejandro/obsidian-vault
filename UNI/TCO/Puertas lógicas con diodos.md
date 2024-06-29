
Si se toma como *1 lógico*  de alrededor de $5V$ y como *0 lógico* un valor de alrededor de $0V$, se pueden construir las puertas lógicas *OR* y *AND* haciendo uso de diodos y resistencias.

# AND

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=A] (A) {}
  (A) -- ++(1,0) to[empty diode, label=$D_1$, v<=$V_\gamma$, invert] ++(1,0)
  ++(0,0) -- ++(1,0)
  (A)++(0,-2) node[ocirc, label=B] (B) {}
  (B) -- ++(1,0) to[empty diode, label=$D_2$, v<=$V_\gamma$, invert] ++(1,0)
  ++(0,0) -- ++(1,0) -- ++(0,2) node[circ] (junction) {}
  
  (junction) -- ++(0,1) to[R=R] ++(0,1) -- ++(-1,0)
  ++(0,0) to[battery1, l_=$5V$] ++(-1,0)
  ++(0,0) node[ground] {} 

  (junction) -- ++(1,0) node[anchor=south] {$V_{out}$}
  ;
\end{circuitikz}
\end{document}
```

Si cualquiera de las dos entradas es igual a 0, el diodo correspondiente conduce. Como conduce y la entrada es 0, se crea una diferencia de tensión en ese punto del circuito de valor $V_\gamma$. Al ser $V_{out}$ paralelo a esta diferencia de tensión, sabemos que $V_{out} - V_{\gamma} = 0 \iff V_{out} = V_{\gamma}$, que podemos decir que es equivalente al 0 lógico.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=A] (A) {}
  (A) -- ++(1,0) to[empty diode, label=$D_1$, v<=$V_\gamma$, invert] ++(1,0)
  ++(0,0) -- ++(1,0)
  (A)++(0,-2) node[ground, label=B] (B) {}
  (B) -- ++(1,0) to[battery1, l_=$V_\gamma$, invert] ++(1,0)
  ++(0,0) -- ++(1,0) -- ++(0,2) node[circ, label=] (junction) {}
  
  (junction) -- ++(0,1) to[R=R] ++(0,1) -- ++(-1,0)
  ++(0,0) to[battery1, l_=$5V$] ++(-1,0)
  ++(0,0) node[ground] {}

  (junction) -- ++(1,0) node[anchor=south] {$V_{out}$}
  ;
\end{circuitikz}
\end{document}
```