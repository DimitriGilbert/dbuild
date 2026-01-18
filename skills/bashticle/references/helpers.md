# Bashticle Helper Functions

## Core Functions

### `stream_text "text" [delay]`
Display text with typewriter effect for readable pacing.

```bash
stream_text "Hello, world!"           # Default 5ms per character
stream_text "Faster!" 0.002           # 2ms per character
```

### `print_section "title"`
Print a cyan section header with decorative borders.

```bash
print_section "Introduction"
```

Output:
```
═══════════════════════════════════════════════════════════════════
  Introduction
═══════════════════════════════════════════════════════════════════
```

### `print_subsection "title"`
Print a yellow subsection header.

```bash
print_subsection "Getting Started"
```

Output:
```
▶ Getting Started
```

### `prompt_continue`
Prompt user to press Enter before continuing.

```bash
prompt_continue
```

Output:
```
[Press Enter to continue...]
```

### `run_cmd arg1 arg2 ...`
Execute command array or echo based on `--run-command` flag.

```bash
local my_cmd=(echo "hello")
run_cmd "${my_cmd[@]}"

# Direct usage
run_cmd npm install
```

### `show_cmd "explanation" cmd ...`
Display command with explanation before running.

```bash
show_cmd "Install dependencies" npm install
run_cmd npm install
```

Output:
```
Install dependencies
$ npm install
▶ Would run: npm install
```

## Color Codes

| Color | Escape Code | Usage |
|-------|-------------|-------|
| Cyan | `\033[1;36m` | Section headers |
| Yellow | `\033[1;33m` | Subsections |
| Green | `\033[0;32m` | User prompts |
| Magenta | `\033[1;35m` | Commands |
| White | `\033[0;37m` | Explanations |
| Gray | `\033[0;90m` | Dry-run messages |
| Reset | `\033[0m` | Reset to default |

## Available Variables

Variables from CLI arguments:

```bash
$_arg_ai_provider     # --ai-provider value
$_arg_ai_model        # --ai-model value
$_arg_api_key         # --api-key value
$_arg_project_name    # --project-name value
$_arg_reasoning       # --reasoning value
$_arg_stream          # "on" or "off"
$_arg_run_command     # "on" or "off"
$_arg_dry_run         # "on" or "off"
$_arg_verbose         # "on" or "off"
$_arg_step            # Section to jump to
```

## Example: Creating a Section Function

```bash
show_my_section() {
  print_section "My Section Title"

  stream_text "This is the introduction text for my section."
  echo ""

  print_subsection "Subsection"
  stream_text "More content here..."
  echo ""

  # Show a command
  show_cmd "Run this command" npm run build

  # Execute or echo based on flags
  run_cmd npm run build

  echo ""
  stream_text "Explanation of what happened..."
  echo ""

  prompt_continue
}
```

## Example: Building Command Arrays

```bash
show_init() {
  print_subsection "Initialization"

  # Build command array with variable injection
  local init_cmd=(
    npx task-o-matic@latest init init
    --project-name "$_arg_project_name"
    --frontend tanstack-router
  )

  show_cmd "Initialize the project" "${init_cmd[@]}"
  run_cmd "${init_cmd[@]}"

  echo ""

  # Conditional flags
  local prd_cmd=(npx task-o-matic@latest prd create)

  if [ "$_arg_stream" == "on" ]; then
    prd_cmd+=(--stream)
  fi

  prd_cmd+=(
    --ai-reasoning "$_arg_reasoning"
    --ai "$_arg_ai_model"
  )

  run_cmd "${prd_cmd[@]}"
}
```
