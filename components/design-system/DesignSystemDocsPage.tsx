import Image from "next/image";
import { AlertCircle, ArrowRight, Check, CheckCircle2, ChevronDown, Mail, Phone, X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { DesignSystemDoc, DesignSystemLocale } from "@/lib/design-system-docs";
import { designSystemTokenRows } from "@/lib/design-system-data";
import ComponentDemo from "./ComponentDemo";
import TokenReferenceBrowser from "./TokenReferenceBrowser";
import styles from "./DesignSystemExplorer.module.css";

function localized(locale: DesignSystemLocale, english: string, chinese: string) {
  return locale === "en" ? english : chinese;
}

type TokenRow = (typeof designSystemTokenRows)[number];
type IconographyGalleryGroup = {
  title: string;
  description: string;
  items: Array<{
    name: string;
    usage: string;
    source: string;
    accessibility: string;
    preview: ReactNode;
    tone?: "success" | "error" | "social";
  }>;
};

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

function InlineProposalArrowPreview() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M7.125 4.5L11.625 9L7.125 13.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function iconographyGallery(locale: DesignSystemLocale): IconographyGalleryGroup[] {
  return [
    {
      title: localized(locale, "Navigation", "導覽"),
      description: localized(locale, "Show hierarchy, open state, and direction.", "指出層級、展開狀態和移動方向。"),
      items: [
        {
          name: "ChevronDown",
          usage: localized(locale, "Accordion / dropdown indicator", "Accordion / dropdown 展開指示"),
          source: localized(locale, "lucide-react; LanguageSwitcher uses inline SVG variant", "lucide-react；LanguageSwitcher 使用 inline SVG variant"),
          accessibility: localized(locale, "Decorative; trigger owns expanded state or label", "裝飾性；trigger 承擔展開狀態或 label"),
          preview: <ChevronDown aria-hidden="true" size={28} strokeWidth={2} />,
        },
        {
          name: "Arrow",
          usage: "CaseProposalTabs",
          source: "inline SVG",
          accessibility: localized(locale, "Hidden inside labelled nav buttons", "放在具 label 的 nav buttons 內並隱藏"),
          preview: <InlineProposalArrowPreview />,
        },
      ],
    },
    {
      title: localized(locale, "Actions", "操作"),
      description: localized(locale, "Support close, contact, and follow-through actions.", "輔助關閉、聯絡這類操作。"),
      items: [
        {
          name: "X",
          usage: localized(locale, "Modal close / Alert dismiss", "Modal 關閉 / Alert 關閉"),
          source: "lucide-react",
          accessibility: localized(locale, "Icon-only close button uses aria-label", "Icon-only close button 使用 aria-label"),
          preview: <X aria-hidden="true" size={28} strokeWidth={1.8} />,
        },
        {
          name: "Mail",
          usage: localized(locale, "Contact email method", "Contact email 聯絡方式"),
          source: "lucide-react",
          accessibility: localized(locale, "Decorative beside visible email label", "在可見 email label 旁作為裝飾"),
          preview: <Mail aria-hidden="true" size={26} strokeWidth={1.6} />,
        },
        {
          name: "Phone",
          usage: localized(locale, "Contact phone method", "Contact phone 聯絡方式"),
          source: "lucide-react",
          accessibility: localized(locale, "Decorative beside visible phone label", "在可見 phone label 旁作為裝飾"),
          preview: <Phone aria-hidden="true" size={26} strokeWidth={1.6} />,
        },
        {
          name: "ArrowRight",
          usage: localized(locale, "Contact social card link", "Contact 社群卡片連結"),
          source: "lucide-react",
          accessibility: localized(locale, "Decorative beside visible link text", "在可見連結文字旁作為裝飾"),
          preview: <ArrowRight aria-hidden="true" size={28} strokeWidth={1.7} />,
        },
      ],
    },
    {
      title: localized(locale, "Status", "狀態"),
      description: localized(locale, "Reinforce feedback tone; the message itself stays in text.", "狀態 icon 只是輔助，訊息本身還是用文字講清楚。"),
      items: [
        {
          name: "CheckCircle2",
          usage: localized(locale, "Alert / Toast success", "Alert / Toast 成功"),
          source: "lucide-react",
          accessibility: localized(locale, "Status support; text and role carry meaning", "輔助狀態；文字與 role 承擔語意"),
          preview: <CheckCircle2 aria-hidden="true" size={28} strokeWidth={1.7} />,
          tone: "success",
        },
        {
          name: "AlertCircle",
          usage: localized(locale, "Alert / Toast error", "Alert / Toast 錯誤"),
          source: "lucide-react",
          accessibility: localized(locale, "Status support; not color-only", "輔助狀態；不只靠顏色"),
          preview: <AlertCircle aria-hidden="true" size={28} strokeWidth={1.7} />,
          tone: "error",
        },
        {
          name: "Check",
          usage: localized(locale, "Contact submit success", "Contact 送出成功"),
          source: "lucide-react",
          accessibility: localized(locale, "Paired with visible success copy", "搭配可見成功文案"),
          preview: <Check aria-hidden="true" size={28} strokeWidth={2} />,
          tone: "success",
        },
      ],
    },
    {
      title: localized(locale, "Social / external", "社群 / 外部連結"),
      description: localized(locale, "Social links currently use image assets.", "社群連結目前用圖片素材呈現。"),
      items: [
        {
          name: "LinkedIn",
          usage: localized(locale, "Footer / Contact social links", "Footer / Contact 社群連結"),
          source: "image asset",
          accessibility: localized(locale, "Anchor owns accessible name", "Anchor 承擔 accessible name"),
          preview: <Image alt="" aria-hidden="true" height={32} src="/social/linkedin-gray-v2.png" width={32} />,
          tone: "social",
        },
        {
          name: "GitHub",
          usage: localized(locale, "Footer / Contact social links", "Footer / Contact 社群連結"),
          source: "image asset",
          accessibility: localized(locale, "Image uses empty alt inside labelled link", "圖片在具 label 的連結內使用空 alt"),
          preview: <Image alt="" aria-hidden="true" height={32} src="/social/github-gray-v2.png" width={32} />,
          tone: "social",
        },
      ],
    },
  ];
}

function iconographyMatrix(locale: DesignSystemLocale) {
  return [
    {
      context: "Disclosure / dropdown indicators",
      purpose: localized(
        locale,
        "Accordion uses ChevronDown; LanguageSwitcher uses a scoped inline SVG variant for the same dropdown affordance.",
        "Accordion 使用 ChevronDown；LanguageSwitcher 使用 scoped inline SVG variant 呈現同一種 dropdown affordance。",
      ),
      accessibility: localized(locale, "The trigger owns aria-expanded or label; the chevron shape is decorative.", "展開狀態或 label 由 trigger 承擔；chevron shape 是裝飾性。"),
    },
    {
      context: "Modal",
      purpose: localized(locale, "Close action.", "關閉視窗。"),
      accessibility: localized(locale, "The icon-only close button gets its name from an aria-label.", "關閉按鈕只有 icon，名稱靠 aria-label 提供。"),
    },
    {
      context: "Alert / Toast",
      purpose: localized(locale, "Reinforces the success / error tone next to the message.", "在訊息旁邊強化成功 / 錯誤的語氣。"),
      accessibility: localized(locale, "The status icon is hidden; the text and role=status / role=alert carry the meaning.", "狀態 icon 是隱藏的，語意由文字和 role=status / role=alert 承擔。"),
    },
    {
      context: "Footer social links",
      purpose: localized(locale, "LinkedIn and GitHub external links.", "LinkedIn 和 GitHub 外部連結。"),
      accessibility: localized(locale, "Each link is named by an aria-label on the anchor; the image uses an empty alt.", "每個連結的名稱由 anchor 的 aria-label 提供；圖片用空 alt。"),
    },
    {
      context: "Contact email method",
      purpose: localized(locale, "Mail icon marks the email contact method.", "Mail icon 標示 email 聯絡方式。"),
      accessibility: localized(locale, "The icon is decorative; visible email label and copy button carry meaning.", "icon 是裝飾性；可見 email label 與複製按鈕承擔語意。"),
    },
    {
      context: "Contact phone method",
      purpose: localized(locale, "Phone icon marks the phone contact method.", "Phone icon 標示 phone 聯絡方式。"),
      accessibility: localized(locale, "The icon is decorative; visible phone label and copy button carry meaning.", "icon 是裝飾性；可見 phone label 與複製按鈕承擔語意。"),
    },
    {
      context: "CaseProposalTabs",
      purpose: localized(locale, "Previous / next arrows and the adopted-option marker.", "上一張 / 下一張箭頭，以及採用方案的標記。"),
      accessibility: localized(locale, "Arrow buttons use aria-label; the inline SVGs are hidden.", "箭頭按鈕有 aria-label；inline SVG 本身是隱藏的。"),
    },
  ];
}

function iconToneClass(tone?: IconographyGalleryGroup["items"][number]["tone"]) {
  if (tone === "success") return styles.iconToneSuccess;
  if (tone === "error") return styles.iconToneError;
  if (tone === "social") return styles.iconToneSocial;
  return "";
}

function IconographyReference({ locale }: { locale: DesignSystemLocale }) {
  return (
    <section className={styles.docSection}>
      <div className={styles.iconographyStack}>
        <div className={styles.iconGallery}>
          {iconographyGallery(locale).map((group) => (
            <section className={styles.iconGroup} key={group.title}>
              <header className={styles.iconGroupHeader}>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <span>{group.items.length}</span>
              </header>
              <div className={styles.iconGrid}>
                {group.items.map((item) => (
                  <article className={styles.iconCard} key={`${group.title}-${item.name}-${item.usage}`}>
                    <span className={`${styles.iconPreview} ${iconToneClass(item.tone)}`}>
                      {item.preview}
                    </span>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.usage}</p>
                      <div className={styles.iconMeta}>
                        <span>{item.source}</span>
                        <span>{item.accessibility}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className={styles.referenceMatrixWrap}>
          <table className={styles.referenceMatrix}>
            <thead>
              <tr>
                <th>{localized(locale, "Context", "情境")}</th>
                <th>{localized(locale, "Icon purpose", "Icon 用途")}</th>
                <th>{localized(locale, "Accessibility", "無障礙做法")}</th>
              </tr>
            </thead>
            <tbody>
              {iconographyMatrix(locale).map((row) => (
                <tr key={row.context}>
                  <th scope="row">{row.context}</th>
                  <td>{row.purpose}</td>
                  <td>{row.accessibility}</td>
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
          <h2 className={styles.docSectionTitle}>{localized(locale, "Anatomy / Internal parts", "結構 / 內部組成")}</h2>
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
          <h2 className={styles.docSectionTitle}>{localized(locale, "Accessibility", "無障礙")}</h2>
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
