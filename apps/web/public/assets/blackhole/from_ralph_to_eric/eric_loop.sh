#!/bin/bash
# @parseArger-begin
# @parseArger-help "Eric Loop - AI-powered development automation script. Automates the Eric Loop workflow for AI-driven development projects. Supports configurable AI models, tools, and verification commands for each phase." --option "help" --short-option "h"
# @parseArger-version "1.0.0" --option "version" --short-option "v"
# @parseArger-verbose --option "verbose" --level "0" --quiet-option "quiet"
# @parseArger-leftovers leftovers
_has_colors=0
if [ -t 1 ]; then # Check if stdout is a terminal
	ncolors=$(tput colors 2>/dev/null)
	if [ -n "$ncolors" ] && [ "$ncolors" -ge 8 ]; then
		_has_colors=1
	fi
fi
# @parseArger-declarations
# @parseArger opt config "Load configuration from file" --short c --complete "file"
# @parseArger opt taskomatic-version "Task-o-matic version to use" --default-value "@beta"
# @parseArger opt ai-provider "AI provider (openrouter/anthropic/openai/custom)" --default-value "openrouter"
# @parseArger opt ai-model "Default AI model" --default-value "z-ai/glm-4.7"
# @parseArger opt ai-key "AI API key (or set AI_KEY env var)"
# @parseArger opt ai-reasoning "Reasoning tokens for OpenRouter models"
# @parseArger opt max-tokens "Max tokens for AI" --default-value "32768"
# @parseArger opt temperature "AI temperature" --default-value "0.5"
# @parseArger opt prd-models "AI models for PRD creation (repeatable)" --repeat
# @parseArger opt prd-combine "Model to combine multiple PRDs"
# @parseArger opt prd-output-dir "Output directory for PRDs" --default-value ".task-o-matic/prd"
# @parseArger opt question-model "Model for generating PRD questions"
# @parseArger opt refine-model "Model for refining PRD"
# @parseArger opt parse-models "AI models for parsing PRD (repeatable)" --repeat
# @parseArger opt parse-combine "Model to combine parsed results"
# @parseArger opt split-models "AI models for splitting tasks (repeatable)" --repeat
# @parseArger opt split-combine "Model to combine split results"
# @parseArger opt execute-tool "Execution tool (opencode/claude/gemini/codex)" --default-value "opencode"
# @parseArger opt execute-model "Main execution model"
# @parseArger opt plan-model "Planning model (defaults to execute-model)"
# @parseArger opt review-model "Review model (defaults to execute-model)"
# @parseArger opt verify "Verification command (repeatable)" --repeat
# @parseArger opt max-retries "Maximum retries per task" --default-value "3"
# @parseArger opt try-models "Progressive model configs for retries"
# @parseArger opt project-name "Project name for initialization"
# @parseArger opt package-manager "Package manager (npm/pnpm/bun)" --default-value "npm"
# @parseArger opt runtime "Runtime (bun/node)" --default-value "node"
# @parseArger opt frontend "Frontend framework(s)" --default-value "next"
# @parseArger opt backend "Backend framework"
# @parseArger opt database "Database"
# @parseArger opt auth "Authentication provider"
# @parseArger opt prd-file "Path to existing PRD file"
# @parseArger opt questions-file "Path to questions JSON file"
# @parseArger flag interactive "Enable interactive mode (pause between phases for user input)" --short i
# @parseArger flag no-init "Skip project initialization phase"
# @parseArger flag no-prd "Skip PRD creation phase"
# @parseArger flag no-question "Skip PRD question generation phase"
# @parseArger flag no-refine "Skip PRD refinement phase"
# @parseArger flag no-parse "Skip PRD parsing phase"
# @parseArger flag no-split "Skip task splitting phase"
# @parseArger flag no-execute "Skip execution loop phase"
# @parseArger flag dry-run "Show commands without executing"
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
# OPTIONALS ARGUMENTS
_arg_config=
_arg_taskomatic_version="@beta"
_arg_ai_provider="openrouter"
_arg_ai_model="z-ai/glm-4.7"
_arg_ai_key="${AI_KEY}"
_arg_ai_reasoning=
_arg_max_tokens="32768"
_arg_temperature="0.5"
_arg_prd_models=()
_arg_prd_combine=
_arg_prd_output_dir=".task-o-matic/prd"
_arg_question_model=
_arg_refine_model=
_arg_parse_models=()
_arg_parse_combine=
_arg_split_models=()
_arg_split_combine=
_arg_execute_tool="opencode"
_arg_execute_model=
_arg_plan_model=
_arg_review_model=
_arg_verify=()
_arg_max_retries="3"
_arg_try_models=
_arg_project_name=
_arg_package_manager="npm"
_arg_runtime="node"
_arg_frontend="next"
_arg_backend=
_arg_database=
_arg_auth=
_arg_prd_file=
_arg_questions_file=
# FLAGS
_arg_interactive="off"
_arg_no_init="off"
_arg_no_prd="off"
_arg_no_question="off"
_arg_no_refine="off"
_arg_no_parse="off"
_arg_no_split="off"
_arg_no_execute="off"
_arg_dry_run="off"
# NESTED
# LEFTOVERS
_arg_leftovers=()
_verbose_level="0";



print_help()
{
	_triggerSCHelp=1;

	if [[ "$_helpHasBeenPrinted" == "1" ]]; then
		_helpHasBeenPrinted=0;
		echo -e "Eric Loop - AI-powered development automation script. Automates the Eric Loop workflow for AI-driven development projects. Supports configurable AI models, tools, and verification commands for each phase.:"
	echo -e "	-c, --config <config>: Load configuration from file"
	echo -e "	--taskomatic-version <taskomatic-version>: Task-o-matic version to use [default: ' @beta ']"
	echo -e "	--ai-provider <ai-provider>: AI provider (openrouter/anthropic/openai/custom) [default: ' openrouter ']"
	echo -e "	--ai-model <ai-model>: Default AI model [default: ' z-ai/glm-4.7 ']"
	echo -e "	--ai-key <ai-key>: AI API key (or set AI_KEY env var)"
	echo -e "	--ai-reasoning <ai-reasoning>: Reasoning tokens for OpenRouter models"
	echo -e "	--max-tokens <max-tokens>: Max tokens for AI [default: ' 32768 ']"
	echo -e "	--temperature <temperature>: AI temperature [default: ' 0.5 ']"
	echo -e "	--prd-models <prd-models>: AI models for PRD creation (repeatable), repeatable"
	echo -e "	--prd-combine <prd-combine>: Model to combine multiple PRDs"
	echo -e "	--prd-output-dir <prd-output-dir>: Output directory for PRDs [default: ' .task-o-matic/prd ']"
	echo -e "	--question-model <question-model>: Model for generating PRD questions"
	echo -e "	--refine-model <refine-model>: Model for refining PRD"
	echo -e "	--parse-models <parse-models>: AI models for parsing PRD (repeatable), repeatable"
	echo -e "	--parse-combine <parse-combine>: Model to combine parsed results"
	echo -e "	--split-models <split-models>: AI models for splitting tasks (repeatable), repeatable"
	echo -e "	--split-combine <split-combine>: Model to combine split results"
	echo -e "	--execute-tool <execute-tool>: Execution tool (opencode/claude/gemini/codex) [default: ' opencode ']"
	echo -e "	--execute-model <execute-model>: Main execution model"
	echo -e "	--plan-model <plan-model>: Planning model (defaults to execute-model)"
	echo -e "	--review-model <review-model>: Review model (defaults to execute-model)"
	echo -e "	--verify <verify>: Verification command (repeatable), repeatable"
	echo -e "	--max-retries <max-retries>: Maximum retries per task [default: ' 3 ']"
	echo -e "	--try-models <try-models>: Progressive model configs for retries"
	echo -e "	--project-name <project-name>: Project name for initialization"
	echo -e "	--package-manager <package-manager>: Package manager (npm/pnpm/bun) [default: ' npm ']"
	echo -e "	--runtime <runtime>: Runtime (bun/node) [default: ' node ']"
	echo -e "	--frontend <frontend>: Frontend framework(s) [default: ' next ']"
	echo -e "	--backend <backend>: Backend framework"
	echo -e "	--database <database>: Database"
	echo -e "	--auth <auth>: Authentication provider"
	echo -e "	--prd-file <prd-file>: Path to existing PRD file"
	echo -e "	--questions-file <questions-file>: Path to questions JSON file"
	echo -e "	-i|--interactive|--no-interactive: Enable interactive mode (pause between phases for user input)"
	echo -e "	--no-init|--no-no-init: Skip project initialization phase"
	echo -e "	--no-prd|--no-no-prd: Skip PRD creation phase"
	echo -e "	--no-question|--no-no-question: Skip PRD question generation phase"
	echo -e "	--no-refine|--no-no-refine: Skip PRD refinement phase"
	echo -e "	--no-parse|--no-no-parse: Skip PRD parsing phase"
	echo -e "	--no-split|--no-no-split: Skip task splitting phase"
	echo -e "	--no-execute|--no-no-execute: Skip execution loop phase"
	echo -e "	--dry-run|--no-dry-run: Show commands without executing"
	echo -e "Usage :
	$0 [--config <value>] [--taskomatic-version <value>] [--ai-provider <value>] [--ai-model <value>] [--ai-key <value>] [--ai-reasoning <value>] [--max-tokens <value>] [--temperature <value>] [--prd-models <value>] [--prd-combine <value>] [--prd-output-dir <value>] [--question-model <value>] [--refine-model <value>] [--parse-models <value>] [--parse-combine <value>] [--split-models <value>] [--split-combine <value>] [--execute-tool <value>] [--execute-model <value>] [--plan-model <value>] [--review-model <value>] [--verify <value>] [--max-retries <value>] [--try-models <value>] [--project-name <value>] [--package-manager <value>] [--runtime <value>] [--frontend <value>] [--backend <value>] [--database <value>] [--auth <value>] [--prd-file <value>] [--questions-file <value>] [--[no-]interactive] [--[no-]no-init] [--[no-]no-prd] [--[no-]no-question] [--[no-]no-refine] [--[no-]no-parse] [--[no-]no-split] [--[no-]no-execute] [--[no-]dry-run]";
	fi

}

log() {
	local _arg_msg="${1}";
	local _arg_level="${2:-0}";
	if [ "${_arg_level}" -le "${_verbose_level}" ]; then
		case "$_arg_level" in
			-3)
				_arg_COLOR="[0;31m";
				;;
			-2)
				_arg_COLOR="[0;33m";
				;;
			-1)
				_arg_COLOR="[1;33m";
				;;
			1)
				_arg_COLOR="[0;32m";
				;;
			2)
				_arg_COLOR="[1;36m";
				;;
			3)
				_arg_COLOR="[0;36m";
				;;
			*)
				_arg_COLOR="[0m";
				;;
		esac
		if [ "${_has_colors}" == "1" ]; then
			echo -e "${_arg_COLOR}${_arg_msg}[0m";
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
			-c|--config)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_config="$2"
				shift
				;;
			--config=*)
				_arg_config="${_key##--config=}"
				;;
			-c*)
				_arg_config="${_key##-c}"
				;;

			--taskomatic-version)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_taskomatic_version="$2"
				shift
				;;
			--taskomatic-version=*)
				_arg_taskomatic_version="${_key##--taskomatic-version=}"
				;;

			--ai-provider)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_ai_provider="$2"
				shift
				;;
			--ai-provider=*)
				_arg_ai_provider="${_key##--ai-provider=}"
				;;

			--ai-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_ai_model="$2"
				shift
				;;
			--ai-model=*)
				_arg_ai_model="${_key##--ai-model=}"
				;;

			--ai-key)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_ai_key="$2"
				shift
				;;
			--ai-key=*)
				_arg_ai_key="${_key##--ai-key=}"
				;;

			--ai-reasoning)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_ai_reasoning="$2"
				shift
				;;
			--ai-reasoning=*)
				_arg_ai_reasoning="${_key##--ai-reasoning=}"
				;;

			--max-tokens)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_max_tokens="$2"
				shift
				;;
			--max-tokens=*)
				_arg_max_tokens="${_key##--max-tokens=}"
				;;

			--temperature)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_temperature="$2"
				shift
				;;
			--temperature=*)
				_arg_temperature="${_key##--temperature=}"
				;;

			--prd-models)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_prd_models+=("$2")
				shift
				;;
			--prd-models=*)
				_arg_prd_models+=("${_key##--prd-models=}")
				;;

			--prd-combine)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_prd_combine="$2"
				shift
				;;
			--prd-combine=*)
				_arg_prd_combine="${_key##--prd-combine=}"
				;;

			--prd-output-dir)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_prd_output_dir="$2"
				shift
				;;
			--prd-output-dir=*)
				_arg_prd_output_dir="${_key##--prd-output-dir=}"
				;;

			--question-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_question_model="$2"
				shift
				;;
			--question-model=*)
				_arg_question_model="${_key##--question-model=}"
				;;

			--refine-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_refine_model="$2"
				shift
				;;
			--refine-model=*)
				_arg_refine_model="${_key##--refine-model=}"
				;;

			--parse-models)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_parse_models+=("$2")
				shift
				;;
			--parse-models=*)
				_arg_parse_models+=("${_key##--parse-models=}")
				;;

			--parse-combine)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_parse_combine="$2"
				shift
				;;
			--parse-combine=*)
				_arg_parse_combine="${_key##--parse-combine=}"
				;;

			--split-models)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_split_models+=("$2")
				shift
				;;
			--split-models=*)
				_arg_split_models+=("${_key##--split-models=}")
				;;

			--split-combine)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_split_combine="$2"
				shift
				;;
			--split-combine=*)
				_arg_split_combine="${_key##--split-combine=}"
				;;

			--execute-tool)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_execute_tool="$2"
				shift
				;;
			--execute-tool=*)
				_arg_execute_tool="${_key##--execute-tool=}"
				;;

			--execute-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_execute_model="$2"
				shift
				;;
			--execute-model=*)
				_arg_execute_model="${_key##--execute-model=}"
				;;

			--plan-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_plan_model="$2"
				shift
				;;
			--plan-model=*)
				_arg_plan_model="${_key##--plan-model=}"
				;;

			--review-model)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_review_model="$2"
				shift
				;;
			--review-model=*)
				_arg_review_model="${_key##--review-model=}"
				;;

			--verify)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_verify+=("$2")
				shift
				;;
			--verify=*)
				_arg_verify+=("${_key##--verify=}")
				;;

			--max-retries)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_max_retries="$2"
				shift
				;;
			--max-retries=*)
				_arg_max_retries="${_key##--max-retries=}"
				;;

			--try-models)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_try_models="$2"
				shift
				;;
			--try-models=*)
				_arg_try_models="${_key##--try-models=}"
				;;

			--project-name)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_project_name="$2"
				shift
				;;
			--project-name=*)
				_arg_project_name="${_key##--project-name=}"
				;;

			--package-manager)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_package_manager="$2"
				shift
				;;
			--package-manager=*)
				_arg_package_manager="${_key##--package-manager=}"
				;;

			--runtime)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_runtime="$2"
				shift
				;;
			--runtime=*)
				_arg_runtime="${_key##--runtime=}"
				;;

			--frontend)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_frontend="$2"
				shift
				;;
			--frontend=*)
				_arg_frontend="${_key##--frontend=}"
				;;

			--backend)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_backend="$2"
				shift
				;;
			--backend=*)
				_arg_backend="${_key##--backend=}"
				;;

			--database)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_database="$2"
				shift
				;;
			--database=*)
				_arg_database="${_key##--database=}"
				;;

			--auth)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_auth="$2"
				shift
				;;
			--auth=*)
				_arg_auth="${_key##--auth=}"
				;;

			--prd-file)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_prd_file="$2"
				shift
				;;
			--prd-file=*)
				_arg_prd_file="${_key##--prd-file=}"
				;;

			--questions-file)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_questions_file="$2"
				shift
				;;
			--questions-file=*)
				_arg_questions_file="${_key##--questions-file=}"
				;;

			-i|--interactive)
				_arg_interactive="on"
				;;
			--no-interactive)
				_arg_interactive="off"
				;;
			--no-init)
				_arg_no_init="on"
				;;
			--no-no-init)
				_arg_no_init="off"
				;;
			--no-prd)
				_arg_no_prd="on"
				;;
			--no-no-prd)
				_arg_no_prd="off"
				;;
			--no-question)
				_arg_no_question="on"
				;;
			--no-no-question)
				_arg_no_question="off"
				;;
			--no-refine)
				_arg_no_refine="on"
				;;
			--no-no-refine)
				_arg_no_refine="off"
				;;
			--no-parse)
				_arg_no_parse="on"
				;;
			--no-no-parse)
				_arg_no_parse="off"
				;;
			--no-split)
				_arg_no_split="on"
				;;
			--no-no-split)
				_arg_no_split="off"
				;;
			--no-execute)
				_arg_no_execute="on"
				;;
			--no-no-execute)
				_arg_no_execute="off"
				;;
			--dry-run)
				_arg_dry_run="on"
				;;
			--no-dry-run)
				_arg_dry_run="off"
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
	if [ "${_positionals_count}" -lt 0 ] && [ "$_helpHasBeenPrinted" == "1" ];then
		_PRINT_HELP=yes die "FATAL ERROR: Not enough positional arguments - we require at least 0 (namely: $_required_args_string), but got only ${_positionals_count}.
	${_positionals[*]}" 1;
	fi
}


assign_positional_args()
{
	local _positional_name _shift_for=$1;
	_positional_names="";
	_leftovers_count=$((${#_positionals[@]} - 0))
	for ((ii = 0; ii < _leftovers_count; ii++));do
		_positional_names="$_positional_names _arg_leftovers[$((ii + 0))]";
	done

	shift "$_shift_for"
	for _positional_name in ${_positional_names};do
		test $# -gt 0 || break;
		if ! [[ "$_positional_name" =~ "_arg_leftovers" ]];then
			eval "if [ \"\$_one_of${_positional_name}\" != \"\" ];then [[ \"\${_one_of${_positional_name}[*]}\" =~ \"\${1}\" ]];fi" || die "${_positional_name} must be one of: $(eval "echo \"\${_one_of${_positional_name}[*]}\"")" 1;
			local _match_var="_match${_positional_name}";
			local _regex="${!_match_var}";
			if [ -n "$_regex" ]; then
				[[ "${1}" =~ $_regex ]] || die "${_positional_name} does not match pattern: $_regex"
			fi
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

	echo -e "	config: ${_arg_config}";
	echo -e "	taskomatic-version: ${_arg_taskomatic_version}";
	echo -e "	ai-provider: ${_arg_ai_provider}";
	echo -e "	ai-model: ${_arg_ai_model}";
	echo -e "	ai-key: ${_arg_ai_key}";
	echo -e "	ai-reasoning: ${_arg_ai_reasoning}";
	echo -e "	max-tokens: ${_arg_max_tokens}";
	echo -e "	temperature: ${_arg_temperature}";
	echo -e "	prd-models: ${_arg_prd_models[*]}";
	echo -e "	prd-combine: ${_arg_prd_combine}";
	echo -e "	prd-output-dir: ${_arg_prd_output_dir}";
	echo -e "	question-model: ${_arg_question_model}";
	echo -e "	refine-model: ${_arg_refine_model}";
	echo -e "	parse-models: ${_arg_parse_models[*]}";
	echo -e "	parse-combine: ${_arg_parse_combine}";
	echo -e "	split-models: ${_arg_split_models[*]}";
	echo -e "	split-combine: ${_arg_split_combine}";
	echo -e "	execute-tool: ${_arg_execute_tool}";
	echo -e "	execute-model: ${_arg_execute_model}";
	echo -e "	plan-model: ${_arg_plan_model}";
	echo -e "	review-model: ${_arg_review_model}";
	echo -e "	verify: ${_arg_verify[*]}";
	echo -e "	max-retries: ${_arg_max_retries}";
	echo -e "	try-models: ${_arg_try_models}";
	echo -e "	project-name: ${_arg_project_name}";
	echo -e "	package-manager: ${_arg_package_manager}";
	echo -e "	runtime: ${_arg_runtime}";
	echo -e "	frontend: ${_arg_frontend}";
	echo -e "	backend: ${_arg_backend}";
	echo -e "	database: ${_arg_database}";
	echo -e "	auth: ${_arg_auth}";
	echo -e "	prd-file: ${_arg_prd_file}";
	echo -e "	questions-file: ${_arg_questions_file}";
	echo -e "	interactive: ${_arg_interactive}";
	echo -e "	no-init: ${_arg_no_init}";
	echo -e "	no-prd: ${_arg_no_prd}";
	echo -e "	no-question: ${_arg_no_question}";
	echo -e "	no-refine: ${_arg_no_refine}";
	echo -e "	no-parse: ${_arg_no_parse}";
	echo -e "	no-split: ${_arg_no_split}";
	echo -e "	no-execute: ${_arg_no_execute}";
	echo -e "	dry-run: ${_arg_dry_run}";
	echo -e "	leftovers: ${_arg_leftovers[*]}";

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

set -euo pipefail

TASKOMATIC_CMD=("npx" "task-o-matic${_arg_taskomatic_version}")

PROJECT_DESCRIPTION="${_arg_leftovers[*]}"

if [ -z "$PROJECT_DESCRIPTION" ] && [ "$_arg_no_prd" == "off" ]; then
	echo "Error: Project description is required (as arguments at the end)" >&2
	exit 1
fi

load_config() {
	local config_file="$1"

	if [ ! -f "$config_file" ]; then
		echo "Error: Config file not found: $config_file" >&2
		exit 1
	fi

	if command -v jq &>/dev/null; then
		export _arg_ai_provider=$(jq -r '.ai_provider // empty' "$config_file")
		export _arg_ai_model=$(jq -r '.ai_model // empty' "$config_file")
		export _arg_ai_key=$(jq -r '.ai_key // empty' "$config_file")
		export _arg_ai_reasoning=$(jq -r '.ai_reasoning // empty' "$config_file")
		export _arg_max_tokens=$(jq -r '.max_tokens // empty' "$config_file")
		export _arg_temperature=$(jq -r '.temperature // empty' "$config_file")

		local prd_models
		prd_models=$(jq -r '.prd_models[]? // empty' "$config_file")
		if [ -n "$prd_models" ]; then
			_arg_prd_models=()
			while IFS= read -r model; do
				_arg_prd_models+=("$model")
			done <<< "$prd_models"
		fi

		export _arg_prd_combine=$(jq -r '.prd_combine // empty' "$config_file")
		export _arg_prd_output_dir=$(jq -r '.prd_output_dir // empty' "$config_file")
		export _arg_question_model=$(jq -r '.question_model // empty' "$config_file")
		export _arg_refine_model=$(jq -r '.refine_model // empty' "$config_file")

		local parse_models
		parse_models=$(jq -r '.parse_models[]? // empty' "$config_file")
		if [ -n "$parse_models" ]; then
			_arg_parse_models=()
			while IFS= read -r model; do
				_arg_parse_models+=("$model")
			done <<< "$parse_models"
		fi

		export _arg_parse_combine=$(jq -r '.parse_combine // empty' "$config_file")

		local split_models
		split_models=$(jq -r '.split_models[]? // empty' "$config_file")
		if [ -n "$split_models" ]; then
			_arg_split_models=()
			while IFS= read -r model; do
				_arg_split_models+=("$model")
			done <<< "$split_models"
		fi

		export _arg_split_combine=$(jq -r '.split_combine // empty' "$config_file")
		export _arg_execute_tool=$(jq -r '.execute_tool // empty' "$config_file")
		export _arg_execute_model=$(jq -r '.execute_model // empty' "$config_file")
		export _arg_plan_model=$(jq -r '.plan_model // empty' "$config_file")
		export _arg_review_model=$(jq -r '.review_model // empty' "$config_file")

		local verify_cmds
		verify_cmds=$(jq -r '.verify[]? // empty' "$config_file")
		if [ -n "$verify_cmds" ]; then
			_arg_verify=()
			while IFS= read -r cmd; do
				_arg_verify+=("$cmd")
			done <<< "$verify_cmds"
		fi

		export _arg_max_retries=$(jq -r '.max_retries // empty' "$config_file")
		export _arg_try_models=$(jq -r '.try_models // empty' "$config_file")
		export _arg_project_name=$(jq -r '.project_name // empty' "$config_file")
		export _arg_package_manager=$(jq -r '.package_manager // empty' "$config_file")
		export _arg_runtime=$(jq -r '.runtime // empty' "$config_file")
		export _arg_frontend=$(jq -r '.frontend // empty' "$config_file")
		export _arg_backend=$(jq -r '.backend // empty' "$config_file")
		export _arg_database=$(jq -r '.database // empty' "$config_file")
		export _arg_auth=$(jq -r '.auth // empty' "$config_file")
		export _arg_prd_file=$(jq -r '.prd_file // empty' "$config_file")
		export _arg_questions_file=$(jq -r '.questions_file // empty' "$config_file")
	else
		echo "Warning: jq not found, cannot parse JSON config file" >&2
	fi
}

run_cmd() {
	local cmd=("$@")

	if [ "$_arg_dry_run" == "on" ]; then
		echo "[DRY RUN] ${cmd[*]}"
	else
		log "Running: ${cmd[*]}" 1
		"${cmd[@]}"
	fi
}

pause_if_interactive() {
	if [ "$_arg_interactive" == "on" ]; then
		echo ""
		read -p "Press Enter to continue to the next phase..."
		echo ""
	fi
}

check_prerequisites() {
	if ! command -v npx &>/dev/null; then
		echo "Error: npx is not installed or not in PATH" >&2
		exit 1
	fi

	if [ -z "${_arg_ai_key:-}" ]; then
		echo "Warning: No AI key provided. Set --ai-key or AI_KEY environment variable" >&2
	fi
}

init_project() {
	if [ "$_arg_no_init" == "on" ] || [ -z "${_arg_project_name:-}" ]; then
		return 0
	fi

	log "=== Phase 1: Project Initialization ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "init" "init" "--project-name" "$_arg_project_name")

	cmd+=("--package-manager" "$_arg_package_manager")
	cmd+=("--runtime" "$_arg_runtime")

	if [ -n "${_arg_frontend:-}" ]; then
		cmd+=("--frontend" "$_arg_frontend")
	fi

	if [ -n "${_arg_backend:-}" ]; then
		cmd+=("--backend" "$_arg_backend")
	fi

	if [ -n "${_arg_database:-}" ]; then
		cmd+=("--database" "$_arg_database")
	fi

	if [ -n "${_arg_auth:-}" ]; then
		cmd+=("--auth" "$_arg_auth")
	fi

	run_cmd "${cmd[@]}"

	if [ "$_arg_dry_run" == "off" ]; then
		cd "$_arg_project_name"
	fi

	pause_if_interactive
}

create_prd() {
	if [ "$_arg_no_prd" == "on" ]; then
		return 0
	fi

	log "=== Phase 2: PRD Creation ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "prd" "create")
	cmd+=("--stream")

	if [ ${#_arg_prd_models[@]} -gt 0 ]; then
		for model in "${_arg_prd_models[@]}"; do
			cmd+=("--ai" "$model")
		done
	else
		local model_str="${_arg_ai_model}"
		if [ -n "${_arg_ai_provider:-}" ]; then
			model_str="${_arg_ai_provider}:${model_str}"
		fi

		if [ -n "${_arg_ai_reasoning:-}" ]; then
			model_str="${model_str};reasoning=${_arg_ai_reasoning}"
		fi

		cmd+=("--ai" "$model_str")
	fi

	if [ -n "${_arg_prd_combine:-}" ]; then
		cmd+=("--combine-ai" "$_arg_prd_combine")
	fi

	cmd+=("--output-dir" "$_arg_prd_output_dir")
	cmd+=("$PROJECT_DESCRIPTION")

	run_cmd "${cmd[@]}"

	_arg_prd_file="${_arg_prd_output_dir}/prd-master.md"

	pause_if_interactive
}

question_prd() {
	if [ "$_arg_no_question" == "on" ]; then
		return 0
	fi

	if [ -z "${_arg_prd_file:-}" ]; then
		_arg_prd_file="${_arg_prd_output_dir}/prd-master.md"
	fi

	if [ ! -f "$_arg_prd_file" ]; then
		log "Skipping question phase: PRD file not found at $_arg_prd_file" -1
		return 0
	fi

	log "=== Phase 3: PRD Question Generation ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "prd" "question")
	cmd+=("--stream")
	cmd+=("--file" "$_arg_prd_file")

	if [ -n "${_arg_question_model:-}" ]; then
		cmd+=("--ai-model" "$_arg_question_model")
	fi

	if [ -n "${_arg_ai_reasoning:-}" ]; then
		cmd+=("--ai-reasoning" "$_arg_ai_reasoning")
	fi

	if [ -n "${_arg_questions_file:-}" ]; then
		cmd+=("--output" "$_arg_questions_file")
	fi

	run_cmd "${cmd[@]}"

	pause_if_interactive
}

refine_prd() {
	if [ "$_arg_no_refine" == "on" ]; then
		return 0
	fi

	if [ -z "${_arg_prd_file:-}" ]; then
		_arg_prd_file="${_arg_prd_output_dir}/prd-master.md"
	fi

	if [ ! -f "$_arg_prd_file" ]; then
		log "Skipping refine phase: PRD file not found at $_arg_prd_file" -1
		return 0
	fi

	log "=== Phase 4: PRD Refinement ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "prd" "refine")
	cmd+=("--stream")
	cmd+=("--file" "$_arg_prd_file")

	if [ -n "${_arg_refine_model:-}" ]; then
		cmd+=("--ai-model" "$_arg_refine_model")
	fi

	if [ -n "${_arg_ai_reasoning:-}" ]; then
		cmd+=("--ai-reasoning" "$_arg_ai_reasoning")
	fi

	if [ -n "${_arg_questions_file:-}" ]; then
		cmd+=("--questions" "$_arg_questions_file")
	fi

	run_cmd "${cmd[@]}"

	pause_if_interactive
}

parse_prd() {
	if [ "$_arg_no_parse" == "on" ]; then
		return 0
	fi

	if [ -z "${_arg_prd_file:-}" ]; then
		_arg_prd_file="${_arg_prd_output_dir}/prd-master.md"
	fi

	if [ ! -f "$_arg_prd_file" ]; then
		log "Skipping parse phase: PRD file not found at $_arg_prd_file" -1
		return 0
	fi

	log "=== Phase 5: PRD Parsing ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "prd" "parse")
	cmd+=("--stream")
	cmd+=("--file" "$_arg_prd_file")

	if [ ${#_arg_parse_models[@]} -gt 0 ]; then
		for model in "${_arg_parse_models[@]}"; do
			cmd+=("--ai" "$model")
		done
	fi

	if [ -n "${_arg_parse_combine:-}" ]; then
		cmd+=("--combine-ai" "$_arg_parse_combine")
	fi

	if [ -n "${_arg_ai_reasoning:-}" ]; then
		cmd+=("--ai-reasoning" "$_arg_ai_reasoning")
	fi

	run_cmd "${cmd[@]}"

	pause_if_interactive
}

split_tasks() {
	if [ "$_arg_no_split" == "on" ]; then
		return 0
	fi

	log "=== Phase 6: Task Splitting ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "tasks" "split")
	cmd+=("--all")
	cmd+=("--stream")

	if [ ${#_arg_split_models[@]} -gt 0 ]; then
		for model in "${_arg_split_models[@]}"; do
			cmd+=("--ai" "$model")
		done
	fi

	if [ -n "${_arg_split_combine:-}" ]; then
		cmd+=("--combine-ai" "$_arg_split_combine")
	fi

	if [ -n "${_arg_ai_reasoning:-}" ]; then
		cmd+=("--reasoning" "$_arg_ai_reasoning")
	fi

	run_cmd "${cmd[@]}"

	pause_if_interactive
}

execute_loop() {
	if [ "$_arg_no_execute" == "on" ]; then
		return 0
	fi

	log "=== Phase 7: Execution Loop ===" 2

	local cmd=("${TASKOMATIC_CMD[@]}" "tasks" "execute-loop")
	cmd+=("--include-prd")
	cmd+=("--tool" "$_arg_execute_tool")
	cmd+=("--plan")

	local plan_model="${_arg_plan_model:-${_arg_execute_model:-${_arg_ai_model}}}"
	cmd+=("--plan-model" "$plan_model")

	cmd+=("--review")

	local review_model="${_arg_review_model:-${_arg_execute_model:-${_arg_ai_model}}}"
	cmd+=("--review-model" "$review_model")

	if [ -n "${_arg_execute_model:-}" ]; then
		cmd+=("--model" "$_arg_execute_model")
	fi

	cmd+=("--max-retries" "$_arg_max_retries")

	if [ -n "${_arg_try_models:-}" ]; then
		cmd+=("--try-models" "$_arg_try_models")
	fi

	for verify_cmd in "${_arg_verify[@]}"; do
		cmd+=("--validate" "$verify_cmd")
	done

	run_cmd "${cmd[@]}"

	pause_if_interactive
}

generate_config_template() {
	cat << 'EOF'
{
  "ai_provider": "openrouter",
  "ai_model": "z-ai/glm-4.7",
  "ai_key": "your-api-key-here",
  "ai_reasoning": "4096",
  "max_tokens": "32768",
  "temperature": "0.5",
  "prd_models": [
    "xiaomi/mimo-v2-flash:free;reasoning=4096",
    "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096",
    "z-ai/glm-4.7;reasoning=4096"
  ],
  "prd_combine": "z-ai/glm-4.7;reasoning=4096",
  "prd_output_dir": ".task-o-matic/prd",
  "question_model": "anthropic/claude-4.5-sonnet",
  "refine_model": "anthropic/claude-4.5-sonnet",
  "parse_models": [
    "xiaomi/mimo-v2-flash:free;reasoning=4096",
    "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096",
    "z-ai/glm-4.7;reasoning=4096"
  ],
  "parse_combine": "anthropic/claude-4.5-sonnet;reasoning=4096",
  "split_models": [
    "xiaomi/mimo-v2-flash:free;reasoning=4096",
    "nvidia/nemotron-3-nano-30b-a3b:free;reasoning=4096",
    "z-ai/glm-4.7;reasoning=4096"
  ],
  "split_combine": "anthropic/claude-4.5-sonnet;reasoning=4096",
  "execute_tool": "opencode",
  "execute_model": "zai-coding-plan/glm-4.7",
  "plan_model": "zai-coding-plan/glm-4.7",
  "review_model": "zai-coding-plan/glm-4.7",
  "verify": [
    "npm run check-types",
    "npm run build"
  ],
  "max_retries": "3",
  "try_models": "",
  "project_name": "my-project",
  "package_manager": "bun",
  "runtime": "node",
  "frontend": "tanstack-router",
  "backend": "none",
  "database": "",
  "auth": "",
  "prd_file": "",
  "questions_file": ""
}
EOF
}

main() {
	if [ -n "${_arg_config:-}" ]; then
		log "Loading configuration from: $_arg_config" 1
		load_config "$_arg_config"
	fi

	check_prerequisites

	if [ "$_arg_dry_run" == "on" ]; then
		log "DRY RUN MODE - Commands will be shown but not executed" 1
	fi

	log "Starting Eric Loop workflow..." 2
	echo ""

	init_project
	create_prd
	question_prd
	refine_prd
	parse_prd
	split_tasks
	execute_loop

	log "Eric Loop workflow completed!" 1
}

main

# @parseArger-end
