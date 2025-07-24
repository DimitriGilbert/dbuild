# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Commands (run from root)

- `bun install` - Install dependencies for all apps
- `bun run dev` - Start all applications in development mode
- `bun run build` - Build all applications for production
- `bun run check-types` - Check TypeScript types across all apps

### Web App Specific Commands (from apps/web/)

- `bun run lint` - Run Next.js linting
- `bun run to2web` - Build and deploy to GitHub Pages

## Architecture Overview

This is a **Turborepo monorepo** with a modern TypeScript stack. The primary application is a **Next.js blog/portfolio site** showcasing projects and technical content.

### Project Structure

```
dbuild.io/
├── apps/web/          # Main Next.js application
├── packages/          # Shared packages (if any)
└── turbo.json         # Turborepo configuration
```

### Web Application Architecture

**Framework**: Next.js 15 with App Router, TypeScript, TailwindCSS, shadcn/ui

**Key Features**:

- **Blog System**: Markdown-based blog with frontmatter support using gray-matter
- **Project Showcase**: JSON-driven project display system
- **PWA Support**: Progressive Web App capabilities
- **Static Export**: Builds to static files for GitHub Pages deployment

**Content Management**:

- Blog posts stored in `apps/web/content/blog/` with nested directory structure
- Projects defined in `apps/web/src/data/projects.json`
- Blog system supports categories, tags, TOC generation, and nested directory organization
- Uses `_index.md` files for category pages

**Core Libraries**:

- **UI**: Radix UI components via shadcn/ui
- **Styling**: TailwindCSS with custom animations
- **Content**: gray-matter for frontmatter parsing, react-markdown for rendering
- **Forms**: React Hook Form with Zod validation
- **Themes**: next-themes for dark/light mode

**Blog System Details**:

- Supports nested directory structure with category organization
- Automatic slug generation and TOC creation
- Reading time calculation
- Search functionality across title/content/tags
- Category and tag filtering

## Development Notes

- Uses **Bun** as package manager (bun@1.2.15)
- Web app runs on port 3001 by default (configurable via NEXT_PUBLIC_SERVER_PORT)
- Static export includes CNAME file pointing to dbuild.dev
- No linting or type checking commands defined at root level - use `bun check-types` for TypeScript validation
