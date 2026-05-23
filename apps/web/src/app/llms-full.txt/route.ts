import { getAgentCorpusIndex } from "@/lib/agent-corpus"

export const dynamic = "force-static"

export function GET(): Response {
  const corpus = getAgentCorpusIndex()
  const body = [
    "# Dbuild.dev Full Agent Guide",
    "",
    corpus.site.description,
    "",
    "## Discovery",
    "",
    `- Site: ${corpus.site.url}`,
    `- Corpus index: ${corpus.site.url}index.json`,
    `- Content index mirror: ${corpus.site.url}api/content/index.json`,
    `- Sitemap: ${corpus.discovery.sitemap}`,
    `- Robots: ${corpus.discovery.robots}`,
    "",
    "## Stats",
    "",
    `- Projects: ${corpus.stats.projects}`,
    `- Articles: ${corpus.stats.articles}`,
    `- Tags: ${corpus.stats.tags}`,
    `- Languages: ${corpus.site.languages.join(", ")}`,
    "",
    "## Projects",
    "",
    ...corpus.projects.flatMap((project) => [
      `### ${project.title}`,
      "",
      `- URL: ${project.url}`,
      `- Repository: ${project.repository}`,
      `- Website: ${project.website ?? "none"}`,
      `- Tags: ${project.tags.join(", ") || "none"}`,
      `- Summary: ${project.summary}`,
      `- Related articles: ${project.relatedArticles.length}`,
      ...project.relatedArticles.map(
        (article) => `  - [${article.title}](${article.url})`
      ),
      "",
    ]),
    "## Articles",
    "",
    ...corpus.articles.flatMap((article) => [
      `### ${article.title}`,
      "",
      `- URL: ${article.url}`,
      `- Language: ${article.language ?? "unknown"}`,
      `- Published: ${article.publishedAt}`,
      `- Updated: ${article.updatedAt ?? "unknown"}`,
      `- Category: ${article.category}`,
      `- Tags: ${article.tags.join(", ") || "none"}`,
      `- Summary: ${article.summary}`,
      `- Related projects: ${article.relatedProjects.map((project) => project.title).join(", ") || "none"}`,
      `- Language alternates: ${article.alternateLanguages.map((alternate) => `${alternate.language} ${alternate.url}`).join(", ") || "none"}`,
      "",
    ]),
    "## Tags",
    "",
    ...corpus.tags.map((tag) => `- [${tag.title}](${tag.url}) (${tag.count})`),
  ].join("\n")

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  })
}
