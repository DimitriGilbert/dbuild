import { HomePageContent } from "@/components/home-page-content"
import { getAllProjects, getAllProjectTags } from "@/lib/projects"
import { getAllPosts, getAllTags } from "@/lib/blog"

export default function HomePage() {
  const projects = getAllProjects()
  const projectTags = getAllProjectTags()
  const allPosts = getAllPosts().filter(post => !post.isCategory)
  const recentPosts = allPosts.slice(0, 6)
  const blogTags = getAllTags()

  return (
    <HomePageContent
      projects={projects}
      projectTags={projectTags}
      recentPosts={recentPosts}
      blogTags={blogTags}
      totalPosts={allPosts.length}
    />
  )
}
