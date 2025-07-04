import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function initializeProject() {
  console.log("🚀 Initializing project structure...")

  const projectRoot = path.resolve(__dirname, "..")

  // Create all necessary directories
  const directories = ["content", "content/blog", "content/projects", "data", "scripts"]

  directories.forEach((dir) => {
    const fullPath = path.join(projectRoot, dir)
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
      console.log(`📁 Created: ${dir}`)
    }
  })

  // Create sample projects.json if it doesn't exist
  const projectsJsonPath = path.join(projectRoot, "data", "projects.json")
  if (!fs.existsSync(projectsJsonPath)) {
    const sampleProjects = {
      projects: [
        {
          id: "sample-project",
          name: "Sample Project",
          description: "This is a sample project. Replace with your actual projects.",
          image: "/placeholder.svg?height=400&width=600",
          repo: "https://github.com/username/sample-project",
          site: null,
          tags: ["JavaScript", "React", "Sample"],
        },
      ],
    }

    fs.writeFileSync(projectsJsonPath, JSON.stringify(sampleProjects, null, 2))
    console.log("📄 Created sample projects.json")
  }

  console.log("✅ Project initialization complete!")
  console.log("\n💡 Next steps:")
  console.log("   1. Run 'npm run setup-content' to import your blog content")
  console.log("   2. Update data/projects.json with your actual projects")
  console.log("   3. Run 'npm run dev' to start development")
}

initializeProject()
