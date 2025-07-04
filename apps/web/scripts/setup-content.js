import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GITHUB_API_BASE = "https://api.github.com"
const REPO_OWNER = "DimitriGilbert"
const REPO_NAME = "dbuild"

// Slugify function to create URL-friendly slugs
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Ensure directories exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`📁 Created directory: ${dirPath}`)
    return true
  }
  return false
}

// Setup initial directory structure
function setupDirectories() {
  const projectRoot = path.resolve(__dirname, "..")
  const contentDir = path.join(projectRoot, "content")
  const blogDir = path.join(contentDir, "blog")
  const projectsDir = path.join(contentDir, "projects")
  const dataDir = path.join(projectRoot, "data")

  console.log("🏗️  Setting up directory structure...")

  ensureDirectoryExists(contentDir)
  ensureDirectoryExists(blogDir)
  ensureDirectoryExists(projectsDir)
  ensureDirectoryExists(dataDir)

  return { contentDir, blogDir, projectsDir, dataDir }
}

// Fetch directory contents from GitHub
async function fetchGitHubContents(path = "content") {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

  try {
    console.log(`🔍 Fetching contents from: ${url}`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`📊 Found ${data.length} items in ${path}`)
    return data
  } catch (error) {
    console.error(`❌ Error fetching ${path}:`, error.message)
    return null
  }
}

// Download file content from GitHub
async function downloadFileContent(filePath) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    if (data.encoding === "base64") {
      return Buffer.from(data.content, "base64").toString("utf8")
    }

    return data.content
  } catch (error) {
    console.error(`❌ Error downloading ${filePath}:`, error.message)
    return null
  }
}

// Process and save markdown file - PRESERVING DIRECTORY STRUCTURE
function saveMarkdownFile(content, originalPath, baseTargetDir) {
  try {
    // Remove 'content/' prefix to get the relative path
    const relativePath = originalPath.replace(/^content\//, '')
    
    // Create the full target path preserving directory structure
    const targetPath = path.join(baseTargetDir, relativePath)
    const targetDir = path.dirname(targetPath)
    
    // Ensure the target directory exists
    ensureDirectoryExists(targetDir)
    
    // Check if file already exists to avoid overwriting
    if (fs.existsSync(targetPath)) {
      console.log(`⚠️  File already exists, skipping: ${relativePath}`)
      return false
    }

    // Parse existing frontmatter or create new
    let processedContent = content
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
    
    if (!frontmatterMatch) {
      // No frontmatter, add it
      const title = path
        .basename(originalPath, path.extname(originalPath))
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
      
      // Create slug from the filename
      const slug = slugify(path.basename(originalPath, path.extname(originalPath)))
      
      const frontmatter = `---
title: "${title}"
description: ""
date: "${new Date().toISOString().split("T")[0]}"
category: "General"
tags: []
slug: "${slug}"
---

`
      processedContent = frontmatter + content
    } else {
      // Parse existing frontmatter and ensure slug is present
      const [, frontmatterContent, bodyContent] = frontmatterMatch
      const slug = slugify(path.basename(originalPath, path.extname(originalPath)))
      
      // Check if slug already exists in frontmatter
      if (!frontmatterContent.includes('slug:')) {
        const updatedFrontmatter = frontmatterContent + `\nslug: "${slug}"`
        processedContent = `---\n${updatedFrontmatter}\n---\n\n${bodyContent}`
      }
    }

    fs.writeFileSync(targetPath, processedContent, "utf8")
    console.log(`✅ Saved: ${relativePath}`)
    return true
  } catch (error) {
    console.error(`❌ Error saving ${originalPath}:`, error.message)
    return false
  }
}

// Recursively process directory contents - PRESERVING STRUCTURE
async function processDirectory(remotePath, localBaseDir, processedFiles = new Set()) {
  console.log(`📁 Processing directory: ${remotePath}`)
  
  const contents = await fetchGitHubContents(remotePath)
  if (!contents) {
    return { success: 0, errors: 0 }
  }

  let successCount = 0
  let errorCount = 0

  for (const item of contents) {
    if (item.type === "file" && (item.name.endsWith(".md") || item.name.endsWith(".mdx"))) {
      // Check if we already processed this file
      if (processedFiles.has(item.path)) {
        console.log(`⏭️  Already processed: ${item.path}`)
        continue
      }
      
      console.log(`📥 Processing file: ${item.path}`)
      
      const content = await downloadFileContent(item.path)
      if (!content) {
        errorCount++
        continue
      }

      const success = saveMarkdownFile(content, item.path, localBaseDir)
      if (success) {
        successCount++
        processedFiles.add(item.path)
      } else {
        errorCount++
      }

      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    } else if (item.type === "dir") {
      // Recursively process subdirectories
      console.log(`📂 Found subdirectory: ${item.name}`)
      const subResults = await processDirectory(item.path, localBaseDir, processedFiles)
      successCount += subResults.success
      errorCount += subResults.errors
    }
  }

  return { success: successCount, errors: errorCount }
}

// Main setup function
async function setupContent() {
  console.log("🚀 Starting content setup...")
  console.log(`📍 Repository: ${REPO_OWNER}/${REPO_NAME}`)

  // Setup directories
  const { contentDir, blogDir, projectsDir } = setupDirectories()

  // Check if content directory exists in the repo
  const contentExists = await fetchGitHubContents("content")
  if (!contentExists) {
    console.error("❌ Content directory not found in repository")
    console.error("   Please check that the repository has a 'content' directory")
    return
  }

  console.log("📂 Content directory found in repository")

  // Process the content directory recursively, preserving structure
  const results = await processDirectory("content", contentDir, new Set())

  console.log("\n📊 Import Summary:")
  console.log(`✅ Successfully imported: ${results.success} files`)
  console.log(`❌ Failed: ${results.errors} files`)

  if (results.success === 0) {
    console.log("⚠️  No markdown files found in content directory")
    console.log("📝 Creating sample blog post...")

    // Create a sample blog post in a subdirectory
    const sampleDir = path.join(blogDir, "general")
    ensureDirectoryExists(sampleDir)
    
    const samplePost = `---
title: "Welcome to My Blog"
description: "This is a sample blog post to get you started"
date: "${new Date().toISOString().split("T")[0]}"
category: "General"
tags: ["welcome", "blog"]
slug: "welcome-to-my-blog"
---

# Welcome to My Blog

This is a sample blog post. You can replace this with your actual content.

## Getting Started

To add more blog posts:

1. Create markdown files in subdirectories under \`content/blog/\`
2. Add proper frontmatter to each file  
3. Run \`npm run build\` to generate your site

## Directory Structure

Your blog supports subdirectories for organization:

\`\`\`
content/
  blog/
    general/
      welcome-to-my-blog.md
    development/
      my-coding-journey.md
    tutorials/
      how-to-setup-blog.md
\`\`\`

## Frontmatter Format

Each blog post should start with frontmatter like this:

\`\`\`yaml
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-15"
category: "Development"
tags: ["tag1", "tag2"]
slug: "your-post-title"
---
\`\`\`

Happy blogging!
`

    fs.writeFileSync(path.join(sampleDir, "welcome-to-my-blog.md"), samplePost, "utf8")
    console.log("✅ Created sample blog post: blog/general/welcome-to-my-blog.md")
  } else {
    console.log("\n🎉 Content setup completed!")
    console.log(`📁 Content preserved with directory structure in: ${contentDir}`)
    console.log("\n💡 Next steps:")
    console.log("   1. Review imported files with their directory structure")
    console.log("   2. Update frontmatter as needed")
    console.log("   3. Run 'npm run validate-content' to check for issues")
    console.log("   4. Run 'npm run dev' to start development server")
  }
}

// Run the setup
setupContent().catch((error) => {
  console.error("💥 Setup failed:", error.message)
  process.exit(1)
})