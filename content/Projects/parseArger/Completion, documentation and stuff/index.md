---
date: "2023-10-16T14:58:02+02:00"
title: ParseArger, completion, documentation and stuff
summary: Learn all about the completion, documentation and supporting stuff for your scripts that you can generate with ParseArger.
tags:
  - bash
  - terminal
  - scripting
  - parsearger
  - tutorial
toc: true
---

Now that you can [generate and parse](/projects/parsearger/generate-and-parse/) scripts with [fine tuned arguments, options and flags](/projects/parsearger/more-on-pos-opt-and-flag/), we are going to genrate supporting stuff for our scripts.

## Completion

Completion is a great feature of the terminal that allows you to complete commands, options and arguments by pressing the `tab` key. It is a great way to avoid typos and to discover new commands and options. For me, it is the main selling point on why you should use the terminal.
I use [completely](https://github.com/DannyBen/completely), so  you have to install it before generating the completion script, but the script itself is standalone. 
Here comes the help :

```bash
  command-name: command-name
  file: file
  --subcommand-directory|--subcmd-dir <subcommand-directory>: directory for subcommand target
  --completely-cmd|--cmpcmd <completely-cmd>: completely command, repeatable
  --extra-file <extra-file>: extra yaml declaration, repeatable
  --yaml-file <yaml-file>: yaml file name [default: ' completely.yaml ']
  --completion-file <completion-file>: completion file name [default: ' completely.bash ']
  --run-completely|--no-run-completely: run completely, on by default (use --no-run-completely to turn it off)
          no-aliases: --no-run,
  --discover-subcommand|--no-discover-subcommand: auto run completely on found subcommand
```

Let's have a look a few examples :

```bash
# generate completion for my-script
parseArger completely my-script "./my-script"

# generate completion for my-script and its subcommand in the ./bin directory
parseArger completely my-script "./my-script" --subcommand-directory "./bin"
```

Sometimes, for some esotheric reason, it does not work, but I found a work around :

```bash
# generate completion definition for completely
parseArger completely my-script "./my-script" --no-run-completely > completely.yaml
# run completely preview (that does work) and put the output in the completion script file
completely preview > completely.bash
```

### command-name

The command you generate the completion for

```bash
parseArger completely my-script ./my-script
```

### file

The executable file for `command-name`

```bash
parseArger completely my-script ./my-script
```

### --subcommand-directory

If your command has subcommands, you can specify the directory where they are located so it will generate the completion as well.

```bash
parseArger completely my-script ./my-script --subcommand-directory ./bin
```

### --completely-cmd

Completely is not installed inyour path ? It runs as a container ? That's ok, you can specify the command to run completely.

```bash
parseArger completely my-script ./my-script --completely-cmd "docker run --rm -it completely"
```

### --extra-file

The completion is generated from the arguments options and flags you defined in your script, but you can concatenate other yaml files to add more completion.

```bash
parseArger completely my-script ./my-script --extra-file ./my-script.completion.yaml
```

### --yaml-file

If the yaml file name does not suit you.

```bash
parseArger completely my-script ./my-script --yaml-file ./not-completely.yaml
```

### --completion-file

Same as for the yaml file.

```bash
parseArger completely my-script ./my-script --completion-file ./not-completely.bash
```

### --[no-]run-completely

Output the yaml file to stdout

```bash
parseArger completely my-script ./my-script --no-run-completely
```

### --[no-]discover-subcommand

If you have subcommands, you can generate the completion for them as well, but you don't have to.

```bash
parseArger completely my-script ./my-script --no-discover-subcommand
```

## Documentation

making things is coll, but making so that others (or you, after a while) can use whatever you put out there is even cooler. But it is also very long and boring. So I made a tool to do some of it for me. I don't use the output as is but it's a good starting point ;).

```bash
  -f, --file <file>: file to document, repeatable
  -d, --directory|--folder <directory>: directory to document, repeatable
  -o, --out <out>: output file
  --tag <tag>: markdown tag for title [default: ' ## ']
  --next-tag-prepend <next-tag-prepend>: prepend to next title tag level [default: ' # ']
  --title <title>: documentation title [default: ' Usage ']
  --title-tag <title-tag>: documentation title tag [default: ' # ']
  --sub-directory|--no-sub-directory: document subdirectory, on by default (use --no-sub-directory to turn it off)
  --append-output|--no-append-output: add to output file if it exists, on by default (use --no-append-output to turn it off)
```

and a few examples :

```bash
# generate completion for my-script
parseArger document --file "./my-script" --out "./my-script documentation.md"

# generate completion for my-script and all the scripts in the ./bin directory, erase "my-script documentatino.md" if it exists
parseArger document --file "./my-script" --directory "./bin" --out "./my-script documentation.md" --no-append-output
```

### --file

Document this file, repeatable. First in first out.

```bash
# generate completion for my-script and my-other-script
parseArger document --file "./my-script" --file "./my-other-script"
```

### --directory

Document all parseArger scripts in this directory, repeatable. First in first out.

```bash
# generate completion for all the scripts in the ./bin and ./I/put/stuff/every/where directories
parseArger document --directory "./bin" --directory "./I/put/stuff/every/where"
```

### --out

If not specified, I will barf all over stdout !

```bash
# generate completion output to stdout
parseArger document --file "./my-script"
# generate completion output to documentation.md
parseArger document --file "./my-script" --out "./documentation.md"
```

### --tag

I shall use a tag for titles, default is ` ## `. But you know, if youd rather have h6, you can do that.

```bash
parseArger document --file "./my-script" --tag "######"
```

### --next-tag-prepend

I start taggin with --tag value, but for each subsequent title, I prepend this value to the tag. Default is ` # `.

```bash
parseArger document --file "./my-script" --next-tag-prepend "######"
```

### --title

If you wanna get fancy with your title, otherwise you'll get a boring ` Usage `.

```bash
parseArger document --file "./my-script" --title "How to use my script"
```

### --title-tag

I already have an h1  bladi bladi blada, whatever ...!

```bash
parseArger document --file "./my-script" --title-tag "###"
```

### --[no-]sub-directory

If you ain't tellin' me, I'll go though your stuff !

```bash
parseArger document --directory "./bin" --no-sub-directory
```

### --[no-]append-output

That is usually how I clean, using a black hole !

```bash
parseArger document --file "./my-script" --out "./documentation.md" --no-append-output
```

## HTML form

Wait, what ?!! Why would a bash CLI script need a form ? Well, it doesn't, but I had the idea of using them for documentation purposes.
They come bundled with some (very dirty) javascript to generate a command from the input so less terminally inclined people can take advantage of your tools too (and maybe, just maybe learn to appreciate it ;) ).

```bash
  file: file to process
  --command <command>: command string, default to file 
  --action <action>: form action
  --form-class <form-class>: form html class
  --input-container-class <input-container-class>: input container class [default: ' form-group ']
  --input-class <input-class>: input class [default: ' form-control ']
  --label-class <label-class>: label class [default: ' form-label ']
  --select-class <select-class>: select class [default: ' form-select ']
  --checkbox-container-class|--radio-container-class <checkbox-container-class>: checkbox and radio class [default: ' form-check ']
  --checkbox-class|--radio-class <checkbox-class>: checkbox and radio class [default: ' form-check-input ']
  --checkbox-label-class|--radio-label-class <checkbox-label-class>: checkbox and radio label class [default: ' form-check-label ']
  --parent-form <parent-form>: parent form for result
  --form|--no-form: display form, on by default (use --no-form to turn it off)
  --button|--no-button: display button, on by default (use --no-button to turn it off)
  --js|--no-js: create javascript, --no-js forces --no-result, on by default (use --no-js to turn it off)
  --result|--no-result: display result, on by default (use --no-result to turn it off)
```

## file

A simple form for a simple file.

```bash
# 
parseArger html-form my-script

```

## --command

If your filename do not match the command you want to run (for alias reasons), you can specify it here.

```bash
# when you do not want to keep things simple
parseArger html-form my-script --command "my-script-alias"

```

## --action

The form does not go anywhere by default, but you can change that !

```bash
# Where I want to go
parseArger html-form my-script --action "/over/the/rainbow"

```

## --form-class

The form uses bootstrap classes by default so it's easy and quick to make them pretty.
I won't repeat it, but it goes for all *-class options.

```bash
# Me no like bootstrap !
parseArger html-form my-script --form-class "my-form-class"

```

## --input-container-class

```bash
# 
parseArger html-form my-script --input-container-class "my-input-container-class"

```

## --input-class

```bash
# 
parseArger html-form my-script --input-class "my-input-class"

```

## --label-class

```bash
# 
parseArger html-form my-script --label-class "my-label-class"

```

## --select-class

```bash
# 
parseArger html-form my-script --select-class "my-select-class"

```

## --checkbox-container-class

```bash
# 
parseArger html-form my-script  --checkbox-container-class "my-checkbox-container-class"

```

## --checkbox-class

```bash
# 
parseArger html-form my-script --checkbox-class "my-checkbox-class"

```

## --checkbox-label-class

```bash
# 
parseArger html-form my-script --checkbox-label-class "my-checkbox-label-class"

```

## --parent-form

When you have sub commands, forms nest into one-another. You can specify the parent form id here.

```bash
# 
parseArger html-form my-script --parent-form "my-parent-form"

```

## --form

Then main form id

```bash
# 
parseArger html-form my-script --form "my-form"

```

## --[no-]button

On by default, --no- to not create a button

```bash
# 
parseArger html-form my-script --no-button

```

## --[no-]js

On by default, --no- to not create javascript

```bash
# 
parseArger html-form my-script --no-js

```

## --[no-]result

On by default, --no- to not show results

```bash
# 
parseArger html-form my-script --no-result

```

## What now ?

Completion scripts and documentions are a waiting ! You can now **more than ever** make your bash tools **even more awesome** (or useful, but who cares about that, uh ? ;) ) ! And if you get so inclined as create a GUI for your script, you have a starting point with the html form (I never said it was a good one ^^).
As always bugs and suggestions should go on [parseArger's github repo](https://github.com/DimitriGilbert/parseArger).

Thanks for the read and I hope you found it useful (or at least entertaining :D )

See you around and happy coding !
