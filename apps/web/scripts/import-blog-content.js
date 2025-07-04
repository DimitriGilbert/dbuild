import fs from "fs"
import path from "path"

const GITHUB_API_BASE = "https://api.github.com"
const REPO_OWNER = "DimitriGilbert"
const REPO_NAME = "dbuild"
const CONTENT_PATH = "content"

async function fetchGitHubContent(path) {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${path}:`, error.message)
    return null
  }
}

async function downloadFile(downloadUrl, localPath) {
  try {
    const response = await fetch(downloadUrl)
    if (!response.ok) {
      throw new Error(`Download error: ${response.status} ${response.statusText}`)
    }

    const content = await response.text()

    // Ensure directory exists
    const dir = path.dirname(localPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(localPath, content, "utf8")
    console.log(`✅ Downloaded: ${localPath}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to download ${localPath}:`, error.message)
    return false
  }
}

async function processDirectory(remotePath, localBasePath) {
  console.log(`📁 Processing directory: ${remotePath}`)

  const contents = await fetchGitHubContent(remotePath)
  if (!contents) return

  for (const item of contents) {
    const localPath = path.join(localBasePath, item.name)

    if (item.type === "file") {
      if (item.name.endsWith(".md") || item.name.endsWith(".mdx")) {
        await downloadFile(item.download_url, localPath)
      } else {
        console.log(`⏭️  Skipping non-markdown file: ${item.name}`)
      }
    } else if (item.type === "dir") {
      // Recursively process subdirectories
      await processDirectory(item.path, localBasePath)
    }
  }
}

async function importBlogContent() {
  console.log("🚀 Starting blog content import from GitHub...")
  console.log(`📍 Repository: ${REPO_OWNER}/${REPO_NAME}`)
  console.log(`📂 Source path: ${CONTENT_PATH}`)

  const localContentDir = path.join(process.cwd(), "content", "blog")

  // Create content directory if it doesn't exist
  if (!fs.existsSync(localContentDir)) {
    fs.mkdirSync(localContentDir, { recursive: true })
    console.log(`📁 Created directory: ${localContentDir}`)
  }

  try {
    await processDirectory(CONTENT_PATH, path.join(process.cwd(), "content", "blog"))
    console.log("✨ Blog content import completed successfully!")
  } catch (error) {
    console.error("💥 Import failed:", error.message)
    process.exit(1)
  }
}

// Run the import
importBlogContent()
