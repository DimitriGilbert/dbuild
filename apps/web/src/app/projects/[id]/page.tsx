import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Github, ExternalLink, ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react"

import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/blog"
import type { BlogPost } from "@/lib/blog"
import { getProjectById, getAllProjects } from "@/lib/projects"
import type { Project } from "@/lib/projects"
import {
  OPEN_GRAPH_LOCALE,
  SITE_NAME,
  createBreadcrumbListJsonLd,
  createProjectJsonLd,
  createNotFoundMetadata,
  formatAbsoluteImageUrl,
  formatCanonicalUrl,
  formatTaxonomySlug,
  formatTitle,
  serializeJsonLd,
} from "@/lib/seo"

interface ProjectPageProps {
  params: Promise<{ id: string }>
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

function isProjectPost(post: BlogPost, projectSlugs: Set<string>): boolean {
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

function getRelatedProjectPosts(project: Project): BlogPost[] {
  const projectSlugs = getProjectIdentitySlugs(project)

  return getAllPosts().filter((post) => !post.isCategory && isProjectPost(post, projectSlugs)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    return createNotFoundMetadata("Project Not Found")
  }

  const url = formatCanonicalUrl(`/projects/${id}`)
  const title = formatTitle(project.name)
  const description = project.description
  const image = formatAbsoluteImageUrl(project.image)
  const metadataLinks: NonNullable<Metadata["other"]> = {
    "project:repository": project.repo,
  }

  if (project.site) {
    metadataLinks["project:website"] = project.site
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      locale: OPEN_GRAPH_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: metadataLinks,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  const projectJsonLd = createProjectJsonLd({
    project,
    pathname: `/projects/${id}`,
  })
  const relatedPosts = getRelatedProjectPosts(project)
  const breadcrumbJsonLd = createBreadcrumbListJsonLd([
    { name: "Home", pathname: "/" },
    { name: "Projects", pathname: "/projects" },
    { name: project.name, pathname: `/projects/${id}` },
  ])

  return (
    <div className="min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Link href="/projects">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>

          <article>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd) }}
            />
            <header className="mb-8">
              <div className="aspect-video overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <Button asChild>
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  {project.site && (
                    <Button variant="outline" asChild>
                      <a href={project.site} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>

                {project.readTime && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.readTime} min read
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {project.content && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownRenderer content={project.content} />
              </div>
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-16 border-t border-border pt-10" aria-labelledby="project-articles-heading">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-2 text-sm font-mono uppercase tracking-[0.3em] text-primary">
                      Project logbook
                    </p>
                    <h2 id="project-articles-heading" className="text-3xl font-bold">
                      Articles tagged {project.name}
                    </h2>
                  </div>
                  <p className="max-w-xl text-sm text-muted-foreground">
                    Notes, devlogs, and write-ups connected to this project.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/60 hover:bg-card"
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime} min read
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      {post.description && (
                        <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">
                          {post.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </div>
    </div>
  )
}
