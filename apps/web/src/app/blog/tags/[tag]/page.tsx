import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getAllTagSummaries, getPostsByTag } from "@/lib/blog"
import {
  DEFAULT_OG_IMAGE,
  OPEN_GRAPH_LOCALE,
  SITE_NAME,
  createNotFoundMetadata,
  formatAbsoluteImageUrl,
  formatCanonicalUrl,
  parseTaxonomySlug,
  formatTaxonomySlug,
  formatTitle,
} from "@/lib/seo"

import { TagDetailContent } from "./tag-detail-content"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTagSummaries()
  return tags.map((tag) => ({
    tag: tag.slug,
  }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = parseTaxonomySlug(tag)
  const posts = getPostsByTag(decodedTag)
  const decodedTagSlug = formatTaxonomySlug(decodedTag)
  const tagSummary = getAllTagSummaries().find(
    (summary) => summary.slug === decodedTagSlug
  )
  const canonicalSlug = tagSummary?.slug ?? decodedTagSlug
  const url = formatCanonicalUrl(`/blog/tags/${canonicalSlug}`)

  if (posts.length === 0) {
    return createNotFoundMetadata("Tag Not Found")
  }

  const displayTag = tagSummary?.name ?? (posts[0].tags.find(
    (postTag) => postTag.toLowerCase() === decodedTag.toLowerCase()
  ) || decodedTag)
  const articleCount = posts.length
  const title = formatTitle(`#${displayTag} Articles`)
  const description = `Explore ${articleCount} article${articleCount === 1 ? "" : "s"} tagged ${displayTag} on ${SITE_NAME}.`
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
          alt: `#${displayTag} articles`,
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

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = parseTaxonomySlug(tag)
  const posts = getPostsByTag(decodedTag)
  const decodedTagSlug = formatTaxonomySlug(decodedTag)
  const tagSummary = getAllTagSummaries().find(
    (summary) => summary.slug === decodedTagSlug
  )

  if (posts.length === 0) {
    notFound()
  }

  return <TagDetailContent tag={tagSummary?.name ?? decodedTag} posts={posts} />
}
