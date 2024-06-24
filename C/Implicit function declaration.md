---
alt: Defining a function inside another function
---

For some god forsaken reason, this is valid code as long as `atof` is in another source file compiled beforehand.

```c
int main() {
  double atof(char s[]); // function definition
  double sum = 0;
  char buffer[64];
  
  while (fgets(buffer, 64, stdin) != EOF) {
    sum += atof(buffer);
  }
}
```

Basically, if no function prototype is found, the function is defined by it's first appearance. So defining `atof` is only valid once and if and only if it has not been defined earlier in the file.

<small>Based on The C Programming Language, section 4.2</small>