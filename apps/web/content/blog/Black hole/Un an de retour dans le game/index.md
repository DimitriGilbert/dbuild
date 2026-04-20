---
title: "Un an de retour dans le game"
date: 2026-04-14T00:00:59+01:00
tags: [
  "AI",
  "work",
  "multiple sclerosis",
  "Clanker"
]
summary: "Après 8 ans à me faire ballader par ma maladie, l'IA m'a aidé à retourner bosser, ça fait un an, alors qu'est-ce que j'ai appris"
slug: "index"
# og-image: "/images/blog/blackhole/from_ralph_to_eric/Eric_saw_Ralph.webp"
---

Voilà quelques-unes des leçons que j'ai apprises d'un an de code avec l'IA, mais avant, un peu de contexte.

En 2017, j'ai démissionné de mon boulot à Singapour parce que j'ai fait un burn-out, un gros. Je vis avec l'AAH depuis 2020 car on m'a diagnostiqué une sclérose en plaques (apparemment, le burn-out a eu un coup de main ^^').

Pour mettre les choses à plat direct, oui, j'ai beaucoup de chance de vivre en France et de pouvoir recevoir cette allocation, je serais probablement mort sinon.

Et si tu penses que la SEP c'est pas suffisant pour prétendre à l'AAH, on échange nos places pendant un mois et on re-discute après, hein ! :)

Pendant tout ce temps-là, j'ai continué à apprendre et essayer des nouveaux trucs, j'ai aussi filé un coup de main à quelques potes pour des projets à eux en passant, mais, rien de sérieux.

J'ai sauté sur la bêta de Copilot et j'ai rapidement goûté à Cursor, mais encore une fois, surtout dilettante pour m'amuser.

Mais il y a un an (et un mois), excité par la quantité de boulot que je pouvais sortir avec l'IA même les mauvais jours, j'ai décidé que je voulais plus me laisser traîner par mon système immunitaire et que j'allais retourner au turbin !

Ça a été fastidieux et chaotique, mais, voici un récap de ce que j'ai fait et de ce que j'ai appris cette dernière année.

## LiteChat : apprendre en construisant, avec le mauvais outil

Cursor et Sonnet 3.5... c'est ce qui a tout déclenché pour moi, ça (sous une forme ou une autre) c'était le futur ! Le problème, c'est que ça ressemblait à de la magie et j'aimais pas ce côté-là...

Et si je construisais un chat pour comprendre comment ça marche ?

Oui, ça pourrait marcher... Mais si je fais ça avec l'outil magique, est-ce que je pourrais comprendre ce qui se passe... ?

Non... dommage, mais la magie aurait occulté ce qu'il fallait comprendre, par contre j'avais bien envie de pas tout pianoter quand même, profiter du confort un peu !

Et si je construisais un chat IA dans un... chat IA ? Genre, tout prompter et 0 ligne de code écrite !

Possible ? ou pas !

Stupide ? OUI !

Une bonne façon d'apprendre ? Aussi oui ! Je devrais choisir quels fichiers envoyer, et quels feedbacks donner à l'IA pour avoir des résultats et je verrais chaque output qu'elle me donnera !

C'est donc comme ça, en utilisant [t3.chat](https://t3.chat) et Gemini 2.5 que j'ai construit [litechat.dev](https://litechat.dev) ! (oui, je suis une des raisons pour lesquelles vous pouvez pas avoir de trucs cool et merci Theo pour les tokens... ^^')

Ça a été ma première révélation IA : le contexte c'est dur, trop peu et la machine hallucine et trop la rend vraiment neuneu.

C'était un vrai obstacle et c'est ce qui me prenait le plus de temps, rassembler les fichiers dont l'IA aurait besoin.

Ça devenait chiant et je sentais que j'avais une bonne compréhension de ce qui se passait sous le capot.

En plus, Sonnet 3.7 était sorti et l'usage fiable des outils était devenu une réalité, donc retour à Cursor !

## Formedible : une quête secondaire pour que l'IA construise des formulaires à la volée

Un des trucs que je voulais pour LiteChat c'était un moyen pour l'IA de générer facilement des formulaires pour interagir avec l'utilisateur de façon guidée.

C'était un des trucs qui me manquaient dans [t3.chat](https://t3.chat) quand je bossais comme je le faisais.

J'ai donc fait ce que tout bon dev sain d'esprit sous stéroïdes IA ferait : j'ai créé un composant Shadcn pour ça, [formedible.dev](https://formedible.dev).

Un « builder » de formulaires piloté par un schéma pour que l'IA puisse créer des formulaires consistants juste en sortant du JSON (elles étaient déjà pas mal pour ça).

Nouvelle révélation : l'IA aime bien les usines à gaz et si tu lâches la bride, elle part loin, et super vite !

Interfaces débiles, code dupliqué, code optimisable... va jeter un œil aux 2000 lignes du hook use-formedible... (pardon aux familles, tout ça).

Le résultat c'est un outil/lib/composant qui fonctionne mais bien trop complexe à mon goût.

J'suis pas content de la mécanique et je travaillerai à améliorer ça à un moment, probablement en repartant de zéro !

Mais bon, ça fonctionne quand même, et, bien promptés, les modèles étaient capables de créer des formulaires complexes très vite et avec facilité...

Et bim, autre déclic ! En fait, tu peux juste expliquer à l'IA les outils que t'as créés et elle les utilisera... truc de ouf ! sérieux...

Pour mettre ça à l'épreuve et parce que les chats en texte brut et formulaires c'était chiant, j'ai ajouté une visualisation Mermaid et ça marchait, donc j'ai fait pareil avec la génération de graphiques et les diagrammes React Flow et puis des blocs JS et Python exécutables et enfin un support de Strudel pour la musique... tout ça, ben ça... marchait...

Si tu veux voir tout ça, tout est sur [litechat.dev](https://litechat.dev), gratuitement (moins les tokens) et sans trackers !

## Sprynge.me : nouvelle stack, nouveau workflow, nouveau teammate

L'époque c'est Sonnet 4, le nouveau truc à la mode c'est Claude Code, MCP est encore sexy et je commence un nouveau projet avec @benboarer.

Le but principal étant de promouvoir les bonnes habitudes pour la croissance sur X, comme les 997 autres projets similaires ^^.

J'en avais un peu plein le dos des API REST et du boilerplate CRUD vu que je bosse dans le web depuis presque 20 ans maintenant, et qu'on me promet du temps réel depuis presque 10 de ces années-là.

Comme par hasard Theo vantait [Convex](https://convex.dev) exactement pour ça, donc... pourquoi pas essayer.

C'était l'heure de secouer le cocotier de ma stack, avec un Bun + TanStack Start + Convex en monorepo (pani problem timan !)

Bon... en fait si... problèmes : manque de support de Bun pour les monorepos, statut bêta de TanStack Start... j'ai donc fini par revenir vers npm et Next.js. J'aurais aimé ne pas avoir à le faire mais Bun refusait de bundler la partie serveur de TanStack Start, m'empêchant d'utiliser le login X de Better-Auth correctement ET j'étais coincé sur une vieille version de Better-Auth et TanStack Start à cause de l'intégration Convex... bref, pas une semaine fun, mais genre, pas du tout...

Leçon importante apprise, l'IA rend l'adoption d'une nouvelle tech BEAUCOUP plus facile, mais les edge cases en resteront et t'as beau cramer des tokens et lire de la doc, ça résoudra pas forcément le problème !

Après environ un mois, on a fini par avoir un outil fonctionnel qu'une centaine de personnes ont apprécié pendant un moment et j'ai monté en gamme mon workflow agentique, mais c'était pas tout rose non plus !

Les rate limits me démontaient mes sessions de taf juste au moment où on m'a présenté [task-master.dev](https://task-master.dev) ! Quand tu dois juste exécuter un plan, tu brûles du token beaucoup, Beaucoup, BEAUCOUP plus vite.

Je me suis donc mis en quête d'un complément moins cher/plus ample pour Claude et j'ai fini par essayer GLM 4.5 de z.ai, c'était brillant !

Pas tout à fait aussi bon, mais les limites étaient inexistantes et c'était au 3/4 aussi bon et les choses ont fait que s'améliorer avec 4.6 et 4.7.

Tellement que j'ai abandonné mon abonnement Claude et je me suis inscrit au plan GLM coding pour un an complet.

La petite excursion dans le monde des workflows organisés pour l'IA m'a vraiment plu ! Autant pour la qualité que la vitesse de dev qui étaient en hausse et c'était tellement moins galère de continuer à bosser sur un projet en faisant ça... mais...

## task-o-matic.dev : le gros orteil dans le bain de l'orchestration agentic

task-master ne suffisait plus, je voulais des trucs qu'il ne pouvait pas faire et plonger dans le codebase c'était une vraie galère.

Donc, tu fais quoi quand t'en es à ce stade ? Eh bien Minus, la même chose qu'on fait à chaque fois à ce stade, on fabrique notre propre outil !

Me voilà donc reparti à faire un autre outil ! Point important, je voulais une lib, parce qu'autant j'aime bien ma fenêtre de terminal, autant la majorité des moldus en ont encore peur et préfèrent les clickodromes.

Avec une lib, je pouvais avoir le beurre dans mon terminal, et l'argent du beurre grâce à une GUI pour normie !

Je suis allé au taquet sur le truc !

Création de PRD multi-modèle, mécanisme de questionnement, amélioration de PRD et planification de tâches et plan multi-modèle avec réconciliation, boucle d'exécution multi-harness (Claude, Codex, Opencode, Gemini) (au fait, la génération multi-modèle est aussi dispo sur [litechat.dev](https://litechat.dev)... au cas où tu serais curieux ;)).

Vario mallossi, pot polini et pédale de lanceur ! Le. Kit. Complet !

Ça t'aurait fait un sandwich aussi si le cuistot avait une API !

Nouveau point de connaissance important : ne pas réimplémenter le harness d'IA ! L'exécution multi-modèle essayait de le faire, mais j'ai découvert plus tard que ça aurait été plus simple de faire ça en utilisant un harness existant (Claude Code, Opencode, Codex, Gemini, ...).

Oui, l'IA te rend plus rapide, mais tu sais qui d'autre est plus rapide grâce à l'IA ? Les équipes de gens talentueux qui construisaient déjà un harness !

J'ai essayé plein de trucs avec et c'était un chouette outil ! Donc j'ai procédé à l'étape suivante : un TUI et une app !

Les choses avançaient bien ! Quelques mois plus tard, j'avais un truc plus ou moins clean et prêt à partir...

Les gens autour commençaient à parler de plus en plus de skills, j'y avais jeté un œil quand Anthropic a sorti la spec... des fichiers md... bof !

## subagent-orchestration : 2 mois de travail remplacés par un fichier markdown

Quand même, tu sais, les gens continuaient à blablater, et beaucoup... donc j'ai redonné une chance aux skills.

Bah, le petit goût aigre-doux qui s'est suivi était bien réel... quelques fichiers md viennent d'effacer 85% de mes 2 derniers mois de travail.

Un côté de moi était très content parce que c'était nettement plus élégant, mais le côté dev qui a mis 2 mois de travail dans cette lib/cli/tui/app l'était beaucoup, mais alors beaucoup moins !

« Est-ce que ça peut être un skill ? » devrait maintenant être la question par défaut que chaque builder/fondateur devrait se poser.

Contrairement à la psychose actuelle, je pense pas que le markdown soit le nouveau Python mais une combinaison des deux... ça c'est le nouveau truc de tueur.

Les jours sombres de fin d'année et les indices grandissants de dépression saisonnière m'ont mené à un mois de lobotomie à grand coup de séries déjà vues jusqu'à ce qu'un truc clique.

Qu'est-ce qui peut pas être remplacé par un fichier md ? J'en vois que 2...

L'infrastructure, mais ça coûte du pognon ou au moins des capacités en marketing que j'ai pas.

Et le deuxième truc, la communauté, le fun de partager quelque chose que tu kiffes avec quelqu'un qui fera pareil...

## arcade-vibe.app : fun et débile veut pas dire inutile

Tout est parti de mon benchmark perso, un prompt de 5 lignes qui demande à un modèle de créer un shooter vertical, en utilisant le bloc JS de [litechat.dev](https://litechat.dev) (oui encore LiteChat).

À chaque sortie de nouveau modèle, je le lançais et ensuite je partageais les résultats avec un groupe de gens sympas sur Discord.

Jusqu'au jour où l'un d'eux m'a dit que je devais améliorer le prompt, ce à quoi ma première pensée a été « bah, tu pourrais le faire toi-même... ».

Et voilà ! L'idée fun ! Quel jeu tu peux créer en un seul prompt ? Et comparé à tes potes ?

Parfait ! Fun et compet' ! Comment ça pourrait foirer ?! (je t'ai dit que j'étais une bille en marketing ?)

Tu pourrais même dire que c'est un bon moyen de benchmarker les modèles ou même d'améliorer ton prompting foo !

En plus, maintenant j'ai une boîte pleine d'outils pour créer le MVP ! Je suis sûr que ça prendra pas 2 jours, 4 grand max !

C'est là que se trouvait la leçon pour cette partie, le code c'est plus le goulot d'étranglement ! J'étais à 80% du chemin à la fin de la semaine.

Ça m'a quand même pris un mois environ pour ship le satané truc !

Les tests et les corrections, la découverte des edge cases et les ajustements d'UI restent la plaie de mon existence, il se trouve que l'IA rétrécit juste le temps pour y arriver, apparemment !

Si tu veux aller jeter un œil, que ce soit pour jouer, créer de nouveaux jeux ou benchmarker des modèles, je te file des crédits si tu me files du feedback :D (et tu peux aussi BYOK, au cas où t'as peur que je morde) tout est sur [arcade-vibe.app](https://arcade-vibe.app).

## Nétwayé, baléyé, astiké... Kaz la toujou penpan !

La musique dans la peau... ... pardon...

Grâce à tout ce que j'ai appris cette année, sur la zone optimale pour le contexte, le fait que l'IA ira toujours vers la solution la plus over-engineered qui quand même échoue parfois sur les edge cases, ou encore que t'es à un fichier markdown de voir ton projet finir à la poubelle, il y a une leçon majeure à tirer.

La seule chose à retenir de toute cette année pour moi, c'est que mon taf de dev restera exactement le même mais d'une manière complètement différente !

Mon taf principal de dev sera toujours de livrer des features tout en gardant la maison la plus propre et rangée possible, en limitant les astuces dégueulasses et la dette technique, comme avant, la seule différence c'est que la maison est devenue très grande, très vite.

J'ai toujours été plus du côté créatif du spectre dev, donc je continuerai à concevoir des architectures, spécifier l'organisation du code et tester le code produit, pas grand-chose a changé de ce côté et ça sera probablement le cas pour encore un an au moins.

Ce qui n'existera plus c'est la galère du code. J'ai été du côté « si ça marche » depuis un bon moment et autant j'aime le beau code, autant j'ai appris à la dure qu'il vit presque jamais assez longtemps pour justifier sa création.

C'est vraiment très important pour mon cas perso, parce que ça veut dire que je peux retravailler ! Je peux quand même lancer quelques prompts les jours de brouillard cérébral, la douleur ne m'arrête plus à moins que ça soit vraiment très mauvais et même si je peux bosser que quelques heures avant de craquer, une bonne quantité de boulot a été faite ! L'IA a pas guéri ma SEP, mais elle a rendu mon travail possible à nouveau !

Une nouvelle galère est apparue par contre et j'ai essayé de répondre au cycle de prompts de l'enfer « passe à la tâche suivante, review, fix ça » en créant [task-o-matic](https://task-o-matic.dev), mais c'était le mauvais outil.

Ça ne laisse pas assez de contrôle tout en demandant des ajustements constants... pas le meilleur des combos.

Tu es probablement en train de hurler OpenClaw ou Hermes (tu sais, ces frameworks agentiques) derrière ton écran, je comprends pourquoi, mais j'aime pas l'idée !

Je veux quelque chose de plus portable, qui peut vivre en dehors d'un harness complexe et s'intégrer dans mes workflows existants sans nécessiter un gros tas de config.

Au final, ça devrait aussi pouvoir tourner dans n'importe quel framework « Claw » (tu te souviens des gens talentueux qui construisent des harness de tout à l'heure, même son de cloche ici !).

Donc, c'est ce que j'ai commencé à construire et je te parlerai de ce nouveau projet dans mon prochain article !
