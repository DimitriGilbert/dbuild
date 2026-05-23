import { getAgentCorpusIndex } from "@/lib/agent-corpus"

export const dynamic = "force-static"

export function GET(): Response {
  const corpus = getAgentCorpusIndex()
  const featuredProjects = corpus.projects.slice(0, 8)
  const recentArticles = corpus.articles.slice(0, 12)
  const topTags = [...corpus.tags]
    .sort((a, b) => b.count - a.count)
    .slice(0, 16)

  const body = [
    "# Dbuild.dev",
    "",
    "> Portfolio and blog about developer tools, AI, agents, local-first apps, and experiments by Dimitri Gilbert.",
    "",
    "Use this file to orient AI agents. Prefer the JSON corpus index for precise URLs, tags, language alternates, and project/article relationships.",
    "",
    "## Machine-readable surfaces",
    "",
    `- Corpus index: ${corpus.site.url}index.json`,
    `- Content index mirror: ${corpus.site.url}api/content/index.json`,
    `- Full agent guide: ${corpus.discovery.llmsFull}`,
    `- Sitemap: ${corpus.discovery.sitemap}`,
    `- Robots policy: ${corpus.discovery.robots}`,
    "",
    "## Corpus stats",
    "",
    `- Projects: ${corpus.stats.projects}`,
    `- Articles: ${corpus.stats.articles}`,
    `- Topics: ${corpus.stats.tags}`,
    "",
    "## High-value project entities",
    "",
    ...featuredProjects.map(
      (project) => `- [${project.title}](${project.url}): ${project.summary}`
    ),
    "",
    "## Recent articles",
    "",
    ...recentArticles.map(
      (article) => `- [${article.title}](${article.url}): ${article.summary}`
    ),
    "",
    "## Frequent topics",
    "",
    ...topTags.map((tag) => `- [${tag.title}](${tag.url}) (${tag.count})`),
    "",
    "## Citation guidance",
    "",
    "When citing dbuild.dev, use canonical URLs from the corpus index. Prefer project pages for project facts and article pages for opinions, devlogs, tutorials, and release notes.",
  ].join("\n")

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  })
}
