import {
  BeforeAfterNarrativeFrame,
  CaseCard,
  CaseGrid,
  CaseSection,
} from "../../../components/case-study";
import SemanticControlDemo from "../components/SemanticControlDemo";
import TermNotes from "../components/TermNotes";
import { getDsTranslator } from "../i18n-server";

const cases = [
  {
    number: "01",
    title: "重複穩定後，才整理成共用元件",
    situation: "多個案例頁各自出現相似的 Before／After 版型，但內容與細節仍在調整。",
    initial: "先維持各頁獨立，避免因外觀相近就過早綁定結構。",
    evidence: "AI 協助比較使用位置與樣式後，確認外框、間距與響應式行為穩定重複，每頁內容則保留差異。",
    decision: "先共用固定外框，再在模式穩定後整理視覺元件；文案、圖片與敘事仍由各頁決定。",
    spine: ["該共用", "但要等它先穩定"],
    validation: "比對採用元件的案例 route，並在桌機、平板與手機確認內容順序、圖片比例與溢出。",
  },
  {
    number: "02",
    title: "外觀相似，也可能不適合共用",
    situation: "反思卡、多重對比版面與影片外框看起來具有相似卡片結構。",
    initial: "曾考慮用同一個 shared component 收斂這些版型。",
    evidence: "進一步比較後，發現它們的用途、內容模型與變動方式不同；強行共用會增加 props、條件分支與例外。",
    decision: "只共用基礎 CaseCard、Grid 與 Design Token，敘事結構保留在各自 route-local implementation。",
    spine: ["不共用", "即使它們很像"],
    validation: "確認 route-local 樣式不外溢，並檢查保留單頁實作後是否仍沿用共用間距、色彩與 RWD 規則。",
  },
  {
    number: "03",
    title: "先分清用途，再決定元件與 API",
    situation: "全站有多個外觀看似按鈕的操作，但有些執行當前頁面行為，有些則帶使用者前往其他位置。",
    initial: null,
    evidence: null,
    decision: "先定義用途，再由既有 Button API 依是否提供 href 呈現 button 或 link；文件分別說明使用情境。",
    spine: ["先別問共不共用", "先問這到底是什麼"],
    validation: "檢查實際 HTML 語意、連結目的地、鍵盤 focus 與 hover 狀態，再確認視覺層級符合 CTA 目的。",
  },
];

type EvolutionCase = (typeof cases)[number];

function CaseHeader({
  item,
  t,
}: {
  item: EvolutionCase;
  t: (text: string) => string;
}) {
  return (
    <header className="ds-case-evolution-header">
      <span className="ds-case-evolution-header__number" aria-hidden="true">
        {item.number}
      </span>
      <div className="ds-case-evolution-header__copy">
        <h3>{t(item.title)}</h3>
        <div className="ds-case-evolution-header__meta">
          <p className="ds-case-evolution-header__spine">
            {t(item.spine[0])}<span> —— {t(item.spine[1])}</span>
          </p>
        </div>
      </div>
    </header>
  );
}

function CaseNarrative({
  item,
  t,
}: {
  item: EvolutionCase;
  t: (text: string) => string;
}) {
  return (
    <div className="ds-case-evolution-narrative">
      <div className="ds-case-evolution-narrative__opening">
        <p>{t(item.situation)}</p>
        {item.initial ? <p>{t(item.initial)}</p> : null}
      </div>
      {item.evidence ? (
        <blockquote className="ds-case-evolution-narrative__evidence">
          <p>{t(item.evidence)}</p>
        </blockquote>
      ) : null}
      <div className="ds-case-evolution-narrative__decision">
        <span>{t("最終決定")}</span>
        <p>{t(item.decision)}</p>
      </div>
      <p className="ds-case-evolution-narrative__validation">
        <span>{t("怎麼確認：")}</span>
        {t(item.validation)}
      </p>
    </div>
  );
}

function LiveBeforeAfterExample({ t }: { t: (text: string) => string }) {
  return (
    <div className="ds-case-evolution-example-surface">
      <span className="ds-case-evolution-context-label">
        {t("真實元件：BeforeAfterNarrativeFrame")}
      </span>
      <BeforeAfterNarrativeFrame
        className="ds-case-evolution-before-after-live"
        badge={t("共用外框")}
        title={t("Before／After 內容由各頁傳入")}
        beforeLabel="Before"
        afterLabel="After"
        before={<p>{t("各頁的 Before 內容")}</p>}
        after={<p>{t("各頁的 After 內容")}</p>}
      />
    </div>
  );
}

function LiveBoundaryComparison({ t }: { t: (text: string) => string }) {
  return (
    <div className="ds-case-evolution-example-surface">
      <CaseGrid className="ds-case-evolution-component-comparison" variant="two">
        <div className="ds-case-evolution-example-column">
          <span className="ds-case-evolution-context-label">{t("共用基礎")}</span>
          <CaseCard className="ds-case-evolution-shared-example">
            <h4>{t("CaseCard／Grid")}</h4>
            <p>{t("共用外框、間距與兩欄排列。")}</p>
          </CaseCard>
        </div>
        <div className="ds-case-evolution-example-column">
          <span className="ds-case-evolution-context-label">
            {t("真實元件：route-local 反思卡")}
          </span>
          <ol className="ds-case-reflection-list ds-case-evolution-reflection-example">
            <li>
              <span className="ds-case-reflection-index" aria-hidden="true">01</span>
              <div>
                <h3>{t("保留案例敘事")}</h3>
                <p>{t("標號、背景與內容順序留在這一頁。")}</p>
              </div>
            </li>
          </ol>
        </div>
      </CaseGrid>
    </div>
  );
}

const decisionMatrix = [
  ["反思卡", "外觀相似", "背景、標號與排列承擔不同敘事", "保留單頁設計"],
  ["多重對比版面", "都有 Before／After", "同區呈現多組比較，內容模型不同", "保留單頁設計"],
  ["尚未有穩定情境的版型", "未來可能重複", "缺少第二個真實使用案例", "暫緩建立"],
];

const semanticRows = [
  ["Button", "執行目前頁面的操作", "送出、複製、開啟 lightbox"],
  ["Link", "前往另一個頁面或位置", "案例頁、首頁、外部網站"],
  ["LinkButton", "語意是 Link，外觀像 Button", "View case study、Next project"],
  ["CTA", "畫面希望使用者採取的行動", "可由 Button 或 Link 承擔"],
];

export default async function EvolutionCasesSection() {
  const { t } = await getDsTranslator();

  return (
    <CaseSection
      id="cs-sec-evolution"
      title={t("三個案例說明：外觀相似，不代表適合共用")}
    >
      <div className="ds-case-evolution-cases">
        <article className="ds-case-evolution-case ds-case-evolution-case--media">
          <CaseHeader item={cases[0]} t={t} />
          <div className="ds-case-evolution-case__media-layout">
            <CaseNarrative item={cases[0]} t={t} />
            <LiveBeforeAfterExample t={t} />
          </div>
        </article>

        <article className="ds-case-evolution-case ds-case-evolution-case--matrix">
          <CaseHeader item={cases[1]} t={t} />
          <CaseNarrative item={cases[1]} t={t} />
          <div className="ds-case-evolution-matrix-block">
            <div
              className="ds-case-matrix"
              role="region"
              aria-label={t("外觀相似但不共用的判斷矩陣")}
            >
              <div className="ds-case-matrix__row ds-case-matrix__row--head">
                <span>{t("候選版型")}</span>
                <span>{t("看似相同")}</span>
                <span>{t("實際差異")}</span>
                <span>{t("最後處理")}</span>
              </div>
              {decisionMatrix.map((row) => (
                <div className="ds-case-matrix__row" key={row[0]}>
                  {row.map((cell, cellIndex) => (
                    <span
                      data-label={t(
                        ["候選版型", "看似相同", "實際差異", "最後處理"][cellIndex],
                      )}
                      key={cell}
                    >
                      {t(cell)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <LiveBoundaryComparison t={t} />
        </article>

        <article className="ds-case-evolution-case ds-case-evolution-case--semantic">
          <CaseHeader item={cases[2]} t={t} />
          <CaseNarrative item={cases[2]} t={t} />
          <div className="ds-case-evolution-case__semantic-layout">
            <div className="ds-case-evolution-example-surface ds-case-evolution-semantic-example">
              <span className="ds-case-evolution-context-label">
                {t("真實元件：Button、Link 與 LinkButton")}
              </span>
              <div className="cs-data-table-frame ds-case-semantic-table-frame">
                <table className="cs-data-table cs-data-table--matrix ds-case-semantic-table">
                  <thead>
                    <tr>
                      <th>{t("概念")}</th>
                      <th>{t("主要用途")}</th>
                      <th>{t("實際例子")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semanticRows.map(([name, purpose, example]) => (
                      <tr key={name}>
                        <th scope="row">{t(name)}</th>
                        <td>{t(purpose)}</td>
                        <td>{t(example)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <SemanticControlDemo
                buttonActionLabel={t("複製聯絡方式")}
                buttonLabel={t("Button：執行操作")}
                copiedLabel={t("已複製")}
                groupLabel={t("Button、Link 與 LinkButton 實際範例")}
                linkButtonLabel={t("LinkButton：連結語意、按鈕外觀")}
                linkButtonTargetLabel={t("查看最終成果")}
                linkLabel={t("Link：前往位置")}
                linkTargetLabel={t("查看判斷框架")}
              />
            </div>
          </div>
        </article>
      </div>

      <TermNotes
        title={t("名詞說明")}
        ariaLabel={t("這一段的名詞說明")}
        items={[
          { term: "LinkButton / href", description: t("LinkButton 是外觀像按鈕的連結；href 是它帶使用者前往的目的地址。") },
          { term: "CTA / screen reader", description: t("CTA 是畫面希望使用者採取的行動；screen reader 會依 HTML 語意向視障使用者報讀元件角色。") },
        ]}
      />
    </CaseSection>
  );
}
