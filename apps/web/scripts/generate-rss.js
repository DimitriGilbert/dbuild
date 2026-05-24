import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SITE_ORIGIN = "https://dbuild.dev"
const SITE_NAME = "Dbuild.dev"
const SITE_DESCRIPTION = "Dbuild.dev is a portfolio and blog showcasing projects and insights"
const RSS_FILENAME = "feed.xml"
const BLOG_DIR = path.join(__dirname, "..", "content", "blog")
const PUBLIC_DIR = path.join(__dirname, "..", "public")

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function readString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined
}

function readDateString(value) {
  if (value instanceof Date) {
    return value.toISOString()
  }
  return readString(value)
}

function readStringArray(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string")
    : []
}

function formatRfc822Date(isoDate) {
  const date = new Date(isoDate)
  return date.toUTCString()
}

function getAllMarkdownFiles(dir) {
  const files = []

  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (stat.isFile() && (item.endsWith(".md") || item.endsWith(".mdx"))) {
      files.push(fullPath)
    }
  }

  return files
}

function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = getAllMarkdownFiles(BLOG_DIR)
  const posts = []

  for (const filePath of files) {
    const fileContent = fs.readFileSync(filePath, "utf8")
    const parsedFile = matter(fileContent)
    const data = parsedFile.data
    const content = parsedFile.content

    const title = readString(data.title) || "Untitled"
    const description = readString(data.description) || readString(data.summary) || ""
    const date = readDateString(data.date) || new Date().toISOString().split("T")[0]
    const tags = readStringArray(data.tags)
    const draft = data.draft === true
    const slug = readString(data.slug)

    const relativePath = path.relative(BLOG_DIR, filePath)
    const dirPath = path.dirname(relativePath)
    const fileName = path.basename(filePath, path.extname(filePath))
    const isCategory = fileName === "_index"

    let postSlug = slug
    if (!postSlug) {
      if (fileName === "index" || fileName === "_index") {
        if (dirPath && dirPath !== ".") {
          postSlug = dirPath.replace(/\//g, "-").toLowerCase()
        } else {
          postSlug = "home"
        }
      } else {
        postSlug = fileName
      }
    } else if (postSlug === "index") {
      if (dirPath && dirPath !== ".") {
        postSlug = dirPath.replace(/\//g, "-").toLowerCase()
      } else {
        postSlug = "home"
      }
    }

    postSlug = slugify(postSlug)

    const plainContent = content
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/`(.+?)`/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/!\[.*?\]\(.+?\)/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/---/g, "")
      .trim()

    const excerpt = plainContent.substring(0, 280).trim()
    const suffix = plainContent.length > 280 ? "..." : ""

    posts.push({
      title,
      description: description || `${excerpt}${suffix}`,
      date,
      tags,
      slug: postSlug,
      isCategory,
      draft,
    })
  }

  return posts
    .filter((post) => !post.draft && !post.isCategory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function generateRssFeed() {
  const posts = getAllPosts()
  const buildDate = new Date().toUTCString()
  const lastBuildDate = posts.length > 0 ? formatRfc822Date(posts[0].date) : buildDate

  const items = posts
    .map((post) => {
      const postUrl = `${SITE_ORIGIN}/blog/${post.slug}/`
      const pubDate = formatRfc822Date(post.date)
      const categories = post.tags
        .map((tag) => `    <category>${escapeXml(tag)}</category>`)
        .join("\n")

      return `  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <description>${escapeXml(post.description)}</description>
    <pubDate>${pubDate}</pubDate>${categories ? "\n" + categories : ""}
  </item>`
    })
    .join("\n")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_ORIGIN}/</link>
    <atom:link href="${SITE_ORIGIN}/${RSS_FILENAME}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Dbuild.dev RSS Generator</generator>
    <managingEditor>dimitri@dbuild.dev (Dimitri Gilbert)</managingEditor>
    <webMaster>dimitri@dbuild.dev (Dimitri Gilbert)</webMaster>
${items}
  </channel>
</rss>`

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  const outputPath = path.join(PUBLIC_DIR, RSS_FILENAME)
  fs.writeFileSync(outputPath, feed, "utf8")
  console.log(`RSS feed generated: ${outputPath} (${posts.length} posts)`)
}

generateRssFeed()
