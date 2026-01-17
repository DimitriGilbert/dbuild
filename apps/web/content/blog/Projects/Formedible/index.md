---
date: "2025-01-17T10:00:00+01:00"
title: Formedible, the Ultimate React Form Library for 2025
summary: A sophisticated wrapper around TanStack Form v1 with 22+ built-in field types, multi-step wizards, conditional logic, analytics, and enterprise-grade features. Built with React 19, TypeScript, Zod, and shadcn/ui.
tags:
  - form
  - react
  - typescript
  - tanstack
  - zod
toc: true
slug: "index"
---

So, who here builds **React forms** ? And by forms I mean the good kind, with validation, multi-step wizards, conditional logic, and... well, not state of the art things that take you a week to build. 

Yeah... it's ok, we've all been there. I mean, have you ever tried to build a proper form system from scratch ? It's a whole kerfuffle ! Between validation, field types, conditional rendering, and let's not even talk about persistence... 😛

Well, "NO MORE !" I say !

## Meet Formedible

[Formedible](https://github.com/DimitriGilbert/formedible) is what happens when you take [TanStack Form v1](https://tanstack.com/form/latest) (which is already pretty awesome) and wrap it in a nice, user-friendly package with enterprise-grade features. It's currently at v0.3.13, so it's early days but it's getting there !

Here's what you get out of the box:

* **22+ built-in field types** - text, email, password, select, combobox, date, time, location, file upload, arrays, objects, and a whole bunch more
* **Multi-page forms** - with progress tracking and step navigation
* **Schema-first validation** - powered by Zod (because we like type safety around here)
* **Conditional logic** - show/hide fields based on other field values
* **Dynamic options** - load options from APIs, filter them, whatever you need
* **Template interpolation** - use `{{fieldName}}` syntax in labels, descriptions, options... it's pretty handy
* **Real-time analytics** - track form completion, field-level analytics, abandonment... the whole shebang
* **Form persistence** - localStorage, sessionStorage, whatever you need to keep data around
* **Visual form builder** - because sometimes you just want to click things together
* **AI-powered form builder** - yeah, you heard that right, AI generates forms for you now
* **Component override system** - customize everything if you feel adventurous

## TLDR

Oh, I know you lot are a bunch of impatient nerds (at least I am...) so here's a quick run down to get going !

```bash
# install the core package
bun add formedible

# or if you're feeling fancy and want everything
bun add formedible formedible-builder formedible-ai-builder formedible-parser
```

Then, a simple form looks like this:

```tsx
import { createFormSchema } from 'formedible'
import { z } from 'zod'

const schema = createFormSchema({
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Your name',
      validation: z.string().min(2, "C'mon, give me more than 2 characters !"),
    },
    {
      name: 'email',
      type: 'email',
      label: 'Your email',
      validation: z.string().email("That's not a valid email, mate"),
    },
    {
      name: 'country',
      type: 'select',
      label: 'Where you from ?',
      options: ['France', 'UK', 'Germany', 'Other'],
    },
  ],
})

// use it in your component
import { FormedibleForm } from 'formedible'

function MyForm() {
  return (
    <FormedibleForm schema={schema} onSubmit={(data) => console.log(data)}>
      <FormedibleForm.Field name="name" />
      <FormedibleForm.Field name="email" />
      <FormedibleForm.Field name="country" />
      <FormedibleForm.Submit>Submit</FormedibleForm.Submit>
    </FormedibleForm>
  )
}
```

Easy as pie, right ? Well, hopefully easier than pie, because pie is actually quite hard to make well...

## What's under the hood ?

I've built Formedible as a monorepo with a few packages (because everyone loves monorepos, right ? ... right ?):

- **formedible** - the core library, this is what you'll use 90% of the time
- **formedible-builder** - visual form builder, drag & drop style
- **formedible-ai-builder** - AI-powered form generation (still experimental, but cool)
- **formedible-parser** - parse form schemas and generate different outputs

The tech stack is pretty modern:

* **React 19.1+** - yeah, we're living in the future
* **TanStack Form v1.23+** - the form library that does all the heavy lifting
* **Zod v4.0+** - validation and type safety
* **shadcn/ui** - nice UI components out of the box
* **TailwindCSS 4.1+** - styling, because who has time to write CSS these days ?
* **Turborepo** - managing the monorepo, builds, and all that jazz

## The field types

Right, so I mentioned 22+ field types... let me list the main ones so you know what you're getting:

* **Text inputs** - text, password, textarea, number
* **Selection** - select, multi-select, combobox, radio, checkbox, checkbox-group
* **Date & time** - date, time, datetime, date-range
* **Files** - file-upload, image-upload
* **Special** - location, phone, url, color, rating, slider, toggle
* **Complex** - array, object, nested forms (ooh, fancy)

And if that's not enough, you can build your own custom field types because I've made the thing extensible (you're welcome 😊).

## Multi-page forms

One of the things I'm actually quite proud of is the multi-page form system. It's not state of the art (nothing around here is), but it does the job pretty well:

```tsx
const schema = createFormSchema({
  fields: [
    {
      name: 'personal',
      type: 'object',
      label: 'Personal Info',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Your name',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Your email',
        },
      ],
    },
    {
      name: 'address',
      type: 'object',
      label: 'Address',
      fields: [
        {
          name: 'street',
          type: 'text',
          label: 'Street',
        },
        {
          name: 'city',
          type: 'text',
          label: 'City',
        },
      ],
    },
  ],
})

function MultiStepForm() {
  return (
    <FormedibleForm schema={schema} onSubmit={handleSubmit}>
      <FormedibleForm.Step step="personal">
        <FormedibleForm.Field name="personal.name" />
        <FormedibleForm.Field name="personal.email" />
        <FormedibleForm.Next>Next</FormedibleForm.Next>
      </FormedibleForm.Step>
      
      <FormedibleForm.Step step="address">
        <FormedibleForm.Field name="personal.street" />
        <FormedibleForm.Field name="personal.city" />
        <FormedibleForm.Submit>Submit</FormedibleForm.Submit>
      </FormedibleForm.Step>
      
      <FormedibleForm.Progress />
    </FormedibleForm>
  )
}
```

See ? Not too scary, is it ?

## Conditional logic

This is the bit where things get interesting. You can show/hide fields based on other field values:

```tsx
const schema = createFormSchema({
  fields: [
    {
      name: 'hasExperience',
      type: 'checkbox',
      label: 'Do you have experience with React forms ?',
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'How many years ?',
      showWhen: {
        field: 'hasExperience',
        operator: 'equals',
        value: true,
      },
    },
  ],
})
```

You can do nested conditions, multiple conditions, all sorts of stuff. I won't go into all the details here because we'd be here all day, but the documentation has the full scoop.

## Analytics

So, I added analytics because... well, why not ? Sometimes you actually want to know how people interact with your forms:

```tsx
<FormedibleForm 
  schema={schema} 
  onSubmit={handleSubmit}
  analytics={{
    enabled: true,
    onFieldFocus: (field) => console.log('User focused on', field),
    onFieldBlur: (field) => console.log('User left', field),
    onFieldChange: (field, value) => console.log('User changed', field, 'to', value),
    onStepChange: (step) => console.log('User moved to step', step),
  }}
>
```

It's not Google Analytics (thank god), but it gives you enough to understand what's happening with your forms.

## Persistence

Ever filled out a long form, then accidentally closed the tab ? Yeah, me too. It's awful. So I built in persistence:

```tsx
<FormedibleForm 
  schema={schema}
  persistence={{
    enabled: true,
    storage: 'localStorage', // or 'sessionStorage'
    key: 'my-form-data',
  }}
>
```

Now when users come back, their data is still there. They'll thank you. Maybe not out loud, but in their hearts, they're thanking you.

## The visual builder

Right, so if you're not the coding type (or you're just lazy, which I respect), there's a visual builder. It's not the best thing since sliced bread, but it's decent:

```bash
# install the builder
bun add formedible-builder

# run it
bunx formedible-builder
```

It'll start a web interface where you can drag & drop fields, configure them, and export the schema. Pretty handy when you're prototyping.

## The AI builder

Now this one is still experimental, but it's pretty cool. You describe a form, and AI generates it for you:

```bash
bun add formedible-ai-builder
bunx formedible-ai-builder "I need a registration form with name, email, password, address fields"
```

It's not perfect (I mean, nothing is), but it's getting better. Sometimes it gets things wrong, sometimes it gives you weird field types... but when it works, it's like magic ✨

## What I still need to work on

Look, I'm going to be honest with you here (as I should be). There are still things that need work:

* Documentation is... adequate, but could be better
* The AI builder is hit or miss sometimes
* Some field types don't have all the options you might expect
* Performance on very large forms (100+ fields) could be better
* The visual builder could use more polish
* I'm sure there are bugs I haven't found yet (because I'm the only one using it...)

But hey, it's open source and I'm actively working on it. If you find bugs, have suggestions, or just want to say "hey, this is actually pretty good", feel free to open an issue on the [GitHub repo](https://github.com/DimitriGilbert/formedible).

## What now ?

Well, have at it ! Try it out, build some forms, break things, let me know what works and what doesn't.

If you're interested in contributing, there's plenty to do. Documentation, bug fixes, new field types, better AI prompts... the list goes on.

The repository is [here](https://github.com/DimitriGilbert/formedible) and the documentation is [here](https://formedible.dev) (well, it will be there once I finish setting it up... it's a work in progress, ok ?).

Thanks for the read and I hope you found it useful (or at least entertaining :D)

{{% goodbye %}}
