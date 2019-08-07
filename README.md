# chat2mark [![Build Status](https://travis-ci.org/rg-wood/chat2mark.svg?branch=master)](https://travis-ci.org/rg-wood/chat2mark)

Script to convert Roll20 Chat logs to Markdown campaign diaries.

To execute:

```sh
$ chat2mark <input> <output> 
```

Where `input` is a Roll20 chat log HTML fragment and `output` is the name of the Markdown file you want to write to.

For example:


```sh
$ chat2mark roll20-chat.html campaign-diary.md
```

