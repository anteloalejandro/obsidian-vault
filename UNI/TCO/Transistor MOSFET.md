
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
  node[right, pos=1] {$V_{DS} = V_{GS}-V_T$}
  node[pos=0.7,left, color=gray] {Lineal}
  node[pos=0.75,right, color=gray] {Saturación}
  ;



\addplot[mark=*] coordinates{(0,0)} node[below] {$V_{T}$};

\end{axis}
\end{tikzpicture}

\end{document}
```

La parábola de saturación, indicada en rojo, pasa por todos los puntos por los que la $I_{D}$ para cada $V_{GS}$ empieza a ser constante. El punto de origen de la gráfica es $(V_{T},0)$, y todo lo que hay antes de $V_{T}$ es la zona de corte, donde $I_{D} \simeq 0$.

El área a la izquierda de la parábola es la zona lineal y el área a la derecha es la zona de saturación (no tiene relación con la zona de saturación del BJT). En la zona lineal, $I_D$ aumenta **casi** linealmente al aumentar $V_{GS}$, pero más allá de la parábola aumenta de forma cuadrática.

$$
\begin{gather}
0 < V_{DS} \leq V_{GS} - V_{T} \iff I_{D} = 2K(V_{GS} - V_{T})V_{DS}-K{V_{DS}}^2 \iff \text{Lineal}\\
V_{DS} \leq V_{GS} - V_{T} \land V_{DS} \sim 0 \iff I_{D} \simeq 2K(V_{GS} - V_{T})V_{DS} \iff \text{Lineal} \\
V_{DS} \geq V_{GS} - V_{T} \iff I_{D} = K(V_{GS} - V_{T})^2 \iff \text{Saturación}

\end{gather}
$$

A partir de esto también se puede concluir que la resistencia equivalente que pasa entre la fuente y el drenaje cuando está en la zona lineal (incluido justo en la parábola de saturación) es:
$$
R_{DS(ON)} = R_{ON} \simeq
\begin{cases}
\frac{1}{2K(V_{GS}-V_{T})-KV_{DS}} & \text{ Si } V_{DS} > 0 \\
\frac{1}{2K(V_{GS}-V_{T})} &\text{ Si } V_{DS} \sim 0
\end{cases}
$$
Es decir, cuando la diferencia de voltaje de Drain a Source es baja (que es el caso en los circuitos digitales) y está en la zona lineal, el MOSFET actúa como una resistencia $R_{ON}$ que sólo depende de $V_{GS}$.

También se observa que cuando está en la zona de saturación la corriente también sólo depende de $V_{GS}$, aunque en esta ocasión la dependencia es cuadrática.

Cabe destacar que justo para $V_{DS} = V_{GS} - V_{T}$, es decir, cuando está justamente en la parábola de saturación ambas ecuaciones para sacar la $I_{DS}$ son correctas.

Por la gráfica también se observa que si $V_{GS} \leq V_{T}$ o $V_{DS} \geq V_{T}$ el transistor estará en corte u OFF, por lo que $I_{DS} = 0$.

# Curvas características del PMOS

Los transistores PMOS son esencialmente idénticos a los NMOS, cambiando los semiconductores Tipo-P por los Tipo-N y viceversa. El resultado es, esencialmente, un NMOS invertido. Las curvas características, por tanto, son una inversión de lo que encontraríamos en un NMOS, estando localizadas en el tercer cuadrante del plano cartesiano.

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
xmin = -12, xmax=0,
ymin = -12, ymax=0,
xlabel = $-V_{DS}$,
ylabel = $-I_{DS}$,
x label style = {anchor=east, at={(axis description cs:0,1)}},
y label style = {anchor=north, at={(axis description cs:1,0)}},

clip=false % No permitir que el texto sobrepase la gráfica % %
]

%% PLOTS BEGIN HERE %%
\draw[color=linecolor1] (0,0) .. controls (-3,-10) .. (-10,-10)
  node[left] {$V_{GS_3}$};
\draw[color=linecolor1] (0,0) .. controls (-2,-5) .. (-10,-5)
  node[left] {$V_{GS_2}$};
\draw[color=linecolor1] (0,0) .. controls (-1,-2) .. (-10,-2)
  node[left] {$V_{GS_1}$};

\draw[color=linecolor2] (0,0) .. controls (-2,-1) and (-5,-7) .. (-5.5,-12)
  node[right, pos=1] {$V_{CE} = V_{GS}+V_T$}
  node[pos=0.7,right, color=gray] {Lineal}
  node[pos=0.75,left, color=gray] {Saturación}
  ;



\addplot[mark=*] coordinates{(0,0)} node[anchor={south west}] {$-V_{T}$};

\end{axis}
\end{tikzpicture}

\end{document}
```

$$
\begin{gather}
I_{SD} = -I_{DS}\\ \\
V_{D} < V_{GS} + V_{T}  \iff -I_{DS} = K(V_{GS} - V_{T})^2 \iff \text{Saturación} \\
V_{D} \geq V_{GS} + V_{T} \iff I_{SD} = 2K(V_{GS}+ V_{T})V_{DS} - K{V_{DS}}^2 \iff Lineal \\
V_{D} \geq V_{GS} + V_{T} \land V_{DS} \simeq 0 \iff I_{SD} = 2K(V_{GS}+ V_{T})V_{DS}
\end{gather}
$$
Por lo que también concluimos que $R_{ON} \simeq \left|\frac{1}{2K(V_{GS} + V_{T})}\right|$, donde usamos el valor absoluto para ignorar la dirección en la que viaja la corriente.

# Pseudo-NMOS

El problema de las puertas lógicas hechas con sólo NMOS es que requieren de una resistencia $R_D$ que ocupa mucho más espacio que el transistor, por lo que el tamaño mínimo del circuito se ve muy limitado.

Para solucionar este problema, se puede usar un PMOS con la puerta conectada a tierra, por lo que siempre estará en la zona activa y actuará como una pequeña resistencia $R_{ON}$.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{IN}$] {} -- ++(1,0)
    node[nmos, anchor=G] (nmos) {}
  (nmos.S) node[ground] {}
  (nmos.D) -- ++(0,0.5) node[circ] (junct) {} -- ++(0,0.5)
    node[pmos, anchor=D] (pmos) {}
  (junct) -- ++(1,0) node[anchor=west] {$V_{OUT}$}
  (pmos.G) -- ++(-0.5,0) node[ground] {}
  (pmos.S) node[ocirc, label=$V_{DD}$] {}
  ;
\end{circuitikz}
\end{document}
```

En el PMOS, si $V_{G} = 0$,  $V_{GS}$ será negativa, y mientras sea suficientemente negativa como para que $V_{GS} < -V_{T}$ siempre estará conduciendo y se puede modelar como $R_{ON}$. Para que este inversor funcione, por norma general, $K_{PMOS} < K_{NMOS}$ .

# Protección de los MOSFET

Los MOSFET son muy sensibles a las sobretensiones ($V_{G} \uparrow$), sobrecorrientes ($I_{DS} \uparrow$), potenciales electroestáticos altos e incluso a la radiación.

Esto se debe principalmente a la capa aislante de la puerta, que al ser tan fina se degrada y rompe con facilidad, haciendo que deje de funcionar correctamente.

Para proteger de sobretensiones se usan [[Recortadores de tensión con diodos]] y se ajusta la resistencia para evitar sobrecorrientes.

# Inversor CMOS

El inversor CMOS (*Complementary MOSFET*) es muy similar al inversor Pseudo-NMOS, pero el $V_{G}$ del PMOS va a $V_{IN}$ en vez de a tierra y que la fuente y el drenaje están orientados al revés, indicado por la dirección de la flecha en el sustrato.

```tikz
\usepackage{circuitikz}
\begin{document}
\begin{circuitikz}

\draw 
  (0,0) node[ocirc, label=$V_{IN}$] {} -- ++(1,0) node[circ] (in_junct) {}
  ++(0,0) -- ++(0,-1.25) -- ++(0.5, 0)
    node[nfet, anchor=G] (nmos) {$T_N$}
  (nmos.S) node[ground] {}
  (nmos.D) -- ++(0,0.5) node[circ] (junct) {} -- ++(0,0.5)
    node[pfet, anchor=D] (pmos) {$T_P$}
  (junct) -- ++(1,0) node[anchor=west] {$V_{OUT}$}
  (pmos.G) -- ++(-0.5,0) -- (in_junct)
  (pmos.S) node[ocirc, label=$V_{DD}$] {}

  (pmos.B) -- (pmos.S) node[anchor={north west}] {S}
  (nmos.B) -- (nmos.S) node[anchor={south west}] {S}
  ;
\end{circuitikz}
\end{document}
```

Si $V_{IN} = V_{DD}$ el transistor PMOS estará aislando, pero el NMOS conducirá por estar conectado a tierra, y por eso mismo $V_{OUT} = 0$.

Por otro lado, si $V_{IN} = 0V$ es el NMOS el que hace de aislante, mientras el PMOS conduce y da como resultado $V_{OUT} = V_{DD}$.

Como en este inversor siempre hay un transistor haciendo de aislante, la corriente que pasa por el circuito en cualquier punto es prácticamente 0, por lo que el consumo energético es muy bajo, permitiendo así poner muchos de ellos muy juntos sin generar demasiado calor. Dicho esto, $I_{DS} > 0$ en la transición entre el 1 y 0 lógicos, y viceversa.