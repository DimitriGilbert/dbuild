---
title: LiteChat - A local first and self hostable AI chat app for power user
date: 2025-07-04T11:40:17+01:00
tags:
  - ai
  - chat
  - local
  - server
summary: A smallish presentation of my project LiteChat !
slug: "index"
---

Hello everyone, I’d like to introduce LiteChat, a project I created.

[Repository](https://github.com/DimitriGilbert/LiteChat) and download link [here](https://github.com/DimitriGilbert/LiteChat/releases) (available in French, English, Spanish, Italian, and German).

LiteChat is an AI chat application I built to interact with both local and remote LLMs—all within your browser. It’s designed with a "local-first" philosophy, requiring only an HTTP server to run, with everything else handled in your browser! No tracking, no accounts—you bring your own API keys. Data is saved in an IndexedDB database, and you can synchronize your conversations using Git.

Yes, entirely in the browser! 😛 To make this work, I also implemented a virtual file system (again, all in the browser). You can clone repos and include files from the VFS in your conversations! But manually selecting files was tedious, so I integrated tools for managing the VFS and Git.

With the core architecture in place, I added support for HTTP MCP servers. However, standard stdio servers were still missing, so I also built a bridge (rewritten by AI from `mcp-proxy`) to make them work (you can deploy it anywhere, but it’s not secure!).

Sure, AI is fun, but I was getting tired of text-only interactions. So, I added support for Mermaid diagrams and HTML forms (now you don’t even need to think about how to phrase your requests!). Sure, Mermaid diagrams aren’t the prettiest, but since I added a workflow module with visualizations based on [reactflow.dev](https://reactflow.dev), I also included a way for LLMs to generate them! And since plain text isn’t very engaging, there’s also a "Beat" block that uses [strudel.cc](http://strudel.cc/) to add auditory feedback.

Testing was getting repetitive, so I created a prompt library with templates—now you just fill in a form! (Okay, maybe I also needed it for workflows…)

What’s an Agent, you ask? It’s a system prompt, tools, and task-specific prompts! So, you also get a library for those.

Prompts and agents can integrate into workflows (that’s what they’re designed for!), but you also have transformation steps, user code execution, and custom prompts to facilitate transitions.

As you might have guessed, if I have a way to execute code in workflows, why not run AI-generated code? Yes, you can! In Python or JavaScript. And if you’re feeling adventurous, you can run JavaScript in "unsafe" mode (`eval` and all—that’s code for "yolo" 😆). This can produce cool stuff, like [this one-shot Three.js scroll shooter](https://dimitrigilbert.github.io/racebench/scroller/index.html). You can export it in one click (the template is a bit ugly, but I’ll improve it!).

To avoid losing context, all these UI blocks can be "activated" (or rather, suggested) using rules. Of course, you can add your own rules! There’s even a button to ask the AI to pick the best ones for your current prompt.

You also get the usual regenerate (with a different model if you like) and forking options. You can even edit responses manually to remove unnecessary parts. Code blocks are also editable with syntax highlighting for common languages (but no autocompletion or fancy features—let’s not push grandma into the bushes!).

To top it all off, you can organize AI "races" with an unlimited number of participants (though that depends on your budget, haha). It’s great for benchmarking or seeing which model will replace us first. I even built a small tool that takes exported race conversations and turns them into a benchmark site (currently more focused on the JS execution block: [https://dimitrigilbert.github.io/racebench/scroller/index.html](https://dimitrigilbert.github.io/racebench/scroller/index.html) for the "game" mentioned earlier).

I’m sure I forgot a few things, but you’ve got the gist! 😊

The hosted version is on GitHub Pages, with no tracking and no accounts! You bring your own API keys. You probably won’t be able to use the hosted version for your local LLM due to HTTPS/HTTP restrictions, but as I said, you can [download it](https://github.com/DimitriGilbert/LiteChat/releases) and host it with a simple HTTP server. There are also localized versions for French, Italian, German, and Spanish. A short (and incomplete) tutorial playlist if you’re feeling lost: [https://www.youtube.com/playlist?list=PL5Doe56gCsNRdNyfetOYPQw_JkPHO3XVh](https://www.youtube.com/playlist?list=PL5Doe56gCsNRdNyfetOYPQw_JkPHO3XVh)

I hope you enjoy it, and constructive feedback is greatly appreciated! 😊

---
