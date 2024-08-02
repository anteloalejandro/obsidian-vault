En `astroblog`, commit ...

`changeHandler` no se ejecuta en el input en cuando se ejecuta la función `requestSubmit()` del formulario.

Pasar `input` como argumento a `requestSubmit` suelta un error, pero funciona siempre y cuando sólo haya un elemento seleccionado.

Añadir un `<button type="submit"></button>` hace que funcione sin importar, pero solo si no se pasa como argumento (tiene que dar error).