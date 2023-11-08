---
title: My markdown tool, a parsearger project
date: "2023-10-27T00:00:00+02:00"
toc: true
tags:
  - bash
  - terminal
  - scripting
  - parsearger
  - tutorial
  - devlog
---

## Let's create a project together !

I'm one of those `learn by doing` guys (mostly), I'm assuming your kind of are too, so let's build something together.

### A bit of context and basic requirements

For this blog, I'm using [hugo](https://gohugo.io) as a static site generator, and I'm writing my articles in markdown.
`hugo new` does the job, but I want something a bit different, with a folder that contains everything I need for the article (asset, code, etc...).
I would like my new post to be prefilled as much as possible so the tool should be able to set any meta.
Also, I tend to craft my article squeletton before writting (#trauma #school XD), so I should at least be able to add main headings from the CLI.
Because I do not know where this is goping, I won't just `generate` a script, I am going to start a new `project` so I can add more stuff later on.

## Leeeeeet's goooooo !

### Generate the project

We are using the `project` command, more information can be found in the [previous article]() if you need help.

```bash
# create a new project called mdd (MarkDown for Didi. Much creativity, such accronym, #wow)
# one subcommand 'article' for now.
parseArger project mdd \
  --description "markdown tools for my blog" \
  --git-repo "DimitriGilbert/mdd" \
  --project-subcommand article
```

This command will create a new folder `mdd` with the following structure:

```bash
|_ mdd
|_ documentation.md
|_ form.html
|_ Makefile
|_ readme.md
|_ bin
  |_ article
|_ utils
  |_ get_mdd
  |_ install
  |_ webserver 
```

Our entry point `mdd` should handle the command routing on its own, no work needed so we go along to `article`.

### Parse the article command

After some careful thoughts, I have refined my requirements which are now the following:

* create a new folder with the article name
  * if $(pwd) contains a `content` folder, create the article in it
  * article can have hierarchical categories. (if more than one, the previous is the parent)
    * categories make the path to the article
* create index.md from template you can specify
* tags, series, title, draft (on), date (now), summary metas handled by CLI
  * add any other meta you want
* add headings
  * headings level can be specified

From all that, we know that we'll need the folowing :
* arguments : 
  * title (the only thing mandatory, so it's an argument)
* options : 
  * categories (repeatable)
  * folder name (not strictly necessary, but i can forsee a need soooo...)
  * tags (repeatable)
  * series (repeatable)
  * date
  * summary
  * template
  * headings (repeatable)
  * headings level (default 2)
* flags :
  * draft (on by default)
* nested options :
  * meta
    * due to bash limitation, no repeatable nested options, so only the last value for a key will be kept

With that in mind, let's build our `parse` command to update our `bin/article` file. Don't forget to remove comment before executing, they don't play well with backslashes ^^.

```bash
# parse the bin/article file
parseArger parse bin/article \
  # add the title argument, nothing special here
  --pos 'title "article title"' \
  # add the folder name option, using title if none provided. I also declare aliases for this option, namely 'dir' and 'directory'
  --opt 'folder "article folder name" --alias directory --alias dir' \
  # add the categories option, repeatable, with aliases 'cat' and 'parent', a short version of the option is given, namely 'c'
  --opt 'categories "article parent categories" --short c --alias cat --alias parent --repeat' \
  # add the tags option, repeatable, with alias 'tag' and short option 't'
  --opt 'tags "article tags" --repeat --short t --alias tag' \
  # add the series option, with alias 'group' and short option 'g'
  --opt 'series "article belongs to this series" --alias group --short g' \
  # add the date option with short option 'd' and aliases 'publication', 'publish-at'
  --opt 'date "publication date meta" --alias publication --alias publish-at --short d' \
  # add the summary option with short option 's' and aliases 'description', 'desc'
  --opt 'summary "summary meta" --short s --alias description --alias desc' \
  # add the template option with short option 'tpl' and alias 'template'
  --opt 'template "template file to use" --alias tpl' \
  # add the headings option, repeatable, with short option 'h' and aliases 'part', 'h2'
  --opt 'headings "add headings to your file" --repeat --alias part --alias h2' \
  # add the headings level option with short option 'hl' and alias 'headings-level'
  --opt 'headings-level "heading level" --default-value 2 --alias hl' \
  # add the draft flag on by default and with a no-alias as publish 
  #   meaning if you want it off, you can either use --no-draft or --publish
  --flag 'draft "is it a draft" --on --no-alias publish' \
  # add the meta nested option
  --nested-options 'meta "add any meta you want"' \
  # parse in place, -i is the short option
  --in-place
```

This will give us the following `bin/article` file :

{{% fileContent file="/content/Projects/parseArger/My markdown tool, a parsearger project/article_v1" language="bash" %}}

It's a whole bunch of code, but mercyfully you do not have to pay attention to it \o/ (I mean, you can if you want, but it's not necessary).

Instead we are going to focus on the code that is going to use those parsed arguments and stuff !

### The (real) code

Well, let's start fullfilling our requirements !

#### Folder stuff

I use the log function with a level of 4 for comments ;)

```bash
# if nothing else, the title
_container_dir="$_arg_title";

if [ "$_arg_folder" != "" ]; then
	log "folder specified: $_arg_folder" 4;
	_container_dir="$_arg_folder";
fi

# there is categories at least 1
if [ "${#_arg_categories[@]}" -gt 0 ]; then
	log "categories specified:" 4;
	_cat_dir="";
	for _cat in "${_arg_categories[@]}"; do
		_cat_dir+="$_cat/";
	done
	log "	categories path : $_cat_dir" 4;
	_container_dir="$_cat_dir$_container_dir";
fi

# hugo directory, it's a poor check , I don't care ^^
if [ -d "content" ]; then
	log "using content directory" 4;
	_container_dir="content/$_container_dir";
fi

# create the directory if it does not exist
if [ ! -d "$_container_dir" ]; then
	log "creating container directory: $_container_dir" 2;
	mkdir -p "$_container_dir";
fi
```

#### Meta stuff

Here we'll handle all the metas so that we can put that to rest.

```bash
# start with the title, it's always here
_metas_str="title: $_arg_title\n";

if [ "$_arg_date" != "" ]; then
	log "date specified: $_arg_date" 4;
	_metas_str+="date: $_arg_date\n";
fi

if [ "$_arg_summary" != "" ]; then
	log "summary specified: $_arg_summary" 4;
	_metas_str+="summary: $_arg_summary\n";
fi

if [ "${#_arg_tags[@]}" -gt 0  ]; then
	log "${#_arg_tags[@]} tags specified:" 4;
	_metas_str+="tags: \n";
	for _tg in "${_arg_tags[@]}"; do
		log "\t$_tg" 4;
		_metas_str+="\t- $_tg\n";
	done
fi

if [ "$_arg_series" != "" ]; then
	log "series specified: $_arg_series" 4;
	_metas_str+="series: $_arg_series\n";
fi

if [ "$_arg_draft" == "on" ]; then
	log "draft on" 4;
	_metas_str+="draft: true\n";
fi

if [ "${#_arg_ns_meta[@]}" -gt 0 ]; then
	log "other metas specified:" 4;
	for _tmp_k_meta in "${!_arg_ns_meta[@]}"; do
		log "\t$_tmp_k_meta: ${_arg_ns_meta[$_tmp_k_meta]}" 4;
		_metas_str+="$_tmp_k_meta: ${_arg_ns_meta[$_tmp_k_meta]}\n";
	done
fi
```

#### Creating the headings

My article squeletton straight from the CLI

```bash
# empty content by default
_content_str="";
if [ "${#_arg_headings[@]}" -gt 0 ]; then
	_hd_level_str="";
	for (( i=0; i<_arg_headings_level; i++ )); do
		_hd_level_str+="#";
	done

	log "headings specified:" 4;
	for _hd in "${_arg_headings[@]}"; do
		log "\t$_hd" 4;
		_contents_str+="\n$_hd_level_str $_hd\n\n\n";
	done
fi
```

#### Creating the index.md file

Creating the file itself, but, damn, even after *careful thoughts* it looks like I'm missing something....

We'll have to come back to that later i guess...

```bash

# dont erase stuff willy nilly, but, hum, looks like I'm missing something here...
if [ ! -f "${_container_dir}/index.md" ]; then
	if [ "$_arg_template" == "" ] || [ ! -f "$_arg_template" ]; then
		if [ "$_arg_template" != "" ]; then
			log "template $_arg_template not found" -1;
		fi
		log "using default template" 4;
		_arg_template="${_SCRIPT_DIR}/../templates/article.md";
	fi
	sed \
		-e "s/{{metas}}/$_metas_str/g" \
		-e "s/{{content}}/$_contents_str/g" \
		"$_arg_template" > "${_container_dir}/index.md";
else
	die "file already exists: ${_container_dir}";
fi
```

befor going any further, let's test what we have so far :

```bash
./mdd article "A test article" \
  --cat my-cat \
  --cat "sub category" \
  -s "this is just a test" \
  --folder "My test article" \
  --h2 "A title for my test" --h2 "a second part to the test" --h2 "Conclusion"
```

Executing this command gives us the following structure :

```bash
|_ my-cat
  |_ sub category
    |_ My test article
      |_ index.md
```

and `cat "my-cat/sub category/My test article/index.md"` :

```markdown
---
title: A test article
summary: this is just a test
draft: true

---

## A title for my test



## a second part to the test



## Conclusion
```

Well, looks like success to me !
Now let's get back to what we missed earlier !

#### Allow ovverride of index.md

Yeah, that's what we forgot, we need to be able to override the index.md file, so let's add a flag for that.

```bash
parseArger parse bin/article -i --flag 'force "erase if exists"'
```

This modify the parsing code so we just need to update the code accordingly :

this : 
```bash
if [ ! -f "${_container_dir}/index.md" ]; then
	...
```
becomes that :
```bash
if [ "$_arg_force" == "on" ] && [ -f "${_container_dir}/index.md" ]; then 
  rm "${_container_dir}/index.md" -f; 
fi
if [ ! -f "${_container_dir}/index.md" ] || [ "$_arg_force" == "on" ]; then
	...
```

I do it this way if (when ?) we add a backup system ;)

### Nice to haves

Let"s take care of our QoL as developers and help our future selves, let's start with documentation.

```bash
parseArger document --file ./mdd  --directory ./bin --title "MarkDown for Didi" > documentation.md
```

I just pipe the result too the file, je suis un geudin, faut pas me chercher !

Completion is next, and as usual for me, something crashes, the "normal" command is as follow :

```bash
parseArger completely "mdd" ./mdd --subcommand-directory ./bin
```

which fails for me, but I use this workaround :

```bash
parseArger completely "mdd" ./mdd --subcommand-directory ./bin --no-run-completely > completely.yaml
completely preview > completely.bash
```

Why does this work when otherwise fail ? `\_(ツ)_/`

That done, the rc file require creation, this is the content :

```bash
if [ "${MDD_DIR}" != "" ]; then
  alias mdd="${MDD_DIR}/mdd";
  [ -f "${MDD_DIR}/completely.bash" ] && source "${MDD_DIR}/completely.bash";
fi
```

A small detour by the readme file to fill a bit of information :

```markdown
# Markdown for Didi

Markdown tools for my blog.
This is a tutorial project for [parseArger](https://github.com/DimitriGilbert/parseArger).
```

### Tidy up !

I'll remove the form and the makefile, I don't need them for this project.
And if I end up doing, their just a command away ^^

```bash
rm -f form.html Makefile
```

If you followed along you might have extra directory from your test, don't forget to clean them !
And we're just left with a commit to be done for now !

```bash
git add .
git commit -m "first commit"
# hub create <repo>
git push origin main
```

## What now ?

I won't re write a heroic fantasy introduction in lieu of conclusion this time, but for real, I kinda have nothing more to teach you on parseArger for now.

As for `mdd`, I'll probably add some stuff to it, but I don't know what yet, so I'll just leave it there for now. [bug report, feature request and PR](https://github.com/DimitriGilbert/mdd) are welcome though, I don't promise quick support but I'll sure have a look ;)

I'll probably go over a few other stuff I created before writting again about parseArger, but it'll be back, I promise !

{{% projectInteraction project="parseArger" %}}

{{% goodbye %}}
