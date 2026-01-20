---
title: "Passer de Ralph a Eric"
date: 2026-01-17T00:00:00+01:00
tags: [
  "AI",
  "Ralph lopp",
  "Eric loop"
]
summary: "Tout le monde ne parle que de la 'Ralph loop', et le principe est cool, mais je pense qu'on peut faire mieux grace au concept de la Boucle a Eric !"
slug: "index"
og-image: "/images/blog/blackhole/from_ralph_to_eric/Eric_saw_Ralph.webp"
---

Je vais pas re-introduire le concept de Ralph loop, si vous avez été a côté de l'IA dans la première moitié de janvier 2026, vous en avez entendu parler ! Si non, vous devriez aller voir la vidéo de Theo (ou quelqu'un d'autre mais celle-la est bonne !)

Vous savez probablement quel personnage de comics Ralph référence, mais Eric... ca pourrait être qui ?

Si vous avez pensé petit, gros et en colère, vous avez raison ! Je parle bien sûr d'Eric Cartman de South Park !

Alors que Ralph est naïf et innocent, Eric est calculateur et manipulateur. Pas quelque chose que je chercherais chez un humain, mais pour gérer un tas d'IA ? OUAIS DEFINITIVEMENT !

![Eric saw Ralph](/images/blog/blackhole/from_ralph_to_eric/Eric_saw_Ralph.webp)

## La boucle Eric

Une idée, même si elle est bonne, a toujours besoin de travail et d'allers-retours pour être implémentée. Donc on expose d'abord l'idée à l'IA pour avoir un Product Requirements Document (PRD) et on travaille dessus !

Comment ca, lire ? Et bhe oui, il faut d'abord lire ! et tout de suite mettre à jour les parties avec lesquelles vous n'êtes pas d'accord ou les choses qui doivent être plus approfondies !

Une fois que c'est fait, demandez aux modèles d'IA de vous poser des questions sur le PRD et donnez tout ça, le PRD et vos réponses, à une autre IA pour la mise à jour.

Rincez, Répétez, jusqu'à ce que vous soyez satisfait du document.

Vous pouvez même faire traiter le PRD par plusieurs modèles pour ensuite comparer et fusionner les résultats, en utilisant l'IA, bien sûr :D

C'est là qu'on commence à diverger de la boucle Ralph de base. Au lieu de juste passer ça à l'IA et espérer que les tâches seront bien implémentées, on fait pré-découper et formaliser les tâches et sous-tâches en une liste par une IA !

L'écart grandit encore plus car on sépare l'implémentation des tâches en plusieurs étapes avec :
* une phase de planification qui analyse les requis pour les tâches, le code existant, et fait les recherches nécessaires
* une phase d'exécution pour faire le travail réel
* une phase optionnelle de vérification automatisée (check types, build, tests, ...) avec feedback automatique vers la phase d'exécution en cas d'erreurs
* une phase de review des résultats, qui peut renvoyer vers la phase d'exécution pour plus de raffinement.

Une fois tout ça fait ? la boucle Eric continue pour la phase suivante du plan, tout comme Ralph !

## Mais, Pourquoi... ?

La séparation des préoccupations !

Oui les modèles sont devenus plus intelligents, mais si vous avez joué avec des sub-agents et des skills, vous savez que le prompting n'est pas mort (pour le moment...)

Avoir une séparation propre comme ça aide à avoir de meilleurs prompts pour chaque phase de l'exécution des tâches.

Comme effet secondaire, ça signifie que vous pouvez contrôler quel modèle est utilisé pour quelle phase, peut-être que vous n'avez pas besoin d'Opus tout le long si ça a fait un super plan !

## A quoi ça ressemblerait ?

On va créer un petit projet à partir d'une idée que j'ai, vous pouvez le faire aussi si vous voulez !

Il s'appelle Tiny-till, une petite app pour avoir une caisse simple pour marchands ambulants.

Mais on va avoir besoin d'un outil pour nous aider ...

### Task-o-matic

Ouais, j'ai déjà en gros fait l'outil en question :D ! [task-o-matic](https://task-o-matic.dev)

J'écrirai plus à ce sujet dans un futur post ! mais vous avez déjà pas mal de contenu à parcourir sur le site lui-même.

J'ai fait gaffe à générer plein de docs et quelques tutoriels pour que vous puissiez déjà essayer si vous voulez !

Mais en gros, ça aide à créer des PRDs, les raffiner, découper en tâches et sous-tâches et finalement connecter tout ça à votre outil de code assité d'IA préféré !

### Allons-y

Pour que l'IA opère proprement, on a besoin d'une stack spécifique, comme ça, on limite les hallucinations !

#### Initialisation et bootstrap

Task-o-matic utilise (https://better-t-stack.dev) en interne pour bootstrap la stack donc faisons ça !

```bash
npx task-o-matic@latest init init --project-name tiny-till \
  --frontend tanstack-router \
  --backend none \
  --package-manager bun && cd tiny-till
```

Boum, un monorepo pour Tiny-till ! Batteries incluses : tailwind, shadcn, script de build et tout :D

Pourquoi `init init` ? vous avez peut-être raté toute l'histoire de l'IA qui code des projets entiers, parfois... c'est pas esthétique, et vous devriez apprendre à pas trop y faire attention (c'est mon avis la-dessus... ou de la flemme...)

Vous aurez besoin d'un fichier .env pour configurer la stack IA.

```ini
AI_PROVIDER=openrouter

AI_MODEL=nvidia/nemotron-3-nano-30b-a3b:free

OPENROUTER_API_KEY=sk_123456azertPOIUY7890i58008
```

#### Documenter les requis de votre projet

Maintenant, on dit à l'IA ce qu'on veut faire, mais pourquoi se limiter à 1 ?

```bash
npx task-o-matic@latest prd create \
  --ai-reasoning 4096 \
  --stream \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096" \
  --ai "mistralai/devstral-2512:free:free" \
  --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096" \
  --ai "minimax/minimax-m2.1;reasoning=4096" \
  --ai "z-ai/glm-4.7;reasoning=4096" \
  --ai "google/gemini-3-flash-preview;reasoning=4096" \
  --combine-ai "z-ai/glm-4.7;reasoning=4096" \
  "i would like to build tiny-till,
  it will be a small web app, local first (for sparse internet connection) that serve as a very simple till for on the go seller, farmers markets stall, etc...
  the idea came from me watching my baker who does delivery tour twice a week. she is always fighting here calculator to make the tally and she gromle about it a lot
  the idea wwould be only a few screens :
  - product management (add/remove product, name+price (img optional) ) : a list with action buttons, + or edit happen inline (+ at the top)
  - a tally page : grid of product for fast and easy access (row of 2 or 3 for mobile, 4 to 6 on tablet, normal/compact variant, control by setting)
    - clicking on a product adds it to the count
    - number of this product added appear in the card, click on it trigger an input field to enter value with a remove button
  - a setting page : theme, display, import/export catalog
  No saving, it is purely done too calculate the price and is not meant for accounting purposes
  i am using tanstack-router and the project is already set up with tailwind css typescript and shadcnUI"
```

J'utilise des endpoints gratuits pour du "vrai" travail ? Oui, oui, je fais ! Est-ce que ça fausse ma vision de combien le travail IA devrait coûter ? ... pourquoi ça ferait ça ? Non, non, vous êtes juste en train de gâcher la fête là !

#### L'essence n'est pas la seule chose qui doit être raffinée !

Quelques minutes plus tard... je me suis récupéré ça (`cat .task-o-matic/prd/prd-master.md`)[/assets/blackhole/from-ralph-to-eric/prd-master.md] ça a pas vraiment besoin de plus de questions, mais voyons ce que Claude a a dire, d'accord ?

```bash
npx task-o-matic@latest prd question  --stream \
  --file .task-o-matic/prd/prd-master.md \
  --ai-model anthropic/claude-4.5-sonnet --ai-reasoning 1500
```

Bon, répondons à ça... certaines sont pertinentes ! je suppose que c'est pour ça qu'on sort les gros canons !

Répondons !

```bash
npx task-o-matic@latest prd refine  --stream\
  --file .task-o-matic/prd/prd-master.md \
  --ai-model anthropic/claude-4.5-sonnet --ai-reasoning 1500 \
  --output .task-o-matic/prd/prd-master-refined.md \
  --questions prd-questions.json
```

Les questions sont posées interactivement ;)

```markdown
"The PRD mentions using Zustand with persist middleware for the Catalog, but also specifies IndexedDB as the storage layer. Should Zustand's persist middleware be configured to use IndexedDB directly, or will there be a custom sync layer between Zustand and IndexedDB? This affects how image blobs are handled since Zustand persist middleware typically works best with serializable data."

oui, configurer le middleware persist de Zustand pour utiliser IndexedDB directement.
```

```markdown
"For the 'Tap Badge to manually enter quantity' feature, what should happen if a user enters invalid input (negative numbers, decimals, non-numeric characters, or zero)? Should zero be treated as 'remove from cart' or should it maintain the item with 0 quantity until explicitly removed?",

zéro doit être traité comme 'retirer du panier'.
```

```markdown
"The PRD states the tally is 'transient' and held in memory, yet also mentions using sessionStorage. Given that sessionStorage persists across page refreshes within the same tab, this conflicts with the 'privacy and simplicity' goal of resetting on refresh. Should the tally truly reset on refresh (pure memory), or should it survive accidental refreshes during a transaction (sessionStorage)?",

pas de persistance, c'est pas pour la comptabilité et ça doit être uniquement en mémoire, quand un nouveau tally commence, le précédent n'existe plus.
```

```markdown
"With TanStack Router's file-based routing, how should the navigation structure be organized? Specifically, should the Tally Page be the root route ('/'), and if users are on the Settings or Catalog management page when they refresh, should they be automatically redirected back to the Tally Page to prevent data loss confusion?",

oui, / est la page tally, oui rediriger vers la page tally.
```

```markdown
"The image upload feature is marked as 'optional' for products, but the PRD recommends 'no images for MVP' in the risk mitigation. Should image upload functionality be completely excluded from MVP (Phase 1-5), or should the data model and UI be built to accommodate images even if the upload feature is disabled/hidden initially?",

non, je veux les images, imposez juste une limitation de taille stricte, 128*128 px, c'est pas fait pour être une galerie d'images complète, juste une miniature pour l'affichage, amélioration future peut-être pour essayer de redimensionner/optimiser des images plus grosses directement sur l'appareil...mais pas en MVP !
```

```markdown
"For the Import/Export catalog feature, what should happen when importing a JSON file that contains product IDs that conflict with existing products? Should it merge (overwrite matching IDs), append (create duplicates), or prompt the user to choose? Also, should the import validate the JSON schema and handle corrupt/invalid files gracefully?",

écraser et oui, doit valider.
```

```markdown
"The 'Compact vs Normal' view toggle affects card size, but how should this interact with the responsive column count? For example, if a tablet user sets 6 columns in Normal view, should switching to Compact view automatically increase columns (e.g., to 8) to utilize the space savings, or should column count remain fixed per the user's explicit setting?",

oui, augmentation auto, c'est pour ça qu'on veut compact !
```

```markdown
"Given the Turborepo setup mentioned in the stack, is this application intended to be part of a monorepo with potential future packages (e.g., a companion admin dashboard, analytics service)? If so, should the data models and storage utilities be architected in a shared package from the start, or is this truly a standalone application for now?",

non, package unique pour l'instant, on verra après pour le reste. gardons ça simple pour l'instant.
```

Bon, cette petite astuce vient de me coûter un joli 15 cts, plus ou moins 10x plus que la première génération de PRD...

Je sais pas ce qui est le plus incroyable... que

* 1 appel coûte plus que les 10 précédents,
* je puisse me plaindre qu'un document de 2 jours de travail coûte 15 cents pour seulement quelques secondes de travail !
* un document qui vaut 2 de mes jours de travail coûte 15 cents à produire...en seulement quelques secondes...

J'ai pas encore décidé...bon bref, passons à la suite et restons pas bloqués !

#### Les petites retouches et c'est parti

Quand j'ai dit secondes, j'ai menti, j'ai passé 5 minutes à éditer le fichier. pour fixer les versions de lib, marquer le travail d'install et de config comme fait, et, enfin, définir les attentes pour le design.

la dernière chose qu'on a a faire, c'est demander à une IA de découper en tâches principales.

encore une fois, je vais pas en faire qu'une seule, mais cette fois, je vais demander à Claude d'être le créateur de tâches final, à partir des entrées des autres !

```bash
npx task-o-matic@latest prd parse  --ai-reasoning 4096 --stream \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096"\
  --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096" \
  --ai "z-ai/glm-4.7;reasoning=4096" \
  --combine-ai "anthropic/claude-4.5-sonnet;reasoning=4096"
```

Et voila encore 8.2 cents brûlés en offrandes aux dieux du token, mais en retour, on a un découpage détaillé des tâches requises pour finir le projet !

On a encore à découper ces tâches par contre... Pour les rendre plus digérables, même pour les meilleurs modèles IA à l'heure actuelle !

Ca serait une bonne idée de revoir les tâches en détail avant de les découper, pas faire du vibe-planning comme un neuneu ! (devinez ce que j'ai fait ^^)

```bash
npx task-o-matic@latest tasks split  --all --stream \
  --reasoning 4096 \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096"\
  --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096" \
  --ai "z-ai/glm-4.7;reasoning=4096" \
  --combine-ai "anthropic/claude-4.5-sonnet;reasoning=4096"
```

Je pense pas que Claude soit nécessaire là, mais j'avais mes $3 de crédit openrouter à brûler avant la fin du mois donc bon... on sort l'artillerie lourde !

Et bim, 30 centimes de plus ! mais maintenant... on est vraiment prêts ! Presque...

#### AGENTS.md

Ou CLAUDE, ou GEMINI, dépend de votre outil de code assité préféré, Pour moi, c'est opencode je vais lancer le prompt /init dans opencode !

```bash
opencode run "/init"
```

c'est pas vraiment obligatoire, mais c'est quand meme une bonne histoire d'eviter les plus grosse conneries et de recentrer quelques comportements pour certaines choses, du coup, on rajoute ca :

* Pas lancer le server de dev
* pas démarrer de processus en arrière-plan/de longue durée
* pas utiliser `:any`, `as any` ou `any` comme type, je veux une base de code typesafe
* avant de dire "Jai finiiiii", `bun run check-types` et `bun run build` doivent tous les deux réussir
* corriger les erreurs LSP quand elles arrivent
* utiliser les composants shadcn autant que possible
* rester DRY et préférer créer des composants personnalisés et des utilitaires que répéter du code
* utiliser les compétences adaptées quand c'est possible (la compétence frontend-design est obligatoire quand on travaille sur le frontend)
* que c'est un projet d'app statique qui sera hébergé sur github pages
* utiliser Context7 MCP au cas où plus de documentation ou une documentation à jour est nécessaire (car la connaissance est certainement en retard à cause de la date limite de training)

```bash
opencode run "Add the following to the AGENTS.md, remove any conflicting instructions you created, these take precedence :
* Not to run the dev server
* not start background/long running processes
* not to use `:any`, `as any` or `any` as type, I want a typesafe codebase
* before claiming success, `bun run check-types` and `bun run build` must both succeed
* to fix LSP error when they happen
* use shadcn component has much as possible
* stay DRY and prefer creating custom components and utilities than repeat code
* use adapted skills when possible (frontend-design skill is mandatory when working on the frontend)
* that it is a static app project that will be hosted on github pages
* to use Context7 MCP in case more documentation or up to date documentation is needed (as the knowledge is certainly behind because of cutoff training date)" -c
```

J'ajouterai peut-être plus pendant que l'agent travaille si je vois des erreurs récurrentes et des gourdineries qui arrivent trop souvent (... si je regarde passer le train... c'est pas dit XD)

#### Et maintenant, on fait rouler Eric...

Bon les gars, cachez vos parents car on va laisser Eric y aller !

Parce que je suis El CheapoDev DelBrokeCasa, je vais utiliser mon GLM coding plan pour coder, comme ça, je vais pas eclater ma tirelire et c'est assez intelligent pour un truc comme ça je pense !

Si vous préférez claude code, utilisez l'option `--tool claude`. (ou codex/gemini/kilo) mais opencode est plus sympa car il stream le contenu (en partie en tout cas) donc vous voyez ce qui se passe (meuuuuh !) !

```bash
npx task-o-matic@latest tasks execute-loop --include-prd \
  --plan --plan-model zai-coding-plan/glm-4.7 \
  --review --review-model zai-coding-plan/glm-4.7 \
  --model zai-coding-plan/glm-4.7 \
  --validate "npm run check-types && npm run build"
```

Et maintenant, vous attendez, un café, un gouter, un peu plus de café, le dîner et pis le p'tit déj probablement, ça va prendre un moment ^^

### Résultat

Une demi-journée plus tard, Eric a terminé la tâche avec succès. youhou \o/

`npm run dev`, navigateur vers http://localhost:3001 et eeeet, ça marche pas.... XD

J'ai une super page d'erreur qui me parle d'une sorte de "exceeded depth error blablabla"... Zustand... je déteste PUTAIN Zustand !

J'aurais pu aller ouvrir le projet, lire quelques-unes des 35970 lignes de... **35970 LIGNES DE CODE** ??? Naaah, mec, pas question que je songe même à ça !

Bien sûr, j'ai demandé à GLM de corriger cette utilisation terriblement évidente de Zustand, et j'ai même dû passer quelques minutes à hurler sur une redirection vers le problème /... J'avais l'impression d'être un homme des cavernes quand même !

Je veux dire, devoir ouvrir un outil ? Pour faire... **du travail** ?? Nan mais Allo quoi, c'est 2022 ou quoi ?

J'ai rien testé encore, donc je suis à peu près sûr qu'il y aura quelques autres problèmes, mais le serveur de dev tourne, je peux naviguer dans l'app sans erreur (même en console) donc c'est pas mal du tout !

Je ferai peut-être un autre article plus tard, pour vous tenir au courant de ce que j'ai eu à faire pour rapprocher un peu plus de l'idée originale (si nécessaire ^^)

## Vous en pensez quoi ? On va où après ?

Donc c'est la fin (de cet article) ! Vous en pensez quoi ? vous avez essayé une technique similaire ? C'est quoi le plan après, parce que bon...

Si vous êtes intéressés, le repo peut être trouvé sur [github](https://github.com/DimitriGilbert/tiny-till). Le code est génial ?

Et pour [task-o-matic](https://task-o-matic.dev), le [repo est sur github](https://github.com/DimitriGilbert/task-o-matic) donc n'hésitez pas à faire un tour ;)

Et pour la "Boucle Eric", comment faire vous-même ? Yaka demander à l'IA :D vous pouvez lui demander d'écrire du code ! Donc un petit

```markdown
tu pourrais créer un script bash qui exécuterait la "Boucle Eric" avec des options personnalisées ?

en me laissant spécifier le projet, quel modèle utiliser et quand, je veux tout pouvoir configurer via des options !

utilise la commande --help de task-o-matic si t'as besoin de doc !
```

[voici le résultat](/assets/blackhole/from_ralph_to_eric/eric_loop.sh), votre Eric Loop a vous, elle est pas belle la vie ?!

Hope you enjoyed, I'll see you around
