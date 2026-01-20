#!/bin/bash
# @parseArger-begin
# @parseArger-help "Bashticle: From Ralph to Eric - An interactive blog article about the Eric Loop concept for AI-assisted development" --option "help" --short-option "h"
# @parseArger-version "1.0.0" --option "version" --short-option "v"
# @parseArger-verbose --option "verbose" --level "0" --quiet-option "quiet"
_has_colors=0
if [ -t 1 ]; then # Check if stdout is a terminal
	ncolors=$(tput colors 2>/dev/null)
	if [ -n "$ncolors" ] && [ "$ncolors" -ge 8 ]; then
		_has_colors=1
	fi
fi
# @parseArger-declarations
# @parseArger pos step "Specific step to jump to (optional)" --optional --complete-custom "echo 'intro\neric-loop\ntaskomatic\ninit\nprd\nrefine\ntasks\nagents\nexecute'"
# @parseArger opt ai-provider "AI provider to use (openrouter, anthropic, etc.)" --short p --default-value "openrouter"
# @parseArger opt ai-model "AI model to use" --short m --default-value "nvidia/nemotron-3-nano-30b-a3b:free"
# @parseArger opt api-key "API key for the AI provider" --short k
# @parseArger opt project-name "Name for the project to create" --default-value "tiny-till"
# @parseArger opt reasoning "Reasoning tokens for AI models" --default-value "4096"
# @parseArger flag run-command "Actually execute commands instead of just echoing them" --short r --no-name dry-run
# @parseArger flag stream "Enable streaming output for AI commands" --short s --on
# @parseArger flag verbose "Show additional details" --short v
# @parseArger-declarations-end

# @parseArger-utils
_helpHasBeenPrinted=1;
_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)";
# @parseArger-utils-end

# @parseArger-parsing

__cli_arg_count=$#;

die()
{
	local _ret=1
    if [[ -n "$2" ]] && [[ "$2" =~ ^[0-9]+$ ]]; then
   	_ret="$2"
    fi
	test "${_PRINT_HELP:-no}" = yes && print_help >&2
	log "$1" -3 >&2
	exit "${_ret}"
}


begins_with_short_option()
{
	local first_option all_short_options=''
	first_option="${1:0:1}"
	test "$all_short_options" = "${all_short_options/$first_option/}" && return 1 || return 0
}

# POSITIONALS ARGUMENTS
_positionals=();
_optional_positionals=();
_arg_step="";
_optional_positionals+=("_arg_step");
# OPTIONALS ARGUMENTS
_arg_ai_provider="openrouter"
_arg_ai_model="nvidia/nemotron-3-nano-30b-a3b:free"
_arg_api_key=
_arg_project_name="tiny-till"
_arg_reasoning="4096"
# FLAGS
_arg_run_command="off"
_arg_stream="on"
_arg_verbose="off"
# NESTED
_verbose_level="0";



print_help()
{
	_triggerSCHelp=1;

	if [[ "$_helpHasBeenPrinted" == "1" ]]; then
		_helpHasBeenPrinted=0;
		echo -e "Bashticle: From Ralph to Eric - An interactive blog article about the Eric Loop concept for AI-assisted development:"
	echo -e "	step: Specific step to jump to (optional), optional"
	echo -e "	-p, --ai-provider <ai-provider>: AI provider to use (openrouter, anthropic, etc.) [default: ' openrouter ']"
	echo -e "	-m, --ai-model <ai-model>: AI model to use [default: ' nvidia/nemotron-3-nano-30b-a3b:free ']"
	echo -e "	-k, --api-key <api-key>: API key for the AI provider"
	echo -e "	--project-name <project-name>: Name for the project to create [default: ' tiny-till ']"
	echo -e "	--reasoning <reasoning>: Reasoning tokens for AI models [default: ' 4096 ']"
	echo -e "	-r|--run-command|--dry-run: Actually execute commands instead of just echoing them"
	echo -e "	-s|--stream|--no-stream: Enable streaming output for AI commands, on by default (use --no-stream to turn it off)"
	echo -e "	-v|--verbose|--no-verbose: Show additional details"
	echo -e "Usage :
	$0 [step] [--ai-provider <value>] [--ai-model <value>] [--api-key <value>] [--project-name <value>] [--reasoning <value>] [--[no-]run-command] [--[no-]stream] [--[no-]verbose]";
	fi

}

log() {
	local _arg_msg="${1}";
	local _arg_level="${2:-0}";
	if [ "${_arg_level}" -le "${_verbose_level}" ]; then
		case "$_arg_level" in
			-3)
				_arg_COLOR="\033[0;31m";
				;;
			-2)
				_arg_COLOR="\033[0;33m";
				;;
			-1)
				_arg_COLOR="\033[1;33m";
				;;
			1)
				_arg_COLOR="\033[0;32m";
				;;
			2)
				_arg_COLOR="\033[1;36m";
				;;
			3)
				_arg_COLOR="\033[0;36m";
				;;
			*)
				_arg_COLOR="\033[0m";
				;;
		esac
		if [ "${_has_colors}" == "1" ]; then
			echo -e "${_arg_COLOR}${_arg_msg}\033[0m";
		else
			echo "${_arg_msg}";
		fi
	fi
}

parse_commandline()
{
	_positionals_count=0
	while test $# -gt 0
	do
		_key="$1"
		case "$_key" in
			-p|--ai-provider)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_ai_provider="$2"
				shift
				;;
			--ai-provider=*)
				_arg_ai_provider="${_key##--ai-provider=}"
				;;
			-p*)
				_arg_ai_provider="${_key##-p}"
				;;

			-m|--ai-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_ai_model="$2"
				shift
				;;
			--ai-model=*)
				_arg_ai_model="${_key##--ai-model=}"
				;;
			-m*)
				_arg_ai_model="${_key##-m}"
				;;

			-k|--api-key)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_api_key="$2"
				shift
				;;
			--api-key=*)
				_arg_api_key="${_key##--api-key=}"
				;;
			-k*)
				_arg_api_key="${_key##-k}"
				;;

			--project-name)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_project_name="$2"
				shift
				;;
			--project-name=*)
				_arg_project_name="${_key##--project-name=}"
				;;

			--reasoning)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_reasoning="$2"
				shift
				;;
			--reasoning=*)
				_arg_reasoning="${_key##--reasoning=}"
				;;

			-r|--run-command)
				_arg_run_command="on"
				;;
			--dry-run)
				_arg_run_command="off"
				;;
			-s|--stream)
				_arg_stream="on"
				;;
			--no-stream)
				_arg_stream="off"
				;;
			-v|--verbose)
				_arg_verbose="on"
				;;
			--no-verbose)
				_arg_verbose="off"
				;;
			-h|--help)
				print_help;
				exit 0;
				;;
			-h*)
				print_help;
				exit 0;
				;;
			-v|--version)
				print_version;
				exit 0;
				;;
			-v*)
				print_version;
				exit 0;
				;;
			--verbose)
				if [ $# -lt 2 ];then
					_verbose_level="$((_verbose_level + 1))";
				else
					_verbose_level="$2";
					shift;
				fi
				;;
			--quiet)
				if [ $# -lt 2 ];then
					_verbose_level="$((_verbose_level - 1))";
				else
					_verbose_level="-$2";
					shift;
				fi
				;;

				*)
				_last_positional="$1"
				_positionals+=("$_last_positional")
				_positionals_count=$((_positionals_count + 1))
				;;
		esac
		shift
	done
}


handle_passed_args_count()
{
	local _required_args_string=""
	if [ "${_positionals_count}" -gt 1 ] && [ "$_helpHasBeenPrinted" == "1" ];then
		_PRINT_HELP=yes die "FATAL ERROR: There were spurious positional arguments --- we expect at most 1 (namely: $_required_args_string), but got ${_positionals_count} (the last one was: '${_last_positional}').\n\t${_positionals[*]}" 1
	fi
	if [ "${_positionals_count}" -lt 0 ] && [ "$_helpHasBeenPrinted" == "1" ];then
		_PRINT_HELP=yes die "FATAL ERROR: Not enough positional arguments - we require at least 0 (namely: $_required_args_string), but got only ${_positionals_count}.
	${_positionals[*]}" 1;
	fi
}


assign_positional_args()
{
	local _positional_name _shift_for=$1;
	_positional_names="_arg_step ";
	shift "$_shift_for"
	for _positional_name in ${_positional_names};do
		test $# -gt 0 || break;
		eval "if [ \"\$_one_of${_positional_name}\" != \"\" ];then [[ \"\${_one_of${_positional_name}[*]}\" =~ \"\${1}\" ]];fi" || die "${_positional_name} must be one of: $(eval "echo \"\${_one_of${_positional_name}[*]}\"")" 1;
		local _match_var="_match${_positional_name}";
		local _regex="${!_match_var}";
		if [ -n "$_regex" ]; then
			[[ "${1}" =~ $_regex ]] || die "${_positional_name} does not match pattern: $_regex"
		fi
		eval "$_positional_name=\${1}" || die "Error during argument parsing, possibly an ParseArger bug." 1;
		shift;
	done
}

print_debug()
{
	print_help
	# shellcheck disable=SC2145
	echo "DEBUG: $0 $@";

	echo -e "	step: ${_arg_step}";
	echo -e "	ai-provider: ${_arg_ai_provider}";
	echo -e "	ai-model: ${_arg_ai_model}";
	echo -e "	api-key: ${_arg_api_key}";
	echo -e "	project-name: ${_arg_project_name}";
	echo -e "	reasoning: ${_arg_reasoning}";
	echo -e "	run-command: ${_arg_run_command}";
	echo -e "	stream: ${_arg_stream}";
	echo -e "	verbose: ${_arg_verbose}";

}


print_version()
{
	echo "1.0.0";
}


on_interrupt() {
	die Process aborted! 130;
}


parse_commandline "$@";
handle_passed_args_count;
assign_positional_args 1 "${_positionals[@]}";
trap on_interrupt INT;




# @parseArger-parsing-end
# print_debug "$@"
# @parseArger-end

# ============================================================================
# BASETICLE: From Ralph to Eric
# An interactive bash article about the Eric Loop concept
# ============================================================================

# ----------------------------------------------------------------------------
# Helper Functions
# ----------------------------------------------------------------------------

# Streaming text effect - display character by character
stream_text() {
  local text="$1"
  local delay="${2:-0.005}"  # 5ms per character for readable pace
  for ((i=0; i<${#text}; i++)); do
    echo -n "${text:$i:1}"
    sleep "$delay"
  done
  echo
}

# Print section header
print_section() {
  echo ""
  echo -e "\033[1;36m═══════════════════════════════════════════════════════════════════\033[0m"
  echo -e "\033[1;36m  $1\033[0m"
  echo -e "\033[1;36m═══════════════════════════════════════════════════════════════════\033[0m"
  echo ""
}

# Print subsection
print_subsection() {
  echo ""
  echo -e "\033[1;33m▶ $1\033[0m"
  echo ""
}

# Prompt user to continue
prompt_continue() {
  echo ""
  echo -e "\033[0;32m[Press Enter to continue...]\033[0m"
  read -r
}

# Execute or echo command based on flags
run_cmd() {
  local cmd_array=("$@")
  if [ "$_arg_run_command" == "on" ]; then
    echo -e "\033[0;36m▶ Executing:\033[0m ${cmd_array[*]}"
    "${cmd_array[@]}"
  else
    echo -e "\033[0;90m▶ Would run:\033[0m ${cmd_array[*]}"
  fi
}

# Display command with explanation
show_cmd() {
  local explanation="$1"
  shift
  local cmd_array=("$@")
  echo ""
  echo -e "\033[0;37m$explanation\033[0m"
  echo -e "\033[1;35m$\033[0m ${cmd_array[*]}"
}

# ----------------------------------------------------------------------------
# Section Functions
# ----------------------------------------------------------------------------

show_intro() {
  print_subsection "Introduction"

  stream_text "I won't reintroduce the concept of Ralph loop. If you have been anywhere near AI in the first half of 2026, you have heard of it!"
  echo ""

  stream_text "You probably know which comics character Ralph is referring to, but Eric... who could it possibly be?"
  echo ""

  stream_text "If you thought short, fat and angry, you'd be right! I'm of course talking about Eric Cartman from South Park!"
  echo ""

  stream_text "While Ralph is naive and innocent, Eric is calculating and manipulative. Not something I'd look for in a Human, but for managing a bunch of AIs?"
  echo ""
  echo -e "\033[1;36mHELL YEAH!\033[0m"
  echo ""
}

show_eric_loop() {
  print_section "The Eric Loop"

  stream_text "An idea, even if good, always needs some work and some back and forth to be implemented."
  echo ""

  stream_text "So we first expose the idea to the AI to get a requirement document (PRD) and we work on it!"
  echo ""

  print_subsection "Step 1: Read and Refine"
  stream_text "How? You'll need to read first! And straight away update parts you don't agree with or things you need to be more thorough!"
  echo ""

  stream_text "Once that is done, ask AI models to ask YOU questions about the PRD and give all those, the PRD and your replies to another AI for update."
  echo ""

  stream_text "Rinse, Repeat, until you are satisfied with the document."
  echo ""

  stream_text "You can even get multiple models go at it to then compare and merge the outputs, using AI, of course :D"
  echo ""

  print_subsection "Step 2: Task Formalization"
  stream_text "This is where we start diverging from the basic Ralph loop."
  echo ""

  stream_text "Instead of just passing that to the AI and hoping tasks will be implemented properly, we get an AI to pre-split and formalize the tasks and sub-tasks into a list!"
  echo ""

  print_subsection "Step 3: Multi-Phase Execution"
  stream_text "The rift grows further as we split the task implementation in several steps:"
  echo ""
  echo "  • Planning phase: Analyze requirements, existing code, conduct research"
  echo "  • Execution phase: Do the actual work"
  echo "  • Verification phase: Check types, build, tests (optional) with automated feedback"
  echo "  • Review phase: Send back to execution for refinement if needed"
  echo ""

  stream_text "Once all that is done? The Eric loop goes on for the next phase of the plan, just like Ralph!"
  echo ""
}

show_taskomatic() {
  print_section "Task-o-matic"

  stream_text "Yep, I already kind of made said tool :D!"
  echo ""
  echo -e "\033[0;36mhttps://task-o-matic.dev\033[0m"
  echo ""

  stream_text "I'll write more about it in a future post! But you already have plenty of content to go through on the site itself."
  echo ""

  stream_text "But in a nutshell, it helps you:"
  echo ""
  echo "  • Create PRDs"
  echo "  • Refine them with AI-generated questions"
  echo "  • Split into tasks and subtasks"
  echo "  • Wire all that to your favorite AI harness"
  echo ""
}

show_init() {
  print_section "Let's Get This Rolling"

  stream_text "For the AI to operate properly, we need a specific stack. That way, we limit hallucination!"
  echo ""

  print_subsection "Initialisation and Bootstrapping"
  stream_text "Task-o-matic uses better-t-stack.dev under the hood to bootstrap the stack."
  echo ""

  show_cmd "Initialize the project with task-o-matic:" \
    npx task-o-matic@latest init init \
    --project-name "$_arg_project_name" \
    --frontend tanstack-router \
    --backend none \
    --package-manager bun

  run_cmd npx task-o-matic@latest init init \
    --project-name "$_arg_project_name" \
    --frontend tanstack-router \
    --backend none \
    --package-manager bun

  echo ""
  show_cmd "Change into the project directory:" \
    cd "$_arg_project_name"

  run_cmd cd "$_arg_project_name"

  echo ""
  stream_text "Boom, a monorepo for $($_arg_project_name)! Batteries included: tailwind, shadcn, build script and all :D"
  echo ""

  stream_text "You will need a .env file to configure the AI stack."
  echo ""

  print_subsection "Create .env file"
  echo ""
  echo -e "\033[0;37mCreate .env with your AI configuration:\033[0m"
  echo -e "\033[1;35m$\033[0m cat > .env <<EOF"
  echo "AI_PROVIDER=$_arg_ai_provider"
  echo "AI_MODEL=$_arg_ai_model"
  echo "${_arg_ai_provider^^}_API_KEY=${_arg_api_key:-"your-api-key-here"}"
  echo "EOF"

  if [ "$_arg_run_command" == "on" ]; then
    cat > .env <<EOF
AI_PROVIDER=$_arg_ai_provider
AI_MODEL=$_arg_ai_model
${_arg_ai_provider^^}_API_KEY=${_arg_api_key:-"your-api-key-here"}
EOF
    echo -e "\033[0;36m▶ Created .env file\033[0m"
  else
    echo -e "\033[0;90m▶ Would create .env file\033[0m"
  fi
  echo ""

  stream_text "Note: Make sure to update the API key with your actual key!"
  echo ""
}

show_prd_create() {
  print_section "Document the Requirements"

  stream_text "Now, we tell the AI what we want to do. But why would we limit ourselves to 1 model?"
  echo ""

  stream_text "We're going to build 'Tiny-till' - a small web app, local first, that serves as a very simple till for on-the-go sellers."
  echo ""

  print_subsection "Project Description"
  stream_text "The idea came from watching my baker who does delivery tours twice a week. She's always fighting her calculator to make the tally!"
  echo ""

  stream_text "Tiny-till will have:"
  echo ""
  echo "  • Product management: add/remove products (name + price, image optional)"
  echo "  • Tally page: grid of products for fast access (2-3 on mobile, 4-6 on tablet)"
  echo "  • Settings page: theme, display, import/export catalog"
  echo ""

  print_subsection "Generate PRD with Multiple AIs"

  local prd_create_cmd=(
    npx task-o-matic@latest prd create
    --ai-reasoning "$_arg_reasoning"
  )

  if [ "$_arg_stream" == "on" ]; then
    prd_create_cmd+=(--stream)
  fi

  prd_create_cmd+=(
    --ai "xiaomi/mimo-v2-flash:free;reasoning=$_arg_reasoning"
    --ai "mistralai/devstral-2512:free:free"
    --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=$_arg_reasoning"
    --ai "minimax/minimax-m2.1;reasoning=$_arg_reasoning"
    --ai "z-ai/glm-4.7;reasoning=$_arg_reasoning"
    --ai "google/gemini-3-flash-preview;reasoning=$_arg_reasoning"
    --combine-ai "z-ai/glm-4.7;reasoning=$_arg_reasoning"
    "I would like to build tiny-till. It will be a small web app, local first (for sparse internet connection) that serves as a very simple till for on-the-go sellers, farmers markets stalls, etc. The idea came from me watching my baker who does delivery tours twice a week. She is always fighting her calculator to make the tally and she grumbles about it a lot. The idea would be only a few screens: product management (add/remove product, name+price (img optional): a list with action buttons, + or edit happen inline (+ at the top)), a tally page: grid of product for fast and easy access (row of 2 or 3 for mobile, 4 to 6 on tablet, normal/compact variant, control by setting), a settings page: theme, display, import/export catalog. No saving, it is purely done to calculate the price and is not meant for accounting purposes. I am using tanstack-router and the project is already set up with tailwind css, typescript and shadcnUI"
  )

  show_cmd "Generate PRD using multiple AI models:" "${prd_create_cmd[@]}"
  run_cmd "${prd_create_cmd[@]}"

  echo ""
  stream_text "A few minutes later... You'll get yourself a PRD document!"
  echo ""
}

show_prd_refine() {
  print_section "Petrol is Not the Only Thing That Needs Refining!"

  stream_text "The PRD doesn't really need more questions, but let's see what Claude has to say, shall we?"
  echo ""

  print_subsection "Generate Questions"

  local question_cmd=(
    npx task-o-matic@latest prd question
  )

  if [ "$_arg_stream" == "on" ]; then
    question_cmd+=(--stream)
  fi

  question_cmd+=(
    --file .task-o-matic/prd/prd-master.md
    --ai-model anthropic/claude-4.5-sonnet
    --ai-reasoning 1500
  )

  show_cmd "Ask AI to generate clarifying questions:" "${question_cmd[@]}"
  run_cmd "${question_cmd[@]}"

  echo ""
  print_subsection "Answer Questions and Refine"
  stream_text "Well, let's answer those... some are pertinent! I guess that's why we bring out the big guns!"
  echo ""

  stream_text "The questions are asked interactively, so you can provide your answers."
  echo ""

  local refine_cmd=(
    npx task-o-matic@latest prd refine
  )

  if [ "$_arg_stream" == "on" ]; then
    refine_cmd+=(--stream)
  fi

  refine_cmd+=(
    --file .task-o-matic/prd/prd-master.md
    --ai-model anthropic/claude-4.5-sonnet
    --ai-reasoning 1500
    --output .task-o-matic/prd/prd-master-refined.md
    --questions prd-questions.json
  )

  show_cmd "Refine PRD with your answers:" "${refine_cmd[@]}"
  run_cmd "${refine_cmd[@]}"

  echo ""
  stream_text "Well, this little stunt just cost me a nice 15 cents... more or less 10x more than the first PRD generation..."
  echo ""

  stream_text "I don't know what is the most amazing..."
  echo ""
  echo "  • 1 call costs more than the 10 previous"
  echo "  • I can complain about a 2 days worth of work document costing 15 cents for only a few seconds of work!"
  echo "  • A document worth 2 of my days of work costs 15 cents to produce... in only a few seconds..."
  echo ""
}

show_task_parsing() {
  print_section "Touching Up and Go"

  stream_text "When I said seconds, I lied. I spent 5 minutes editing the file to fix lib versions, mark install and config work as done, and set expectation for the design."
  echo ""

  stream_text "The last thing we have to do is ask an AI to split into main tasks."
  echo ""

  stream_text "Once again, I won't only do 1, but this time, I'll ask Claude to be the final task creator, from others' input!"
  echo ""

  print_subsection "Parse PRD into Main Tasks"

  local parse_cmd=(
    npx task-o-matic@latest prd parse
    --ai-reasoning "$_arg_reasoning"
  )

  if [ "$_arg_stream" == "on" ]; then
    parse_cmd+=(--stream)
  fi

  parse_cmd+=(
    --ai "xiaomi/mimo-v2-flash:free;reasoning=$_arg_reasoning"
    --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=$_arg_reasoning"
    --ai "z-ai/glm-4.7;reasoning=$_arg_reasoning"
    --combine-ai "anthropic/claude-4.5-sonnet;reasoning=$_arg_reasoning"
  )

  show_cmd "Parse PRD into main tasks:" "${parse_cmd[@]}"
  run_cmd "${parse_cmd[@]}"

  echo ""
  stream_text "And there goes another 8.2 cents burnt for the token Gods, but in return, we get a detailed breakdown of the tasks!"
  echo ""

  print_subsection "Split Tasks into Subtasks"
  stream_text "We still have to split those tasks though... to make them more palatable for the current crop of AI models!"
  echo ""

  stream_text "You should really consider reviewing the tasks in detail before splitting, not vibe planning like a muppet!"
  echo ""

  local split_cmd=(
    npx task-o-matic@latest tasks split
    --all
    --stream
    --reasoning "$_arg_reasoning"
    --ai "xiaomi/mimo-v2-flash:free;reasoning=$_arg_reasoning"
    --ai "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=$_arg_reasoning"
    --ai "z-ai/glm-4.7;reasoning=$_arg_reasoning"
    --combine-ai "anthropic/claude-4.5-sonnet;reasoning=$_arg_reasoning"
  )

  show_cmd "Split tasks into subtasks:" "${split_cmd[@]}"
  run_cmd "${split_cmd[@]}"

  echo ""
  stream_text "Burnt a tenth of my credits! But now... we are actually ready! Almost..."
  echo ""
}

show_agents_setup() {
  print_section "AGENTS.md"

  stream_text "Or CLAUDE.md, or GEMINI.md - depends on your harness of choice."
  echo ""

  stream_text "For me, it's opencode. I'm going to run the /init prompt in opencode!"
  echo ""

  print_subsection "Initialize AI Harness"

  local opencode_init_cmd=(opencode run "/init")

  show_cmd "Initialize your AI harness:" "${opencode_init_cmd[@]}"
  run_cmd "${opencode_init_cmd[@]}"

  echo ""
  print_subsection "Add Agent Instructions"
  stream_text "It's not mandatory, but it's a good way to prevent dumb mistakes and set some proper behavior."
  echo ""

  stream_text "For me, I'll add the following:"
  echo ""
  echo "  • Not to run the dev server"
  echo "  • Not start background/long running processes"
  echo "  • Not to use ':any', 'as any' or 'any' as type - I want a typesafe codebase"
  echo "  • Before claiming success, 'bun run check-types' and 'bun run build' must both succeed"
  echo "  • To fix LSP errors when they happen"
  echo "  • Use shadcn components as much as possible"
  echo "  • Stay DRY and prefer creating custom components"
  echo "  • Use adapted skills when possible (frontend-design is mandatory for frontend)"
  echo "  • It's a static app hosted on GitHub Pages"
  echo "  • Use Context7 MCP for up-to-date documentation"
  echo ""

  local add_rules_cmd=(
    opencode run "Add the following to the AGENTS.md, remove any conflicting instructions you created, these take precedence: Not to run the dev server; not start background/long running processes; not to use ':any', 'as any' or 'any' as type, I want a typesafe codebase; before claiming success, 'bun run check-types' and 'bun run build' must both succeed; to fix LSP errors when they happen; use shadcn components as much as possible; stay DRY and prefer creating custom components and utilities than repeat code; use adapted skills when possible (frontend-design skill is mandatory when working on the frontend); that it is a static app project that will be hosted on github pages; to use Context7 MCP in case more documentation is needed" -c
  )

  show_cmd "Add agent instructions:" "${add_rules_cmd[@]}"
  run_cmd "${add_rules_cmd[@]}"

  echo ""
  stream_text "I might add more as the agent works if I see recurring errors and dumb things happening."
  echo ""
}

show_execution() {
  print_section "Time to Let Eric Loose..."

  stream_text "Well, guys, stash your parents away 'cause we are going to let Eric go at it!"
  echo ""

  stream_text "Because I am El CheapoDev DelBrokeCasa, I am going to use my GLM coding plan to code."
  echo ""

  stream_text "That way, I won't break the bank and it's OK enough for something like that, I think!"
  echo ""

  stream_text "If you'd rather use Claude Code, use the --tool claude option. (or codex/gemini/kilo)"
  echo ""

  stream_text "But opencode is nicer as it streams the content out so you see what is happening!"
  echo ""

  print_subsection "Execute the Complete Loop"

  local execute_cmd=(
    npx task-o-matic@latest tasks execute-loop
    --include-prd
    --plan
    --plan-model zai-coding-plan/glm-4.7
    --review
    --review-model zai-coding-plan/glm-4.7
    --model zai-coding-plan/glm-4.7
    --validate "npm run check-types && npm run build"
  )

  show_cmd "Execute the complete Eric Loop:" "${execute_cmd[@]}"
  run_cmd "${execute_cmd[@]}"

  echo ""
  stream_text "And just like that, Eric takes the wheel and builds your project!"
  echo ""
}

show_outro() {
  print_section "✨ End of Article"

  stream_text "Thanks for reading! The Eric Loop is all about:"
  echo ""
  echo "  • Iterative refinement with multiple AI perspectives"
  echo "  • Proper task breakdown before execution"
  echo "  • Multi-phase implementation (plan, execute, verify, review)"
  echo "  • Using the right model for each phase"
  echo ""

  stream_text "Give it a try with your own project ideas!"
  echo ""
  echo -e "\033[1;36mHappy coding! 🚀\033[0m"
  echo ""
}

# ----------------------------------------------------------------------------
# Main Flow
# ----------------------------------------------------------------------------

main() {
  # Clear screen for fresh start
  clear

  # Welcome
  print_section "📰 From Ralph to Eric"
  echo ""
  stream_text "An interactive bashticle about the Eric Loop concept for AI-assisted development"
  echo ""
  stream_text "Everyone is going crazy about Ralph loops, and they are cool, but I think we need to upgrade the concept to an Eric loop!"
  echo ""

  prompt_continue

  # Determine where to start
  local start_section="${_arg_step:-intro}"

  case "$start_section" in
    intro)
      show_intro
      prompt_continue
      ;&  # fall through
    eric-loop)
      show_eric_loop
      prompt_continue
      ;&  # fall through
    taskomatic)
      show_taskomatic
      prompt_continue
      ;&  # fall through
    init)
      show_init
      prompt_continue
      ;&  # fall through
    prd)
      show_prd_create
      prompt_continue
      ;&  # fall through
    refine)
      show_prd_refine
      prompt_continue
      ;&  # fall through
    tasks)
      show_task_parsing
      prompt_continue
      ;&  # fall through
    agents)
      show_agents_setup
      prompt_continue
      ;&  # fall through
    execute|"")
      show_execution
      prompt_continue
      show_outro
      ;;
    *)
      echo -e "\033[0;31mUnknown step: $start_section\033[0m"
      echo "Available steps: intro, eric-loop, taskomatic, init, prd, refine, tasks, agents, execute"
      exit 1
      ;;
  esac
}

# Run main
main
