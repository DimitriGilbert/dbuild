---
title: "Un an de retour dans le game"
date: 2026-04-14T00:00:59+01:00
tags: [
  "AI",
  "work",
  "multiple sclerosis",
  "Clanker"
]
summary: "Apres 8 ans a me faire ballader par ma maladie, l'IA m'a aide a retourner bosser, ca fait un an, alors qu'est-ce que j'ai appris"
slug: "index"
# og-image: "/images/blog/blackhole/from_ralph_to_eric/Eric_saw_Ralph.webp"
---

Voila quelques-unes des lecons que j'ai apprises d'un an de code avec l'IA, mais avant, un peu de contexte

En 2017, j'ai demissioné de mon boulot a Singapour parce que j'ai fait un burn out, un gros. Je vis avec l'AAH depuis 2020 car on m'a diagnostique une Sclerose en Plaques (apparemment, le burn out a eu un coup de main ^^').

Pour mettre les choses a plat direct, oui, j'ai beaucoup de chance de vivre en France et de pouvoir recevoir cette allocation, je serais probablement mort sinon.

Et si tu penses que la SEP c'est pas suffisant pour pretendre a l'AAH, on echange nos places pendant un mois et on re-discute apres, hein ! :)

Pendant tout ce temps là, j'ai continué a apprendre et essayer des nouveaux truc, j'ai aussi filer un coup de main a quelques potes pour des projets a eux en passant, mais, rien de serieux

J'ai saute sur la beta de copilot et j'ai rapidement gouté a cursor, mais encore une fois, surtout dilettante pour m'amuser

Mais il y a un an (et un mois), excité par la quantite de boulot que je pouvais sortir avec l'IA même les mauvais jours, j'ai decidé que je voulais plus me laisser trainer par mon systeme immunitaire et que j'allais retourner au turbin !

Ca a ete fastidieux et chaotique, mais, voici un recap de ce que j'ai fait et de ce que j'ai appris cette derniere année

## LiteChat : apprendre en construisant, avec le mauvais outil

Cursor et sonnet 3.5... c'est ce qui a tout declenche pour moi, ca (sous une forme ou une autre) c'etait le futur ! Le probkème, c'est que ca ressemblait a de la magie et j'aimais pas ce coté la...

Et si je construisais un chat pour comprendre comment ca marche ?

Oui, ca pourrait marcher... Mais si je fais ca avec l'outil magique, est-ce que je pourrais comprendre ce qui se passe... ?

Non... dommage, mais la magie aurait occulté ce qu'il fallait compredre, par contre j'avais bien envie de pas tout pianoter quand meme, profiter du confort un peu !

Et si je construisais un chat IA dans un... chat IA ? Genre, tout prompter et 0 ligne de code ecrite ! 

Possible ? ou pas !

Stupide ? OUI !

Une bonne facon d'apprendre ? Aussi oui ! Je devrait choisir quels fichiers envoyer, et quels feedbacks donner à l'IA pour avoir des resultats et je verrais chaque output qu'elle me donnera !

C'est donc comme ca, en utilisant [t3.chat](https://t3.chat) et gemini 2.5 que j'ai construit [litechat.dev](https://litechat.dev) ! (oui, je suis une des raisons pour lesquelles vous pouvez pas avoir de trucs cool et Merci Theo pour les tokens... ^^')

Ca a ete ma premiere revelation IA : le contexte c'est dur, trop peu et la machine hallucine et trop la rend vraiment neuneu.

C'etait un vrai obstacle et c'est ce qui me prenait le plus de temps, rassembler les fichiers dont l'IA aurait besoin

Ca devenait chiant et je sentais que j'avais une bonne comprehension de ce qui se passait sous le capot

En plus, Sonnet 3.7 etait sorti et l'usage fiable des outils etait devenu une realite, donc retour a cursor !

## Formedible : une quete secondaire pour que l'IA construise des formulaires a la volee

Un des trucs que je voulais pour litechat c'etait un moyen pour l'IA de generer facilement des formulaires pour interagir avec l'utilisateur de facon guidée

C'etait un des trucs qui me manquaient dans [t3.chat](https://t3.chat) quand je bossais comme je le faisais

J'ai donc fait ce que tout bon dev sain d'esprit sous steroide IA ferait : j'ai cree un composant shadcn pour ca, [formedible.dev](https://formedible.dev)

Un "builder" de formulaires piloté par un schema pour que l'IA puisse creer des formulaires consistants juste en sortant du json (elles etaient deja pas mal pour ca)

Nouvelle révélation : L'IA aiment bien les usines a gaz et si tu lache la bride, elles partent loin, et super vite !

Interfaces debiles, code duplique, code optimisable... va jeter un oeil aux 2000 lignes du hook use-formedible... (pardon aux familles, tout ca)

Le resultat c'est un outil/lib/composant qui fonctionne mais bien trop complexe a mon gout

J'suis pas content de la mecanique et je travaillerai a ameliorer ca a un moment, probablement en repartant de zero !

Mais bon, ca fonctionne quand meme, et, bien promptes, les modeles etaient capables de creer des formulaires complexes tres vite et avec facilité...

Et bim, autre declic ! En fait, tu peux juste expliquer a l'IA les outils que t'as crees et elle les utilisera... truc de ouf ! serieux...

Pour mettre ca a l'epreuve et parce que les chats en texte brut et formulaires c'etait chiant, j'ai ajoute une visualisation mermaid et ca marchait, donc j'ai fait pareil avec la generation de graphiques et les diagrammes react flow et puis des blocs JS et Python executables et enfin un support de Strudel pour la musique... tout ca, ben ca... marchait...

Si tu veux voir tout ca, tout est sur [litechat.dev](https://litechat.dev), gratuitement (moins les tokens) et sans trackers !

## Sprynge.me : nouvelle stack, nouveau workflow, nouveau teammate

L'epoque c'est Sonnet 4, la nouveau truc à la mode c'est Claude Code, MCP est encore sexy et je commence un nouveau projet avec @benboarer

Le but principal etant de promouvoir les bonnes habitudes pour la croissance sur X, comme les 997 autres projets similaires ^^ 

J'en avais un peu plein le dos des API REST et du boilerplate CRUD vu que je bosse dans le web depuis presque 20 ans maintenant, et qu'on me promet du temps reel depuis presque 10 de ces annees-la

Comme par hasard Theo vantait [Convex](https://convex.dev) exactement pour ca, donc... pourquoi pas essayer

C'etait l'heure de secouer le cocotier de ma stack, avec un bun + tanstack start + convex en monorepo (pani problem timan !)

Bon... en fait si... problèmes : manque de support de bun pour les monorepos, statut beta de tanstack start... j'ai donc fini par revenir vers npm et nextjs. J'aurais aime ne pas avoir a le faire mais bun refusait de bundler la partie serveur de tanstack start, m'empechant d'utiliser le login X de better-auth correctement ET j'etais coince sur une vieille version de better-auth et tanstack start a cause de l'integration convex... bref, pas une semaine fun, mais genre, pas du tout...

Lecon importante apprise, l'IA rend l'adoption d'une nouvelle tech BEAUCOUP plus facile, mais les edge case en resteront et t'as beau cramé du tokens et lire de la docs, ca resoudra pas forcement le probleme !

Apres environ un mois, on a fini par avoir un outil fonctionnel qu'une centaine de personnes ont apprecie pendant un moment et j'ai monte en gamme mon workflow agentique, mais c'etait pas tout roses non plus !

Les rate limits me demonté mes session de taf juste au moment ou on m'a presenté [task-master.dev](https://task-master.dev) ! Quand tu dois juste executer un plan, tu brules du token beaucoup, Beaucoup, BEAUCOUP plus vite

Je me suis donc mis en quete d'un complement moins cher/plus ample pour Claude et j'ai fini par essayer GLM 4.5 de z.ai, c'etait brillant !

Pas tout a fait aussi bon, mais les limites etaient inexistantes et c'etais au 3/4 aussi bon et les choses ont fait que s'ameliorer avec 4.6 et 4.7

Tellement que j'ai abandonné mon abonnement Claude et je me suis inscrit au plan GLM coding pour un an complet

La petite excursion dans le monde des workflows organises pour l'IA m'a vraiment plu ! Autant pour La qualite que la vitesse de dev qui etaient en hausse et c'etait tellement moins galere de continuer a bosser sur un projet en faisant ca... mais...

## task-o-matic.dev : le gros orteil dans le bain de l'orchestration agentic

task-master ne suffisait plus, je voulais des trucs qu'il ne pouvait pas faire et plonger dans le codebase c'etait une vraie la galere

Donc, tu fais quoi quand t'en es a ce stade ? Et bien Minus, la même chose qu'on fait a chaque fois a ce stade, on fabrique notre propre outil !

Me voila donc repartis a faire un autr outil ! Point important, je voulais une lib, parce qu'autant j'aime bien ma fenetre de terminal, autant la majorité des moldus en ont encore peur et preferent les clickodromes

Avec une lib, je pouvais avoir le beurre ans mon terminal, et l'argent du beurre grace a une GUI pour normie !

Je suis alle au taquet sur le truc !

Creation de PRD multi-modele, mecanisme de questionnement, amelioration de PRD et planification de taches et plan multi-modele avec reconciliation, boucle d'execution multi-harness (claude, codex, opencode gemini) (au fait, la generation multi-modele est aussi dispo sur [litechat.dev](https://litechat.dev)... au cas ou tu serais curieux ;) )

Vario mallossi, pot polini et pedale de lanceur ! Le. Kit. Complet !

Ca t'aurait fait un sandwich aussi si le cuistot avait une API !

Nouveau point de connaissance important: ne pas reimplementer le harness d'IA ! l'execution multi-modele essayait de le faire, mais j'ai decouvert plus tard que ca aurait ete plus simple de faire ca en utilisant un harness existant (Claude code, opencode, codex, gemini, ...)

Oui, l'IA te rend plus rapide, mais tu sais qui d'autre est plus rapide grace a l'IA ? Les equipes de gens talentueux qui construisaient deja un harness !

J'ai essaye plein de trucs avec et c'etait un chouette outil ! Donc j'ai procede a l'etape suivante : un TUI et une app !

Les choses avancaient bien ! Quelques mois plus tard, j'avais un truc plus ou moins clean et pret a partir...

Les gens autour commençaient a parler de plus en plus de skills, j'y avais jete un oeil quand anthropic a sorti la spec... des fichiers md... bof !

## subagent-orchestration : 2 mois de travail remplaces par un fichier markdown

Quand meme, tu sais, les gens continuaient a blablater, et beaucoup... donc j'ai redonne une chance aux skills

bah, le petit gout aigre-doux qui s'en est suivie etait bien reelle... quelques fichiers md viennent d'effacer 85% de mes 2 derniers mois de travail

Un cote de moi etait tres content parce que c'etait nettement plus elegant, mais le cote dev qui a mis 2 mois de travail dans cette lib/cli/tui/app l'etait beaucoup, mais alors beaucoup moins !

"Est-ce que ca peut etre un skill ?" devrait maintenant etre la question par defaut que chaque builder/fondateur devrait se poser

contrairement a la psychose actuelle, je pense pas que le markdown est le nouveau python mais une combinaison des deux... ca c'est le nouveau truc de tueur

les jours sombres de fin d'annee et les indices grandissants de depression saisonniere m'ont mene a un mois de lobotomie a grand coup de series déjà vu jusqu'a ce qu'un truc click

Qu'est-ce qui peut pas etre remplace par un fichier md ? J'en vois que 2...

L'infrastructure, mais ca coute du pognon ou au moins des capacité en marketing que j'ai pas

Et le deuxieme truc, la communauté, le fun de partager quelque chose que tu kiffes avec quelqu'un qui fera pareil...

## arcade-vibe.app : fun et debile veut pas dire inutile

Tout est partis de mon benchmark perso, un prompt de 5 lignes qui demande a un modele de creer un shooter vertical, en utilisant le bloc js de [litechat.dev](https://litechat.dev) (oui encore litechat)

A chaque sortie de nouveau modele, je le lancais et ensuite je partageais les resultats avec un groupe de gens sympas sur discord

jusqu'au jour ou l'un d'eux m'a dit que je devais ameliorer le prompt, ce a quoi ma premiere pensee a ete "bah, tu pourrais le faire toi-meme..."

Et voila ! L'idee fun ! Quel jeu tu peux creer en un seul prompt ? Et comparé a tes potes ?

Parfait ! Fun et compet' ! Comment ca pourrait foirer ?! (je t'ai dit que j'etais une bille en marketing ?)

Tu pourrais meme dire que c'est un bon moyen de benchmarker les modeles ou meme d'ameliorer ton prompting foo !

En plu, maintenant j'ai une boite pleine d'outils pour creer le MVP ! Je suis sur que ca prendra pas 2 jours, 4 grand max !

C'est la que se trouvait la lecon pour cette partie, le code c'est plus le goulot d'etranglement ! J'etais a 80% du chemin a la fin de la semaine

Ca m'a quand meme pris un mois environ pour ship le satane truc !

Les tests et les corrections, la decouverte des edge cases et les ajustements d'UI restent la plaie de mon existence, il se trouve que l'IA retrecit juste le temps pour y arriver, apparemment !

Si tu veux aller jeter un oeil, que ce soit pour jouer, creer de nouveaux jeux ou benchmarker des modeles, je te file des credits si tu me files du feedback :D (et tu peux aussi BYOK, au cas ou t'as peur que je morde) tout est sur [arcade-vibe.app](https://arcade-vibe.app)

## Nétwayé, baléyé, astiké... Kaz la toujou penpan !

La musique dans la peau... ... pardon...

Grace tout ce que j'ai appris cette annee, sur la zone optimale pour le contexte, le fait que l'IA ira toujours vers la solution la plus over-engineered qui quand meme echoue parfois sur les edge cases, ou encore que t'es a un fichier markdown de voir ton projet finir a la poubelle, il y a Une lecon majeure a tirer

La seule chose a retenir de toute cette annee pour moi, c'est que mon taf de dev restera exactement le meme mais d'une maniere completement differente !

Mon taf principal de dev sera toujours de livrer des features tout en gardant la maison la plus propre et rangee possible, en limitant les astuces degueulasses et la dette technique, comme avant, la seule difference c'est que la maison est devenue tres grande, tres vite

J'ai toujours ete plus du cote creatif du spectre dev, donc je continuerai a concevoir des architectures, specifier l'organisation du code et tester le code produit, pas grand-chose a change de ce cote et ca sera probablement le cas pour encore un an au moins.

Ce qui n'existera plus c'est la galere du code. J'ai ete du cote "si ca marche" depuis un bon moment et autant j'aime le beau code, autant j'ai appris a la dure qu'il vit presque jamais assez longtemps pour justifier sa creation

C'est vraiment tres important pour  mon cas perso, parce que ca veut dire que je peux retravailler ! Je peux quand meme lancer quelques prompts les jours de brouillard cerebral, la douleur ne m'arrete plus a moins que ca soit vraiment tres mauvais et meme si je peux bosser que quelques heures avant d'imposer,  une bonne quantite de boulot a ete faite ! L'IA a pas gueri ma SEP, mais elle a rendu mon travail possible a nouveau !

Une nouvelle galere est apparue par contre et j'ai essaye de repondre au cycle de prompts de l'enfer "passe a la tache suivante, review, fix ca" en creant [task-o-matic](https://task-o-matic.dev), mais c'etait le mauvais outil

Ca ne laisser pas assez de controle tout en demandant des ajustements constants... pas le meilleur des combos

Tu es probablement en train de hurler OpenClaw ou Hermes (tu sais, ces frameworks agentiques) derriere ton ecran, je comprends pourquoi, mais j'aime pas l'idee !

Je veux quelque chose de plus portable, qui peut vivre en dehors d'un harness complexe et s'integrer dans mes workflows existants sans necessiter un gros tas de config

Au final, ca devrait aussi pouvoir tourner dans n'importe quel framework "Claw" (tu te souviens des gens talentueux qui construisent des harness de tout a l'heure, meme son de cloche ici !)

Donc, c'est ce que j'ai commence a construire et je te parlerai de ce nouveau projet dans mon prochain article !
