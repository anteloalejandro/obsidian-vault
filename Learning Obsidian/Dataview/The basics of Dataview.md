---
public: true
links:
  - Whttps://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/Community+Talks/YT+-+An+Introduction+to+Dataview"
  - https://blacksmithgu.github.io/obsidian-dataview/resources/examples/
author: Alejandro Antelo
tags:
  - cheatsheet
---

# Broad intro to Dataview
A way to treat your Obsidian vault as a Database to query data from.

# Metadata
***Data about data***, which can either be *inherent* of your data of information you **add manually**.

Examples include the date or location in which you took a photo.

## YAML metadata
In markdown notes, you can add metadata using the frontmatter, uses the YAML format.
The frontmatter is located at the beginning of the document and its delitimited by `---` *(see the top of this document)*.

*YAML snippet*
```yaml
public: true
title: Part 1
author: Alejandro Antelo
inline_list: [1, 2, 3]
indented_list:
  - 1
  - 2
  - 3
```

YAML supports booleans, integers, floats, strings, dates and lists with multiple data types. It also supports links in the same format Obsidian uses, wikilnks.

Dates support the ISO format, they can also be `YYYY-MM-DD`.

### File aliases
You can specify a set of aliases in the frontmatter as a list (must be a list, even if it's only one alias). This can be useful when querying data, as the filename will always be displayed fully even if it's long.

```yaml
aliases: [Doggo, Woofer, Yapper]
```

## Implicit metadata
Files also have the following metadata by default.

| Property | Description | Type |
| ---- | ---- | ---- |
| `file.name` | File title | `string` |
| `file.path` | Full file path | `string` |
| `file.folder` | File path withot the file name | `string` |
| `file.ext` | The file extension, usually `md` | `string` |
| `file.link` | Link to the file | `link` |
| `file.size` | Size of the file in bytes | `number` |
| `file.ctime` | Date and time of creation | `date` |
| `file.cday` | Date of creation | `date` |
| `file.mtime` | Date and time of the last modification | `date` |
| `file.mday` | Date of the last modification | `date` |
| `file.mday` | Date on the note title (if the title has a date, null if it does not) | `date` |
| `file.tags` | An array of all the tags in the file, frontmatter or otherwhise | `list` |
| `file.etags` | An array of all the tags in the file, frontmatter or otherwhise, without breaking them into subtags | `list` |
| `file.inlinks` | List of all links to this file | `list` |
| `file.outlinks` | List of all links in this file | `list` |
| `file.tasks` | List of all the tasks in this file | `list` |
| `file.lists` | List of all lists (`ul`, `ol` and tasks) in this file | `list` |
| `file.starred` | `true` if the file has been bookmarked, `false` otherwhise | `boolean` |

### About tags
Tags on `file.tags` can be composed of subtags, like `#Tag/1/A`, in which case they will be separated into an array (regex match style) when querying the tags with `file.tags`, like `[#Tag, #Tag/1, #Tag/1/A]`. As an alternative, `file.etags` (*explicit* tags) shows the entire tag without dividing it.

### The `this` object
The `this` object is always accessible when making a query, and refers to the file from which the query is being made. You can access any of its fields, like `this.<field>` or `this.file.<field>`.

## Inline metadata
Metadata can also be embedded in the body of the document with a `[Key:: Value]` syntax, like so:

- Metadata can [Basic field:: foo] be inserted in the middle of sentence
- It can also have formatting: [**Bold field**:: bar]

### Fields on tasks
The only way to annotate a task with metadata is through inline metadata. For example, if we have:

- [ ] Check emails [due:: 2024-02-01T10:30]
- [ ] Finish work [due:: 2024-02-01T22:10]
- [ ] Work on personal projects

We can make queries on the metadata of the task:
```dataview
TABLE file.tasks.text, file.tasks.due WHERE file.name = this.file.name
```

# Dataview Queries
Dataview has it's own query language called DSL, or Dataview Query Language. It's very similar to SQL and share most of its syntax, clauses and functions, with the main differences being:
- There is no `SELECT`, instead we have [[#List|`LIST`]] for unordenated lists and [[#Table|`TABLE`]] for tables.
- [[#Joining sources]] is made with the `or`, `and` and `-` operands.
- Groupings won't show file metadata unless referring to the group's properties with `row.<field>`.
## List

Displays the results of a query as a list, each item preceded by a link to the file whose filed are being queried.

If the query result is an array,  it will be displayed as a nested list.

*Basic syntax*
```
LIST [ [<field>, ...] ]
[FROM { "path/to/folder" | #tag | [[link to this note]] | outgoing([[links from this note]]) }]
```

### Joining sources
You can query data from more than one source by using the `and` or `or` operators:
- `list from #A and "folder"`
- `list from "folder" or [[link]]`
The `-` operator can be used to remove elements, like `list from #A - #B`.

### String concatenation
The `+` operator can be used to concatenate strings.
```
list "File Path: " + file.path
```

### Query example
```
LIST [
  "File Path: " + file.path,
  "Created At: " + file.ctime
]
FROM ("UNI" and #java) or "Fundamentos de la Programación en Java"
```
## Task
Searches for checkboxes (`-[ ]` or `-[x]`) in the vault, and returns an interactive list of tasks.

*Basic syntax*
```
TASK [FROM "path/to/file-or-folder"]
```
### Query example

```
task from "Tasks"
```
## Where
The `WHERE` clause can be used in any query to narrow the results.
It works just like how it does in SQL.

*Basic syntax*
```
{query} WHERE {condition}
```

### Look fields or absence of fields in the frontmatter
```
{query} WHERE {<field> | !<field>}
```

### Query example
```
LIST file.tags
WHERE length(file.tags) > 0
```
```
LIST FROM "UNI"
WHERE file.mtime >= date(today) - dur(1 day)
```

## Table
Makes a table with the specified fields as columns. There will always be a column at the start for the file link.

*Basic syntax*
```
TABLE [<field> [AS <alias>], ...] FROM ...
```

### Query example

```
TABLE file.ctime AS "Created At", file.mtime AS "Last Modified At", file.tags AS "Tags"
FROM -#excalidraw
WHERE length(file.tags) > 0
```


## Sort
The `SORT` clause allows you to sort the results of a query. The fields you sort by don't need to be in the query.

*Basic syntax*
```
{query} SORT {<field> {asc | desc}, ...}
```

### Query example
```
LIST FROM #excalidraw SORT file.mtime desc
```
## Flatten
Can be used to *unroll*  lists inside the specified fields of a table so they al get their own rows.

*Basic syntax*
```
{query} FLATTEN {<field>, ...}
```

### Query example
```
TABLE file.path, file.tags WHERE length(file.tags) > 0 FLATTEN file.tags
```

## Group by
Let's you group the results of a query based on the value of a field.
You can, for example:
- Group tasks by `completed`
- Group games by `rating`
- Group assignments by `intensity`

*Basic syntax*
```
{query} GROUP BY {<field>}
```

Just grouping won't show the grouped rows by itself, though. We need to make use of the `rows` Object.

### The `rows` Object
This object is created when we group notes. In contains a lists with nested lists (the rows), which contain the references to the grouped notes.

In order to display the inherent properties of the grouped files, we must use `rows.file.<property>`, instead of `file.<property>`.

We can also get a list with the manually inserted metadata of every file within a group with `rows.<property>`.

### Query example
```
TABLE rows.file.name AS "Filename" GROUP BY file.tags
```
