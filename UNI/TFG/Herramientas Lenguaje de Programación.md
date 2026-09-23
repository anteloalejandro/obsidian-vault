
Desarrollo las herramientas básicas que necesita un lenguaje de programación para ajustarse al estándar a actual y mejorar su adopción:

- LSP
- Formatter/Linter
- Syntax Highlighting (TreeSitter)
- Debugger

Esto es importante para el uso ergonómico de nuevos lenguajes y DSLs[^3].

La idea es hacer estas herramientas para un lenguaje como Lox, de ámbito generalmente reducido, pero suficientemente complejo como para que valga la pena.

¿Hacer un debugger probablemente implica ya crear alguna especie de runtime? Sí es así, puede facilitar crear un LSP o incluso un Linter (el Formatter no tendría que ver aquí).

Python tiene un debugger integrado (`pdb`) que permite establecer breakpoints directamente en el lenguaje.[^1][^2]

En el caso de Lox quizás haya que leer bytecode en su lugar y hacer que el usuario nos dé el ejecutable de un compilador/interprete del lenguaje. Leer errores de un compilador también puede funcionar para los errores Léxicos/Sintácticos/Semánticos, parecido a como funciona `clangd`, pero no nos puede dar casi nada de la información que quiere el LSP (tipos, símbolos, etcétera). 

Quizás merezca la pena preguntarse lo siguiente, que aunque no atañe a Lox sí importaría para lenguajes "reales" que vean desarrollo más allá de la v1.0: Si el debugger se basa en el bytecode, ¿qué sucede si un cambio de versión cambia el bytecode de alguna estructura? ¿se podrían usar otros compiladores / intérpretes del lenguaje sin problemas?.

[^1]: https://www.debuggingbook.org/html/Tracer.html

[^2]: https://philipphagenlocher.de/post/hooking-into-python-programs/

[^3]: DSL: *Domain-Specific Language*. En lugar de ser un lenguaje de propósito general, está limitado a un ámbito concreto. No tiene por qué ser un lenguaje de programación, pero algunos lo son. Ejemplos: QML, RegEx, SQL, CSS, ...
