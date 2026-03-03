---
title: Skills are the DRY of prompt engineering, you should use them and create your own
date: 2026-03-03T15:00:00+01:00
tags:
  - ai
  - skills
summary: Just like I use to create my own libraries and helpers I reused in most my projects, I now create skills so i don't rewrite the same prompts over and over again
slug: "index"
og-image: public/images/blog/projects/ai-skills/dry_of_prompting/ai-skills-cover_og.webp
---

## AI Skills

Ever typed the same prompt over and over again, reminded your AI assistant how a library works AGAIN or described a workflow more than once ?

What if I told you there was a better way ! And no, it is not copy pasting...well, kinda, but not really.

![skills fighting](/images/blog/projects/ai-skills/dry_of_prompting/ai-skills-cover.webp)

### What they are

In the grand scheme of things, skills are just a markdown file that you give the AI agent when you need it to follow the instructions in the markdown.

That's it, like comment and subscribe, bye !

Ok ok, there might be more to that, it can actually come with other markdown files and even scripts ! But I promise you now, that is it !

And if you are thinking "duh, how could a markdown file make that much difference" right now... i hear you, i was the same, but boy O boy was i bloody wrong about that !

If you want a demonstration on the cheap, you can try the anthropic frontend-design skill, with a model like GLM 4.7 or minimax 2.5 for a webpage without and with the skill loaded and you will see what i'm talking about !

But first thing first, you gotta get yourself some skills !

### apt install skillz

Since i saw Matrix the first time, I cant shake the **"I want THAT !!"** feeling i felt at the sound of "I know Kung-fu" and skills are the closest I came to to date !

Just like in the movie, nothing fancy about the process here `npx skills add <github repo shorthand/repo url/local folder>`, a bit of interactive CLI and you are done.

"where do i find those...'Skills' ?" i hear you say ... [skills.sh](https://skills.sh) is the main hub for that.

It's built by vercel, so it won't go anywhere and it uses telemetry from `npx skills` command to track skills installed by users so the list is **VERY** thorough...

And if you didn't find what you were looking for there, you can always go on the hunt on github (or any other git provider)

### BE CAREFUL

I can't stress it out more, and that is why this section is before the usage one !

READ THE DAMN SKILL ! don't just wing it like a mupet ! Skills are a direct path to your AI assistant, and just like packages and modules of the past, you should be concious of what you are installing and the instructions it gives out.

Prompt injection is a real threat that can lead to data exfiltration and other malicious activities, so once again **READ THE DAMN SKILLS !** or you'll come back crying your API keys are in the wild or your bitcoin wallet is empty !

### I haz uze skill

After that preventative scolding, it is time to use said skills... this section is going to be really fast, are you ready ?

`Load the <your skill name> skill.`

Tell you agent that, in any decent AI coding harness and you are good.

I know, it was the hardest part so far, but it has to be done.

Joke aside, just tell your agent to load the skill naturally and go on prompting like you would otherwise, that's it !

Sure some harness come with `/` commands to load things up and all, but i switch harness constently and i actaully don't see the point of those.

LLMs process natural language just fine... like they were meant for that :D

### Make your own

This is where things get better ! Using someone else's stuff is good, but if you've read a few of my post here, you know that I like to have my own set of wheels.

And in this case, you can very easily get your own too !

To start with, you are going to need the [skill-creator skill](https://skills.sh/anthropics/skills/skill-creator) from Anthropic themeselve:

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

then, you have to decide how thorough your agent needs to be to create the skill ! But considering you are probably going to use this again, you should push the AI for the thoroughest of thorough work !

You might need Something like [Context7](https://context7.com/) or [btca](https://btca.dev/) (or any other documentation retrieval tools) to ensure you assistant can access the latest docs and produce up to date documentation if it is not for code of yours !

I usually go like :

```markdown
I want to create an AI skill for [name of the library]
Load your skill-creator skill.
Use subagent to do the research and get them to save their findings in [path/to/research]
They will use Context7 and web search to gather the latest documentation, recent tutorials and articles to create thorough research document and they might request that you dispatch other agents to get more information on specific unexplored points.
Once the research phase has concluded, you will read the research documents and craft the required files to create the skill.
Remember that you have to follow the skill-creator skill to make it both thorough and efficient !
If it does not fit in a single skill, you might want to split things in multiple skills, they might reference each other if needed.
```

After a couple dozen minutes and a big bunch of token burnt, I usually end up with a decent starting point ! It usually is far from perfect though, and the best way to test that is to read it (**READ THE DAMN SKILL !**) and try it out.

This is why i tell the AI to keep the content of the research, so that i can point to flawed/lacking content and tell it to improve.

Sometimes, more research are needed, so I repeat a version of the first prompt to get them and have the AI improve the skill(s).

It is a bit easier when you own the code, you can just ask the agent to actually explore the code and gather needed information, plus, you already know what you should expect !

You can even create the thing... by hand, like a caveman, if you don't trust a toaster to do so... you can.

## My skills

Over the last couple months, i have been either adding skills to existing project or creating new ones from scratch for specific needs.

The project ones are obvious, they are to help you using those with AI ! I added them to [Formedible](https://github.com/DimitriGilbert/formedible), [parseArger](https://github.com/DimitriGilbert/parseArger) and [task-o-matic](https://github.com/DimitriGilbert/task-o-matic) so far.

Nothing fancy here, just packaged information from documentation and readme in a standardized format for the toasters.

Not that they aren't useful, but there is not much going on besides the docs here !

I also created a bunch for libraries/tools i am using quiet often: convex, opencode, opentui, openrouter, better-t-stack and trpc... but same here, nothing fancy !

No, the ones i would like to talk about are ...

### The Council

Dont know what decision to make ? Well, this is where the council comes in !

It uses subagents to gather data and emit opinions before presenting them to you.

It is token hungry, but makes for a good partner when you are undecided on something.

[on skills.sh](https://skills.sh/dimitrigilbert/ai-skills/the-council) and [github](https://github.com/dimitrigilbert/ai-skills)

### not-ai-writer

If not bored by the repetitive nature of AI generated content nor disgusted by the presence of em-dashes in the slop you push out, people consuming that slop might !

Not-ai-writer is here for you ! no em-dashes, no "if not this then/nor that", no fancy "unused by anyone" words, no bloody Emojis !

It will still be slop, but it will look less like it is :D

[on skills.sh](https://skills.sh/dimitrigilbert/ai-skills/not-ai-writer) and [github](https://github.com/dimitrigilbert/ai-skills)

### subagent-orchestration

This is the one i really want to talk about !

I spent a month and a half working on [task-o-matic](https://task-o-matic.dev), it is meant to help your project go from idea to MVP in an orderly fashion, creating a PRD, tasks + subtasks and automatically executing them.

I am fairly prod of that ! It works well, it's fairly easy to use and i like the site i made for it !

It also is kind of completely useless now being replaced by this skill... A single markdown files that makes things go brrrrrrrrr more than a few dozen **thousands** line of code, apparently, the best part is really no part...

Instead of creating dozens of conversations one after the other, or letting the agent run and compact until it is done, this skill transforms your main agent in a project manager !

When I have an idea I want done (or a bunch of them), i detail that to the AI, tell it to load the skill and do the following:

```markdown
[idea details]
Load your subagent-orchestration skill.
Dispatch an exploration and planning subagent that HAS TO LOAD THE subagent-orchestration skill itself to create a complete plan for this.
have it save to a file so I can review it before any actual work begins.
Remember, you are the orchestrator, you keep context clean, do not read or write code, you dispatch agents to do the work.
```

I usually have a couple back and forth with the AI, always asking it to dispatch agents to do the work, before the plan suites me and then...

```markdown
Read the plan file and execute it following the subagent-orchestration skill's instructions.
Implementor => reviewer => fixer (if needed) => next task
Remember, you are the orchestrator, you keep context clean, do not read or write code, you dispatch agents to do the work.
```

Be careful, this will go through most AI coding plan rate limits very quickly, but it is magic !

Unless you're going from 0 to everything, you should not have any compaction happening, it is really fast as it tries to execute tasks in parallel if it can, each phase is verified by it's own agent to avoid lazyness and corner cutting (very useful with GLM 4.7 for example !)

All in all, i am really happy with this and I think you should try it, just to see what it does ;)

[on skills.sh](https://skills.sh/dimitrigilbert/ai-skills/subagent-orchestration) and [github](https://github.com/dimitrigilbert/ai-skills)

## Skill issues

I am going to reiterate, AGAIN, and sound like a broken record but **READ THE DAMN SKILL !**

First, it is good for security ! We spent decades nurturing good practices and "NO NO"s about code quality, maintainability, and security... let's not throw all that by the window to save 5 minutes of reading.

But it also make sense if you want to know how to use said skill effectively.

One thing I noticed with claude models for example is that, if you give instructions that go against the skill's ones, the model is going to behave erratically, ignore directives or invent new ones.

It's also tempting to make MegaSkills that do everything but you then end up with more chance of contradictory directives with the added "bonus" of context bloat so it is better practice to actually break things down into smaller, more focused skills. Your agent is not limited to loading a single skill anyway, so it does not make sense to load a MegaSkill.

## On going process

In the coming months, i'll probably go on adding and refining more skills and I think you should do the same.

"Don't Repeat Yourself" is good practice when you write code, and it is also good practice when you write prompts !

This will not solve all the problems we encounter with AI but it is a good way to manage and share what you learn while prompting.

BTW, my github repo is opensource so if you use my skills and encounter any issues, feel free to open an issue or submit a PR !
