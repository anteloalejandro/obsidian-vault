
# Práctica 1: Modelización con LINGO

Una compañía petrolífera produce tres tipos de gasolina: Super, Normal y Euro.

Se obtienen por mezcla de tres calidades de crudo (A, B, C) que compra a otra compañía y que contienen tres componentes (1,2,3).

La participación de estos componentes en la composición de cada crudo es:

| CRUDOS \ % COMP. | 1   | 2   | 3   |
| ---------------- | --- | --- | --- |
| A                | 80  | 10  | 5   |
| B                | 45  | 30  | 20  |
| C                | 30  | 40  | 25  |

Las especificaciones de los tres tipos de gasolina son:

| Gasolina \ % Comp. | 1    | 2    | 3    |
| ------------------ | ---- | ---- | ---- |
| SUPER              | ≥ 60 | ≤ 25 | ≥ 10 |
| NORMAL             | ≥ 50 | ≤ 30 | ≤ 15 |
| EURO               | ≤ 40 | ≥ 35 | ≥ 20 |

- Los costes por barril de crudo A, B y C son: 650, 500 y 450 €, respectivamente.
- El presupuesto diario de compra es de 50 Millones de €.
- La disponibilidad diaria de crudos B y C se limita, respectivamente, a 3.000 y 7.000 barriles.
- Ciertos acuerdos obligan a la compra de al menos 2.500 barriles del crudo A.
- Las demandas de gasolina Super y Normal son de 2.000 y 2.500 barriles diarios, que deben satisfacerse.

***Formular un modelo matemático que permita a la compañía maximizar la producción de gasolina Euro.***

**Variables**

Barriles de crudo a poner en cada unidad de Gasolina Euro
- $E_{i} : i \in \set{A,B,C}$
Barriles de crudo a poner en cada unidad de Gasolina Normal
- $N_{i} : i \in \set{A,B,C}$
Barriles de crudo a poner en cada unidad de Gasolina Super
- $S_{i} : i \in \set{A,B,C}$

**Función Objetivo**



$$
max \left( z = E_{A} + E_{B} + E_{C} \right)
$$

**Restricciones**

$$
\begin{align}
\text{Max B} &: E_{B} + N_{B} + S_{B} \leq 3000 \\
\text{Max C} &: E_{C} + N_{C} + S_{C} \leq 7000 \\
\text{Min A} &: E_{A} + N_{A} + S_{A} \geq 2500  \\
\text{Presupuesto} &: \begin{matrix}
+ 650(E_{A} + N_{A} + S_{A}) \\
+ 500(E_{B} + N_{B} + S_{B}) \\
+ 450(E_{C} + N_{C} + S_{C}) \\
\end{matrix} \leq \pu{ 50e6 euros } \\
 \\
\text{Super comp. 1} &: 0.8S_{A} + 0.45S_{B} + 0.3S_{C} \geq 0.6 · (S_{A} + S_{B} + S_{C}) \\
\text{Super comp. 2} &: 0.1S_{A} + 0.3S_{B} + 0.4S_{C} \leq 0.25 \\
\text{Super comp. 3} &: 0.05S_{A} + 0.2S_{B} + 0.25S_{C} \geq 0.1 \\
\text{Normal comp. 1} &: 0.8S_{A} + 0.45S_{B} + 0.3S_{C} \geq 0.5 \\
\text{Normal comp. 2} &: 0.1S_{A} + 0.3S_{B} + 0.4S_{C} \leq 0.3 \\
\text{Normal comp. 3} &: 0.05S_{A} + 0.2S_{B} + 0.25S_{C} \leq 0.15 \\
\text{Euro comp. 1} &: 0.8S_{A} + 0.45S_{B} + 0.3S_{C} \leq 0.4 \\
\text{Euro comp. 2} &: 0.1S_{A} + 0.3S_{B} + 0.4S_{C} \geq 0.35 \\
\text{Euro comp. 3} &: 0.05S_{A} + 0.2S_{B} + 0.25S_{C} \geq 0.2 \\
\end{align}
$$