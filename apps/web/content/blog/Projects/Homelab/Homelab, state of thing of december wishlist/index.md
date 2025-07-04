---
title: Homelab, state of thing and december wishlist
date: 2023-11-16T11:39:17+01:00
tags: 
  - homelab
  - rpi
summary: Regroup and look around, wandering is fun, but, sometimes you need to know where you want to go.
slug: "index"
---

I have been toying around with RPIs for years, got a original Model A with a whopping 512MB of ram and the (slooooow) 700Mhz single core cpu. It served me (and my flatmate then) well as a media center for a couple years, then I moved around a bunch and when I settled back (years after), it was time for the RPI 4.

## What do I have

That is what I have right now, a 4 . I considered an 8 GB model, but considering my use case, I'd probably run out of punch before filling the 8 gigs of ram.

It boots off of a usb ssd and has 2 external (NTFS...) drives connected. I also have a DaC pro 2 from hifiberry and it displays out of a cheapo generic 1080p projector I bought from the jungle site on my wall. Yes, it is fine. I watch the occasional DVD so it is fine. I sure would like better but, meh, no coins for that.

## Coming soon hardware

A PI 5 8 gigs should be here before december. It will replace the pi 4 for all on premise stuff. The bump in power justify the 8 GB in my opinion, and with that bump will come a few more software that I will run.

## More powa', more softwa'

I'll have that for sure, we'll see how the pi behaves with this kind of load.

### A git server

This is not the place to explain why I'm starting to be kind of careful with Github, but I am.

So just as a precaution, I will run a git server thing on the updated homelab, you'll have to wait for the article to know which one ;).

### CD stuff

I'd like to  (re-)dip a toe in continuous delivery stuff. It'd help keep my StationIO deployement up to date, build this site automagically, handle recurring task on my (way too) many projects, do whatever, the sky is your oyster (or something) !

If I could eliminate as much sysadmin as possible, hell I'd love that !

### A personal cloud thingy

I didn't pick one yet but OwnCloud, NextCloud, whatever. I might try a bunch and make content about that ^^.

I'd like to be able to simply store/backup documents, access them from outside sometimes, I want a REST api and easy external sync for back up that's pretty much it.

Bonus points for apps (photo management, document edition, etc...) and plugins, but not necessary.

## A door to the world

"Soon"(tm), I should have a fiber connection and should have athe perks thats comes with that,
* a static(ish) IP
* bandwith
* more bandwith

This means, I'll be able to open some of my services to the world. 

I want a PiHole, a VPN and use it as a relay for my weather stations, git server and the cloud thingy to be able to acces them from outside.

In the mean time, my sister's kids are getting older. They just got their first decent computer and start to venture online and I would like to keep them safe, I'll probably end up routing all traffic through me (VPN) with drastic mesure (the great wall of Didi)

Maybe I'll install a few FOSS for social media and communication needs to use with their friends as instagram, FB, X or whatever ARE NOT allowed for now.
Kids are mean and parents are dumb (and/or inverselly proportional), so, yeah, I'm a fascist (the great wall and stuff ^^), whatever you'd like, yeah, they'll probably suffer from something else, but at least, not that.

## MyPi, a toolbox for my raspberry by homelab

Of course, I created a [project](https://github.com/DimitriGilbert/MyPi) for that.

TLDR is I want to automate install and maintainance on my Pi, I could have used Ansible or something but I wanted to do it myself using Bash as much as possible.

Nothing fancy for now:
* install/update software using apt, docker and git
* add entry to the fstab
* add entry to the nfs exports
* create folders
* get metrics about the pi (temperature, ram, etc...)

## What now ?

You can expect a bunch of articles about [MyPi](/projects/mypi), the different software I'll use, how I'll use them, scripts creation to make life easier. More random content probably, haven't decided yet.

Definitly some sort of avant calendar (not daily) regarding homelab creation.

{{% goodbye %}}
