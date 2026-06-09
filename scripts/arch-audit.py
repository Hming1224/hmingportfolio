import os
import re

WORKSPACE = '/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio'

def get_file_size_mb(filepath):
    return os.path.getsize(filepath) / (1024 * 1024)

# 1. Largest Files Ranking (excluding node_modules, .next, .git)
def audit_largest_files():
    print("--- 1. Largest Files Ranking (Top 10, source code & docs) ---")
    files_list = []
    exclude_dirs = {'node_modules', '.next', '.git', 'iterations'}
    for root, dirs, files in os.walk(WORKSPACE):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for f in files:
            filepath = os.path.join(root, f)
            if os.path.islink(filepath):
                continue
            files_list.append((filepath, get_file_size_mb(filepath)))
            
    files_list.sort(key=lambda x: x[1], reverse=True)
    for i, (path, size) in enumerate(files_list[:10], 1):
        rel = os.path.relpath(path, WORKSPACE)
        print(f" {i}. {rel} - {size:.2f} MB")
    print()

# 2. Route CSS Isolation Check
def audit_css_isolation():
    print("--- 2. Route CSS Isolation Check ---")
    # Mapping of CSS files to their authorized page paths
    route_css_rules = {
        'styles/case-study-advantech.css': ['app/advantech/page.tsx', 'app/advantech/sections/'],
        'styles/contact.css': ['app/contact/page.tsx', 'components/Contact.tsx'],
        'styles/about.css': ['app/about-me/page.tsx', 'components/About.tsx'],
        'styles/home.css': ['app/page.tsx', 'components/Hero.tsx', 'components/Works.tsx']
    }
    
    # Scan all TSX/TS/JS/JSX files to find where these CSS files are imported
    imports_found = {css: [] for css in route_css_rules}
    for root, dirs, files in os.walk(WORKSPACE):
        if any(p in root for p in ['node_modules', '.next', '.git']):
            continue
        for f in files:
            if not f.endswith(('.ts', '.tsx', '.js', '.jsx')):
                continue
            filepath = os.path.join(root, f)
            rel_file = os.path.relpath(filepath, WORKSPACE)
            
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                    for css in route_css_rules:
                        basename = os.path.basename(css)
                        # Look for imports of this CSS file
                        if basename in content:
                            imports_found[css].append(rel_file)
            except Exception as e:
                pass
                
    all_clean = True
    for css, allowed_paths in route_css_rules.items():
        found_in = imports_found[css]
        # Verify if imports are within allowed paths
        violations = []
        for fi in found_in:
            is_allowed = False
            for ap in allowed_paths:
                if fi.startswith(ap) or fi == ap:
                    is_allowed = True
                    break
            if not is_allowed:
                violations.append(fi)
                
        if violations:
            all_clean = False
            print(f" WARNING: '{css}' is imported in unauthorized files: {violations}")
        else:
            print(f" OK: '{css}' is properly isolated (imported in: {found_in})")
    if all_clean:
        print(" SUCCESS: All route CSS files are properly isolated!")
    print()

# 3. Project Modification Footprint Count
def audit_project_extension():
    print("--- 3. Project Extension Footprint Count ---")
    # Scan codebase to see where projects metadata or helper is imported
    # This represents how many places are affected when adding or modifying projects
    referencing_files = []
    for root, dirs, files in os.walk(WORKSPACE):
        if any(p in root for p in ['node_modules', '.next', '.git']):
            continue
        for f in files:
            if not f.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                continue
            filepath = os.path.join(root, f)
            rel_file = os.path.relpath(filepath, WORKSPACE)
            if rel_file in ['data/projects.ts', 'scripts/check-links.py', 'scripts/arch-audit.py']:
                continue
                
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                    if 'data/projects' in content or 'getProjectBySlug' in content or 'projects.ts' in content:
                        referencing_files.append(rel_file)
            except Exception as e:
                pass
                
    print(f" Number of files consuming project metadata: {len(referencing_files)}")
    print(f" Files list: {referencing_files}")
    print(" (A lower number indicates better architecture encapsulation!)")
    print()

# 4. Public Directory Large Assets Ranking
def audit_public_assets():
    print("--- 4. Public Directory Large Assets Ranking (Top 10) ---")
    public_dir = os.path.join(WORKSPACE, 'public')
    assets = []
    if os.path.exists(public_dir):
        for root, dirs, files in os.walk(public_dir):
            for f in files:
                filepath = os.path.join(root, f)
                if os.path.islink(filepath):
                    continue
                assets.append((filepath, get_file_size_mb(filepath)))
                
    assets.sort(key=lambda x: x[1], reverse=True)
    for i, (path, size) in enumerate(assets[:10], 1):
        rel = os.path.relpath(path, WORKSPACE)
        print(f" {i}. {rel} - {size:.2f} MB")
    print()

if __name__ == '__main__':
    print("==============================================")
    print("        ARCHITECTURE HYGIENE AUDIT            ")
    print("==============================================\n")
    audit_largest_files()
    audit_css_isolation()
    audit_project_extension()
    audit_public_assets()
