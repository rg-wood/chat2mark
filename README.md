# chat2csv [![Build Status](https://travis-ci.org/rg-wood/chat2csv.svg?branch=master)](https://travis-ci.org/rg-wood/chat2csv)

Script to convert Roll20 Chat logs to Markdown campaign diaries.

To install:

```sh
$ npm i -g chat2csv
```

To execute:

```sh
$ chat2csv convert <input> <output>
```

Where `input` is a Roll20 chat log HTML fragment and `output` is the name of the Markdown file you want to write to.

For example:

```sh
$ chat2csv convert roll20-chat.html campaign-diary.md
```

