---
name: bashticle
description: Create interactive bash articles (bashticles) from markdown blog posts with streaming text, command execution, and user interaction
---

# Bashticle

Transform markdown blog posts into interactive bash scripts that users can read and execute directly from their terminal.

## When to Use

Use this skill when a user asks to:
- "Create a bashticle from this markdown"
- "Turn this article into an interactive bash script"
- "Make a terminal-based interactive article"
- "Convert blog.md to a bash article"

## Two-Phase Approach

Bashticle creation uses a two-phase approach:

### Phase 1: Generator Script (Boring, Structural)
The `bashticle-generator.sh` script does the structural work:

```bash
# Run the generator
bashticle-generator.sh article.md
# Or with custom output:
bashticle-generator.sh article.md --output-file custom.sh
```

**What it does:**
- Parses markdown for structure (title, sections)
- Generates basic bashticle with STANDARD options only
- Creates section function stubs
- Builds main navigation flow

**Standard options included:**
- `--step` - Jump to specific section
- `--run-command / -r` - Execute commands vs echo
- `--dry-run / -d` - Echo only (default: ON)
- `--stream / -s` - Enable streaming (default: ON)
- `--verbose / -v` - Verbose output

### Phase 2: AI (Smart, Context-Aware)
The AI (via this skill) enhances the bashticle:

1. **Read both files**: Original markdown + generated bashticle
2. **Use `parseArger parse`** to add article-specific options:
   ```bash
   parseArger parse bashticle.sh --inplace \
     --opt 'ai-provider "AI provider" --short p --default-value "openrouter"' \
     --opt 'ai-model "AI model" --short m' \
     --opt 'api-key "API key" --short k' \
     --opt 'project-name "Project name"' \
     --opt 'reasoning "Reasoning tokens" --default-value "4096"'
   ```
3. **Fill in section functions** with actual content
4. **Convert code blocks** to command arrays with proper variable injection

## What Gets Generated

A `.sh` file with:
- **parseArger CLI** - Full argument parsing with sensible defaults
- **Helper functions** - stream_text, print_section, prompt_continue, run_cmd, show_cmd
- **Section stubs** - One function per markdown section (AI fills these)
- **Main flow** - Navigation with `--step` support

## Example Workflow

```bash
# Step 1: Generate basic structure
bashticle-generator.sh article.md

# Step 2: AI enhances it (via this skill)
# - Adds article-specific options with parseArger parse
# - Fills in section content
# - Converts code blocks to command arrays
```

## Converting Markdown to Bash

### Sections (## headers)
Each `##` or `###` header becomes a bash function:

```markdown
## Getting Started
Content here...
```

Generated stub:
```bash
show_getting_started() {
  print_section "Getting Started"
  # TODO: AI fills this in with actual content
  prompt_continue
}
```

AI fills in:
```bash
show_getting_started() {
  print_section "Getting Started"

  stream_text "Content here..."

  # Convert code blocks to command arrays
  local init_cmd=(npm install)
  show_cmd "Install dependencies" npm install
  run_cmd "${init_cmd[@]}"

  prompt_continue
}
```

### Code Blocks (```bash)
Code blocks are converted to command arrays with variable injection:

```markdown
```bash
npx task-o-matic@latest init --project-name my-project
```
```

AI converts to:
```bash
local init_cmd=(
  npx task-o-matic@latest init
  --project-name "$_arg_project_name"  # Variable injection
)
run_cmd "${init_cmd[@]}"
```

## Helper Functions

```bash
stream_text "text" [delay]           # Typewriter effect (5ms default)
print_section "title"                # Cyan section header
print_subsection "title"             # Yellow subsection
prompt_continue                      # Green "Press Enter" prompt
run_cmd arg1 arg2 ...               # Execute or echo based on flags
show_cmd "explanation" cmd ...      # Display command with description
```

## Available Variables

Variables from CLI arguments (after AI adds them):

```bash
$_arg_ai_provider     # --ai-provider value (if AI article)
$_arg_ai_model        # --ai-model value (if AI article)
$_arg_api_key         # --api-key value (if AI article)
$_arg_project_name    # --project-name value (if applicable)
$_arg_reasoning       # --reasoning value (if AI article)
$_arg_stream          # --stream flag
$_arg_run_command     # --run-command flag
$_arg_dry_run         # --dry-run flag
$_arg_verbose         # --verbose flag
$_arg_step            # Section to jump to
```

## Color Scheme

- **Cyan (36)**: Section headers
- **Yellow (33)**: Subsections
- **Green (32)**: User prompts
- **Magenta (35)**: Commands
- **White (37)**: Explanations
- **Gray (90)**: Dry-run messages

## Examples

**Generator creates:**
```bash
show_init() {
  print_section "Initialization"
  # TODO: AI fills this in
  prompt_continue
}
```

**AI converts to:**
```bash
show_init() {
  print_section "Initialization"

  stream_text "Let's initialize the project..."
  echo ""

  show_cmd "Initialize with task-o-matic" \
    npx task-o-matic@latest init init \
    --project-name "$_arg_project_name" \
    --frontend tanstack-router

  run_cmd npx task-o-matic@latest init init \
    --project-name "$_arg_project_name" \
    --frontend tanstack-router

  echo ""
  stream_text "Project initialized!"
  echo ""

  prompt_continue
}
```

## Running Generated Bashticles

```bash
# View help
./bashticle.sh --help

# Run full article (dry-run mode - default)
./bashticle.sh

# Jump to specific section
./bashticle.sh init

# Run with actual command execution (use in test directory!)
./bashticle.sh --run-command --ai-provider anthropic

# Disable streaming for faster output
./bashticle.sh --no-stream
```

## Implementation Notes

### What the Generator Does (Deterministic)
- Extract title from frontmatter or first heading
- Find all `##` and `###` sections
- Generate basic parseArger CLI with standard options
- Create section function stubs
- Build main navigation flow
- Always include helper functions

### What the AI Does (Context-Aware)
- Analyze article content to determine needed options
- Use `parseArger parse` to add relevant CLI options
- Fill in section functions with actual content
- Convert code blocks to command arrays
- Inject CLI variables into commands appropriately
- Handle article-specific patterns and conventions

## Files

- **Generator**: `scripts/bashticle-generator.sh`
- **Example bashticle**: `apps/web/content/blog/Black hole/From ralph to Eric/bashticle.sh`
- **Helpers reference**: `references/helpers.md`
