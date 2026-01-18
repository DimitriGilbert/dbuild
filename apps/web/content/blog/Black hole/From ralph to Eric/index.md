---
title: "From Ralph to Eric"
date: 2026-01-17T00:00:00+01:00
tags: []
summary: "Everyone is going crazy about Ralph loop, and they are cool, but I think we need to upgrade to concept to an Eric loop !"
slug: "index"
---


# From Ralph to Eric

I wont reintroduce the concept of Ralph loop, if you have been anywhere near AI in the first half of January 2026, you have heard of it ! If not, you should go and watch [Theo's video](https://youtube.com/) (or someone else's but this is a good !)

You probably know which comics character Ralph is refering to, but Eric... who could it possibly be ?

If you thought short, fat and angry, you'd be right ! I'm of course talking about Eric Cartman from South Park !

While Ralph is naive and innocent, Eric is calculating and manipulative. Not something I'd look for in a Human, but for managing a bunch of AIs ? HELL YEAH !

## The Eric Loop

An idea, even if good, always need some work and some back and forth to be implemented. So we first expose the idea to the AI to get an requirement document (PRD) and we work on it !

How ? you'll need to read first ! and straight away update parts you don't agree with or things you need to be more thorough !

Once that is done, ask AI models to ask You questions about the PRD and give all those, the PRD and your replies to another AI for update

Rince, Repeat, until you are satisfied with the document.

You can even get multiple model go at it to then compare and merge the outputs, using AI, of course :D

This is where we start diverging from the basic Ralph loop. instead of just passing that to the AI and hoping tasks will be implemented properly we get an AI to pre split and formalise the tasks and sub tasks into a list !

The rift grows further as we split the task implementation in several steps with:
* a planning phase that analyzes the requirements for the tasks, existing code, and conduct the needed research
* an execution phase to do the actual work,
* an optional automated verification phase (check types, build, tests, ...) with automated feedback to the execution phase in case of errors,
* an result review phase, that can send back to the execution phase for further refinement.

Once all that is done ? the Eric loop goes on for the next phase of the plan, just like Ralph !

## But, Why... ?

Separation of concerns !

Yes models have gotten smarter, but if you played around with sub agents and skills, you know that prompting is not dead (yet...)

Having a neat separation like that helps you have better prompts for each phase of the task execution.

As a side effect, it mmeans you can control which model is used for which phase maybe you dont need Opus the whole way if it made a banger plan !

## What would it look like ?

We are going to create a small project from an idea I have, you can do it to if you like !

It's called Tiny-till, a small app to have a simple till for itinerant merchants.

But we are going to need a tool to help us ... 

### Task-o-matic

Yep, I already kind of made said tool :D ! (https://task-o-matic.dev)

I'll write more about it in a future post ! but you already have plenty of content to go through on the site itself.

I made sure to generate a lot of docs and a couple tutorials so you can already give it a try if you'd like !

But in a nutshell, it helps you create PRDs, refine them , split into tasks and subtasks and finally wiring all that to your favorite AI harness !

### Let's get this rolling

For the AI to operate properly, we need a specific stack, that way, we limit hallucination !

#### Initialisation and bootstrapping

Task-o-matic uses (https://better-t-stack.dev) under the hood to bootstrap the stack so let's do that !

```bash
npx task-o-matic@latest init init --project-name tiny-till \
  --frontend tanstack-router \
  --backend none \
  --package-manager bun && cd tiny-till
```

Boom, a monorepo for Tiny-till ! Batteries included : tailwind, shadcn, build script and all :D

Why `init init` ? you might have missed the whole using AI to code whole projects, sometimes... it is not aesthetically pleasing, and you should learn not to care to much (is my take on that... or lazyness...)

You will need a .env file to configure the AI stack.

```ini
AI_PROVIDER=openrouter

AI_MODEL=nvidia/nemotron-3-nano-30b-a3b:free

OPENROUTER_API_KEY=sk_123456azertPOIUY7890i58008
```

#### Document the requirements of your project

Now, we tell the AI what we want to do, but why would we limit ourselves to 1 ?

```bash
npx task-o-matic@latest prd create \
  --ai-reasoning 4096 \
  --stream \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096" \
  --ai "mistralai/devstral-2512:free:free" \
  --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096" \
  --ai "minimax/minimax-m2.1;reasoning=4096" \
  --ai "z-ai/glm-4.7;reasoning=4096" \
  --ai "google/gemini-3-flash-preview;reasoning=4096" \
  --combine-ai "z-ai/glm-4.7;reasoning=4096" \
  "i would like to build tiny-till,
  it will be a small web app, local first (for sparse internet connection) that serve as a very simple till for on the go seller, farmers markets stall, etc...
  the idea came from me watching my baker who does delivery tour twice a week. she is always fighting here calculator to make the tally and she gromle about it a lot
  the idea wwould be only a few screens : 
  - product management (add/remove product, name+price (img optional) ) : a list with action buttons, + or edit happen inline (+ at the top)
  - a tally page : grid of product for fast and easy access (row of 2 or 3 for mobile, 4 to 6 on tablet, normal/compact variant, control by setting)
    - clicking on a product adds it to the count
    - number of this product added appear in the card, click on it trigger an input field to enter value with a remove button
  - a setting page : theme, display, import/export catalog
  No saving, it is purely done too calculate the price and is not meant for accounting purposes
  i am using tanstack-router and the project is already set up with tailwind css typescript and shadcnUI"
```

Am I using free endpoints for "real" work ? Yes, yes I am ! Does it distort my views on how much AI work should cost ? ... Why would it ? No, no, you just being a killjoy right now !

#### Petrol is not the only thing that needs refining !

A few minutes later... I got myself this (`cat .task-o-matic/prd/prd-master.md`)[/assets/blackhole/from-ralph-to-eric/prd-master.md] it doesn't really need more questions, but let's see what Claude has to say, shall we ?

```bash
npx task-o-matic@latest prd question  --stream \
  --file .task-o-matic/prd/prd-master.md \
  --ai-model anthropic/claude-4.5-sonnet --ai-reasoning 1500
```

Well, let's answer those... some are pertinant ! I guess that's why we bring out the big guns !

Let's reply !

```bash
npx task-o-matic@latest prd refine  --stream\
  --file .task-o-matic/prd/prd-master.md \
  --ai-model anthropic/claude-4.5-sonnet --ai-reasoning 1500 \
  --output .task-o-matic/prd/prd-master-refined.md \
  --questions prd-questions.json
```

Questions are asked interactivelly ;)

```markdown
"The PRD mentions using Zustand with persist middleware for the Catalog, but also specifies IndexedDB as the storage layer. Should Zustand's persist middleware be configured to use IndexedDB directly, or will there be a custom sync layer between Zustand and IndexedDB? This affects how image blobs are handled since Zustand persist middleware typically works best with serializable data."

yes, configure Zustand's persist middleware to use IndexedDB directly.
```

```markdown
"For the 'Tap Badge to manually enter quantity' feature, what should happen if a user enters invalid input (negative numbers, decimals, non-numeric characters, or zero)? Should zero be treated as 'remove from cart' or should it maintain the item with 0 quantity until explicitly removed?",

zero should be treated as 'remove from cart'.
```

```markdown
"The PRD states the tally is 'transient' and held in memory, yet also mentions using sessionStorage. Given that sessionStorage persists across page refreshes within the same tab, this conflicts with the 'privacy and simplicity' goal of resetting on refresh. Should the tally truly reset on refresh (pure memory), or should it survive accidental refreshes during a transaction (sessionStorage)?",

no persistance, this is not for accounting and should only be in memory, when a new tally starts, the previous one does not exist anymore.
```

```markdown
"With TanStack Router's file-based routing, how should the navigation structure be organized? Specifically, should the Tally Page be the root route ('/'), and if users are on the Settings or Catalog management page when they refresh, should they be automatically redirected back to the Tally Page to prevent data loss confusion?",

yes, / is the tally page, yes redirect to tally page.
```

```markdown
"The image upload feature is marked as 'optional' for products, but the PRD recommends 'no images for MVP' in the risk mitigation. Should image upload functionality be completely excluded from MVP (Phase 1-5), or should the data model and UI be built to accommodate images even if the upload feature is disabled/hidden initially?",

no, i want images, just inforce a strict size limitation, 128*128 px, this is not meant to be a full image gallery, just a thumbnail for display, future improvement maybe to try and resize/optimise bigger image directly on device...but not in MVP !
```

```markdown
"For the Import/Export catalog feature, what should happen when importing a JSON file that contains product IDs that conflict with existing products? Should it merge (overwrite matching IDs), append (create duplicates), or prompt the user to choose? Also, should the import validate the JSON schema and handle corrupt/invalid files gracefully?",

overwrite and yes, must validate.
```

```markdown
"The 'Compact vs Normal' view toggle affects card size, but how should this interact with the responsive column count? For example, if a tablet user sets 6 columns in Normal view, should switching to Compact view automatically increase columns (e.g., to 8) to utilize the space savings, or should column count remain fixed per the user's explicit setting?",

yes, auto increase, 'tis why we want compact !
```

```markdown
"Given the Turborepo setup mentioned in the stack, is this application intended to be part of a monorepo with potential future packages (e.g., a companion admin dashboard, analytics service)? If so, should the data models and storage utilities be architected in a shared package from the start, or is this truly a standalone application for now?"

no, single package for now, we'll see later for the rest. let's keep it simple for now.
```

Well, this little stunt just costed me a nice 15 cts, more or les 10x more than the first PRD generation...

I don't know what is the most amazing... that 

* 1 call costs more than the 10 previous, 
* I can complain about a 2 days worth of work document cost 15 cents for only a few seconds of work !
* a document worth 2 of my days of work costs 15 cents to produce...in only a few seconds...

I haven't decided yet...anywooooooo, time to move on and not get siderated !

#### Touching up and go

When i said seconds, i lied, I spent 5 minutes editing the file. to fix lib versions, marked install and config work as done, and, finally, set expectation for the design.

the last thing we have to do, is ask an AI to split into main tasks.

once again, i wont only do 1, but this time, I'll ask Claude to be the final task creator, from others input !

```bash
npx task-o-matic@latest prd parse  --ai-reasoning 4096 --stream \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096"\
  --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096" \
  --ai "z-ai/glm-4.7;reasoning=4096" \
  --combine-ai "anthropic/claude-4.5-sonnet;reasoning=4096"
```

And there goes another 8.2 cents burnt for the token Gods, but in return, we get a detailed breakdown of the tasks required to complete the project !

We still have to split those tasks though... To make them more palatable for the current crop of AI models ! 

You should really consider reviewing the tasks in detail before spliting, not vibe planning like a muppet ! (guess what I did ^^)

```bash
npx task-o-matic@latest tasks split  --all --stream \
  --reasoning 4096 \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096"\
  --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096" \
  --ai "z-ai/glm-4.7;reasoning=4096" \
  --combine-ai "anthropic/claude-4.5-sonnet;reasoning=4096"
```

I think Claude is not necessary here, but I had me $3 of openrouter credit i have to burn before the end of the month soooooo... big guns it is !

Burnt a tenth of that ! but now... we are actually ready ! Almost...

#### AGENTS.md

Or CLAUDE, or GEMINI, depends on your harness of choice, For me, it is opencode i'am going to run the /init prompt in opencode !

```bash
opencode run "/init"
```

it is not mandatory, but it is a good way to prevent dumb mistake and set some proper behavior regarding a few things, for me, i'll add the following

* Not to run the dev server
* not start background/long running processes
* not to use `:any`, `as any` or `any` as type, I want a typesafe codebase
* before claiming success, `bun run check-types` and `bun run build` must both succeed
* to fix LSP error when they happen
* use shadcn component has much as possible
* stay DRY and prefer creating custom components and utilities than repeat code
* use adapted skills when possible (frontend-design skill is mandatory when working on the frontend)
* that it is a static app project that will be hosted on github pages
* to use Context7 MCP in case more documentation or up to date documentation is needed (as the knowledge is certainly behind because of cutoff training date)

```bash
opencode run "Add the following to the AGENTS.md, remove any conflicting instructions you created, these take precedence : 
* Not to run the dev server
* not start background/long running processes
* not to use `:any`, `as any` or `any` as type, I want a typesafe codebase
* before claiming success, `bun run check-types` and `bun run build` must both succeed
* to fix LSP error when they happen
* use shadcn component has much as possible
* stay DRY and prefer creating custom components and utilities than repeat code
* use adapted skills when possible (frontend-design skill is mandatory when working on the frontend)
* that it is a static app project that will be hosted on github pages
* to use Context7 MCP in case more documentation or up to date documentation is needed (as the knowledge is certainly behind because of cutoff training date)" -c
```

I might add more as the agent works if i see reccuring errors and dumb things happening

#### Time to let Eric loose...

Well, guys, stash your parents away cause we are going to let Eric go at it !

Because I am El CheapoDev DelBrokeCasa, i am going to use my GLM coding plan to code, that way, i wont break the bank and it is OK enough for something like that i think !

If you'd rather use claude code, use the `--tool claude` option. (or codex/gemini/kilo) but opencode is nicer as it stream the content out (in part at least) so you see what is happening !

```bash
npx task-o-matic@latest tasks execute-loop --include-prd \
  --plan --plan-model zai-coding-plan/glm-4.7 \
  --review --review-model zai-coding-plan/glm-4.7 \
  --model zai-coding-plan/glm-4.7 \
  --validate "npm run check-types && npm run build"
```

And now, you wait, coffee, snacks, more coffee, diner and breakfast probably, it gonna take a while ^^

## What do you think ? Where do we go from here ?

So that's the end (of this article) ! What do you think ? did you try a similar technique ? What's the plan next, cause...
