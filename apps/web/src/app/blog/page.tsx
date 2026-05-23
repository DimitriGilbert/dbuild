import { getAllPosts, getAllTags, getAllCategoryPosts } from "@/lib/blog"
import { createStaticPageMetadata } from "@/lib/seo"

import { BlogPageContent } from "./blog-page-content"

const BLOG_DESCRIPTION = "Articles about development, tools, and the craft of building things."

export const metadata = createStaticPageMetadata({
  title: "Blog",
  description: BLOG_DESCRIPTION,
  pathname: "/blog",
  imageAlt: "Dbuild.dev Blog",
})

export default function BlogPage() {
  const allPosts = getAllPosts()
  const posts = allPosts.filter(post => !post.isCategory)
  const tags = getAllTags()
  const categoryPosts = getAllCategoryPosts()

  return (
    <BlogPageContent
      posts={posts}
      tags={tags}
      categoryPosts={categoryPosts}
    />
  )
}
