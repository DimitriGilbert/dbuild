---
title: RaceBench fr
date: 2025-01-17T10:00:00+01:00
summary: "Faire s'affronter des LLMs pour voir qui écrit le meilleur JavaScript. Spoiler: c'est le chaos complet !"
tags:
  - benchmark
  - llm
  - ai
  - testing
  - french
slug: "index"
---

_Ce contenu a été généré par le modèle AI GLM 4.7 et not-ai-writer_

Alors, vous voyez comme tout le monde benchmarke des LLMs en ce moment ? Genre, "oh regarde, ce modèle a score 87,3% sur cette suite de tests synthétique" ou quoi que ce soit dans le genre. Ennuyeux, non ? Je veux dire, on s'en fiche de savoir si un modèle peut inverser une chaîne parfaitement quand on ne lui demandera jamais d'inverser une chaîne dans la vraie vie ? 😛

C'est pour ça que j'ai créé **RaceBench** — un outil de benchmark qui teste vraiment quelque chose d'utile. À quel point différents LLMs peuvent écrire du code JavaScript réel qui fonctionne. Pas des trucs de "hello world" nuls, mais de vraies tâches de code créatif — des jeux, des visualisations, des trucs interactifs que vous pourriez vraiment vouloir construire.

## L'idée (parce que tout projet a besoin d'une histoire d'origine)

Un jour j'étais curieux: si je demande à différents modèles d'IA d'écrire le même jeu, lequel produirait vraiment du code jouable ? Pas du code "techniquement correct mais qui plante à la troisième frame", mais des trucs qu'on pourrait lancer et apprécier.

Donc j'ai créé un benchmark où je demande aux modèles de construire un jeu de tir scroll 2D en utilisant Three.js. Pas vraiment "mode facile" pour une IA — ça demande de comprendre la 3D, les boucles de jeu, les entrées utilisateur, et de faire tout fonctionner ensemble sans faire exploser le navigateur. Spoiler: certains modèles gèrent ça magnifiquement, d'autres... enfin, disons que c'est éducatif de les essayer 😊

## Ce que ça fait vraiment

RaceBench est un dashboard HTML statique qui affiche les résultats de tests de divers LLMs sur la génération de code JavaScript. Voici la partie cool:

- **Benchmarking réel** — on teste des tâches de code créatif, pas des trucs synthétiques du genre "inverse cette chaîne"
- **Résultats exécutables** — la sortie de chaque modèle peut être lancée directement. Voyez le code, cliquez sur preview, jugez par vous-même
- **Analyse multi-dimensionnelle** — pas juste "ça a marché ?" On tracke les tokens de prompt, les tokens de complétion, le TTFT (temps jusqu'au premier token), le temps de génération, et le taux de succès
- **Valeur éducative** — comparez comment différents modèles structurent leur code, leurs approches au même problème, et apprenez de la variété (même des mauvais !)

## Comment ça marche (les bits techniques, moins les parties ennuyeuses)

### Le setup

Tout est statique — du HTML/CSS/JS pur sans backend. Déployez-le n'importe où. GitHub Pages ? Sûr. Netlify ? Pourquoi pas. Votre Raspberry Pi à la maison ? Absolument. Le tout pèse à peu près le poids d'un petit hamster 🐹

```bash
git clone https://github.com/DimitriGilbert/racebench.git

# Deploy to GitHub Pages (or your jungle site of choice)
# I mean, whatever floats your boat
```

### Le cas de test

Le benchmark utilise un jeu de tir scroll 2D construit avec Three.js comme scénario de test. Chaque modèle reçoit le même prompt et doit produire du code qui fonctionne. On extrait le dernier bloc de code ```runjs de chaque réponse (parce que les modèles adorent discuter avant de vous donner la marchandise, vous voyez ?).

### Ce qu'on tracke

Pour chaque modèle, RaceBench capture:

- **Prompt tokens** — combien il en a eu besoin pour comprendre ce qu'on voulait
- **Completion tokens** — à quel point il a été verbeux avec la solution
- **TTFT** (Time To First Token) — métriques de réactivité
- **Generation time** — temps total pour produire le code
- **Success rate** — ça a vraiment tourné ? Ou ça a explosé ?

### L'UI (parce que je me soucie de l'esthétique, étonnamment)

Une superbe interface dark mode qui n'a pas l'air d'avoir été conçue par un admin sys en 2003. Deux modes de vue:

- **Grille de cartes** — de belles cartes pour chaque modèle avec les métriques clés en un coup d'œil
- **Tableau triable** — pour quand vous voulez faire le data-nerd et trier par TTFT ou nombre de tokens

Cliquez sur n'importe quel modèle et vous obtenez:
- Live preview (s'ouvre dans un nouvel onglet, lance le vrai code)
- Vue de la réponse brute (voyez exactement ce que le modèle a dit)
- Toutes les métriques détaillées

## Versions (parce que le logiciel ne se termine jamais)

### v1: Le début courageux

Testé 18 modèles. Appris beaucoup. Réalisé que certains modèles sont impressionnamment créatifs tandis que d'autres sont... essaient leur meilleur. Mettons les choses comme ça. 😛

### v2: Le raffinement

Réduit à 10 modèles. Meilleure extraction des métriques. UI plus propre. Toujours à regarder les modèles galérer avec Three.js de manière amusante.

## Stack technique (gardé simple, de rien)

- **Node.js** — parce que JavaScript est la vie
- **Tailwind CSS (via CDN)** — du style sans les maux de tête de build
- **Simple-Datatables** — pour quand vous voulez des tableaux triables mais ne voulez pas les écrire vous-même
- **Three.js (dynamique)** — chargé à la demande pour les previews en direct

Dépendances minimales. Pas de pipelines de build complexes. Juste ça marche. J'aime cette philosophie.

## Les modèles (participants dans le chaos)

On a testé plein de grands noms:

- Claude Sonnet 4
- DeepSeek R1
- GPT-4.1
- Gemini 2.5
- Grok 4
- Kimi K2
- Qwen3
- ...et plus

Chacun apporte sa propre personnalité au code. Certains sont laconiques et efficaces. D'autres sont verbeux et sur-ingénierés. Quelques-uns produisent du code qui vous fait remettre en question tout ce que vous savez sur le développement logiciel. Tous éducatifs à leur manière 😊

## Voyez-le en action

Ne me croyez pas sur parole — allez jouer avec le vrai dashboard:

**[Démo Live](https://dimitrigilbert.github.io/racebench/scroller/index.html)**

Cliquez autour. Lancez du code. Voyez quel modèle vous voudriez dans votre équipe. Spoiler: la réponse pourrait vous surprendre (ou elle pourrait être exactement ce que vous attendez. Les LLMs sont bizarres comme ça).

## Ce qui rend ça différent des autres benchmarks ?

Je suis ravi que vous demandiez (je sais que vous n'avez pas demandé, mais faites semblant) 😛

1. **Vraies tâches, pas problèmes jouets** — on teste du code créatif réel, pas des trucs du genre "trie ce tableau"
2. **Vous pouvez lancer les résultats** — pas juste un score, du vrai code qui fonctionne que vous pouvez inspecter et exécuter
3. **Pas de serveur nécessaire** — HTML statique signifie que vous pouvez l'héberger n'importe où ou même le lancer localement
4. **Métriques transparentes** — voyez exactement ce qu'on a mesuré et comment
5. **Éducatif** — comparez les approches, apprenez des patterns, voyez ce qui marche (et ce qui ne marche DEFINITIVEMENT pas)

## Ce que j'ai appris (parce que construire des trucs vous apprend des choses)

- Certains modèles sont étonnamment bons en code graphique 3D
- D'autres n'ont clairement pas vu beaucoup d'exemples Three.js dans leur entraînement
- Le TTFT ne correlate pas toujours avec la qualité du code
- Les modèles verbeux ne sont pas nécessairement meilleurs — parfois ils sont juste... bavards
- Le meilleur modèle dépend de ce que vous valorisez: vitesse, efficacité, clarté du code, ou juste avoir quelque chose qui tourne

## Plans futurs (la section "si je m'y retrouve")

J'aimerais:

- Ajouter plus de cas de test (différents types de défis de code créatif)
- Tester plus de modèles (de nouveaux surgissent comme des champignons)
- Améliorer les métriques (peut-être ajouter un scoring de qualité du code ?)
- Ajouter une vue "leaderboard" pour ceux qui adorent les classements
- Peut-être, possiblement, contribuer les données à un effort de benchmark plus large (si un tel truc existe et veut ce genre de données du monde réel)

Mais soyons honnêtes — j'ajouterai probablement un nouveau cas de test avant de me souvenir de faire quoi que ce soit de tout ça. Les priorités, quoi ? 😊

## Conclusion

RaceBench n'essaie pas d'être le benchmark AI définitif. C'est juste moi qui essaie de répondre à une question simple: "Quelle IA écrit le meilleur code JavaScript pour des projets réels ?" Et m'amuse à les voir tous essayer.

Si vous le trouvez utile, super. Si vous apprenez quelque chose des différents styles de code, encore mieux. Si vous aimez juste cliquer à travers des previews en direct de jeux générés par IA et penser "wow, ça marche vraiment," alors j'ai fait mon boulot.

N'hésitez pas à le forker, ajouter vos propres modèles, tester différents prompts. Plus il y a de données, mieux c'est. Ne me demandez pas quel modèle est "le meilleur" — ça dépend de ce que vous construisez, votre timeline, votre budget, et probablement la phase de la lune. Les LLMs sont comme ça 😛

**GitHub:** [DimitriGilbert/racebench](https://github.com/DimitriGilbert/racebench)

Maintenant allez faire la course à quelques modèles. Que le meilleur code gagne.

{{% goodbye %}}
