#!/bin/bash
# @parseArger-begin
# @parseArger-help "From Ralph to Eric - An interactive bashticle" --option "help" --short-option "h"
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
# @parseArger pos step "Section to jump to" --optional --complete-custom "echo 'the-eric-loop but-why- what-would-it-look-like- taskomatic lets-get-this-rolling'"
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
		echo -e "From Ralph to Eric:"
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

# ============================================================================
# Helper Functions
# ============================================================================

stream_text() {
  local text="$1"
  local delay="${2:-0.005}"
  for ((i=0; i<${#text}; i++)); do
    echo -n "${text:$i:1}"
    sleep "$delay"
  done
  echo
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

# ============================================================================
# Article Sections (TODO: AI fills these in)
# ============================================================================

show_the_eric_loop() {
  print_section "The Eric Loop"
  echo ""
  prompt_continue
}

show_but_why_() {
  print_section "But, Why... ?"
  echo ""
  prompt_continue
}

show_what_would_it_look_like_() {
  print_section "What would it look like ?"
  echo ""
  prompt_continue
}

show_taskomatic() {
  print_section "Task-o-matic"
  echo ""
  prompt_continue
}

show_lets_get_this_rolling() {
  print_section "Let's get this rolling"
  echo ""
  prompt_continue
}


# ============================================================================
# Main Flow
# ============================================================================

main() {
  clear
  print_section "From Ralph to Eric"
  stream_text "An interactive bashticle - press Enter to continue"
  echo ""
  prompt_continue

  case "$_arg_step" in
    the-eric-loop|""|"null")
      show_the_eric_loop
      prompt_continue
      ;&
    but-why-)
      show_but_why_
      prompt_continue
      ;;
    what-would-it-look-like-)
      show_what_would_it_look_like_
      prompt_continue
      ;;
    taskomatic)
      show_taskomatic
      prompt_continue
      ;;
    lets-get-this-rolling)
      show_lets_get_this_rolling
      prompt_continue
      ;;
  esac
}

main
