---
todo: true
---
Los [[Diodos]], resistencias y demás pueden crear diferencias de tensión, pero no añadir más tensión al circuito. A diferencia de estos, los transistores son activos, es decir, se tienen que alimentar, por lo que si que pueden añadir tensión al circuito, por lo que se suelen usar para amplificar señales ya existentes.

Otra diferencia con los diodos es que en vez de ser una [[Unión P-N]], están formados por una unión N-P-N o (P-N-P), cuyos terminales corresponden a los pines Emisor, Base y Colector, o E-B-C, respectivamente.

En un BJT N-P-N, la base es el de tipo P y es la parte más fina y menos cargada de todas, el colector es algo más grande pero es el que más carga tiene y el emisor es el lado más grande, pero está menos cargado que el colector.

![[diagrama unión n-p-n.excalidraw|100%]]

Por estar formado de un tipo de [[Dopaje de semiconductores|semiconductor dopado]] entre otros dos del otro tipo, se puede modelar un transistor BJT como un par de diodos en dirección opuesta:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[npn] (Q1) {}
  (4,0) node[] (Q2) {}

  (Q1.B) node[anchor=east] {\small B}
  (Q1.C) node[anchor=west] {\small C}
  (Q1.E) node[anchor=west] {\small E}
  ;
\draw
  (Q2) node[anchor=east] {C} to[diode, invert] ++(1, 0) -- ++(1,0)
  ++(0,0) node[circ] (junction) {}
  ++(0,0) -- ++(1,0) to[diode] ++(1,0) node[anchor=west] {E}
  (junction) -- ++(0,-1) node[anchor=north] {B}
  ;

\draw[->, double] (Q1.center)++(1,0) -- ++(2,0);

\end{circuitikz}
\end{document}
```


# Polarización del BJT

## Circuito básico

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ground] (gnd) {} to[battery1, l=$V_{BB}$, invert] ++(1,0)
  ++(0,0) -- ++(1,0) to[R=$R_B$] ++(1,0) -- ++(1,0) node[npn, anchor=B] (Q) {}
  (Q.B) node[anchor=south] {B}
  (Q.C) node[anchor=west] {C}
  (Q.E) node[anchor=west] {E}

  (Q.C) -- ++(0,1) to[R=$R_C$] ++(0,1) -- ++(0,1) -- ++(1,0)
  ++(0,0) to[battery1, l=$V_{CC}$] ++(1,0) node[ground] {}

  (Q.E) node[ground]{}
  ;

\end{circuitikz}
\end{document}
```


## Curva característica de salida y recta de carga

El transistor bipolar, a diferencia del diodo, tiene múltiples curvas características en función del valor de la corriente que recorre la base, $I_{B}$.

Dado que en el circuito básico anterior $V_{CC} = R_{C}I_{C} + V_{CE}$. Se puede aislar la $I_{C}$ con la siguiente ecuación:
$$
I_{C} = f(V_{CE}) = \frac{V_{CC}-V_{CE}}{R_{C}}
$$

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{f9bc60}
\definecolor{linecolor2}{HTML}{e16162}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis lines=middle,
xtick={0},
ytick={0},

% ETIQUETAS Y TÍTULO %
xmin = 0, xmax=12,
ymin = 0, ymax=12,
xlabel = $V_{CE}$,
ylabel = $I_C$,
x label style={anchor=west},
y label style={anchor=south},

clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\draw[color=linecolor1]
  (0,0) .. controls (0.25,0) and (1,0) .. (1,2)
  (1,2) -- (1,8)

  (1,8) .. controls (1, 9.5) and (2, 10) .. (10,10)
  (1,6) .. controls (1, 7.5) and (2, 8) .. (10,8)
  (1,4) .. controls (1, 5.5) and (2, 6) .. (10,6)
  (1,2) .. controls (1, 3.5) and (2, 4) .. (10,4)

  (10, 10) node[anchor={south east}] {$I_{B_4}$}
  (10, 8) node[anchor={south east}] {$I_{B_3}$}
  (10, 6) node[anchor={south east}] {$I_{B_2}$}
  (10, 4) node[anchor={south east}] {$I_{B_1}$}  
  ;

\addplot[color=linecolor2, domain=0:10] {-0.75*x + 7.5};

\addplot[mark=*] coordinates {(1,0)} node[below]{$V_{CE(SAT)}$};
  

\draw[color=gray, dashed]
  (1,0) -- (1,12)
  (1,6) node[anchor={south}, rotate=90] {Zona de Saturación}
  (10,0) -- (10,12)
  (10,6) node[anchor={north}, rotate=90] {Zona de corte}
  (5.5, 12) node[] {Zona activa}
  ;

\end{axis}
\end{tikzpicture}

\end{document}
```
^c-caracteristica-salida

[[Diodos#Curva característica y recta de carga]]

## Curva característica de entrada

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
\definecolor{linecolor1}{HTML}{f9bc60}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}


\begin{document}
\begin{tikzpicture}
\begin{axis}[
% CENTRADO DE LA GRÁFICA %
axis lines=middle,
xtick={0},
ytick={0},

% ETIQUETAS Y TÍTULO %
xmin = 0, xmax=12,
ymin = 0, ymax=12,
xlabel = $V_{BE}$,
ylabel = $I_B$,

clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\draw[color=linecolor1] (0,0) .. controls (7,0.5) and (9,1) .. (10, 10);
\draw[color=gray, dashed] (7,0) -- (7,12);
\draw[color=gray, ->] (7,6) -- ++(-2,0);
\draw[color=gray] (7,6)++(-1,0) node[anchor=south] {$I_B \simeq 0$};
\addplot[mark=*] coordinates{(7,0)} node[below] {$V_{BE(ON)}$};

\end{axis}
\end{tikzpicture}

\end{document}
```

## Ganancia de corriente

La ganancia de corriente o coeficiente de ampliación es una constante generalmente indicada por el fabricante del transistor BJT que indica la relación entre $I_{C}$, también llamada **corriente de excitación**, e $I_{B}$ cuando $V_{CE}$ está en la zona activa.

$$
\beta = \frac{I_{C}}{I_{B}} \iff I_{C} = \beta·I_{B} \iff I_{B} = \frac{I_{C}}{\beta}
$$

A partir de $\beta$ se observa que $I_{C}$ e $I_{B}$ son directamente proporcionales. Como se busca amplificar, es decir, que $I_{C} > I_{B}$, $\beta$ tendrá un valor superior a 1.

También se puede observar que en caso de que una de las corrientes sea igual a 0, ambas lo serán (y si ambas lo son, también lo es $I_{E}$, que es la suma de las otras dos). 

Dado que $I_{C} = \frac{V_{CC} - V_{CE}}{R_{C}}$, $I_C = 0 \iff V_{CC} = V_{CE}$, por lo que si $V_{CC}$ y $V_{CE}$ son iguales, la corriente en todos los puntos del transistor es 0.

# Amplificación de la corriente

Al circuito básico anterior se le ha añadido un generador de tensión sinusoidal $\Delta V_{BB}$ al que representará variaciones en $V_{BB}$:

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ground] (gnd) {} to[battery1, l=$V_{BB}$, invert] ++(0,1)
  ++(0,0) to[sinusoidal voltage source, l=$\Delta V_{BB}$] ++(0,1)
  ++(0,0) -- ++(0,1) node[circ, label=$V_{BB} - \Delta V_{BB}$] {}
  ++(0,0) -- ++(2,0) to[R=$R_B$] ++(1,0) -- ++(1,0) node[npn, anchor=B] (Q) {}
  (Q.B) node[anchor=south] {B}
  (Q.C) node[anchor=west] {C}
  (Q.E) node[anchor=west] {E}

  (Q.C) -- ++(0,1) to[R=$R_C$] ++(0,1) -- ++(0,1) -- ++(1,0)
  ++(0,0) to[battery1, l=$V_{CC}$] ++(1,0) node[ground] {}

  (Q.E) node[ground]{}
  ;

\end{circuitikz}
\end{document}
```

Estas variaciones hacen que la corriente que llega a $R_B$ desde el generador $V_{BB}$ crezca o decrezca, lo que también hace que la $V_{B}$ crezca y decrezca a su vez.

Al ser $I_B$ directamente proporcional a $V_{B}$, también se crea una diferencia de corriente $\Delta I_{B}$. Del mismo modo, al ser $I_{C}$ directamente proporcional a $I_{B}$ cuando $V_{CE}$ está en la zona activa, también resulta en una diferencia de corriente $\Delta I_{C}$. Además, siendo este el caso, se cumple que $I_{C} = \beta · I_{B}$, por lo que también se debe cumplir que $\Delta I_{C} = \beta · \Delta I_{B}$, es decir, la diferencia de la corriente de base también se ve multiplicada por la ganancia de corriente, haciendo esta diferencia más exagerada.

Finalmente, ya que $V_{CE} = V_{CC} - I_{C}·R_{C}$ y que $V_{CC}$ y $R_{C}$ son constantes, podemos calcular la variación de la tensión $V_{CE}$ así:

$$
\Delta V_{CE} = - \Delta I_{R}·R_{C} = -\beta\Delta I_{B} · R_{C}
$$

Por el signo negativo, $\Delta V_{CE}$ no solo se va a ver multiplicado también $\beta$, sino que va a estar en contrafase a $V_{CE}$.

# Zonas de funcionamiento

![[#^c-caracteristica-salida]]

La zona de saturación es la zona en la que $I_{B} \simeq 0$ para $V_{CE}$ bajos. Aquí es donde el $I_{C}$ del circuito actual, indicado por la recta de carga, alcanza su valor máximo.

La zona activa es aquella en la que $I_C$ es básicamente una constante que depende únicamente de $I_{B}$, y es directamente proporcional a esta. Esto también implica que mientras $V_{CE}$ esté en esta zona, da igual su valor exacto.

La zona de corte está más allá de la zona activa y es dónde la $I_C$ del circuito es 0 independientemente de la tensión.

## Modelos de las zonas

Los transistores BJT se pueden modelar de diferentes formas según la zona de funcionamiento en la que se encuentre $V_{CE}$.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) to[short, i=$I_B$] ++(1,0) node[npn, anchor=B] (Q) {}
  (Q.B) node[anchor=south] {\small B}
  (Q.C) node[anchor=west] {\small C}
  (Q.E) node[anchor=west] {\small E}

  (Q.C) to[short, i<=$I_C$] ++(0,1)
  (Q.E) to[short, i=$I_C$] ++(0,-1)
  ;
\end{circuitikz}
\end{document}
```

### Zona activa

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=2]
  (0,0) node[anchor=east] (B) {B} to[short, i=$I_B$] ++(1,0)
  ++(0,0) to[diode, v_=$V_\gamma {=} V_{BE(ON)}$] ++(0,-1)
  ++(0,0) -- ++(1,0) node[circ] (junct) {}
  
  (junct) -- ++(0,-1) node[anchor=north] (E) {E}
  
  (junct) -- ++(1,0) -- ++(0,1) to[short, i<=$I_C {=} \beta I_B$] ++(1,0)
  node[anchor=west] (C) {C}
  ;
\end{circuitikz}
\end{document}
```

Nótese que estando en zona activa la corriente en la base siempre será superior a 0, por lo que el diodo siempre conduce y produce una caída de tensión igual a $V_{BE(ON)}$.

### Zona de saturación

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=2]
  (0,0) node[anchor=east] (B) {B} to[short, i=$I_B$] ++(1,0)
  ++(0,0) to[battery1, l_=$V_{BE(SAT)}$] ++(0,-1)
  ++(0,0) -- ++(1,0) node[circ] (junct) {}
  
  (junct) -- ++(0,-1) node[anchor=north] (E) {E}
  
  (junct) -- ++(1,0) to[battery1, invert, l_=$V_{CE(SAT)}$] ++(0,1)
  ++(0,0) to[short, i<=$I_C < \beta I_B$] ++(1,0) node[anchor=west] (C) {C}
  ;
\end{circuitikz}
\end{document}
```

### Zona de corte

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw[scale=2]
  (0,0) node[anchor=east] (B) {B} to[short, i=$I_B {=} 0$] ++(1,0)
    node[circ] {}

  (4,0) node[anchor=west] (C) {B} to[short, i_=$I_C {=} 0$] ++(-1,0)
    node[circ] {}
  
  (2,-2) node[anchor=north] (E) {E} -- ++(0,1) node[circ] {}

  ;
\end{circuitikz}
\end{document}
```

# Conmutación

Los transistores BJT permiten cambiar rápidamente entre valores en la zona de saturación, que consideraremos 0 lógico y la zona de corte, que consideraremos 1 lógico. Además, a diferencia de los diodos, los transistores si que pueden formar puertas lógicas NOT. En resumen, son ideales para la conmutación.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{in}$] (vin) {}
  (vin) -- ++(1,0) to[R=$R_B$] ++(1,0) -- ++(1,0)
    node[npn, anchor=B] (Q) {}

  (Q.E) node[ground] {}
  (Q.C) node[circ] {} -- ++(1,0) node[anchor=west] {$V_{out} {=} V_{CE}$}
  (Q.C) -- ++(0,1) to[R=$R_C$] ++(0,1) -- ++(0,1)
    node[ocirc, label=$V_{CC}$] {}
  ;
\end{circuitikz}
\end{document}
```

$$
\begin{gather}
V_{in} = 0 \implies I_{B} = 0 \implies I_{C} = 0 \implies V_{out} = V_{CC}\\
V_{in} = V_{CC} \implies V_{CE} = V_{CC} - I_{C}R_{C} \simeq 0 \implies V_{out} \simeq 0
\end{gather}
$$
# Funcionamiento

En un transistor bipolar N-P-N, la base es tan estrecha que sólo una pequeña parte de los electrones puede llenar huecos, el resto viajan por el colector, que es el que menor carga negativa tiene, lo que acaba produciendo una corriente convencional positiva desde el emisor.

La amplificación sucede al pasar una corriente por el colector, que lo hace más positivo y, por tanto, aumenta la diferencia con el emisor, aumentando la corriente que sale de éste.

Un poco de la corriente a amplificar ($I_{B}$) acaba recombinándose con los electrones que pasan de $E$ a $C$, pero al ser $B$ tan fino esa cantidad es cercana a 0.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[circ] (B) {}
  (B) node[anchor=north] {B}
  (B) to[short, i=$I_B$] ++(0,1) -- ++(0,1) node[circ] (junct-b) {}
  (junct-b) -- ++(1,0) -- ++(0,1) to[short, i=$I_{B_1} \simeq 0$] ++(0,0) node[] (I_B1) {}
  (junct-b) -- ++(-1,0) to[short, i=$I_{B_2}$] ++(0,4)
  ++(0,0) node[circ] (junct-ce) {} to[short, i=$I_C + I_{B_2}$] ++(-2,0) 
  

  (B) to[battery1, invert, l_=$V_{BC}$] ++(4,0)
  ++(0,0) -- ++(0,6) to[short, i=$I_C$] ++(-1,0) -- ++(-0.5,0) node[circ, label=C] (C) {}
  
  (C) to[short, i=$I_C$] (junct-ce)
  ++(0,0) -- ++(-2,0) node[circ, label=E] (E) {}
  ++(0,0) to[short, i=$I_E$] ++(-1,0) -- ++(0, -6)
  ++(0,0) to[battery1, l_=$V_{BE}$, invert] (B)
  ;

\draw[->]
  (C)++(-0.5,-0.5) node[] (C-offset) {}
  (junct-ce)++(0.5,-0.5) node[] (junct-ce-offset) {}
  (I_B1)++(0,0.5) node[] (I_B1-offset) {}
  (junct-ce-offset) -- (C-offset) node[anchor=west] {$e^{-}$}
  ;
\draw[->]
  (junct-ce-offset)++(1.5, 0) -- (I_B1-offset)
  node[anchor=west] {Recombinación}
  ;
\end{circuitikz}
\end{document}
```
# Usos

- [[Puertas lógicas con transistores]]
- Amplificación de señales