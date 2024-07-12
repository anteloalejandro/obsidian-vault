
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

![[mosfet-nmos.excalidraw]]

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

