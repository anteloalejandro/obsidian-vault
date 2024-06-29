
Los diodos pueden usarse en paralelo a un circuito para limitar la corriente máxima de esta forma:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ] (junction) {}
  (junction) -- ++(1.5,0) node[label=$V_{out}$] {}
  (junction) -- ++(0,-1) to[empty diode, label=D, v=$V_\gamma$] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$] ++(0,-1) node[ground] {}
  ;
\end{circuitikz}
\end{document}
```

La resistencia $R$ hace que la corriente fluya hacia $V_{out}$ y hacia el ánodo de $D$. En caso de que $V_{out}$ sea mayor que $V_1$ el diodo conduce electricidad y se puede modelar como un circuito idéntico con una pila en la dirección opuesta a la corriente de valor $V_\gamma$ .

En caso contrario, el diodo actúa como aislante, impidiendo que $V_1$ afecte al resultado. Si $V_{out}$ no está conectado a tierra, corriente también será 0 en el resto del circuito, por lo que $V_{out} = V_{in}$, pero si sí está conectado a tierra $R$ provocará una caída de tensión antes de llegar al punto $V_{out}$.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ, label=$V_{1} + V_\gamma$] (junction) {}
  (junction) -- ++(1.5,0) node[label=$V_{out}$] (vout) {}
  (junction) -- ++(0,-1) to[battery1, l=$V_\gamma$] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$] ++(0,-1) node[ground] {}
  (vin)++(0,-2) node[] {\Large Si $V_{in} > V_{1}$}

  (vout)++(3,0) node[ocirc, label=$V_{in}$] (vin2) {}
  (vin2) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ, label=$\sim V_{in}$] (junction2) {}
  (junction2) -- ++(1.5,0) node[label=$V_{out}$] (vout2) {}
  (junction2) to[short, i=$I_{D}{=}0$] ++(0,-1) to[opening switch] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$] ++(0,-1) node[ground] {}
  (vin2)++(0,-2) node[] {\Large Si $V_{in} \leq V_{1}$}
  
  ;
\end{circuitikz}
\end{document}
```

Por tanto, si $V_{in}$ fuese una batería de corriente alterna, la interacción entre $V_{in}$ y $V_{1}$ se puede resumir en un gráfico de la siguiente forma:

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{FF5C50}
\definecolor{linecolor2}{HTML}{50C5FF}

% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis x line=center,
axis y line=left,

% ETIQUETAS Y TÍTULO %
xmin = 0,
ymin = -10,
ymax = 10,
xlabel = t,
ylabel = V,
ytick={5},
xtick={0},
yticklabels={$V_1$},
ymajorgrids=true

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none,samples=100, domain=0:10]{10*sin(deg(x))} node[below, pos=.75, anchor=east]{$V_{in}$};
\addplot+[color=linecolor2,mark=none,samples=100, domain=0:10]{10*sin(deg(x)) <= 4.5 ? 10*sin(deg(x)) : sin(deg(x))+4.5} node[below, pos=.75, anchor=east]{$V_{out}$};
% \addplot[mark=*] coordinates {(1,2)} node[above]{$(1,2)$};

\end{axis}
\end{tikzpicture}

\end{document}
```


Si se orientan el diodo y la pila al contrario en vez de recortar superiormente por $V_{1}$, se recortaría inferiormente por $-V_{1}$ (o por $V_{1}$ si no se cambia la orientación de la pila).

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ] (junction) {}
  (junction) -- ++(1.5,0) node[label=$V_{out}$] {}
  (junction) -- ++(0,-1) to[empty diode, label=D, v<=$V_\gamma$, invert] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$, invert] ++(0,-1) node[ground] {}
  ;
\end{circuitikz}
\end{document}
```

Ahora la para que $D$ conduzca es $V_{1}$ quien tiene que ser mayor que $V_{in}$, por lo que para valores suficientemente bajos de $V_{in}$ no se cumplirá que $V_{out} = V_{in}$. Aquí el detalle importante es que las pilas representan subidas de tensión en vez de caídas, por lo que $V_{out} = - V_{\gamma} - V_{1}$.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ, label=$-V_{1} - V_\gamma$] (junction) {}
  (junction) -- ++(1.5,0) node[label=$V_{out}$] (vout) {}
  (junction) -- ++(0,-1) to[battery1, l=$V_\gamma$, invert] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$, invert] ++(0,-1) node[ground] {}
  (vin)++(0,-2) node[] {\Large Si $V_{in} > V_{1}$}

  (vout)++(3,0) node[ocirc, label=$V_{in}$] (vin2) {}
  (vin2) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ, label=$\sim V_{in}$] (junction2) {}
  (junction2) -- ++(1.5,0) node[label=$V_{out}$] (vout2) {}
  (junction2) to[short, i=$I_{D}{=}0$] ++(0,-1) to[opening switch] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$, invert] ++(0,-1) node[ground] {}
  (vin2)++(0,-2) node[] {\Large Si $V_{1} \leq V_{in}$}
  
  ;
\end{circuitikz}
\end{document}
```

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{FF5C50}
\definecolor{linecolor2}{HTML}{50C5FF}

% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis x line=center,
axis y line=left,

% ETIQUETAS Y TÍTULO %
xmin = 0,
ymin = -10,
ymax = 10,
xlabel = t,
ylabel = V,
ytick={-5},
xtick={0},
yticklabels={$-V_1$},
ymajorgrids=true

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none,samples=100, domain=0:10]{10*sin(deg(x))} node[below, pos=.5, anchor=west]{$V_{in}$};
\addplot+[color=linecolor2,mark=none,samples=100, domain=0:10]{10*sin(deg(x)) >= -4.5 ? 10*sin(deg(x)) : sin(deg(x))-4.5} node[below, pos=.5, anchor=west]{$V_{out}$};

\end{axis}
\end{tikzpicture}

\end{document}
```

Finalmente, se pueden combinar ambos recortadores para crear circuito que recorte superior e inferiormente.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=R] ++(1,0) -- ++(1,0) node[circ] (junction1) {}
  (junction1) -- ++(1.5,0)
  (junction1) -- ++(0,-1) to[empty diode, label=$D_1$, v=$V_\gamma$] ++(0,-1)
  ++(0,0) to[battery1, label=$V_1$] ++(0,-1) node[ground] {}
  (junction1) -- ++(1,0) -- ++(2,0) node[circ] (junction2) {}
  (junction2) -- ++(1.5,0) node[label=$V_{out}$] {}
  (junction2) -- ++(0,-1) to[empty diode, label=$D_2$, v<=$V_\gamma$, invert] ++(0,-1)
  ++(0,0) to[battery1, label=$V_2$, invert] ++(0,-1) node[ground] {}
  ;
\end{circuitikz}
\end{document}
```

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{FF5C50}
\definecolor{linecolor2}{HTML}{50C5FF}

% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis x line=center,
axis y line=left,

% ETIQUETAS Y TÍTULO %
xmin = 0,
ymin = -10,
ymax = 10,
xlabel = t,
ylabel = V,
ytick={-5},
xtick={0},
yticklabels={$-V_1$},
ymajorgrids=true

% clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\addplot+[color=linecolor1,mark=none,samples=100, domain=0:10]{10*sin(deg(x))} node[below, pos=.5, anchor=west]{$V_{in}$};
\addplot+[color=linecolor2,mark=none,samples=100, domain=0:10]{10*sin(deg(x)) >= -4.5 ? { 10*sin(deg(x)) <=  } : sin(deg(x))-4.5} node[below, pos=.5, anchor=west]{$V_{out}$};

\end{axis}
\end{tikzpicture}

\end{document}
```

# Simulación de un recortador

$$
\begin{matrix}
V_{\gamma} \simeq 0.5V &
V_{in} = 5V &
R = 1k\Omega
\end{matrix}
$$
```circuitjs
$ 1 0.000005 10.20027730826997 50 5 50 5e-11
R 400 320 320 320 0 1 40 5 0 0 0.5
r 400 320 544 320 0 1000
d 544 320 544 384 2 default
v 544 480 544 384 0 0 40 2 0 0 0.5
g 544 480 544 560 0 0
w 544 320 736 320 0
d 544 240 544 320 2 default
g 544 144 544 112 0 0
v 544 240 544 144 0 0 40 2 0 0 0.5
x 700 368 762 371 4 24 V_out
x 298 364 346 367 4 24 V_in
o 5 64 0 4098 5 0.0125 0 4 5 3 0 0 0 3
38 8 F1 0 0 5 -1 Lower\sbound
38 3 F1 0 0 5 -1 Upper\sbound

```

