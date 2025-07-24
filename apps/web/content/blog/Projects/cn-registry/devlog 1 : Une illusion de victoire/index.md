---
title: cn-registry devlog 1 -Une illusion de victoire
date: 2025-07-24T15:00:17+01:00
tags:
  - shadcn
  - devlog
  - cn-registry
summary: Suivez-moi dans un voyage d'échecs et de folie, en route pour maîtriser la nouvelle génération d'IA.
slug: "index"
---

## Pourquoi ?

J'ai cherché un truc comme ça et j'ai rien trouvé, alors je le construis !

Je vais en profiter pour le construire en public, autant que faire se peut ! Ca veuut dire que la plupart des prompts et des conversations seront disponibles pour les lire et s'en inspirer !

Pourquoi pas toutes les conversations ? Euuuh alors... bon... parfois, j'oublie. Eeeet euuuh d'autres fois... disons que c'est pas tellement family friendly ^^ ! (Je suis grincheux et irritable par défaut, quand j'ai mal, c'est pire... en ce moment, ca oscille entre 2 et 5 sur 10 ^^)

Je veux aussi montrer/prouver a d'autres qu'il est possible d'utiliser l'IA pour generer la majorité du code avec une "orchestration" minutieuse.

Est-ce que ce sera parfait ? XD quelle question stupide ! NON ! Bien sûr que non !

Est-ce que ça va faire le travail ? J'espère bien !

## Qu'est-ce que c'est déjà ?

C'est une bibliothèque/un marketplace de composants Shadcn ! J'en avais marre de chercher des composants et des blocs sympas un peu partout sur Internet !

Entre la SEO médiocre de GitHub et celle encore pires des sites de développeurs, c'est vraiment pas facile de tomber sur de nouveaux composants, et c'est dommage car certains sont fantastiques !

En plus, en tant que créateur de composants (avec des sites... dont le SEO est affreux...), je me sens un peu invisible, alors [cn-registry.dev](https://cn-registry.dev) est né !

## Le processus

Comme je l'ai dit, il s'agit d'une build in public, alors je vais partager avec vous ce que j'apprends (et mon futur moi si ce con se met a ecouter !).

Comment j'ai fait, ce qui a fonctionné, ou pas, mes conneries, mes espoirs et mes illusions...

En gros, je vais faire des erreurs et avoir l'air d'un idiot pour que vous n'ayez pas à le faire !

Commençons par le début...

### L'idée

C'est souventque je vois des gens demander des idées sur quoi construire, à d'autres, ou pire, à l'IA...

Non... s'il vous plaît, pas ici !

En vrai, l'idéation (oh je vais pas traduire un mot qu'existe pas non plus !) est **la** chose qui nous resteras face machines pour encore un moment ! Faut pas déléguer ca !

"Mais comment trouver des idées alors ?" pourrait me demander mon lecteur astucieux ! Et vous auriez tout à fait raison de le faire !

Alors laissez-moi vous répondre par une question qui pourrait déclencher un peu d'idéation !

Y a-t-il des problèmes à résoudre, là où vous vivez ?

_les 3 phrases d'avant marche tellement pas en francais, mais je les laisse tellement la traduction est moisie x-)_

Traduction en carton à part, résous un de **tes** problèmes mec (ou meuf, z'êtes également les bienvenus !) !

Comme ca, même si personne s'en sert, t'auras résolu un de tes problèmes !

Pour moi, le problème était "dev faignasse chereche composant shadcn facilement" ! Et voila, maintaint, comment on s'occupe de ca ?!

### Plan initial

Rien de révolutionnaire ou de génial, un bete annuaire ferait l'affaire... mais ca manque un peu de pepse... non ?

Problème simple ne signifie pas nécessairement solution simpliste et j'aime deja bien les usines a gaz alors, allons-y !

Pourquoi ne pas ajouter un peu de social ? C'est pas parce que je suis incompétent (ca marche aussi en 2 mots) sociales que les autres le sont !

Comptes utilisateurs, likes, commentaires ! Et hop, maintenant on socialise !

Bon, on a l'idée de base en entier ? Oui ?

Oui ! Et bhe y'a plus qu'a aller embêter une IA avec ça !

### A vos marques, pret, proomptez !

Oui, les prompts sont encores en anglais, ca marche mieux. vraiment !

```
I want to build a website using nextjs 15 and shadcn  (i got the stack figured out !) and I need a complete plan to create the front end !
the project is called "cn-registry" and it will be a registry of shadcn components and tools, because hunting for them feels like a full time job.
I want you to plan the needed components and pages, I aim for maximum reusability so if something make sense standalone, it should be ! i do not want you to create code, just the plan !
I want a home page with carousels, one with the 10 latest components, one with the trending one
components will have a name, a description, a repo link, a website, an installation url, categories and each should have a dedicated page with the copiable install command, the repo readme and github info, some showcase with code toggles
Tools will be the same but the install url might be for an npm package or not exists
I want a search page with card or list results and filters on categories
same for tools but on a different page
I want to have a star rating system and user account where user can see the components they stared
User will be able to comment on components
```

Commeon peut le voir, simple, (in)efficace, (dés)organisé ! Et quelques raffinements plus tard, j'ai mon prompt intermédiaire pour V0 !

Je ne vais pas vous ennuyer avec le prompt interminable (vous avez le lien de conversation dans le repo ^^), mais il était interminable et j'ai pas beaucoup changé de choses !

Apres le passage chez V0, j'avais un prototype de front-end avec des données simulées pour... Mais je vais le mettre où ça moi... ?!

### Sélectionnez votre stack

Perso, je l'ai déjà fait, et vous devriez probablement y penser avant de prompt en vrai ! Pour moi, c'était facile, j'ai pris ma stack par défaut du moment : Nextjs front et back, trpc, tailwind et shadcn.

Oui, c'est ennuyeux. Oui, tout le monde fait la même chose. Je m'en tape le coquillard !

Je commence un milliard de projets (et demi) chaque mois parce que je suis incapable de me concentrer sur une seule chose à la fois, ca veut pas dire que j'ai la de bande pasaante pour apprendre de nouvelles choses à chaque fois !

Il y a aussi pas mal de bonnes docs et ressources pour toutes ces technos, ca facilite le travail meme sans trop d'expérience préalable.

Et pour rien gacher, un gros, Gros (mais genre GROS) bonus : Cela fonctionne bien avec l'IA ! (enfin, des fois, un peu)

Est-ce que je dis que vous devriez choisir cette stack ? Si vous l'aimez, oui, sinon, je m'en fiche complètement !

Choisissez ce que vous connaissez, la nouvelle stack à la mode ou ce qui vous titille ! Vraiment, je m'en fiche complètement, mais je me soucie que vous le fassiez correctement ! Utilisez [better-t-stack](https://better-t-stack.dev) !

Oui, c'est autoritaire, mais si votre stack est dedans, utilisez ca ! 1 commande, boom, projet tout chaud et prêt à decoller en quelques secondes (remercie moi plus tard)

### Laissez la musique commencer !

```markdown
[x] Idée
[x] Concept
[x] projet initialisé
[x] prototype frontend
[ ] plan approprié
```

Ooooh ? Vous pensiez... ? vous pensiez que j'allais ouvrir mon agent IA préféré et commencer à vibe coder ?

uuuhh non non non ! pas la, pas encore ! la, on retourne à notre premier pote qu'on a utilisé pour le plan du front-end et on va lui demander un autre plan !

```markdown
I am using the latest version of drizzle orm and postgres so i would like you to carefully plan the whole complete data model I will need,
including user setting and admin/creator utilities table tha migth be needed in the project. we will iterate to align with my goal but try to makee it very comphrehensive
```

Comme j'ai deja reorientez les choses pour le front end, j'ai eu le droit a un joli plan en one shot, donc...

```
cd workspace/Code/cn-registry;
claude
"I want you to implement the server complete side of the project following this :
  **cn-registry Complete Data Model Plan**
...
  better auth is already setup and running,
  I want schema definition and trpc routes with complete access management for security.
  make sure the apps build when you are done with the backend.
"
```

Et en voiture Simone !

Mis à part les petites reorientations, ca m'a donné un backend "fonctionnel" (a une vache pres !) donc j'ai demandé à l'agent de connecter ca au frontend.

### C'est Bestel, il a mis la cassette et puis pouf !

Vous l'attendiez ? Pour être tout à fait honnête, je ne pensais pas que ce serait si tôt... mais oui, aucun plan ne survit au contact de l'ennemi.

Quel ennemi ? Trpc ! Non non ! pas trpc trpc (c'est très bien trpc !), la version de trpc et le fait qu'une révision majeure est sortie entre la date de coupure d'entrainement de claude et maintenant......

Qu'est ce que donc que ca pourrait il vouloir bien dire toussa ? Les LLMs suivent des schémas qu'elles "connaissent", et devinez ce qu'elles font quand elles connaîssentt pas les schémas ?

Ouep, c'est ca, elles "hallucinent" leurs mamies ! Wooooooot Wooooooot ! -\_- J'espere que vous sentez la douleur !

Mais pour un méchant dans l'histoire, un Héros se présentera un beau soir

Un héros pour aider les dragons à être tués, et son nom est LLM point txt

_eeeett vous savez a quoi on reconnaît des bonnes ryhmes ? elles se traduisent toutes seules!_

```markdown
my stack is using the following package.json files
Agents often fails on trpc usage because their knowledge is out of date.
I would like you to fetch the lates trpc docs and prepare a comprhensive but concise llm.txt for my agents to work with.
it is only destined towards LLM so you can forgo absolutely all the fluff and present information in the best possible way for you to ingest it efficiently
```

J'ai gavé la réponse à mon agent, et après quelques prompts, on m'a servi le cœur du dragon pour le dîner !

### encore, Encore, ENCOOORE

Vous sentez la puissance monter ? L'exaltation de l'accélération par l'IA ? Votre cerveau est-il déjà accro ? Non ? Eh bhe on va devoir travailler là-dessus !

Manque de la doc peut etre ?

Mais tout a fait tout a fait, allons voir ce bon vieux gemini !

je n'ai plus ce prompt, mais c'était quelque chose comme :

```
I am working on this project [description]
the front and backend are prototyped, the apps build but i did not test anything yet.
I would like you to analyze it very (very ! VERY !!) carefully !
you have to open many files to make sure you understand the app and how it is built.
once done, please create some documentation about that.
```

que j'ai invariablement dû compléter après la première réponse par un joyeux (paraphrase exacte)

```
oooOOOOH FFS ! HOW THE F DO YOU WANT TO UNDERSTAND ANYTHING, YOU OPENED 5 FILES, 2 OF THEM WERE PACKAGE.JSON ! OPEN ALL THE FILES ! **ALL OF THEM**
```

Sérieusement, qui arrive a bosser avec gemini (vrais question !) ? Bon apres cette petite sceance de fouettage gemini m'as finalement pondus une doc correct !

De quoi, quoi ? Pourquoi j'ai fait documenter le taf par l'IA ?

```
Good. now that you have a complete understanding of the full project, i want you to create a plan to finish the implementation of the existing base.
then, I want you to create a plan in better.md that outlines possible enhancement to the base application.
One I want is a cart system so a user can add component to it and get a complete install command for all the components he selected.
be creative and come up with functionalities that would make this platform stand out
```

Voilà pourquoi ! Pour bien bosser les LLM ont besoin de plus de 2 phrases de contexte, avec une vision plus précise du code, l'IA pourra planifier plus efficacement !

Quelles fonctionnalités et architectures sont utilisé dans des logiciels similaires ? Il le saura ! Z'aurez plus qu'as faire vos emplettes et ca pourras meme debloquer d'autres idées !

### Vous en avez mare de ces details ? et bhe on va vous en débarrasser

Armés de l'étude de gemini sur mon code, j'ai demandé à claude de faire le travail (Faudrais me payer pour laisser gemini s'approcher de ma codebase en ecriture !).

Une fois finis, je luiai demandé de créer un plan plus precis pour les fonctionnalités supplémentaires que j'ai choisies

- système de panier
- système de projet
- intégration GitHub
- profils créateurs

Il l'a tres grâcieusement fait pendant que je commençais à tester l'application.

Click frenetique et topotage systématiques, passage d'erreur en erreur, indexation par petits groupes, envoyé a l'agent qui n'en fait qu'une bouchée !

C'est l'occasion parfaite pour commencer à examiner le code... oui oui, que maintenant.

En vrai, J'y etais depuis moins de 3 heures et j'ai commancé ma carriere a une époque où tout mettre en place pour dev une application prenait probablement aussi longtemps donc...

je ne dis pas que c'est bien, mais ca fait une bonne douzaine de fois que je commence du dev comme ca et je sais à quoi m'attendre en terme de code.

La chasse aux bugs a pris environ une heure, rien de majeur, "use client" manquant, mauvaise gestion d'état, logique trop compliquée, un tas d'alertes et de prompts, en bref, les spécialités de claude (et j'ai pas subi les gradients bleu violacé cette fois-ci ...)

L'implémentation du plan d'amélioration ? Pareil, simple efficace, en 3-4h de plus :

```
dans @improvements.md implémenter la phase/partie ...
```

### Un jour à la fois

Bon... ce post devient long, et comme c'est la fin du jour 1, je vais m'arrêter ici :D !

À ce moment-là, j'avais une app quasi fonctionnelle, avec un côté admin, les composants et les outils pouvaient être ajoutés.

_je vais les laisser comme ca aussi les suivantes, le jours ou l'IA traduit les ryhmes, on est cuit les lapins!_

Et alors que mes yeux se fermaient tous, je ne pouvais pas voir les ombres qui se formaient.

Me couvrant de joie et de chaleur pour mon application qui fonctionnait comme un charme.

Une petite idée innocente qui deviendrait... [trouvez-moi un nom de quelque chose de mauvais se terminant par le son a, j'ai besoin d'une rime].
