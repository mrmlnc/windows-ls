# windows-ls

Simple implementation of the ls command for windows.

## Installation

```bash
$ npm i windows-ls -g
```

Run the command line:

```bash
$ ls [OPTIONS] [DIR]
```

## Flags

List information about the FILEs (the current directory by default).

We can use the following arguments to control the search:

| Flag | Description                                                 |
|------|-------------------------------------------------------------|
|  -a  | do not ignore entries starting with .                       |
|  -R  | ist subdirectories recursively                              |
|  -l  | use a long listing format                                   |
|  -F  | append / indicator to directories and * to executable files |
|  -h  | print sizes in human-readable format (e.g., 1K, 234M, 2G)   |
|  -p  | append / indicator to directories                           |

## Bonus

And the bonus will be able to use the glob-patterns that begin with an asterisk:

```bash
$ ls *.js
$ ls **/.txt
```

## Examples usage

```bash
# Options
$ ls -a -l -R
$ ls -alR

# Dirs
$ ls lib
$ ls lib -al
$ ls test -lR

# Glob
$ ls *.js
$ ls *.{js,json}
$ ls test/**/*
$ ls test/**/* -lh
```

## Changelog

 - **0.1.2** — Update tests and refactoring variables
 - **0.1.1** — Initialization(). 
