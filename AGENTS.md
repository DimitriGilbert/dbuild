# AGENTS.md

This guide is for AI coding agents working in this repository.

## Development Commands

### Root Commands (run from repository root)
- `bun install` - Install dependencies for all apps
- `bun run dev` - Start all applications in development mode
- `bun run build` - Build all applications for production
- `bun run check-types` - Check TypeScript types across all apps (includes all workspaces)
- `bun run dev:web` - Start only the web application
- `bun run dev:native` - Start only native app
- `bun run dev:server` - Start only server app

### Web App Commands (from apps/web/)
- `bun run dev` - Start Next.js dev server (port 3001 via NEXT_PUBLIC_SERVER_PORT)
- `bun run build` - Build Next.js application
- `bun run start` - Start production server
- `bun run lint` - Run Next.js linting (ESLint)
- `bun run to2web` - Build and deploy to GitHub Pages
- `bun run validate-content` - Validate blog content
- `bun run setup-content` - Setup blog content structure

### Testing
No test framework is currently configured. When adding tests, check with the user first for testing preferences.

## Code Style Guidelines

### Import Style
- Use absolute imports with `@/*` alias (configured in tsconfig.json)
  - Example: `import { Button } from "@/components/ui/button"`
  - Example: `import { cn } from "@/lib/utils"`
- Use `import type` for type-only imports to avoid import cycles
  - Example: `import type React from "react"`
- For external dependencies, use direct imports without file extensions
  - Example: `import fs from "fs"`

### TypeScript
- Strict mode is enabled (no implicit any)
- Always type function parameters and return values
- Export interfaces for public APIs
- Use utility types from packages (e.g., `ClassValue` from clsx)
- Define interfaces for data models (BlogPost, Project, etc.)
- Use `type` for type unions, aliases; use `interface` for object shapes

### Naming Conventions
- **Components**: PascalCase (e.g., `ProjectHero`, `MarkdownRenderer`)
- **Functions/Variables**: camelCase (e.g., `getAllPosts`, `calculateReadTime`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `BLOG_DIR`)
- **Interfaces/Types**: PascalCase (e.g., `BlogPost`, `Project`)
- **Files**: kebab-case for components (e.g., `project-hero.tsx`), camelCase for utilities (e.g., `blog.ts`)

### Component Patterns
- Use shadcn/ui patterns with `cva` (class-variance-authority) for component variants
- Use `cn()` utility for className merging (defined in lib/utils.ts)
- Components export both the component and variants (e.g., `Button, buttonVariants`)
- Client components must have `"use client"` at the top
- Prefer server components (default in Next.js App Router)
- Use `async/await` for data fetching in server components
- Use `params: Promise<...>` for Next.js 15 route params

### Error Handling
- Use try-catch blocks for file operations and data fetching
- Log errors with `console.error()` or `console.warn()`
- Return empty arrays or null on failure to maintain graceful degradation
  - Example: `catch (error) { console.error('Error:', error); return [] }`
- Don't throw errors that crash the app; handle gracefully

### File Organization
```
apps/web/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── ui/          # shadcn/ui components
├── lib/             # Utility functions and libraries
├── data/            # Static data (projects.json)
├── content/         # Blog posts and project content
└── src/             # Source code (app, components, lib)
```

### Next.js Specifics
- Use App Router (not Pages Router)
- Generate static params with `generateStaticParams()`
- Define metadata with `generateMetadata()` for SEO
- Use `notFound()` for 404 pages
- Static export for GitHub Pages deployment
- Use `Link` from next/link for navigation
- Use `usePathname()` from next/navigation for current route

### Content & Data
- Blog posts: Markdown files in `content/blog/` with frontmatter (gray-matter)
- Projects: JSON data in `data/projects.json`
- Support nested directory structure with `_index.md` for category pages
- Frontmatter supports: title, description, date, category, tags, slug
- Automatic TOC generation from markdown headings

### Styling
- Use TailwindCSS for all styling
- Use shadcn/ui components with Radix UI primitives
- Use `className` prop for styling
- Responsive design with mobile-first approach
- Dark mode support via next-themes

### Code Quality
- No comments in production code (clean code principle)
- Keep functions small and focused
- Avoid inline styles; use Tailwind classes
- Prefer early returns over nested conditionals
- Use array methods (map, filter, find, etc.) over loops where appropriate

### Package Management
- Use **Bun** as package manager (bun@1.2.15)
- Run commands with `bun run` or `bunx` for executables
- Workspaces are managed via Turborepo

### No Linting/Formatting Config
- No .eslintrc or .prettierrc files present
- Follow existing code patterns as the style guide
- Code appears clean and consistent without explicit formatting config

## IMPORTANT

- NO `await import` are allowed ! STRICTLY FORBIDDEN !
- `require` is punishable by death ! STRICTLY FORBIDDEN !
- `:any` and `as any` are forbidden ! STRICTLY FORBIDDEN !
- NO `await import` are allowed ! STRICTLY FORBIDDEN !
- `require` is punishable by death ! STRICTLY FORBIDDEN !
- `:any` and `as any` are forbidden ! STRICTLY FORBIDDEN !
- LSP errors MUST be FIXED ! fixing LSP errors is NOT OPTIONAL !
- LSP errors **MUST be FIXED** ! fixing LSP errors is **NOT OPTIONAL** !
- **LSP errors MUST be FIXED** ! fixing LSP errors is **NOT OPTIONAL** !
- **LSP errors MUST be FIXED IMMEDIATELY** ! DO NOT IGNORE ! DO NOT DELAY ! DO NOT ADD TECHNICAL DEBT ! **LSP errors MUST be FIXED IMMEDIATELY**
- use context7 in case you need up to date documentation
- use your frontend-design skill when you have to create any rendering
  - Use shadcn/ui components
  - Use `className` prop for styling, apps/web/src/index.css for the general themes, use existing color variables to match
  - Responsive design with mobile-first approach
  - **Follow existing code patterns as the style guide**
- **DO NOT START LONG RUNNING PROCESSES** ! NO `bun run dev` !!! Strictly forbidden !
