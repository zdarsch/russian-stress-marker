# russian-stress-marker

A lightweight Russian stress marking tool running in the browser, on Windows. A chrome extension, because chromium based browsers have  some weighty advantages over Firefox. Chrome extensions stay installed, in developer mode, when the browser closes. Additionally,  the stress marker runs much faster and may also add  stress marks to local files.          

The stress engine comprises two files: "dictionary" and  "content_script".

The  "dictionary" (a Uint32Array) is basically a sequence of 32 bits unsigned integers ( all of them in little endian order, since Windows is little endian). It is a compact representation of a finite state automaton (with final transitions) recognizing  a list of  2 039 133 accented Russian words ( all of them in small case). 

The "content_script"  scans the body of a web page for Russian words and searches  the "dictionary" for  accented equivalents. By design, a  word has at most one equivalent in the "dictionary".

The extension is designed to meet my wishes as a learner of Russian. Homographs (words such as замок, кому, моя, ...)  are left unstressed. To help me give homographs their right stresses,  I  prepare  a dictionary of hints.

