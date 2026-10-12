---
title: "I'm tired of the whole energy discourse around AI"
date: 2026-10-02T00:09:00+01:00
tags: [
  "AI",
]
summary: "AI consumes a lot of energy to run, true, but what about a Human ?"
slug: "index"
og-image: "/images/blog/blackhole/.webp"
ogImageAlt: ""
---

I understand the whole discourse about AI consuming a lot of energy to run, it does... But it forgets that we, Humans, do too, so my question is, is AI more or less efficient than a Human at a certain task.

The task in question is [SlopCad](https://slopcad.dbuild.dev). Not that it is particularly good, but it's the result of 6 AI conversations, and the main one spawned 9 days and I haven't read a single line of code...

I have the full token usage and I will get to that, but we need something to compare it to...

## The FleshyBots

To be as impartial as possible, we need to define an average Human and what it takes in terms of energy to get work out of them, we'll call our average subjects FleshyBots...

### Biological Machines

Even though they are very efficient, our FleshyBots need energy to run, around 100W (I like round numbers ! but it is also generally accepted value) as they keep their internal component around 37°C

All efficient that they are, they come with a few drawbacks, the main one being their operating environment temperature that must be kept between 18 and 25°C for maximal efficiency, that consumes a lot of energy but is hard to quantify so we'll leave it out.

The other big drawback is their uptime, they function in 24 hour cycles of which they can only work reliably for 10 (but most commonly 8).

To round things up, we'll say that our fleshybots require 1kWh of energy dedicated for work every day.

Another uptime thing, they cannot operate continuously for more than a few days and need extra rest regularly (generally 2 days every 5). we will count 300 days a year to account for off-time and occasional maintenance time.

All energy not dedicated to work will not be counted toward the final number, but they exist !

The final big thing is that they do not stay where they work and require transportation to get to and from their off-work place...

### Moving the machines

Depending where they live, the distance that our bots travel varies greatly, in France it is around 15km (10 miles) and in the US 40km (25 miles), we'll call that a round 33km (20 miles) which ends up being 66km per day.

But they do not move on their own, most of them use 1.5 tonnes metal cages that also consume energy to move. There are 2 main technologies competing in that domain, some cages use electric batteries to run motors and other internal combustion engines.

We will not count the energy needed to make those machines but just the one consumed to get our fleshybots to and from work, for that we need to know how much energy the cages are consuming.

The electric ones are vastly more efficient and run around 20kWh for 100km (60 miles), it's a bit more difficult for ICE powered ones but let's say every bot has a very efficient one that runs 5l for 100km (47mpg) with 1l of gasoline being 9.5kWh

Let's call the split 40-60 in favor of ICE and we get an average of 24kWh ( (0.4x0.66x20) + (0.6x0.66x5x9.5) ) for covering that distance.

### Tally and omissions

What we've got is a square 25kWh of energy required to get work out of a FleshyBot, simple.

Reality is more nuanced as we omitted many things ! We mentioned the energy to produce the cars and climate control but those bots and their machines are quirky !

The transportation network needs maintenance, there are other consumables used during transportation I did not include, nor the fact that during their "off" time, they consume more energy for various activities...

Plus, they require intermediate form of energy they call food that needs to be produced and transported on a timely basis.

And I'm not done, they usually operate more machines for work that themselves require more energy, not to mention other costs to all this like the environmental impact !

So, to simplify, all those various costs have been foregone and only the required 25kWh per day have been counted.

## The Clanker side

Now that we established a baseline, we need the other side of this comparison, the Clankers ! Like the FleshyBots, they come in many sizes so we'll base calculation on the ones used to create [SlopCad](https://slopcad.dbuild.dev), glm-5.3 and glm-5.3-flash.

They are respectively a ~754B and a ~321B parameters model meaning you would need roughly 1TB and 500GB of VRAM to run them...

### The hardware

In this example, I'll pick a "consumer grade" piece of hardware, the RTX Pro 6000 MaxQ with its 96GB of VRAM, this means we would need a whopping 12 of them (at most)... just like cars, we'll not count the price and energy cost for the hardware (...).

They are rated at 300W each, but i'm pretty sure they wouldn't all run at full tilt with those models, so we'll say 150W per card (that should cover the other hardware like CPU, RAM, MB, ...)

This gives us 1.8kW and 0.9kW for the two models and considering the z.ai API is not the fastest, I'm pretty sure the output speed would be in the same ballpark or higher !

I'll still prefer the full power usage for this, not to give unfair advantage to the non biological machines.

### What was built and how ?

[SlopCad](https://slopcad.dbuild.dev) is the result of 6 conversations, one of which went for 9 days with me really intervening only from day 5 when i realised running the test took 30 minutes (that went for nearly a day...)

Removing all that testing and down time in following conversations, a total of 10 full days of compute were needed. 

Around 10 billion tokens have been burnt with a surprising 50-50 split between models so the calculation gives us between 324kWh (5x24x1.8 + 5x24x0.9) and 648kWh at full power for the inference hardware.

The produced result ? 336K Line of Code, which we'll use as a basis for our comparison.

## Let's compare

Yes, yes, yes... using LoC to evaluate work time is stupid, but, i don't have anything better to propose to you, so, take it or leave it. I'm open to hear about what metrics you'd use to do that though...

Of those 336K lines, we'll call half of them really functional so 168K LoC, to remove all the imported component and generated boilerplate code, surplus tests and other sloppy nonsense.

An amazing FleshyBot can roughly produce 150 LoC per hour when they clearly know what to do, but a more realistic number lies around 30 to 50 so we'll compute for every one of those numbers !

Let's start with our PiP bot, every day, it will output 1500 LoC, which gives us 112 days and 2800kWh of required energy to get the same output as an AI model...

Once again, a more realistic bot would require 3 to 5 times this so 8400kWh to 14000kWh.

With the most efficient Human, working relentlessly for months, said Clanker is still about **4 TIMES** more efficient for a comparable amount of work (2800 / 648). Against a more realistic human, that jumps to roughly 13x to 22x.

### But what about the water, the heat, the noise and all that !?

If you have gone this far in this rant and still genuinely have that in mind, I will entertain you with a few more arguments [despite the fact i would like to gracefully invite you to receive anal sex, preferably with a close relative.]

So, water first, a FleshyBot also requires water, around 1.5l per day, so during their 8h work days, they consume around 0.5l of it. Let's say our very inefficient hardware consumes 7l per day (2l/kWh), the workload would have resulted in 70l consumed to the best FleshyBot at 55l... can we call it a win if a normal one runs 165l for this ?

As for the heat, these biological machines being very efficient, they do not emit a lot of it. Their internal combustion engine powered 1.5 tonnes cages on the other hand...

A good ICE engine roams around 40% efficiency, meaning 60% of what is consumed is directly transformed as heat, quick back of the napkin calculation gives us a tad more than 11kWh (0.6x0.6x0.66x5x9.5) of heat produced every day on average for a FleshyBot.

If we count a 30% heat production on top of power consumption for our hardware (seems to be the ballpark estimate), a 3.6kW model would produce 4.7kW of heat, so 112kWh per day, 10x less efficient than a Human, which still means overall in the worst conditions, the Clankers still outperform the best FleshyBots for the task (1120 vs 1232kWh)

And while the data center noise problem is very much real and can have serious consequences, you know what else produces lots of noise pollution that have serious consequences ? Cars.

## Where does that leave us ?

Honestly, IDK what to tell you...I don't want to be all gloom and doom but I think the numbers are speaking, [though I won't interpret the story for you].

One thing to note though, despite the fact that I was expecting this trend, I did not think the margin would be this massive...

So, say what you want about the calculation based on LoC for the time spent, but a year of heads down committed work by a good engineer would probably result in something like SlopCad...

Not only an AI did it at least 30x faster, it also consumed 20x less energy doing so and I am counting neither water nor heat.

Of course, this does not take into account "Work from Home", every day of which would cut power required for a Human by nearly 20%, nor does it reflect the use of public transportation...

But it also does not take into account that, this kind of work was not possible last year (Hell, I didn't think it was possible this year, let alone on a sub-SOTA model !), and now, it is 1 to 2 orders of magnitude faster and 1 order of magnitude more efficient... What will it be next year ?

Now, you might say this comparison is stupid and you'd probably be right, everything is very oversimplified, but even if you refined the rough calculation, I'm pretty sure what would come out would be similar... But once again, I'm open to revising the equation to be more realistic.

I think that'll do it this time, I hope this at least made you think about the whole energy usage discourse and that it is not that cut and dry and if you are curious about [SlopCad](https://slopcad.dbuild.dev), it is [open source](https://github.com/DimitriGilbert/slopcad) and i wrote [another article](https://dbuild.dev/blog/projects-slopcad-i-want-cad-in-react-make-no-mistakes/) about what it took for it to exist.

### "Yes, but...", Oh for crying out loud !

I know I haven't convinced you all, between the omissions and the tone, I could understand why, so let's quickly address a few things

#### "Training AI consumes a lot of energy"

True, but it only happens once for a model that can be used in parallel for many different tasks.

Now, without being too much of a smart ass, you realise Humans need at the very least 20 YEARS of training, right ? Smaller size and younger age do impact their energy consumption, but this can't be forgotten either !

And said Humans are generally capable of executing one type of tasks, one at a time.

Both have deliberately been left out for simplicity reasons because comparing them makes little sense.

#### "But the water and the heat !"

... yes. You never wash your car/clothes/dishes ? you take a shower a month ? blow in your toilet to flush them ? I'm trying hard here but I'm getting very annoyed...

And about the heat... depending where you live, you can need heating and/or cooling in your workspaces to be comfortable enough for the better part of a year !

Both of these output a tremendous amount of heat, and if you tell me about no AC/heating, i'd like to ask you how you like your cold showers (would explain the once a month though...) and raw food.

#### "I work more than 10 hours a day, no weekends nor vacations and 1500 LoC is a joke"

Fair enough, I'll check back on you in six months and a year, see how things are going :D

#### "I don't do code, this doesn't work for me !"

To a certain extent, maybe, and I really can't guess everyone's workload...

I'm still pretty sure that if you are saying that as a knowledge worker, you have carefully avoided to ask yourself how you could use this tool !

So, of course, mileage will vary but I would not say "AI wouldn't work" before really giving it a try !

#### "I'm in tradescraft, you have no power here !"

Have you seen an amazon warehouse recently ? or those robots running marathons or cage fighting ?

now, you know who said exactly that when gpt-3 came out a few years back ? devs.

And, even if you do not think robotics will take the same path within the next 10 years, you should really think about those displaced knowledge workers ? If you are really immune to AI, everyone and their grandmother will flock to your field !

So, in some aspects, this is still a problem despite being an indirect one.

#### "And what will people do ?"

I don't know, i intentionally avoided that aspect of the problem to focus on the amount of energy required for a unit of work.

I made an effort to stay as neutral as possible as this issue is more of a sociological/societal one than a technical one and I'm not well equipped for that.

And it would murk up the water with no service to the point : "AI is more efficient than a Human at doing work"

But, sure, this is something we should all be thinking about and ask our politicians to think about...

Cause, if machines are faster, more efficient and more available... What will people do... ?
