import fs from "fs"
import path from "path"
import matter from "gray-matter"

import { formatTaxonomySlug } from "@/lib/seo"

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  category: string
  tags: string[]
  readTime: number
  content: string
  toc: TocItem[]
  directory: string
  relativePath: string
  filePath: string
  isCategory?: boolean
  ogImage?: string
  ogImageAlt?: string
  draft?: boolean
  lang?: string
  translationKey?: string
  canonical?: string
}

export interface BlogPostFrontmatter {
  title?: string
  description?: string
  summary?: string
  date?: string
  updatedAt?: string
  category?: string
  tags?: string[]
  slug?: string
  ogImage?: string
  "og-image"?: string
  ogImageAlt?: string
  draft?: boolean
  lang?: string
  translationKey?: string
  canonical?: string
}

export interface TocItem {
  id: string
  title: string
  level: number
}

export interface Category {
  slug: string
  title: string
  description: string
  directory: string
  content: string
  posts: BlogPost[]
}

export interface TagSummary {
  name: string
  slug: string
  count: number
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined
}

function readDateString(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString()
  }

  return readString(value)
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : []
}

function readFrontmatter(data: Record<string, unknown>): BlogPostFrontmatter {
  return {
    title: readString(data.title),
    description: readString(data.description),
    summary: readString(data.summary),
    date: readDateString(data.date),
    updatedAt: readDateString(data.updatedAt),
    category: readString(data.category),
    tags: readStringArray(data.tags),
    slug: readString(data.slug),
    ogImage: readString(data.ogImage),
    "og-image": readString(data["og-image"]),
    ogImageAlt: readString(data.ogImageAlt),
    draft: data.draft === true,
    lang: readString(data.lang),
    translationKey: readString(data.translationKey),
    canonical: readString(data.canonical),
  }
}

// Simple reading time calculation
function calculateReadTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// Generate table of contents from markdown content
function generateTOC(content: string): TocItem[] {
  const headings: TocItem[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')

      headings.push({
        level,
        title,
        id
      })
    }
  }

  return headings
}

// Slugify function to ensure consistent slug generation
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getUppercaseScore(value: string): number {
  return Array.from(value).filter((character) => character >= "A" && character <= "Z").length
}

function chooseCanonicalTagName(currentName: string, candidateName: string): string {
  const currentScore = getUppercaseScore(currentName)
  const candidateScore = getUppercaseScore(candidateName)

  if (candidateScore > currentScore) {
    return candidateName
  }

  if (candidateScore === currentScore && currentName === currentName.toLowerCase() && candidateName !== candidateName.toLowerCase()) {
    return candidateName
  }

  return currentName
}

// Recursively get all markdown files from subdirectories
function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // Recursively get files from subdirectory
      files.push(...getAllMarkdownFiles(fullPath, baseDir))
    } else if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.mdx'))) {
      files.push(fullPath)
    }
  }

  return files
}

// Get all blog posts from all subdirectories
export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      console.warn(`Blog directory not found: ${BLOG_DIR}`)
      return []
    }

    const files = getAllMarkdownFiles(BLOG_DIR)
    const posts: BlogPost[] = []

    for (const filePath of files) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const parsedFile = matter(fileContent)
      const frontmatter = readFrontmatter(parsedFile.data as Record<string, unknown>)
      const { content } = parsedFile

      // Get relative path from blog directory for organization info
      const relativePath = path.relative(BLOG_DIR, filePath)
      const dirPath = path.dirname(relativePath)
      const fileName = path.basename(filePath, path.extname(filePath))

      // Check if this is a category index file
      const isCategory = fileName === '_index'

      // Generate slug - ensure uniqueness for index files
      let slug = frontmatter.slug

      if (!slug) {
        if (fileName === 'index' || fileName === '_index') {
          // For index files, use the directory name to create unique slug
          if (dirPath && dirPath !== '.') {
            slug = dirPath.replace(/\//g, '-').toLowerCase()
          } else {
            slug = 'home'
          }
        } else {
          slug = fileName
        }
      } else if (slug === 'index') {
        // If frontmatter explicitly sets slug to "index", make it unique
        if (dirPath && dirPath !== '.') {
          slug = dirPath.replace(/\//g, '-').toLowerCase()
        } else {
          slug = 'home'
        }
      }

      // Ensure slug is properly formatted
      slug = slugify(slug)

      const post: BlogPost = {
        slug,
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description || frontmatter.summary || '',
        date: frontmatter.date || new Date().toISOString().split('T')[0],
        category: frontmatter.category || 'General',
        updatedAt: frontmatter.updatedAt,
        tags: frontmatter.tags ?? [],
        content,
        readTime: calculateReadTime(content),
        toc: generateTOC(content),
        // Add directory organization info
        directory: dirPath === '.' ? '' : dirPath,
        relativePath: relativePath,
        filePath: filePath,
        isCategory: isCategory,
        ogImage: frontmatter.ogImage || frontmatter['og-image'],
        ogImageAlt: frontmatter.ogImageAlt,
        draft: frontmatter.draft === true,
        lang: frontmatter.lang,
        translationKey: frontmatter.translationKey,
        canonical: frontmatter.canonical,
      }

      posts.push(post)
    }

    // Sort posts by date (newest first)
    return posts.filter(post => !post.draft).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

// Get a single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const posts = getAllPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

export function getTranslationPosts(post: BlogPost): BlogPost[] {
  if (!post.translationKey) {
    return []
  }

  try {
    const posts = getAllPosts()
    return posts.filter(
      (translationPost) =>
        translationPost.translationKey === post.translationKey &&
        translationPost.lang !== undefined &&
        translationPost.slug !== post.slug
    )
  } catch (error) {
    console.error(`Error getting translations for post ${post.slug}:`, error)
    return []
  }
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter(post =>
      post.category.toLowerCase() === category.toLowerCase()
    )
  } catch (error) {
    console.error(`Error getting posts by category ${category}:`, error)
    return []
  }
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    const tagSlug = formatTaxonomySlug(tag)

    return posts.filter(post =>
      post.tags.some(postTag =>
        postTag.toLowerCase() === tag.toLowerCase() ||
        formatTaxonomySlug(postTag) === tagSlug
      )
    )
  } catch (error) {
    console.error(`Error getting posts by tag ${tag}:`, error)
    return []
  }
}

// Get posts by directory
export function getPostsByDirectory(directory: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter(post =>
      post.directory === directory
    )
  } catch (error) {
    console.error(`Error getting posts by directory ${directory}:`, error)
    return []
  }
}

// Get all unique categories
export function getAllCategories(): string[] {
  try {
    const posts = getAllPosts()
    const categories = [...new Set(posts.map(post => post.category))]
    return categories.sort()
  } catch (error) {
    console.error('Error getting all categories:', error)
    return []
  }
}

export function getAllTagSummaries(): TagSummary[] {
  try {
    const posts = getAllPosts()
    const tagSummariesBySlug = new Map<string, TagSummary>()

    for (const post of posts) {
      const postTagSlugs = new Set<string>()

      for (const tag of post.tags) {
        const tagName = tag.trim()

        if (tagName.length === 0) {
          continue
        }

        const slug = formatTaxonomySlug(tagName)
        const existingTagSummary = tagSummariesBySlug.get(slug)

        if (existingTagSummary) {
          tagSummariesBySlug.set(slug, {
            ...existingTagSummary,
            name: chooseCanonicalTagName(existingTagSummary.name, tagName),
          })
        } else {
          tagSummariesBySlug.set(slug, {
            name: tagName,
            slug,
            count: 0,
          })
        }

        postTagSlugs.add(slug)
      }

      for (const slug of postTagSlugs) {
        const tagSummary = tagSummariesBySlug.get(slug)

        if (tagSummary) {
          tagSummariesBySlug.set(slug, {
            ...tagSummary,
            count: tagSummary.count + 1,
          })
        }
      }
    }

    return Array.from(tagSummariesBySlug.values()).sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error getting all tag summaries:', error)
    return []
  }
}

// Get all unique tags
export function getAllTags(): string[] {
  return getAllTagSummaries().map((tag) => tag.name)
}

// Get all directories used for organization
export function getAllDirectories(): string[] {
  try {
    const posts = getAllPosts()
    const directories = [...new Set(posts.map(post => post.directory).filter(dir => dir !== ''))]
    return directories.sort()
  } catch (error) {
    console.error('Error getting all directories:', error)
    return []
  }
}

// Get all categories (posts marked as category index pages)
export function getAllCategoryPosts(): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter(post => post.isCategory)
  } catch (error) {
    console.error('Error getting all category posts:', error)
    return []
  }
}

// Get a category with its child posts
export function getCategoryBySlug(slug: string): Category | null {
  try {
    const posts = getAllPosts()
    const categoryPost = posts.find(post => post.isCategory && post.slug === slug)

    if (!categoryPost) {
      return null
    }

    // Get all posts that are in the same directory or subdirectories, excluding category indexes
    const childPosts = posts.filter(post =>
      !post.isCategory &&
      (post.directory === categoryPost.directory ||
       post.directory.startsWith(categoryPost.directory + '/'))
    )

    return {
      slug: categoryPost.slug,
      title: categoryPost.title,
      description: categoryPost.description,
      directory: categoryPost.directory,
      content: categoryPost.content,
      posts: childPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  } catch (error) {
    console.error(`Error getting category by slug ${slug}:`, error)
    return null
  }
}

// Get posts in a specific directory (excluding category indexes)
export function getPostsInDirectory(directory: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter(post =>
      post.directory === directory &&
      !post.isCategory
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error(`Error getting posts in directory ${directory}:`, error)
    return []
  }
}

// Get recent posts (limit specified)
export function getRecentPosts(limit = 5): BlogPost[] {
  try {
    const posts = getAllPosts()
    return posts.filter(post => !post.isCategory).slice(0, limit)
  } catch (error) {
    console.error('Error getting recent posts:', error)
    return []
  }
}

// Search posts by title or content
export function searchPosts(query: string): BlogPost[] {
  try {
    const posts = getAllPosts()
    const searchTerm = query.toLowerCase()

    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.directory.toLowerCase().includes(searchTerm)
    )
  } catch (error) {
    console.error(`Error searching posts with query "${query}":`, error)
    return []
  }
}
