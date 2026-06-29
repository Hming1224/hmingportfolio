import os
import re
from collections import Counter, defaultdict

WORKSPACE = '/Users/hmingdesigner/Documents/Hming-AI-agent/400_Projects/hmingportfolio'
CASE_STUDY_CSS = [
    'styles/case-study.css',
    'styles/case-study-advantech.css',
    'styles/case-study-crypto-arsenal.css',
    'styles/case-study-laushu.css',
]
CASE_STUDY_THEMES = {'theme-advantech', 'theme-crypto-arsenal', 'theme-laushu'}
LAYOUT_PROPS = {
    'display', 'position', 'inset', 'top', 'right', 'bottom', 'left',
    'grid', 'grid-template', 'grid-template-columns', 'grid-template-rows',
    'grid-column', 'grid-row', 'flex', 'flex-direction', 'flex-wrap',
    'align-items', 'align-content', 'justify-content', 'justify-items',
    'gap', 'row-gap', 'column-gap', 'padding', 'padding-top',
    'padding-right', 'padding-bottom', 'padding-left', 'margin',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height',
    'font-size', 'line-height', 'letter-spacing', 'border-radius',
    'box-shadow', 'transform', 'transition',
}

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
        'styles/case-study-crypto-arsenal.css': ['app/crypto-arsenal/page.tsx', 'app/crypto-arsenal/sections/'],
        'styles/case-study-laushu.css': ['app/laushu/page.tsx'],
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

def strip_css_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)

def iter_css_rules(css):
    css = strip_css_comments(css)
    for match in re.finditer(r'([^{}@][^{}]*)\{([^{}]*)\}', css, flags=re.S):
        selector = ' '.join(match.group(1).strip().split())
        body = match.group(2)
        if not selector or selector.startswith(('from', 'to')):
            continue
        declarations = []
        for decl in body.split(';'):
            if ':' not in decl:
                continue
            prop, value = decl.split(':', 1)
            declarations.append((prop.strip(), value.strip()))
        yield selector, declarations

def classify_class(class_name):
    if class_name.startswith('theme-'):
        return 'theme-color'
    if class_name.startswith(('cs-flow-', 'cs-toc', 'cs-next', 'cs-hero', 'cs-info', 'cs-page', 'cs-section', 'cs-heading', 'cs-divider', 'cs-title', 'cs-body', 'cs-sub-heading', 'cs-zoomable', 'cs-grid', 'cs-card', 'cs-media', 'cs-metric-grid')):
        return 'shared-shell'
    if class_name.startswith(('cs-sol-', 'cs-role-', 'cs-tl-', 'cs-iv-', 'cs-synthesis', 'cs-result', 'cs-pc-', 'cs-ca-', 'cs-ns-', 'cs-alarm')):
        return 'shared-pattern-candidate'
    if class_name.startswith(('ca-', 'laushu-')):
        return 'shared-pattern-candidate'
    if class_name.startswith(('cs-flow', 'ca-flow', 'laushu-task', 'laushu-survey')):
        return 'visualization-geometry'
    return 'uncategorized'

def audit_case_study_inventory():
    print("--- 5. Case Study CSS Inventory ---")
    total_classes = Counter()
    total_declarations = 0
    total_layout_declarations = 0

    for rel in CASE_STUDY_CSS:
        path = os.path.join(WORKSPACE, rel)
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as file:
            css = file.read()

        class_names = set(re.findall(r'\.([_a-zA-Z][-_a-zA-Z0-9]*)', strip_css_comments(css)))
        class_categories = Counter(classify_class(name) for name in class_names)
        declarations = 0
        layout_declarations = 0
        for _selector, decls in iter_css_rules(css):
            declarations += len(decls)
            layout_declarations += sum(1 for prop, _value in decls if prop in LAYOUT_PROPS)

        total_classes.update(class_categories)
        total_declarations += declarations
        total_layout_declarations += layout_declarations
        print(f" {rel}:")
        print(f"   classes={len(class_names)} declarations={declarations} layout/geometry declarations={layout_declarations}")
        print(f"   categories={dict(sorted(class_categories.items()))}")

    print(f" Totals: declarations={total_declarations} layout/geometry declarations={total_layout_declarations}")
    print(f" Class categories={dict(sorted(total_classes.items()))}")
    print()

def audit_case_study_theme_roots():
    print("--- 6. Case Study Theme Root Guard ---")
    violations = defaultdict(list)

    for rel in CASE_STUDY_CSS + ['styles/tokens.css']:
        path = os.path.join(WORKSPACE, rel)
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as file:
            css = file.read()

        for selector, decls in iter_css_rules(css):
            selector_parts = [part.strip() for part in selector.split(',')]
            is_theme_root = all(part.startswith('.') and part[1:] in CASE_STUDY_THEMES for part in selector_parts)
            if not is_theme_root:
                continue
            for prop, value in decls:
                if prop.startswith('--'):
                    continue
                if prop in LAYOUT_PROPS:
                    violations[rel].append(f"{selector}: {prop}: {value}")

    if violations:
        for rel, items in violations.items():
            print(f" FAIL: {rel}")
            for item in items:
                print(f"   {item}")
        raise SystemExit(1)

    print(" SUCCESS: theme root blocks only define tokens / non-layout values.")
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
    audit_case_study_inventory()
    audit_case_study_theme_roots()
