---
title: cn-registry devlog 1 - The illusion of victory
date: 2025-07-24T15:00:17+01:00
tags:
  - shadcn
  - devlog
  - cn-registry
summary: Follow me on a journey of failure and foolishness, en route to master the current crop of AI.
slug: "index"
---

## Why ?

I looked for something like that and did not find any, so I am building one !

I will take this opportunity to build it in public, as much as possible ! Meaning most prompts and conversations will be available for you to read and "inspire" yourself !

Why not all conversations ? Well, sometimes, I forget, other times... I'm swearing way too much so it does not bring any value ! (I am grumpy and irritable as a default state, pain makes it worst... at the moment, the pain level oscillate between 2 and 5 out of 10 ^^)

I also want to show others that you can actually create something with AI doing most of the grunt work of dev with "careful" orchestration.

Is it going to be perfect ? XD what a stupid question ! NO ! 'f course not !

Can it get the job done ? I certainly hope so !

## What is it already ?

It is a library/marketplace of Shadcn ui components ! I was tired of hunting for cool components and blocks all around the internet !

Between github lackluster SEO and worst devs' website's one, it is really hard to come across new components, and it is a shame cause some are fantastic !

Also, as a creator of some component (with awful terrible SEOed sites...) i kind of feel unseen, sooo [cn-registry.dev](https://cn-registry.dev) was born !

## The process

Like I said, this is a build in public thing, so I am going to try and share what I learned with you (and my future self if this MF wants to listen !).

How I did things, what worked, what did not really do so, my fuck ups, hope and delusions...

In a sense, I am going to make mistake and look like a fool so you don't have to !

Let's start at the beginning...

### The Idea

Plenty of time I see people asking for ideas on things to build, to other humans, or worse, AI...

No... please don't ! not here !

I sincerely thing ideating is **The** thing that will separate us from machines for awhile still ! You should not delegate that !

"But how do I find ideas then ?" might you witty reader ask me ! And so rightful would you be !

So let me answer you with a question, that could trigger some ideation !

Are there no problem that need solving, in the place that you live in ?

Poetic rhymes aside, solve one of your damn fking problem man (or girl, you are welcome to do so too !) !

That way, even if you don't end up having clients, you'll have solved one of your problem !

For me the problem was "lazy ass dev want find shadcn components easy" ! There you go, how do you solve that problem ?!

### Initial plan

Nothing ground breaking or revolutionary, a dumb directory would do the trick... but that would lack a bit of flair... wouldn't it ?

Solving a simple problem does not necessarily mean a simplistic solution and I was already very keen on over-engineering my own tombstone sooo, let's go for that !

Why not sprinkle some social stuff on it ? It's not because I am limited regarding those skills that others are !

User account, likes, comments ! there you go ! Now we can socialise !

We have the basic Idea of what we want ? Yeah ?

Yeah ! Now we can go bother some AI with it !

### Start proompting

```
I want to build a website using nextjs 15 and shadcn  (i got the stack figured out !) and I need a complete plan to create the front end !
the project is called "cn-registry" and it will be a registry of shadcn components and tools, because hunting for them feels like a full time job.
I want you to plan the needed components and pages, I aim for maximum reusability so if something make sense standalone, it should be ! i do not want you to create code, just the plan !
I want a home page with carousels, one with the 10 latest components, one with the trending one
components will have a name, a description, a repo link, a website, an installation url, categories and each should have a dedicated page with the copiable install command, the repo readme and github info, some showcase with code toggles
Tools will be the same but the install url might be for an npm package or not exists
I want a search page with card or list results and filters on categories
same for tools but on a different page
I want to have a star rating system and user account where user can see the components they stared
User will be able to comment on components
```

As you can see, simple, (in)efficient, (de)organized ! And a couple refinement later, I have my intermediary prompt for V0 !

I wont bore you with the mile long prompt (you have convo link in repo ^^) but it was a good mile long and i did not change much !

Suffice to say that after that I had some "mock data stuffed" frontend prototype for... where am I going to put that... ?!!

### Select your stack

I already did, and you probably should think of that before proompting to be honest ! For me it was easy, I just reached for my current default stack Nextjs front and back, trpc, tailwind and shadcn.

Yes, it is boring. Yes, everyone is doing the same. I don't care.

I start a gazillion projects (and a half) every month cause I am unable to focus on one thing at a time, it doesn't mean I have the cognitive bandwidth to try and learn new stuff every times !

There is also plenty of good docs and resources for all these, which make it easy to work with without too much prior experience

Plus, as a massive, Massive (MASSIVE !) bonus : It works well with AI ! (mostly, sometimes)

Am I saying you should pick this stack ? If you like it, yes, otherwise, i couldn't care less !

Pick what you know, the new hyped stuff or what tickles your fancy ! Really, I couldn't care less, but I care for you to do it right ! Use [better-t-stack](https://better-t-stack.dev) !

yes, this is authoritative, but if your stack is in, use it ! 1 command, boom, project scaffolded and ready to go in seconds (thank me later)

### Let the music start !

```markdown
[x] Idea
[x] Concept
[x] project initialized
[x] frontend prototype
[ ] proper plan
```

Ooooh ? You thought... ? you thought I was going to open my favourite AI agent and start vibing away ?

no no no ! This is not the way ! You are going to go back to your first AI pal you used for the front end prototype plan and you are going to ask it for another plan !

```markdown
I am using the latest version of drizzle orm and postgres so i would like you to carefully plan the whole complete data model I will need,
including user setting and admin/creator utilities table tha migth be needed in the project. we will iterate to align with my goal but try to makee it very comphrehensive
```

It did a pretty good job with my previous frontend plan alignement in one shot soooo...

```
cd workspace/Code/cn-registry;
claude
"I want you to implement the server complete side of the project following this :
  **cn-registry Complete Data Model Plan**
...
  better auth is already setup and running,
  I want schema definition and trpc routes with complete access management for security.
  make sure the apps build when you are done with the backend.
"
```

Et en voiture Simone !

Realignment aside, this got me a building backend that I asked the agent to wire up to the frontend.

### Broken string and other misadventures...

Were you waiting for it ? To be completely honest, I did not think it was going to be so early...but yes, no plan survive contacts with the enemy.

Which enemy ? Trpc ! No no ! not trpc trpc, trpc version and the fact that a major revision came out between the training cut off date and the release/adoption of trpc version...

What does this mean ? AI follows patterns it "knows", guess what it does when it doesn't know the patterns ?

Yup, it's "hallucination time" baby ! Wooooooot Wooooooot ! -\_- Can you feel the pain ? ok, good.

But for a villain in the story, a Hero will come forward, you see

A hero to help the dragons slay, and its name is LLM dot txt

```markdown
my stack is using the following package.json files
Agents often fails on trpc usage because their knowledge is out of date.
I would like you to fetch the lates trpc docs and prepare a comprhensive but concise llm.txt for my agents to work with.
it is only destined towards LLM so you can forgo absolutely all the fluff and present information in the best possible way for you to ingest it efficiently
```

I fed the responded file to my agent, and behold, a few prompts later, I was served dragons' heart for dinner !

### more, More, MOOOOAR

Do you feel the power rising ? The exhileration of AI acceleration ? Is your brain broken and addicted yet ?

Nooo ? well, we are going to have to work on that ! Maybe it's because we lack documentation ?

You are very right ! So I asked gemini cli to do that !

Unfortunatly, i do not have this prompt anymore, but it went something like :

```
I am working on this project [description]
the front and backend are prototyped, the apps build but i did not test anything yet.
I would like you to analyze it very (very ! VERY !!) carefully !
you have to open many files to make sure you understand the app and how it is built.
once done, please create some documentation about that.
```

to which I invariably had to complement after the first response (exact paraphrasing)

```
oooOOOOH FFS ! HOW THE F DO YOU WANT TO UNDERSTAND ANYTHING, YOU OPENED 5 FILES, 2 OF THEM WERE PACKAGE.JSON ! OPEN ALL THE FILES ! **ALL OF THEM**
```

Seriously, how does anyone work with gemini these days ? It ended up giving me some decent documentation after that flogging though !

What ? Why do I make the model document the thing already ?

```
Good. now that you have a complete understanding of the full project, i want you to create a plan to finish the implementation of the existing base.
then, I want you to create a plan in better.md that outlines possible enhancement to the base application.
One I want is a cart system so a user can add component to it and get a complete install command for all the components he selected.
be creative and come up with functionalities that would make this platform stand out
```

There you go, this is why ! now that you have something more than a couple of sentence, agents can stretch their legs !

What do similar enough architectures and software have as functionalities ? It will know ! You'll be left with the cherry picking and it might even give you more ideas !

### Tidy up and go forward

Armed with gemini's assertion of the codebase, I asked claude to do the work (you would have to pay me to allow gemini modifying my files !)

Once complete I asked it to create a proper plan for the extra functionalities I chose

- cart system
- project system
- github integration
- creator profiles

It gracefully did that while I started testing the app. Systematic clicking and typing, going from error to error, indexing them by small groups, asking my agent to take care of them.

This is the perfect occasion to start having a look at the code... yes, just now.

To be fair, I was probably less than 3 hours in and I also come from a time where bootstrapping an app was probably that long sooooo... not saying this is good, but I have done that a dozen times already and I know what to expect.

Bug hunting took an hour or so, nothing major, missing "use client", dumb state management, over complicated logic, a bunch of alerts and prompts, in short, claude's specials (I was spared me the blueish purple gradient this time though...)

Implementing the improvement plan was business as usual and took around another 3-4 hours

```
in @improvements.md implement phase/part ...
```

### One day at a time

I realize this is getting long, and, well it is the end of day 1 so I am going to stop here for now !

At that moment I had a mostly working app, with an admin side i could get in, component and tools could be added.

And as my eyes were all closing, I could not see shadows brewing

Covering me with joy and warm for my app worked like a charm

An innocent small idea that would become ...[find me a noun of something bad finishing by the sound a, i need a rhyme]

In the mean time, here is the [demo](https://cn-registry.dev) and the [repo](https://github.com/DimitriGilbert/cn-registry), feedback greatly appreciated as always !
