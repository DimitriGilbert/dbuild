---
date: "2025-01-17T10:00:00+01:00"
title: Sprynge - Help 2 to Unlock Posting
summary: A community-driven help & earn platform with a novel reciprocity system. Built with Next.js 15.5, React 19, Convex, TailwindCSS v4, and shadcn/ui. The twist? You gotta help 2 people before you can post your own requests. Genius or madness? You decide!
tags:
  - community
  - help
  - nextjs
  - convex
toc: true
slug: "index"
---

So, here's the thing. You know those help platforms where everyone just asks for help and nobody actually... well, helps ? Yeah, me too. They're like parties where everyone brings a plate but nobody cooks anything. Not exactly the jungle site vibe we're going for, is it ?

Well, I had this idea. What if we built a platform where you **actually have to help others before you can ask for help yourself** ? 

Crazy, right ? Or maybe it's actually genius. I'll let you decide.

## Meet Sprynge

[Sprynge](https://github.com/DimitriGilbert/sprynge-next) (pronounced like "spring", because I'm terrible at naming things...) is a community-driven help & earn platform built around this simple but powerful idea: **Help 2 to unlock posting**.

The concept is straightforward:
* You join the platform
* You browse help requests from others
* You help at least 2 people (like, actually help them, not just say "good luck")
* Once you've helped 2 people, you unlock the ability to post your own help requests
* When someone helps you, you earn credits (and so do they)
* Repeat forever

It's not rocket science, but it's surprisingly effective at preventing the "everyone takes, nobody gives" problem.

## Key Features

Right, so here's what I've built so far:

### The Reciprocity System
* **Help 2 to post** - the core mechanic. You must complete 2 help actions before you can post
* **Progressive credit costs** - posting more requests costs more credits, which encourages... well, helping more
* **Credit rewards** - earn credits by helping others, completing requests, maintaining streaks
* **Pod system** - users can form groups (pods) to collaborate and share resources

### Help Requests
* **X/Twitter integration** - link your tweets/posts to requests for context
* **Real-time updates** - see who's working on what, live
* **Request categories** - tech, creative, life stuff, whatever you need
* **Difficulty levels** - easy, medium, hard (because some requests are harder than others)
* **Time-based expiry** - requests disappear after a while to keep things fresh

### Real-time Chat
* **Live messaging** - talk to helpers and helpees in real-time
* **AI moderation** - because apparently some people are terrible at being civil (who knew ?)
* **Threaded conversations** - keep discussions organized
* **Notifications** - never miss when someone responds (because we all love notifications, right ?)

### Leaderboards & Gamification
* **Daily, weekly, monthly rankings** - compete with others if you're into that
* **Help streaks** - help people every day to build your streak
* **Reputation points** - earn reputation based on quality of help (rated by people you helped)
* **Badges & achievements** - shiny digital trinkets because why not
* **No exploitation** - the gamification rewards helping, not spamming or gaming the system

### Admin Panel
* **User management** - ban, warn, promote users
* **Analytics dashboard** - see what's happening on the platform
* **Content moderation** - remove inappropriate requests
* **Credit adjustments** - manually fix things when the system goes wrong (because it will, trust me)
* **System health** - monitor Convex functions, database status, all that good stuff

### Browser Extension
* **X/Twitter URL capture** - spot a help request on Twitter ? Capture it to Sprynge with one click
* **Quick status** - see your credits, streaks, and pending requests without leaving the site
* **Request notifications** - get notified when someone posts a request in your area of expertise
* **Built with WXT** - supports Chrome, Firefox, Edge, Safari (eventually...)

### Email System
* **Email campaigns** - send newsletters, updates, reminders
* **Batch processing** - handle thousands of emails without crashing everything
* **Scheduling** - queue emails to be sent at specific times
* **Templates** - reusable email templates (because writing the same email over and over is painful)

## Tech Stack

I went pretty modern with this one, mostly because I wanted to learn new things (and also because I'm a sucker for shiny new tech):

* **Next.js 15.5** - App Router, server components, all that jazz
* **React 19** - yeah, bleeding edge. Sometimes it hurts, but it's worth it
* **Convex** - this is the real MVP. Real-time database, functions, auth... everything in one place
* **TailwindCSS v4** - v4 is out now, and it's actually pretty good
* **shadcn/ui** - nice UI components, saves me from building everything from scratch
* **Better-Auth** - authentication because, well, you need to know who people are
* **WXT** - for the browser extension (cross-platform extension toolkit, if you were wondering)

### Why Convex ?

Alright, I'll be honest. I chose Convex because I wanted something that handled real-time stuff out of the box. And you know what ? It's actually pretty brilliant.

* **Real-time everything** - updates propagate instantly, no manual websockets or polling
* **Database + functions + auth** - all integrated, no juggling multiple services
* **Type-safe** - full TypeScript support from database to frontend
* **Built-in caching** - it just works, I don't have to think about it
* **Deployment** - one command and it's live. Seriously, it's that easy

The downside ? It's still relatively new, so documentation can be a bit sparse, and sometimes I have to dig through GitHub issues to figure things out. But overall, I'm pretty happy with it.

## The Architecture (Roughly)

So, how does all this fit together ? Well, it's a monorepo (because everyone loves monorepos, right ? ... right ?):

```
sprynge-next/
├── apps/
│   ├── web/           # Next.js app (main platform)
│   ├── extension/     # Browser extension (WXT)
│   └── admin/         # Admin panel (might merge with web later)
├── packages/
│   ├── convex/        # Convex functions & schema
│   ├── ui/            # Shared UI components
│   └── config/        # Shared configs (TS, ESLint, etc.)
```

The `convex` package contains all the Convex functions (queries, mutations, actions) and the schema definition. The Next.js app imports from this, so everything is type-safe end-to-end.

The browser extension talks to the main app via an API, and can also authenticate users using the same Convex auth.

## The "Help 2" Algorithm

Here's how the core reciprocity mechanic works (simplified):

```typescript
// Check if user can post a request
async function canPostRequest(userId: string) {
  const user = await ctx.db.get(userId);

  // Must have helped at least 2 people
  if (user.helpsCompleted < 2) {
    return {
      canPost: false,
      reason: `You need to help ${2 - user.helpsCompleted} more people before posting`,
    };
  }

  // Must have enough credits
  const postingCost = calculatePostingCost(user);
  if (user.credits < postingCost) {
    return {
      canPost: false,
      reason: `You need ${postingCost - user.credits} more credits to post`,
    };
  }

  return { canPost: true };
}

// Progressive posting cost
function calculatePostingCost(user: User) {
  const baseCost = 10;
  const increment = 5;

  // Each request costs more than the previous one
  return baseCost + (user.requestsPosted * increment);
}
```

It's not the most sophisticated algorithm ever written (nothing I write is), but it does the job. The idea is that as you post more requests, it costs more credits, which encourages you to keep helping others to earn more credits.

## Real-time Chat with AI Moderation

The chat system is built on Convex's real-time subscriptions. When someone sends a message, it's pushed to all participants instantly. The AI moderation happens on the server side before the message is stored:

```typescript
// Convex mutation for sending messages
export const sendMessage = mutation({
  args: {
    chatId: v.id("chats"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Check for inappropriate content
    const moderation = await ctx.runAction(api.ai.moderateContent, {
      content: args.content,
    });

    if (moderation.isInappropriate) {
      throw new Error("Your message contains inappropriate content");
    }

    // Store the message
    const messageId = await ctx.db.insert("messages", {
      chatId: args.chatId,
      content: args.content,
      senderId: ctx.user._id,
      timestamp: Date.now(),
    });

    return messageId;
  },
});
```

The AI moderation uses a simple classifier (I'm using OpenAI's moderation API at the moment). It's not perfect, but it catches the obvious stuff. I'm planning to add more sophisticated filters later.

## What I Still Need to Work On

Look, I'm going to be honest with you here (as I should be). There are still things that need work:

* **Mobile app** - the responsive web version is fine, but a native app would be better
* **More languages** - currently English only, but I'd love to support more
* **Better onboarding** - new users might be confused by the "help 2 to post" mechanic
* **Search & discovery** - finding relevant help requests could be easier
* **Credit marketplace** - let users buy/sell credits (if that's legal... I need to check)
* **Video calls** - sometimes you need to talk to someone face-to-face
* **Skill matching** - match helpers with requests based on their skills
* **API access** - let third-party apps integrate with Sprynge

But hey, it's a work in progress. I'm actively working on it and learning as I go.

## Why "Sprynge" ?

Honestly ? I needed a name and "spring" was taken. So I added a "y" because that's what cool people do these days. But also, "spring" as in "spring into action" and "spring" as in "new beginnings" and "spring" as in... well, I don't know, it sounded good at the time ?

Maybe I should have spent more time on the naming. But then I wouldn't have time to actually build the thing, and where's the fun in that ?

## What Now ?

If you're interested in checking it out, the repository is [here](https://github.com/DimitriGilbert/sprynge-next). It's open source, so feel free to:

* **Star the repo** - if you think it's cool (it's ok if you don't, I won't cry)
* **Open issues** - if you find bugs or have suggestions
* **Submit PRs** - if you want to contribute code
* **Ask questions** - if anything is confusing (which it probably is)
* **Tell your friends** - or enemies, I'm not picky

I'm still in the early stages of development, so expect rough edges. But the core idea is solid, and I genuinely believe this reciprocity mechanic could make online help communities actually... helpful.

Imagine that.

Thanks for reading this far. I hope you found it useful (or at least entertaining :D)

{{% goodbye %}}
