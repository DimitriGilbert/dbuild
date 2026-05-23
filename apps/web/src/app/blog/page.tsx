import { getAllPosts, getAllTags, getAllCategoryPosts } from "@/lib/blog"
import { createItemListJsonLd, createStaticPageMetadata, serializeJsonLd } from "@/lib/seo"

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
  const blogJsonLd = createItemListJsonLd(
    "Dbuild.dev Blog Articles",
    "/blog",
    posts.map((post) => ({
      name: post.title,
      pathname: `/blog/${post.slug}`,
    }))
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogJsonLd) }}
      />
      <BlogPageContent
        posts={posts}
        tags={tags}
        categoryPosts={categoryPosts}
      />
    </>
  )
}
