import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Simple frontmatter parser (since we might not have gray-matter yet)
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: content }
  }

  const frontmatterText = match[1]
  const bodyContent = match[2]
  const data = {}

  // Simple YAML parsing for basic fields
  frontmatterText.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":")
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      // Handle arrays (basic)
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim().replace(/['"]/g, ""))
      }

      data[key] = value
    }
  })

  return { data, content: bodyContent }
}

function validateBlogContent() {
  const projectRoot = path.resolve(__dirname, "..")
  const blogDir = path.join(projectRoot, "content", "blog")

  console.log("🔍 Validating blog content...")
  console.log(`📁 Looking in: ${blogDir}`)

  if (!fs.existsSync(blogDir)) {
    console.log("❌ Blog content directory not found!")
    console.log("💡 Run 'npm run setup-content' first to import your content")
    return
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))

  if (files.length === 0) {
    console.log("📁 No markdown files found in blog directory")
    console.log("💡 Run 'npm run setup-content' to import content")
    return
  }

  console.log(`📄 Found ${files.length} blog posts`)

  let validCount = 0
  const issues = []

  files.forEach((file) => {
    const filePath = path.join(blogDir, file)
    const content = fs.readFileSync(filePath, "utf8")

    try {
      const { data: frontmatter } = parseFrontmatter(content)

      const requiredFields = ["title", "description", "date"]
      const missingFields = requiredFields.filter((field) => !frontmatter[field])

      if (missingFields.length > 0) {
        issues.push(`${file}: Missing fields - ${missingFields.join(", ")}`)
      } else {
        validCount++
      }

      // Check date format
      if (frontmatter.date && isNaN(Date.parse(frontmatter.date))) {
        issues.push(`${file}: Invalid date format - ${frontmatter.date}`)
      }

      // Check tags format
      if (frontmatter.tags && !Array.isArray(frontmatter.tags) && frontmatter.tags !== "") {
        issues.push(`${file}: Tags should be an array`)
      }

      console.log(`📝 ${file}:`)
      console.log(`   Title: ${frontmatter.title || "Missing"}`)
      console.log(`   Date: ${frontmatter.date || "Missing"}`)
      console.log(
        `   Tags: ${Array.isArray(frontmatter.tags) ? frontmatter.tags.join(", ") : frontmatter.tags || "None"}`,
      )
    } catch (error) {
      issues.push(`${file}: Parse error - ${error.message}`)
    }
  })

  console.log(`\n📊 Validation Results:`)
  console.log(`✅ Valid posts: ${validCount}`)
  console.log(`⚠️  Issues found: ${issues.length}`)

  if (issues.length > 0) {
    console.log("\n🔧 Issues to fix:")
    issues.forEach((issue) => console.log(`   • ${issue}`))
  } else {
    console.log("\n🎉 All blog posts are valid!")
  }
}

validateBlogContent()
