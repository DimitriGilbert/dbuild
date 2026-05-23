import { getAllProjects, getAllProjectTags } from "@/lib/projects"
import { createStaticPageMetadata } from "@/lib/seo"

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

  return <ProjectsPageContent projects={projects} allTags={allTags} />
}
