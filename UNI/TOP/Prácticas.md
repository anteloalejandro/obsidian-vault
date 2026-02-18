
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
- La disponibilidad diaria de crudos B y C se limita, respectivamente a 3.000 y 7.000 barriles.
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
max \left( z = \  \begin{matrix}
+ 650(E_{A} + N_{A} + S_{A}) \\
+ 500(E_{B} + N_{B} + S_{B}) \\
+ 450(E_{C} + N_{C} + S_{C}) \\
\end{matrix} \right)
$$