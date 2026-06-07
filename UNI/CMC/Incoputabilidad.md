
# Máquinas de Turing Normalizadas

Diremos que una máquina de Turing $M = (\Sigma, \Gamma, Q, f, B, q_{1}, F)$ está normalizada siempre que:
- El alfabeto de entrada sea $\Sigma = \{ 0,1 \}$
- El alfabeto de cinta sea $\Gamma = \{ 0,1,B \}$
- Tenemos una lista de estados $Q = \{ q_{1},\dots,q_{p} \}$ y un estado final $F = \{ q_{2} \}$.

Por tanto, de esta clase de máquinas de Turing sólo necesitamos definir su función de transición $f$.

> [!NOTE] Compatibilidad de las Máquinas de Turing con alfabeto binario
> Para cualquier lenguaje recursivamente enumerable sobre el alfabeto binario, existe una máquina de Turing con $\Sigma = \{ x_{1},\dots,x_{m} \}$, a partir de la cual se puede construir otra máquina que trabaje con códigos binarios de longitud $p = \lceil \log_{2}m \rceil$ asociados a cada símbolo $x_{i}$. 
> 
> Así, la segunda máquina puede codificar la entrada $w$ de la primera máquina en una secuencia de $\lvert w \rvert · p$ y simular sus movimientos leyendo y escribiendo $p$ símbolos de acuerdo a la codificación binaria de los símbolos originales.

## Códigos de las máquinas normalizadas

1. Se enumera $\Gamma = \{ 0,1,B \}$ como $\Gamma = \{ a_{1},a_{2},a_{3} \}$
2. Una transición $t_{l} = f(q_{i},a_{j}) = (q_{k}, a_{m}, m_{t})$ se representa mediante la tupla $(q_{i},a_{j},q_{k},a_{m},m_{t})$. Nótese que $m_{t} \in \{ R,L \}, m_{1}=R,m_{2}=L$.
3. Esta nueva representación puede codificarse como $0^{i}\ 1\ 0^{j}\ 1\ 0^{k}\ 1\ 0^{m}\ 1\ 0^{t}$, es decir, mediante el número de $0$ correspondiente y usando el $1$ como separador. Nótese que por la talla de $\Gamma$ se da que $i,j \in \{ 1,2,3 \}$ y por la talla de $m_{t}$ se da que $t \in \{ 1,2 \}$.
4. Para una máquina con $r$ transiciones, podemos representarla mediante la siguiente cadena binaria, que será un **código válido** de la máquina: $x = t_{1}\ 1\ 1\ t_{2}\ 1\ 1\ \dots\ 1\ 1\ t_{r}\ 1\ 1\ 1$. 


> [!NOTE] Códigos válidos
> Existen varios códigos válidos de una máquina normalizada, uno por cada orden posible de las transiciones, pero para representar la máquina ordenaremos las $t_{i}$ en base a su $i$, dando siempre lugar a la secuencia $x = t_{1}\ 1\ 1\ t_{2}\ 1\ 1\ \dots\ 1\ 1\ t_{r}\ 1\ 1\ 1$. Es decir, hay exactamente $r!$ códigos válidos para una máquina con $r$ transiciones.
> 
> Cualquier cadena $x \in \{ 0, 1 \}^{*}$ se considera un código de una máquina de Turing, que puede ser válido o no para una máquina dada. El lenguaje de los códigos válidos se llamará $\mathrm{COD}$ y es el subconjunto de todos estos valores que sí se consideran códigos válidos. Los códigos válidos son los que siguen la secuencia discutida en el párrafo anterior.
> 
> $$
> \mathrm{COD} = \{ x \in \{ 0,1 \}^{*} : x \text{ es un código válido} \}
> $$

El lenguaje de los códigos válidos $\mathrm{COD}$ **es un lenguaje recursivo**, es decir, podemos construir un autómata finito que acepte $\mathrm{COD}$.

La formación del autómata finito se hace por partes; crearemos un autómata finito para para cada parte de la secuencia, y todas se juntarán en un sólo autómata que representará las transiciones.

### Autómata $q_{i}$

El autómata $q_{i}$ representa la sección $0^{i}\ 1$ de la secuencia $t_{l} = 0^{i}\ 1\ 0^{j}\ 1\ 0^{k}\ 1\ 0^{m}\ 1\ 0^{t}$ que a su vez representa una transición $t_{l} = f(q_{i},a_{j})$. Viene definido por dos características:
- La secuencia está formada de un número arbitrario de 0 seguidos y termina en 1.
- $i \neq 2$ porque $q_{2}$ es el estado final del autómata completo, así que $0^{2}\ 1$ no sería válido porque no hay transiciones de $q_{i}$ a ningún estado, independientemente del valor del símbolo $a_{j}$.

```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [state, ] {};
\node (q1) [state, right = of q0] {};
\node (q2) [state, right = of q1] {};
\node (q3) [state, right = of q2] {};
\node (q4) [state, right = of q3] {};

\path [-stealth]
  (q0) edge node {0} (q1)
  (q1) edge node {0} (q2)
  (q2) edge node {0} (q3)
  (q3) edge [loop below] node {0} (q3)
  (q3) edge node {1} (q4)
  (q1) edge [bend left] node {1} (q4)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```

### Autómatas de $a_{j}, a_{m}$

Ahora tenemos dos autómatas, uno para el estado de entrada $a_{j} \to 0^{j}\ 1,\  j \in \{ 1,2,3 \}$ y otro para el estado de salida $a_{m} \to 0^{m}\ 1,\  m \in \{ 1,2,3 \}$, pero ambos son idénticos. Tienen las siguientes características:
- Están formados por una secuencia de entre 1 y 3 $0$, seguidos de un $1$. No hay $0$ "infinitos".
- Ahora no está en términos de $i$, así que $0^{2}\ 1$ es válido.

```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [state, ] {};
\node (q1) [state, right = of q0] {};
\node (q2) [state, right = of q1] {};
\node (q3) [state, right = of q2] {};
\node (q4) [state, right = of q3] {};

\path [-stealth]
  (q0) edge node {0} (q1)
  (q1) edge node {0} (q2)
  (q2) edge node {0} (q3)
  (q3) edge node {1} (q4)
  (q1) edge [bend right] node {1} (q4)
  (q2) edge [bend left] node {1} (q4)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```

### Autómata de $q_{k}$

Para el estado de salida $q_{k}$ de la transición, sí que es válido el estado final, así que sólo hay que comprobar que hay por lo menos un $0$ antes del $1$.

```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [state, ] {};
\node (q1) [state, right = of q0] {};
\node (q2) [state, right = of q1] {};

\path [-stealth]
  (q0) edge node {0} (q1)
  (q1) edge node {1} (q2)
  (q1) edge [loop below] node {0} (q1)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```

### Autómata de $m_{t}$

El caso de $m_{t}$ es especial, ya que no va seguido de un $1$. Además, $m_{t}$ puede ser $R$ o $L$ según si es $m_{1}$ o $m_{2}$, por lo que $t \in \{ 1,2 \}$. Esto quiere decir que sólo tenemos que comprobar que haya uno o dos $0$ (el número de $0$ corresponde a un desplazamiento u otro).

```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [state, ] {};
\node (q1) [state, right = of q0] {};
\node (q2) [state, right = of q1] {};

\path [-stealth]
  (q0) edge node {0} (q1)
  (q1) edge node {0} (q2)
  (q0) edge [bend left] node {0} (q2)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```

### Autómata de $t_{l}$

Nótese que para ninguno de los autómatas se ha puesto el último nodo como estado final. Esto es porque están pensados exclusivamente como piezas de un autómata finito más grande, pero antes que nada se juntan con transiciones vacías para representar una función de transición $t_{l}$ completa.

```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [state, ] {$q_i$};
\node (q1) [state, right = of q0] {$a_j$};
\node (q2) [state, right = of q1] {$q_k$};
\node (q3) [state, right = of q2] {$a_m$};
\node (q4) [state, right = of q3] {$m_t$};

\path [-stealth]
  (q0) edge node {$\lambda$} (q1)
  (q1) edge node {$\lambda$} (q2)
  (q2) edge node {$\lambda$} (q3)
  (q3) edge node {$\lambda$} (q4)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```

### Autómata del $\mathrm{COD}$

El autómata final consiste en formar la cadena $x = t_{1}\ 1\ 1\ t_{2}\ 1\ 1\ \dots\ 1\ 1\ t_{r}\ 1\ 1\ 1$ concatenando autómatas $t_{i}$ con $1\ 1$ y finalizando cuando se inserta un $1\ 1\ 1$.

```tikz
\usepackage{tikz-cd}
\usetikzlibrary{automata, arrows.meta, positioning}

\begin{document}

\begin{tikzpicture} [
  node distance = 2cm,
  double distance = 3pt,
  initial distance = 1cm,
  initial text = {},
  on grid,
  thick,
  auto % labels without the hassle
]
\begin{scope}[scale=1.2, transform shape]

%% START %%

\node (q0) [state, ] {$t_i$};
\node (q1) [state, right = of q0] {};
\node (q2) [state, right = of q1] {};
\node (q3) [state, accepting, right = of q2] {};

\path [-stealth]
  (q0) edge node {1} (q1)
  (q1) edge [bend left] node {1} (q0)
  (q1) edge node {1} (q2)
  (q2) edge node {1} (q3)
  ;

%% END %%

\end{scope}
\end{tikzpicture}

\end{document}
```

### Máquina asociada a una palabra

A cada palabra $x \in \{ 0,1 \}^{*}$ se le puede asociar una máquina de Turing $M_{x}$ y un lenguaje $L_{x} \subseteq \{ 0,1 \}^{*}$ de la siguiente forma:

- Si $x$ es un código válido de la máquina normalizada $M$: $M_{x} = M, L_{x} = L(M)$
- Si no lo es: $M_{x} = M_{\text{null}}, L_{x} = L(M_{\text{null}}) = \emptyset$

$M_{\text{null}}$ es una máquina de Turing normalizada sin estado final, es decir, $F = \emptyset$. Por tanto, es una máquina de Turing cuya ejecución nunca acaba.

# El Lenguaje Diagonal

Se trata de un lenguaje que se define como el lenguaje binario formado por palabras que no pertenecen al lenguaje aceptado por la máquina de Turing $M_{x}$ asociada a cada palabra.
$$
\text{DIA} = \{ x \in \{ 0,1 \}^{*} : x \not\in L_{x} \}
$$

Este lenguaje es un ejemplo de lenguaje **no recursivamente enumerable**.

## Demostración

Para demostrar que el lenguaje diagonal no es recursivamente enumerable, podemos comprobar si la asunción de que sí lo es es coherente.

- Si el lenguaje es recursivamente enumerable, hay una máquina $M_{\text{DIA}}$ que acepta éste lenguaje.
- Podemos enumerar todos los códigos posibles para máquinas de Turing, sean válidos o no para $M_{\text{DIA}}$, enumerando palabras $x_{i} \in \{ 0,1 \}^{*}$ en orden canónico.

A partir de la enumeración, saldrán todos los lenguajes recursivamente enumerables.
$$
\begin{matrix}
x_{0} & x_{1} & \dots & x_{n} & \dots & \text{Cadenas en órden canónico}\\
\downarrow & \downarrow & & \downarrow & \\
M_{x_{0}} & M_{x_{1}} & \dots & M_{x_{n}} & \dots & \text{Máquinas normalizadas asociadas}  \\
\downarrow & \downarrow & & \downarrow & \\
L(M_{x_{0}}) & L(M_{x_{1}}) & \dots & L(M_{x_{n}}) & \dots & \text{Leng. recursivamente enumerables} \\
\downarrow & \downarrow & & \downarrow & \\
L_{x_{0}} & L_{x_{1}} & \dots & L_{x_{n}} & \dots & \text{Leng. recursivamente enumerables} \\
\end{matrix}
$$

Si construimos una matriz de forma que para la posición $(i,j) = 1 \iff x_{i} \in L_{x_{j}}$ y $(i,j) = 0 \iff x_{i} \not\in L_{x_{j}}$, obtenemos algo así:

![[Incoputabilidad - lenguaje diagonal.png]]

De forma que el lenguaje DIA puede pasar a representarse como el lenguaje formado por las posiciones de la diagonal cuyos valores son 0.
$$
\begin{align}
\text{DIA}  &= \{ x_{i} \in \{ 0,1 \}^{*} : (i,i) = 0 \} \\
&= \{ x_{i} \in \{ 0,1 \}^{*} : x_{i} \not\in L_{x_{i}} \}
\end{align}
$$
De nuevo, si DIA es diagonal, existe una máquina Turing normalizada codificable mediante la cadena $x_{p}$ tal que $\text{DIA} = L_{x_{p}}$. Se da una situación incongruente si suponemos que es enumerable:
- $x_{p} \in \mathrm{DIA} \implies (p,p)=1 \implies x_{p} \not\in \mathrm{DIA}$
- $x_{p} \not\in \mathrm{DIA} \implies (p,p) = 0 \implies x_{p} \in \mathrm{DIA}$

***Por tanto, no es recursivamente enumerable.***

# La Máquina de Turing Universal

Una MTU es una máquina que puede simular cualquier otra máquina de Turing sin importar la cadena de entrada que se elija.

Si consideramos la cadena binaria $x = c(x)d(x)$, se definen aplicaciones de la forma $c,d : \{ 0,1 \}^{*} \to \{ 0,1 \}^{*}$ donde:
- Si $x$ tiene como **prefijo** $u$ un **código válido** de máquina de Turing, $c(x) = u, d(x) = z$, siendo $z$ el resto de la cadena. Por tanto, si se da este caso, $x = uz$.
- Si no se da el caso, $c(x) = x, d(x) = \lambda$, por lo que $x = c(x)$.

Así, el lenguaje universal se define como aquel formado por palabras cuya parte restante $d(x)$ forme parte del lenguaje definido por la máquina de Turing $M_{c(x)}$ que representa el prefijo $c(x)$.
$$
\mathrm{UNI} = \{ x \in \{ 0,1 \}^{*}: d(x) \in L_{c(x)} \}.
$$

## Funcionamiento

La MTU contará con 3 cintas, todas ellas con un puntero aparte:
1. **Entrada**: Es donde se calculan $c(x)d(x)$ a partir de la palabra $x$ arbitraria.
2. **Emulación:** Simula la máquina de Turing usando $d(x)$, que es como la $x$ de esta cinta.
3. **Estado:** Se guarda el estado global de la máquina (puntero/estado simulado).

![[Incoputabilidad - MTU.png]]

El algoritmo sigue los siguientes pasos:
1. La cinta de entrada comprueba si existe un prefijo $c(x) \in \mathrm{COD}$.
2. Si no, rechaza $x$ y se detiene. Si lo hay, copia $d(x)$ a la cinta de emulación y escribe en la cinta de estado un símbolo $0$, es la codificación del estado $q_{1} \to 0^{1}$.
3. Empieza la simulación:
    1. A partir del estado de la cinta de estado y del símbolo actual en la cinta de emulación (que hará de símbolo de entrada), se busca el movimiento/transición en la máquina $M_{c(x)}$ (codificada como $c(x)$) de la cinta de entrada.
    2. Cambia el estado en la cinta de estado sobrescribiendo con un $0^{i}$ correspondiente al estado de salida $q_{i}$.
    3. Escribe en la cinta de emulación el símbolo de salida y aplica el movimiento correspondiente.
    4. Si la máquina no encuentra una transición aplicable en la codificación $c(x)$, la máquina finaliza la simulación y, si el estado en la cinta de estado es el $0^{2}$ correspondiente al estado final $q^{2}$, el estado final es de aceptación. Si no hay transición aplicable pero el estado final no corresponde a $q^{2}$, no se acepta la cadena $x$. Si hay transición aplicable, se repite la simulación desde el punto 3.1.

## El Lenguaje Universal

Dada una máquina normalizada $M$ y una cadena binaria $x$, la concatenación de un código válido $c_{M}$ de $M$ y la cadena binaria forma parte del lenguaje universal si y sólo si $x$ forma parte del lenguaje aceptado por $M$.
$$
x \in L(M) \iff c_{M}\ x \in \mathrm{UNI}
$$