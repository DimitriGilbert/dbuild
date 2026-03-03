---
title: "Les Skills sont le DRY du prompt engineering, tu devrais les utiliser et créer les tiennes"
date: 2026-03-03T14:59:00+01:00
tags:
  - ai
  - skills
summary: Comme j'avais l'habitude de créer mes propres bibliothèques et helpers que je réutilisais dans la plupart de mes projets, je crée maintenant des skills pour ne pas réécrire les mêmes prompts encore et encore
slug: "index"
og-image: public/images/blog/projects/ai-skills/dry_of_prompting/ai-skills-cover_og.webp
---

## Les Skills IA

T'as déjà tapé le même prompt encore et encore, rappelé à ton IA comment fonctionne une bibliothèque ENCORE UNE FOIS ou décrit un workflow pour la trouzième fois ?

Et si je te disais qu'il y a une meilleure façon ! Et non, c'est pas du copier-coller... enfin... presque pas.

![skills fighting](/images/blog/projects/ai-skills/dry_of_prompting/ai-skills-cover.webp)

### Ce que c'est

Dans le fond, les skills sont juste un fichier markdown que tu donnes à l'agent IA quand tu as besoin qu'elle suive les instructions décrites à l'interieur.

C'est tout, like comment and subscribe, bye !

Ok ok, y'a peut-être plus que ça, ça peut venir avec d'autres fichiers markdown et même des scripts ! Mais je te le promets, ce coup ci, c'est tout !

Et je t'entend déjà dire "bouarf, comment un fichier markdown pourrait faire autant de différence" et bien dis toi que j'était pareil, mais putain que j'avais tort !

Si tu veux une démo pas chère, tu peux essayer la skill frontend-design d'Anthropic, avec un modèle comme GLM 4.7 ou minimax 2.5 : demande une page web sans et avec la skill chargé et tu verras de quoi je parle !

Mais avant de s'emerveiller, on va commencer par se procurer des skills !

### apt install skillz

Quand j'ai vu Matrix la première fois, je me suis dis **"JE VEUX ÇA !!"** quand j'ai entendu "I know Kung-fu" et les skills sont ce qui s'en rapproche le plus à ce jour !

Comme dans le film, rien de glamour dans le process ici `npx skills add <github repo shorthand/repo url/local folder>`, un peu de CLI interactif et c'est réglé.

Avant que tu reagisses en disant "Et je les trouve où ces...'Skills' ?" va jeter un oeil sur [skills.sh](https://skills.sh), c'est le hub principal pour ça.

C'est fait par Vercel, donc ça va pas disparaître demain et ça utilise la télémétrie de la commande `npx skills` pour tracker les skills installés par les utilisateurs donc la liste est **TRÈS** complète... (y'a meme les miennes, c'est pour te dire !)

Bon, et si tu trouves pas ce que tu cherches là, tu peux toujours partir à la chasse sur github (ou n'importe quel autre provider git) pour les fichiers SKILLS.md, y'en a des pelles !

### ATTENTION

Je ne peux pas en faire assez pour insister, et c'est pour ça que cette section est avant celle sur l'utilisation !

LIS LE FICHIER DE SKILL ! Le fais pas à l'arrache comme un benet ! Les skills sont un chemin direct vers ton assistant IA, et comme les packages et modules d'avant, tu devrais être conscient de ce que t'installes et des instructions qu'il s'y trouve.

L'injection de prompt est une vraie menace qui peut mener à de l'exfiltration de données et d'autres activités malveillantes, alors encore une fois **LIS LE FICHIER DE SKILL !** ou tu reviendras pleurer que tes clés API sont dans la nature ou que ton portefeuille bitcoin est vide !

### Je utilise skill

Après cette petite piqure de rappel, il est temps d'utiliser lesdits skills... cette section va être super rapide, t'es prêt ?

`Charge la skill <nom de ta skill>.`

Dis ça à ton agent, dans n'importe quel harness de code IA décent et hop, vertig, finito, c'est réglé.

Je sais, c'était la partie la plus dure jusqu'ici, mais fallait bien la faire.

Blague à part, dis juste à ton agent de charger la skill naturellement et continue à prompter comme tu le ferais sinon, c'est tout !

Certains harness ont des commandes `/` pour charger les skills, mais je change de harness constamment et je vois pas trop l'intérêt.

Les LLMs traitent le langage naturel très bien... comme se elles étaient faites pour ça :D

### Crée les tiennes

C'est là que ça devient plus intéressant ! Utiliser les trucs des autres c'est sympa, mais si t'as lu quelques-uns de mes posts ici, tu sais que j'aime avoir mes propres roues.

Et dans ce cas, tu peux très facilement avoir les tiennes aussi !

Pour commencer, tu vas avoir besoin de [skill-creator](https://skills.sh/anthropics/skills/skill-creator) d'Anthropic eux-mêmes :

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

ensuite, tu dois décider à quel point ton agent doit être minutieux pour créer la skill ! Mais considérant que tu vas probablement l'utiliser pas mal de fois, tu devrais pousser l'IA à faire le travail le plus minutieux possible !

Tu auras peut-être besoin de quelque chose comme [Context7](https://context7.com/) ou [btca](https://btca.dev/) (ou n'importe quel autre outil de récupération de documentation) pour t'assurer que ton assistant peut accéder aux dernières docs et produire de la documentation à jour si c'est pas pour du code à toi !

Moi je fais généralement comme ça :

```markdown
Je veux créer une skill IA pour [nom de la bibliothèque]
Charge ta skill skill-creator.
Utilise des subagents pour faire la recherche et fais-leur sauvegarder leurs découvertes dans [chemin/vers/recherche]
Ils utiliseront Context7 et la recherche web pour rassembler la dernière documentation, les tutoriels récents et les articles pour créer un document de recherche complet et ils pourraient demander que tu dispatches d'autres agents pour obtenir plus d'informations sur des points spécifiques non explorés.
Une fois la phase de recherche terminée, tu liras les documents de recherche et créeras les fichiers requis pour créer la skill.
Rappelle-toi que tu dois suivre la skill skill-creator pour la rendre à la fois précise et efficace !
Si ça ne tient pas dans un seul skill, tu voudras peut-être diviser les choses en plusieurs skills, elles peuvent se référencer entre elles si nécessaire.
```

Après quelques dizaines de minutes et un gros paquet de tokens brûlés, j'obtiens généralement un point de départ correct ! C'est souvent loin d'être parfait par contre, et la meilleure façon de tester ça c'est de la lire (**LIS LE FICHIER DE SKILL !**) et de l'essayer.

C'est pour ça que je dis à l'IA de garder le contenu de la recherche, pour que je puisse pointer du contenu défectueux/manquant et lui dire d'améliorer tout ca.

Parfois, plus de recherche est nécessaire, donc je répète une version du premier prompt pour les obtenir et faire améliorer le(s) skill(s) par l'IA.

C'est un peu plus facile quand tu possèdes le code, tu peux juste demander à l'agent d'explorer réellement le code et de rassembler les informations nécessaires, et normalement, tu sais déjà à quoi t'attendre !

Tu peux même créer ca... à la main, comme un homme des cavernes, si tu fais pas confiance à un grille-pain pour le faire... tu peux.

## Mes skills

Au cours des derniers mois, j'ai soit ajouté des skills à des projets existants soit créé de nouveaux from scratch pour des besoins spécifiques.

Ceux des projets sont évidents, ils sont là pour t'aider à utiliser ces trucs avec l'IA ! J'en ai ajouté à [Formedible](https://github.com/DimitriGilbert/formedible), [parseArger](https://github.com/DimitriGilbert/parseArger) et [task-o-matic](https://github.com/DimitriGilbert/task-o-matic) jusqu'à présent.

Rien de fou-fou ici, juste de l'information packagée depuis la documentation et le readme dans un format standardisé pour les grille-pains.

C'est pas qu'elles ne sont pas utiles, mais il n'y a pas grand-chose qui s'y passe à part la doc !

J'ai aussi créé un petit paquet pour des bibliothèques/outils que j'utilise assez souvent : convex, opencode, opentui, openrouter, better-t-stack et trpc... mais pareil ici, rien de folichon !

Non, ceux dont je voudrais parler sont...

### The Council

Tu sais pas quelle décision prendre ? Et bien, c'est là que le council entre en jeu !

Il utilise des subagents pour rassembler des données et émettre des opinions avant de te les présenter.

Ca gloutonne du tokens comme une equipe de rugby a un buffet a volonté, mais c'est un bon partenaire quand t'es indécis sur quelque chose.

[sur skills.sh](https://skills.sh/dimitrigilbert/ai-skills/the-council) et [github](https://github.com/dimitrigilbert/ai-skills)

### not-ai-writer

Si t'es pas ennuyé par la nature répétitive du contenu généré par l'IA ni dégoûté par la présence tiret cadratin (tin tin tin, et oui, en francais dans le texte, on appel ca tiret cadratin et pas em-dash, prend ca l'academie Française) dans l'AI slop que tu sors, les gens qui consomment cette soupe le seront peut-être !

Not-ai-writer est là pour toi ! Pas de tiret cadratin (tin tin tin), pas de "si pas ça alors/ni ça", pas de mots niant niant que personne n'utilise et pas de putain d'Emojis !

Ça sera encore de la soupe, mais ça y ressemblera moins :D

[sur skills.sh](https://skills.sh/dimitrigilbert/ai-skills/not-ai-writer) et [github](https://github.com/dimitrigilbert/ai-skills)

### subagent-orchestration

C'est celui dont je veux vraiment parler !

J'ai passé un mois et demi à travailler sur [task-o-matic](https://task-o-matic.dev), c'était censé aider ton projet à aller de l'idée au MVP de façon ordonnée, créant un PRD, des tâches + sous-tâches et les exécutant automatiquement.

J'en suis assez fier ! Ça fonctionne bien, c'est assez facile à utiliser et j'aime le site que j'ai fait pour !

C'est aussi complètement inutile maintenant, remplacé par ce skill... Un simple fichier markdown et ton projet go brrrrrrrrr, ca, plus que quelques dizaines de **milliers** de lignes de code, 

Donc apparemment, la meilleure pièce c'est vraiment pas de pièce...

Au lieu de créer des dizaines de conversations les unes après les autres, ou de laisser l'agent tourner et compacter jusqu'à ce qu'il ait fini, ce skill transforme ton agent principal en chef de projet !

Quand j'ai une idée que je veux réaliser (ou un paquet d'entre elles), je détaille ca à l'IA, je lui dis de charger la skill et je fais ça :

```markdown
[détails de l'idée]
Charge ta skill subagent-orchestration.
Dispatche un subagent d'exploration et de planification qui DOIT CHARGER la skill subagent-orchestration lui-même pour créer un plan complet pour ce travail.
Fais-le sauvegarder dans un fichier pour que je puisse le revoir avant que le vrai travail commence.
Rappelle-toi, tu es l'orchestrateur, tu gardes le contexte propre, tu ne lis ni n'écris de code, tu dispatches des agents pour faire le travail.
```

J'ai généralement quelques allers-retours avec l'IA, lui demandant toujours de dispatcher des agents pour faire le travail, avant que le plan me convienne et ensuite...

```markdown
Lis le fichier de plan et exécute-le en suivant les instructions de la skill subagent-orchestration.
Implementor => reviewer => fixer (si nécessaire) => tâche suivante
Rappelle-toi, tu es l'orchestrateur, tu gardes le contexte propre, tu ne lis ni n'écris de code, tu dispatches des agents pour faire le travail.
```

Fais gaffe, ça defonce les rate limits de la plupart des plans de code IA très très TRES vite, mais c'est magique !

À moins que tu partes de 0 et que tu veuille tout, tu ne devrais pas avoir de compaction qui se produit, c'est vraiment rapide car il essaie d'exécuter les tâches en parallèle si possible, chaque phase est vérifiée par son propre agent pour éviter la flemme et les raccourcis (très utile avec GLM 4.7 par exemple !)

Au final, je suis vraiment content de ça et je pense que tu devrais essayer, juste pour voir ce que ça fait ;)

[sur skills.sh](https://skills.sh/dimitrigilbert/ai-skills/subagent-orchestration) et [github](https://github.com/dimitrigilbert/ai-skills)

## skill issues

Je vais réitérer, ENCORE, et faire mon disque rayé mais **LIS LE FICHIER DE SKILL !** (bordel !)

D'abord, c'est bon pour la sécurité ! On a pas passé des décennies à cultiver les bonnes pratiques et les "NON NON" sur la qualité du code, la maintenabilité et la sécurité pour tout bazarder par la fenêtre pour économiser 5 minutes de lecture.

Mais ça a aussi du sens si tu veux savoir comment utiliser ladite skill efficacement.

Une chose que j'ai remarquée avec les modèles Claude par exemple, c'est que si tu donnes des instructions qui vont à l'encontre de celles de la skill, le modèle va se comporter de façon erratique, ignorer les directives ou en inventer de nouvelles.

C'est aussi tentant de faire des MegaSkills qui font tout mais tu finis avec plus de chances de directives contradictoires avec le "bonus" ajouté du surplus de contexte, donc c'est mieux de diviser les choses en skills plus petites et plus focalisées. Ton agent est pas limité à une seule skill de toute façon, tu peux toujours lui demander d'en charger plusieur !

## Processus continu

Dans les mois à venir, je vais probablement continuer à ajouter et affiner plus de skills et je pense que tu devrais faire pareil.

"Don't Repeat Yourself" c'est une bonne pratique quand tu écris du code, et c'est aussi une bonne pratique quand tu écris des prompts !

Ça ne va pas résoudre tous les problèmes qu'on rencontre avec l'IA mais c'est une bonne façon de gérer et partager ce que tu apprends en promptant.

BTW, mon repo github est opensource donc si tu utilises mes skills et que tu rencontres des problèmes, hésite pas à ouvrir une issue ou à soumettre une PR !
