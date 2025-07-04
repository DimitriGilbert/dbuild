---
date: "2023-10-10T14:55:13+02:00"
title: ParseArger, generate and Parse
summary: Deeper dive in parseArger generate and parse commands arguments and options.
tags:
  - bash
  - terminal
  - scripting
  - parsearger
  - tutorial
toc: true
slug: "index"
---

We [previously](/projects/parsearger/create-bash-scripts-youll-want-to-use) had a quick look at [parseArger](https://dimitrigilbert.github.io/parseArger/).
Let's focus on the generate and parse command today !
I tried to make my arguments descriptions fairly clear, but an example is always nice don't you think ?

## Generate

This command will generate (yeah I know, much creativity) a new bash script.
We'll have a look at them one by one but here are the whole lot of arguments, options and flags for the command. (yes, this is the output from --help ^^)

```bash
-p, --pos <pos>: positional argument declaration, repeatable
-o, --opt <opt>: optional arg declaration, repeatable
-f, --flag <flag>: flag declaration, repeatable
-s, --set <set>: declare var, repeatable
-l, --source <source>: file to source, repeatable
-m, --help-message <help-message>: help message for the command [default: ' I send an SOS to the world ']
--help-option <help-option>: help option trigger
--help-short-option <help-short-option>: short help option
--leftovers-name <leftovers-name>: extra arguments variable name [default: ' leftovers ']
--use-shebang <use-shebang>: shebang executable [default: ' /bin/bash ']
--set-version <set-version>: set version number
--version-opt-name <version-opt-name>: version option name [default: ' version ']
--version-short-option <version-short-option>: version short option name [default: ' v ']
--die-fn-name <die-fn-name>: die function name [default: ' die ']
--log-fn-name <log-fn-name>: log function name [default: ' log ']
--verbose-opt-name <verbose-opt-name>: verbose option name [default: ' verbose ']
--verbose-level <verbose-level>: default verbose level [default: ' 0 ']
--leftovers|--no-leftovers: accept extra arguments
--bang|--no-bang: include shebang, on by default (use --no-bang to turn it off)
--version-opt|--no-version-opt: generate version opt handling, on by default (use --no-version-opt to turn it off)
--use-verbose|--no-use-verbose: generate verbose level parser, on by default (use --no-use-verbose to turn it off)
--parse-leftovers|--no-parse-leftovers: parse leftovers, force leftover
```

Forget about --pos --opt and --flag, we are going over them in a different article.

### --set

repeatable, declare a variable at the top of the script.
It can use `$()` to run commands but be careful about escaping (which might cause trouble with parsing sometimes...)

```bash
parseArger generate --set 'my_var="my value"' \
  --set 'my_var_dynamic_var="\$(cat /a/file)"'
```

### --source

repeatable, source a file at the top of the script.

```bash
parseArger generate --source "/path/to/the/file"
```

### --help-message

the script help message. It might be a good idea to make it useful, but you don't have to... 3:-D

```bash
parseArger generate --help-message 'my script does something'
```

### --help-option

option used to trigger help, the fact that you can does not mean that you should.

```bash
parseArger generate --help-option 'not-very-helpful-help-opt'
```

### --help-short-option

short option help trigger

```bash
parseArger generate --help-short-option z
# because why not z ?
```

### --leftovers-name

extra argument array variable name. Forces --leftovers flag.

```bash
parseArger generate --leftovers-name "extra_args"
```

### --use-shebang

specify the shebang, the generated script does not change though, use at your own risk ;).
If you have cross shell compatibility tips and tricks, I am all ears !

```bash
parseArger generate --use-shebang "#!/bin/zsh"
```

### --set-version

give a version to the script, not enforcing any kind of whatever here, you can `--set-version "potato"`, i won't judge

```bash
parseArger generate --set-version "0.1-alpha-preview-48"
```

### --version-opt-name

version trigger option, `--version` by default, but if you hate conventions.

```bash
parseArger generate --version-opt-name revision
```

### --version-short-option

short option trigger for version

```bash
parseArger generate --version-short-option i
```

### --die-fn-name

who wouldn't choose how one dies ? Bar that, I'll let you choose how your script dies.

```bash
parseArger generate --die-fn-name wasted
```

### --log-fn-name

same as die, but I have nothing funny to add, so I think I am just rambling at this point, don't you think ?

```bash
parseArger generate --log-fn-name report
```

### --verbose-opt-name

.

```bash
parseArger generate --verbose-opt-name tmi
```

### --verbose-level

default verbose level for your script

```bash
parseArger generate --verbose-level 42
```

### --leftovers | --no-leftovers

do not waste ! Think about those poor scripts which do not have options.
So you pack all these nice extra arguments and options in an array for later ! And do not read from stdin before you finished it all !!

```bash
parseArger generate --leftovers
```

The array variable is `$_arg_leftovers` or `$_arg_<whatever you chose with --leftovers-name>`.

### --parse-leftovers | --no-parse-leftovers

Force --leftovers and if you hate unordered mess, you can parse the leftovers and look for option like syntax to be extracted in an associative array. How neat.

```bash
parseArger generate --parse-leftovers
```

The array variable is `$_arg_parsed_leftovers` or `$_arg_parsed_<whatever you chose with --leftovers-name>`.

### --bang | --no-bang

use a shebang, on by default

```bash
parseArger generate --no-bang
```

### --version-opt | --no-version-opt

versions are for looooooosers ! #mainOrDie

```bash
parseArger generate --no-version-opt
```

### --use-verbose | --no-use-verbose

when you have nothing to say anyway (or way too many, and you won't stop, and you know you should, but you won't...)

```bash
parseArger generate --no-use-verbose
```

## Parse

Whether it is because you forgot something, "oooh, i might be able to do that..." or "DO THAT !", requirements change, just generating the script is already nice but a way to update it would be nicer, like if we couuuuld... *parse* the script (...).
Like with `generate` command, the whole bunch of options and then details, if you don't find the documentation below, it's because it's the same as `generate`, so look up !

```bash
file: file to parse
-p, --pos <pos>: add positional argument declaration, repeatable
-o, --opt <opt>: add optional arg declaration, repeatable
-f, --flag <flag>: add flag declaration, repeatable
-s, --set <set>: add declare var, repeatable
-l, --source <source>: add file to source, repeatable
--set-version <set-version>: set version
-i|--inplace|--no-inplace: replace parseArger generated content in place
--leftovers|--no-leftovers: add leftovers
--parse-leftovers|--no-parse-leftovers: parse leftovers
```

### file

path to the file to parse, yes it is a positional argument, thank you for noticing the absence of `-`.
You are such an attentive reader :)

### --inplace

update the file directly, goes to stdout by default

## What now ?

Another article is coming to dive deeper in --pos, --opt and --flag options for both generate and parse so you can truly take full advantage of parseArger ;) ! 
But this has been most of my usage, barebones arguments, simple options (and a few flags, not often).
This is such a step up from bash scripts I created in the past, especially with the generated help !
What about you ? Would this help you or are you using other languages when "more complex" scripts are needed ?

Thanks for the read and I hope you found it useful (or at least entertaining :D )

See you around and happy coding !
