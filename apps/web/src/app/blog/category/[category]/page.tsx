import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryBySlug, getAllCategoryPosts } from "@/lib/blog"
import {
  DEFAULT_OG_IMAGE,
  OPEN_GRAPH_LOCALE,
  SITE_NAME,
  createNotFoundMetadata,
  formatAbsoluteImageUrl,
  formatCanonicalUrl,
  formatTitle,
} from "@/lib/seo"
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

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)
  const url = formatCanonicalUrl(`/blog/category/${category}`)

  if (!categoryData) {
    return createNotFoundMetadata("Category Not Found")
  }

  const title = formatTitle(`${categoryData.title} Articles`)
  const articleCount = categoryData.posts.length
  const description =
    categoryData.description ||
    `Explore ${articleCount} article${articleCount === 1 ? "" : "s"} in ${categoryData.title} on ${SITE_NAME}.`
  const ogImage = formatAbsoluteImageUrl(DEFAULT_OG_IMAGE)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${categoryData.title} articles`,
        },
      ],
      locale: OPEN_GRAPH_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)

  if (!categoryData) {
    notFound()
  }

  return <CategoryPageContent categoryData={categoryData} />
}
