---
date: "2023-10-13T14:56:33+02:00"
title: ParseArger, more on Pos Opt and Flag
summary: Options with default values ? Repeatable options or aliases maybe ? This is a deeper dive into parseArger's arguments, options and flags generation.
tags:
  - bash
  - terminal
  - scripting
  - parsearger
  - tutorial
toc: true
---

Now that you know the basic of parseArger `generate` and `parse`, it's time to have a look at how we declare arguments, options and flags !

## --pos

Positional arguments are what most of us use in a bash script with `$1`, `$2`, `$...`
Well same thing here, but they have names And much more :

```bash
arg-name: positional argument name
description: positional argument description
--one-of <one-of>: accepted values, repeatable
--complete <complete>: bash built-in completely function, repeatable
--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
--subcommand-directory <subcommand-directory>: directory containing subcommands, force subcommand, list parseArger script in directory to fill --one-of
--subcommand-variable <subcommand-variable>: array variable containing subcommand parts, force subcommand [default: ' __subcommand ']
--subcommand|--no-subcommand: is a subcommand
--subcommand-run|--no-subcommand-run: run subcommand, forces sub command
--subcommand-use-leftovers|--no-subcommand-use-leftovers: add leftover arguments to subcommand, forces subcommand
```

And a dumb example that generates a script that take one argument my-cmd and execute it as a subcommand using the leftover arguments, my-cmd must be one of "ls", "cd" or "cat" :
```bash
parseArger generate --pos \
  'my-cmd "an argument" --subcommand --subcommand-run --subcommand-use-leftovers --one-of ls --one-of cd --one-of cat'
```

### arg-name

The argument name, `-` will be replaced with `_` and the variable will be prefixed with `_arg_`.
So --my-super-argument value is assigned to $_arg_my_super_argument.

### description

Simple description for help, documentation and so on

### --one-of

Repeatable, The argument value must be one of, the most basic input validation, yeah !

```bash
parseArger generate --pos 'my-arg "my argument description" --one-of value1 --one-of value2'
```

### --complete

Repeatable, [Completely built-ins](https://github.com/DannyBen/completely#suggesting-files-directories-and-other-bash-built-ins).

```bash
parseArger generate --pos 'my-file "this is a file path" --complete file'
```

### --complete-custom

Repeatable, [Completely custom](https://github.com/DannyBen/completely#suggesting-custom-dynamic-suggestions)

```bash
parseArger generate --pos 'my-arg "this is an argument" --complete-custom "\$(echo \"some_value some_other you_get the_point\")"'
```

### --subcommand-directory

You been a good kid and you did split your scripts ?
If they're all in the subcommand-directory, parseArger will add them to one of and build a __subcommand variable for you to use.
It forces --subcommand ... in case you were wondering.

```bash
parseArger generate --pos 'my-arg "this is an argument" --subcommand-directory bin'
```

### --subcommand-variable

Ooooh, oh you don't like __subcommand !!? What should it be called then ? It forces --subcommand.

```bash
parseArger generate --pos 'my-arg "this is an argument" --subcommand-variable notAsubCommand'
```

### --subcommand

This is a subcommand

```bash
parseArger generate --pos 'my-arg "this is a command argument" --subcommand'
```

### --subcommand-run

Run the subcommand before handing you the script, forces --subcommand.

```bash
parseArger generate --pos 'my-arg "this is an argument" --subcommand-run'
```

### --subcommand-use-leftovers

Maybe those leftovers are worth something..., after all ! Forces --subcommand

```bash
parseArger generate --pos 'my-arg "this is an argument" --subcommand-use-leftovers
```

## --opt

I'm pretty sure most of you were waiting for that : (add ethereal music here) options !

```bash
arg-name: positional argument name
description: positional argument description
--repeat-min <repeat-min>: minimum repeatition forces repeat [default: ' 1 ']
--repeat-max <repeat-max>: maximum repeatition forces repeat
--one-of <one-of>: accepted values, repeatable
-d, --default-value <default-value>: value, repeatable
-s, --short <short>: short form
--alias <alias>: option alias, repeatable
--empty-value <empty-value>: value for empty option
--complete <complete>: bash built-in completely function, repeatable
--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
-r|--repeat|--no-repeat: repeatable
--empty|--no-empty: use option as flag
```

I won't bore you with arg-name and description, and if you need me too, you might want to re read the previous part a tiny tad more attentively, maybe, if you'd like to.

### --repeat-min

Repeatable option, yes ! but at least this many ! Forces --repeat.

```bash
parseArger generate --opt 'my-opt "this is an option" --repeat-min 42
```

### --repeat-max

Repeatable option, yes ! but not too much ! Forces --repeat.

```bash
parseArger generate --opt 'my-opt "this is an option" --repeat-max 69
```

### --one-of

see --pos --one-of above, it's the same ;)

### --default-value

An option, why not, but it shall not be empty !

```bash
parseArger generate --opt 'my-opt "musnt be eeeemmmmpty" --default-value "this is not empty"'
```

### --short

I know ya'll concerned about bodily efficiency (my mom called that "lazy"...), letters matters ! you got 26 of'em, that's how many options max my scripts have !

```bash
parseArger generate --opt 'my-opt "lazily call me" --short o'
```

### --alias

I know it's hard to always agree (especially with yourself !), with aliases, no more decision (about option names), you can have your cake, and eat it, too !

```bash
parseArger generate --opt 'a-opt "lazily call me" --alias "an-opt" --alias "an-option" --alias "needlessly-long-option-name"'
```

### --short

I know ya'll concerned about bodily efficiency (my mom called that "lazy"...), letters matters ! you got 26 of'em, that's how many options max my scripts have !

```bash
parseArger generate --opt 'my-opt "lazily call me" --short o'
```

### --complete

see --pos --complete above, it's the same ;)

### --complete-custom

see --pos --complete-custom above, it's the same ;)

### --repeat

You can now have multiple values for your option. the option is now an array, even if only one value is given.

```bash
parseArger generate --opt 'my-opt "look ma', I'am an array !" --repeat'
```

### --empty

Option or flag ? Well, why not both ? A flag if you don't give it anything, an option otherwise ! 

```bash
parseArger generate --opt 'my-opt "option>flag superposition" --empty'
```

## --flag

Ahoy ! raise the flaaaaaag ! (I'd say I'm grasping at branches, but it seems tree do not grow in the ocean...)

```bash
arg-name: positional argument name
description: positional argument description
-s, --short <short>: short form
--no-name <no-name>: value for the negation
--alias <alias>: flag alias, repeatable
--no-alias <no-alias>: flag negation alias, repeatable
--on|--no-on: on by default
```

You know the drill with arg-name, description, --short and alias, it's up above ;)

### --no-name

`--no-<flag-name>` do not fly ? Fine, you choose !

```bash
parseArger generate --flag 'do-that "flabbergasted, flag a..." --no-name dont-do-that'
```

### --no-alias

There are plenty of ways to say no !

```bash
parseArger generate --flag 'do-that "flabbergasted, flag a..." --no-alias this-instead --no-alias do-this'
```

### --on

It's already on... but you can turn it off.

```bash
parseArger generate --flag 'do-that "flabbergasted, flag a..." --on'
```

## What now ?

Now you almost have the whole view on parseArger, enough for simple scripts anyway !
But maybe you do not value your mental health much and would like to create a whole program in bash ?
Well, What a coincidence, next time we'll have a look at the `project` command, it'll help you do just that ! (the program part, I do not deal in mental health)
As always bugs and suggestions should go on [parseArger's github repo](https://github.com/DimitriGilbert/parseArger).

Thanks for the read and I hope you found it useful (or at least entertaining :D )

See you around and happy coding !