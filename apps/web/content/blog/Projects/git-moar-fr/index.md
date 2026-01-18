---
date: "2025-01-17T10:00:00+01:00"
title: git-moar, parce que git log ne suffisait pas
summary: Outil CLI avancé d'analytique et de reporting pour dépôts Git avec de belles visualisations, métriques de qualité et insights. Transformez votre historique git en quelque chose de lisible !
tags:
  - git
  - analytics
  - cli
  - visualization
  - french
slug: "index"
toc: true
---

_Ce contenu a été généré par le modèle AI GLM 4.7 et not-ai-writer_

Alors, qui ici utilise **git** ? Et j'entends *vraiment* l'utiliser, pas juste `commit -m "truc"` et pousser quand ça casse ?

Oui, git c'est génial et tout, mais parfois vous regardez `git log` et c'est comme essayer de lire le code Matrix à l'envers. Il y a tellement de données là-dedans. Tellement de patterns. Tellement de... questions ! Genre "qui a cassé la prod le mois dernier ?" ou "c'est un projet à one-man show ?" ou "pourquoi ce fichier a plus de commits que tout mon historique de projet ?"

Bref, j'en ai eu marre de fixer des hashes de commit, alors j'ai créé **git-moar** ! 😛

## C'est quoi git-moar ?

[git-moar](https://github.com/DimitriGilbert/git-report) est un outil CLI qui prend votre dépôt git (ou dépôts, si vous vous sentez aventureux) et le transforme en un magnifique rapport HTML interactif avec des graphiques, des métriques et des insights qui pourraient bien vous faire remettre en question vos choix de vie (en bien... je crois).

Deux commandes principales :
* **`snitch`** — analyse un seul dépôt (top pour du stalking... je veux dire, comprendre... un projet spécifique)
* **`scattered`** — analyse plusieurs dépôts en une fois (parfait pour ce moment "oh mon dieu, qu'est-ce qu'on a créé")

Imaginez git log, mais avec de vraies couleurs, des graphiques, et des données que vous pouvez montrer au management sans qu'ils s'endorment. Pas state of the art, mais ça bat quand même `grep` ! 😊

## Démarrage rapide

```bash
npm install -g git-moar

cd mon-projet
git-moar snitch

# ou analysez plusieurs dépôts en une fois (les wildcards fonctionnent, magie oblige)
git-moar scattered ~/projets/*/

open git-moar-report.html  # ou xdg-open sur Linux, ou start sur Windows
```

## Qu'est-ce qu'il y a dans le rapport ?

Ah, la partie intéressante ! 15+ types de graphiques et plus de métriques que vous ne pouvez en secouer une branche.

### Métriques de qualité (parce qu'on fait semblant de s'en soucier)

* **Bus Factor** — combien de personnes doivent se faire écraser par un bus avant que votre projet meure ? Spoiler: probablement 1 pour la plupart d'entre nous
* **Code Churn** — lignes ajoutées vs supprimées, avec une répartition "qui supprime vraiment du code"
* **Health Score** — un chiffre pour vous sentir bien ou terrible
* **Coefficient de Gini** — inégalité des contributions, parce que l'économie peut tout ruiner

### Insights de productivité (pour prouver que vous ne glandez pas)

* **Heures de pointe** — vous commitez quand ? 3h du mat en mode café-fuel ou 9h-17h en mode esclavage corporate ?
* **Vélocité** — commits dans le temps, avec tendances et la chute inévitable "qu'est-ce qui s'est passé en décembre"
* **Équilibre vie pro/vie perso** — commits weekend vs semaine (préparez-vous à être jugé)

### Points chauds de fichiers ( les drama queens de votre dépôt)

* **Fichiers souvent modifiés** — des fichiers touchés plus souvent que votre téléphone
* **Silos de connaissance** — des fichiers qu'une seule personne touche jamais (recette pour le désastre)

### Autres trucs cools

* **Classification des commits** — vous écrivez des features, des fixes, de la doc, ou juste "update" ?
* **Scoring de qualité des messages** — vos messages de commit sont terribles comment ? (spoiler: probablement très)
* **Calendrier de contributions style GitHub** — montrez vos petits carrés verts (ou leur absence)
* **Tableaux de données triables** — filtrez et triez contributeurs, fichiers, commits, peu importe

## Visualisations

Le rapport utilise [Chart.js 4.4.0](https://www.chartjs.org/) pour tous les jolis graphiques, et laissez-moi vous dire, j'étais plutôt fier quand j'ai réussi les heatmaps. Voici ce que vous obtenez :

* Tendances d'activité dans le temps
* Graphiques de distribution des contributeurs
* Heatmaps de commits (horaire, quotidien, hebdomadaire)
* Patterns de modifications de fichiers
* Graphiques de code churn
* Et comme 10 autres trucs que j'ai oubliés parce qu'y en a trop

Thèmes sombre/clair aussi, parce que je suis pas un monstre qui vous force à fixer des écrans blancs à 2h du mat.

## Fonctionnalités avancées

### Templates (pour les control freaks)

Vous n'aimez pas mon magnifique rapport (lire: à peine fonctionnel) par défaut ? Créez vos propres templates. C'est un peu d'HTML avec des variables de template, et si vous cassez tout, bah... c'est vos oignons. J'ai fourni le template par défaut comme point de départ, mais vous pouvez faire ce que vous voulez.

### Options d'export

Parfois vous avez besoin de données pour des tableurs (ou ce boss qui exige des fichiers CSV pour je ne sais quelle raison). git-moar peut exporter en :

* **CSV** — parce qu'Excel règne toujours en maître dans le monde corporate apparemment
* **JSON** — pour quand vous voulez parser des trucs programmatiquement ou le balancer à une IA qui vous dit que votre dépôt est foutu

### Analyse multi-dépôts

La commande `scattered` est là où ça devient intéressant. Analysez plusieurs dépôts et obtenez des insights cross-projets. Vous voulez savoir quel dépôt a le plus de commits dans tout votre org ? Quels contributeurs s'étalent trop ? Qui ne commit rien nulle part ? (je te regarde, Dave).

Supporte les wildcards :

```bash
git-moar scattered ~/projets/*/
git-moar scattered ~/projets/git-*/
git-moar scattered ~/projets/*-backend/ ~/projets/*-frontend/
```

## Stack technique (trucs de nerds)

Construit avec :
* **Node.js** — parce que je suis trop paresseux pour apprendre Rust (traitez-moi)
* **Chart.js 4.4.0** — pour les graphiques, évidemment
* **Simple-Datatables** — pour les tableaux triables
* **Chalk** — pour la sortie colorée dans le terminal (la vie est trop courte pour le monochrome)
* **SLOC** — pour compter les lignes de code

En CLI. Pas de serveurs. Pas de cloud. Pas d'abonnements. Juste lancez et obtenez votre rapport. Privacy-focused par design (les données ne quittent jamais votre machine).

## Et maintenant ?

### Installer

```bash
npm install -g git-moar
```

Ou clonez et construisez si vous êtes de ceux qui ne font pas confiance à npm (je comprends).

### Lancer

```bash
# dépôt unique
git-moar snitch

# multi dépôt
git-moar scattered <chemin-vers-depots>/

# avec options (parce qu'y a toujours des options)
git-moar snitch --output mon-rapport.html --theme dark --since "2024-01-01"
```

Utilisez `git-moar snitch --help` ou `git-moar scattered --help` pour tous les flags. Pas mal, et j'ai probablement oublié d'en documenter certains, donc... bonne chance ?

### Partager

Le fichier HTML généré est autonome (graphiques intégrés et tout). Envoyez-le par mail, mettez-le sur un serveur, uploadez-le quelque part, peu importe. Juste un fichier. Pas de dépendances. Pas rien.

## La vérité brute

Regardez, git-moar est en v0.0.1. Ça marche, mais c'est pas parfait. J'ai créé ça parce que j'avais besoin de comprendre mes propres dépôts et les outils existants étaient soit trop complexes soit juste moches. C'est un peu un projet "dev au cerveau lissé", mais ça fait ce qui est écrit sur l'étiquette.

J'ai un PRD pour en faire un SaaS parce qu'apparemment les gens aiment payer pour des trucs qu'ils pourraient juste lancer en local. Si ça arrive, attendez-vous à plus de features, des graphiques plus fancy, et peut-être même des trucs de collaboration en équipe.

Pour l'instant, c'est gratuit, open source, et attend que vous trouviez tous les bugs que j'ai manqués (je suis sûr qu'il y en a plein).

## Feedback et contributions

Comme pour tous mes projets, je suis基本上 le seul utilisateur, donc trouver des bugs devient plus dur. Si vous en trouvez un, ou avez une idée de feature, ou juste voulez me dire que mon goût en couleurs de graphiques est terrible (je le sais), allez sur le [dépôt GitHub](https://github.com/DimitriGilbert/git-report) et ouvrez une issue.

Les pull requests sont bienvenues aussi, si vous voulez corriger mon code terrible ou ajouter un truc cool. Juste... essayez pas de tout casser trop badly, OK ?

## C'est quoi un nom ?

"git-moar" c'est parce que c'est git, mais avec PLUS. Plus de graphiques, plus de métriques, plus de trucs. Aussi je suis nul pour nommer les choses.

Publié comme "git-report" sur npm parce que... bah, j'ai oublié de vérifier si le nom était pris. Oups. Donc `npm install git-report` vous donnera git-moar. Je sais, je sais, c'est confus. On vit avec nos erreurs.

## Pensées de fin

Merci d'avoir lu jusqu'ici. J'espère que vous trouverez git-moar utile (ou au moins moyennement divertissant). Même si vous ne l'utilisez pas, peut-être que regarder votre historique git d'une manière différente vous donnera quelques insights. Ou au moins quelques graphiques amusants à partager à la prochaine réunion d'équipe.

Allez, analysez vos dépôts, et que votre bus factor ne soit jamais 1 !

{{% goodbye %}}
