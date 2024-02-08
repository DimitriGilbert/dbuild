---
title: Why Hugo ?
date: 2023-11-18T15:38:07+01:00
tags: 
  - devlog
  - hugo
summary: Why I chose Hugo for this project over alternatives.
---

After more than a decade of web development under my belt, I've seen a lot of things, and I've done a lot of things. Experience. It's great !

Sometimes though, it will hold you back !

You start to become complaisant, *your* stack is **The** stack, this *fad* will **die** soon anyway, (or worse) I've *always* done it **this** way. 

I'm the same, so sometimes, I kick myself a bit, get my thumbs out of their dark place, and try something new. I'll guide you through my selection process.

## NOT that !

**That** being wordpress, in this case. First time I used it was in '06, as a installer/maintainer(ish), I did not like it. The first Job I had, we were using WP extensively, I did not like it. I used it on my own and help a friend, I still did not like it.

Don't get me wrong, it has ,still, a time and a place to be used even if I don' like it. Not here though. In order of ascending importance, this is why.

### Hardware/stack requirements

Yes, it would run on a potato but if you want your site to be fast, you are going to need good hardware. 

On top of the web server, you need PHP and a SQL database of a decent size so if you want a somehow fastish site, no free hosting for you.

### Mandatory updates

Updates are cool right ? Yeeaahhh, weeeell, yes, but... You gotta be on top of the damn thing all the bloody time.

Core, theme, plugins... damn... plus system updates if you configure you server yourself.

And this **HAS** to be done ! because ...

### Security

It's a nightmare. Because it is used on more or less 40% of the web, it is a prime target for hackers.

That is without talking about plugins.... between further attack surface and down right malware... you have to be so careful...

### But you can mitigate that !

Yes, you can. Theme from scratch, no/few plugins, html export, etc. It's gonna be fun !!! **NO !**, it is not, well, yes it is but it gets old *sooo* fast...

No, what I need is a Static Site Generator !

## What do I need (want !)

I know what I really do not want (wordpress), now, what do I want ?

### I want simple

Low code (no code ?), flat files (markdown if possible), builds to html. BOUM, that is it.

No database, no admin gui, I want it slick. My editor, a terminal and a browser should be all I need.

This also excludes javascript ! Wait why ? Because I'm tired of js this, js that, dependencies for centuries, node_module black hole directory, etc... I still don't really like javascript 15 years in, if I can do without, I'm'na be A, O, K !

### I want fast

I want my site to be fast, I want the build to be fast, I want the dev server to be fast, I want the deploy to be fast.

I like fast website, especially when you have mostly text ! This is mostly text, it should be fast !

I do not know if I'll end up using some sort of hosted CD/CI thing but even locally, I'd rather have 1 second builds than 10 minutes ones.

I don't need light speed when writting (or developping the site) but modifications should be visible in under a second (time for me to switch workspace).

If I can avoid more manipulation than pushing to git when I want to update the site, I'll be happy. Fast ops means I am more likely not to procrastinate !

### Gentlement, choose your language !!!

I am not the most adventurous of devs. I do not like feeling dumb and starting in a new language is a sure way to feel dumb.

I am (was, did not practice for years) fluent in PHP, I started programming with python eons ago, I tried ruby a bit. If I did not want to feel dumb, I would have had a bunch of choice I guess.

Yet again, sometimes, it's good not to be the smartest guy in the room ! (What do you mean I'm the only one here ?) On top of which, I mean, have you seen the hype around new languages ? `Go` this, `rust` that, `elixir` blablabla... I want to be part of the cool kids too !

`elixir` is out, I don't like functional (sue me) ! Sooo ? rust ? or go ? go ? or rust ?

Well let's open a couple of source file to see which one seems more appealing...

Go seems... ok, nothing I can't grasp from a look...

Now Rust, what do you..... oh geez nope, *nope* ! I got Arduino for that, probably really cool and stuff but, meh, I pass.

Go it is then, not that I plan on coding anything (from scratch, and at all if I could) but it would be an entry point ^^. So what's the most popular Go SSG (Static Site Generator) ?

## Hi Hugo !

Half a second of internet search later, my browser is shouting Hugo at my face, I guess it's popular then. Trying something new does not necessarily mean esotheric, having a bit of a crowd already means that it's more polished and that you'll find documentation and...

### Themes, that's good !

Can you hear the sweet whisper of lazyness calling you ... (*`"someone else done most of what you need, why bother ?"`*). As it turns out Hugo have a good selection of [themes](https://themes.gohugo.io/) and easy ways to overwrite it, cool.

I settled on [m10c](https://themes.gohugo.io/themes/hugo-theme-m10c/) for a few reasons:
* dark (you'll burn your retinas on someones else's site)
* side menu
* sass support (I hate css, sass a tiny bit less)
* 100% page speed score

It's good enough for now, yes there are a few things I don't like and I'll probably create a theme at somepoint (wink wink).

Well, theme selected, now you get to work !

### Don't install, run with docker !

I stoped installing most of my tools, I use docker now, it forces a bit of tech on me, it consumes more space... but **HEEEEEELLL** it makes your life much less sucky when you have a petazillion projects... 

Ever updated node (or php, mysql, apache, whatever) for one project, just to utterly anihilate most of the other stuff your were working on ? ....this is **NOT** fun !

I tried VMs (Virtual Machines), but gigs were going way too fast ! 

Containers are the best compromise IMO ;)

I use aliases to "install" containerized tools, here is my alias for hugo:

```bash
alias hugo='docker run --rm -it -v $(pwd):/src -p 1313:1313 klakegg/hugo:ext-alpine'
```

you could go overkill with something on the line of:

```bash
export HUGO_DOCKER_PORT=1313
export HUGO_DOCKER_IMAGE=klakegg/hugo:ext-alpine

alias hugo='docker run --rm -it -v $(pwd):/src -p $HUGO_DOCKER_PORT:$HUGO_DOCKER_PORT $HUGO_DOCKER_IMAGE'
alias hugo-srv='hugo server -p $HUGO_DOCKER_PORT'
```

I did not ^^.

## I'm still having to code, a bit

Theme customization means a bit of html and css, on top of that, shortcodes are cool, I am going to try to use a good amount, I already use them for outro and common project presentation stuff. 

I'll find a way to share them, maybe an [mdd](https://github.com/Dimillian/mdd) command to simplify/streamline/consolidate my shortcode creation process... we'll see...

Nothing in Go for now, which is good, I can concentrate on content !

## What now ?

As very lightly hinted, you can expect more on this site creation process, maybe some tutorials if I feel confident enough in my knowledge ^^.

{{% projectInteraction project="dbuild" %}}

{{% goodbye %}}