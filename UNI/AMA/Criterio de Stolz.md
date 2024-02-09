$$
\text{Sea }\lim{\frac{\set{a_n}}{\set{b_{n}}}}
=\lim{\frac{a_1+a_2+\dots+a_n}{b_1+b_2+\dots+b_n}}
$$
El Criterio de Stolz dice que, si $b_{n}$ es creciente y $b \rightarrow{+\infty}$...
$$
\lim{\frac{\set{a_n}}{\set{b_{n}}}}=
\lim{\frac{a_{n+1}-a_n}{b_{n+1}-b_n}}
$$

**EJEMPLO**
$$
\lim\frac{log(n)}{n}
\begin{cases}
a_n = log(n) \\
b_n = n & 
\begin{cases}
n\text{ es creciente} \\
n\rightarrow \infty
\end{cases}
\end{cases}
$$
$$
\begin{align}
\lim\frac{log(n)}{n}&=(Stolz)=\lim\frac{log(n+1)-log(n)}{n+1-n}\\
&=\lim{log\left(\frac{n+1}{n}\right)}=\lim{log(1)+log\left(\frac{1}{n}\right)}\\
&=\lim{log(1)}=log(1)=0
\end{align}
$$