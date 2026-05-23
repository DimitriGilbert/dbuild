import { getAllPosts, getAllTagSummaries, getTranslationPosts } from "@/lib/blog"
import type { BlogPost, TagSummary } from "@/lib/blog"
import { getAllProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects"
import { formatCanonicalUrl, formatTaxonomySlug } from "@/lib/seo"

export interface AgentProjectEntry {
  id: string
  type: "project"
  title: string
  url: string
  summary: string
  repository: string
  website: string | null
  image: string
  tags: string[]
  relatedArticles: AgentRelatedEntry[]
}

export interface AgentArticleEntry {
  id: string
  type: "article"
  title: string
  url: string
  summary: string
  language: string | null
  alternateLanguages: AgentLanguageAlternate[]
  tags: string[]
  category: string
  publishedAt: string
  updatedAt: string | null
  readTimeMinutes: number
  relatedProjects: AgentRelatedEntry[]
}

export interface AgentTagEntry {
  id: string
  type: "tag"
  title: string
  url: string
  count: number
}

export interface AgentCorpusIndex {
  site: {
    name: string
    url: string
    description: string
    defaultLanguage: "en"
    languages: string[]
  }
  generatedAt: string
  stats: {
    projects: number
    articles: number
    tags: number
  }
  discovery: {
    llms: string
    llmsFull: string
    sitemap: string
    robots: string
  }
  projects: AgentProjectEntry[]
  articles: AgentArticleEntry[]
  tags: AgentTagEntry[]
}

export interface AgentRelatedEntry {
  id: string
  title: string
  url: string
}

export interface AgentLanguageAlternate {
  language: string
  url: string
}

function getRepositoryName(repoUrl: string): string | null {
  const repositoryName = repoUrl.split("/").filter(Boolean).at(-1)
  return repositoryName ? repositoryName.replace(/\.git$/, "") : null
}

function getProjectIdentitySlugs(project: Project): Set<string> {
  const candidates = [
    project.name,
    project.id,
    getRepositoryName(project.repo),
  ].filter((candidate): candidate is string => Boolean(candidate))

  return new Set(
    candidates
      .map((candidate) => formatTaxonomySlug(candidate))
      .filter((candidate) => candidate.length > 0)
  )
}

function isProjectArticle(post: BlogPost, projectSlugs: Set<string>): boolean {
  const postSignals = [
    post.title,
    post.translationKey ?? "",
    post.directory,
    ...post.tags,
  ].map((signal) => formatTaxonomySlug(signal))

  return postSignals.some((signal) =>
    Array.from(projectSlugs).some(
      (projectSlug) => signal === projectSlug || signal.includes(projectSlug)
    )
  )
}

function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function getProjectArticles(project: Project, posts: BlogPost[]): BlogPost[] {
  const projectSlugs = getProjectIdentitySlugs(project)
  return sortPostsByDate(
    posts.filter((post) => isProjectArticle(post, projectSlugs))
  )
}

function getArticleProjects(post: BlogPost, projects: Project[]): Project[] {
  return projects.filter((project) =>
    isProjectArticle(post, getProjectIdentitySlugs(project))
  )
}

function createArticleRelatedEntry(post: BlogPost): AgentRelatedEntry {
  return {
    id: `article:${post.slug}`,
    title: post.title,
    url: formatCanonicalUrl(`/blog/${post.slug}`),
  }
}

function createProjectRelatedEntry(project: Project): AgentRelatedEntry {
  return {
    id: `project:${project.id}`,
    title: project.name,
    url: formatCanonicalUrl(`/projects/${project.id}`),
  }
}

function createProjectEntry(project: Project, posts: BlogPost[]): AgentProjectEntry {
  return {
    id: `project:${project.id}`,
    type: "project",
    title: project.name,
    url: formatCanonicalUrl(`/projects/${project.id}`),
    summary: project.description,
    repository: project.repo,
    website: project.site,
    image: project.image,
    tags: project.tags,
    relatedArticles: getProjectArticles(project, posts).map(createArticleRelatedEntry),
  }
}

function createLanguageAlternates(post: BlogPost): AgentLanguageAlternate[] {
  if (!post.lang || !post.translationKey) {
    return []
  }

  const alternates = getTranslationPosts(post)
    .filter((translationPost) => translationPost.lang)
    .map((translationPost) => ({
      language: translationPost.lang as string,
      url: formatCanonicalUrl(`/blog/${translationPost.slug}`),
    }))

  return [
    {
      language: post.lang,
      url: formatCanonicalUrl(`/blog/${post.slug}`),
    },
    ...alternates,
  ].sort((a, b) => a.language.localeCompare(b.language))
}

function createArticleEntry(post: BlogPost, projects: Project[]): AgentArticleEntry {
  return {
    id: `article:${post.slug}`,
    type: "article",
    title: post.title,
    url: formatCanonicalUrl(`/blog/${post.slug}`),
    summary: post.description,
    language: post.lang ?? null,
    alternateLanguages: createLanguageAlternates(post),
    tags: post.tags,
    category: post.category,
    publishedAt: post.date,
    updatedAt: post.updatedAt ?? null,
    readTimeMinutes: post.readTime,
    relatedProjects: getArticleProjects(post, projects).map(createProjectRelatedEntry),
  }
}

function createTagEntry(tag: TagSummary): AgentTagEntry {
  return {
    id: `tag:${tag.slug}`,
    type: "tag",
    title: tag.name,
    url: formatCanonicalUrl(`/blog/tags/${tag.slug}`),
    count: tag.count,
  }
}

export function getAgentCorpusIndex(): AgentCorpusIndex {
  const projects = getAllProjects()
  const posts = getAllPosts().filter((post) => !post.isCategory)
  const tags = getAllTagSummaries()

  return {
    site: {
      name: "Dbuild.dev",
      url: formatCanonicalUrl(),
      description:
        "Portfolio and blog about developer tools, AI, agents, local-first apps, and experiments.",
      defaultLanguage: "en",
      languages: ["en", "fr"],
    },
    generatedAt: new Date().toISOString(),
    stats: {
      projects: projects.length,
      articles: posts.length,
      tags: tags.length,
    },
    discovery: {
      llms: formatCanonicalUrl("/llms.txt"),
      llmsFull: formatCanonicalUrl("/llms-full.txt"),
      sitemap: formatCanonicalUrl("/sitemap.xml"),
      robots: formatCanonicalUrl("/robots.txt"),
    },
    projects: projects.map((project) => createProjectEntry(project, posts)),
    articles: posts.map((post) => createArticleEntry(post, projects)),
    tags: tags.map(createTagEntry),
  }
}
