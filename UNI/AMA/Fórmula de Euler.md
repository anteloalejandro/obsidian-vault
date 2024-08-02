La fórmula del número $e$ dice que 
$$
e = \lim{\left(1+ \frac{1}{n}\right)^{n}},\ e\in\mathbb{R}-\mathbb{Q},\ n\in\mathbb{R}
$$
Por tanto, si toca calcular un límite de una función exponencial, se pueden reorganizar los términos de manera que resulte en
$$
\lim{\left(\left(1+ \frac{1}{a_{n}}\right)^{a_{n}}\right)^{k} = e^{\lim{k}}},\ k\in\mathbb{R}
$$
También hay otra fórmula que permite calcular directamente el resultado de forma más simple si se cumplen las siguientes condiciones:
$$
\text{Dado el siguiente límite: }\lim{(a_{n})^{b_{n}}}
$$
$$
\lim{a_{n}=1}\ \land\ \lim{b_{n}}=\pm\infty \Rightarrow
\lim{a_n}^{b_{n}}=e^{\lim{b_{n}(a_{n}-1)}}$$