---
title: ParseArger
summary: A bash script to generate standalone bash scripts that parse arguments, options and flags.
project: parseArger
---


I am what you could call a serial-scripter, meaning, i have the tendency to script as much "can be" recuring tasks as possible. As history goes, I started when I ventured into the linux world, for fun, 20 years ago. It was with bash.

I ended up with a carrer in development, and believe it or not, I still created scripts, not in bash though. Simple scripts maybe but as soon as I needed any kind of option... nope !

So I went to python, then php (using built in tools like oil with fuelPHP or artisan for laravel) and then node (using minimist or yargs). Those are great languages, but, most my scripts were automating CLI tasks, that I did with bash in the first place and most of what those scripts did were wrap argument parsing to call bash commands (most of the time)....

Less than optimal life changing situation made that I had way more time, so I decided to give bash another go for scripting. I looked for someting to help me and tried only numbered arguments (it was a mess), parseopt (nice but, no doc completion or whatever) until I found [argbash](https://argbash.io/). It was not perfect but a hell of a lot better than anything so far !

I used that for a while, keeping an eye out and found [bashly](https://github.com/DannyBen/bashly/). which was packed full of feature but it was using ruby (maybe I am kind of obsessive, but I wanted bash !).

Qu'a cela ne tienne, I was going to add what I was missing to argbash and everything would be great And .. and... and what the hell is that !?

My grog brain was not able to comprehend was was going on, what, so, ever ! After a couple hours trying to make head and tails of things I threw my arms to the sky, clenched my fists and shouted 'So it's like that hu ?! Well, I'm'ona make ma own then !' !

Because I'm a lazy bum (did I tell you how I hate doing the same thing multiple times ?) and the work was mostly done, I started from argbash output and reversed engineered it into parseArger.

And here we are.
