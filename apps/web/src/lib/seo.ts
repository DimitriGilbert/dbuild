import type { Metadata } from "next"

import type { Project } from "@/lib/projects"

export const SITE_ORIGIN = "https://dbuild.dev" as const
export const SITE_NAME = "Dbuild.dev" as const
export const DEFAULT_DESCRIPTION =
  "Dbuild.dev is a portfolio and blog showcasing projects and insights" as const
export const DEFAULT_OG_IMAGE = "/og-image.jpg" as const
export const OPEN_GRAPH_LOCALE = "en_US" as const
const PERSON_ID = `${SITE_ORIGIN}/#person` as const
const WEBSITE_ID = `${SITE_ORIGIN}/#website` as const
const DEFAULT_LANGUAGE = "en" as const

const OPEN_GRAPH_LOCALES = new Map<string, string>([
  ["en", "en_US"],
  ["fr", "fr_FR"],
])

interface StaticPageMetadataInput {
  title?: string
  description: string
  pathname?: string
  imagePath?: string
  imageAlt: string
}

type JsonLdPrimitive = string | number | boolean | null
export type JsonLdValue =
  | JsonLdPrimitive
  | JsonLdObject
  | readonly JsonLdValue[]

export interface JsonLdObject {
  readonly [key: string]: JsonLdValue | undefined
}

interface ProjectStructuredDataInput {
  project: Project
  pathname: string
}

const PROGRAMMING_LANGUAGE_TAGS = new Map<string, string>([
  ["typescript", "TypeScript"],
  ["javascript", "JavaScript"],
  ["bash", "Bash"],
  ["arduino", "Arduino"],
])

interface BlogPostingJsonLdInput {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
  imageUrl: string
  keywords: string[]
  inLanguage?: string
}

export interface BreadcrumbItemInput {
  name: string
  pathname: string
}

export interface ItemListEntryInput {
  name: string
  pathname: string
}

function formatPathname(pathname: string): string {
  const trimmedPathname = pathname.trim()
  const normalizedPathname = trimmedPathname.startsWith("/")
    ? trimmedPathname
    : `/${trimmedPathname}`

  if (normalizedPathname === "/") {
    return normalizedPathname
  }

  const lastSegment = normalizedPathname.split("/").filter(Boolean).at(-1)

  if (lastSegment?.includes(".")) {
    return normalizedPathname
  }

  return normalizedPathname.endsWith("/")
    ? normalizedPathname
    : `${normalizedPathname}/`
}

export function formatCanonicalUrl(pathname = "/"): string {
  return `${SITE_ORIGIN}${formatPathname(pathname)}`
}

export function formatTitle(title?: string): string {
  return title ? `${title} | ${SITE_NAME}` : SITE_NAME
}

export function formatAbsoluteImageUrl(imagePath: string = DEFAULT_OG_IMAGE): string {
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath
  }

  const normalizedImagePath = imagePath
    .replace(/^\/?public\//, "")
    .replace(/^\/?/, "/")

  return `${SITE_ORIGIN}${normalizedImagePath}`
}

export function formatOpenGraphLocale(lang?: string): string {
  if (!lang) {
    return OPEN_GRAPH_LOCALE
  }

  return OPEN_GRAPH_LOCALES.get(lang.toLowerCase()) ?? lang.replace("-", "_")
}

export function serializeJsonLd(value: JsonLdValue): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
}

export function createProjectJsonLd({
  project,
  pathname,
}: ProjectStructuredDataInput): JsonLdValue {
  const canonicalUrl = formatCanonicalUrl(pathname)
  const projectTags = project.tags.filter((tag) => tag.trim().length > 0)
  const programmingLanguages = projectTags
    .map((tag) => PROGRAMMING_LANGUAGE_TAGS.get(tag.toLowerCase()))
    .filter((language): language is string => Boolean(language))

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${canonicalUrl}#source`,
    name: project.name,
    description: project.description,
    codeRepository: project.repo,
    url: canonicalUrl,
    image: formatAbsoluteImageUrl(project.image),
    keywords: projectTags,
    author: {
      "@id": PERSON_ID,
    },
    publisher: {
      "@id": PERSON_ID,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    inLanguage: DEFAULT_LANGUAGE,
    programmingLanguage:
      programmingLanguages.length > 0 ? programmingLanguages : undefined,
    sameAs: project.site ?? undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  }
}

export function parseTaxonomySlug(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function formatTaxonomySlug(value: string): string {
  return parseTaxonomySlug(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function createBreadcrumbListJsonLd(
  items: readonly BreadcrumbItemInput[]
): JsonLdObject {
  const lastItem = items.at(-1)

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${formatCanonicalUrl(lastItem?.pathname ?? "/")}#breadcrumb`,
    inLanguage: DEFAULT_LANGUAGE,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: formatCanonicalUrl(item.pathname),
    })),
  }
}

export function createHomeJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Dimitri Gilbert",
        url: formatCanonicalUrl(),
        sameAs: ["https://github.com/DimitriGilbert"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: formatCanonicalUrl(),
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: {
          "@id": PERSON_ID,
        },
        inLanguage: ["en", "fr"],
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_ORIGIN}/#home`,
        url: formatCanonicalUrl(),
        name: `${SITE_NAME} Home`,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        author: {
          "@id": PERSON_ID,
        },
        publisher: {
          "@id": PERSON_ID,
        },
        inLanguage: ["en", "fr"],
        about: [
          { "@type": "Thing", name: "AI" },
          { "@type": "Thing", name: "Agents" },
          { "@type": "Thing", name: "Local-first software" },
          { "@type": "Thing", name: "Developer tools" },
        ],
      },
    ],
  }
}

export function createItemListJsonLd(
  name: string,
  pathname: string,
  items: readonly ItemListEntryInput[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${formatCanonicalUrl(pathname)}#itemlist`,
    name,
    url: formatCanonicalUrl(pathname),
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    author: {
      "@id": PERSON_ID,
    },
    publisher: {
      "@id": PERSON_ID,
    },
    inLanguage: DEFAULT_LANGUAGE,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: formatCanonicalUrl(item.pathname),
    })),
  }
}

export function createStaticPageMetadata({
  title: pageTitle,
  description,
  pathname = "/",
  imagePath = DEFAULT_OG_IMAGE,
  imageAlt,
}: StaticPageMetadataInput): Metadata {
  const title = formatTitle(pageTitle)
  const url = formatCanonicalUrl(pathname)
  const imageUrl = formatAbsoluteImageUrl(imagePath)

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
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: OPEN_GRAPH_LOCALE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function createNotFoundMetadata(title: string): Metadata {
  return {
    title: formatTitle(title),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export function createBlogPostingJsonLd({
  headline,
  description,
  datePublished,
  dateModified,
  url,
  imageUrl,
  keywords,
  inLanguage = DEFAULT_LANGUAGE,
}: BlogPostingJsonLdInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline,
    description,
    datePublished,
    author: {
      "@id": PERSON_ID,
    },
    publisher: {
      "@id": PERSON_ID,
    },
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    inLanguage,
    url,
    image: [imageUrl],
    keywords,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }
}
