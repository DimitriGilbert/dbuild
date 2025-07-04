---
title: ParseArger Nested options
date: 2024-02-09T11:13:08+01:00
summary: Option namespace thingy for parseArger
tags: 
  - bash
  - terminal
  - scripting
  - parsearger
  - devlog

slug: "index"
---

You can now use a "namespace" for options.

It will create an associative array with passed keys and values !

## Usage

These are the arguments for the `nested` sub command :

```bash
arg-name: nested option namespace
description: positional argument description
--one-of <one-of>: accepted values for keys, repeatable
--complete <complete>: bash built-in completely function, repeatable
--complete-custom <complete-custom>: completely custom dynamic suggestion, repeatable
```

This is how to generate (or add using `parse` !) a script using it:

```bash
parseArger generate --output my-script --nested 'opt-ns "a nested option"';
```

And this is how to use said script:

```bash
./my-script --opt-ns-a "value" --opt-ns-b "b value" --opt-ns-option "my opt" --opt-ns-blabla "lorem ispum";
```

The nested value are in an associative array as follow :

```bash
echo _arg_opt_ns["a"];
# value
echo _arg_opt_ns["b"];
# b value
echo _arg_opt_ns["option"];
# my opt
echo _arg_opt_ns["blabla"];
# lorem ispum
```

## To do what ?

Sometimes when scripting, you are using other CLI programs.

Wouldn't it be nice to be able to pass specific option to that programs, from the CLI, you know, to make your scripts more extensible/user friendly !

## What now ?

I'm heading back to unit test land, so you do you my lil' friend ;)

I just realized I didn't not document the `nested` options, so I just came to do that !

{{% projectInteraction project="parseArger" %}}

{{% goodbye %}}
