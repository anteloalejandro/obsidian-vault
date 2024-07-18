
El MOSFET (Metal-Oxide-Semiconductor Field-Effect) es un transistor usado en circuitos digitales y lógicos. El [[Transistor Bipolar]] también se puede usar para este propósito, pero la utilidad principal de éste es la ampliación de señales.

Hay MOSFET de dos tipos principales: NMOS y PMOS, pero en circuitos digitales generalmente se usa NMOS y una combinación de los dos, pero rara vez PMOS por su cuenta.

*PMOS*
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

*NMOS*
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

# Funcionamiento

![[mosfet-nmos.excalidraw|100%]]

El transistor MOSFET funciona abriendo un canal por el que pueden pasar los electrones entre Source y Drain cuando hay suficiente diferencia de tensión entre Gate y Source.

En un MOSFET NMOS Source y Drain son [[Semiconductores]] Tipo-N muy [[Dopaje de semiconductores|dopados]], y los pines están hechos de metal o de otros semiconductores.

Gate está hecho de una fina capa de un óxido aislante, por lo que no puede corriente por él pero sí puede haber tensión.

Todo descansa sobre un Sustrato (o *Bulk*) del tipo contrario a Source y Drain. Este sustrato debería ir conectado a tierra.

# MOSFET vs BJT

Los terminales Source, Gate y Drain del MOSFET son equivalentes a los terminales Emisor, Base y Colector del BJT, respectivamente.

El MOSFET tiene una mayor densidad de integración, es decir, se pueden meter más transistores MOSFET en el mismo espacio. Además, al no tener requisitos de corriente, tiene un consumo energético mucho más bajo que el BJT y se calienta menos.

El MOSFET es más versátil que el BJT, pudiendo actuar interruptor, resistencia variable, condensador, etc.

Otra característica importante del MOSFET es su alta impedancia de entrada, que permite conectar más transistores a una única salida.

Sin embargo, el MOSFET también trae consigo una serie de desventajas comparado con el BJT: El MOSFET es más lento y la función de carga no es lineal.

# Zonas de funcionamiento

$I_G$ siempre es 0 porque Gate tiene una capa aislante pero, como el MOSFET se excita por tensión, siendo $V_T$ la tensión lindar (tensión mínima para conducir) y $V_{GS}$ la diferencia de tensión entre la puerta y la fuente, $V_{GS} > V_{T} \iff \text{Conduce}$ y $V_{GS} < V_{T} \iff \text{No conduce} \iff I_{D} = 0$.

# Curvas características del NMOS

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
xlabel = $V_{DS}$,
ylabel = $I_{DS}$,

clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\draw[color=linecolor1] (0,0) .. controls (3,10) .. (10,10)
  node[right] {$V_{GS_3}$};
\draw[color=linecolor1] (0,0) .. controls (2,5) .. (10,5)
  node[right] {$V_{GS_2}$};
\draw[color=linecolor1] (0,0) .. controls (1,2) .. (10,2)
  node[right] {$V_{GS_1}$};

\draw[color=linecolor2] (0,0) .. controls (2,1) and (5,7) .. (5.5,12)
  node[right, pos=1] {$V_{CE} = V_{GS}-V_T$}
  node[pos=0.7,left, color=gray] {Lineal}
  node[pos=0.75,right, color=gray] {Saturación}
  ;



\addplot[mark=*] coordinates{(0,0)} node[below] {$V_{T}$};

\end{axis}
\end{tikzpicture}

\end{document}
```

La parábola de saturación, indicada en rojo, pasa por todos los puntos por los que la $I_{D}$ para cada $V_{GS}$ empieza a ser constante. El punto de origen de la gráfica es $(V_{T},0)$, y todo lo que hay antes de $V_{T}$ es la zona de corte, donde $I_{D} \simeq 0$.

El área a la izquierda de la parábola es la zona lineal y el área a la derecha es la zona de saturación (no tiene relación con la zona de saturación del BJT). En la zona lineal, $I_D$ aumenta linealmente al aumentar $V_{GS}$, pero más allá de la parábola aumenta de forma cuadrática.

$$
\begin{gather}
V_{DS} \leq V_{GS} - V_{T} \iff I_{D} = 2K(V_{GS} - V_{T})V_{DS}-KV_{DS}^2 \iff \text{Lineal}\\
V_{DS} \leq V_{GS} - V_{T} \land V_{DS} \simeq 0 \iff I_{D} \simeq 2K(V_{GS} - V_{T})V_{DS} \iff \text{Lineal} \\
V_{DS} > V_{GS} - V_{T} \iff I_{D} = k(V_{GS} - V_{T})^2 \iff \text{Saturación}

\end{gather}
$$

A partir de esto también se puede concluir que la resistencia equivalente que pasa entre la fuente y el drenaje  cuando está en la zona lineal (incluido justo en la parábola de saturación) es:
$$
R_{DS(ON)} = R_{ON} \simeq \frac{1}{2K(V_{GS}-V_{T})}
$$