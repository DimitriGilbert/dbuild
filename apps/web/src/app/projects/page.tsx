import { getAllProjects, getAllProjectTags } from "@/lib/projects"
import { ProjectsPageContent } from "./projects-page-content"

export default function ProjectsPage() {
  const projects = getAllProjects()
  const allTags = getAllProjectTags()

  return <ProjectsPageContent projects={projects} allTags={allTags} />
}
