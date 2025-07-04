---
title: LiteChat - Un chat IA local first, auto hebergeable sur un server HTTP
date: 2025-07-04T11:39:17+01:00
tags: 
  - ai
  - chat
  - local
  - server
summary: Une petite présentation de mon projet LiteChat, en Français dans le texte !
slug: "index"
---

Salut a tous, pour mon premier post, je vous presente LiteChat dont je sui le créateur.

[Repo](https://github.com/DimitriGilbert/LiteChat) et ici [pour télécharger](https://github.com/DimitriGilbert/LiteChat/releases) (en francais, anglais, espagnol, italien et allemand).



C’est un chat IA que j’ai créé pour pouvoir utiliser des LLM locaux et distant, le tout dans votre navigateur. Il est conçu pour être “local first” et n’a besoin que d’un serveur HTTP pour fonctionner, tout le reste c’est dans votre navigateur ! Pas de tracking, pas de compte, vous venez avec vos clé d’API ! Les données sont sauvegardées dans une base de données IndexeDB et vous pouvez synchroniser vos conversations en utilisant git.

Oui, dans le navigateur :P Pour ce faire, j’ai aussi dû implémenter un système de fichiers virtuel (oui, toujour dans le navigateur en utilisant ). Vous avez donc accès aux deux, tant qu’a faire ! Vous pouvez cloner un repo et joindre des fichiers du VFS dans vos conversations !

Mais comme la sélection manuelle des fichiers, c’était une corvée, j’ai intégré des outils pour le VFS et git !

Ensuite, comme l’architecture de base était là, et bien j’ai ajouté le support des serveurs MCP HTTP, mais il manquait toujours les serveurs stdio …, donc j’ai aussi “fait” un bridge (réécrit par l’IA à partir de mcp-proxy ) pour les utiliser (vous pouvez le déployer où vous voulez mais ce n’est pas sécurisé !)

Apres, c’est bien mignon l’IA, mais j’en avais un peu marre du texte seul, du coup, j’ai ajouté le support des diagrammes Mermaid et des formulaires HTML (Comme ca on a meme plus besoin de réfléchir a quoi lui dire a la machine !). Bon… après…les diagrammes Mermaid c’est un peu moche, et comme j’ai ajouté un module de workflow avec des visualisations basée sur [https://reactflow.dev/], j’ai aussi ajouté un moyen pour les LLM de vous en créer ! Et puis comme le text ca fait pas beaucoup de bruit, il y a aussi in block “Beat” qui utilise (http://strudel.cc/) pour aussi en profiter de maniere auditive !

Et puis bon, en testant, toujours taper les mêmes prompts avec juste quelques différences c’était lourd aussi, j’ai donc fait un module de bibliothèque de prompts avec des modèles pour qu’y ai plus qu’a remplir un formulaire ;) (peut etre aussi que j’en avais besoin pour les workflows…)

‘Pis, un Agents, c’est quoi ? hein ? bah un prompt système, des outils et des prompts spécifiques pour les tâches ! Donc ça aussi vous en avez une librairie !

Les prompts et les agents peuvent s’intégrer dans les workflows (duh, ils étaient faits pour ça !) mais vous avez aussi des étapes de “transformation”/exécution de code utilisateur/“prompt personnalisé” pour faciliter le transit !

Comme vous l’avez peut-être deviné, si j’ai une forme d’exécution de code pour les workflows, Est ce que je pourrais t’y donc pas faire tourner le code généré par l’IA, hein ? Eeeeh bha SI ! En Python ou JavaScript Et même que si vous ête un dinguo, vous pouvez faire tourner le js en mode “unsafe” (eval et yolo XD) du coup ca peut produire des trucs (comme ce one shot threejs scroll shooter ) que vous pouvez exporter en 1 clic (le template est moche mais je vais y travailler !)

Afin de n’pas completement obliterer le context, tous ces jolis blocs d’UI peuvent être “activés” (plutôt suggérés ^^) en utilisant des règles. Evidement, vous pouvez ajouter vos règles a vous ! Et meme que vous avez un bouton pour demander a l’IA de les choisir pour vous pour votre prompt actuel !

Bien sûr, vous avez les habituels regen (avec un modèle différent si le coeur vous en dis) et forking, mais vous pouvez aussi modifier une réponse a la main pour dégager l’inutile. D’ailleur, Les blocs de code sont aussi modifiable avec la coloration syntaxique pour les langages les plus courants, (mais pas d’auto-complétion ou autre truc de bogoss, on va pas poussez mémé dans les orties !).

Pour couronner le tout, vous pouvez organiser des courses d’IA avec un nombre illimité de participants (ca dependra de la profondeur de votre portefeuille :P). C’est cool pour faire des benchmarks ou quand on veut voir laquelle des machines prendra notre place en premier… J’ai même fait un petit outil qui prend une conversation de course exportée et qui crée un mini site de benchmark (plus ciblé sur le bloc d’exécution JS pour l’instant https://dimitrigilbert.github.io/racebench/scroller/index.html pour le “jeu” d’avant)

J’oublie certainement quelques bricoles, mais vous avez compris l’essentiel ^^

La version hébergée est sur les pages GitHub et il n’y a pas de tracking, pas de compte ! Vous apportez vos propres clés API ! Vous ne pourrez probablement pas utiliser la version hébergée pour votre LLM local à cause des restrictions https/http, mais comme je l’ai dit, vous pouvez télécharger https://github.com/DimitriGilbert/LiteChat/releases et héberger avec un simple serveur HTTP. Vous avez même des versions localisées pour le français, l’italien, l’allemand et l’espagnol. Une petite playlist (très incomplète) de tutoriels si vous vous sentez un peu perdu https://www.youtube.com/playlist?list=PL5Doe56gCsNRdNyfetOYPQw_JkPHO3XVh

J’espère que vous apprécierez et les commentaires constructifs sont grandement appréciés :D