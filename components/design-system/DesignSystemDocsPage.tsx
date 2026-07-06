import type { CSSProperties } from "react";
import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import { designSystemTokenRows } from "@/lib/design-system-data";
import ComponentDemo from "./ComponentDemo";
import TokenReferenceBrowser from "./TokenReferenceBrowser";
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

function iconographyGroups(locale: DesignSystemLocale) {
  return [
    {
      title: localized(locale, "Navigation icons", "導覽圖示"),
      description: localized(
        locale,
        "Chevron, arrow, and menu indicators clarify hierarchy or movement.",
        "Chevron、arrow 與 menu indicators 用來輔助層級與移動方向。",
      ),
      rows: [
        localized(locale, "LanguageSwitcher chevron uses inline SVG and stays decorative.", "LanguageSwitcher chevron 使用 inline SVG，維持裝飾性。"),
        localized(locale, "Accordion uses lucide ChevronDown; the trigger button owns expanded state.", "Accordion 使用 lucide ChevronDown；expanded state 由 trigger button 承擔。"),
        localized(locale, "CaseProposalTabs arrows use inline SVG inside labelled navigation buttons.", "CaseProposalTabs arrows 使用 inline SVG，放在有 label 的 navigation buttons 裡。"),
      ],
    },
    {
      title: localized(locale, "Action icons", "操作圖示"),
      description: localized(
        locale,
        "Action icons support close, dismiss, copy, or external movement patterns.",
        "操作圖示輔助 close、dismiss、copy 或外部移動等動作。",
      ),
      rows: [
        localized(locale, "Modal close uses lucide X inside an icon-only button with an aria-label.", "Modal close 使用 lucide X，放在具 aria-label 的 icon-only button。"),
        localized(locale, "Alert dismiss uses lucide X only when dismiss behavior is present.", "Alert dismiss 只有在存在 dismiss 行為時才使用 lucide X。"),
        localized(locale, "Contact social cards use ArrowRight as decorative movement support beside visible labels.", "Contact social cards 使用 ArrowRight 作為可見 label 旁的裝飾性移動提示。"),
      ],
    },
    {
      title: localized(locale, "Status icons", "狀態圖示"),
      description: localized(
        locale,
        "Status icons reinforce feedback but never replace text or semantic roles.",
        "狀態圖示用來強化回饋，但不取代文字或語意 role。",
      ),
      rows: [
        localized(locale, "Alert maps success, warning, error, and info tones to lucide status icons.", "Alert 將 success、warning、error、info tone 對應到 lucide status icons。"),
        localized(locale, "Toast inherits Alert status icon behavior and exposes live feedback through the toast region.", "Toast 繼承 Alert 的 status icon 行為，並透過 toast region 呈現即時回饋。"),
        localized(locale, "Contact submit success pairs lucide Check with visible success copy.", "Contact submit success 以 lucide Check 搭配可見成功文案。"),
      ],
    },
    {
      title: localized(locale, "Social / external icons", "社群 / 外部連結圖示"),
      description: localized(
        locale,
        "Social icons are image assets today; links provide the accessible names.",
        "目前社群圖示使用 image assets；連結本身提供 accessible names。",
      ),
      rows: [
        localized(locale, "Footer LinkedIn and GitHub icons use decorative images inside labelled external anchors.", "Footer LinkedIn 與 GitHub icons 使用裝飾性圖片，放在有 label 的 external anchors。"),
        localized(locale, "Contact LinkedIn and GitHub cards pair decorative image assets with visible link text.", "Contact LinkedIn 與 GitHub cards 將裝飾性 image assets 搭配可見連結文字。"),
      ],
    },
  ];
}

function iconographyMatrix(locale: DesignSystemLocale) {
  return [
    {
      context: "LanguageSwitcher",
      purpose: localized(locale, "Dropdown indicator and selected item check.", "下拉指示與目前選取項目 check。"),
      source: "components/LanguageSwitcher.tsx",
      accessibility: localized(locale, "Trigger and menu own labels; SVG / check mark are decorative.", "Trigger 與 menu 負責 label；SVG / check mark 為裝飾。"),
      styling: localized(locale, "Inline SVG follows trigger text color and open state.", "Inline SVG 跟隨 trigger 文字色與 open state。"),
    },
    {
      context: "Accordion",
      purpose: localized(locale, "Disclosure indicator for expanded / collapsed sections.", "表示 section 展開 / 收合的 disclosure indicator。"),
      source: "components/ui/Accordion.tsx",
      accessibility: localized(locale, "Button owns aria-expanded; chevron is aria-hidden.", "Button 承擔 aria-expanded；chevron 為 aria-hidden。"),
      styling: localized(locale, "lucide ChevronDown rotates through existing motion tokens.", "lucide ChevronDown 透過既有 motion tokens 旋轉。"),
    },
    {
      context: "Modal",
      purpose: localized(locale, "Close action.", "關閉動作。"),
      source: "components/ui/Modal.tsx",
      accessibility: localized(locale, "Icon-only close button uses closeLabel as aria-label.", "Icon-only close button 使用 closeLabel 作為 aria-label。"),
      styling: localized(locale, "lucide X inherits icon button color and focus treatment.", "lucide X 繼承 icon button 的顏色與 focus treatment。"),
    },
    {
      context: "Alert / Toast",
      purpose: localized(locale, "Status tone and optional dismiss action.", "狀態 tone 與 optional dismiss action。"),
      source: "components/ui/Alert.tsx / Toast.tsx",
      accessibility: localized(locale, "Status icon is hidden; role=status or role=alert carries feedback semantics.", "Status icon 隱藏；role=status 或 role=alert 承擔回饋語意。"),
      styling: localized(locale, "lucide status icons follow the alert tone classes.", "lucide status icons 跟隨 alert tone classes。"),
    },
    {
      context: "Footer social links",
      purpose: localized(locale, "LinkedIn and GitHub external links.", "LinkedIn 與 GitHub 外部連結。"),
      source: "components/Footer.tsx",
      accessibility: localized(locale, "Anchor aria-label names each social link; images use empty alt.", "Anchor aria-label 命名各社群連結；圖片使用空 alt。"),
      styling: localized(locale, "Image assets swap gray / color states through existing footer CSS.", "Image assets 透過既有 footer CSS 切換灰階 / 彩色狀態。"),
    },
    {
      context: "Contact methods",
      purpose: localized(locale, "Email, phone, social, copy, and external movement cues.", "Email、phone、social、copy 與外部移動提示。"),
      source: "components/Contact.tsx",
      accessibility: localized(locale, "Mail / phone / arrow icons are decorative; copy buttons and visible labels carry meaning.", "Mail / phone / arrow icons 為裝飾；copy buttons 與可見 label 承擔語意。"),
      styling: localized(locale, "lucide icons and social image assets inherit the contact card tone.", "lucide icons 與 social image assets 繼承 contact card tone。"),
    },
    {
      context: "CaseProposalTabs",
      purpose: localized(locale, "Previous / next arrows and adopted-option marker.", "上一張 / 下一張 arrows 與 adopted-option marker。"),
      source: "components/case-study/CaseProposalTabs.tsx",
      accessibility: localized(locale, "Arrow buttons use aria-label; inline SVGs are hidden.", "Arrow buttons 使用 aria-label；inline SVGs 為 hidden。"),
      styling: localized(locale, "Route-specific inline SVG uses currentColor inside the case-study pattern.", "Route-specific inline SVG 在 case-study pattern 內使用 currentColor。"),
    },
  ];
}

function IconographyReference({ locale }: { locale: DesignSystemLocale }) {
  return (
    <section className={styles.docSection}>
      <div className={styles.iconographyStack}>
        <div className={styles.iconographyGroupGrid}>
          {iconographyGroups(locale).map((group) => (
            <article className={styles.iconographyGroupCard} key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.rows.map((row) => <li key={row}>{row}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className={styles.referenceMatrixWrap}>
          <table className={styles.referenceMatrix}>
            <thead>
              <tr>
                <th>{localized(locale, "Context", "情境")}</th>
                <th>{localized(locale, "Icon purpose", "Icon 用途")}</th>
                <th>{localized(locale, "Source / component", "Source / component")}</th>
                <th>{localized(locale, "Accessibility", "Accessibility")}</th>
                <th>{localized(locale, "Styling note", "Styling note")}</th>
              </tr>
            </thead>
            <tbody>
              {iconographyMatrix(locale).map((row) => (
                <tr key={row.context}>
                  <th scope="row">{row.context}</th>
                  <td>{row.purpose}</td>
                  <td><code>{row.source}</code></td>
                  <td>{row.accessibility}</td>
                  <td>{row.styling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function tokenPreviewStyle(row: TokenRow) {
  const value = row.value.split(" / ")[0];
  const canUseTokenVariable = row.token.startsWith("--") && !row.token.includes(" / ");
  const cssValue = value.startsWith("#") || value.startsWith("rgb") || value.startsWith("var(")
    ? value
    : canUseTokenVariable
      ? `var(${row.token})`
      : "var(--hm-surface)";

  return {
    "--token-preview": cssValue,
    "--token-size": value,
    "--token-radius": value,
    "--token-shadow": row.value,
    "--token-duration": value,
    "--token-type-size": value,
  } as CSSProperties;
}

function tokenGroupsForColors(rows: TokenRow[], locale: DesignSystemLocale) {
  const colorRows = rows.filter((row) => row.type === "color");
  const groups = [
    {
      id: "purple",
      title: "Purple",
      description: localized(locale, "Primary action and active signal scale.", "主要 CTA 與 active 訊號色階。"),
      rows: colorRows.filter((row) => /^--hm-purple(?:-|$)/.test(row.token)),
    },
    {
      id: "neutral-surface",
      title: localized(locale, "Neutral / Surface", "中性色 / Surface"),
      description: localized(locale, "Page, surface, disabled, and subtle separator colors.", "頁面、surface、disabled 與輕分隔色。"),
      rows: colorRows.filter((row) => ["--hm-paper", "--hm-surface", "--hm-disabled", "--hm-line", "--hm-line-strong"].includes(row.token)),
    },
    {
      id: "text",
      title: "Text",
      description: localized(locale, "Primary, secondary, muted, and route-tone text aliases.", "主要、次要、muted 與 route tone 文字 aliases。"),
      rows: colorRows.filter((row) => /^--hm-(ink|muted)/.test(row.token) || row.token.startsWith("--text-")),
    },
    {
      id: "accent",
      title: "Accent",
      description: localized(locale, "Supporting accent families and chart colors.", "輔助 accent 色系與 chart colors。"),
      rows: colorRows.filter((row) => /^--hm-(blue|green|peach|brown|chart)(?:-|$)/.test(row.token)),
    },
    {
      id: "status",
      title: localized(locale, "Status / Feedback", "狀態 / 回饋"),
      description: localized(locale, "Success, warning, error, and info feedback colors.", "Success、warning、error 與 info 回饋色。"),
      rows: colorRows.filter((row) => /^--hm-(success|warning|error|info)(?:-|$)/.test(row.token)),
    },
    {
      id: "project-tone",
      title: "Project Tone",
      description: localized(locale, "Case-study tone aliases that map to project themes.", "映射到案例主題的 case-study tone aliases。"),
      rows: colorRows.filter((row) => row.token.startsWith("--cs-") || row.token.startsWith(".tone-")),
    },
  ];

  return groups.filter((group) => group.rows.length > 0);
}

function ColorSwatchCard({ row, locale }: { row: TokenRow; locale: DesignSystemLocale }) {
  return (
    <article className={styles.colorSwatchCard}>
      <span className={styles.colorSwatchPreview} style={tokenPreviewStyle(row)} />
      <div>
        <code>{row.token}</code>
        <p>{row.value}</p>
        <span>{getTokenUsage(row, locale)}</span>
      </div>
    </article>
  );
}

function FoundationVisualSamples({
  slug,
  rows,
  locale,
}: {
  slug: string;
  rows: TokenRow[];
  locale: DesignSystemLocale;
}) {
  if (slug === "colors") {
    const groups = tokenGroupsForColors(rows, locale);

    return (
      <div className={styles.colorGroupStack}>
        {groups.map((group) => (
          <section className={styles.colorGroup} key={group.id}>
            <header className={styles.colorGroupHeader}>
              <div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <span>{group.rows.length}</span>
            </header>
            <div className={styles.colorSwatchGrid}>
              {group.rows.map((row) => <ColorSwatchCard key={row.token} locale={locale} row={row} />)}
            </div>
          </section>
        ))}
      </div>
    );
  }

  if (slug === "typography") {
    return (
      <div className={styles.foundationSampleGrid}>
        {rows.map((row) => (
          <article className={styles.typeScaleCard} key={row.token}>
            <p style={tokenPreviewStyle(row)}>The quick brown fox</p>
            <code>{row.token}</code>
            <span>{row.value}</span>
            <small>{getTokenUsage(row, locale)}</small>
          </article>
        ))}
      </div>
    );
  }

  if (slug === "spacing") {
    return (
      <div className={styles.spacingScaleStack}>
        {rows.map((row) => (
          <div className={styles.spacingScaleRow} key={row.token}>
            <code>{row.token}</code>
            <span className={styles.spacingScaleTrack}>
              <span style={tokenPreviewStyle(row)} />
            </span>
            <span>{row.value}</span>
          </div>
        ))}
      </div>
    );
  }

  if (slug === "radius") {
    return (
      <div className={styles.foundationSampleGrid}>
        {rows.map((row) => (
          <article className={styles.radiusScaleCard} key={row.token}>
            <span style={tokenPreviewStyle(row)} />
            <code>{row.token}</code>
            <small>{row.value} · {getTokenUsage(row, locale)}</small>
          </article>
        ))}
      </div>
    );
  }

  if (slug === "shadows") {
    return (
      <div className={styles.foundationSampleGrid}>
        {rows.map((row) => (
          <article className={styles.shadowScaleCard} key={row.token}>
            <span style={tokenPreviewStyle(row)} />
            <code>{row.token}</code>
            <small>{getTokenUsage(row, locale)}</small>
          </article>
        ))}
      </div>
    );
  }

  if (slug === "motion") {
    return (
      <div className={styles.motionReferenceGrid}>
        {rows.map((row) => (
          <article className={styles.motionReferenceCard} key={row.token}>
            {row.token.includes("duration") ? <span className={styles.motionSample} style={tokenPreviewStyle(row)} /> : null}
            <code>{row.token}</code>
            <p>{row.value}</p>
            <small>{getTokenUsage(row, locale)}</small>
          </article>
        ))}
      </div>
    );
  }

  return null;
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
  const isTokenReference = doc.kind === "reference" && doc.slug === "tokens";
  if (doc.kind === "foundation" && doc.slug === "icons") {
    return <IconographyReference locale={locale} />;
  }

  const foundationRows = designSystemTokenRows.filter((row) => foundationTokenTypes[doc.slug]?.includes(row.type));
  const groups = isTokenReference
    ? (["color", "type", "spacing", "radius", "shadow", "motion", "layout"] as const).map((type) => ({
        id: type,
        title: type === "type" ? localized(locale, "Typography", "字體與排版") : type,
        description: localized(locale, "Current code token names, values, scope, and usage.", "目前 code 內的 token 名稱、值、scope 與用途。"),
        rows: designSystemTokenRows.filter((row) => row.type === type),
      }))
    : [{
        id: doc.slug,
        rows: foundationRows,
      }];

  if (isTokenReference) {
    return (
      <section className={styles.docSection}>
        <article className={styles.tokenReferencePanel}>
          <TokenReferenceBrowser locale={locale} rows={designSystemTokenRows} />
        </article>
      </section>
    );
  }

  return (
    <section className={styles.docSection}>
      <div className={styles.foundationStack}>
        {groups.map((group) => (
          <article className={styles.foundationPanel} key={group.id}>
            <FoundationVisualSamples locale={locale} rows={group.rows} slug={doc.slug} />
            {doc.slug === "colors" ? null : (
              <TokenTable locale={locale} rows={group.rows} variant={isTokenReference ? "reference" : "foundation"} />
            )}
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
  const demoSectionTitle = doc.demo === "local-exceptions"
    ? localized(locale, "Boundary reference", "Boundary reference")
    : localized(locale, "Examples", "範例");
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
          <h2 className={styles.docSectionTitle}>{demoSectionTitle}</h2>
          <div className={styles.demoSurface}>
            <ComponentDemo contextLabel={exampleLabel} locale={locale} type={doc.demo} />
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
