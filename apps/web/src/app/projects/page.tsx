import { getAllProjects, getAllProjectTags } from "@/lib/projects"
import { getAgentCorpusIndex } from "@/lib/agent-corpus"
import { createItemListJsonLd, createStaticPageMetadata, serializeJsonLd } from "@/lib/seo"

import { ProjectsPageContent } from "./projects-page-content"

const PROJECTS_DESCRIPTION =
  "A collection of tools, experiments, and solutions from Dbuild.dev."

export const metadata = createStaticPageMetadata({
  title: "Projects",
  description: PROJECTS_DESCRIPTION,
  pathname: "/projects",
  imageAlt: "Dbuild.dev Projects",
})

export default function ProjectsPage() {
  const projects = getAllProjects()
  const allTags = getAllProjectTags()
  const corpusStats = getAgentCorpusIndex().stats
  const projectsJsonLd = createItemListJsonLd(
    "Dbuild.dev Projects",
    "/projects",
    projects.map((project) => ({
      name: project.name,
      pathname: `/projects/${project.id}`,
    }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectsJsonLd) }}
      />
      <ProjectsPageContent projects={projects} allTags={allTags} totalProjects={corpusStats.projects} />
    </>
  )
}
