import os
import re
import sys
from pathlib import Path

WORKSPACE = str(Path(__file__).resolve().parents[1])
PUBLIC_DIR = os.path.join(WORKSPACE, 'public')

dirs_to_scan = [
    os.path.join(WORKSPACE, 'app'),
    os.path.join(WORKSPACE, 'components'),
    os.path.join(WORKSPACE, 'data'),
    os.path.join(WORKSPACE, 'styles')
]

# Match patterns starting with /projects/
# e.g., '/projects/advantech/cover/cover.webp', "/projects/laushu/cover/logo.webp"
# also match CSS url("/projects/...")
link_pattern = re.compile(r'/projects/([^"\')\s]+)')


def remove_comments(source):
    """Blank comments while preserving strings and line numbers.

    Asset paths in code strings remain checkable, but documentation comments
    cannot be mistaken for runtime asset references.
    """
    output = []
    index = 0
    quote = None
    escaped = False
    in_block_comment = False

    while index < len(source):
        char = source[index]
        next_char = source[index + 1] if index + 1 < len(source) else ''

        if in_block_comment:
            if char == '*' and next_char == '/':
                output.extend((' ', ' '))
                index += 2
                in_block_comment = False
            else:
                output.append('\n' if char == '\n' else ' ')
                index += 1
            continue

        if quote:
            output.append(char)
            if escaped:
                escaped = False
            elif char == '\\':
                escaped = True
            elif char == quote:
                quote = None
            index += 1
            continue

        if char in ('"', "'", '`'):
            quote = char
            output.append(char)
            index += 1
        elif char == '/' and next_char == '/':
            output.extend((' ', ' '))
            index += 2
            while index < len(source) and source[index] != '\n':
                output.append(' ')
                index += 1
        elif char == '/' and next_char == '*':
            output.extend((' ', ' '))
            index += 2
            in_block_comment = True
        else:
            output.append(char)
            index += 1

    return ''.join(output)

broken_links = 0
total_checked = 0

print("=== STARTING BROKEN LINK CHECKER ===")

for scan_dir in dirs_to_scan:
    if not os.path.exists(scan_dir):
        continue
    for root, _, files in os.walk(scan_dir):
        for f in files:
            if f.startswith('.') or not f.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                continue
            
            filepath = os.path.join(root, f)
            rel_path = os.path.relpath(filepath, WORKSPACE)
            
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    source_without_comments = remove_comments(file.read())
                    for line_num, line in enumerate(source_without_comments.splitlines(), 1):
                        matches = link_pattern.findall(line)
                        for m in matches:
                            # Clean up match
                            # e.g., if it matches 'advantech/cover/cover.webp'
                            # remove trailing characters if any
                            clean_match = m
                            # Check if the file exists under public/projects/
                            target_path = os.path.join(PUBLIC_DIR, 'projects', clean_match)
                            total_checked += 1
                            if not os.path.exists(target_path):
                                print(f"BROKEN LINK: {rel_path}:{line_num} -> Referenced '/projects/{clean_match}' but file not found at '{target_path}'")
                                broken_links += 1
            except Exception as e:
                print(f"Error reading {rel_path}: {e}")

print("\n=== LINK CHECKER REPORT ===")
print(f"Total checked: {total_checked}")
print(f"Broken links:  {broken_links}")

if broken_links > 0:
    print("FAIL: Broken links found!")
    sys.exit(1)
else:
    print("SUCCESS: All links are valid!")
    sys.exit(0)
