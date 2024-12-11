

 Cuando se le aplica un campo eléctrico a un conductor, las cargas (si el campo es positivo, las cargas negativas) se mueven en dirección al campo (generando una fuerza) hasta alcanzar el equilibrio, es decir, cuando las cargas anulen la fuerza ejercida por el campo. Por tanto, una vez alcanzado el equilibrio, la suma de las fuerzas será nula.

 ![[equilibrio campo.png]]

$$
\begin{gather}
\vec{F} = 0 \implies \vec{E} = 0\\
V = \int \vec{E}·\vec{dr}
\end{gather}
\implies V = 0+c \implies V \text{ es cte.}
$$
Como el potencial es cte., toda la superficie es equipotencial. Además, se puede usar una figura gaussiana para calcular la carga interior, que será 0, al igual que si no hubiese un campo. La diferencia es que toda la carga estará distribuida en la superficie.

Es decir, en el conductor las cargas positivas y negativas estarán en extremos diferentes, de forma que crean un campo eléctrico opuesto que anula el campo eléctrico aplicado sobre el conductor. **El campo es 0 porque estamos en equilibrio**.

# Teorema de coulomb

En las proximidades de cualquier conductor, se da que, siendo $\sigma_{1}$ y $\sigma_{2}$ las cargas en lados opuestos que se han movido a la superficie por la acción del campo eléctrico externo $\vec{E}$, $\vec{E}$ se puede calcular como:
$$
\vec{E} = \frac{\sigma_{i}}{\varepsilon_{0}}\vec{u_{n}}
$$
![[teorema coulomb.png]]


## Carga en curvaturas asimétricas

Sean dos esferas conductoras con cargas iniciales $2Q$ y $2Q$, y radios $R$ y $3R$ que se conectan mediante un largo hilo de capacidad despreciable. Determínese una vez llegado al equilibrio:

1.  potencial de cada esfera
2. carga de cada esfera
3. densidad de carga de cada esfera
4. campo en la periferia de cada esfera.

Nótese que la esfera más pequeña tiene menor carga, pero mayor densidad y campo.

Inicialmente (o sea, antes de unirla) ambas esferas tienen la misma carga, pero en la de radio $R$ la misma carga está más "apelotonada", de ahí que el campo sea mayor. También se puede simplemente razonar que el campo es inversamente proporcional al radio, ergo a menor radio, más campo.
  ![[Untitled 2024-10-22 18.11.59.excalidraw|100%]]

Como el campo es mayor, al unirlas, pasará carga de la esfera menor a la mayor. Además, al unirlas, actuarán como un solo conductor, así que el campo durante todo este "nuevo conductor" será 0 y el potencial $V$ será constante. Como se consideran un sólo conductor, el potencial será además igual en ambas esferas.

$$
\begin{gather}
\underbrace{ \frac{Q_{1}}{4\pi\varepsilon_{0}R} = \frac{Q_{2}}{4\pi\varepsilon_{0} (3R)} }_{ V_{1} = V_{2} } \iff
Q_{1} = \frac{Q_{2}}{3} \iff
Q_{2} = 3Q_{1} \\
Q_{1} = Q \\
Q_{2} = 3Q
\end{gather}
$$

Como $\sigma$ es igual a $\frac{Q}{S}$, se pueden calcular los valores de sigma así:

$$
\begin{gather}
\sigma = \frac{Q}{S} = \frac{Q}{4\pi r^{2}} \quad 
\begin{cases}
\sigma_{1} = \frac{Q}{4\pi R^{2}} \\
 \\
\sigma_{2} = \frac{3Q}{4\pi (3R)^{2}} = \frac{3Q}{36\pi R^{2}} = \frac{Q}{12\pi R^{2}}
\end{cases} \\ \\
\sigma_{1} = \frac{\sigma_{2}}{3}
\end{gather}
$$

De ahí, como $\vec{E} = \frac{\sigma}{\varepsilon_{0}}\vec{u}$ podemos sacar además que $\vec{E}_{1} = \frac{\vec{E}_{2}}{3}$.

|           | $R$       | $3R$          |
| --------- | --------- | ------------- |
| $V$       | $V$       | $V$           |
| $Q$       | $Q$       | $3Q$          |
| $\sigma$  | $\sigma$  | $\sigma / 3$  |
| $\vec{E}$ | $\vec{E}$ | $\vec{E} / 3$ |
![[Untitled 2024-10-22 18.11.59-2.excalidraw|100%]]

> [!success] Resultados
> Se puede concluir que la **superficie** de un conductor cuando hay dos conductores conectados es directamente **proporcional a la carga** e **inversamente proporcional al campo eléctrico**.

Estos resultados se pueden extrapolar a cuerpos con curvaturas asimétricas a los que se le aplica una carga, de modo que en el lado con la curvatura es más pronunciada, habrá más cargas.

![[Pasted image 20241022123716.png]]


# Influencia electroestática

Si tenemos dos conductores, uno inicialmente cargado y otro inicialmente descargado, como el primero genera un campo eléctrico, las cargas opuestas del segundo se moverán con una fuerza en dirección opuesta.

El **teorema de los eventos correspondientes** dice que si sigues dos líneas de campo que van desde uno a otro, verás que hay **las cargas son iguales en la superficie** delimitada por las líneas de ambos conductores, pero opuestas.

Además, como no todas las líneas de campo de dirigirán segundo conductor, la carga total de éste será menor que la carga total del primero.

![[Pasted image 20241022125155.png]]

Entonces, si $Q_{i}$ es la carga en la superficie delimitada por las dos líneas, y $Q_{i}$ la carga total de cada esfera, se puede resumir lo anterior así:
$$
\begin{gather}
Q_{1} > 0 \iff Q_{2} < 0 \\
|Q_{1}| > |Q_{2}|
\end{gather}
$$
Además, al ser $V$ constante, la carga en toda la superficie de los conductores será igual a la carga en esa parte.

La **influencia total** es toda línea del primer conductor que acaba en el segundo.

Si en vez el caso anterior tenemos un dos esferas concéntricas, como todas las líneas de campo llegan de uno al otro, las cargas totales son iguales y por tanto la influencia total es igual a $Q$.

## Principio de superposición

  Cargamos inicialmente con $Q_{1}$ y $Q_{2}$ dos conductores concéntricos de radios $R_{1}$ y $R_{3}$ respectivamente. Desde el centro del conductor interior hasta la superficie interior del conductor exterior, hay un radio de $R_{2}$.
  
![[Pasted image 20241022162004.png]]

El conductor de dentro tendrá una carga (positiva) en su superficie de valor $Q$. Por tanto, en la superficie interior del conductor de fuera habrá cierta fuerza que mueve cargas negativas hacia el centro.

Si se aplica el teorema de Gauss en el conductor exterior modelando esfera gaussiana en el interior de éste, obtenemos que el flujo eléctrico $\phi$ es 0, ya que el campo eléctrico dentro de un conductor es 0. Esto significa que la carga encerrada $Q_{enc}$ también sería 0, así que podemos sacar que la carga de la parte interior del conductor exterior $Q_{2\text{ int}}$ es igual a $-Q_{1}$, independientemente del valor de $Q_{2}$, pues al no perderse líneas de campo, la carga en ambas superficies ha de ser igual.
$$
Q_{\text{enc}} = Q_{1} + Q_{2\text{ int}} = 0 \implies Q_{2\text{ int}} = -Q_{1}
$$
Nótese que si la $Q_{1} = 0$, **no habría carga en la superficie interior** del conductor exterior, a pesar de que el propio conductor si que tiene una carga $Q_{2}$. Obviamente, lo mismo sucedería si no hubiese un conductor interior.

Resumiendo los resultados hasta el momento: 
> [!info]
> $$
> \begin{align}
> R_{1} &\to Q_{1} \\
> R_{2} &\to -Q_{1} \\
> R_{3} &\to Q_{1}+Q_{2} \\
> \end{align}
> $$

Para calcular el campo eléctrico $\vec{E}$, se saca primero el flujo eléctrico $\phi$. Si modelamos una nueva esfera gaussiana por fuera del conductor exterior, ahora sí que hay un flujo que se puede calcular porque no estamos dentro de un conductor. Dado que $\phi = \frac{Q_{\text{enc}}}{\varepsilon_{0}}$, como en este caso $Q_{\text{enc}} = Q_{2\text{ ext}}$...
$$
\phi = \frac{Q_{\text{enc}}}{\varepsilon_{0}} = \frac{Q_{1}+Q_{2}}{\varepsilon_{0}}
$$
Una vez obtenido el flujo eléctrico, el campo eléctrico se calcula tal que así:
$$
E·S = \phi = \frac{Q_{1}+Q_{2}}{\varepsilon_{0}} \iff E = \frac{Q_{1}+Q_{2}}{4\pi r^{2}\varepsilon_{0}} \quad r > R_{3}
$$

Si extrapolamos esto al espacio vacío entre ambas esferas concéntricas, obtenemos...

$$
E = \frac{Q_{1}}{4\pi r^{2}\varepsilon_{0}} \quad r > R_{1}
$$

Resumiendo de nuevo los resultados:
> [!info]
> $$
> \begin{align}
> \phi_{\text{int}} &= \frac{Q_{1}}{\varepsilon_{0}}\\
> E_{\text{int}} &= \frac{Q_{1}}{4\pi r^{2}\varepsilon_{0}} &r > R_{1}\\
> \\
> \phi_{\text{ext}} &= \frac{Q_{1}+Q_{2}}{\varepsilon_{0}} \\
> E_{\text{ext}} &= \frac{Q_{1}+Q_{2}}{4\pi r^{2}\varepsilon_{0}} &r > R_{3}
> \end{align}
> $$

Si dibujásemos una gráfica con $E$ en el eje $y$ y $r$ en el eje $x$, tendríamos que...
$$
\begin{align}
r \in (0,R_{1}) &\implies E = 0 \\
r \in (R_{1}, R_{2}) &\implies E = E_{\text{int}} \\
r \in (R_{2},R_{3}) &\implies E = 0 \\
r \in (R_{3},\infty) &\implies E = E_{\text{ext}}
\end{align}
$$
Donde $E_{\text{int}}$ y $E_{\text{ext}}$ forman curvas que descienden conforme aumenta $r$, y tienden a 0 cuando $r$ tiende a $\infty$. Por tanto, la gráfica tendría más o menos la siguiente forma:
![[Pasted image 20241022172300.png]]

Para calcular el potencial $V$ cuando $r > R_{3}$, cogemos el potencial en el infinito, que será 0, e integramos a partir de ahí.

$$
\begin{align}
V &= V - 0 = V - V_{\infty} = -\int_{\infty}^{r} \vec{E} \,\vec{dr} = \int_{r}^{\infty} E \, dr  \\
V &= - \frac{Q_{1}+Q_{2}}{4\pi \varepsilon_{0}} \int_{\infty}^{r} \frac{1}{r^{2}} \, dr = -\frac{Q_{1}+Q_{2}}{4\pi\varepsilon_{0}} \left[ \frac{1}{r} - \cancelto{ 0 }{ \frac{1}{\infty} } \right] \\
V &= \frac{Q_{1}+Q_{2}}{4\pi\varepsilon_{0}r} = E_{\text{ext}}·r
\end{align}
$$

El potencial es constante en $r \in (R_{2},R_{3})$, así que no hace falta calcularlo, será una línea horizontal igual a $E_{\text{ext}}$ cuando $r \simeq R_{3}$.

Del mismo modo, en $r \in (0,R_{1})$ el potencial es constante y está a la altura de $E_{\text{int}}$ cuando $r \simeq R_{1}$. Podemos ayudarnos de la diferencia entre los potenciales antes y después de la bajada en
$r \in (R_{1}, R_{2})$. En realidad, ya conocemos $V_{R_{2}}$, pues $V_{R_{2}} = V_{R_{3}} = E_{\text{ext}} · R_{3}$. Por tanto, calculamos la diferencia de potencial de $V_{R_{2}}$ hasta $V_{r}$ (**teorema de superposición**) , y de ahí calculamos $V_{R_{1}}$.
$$
\begin{align}
\Delta V_{R_{2},r} &= V_{R_{2}} - V_{r} = - \int_{R_{2}}^{r} \vec{E} \, d\vec{r}  \\
V_{r} &= V_{R_{2}} + \frac{Q_{1}}{4 \pi\varepsilon_{0}}\int_{R_{2}}^{r} \frac{1}{r^{2}} \, dr \\
V_{r} &= V_{R_{2}} + \frac{Q_{1}}{4 \pi\varepsilon_{0}}\left[ \frac{1}{r} - \frac{1}{R_{2}} \right] \\
V_{r} &= V_{R_{2}} + \frac{Q_{1}}{4\pi\varepsilon_{0}r} - \frac{Q_{1}}{4\pi \varepsilon_{0}R_{2}} \\
V_{R_{1}} &= \frac{Q_{1}+Q_{2}}{4\pi\varepsilon_{0}R_{3}} + \frac{Q_{1}}{4\pi\varepsilon_{0}R_{1}} - \frac{Q_{1}}{4\pi \varepsilon_{0}R_{2}} \\
V_{R_{1}} &= \frac{1}{4\pi\varepsilon_{0}} · \left( \frac{Q_{1}+Q_{2}}{R_{3}} - \frac{Q_{1}}{R_{2}} + \frac{Q_{1}}{R_{1}} \right) 
\end{align}
$$

Podemos ver que las cargas en las superficies de las esferas concéntricas coinciden con lo esperado:
![[Pasted image 20241023044016.png]]

Con esta información, se puede estimar también la forma que tendrían las diferencias potenciales en la gráfica.
![[Pasted image 20241023043824.png]]


> [!success] Resultados
> Podemos observar que en las secciones del tramo que interceden con el conductor el potencial es constante, y que en las secciones en las que los separa un vacío el **potencial es estrictamente decreciente**.
> 
> Además, en una figura como en la anterior, el potencial en conductor interior y exterior son, respectivamente:
> $$
> \begin{align}
> V_{\text{int}} &= \frac{1}{4\pi\varepsilon_{0}} \left( \frac{Q_{1}+Q_{2}}{R_{3}} + \frac{-Q_{1}}{R_{2}} + \frac{Q_{1}}{R_{1}} \right) \\ \\
> V_{\text{ext}} &= \frac{Q_{1} + Q_{2}}{4\pi\varepsilon_{0}R_{3}}
> \end{align}
> $$

# Apantallamiento

Decimos que la Tierra tiene siempre $V = 0$ porque es un conductor tan grande que a escalas normales cualquier carga genera un campo eléctrico despreciable.

Al ser la tierra un conductor que siempre tiene $V=0$, cualquier conector que conectaremos a él tendrá $V=0$, ya que el potencial ha de ser constante.

$$
V = 0 \implies E = 0\implies q=0
$$

Si aplicamos esto a las esferas concéntricas anteriores, al conectar la esfera exterior a tierra, sin importar lo que haya en la esfera interior, el potencial en la superficie de la esfera interior será 0, por lo que también lo serán el campo eléctrico y la carga.

![[apantallamiento dentro fuera.png]]

Dicho de otro modo, **nada de lo que pase en la esfera interior escapará de la exterior**, y esta última siempre tendrá una carga de 0 en la superficie. Esto es lo que se conoce como **Apantallamiento eléctrico de dentro a fuera**.

También es posible apantallar de fuera a dentro, donde en vez de aislar al exterior de una carga interior, aislamos el interior de una carga exterior.

![[apantallamiento fuera dentro.png]]

En este caso el exterior de la esfera hueca también está cargado, al igual que lo estaba el interior en el ejemplo anterior. Sin embargo, como la influencia electroestática es menor, la carga en la superficie también será menor.

