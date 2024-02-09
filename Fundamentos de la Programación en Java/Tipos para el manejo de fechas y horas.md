---
links:
  - https://www.baeldung.com/java-8-date-time-intro
---

Java viene incluido con el paquete `java.time`, que dispone de clases para trabajar con fechas, horas y *timestamps*.

# Problemas con otras clases de fechas y horas ya existentes

Java ya cuenta con las clases `java.util.Date` y `java.util.Calendar` para gestionar fechas y horas, pero vienen con una serie de problemas asociados que las clases del nuevo paquete `java.time` tratan de arreglar.

- ***Thread Safety***. `Date` y `Calendar` son mutables y, por tanto, susceptibles a errores durante operaciones concurrentes, ya que su contenido puede cambiar mientras se lleva a cabo una de estas operaciones.
- **Diseño de la API y facilidad de uso**. `Date` y `Calendar` carecen de ciertos métodos comunmente utilizados y tienen una API que está diseñada de forma inconsistente, a diferencia de los nuevos tipos de dato.
- **Zonas horarias**. Antes se tenía que implementar lógica adicional para gestionar las zonas horarias, pero ahora están las clases `ZonedDate` y `Time` que lo gestionan de forma sencilla.

# Tipos de datos de fecha y hora principales

## LocalDate

`LocalDate` representa una fecha en formato ISO **sin la hora** (`YYYY-MM-DD`).

### Fecha actual

```java
LocalDate date = LocalDate.now();
```

### Crear fecha

```java
LocalDate date1 = LocalDate.of(year, day, month);
LocalDate date2 = LocalDate.parse("2024-01-01");
```

### Operaciones comunes

```java
LocalDate date = LocalDate.now();
LocalDate tomorrow = date.plusDays(1);
// ChronoUnit es un ENUM de unidades de tiempo.
LocalDate yesterday = date.minus(1, ChronoUnit.DAYS);
```

### Obtener información

```java
LocalDate date = LocalDate.now()
DayOfWeek dow = date.getDayOfWeek(); // DayOfWeek es un ENUM
int day = LocalDate.dayOfMonth();
boolean isLeapYear = date.isLeapYear();
```

### Comparaciones

```java
LocalDate date = LocalDate.parse("2021-06-07");
LocalDate today = LocalDate.now();

boolean isBefore = date.isBefore(today);
boolean isAfter = date.isAfter(today);
```

## LocalTime

Representa una hora en formato ISO **sin fecha**, hasta los milisegundos.

### Hora actual

```java
LocalTime now = LocalTime.now();
```

### Crear hora

```java
LocalTime time = LocalTime.of(5, 30);
LocalTime time2 = LocalTime.parse("5:30");
```

### Operaciones básicas

```java
LocalTime time = LocalTime.now().plus(1, ChronoUnit.HOURS);
time = time.minus(2, ChronoUnit.MINUTES);
```

### Obtener información

```java
LocalTime now = LocalTime.now();
int hour = now.getHour();
int minute = now.getSecond();
```

## LocalDate, LocalTime y LocalDateTime

`LocalDate` representa una fecha en formato ISO **sin la hora** (`YYYY-MM-DD`), `LocalTime` representa una hora en formato ISO **sin fecha**, hasta los milisegundos y `LocalDateTime`es una combinación de los dos anteriores.

### Hora actual

Se consigue a través del método estático `now()`, que devuelve un objeto del tipo correspondiente

```java
LocalDate currentDate = LocalDate.now();
LocalTime currentTime = LocalTime.now();
LocalDateTime currentDateTime = LocalDateTime.now();
```

### Crear fecha/hora

Hay dos métodos estáticos que permiten generar una hora concreta, `of` y `parse`. En el primero se ponen los argumentos de mayor a menor magnitud y en al segundo se le pasa un String en formato ISO.

*Crear fecha/hora con `of`*
```java
LocalDate date = LocalDate.of(2002, 12, 17);
LocalTime time = LocalTime.of(6, 30);
LocalDateTime dateTime = LocalDateTime.of(2002, 17, 12, 6, 30);
```

*Crear fecha/hora con `parse`*
```java
LocalDate date = LocalDate.of('2002-12-17');
LocalTime time = LocalTime.of('6:30');
LocalDateTime dateTime = LocalDateTime.of('2002-12-17T06:30');
```

### Sumar y restar tiempo

Los métodos para sumar van precedidas de *plus* y los métodos para restar por *minus*, pero hay dos tipos de método: los específicos para cada unidad y `plus` y `minus` que reciben una unidad como argumento.

Es decir, podemos usar métodos como `plusDays(1)` y `minusYears(2)`, o se puede usar `plus(1, ChronoUnit.DAYS)` y `minus(2, ChronoUnit.YEARS)`.

```java
LocalTime time = LocalTime.now().plus(1, ChronoUnit.HOURS);
time = time.minus(2, ChronoUnit.MINUTES);
```

### Obtener información sobre la fecha y hora

Cada uno de los tipos de dato puede sacar cierta información de la fecha y hora, como el día de la semana, el minuto exacto, la cantidad de segundos en total, etc. Aquí hay algunos ejemplos:

*`LocalDate`*
```java
LocalDate date = LocalDate.now()
DayOfWeek dow = date.getDayOfWeek(); // DayOfWeek es un ENUM
int day = LocalDate.dayOfMonth();
boolean isLeapYear = date.isLeapYear();
```

*`LocalTime`*
```java
LocalTime now = LocalTime.now();
int hour = now.getHour();
int minute = now.getSecond();
```

`LocalDateTime` puede sacar toda la información que pueden los dos anteriores.

### Comparaciones

Se pueden comparar valores de fecha/hora del mismo tipo con las funcoines `isBefore()` y `isAfter()`.

```java
LocalDate date = LocalDate.parse("2021-06-07");
LocalDate today = LocalDate.now();

boolean isBefore = date.isBefore(today);
boolean isAfter = date.isAfter(today);
```

### Formateo

Los valores del enum `DateTimeFormatter` se pueden usar junto con el método `format` para devolver Strings en un formato de fecha concreto:

```java
LocalDateTime date = LocalDateTime.now();
String str = date.format(DateTimeFormatter.ISO_DATE);
```

`DateTimeFormatter` también cuenta con métodos estáticos para formatear una fecha en base a un patrón:

```java
LocalDateTime date = LocalDateTime.now();
String str = date.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
```

## ZonedDateTime y ZoneId

`ZonedDateTime` ayuda a lidiar con fechas y horas dependientes de la zona horaria. Las zonas horarias se pueden obtener a partir de la clase `ZoneId`, utilizando el método `of`:

```java
ZoneId zoneId = ZoneId.of("Europe/Madrid");
```

Tras lo que se introducir una fecha y hora además del `ZoneId` al método `of` de `ZonedDateTime`para crear una nueva fecha y hora en esa zona horaria:

```java
ZonedDateTime.of(LocalDateTime.now(), zoneId);
```

O, alternativamente, se puede prescindir de crear el objeto `ZoneId` utilizando la función `parse` de la clase `ZonedDateTime` para crear una fecha y hora a partir de un String. Dicho String estará formado por una fecha en formato ISO, seguido de un desplazamiento horario en formato `+XX:XX`,  seguido de la zona horaria entre `[ ]`. Es decir, sería algo como:

```java
ZonedDateTime.parse("2024-02-04T16:10:00+01:00[Europe/Madrid]");
```

## Period y Duration

Estas dos clases no representan una fecha/hora, sino que representan el espacio entre dos fechas/horas. `Period` se usa para fechas y `Duration` para horas.

```java
LocalDate birthDate = LocalDate.of(2002, 12, 17);
LocalDate today = LocalDate.now();

Period until = birthDate.until(today);
Period between = Period.between(birthDate, today);
```