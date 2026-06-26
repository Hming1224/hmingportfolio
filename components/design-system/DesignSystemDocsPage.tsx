import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import ComponentDemo from "./ComponentDemo";

function localized(locale: DesignSystemLocale, english: string, chinese: string) {
  return locale === "en" ? english : chinese;
}

export default function DesignSystemDocsPage({
  doc,
  locale,
}: {
  doc: DesignSystemDoc;
  locale: DesignSystemLocale;
}) {
  const title = localized(locale, doc.title, doc.titleZh);
  const description = localized(locale, doc.description, doc.descriptionZh);

  return (
    <article >
      <header style={{ marginBottom: "var(--hm-space-xl)" }}>
        <p style={{ color: "var(--hm-purple)", textTransform: "uppercase", fontSize: "var(--hm-fs-sm)", fontWeight: 600, letterSpacing: "0.08em", margin: "0 0 var(--hm-space-xs)" }}>{doc.category}</p>
        <h1 style={{ margin: "0 0 var(--hm-space-xs)", fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.2 }}>{title}</h1>
        <p style={{ margin: 0, fontSize: "18px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{description}</p>
        {doc.source ? <code style={{ display: "inline-block", marginTop: "var(--hm-space-sm)", padding: "4px 8px", background: "var(--hm-surface)", borderRadius: "var(--hm-radius-sm)", fontSize: "var(--hm-fs-sm)", color: "var(--text-secondary)" }}>{doc.source}</code> : null}
      </header>

      {doc.kind === "component" || doc.demo ? (
        <section style={{ marginTop: "var(--hm-space-xl)" }}>
          <h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>{localized(locale, "Examples", "範例")}</h2>
          <div style={{ padding: "var(--hm-space-xl)", border: "1px solid var(--hm-line)", borderRadius: "var(--hm-radius-lg)", background: "color-mix(in srgb, var(--hm-paper) 92%, white)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 240, marginTop: "var(--hm-space-md)" }}>
            <ComponentDemo locale={locale} type={doc.demo} />
          </div>
        </section>
      ) : null}

      <section style={{ marginTop: "var(--hm-space-xl)" }}>
        <h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>{localized(locale, "When to use", "使用時機")}</h2>
        <ul style={{ paddingLeft: "var(--hm-space-md)", margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          {doc.usage.map((item) => <li key={item} style={{ paddingLeft: "4px", marginBottom: "4px" }}>{item}</li>)}
        </ul>
      </section>

      {doc.states?.length ? (
        <section style={{ marginTop: "var(--hm-space-xl)" }}>
          <h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>{localized(locale, "States", "狀態")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-xs)", marginTop: "var(--hm-space-xs)" }}>
            {doc.states.map((state) => <span key={state} style={{ display: "inline-flex", alignItems: "center", minHeight: 32, padding: "0 12px", borderRadius: "var(--hm-radius-pill)", background: "var(--hm-surface)", border: "1px solid var(--hm-line-strong)", fontSize: "var(--hm-fs-sm)" }}>{state}</span>)}
          </div>
        </section>
      ) : null}

      {doc.tokens?.length ? (
        <section style={{ marginTop: "var(--hm-space-xl)" }}>
          <h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>{localized(locale, "Design Tokens", "設計 Token")}</h2>
          <div style={{ display: "grid", gap: "var(--hm-space-2xs)", marginTop: "var(--hm-space-xs)" }}>
            {doc.tokens.map((token) => <code key={token} style={{ padding: "4px 8px", background: "var(--hm-surface)", borderRadius: "var(--hm-radius-sm)", fontSize: "var(--hm-fs-sm)", color: "var(--hm-purple)" }}>{token}</code>)}
          </div>
        </section>
      ) : null}

      {doc.accessibility?.length ? (
        <section style={{ marginTop: "var(--hm-space-xl)" }}>
          <h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>Accessibility</h2>
          <ul style={{ paddingLeft: "var(--hm-space-md)", margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {doc.accessibility.map((item) => <li key={item} style={{ paddingLeft: "4px", marginBottom: "4px" }}>{item}</li>)}
          </ul>
        </section>
      ) : null}

      <section style={{ marginTop: "var(--hm-space-xl)" }}>
        <h2 style={{ fontSize: "var(--hm-fs-h3)", margin: "0 0 var(--hm-space-sm)" }}>{localized(locale, "Reference", "參考")}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--hm-space-2xs)", marginTop: "var(--hm-space-xs)" }}>
          {(doc.references ?? ["docs/design-system.md"]).map((item) => <code key={item} style={{ padding: "4px 8px", background: "var(--hm-surface)", borderRadius: "var(--hm-radius-sm)", fontSize: "var(--hm-fs-sm)", color: "var(--text-secondary)" }}>{item}</code>)}
        </div>
      </section>
    </article>
  );
}
