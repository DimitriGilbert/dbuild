import { notFound } from "next/navigation"
import { getCategoryBySlug, getAllCategoryPosts } from "@/lib/blog"
import { CategoryPageContent } from "./category-page-content"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategoryPosts()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)

  if (!categoryData) {
    notFound()
  }

  return <CategoryPageContent categoryData={categoryData} />
}
