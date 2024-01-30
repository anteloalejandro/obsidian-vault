
# Programa básico:  _Hola, mundo!_

Todos los programas en Java tienen una función (o método) principal que se ejecuta al ejecutarse el programa.  Está función de nombre `main`, por convención, es un método de la clase `Main`, que está en un archivo `Main.java` dentro  de un paquete `main` localizado en el directorio `src/`.

Para el clásico ejemplo de un programa que muestra el texto 'Hola, Mundo!', se usa el método `println` del objeto `System.out` para mostrar el texto por pantalla.

`src/main/Main.java`
```java
package main;

class Main {
	public static void main(String args[]) {
		System.out.println("Hola, mundo!");
	}
}
```

## La función `main`

La función `main` va precedida de las palabras clave `public static void`, que tienen el siguiente significado:
- `public`: Todo el mundo puede ejecutar esta función.
- `static`: Se puede llamar a esta función directamente.
- `void`: Esta función no devuelve nada; no saca ningún resultado.

Además, cuenta un un argumento `args[]` de tipo  `String`. Este argumento se usa, por ejemplo, para pasarle argumentos al programa a través del terminal, como se hace con otros comandos. Por ejemplo, con el comando `man`: 
```bash
# Comando: man. Sirve para ver el manual de otro comando.
# Argumento: mysql. Nombre del comando cuyo manual se quiere ver.
man mysql
```

## ¿Qué es un paquete?

Un paquete no es más que un directorio o carpeta cuyo propósito es contener archivos `.java`, que son en los que está el código fuente del programa. Como son directorios, pueden ser anidados unos dentro de otros.

> Puedes comprobar la estructura de directorios de un proyecto si utilizas el comando `tree <ruta_a_tu_proyecto>`.

# Declaración, Inicialización, Asignación de variables

Todo programa ligeramente más complejo que un _Hola, Mundo!_ va a requerir de almacenar información en forma de **variables**, espacios para almacenar datos cuyos valores podemos utilizar y, normalmente, cambiar y mutar.

**Declarar** una variable es definir su tipo y su nombre.
```java
int number;
```

**Inicializar** es darle un valor inicial a una variable. Se puede hacer durante o después de declararla, pero siempre ha de hacerse antes de utilizarla.
```java
int a = 2; // Declaración e Inicialización

int b; // Declaración
b = 2; // Inicialización
```

**Asignar** es darle un valor a una variable después de que esta haya sido inicializada.
```java
int a = 2; // Declaración e Inicialización
int b = 3; // Declaración e Inicialización

a = a + b; // Asignación
```
# Operaciones con números

## Tipos de números y operadores básicos.

Hay, principalmente, cuatro tipos de datos para representar números:
- `int`: Representa un número entero de hasta 4 bytes (del -2.147.483.648 al 2.147.483.647).
- `long`: Representa un número entero de hasta 8 bytes (del -9.223.372.036.854.775.808 a 9.223.372.036.854.775.807).
- `float`: Representa números reales, de hasta 4 bytes (hasta unos 7 decimales). Está en desuso a favor de `double`.
- `double`: Representa números reales, de hasta 8 bytes (hasta unos 15 decimales).

Se pueden ejecutar las siguientes operaciones entre datos de este tipo:
- **Suma:**  `2 + 2`.
- **Resta:** `2 - 2`.
- **Multiplicación:** `2 * 2`.
- **División:** `2 / 2`.
- **Residuo de la división:** `5 % 2`.

## Operaciones con tipos de número distintos

Toda operación entre dos números producirá un resultado con alguno de los tipos de datos mencionados anteriormente. En caso de que ambos números tengan el mismo tipo de dato, ese mismo será el tipo de dato del resultado, pero en caso contrario se aplican ciertas reglas para determinar el tipo de dato del resultado.

**Al operar con dos números con tipos diferentes, el número será de un tipo con el mismo tamaño que el tipo más grande entre los dos operandos.**
```java
int a = 2;
long b = 3;
// a + b será de tipo long.
```

**Si uno de los operandos es un número real, el resultado será un número real**
```java
int a = 2;
double b = 3.0;
// a + b será de tipo double.
```
## Problemas con las divisiones

Las divisiones tienen una serie de propiedades que no comparten con el resto de operaciones.

1. **No se puede dividir entre 0.** Parece evidente, pero que sea imposible implica que dividir entre 0 produce un error fatal en el programa que **hará que no acabe de ejecutarse**.
2. **El resultado de una división cambia según los tipos de número que la conformen.** Una división entre dos enteros tendrá como resultado un entero, sin su valor decimal. Es decir, `5 / 2` no será igual a `2.5`, sino a `2`. En caso de que se quiera hacer una división con decimales al dividir enteros, se puede convertir uno de ellos en un número real así `(double) 5 / 2` o así `5 / (double) 2`.

## Asignación con operadores

Con las variables numéricas se puede utilizar una forma abreviada de expresar una asignación de su valor actual tras aplicar una operación.
```java
int a = 2;

a += 3; // Equivale a 'a = a + (3)'
a -= 3; // Equivale a 'a = a - (3)'
a *= 3; // Equivale a 'a = a * (3)'
a /= 3; // Equivale a 'a = a / (3)'
```

## Incremento y Decremento.

Además, cuentan con los operadores `++` y `--`, que se utilizan para incrementar y decrementar en 1 el valor de la variable, respectivamente.
```java
int a = 2;

a++; // Incremento. Equivale a 'a += 1'
a--; // Decremento. Equivale a 'a -= 1'
```

Estos operadores se pueden utilizar antes o después del nombre de la variable, pero esto tendrá como consecuencia una pequeña diferencia: **El incremento se producirá antes o después de evaluar la variable**.

Por ejemplo, el siguiente código...
```java
public static void main(String args[]) {
	int a = 1;

	System.out.println("--- VALORES DE 'a' ---");
	System.out.println(a);
	System.out.println(++a); // Preincremento
	System.out.println(a);
}
```
... imprimirá como resultado `1`, `2` y `2`, porque el segundo dígito **ha sido incrementado antes de imprimirse por pantalla**.

Como contra-ejemplo, este código...
```java
public static void main(String args[]) {
	int a = 1;

	System.out.println("--- VALORES DE 'a' ---");
	System.out.println(a);
	System.out.println(a++); // Postincremento
	System.out.println(a);
}
```
... imprimirá como resultado `1`, `1` y `2`, porque **se ha cogido el valor** del segundo dígito **antes de incrementarlo**.

> Sólo será necesario tener esto en cuenta cuando vaya a evaluarse la variable, es decir, al operar con ella, asignarle su valor a otra variable o al usarla dentro de funciones/métodos. El resto del tiempo la posición del operador da igual, aunque por legibilidad generalmente se usa `a++`.

## Otras operaciones

Ciertas operaciones, como las potencias, radicales, logaritmos, etc. carecen de operadores propios. En su lugar, se utiliza el objeto `Math`, que viene con todo tipo de métodos (funciones) y valores predefinidos.

```java
double a = Math.pow(2, 5); // 2 elevado a 5
double b = Math.sqrt(25); // Raíz cuadrada de 25
long c = Math.round(20.5); // Redondea 20.5

int r = 4;
double area_esfera = Math.PI * Math.pow(r, 2); // Área de una esfera.
```

> Cabe destacar que prácticamente todos los métodos de `Math` devuelven un `double`, así que será necesario convertir su valor a un `long` o `int` si se quiere guardar en una variable que solo pueda almacenar enteros.

# Operaciones con booleanos

Los valores booleanos solo pueden representar dos valores, `true` y `false`, y sus operadores se corresponden con diferentes puertas lógicas.

## Operadores
### AND, o Y

| A     | B     | AND   |
| ----- | ----- | ----- |
| true  | true  | true  |
| true  | false | false |
| false | true  | false |
| false | false | false |

```java
boolean a = true;
boolean b = false;

boolean c = a && true; // Será 'true'
boolean d = b && true; // Será 'false'
```

### OR, u O

| A     | B     | OR    | 
| ----- | ----- | ----- |
| true  | true  | true  |
| true  | false | true  |
| false | true  | true  |
| false | false | false |

```java
boolean a = true;
boolean b = false;

boolean c = a || true; // Será 'true'
boolean d = a || false; // Será 'true'
boolean e = b || false; // Será 'false'
```

### XOR, u O Exclusivo

| A     | B     | XOR   |
| ----- | ----- | ----- |
| true  | true  | false |
| true  | false | true  |
| false | true  | true  |
| false | false | false |

```java
boolean a = true;
boolean b = false;

boolean c = a ^ true; // Será 'false'
boolean d = a ^ b; // Será 'true'
boolean e = b ^ false; // Será 'false'
```

### NOT, o Inversor

| A     | NOT   |
| ----- | ----- |
| true  | false |
| false | true  |

```java
boolean a = true;

boolean b = !a;
```

## Comparación de números

Los operadores de comparación tienen como operandos a números enteros o reales, pero dan como resultado un valor booleano.  Estos son:

- **Igual que:** `a == b`
- **Diferente de:** `a != b`
- **Mayor que:** `a > b`
- **Menor que:** `a < b`
- **Mayor o igual que:** `a >= b`
- **Menor o igual que:** `a <= b`

## Combinación de operadores

Los operadores booleanos se pueden combinar para crear nuevas puertas lógicas y validar múltiples condiciones a la vez.

Por ejemplo, no hay operador para la puerta lógica NAND (que es la inversión de la puerta lógica AND), pero podemos crear una combinando el NOT y el AND de la siguiente manera:
```java
boolean a = true;
boolean b = false;

boolean c = !(a && b);
```

O, podemos determinar si una persona es mayor de edad.
```java
int edad = 17;
boolean personaExiste = edad >= 0;
boolean personaEstaViva = edad < 120;
boolean tieneMenosDe18 = edad < 18;

// La persona solo es mayor de edad si existe, está viva y no tiene menos de 18 años.
boolean esMayorDeEdad = personaExiste && personaEstaViva && !tieneMenosDe18;
```

# Condiciones

## `if`,  `else if` y `else`

La forma más básica de expresar código condicional es con la sentencia `if`.
El bloque `if` tiene, entre paréntesis, un valor booleano llamado _condición_ y, entre claves, el código que se ejecutará si la condición es `true`.

Opcionalmente, puede ir seguido de un bloque `else if`, que tiene la misma estructura que el `if`, o de un bloque `else`, que no tiene la condición. `else if`, a su vez, puede ir seguido de otro `else if` o de un `else`. 

Los bloques `else if` solo se evaluarán si no se ha cumplido ninguna de las condiciones anteriores y el bloque `else` se ejecutará siempre que no se hayan cumplido ninguna de las condiciones.

```java
int a = -3;

if (a < 0) {
	System.out.println("Es negativo.");
} else if (a > 0) {
	System.out.println("Es positivo.");
} else {
	System.out.println("No es ni positivo ni negativo, debe ser 0.");
}
```


# Bucles

Los bucles son estructuras de control que permiten realizar acciones repetidamente mientras se cumpla una condición. 

## `while`

El bucle `while`es el tipo más básico de bucle. Consta de una condición entre paréntesis, de forma similar al `if`, y de un bloque de código que se repetirá mientras dicha condición (que se evalúa al empezar cada vuelta) sea cierta.

```java
// IMPRIMIR POR PANTALLA NÚMEROS EN EL RANGO [1, 10]

int contador = 1; // Lo usaremos para contar cuantos números imprimir.
while (contador <= 10) {
	System.out.println(contador); // Imprimir número
	
	// Aumentar el contador.
	// Si no, el bucle sería infinito porque la condición siempre sería cierta.
	contador++;
}
```

Si la condición no es cierta en ningún momento, no se ejecutará el bucle de código nunca. Por ejemplo, si en el código anterior `contador` fuese 11, no imprimiría nada.

Por otro lado, es importante tener en cuenta que si la condición es cierta y los términos que lo componen no cambian nunca, el bucle no se acabará nunca.

## `do {...} while`

El bucle `do while` es básicamente idéntico al bucle `while`,  pero la sintaxis es ligeramente diferente.

La diferencia principal es que, a diferencia del bucle `while`, la condición se comprueba después de cada vuelta, en vez de al empezar cada una. Es decir, el bloque de código dentro de un `do while` **se ejecutará siempre, por lo menos, una vez**.

```java
// IMPRIMIR POR PANTALLA NÚMEROS EN EL RANGO [1, 10]

int contador = 1; // Lo usaremos para contar cuantos números imprimir.
do {
	System.out.println(contador); // Imprimir número
	
	// Aumentar el contador.
	// Si no, el bucle sería infinito porque la condición siempre sería cierta.
	contador++;
} while (contador <= 10);
```

Este código funciona de forma idéntica a la versión con el bucle `while`, pero en caso de que el contador fuese, por ejemplo, 11, imprimiría 11. Por tanto, para este tipo de problemas, el bucle `do while` no sería una solución idónea.

El uso más común de este bucle es cuando se reciben datos de entrada del usuario  que forman parte de la condición dentro del bucle.

## `for`

El bucle `for` está pensado para problemas que requieran un número fijo de vueltas. Es algo más complejo que el resto de bucles, porque en lugar de una condición tiene una variable, una condición y una instrucción separadas por punto y coma.

Es decir, en vez de tener  este formato: 

```java
while (condición) {
	...
}
```

Tiene el siguiente:

```java
for (variable; condicón; instrucción) {
	...
}
```

***En `variable` va una declaración o asignación de variable.***

```java
for (int i = 1; condición; instrucción) {
	...
}

int i;
for (i = 1; condición; instrucción) {
	...
}
```

Si la variable es **declarada en el bucle**, solo existirá dentro del bucle, de modo que esto no sería válido:

```java
for (int i = 1; condición; instrucción) {
	System.out.println(i); // Aquí si se puede
}
System.out.println(i); // No se puede, 'i' no existe aquí
```

Por convención, se usa como contador la variable `i`, de 'iterador' (no hay un motivo especial, agradéceselo a los matemáticos). Lo ideal es seguir esta convención, pero se puede poner cualquier nombre a la variable.

***En `condición` va una condición como la del `while` o la del `if`.***

```java
for (int i = 1; i <= 10; instrucción) {
	...
}
```

***En `instrucción` va una sola línea de código.***

Generalmente la aprovecharemos para usar el incrementador (`++`) o el decrementador (`--`) para modificar la variable, pero se puede, por ejemplo, incrementar la variable de dos en dos con `i += 2`.

```java
for (int i = 1; i <= 10; i++) {
	...
}
```

Por tanto,  así se haría el ejemplo del bucle `while`:

```java
// IMPRIMIR POR PANTALLA NÚMEROS EN EL RANGO [1, 10]

for (int contador = 1; contador <= 10; contador++) {
	System.out.println(contador);
}
```

# Ámbito, o *scope*

El ámbito se define como las regiones de código en las que está disponible una variable.

Una variable tiene como ámbito el bloque de código en el que fue declarada, y todos los bloques de código dentro de este. Un bloque de código es, generalmente, todo aquello que se separe con `{ }`.

Por ejemplo, todas las variables declaradas dentro de un `if`, un `while`, un `for`, etc., no existirán fuera de estos.

```java
if (true) {
	int a = 1;
}
System.out.println(a); // 'a' no existe aquí, dará error al compilar.
```

## Más ejemplos de ámbito

```java
public class Main {
	static int a = 0; // Poneoms 'static' porque main también es 'static'
	public static void main(String[] args) {
		int b = 1;
		
		// Bloque de código anidado
		{
			int c = 2;
		}
		
		int i;
		for (i = 0; i < 10; i++) {
			System.out.println(i); // Imprimirá los números del 0 al 9.
		}
		
		if (true) {
			int d = 3;
		}
		
		System.out.println(a); // Imprimirá 0
		System.out.println(b); // Imprimirá 1
		System.out.println(i); // Imprimirá 9
		System.out.println(c); // Dará error
		System.out.println(d); // Dará error
	}
}
```
