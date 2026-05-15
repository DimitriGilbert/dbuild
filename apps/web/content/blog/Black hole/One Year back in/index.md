---
title: "One year back in"
date: 2026-04-14T00:01:00+01:00
tags: [
  "AI",
  "work",
  "multiple sclerosis",
  "Clanker"
]
summary: "After 8 years of being pushed around by my disease, AI helped me get back to work, it's been a year, so what did I learn"
slug: "index"
# og-image: "/images/blog/blackhole/from_ralph_to_eric/Eric_saw_Ralph.webp"
---

These are some of the lessons i learnt from a year of coding using AI, but let me give you some context first.

So, in 2017, I quit my job in Singapore cause I burned out, badly. I've been living on disability benefit since 2020 as I was diagnosed with Multiple Sclerosis (turns out, the burn out was helped ^^').

To get these things out of the way, yes, I'm very fortunate to live in France and be able to receive disability benefits, I'd probably be dead otherwise.

And if you think MS is not enough to claim disability benefits, I would like to formally request that we swap sides for a month and have a chat after :)

During all that time, I kept learning and trying new things even giving a hand to a couple friends for projects along the way, nothing serious.

I jumped on copilot on beta launch and ate at cursor's table quite early, but then again, I was mostly dilettante

But a year (and a month) ago, excited by the amount of work I could do with AI even on my bad days, I decided I wasn't going to be bullied by my body anymore and I'd try to get back to work !

The journey has been tedious and chaotic, but, here is a rundown of what I've done and what I've learned.

## LiteChat: learning by building, with the wrong tool

Cursor and sonnet 3.5 is what triggered it for me, this (in some form or another) was the future, but it felt like magic so I did not like that.

What if I was building a chat to understand how it works ?

Yes, that would work... But if I was to do it with the magic tool, would I be able to understand what happens... ?

No... unfortunate but, the magic would have clouded everything, but I still wanted the no typi-typi comfort...

What if I built an AI chat in an... AI chat ? Prompt everything, trying to not have a single line of code written by myself !

Stupid ? YES !

A good way to learn ? also yes ! I'd choose every file and feedback needed by the AI to get results and I'd see every output I would be given !

using [t3.chat](https://t3.chat) and gemini 2.5 I built [litechat.dev](https://litechat.dev) ! (yes, I'm one of the reasons you can't have nice things and Thank you Theo for the tokens... ^^')

This was my first AI revelation: context is hard, too little will cause hallucination and too much will cause moronisation.

This was a real hurdle and this was what was taking me the longest, gathering the files the AI would need

It was getting annoying and I felt I had a good understanding of what was happening under the hood.

Plus, Sonnet 3.7 was out and reliable tool use was actually a thing now, so back to cursor it was !

## Formedible: a sidequest to let AI build forms on the fly

One of the things I wanted for litechat was a way for AI to easily generate forms to interact with the user in a guided fashion

This was one of the things I missed in t3.chat when working like I did

I did what every sane dev running high on AI would do : I created a shadcn component for that, [formedible.dev](https://formedible.dev)

A schema driven form "builder" so AI could create consistent forms just by outputting json (they were already decent at that)

Another revelation about AI occurred: they like 'em complicated and if you let things go, they are gone, far and fast !

Dumb interface, duplicated code, unoptimized code...have a look at any of the 2000 lines from the use-formedible hook...

The result is a working tool/lib/component but it is far too complex IMO

I'm not happy with it and I will work on making things better at some point, probably starting from scratch !

But still, prompted properly, models were capable of creating complex forms very fast and with ease...

That is when it clicked, you can just explain AI about the tools you created and it will use them... crazy stuff...

To put that to the test and because plain text and forms chats were boring, I added a mermaid visualisation and it worked, so I did the same with chart generation and react flow diagrams and runnable JS or Python block and Strudel music... everything more or less... worked...

So, it's all in [litechat.dev](https://litechat.dev), for free (minus the tokens) and without trackers !

## Sprynge.me : new stack, new workflow, new teammate

The time is Sonnet 4, the new hot thing is Claude Code, MCP is still sexy and I'm starting a new project with @benboarer

The main goal of it being to promote good habit for X growth, just like the other 997 similar projects ^^ 

I was bored of REST API and CRUD boilerplate as I've been doing Web platform things for close to 20 years now, and I've been promised realtime almost 10 of those ago.

As it happens Theo was praising [Convex](https://convex.dev) just for this exact feature, so... why the hell not try that

Shake things up o clock it was, as I went for bun + tanstack start + convex in a monorepo (wcpgw ?)

It did bite me later on because of bun lack of support for monorepo and tanstack start beta status so I ended up migrating to npm and nextjs. I would have liked not to but bun refused to bundle the server part of tanstack start, preventing me to use better-auth X login properly AND i was stuck on an old version of better-auth and tanstack start because of the convex integration... this was not a fun week, at all...

Important lesson learned, AI makes adopting a new tech MUCH easier, but edge cases will still be edge cases and no amount of token burn could find and fix them.

After around a month or so, we ended up having a working tool that around 100 people enjoyed for a while and I stepped up my AI agentic workflow, but it was not all roses and rainbows !

Rate limits were squeezing me as I was being introduced to [task-master.dev](https://task-master.dev) ! When you just have to execute a plan, your burn through your limits much, Much, MUCH faster

So I set out to find a cheaper complement for Claude and ended up trying z.ai's GLM 4.5, it was brilliant !

Not quite as good, but limits were nonexistent and it was 75% of the way there and things only got better with 4.6 and 4.7

so much so that I just dropped my Claude sub and subscribed to GLM coding plan for a full year.

I liked that foray into the world of organised workflows for AI ! Output quality and speed were up and it was less of a faff to keep working on a project when doing that... but...

## task-o-matic.dev : feeling the waters of agents orchestration

task-master was not doing it anymore, I wanted things it could not do and jumping into the codebase was a bit of a faff.

what do you do when you are at this point ? Well Pinky, we do as we always do at this point, you forge your own set of wheels !

And forging I did, I wanted a lib, cause as much as I enjoy my terminal window, many muggles are still afraid of it and prefer clickodromic UI.

That way, I could have my cake, eat it and share it with others as well !

I went all in on the thing !

Multi model PRD creation, questioning mechanism, multi model PRD improvement, task planification and planning with reconciliation, multiharness execution loop (BTW, multi model generation is also available in [litechat.dev](https://litechat.dev)... in case you were curious ;) )

The. Whole. Shebang !

It could probably have made you a sandwich as well if the cook had an API !

New important knowledge point, don't try to reimplement the harness ! the multi model execution was trying to, but I later found out that it would have been easier just to do that using an existing harness (Claude code, opencode, codex, gemini, ...)

Yes, AI makes you faster, but you know who else is faster because of AI ? The teams of talented people that were already building a harness !

I tried a bunch of things with it and it was a nice tool ! So I proceeded to the next step : a TUI and an app !

Things were going great ! A couple of months in, I had more or less everything clean-and-tidy(-ish) and ready to go...

People around started to talk about skills more and more, I've had a look at them when anthropic put the spec out... md files... whatever !

## subagent-orchestration: 2 months of work replaced by a markdown file

Still, you know, people kept yapping, a lot so... I gave skills a second look

well, the bitter sweetness that ensued was very real... a couple of md files just erased 85% of my last 2 months of work.

One side of me was very happy cause it was much more elegant, but the dev side that put 2 months of work in this lib/cli/tui/app was very much not !

"Can this be a skill ?" should now be the default question every builder/founder should ask themselves

contrary to the current psychosis trend, I don't think markdown is the new python but a combination of both is the new killer.

the end of year dark days and the growing hints of seasonal depression lead me to a "soul searching rerun binge watching" month or so until something clicked.

What can't be replaced by an md file ? I only see 2...

Infrastructure, but that costs money or at least marketing foo that I don't possess.

And the second thing, community, the fun of sharing something you enjoy with someone who will do the same...

## arcade-vibe.app: fun and goofy doesn't mean useless

It all started from my personal benchmark, a 5 lines prompt that asks a model to create a vertical scroll shooter, using [litechat.dev](https://litechat.dev) js block (yes litechat again).

Every new model drop, I was running it and then sharing the results with a group of friendly people on discord

until one day, one of them told me I needed some improvement on the prompt to which my first thought was "well, you could do it yourself..."

There it was ! The fun idea ! How good of a game can you create in a single prompt ? And compared to your friend ?

Perfect ! fun and competition ! How could this possibly fail ?! (did I tell you I was a poor marketing person ?) 

You could even argue this is a good way to benchmark models or even improve your prompting foo !

And now I have a bunch of tools in my box to create the MVP ! I'm sure it'll be a couple of days, 4 tops !

There lied the lesson for this part, code is not the bottleneck anymore ! I was 80% of the way there at the end of the week.

It still took a month or so for me to ship the darn thing !

Testing and fixing, edge cases discovery and UI tweaks are still the bane of my existence, it just so happens that AI shrinks the time to get there apparently !

If you want to go and have a look at it, whether you play games, create new ones or want to benchmark models, I'll give you credits if you give me feedback :D (and you can also BYOK, just in case you're afraid I might bite) it is all at [arcade-vibe.app](https://arcade-vibe.app)

## Nétwayé, baléyé, astiké... Kaz la toujou penpan !

Cleaning, dusting, polishing... let's keep this house clean.

With all that I learned this year about how context Goldielocks' zone matters, the fact that AI will always go for the most over-engineered solution that still fails on edge cases sometimes, or that you are one markdown file away from your project going to the bin, there is One major takeaway

The one thing to remember from this whole year for me, is that my job as a dev will stay exactly the same but in a completely different manner !

My main job of a dev will still be to ship features while keeping the house as clean and tidy as possible, limiting dirty tricks and technical debt, just like before, the only difference is that the house got very big, very fast.

I've always been more on the creative side of the dev spectrum, so I will continue to conceive architectures, specify code organisation and test the produced code, not much changed there and it will probably be the case for another year at least.

What will not exist anymore will be the coding grind. I've been on the "if it works well enough" side of things for a while and as much as I love beautiful code, I've learned the hard way it almost never lives long enough to justify its creation.

For me this is very important, because it means I can work again ! I can still rake in a few prompts on brain fog days, pain is not stopping me anymore unless it is very bad and even if I can only work for a couple hours before expiring a good amount of work has been done ! AI did not cure my MS, but it made my work possible again !

Some new grind appeared though and I tried to respond to the "proceed to the next task, review, fix this" prompt loop from hell by creating [task-o-matic](https://task-o-matic.dev), but it was the wrong tool

Not leaving you with enough control while requiring constant adjustment is not the best of combos.

You probably are screaming OpenClaw or Hermes (you know, those agentic frameworks) behind your screen right now, I understand why, but I don't like the idea !

I want something more portable, that can live outside of a complex harness and fit in my existing workflows without requiring a fat bunch of setup.

Ultimately, these should also be able to run in any "Claw framework" as well (remember about the talented people building harnesses from earlier, same jazz here !)

So, that's what I started building and I'll be talking to you about this new project in my next article !
