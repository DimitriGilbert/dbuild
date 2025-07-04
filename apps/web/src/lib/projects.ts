import fs from "fs"
import path from "path"
import matter from "gray-matter"
import projectsData from "@/data/projects.json"

export interface Project {
  id: string
  name: string
  description: string
  image: string
  repo: string
  site: string | null
  tags: string[]
  content?: string
  readTime?: number
}

const projectsDirectory = path.join(process.cwd(), "content/projects")

export function getAllProjects(): Project[] {
  return projectsData.projects
}

export function getProjectById(id: string): Project | null {
  const project = projectsData.projects.find((p) => p.id === id)
  if (!project) return null

  // Try to load markdown content if it exists
  try {
    const fullPath = path.join(projectsDirectory, `${id}.md`)
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { content } = matter(fileContents)
      const readTime = calculateReadTime(content)

      return {
        ...project,
        content,
        readTime,
      }
    }
  } catch (error) {
    console.warn(`Could not load content for project ${id}:`, error)
  }

  return project
}

export function getProjectsByTag(tag: string): Project[] {
  return projectsData.projects.filter((project) => project.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

export function getAllProjectTags(): string[] {
  const tags = projectsData.projects.flatMap((project) => project.tags)
  return Array.from(new Set(tags)).sort()
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
