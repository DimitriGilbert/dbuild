---
date: "2025-01-17T10:00:00+01:00"
lang: "fr"
translationKey: "project-task-o-matic"
title: Task-O-Matic, votre abri de survie IA pour le chaos des projets
summary: Transformez des idées de projet chaotiques en listes de tâches structurées et exécutables grâce à l'IA. Bienvenue dans le bunker, citoyen !
tags:
  - ai
  - task-management
  - cli
  - productivity
  - task-o-matic
  - french
toc: true
slug: "index"
---

_Ce contenu a été généré par le modèle AI GLM 4.7 et not-ai-writer_

Alors. Qui ici a des **idées de projets** ? Et parmi ces idées, certaines se transforment en... euh, vraies tâches, non ?

Ok ok, alors, donnez-moi un plan structuré, des tâches détaillées, et tout ce qui ressemble à de l'ordre. Genre, MAINTENANT !

Ouais...c'est bon. On est tous passés par là 😛.

Le wasteland des pensées désorganisées est un endroit dangereux. Mais pas de souci — je nous ai construit un bunker.

## Bienvenue dans le Bunker 🏚️

[Task-O-Matic](https://github.com/DimitriGilbert/task-o-matic) est un système de gestion de tâches propulsé par l'IA avec un thème de bunker de survie post-apocalyptique (parce que pourquoi pas ?). Il prend vos idées de projet chaotiques et les transforme en listes de tâches structurées et exécutables grâce à l'IA.

Considérez ça comme votre commandant de tâches personnel dans les suites d'une anarchie de projet.

## Ce que ça fait vraiment 📋

Task-O-Matic n'est pas state of the art — je suis pas un putain de chercheur en IA — mais ça *marche*. Et c'est plutôt utile pour nous, habitants de bunker :

- **Idée vers PRD** : Prenez votre idée à moitié cuite et laissez l'IA la transformer en un vrai Product Requirements Document
- **PRD vers tâches** : Découpez ce PRD en vraies tâches faisables
- **Amélioration propulsée par l'IA** : Laissez l'IA améliorer, diviser et planifier vos tâches
- **Génération multi-IA** : Lancez plusieurs modèles d'IA en parallèle et comparez les résultats (style battle royale)
- **Intégration d'outils externes** : Connectez-vous à Opencode, Claude Code, Gemini CLI, et plus
- **Benchmarking** : Testez différents modèles d'IA avec l'isolation git worktree (un jour peu etre ca sera tester, pour le moment, c'est pure vibe :P)
- **Projets existants** : Attachez Task-O-Matic à des projets que vous avez déjà commencés (`init attach`)
- **Local-first** : Tout vit dans `.task-o-matic` (les archives du bunker)
- **Découpage hiérarchique** : Sous-tâches, sous-sous-tâches, sous-sous-sous... vous voyez l'idée
- **Réponses en streaming** : Regardez l'IA réfléchir avec les tokens de raisonnement

## La stack technique 🔧

Construit avec des outils qui ont survécu à l'apocalypse :

- **TypeScript** — la sûreté des types, c'est la sûreté de survie
- **Bun** — rapide (nécessaire quand on fui les générateurs)
- **Vercel AI SDK v6** — la magie derrière le rideau IA
- **Commander.js** — parsing CLI (je sais un truc ou deux sur les outils CLI...)
- **Inquirer.js** — prompts interactifs (pour les décisions du bunker)
- **Zod** — validation de schéma (pas de données corrompues dans les archives)

- Démarrage rapide ⚡

Oh, je sais que vous êtes impatient. (Moi aussi...)

```bash
git clone https://github.com/DimitriGilbert/task-o-matic.git
cd task-o-matic
bun install
bun link
task-o-matic init attach
task-o-matic prd generate "Build a survival bunker dashboard"
task-o-matic prd parse
task-o-matic task enhance --all
task-o-matic task execute --ai claude
```

Voilà.

## Installation 🔨

```bash
git clone https://github.com/DimitriGilbert/task-o-matic.git
cd task-o-matic
bun install
bun link
```

Ou via npm si vous préférez les vieilles méthodes : `npm install -g @dimitrigilbert/task-o-matic`

## Configuration 🔑

Task-O-Matic a besoin de clés API. Configurez-les comme variables d'environnement :

```bash
export OPENAI_API_KEY="your-key"
export ANTHROPIC_API_KEY="your-key"
export GOOGLE_API_KEY="your-key"
export OPENROUTER_API_KEY="your-key"
```

Mettez ça dans `.env` ou votre profil de shell. Évidemment, les commit pas dans git.

## Comment ça marche 🚀

### Initialiser

```bash
task-o-matic init attach    # attacher à un projet existant
task-o-matic init new my-project   # ou en créer un nouveau
```

Crée un répertoire `.task-o-matic`. Comme la salle de stockage de votre bunker.

### Générer un PRD

```bash
task-o-matic prd generate "I want to build a personal finance tracker that works offline, syncs when online, and has dark mode because bunker lights are harsh"
```

L'IA va vous interviewer (via les prompts inquirer) pour clarifier les requis et générer un vrai PRD.

### Parser en tâches

```bash
task-o-matic prd parse
```

Découpe votre PRD en tâches hiérarchiques, sous-tâches, sous-sous-tâches. Organisées par priorité et dépendances.

### Améliorer et planifier

```bash
task-o-matic task enhance --all
task-o-matic task plan
task-o-matic task split --id task-123
```

### Exécuter

```bash
task-o-matic task execute --id task-123 --ai claude
task-o-matic task execute --all --ai claude,gemini,gpt4
task-o-matic task execute --id task-123 --tool opencode
```

L'IA lit la description de la tâche et le contexte, génère du code ou de la documentation. Vous reviewez avant de committer.

## Multi-IA 🤖

Lancez plusieurs modèles d'IA en parallèle :

```bash
task-o-matic task generate-multi \
  --id task-123 \
  --providers claude,gpt4,gemini \
  --compare
```

Voyez différentes approches. Vérifiez la meilleure solution. Comme avoir un conseil d'experts IA dans votre bunker 😊

## Benchmarking 📊

```bash
task-o-matic benchmark run \
  --models claude,gpt4,gemini \
  --task-set my-tasks
task-o-matic benchmark results
task-o-matic benchmark compare --run-id run1,run2
```

Utilise les git worktrees. Environnements propres. Pas de contamination !

## Stockage local-first 💾

Tout vit dans `.task-o-matic/` :

```
.prds/           # Product Requirements Documents
tasks/          # Définitions de tâches et statuts
history/        # Historique d'exécution
benchmarks/     # Résultats de benchmark
config.json     # Votre configuration
```

Pas de cloud. Pas de données qui quittent votre bunker (sauf si vous le choisissez). Vos données, vos règles.

## Streaming avec tokens de raisonnement 🧠

```bash
task-o-matic task execute --id task-123 --stream
```

Affiche les tokens de raisonnement au fur et à mesure qu'ils sont générés. Fascinant de voir comment l'IA aborde les problèmes (parfois de façons que je n'aurais pas attendues, ce qui est bon).

## Pourquoi le thème bunker ? 🤔

Je sais, je sais. C'est bizarre. mais voilà le truc :

1. C'est fun 😛
2. Les projets ressemblent à des wastelands chaotiques
3. Un système structuré ressemble à la construction d'un abri sûr
4. "Bunker" est une super métaphore pour le dev local-first et isolé
5. Pourquoi pas ?

Et puis, appeler les utilisateurs "citoyens" et les projets "missions" me fait pouffer. Si ça vous fait sourire aussi, alors ça en vaut la peine.

## Statut actuel 🚧

Task-O-Matic est en **v0.1.5-beta.1**. Des trucs peuvent casser. Des features peuvent changer. Mais la fonctionnalité core marche.

Si vous trouvez des bugs (et je suis sûr qu'il y a des nids), ouvrez une issue sur [GitHub](https://github.com/DimitriGilbert/task-o-matic/issues). Je suis le seul utilisateur pour l'instant, donc trouver des bugs devient... challengeant 😊

## Et après ? 🔮

- Plus d'intégrations de providers IA
- Web UI (parce que certains préfèrent les interfaces graphiques)
- Collaboration d'équipe (coordination multi-bunker)
- Système de plugins pour outils custom
- Meilleure visualisation des dépendances
- Templates de tâches pour types de projets communs
- Intégration CI/CD

Sujet à changement selon ce que le wasteland nous balance.

## Impliquez-vous ! 🤝

C'est un side project que j'ai construit dont j'avais besoin. Si vous le trouvez utile, c'est awesome. Si vous voulez contribuer, encore mieux !

Star le repo. Ouvrez des issues. Soumettez des PRs. Partagez-le avec d'autres habitants de bunker.

## Pensées finales 💭

Task-O-Matic va pas révolutionner la gestion de projet ou quoi que ce soit de grand. C'est juste un outil que j'ai construit pour m'aider (et vous je l'espère) à transformer des idées chaotiques en tâches organisées et exécutables.

C'est pas parfait. C'est pas le code le plus élégant que j'aie jamais écrit. Mais ça marche. C'est utile. Et c'est le mien.

Si vous coulez dans le chaos de projet et avez besoin d'une approche structurée pour découper les choses, essayez-le. Dans le pire des cas, vous aurez un outil CLI cool avec un thème bunker.

Dans le meilleur des cas, vous livrerez enfin ce projet auquel vous pensez depuis des mois.

Restez prudents là-dehors dans le wasteland, citoyen. Et bon code !

---

{{% goodbye %}}
