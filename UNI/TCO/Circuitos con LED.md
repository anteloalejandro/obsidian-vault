
Siendo $V_{OL}$ la tensión máxima que se considera como 0 lógico, y $V_{OH}$ la tensión mínima que se considera un 1 lógico, se puede crear un circuito con una puerta lógica (en este caso una NAND, pero podría ser cualquiera) y un LED que sólo se ilumine a nivel bajo (la salida es 0 lógico) o a nivel alto (la salida es 1 lógico).

En la vida real, por norma general, lo que podremos cambiar del circuito es la resistencia que se coloca en el circuito o la bombilla que se utiliza.

# LED encendido a nivel bajo

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[nand port] (gate) {}
  (gate) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0)
  ++(0,0) to[led, invert, v<=$V_\gamma$] ++(1,0) -- ++(1,0)
  ++(0,0) to[battery1, l=$V_{cc}$] ++(1,0) node[ground] {}
  ;
\path (gate.out) node[anchor=south] {F};
\end{circuitikz}
\end{document}
```

En este caso si $F \simeq 0$ viajará una corriente de $V_{cc}$ a $F$, así que el LED estará encendido. Sin embargo, si $F \simeq V_{cc}$ , el LED actuará de aislante y no emitirá luz.

$$
R = \frac{V_{cc - V_{\gamma} - V_{OL}}}{I_{\text{necesaria}}}
$$

# LED encendido a nivel alto

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[nand port] (gate) {}
  (gate) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0)
  ++(0,0) to[led, v=$V_\gamma$] ++(1,0) -- ++(1,0)
  ++(0,0) -- ++(1,0) node[ground] {}
  ;
\path (gate.out) node[anchor=south] {F};
\end{circuitikz}
\end{document}
```

Con este mode de circuito si $F \simeq 1$ viajará una corriente de $F$ a tierra, por lo que el LED estará encendido. En caso de que $F \simeq 0$, la diferencia de tensión será ínfima así que el diodo hará de aislante.

$$
R = \frac{V_{OH}-V_{\gamma}}{I_{\text{necesaria}}}
$$