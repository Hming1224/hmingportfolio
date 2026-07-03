import type { CSSProperties } from "react";
import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import { designSystemTokenRows } from "@/lib/design-system-data";
import ComponentDemo from "./ComponentDemo";
import styles from "./DesignSystemExplorer.module.css";

function localized(locale: DesignSystemLocale, english: string, chinese: string) {
  return locale === "en" ? english : chinese;
}

type TokenRow = (typeof designSystemTokenRows)[number];

const foundationTokenTypes: Record<string, TokenRow["type"][]> = {
  colors: ["color"],
  typography: ["type"],
  spacing: ["spacing"],
  radius: ["radius"],
  shadows: ["shadow"],
  motion: ["motion"],
};

function getTokenUsage(row: TokenRow, locale: DesignSystemLocale) {
  return locale === "zh-TW" ? row.usageZh ?? row.usage : row.usage;
}

function tokenPreviewStyle(row: TokenRow) {
  const value = row.value.split(" / ")[0];
  const cssValue = value.startsWith("#") || value.startsWith("rgb") || value.startsWith("var(")
    ? value
    : `var(${row.token})`;

  return {
    "--token-preview": cssValue,
    "--token-size": value,
    "--token-radius": value,
    "--token-shadow": row.value,
    "--token-duration": value,
    "--token-type-size": value,
  } as CSSProperties;
}

function renderTokenPreview(row: TokenRow, locale: DesignSystemLocale) {
  if (row.type === "color") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.colorSwatch} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "type") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <strong className={styles.typeSample} style={tokenPreviewStyle(row)}>Aa</strong>
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "spacing") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.spacingSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "radius") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.radiusSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "shadow") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.shadowSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  if (row.type === "motion") {
    return (
      <article className={styles.tokenPreviewCard} key={row.token}>
        <span className={styles.motionSample} style={tokenPreviewStyle(row)} />
        <code>{row.token}</code>
        <span>{row.value}</span>
        <p>{getTokenUsage(row, locale)}</p>
      </article>
    );
  }

  return (
    <article className={styles.tokenPreviewCard} key={row.token}>
      <strong className={styles.layoutSample}>{row.value}</strong>
      <code>{row.token}</code>
      <p>{getTokenUsage(row, locale)}</p>
    </article>
  );
}

function FoundationTokenReference({
  doc,
  locale,
}: {
  doc: DesignSystemDoc;
  locale: DesignSystemLocale;
}) {
  const title = localized(locale, doc.title, doc.titleZh);
  const description = localized(locale, doc.description, doc.descriptionZh);
  const isTokenReference = doc.kind === "reference" && doc.slug === "tokens";
  const groups = isTokenReference
    ? (["color", "type", "spacing", "radius", "shadow", "motion", "layout"] as const).map((type) => ({
        id: type,
        title: type === "type" ? localized(locale, "Typography", "字體與排版") : type,
        description: localized(locale, "Current code token names, values, scope, and usage.", "目前 code 內的 token 名稱、值、scope 與用途。"),
        rows: designSystemTokenRows.filter((row) => row.type === type),
      }))
    : [{
        id: doc.slug,
        title,
        description,
        rows: designSystemTokenRows.filter((row) => foundationTokenTypes[doc.slug]?.includes(row.type)),
      }];

  return (
    <section className={styles.docSection}>
      <div className={styles.foundationStack}>
        {groups.map((group) => (
          <article className={styles.foundationPanel} key={group.id}>
            <header className={styles.foundationPanelHeader}>
              <div>
                <p className={styles.foundationEyebrow}>{doc.category}</p>
                <h2 className={styles.foundationTitle}>{group.title}</h2>
                <p className={styles.foundationDescription}>{group.description}</p>
              </div>
              <span className={styles.foundationCount}>
                {group.rows.length} {locale === "en" ? "tokens" : "個 tokens"}
              </span>
            </header>
            <div className={`${styles.tokenPreviewGrid} ${styles[`tokenPreviewGrid_${doc.slug}`] ?? ""}`}>
              {group.rows.slice(0, isTokenReference ? 12 : group.rows.length).map((row) => renderTokenPreview(row, locale))}
            </div>
            <div className={styles.tableShell}>
              <table className={styles.tokenTable}>
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>{localized(locale, "Value", "值")}</th>
                    <th>Scope</th>
                    <th>{localized(locale, "Usage", "用途")}</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.token}>
                      <td>{row.token}</td>
                      <td>{row.value}</td>
                      <td>{row.scope}</td>
                      <td>{getTokenUsage(row, locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
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
  const usage = locale === "zh-TW" && doc.usageZh ? doc.usageZh : doc.usage;
  const states = locale === "zh-TW" && doc.statesZh ? doc.statesZh : doc.states;
  const accessibility = locale === "zh-TW" && doc.accessibilityZh ? doc.accessibilityZh : doc.accessibility;

  return (
    <article>
      <header className={styles.docHeader}>
        <p className={styles.eyebrow}>{doc.category}</p>
        <h1 className={styles.docTitle}>{title}</h1>
        <p className={styles.docDescription}>{description}</p>
        {doc.source ? <code className={styles.codeTag}>{doc.source}</code> : null}
      </header>

      {doc.kind === "component" || doc.demo ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Examples", "範例")}</h2>
          <div className={styles.demoSurface}>
            <ComponentDemo locale={locale} type={doc.demo} />
          </div>
        </section>
      ) : null}

      {doc.kind === "foundation" || doc.slug === "tokens" ? (
        <FoundationTokenReference doc={doc} locale={locale} />
      ) : null}

      <section className={styles.docSection}>
        <h2 className={styles.docSectionTitle}>{localized(locale, "When to use", "使用時機")}</h2>
        <ul className={styles.docList}>
          {usage.map((item) => <li className={styles.docListItem} key={item}>{item}</li>)}
        </ul>
      </section>

      {states?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "States", "狀態")}</h2>
          <div className={styles.stateList}>
            {states.map((state) => <span className={styles.statePill} key={state}>{state}</span>)}
          </div>
        </section>
      ) : null}

      {doc.tokens?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Design Tokens", "設計 Token")}</h2>
          <div className={styles.tokenList}>
            {doc.tokens.map((token) => <code className={`${styles.codeTag} ${styles.tokenCode}`} key={token}>{token}</code>)}
          </div>
        </section>
      ) : null}

      {accessibility?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>Accessibility</h2>
          <ul className={styles.docList}>
            {accessibility.map((item) => <li className={styles.docListItem} key={item}>{item}</li>)}
          </ul>
        </section>
      ) : null}

      <section className={styles.docSection}>
        <h2 className={styles.docSectionTitle}>{localized(locale, "Reference", "參考")}</h2>
        <div className={styles.referenceList}>
          {(doc.references ?? ["docs/design-system.md"]).map((item) => <code className={styles.codeTag} key={item}>{item}</code>)}
        </div>
      </section>
    </article>
  );
}
