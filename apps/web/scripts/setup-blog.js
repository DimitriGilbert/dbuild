import fs from "fs"
import path from "path"
import matter from "gray-matter"

const GITHUB_API_BASE = "https://api.github.com"
const REPO_OWNER = "DimitriGilbert"
const REPO_NAME = "dbuild"

async function fetchGitHubTree(sha = "main") {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${sha}?recursive=1`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    return data.tree
  } catch (error) {
    console.error("Error fetching repository tree:", error.message)
    return null
  }
}

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
    console.error(`Error downloading ${filePath}:`, error.message)
    return null
  }
}

function validateAndProcessMarkdown(content, filePath) {
  try {
    const { data: frontmatter, content: markdownContent } = matter(content)

    // Ensure required frontmatter fields
    const processedFrontmatter = {
      title: frontmatter.title || path.basename(filePath, ".md").replace(/-/g, " "),
      description: frontmatter.description || "",
      date: frontmatter.date || new Date().toISOString().split("T")[0],
      category: frontmatter.category || "General",
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : frontmatter.tags ? [frontmatter.tags] : [],
      ...frontmatter,
    }

    // Reconstruct the markdown with processed frontmatter
    const processedContent = matter.stringify(markdownContent, processedFrontmatter)

    return {
      isValid: true,
      content: processedContent,
      frontmatter: processedFrontmatter,
    }
  } catch (error) {
    console.error(`Error processing markdown ${filePath}:`, error.message)
    return {
      isValid: false,
      error: error.message,
    }
  }
}

async function setupBlogContent() {
  console.log("🚀 Setting up blog content from GitHub repository...")
  console.log(`📍 Repository: ${REPO_OWNER}/${REPO_NAME}`)

  // Fetch repository tree
  const tree = await fetchGitHubTree()
  if (!tree) {
    console.error("❌ Failed to fetch repository tree")
    return
  }

  // Find all markdown files in content directory
  const contentFiles = tree.filter(
    (item) =>
      item.path.startsWith("content/") &&
      item.type === "blob" &&
      (item.path.endsWith(".md") || item.path.endsWith(".mdx")),
  )

  console.log(`📄 Found ${contentFiles.length} markdown files`)

  const localBlogDir = path.join(process.cwd(), "content", "blog")

  // Create blog directory
  if (!fs.existsSync(localBlogDir)) {
    fs.mkdirSync(localBlogDir, { recursive: true })
    console.log(`📁 Created directory: ${localBlogDir}`)
  }

  let successCount = 0
  let errorCount = 0

  for (const file of contentFiles) {
    console.log(`📥 Processing: ${file.path}`)

    const content = await downloadFileContent(file.path)
    if (!content) {
      errorCount++
      continue
    }

    const processed = validateAndProcessMarkdown(content, file.path)
    if (!processed.isValid) {
      console.error(`❌ Invalid markdown: ${file.path} - ${processed.error}`)
      errorCount++
      continue
    }

    // Create local filename (flatten directory structure)
    const originalName = path.basename(file.path)
    const localPath = path.join(localBlogDir, originalName)

    // Write processed content
    fs.writeFileSync(localPath, processed.content, "utf8")
    console.log(`✅ Saved: ${originalName}`)
    console.log(`   📝 Title: ${processed.frontmatter.title}`)
    console.log(`   🏷️  Tags: ${processed.frontmatter.tags.join(", ") || "None"}`)
    console.log(`   📅 Date: ${processed.frontmatter.date}`)

    successCount++
  }

  console.log("\n📊 Import Summary:")
  console.log(`✅ Successfully imported: ${successCount} files`)
  console.log(`❌ Failed: ${errorCount} files`)

  if (successCount > 0) {
    console.log("\n🎉 Blog setup completed! Your content is ready.")
    console.log("💡 Next steps:")
    console.log("   1. Review the imported files in content/blog/")
    console.log("   2. Update any frontmatter as needed")
    console.log("   3. Run your development server to see the results")
  }
}

// Run the setup
setupBlogContent()
