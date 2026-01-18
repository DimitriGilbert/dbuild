# Skills Directory

This directory contains reusable skills that extend Claude Code's capabilities.

## Available Skills

### bashticle/
**Create interactive bash articles from markdown blog posts.**

Transform markdown into executable terminal articles with:
- Streaming text effects
- User interaction prompts
- Command execution vs echo modes
- AI configuration injection
- Section navigation

**Installation:** See [bashticle/INSTALL.md](bashticle/INSTALL.md)

**Usage:**
```
"Create a bashticle from article.md"
"Convert this blog post to an interactive bash script"
```

## Installing Skills

Skills in this directory can be installed by symlinking to your Claude skills folder:

```bash
# From this repo root
ln -s "$(pwd)/skills/bashticle" ~/.claude/skills/bashticle
```

Restart Claude Code to load the skill.

## Creating New Skills

To create a new skill:

1. Create directory: `skills/your-skill/`
2. Add `SKILL.md` with YAML frontmatter
3. Add scripts/, references/, or assets/ as needed
4. Document installation in `INSTALL.md`

See [bashticle](bashticle/) as a complete example.

## Skill Structure

```
skill-name/
├── SKILL.md          # Required: Main documentation with frontmatter
├── INSTALL.md        # Optional: Installation instructions
├── scripts/          # Optional: Executable scripts
├── references/       # Optional: Documentation, examples
└── assets/           # Optional: Templates, images
```
