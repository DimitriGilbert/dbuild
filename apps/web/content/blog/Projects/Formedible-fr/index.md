---
date: "2025-01-17T10:00:00+01:00"
title: Formedible, la Bibliothèque de Formulaires React Ultime pour 2025
summary: Un wrapper sophistiqué autour de TanStack Form v1 avec plus de 22 types de champs intégrés, assistants multi-étapes, logique conditionnelle, analytics et fonctionnalités de niveau entreprise. Construit avec React 19, TypeScript, Zod et shadcn/ui.
tags:
  - form
  - react
  - typescript
  - tanstack
  - zod
  - french
toc: true
slug: "index"
---

_Ce contenu a été généré par le modèle AI GLM 4.7 et not-ai-writer_

Alors, qui ici construit des **formulaires React** ? Et par formulaires, j'entends les bons. Avec validation, assistants multi-étapes, logique conditionnelle, et... enfin, pas des trucs à la pointe de l'art qui vous prennent une semaine à construire.

Ouais. C'est ok. On est tous passés par là. Je mean, vous avez déjà essayé de construire un système de formulaires propre à partir de zéro ? C'est tout un bordel ! Entre la validation, les types de champs, l'affichage conditionnel, et parlons même pas de la persistance... 😛

Bon. "PLUS ÇA !" je dis !

## Meet Formedible

[Formedible](https://github.com/DimitriGilbert/formedible) c'est ce qui arrive quand vous prenez [TanStack Form v1](https://tanstack.com/form/latest) (déjà vachement bien) et que vous l'enveloppez dans un joli paquet user-friendly avec des fonctionnalités de niveau entreprise. Actuellement en v0.3.13, donc tout début mais ça avance !

Ce que vous obtenez out-of-the-box :

* **22+ types de champs intégrés** — text, email, password, select, combobox, date, time, location, upload de fichiers, arrays, objects, et tout un tas d'autres
* **Formulaires multi-pages** — avec suivi de progression et navigation par étapes
* **Validation first-schema** — propulsée par Zod (on aime la type safety par ici)
* **Logique conditionnelle** — afficher/masquer des champs basés sur les valeurs d'autres champs
* **Options dynamiques** — chargez des options depuis des APIs, filtrez-les, tout ce dont vous avez besoin
* **Interpolation de template** — utilisez la syntaxe `{{fieldName}}` dans les labels, descriptions, options... plutôt pratique
* **Analytics en temps réel** — suivez la complétion des formulaires, analytics au niveau champ, abandon... tout le bazar
* **Persistance des formulaires** — localStorage, sessionStorage, tout ce dont vous avez besoin
* **Constructeur visuel de formulaires** — parfois vous voulez juste cliquer des trucs ensemble
* **Constructeur de formulaires AI-powered** — ouais, l'IA génère des formulaires pour vous maintenant
* **Système de override de composants** — customisez tout si vous vous sentez aventureux

## Démarrage rapide

Oh, je sais que vous êtes tous des nerds impatients. (En tout cas je le suis...)

```bash
# installer le package core
bun add formedible

# ou si vous vous sentez fantaisiste et que vous voulez tout
bun add formedible formedible-builder formedible-ai-builder formedible-parser
```

Un simple formulaire :

```tsx
import { createFormSchema } from 'formedible'
import { z } from 'zod'

const schema = createFormSchema({
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Your name',
      validation: z.string().min(2, "C'mon, give me more than 2 characters!"),
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
      label: 'Where you from?',
      options: ['France', 'UK', 'Germany', 'Other'],
    },
  ],
})

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

Simple comme tout ? Bon. Espérons que c'est plus simple que la tarte, parce que la tarte en fait c'est assez dur à réussir bien...

## Sous le capot

J'ai construit Formedible comme un monorepo avec quelques packages (parce que tout le monde aime les monorepos, non ? ... non ?) :

- **formedible** — la librairie core, ce que vous utiliserez 90% du temps
- **formedible-builder** — constructeur visuel de formulaires, style drag & drop
- **formedible-ai-builder** — génération de formulaires AI-powered (expérimental, mais cool)
- **formedible-parser** — parse les schémas de formulaires et génère différents outputs

La stack technique est plutôt moderne :

* **React 19.1+** — on vit dans le futur
* **TanStack Form v1.23+** — la librairie de formulaires qui fait le gros du travail
* **Zod v4.0+** — validation et type safety
* **shadcn/ui** — des composants UI sympas out-of-the-box
* **TailwindCSS 4.1+** — styling, parce que qui a le temps d'écrire du CSS de nos jours ?
* **Turborepo** — gérer le monorepo, les builds, et tout ce bazar

## Les types de champs

Bon, donc j'ai mentionné 22+ types de champs... voici les principaux :

* **Text inputs** — text, password, textarea, number
* **Sélection** — select, multi-select, combobox, radio, checkbox, checkbox-group
* **Date & time** — date, time, datetime, date-range
* **Fichiers** — file-upload, image-upload
* **Spécial** — location, phone, url, color, rating, slider, toggle
* **Complexe** — array, object, formulaires imbriqués (ooh, fantaisiste)

Pas assez ? Construisez les vôtres. Je l'ai fait extensible (de rien 😊).

## Formulaires multi-pages

Un des trucs dont je suis plutôt fier. Pas à la pointe de l'art (rien n'est à la pointe de l'art par ici), mais ça fait assez bien le taf :

```tsx
const schema = createFormSchema({
  fields: [
    {
      name: 'personal',
      type: 'object',
      label: 'Personal Info',
      fields: [
        { name: 'name', type: 'text', label: 'Your name' },
        { name: 'email', type: 'email', label: 'Your email' },
      ],
    },
    {
      name: 'address',
      type: 'object',
      label: 'Address',
      fields: [
        { name: 'street', type: 'text', label: 'Street' },
        { name: 'city', type: 'text', label: 'City' },
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

Vous voyez ? Pas trop effrayant, non ?

## Logique conditionnelle

C'est là que ça devient intéressant. Affichez/masquez des champs basés sur les valeurs d'autres champs :

```tsx
const schema = createFormSchema({
  fields: [
    {
      name: 'hasExperience',
      type: 'checkbox',
      label: 'Do you have experience with React forms?',
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'How many years?',
      showWhen: {
        field: 'hasExperience',
        operator: 'equals',
        value: true,
      },
    },
  ],
})
```

Conditions imbriquées, conditions multiples, tout un tas de trucs. Je vais pas entrer dans tous les détails ici (on serait là toute la journée), mais la documentation a toutes les infos.

## Analytics

Donc, j'ai ajouté des analytics parce que... bah, pourquoi pas ? Parfois vous voulez vraiment savoir comment les gens interagissent avec vos formulaires :

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

Pas Google Analytics (merci dieu), mais ça vous donne assez pour comprendre ce qui se passe avec vos formulaires.

## Persistance

Vous avez déjà rempli un long formulaire, puis fermé l'onglet par erreur ? Ouais, moi aussi. C'est horrible. Donc j'ai intégré la persistance :

```tsx
<FormedibleForm
  schema={schema}
  persistence={{
    enabled: true,
    storage: 'localStorage', // ou 'sessionStorage'
    key: 'my-form-data',
  }}
>
```

Maintenant quand les utilisateurs reviennent, leurs données sont toujours là. Ils vous remercieront. Peut-être pas à voix haute, mais dans leur cœur, ils vous remercient.

## Le constructeur visuel

Si vous n'êtes pas du genre à coder (ou juste flemmard, ce que je respecte), il y a un constructeur visuel. Pas la meilleure chose depuis le pain tranché, mais ça se défend :

```bash
bun add formedible-builder
bunx formedible-builder
```

Ça lance une interface web où vous pouvez drag & drop des champs, les configurer, et exporter le schéma. Plutôt pratique quand vous prototyppez.

## Le constructeur AI

Toujours expérimental, mais plutôt cool. Décrivez un formulaire, l'IA le génère pour vous :

```bash
bun add formedible-ai-builder
bunx formedible-ai-builder "I need a registration form with name, email, password, address fields"
```

Pas parfait (rien ne l'est), mais ça s'améliore. Parfois ça se trompe, parfois ça donne des types de champs bizarres... mais quand ça marche, c'est magique ✨

## Ce qui a encore besoin de boulot

Écoutez, je vais être honnête avec vous (comme je devrais l'être) :

* La documentation est... adequate, mais pourrait être meilleure
* Le constructeur AI est parfois hit or miss
* Certains types de champs n'ont pas toutes les options que vous pourriez attendre
* Les performances sur les très gros formulaires (100+ champs) pourraient être meilleures
* Le constructeur visuel pourrait utiliser plus de polish
* Je suis sûr qu'il y a des bugs que je n'ai pas encore trouvés (parce que je suis le seul à l'utiliser...)

Mais hey, c'est open source et je travaille activement dessus. Si vous trouvez des bugs, avez des suggestions, ou voulez juste dire "hey, c'est plutôt pas mal", ouvrez une issue sur [GitHub](https://github.com/DimitriGilbert/formedible).

## Et maintenant ?

Faites-vous plaisir ! Essayez-le, construisez des formulaires, cassez des trucs, dites-moi ce qui marche et ce qui ne marche pas.

Si vous êtes intéressé par contribuer, il y a plein à faire. Documentation, fix de bugs, nouveaux types de champs, meilleurs prompts AI... la liste continue.

Le repo est [ici](https://github.com/DimitriGilbert/formedible) et la documentation est [ici](https://formedible.dev) (enfin, elle y sera une fois que j'aurai fini de la mettre en place... c'est un travail en cours, ok ?).

Merci d'avoir lu. J'espère que vous avez trouvé ça utile (ou au moins divertissant :D)

{{% goodbye %}}
