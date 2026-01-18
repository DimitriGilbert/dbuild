# Example Bashticle

A complete example bashticle is available in the repo at:
```
apps/web/content/blog/Black hole/From ralph to Eric/bashticle.sh
```

## Features Demonstrated

1. **Full parseArger CLI** with all AI configuration options
2. **9 article sections** with streaming text and prompts
3. **Command arrays** with variable injection
4. **Conditional execution** based on flags
5. **Section navigation** with `--step` argument

## Running the Example

```bash
# View help
cd "apps/web/content/blog/Black hole/From ralph to Eric"
./bashticle.sh --help

# Run full article (dry-run mode - default)
./bashticle.sh

# Jump to specific section
./bashticle.sh init
./bashticle.sh prd

# Run with actual command execution (use in test directory!)
./bashticle.sh --run-command --ai-provider anthropic --ai-model claude-4.5-sonnet
```

## Section Structure

The example shows how to convert markdown headers to bash functions:

| Markdown | Bash Function |
|----------|---------------|
| `# From Ralph to Eric` | `main()` welcome |
| `## The Eric Loop` | `show_eric_loop()` |
| `## Task-o-matic` | `show_taskomatic()` |
| `## Let's Get This Rolling` | `show_init()` |
| `## Document the Requirements` | `show_prd_create()` |
| `## Petrol is Not the Only Thing...` | `show_prd_refine()` |
| `## Touching Up and Go` | `show_task_parsing()` |
| `## AGENTS.md` | `show_agents_setup()` |
| `## Time to Let Eric Loose...` | `show_execution()` |

## Command Conversion Example

Markdown code block:
````markdown
```bash
npx task-o-matic@latest prd create \
  --ai-reasoning 4096 \
  --stream \
  --ai "xiaomi/mimo-v2-flash:free;reasoning=4096"
```
````

Becomes in bashticle:
```bash
local prd_create_cmd=(
  npx task-o-matic@latest prd create
  --ai-reasoning "$_arg_reasoning"
)

if [ "$_arg_stream" == "on" ]; then
  prd_create_cmd+=(--stream)
fi

prd_create_cmd+=(
  --ai "xiaomi/mimo-v2-flash:free;reasoning=$_arg_reasoning"
)

show_cmd "Generate PRD using multiple AI models:" "${prd_create_cmd[@]}"
run_cmd "${prd_create_cmd[@]}"
```

## Learning from the Example

1. **Read the source markdown** at `index.md` in the same directory
2. **Compare to bashticle.sh** to see how it was converted
3. **Notice patterns:**
   - Each `##` section becomes a `show_*()` function
   - Code blocks become command arrays
   - Text becomes `stream_text()` calls
   - Headers become `print_section()` or `print_subsection()`
