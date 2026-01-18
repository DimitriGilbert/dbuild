# Installing the Bashticle Skill

This skill helps create interactive bash articles from markdown blog posts.

## Installation

### Option 1: Clone and Link (Recommended)

1. **Clone or navigate to the dbuild.io repo:**
   ```bash
   cd /path/to/dbuild.io
   ```

2. **Create a symlink in your Claude skills directory:**
   ```bash
   # macOS/Linux
   ln -s "$(pwd)/skills/bashticle" ~/.claude/skills/bashticle

   # Or with Claude Code specific path
   ln -s "$(pwd)/skills/bashticle" ~/.claude/skills/bashticle
   ```

3. **Restart Claude Code** to load the skill

### Option 2: Copy to Skills Directory

```bash
cp -r /path/to/dbuild.io/skills/bashticle ~/.claude/skills/bashticle
```

### Option 3: Git Submodule (For development)

```bash
cd ~/.claude/skills
git submodule add https://github.com/yourusername/dbuild.io.git bashticle
cd bashticle
git sparse-checkout set skills/bashticle
```

## Verification

After installation, the skill should be available. Test it:

```bash
# In Claude Code, ask:
"List available skills"
# Should show bashticle

"Use bashticle to create an article from post.md"
```

## Skill Structure

```
bashticle/
├── SKILL.md                 # Main skill documentation
├── INSTALL.md              # This file
├── scripts/
│   └── generate-bashticle.sh  # Generation script
└── references/
    ├── EXAMPLE.md          # Example bashticle reference
    └── helpers.md          # Helper functions reference
```

## Usage

Once installed, use the bashticle skill in Claude Code:

```
"Create a bashticle from apps/web/content/blog/my-post/index.md"

"Convert this markdown article to an interactive bash script"

"Use bashticle to generate from post.md --ai-provider anthropic"
```

The skill will:
1. Parse the markdown file
2. Extract sections and code blocks
3. Generate a bash script with parseArger
4. Add interactive features (streaming, prompts)
5. Save to the same directory as the source

## Troubleshooting

**Skill not found:**
- Verify symlink points to correct location
- Restart Claude Code completely
- Check `~/.claude/skills/` directory exists

**ParseArger not found:**
- The skill assumes parseArger is in your PATH
- Install parseArger if needed: `npm install -g parsearger`

**Permission denied on generated script:**
- The skill automatically makes scripts executable
- If needed: `chmod +x your-bashticle.sh`

## Uninstallation

```bash
rm -rf ~/.claude/skills/bashticle
```

Or remove the symlink:
```bash
rm ~/.claude/skills/bashticle
```
