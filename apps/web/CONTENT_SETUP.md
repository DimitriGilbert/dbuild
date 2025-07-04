# Content Setup Guide

This guide helps you import and manage your blog content from your existing GitHub repository.

## Quick Setup

Run this command to automatically import all your blog content:

\`\`\`bash
npm run setup
\`\`\`

This will:
1. Fetch all markdown files from your GitHub repository
2. Process and validate the frontmatter
3. Save them to the local `content/blog/` directory
4. Validate all imported content

## Manual Import

If you prefer to import content manually:

\`\`\`bash
npm run import-blog
\`\`\`

## Validate Content

To check if your content has proper frontmatter:

\`\`\`bash
npm run validate-content
\`\`\`

## Content Structure

Your blog posts should have this frontmatter structure:

\`\`\`yaml
---
title: "Your Post Title"
description: "Brief description of the post"
date: "2024-01-15"
category: "Development"
tags: ["JavaScript", "React", "Tutorial"]
---

# Your content here...
\`\`\`

## Required Fields

- `title`: Post title
- `description`: Brief description for previews
- `date`: Publication date (YYYY-MM-DD format)

## Optional Fields

- `category`: Post category (defaults to "General")
- `tags`: Array of tags for the post
- `draft`: Set to `true` to exclude from build

## Troubleshooting

### GitHub API Rate Limits

If you hit rate limits, you can:
1. Wait an hour for the limit to reset
2. Use a GitHub personal access token (set `GITHUB_TOKEN` environment variable)

### Content Not Found

Make sure your repository structure has markdown files in a `content/` directory.

### Frontmatter Issues

Run `npm run validate-content` to see specific issues with your markdown files.
