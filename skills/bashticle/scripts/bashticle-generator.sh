#!/bin/bash
# @parseArger-begin
# @parseArger-help "Generate interactive bash article from markdown" --option "help" --short-option "h"
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
# @parseArger pos input-file "Markdown file to convert" --optional --complete "file"
# @parseArger opt output-file "Output bash script path" --short o --complete "file"
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
_arg_input_file="";
_optional_positionals+=("_arg_input_file");
# OPTIONALS ARGUMENTS
_arg_output_file=
# FLAGS
# NESTED
_verbose_level="0";



print_help()
{
	_triggerSCHelp=1;

	if [[ "$_helpHasBeenPrinted" == "1" ]]; then
		_helpHasBeenPrinted=0;
		echo -e "Generate interactive bash article from markdown:"
	echo -e "	input-file: Markdown file to convert, optional"
	echo -e "	-o, --output-file <output-file>: Output bash script path"
	echo -e "Usage :
	$0 [input-file] [--output-file <value>]";
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
			-o|--output-file)
				test $# -lt 2 && die "Missing value for the option: '$_key'" 1
				_arg_output_file="$2"
				shift
				;;
			--output-file=*)
				_arg_output_file="${_key##--output-file=}"
				;;
			-o*)
				_arg_output_file="${_key##-o}"
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
	_positional_names="_arg_input_file ";
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

	echo -e "	input-file: ${_arg_input_file}";
	echo -e "	output-file: ${_arg_output_file}";

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
# Bashticle Generator
# Generates interactive bash articles from markdown
# ============================================================================

# ----------------------------------------------------------------------------
# Parser Functions
# ----------------------------------------------------------------------------

extract_title() {
  local md_file="$1"
  # Try frontmatter
  local title=$(awk '/^title:/{for(i=2;i<=NF;i++)printf "%s ", $i; print ""; exit}' "$md_file" 2>/dev/null | sed 's/^title: *//' | tr -d '"'\''')
  if [[ -z "$title" ]]; then
    # Try first # heading (not ## or ###)
    title=$(grep -m1 '^# [^#]' "$md_file" 2>/dev/null | sed 's/^# //')
  fi
  echo "${title:-Bashticle}"
}

# Extract ALL headings: #, ##, ###, #### with line numbers
extract_all_headings() {
  local md_file="$1"
  awk '/^#{1,4}[[:space:]]+/ {
    match($0, /^#+/)
    level = RLENGTH
    gsub(/^#+[[:space:]]+/, "")
    gsub(/^[[:space:]]+|[[:space:]]+$/, "")
    printf "%d|%d|%s\n", NR, level, $0
  }' "$md_file" 2>/dev/null
}

# Skip frontmatter between --- markers
skip_frontmatter() {
  local md_file="$1"
  awk 'BEGIN{skip=0} /^---$/{skip=!skip; next} skip==1{next} {print}' "$md_file"
}

# Extract content between two line numbers
extract_content_between() {
  local md_file="$1"
  local start_line="$2"
  local end_line="$3"

  if [[ -n "$end_line" ]]; then
    sed -n "$((start_line + 1)),$((end_line - 1))p" "$md_file"
  else
    sed -n "$((start_line + 1)),\$p" "$md_file"
  fi
}

# Escape string for bash double quotes
escape_bash_string() {
  local str="$1"
  # Escape backslashes first, then double quotes, then dollar signs
  str="${str//\\/\\\\}"
  str="${str//\"/\\\"}"
  str="${str//\$/\\\$}"
  str="${str//\`/\\\`}"
  printf '%s' "$str"
}

# Convert markdown content to bash code
convert_markdown_to_bash() {
  local content="$1"

  echo "$content" | awk -v indent="  " '
  BEGIN {
    in_code_block = 0
    code_lang = ""
    last_was_blank = 0
    cmd_var = ""
  }

  /^```/ {
    if (in_code_block == 0) {
      # Starting code block
      in_code_block = 1
      code_lang = substr($0, 4)
      gsub(/^[[:space:]]+|[[:space:]]+$/, "", code_lang)
      # Generate variable name
      cmd_var = "cmd_" code_lang "_" NR
      gsub(/[^a-zA-Z0-9_]/, "_", cmd_var)
      print indent "local " cmd_var "=("
    } else {
      # Ending code block
      in_code_block = 0
      print indent ")"
      print indent ""
      # For bash/sh, output the run_cmd call
      if (code_lang ~ /^(bash|sh|shell)$/) {
        print indent "show_cmd \"TODO: add description\" \"${" cmd_var "[@]}\""
        print indent "run_cmd \"${" cmd_var "[@]}\""
      } else {
        # For other languages, just show as code block reference
        print indent "echo \"Code block (" code_lang ") - see source\""
      }
      print indent ""
    }
    last_was_blank = 0
    next
  }

  in_code_block == 1 {
    # Inside code block - add to command array
    # Remove leading whitespace
    gsub(/^[[:space:]]+/, "")
    # Escape backslashes and quotes
    gsub(/\\/, "\\\\")
    gsub(/"/, "\\\"")
    print indent "  \"" $0 "\""
    last_was_blank = 0
    next
  }

  /^####/ {
    # Level 4 heading - subsection
    gsub(/^####[[:space:]]+/, "")
    gsub(/^[[:space:]]+|[[:space:]]+$/, "")
    gsub(/"/, "\\\"")
    print indent "print_subsection \"" $0 "\""
    last_was_blank = 0
    next
  }

  /^```/ { next }

  /^$/ {
    # Blank line - output only one consecutive blank line
    if (last_was_blank == 0) {
      print indent "echo \"\""
      last_was_blank = 1
    }
    next
  }

  {
    # Regular text content
    gsub(/^[[:space:]]+|[[:space:]]+$/, "")
    if (length($0) > 0) {
      gsub(/"/, "\\\"")
      gsub(/\$/, "\\$")
      print indent "stream_text \"" $0 "\""
      last_was_blank = 0
    }
  }
  '
}

# Sanitize name to valid bash identifier
sanitize_name() {
  local name="$1"
  # Lowercase
  name=$(echo "$name" | tr '[:upper:]' '[:lower:]')
  # Remove quotes and special chars, keep alphanumeric, spaces, hyphens
  name=$(echo "$name" | sed "s/[^a-z0-9[:space:]_-]//g")
  # Replace spaces and sequences of hyphens with single hyphen
  name=$(echo "$name" | sed 's/[[:space:]]\+/-/g' | sed 's/-\+/-/g')
  # Remove leading/trailing hyphens
  name=$(echo "$name" | sed 's/^-//;s/-$//')
  echo "$name"
}

# ----------------------------------------------------------------------------
# Bashticle Generation
# ----------------------------------------------------------------------------

generate_bashticle() {
  local input_file="$1"
  local output_file="$2"

  # Create temp file without frontmatter
  local tmp_file=$(mktemp)
  skip_frontmatter "$input_file" > "$tmp_file"

  local title=$(extract_title "$tmp_file")

  # Get all headings with line numbers: format "line|level|title"
  local headings=()
  local heading_levels=()
  local heading_lines=()

  while IFS='|' read -r line level htitle; do
    [[ -z "$htitle" ]] && continue
    headings+=("$htitle")
    heading_levels+=("$level")
    heading_lines+=("$line")
  done < <(extract_all_headings "$tmp_file")

  local heading_count=${#headings[@]}

  echo "Generating bashticle..."
  echo "  Title: $title"
  echo "  Headings: $heading_count"
  echo "  Output: $output_file"
  echo ""

  # Build section IDs for completion
  local section_list=""
  local section_ids=()
  local section_funcs=()

  for i in "${!headings[@]}"; do
    local hlevel="${heading_levels[$i]}"
    # Only ## and ### become sections - # is title, #### is subsection
    if [[ $hlevel -ge 2 ]] && [[ $hlevel -le 3 ]]; then
      local section_id=$(sanitize_name "${headings[$i]}")
      section_ids+=("$section_id")
      local func_name="show_$(echo "$section_id" | sed 's/-/_/g')"
      section_funcs+=("$func_name:$section_id")
      if [[ -z "$section_list" ]]; then
        section_list="$section_id"
      else
        section_list="$section_list $section_id"
      fi
    fi
  done

  # Generate the bashticle script
  cat > "$output_file" <<'PARSEARGER_CLI'
#!/bin/bash
# @parseArger-begin
# @parseArger-help "TITLE_PLACEHOLDER - An interactive bashticle" --option "help" --short-option "h"
# @parseArger-version "1.0.0" --option "version" --short-option "v"
# @parseArger-verbose --option "verbose" --level "0" --quiet-option "quiet"
_has_colors=0
if [ -t 1 ]; then
	ncolors=$(tput colors 2>/dev/null)
	if [ -n "$ncolors" ] && [ "$ncolors" -ge 8 ]; then
		_has_colors=1
	fi
fi
# @parseArger-declarations
# @parseArger pos step "Section to jump to" --optional --complete-custom "echo 'SECTIONS_PLACEHOLDER'"
# @parseArger flag run-command "Execute commands instead of echoing" --short r
# @parseArger flag dry-run "Echo commands only (default)" --short d --on
# @parseArger flag stream "Enable streaming output" --short s --on
# @parseArger flag verbose "Verbose output" --short v
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
# FLAGS
_arg_run_command="off"
_arg_dry_run="on"
_arg_stream="on"
_arg_verbose="off"
# NESTED
_verbose_level="0";

print_help()
{
	_triggerSCHelp=1;
	if [[ "$_helpHasBeenPrinted" == "1" ]]; then
		_helpHasBeenPrinted=0;
		echo -e "TITLE_PLACEHOLDER:"
	echo -e "	step: Section to jump to, optional"
	echo -e "	-r|--run-command|--no-run-command: Execute commands instead of echoing"
	echo -e "	-d|--dry-run|--no-dry-run: Echo commands only (default), on by default (use --no-dry-run to turn it off)"
	echo -e "	-s|--stream|--no-stream: Enable streaming output, on by default (use --no-stream to turn it off)"
	echo -e "	-v|--verbose|--no-verbose: Verbose output"
	echo -e "Usage :
	$0 [step] [--[no-]run-command] [--[no-]dry-run] [--[no-]stream] [--[no-]verbose]";
	fi
}

log() {
	local _arg_msg="${1}";
	local _arg_level="${2:-0}";
	if [ "${_arg_level}" -le "${_verbose_level}" ]; then
		case "$_arg_level" in
			-3) _arg_COLOR="\033[0;31m" ;;
			-2) _arg_COLOR="\033[0;33m" ;;
			-1) _arg_COLOR="\033[1;33m" ;;
			1) _arg_COLOR="\033[0;32m" ;;
			2) _arg_COLOR="\033[1;36m" ;;
			3) _arg_COLOR="\033[0;36m" ;;
			*) _arg_COLOR="\033[0m" ;;
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
			-r|--run-command)
				_arg_run_command="on"
				;;
			--no-run-command)
				_arg_run_command="off"
				;;
			-d|--dry-run)
				_arg_dry_run="on"
				;;
			--no-dry-run)
				_arg_dry_run="off"
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
			--version)
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
		_PRINT_HELP=yes die "FATAL ERROR: There were spurious positional arguments --- we expect at most 1 (namely: $_required_args_string), but got ${_positionals_count} (the last one was: '${_last_positional}')." 1
	fi
}

assign_positional_args()
{
	local _positional_name _shift_for=$1;
	_positional_names="_arg_step ";
	shift "$_shift_for"
	for _positional_name in ${_positional_names};do
		test $# -gt 0 || break;
		eval "$_positional_name=\${1}" || die "Error during argument parsing, possibly an ParseArger bug." 1;
		shift;
	done
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
# @parseArger-end
PARSEARGER_CLI

  # Add helper functions
  cat >> "$output_file" <<'HELPERS'

# ============================================================================
# Helper Functions
# ============================================================================

stream_text() {
  local text="$1"
  local delay="${2:-0.005}"
  if [ "$_arg_stream" == "on" ]; then
    for ((i=0; i<${#text}; i++)); do
      echo -n "${text:$i:1}"
      sleep "$delay"
    done
    echo
  else
    echo "$text"
  fi
}

print_section() {
  echo ""
  echo -e "\033[1;36m═══════════════════════════════════════════════════════════════════\033[0m"
  echo -e "\033[1;36m  $1\033[0m"
  echo -e "\033[1;36m═══════════════════════════════════════════════════════════════════\033[0m"
  echo ""
}

print_subsection() {
  echo ""
  echo -e "\033[1;33m▶ $1\033[0m"
  echo ""
}

prompt_continue() {
  echo ""
  echo -e "\033[0;32m[Press Enter to continue...]\033[0m"
  read -r
}

run_cmd() {
  local cmd_array=("$@")
  if [ "$_arg_run_command" == "on" ]; then
    echo -e "\033[0;36m▶ Executing:\033[0m ${cmd_array[*]}"
    "${cmd_array[@]}"
  else
    echo -e "\033[0;90m▶ Would run:\033[0m ${cmd_array[*]}"
  fi
}

show_cmd() {
  local explanation="$1"
  shift
  local cmd_array=("$@")
  echo ""
  echo -e "\033[0;37m$explanation\033[0m"
  echo -e "\033[1;35m$\033[0m ${cmd_array[*]}"
}
HELPERS

  # Replace title placeholder
  sed -i "s/TITLE_PLACEHOLDER/$title/g" "$output_file"

  # Replace sections placeholder (single line, space separated)
  sed -i "s/SECTIONS_PLACEHOLDER/$section_list/g" "$output_file"

  # Add section functions
  cat >> "$output_file" <<SECTIONS

# ============================================================================
# Article Sections
# ============================================================================

SECTIONS

  # Process each heading and generate section functions
  for i in "${!headings[@]}"; do
    local hlevel="${heading_levels[$i]}"
    local htitle="${headings[$i]}"
    local hline="${heading_lines[$i]}"

    # Find next heading of same or higher level (lower or equal number)
    local next_line=""
    for ((j=i+1; j<heading_count; j++)); do
      local next_level="${heading_levels[$j]}"
      if [[ $next_level -le $hlevel ]]; then
        next_line="${heading_lines[$j]}"
        break
      fi
    done

    # Extract content between headings (includes nested content)
    local content=$(extract_content_between "$tmp_file" "$hline" "$next_line")

    if [[ $hlevel -eq 1 ]]; then
      # Level 1 (#) - main title, skip content processing
      continue
    elif [[ $hlevel -eq 2 ]] || [[ $hlevel -eq 3 ]]; then
      # Level 2 (##) and Level 3 (###) - create section function
      local section_id=$(sanitize_name "$htitle")
      local func_name="show_$(echo "$section_id" | sed 's/-/_/g')"

      echo "${func_name}() {" >> "$output_file"
      echo "  print_section \"$htitle\"" >> "$output_file"
      echo "" >> "$output_file"

      # Convert markdown content to bash (includes #### subsections)
      convert_markdown_to_bash "$content" >> "$output_file"

      echo "" >> "$output_file"
      echo "  prompt_continue" >> "$output_file"
      echo "}" >> "$output_file"
      echo "" >> "$output_file"
    fi
  done

  # Add main flow
  cat >> "$output_file" <<MAIN_FLOW

# ============================================================================
# Main Flow
# ============================================================================

main() {
  clear
  print_section "$title"
  stream_text "An interactive bashticle - press Enter to continue"
  echo ""
  prompt_continue

  case "\$_arg_step" in
MAIN_FLOW

  # Add case statements for each section
  local idx=0
  for entry in "${section_funcs[@]}"; do
    local func_name="${entry%%:*}"
    local section_id="${entry##*:}"

    if [[ $idx -eq 0 ]]; then
      # First section: also match empty/null
      cat >> "$output_file" <<CASE_ENTRY
    $section_id|""|"null")
      $func_name
      ;&
CASE_ENTRY
    else
      cat >> "$output_file" <<CASE_ENTRY
    $section_id)
      $func_name
      ;;
CASE_ENTRY
    fi
    ((idx++))
  done

  cat >> "$output_file" <<MAIN_END
    *)
      echo "Unknown section: \$_arg_step"
      echo "Available sections: $section_list"
      exit 1
      ;;
  esac
}

main
MAIN_END

  # Clean up temp file
  rm -f "$tmp_file"

  # Make executable
  chmod +x "$output_file"

  echo ""
  echo "✅ Bashticle generated: $output_file"
  echo ""
  echo "Sections created:"
  for entry in "${section_funcs[@]}"; do
    local func_name="${entry%%:*}"
    local section_id="${entry##*:}"
    echo "  - $section_id ($func_name)"
  done
  echo ""
  echo "Next steps:"
  echo "  1. Review and test: ./$output_file --help"
  echo "  2. Run with dry-run: ./$output_file"
  echo "  3. Use parseArger parse to add article-specific options if needed"
}

main() {
  local input_file="${_arg_input_file:-}"
  local output_file="${_arg_output_file:-}"

  if [[ -z "$input_file" ]]; then
    echo "Error: input-file is required"
    echo "Usage: $0 [input-file] [--output-file <path>]"
    exit 1
  fi

  if [[ ! -f "$input_file" ]]; then
    echo "Error: File not found: $input_file"
    exit 1
  fi

  # Determine output file
  if [[ -z "$output_file" ]]; then
    local input_dir=$(dirname "$input_file")
    local input_base=$(basename "$input_file" .md)
    output_file="$input_dir/${input_base}.sh"
  fi

  generate_bashticle "$input_file" "$output_file"
}

main "$@"
