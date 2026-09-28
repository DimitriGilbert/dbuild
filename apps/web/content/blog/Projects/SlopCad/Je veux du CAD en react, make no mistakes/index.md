---
title: "Je veux du CAD en react, make no mistakes !"
date: 2026-09-27T08:00:00+01:00
tags: ["AI"]
summary: "T'as déjà voulu coller du CAD dans tes projets ? Moi oui ^^ ! Voilà comment une idée débile est devenue une expérience qui a vraiment donné quelque chose"
slug: "index"
og-image: "/images/blog/projects/slopcad/i_want_cad_in_react_make_no_mistakes/make_no_mistakes_og.webp"
ogImageAlt: Viewport CAD avec un sandwich explosé, du fromage suisse qui rattrape la mayo qui coule et un robot agent tout coupable
---

Les stats d'abord, pour les nerds ! 1 conversation glm-5.3, 3 compactages, 607 agents, 9 milliards de tokens cramés qui auraient coûté 1.5k$ si j'avais payé, et tout ça qui tourne pendant... 8 jours !

Le résultat ? [https://slopcad.dbuild.dev](https://slopcad.dbuild.dev) et [https://github.com/DimitriGilbert/slopcad](https://github.com/DimitriGilbert/slopcad) ! Enjoy !

Maintenant qu'on a dégagé la clique "attention span tiktok", on peut parler comme des grands, l'article qui suit parle pas de SlopCad mais de ce qui l'a rendu possible.

Ce run unique, c'est le résultat de moi qui bosse avec l'IA depuis des années littérales à ce stade et le "Make no mistakes !"...

![Viewport CAD sandwich avec du fromage suisse qui rattrape la mayo](/images/blog/projects/slopcad/i_want_cad_in_react_make_no_mistakes/make_no_mistakes_og.webp)

## On ne fait tout simplement aucune erreur

Moi, Toi, un agent IA, personne ni rien n'est à l'abri des erreurs ! Tu les attrapes avant qu'elles arrivent, t'as l'expérience pour reconnaître les patterns et agir dessus, tu mets des process en place pour que le travail que tu sors soit à (tes) standards et parfois tu apprends en te plantant très publiquement...

Un agent IA fait **rien** de tout ça. Il va s'exécuter si tu le lui demandes par contre... mais... tu lui demandes quoi ?

### Des tests, des tests et encore un peu de tests au cas où

J'ai vu la lumière et j'utilise surtout typescript en étant très strict sur les types donc cette partie est couverte, mais si tu le fais pas et que tu continues avec des langages sous-merde genre javascript ou python, tu vas vouloir tester à mort les inputs et outputs de tes fonctions.
Les unit tests ou le type checking, c'est la première tranche de fromage et en général c'est plutôt cheap !

Ceci dit, être sûr de recevoir et d'émettre ce que tu attends veut pas dire que t'es sorti d'affaire, faut aussi tester le comportement réel du code... Ça me fait mal de l'admettre, mais je crois que le TDD est la voie ici !
Tests d'abord avec une implémentation qui les valide.
J'ai toujours bossé solo ou en petites équipes donc les tests en général et le TDD surtout, c'était très cher pour le retour (**EN PETITE ÉQUIPE OU SOLO**), mais maintenant qu'ils mettent presque plus de temps à tourner qu'à être écrits, y a littéralement AUCUNE EXCUSE !

"On y est ?!" te traverse peut-être l'esprit, et, Nan, pas tout à fait ! Des types serrés et un algo correct, c'est pas les soucis de tes users (au début), ils voient même pas le code et s'en foutent, ce qui les intéresse c'est comment ils interagissent avec, l'UI !
Tu pourrais te mettre à unit tester ton UI, bien sûr, j'ai essayé, et je trouve ça stupide ! Ce qui l'est pas par contre, c'est les tests E2E !
Parlant de cher ! Je sais pas pour toi, mais les rares fois où j'ai essayé dans le passé, c'était un cauchemar, des heures et une charge continue si je voulais les garder à jour...
Tu sais ce qui en a rien à foutre de la tâche écrasante, soul-crushing, mentalement obliterante qu'est le testing E2E ? L'IA.

Et maintenant que les modèles peuvent réellement VOIR leur travail, construire les tests E2E les force à vraiment utiliser ce qu'ils ont fait, et ça choppe plein de problèmes au passage. Ça m'a pris des mois d'y arriver et je le regrette, ça m'aurait probablement fait gagner des semaines de taf sur l'année...

Tous ces tests ont un piège cependant, comme chaque décision d'ingénierie... Ils sont chers, pas en cerveau ni en tokens, ils peuvent coûter un paquet de temps !
Tu te souviens quand je parlais des tests qui mettent plus de temps à tourner qu'à être écrits ? Ouais, beh... c'est arrivé sur SlopCad. chaque test E2E tournait sur une nouvelle instance playwright séparée, en séquentiel... au pic, ça prenait 30 minutes pour faire tourner les E2E.

Je l'ai réglé en 2 passes, d'abord avec une exécution concurrente de N à la fois, ça a réduit à 12 minutes (CPU de ma machine de dev collée à 100%...), et une autre qui mimait vraiment une session utilisateur, en construisant dans un seul onglet. Et ça a ramené les E2E à environ 5 minutes !

Tu voudras peut-être garder ce truc en tête si tu comptes faire ça sur tes projets !

### Coverage, DRY et un petit CRAP

Les tests aident, mais la tranche de fromage est pleine de trous par lesquels le slop s'infiltre, donc on en rajoute (quel que soit le problème, on peut toujours le résoudre avec plus de fromage !) ! et la deuxième couche anti-slop, c'est les métriques !

Combien de ton code est testé ? IMO, en dessous de 50% autant pas et une cible low cost c'est au-dessus de 65%.

Comme tout le monde le sait, l'IA redéclare joyeusement des types et réécrit des fonctions/méthodes/fonctionnalités sur place au lieu de réutiliser l'existant ou de le rendre accessible pour plus tard.
C'est une source majeure de bugs dans plein de projets vibe codés (been there, done that) et c'est généralement très chiant à fixer alors que ça coûte quasiment rien si c'est forcé tout le temps pendant le build.
La redondance de code aide beaucoup à choper ces cas mais y a un autre truc dont je parlerai plus tard.

Et le boss final, les god modules/fonctions, le fichier cauchemar de 1K+ lignes plein de if et de switches et de callbacks et de soupe de fonctions anonymes... on les adore tous ceux-là, hein ?
Demander du code testable (et testé) règle déjà une bonne partie, mais la plupart des modèles ont un talent pour fourrer de la complexité partout où ils peuvent...
C'est mauvais pour toi (pire si tu review le code), c'est mauvais pour eux quand ils le maintiennent, personne gagne ! Je donnerai pas de chiffre ici, et je pense pas que tu doives devenir dingue sur ta cible CRAP, mais t'en as clairement besoin d'une !

Si une de ces métriques foire, le travail est renvoyé direct à son créateur pour qu'il se fasse battre jusqu'à la compliance (résistance is futile !) !

Et avec ces considérations pénibles hors du chemin, on peut se mettre à faire du shtuff non ?

### Préparer le travail

J'ai dit 1 conversation ? Huum... j'ai peut-être un peu menti là-dessus, mais, Allez, tu peux pas attendre d'un logiciel CAD qu'il sorte d'une seule conversation d'agent ! Soyons sérieux !

C'était en fait 3... Je sais, outrageux, mais laisse-moi expliquer...

la 1ère conversation c'était avec chatGPT (probablement Luna, j'ai pas de sub) sur le site (side note: OMG, l'expérience était atroce ! c'est tellement lent et laggy !), j'ai candidement demandé s'il y avait un truc CAD open source en react, ça m'a ressorti un tas de trucs, ... rien de ce que je voulais... 

Mais, ça m'a dit que je pouvais me faire le mien avec des kernels CAD OSS donc j'ai demandé un peu plus d'info et précisé ce que je voulais: composants shadcn, browser first, complètement paramétrique, etc, etc...

Quelques allers-retours ont sorti un PRD et un plan, en utilisant les skills ["grilling"](https://skills.sh/mattpocock/skills/grilling) et ["to-spec"](https://skills.sh/mattpocock/skills/to-spec) de Matt Pocock et mon propre ["subagent-orchestration"](https://skills.sh/DimitriGilbert/ai-skills/subagent-orchestration).

J'ai ensuite switché sur Zcode pour utiliser glm-5.3 pour une review adversariale et un autre tour de grilling pour avoir les fichiers PRD et plan finaux.
Le plan de développement orchestré qui en est sorti est [ici](https://github.com/DimitriGilbert/slopcad/blob/base/slopcad%20%E2%80%94%20Orchestrated%20Development%20Plan%20(1).md) (repo encore privé pour un moment).

C'est l'étape la plus engageante du process et ça peut prendre des heures d'avoir un plan qui te convient, skippe pas ça par contre, parce que ça détermine TOUT la suite !

Oui, un plan survit jamais au contact avec l'ennemi, mais un bien ficelé fait la différence entre un projet bien organisé et un jus de YOLO...

### Des fondations solides

On peut demander à une IA de bootstrap un projet from scratch, c'est une façon de faire, mais je pense pas que ce soit une façon valide !

Utilise des repos templates ou des stack builders pour avoir un workspace prêt en une seule commande !

En plus d'être plus rapide, le vrai bénéfice c'est que tu sais à quoi vont ressembler tes projets ! Et ça veut aussi dire que tes agents IA sont pas laissés à deviner où vont les trucs.

Comme j'ai vu la lumière et que j'utilise typescript, j'ai monté la luminosité à 11 avec [https://better-t-stack.dev](https://better-t-stack.dev). N'importe quel framework et outil digne d'intérêt dans l'écosystème typescript est supporté, que tu veuilles une SPA browser only, un fullstack NextJS ou tanstack, un backend spécifique (avec ou sans DB), une app native/mobile ou même une web extension... ça te range tout pour toi et ton agent pour que le taf démarre plus vite avec plus de consistance !

Je connais pas d'équivalent en python ou autres langages, mais tu peux toujours te sortir ton propre script de bootstrap, c'est pas si dur avec l'IA et si t'es un serial-builder, ça te fera gagner des heures et des tokens à ne plus compter ! (Je serais curieux de savoir ce que vous utilisez BTW, même dans les langages sous-merde 3:D)

C'est là/quand tu devrais faire setup ton test harness par ton agent, better-t-stack gère pas ça pour l'instant malheureusement...

Maintenant armé de ces tranches denses de fromage anti-slop, du pain bootstrappé et de la recette, ça sent le moment de démarrer ce sandwich, non ?

## Le Chef, les Cuisiniers et la cuisine

La dalle déjà ^^ ? Bon allez

Donc, tu te dirais que je laisse un agent partir en vrille avec le plan maintenant, il est bien construit et reviewé, découpé en phases et sous-phases, on a des quality gates partout, on est bons, non ?

Pour être honnête, avec un modèle récent et un bon harness, il trouverait probablement tout seul à utiliser des subagents et orchestrer le truc, mais pourquoi laisser ça au hasard ? Plus ça voudrait dire Moi qui bavarde pas sur mon skill subagent-orchestration qui est en vrai la Pièce de Résistance de cette histoire.

Je suis tombé sur ce skill en janvier et je l'utilise tout le temps depuis. C'est un skill pour aider à orchestrer des subagents... choc total.

Donc ça marche comment concrètement ?

### Boucle implementer-verifier-fixer

T'as peut-être pigé que le plan est déjà découpé en phases et sous-phases, ça veut dire que, pour chaque sous-phase, l'orchestrateur dispatch un agent implementer qui porte le taf du plan.

Une fois cet agent fini, un verifier est dispatché pour, oui, vérifier le travail.
Idéalement, un modèle différent ou même quelques cheap (avec une réconciliation) pourraient être utilisés ici, je suis broke avec un excellent plan IA, donc glm only pour moi.
C'est le truc sur la type safety et le DRY du code dont je parlais plus tôt, laisse pas ça seulement sur l'agent qui fait le taf, fais signer un autre/d'autres !

Si les quality de base foient ou que des défauts sont trouvés, le travail part chez un fixer (ça peut être l'implementer si ton harness le permet) pour remettre les choses d'aplomb.

Cette danse tourne jusqu'à 3 fois (semblait un bon compromis pour éviter les doom loops) jusqu'à ce que tu sois rappelé dans la boucle, ça m'est arrivé qu'une seule fois depuis janvier :)

Et quand c'est bon, prochaine sous-phase, jusqu'à ce que la phase soit finie, moment où un autre validateur phase-wide est dispatché pour regarder le plus gros tableau.
Ça peut sembler overkill et souvent ça l'est, mais j'ai chopé de vrais défauts tôt comme ça sur d'autres projets donc ça reste.

Ce serait un bon endroit pour faire tourner un modèle plus gros/fort/malin qui chopperait le code sloppy et l'archi...
étant un pauvre avec seulement un sub z.ai, j'ai pas fait, mais une intervention Fable de temps en temps aiderait clairement le codebase, pour sûr !

Commit (ou pas), stacked PR (ou pas), c'est à la fin d'une phase principale que je demande à l'agent de faire toute la danse de versioning... ça suffit peut-être pas... j'ai pas encore eu de surprise, but mileage may vary, c'est pour ça que c'est laissé hors du skill.

Et t'as pigé l'idée, découpe le travail, boucle sur une phase jusqu'à ce que ce soit fait et testé, rince, répète, rien de compliqué, surtout parce que ton orchestrateur gère tout ça tout seul :D

### Des preuves ou ça n'est pas arrivé

Exact, des rapports de métriques navigables et au moins des screenshots des tests E2E, mais ces jours-ci je demande carrément que la session E2E soit enregistrée !

Y a pas grand-chose de plus à dire ici, je l'ai déjà dit, les agents mentent et te diront qu'ils ont fini et que tout est vert... c'est pas le cas.

La seule façon pour moi de checker jusqu'à récemment c'était de tester le vrai travail, et ensuite invariablement rager une minute. Et puis quelqu'un a mentionné d'enregistrer ses tests et ça a été une révélation !

T'as même pas besoin de regarder la vidéo à chaque fois (ou du tout pendant un moment), ça force juste l'agent à faire quelque chose en demandant des preuves, c'est génial (et je me souviens plus qui c'était ^^') !

### "J'ai fini !", Non tu as pas.

Toutes les phases sont finies, les PRs sont stackées, les preuves vidéo sont là et validées, tu aimerais entendre que la prochaine étape c'est le bouton publish !

XD, genre, t'as lu quoi au-dessus de ce point ? On a demandé à l'IA de créer un plan, le code, de le review et le tester AVEC preuves vidéo et tu penses qu'on a fini ? C'est mignon...

Donc j'ai reparlé, encore, de subagent-orchestration, mais un truc dont je parle moins c'est mon skill subagent-review que j'utilise probablement encore plus !

Le nom parle, encore une fois, c'est une review, menée par des subagents mais la première étape est toujours une phase de mapping.
Un agent mappe le code et crée un plan de review, groupe les fichiers (souvent par fonctionnalité) à reviewer et l'orchestrateur mène ensuite le plan par vagues de 5. 
Le code dans ces fichiers est reviewé pour lui-même, mais l'agent a aussi pour tâche de le comprendre (en lisant des fichiers en plus au besoin) et de s'assurer de choper les failles logiques/sécurité aussi

Quand toutes les reviews sont rentrées, un autre set d'agents est lancé pour vérifier les claims (autant que d'agents d'exploration, mais je devrais travailler là-dessus maintenant qu'on a des modèles avec plus de contexte !). ça vient du fait que je suis parti en chasse à l'oie sauvage après un bug inexistant y a quelques mois et ça a prouvé son utilité dans la plupart de mes reviews cette année, en rejetant des bugs hallucinés mais plus souvent en en trouvant de nouveaux.

Et ensuite, une fois toute cette ménagerie terminée, un plan de fix est crafté par un agent final pour organiser le taf. et ensuite tu devines ?

Si t'as dit un autre round de subagent-orchestration pour run le plan de fix, t'es malin et correct (tu vois, c'est pas si dur ;)) !

### S'il te PLAÎT, dis-moi qu'on a fini maintenant...

Qui va leur dire ? la vraie réponse... ça dépend :)

C'est un outil interne ou un side project ? ça marche assez bien plus tu peux toujours travailler/améliorer dessus ? Beh alors ship, utilise, casse et ainsi de suite !
T'as fait dat sandwich autant en prendre une bouchée !

Maintenant, si c'est de l'infra critique, du taf client ou du public facing... je laisserais pas comme ça ! Autant l'IA fait un job décent ces jours-ci, la charge reste sur toi de valider donc utilise-le et casse-le jusqu'à ce qu'il n'y ait plus rien à casser !
T'as déjà tous les E2E hors du chemin donc fais des trucs cons auxquels l'IA pense pas. 
À chaque fois que ça casse, en plus de faire fixer par l'agent, demande-lui d'ajouter un test pour ça et pourquoi pas, de trouver d'autres patterns similaires ! Trouvé une fois, plus jamais à y penser.

Et si t'es d'humeur, c'est le moment où tu peux toujours ajouter "une feature de plus"... :P

## Regarde l'horloge, les tokens et ton portefeuille Brûler

Le principal inconvénient de bosser comme ça (en plus d'être assez lent), un gros coûteux, c'est que c'est une vraie fournaise à tokens... J'utilise un plan coding glm z.ai (pro) et j'ai un legacy plan, ce qui veut dire que j'ai pas de limites hebdo... et boy oh boy que c'était bien...

Le résultat c'est un run de 8 jours qui a consommé près de 9B tokens (70% en glm-5.3 et le reste en 5.3-flash) et 607 agents ce qui aurait frôlé les 1.5k$ si j'avais payé les tokens (/déglutition gênée)

Tu pourrais couper sur la review et toute l'étape review-validation pendant le subagent-review mais je pense pas que leurs coûts soient significatifs si tu pèses les bénéfices, comme je disais plus tôt, trade off d'ingénierie... un peu plus de coût un peu moins de slop...

Bonne-ish news : la partie lente a une solution : les worktrees ! (mauvaise-ish news : ça empire le premier problème :D trop drôle ?)

Le skill d'orchestration a un path concurrent built-in, mais seulement s'ils touchent pas les mêmes fichiers donc ça arrive pas si souvent...

J'ai été réticent à utiliser les worktrees jusqu'ici... je me suis déjà brûlé avec les git submodule et j'étais méfiant de la magie git... mais j'ai essayé le dernier jour et demi sur SlopCad, et maintenant je regrette d'avoir jamais plongé !

Certaines parties du taf auraient bénéficié dramatiquement plus tôt au lieu de rester séquentielles et je pense que le coût de réconciliation aurait été minimal, meh, plus tu essaies...

### Le workflow agent ultime (*pas)

Je vais pas mentir, je suis assez fier de mon workflow ! Comme je l'ai dit, je l'utilise et le raffine depuis des mois et ça matche très bien mon style de taf.

Ça marche à merveille sur les nouveaux projets et si tu skippes toute la partie bootstrap, ça rentre bien dans un existant (juste assure-toi de planifier avec accès au code, duh ^^)...

Malgré ma validation auto-indulgente, je pense que des améliorations sont possibles !

Comme j'ai touché plus tôt, les tests ne doivent jamais devenir un fardeau et ça doit être encodé et forcé strictement tout au long de l'orchestration, 30 minutes de tests run 3 fois dans une phase c'est déjà 20% d'une journée de taf et c'est pas acceptable.

Les dispatches de phase basés sur worktrees sont un must comme dit avant et un process UI/UX dédié doit être mis en place car c'est plus souvent qu'autrement la partie la plus faible de tous les projets que j'ai créés jusqu'ici.

Un autre point dont j'ai déjà écrit c'est le pattern multimodel où on pourrait imaginer Astra/Fable en orchestrateur, GLM/sol/opus en implementers, glm-5.3-flash/lune/deepseek en reviewer de sous-phase, etc...

t3-code a l'air particulièrement bien taillé pour ça avec son truc "orchestration-v2" où un agent peut appeler un autre modèle depuis un autre harness ! Je vais clairement y jeter un œil dans le futur !

Pour l'instant, si tu veux faire la même chose sur ton projet, j'ai créé un autre skill appelé ["create-a-project"](https://skills.sh/DimitriGilbert/ai-skills/create-a-project) qui englobe tout ce dont j'ai parlé ici et que j'ai utilisé pour run la création de SlopCad.
Il référence skills et comportements pour que la seule chose que t'aies à faire soit de donner une idée, loader le skill et suivre ^^ tu le trouveras [ici](https://skills.sh/DimitriGilbert/ai-skills/create-a-project) et je créerai un script pour s'assurer que chaque skill nécessaire est installé :)

### Et SlopCad alors ?

Ah oui, le vrai projet ^^, beh... je vais pas trop m'y étendre, ce post est déjà assez long et pour être parfaitement honnête, j'ai à peine essayé le truc ! Je suis à la fourche "ça dépend"...

Pour commencer, et avant d'en parler trop je vais d'abord m'en taper une grosse bouchée, peut-être laisser tomber une tranche de tomate et un peu de mayo par terre avant de le présenter et me vanter de ce qu'il peut faire :P

C'est open source par contre, donc si t'as de l'expérience en modélisation 3D ou juste envie d'essayer, je serais content que tu le cassasses un peu et que tu m'en parles ! Si le repo reste assez vivant, je m'en servirai de testbed, voir ce que ça prend pour qu'un agent babysit un repo **:WINK-WINK:** (oui, le but c'est de me mettre au chômage, et alors ?)

Je crois que c'est tout ce que j'ai à dire là-dessus, mais je suis vraiment curieux ! T'en penses quoi ? c'est une façon complètement stupide de bosser ou tu veux essayer ? Des améliorations qui te viennent à l'esprit ?

T'as un workflow similaire peut-être ? Ou des mauvaises expériences qui t'éloignent de ça ?

Y a plein de questions, mais c'est elles qui m'ont mené au workflow que je viens de présenter et j'ai très probablement loupé des trucs donc j'adorerais entendre comment vous bossez de nos jours !
