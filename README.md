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

## Changelog

 - **0.1.0** — Initialization(). 
