---
date: "2025-01-17T10:00:00+01:00"
title: Task-O-Matic, your AI survival bunker for project chaos
summary: Transform chaotic project ideas into structured, executable task lists through AI assistance. Welcome to the bunker, citizen!
tags:
  - ai
  - task-management
  - cli
  - productivity
  - task-o-matic
toc: true
slug: "index"
---

So, who here has **project ideas** ? And among these ideas, some turn into... uh, actual tasks, right ?

Ok ok, so, get me a structured plan, broken down tasks, and anything resembling order, like, right NOW !

Yeah...it's ok, we've all been there 😛. The wasteland of unorganized thoughts is a dangerous place. But worry not, I built us a bunker !

## Welcome to the Bunker 🏚️

[Task-O-Matic](https://github.com/DimitriGilbert/task-o-matic) is an AI-powered task management system styled with a post-apocalyptic survival bunker theme (because why not ?). It transforms your chaotic project ideas into structured, executable task lists through AI assistance.

Think of it as your personal task commander in the aftermath of project anarchy.

## The Mission (What it does) 📋

Task-O-Matic is not state of the art — I'm not a bloody AI researcher — but it *does* work and it's rather useful for us bunker dwellers :

- **Idea to PRD generation** : Take your half-baked idea and let AI turn it into a proper Product Requirements Document
- **PRD parsing into structured tasks** : Break down that PRD into actual, doable tasks
- **AI-powered task enhancement** : Let the AI improve, split, and plan your tasks
- **Multi-AI generation** : Run multiple AI models in parallel and compare results (battle royale style)
- **Task execution with external tools** : Connect to Opencode, Claude Code, Gemini CLI, and more
- **Benchmarking system** : Test different AI models with git worktree isolation
- **Existing project adoption** : Attach Task-O-Matic to existing projects (`init attach`)
- **Local-first storage** : Everything lives in your `.task-o-matic` directory (the bunker's archives)
- **Hierarchical task breakdown** : Subtasks, sub-subtasks, sub-sub-sub... you get the idea
- **Streaming responses** : Watch the AI think with reasoning tokens

## The Tech Stack 🔧

Built with a collection of reliable tools that survived the apocalypse:

- **TypeScript** : Because type safety is survival safety
- **Bun** : Fast package manager (needed when running from generators)
- **Vercel AI SDK v6** : The magic behind the AI curtain
- **Commander.js** : CLI parsing (I know a thing or two about CLI tools...)
- **Inquirer.js** : Interactive prompts (for when you need to make decisions in the bunker)
- **Zod** : Schema validation (don't want corrupted data in the archives)

## TLDR (Quick Start) ⚡

Oh, I know you're impatient (me too...), so here is a quick run down to get going !

```bash
# Clone the repo
git clone https://github.com/DimitriGilbert/task-o-matic.git
cd task-o-matic

# Install dependencies
bun install

# Link for local development (optional but recommended)
bun link

# Initialize a new project in your existing directory
task-o-matic init attach

# Generate a PRD from your idea
task-o-matic prd generate "Build a survival bunker dashboard"

# Parse the PRD into tasks
task-o-matic prd parse

# Let the AI enhance your tasks
task-o-matic task enhance --all

# Execute tasks with your AI of choice
task-o-matic task execute --ai claude
```

## Installation 🔨

First things first, let's get you installed in the bunker !

```bash
# Clone the repository
git clone https://github.com/DimitriGilbert/task-o-matic.git
cd task-o-matic

# Install dependencies with Bun
bun install

# Make the CLI available globally (optional but handy)
bun link
```

You can also install via npm if you prefer the old ways:

```bash
npm install -g @dimitrigilbert/task-o-matic
```

## Configuration 🔑

Task-O-Matic needs to know how to reach the outside world (AI providers). Set your API keys as environment variables:

```bash
# OpenAI
export OPENAI_API_KEY="your-openai-api-key"

# Anthropic (Claude)
export ANTHROPIC_API_KEY="your-anthropic-api-key"

# Google (Gemini)
export GOOGLE_API_KEY="your-google-api-key"

# OpenRouter (if you want access to many models)
export OPENROUTER_API_KEY="your-openrouter-api-key"
```

I'd recommend putting these in your `.env` file or shell profile. Don't commit them to git, obviously.

## Workflow Example 🚀

Let's walk through a typical bunker workflow, shall we ?

### Step 1: Initialize Your Bunker

```bash
# Attach to an existing project directory
task-o-matic init attach

# Or create a new project
task-o-matic init new my-survival-project
```

This creates a `.task-o-matic` directory where all your data lives. It's like your bunker's storage room.

### Step 2: Generate a PRD from Your Idea

```bash
task-o-matic prd generate "I want to build a personal finance tracker that works offline, syncs when online, and has a dark mode because the bunker lights are harsh"
```

The AI will interview you (via inquirer prompts) to clarify requirements and generate a proper PRD document.

### Step 3: Parse the PRD into Tasks

```bash
task-o-matic prd parse
```

This breaks down your PRD into a hierarchical task structure. You'll get tasks, subtasks, and sub-subtasks organized by priority and dependencies.

### Step 4: Enhance and Plan Your Tasks

```bash
# Let AI improve all tasks
task-o-matic task enhance --all

# Plan execution order based on dependencies
task-o-matic task plan

# Split a large task into smaller chunks
task-o-matic task split --id task-123
```

### Step 5: Execute Tasks with AI

```bash
# Execute a specific task with Claude
task-o-matic task execute --id task-123 --ai claude

# Execute all pending tasks with multiple AI models
task-o-matic task execute --all --ai claude,gemini,gpt4

# Execute with external tools
task-o-matic task execute --id task-123 --tool opencode
```

The AI will read the task description, context, and generate the actual code or documentation. You can review before committing.

## Multi-AI Generation 🤖

One of the cooler features (in my humble opinion) is the ability to run multiple AI models in parallel:

```bash
# Generate solutions from multiple providers
task-o-matic task generate-multi \
  --id task-123 \
  --providers claude,gpt4,gemini \
  --compare

# This will show you a comparison of the different approaches
```

Great for when you want to see different perspectives or verify the best solution. It's like having a council of AI advisors in your bunker 😊

## Benchmarking System 📊

If you're curious about which AI model performs best for your use cases:

```bash
# Run benchmarks with git worktree isolation
task-o-matic benchmark run \
  --models claude,gpt4,gemini \
  --task-set my-tasks

# View results
task-o-matic benchmark results

# Compare specific runs
task-o-matic benchmark compare --run-id run1,run2
```

This uses git worktrees to ensure clean environments for each benchmark run. No contamination !

## Existing Project Adoption 🏠

Already have a project you want to bring into the bunker ?

```bash
# Navigate to your project directory
cd my-existing-project

# Attach Task-O-Matic
task-o-matic init attach

# It will scan your codebase and create initial context
```

Task-O-Matic will analyze your existing code structure and use it as context for future task generation.

## Local-First Storage 💾

Everything Task-O-Matic creates lives in your `.task-o-matic` directory:

```
.task-o-matic/
├── prds/           # Product Requirements Documents
├── tasks/          # Task definitions and status
├── history/        # Execution history
├── benchmarks/     # Benchmark results
└── config.json     # Your configuration
```

No cloud dependency, no data leaving your bunker (unless you choose to). Your data, your rules.

## Streaming with Reasoning Tokens 🧠

When executing tasks, you can watch the AI think in real-time:

```bash
task-o-matic task execute --id task-123 --stream
```

This shows you the reasoning tokens as they're generated. It's fascinating to see how the AI approaches problems (sometimes in ways I wouldn't expect, which is good).

## Why the Bunker Theme ? 🤔

I know, I know, it's a bit weird. But here's the thing:

1. It's fun 😛
2. Projects can feel like chaotic wastelands
3. Having a structured system feels like building a safe shelter
4. "Bunker" is a great metaphor for local-first, isolated development
5. Why not ?

Also, calling users "citizens" and projects "missions" makes me chuckle. If it makes you smile too, then it's worth it.

## Current Status 🚧

Task-O-Matic is in active development at **v0.1.5-beta.1**. Things might break, features might change, but the core functionality works.

If you find bugs (and I'm sure there are nests of them), please open an issue on the [GitHub repo](https://github.com/DimitriGilbert/task-o-matic/issues). I'm the only user right now, so finding bugs is becoming... challenging 😊

## What's Next ? 🔮

Here's what I'm planning (subject to change based on what the wasteland throws at us):

- [ ] More AI provider integrations
- [ ] Web UI (because some people prefer graphical interfaces)
- [ ] Team collaboration features (multi-bunker coordination)
- [ ] Plugin system for custom tools
- [ ] Better dependency visualization
- [ ] Task templates for common project types
- [ ] Integration with CI/CD pipelines

## Get Involved ! 🤝

This is a side project I built because I needed it. If you find it useful, that's awesome. If you want to contribute, even better !

- Star the repo if you like it
- Open issues for bugs or feature requests
- Submit PRs if you want to add something cool
- Share it with other bunker dwellers

## Final Thoughts 💭

Task-O-Matic isn't going to revolutionize project management or anything grand like that. It's just a tool I built to help me (and hopefully you) turn chaotic ideas into organized, executable tasks.

It's not perfect. It's not the most elegant code I've ever written. But it works, it's useful, and it's mine.

If you're drowning in project chaos and need a structured approach to breaking things down, give it a shot. Worst case, you'll have a cool CLI tool with a bunker theme.

Best case, you'll actually ship that project you've been thinking about for months.

Stay safe out there in the wasteland, citizen. And happy coding !

---

{{% goodbye %}}
