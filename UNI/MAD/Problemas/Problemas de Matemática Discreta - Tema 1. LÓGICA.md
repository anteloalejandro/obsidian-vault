# Simbolizad lógicamente las proposiciones siguientes

**Ayer fuimos al cine y no estudiamos***
$P = \text{Fuimos al cine}$
$Q = \text{Estudiamos}$
$P\land \overline{Q}$

**Te llamé por teléfono el martes, pero no estabas en casa**
$P = \text{Te llamé por teléfono}$
$Q = \text{Estabas en casa}$
$P \land \overline{Q}$

**No tengo nada**
$P = \text{Tengo algo}$
$\overline{P}$

**Si la carretera nacional está en obras, iremos por la comarcal, no por la autopista**
$P = \text{Carretera nacional en obras}$
$Q = \text{Ir por la comarcal}$
$R = \text{Ir por la autopista}$
$P \Rightarrow Q \land \overline{R}$

**No lo compraré si tu no quieres**
$P = \text{Lo compraré}$
$Q = \text{Quieres}$
$\overline{P} \Rightarrow \overline{Q}$

**Ni Juan ni Pepe vendrán esta noche**
$P = \text{Juan vendrá}$
$Q = \text{Pepe vendrá}$
$\overline{P} \land \overline{Q}$

**No habiendo prisa, estamos salvados**
$P = \text{Hay prisa}$
$Q = \text{Estamos salvados}$
$\overline{P} \Rightarrow Q$

**Los animales, como las plantas, son seres vivos**
$P = \text{Los animales son seres vivos}$
$Q = \text{Los plantas son seres vivos}$
$P \Leftrightarrow Q$

**Si has perdido el fichero, entonces, si no consigues recuperar los datos, todo el trabajo hecho hasta ahora no servirá para nada**
$P = \text{Has perdido el fichero}$
$Q = \text{Consigues recuperar los datos}$
$R = \text{El trabajo servirá}$
$P \land \overline{Q} \Rightarrow \overline{R}$

**Las proposiciones $P$ y $Q$ son equivalentes si y sólo si la expresión $P \Leftrightarrow Q$ es una tautología**

_Ni idea de cómo expresarlo_


# Indicad cuáles de las siguientes expresiones tienen sentido lógico y cuales no. Aquellas que resulten ser fórmulas lógicas correctas, expresadlas utilizando el mínimo número de paréntesis posible.

a) $P \lor (P \land Q) \land S$  
	$P \lor (P \land Q \land S)$  
b) $(P \lor \overline{Q}) \Rightarrow R \lor P$  
	$P \lor \overline{Q} \Rightarrow R \lor P$  
c) $P \Rightarrow \overline{R} \Rightarrow S \land P$  
d) $((\overline{Q} \land P) \Rightarrow (S \lor P)) \Rightarrow Q$  
	$\overline{Q} \land P \Rightarrow S \lor P \Rightarrow Q$  
e) $[(((p \lor q) \lor r) → p)\land \neg(p \lor (r\land \neg q))] → r$
	$(p \lor q \lor r → p)\land \neg (p \lor (r\land \neg q)) → r$
f) $[(p \Rightarrow q) \land  (r \Rightarrow q)] \Leftrightarrow (p \lor r) \Rightarrow q$
	$(p \Rightarrow q) \land  (r \Rightarrow q) \Leftrightarrow p \lor r \Rightarrow q$

# Haced la tabla de la verdad de las formas proposicionales siguientes, indicando si son tautologías, contradicciones o contingencias

## A)
| $P$ | $Q$ | $\overline{P}$ | $\overline{Q}$ | $\neg{P}\land \neg{Q}$ |
| --- | --- | -------------- | -------------- | ---------------------- |
| V   | V   | F              | F              | F                      |
| V   | F   | F              | V              | F                      |
| F   | V   | V              | F              | F                      |
| F   | F   | V              | V              | V                      |
*Contingencia*
# B)

| $P$ | $Q$ | $R$ | $P\land Q$ | $P \land Q \Rightarrow R$ |
| --- | --- | --- | ---------- | ------------------------- |
| V   | V   | V   | V          | V                         |
| V   | V   | F   | V          | F                         |
| V   | F   | V   | F          | V                         |
| V   | F   | F   | F          | V                         |
| F   | V   | V   | F          | V                         |
| F   | V   | F   | F          | V                         |
| F   | F   | V   | F          | V                         |
| F   | F   | F   | F          | V                         |
*Contingencia*

# C)

| P   | Q   | $\neg (P \Rightarrow Q)$ | $\neg (Q \Rightarrow P)$ | $\neg (P\Rightarrow Q) \land \neg (Q \Rightarrow P)$ |
| --- | --- | ------------------------ | ------------------------ | ---------------------------------------------------- |
| V   | V   | F                        | F                        | F                                                    |
| V   | F   | V                        | F                        | F                                                    |
| F   | V   | F                        | V                        | F                                                    |
| F   | F   | F                        | F                        | F                                                    |
*Contradicción*

## D

| P   | Q   | R   | $Q \Rightarrow R$ | $P \Rightarrow (Q \Rightarrow R)$ |
| --- | --- | --- | ----------------- | --------------------------------- |
| V   | V   | V   | V                 | V                                 |
| V   | V   | F   | F                 | F                                 |
| V   | F   | V   | V                 | V                                 |
| V   | F   | F   | V                 | V                                 |
| F   | V   | V   | V                 | V                                 |
| F   | V   | F   | F                 | V                                 |
| F   | F   | V   | V                 | V                                 |
| F   | F   | F   | V                 | V                                 |
*Contingencia*

## E

| P   | Q   | R   | $\overline{P}$ | $\overline{Q}$ | $\overline{P} \land Q$ | $\overline{Q} \land R$ | $\overline{P} \land Q \Rightarrow \overline{Q} \land R$ |
| --- | --- | --- | -------------- | -------------- | ---------------------- | ---------------------- | ------------------------------------------------------- |
| V   | V   | V   | F              | F              | F                      | F                      | V                                                       |
| V   | V   | F   | F              | F              | F                      | F                      | V                                                       |
| V   | F   | V   | F              | V              | F                      | V                      | V                                                       |
| V   | F   | F   | F              | V              | F                      | F                      | V                                                       |
| F   | V   | V   | V              | F              | V                      | F                      | F                                                       |
| F   | V   | F   | V              | F              | V                      | F                      | F                                                       |
| F   | F   | V   | V              | V              | F                      | V                      | V                                                       |
| F   | F   | F   | V              | V              | F                      | F                      | V                                                       |
*Contingencia*

## F

| P   | Q   | R   | $P \Rightarrow Q$ | $R \Rightarrow Q$ | $P \lor R$ | $(P \Rightarrow Q) \land (R \Rightarrow Q)$ | $(P \lor R) \Rightarrow Q$ | $(P \Rightarrow Q) \land (R \Rightarrow Q) \Leftrightarrow (P \lor R) \Rightarrow Q$ |
| --- | --- | --- | ----------------- | ----------------- | ---------- | ------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------ |
| V   | V   | V   | V                 | V                 | V          | V                                           | V                          | V                                                                                    |
| V   | V   | F   | V                 | V                 | V          | V                                           | V                          | V                                                                                    |
| V   | F   | V   | F                 | F                 | V          | F                                           | F                          | V                                                                                    |
| V   | F   | F   | F                 | V                 | V          | F                                           | F                          | V                                                                                    |
| F   | V   | V   | V                 | V                 | V          | V                                           | V                          | V                                                                                    |
| F   | V   | F   | V                 | V                 | F          | V                                           | V                          | V                                                                                    |
| F   | F   | V   | V                 | F                 | V          | F                                           | F                          | V                                                                                    |
| F   | F   | F   | V                 | V                 | F          | V                                           | V                          | V                                                                                    |
*Tautología*

## G

| $\tau$ | P   | $\tau \Rightarrow P$ |
| ------ | --- | -------------------- |
| V      | V   | V                     |
| V      | F   | F                     |
*Contingencia*

## H

| $\tau$ | $\phi$ | $\tau \Rightarrow \phi$ |
| ------ | ------ | ----------------------- |
| V      | F      | F                        |
*Contradicción*
## I

| $\tau$ | $\phi$ | $\tau \Rightarrow \phi$ |
| ------ | ------ | ----------------------- |
| F      | V      | V                       |
*Tautología*

## J

| P   | Q   | $P \land Q$ | $\phi \lor \tau$ | $P \land Q \Rightarrow \phi \lor \tau$ |
| --- | --- | ----------- | ---------------- | -------------------------------------- |
| V   | V   | V           | V                | V                                       |
| V   | F   | F           | V                | V                                       |
| F   | V   | F           | V                | V                                       |
| F   | F   | F           | V                | V                                       |
*Tautología*

# Simplificad las siguientes formas proposicionales

## A
$(\overline{P} \land Q) \land P$

$\overline{P} \land P \land Q$
$\phi \land Q$
$\phi$

## B
$P \Rightarrow (Q \Rightarrow P)$

$\alpha \equiv Q \Rightarrow P$
$\alpha \equiv \overline{Q} \lor P$
$\overline{P} \lor \alpha$
$\overline{P} \lor \overline{Q} \lor P$
$\overline{P} \lor P \lor \overline{Q}$
$\tau \lor \overline{Q}$
$\tau$
**BIEN**
## C
$\overline{Q} \land R \Leftrightarrow Q$

$\alpha \equiv \overline{Q} \land R$
$\alpha \Leftrightarrow Q$
$(\alpha \Rightarrow Q) \land (Q \Rightarrow \alpha)$
$(\overline{\alpha} \lor Q) \land (\overline{Q} \lor \alpha)$
$(Q \lor \overline{R} \lor Q) \land (\overline{Q} \lor (\overline{Q} \land R))$
$(Q \lor \overline{R}) \land (\overline{Q} \lor \alpha)$
$\beta \equiv Q \lor \overline{R}$
$\beta \equiv \overline{\alpha}$
$\beta \land (\overline{Q} \lor \alpha)$
$(\beta \land \overline{Q}) \lor (\beta \land \alpha)$
$(\beta \land \overline{Q}) \lor \phi$
$(\beta \land \overline{Q})$
$(\overline{Q} \land (Q \lor \overline{R}))$
$(\overline{Q} \land Q) \lor (\overline{Q} \land \overline{R})$
$\phi \lor (\overline{Q} \land \overline{R})$
$\overline{Q} \lor \overline{R}$
**MAL -> $\overline{Q} \land \overline{R} \land (\overline{Q} \lor R)$**

## D
$(\neg P \Rightarrow \neg(\neg P \lor Q)) \Rightarrow \neg P$
$(P \lor \neg(\neg P \lor Q)) \Rightarrow \neg P$
$P \lor ( P \land \neg Q) \Rightarrow \neg P$
