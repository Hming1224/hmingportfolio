import Image from "next/image";
import { CaseMedia, CaseSection } from "../../../components/case-study";
import SemanticControlDemo from "../components/SemanticControlDemo";
import { ASSET } from "../data";
import { getDsTranslator } from "../i18n-server";

const cases = [
  {
    number: "01",
    title: "重複穩定後，才整理成共用元件",
    situation: "多個案例頁各自出現相似的 Before／After 版型，但內容與細節仍在調整。",
    initial: "先維持各頁獨立，避免因外觀相近就過早綁定結構。",
    evidence: "AI 協助比較使用位置與樣式後，確認外框、間距與響應式行為穩定重複，每頁內容則保留差異。",
    decision: "先共用固定外框，再在模式穩定後整理視覺元件；文案、圖片與敘事仍由各頁決定。",
    decisionBadge: "共用固定外框",
    validation: "比對採用元件的案例 route，並在桌機、平板與手機確認內容順序、圖片比例與溢出。",
  },
  {
    number: "02",
    title: "外觀相似，也可能不適合共用",
    situation: "反思卡、多重對比版面與影片外框看起來具有相似卡片結構。",
    initial: "曾考慮用同一個 shared component 收斂這些版型。",
    evidence: "進一步比較後，發現它們的用途、內容模型與變動方式不同；強行共用會增加 props、條件分支與例外。",
    decision: "只共用基礎 CaseCard、Grid 與 Design Token，敘事結構保留在各自 route-local implementation。",
    decisionBadge: "保留單頁設計",
    validation: "確認 route-local 樣式不外溢，並檢查保留單頁實作後是否仍沿用共用間距、色彩與 RWD 規則。",
  },
  {
    number: "03",
    title: "先分清用途，再決定元件與 API",
    situation: "全站有多個外觀看似按鈕的操作，但有些執行當前頁面行為，有些則帶使用者前往其他位置。",
    initial: "如果只看外觀，容易把 Button、Link、LinkButton 與 CTA 當成同一種元件。",
    evidence: "Button 與 Link 的語意、鍵盤行為與 accessibility 不同；CTA 則是畫面中的行動目的，不是固定元件類型。",
    decision: "先定義用途，再由既有 Button API 依是否提供 href 呈現 button 或 link；文件分別說明使用情境。",
    decisionBadge: "先定義用途",
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
        <span className="ds-case-evolution-header__badge">
          {t(item.decisionBadge)}
        </span>
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
        <p>{t(item.initial)}</p>
      </div>
      <blockquote className="ds-case-evolution-narrative__evidence">
        <span>{t("關鍵證據")}</span>
        <p>{t(item.evidence)}</p>
      </blockquote>
      <div className="ds-case-evolution-narrative__decision">
        <span>{t("最終決定")}</span>
        <p>{t(item.decision)}</p>
      </div>
      <p className="ds-case-evolution-narrative__validation">
        <span>{t("如何驗證")}</span>
        {t(item.validation)}
      </p>
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
      kicker={t("三個演化案例")}
      title={t("三個案例證明：外觀相似，不代表適合共用")}
    >
      <p className="cs-section-lead">
        {t("三個案例使用相同的判斷順序：先看情境與用途，再確認證據、做出決定，最後用實際 route、viewport 與互動驗證結果。")}
      </p>

      <div className="ds-case-evolution-cases">
        <article className="ds-case-evolution-case ds-case-evolution-case--media">
          <CaseHeader item={cases[0]} t={t} />
          <div className="ds-case-evolution-case__media-layout">
            <CaseNarrative item={cases[0]} t={t} />
            <CaseMedia
              className="ds-case-evolution-media"
              caption={t(
                "Before／After 版型從各頁獨立製作，逐步整理成固定外框與可替換內容的共用模式。",
              )}
            >
              <Image
                src={`${ASSET}/solution/before-after-evolution.webp`}
                alt={t(
                  "Before／After 版型從三個單頁實作逐步整理成共用外框與視覺元件。",
                )}
                width={1600}
                height={900}
                sizes="(max-width: 768px) calc(100vw - 80px), calc(100vw - 160px)"
              />
            </CaseMedia>
          </div>
        </article>

        <article className="ds-case-evolution-case ds-case-evolution-case--matrix">
          <CaseHeader item={cases[1]} t={t} />
          <CaseNarrative item={cases[1]} t={t} />
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
        </article>

        <article className="ds-case-evolution-case ds-case-evolution-case--semantic">
          <CaseHeader item={cases[2]} t={t} />
          <CaseNarrative item={cases[2]} t={t} />
          <div className="ds-case-evolution-case__semantic-layout">
            <div className="ds-case-table-frame ds-case-semantic-table-frame">
              <table className="ds-case-table ds-case-semantic-table">
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
        </article>
      </div>
    </CaseSection>
  );
}
