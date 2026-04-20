---
title: "37K LoC ou rien"
date: 2026-04-21T00:01:00+01:00
tags: [
  "AI",
  "Clanker"
]
summary: "qu'est-ce qui rendrait 37K LoC par jour acceptable ? Garry Tan est-il un delire ? et les grincheux dans tout ca ?"
slug: "37KLOC-ou-rien"
draft: true
# og-image: "/images/blog/blackhole/from_ralph_to_eric/Eric_saw_Ralph.webp"
---

Ouais je sais, les Lignes de Code c'est une mesure debile de la productivite d'un dev mais on l'a tous fait ! C'est facile, c'est simple et on a tous une idée de ce que ca veut dire.

Garry Tan s'est fait un peu charcuter quand il a sorti ce chiffre, du 100x-anti-IA-super-ingé au vibe coder extraordinnaire, tout le monde et sa grand-mère avait quelque chose à dire dessus

La plupart du temps, c'était debile

Je pense que Garry à été un peu vite en besogne, a crier ca sur les toits alors que clairement, ce qu'il avait créé c'était au mieux des MVPs, un ou deux cycles de review/fix en plus lui auraient fait que du bien, a lui et ses projets

D'un autre cote, les genies qui balayent ce qui a ete crée parce que IA = SLOP ont clairement pas utilisé les outils recents

et ceux qui disent "t'as pas besoin d'autant de LoC" ont oublié que le kernel linux en a environ 40M, de lignes de code

Pourquoi j'en parle ?

Beh, il se trouve que moi aussi je peux sortir 37K LoC par jour de mes agents (en vrai, 45K, mais a ce stade personne compte)

Dans des conditions bien precises, hein ! Si je lance plusieurs nouveaux projets, avec des specs claires et des plans, j'y arrive sans problème

Ensuite vient le vrai piege : la review et les corrections, ca genere a peu pres 0 LoC supplementaire pendant quelques jours !

Comment je sais ca ? J'ai bossé sur quelques idées de projets recemment, 2 étaient a moi et une 3eme était un projet potentiel pour un client !

C'est la que j'ai realise qu'apres un an de boulot intensif avec l'IA, j'avais un workflow qui marchait bien, par contre il y a un probleme majeur

C'est fastidieux, genre VRAIMENT fastidieux. J'utilise grosso modo les memes prompts dans le meme ordre avec les memes skills et la plupart du temps qui passe apres la partie conception, c'est du temps d'attente avant le prochain prompt

Donc, moi etant moi, tu vois ce que ca veut dire... non ?

## Clanker : c'est un CLI, c'est un parser, c'est une spec

Yep-yep, un nouvel outil ! mais pour quoi ?

Beh, je veux standardiser ce que j'ai appris cette derniere année pour rendre les choses reproductibles sans avoir a gérer des chats et reprompter la meme chose encore et toujours !

Ca, plus le fait que n+1 est le nombre le plus parfait de motos, de guitares, de projets en cours, de harness agentique et de manager de workflow !

C'est donc tout naturellement que j'essaye de faire mon propre bousin... (genre, ce mec n'apprend vraiment Rien...)

Donc c'est quoi ?

Premierement, Clanker c'est une "spec" plus que tout. J'avais pas envie de reproduire l'aventure task-o-matic tout de suite et passer encore un ou 2 mois a construire un truc qui sera obsolete a la sortie du prochain modele

Ce que je veux la, c'est quelque chose que tu peux facilement t'approprier et qui est pas strictement dedié au code comme [task-o-matic.dev](https://task-o-matic.dev) l'était

En plus, de nos jours, une bonne spec est a seulement quelques millions de tokens d'une implementation

Et meme si je suis à peu près sur qu'a un moment ca pourrait devenir un skill, on en est pas encore la

il y a encore trop de variabilite dans les sorties des LLMs et une certaine forme de contrainte pour dompter la nature probabiliste de ces betes semble etre la meilleure approche pour le moment.

c'est pour ca que j'ai crée un simple parser et un CLI en typescript ! C'est pas la solution ultime du projet mais je vais m'en servir comme base pour construire par dessus !

## Mais... Pourquoi ?

Oui, oui... openclaw et hermes font a peu pres ca, arrete de hurler, je t'entends !

Mais, tu sais quoi ? J'suis pas fan du paradigme !

Comme je l'ai dit dans mon [article precedent](/blog/black-hole-un-an-de-retour-dans-le-game/), je voulais quelque chose de portable qui pourrait tourner a peu pres partout ou j'en ai besoin, sans une grosse tartine de configuration (y compris dans ces frameworks agentiques !)

Je voulais aussi que les choses soient composables sans avoir a compter sur le modele pour decider quel outil utiliser ou quoi faire pendant qu'il bosse.

Ca veut dire que je peux créer des workflows programmatiquement ou demander a une IA de le faire sans lacher completement les rennes !

Bien sur, je pourrais aussi coder ca en utilisant n'importe quel framework du marché (langchain ou mastra ou peu importe) mais ca serait pas très normie-friendly (genre... du code...) et ce serait pas facile a GUI-ifier, si jamais j'en avais envie.

Donc, un petit schema de spec en YAML/json fera l'affaire pour commencer vu que c'est facilement composable, les modeles d'aujourd'hui peuvent créer ca et respecter une spec assez scrupuleusement et un simple CRUD UI ferait le taf pour gérer/composer tout ca

Un benefice c'est que tous les langages "qui valent le coup d'être programmés" supportent yaml et json donc ca serait facile a implementer dans n'importe lequel d'entre eux !

## A quoi ca ressemblerait

Le "pourquoi" etant reglé, on doit maintenant definir quelle forme les choses vont prendre !

Bien sur, pour un workflow, on a les classiques `name` et `version` plus une liste de `steps`

Une step c'est... beh, c'est une etape dans le workflow !

Donc `name` et `description` c'est du beton, mais on a aussi besoin d'un `model` et d'un `prompt` pour pouvoir lancer la step, mais ca suffit pas !

On doit pouvoir lancer des commandes/fonctions/... avant et apres l'execution de la step, donc on aura des `hooks` pour ca et pour etre sur que l'IA nous pond pas de la bouillie, on aura aussi un systeme de `qa` qui sont juste des hooks avec des comportements integres (auto retry, escalation de modele, Human In the Loop)

Et pour finir, pour profiter de la stack IA moderne, une step accepte aussi une liste de `skills` et un chemin vers un fichier `agent`.

Oui, il me manque quelques bricoles dont je parlerai pas ici, mais t'as l'idée generale !

Chaque step est executé en utilisant un modele pour lancer le prompt avec des commandes qui tournent avant et apres (si besoin), donc, comme j'ai dit, rien de fancy ou de compliqué.

## Je veux mes 37K LoC, MAINTENANT

Pas de souci, concevons un workflow qui ferait ca ! ([fichier workflow](https://github.com/DimitriGilbert/Clanker/blob/main/new-project.yml))

Pour commencer, il te faudra une idée, ou au moins le concept, ca je peux pas t'aider, desolé !

Une fois que t'as ca, tu dois definir les requis et [@mattpocockuk](https://x.com/mattpocockuk) a juste ce qu'il te faut, [write-a-prd](https://skills.sh/mattpocock/skills/write-a-prd)

Donc la premiere etape de ce workflow serait de recuperer un Product Requirement Document a partir de ton idée, le skill fait en sorte que le modele te pose des questions et t'aide a definir ce que tu veux sortir de ton idée.

C'est le moment de bootstrapper le projet, laisse pas l'IA mettre en place les choses "manuellement", ce serait du gachis de tokens ! Pour eviter ca, on utilisera [better-t-stack](https://better-t-stack.dev) et on laissera un modele d'IA choisir les differents composants de la stack dans cette etape

Selon ton choix de stack, tu auras peut-etre un peu de config a finir et un server de dev a lancer

Maintenant equipé de ce projet bootstrappé et d'un PRD, tu dois t'assurer que tes idées sur ce que tu veux faire sont tres claires, encore une fois, Mr Pocock vole a ton secours avec sa skill [grill-me](https://skills.sh/mattpocock/skills/grill-me).

Prepares-toi a une belle session de rotissage avec plein de questions sur le prd et le projet, plein, Plein, PLEIN de questions, mais plus cette partie est bonne, meilleur sera le resultat !

Ca te donnera un document PRD mis a jour qui sera utilisé dans la prochaine etape, la planification ! Pour avoir une execution efficace par la suite.

On utilisera [ma skill subagent-orchestration](https://skills.sh/dimitriGilbert/ai-skills/subagent-orchestration) pour decouper l'execution pour que chaque partie tienne confortablement dans un subagent. Et pour etre propre des le depart, on utilisera aussi le skill [tdd](https://skills.sh/mattpocock/skills/tdd) de... Matt Pocock (oui, encore lui ^^)

Ca nous aidera a eviter la compaction et possiblement rendre l'execution plus rapide vu que certaines parties pourraient tourner en parallèle. Cette etape est aussi tres importante et c'est la derniere ou tes inputs seront requis, donc glande pas et sors le meilleur plan possible de ton LLM

A partir d'ici, t'es maintenant un obstacle lent pour ton agent, on utilisera le skill [subagent-orchestration](https://skills.sh/dimitriGilbert/ai-skills/subagent-orchestration) et [tdd](https://skills.sh/mattpocock/skills/tdd) a nouveau pour faire l'execution et committer entre chaque phase.

Ce skill force une review du code crée apres chaque sous-phase et impose les corrections avant de continuer, donc la majeure partie de la bouillie serait déjà prise en charge...

Mais pour en etre sur, on a besoin d'une review complete du projet ! C'est la qu'intervient ma skill [deep-agent-review](https://skills.sh/dimitriGilbert/ai-skills/deep-agent-review)

Un agent analysera la codebase en large avant de dispatcher des subagents vers les parties ciblées de ton app pour la review, et une fois que c'est fait, un autre lot d'agents est dispatché pour verifier la validite des constats du premier lot

T'as l'impression que c'est overkill ? oui ! C'est overkill ? Non !

Ca aide a eliminer les faux positifs et parfois a deterrer quelques problemes supplementaires ! ce que tu recuperes a la fin c'est un ensemble de fichiers yaml contenant tous les problemes decouverts, ce dont t'as besoin maintenant c'est un plan pour tout corriger !

Tu sais ce qu'on utilise pour avoir un super plan d'orchestration pour rafistoller notre bazare ? si t'as dit le meme skill subagent-orchestration qu'avant, t'as gagné un point ! donc c'est naturellement la prochaine etape

Et oui, l'etape suivante c'est encore un run d'execution subagent-orchestration, dingue... non ?

Et maintenant... beh, maintenant c'est la que tu reviens et tu t'assures que les choses tournent correctement, pour moi ca prend en general un peu moins d'une heure pour que tout tourne bien vu qu'il y a toujours des bricoles qui sont pas parfaites

Je suis a peu pres sur que cette derniere partie pourrait etre, au moins en partie, automatisée en utilisant agent-browser ou playwright, mais j'ai pas assez d'experience avec ces outils pour affirmer que ca le fera donc... je l'inclurai pas dans le fichier workflow !

Je suis peut-etre biaisé, mais, ca semble etre une facon assez acceptable de recuperer mes 37K LoC en une journee, t'es pas d'accord ?

Pour recuperer le vrai fichier [workflow clanker](https://github.com/DimitriGilbert/Clanker/blob/main/new-project.yml), j'ai juste colle toute cette partie dans opencode et demande le fichier apres lui avoir donné la spec !

## Comment j'en suis arrive la, et c'est quoi la suite ?

assez simplement en fait, [ca c'est la premiere conversation claude](https://claude.ai/share/4f5b55d2-0b26-470a-a510-327c1d8a91c2) pour affiner l'idée, et ensuite j'ai saute dans opencode en utilisant GLM 5.1 et j'ai travaillé le PRD

C'est loin d'etre parfait et il y a un tas de trucs dans la spec et l'implementation que j'aime pas forcement, mais c'est plus une spec et une implementation qui evolue au fil de l'eau pour l'instant vu que je l'ai pas encore vraiment utilisé correctement

Les choses semblent assez generiques pour gérer une bonne variete de taches (pas juste du code), qui suivent un flux defini mais necessitent des adaptations selon le contexte.

Je pense pas que le markdown est le nouveau python, surtout en ce moment, quand on traverse une penurie de RAM et de Compute, de hausses de prix des tokens ou encore des modeles castré (Opus 4.6). Ca pourrait devenir vrai un jour, mais pas aujourd'hui ni demain.

Pour le moment, on doit encore s'appuyer lourdement sur de l'execution de code non probabiliste pour contraindre les LLMs a un bon comportement, en permettant la pose de garde fou et en laissant l'humain aux commandes de certaines parties

Bon, maintenant, c'est quoi le plan pour la suite ? Beh, c'est la que tu rentres jeu ! Je suis assez sur que ca couvrirait la plupart de mes usage, mais toi, ca te convient ?

Qu'est-ce qui te manquerait pour automatiser tes workflows IA ? Et je parle pas de verification ou de scripts de bootstrapping, mais des fonctionnalites core de la spec ?

J'ai intentionnellement exclu toute forme de memoire et de persistance parce que je pense que ca a rien a voir avec la spec, les workflows qui necessitent plusieurs runs devraient avoir des fichiers agent ou des skills dediés et je vois pas a quoi servirait une memoire inter-workflow... Mais peut-etre que j'ai tort ? T'en penses quoi ?

Pour l'instant, et comme j'ai tres subtilement laisse entendre, je vais construire une forme d'UI pour gérer ces workflows et j'ai peut-etre une idée pour integrer ca dans un meta-harness prometteur

Je vais faire du dogfooding et utiliser des fichiers workflow pour faire ca, attends-toi a un rapport sur le process et l'avancement de l'UI dans un prochain article
