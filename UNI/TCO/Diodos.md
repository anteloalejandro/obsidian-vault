---
todo: true
---

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
  (switch) -- ++(1,0) to[battery1, l=$V_{\gamma}$] ++(1,0) -- ++(1,0)
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

# Parámetros

La **tensión lindar** $V_{\gamma}$ es una constante propia del diodo. Provoca una caída de tensión cuando el diodo conduce, e impide que haya corriente si la tensión en el ánodo es menor a ésta.

La **diferencia de tensión** del diodo $V_{D}$ es la diferencia entre la tensión en el ánodo $V_{A}$ y la tensión en el cátodo $V_{K}$. Cuando el diodo está conduciendo esa tensión es igual a la tensión lindar.
$$
\begin{gather}
V_{D} = V_{A} - V_{K}\\
\text{El diodo conduce} \implies V_{D} = V_{\gamma}
\end{gather}
$$

La **corriente por el diodo** $I_{D}$ es, simplemente, la corriente que pasa por el diodo. Si la corriente que va de ánodo a cátodo, no sucede nada, pero si va de cátodo a ánodo, pasa a ser 0.
$$
I_{D} = 
\begin{cases}
I_{\tiny\overrightarrow{AK}} & \text{ si } I_{\tiny\overrightarrow{AK}} > 0\\
0 & \text{ si } I_{\tiny\overrightarrow{AK}} \leq 0

\end{cases}
$$


# Funcionamiento

Los diodos están formados por una [[Unión P-N]], en la que el Ánodo es el terminal del material Tipo P y el Cátodo el terminal del material Tipo-N.

Para que la corriente convencional fluya solamente de ánodo a cátodo, el flujo de electrones ha de ir en dirección contraria, de cátodo a ánodo.

Al conectar correctamente una pila al diodo, con el lado positivo de la pila conectado al ánodo y el lado negativo conectado al cátodo, el material Tipo-N recibirá más electrones y, en caso de que haya suficiente tensión como para superar la tensión lindar de la unión, esos electrones pasarán al material Tipo-P hasta que lo rebasen en salgan por el extremo del cátodo, hasta el lado positivo de la pila. En caso de que la tensión no supere a la tensión lindar, los electrones no podrán pasar de un lado a otro y no habrá ningún tipo de corriente.