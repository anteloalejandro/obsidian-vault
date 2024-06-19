

*En Obdisian, requiere el plugin TikZJax*

# `pgfplots`

```tikz
%% PREAMBLE %%
\usepackage{pgfplots}
% set version (UP TO 1.16 as of 2024-06-19) %
\pgfplotsset{compat=1.16, width=10cm}

\begin{document}
\begin{tikzpicture}
\begin{axis}

%% PLOTS BEGIN HERE %%
% \addplot{x^2}; % default % %
\addplot[color=red, dashed]{x^2};
\addplot[color=blue, mark=*]{2*x}; % mark datapoints %
\addplot[color=blue, mark=*]{2*x}; % mark datapoints %


\end{axis}
\end{tikzpicture}

\end{document}
```
