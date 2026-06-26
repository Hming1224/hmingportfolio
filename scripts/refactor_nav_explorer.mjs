import fs from 'fs';
import path from 'path';

// Refactor DesignSystemDocsNav.tsx
const navPath = path.resolve('components/design-system/DesignSystemDocsNav.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');

navContent = navContent.replace(/className="ds-docs-nav-accordion"/g, 'style={{ width: "100%" }}');
navContent = navContent.replace(/className="ds-docs-nav-links"/g, 'style={{ display: "flex", flexDirection: "column", gap: "2px", margin: "4px 0", borderLeft: "1px solid var(--hm-line-strong)", marginLeft: "12px", paddingLeft: "12px" }}');
navContent = navContent.replace(/className="ds-docs-mobile-menu"/g, 'style={{ marginBottom: "var(--hm-space-md)" }}');

fs.writeFileSync(navPath, navContent, 'utf8');

// Refactor DesignSystemExplorer.tsx
const expPath = path.resolve('components/design-system/DesignSystemExplorer.tsx');
let expContent = fs.readFileSync(expPath, 'utf8');

expContent = expContent.replace(/className="ds-shell ds-docs-layout"/g, 'style={{ width: "min(var(--hm-container), calc(100% - 96px))", margin: "0 auto", display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: "var(--hm-space-xl)", marginTop: "var(--hm-space-2xl)", alignItems: "flex-start" }}');
expContent = expContent.replace(/className="ds-docs-sidebar"/g, 'style={{ position: "sticky", top: "80px", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}');
expContent = expContent.replace(/className="ds-docs-sidebar-nav"/g, 'style={{ display: "flex", flexDirection: "column", gap: 0 }}');
expContent = expContent.replace(/className="ds-docs-nav-group"/g, 'style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px 0" }}');
expContent = expContent.replace(/className="ds-content ds-docs-article"/g, 'style={{ flex: 1, minWidth: 0, display: "grid", gap: "var(--hm-space-xl)" }}');

fs.writeFileSync(expPath, expContent, 'utf8');
