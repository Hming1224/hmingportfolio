import fs from 'fs';
import path from 'path';

const p = path.resolve('components/design-system/DesignSystemDocsPage.tsx');
let content = fs.readFileSync(p, 'utf8');

content = content.replace(/className="ds-docs-article"/g, '');

content = content.replace(/className="ds-docs-hero"/g, 'style={{ marginBottom: "var(--hm-space-xl)" }}');

content = content.replace(/className="ds-eyebrow"/g, 'style={{ color: "var(--hm-purple)", textTransform: "uppercase", fontSize: "var(--hm-fs-sm)", fontWeight: 600, letterSpacing: "0.08em", margin: "0 0 var(--hm-space-xs)" }}');

content = content.replace(/<h1>\{title\}<\/h1>/g, '<h1 style={{ margin: "0 0 var(--hm-space-xs)", fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.2 }}>{title}</h1>');

content = content.replace(/<p>\{description\}<\/p>/g, '<p style={{ margin: 0, fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{description}</p>');

content = content.replace(/<code>\{doc\.source\}<\/code>/g, '<code style={{ display: "inline-block", marginTop: "var(--hm-space-sm)", padding: "4px 8px", background: "var(--hm-surface)", borderRadius: "var(--hm-radius-sm)", fontSize: "var(--hm-fs-sm)", color: "var(--text-secondary)" }}>{doc.source}</code>');

content = content.replace(/className="ds-doc-section"/g, 'style={{ marginTop: "var(--hm-space-xl)" }}');

content = content.replace(/<h2>/g, '<h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>');

content = content.replace(/className="ds-doc-demo-stage"/g, 'style={{ padding: "var(--hm-space-xl)", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 240, marginTop: "var(--hm-space-md)" }}');

content = content.replace(/className="ds-doc-chip-grid"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)", marginTop: "var(--hm-space-xs)" }}');
content = content.replace(/<span key=\{state\}>\{state\}<\/span>/g, '<span key={state} style={{ display: "inline-flex", alignItems: "center", minHeight: 32, padding: "0 12px", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-surface)", border: "1px solid var(--hm-line-strong)", fontSize: "var(--hm-fs-sm)" }}>{state}</span>');

content = content.replace(/className="ds-doc-token-list"/g, 'style={{ display: "grid", gap: "var(--hm-space-2xs)", marginTop: "var(--hm-space-xs)" }}');
content = content.replace(/<code key=\{token\}>\{token\}<\/code>/g, '<code key={token} style={{ padding: "4px 8px", background: "var(--hm-surface)", borderRadius: "var(--hm-radius-sm)", fontSize: "var(--hm-fs-sm)", color: "var(--hm-purple)" }}>{token}</code>');

content = content.replace(/className="ds-doc-reference"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-2xs)", marginTop: "var(--hm-space-xs)" }}');
content = content.replace(/<code key=\{item\}>\{item\}<\/code>/g, '<code key={item} style={{ padding: "4px 8px", background: "var(--hm-surface)", borderRadius: "var(--hm-radius-sm)", fontSize: "var(--hm-fs-sm)", color: "var(--text-secondary)" }}>{item}</code>');

// Also fix ul style since it's plain
content = content.replace(/<ul>/g, '<ul style={{ paddingLeft: "var(--hm-space-md)", margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>');
content = content.replace(/<li key=\{item\}>\{item\}<\/li>/g, '<li key={item} style={{ paddingLeft: "4px", marginBottom: "4px" }}>{item}</li>');


fs.writeFileSync(p, content, 'utf8');
