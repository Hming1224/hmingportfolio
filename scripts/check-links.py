import os
import re
import sys

WORKSPACE = '/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio'
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
                    for line_num, line in enumerate(file, 1):
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
