---
date: "2023-10-08T14:51:25+02:00"
title: ParseArger, create bash scripts you'll want to use
summary: Generate standalone bash scripts with argument, option and flag parsing, documentation, completion and more !
tags:
  - bash
  - terminal
  - scripting
  - parsearger
  - tutorial
toc: true
slug: "index"
---

So, who here writes **bash** scripts ? And among these scripts, some take arguments, right ? 
Ok ok, so, get me any kind of documentation, usage hint or anything, like, right NOW !

Yeah...it's ok, we've all been there, and if you didn't, you might (not) have had a look at [parsing](https://stackoverflow.com/a/14203146){:target="_blank"} arguments and (AND!) [options](https://sookocheff.com/post/bash/parsing-bash-script-arguments-with-shopts/){:target="_blank"} in a bash script...it's a whole kerfuffle ! Well, "NO MORE !" I say !

## Meet parseArger

[ParseArger](https://dimitrigilbert.github.io/parseArger/) is a bash program to generate standalone bash programs, at least :
* the argument and option parsing (hey, I'm not gonna take your job !),
* and a basic documentation (just the boring part),
* and an install script (...),
* and a bash completion script (...right ?),
* and an html form (whut ..?!)
* *aaaaand* a web server in bash (OH COOOOME ON !)(not really to be used apart from the time you can't do without... I'm just flexing ^^')

## TLDR

Oh, I know ya'll abunch of impatient nerds (at least I am...) so here is a quick run down to get going !

```bash
# download the install script
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O;
# make it executable
chmod +x get_parseArger;
# install, use --help for... help...
./get_parseArger --install;
# source bashrc, only needed once, modify according to your shell (if you don't know, it's the good one :D)
source "$HOME/.bashrc"

# generate a project
parseArger project my-awesome-project \
  --description "this is a cool project !" \
  # no commit, push or nothing, for install script generation
  --git-repo "myRandomDevName/my_awesome_project" \
  --project-subcommand my-script \
  --project-subcommand another-script

cd my-awesome-project
./my-awesome-project --help
```

## Install

First things first, let's install the damn thing ! 
Open up a terminal and execute those commands :
```bash
# download the install script
curl -s https://raw.githubusercontent.com/DimitriGilbert/parseArger/main/utils/get_parseArger -O;
# You are thoughtfully encouraged to spend the next few minutes reading it, just to make sure I do not have nefarious purposes, thank you.

# make it executable
chmod +x get_parseArger;
# install
./get_parseArger --install;
# source bashrc, only needed once, modify according to your shell (if you don't know, it's the good one :D)
source "$HOME/.bashrc"

# check install
parseArger --help
```

More help is available on the install script, just type `./get_parseArger --help` in your terminal.

## Generate a script

Let's start simple with a script that has one argument, one option and one flag. We'll output the generated content to ./my-script.
```bash
parseArger generate \
  --help-message "this is a script" \
  --pos 'my-arg "my argument"' \
  --opt 'my-option "my option"' \
  --flag 'a-flag "boolean flag for my script"' \
  --output my-script
```

You are now free to add your actual code at the bottom of the generated file. It will not be modified if (when !) you update the parsing code using `parse`.
There are more options for --pos, --opt and --flag, I'll dive deeper into that in further articles ;).
Concerning variable created, `-` will be replaced with `_` and the variable will be prefixed with `_arg_`.
So --my-super-argument value is assigned to $_arg_my_super_argument

## Parse a script

Now that we have a script, needs have changed and we miss some options... Let's fix that then !
```bash
# -i (or --in-place) means that we update the file with the newly generated parsing code, keeping your custom code
parseArger parse ./my-script -i \
  --opt 'missing-option "my missing option"' \
  --opt 'another-opt "yet another one"'
```

Done, you you make the code that uses them :).

## Completion script

The best thing about the terminal ? completion ! 
You can't get your mouse on the most likely button you'll need to click in a window (erf, maybe, but ...the usability...).
Well, you can in a terminal :D. Creating the scripts manually though ? Gee..., no !

```bash
parseArger completely my-script ./my-script

source ./completely.bash
```

Remember you'll have to source the completion script to access completion in the terminal, you can add `source /path/to/my-script/completion.bash` to your .bashrc (or .zshrc and so on)

You will need [completely](https://github.com/DannyBen/completely) installed for the generation to work, but once generated it's standalone.

Sometimes, things here do not work as expected and I can't figure out why, if it does for you to, use this as a workaround

```bash
# do not run completely
parseArger completely my-script \
  ./my-script \
  --no-run-completely > completely.yaml

# use the completely preview and pipe to a file...
completely preview > completely.bash
```

## Documentation

We all have that pesky collegue that never remember how to use the oh so fantastic tools that you create (AKA you in 6 months).
Let's think about that guy a bit and throw him a bone with some documentation !

```bash
parseArger document ./my-script --out documentation.md
```

It's not perfect as it is just the command help in a md file, but it's a whole lot better than nothing, eh ?

## Project, anyone ?

You might say that is a whole bunch of mess for a puny script, and you'd be very right !
Who says you have to stop with one script though ? I didn't.
You'd have several ways to do that but I settled on a very opinionated project structure that is as follows

```
.
├── <program>
├── <program>.rc
├── completely.bash
├── completely.yaml
├── documentation.md
├── form.html
├── Makefile
├── readme.md
├── bin
│   ├── command-one
│   ├── command-two
│   ├── ...
└── utils
    ├── get_<program>
    ├── install
    └── webserver
```
And of course I made a parseArger command for that : `project`

```bash
parseArger project my-bash-project
```

Off the bat, it'll create the main program, an rc file for your bashrc, documentation, readme and misc stuff (makefile, installer, webserver, html form). It'll initialize a git repo in the created folder but won't add or commit anything.
With some options, it'll also create the `bin` folder and command scripts, configure the main program to use these commands (as for `generate` there'll be another article).

## What belongs to Ceasar

This project was started because I couldn't find out how to modify [argbash](https://github.com/matejak/argbash).
Most of the work was (well) done so I took the generated output and went at building a similar generator.
It is not as fancy as the original work and a bit of "grog brain developer" display ... but, meh, it works *and it's miiiine*.

On that subject, if you are interested in a more rounded up bash generator thingy, you might want to have a look at [bashly](https://github.com/DannyBen/bashly/), I use completely which is a part of it and it's awesome !

## What now ?

Well, have at it ! Have fun, create awesome scripts with sh load of options !
Also as I am the only user, it's getting hard to find bugs to squash, though I am pretty sure nests can be found.
And if no bugs are to be found, maybe you have a use case I didn't think of and everyone would benefit from.
All that can be done using issues on [parseArger's github repo](https://github.com/DimitriGilbert/parseArger).

Thanks for the read and I hope you found it useful (or at least entertaining :D )

See you around and happy coding !
