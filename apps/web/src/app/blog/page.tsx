import { getAllPosts, getAllTags, getAllCategoryPosts } from "@/lib/blog"
import { BlogPageContent } from "./blog-page-content"

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
