---
title: StationIO
date: 2023-11-07T15:35:30+01:00
summary: An arduino 'framework' that takes care of the basics and gives you all the freedom
project: StationIO-Station
---

A few years back I started toying with arduino and esp8266. That, was, fun !

Ok, C++ ain't fun, but, you have so many libraries (of various quality, sure, but) that comes with great examples, a few copy and paste, couple of tweaks, boom, you got yourself a working prototype, it is just awesome !

Soon enough though, I got tired of copy-pasting. Keeping different boards (I started to have a few weather stations around the house) in sync was a pain. I wanted to have a common code base, and just a few lines of code to change for each board.

Born was ESPStation, it died quickly when I realised how much I knew of C++, so I started again from scratch, and there was StationIO.

It's far from perfect, or even pretty (it's a mess, but I'll get things sorted out, in time), but it works.

And because I'm (a tiny bit) lazy (did I tell you I was lazy ?), I created a [generator](https://dimitrigilbert.github.io/StationIO-Station), in HTML and javascript, for the code ^^. As I was already at it, there an installer script generator, as well ;)

It's another take on the whole IoT stuff. Stations are independant and instead of reporting to a gateway/hub/whatever each has an rest api so you can fetch ionformations from them. 

I find it simpler than having to have an MQTT gateway and also more versatile/resilient as I can talk to each station directly from anywhere on the network.

This means, stations can talk to each other, any computer can talk to any stations, etc... in a more decentralized fashion, me likey.

Now, if you'd rather have it working with MQTT, I'm pretty sure it's a few copy paste away (It's just arduino code, after all).
