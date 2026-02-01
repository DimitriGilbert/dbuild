#!/usr/bin/env bash

# Image Optimization Script for Web
# Converts images to WebP with optimal quality settings
# Usage: ./optimize-image.sh <image_path> [options]

set -euo pipefail

# Default settings
QUALITY=80
MAX_WIDTH=1920
MAX_HEIGHT=1080
OUTPUT_DIR=""
KEEP_ORIGINAL=true
VERBOSE=false
STRIP_METADATA=true
RESIZE=false

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_usage() {
    cat << EOF
${BLUE}Image Optimization Script for Web${NC}

${YELLOW}Usage:${NC}
    $(basename "$0") <image_path> [options]

${YELLOW}Options:${NC}
    -q, --quality <1-100>      WebP quality (default: 80)
    -w, --max-width <pixels>   Maximum width for resize (default: 1920)
    -h, --max-height <pixels>  Maximum height for resize (default: 1080)
    -r, --resize               Enable resizing to max dimensions
    -o, --output <dir>         Output directory (default: same as input)
    -d, --delete-original      Delete original after conversion
    -k, --keep-metadata        Keep image metadata (default: strip)
    -v, --verbose              Verbose output
    --help                     Show this help message

${YELLOW}Examples:${NC}
    $(basename "$0") image.png
    $(basename "$0") image.jpg -q 85 -r -w 1200
    $(basename "$0") photo.png -o ./optimized -d

${YELLOW}Supported formats:${NC}
    Input:  PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP
    Output: WebP (optimized for web)
EOF
}

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

check_dependencies() {
    local missing=()
    
    if ! command -v cwebp &> /dev/null; then
        missing+=("cwebp (webp package)")
    fi
    
    if ! command -v convert &> /dev/null; then
        missing+=("convert (imagemagick)")
    fi
    
    if ! command -v identify &> /dev/null; then
        missing+=("identify (imagemagick)")
    fi
    
    if [ ${#missing[@]} -gt 0 ]; then
        log_error "Missing required dependencies:"
        for dep in "${missing[@]}"; do
            echo "  - $dep"
        done
        echo ""
        echo "Install on Ubuntu/Debian:"
        echo "  sudo apt install webp imagemagick"
        echo ""
        echo "Install on macOS:"
        echo "  brew install webp imagemagick"
        echo ""
        echo "Install on Arch:"
        echo "  sudo pacman -S libwebp imagemagick"
        exit 1
    fi
}

get_file_size() {
    local file="$1"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        stat -f%z "$file"
    else
        stat -c%s "$file"
    fi
}

format_size() {
    local bytes=$1
    if [ "$bytes" -lt 1024 ]; then
        echo "${bytes}B"
    elif [ "$bytes" -lt 1048576 ]; then
        echo "$(echo "scale=2; $bytes/1024" | bc)KB"
    else
        echo "$(echo "scale=2; $bytes/1048576" | bc)MB"
    fi
}

optimize_image() {
    local input_file="$1"
    
    # Validate input file
    if [ ! -f "$input_file" ]; then
        log_error "File not found: $input_file"
        exit 1
    fi
    
    # Get file info
    local filename=$(basename "$input_file")
    local extension="${filename##*.}"
    local basename="${filename%.*}"
    local input_dir=$(dirname "$input_file")
    
    # Determine output directory
    if [ -z "$OUTPUT_DIR" ]; then
        OUTPUT_DIR="$input_dir"
    fi
    
    # Create output directory if needed
    mkdir -p "$OUTPUT_DIR"
    
    # Output file path
    local output_file="$OUTPUT_DIR/${basename}.webp"
    
    # Get original file size
    local original_size=$(get_file_size "$input_file")
    
    log_info "Processing: $input_file"
    [ "$VERBOSE" = true ] && log_info "Original size: $(format_size $original_size)"
    
    # Get image dimensions
    local dimensions=$(identify -format "%wx%h" "$input_file" 2>/dev/null)
    local width=$(echo "$dimensions" | cut -d'x' -f1)
    local height=$(echo "$dimensions" | cut -d'x' -f2)
    
    [ "$VERBOSE" = true ] && log_info "Original dimensions: ${width}x${height}"
    
    # Prepare temporary file for processing
    local temp_file=$(mktemp /tmp/optimize_XXXXXX.png)
    trap "rm -f '$temp_file'" EXIT
    
    # Build ImageMagick convert command
    local convert_args=("$input_file")
    
    # Strip metadata if requested
    if [ "$STRIP_METADATA" = true ]; then
        convert_args+=("-strip")
    fi
    
    # Resize if requested and image exceeds max dimensions
    if [ "$RESIZE" = true ]; then
        if [ "$width" -gt "$MAX_WIDTH" ] || [ "$height" -gt "$MAX_HEIGHT" ]; then
            convert_args+=("-resize" "${MAX_WIDTH}x${MAX_HEIGHT}>")
            [ "$VERBOSE" = true ] && log_info "Resizing to max ${MAX_WIDTH}x${MAX_HEIGHT}"
        fi
    fi
    
    # Auto-orient based on EXIF data
    convert_args+=("-auto-orient")
    
    # Convert to intermediate PNG for cwebp
    convert_args+=("$temp_file")
    
    log_info "Preprocessing image..."
    convert "${convert_args[@]}"
    
    # Convert to WebP using cwebp for best optimization
    log_info "Converting to WebP with quality $QUALITY..."
    
    local cwebp_args=(
        "-q" "$QUALITY"
        "-m" "6"           # Maximum compression method (slowest but best)
        "-af"              # Auto-filter (adjusts filter strength)
        "-mt"              # Multi-threaded
    )
    
    # Add advanced options for better compression
    cwebp_args+=(
        "-pass" "10"       # Maximum number of passes
        "-sns" "80"        # Spatial noise shaping
        "-f" "50"          # Deblocking filter strength
    )
    
    if [ "$VERBOSE" = true ]; then
        cwebp_args+=("-v")
    else
        cwebp_args+=("-quiet")
    fi
    
    cwebp_args+=("$temp_file" "-o" "$output_file")
    
    cwebp "${cwebp_args[@]}"
    
    # Get new file size
    local new_size=$(get_file_size "$output_file")
    
    # Calculate savings
    local saved=$((original_size - new_size))
    local percent=$(echo "scale=1; ($saved * 100) / $original_size" | bc)
    
    # Get new dimensions
    local new_dimensions=$(identify -format "%wx%h" "$output_file" 2>/dev/null)
    
    echo ""
    log_success "Optimization complete!"
    echo -e "  ${BLUE}Input:${NC}  $input_file"
    echo -e "  ${BLUE}Output:${NC} $output_file"
    echo -e "  ${BLUE}Original:${NC} $(format_size $original_size) (${dimensions})"
    echo -e "  ${BLUE}Optimized:${NC} $(format_size $new_size) (${new_dimensions})"
    echo -e "  ${GREEN}Saved:${NC} $(format_size $saved) (${percent}%)"
    
    # Delete original if requested
    if [ "$KEEP_ORIGINAL" = false ]; then
        rm "$input_file"
        log_info "Deleted original file"
    fi
    
    # Cleanup
    rm -f "$temp_file"
    trap - EXIT
}

# Parse arguments
if [ $# -eq 0 ]; then
    print_usage
    exit 1
fi

INPUT_FILE=""

while [ $# -gt 0 ]; do
    case "$1" in
        -q|--quality)
            QUALITY="$2"
            shift 2
            ;;
        -w|--max-width)
            MAX_WIDTH="$2"
            shift 2
            ;;
        -h|--max-height)
            MAX_HEIGHT="$2"
            shift 2
            ;;
        -r|--resize)
            RESIZE=true
            shift
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -d|--delete-original)
            KEEP_ORIGINAL=false
            shift
            ;;
        -k|--keep-metadata)
            STRIP_METADATA=false
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        --help)
            print_usage
            exit 0
            ;;
        -*)
            log_error "Unknown option: $1"
            print_usage
            exit 1
            ;;
        *)
            INPUT_FILE="$1"
            shift
            ;;
    esac
done

if [ -z "$INPUT_FILE" ]; then
    log_error "No input file specified"
    print_usage
    exit 1
fi

# Check dependencies
check_dependencies

# Run optimization
optimize_image "$INPUT_FILE"
