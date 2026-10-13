# Análisis Léxico

Lo veremos como una subrutina del analizador sintáctico. No es que se haga todo antes, sólo una función a la que el AS llama para obtener el siguiente token.

Es aquí donde sabemos en qué línea está cada token, es lo que permite que los mensajes de error de compilación nos diga dónde ocurre el error.

Los espacios vacíos y comentarios se obvian, pero se deben leer, por ejemplo, para llevar la cuenta de en qué línea estamos.

3.14
- símbolos/patrón: DÍGITO, PUNTO, DIGITO, DIGITO
- token: CONSTANTE REAL 
- Lexema: 3.14

Los valores de los tokens también se guardan. 3.14 => REAL(3.14).

- Unión: $L \cup M$
- Concatenación: $L · M = \{ st \mid s \in L, t \in M \}$ => $L_{r} \cup L_{s} \equiv r \mid s$
- Clausura de Kleene: $L^{*} = L^{0} \cup L^{1} \cup L^{2}$, $L^{n} = L·\dots_{n}·L$, $L^{0} = \{ \varepsilon \}$ => $L^{r} · L^{s} \equiv r * s$
- Clausura positiva: $L^{+}$.
- Cadena vacía: $\varepsilon$. $\{ \varepsilon \} \neq \emptyset$

$$
\begin{align}
L&=\{ aa,bb,cc \}, M = \{ abc \} \\
L · M &= \{ aaabc, bbabc, ccabc \} \\
L^{*} &= \{ \varepsilon, aa, bb, cc, aaaa, aabb, aacc, bbaa, bbbb, bbcc, ccaa, \dots \} \\
L^{+} = L^{*} - \{\varepsilon\} &=  \{ aa, bb, cc, aaaa, aabb, aacc, bbaa, bbbb, bbcc, ccaa, \dots \} \\
\end{align}
$$

Formamos **definiciones regulares** a partir de expresiones regulares.
$$
\begin{align}
\text{letra} &\to A |B|C|\dots|Z|a|b|\dots|z \\
\text{digito} &\to 0|1|2|\dots|9 \\
\text{identificador} &\to \text{letra}\ (\text{letra} \mid \text{digito})^{*}
\end{align}
$$

Al recibir un identificador, el AL debe interpretarlo como identificador, no como una combinación de letra y dígito, sin ambigüedades. Lo que hacemos es coger el estado final con más distancia, es decir, el token con más caracteres.

AFD: AFN pero en el que sólo hay un estado posible en cada transición, sin transiciones vacías. $\delta : Q \times \Sigma \to Q$
AFN (con transiciones vacías): Las transiciones pueden dar lugar a un subconjunto de los estados posibles de cualquier tamaño (incluido 1) $\delta : Q \times (\Sigma \cup \{ \varepsilon \}) \to \mathcal{P}(Q)$.

Si en el grafo se puede transicionar a dos estados con la misma transición, es AFN.

Transformamos el AFN en AFD para reducir la complejidad computacional.
