---
date: "2023-11-08T10:58:02+02:00"
title: Story of a simple update
summary: No plans survive first contact, the best part is no part, check yo stagin
tags: 
  - parseArger
  - mdd
  - devlog
  - bash
  - terminal
  - tutorial
toc: true
---

A small article on an mdd update, and the process behind it. Nothing fancy, but a little bit of food for thoughts ;).

## Why is this even a post

First of all, I'm trying to make content ! And, also, I almost went at it "the wrong way", so I thought it would be a good idea to share my experience.

Now, if you never put your foot in your mouth when doing something, you should pass on the read, otherwise, you might find something interesting or at least feel less lonely.

It's on a very small scale and that is why I think it is such a good example. On top of which, you already are familiar with the project so you won't be lost, and also, it's a tutorial project...i'm gonna milk it !

## TLDR

I wanted to go at it fancy, separation between stuff and all, but I ended up doing it the simple way, and it's fine. At least for now.

Yes, it would have worked otherwise, it would have been fine or even great, prepared for improvement and shit, but, a mix of "meh, can't be bothered" and, "hum, i certainly don't need that now..." got the better of the fancyness.

Let's see how it all happened.

## Heads first

* "I should create entry for my projects on the site....huuuuuu, booooorrriiiing...."
* "well, you have a tool for that big dumb dumb" (yes, we are talking to myself, no judgement !)
* "oooh yeah, hum... but it creates article only..."
* "dude, decouple your thumbs from Uranus !"
* "huuuuuu.....OOOOO KKAAAYYY...."

```bash
parseArger generate \
  --output bin/category \
  --help-message "create a new category" \
  --pos 'title "category title"' \
  --opt 'folder "article folder name" --alias directory --alias dir' \
  --opt 'categories "article parent categories" --short c --repeat --alias cat --alias parent' \
  --opt 'date "publication date meta" --short d --alias publication --alias publish-at' \
  --opt 'summary "summary meta" --short s --alias description --alias desc' \
  --nested 'meta "add any meta you want"'
```

And then take that from `article`, and that, oh, and that, and....

## Heeeyy, wait a minute, AKA duh

So, all I did for the last 37 seconds (damn, [parseArger](https://github.com/DimitriGilbert/parseArger) is SOOOO coool !) is copy pasting article to make a simpler version of it.

Because, when you think about it, categories in Hugo are just articles, but instead onf a `index.md` file, you have a `_index.md`, maybe, just maybe, we could add an option to specify the file name, it would even make `mdd article` more versatile.

To make things a bit more user friendly (yes, you can have friendly CLI !), we'll also add a flag to say it's a category so you don't have to write `--filename _index.md` every time.

```bash
parseArger parse bin/article -i \
  --opt 'filename "markdown file name" --default-value index.md' \
  --flag 'is-category "this is a category, using _index.md as filename" --alias is-cat'
```

Let's modify our `bin/article file to reflect the new constraints.

```bash
# the end of the file 
if [ "$_arg_force" == "on" ] && [ -f "${_container_dir}/index.md" ]; then 
  rm "${_container_dir}/index.md" -f; 
fi
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

# is now 
# if is-category and filename not specified
if [ "$_arg_is_category" == "on" ] && [ "$_arg_filename" == "index.md" ]; then
	_arg_filename="_index.md";
fi

# using _arg_filename instead of index.md
if [ "$_arg_force" == "on" ] && [ -f "${_container_dir}/${_arg_filename}" ]; then 
  rm "${_container_dir}/${_arg_filename}" -f; 
fi
if [ ! -f "${_container_dir}/${_arg_filename}" ]; then
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
		"$_arg_template" > "${_container_dir}/${_arg_filename}";
else
	die "file already exists: ${_container_dir}";
fi

```

That simple, not even 10 lines (6, 6 lines, I counted them on re-read....dawn you braiiiin) ! Definitly worth it if you consider the alternative would have been a new file, with mostly duplicated code.

I could have called `mdd article` in my new command and then renamed `index.md` to `_index.md`, but it did not seem like a great solution to add 500 lines of code and another file for 10 lines of functionality, when i could add 10 (6 I said ! and most of it is modification) more lines and do more.

## Bug fixes and chores

Well, let's test our new toy, shall we ?

```bash
mdd article mdd --cat Projects --is-category \
  --summary "My MarkDown tools, a parseArger tutorial project"
```

Directory and file created ok, let's add an article then.

```bash
mdd article "Story of a simple update" \
  --summary "No plans survive first contact, the best part is no part, check yo' stagin'\!" \
  --h2 "Why is this even a post" \
  --h2 "TLDR" \
  --h2 "Heads first" \
  --h2 "Heeeyy, wait a minute, AKA 'duh'" \
  --h2 "Conclusion" \
  --h2 "What now ?" \
  --cat Projects \
  --cat mdd \
  --tag parseArger \
  --tag mdd \
  --tag devlog \
  --tag bash \
  --tag tutorial
```

aaannnnnd `ERROR 2023/11/05 10:46:34 Rebuild failed: "/src/content/Projects/mdd/Story of a simple update/index.md:4:1": failed to unmarshal YAML: yaml: line 4: found character that cannot start any token`, NOOOPE !

A few minutes of head scratching, couple of copy paste and test and, yup, YAML do not like `\t` for arrays, it wants `  `... fine, what...eeeever.

```bash
if [ "${#_arg_tags[@]}" -gt 0  ]; then
	log "${#_arg_tags[@]} tags specified:" 4;
	_metas_str+="tags: \n";
	for _tg in "${_arg_tags[@]}"; do
		log "\t$_tg" 4;
		_metas_str+="\t- $_tg\n";
	done
fi

# is now this
if [ "${#_arg_tags[@]}" -gt 0  ]; then
	log "${#_arg_tags[@]} tags specified:" 4;
	_metas_str+="tags: \n";
	for _tg in "${_arg_tags[@]}"; do
		log "\t$_tg" 4;
    # RIGHT HERE, YOOOHOO
		_metas_str+="  - $_tg\n";
	done
fi
```

Aaaand, ....,  it does not crash anymore \o/.

Maybe `article` for the command is not as good now, let's change it to `new` we have to regenerate doc and completion anyway.

```bash
mv bin/article bin/new
rm -f bin/category
```

Edit mdd and modify parsearger declaration to remove `--one-of article`, it won't be remove automagically, even if bin-directory it's on purpose, I'll probably add a flag for this behavior later

```bash
# edit mdd replace
@parseArger pos target "mdd subcommand" --subcommand-directory "bin" --subcommand-run --subcommand-use-leftovers --subcommand --one-of "article" --one-of "new"
# with
@parseArger pos target "mdd subcommand" --subcommand-directory "bin" --subcommand-run --subcommand-use-leftovers --subcommand --one-of "new"
```

A bit of parsing magic before documentation and completion generation.

```bash
parseArger parse -i mdd

parseArger completely "mdd" ./mdd --subcommand-directory ./bin --no-run-completely > completely.yaml
completely preview > completely.bash

parseArger document --file ./mdd  --directory ./bin --title "MarkDown for Didi" > documentation.md

git add bin/new
git commit -am 'ename to new + category creation + tag bug fix'
git push origin main
```

It's now all ready to go \o/.

## Conclusion

Sometimes you don't need a bazooka to kill a fly, sometimes, you don't even need a gun (trust me, if I had access to guns, I'd use that to kill flies, of course I would !) and sometimes you don't even need to kill this fly... BUT not Today !

**heavy hand droping on the table**

Oh no, Today, we squashed the damn bugger by doing almost nothing !

Joking aside, I think that there's a place and time for complexity, but it was not it.

The main objective of this project is simplicity, and adding that much more surface area so early did seem to go against that.

If there is something I realized over the years, fancy don't always mean effective, whether it's a small joke project or a big gargantuous blob of a software and we as `engineers` have a small (tiny, little, puny, dare I say it, nanoscopic !) tendency to want to add complexity, `because`.

Just, be aware of it when you plan your next stuff, and this was a good example ;)

## What now ?

Nothing much, we had a look at updating a parseArger project and went over a bit of KISS principle. 
Maybe it made you realize you went overboard with some of your work ? Do you have a way of alleviating this kind of behavior ? And, do you even care or do you embrace complexity and overkill ?

{{% projectInteraction project="parseArger" %}}

{{% goodbye %}}
