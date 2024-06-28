

*En Obdisian, requiere el plugin TikZJax*

# `pgfplots`

## Propiedades de `addplot`

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{FBB76B}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}

%% PLOTS BEGIN HERE %%
% \addplot{x^2}; % default % %
\addplot[color=linecolor1, dashed, label={$x^2$}]{x^2} node[below, pos=.25, anchor=east]{$y=x^2$}; % above, below, right, left %
\addplot[color=blue, mark=*, domain=-3:3]{2*x}; % mark datapoints %
\addplot+[color=green, samples=5]{x^2}; % set n of datapoints %

\end{axis}
\end{tikzpicture}

\end{document}
```


## Propiedades de `axis`

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
% LIMITES DE LA GRÁFICA %
xmin=-10, xmax=10, 
ymin=-20, ymax=20,
domain=-10:10, % Valor mínimo y máximo para las gráficas %

% LÍNEAS DE LA GRÁFICA %
xtick={0,5,10},
xticklabels={$A$, $B$, $C$},
xticklabel style={anchor=south west},
ytick={0,5,10,15,20},
xmajorgrids=true,
ymajorgrids=true,
grid style=dashed,

% CENTRADO DE LA GRÁFICA %
axis lines=middle,

% ETIQUETAS Y TÍTULO %
xlabel = $x$,
ylabel = $y$,
title={Plot},

% LEYENDAS. at={(x, y)}, dónde 1 es un extremo y 0 el otro %
legend style={at={(1.1,0.5)}, anchor=west},
legend entries={$y = x^2$},

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=blue]{2*x};

\end{axis}
\end{tikzpicture}

\end{document}
```


# `circuitikz`

Los circuitos se definen en el bloque `circuitikz` con el comando `\draw`, tras el cual va una lista de parámetros  coordenada-enlace o coordenada-enlace-coordenada, separados por espacios. Las coordenadas tienen el formato `(0,1)` y los enlaces pueden ser una línea con `--` o un componente con `to[<nombre_componente>]`. Finalmente, el comando draw se termina con un `;` que, en caso de que se quiera hacer un circuito cerrado, se ha de preceder por la primera coordenada de la lista de parámetros.

Por ejemplo, un circuito simple se puede definir así:
```latex
\draw 
  (0,0) to[battery] (0,4)
  (0,4) to[ammeter] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0);
```

O, eliminando las coordenadas reduntantes, así:
```latex
\draw 
  (0,0) to[battery]
  (0,4) to[ammeter]
  (4,4) --
  (4,0) to[lamp]
  (0,0);
```

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) to[battery] (0,4)
  (0,4) to[ammeter] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0)
  ;
\end{circuitikz}
\end{document}

```

En el segundo caso orden afecta el resultado, porque se dibujará desde el último punto hasta el siguiente. Tanto en el primer como en el segundo caso, el orden afecta a la orientación, de modo que un componente puede estar al revés. De hecho, en el circuito anterior se ha cometido este mismo error con la batería, cambiando el sentido de la corriente. Se puede arreglar así:

```latex
\draw 
  (0,4) to[battery] (0,0)
  (0,4) to[ammeter] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0);
```

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,4) to[battery] (0,0)
  (0,4) to[ammeter] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0)
  ;
\end{circuitikz}
\end{document}
```
En el caso de componentes como las baterías o pilas, se también se puede especificar `\to[battery, invert]` para invertir el sentido de la batería, pero sólo visualmente.

## Circuitos en paralelo

Para añadir una sección en paralelo al circuito anterior, simplemente se han de añadir nuevos parámetros de la siguiente forma, usando `to[*-*]` para destacar los puntos en los que se divide el circuito.

```latex
\draw 
  (0,4) to[battery] (0,0)
  (0,4) to[ammeter] (4,4)
  (4,4) -- (4,0)
  (4,0) -- (3.5, 0) to[lamp, *-*] (0.5, 0) -- (0,0)
  (0.5, 0) -- (0.5, -2) to[voltmeter] (3.5, -2) -- (3.5, 0);
```

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,4) to[battery] (0,0)
  (0,4) to[ammeter] (4,4)
  (4,4) -- (4,0)
  (4,0) -- (3.5, 0) to[lamp, *-*] (0.5, 0) -- (0,0)
  (0.5, 0) -- (0.5, -2) to[voltmeter] (3.5, -2) -- (3.5, 0)
  ;

\end{circuitikz}
\end{document}

```

## Etiquetas

Para añadir etiquetas a los componentes, se debe usar `to[<componente>, label=<etiqueta>]`.

```latex
\draw 
  (0,4) to[battery] (0,0)
  (0,4) to[ammeter, label=$2mA$] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0);
```

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,4) to[battery] (0,0)
  (0,4) to[ammeter, label=$2mA$] (4,4)
  (4,4) -- (4,0)
  (4,0) to[lamp] (0,0)
  ;
\end{circuitikz}
\end{document}

```

Alternativamente, se pueden usar `R`, `i` y `v` para anotar específicamente la resistencia, intensidad y tensión de un componente. Para lidiar con la diferencia entre carga eléctrica y corriente convencional, se puede usar `<=` para invertir el sentido de la flecha.

```latex
\draw  
  (0,4) to[battery1, l=$V_0$, i<=$I_0$] (0,0)
  (0,4) to[ammeter, label=$2mA$] (4,4)
  (4,4) to[R=$R_1$] (4,0)
  (4,0) to[lamp] (0,0);
```

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,4) to[battery1, l=$V_0{=}5V$, i<=$I_0$] (0,0)
  (0,4) to[ammeter, label=$2mA$] (4,4)
  (4,4) to[R=$R_1$] (4,0)
  (4,0) to[lamp] (0,0)
  ;
\end{circuitikz}
\end{document}

```

## Componentes con varias entradas / salidas

Las coordenadas de en las que se crean un nodo se pueden nombrar con tal de poder reutilizar la misma posición multiples veces. Esto es especialmente importante en este caso porque permite acceder a los diferentes terminales de componente complejo a través de sus nombres. Por ejemplo, dado el siguiente transistor:

```latex
\draw (0,0) node[npn] (Q) {}
```

Se pueden anotar cada uno de los terminales de la siguiente manera:

```latex
\path
  (Q.B) node[anchor=south] {\small B}
  (Q.C) node[anchor={north west}] {\small C}
  (Q.E) node[anchor={south west}] {\small E};
```

Si, además, se hacen uso de las coordenadas relativas con el operador `++`, precedidas o no por una coordenada nombrada o absoluta, se pueden crear circuitos con componentes complejos fácilmente, como este inversor:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw
  (0,0) node[ground] (GND) {}
  (GND) to[battery1, l=$V_{BB}$, invert] ++(2,0)
  ++(0,0) to[R=$R_B$] ++(1,0)
  ++(0,0) -- ++(1,0)
  node[npn, anchor=B](Q) {}
  (Q.C) -- ++(0,1) to[R=$R_C$] ++(0,1)
  ++(0,0) to[battery1, l=$V_{CC}$] ++(0,2)
  ++(0,0) -- ++(1,0) node[ground] {}
  (Q.E) -- ++(0,-1) node[ground] {}
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


## Listado de componentes

### Bipolares

Los que se usan con `to[<componente>]` (dos extremos).

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw
(0,0) to[R, o-o] (2,0)
(4,0) to[vR, o-o] (6,0)
(0,2) to[transmission line, o-o] (2,2)
(4,2) to[closing switch, o-o] (6,2)
(0,4) to[empty diode, o-o] (2,4)
(4,4) to[full led, o-o] (6,4)
(0,6) to[generic, o-o] (2,6)
(4,6) to[sinusoidal voltage source, o-o] (6,6)
;

\end{circuitikz}
\end{document}
```

### Tripolares

#### BJT

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw
  (0,0) node[npn] (Q1) {}
  (4,0) node[pnp, yscale=-1] (Q2) {};
\path
  (Q1.B) node[anchor=south] {B}
  (Q1.C) node[anchor=west] {C}
  (Q1.E) node[anchor=west] {E}
  (Q2.B) node[anchor=south] {B}
  (Q2.C) node[anchor=west] {C}
  (Q2.E) node[anchor=west] {E}
  ;

\end{circuitikz}
\end{document}
```

#### PMOS

Coordenadas:
  - `Q.G`, `Q.gate`
  - `Q.D`, `Q.drain`
  - `Q.S`, `Q.source`
  - `Q.B`, `Q.bulk`

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw (0,0) node[pmos, yscale=-1] (Q1) {};
\path (Q1.G) node[anchor=south] {\small G}
  (Q1.D) node[anchor={west}] {\small D}
  (Q1.S) node[anchor={west}] {\small S};

\draw (4,0) node[pfet] (Q2) {}
(Q2.B) -- (Q2.S)
;
\path (Q2.G) node[anchor=south] {\small G}
  (Q2.D) node[anchor={west}] {\small D}
  (Q2.S) node[anchor={west}] {\small S};

\end{circuitikz}
\end{document}
```

#### NMOS

Coordenadas:
  - `Q.G`, `Q.gate`
  - `Q.D`, `Q.drain`
  - `Q.S`, `Q.source`
  - `Q.B`, `Q.bulk`
```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw (0,0) node[nmos] (Q1) {};
\path (Q1.G) node[anchor=south] {\small G}
  (Q1.D) node[anchor={west}] {\small D}
  (Q1.S) node[anchor={west}] {\small S};

\draw (4,0) node[nfet] (Q2) {}
(Q2.B) -- (Q2.S)
;
\path (Q2.G) node[anchor=south] {\small G}
  (Q2.D) node[anchor={west}] {\small D}
  (Q2.S) node[anchor={west}] {\small S};

\end{circuitikz}
\end{document}
```