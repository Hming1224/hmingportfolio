import fs from 'fs';
import path from 'path';

const p = path.resolve('app/design-system/page.tsx');
let content = fs.readFileSync(p, 'utf8');

content = content.replace(/import \{ Link \} from "\.\.\/\.\.\/i18n\/navigation";/, 'import { Link } from "../../i18n/navigation";\nimport Button from "../../components/ui/Button";');

content = content.replace(/<main className="ds-page">/g, '<main style={{ background: "var(--hm-paper)", color: "var(--text-body)", overflowX: "clip" }}>');

content = content.replace(/<section className="ds-hero" aria-labelledby="ds-title">/g, '<section style={{ padding: "148px 0 56px", background: "radial-gradient(circle at top right, color-mix(in srgb, var(--hm-purple-soft) 80%, white) 0%, transparent 34%), linear-gradient(180deg, color-mix(in srgb, var(--hm-surface) 65%, white) 0%, transparent 100%)" }} aria-labelledby="ds-title">');

content = content.replace(/<div className="ds-shell ds-hero-inner">/g, '<div style={{ width: "min(var(--hm-container), calc(100% - 96px))", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.95fr)", gap: "var(--hm-space-lg)", alignItems: "end" }}>');

content = content.replace(/className="ds-hero-copy"/g, '');

content = content.replace(/className="ds-eyebrow"/g, 'style={{ margin: "0 0 var(--hm-space-xs)", fontSize: "var(--hm-fs-sm)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--hm-purple)" }}');

content = content.replace(/<h1 id="ds-title">/g, '<h1 id="ds-title" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--text-heading)" }}>');

content = content.replace(/className="ds-hero-description"/g, 'style={{ margin: "var(--hm-space-sm) 0 0", maxWidth: 760, fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)" }}');

content = content.replace(/className="ds-hero-actions"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)", marginTop: 28 }}');

content = content.replace(/<a className="ds-anchor-link" href="#getting-started">([\s\S]*?)<\/a>/g, '<Button href="#getting-started">$1</Button>');
content = content.replace(/<a className="ds-anchor-link is-secondary" href="#tokens">([\s\S]*?)<\/a>/g, '<Button variant="secondary" href="#tokens">$1</Button>');

content = content.replace(/className="ds-stats-grid"/g, 'style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "var(--hm-space-sm)" }}');
content = content.replace(/<article key=\{stat\.label\} className="ds-stat-card">/g, '<article key={stat.label} style={{ border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)", padding: "var(--hm-space-md)" }}>');
content = content.replace(/<strong>\{stat\.value\}<\/strong>/g, '<strong style={{ display: "block", fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1, color: "var(--text-heading)" }}>{stat.value}</strong>');
content = content.replace(/<span>\{stat\.label\}<\/span>/g, '<span style={{ display: "block", marginTop: "var(--hm-space-2xs)", color: "var(--text-secondary)", lineHeight: 1.5 }}>{stat.label}</span>');

content = content.replace(/className="ds-section"/g, 'style={{ scrollMarginTop: 112 }}');

content = content.replace(/className="ds-section-heading"/g, 'style={{ display: "grid", gridTemplateColumns: "40px auto 1fr", gap: 14, alignItems: "center", marginBottom: "var(--hm-space-md)" }}');
content = content.replace(/<span \/>/g, '<span style={{ height: 1, background: "var(--hm-line-strong)" }} />');
content = content.replace(/<h2>\{copy\.introduction\.heading\}<\/h2>/g, '<h2 style={{ margin: 0, fontSize: "clamp(26px, 3.2vw, 32px)", lineHeight: 1.3, color: "var(--text-heading)" }}>{copy.introduction.heading}</h2>');
content = content.replace(/<h2>\{locale === "en" \? "Foundations & Tokens" : "基礎與 Tokens"\}<\/h2>/g, '<h2 style={{ margin: 0, fontSize: "clamp(26px, 3.2vw, 32px)", lineHeight: 1.3, color: "var(--text-heading)" }}>{locale === "en" ? "Foundations & Tokens" : "基礎與 Tokens"}</h2>');

content = content.replace(/className="ds-intro-grid"/g, 'style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}');

content = content.replace(/className="ds-soul-card"/g, 'style={{ padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}');
content = content.replace(/<h3>\{copy\.introduction\.soulTitle\}<\/h3>/g, '<h3 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{copy.introduction.soulTitle}</h3>');
content = content.replace(/<p>\{copy\.introduction\.soulBody\}<\/p>/g, '<p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.introduction.soulBody}</p>');

content = content.replace(/className="ds-keyword-row"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)" }}');
content = content.replace(/<span key=\{keyword\}>\{keyword\}<\/span>/g, '<span key={keyword} style={{ display: "inline-flex", alignItems: "center", minHeight: 34, padding: "0 14px", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-purple-light)", color: "var(--hm-purple)", fontSize: "var(--hm-fs-sm)", fontWeight: 500 }}>{keyword}</span>');

content = content.replace(/className="ds-architecture-card"/g, 'style={{ padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}');
content = content.replace(/<h3>\{copy\.introduction\.architectureTitle\}<\/h3>/g, '<h3 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{copy.introduction.architectureTitle}</h3>');
content = content.replace(/<p>\{copy\.introduction\.architectureBody\}<\/p>/g, '<p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.introduction.architectureBody}</p>');

content = content.replace(/className="ds-architecture-split"/g, 'style={{ display: "grid", gap: 14, marginTop: 18 }}');
content = content.replace(/className="ds-architecture-pane"/g, 'style={{ padding: 20, borderRadius: "var(--hm-radius-md)", border: "1px solid var(--hm-line)", background: "var(--hm-surface)" }}');
content = content.replace(/className="ds-pane-kicker"/g, 'style={{ margin: "0 0 16px", color: "var(--hm-purple)", fontSize: "var(--hm-fs-sm)", fontWeight: 600 }}');
content = content.replace(/<h4>\{card\.title\}<\/h4>/g, '<h4 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{card.title}</h4>');
content = content.replace(/<p>\{card\.body\}<\/p>/g, '<p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{card.body}</p>');

content = content.replace(/className="ds-principles-grid"/g, 'style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18, marginTop: 18 }}');
content = content.replace(/className="ds-principle-card"/g, 'style={{ padding: 24, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}');
content = content.replace(/className="ds-principle-index"/g, 'style={{ margin: "0 0 16px", color: "var(--hm-purple)", fontSize: "var(--hm-fs-sm)", fontWeight: 600 }}');
content = content.replace(/<h3>\{english\}<\/h3>/g, '<h3 style={{ margin: 0, fontSize: "var(--hm-fs-h4)", lineHeight: 1.4, color: "var(--text-heading)" }}>{english}</h3>');
content = content.replace(/<p>\{chinese\}<\/p>/g, '<p style={{ margin: "var(--hm-space-2xs) 0 0", lineHeight: 1.7, color: "var(--text-secondary)" }}>{chinese}</p>');

content = content.replace(/className="ds-context-table-wrap"/g, 'style={{ maxWidth: "100%", overflowX: "auto", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 96%, white)" }}');
content = content.replace(/className="ds-context-table"/g, 'style={{ width: "100%", minWidth: 720, borderCollapse: "collapse" }}');
// I'll leave th/td without inline styles as much as possible, or add them using global CSS or just let them inherit.

content = content.replace(/className="ds-section ds-cta"/g, 'style={{ scrollMarginTop: 112, padding: 28, border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", boxShadow: "var(--shadow-sm)" }}');
content = content.replace(/<h2>\{copy\.cta\.title\}<\/h2>/g, '<h2 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.18, letterSpacing: "-0.01em", color: "var(--text-heading)" }}>{copy.cta.title}</h2>');
content = content.replace(/<p>\{copy\.cta\.body\}<\/p>/g, '<p style={{ margin: "var(--hm-space-sm) 0 0", maxWidth: 760, fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)" }}>{copy.cta.body}</p>');

content = content.replace(/className="ds-cta-actions"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)", marginTop: "var(--hm-space-md)" }}');

content = content.replace(/<Link className="ds-anchor-link" href="\/#projects">([\s\S]*?)<\/Link>/g, '<Button href="/#projects">$1</Button>');
content = content.replace(/<Link className="ds-anchor-link is-secondary" href="\/contact">([\s\S]*?)<\/Link>/g, '<Button variant="secondary" href="/contact">$1</Button>');

fs.writeFileSync(p, content, 'utf8');
