---
title: Unit tests for parseArger
date: 2024-02-28T11:13:43+01:00
summary: Unit tests for me, unit tests for you, unit tests for everyone !
tags: 
  - bash
  - terminal
  - scripting
  - parsearger
  - devlog

---

Do you like unit tests ? I don't, but they are useful... I'll probably go at it in a [Black hole](/black-hole) at some point...

But for now, rejoyce ! parseArger is not (mostly) unit tested, yay !

And as a bonus, you guys get to enjoy basic project unit tests generation ! What is not to like, hum ?

## Bash and unit test

I've had a few looks at bash unit testing in the past and, maybe because of my complicated relationship with unit tests, I did always put it off... this time, well..., it was time.

ParseArger definitly grew enough to need them so....

I settled on [Bashunit](https://bashunit.typeddevs.com/).

Is it the best ? I dunno...

The most complete ? dunno...

Fastest, easiest, anything ... ? mehh, dunno...

It's there, updated, decently documented, and I will hate it at some point, so might as well go with that.

I know it's not the most convincing argumentation for a tool, but sometimes, the only bad choice is not choosing. And here, everything seems more or less equal.

Once the lib is chosen, a quick install `curl -s https://bashunit.typeddevs.com/install.sh | bash` ([see doc for more info](https://bashunit.typeddevs.com/installation)) and boom, I got my testing lib !

## Run the parseArger tests

I won't bother you with writing about unit test writing... it would be boring out the boring...

[Bashunit documentation](https://bashunit.typeddevs.com/) has some great example and you can always check [parseArger tests folder](https://github.com/DimitriGilbert/parseArger/tree/main/tests) for more examples ;)

I just wrote all that to inform you that, if youd like, once parseArger is installed, you could run its tests !

```bash
# go to ionstall folder
cd /parseArger/install/folder
# run the tests
./lib/bashunit ./tests
```

### I want to shame you with coverage !

Sure, if I felt shame about that ^^.

Now it can still be an interresting metrics, so I use [`bashcov`](https://github.com/infertux/bashcov) for that and it works as follow :

```bash
# go to ionstall folder
cd /parseArger/install/folder
# run the tests
bashcov ./lib/bashunit ./tests
```

Because a bunch of temporary script are generated and removed, [bashcov](https://github.com/infertux/bashcov) spits a bunch of warnings that do not matter (annoying nonetheless...).

A new directory `coverage` will contain [bashcov](https://github.com/infertux/bashcov) html output.

Note that you will have to install [bashcov](https://github.com/infertux/bashcov) on your own !

## Unit tests for YOUR project !

Yep, that's right ! `parseArger project` can now install bashunit AND generate basic test files for your command and sub-commands.

It will just run your command `help` for now, but this will probably get worked on in the future (testing every argument, option, flag, one-ofs, etc ...)

just use the `--unit-test` flag on your project command :

```bash
parseArger project my-project --unit-tests \
  --project-subcommand cmd-one \
  --project-subcommand cmd-2
```

Then to run your newly created fatastic and wonderful unit tests, run the following :
```bash
cd my-project
./lib/bashunit ./tests
```

And now the only excuse you have not to write unit tests for your bash programs, is your very own lazyness (what ? I suffered through it so if you won't, you'll at least feel guilt 3:D, you are welcome :) )

## What now ?

I've done the antagonizing bit just above, so now comes the balm : 
* it is easy
* it is fairly fast
* you will thank yourself (me ? ...) later !

If nothing else, you can just run your command to make sure it exists nicely ;)

{{% projectInteraction project="parseArger" %}}

{{% goodbye %}}
