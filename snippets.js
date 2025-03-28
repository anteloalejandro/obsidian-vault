[
  // Code block
  { trigger: "ci", replacement: "`$0`$1", options: "t" },
  { trigger: /ci-(\w*?)/, replacement: "`{[[0]]} $0`$1", options: "rt" },
  { trigger: "cc", replacement: "```$0\n$1\n```", options: "tw" },
  // Math mode
  { trigger: "mi", replacement: "$$0$$1", options: "t" },
  { trigger: "mm", replacement: "$$\n$0\n$$", options: "tw" },
  { trigger: "beg", replacement: "\\begin{$0}\n$1\n\\end{$0}", options: "mA" },
  // HTML tags
  { trigger: "small", replacement: "<small>$0</small>$1", options: "t" },
  { trigger: "big", replacement: "<big>$0</big>$1", options: "t" },
  { trigger: "u", replacement: "<u>$0</u>$1", options: "t" },
  { trigger: "em", replacement: "<em>$0</em>$1", options: "t" },
  { trigger: "strong", replacement: "<strong>$0</strong>$1", options: "t" },
  { trigger: "ul", replacement: "<ul>\n$0\n</ul>", options: "tw" },
  { trigger: "ol", replacement: "<ol>\n$0\n</ol>", options: "tw" },
  { trigger: "li", replacement: "<li>$0</li>$1", options: "t" },
  { trigger: "grid", replacement: "<div class='note-grid'>\n<div class='note-grid-row'>\n$0\n</div>\n</div>", options: "tw" },
  { trigger: "row", replacement: "<div class='note-grid-row'>\n$0\n</div>", options: "tw" },
  { trigger: /col-(\w*?)/, replacement: "<div class='note-grid-col note-grid-col-[[0]]'>$0</div>$1", options: "rt" },
  { trigger: /col/, replacement: "<div class='note-grid-col note-grid-col-md'>$0</div>$1", options: "rt" },
  { trigger: "left", replacement: "<p style='text-align: left'>\n$0\n</p>$1", options: "tw" },
  { trigger: "right", replacement: "<p style='text-align: right'>\n$0\n</p>$1", options: "tw" },
  { trigger: "center", replacement: "<p style='text-align: center'>\n$0\n</p>$1", options: "tw" },
  { trigger: "div", replacement: "<div>$0</div>$1", options: "t" },

  // spaces
  { trigger: "   ", replacement: " \\quad ", options: "mA" },
  { trigger: ",  ", replacement: ", \\quad ", options: "mA" },
  { trigger: ",,", replacement: "\\,", options: "mA" },

  // Dashes
  // {trigger: "--", replacement: "–", options: "tA"},
  // {trigger: "–-", replacement: "—", options: "tA"},
  // {trigger: "—-", replacement: "---", options: "tA"},

  // Greek letters
  { trigger: "@a", replacement: "\\alpha", options: "mA" },
  { trigger: "@b", replacement: "\\beta", options: "mA" },
  { trigger: "@g", replacement: "\\gamma", options: "mA" },
  { trigger: "@G", replacement: "\\Gamma", options: "mA" },
  { trigger: "@d", replacement: "\\delta", options: "mA" },
  { trigger: "@D", replacement: "\\Delta", options: "mA" },
  { trigger: "@e", replacement: "\\epsilon", options: "mA" },
  { trigger: ":e", replacement: "\\varepsilon", options: "mA" },
  { trigger: "@z", replacement: "\\zeta", options: "mA" },
  { trigger: "@t", replacement: "\\theta", options: "mA" },
  { trigger: "@T", replacement: "\\Theta", options: "mA" },
  { trigger: ":t", replacement: "\\vartheta", options: "mA" },
  { trigger: "@i", replacement: "\\iota", options: "mA" },
  { trigger: "@k", replacement: "\\kappa", options: "mA" },
  { trigger: "@l", replacement: "\\lambda", options: "mA" },
  { trigger: "@L", replacement: "\\Lambda", options: "mA" },
  { trigger: "@s", replacement: "\\sigma", options: "mA" },
  { trigger: "@S", replacement: "\\Sigma", options: "mA" },
  { trigger: "@u", replacement: "\\upsilon", options: "mA" },
  { trigger: "@U", replacement: "\\Upsilon", options: "mA" },
  { trigger: "@o", replacement: "\\omega", options: "mA" },
  { trigger: "@O", replacement: "\\Omega", options: "mA" },

  { trigger: "ups", replacement: "\\upsilon", options: "mA" },
  { trigger: "Ups", replacement: "\\Upsilon", options: "mA" },

  { trigger: "([^\\\\])(${GREEK})", replacement: "[[0]]\$\\[[1]]\$", options: "rt", description: "Add backslash before Greek letters" },

  // Text environment
  { trigger: "text", replacement: "\\text{$0}$1", options: "mA" },
  { trigger: "\"", replacement: "\\text{$0}$1", options: "mA" },

  // Basic operations
  { trigger: "sr", replacement: "^{2}", options: "mA" },
  { trigger: "cb", replacement: "^{3}", options: "mA" },
  { trigger: "rd", replacement: "^{$0}$1", options: "mA" },
  { trigger: "_", replacement: "_{$0}$1", options: "mA" },
  { trigger: "sts", replacement: "_\\text{$0}", options: "mA" },
  { trigger: "sq", replacement: "\\sqrt{ $0 }$1", options: "mA" },
  { trigger: "//", replacement: "\\frac{$0}{$1}$2", options: "mA" },
  { trigger: "ee", replacement: "e^{ $0 }$1", options: "mA" },
  { trigger: "inv", replacement: "^{-1}", options: "mA" },
  { trigger: /([A-Za-z])(\d)/, replacement: "[[0]]_{[[1]]}", options: "rmA", description: "Auto letter subscript", priority: -1 },

  { trigger: /([^\\])(exp|log|ln)/, replacement: "[[0]]\\[[1]]", options: "rmA" },
  { trigger: "conj", replacement: "^{*}", options: "mA" },
  { trigger: "Re", replacement: "\\mathrm{Re}", options: "mA" },
  { trigger: "Im", replacement: "\\mathrm{Im}", options: "mA" },
  { trigger: "bf", replacement: "\\mathbf{$0}", options: "mA" },
  { trigger: "rm", replacement: "\\mathrm{$0}$1", options: "mA" },

  // Linear algebra
  { trigger: /([^\\])(det)/, replacement: "[[0]]\\[[1]]", options: "rmA" },
  { trigger: "trace", replacement: "\\mathrm{Tr}", options: "mA" },

  // More operations
  { trigger: "([a-zA-Z])hat", replacement: "\\hat{[[0]]}", options: "rmA" },
  { trigger: "([a-zA-Z])bar", replacement: "\\bar{[[0]]}", options: "rmA" },
  { trigger: "([a-zA-Z])dot", replacement: "\\dot{[[0]]}", options: "rmA", priority: -1 },
  { trigger: "([a-zA-Z])ddot", replacement: "\\ddot{[[0]]}", options: "rmA", priority: 1 },
  { trigger: "([a-zA-Z])tilde", replacement: "\\tilde{[[0]]}", options: "rmA" },
  { trigger: "([a-zA-Z])und", replacement: "\\underline{[[0]]}", options: "rmA" },
  { trigger: "([a-zA-Z])vec", replacement: "\\vec{[[0]]}", options: "rmA" },
  { trigger: "([a-zA-Z]),\\.", replacement: "\\mathbf{[[0]]}", options: "rmA" },
  { trigger: "([a-zA-Z])\\.,", replacement: "\\mathbf{[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK}),\\.", replacement: "\\boldsymbol{\\[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK})\\.,", replacement: "\\boldsymbol{\\[[0]]}", options: "rmA" },

  { trigger: "hat", replacement: "\\hat{$0}$1", options: "mA" },
  { trigger: "bar", replacement: "\\bar{$0}$1", options: "mA" },
  { trigger: "dot", replacement: "\\dot{$0}$1", options: "mA", priority: -1 },
  { trigger: "ddot", replacement: "\\ddot{$0}$1", options: "mA" },
  { trigger: "cdot", replacement: "\\cdot", options: "mA" },
  { trigger: "tilde", replacement: "\\tilde{$0}$1", options: "mA" },
  { trigger: "und", replacement: "\\underline{$0}$1", options: "mA" },
  { trigger: "over", replacement: "\\overline{$0}$1", options: "mA" },
  { trigger: "vec", replacement: "\\vec{$0}$1", options: "mA" },

  // pretty i and j
  { trigger: "ihat", replacement: "\\hat{\\imath}$0", options: "mA", priority: 1 },
  { trigger: "jhat", replacement: "\\hat{\\jmath}$0", options: "mA", priority: 1 },
  { trigger: "ivec", replacement: "\\vec{\\imath}$0", options: "mA", priority: 1 },
  { trigger: "jvec", replacement: "\\vec{\\jmath}$0", options: "mA", priority: 1 },
  { trigger: "ibar", replacement: "\\bar{\\imath}$0", options: "mA", priority: 1 },
  { trigger: "jbar", replacement: "\\bar{\\jmath}$0", options: "mA", priority: 1 },

  // More auto letter subscript
  { trigger: /([A-Za-z])_(\d\d)/, replacement: "[[0]]_{[[1]]}", options: "rmA" },
  { trigger: /\\hat{([A-Za-z])}(\d)/, replacement: "\\hat{[[0]]}_{[[1]]}", options: "rmA" },
  { trigger: /\\vec{([A-Za-z])}(\d)/, replacement: "\\vec{[[0]]}_{[[1]]}", options: "rmA" },
  { trigger: /\\mathbf{([A-Za-z])}(\d)/, replacement: "\\mathbf{[[0]]}_{[[1]]}", options: "rmA" },
  { trigger: /([A-Za-z])ii/, replacement: "[[0]]_{i}", options: "rmA" },
  { trigger: /([A-Za-z])jj /, replacement: "[[0]]_{j}", options: "rmA" },
  { trigger: /([A-Za-z])kk /, replacement: "[[0]]_{k}", options: "rmA" },

  // Symbols
  { trigger: "ooo", replacement: "\\infty", options: "mA" },
  { trigger: "sum", replacement: "\\sum", options: "mA" },
  { trigger: "prod", replacement: "\\prod", options: "mA" },
  { trigger: "\\sum", replacement: "\\sum_{${0:i}=${1:1}}^{${2:N}} $3", options: "m" },
  { trigger: "\\prod", replacement: "\\prod_{${0:i}=${1:1}}^{${2:N}} $3", options: "m" },
  { trigger: "lim", replacement: "\\lim_{ ${0:n} \\to ${1:\\infty} } $2", options: "mA" },
  { trigger: "+-", replacement: "\\pm", options: "mA" },
  { trigger: "-+", replacement: "\\mp", options: "mA" },
  { trigger: "...", replacement: "\\dots", options: "mA" },
  { trigger: "xx", replacement: "\\times", options: "mA" },
  { trigger: "**", replacement: "\\cdot", options: "mA" },
  { trigger: "para", replacement: "\\parallel", options: "mA" },

  { trigger: "===", replacement: "\\equiv", options: "mA" },
  { trigger: "!=", replacement: "\\neq", options: "mA" },
  { trigger: ">=", replacement: "\\geq", options: "mA" },
  { trigger: "<=", replacement: "\\leq", options: "mA" },
  { trigger: ">>", replacement: "\\gg", options: "mA" },
  { trigger: "<<", replacement: "\\ll", options: "mA" },
  { trigger: "simm", replacement: "\\sim", options: "mA" },
  { trigger: "sim=", replacement: "\\simeq", options: "mA" },
  { trigger: "propto", replacement: "\\propto", options: "mA" },


  { trigger: "<->", replacement: "\\leftrightarrow ", options: "mA" },
  { trigger: "->", replacement: "\\to", options: "mA" },
  { trigger: "!>", replacement: "\\mapsto", options: "mA" },
  { trigger: "mapsto", replacement: "\\mapsto", options: "mA" },
  { trigger: "=>", replacement: "\\implies", options: "mA" },
  { trigger: "=<", replacement: "\\impliedby", options: "mA" },
  { trigger: "darr", replacement: "\\Downarrow", options: "mA" },
  { trigger: "larr", replacement: "\\Leftarrow", options: "mA" },
  { trigger: "uarr", replacement: "\\Uparrow", options: "mA" },
  { trigger: "rarr", replacement: "\\Rightarrow", options: "mA" },
  { trigger: "dash", replacement: "\\textendash", options: "mA" },

  { trigger: "and", replacement: "\\cap", options: "mA" },
  { trigger: "cap", replacement: "\\cap", options: "mA" },
  { trigger: "And", replacement: "\\bigcap", options: "mA" },
  { trigger: "\\bigcap", replacement: "\\bigcap_{${0:i}=${1:1}}^{${2:N}}", options: "m" },
  { trigger: "orr", replacement: "\\cup", options: "mA" },
  { trigger: "cup", replacement: "\\cup", options: "mA" },
  { trigger: "Orr", replacement: "\\bigcup", options: "mA" },
  { trigger: "\\bigcup", replacement: "\\bigcup_{${0:i}=${1:1}}^{${2:N}}", options: "m" },
  { trigger: "inn", replacement: "\\in", options: "mA" },
  { trigger: "notin", replacement: "\\not\\in", options: "mA" },
  { trigger: "\\\\\\", replacement: "\\setminus", options: "mA" },
  { trigger: "sub=", replacement: "\\subseteq", options: "mA" },
  { trigger: "sup=", replacement: "\\supseteq", options: "mA" },
  { trigger: "eset", replacement: "\\emptyset", options: "mA" },
  { trigger: "set", replacement: "\\{ $0 \\}$1", options: "mA" },
  { trigger: "e\\xi sts", replacement: "\\exists", options: "mA", priority: 1 },

  { trigger: "LL", replacement: "\\mathcal{L}", options: "mA" },
  { trigger: "HH", replacement: "\\mathcal{H}", options: "mA" },
  { trigger: "CC", replacement: "\\mathbb{C}", options: "mA" },
  { trigger: "RR", replacement: "\\mathbb{R}", options: "mA" },
  { trigger: "ZZ", replacement: "\\mathbb{Z}", options: "mA" },
  { trigger: "NN", replacement: "\\mathbb{N}", options: "mA" },

  // Handle spaces and backslashes

  // Snippet variables can be used as shortcuts when writing snippets.
  // For example, ${GREEK} below is shorthand for "alpha|beta|gamma|Gamma|delta|..."
  // You can edit snippet variables under the Advanced snippet settings section.

  { trigger: "([^\\\\])(${GREEK})", replacement: "[[0]]\\[[1]]", options: "rmA", description: "Add backslash before Greek letters" },
  { trigger: "([^\\\\])(${SYMBOL})", replacement: "[[0]]\\[[1]]", options: "rmA", description: "Add backslash before symbols" },
  { trigger: "cancel", replacement: "\\cancel{ $0 }", options: "mA" },
  { trigger: "cancto", replacement: "\\cancelto{ $0 }{ $1 }", options: "mA" },

  // Insert space after Greek letters and symbols
  { trigger: "\\\\(${GREEK}|${SYMBOL}|${MORE_SYMBOLS})([A-Za-z])", replacement: "\\[[0]] [[1]]", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) sr", replacement: "\\[[0]]^{2}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) cb", replacement: "\\[[0]]^{3}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) rd", replacement: "\\[[0]]^{$0}$1", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) hat", replacement: "\\hat{\\[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) dot", replacement: "\\dot{\\[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) bar", replacement: "\\bar{\\[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) vec", replacement: "\\vec{\\[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) tilde", replacement: "\\tilde{\\[[0]]}", options: "rmA" },
  { trigger: "\\\\(${GREEK}|${SYMBOL}) und", replacement: "\\underline{\\[[0]]}", options: "rmA" },


  // Derivatives and integrals
  { trigger: "pa", replacement: "\\frac{ \\partial ${0:y} }{ \\partial ${1:x} } $2", options: "m" },
  { trigger: "dd", replacement: "\\frac{ d ${0:y} }{ d ${1:x} } $2", options: "m" },
  { trigger: /pa([A-Za-z])([A-Za-z])/, replacement: "\\frac{ \\partial [[0]] }{ \\partial [[1]] } ", options: "rm" },
  { trigger: /dd([A-Za-z])([A-Za-z])/, replacement: "\\frac{ d[[0]] }{ d[[1]] } ", options: "rm" },
  { trigger: /dd([A-Za-z])/, replacement: "\\frac{ d }{ d[[0]] } ", options: "rm" },

  { trigger: /([^\\])int/, replacement: "[[0]]\\int", options: "mA", priority: -1 },
  { trigger: "\\int", replacement: "\\int $0 \\, d${1:x} $2", options: "m" },
  { trigger: "dint", replacement: "\\int_{${0:A}}^{${1:B}} $2 \\, d${3:x} $4", options: "mA" },
  { trigger: "oint", replacement: "\\oint", options: "mA" },
  { trigger: "iint", replacement: "\\iint", options: "mA" },
  { trigger: "iiint", replacement: "\\iiint", options: "mA" },
  { trigger: "oinf", replacement: "\\int_{0}^{\\infty} $0 \\, d${1:x} $2", options: "mA" },
  { trigger: "infi", replacement: "\\int_{-\\infty}^{\\infty} $0 \\, d${1:x} $2", options: "mA" },


  // Trigonometry
  { trigger: /([^\\])(arcsin|sin|arccos|cos|arctan|tan|csc|sec|cot)/, replacement: "[[0]]\\[[1]]", options: "rmA", description: "Add backslash before trig funcs" },

  {
    trigger: /\\(arcsin|sin|arccos|cos|arctan|tan|csc|sec|cot)([A-Za-gi-z])/,
    replacement: "\\[[0]] [[1]]", options: "rmA",
    description: "Add space after trig funcs. Skips letter h to allow sinh, cosh, etc."
  },

  {
    trigger: /\\(sinh|cosh|tanh|coth)([A-Za-z])/,
    replacement: "\\[[0]] [[1]]", options: "rmA",
    description: "Add space after hyperbolic trig funcs"
  },


  // Visual operations
  { trigger: "U", replacement: "\\underbrace{ ${VISUAL} }_{ $0 }", options: "mA" },
  { trigger: "O", replacement: "\\overbrace{ ${VISUAL} }^{ $0 }", options: "mA" },
  { trigger: "B", replacement: "\\underset{ $0 }{ ${VISUAL} }", options: "mA" },
  { trigger: "C", replacement: "\\cancel{ ${VISUAL} }", options: "mA" },
  { trigger: "K", replacement: "\\cancelto{ $0 }{ ${VISUAL} }", options: "mA" },
  { trigger: "S", replacement: "\\sqrt{ ${VISUAL} }", options: "mA" },


  // Physics
  { trigger: "kbt", replacement: "k_{B}T", options: "mA" },
  { trigger: "msun", replacement: "M_{\\odot}", options: "mA" },

  // Quantum mechanics
  { trigger: "dag", replacement: "^{\\dagger}", options: "mA" },
  { trigger: "o+", replacement: "\\oplus ", options: "mA" },
  { trigger: "ox", replacement: "\\otimes ", options: "mA" },
  { trigger: "bra", replacement: "\\braket{ $0 | $1 } $2", options: "mA" },
  { trigger: "outer", replacement: "\\ket{${0:\\psi}} \\bra{${0:\\psi}} $1", options: "mA" },

  // Chemistry
  { trigger: "puu", replacement: "\\pu{ $0 }", options: "mA" },
  { trigger: "cee", replacement: "\\ce{ $0 }", options: "mA" },

  // Environments
  { trigger: "pmat", replacement: "\\begin{pmatrix}\n$0\n\\end{pmatrix}", options: "MA" },
  { trigger: "bmat", replacement: "\\begin{bmatrix}\n$0\n\\end{bmatrix}", options: "MA" },
  { trigger: "Bmat", replacement: "\\begin{Bmatrix}\n$0\n\\end{Bmatrix}", options: "MA" },
  { trigger: "vmat", replacement: "\\begin{vmatrix}\n$0\n\\end{vmatrix}", options: "MA" },
  { trigger: "Vmat", replacement: "\\begin{Vmatrix}\n$0\n\\end{Vmatrix}", options: "MA" },
  { trigger: "matrix", replacement: "\\begin{matrix}\n$0\n\\end{matrix}", options: "MA" },

  { trigger: "pmat", replacement: "\\begin{pmatrix}$0\\end{pmatrix}", options: "nA" },
  { trigger: "bmat", replacement: "\\begin{bmatrix}$0\\end{bmatrix}", options: "nA" },
  { trigger: "Bmat", replacement: "\\begin{Bmatrix}$0\\end{Bmatrix}", options: "nA" },
  { trigger: "vmat", replacement: "\\begin{vmatrix}$0\\end{vmatrix}", options: "nA" },
  { trigger: "Vmat", replacement: "\\begin{Vmatrix}$0\\end{Vmatrix}", options: "nA" },
  { trigger: "matrix", replacement: "\\begin{matrix}$0\\end{matrix}", options: "nA" },

  { trigger: "cases", replacement: "\\begin{cases}\n$0\n\\end{cases}", options: "mA" },
  { trigger: "align", replacement: "\\begin{align}\n$0\n\\end{align}", options: "mA" },
  { trigger: "gather", replacement: "\\begin{gather}\n$0\n\\end{gather}", options: "mA" },
  { trigger: "array", replacement: "\\begin{array}\n$0\n\\end{array}", options: "mA" },


  // Brackets
  { trigger: "avg", replacement: "\\langle $0 \\rangle $1", options: "mA" },
  { trigger: "norm", replacement: "\\lvert $0 \\rvert $1", options: "mA", priority: 1 },
  { trigger: "Norm", replacement: "\\lVert $0 \\rVert $1", options: "mA", priority: 1 },
  { trigger: "ceil", replacement: "\\lceil $0 \\rceil $1", options: "mA" },
  { trigger: "floor", replacement: "\\lfloor $0 \\rfloor $1", options: "mA" },
  { trigger: "mod", replacement: "|$0|$1", options: "mA" },
  { trigger: "(", replacement: "(${VISUAL})", options: "mA" },
  { trigger: "[", replacement: "[${VISUAL}]", options: "mA" },
  { trigger: "{", replacement: "{${VISUAL}}", options: "mA" },
  { trigger: "(", replacement: "($0)$1", options: "mA" },
  { trigger: "{", replacement: "{$0}$1", options: "mA" },
  { trigger: "[", replacement: "[$0]$1", options: "mA" },
  { trigger: "lr(", replacement: "\\left( $0 \\right) $1", options: "mA" },
  { trigger: "lr{", replacement: "\\left\\{ $0 \\right\\} $1", options: "mA" },
  { trigger: "lr[", replacement: "\\left[ $0 \\right] $1", options: "mA" },
  { trigger: "lr|", replacement: "\\left| $0 \\right|$1", options: "mA" },
  { trigger: "lra", replacement: "\\left< $0 \\right> $1", options: "mA" },
  { trigger: "lrm", replacement: "\\left| $0 \\right|$1", options: "mA" },


  // Misc

  // Automatically convert standalone letters in text to math (except a, A, I).
  // (Un-comment to enable)
  // {trigger: /([^'])\b([B-HJ-Zb-z])\b([\n\s.,?!:'])/, replacement: "[[0]]$[[1]]$[[2]]", options: "tA"},

  // Automatically convert Greek letters in text to math.
  // {trigger: "(${GREEK})([\\n\\s.,?!:'])", replacement: "$\\[[0]]$[[1]]", options: "rtAw"},

  // Automatically convert text of the form "x=2" and "x=n+1" to math.
  // {trigger: /([A-Za-z]=\d+)([\n\s.,?!:'])/, replacement: "$[[0]]$[[1]]", options: "rtAw"},
  // {trigger: /([A-Za-z]=[A-Za-z][+-]\d+)([\n\s.,?!:'])/, replacement: "$[[0]]$[[1]]", options: "tAw"},


  // Snippet replacements can have placeholders.
  { trigger: "tayl", replacement: "${0:f}(${1:x} + ${2:h}) = ${0:f}(${1:x}) + ${0:f}'(${1:x})${2:h} + ${0:f}''(${1:x}) \\frac{${2:h}^{2}}{2!} + \\dots$3", options: "m", description: "Taylor expansion" },
  {trigger: "seried", replacement: "${0:x}_{1} ${1:+} ${0:x}_{2} ${1:+} \\dots ${1:+} ${0:x}_{n}", options: "m"},

  // Snippet replacements can also be JavaScript functions.
  // See the documentation for more information.
  { trigger: /series_\{(\d+)\}/, replacement: (match) => {
    const n = match[1];
    const arr = [];
    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }

    const output = arr.map(el => "${0:x}_{" + el + "}").join("${1:+}");
    return output;
  }, options: "m", description: "Series starting from 1" },
  { trigger: /seriez_\{(\d+)\}/, replacement: (match) => {
    const n = match[1];
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }

    const output = arr.map(el => "${0:x}_{" + el + "}").join("${1:+}");
    return output;
  }, options: "m", description: "Series starting from 1" },
  {
    trigger: /iden_\{(\d+)\}/, replacement: (match) => {
      const n = match[1];

      let arr = [];
      for (let j = 0; j < n; j++) {
        arr[j] = [];
        for (let i = 0; i < n; i++) {
          arr[j][i] = (i === j) ? "${1:n}" : 0;
        }
      }

      let output = arr.map(el => el.join(" & ")).join(" \\\\\n");
      output = `\\begin{pmatrix}\n${output}\n\\end{pmatrix}`;
      return output;
    }, options: "m", description: "N x N identity matrix"
  },
  {
    trigger: /table_(\d+)_(\d+)/, replacement: (match) => {
      const rows = match[1];
      const cols = match[2];

      let arr = [];
      for (let i = 0; i <= rows; i++) {
        arr[i] = [];
        for (let j = 0; j < cols; j++) {
          arr[i][j] = i == 1 ? " --- " : "     ";
        }
      }

      return arr.map(r => '|' + r.join('|')).join('|\n') + '|';

    }, options: "t", description: "N x N markdown table"
  },
]
