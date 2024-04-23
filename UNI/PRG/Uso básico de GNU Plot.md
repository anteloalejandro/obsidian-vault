
# Crear gráfica

```bash
set xrange [0:]
set yrange [0:10]
set xtics 10
set ytics 10
set xlabel "Size"
set ylabel "Microseconds"
set key left
set grid 

plot "data.out" using 1:2 title "Best case" with points, \
     "data.out" using 1:3 title "Average case" with linespoints
```

# Exportar gráfica a PDF

```bash
set xrange [0:]
set yrange [0:10]
set xtics 10
set ytics 10
set xlabel "Size"
set ylabel "Microseconds"
set key left
set grid 

# EXPORT SETTINGS
set term pdf colour enhanced solid
set output "output.pdf"

plot "data.out" using 1:2 title "Best case" with points, \
     "data.out" using 1:3 title "Average case" with linespoints

# BACK TO THE CLI
set term wxt
```

# Ajuste de funciones a datos empíricos

Consiste en declarar una función (ej.: la función lineal $f(x)=ax+b$) y calcular el valor para las incógnitas constantes que hacen que se ajusten lo más posibles a los datos reales que tenemos.

```bash
f(x)=a*x+b
fit f(x) "linearSearch.out" using 1:3 via a,b
```

