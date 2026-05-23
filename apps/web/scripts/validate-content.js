import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import matter from "gray-matter"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "..")
const blogDir = path.join(projectRoot, "content", "blog")
const markdownExtensions = new Set([".md", ".mdx"])
const frenchSignals = [" le ", " la ", " les ", " des ", " une ", " un ", " est ", " pour ", " avec ", " dans "]

function getMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) {
    return []
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      return getMarkdownFiles(entryPath)
    }

    if (entry.isFile() && markdownExtensions.has(path.extname(entry.name))) {
      return [entryPath]
    }

    return []
  })
}

function readString(value) {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined
}

function hasValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }

  return readString(value) !== undefined
}

function isDraft(data) {
  return data.draft === true || data.draft === "true"
}

function isCategoryIndex(filePath) {
  return path.basename(filePath, path.extname(filePath)) === "_index"
}

function relativeFilePath(filePath) {
  return path.relative(projectRoot, filePath)
}

function isValidDate(value) {
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime())
  }

  if (typeof value === "string") {
    return !Number.isNaN(Date.parse(value))
  }

  return false
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string" && item.trim().length > 0)
}

function normalizeTranslationCandidate(value) {
  return value
    .toLowerCase()
    .replace(/-fr\b/g, "")
    .replace(/\bfr\b/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function hasFrenchSignals(text) {
  const normalizedText = ` ${text.toLowerCase()} `
  return /[àâçéèêëîïôùûüÿœ]/i.test(text) || frenchSignals.some((signal) => normalizedText.includes(signal))
}

function likelyTranslatedContent(filePath, data, body) {
  const relativePath = relativeFilePath(filePath).toLowerCase()
  const tags = Array.isArray(data.tags) ? data.tags.join(" ") : ""
  const title = readString(data.title) ?? ""
  return relativePath.includes("-fr") || tags.toLowerCase().includes("french") || hasFrenchSignals(`${title}\n${body.slice(0, 500)}`)
}

function getTranslationCandidate(filePath) {
  const relativePath = relativeFilePath(filePath)
  const directory = path.dirname(relativePath)
  const parent = path.dirname(directory)
  const leaf = path.basename(directory)
  return normalizeTranslationCandidate(path.join(parent, leaf))
}

function validatePost(filePath, data, body) {
  const errors = []
  const warnings = []
  const displayPath = relativeFilePath(filePath)
  const categoryIndex = isCategoryIndex(filePath)

  if (isDraft(data)) {
    return { errors, warnings, skipped: true }
  }

  if (categoryIndex) {
    if (!hasValue(data.title)) {
      warnings.push(`${displayPath}: Category index is missing title`)
    }

    if (!hasValue(data.summary) && !hasValue(data.description)) {
      warnings.push(`${displayPath}: Category index is missing summary or description`)
    }

    return { errors, warnings, skipped: false }
  }

  if (!hasValue(data.title)) {
    errors.push(`${displayPath}: Missing title`)
  }

  if (!hasValue(data.summary) && !hasValue(data.description)) {
    errors.push(`${displayPath}: Missing summary or description`)
  }

  if (!hasValue(data.date)) {
    errors.push(`${displayPath}: Missing date`)
  } else if (!isValidDate(data.date)) {
    errors.push(`${displayPath}: Invalid date format - ${String(data.date)}`)
  }

  if (!hasValue(data.tags)) {
    errors.push(`${displayPath}: Missing tags`)
  } else if (!isStringArray(data.tags)) {
    errors.push(`${displayPath}: Tags should be a non-empty string array`)
  }

  if (body.trim().length === 0) {
    errors.push(`${displayPath}: Body is empty`)
  }

  if (likelyTranslatedContent(filePath, data, body) && !hasValue(data.lang)) {
    warnings.push(`${displayPath}: Likely translated content is missing lang`)
  }

  if ((hasValue(data.ogImage) || hasValue(data["og-image"])) && !hasValue(data.ogImageAlt)) {
    warnings.push(`${displayPath}: ogImageAlt should be set when ogImage exists`)
  }

  return { errors, warnings, skipped: false }
}

function buildTranslationCandidateCounts(records) {
  return records.reduce((counts, record) => {
    if (!record.categoryIndex && !record.draft) {
      const candidate = getTranslationCandidate(record.filePath)
      counts.set(candidate, (counts.get(candidate) ?? 0) + 1)
    }

    return counts
  }, new Map())
}

function validateBlogContent() {
  console.log("🔍 Validating blog content...")
  console.log(`📁 Looking in: ${blogDir}`)

  if (!fs.existsSync(blogDir)) {
    console.error("❌ Blog content directory not found")
    process.exitCode = 1
    return
  }

  const files = getMarkdownFiles(blogDir)

  if (files.length === 0) {
    console.error("❌ No markdown files found in blog directory")
    process.exitCode = 1
    return
  }

  const records = files.map((filePath) => {
    const parsedFile = matter(fs.readFileSync(filePath, "utf8"))
    return {
      filePath,
      data: parsedFile.data,
      body: parsedFile.content,
      draft: isDraft(parsedFile.data),
      categoryIndex: isCategoryIndex(filePath),
    }
  })
  const translationCandidateCounts = buildTranslationCandidateCounts(records)
  const errors = []
  const warnings = []
  let validCount = 0
  let draftCount = 0

  records.forEach((record) => {
    const result = validatePost(record.filePath, record.data, record.body)

    errors.push(...result.errors)
    warnings.push(...result.warnings)

    if (result.skipped) {
      draftCount += 1
      return
    }

    if (!record.categoryIndex && !hasValue(record.data.translationKey)) {
      const candidate = getTranslationCandidate(record.filePath)

      if ((translationCandidateCounts.get(candidate) ?? 0) > 1) {
        warnings.push(`${relativeFilePath(record.filePath)}: Likely translation pair is missing translationKey`)
      }
    }

    if (!record.categoryIndex && result.errors.length === 0) {
      validCount += 1
    }
  })

  console.log(`📄 Found ${files.length} markdown files`)
  console.log(`✅ Valid public posts: ${validCount}`)
  console.log(`⏭️  Drafts skipped: ${draftCount}`)
  console.log(`⚠️  Warnings: ${warnings.length}`)
  console.log(`❌ Errors: ${errors.length}`)

  if (warnings.length > 0) {
    console.warn("\nAdvisory warnings:")
    warnings.forEach((warning) => console.warn(`   • ${warning}`))
  }

  if (errors.length > 0) {
    console.error("\nContent errors:")
    errors.forEach((error) => console.error(`   • ${error}`))
    process.exitCode = 1
    return
  }

  console.log("\n🎉 Content validation passed")
}

validateBlogContent()
