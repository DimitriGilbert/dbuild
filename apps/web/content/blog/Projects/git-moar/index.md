---
date: "2025-01-17T10:00:00+01:00"
title: git-moar, because git log just wasn't enough
summary: Advanced Git repository analytics and reporting CLI tool with beautiful visualizations, quality metrics, and insights. Transform your git history into something you can actually read!
tags:
  - git
  - analytics
  - cli
  - visualization
slug: "index"
toc: true
---

So, who here uses **git** ? And I mean *really* uses it, not just `commit -m "stuff"` and push it when things break ?

Yeah, git is great and all, but sometimes you look at `git log` and it's like trying to read the matrix code upside down. There's so much data there, so many patterns, so many... questions ! Like "who actually broke production last month ?" or "is this repo a one-person show ?" or "why does this file have more commits than my entire project history ?"

Well, I got tired of staring at commit hashes, so I built **git-moar** ! 😛

## What is git-moar ?

[git-moar](https://github.com/DimitriGilbert/git-report) is a CLI tool that takes your git repository (or repositories, if you're feeling adventurous) and turns it into a beautiful, interactive HTML report with charts, metrics, and insights that might just make you question your life choices (in a good way... I think).

It's got two main commands:
* **`snitch`** - analyze a single repository (great for stalking... I mean, understanding... a particular project)
* **`scattered`** - analyze multiple repositories at once (perfect for that "oh god, what have we created" moment)

Think of it as git log, but with actual colors, charts, and the kind of data you can show to management without them falling asleep. It's not state of the art, but it sure beats `grep` ! 😊

## TLDR (because I know you're impatient)

```bash
# install the thing
npm install -g git-moar

# analyze your repo and generate a report
cd my-project
git-moar snitch

# or analyze multiple repos at once (wildcards work, 'cause magic)
git-moar scattered ~/projects/*/

# open the report in your browser
open git-moar-report.html  # or xdg-open on Linux, or start on Windows
```

## What's in the report ?

Ah, the juicy part ! The report comes with 15+ chart types and more metrics than you can shake a branch at. Here's the breakdown:

### Quality Metrics (because we all pretend to care)

* **Bus Factor** - how many people need to get hit by a bus before your project dies ? Spoiler: it's probably 1 for most of us
* **Code Churn** - lines added vs deleted, with a "who's actually deleting code" breakdown
* **Health Score** - a number you can use to feel good or terrible about yourself
* **Gini Coefficient** - inequality in contributions, because economics can ruin anything

### Productivity Insights (to prove you're not slacking)

* **Peak Hours** - when do you actually commit ? 3 AM coffee-fueled sessions or 9-5 corporate slavery ?
* **Velocity** - commits over time, with trends and the inevitable "what happened in December" dip
* **Work-Life Balance** - weekend vs weekday commits (prepare to be judged)

### File Hotspots (the drama queens of your repo)

* **Frequently Changed Files** - those files that get touched more than your phone
* **Knowledge Silos** - files that only one person ever touches (a recipe for disaster)

### Other Cool Stuff

* **Commit Classification** - are you writing features, fixes, docs, or just "update" ?
* **Message Quality Scoring** - how terrible are your commit messages ? (spoiler: probably very)
* **GitHub-Style Contribution Calendar** - show off your green squares (or lack thereof)
* **Sortable Data Tables** - filter and sort contributors, files, commits, whatever

## Visualizations

The report uses [Chart.js 4.4.0](https://www.chartjs.org/) for all the pretty charts, and let me tell you, I was pretty proud when I got the heatmaps working. Here's what you get:

* Activity trends over time
* Contributor distribution charts
* Commit heatmaps (hourly, daily, weekly)
* File change patterns
* Code churn graphs
* And like 10 more things that I forgot about because there's just so many

It's got dark/light themes too, because I'm not a monster who forces you to stare at white screens at 2 AM.

## Advanced Features

### Templates (for the control freaks)

If you don't like my beautifully crafted (read: barely functional) default report, you can create your own templates. It's a bit of HTML with some template variables, and if you break it, well... that's on you. I've provided the default template as a starting point, but you can go wild.

### Export Options

Sometimes you need data for spreadsheets (or that executive who demands CSV files for some reason). git-moar can export to:

* **CSV** - because Excel still rules the corporate world apparently
* **JSON** - for when you want to parse things programmatically or feed it into some AI that tells you your repo is doomed

### Multi-Repo Analysis

The `scattered` command is where things get interesting. It can analyze multiple repositories and give you cross-project insights. Want to know which repo gets the most commits across your whole org ? Which contributors are spreading themselves too thin ? Who never commits anything anywhere ? (looking at you, Dave).

It supports wildcards, so you can do things like:

```bash
git-moar scattered ~/projects/*/
git-moar scattered ~/projects/git-*/
git-moar scattered ~/projects/*-backend/ ~/projects/*-frontend/
```

## Tech Stack (nerd stuff)

I built this with:
* **Node.js** - because I'm too lazy to learn Rust (sue me)
* **Chart.js 4.4.0** - for the charts, obviously
* **Simple-Datatables** - for the sortable tables
* **Chalk** - for colorful terminal output (because life is too short for monochrome)
* **SLOC** - for counting lines of code

It's all CLI-based, no servers, no cloud, no subscription fees. Just run it and get your report. Privacy-focused by design (the data never leaves your machine).

## What Now ?

### Install

```bash
npm install -g git-moar
```

Or clone and build if you're one of those people who doesn't trust npm (I get it).

### Run

```bash
# single repo
git-moar snitch

# multi repo
git-moar scattered <path-to-repos>/

# with options (because there's always options)
git-moar snitch --output my-report.html --theme dark --since "2024-01-01"
```

Use `git-moar snitch --help` or `git-moar scattered --help` for all the flags. There's quite a few, and I probably forgot to document some of them, so... good luck ?

### Share

The generated HTML file is self-contained (charts embedded and everything). You can just email it, put it on a server, upload it somewhere, whatever. It's just one file, no dependencies, no nothing.

## The Honest Truth

Look, git-moar is at v0.0.1. It works, but it's not perfect. I built this because I needed to understand my own repositories and the existing tools were either too complex or just ugly. It's a bit of a "grog brain developer" project, but it does what it says on the tin.

I've got a PRD for turning this into a SaaS because apparently people like paying for things that they could just run locally. If that happens, expect more features, fancier charts, and maybe even some team collaboration stuff.

But for now, it's free, open source, and waiting for you to find all the bugs I missed (I'm sure there are plenty).

## Feedback and Contributions

As with all my projects, I'm basically the only user, so finding bugs is getting harder. If you find one, or have a feature idea, or just want to tell me my taste in chart colors is terrible (I know it is), hit up the [GitHub repo](https://github.com/DimitriGilbert/git-report) and open an issue.

Pull requests are welcome too, if you want to fix my terrible code or add something cool. Just... try not to break things too badly, yeah ?

## What's in a Name ?

"git-moar" is because it's git, but with MORE. More charts, more metrics, more stuff. Also I'm terrible at naming things.

It's also published as "git-report" on npm because... well, I forgot to check if the name was taken. Oops. So `npm install git-report` will get you git-moar. I know, I know, it's confusing. We live with our mistakes.

## Closing Thoughts

Thanks for reading this far, and I hope you find git-moar useful (or at least mildly entertaining). Even if you don't use it, maybe looking at your git history in a different way will give you some insights. Or at least some amusing graphs to share at the next team meeting.

Go forth, analyze your repos, and may your bus factor never be 1 !

{{% goodbye %}}
