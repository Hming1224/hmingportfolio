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

function renderTokenPreviewCell(row: TokenRow) {
  if (row.type === "color") {
    return (
      <span className={styles.colorSwatch} style={tokenPreviewStyle(row)} />
    );
  }

  if (row.type === "type") {
    return (
      <strong className={styles.typeSample} style={tokenPreviewStyle(row)}>Aa</strong>
    );
  }

  if (row.type === "spacing") {
    return (
      <span className={styles.spacingSample} style={tokenPreviewStyle(row)} />
    );
  }

  if (row.type === "radius") {
    return (
      <span className={styles.radiusSample} style={tokenPreviewStyle(row)} />
    );
  }

  if (row.type === "shadow") {
    return (
      <span className={styles.shadowSample} style={tokenPreviewStyle(row)} />
    );
  }

  if (row.type === "motion") {
    return (
      <span className={styles.motionSample} style={tokenPreviewStyle(row)} />
    );
  }

  return (
    <strong className={styles.layoutSample}>{row.value}</strong>
  );
}

function TokenTable({
  locale,
  rows,
  variant,
}: {
  locale: DesignSystemLocale;
  rows: TokenRow[];
  variant: "foundation" | "reference";
}) {
  const isReference = variant === "reference";

  return (
    <div className={styles.tokenTableWrap}>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>{localized(locale, "Token", "Token")}</th>
            <th>{localized(locale, "Value", "值")}</th>
            {isReference ? <th>{localized(locale, "Type", "類型")}</th> : null}
            {isReference ? <th>{localized(locale, "Scope", "範圍")}</th> : null}
            <th>{localized(locale, "Usage", "用途")}</th>
            {!isReference ? <th>{localized(locale, "Preview", "預覽")}</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.token}>
              <td><code>{row.token}</code></td>
              <td><code>{row.value}</code></td>
              {isReference ? <td>{row.type}</td> : null}
              {isReference ? <td>{row.scope}</td> : null}
              <td>{getTokenUsage(row, locale)}</td>
              {!isReference ? <td>{renderTokenPreviewCell(row)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
            <TokenTable locale={locale} rows={group.rows} variant={isTokenReference ? "reference" : "foundation"} />
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
  const behavior = locale === "zh-TW" && doc.behaviorZh ? doc.behaviorZh : doc.behavior;
  const stateRows = locale === "zh-TW" && doc.stateRowsZh ? doc.stateRowsZh : doc.stateRows;
  const states = locale === "zh-TW" && doc.statesZh ? doc.statesZh : doc.states;
  const accessibility = locale === "zh-TW" && doc.accessibilityZh ? doc.accessibilityZh : doc.accessibility;
  const anatomy = locale === "zh-TW" && doc.anatomyZh ? doc.anatomyZh : doc.anatomy;
  const anatomyParts = locale === "zh-TW" && doc.anatomyPartsZh ? doc.anatomyPartsZh : doc.anatomyParts;
  const codeGuidance = locale === "zh-TW" && doc.codeGuidanceZh ? doc.codeGuidanceZh : doc.codeGuidance;
  const tokenMappings = locale === "zh-TW" && doc.tokenMappingsZh ? doc.tokenMappingsZh : doc.tokenMappings;
  const referenceCards = locale === "zh-TW" && doc.referenceCardsZh ? doc.referenceCardsZh : doc.referenceCards;
  const exampleLabel = locale === "zh-TW" && doc.exampleLabelZh ? doc.exampleLabelZh : doc.exampleLabel;
  const status = locale === "zh-TW" && doc.statusZh ? doc.statusZh : doc.status;
  const codePropsHaveUsage = codeGuidance?.props.some((item) => item.usedBy);
  const tokenMappingsHaveUsage = tokenMappings?.some((item) => item.usage);
  const stateRowsUseComponentDocColumns = stateRows?.some((item) => item.trigger || item.whatChanges);
  const docArticleClassName = [
    styles.docArticle,
    doc.kind === "component" ? styles.componentDocArticle : "",
    doc.kind !== "component" ? styles.referenceDocArticle : "",
  ].filter(Boolean).join(" ");

  return (
    <article className={docArticleClassName}>
      <header className={styles.docHeader}>
        <p className={styles.eyebrow}>{doc.category}</p>
        <div className={styles.docTitleRow}>
          <h1 className={styles.docTitle}>{title}</h1>
          {status ? <span className={styles.docStatus}>{status}</span> : null}
        </div>
        <p className={styles.docDescription}>{description}</p>
        {doc.source && !doc.hideSourceInHeader ? <code className={styles.codeTag}>{doc.source}</code> : null}
      </header>

      {doc.kind === "component" || doc.demo ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Examples", "範例")}</h2>
          {exampleLabel ? <p className={styles.exampleLabel}>{exampleLabel}</p> : null}
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

      {stateRows?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "States / Behavior", "狀態 / 行為")}</h2>
          <div className={styles.stateTableWrap}>
            <table className={styles.stateTable}>
              <thead>
                <tr>
                  <th>{stateRowsUseComponentDocColumns ? localized(locale, "State / Behavior", "狀態 / 行為") : localized(locale, "State", "狀態")}</th>
                  <th>{stateRowsUseComponentDocColumns ? localized(locale, "Trigger", "觸發") : localized(locale, "Applies to", "適用對象")}</th>
                  <th>{stateRowsUseComponentDocColumns ? localized(locale, "What changes", "變化") : localized(locale, "Behavior", "行為")}</th>
                  <th>{localized(locale, "Live usage", "正式站使用")}</th>
                </tr>
              </thead>
              <tbody>
                {stateRows.map((item) => (
                  <tr key={`${item.state}-${item.appliesTo}`}>
                    <th scope="row">{item.state}</th>
                    <td>{stateRowsUseComponentDocColumns ? item.trigger ?? item.appliesTo : item.appliesTo}</td>
                    <td>{stateRowsUseComponentDocColumns ? item.whatChanges ?? item.behavior : item.behavior}</td>
                    <td>{item.liveUsage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {behavior?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Behavior", "行為 / 邊界")}</h2>
          <div className={styles.behaviorTableWrap}>
            <table className={styles.behaviorTable}>
              <tbody>
                {behavior.map((item) => (
                  <tr key={item.label}>
                    <th scope="row">{item.label}</th>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {states?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "States", "狀態")}</h2>
          <div className={styles.stateList}>
            {states.map((state) => <span className={styles.statePill} key={state}>{state}</span>)}
          </div>
        </section>
      ) : null}

      {anatomyParts?.length || anatomy?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Anatomy / Internal parts", "結構 / internal parts")}</h2>
          {anatomyParts?.length ? (
            <div className={styles.anatomyTableWrap}>
              <table className={styles.anatomyTable}>
                <thead>
                  <tr>
                    <th>{localized(locale, "Part", "Part")}</th>
                    <th>{localized(locale, "What it is", "說明")}</th>
                    <th>{localized(locale, "Owned by", "Owned by")}</th>
                    <th>{localized(locale, "Code / class / component", "Code / class / component")}</th>
                  </tr>
                </thead>
                <tbody>
                  {anatomyParts.map((item) => (
                    <tr key={`${item.part}-${item.code}`}>
                      <th scope="row">{item.part}</th>
                      <td>{item.description}</td>
                      <td>{item.owner}</td>
                      <td><code>{item.code}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.anatomyGrid}>
              {anatomy?.map((item) => <article className={styles.anatomyCard} key={item}>{item}</article>)}
            </div>
          )}
        </section>
      ) : null}

      {codeGuidance ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Code guidance", "Code guidance")}</h2>
          <div className={styles.codeGuidance}>
            <div className={styles.codeMeta}>
              <span>{localized(locale, "Import path", "Import path")}</span>
              <code>{codeGuidance.importPath}</code>
            </div>
            <pre className={styles.codeBlock}><code>{codeGuidance.example}</code></pre>
            <div className={styles.propsTableWrap}>
              <table className={styles.propsTable}>
                <thead>
                  <tr>
                    <th>{localized(locale, "Prop", "Prop")}</th>
                    <th>{localized(locale, "Type", "Type")}</th>
                    {codePropsHaveUsage ? <th>{localized(locale, "Used by", "使用於")}</th> : null}
                    <th>{localized(locale, "Purpose", "用途")}</th>
                  </tr>
                </thead>
                <tbody>
                  {codeGuidance.props.map((item) => (
                    <tr key={item.name}>
                      <th scope="row"><code>{item.name}</code></th>
                      <td><code>{item.type}</code></td>
                      {codePropsHaveUsage ? <td>{item.usedBy}</td> : null}
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {codeGuidance.notes?.length ? (
              <ul className={styles.docList}>
                {codeGuidance.notes.map((item) => <li className={styles.docListItem} key={item}>{item}</li>)}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {doc.tokens?.length ? (
        <section className={styles.docSection}>
          <h2 className={styles.docSectionTitle}>{localized(locale, "Design Tokens", "設計 Token")}</h2>
          {doc.kind === "component" ? (
            <div className={styles.componentTokenTableWrap}>
              <table className={styles.componentTokenTable}>
                <thead>
                  <tr>
                    <th>{localized(locale, "Token / class", "Token / class")}</th>
                    <th>{localized(locale, "Value / role", "值 / 角色")}</th>
                    {tokenMappingsHaveUsage ? <th>{localized(locale, "Usage", "使用位置")}</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {(tokenMappings ?? doc.tokens.map((token) => ({
                    token,
                    role: localized(locale, "Used by the documented component styling contract.", "作為此元件 styling contract 的依據。"),
                  }))).map((item) => (
                    <tr key={item.token}>
                      <td><code>{item.token}</code></td>
                      <td>{item.role}</td>
                      {tokenMappingsHaveUsage ? <td>{(item as { usage?: string }).usage}</td> : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.tokenList}>
              {doc.tokens.map((token) => <code className={`${styles.codeTag} ${styles.tokenCode}`} key={token}>{token}</code>)}
            </div>
          )}
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
        {referenceCards?.length ? (
          <div className={styles.referenceCardGrid}>
            {referenceCards.map((item) => (
              <article className={styles.referenceCard} key={`${item.label}-${item.value}`}>
                <p className={styles.referenceCardLabel}>{item.label}</p>
                <p className={styles.referenceCardValue}>{item.value}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.referenceList}>
            {(doc.references ?? ["docs/design-system.md"]).map((item) => <code className={styles.codeTag} key={item}>{item}</code>)}
          </div>
        )}
      </section>
    </article>
  );
}
