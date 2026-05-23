import { HomePageContent } from "@/components/home-page-content"
import { getAllProjects, getAllProjectTags } from "@/lib/projects"
import { getAllPosts, getAllTags } from "@/lib/blog"
import { DEFAULT_DESCRIPTION, createHomeJsonLd, createStaticPageMetadata, serializeJsonLd } from "@/lib/seo"

export const metadata = createStaticPageMetadata({
  description: DEFAULT_DESCRIPTION,
  imageAlt: "Dbuild.dev - Portfolio and Blog",
})

export default function HomePage() {
  const projects = getAllProjects()
  const projectTags = getAllProjectTags()
  const allPosts = getAllPosts().filter(post => !post.isCategory)
  const recentPosts = allPosts.slice(0, 6)
  const blogTags = getAllTags()
  const homeJsonLd = createHomeJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <HomePageContent
        projects={projects}
        projectTags={projectTags}
        recentPosts={recentPosts}
        blogTags={blogTags}
        totalPosts={allPosts.length}
      />
    </>
  )
}
