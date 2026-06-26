import fs from 'fs';
import path from 'path';

const p = path.resolve('components/design-system/ComponentDemo.tsx');
let content = fs.readFileSync(p, 'utf8');

// Replace all `className="ds-*"` with `style={{...}}`

content = content.replace(/className="ds-doc-demo-note"/g, 'style={{ color: "var(--text-secondary)", fontStyle: "italic", textAlign: "center" }}');

content = content.replace(/className="ds-button-row"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-sm)", justifyContent: "center" }}');

content = content.replace(/className="ds-doc-language"/g, 'style={{ position: "relative", display: "inline-block", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "14px" }}');

content = content.replace(/className="ds-doc-navbar"/g, 'style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "16px 24px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-surface)" }}');

content = content.replace(/className="ds-doc-footer"/g, 'style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "24px", borderTop: "1px solid var(--hm-line)", color: "var(--text-secondary)", fontSize: "14px" }}');

content = content.replace(/className="ds-doc-progress-preview"/g, 'style={{ width: "100%", maxWidth: "300px" }}');

content = content.replace(/className="ds-floating-field ds-doc-field"/g, 'style={{ position: "relative", display: "block", width: "100%", maxWidth: "320px" }}');

content = content.replace(/className="ds-doc-control-width"/g, 'style={{ width: "100%", maxWidth: "320px" }}');

content = content.replace(/className="ds-doc-choice-stack"/g, 'style={{ display: "flex", flexDirection: "column", gap: "12px" }}');

content = content.replace(/className="ds-doc-tabs"/g, 'style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--hm-line)" }}');

content = content.replace(/className="ds-doc-toc-preview"/g, 'style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: "2px solid var(--hm-line-strong)", paddingLeft: "16px" }}');

content = content.replace(/className="ds-doc-year-rail"/g, 'style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}');

content = content.replace(/className="ds-inline-actions ds-doc-next-nav"/g, 'style={{ display: "flex", gap: "16px", justifyContent: "space-between", width: "100%" }}');

content = content.replace(/className="ds-doc-accordion-preview"/g, 'style={{ width: "100%", maxWidth: "480px" }}');

content = content.replace(/className="ds-doc-contact-method"/g, 'style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "var(--hm-surface)" }}');

content = content.replace(/className="ds-doc-project-card"/g, 'style={{ width: "100%", maxWidth: "360px", display: "grid", gap: "16px", padding: "16px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "var(--hm-paper)", boxShadow: "var(--shadow-sm)" }}');

content = content.replace(/className="ds-doc-project-cover"/g, 'style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: "var(--hm-radius-md)", overflow: "hidden", background: "var(--hm-surface)" }}');

content = content.replace(/className="ds-project-tag-row"/g, 'style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}');

content = content.replace(/className="ds-doc-section-heading-preview"/g, 'style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}');

content = content.replace(/className="ds-doc-social-row"/g, 'style={{ display: "flex", gap: "16px" }}');

content = content.replace(/className="ds-doc-skill-card"/g, 'style={{ padding: "24px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "var(--hm-surface)" }}');

content = content.replace(/className="ds-doc-experience-card"/g, 'style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "24px", padding: "24px", borderTop: "1px solid var(--hm-line)" }}');

content = content.replace(/className="ds-doc-hero-badge"/g, 'style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-purple-soft)", color: "var(--hm-purple)", fontSize: "14px", fontWeight: 500 }}');

content = content.replace(/className="ds-doc-case-hero"/g, 'style={{ width: "100%", maxWidth: "640px", display: "grid", gap: "24px", textAlign: "center" }}');

content = content.replace(/className="ds-doc-case-cover"/g, 'style={{ position: "relative", width: "100%", aspectRatio: "21/9", borderRadius: "var(--hm-radius-lg)", overflow: "hidden", background: "var(--hm-surface)" }}');

content = content.replace(/className="ds-doc-case-section"/g, 'style={{ width: "100%", maxWidth: "560px", display: "grid", gap: "24px" }}');

content = content.replace(/className="ds-doc-proposal"/g, 'style={{ width: "100%", maxWidth: "560px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", overflow: "hidden" }}');

content = content.replace(/className="ds-doc-proposal-panel"/g, 'style={{ padding: "24px", background: "var(--hm-surface)" }}');

content = content.replace(/className="ds-doc-info-grid"/g, 'style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", padding: "24px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)" }}');

content = content.replace(/className="ds-doc-feedback-stack"/g, 'style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "480px" }}');

content = content.replace(/className="ds-doc-modal-copy"/g, 'style={{ color: "var(--text-secondary)", marginBottom: "24px" }}');

content = content.replace(/className="ds-inline-actions"/g, 'style={{ display: "flex", gap: "12px" }}');

content = content.replace(/className="ds-doc-skeleton-stack"/g, 'style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "480px" }}');

content = content.replace(/className="ds-doc-zoom-wrap"/g, 'style={{ width: "100%", maxWidth: "480px", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", overflow: "hidden" }}');


fs.writeFileSync(p, content, 'utf8');
