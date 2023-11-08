---
date: "2023-10-24T00:00:00+02:00"
title: ParseArger, project does it all
summary: If you find that there are too many commands to create a script and stuff, me too, project does it all !
tags:
  - bash
  - terminal
  - scripting
  - parsearger
  - tutorial
toc: true
---

Just like with short option, the best is less !
So instead of, at the *very least*, 5 commands to create a script, you can do it in one ! And it even does more !
Now, it is to be noted that, `project`, is very opinionated and maybe, it might not do it for you (it's mainly for me ;)), but the great thing, is that you have the rest of parsearger to build yourself **your** script that does it all !

As usual, here come the help

```bash
  name: project name
  target: specific stuff on a project, optional [one of 'git-init' 'installer' 'git-init' 'mkfile' 'webserver' 'webserver']
  --description|--project-help <description>: project description
  -d, --directory|--dir <directory>: output directory, ./<project_name> by default
  --project-subcommand-dir|--subcommand-directory <project-subcommand-dir>: subcommand script directory [default: ' bin ']
  --project-subcommand <project-subcommand>: project subcommand, forces has-subcommand, repeatable
  --completely <completely>: generate bash completion, filenames (.yaml and .bash) if value is specified
  --document <document>: generate documentation, filename (.md) if value is specified [default: ' on ']
  --html-form <html-form>: generate html-form, filename (.html) if value is specified [default: ' on ']
  --cp <cp>: file or directory to copy to the project directory, repeatable
  --installer-git-service|--git-provider <installer-git-service>: git service [default: ' github.com ']
  --installer-git-repo|--git-repo <installer-git-repo>: git repo eg DimitriGilbert/parseArger
  --git-add <git-add>: stuff to add to git, repeatable
  --git-commit|--commit <git-commit>: commit, force --git-add
  --readme|--no-readme: create a basic readme, on by default (use --no-readme to turn it off)
  --git|--no-git: git init, on by default (use --no-git to turn it off)
  --makefile|--no-makefile: generate a makefile, on by default (use --no-makefile to turn it off)
  --web-server|--no-web-server: add web server, on by default (use --no-web-server to turn it off)
```

Instead of jumping striahgt to option details and example, we are goning to take a few minutes to detail what (and why) I chose to do things this way.

## Porject structure

```bash
|_ <script name>
|_ <script name>.rc
|_ completely.yaml
|_ completely.bash
|_ documentation.md
|_ form.html
|_ Makefile
|_ readme.md
|_ bin
  |_ <subcommand name>
  |_ <subcommand 2>
  |_ <subcommand ...>
|_ utils
  |_ get_<script name>
  |_ install
  |_ webserver
```

### The script/entrypoint/whatever

Meat and potato (or chickpeas if you are vegan), that's what you came here for.
Notice that it does not have a `.sh` extension, well (ackchtuallllyyy) it's not a *shell* script it's a *baaasssh* script.
A bit more seriously, if you want a `.sh`, knock yourselves out, for me, I want to call it as a program.
And I'm lazy, 3 chars are 3 chars !.

### the .rc

It's the file that'll be sourced in the `.bashrc` or `.zshrc` or whatever.
That's where I'm declaring the program alias and loading the completion file.
Note that you could consivably declare variable, run check for install and so on in here.

### completely stuff

The `completely.yaml` are the files that'll be used by [completely](https://github.com/DannyBen/completely) to generate the `completely.bash` completion file.
I kept the default names so it is apparent as to what it is but, as always, you do you.

### documentation.md

... It is the documentation file, what did you expect ? a theory merging quantum physics and general relativity ?! nope, just the "documentation".

### form.html

The result of the `html-form` command.
One might wonder to the utility of such a thing and I would tend to agree.
Be sure to let me know if you use that in something usefull, or if you think of something (simple, and fast) to make so, be sure to let me know (or maybe make a [Pull Request](https://github.com/DimitriGilbert/parseArger/pulls) ?).

### Makefile

For those who likes them, I'm not such a fan but it everywhere so, I guess it's a good thing to have. 
Same as `form.html`, if you have cool tips tricks and stuff I could make better here I'm really open to suggestions (and PRs ^^).

### readme.md

The readme file, it's a basic one, but it's a start.

### bin

This will be where subcommands live. I could have gone `src`, true but *you* can make it so.

### utils

There are some cool (and somehow usefule) stuff going on in here.
All are parseArger scripts, so you can go crazy and make them your own.

#### get_<script name>

Instead of "go there, dowload that, unzip here, ..." you just say "copy that in a terminal and smile :)"
Man, I love the [docker way](https://get.docker.com/), so I kind of emulated that.

#### install

If you want to download manually but install automatically, that's the way to go.

#### webserver

This is for now just for giggles. It is unsecure, not compliant with http standard, slow, oh and did I mention unsecure ?!
Yeah so, it kinda works, the html form is kind of linked with it, but it's not really usefull, for now.
It could be a start for some stuff if you know what you are doing, but I don't so, I'm just playing around ;P.

## arguments, options and stuff

### name

The name of the project, it's the only mandatory argument.
It will create the project directory with that name and the main script/entrypoint will be name that way.

```bash
parseArger project my-project
```

### target

You already have a project but want to add something from the `project` command ? you precise it here.
Each subcommand comes with it's own sets of options, more b elow..

#### git-init

Initialize a git repo in the project directory. if `git init` seems too hard for you.

```bash
	--add <add>: what to add, repeatable
	--commit <commit>: commit, default message if nothing specified, can be empty [empty value: 'parseArger project first commit']
```

```bash
parseArger project my-project git-init --add . --commit "first commit"
```

#### installer

Create the installer, in case you did not want it, but now, you do.

```bash
	name: project name
	--git-repo <git-repo>: git repository name
	--git-service <git-service>: git service [default: ' github.com ']
	--parsearger <parsearger>: parseArger path
```

```bash
parseArger project my-project installer --git-repo MydevName/my-project --git-service gitlab.com --parsearger $HOME/bin/parseArger/parseArger
```

#### mkfile

Create a makefile with default actions using parseArger.

```bash
  name: project name
```

```bash
parseArger project my-project mkfile 
```

#### webserver

You too, can now create a web server in bash for no other reasons than doing it ! Yeaaaah !

```bash
  name: project name
  --route|--url <route>: route to add, repeatable
  --file <file>: create the server file name
```

```bash
parseArger project my-project webserver --route /why --route /would/you --route /use/that --file server 
```

### --description

A brief description of the project.
It will be used to populate the readme and the documentation.

```bash
parseArger project my-project --description "my cool project"
```

### --directory

Where shall I put thing down, if the generic way does no fly, sir ?

```bash
# will create the project in ./my_project_dir
parseArger project my-project --directory my_project_dir
```

### --project-subcommand-dir

If you have subcommands, they'll live here. `bin` by default.

```bash
# subcommands will live in my-project/src/
parseArger project my-project --project-subcommand-dir src
```

### --project-subcommand

Give the project a subcommand, or two, or three, or more, or none.
For now you just give a name, but I'm thinking of adding a way to add a way to feed a `generate` command here.
You will have to use `parse` to add them at the moment.*

```bash
parseArger project my-project --project-subcommand my-command --project-subcommand my-other-command
```

### --completely/--document/--html-form

Generate the completion/documentation/html-form files from the start, not very usefull from the start (what do you want to complete ?)

```bash
parseArger project my-project --completely comp --document doc --html-form dummy-form
```

### --cp

Copy file into your project directory, If you have libraries or other assets (who said css for the web-server ? XD)

```bash
parseArger project my-project --cp ../common/stuff --cp ../common/theme.css
```

### --installer-git-service

github.com by default, because that is what iI use, but you can use whatever you want.

```bash
parseArger project my-project --installer-git-service gitlab.com
```

### --installer-git-repo

The git repository name on the git service.
It is used in the get_<script name> script

```bash
parseArger project my-project --installer-git-repo MyDevName/my-project
```

### --git-add

Add file to git befor commit. Forces `--git`.

```bash
parseArger project my-project --git-add theme.css
```

### --git-commit

Do the first commit, if value is specified,  it will be used as commit message. Forces `--git`.

```bash
parseArger project my-project --git-commit "first commit"
```

### --readme/--git/--makefile/--web-server

Turn on/off the creation of the readme/git/makefile/web server.

```bash
parseArger project my-project --no-readme --no-git --no-makefile --no-web-server
```

## What now ?

I have taught everything I can my young apprentice, your magic is powerful but you need experience !
Re-explore your `$HOME`, cast scripts, make them your minions to [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) as much work demons as possible !
Don't forget to share your knowledge and one day we might be able to destroy the dark forces of useless work and make our computers a better place !

...
...
...

What ? Why are you still here ?!
You... ? Do not feel ready yet... ?
I guess I can spare one more article to help you build your mental map to find you way to self automation (geez, that sounds like a cult ! XD)

Yeah, anywhoooo next article we'll create a small tool that I'll use to help me publish my blog articles.

{{% projectInteraction project="parseArger" %}}

{{% goodbye %}}