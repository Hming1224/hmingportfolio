import { Link } from "@/i18n/navigation";
import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import {
  designSystemDocs,
  designSystemSections,
  getDesignSystemHref,
} from "@/lib/design-system-docs";
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
    <main className="ds-page ds-docs-page">
      <div className="ds-docs-mobile-head">
        <Link href="/design-system">Hming DS</Link>
        <details>
          <summary>{localized(locale, "Browse docs", "瀏覽文件")}</summary>
          <nav>
            {designSystemSections.map((section) => (
              <section key={section.label}>
                <strong>{localized(locale, section.label, section.labelZh)}</strong>
                {section.items.map((item) => {
                  const target = designSystemDocs.find(
                    (candidate) => candidate.kind === item.kind && candidate.slug === item.slug,
                  );
                  return target ? (
                    <Link key={target.slug} href={getDesignSystemHref(target.kind, target.slug)}>
                      {localized(locale, target.title, target.titleZh)}
                    </Link>
                  ) : null;
                })}
              </section>
            ))}
          </nav>
        </details>
      </div>

      <div className="ds-docs-layout">
        <aside className="ds-docs-sidebar">
          <Link className="ds-docs-brand" href="/design-system">
            <span>H</span>
            <strong>Hming DS</strong>
          </Link>
          <nav aria-label={localized(locale, "Design system documentation", "設計系統文件")}>
            {designSystemSections.map((section) => (
              <section key={section.label}>
                <p>{localized(locale, section.label, section.labelZh)}</p>
                {section.items.map((item) => {
                  const target = designSystemDocs.find(
                    (candidate) => candidate.kind === item.kind && candidate.slug === item.slug,
                  );
                  if (!target) return null;
                  const active = target.kind === doc.kind && target.slug === doc.slug;
                  return (
                    <Link
                      aria-current={active ? "page" : undefined}
                      className={active ? "is-active" : undefined}
                      href={getDesignSystemHref(target.kind, target.slug)}
                      key={`${target.kind}-${target.slug}`}
                    >
                      {localized(locale, target.title, target.titleZh)}
                    </Link>
                  );
                })}
              </section>
            ))}
          </nav>
        </aside>

        <article className="ds-docs-article">
          <header className="ds-docs-hero">
            <p className="ds-eyebrow">{doc.category}</p>
            <h1>{title}</h1>
            <p>{description}</p>
            {doc.source ? <code>{doc.source}</code> : null}
          </header>

          {doc.kind === "component" || doc.demo ? (
            <section className="ds-doc-section">
              <h2>{localized(locale, "Examples", "範例")}</h2>
              <div className="ds-doc-demo-stage">
                <ComponentDemo locale={locale} type={doc.demo} />
              </div>
            </section>
          ) : null}

          <section className="ds-doc-section">
            <h2>{localized(locale, "When to use", "使用時機")}</h2>
            <ul>
              {doc.usage.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          {doc.states?.length ? (
            <section className="ds-doc-section">
              <h2>{localized(locale, "States", "狀態")}</h2>
              <div className="ds-doc-chip-grid">
                {doc.states.map((state) => <span key={state}>{state}</span>)}
              </div>
            </section>
          ) : null}

          {doc.tokens?.length ? (
            <section className="ds-doc-section">
              <h2>{localized(locale, "Design Tokens", "設計 Token")}</h2>
              <div className="ds-doc-token-list">
                {doc.tokens.map((token) => <code key={token}>{token}</code>)}
              </div>
            </section>
          ) : null}

          {doc.accessibility?.length ? (
            <section className="ds-doc-section">
              <h2>Accessibility</h2>
              <ul>
                {doc.accessibility.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ) : null}

          <section className="ds-doc-section">
            <h2>{localized(locale, "Reference", "參考")}</h2>
            <div className="ds-doc-reference">
              {(doc.references ?? ["docs/design-system.md"]).map((item) => <code key={item}>{item}</code>)}
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
