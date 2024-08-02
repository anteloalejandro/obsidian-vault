---
tags:
  - cheatsheet
---

# Slides overview

Take a look into some basic features of **Obsidian Advanced Sliders**

---

## Blocks and custom HTML

::: block <!-- element style="width: 100%; padding-inline: 5rem;" -->
<hr>
:::

<form>
<label for="form-input" style="display: flex; gap: 1rem; align-items: center;">
<span>Your name here: </span>
<input name="form-input" id="form-input" type="text" style="padding: 0.5rem;">
</label>
</form>

---

## Code blocks

You can display code blocks, and even **highlight** lines *step by step*!

```c [3|5-12|8,11|9,10]
#include <stdio.h>

enum State { BLANK_FOUND, BLANK_NOT_FOUND };

int main() {
  short c;
  enum State state = BLANK_NOT_FOUND;
  while ((c = getchar()) != EOF) {
    if (!(state == BLANK_FOUND && c == ' ')) putchar(c);
    state = c == ' ' ? BLANK_FOUND : BLANK_NOT_FOUND;
  }
  return 0;
}
```

---

> I like offending people, because I think people who get offended should be offended.

\- Linus Torvalds

---

## Tables

| Lorem | Ipsum |
| ----- | ----- |
| Dolor | Sit   |
| Amet  |       |

---

## Math

$$
\sum\limits_{i=0}^{n-1}i = \frac{n(n+1)}{2}
$$

---

## Callouts

> [!tip] Callouts/alerts
> You can also declare callouts/alerts

---

## Images and multimedia

You can embed all sorts of files like you would in obsidian

![[Stack.excalidraw]]

---

## Animations w/ fragments 

> [!warning]
> This alert will disappear
<!-- element class=" fragment fade-out" -->

Hello! <!-- element class="fragment fade-left" data-fragment-index="1"-->

---

## Slide with bg image <!-- element style="color: black; padding: 1rem; background-color: white; border-radius: 1rem; box-shadow: 0 0 20px rgb(0, 0, 0, 0.5)" -->


<!-- slide bg="https://picsum.photos/seed/picsum/800/600" -->

---

# This slide has speaker notes

*You won't be able to see anything bellow this*

note: Anything bellow this point will only be show to the speaker, including image embeds.

```javascript
console.log('hello, world');
```

![[Stack.excalidraw]]

---

## Fragmented lists

- First point
+ Second point
+ Third point
- Fourth point
+ Fifth point
  - Sub point
---

## Vertical slides

Press down on the keyboard...

--

Good Job! ***Do it again***

--


Vertical slides can be used if you want to convey some extra information while giving the user the option to skip to the next slide whenever they want by pressing right.

---

## Charts


```chart
    type: bar
    labels: [Monday,Tuesday,Wednesday,Thursday,Friday, Saturday, Sunday, "next Week", "next Month"]
    series:
      - title: Title 1
        data: [1,2,3,4,5,6,7,8,9]
      - title: Title 2
        data: [5,4,3,2,1,0,-1,-2,-3]
```

---
# Layouts

Layouts allow you to display information however you want

%% Split %%
<split even gap="1">
![](https://picsum.photos/id/1005/250/250) 
![](https://picsum.photos/id/1010/250/250) 
![](https://picsum.photos/id/1025/250/250) 
</split>

---

## Splits

%% Split %%
<split left="2" right="1" gap="2">

**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
	
into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
</split>

---
## Splits w/ wrapping

%% Split %%
<split wrap="2" gap="1">
![](https://picsum.photos/id/1010/250/250) 
![](https://picsum.photos/id/1011/250/250) 
![](https://picsum.photos/id/1012/250/250) 
![](https://picsum.photos/id/1013/250/250) 
![](https://picsum.photos/id/1014/250/250) 
![](https://picsum.photos/id/1015/250/250) 
</split>
