
# Entregas

```dataview
table rows.file.link as documento, due as fecha from "UNI" where due group by file.folder as directorio
```

# Por hacer

```dataview
table rows.file.link as documento from "UNI" where todo group by file.folder as directorio
```
