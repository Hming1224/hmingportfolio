import Image from "next/image";
import { CaseCard, CaseGrid, CaseMedia, CaseSection, FlowScrollHint } from "../../../components/case-study";
import { compAiTools, compEmsItems } from "../data";
import { localizeAdvantechTree, translateAdvantechData } from "../i18n";
import { getAdvantechTranslator } from "../i18n-server";

export default async function AnalysisSection() {
  const { locale, t } = await getAdvantechTranslator();
  const aiTools = translateAdvantechData(locale, compAiTools);
  const emsItems = translateAdvantechData(locale, compEmsItems);
  return localizeAdvantechTree(locale,
    <CaseSection
      id="cs-sec-analysis"
      kicker={t("分析洞察")}
      title={t("從 AI 工具與 EMS 競品中找出 GenAI 聊天機器人的機會。")}
    >
      <p className="cs-body-muted" style={{ marginBottom: 36 }}>
        {t("透過產業 AI 工具、能源管理系統競品與 AI 功能模組比較，我們把聊天機器人從搜尋入口重新定位成工作流程介面，協助使用者找出問題來源、診斷異常、做出節能決策。")}
      </p>

      {/* 01 */}
      <div className="cs-sub-section">
        <h3 className="cs-sub-section-heading">{t("01 / 產業 AI 工具提供的互動模式")}</h3>
        <p className="cs-sub-section-desc cs-text-muted-blue">
          {t("從 4 個產業 AI 工具中整理出可借鏡的互動模式：摘要、洞察、建議與告警。這些能力可轉化成能源管理場景中的資料理解與主動提醒。")}
        </p>
        <CaseGrid variant="four" className="cs-comp-grid">
          {aiTools.map((item) => (
            <CaseCard key={item.title} variant="accent" className="cs-comp-card">
              <CaseMedia className="cs-comp-media" contentClassName="cs-comp-card-img cs-object-box">
                <Image src={item.img} alt={item.title} fill style={{ objectFit: "cover" }} />
              </CaseMedia>
              <h4 className="cs-comp-card-title cs-copy-title">{item.title}</h4>
              <p className="cs-comp-card-desc cs-copy-body">{item.desc}</p>
              <div className="cs-comp-pill cs-inline-pill">{item.tag}</div>
            </CaseCard>
          ))}
        </CaseGrid>
      </div>

      {/* 02 */}
      <div className="cs-sub-section">
        <h3 className="cs-sub-section-heading">{t("02 / 能源管理與設備管理競品分析")}</h3>
        <p className="cs-sub-section-desc cs-text-muted-blue">
          {t("市場上的能源管理系統已開始把設備監控、能源分析、成本最佳化與 AI 洞察整合在同一個工作流程中。")}
        </p>
        <CaseGrid variant="two" className="cs-comp-ems-grid">
          {emsItems.map((item) => (
            <CaseCard key={item.name} className="cs-comp-ems-card cs-flex-cluster">
              <CaseMedia className="cs-comp-ems-media" contentClassName="cs-comp-ems-img cs-object-box">
                <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover" }} />
              </CaseMedia>
              <div className="cs-comp-ems-body cs-stack-box">
                <h4 className="cs-comp-ems-name cs-copy-title">{item.name}</h4>
                <span className="cs-comp-category-pill cs-inline-pill">{item.category}</span>
                <ul className="cs-comp-ems-list cs-marker-list">
                  {item.items.map((bullet, idx) => <li key={idx}>{bullet}</li>)}
                </ul>
              </div>
            </CaseCard>
          ))}
        </CaseGrid>
      </div>

      {/* 03 */}
      <div className="cs-sub-section">
        <h3 className="cs-sub-section-heading">{t("03 / AI 功能比較與設計機會")}</h3>
        <p className="cs-sub-section-desc cs-text-muted-blue">
          {t("比對研華已上線的功能與市場競品的區別，找出後續可以深化的機會點。")}
        </p>
        {/* Grid: 2 cols (feature matrix | opportunity). Rows share height automatically. */}
        <FlowScrollHint label={t("左右滑動查看更多")} />
        <div className="cs-fm-wrap cs-fm-grid">
          {/* ── Row 1: headers ── */}
          <div className="cs-fm-header cs-flex-cluster">
            <div className="cs-fm-module-hd cs-flex-cluster cs-copy-title">{t("管理模組")}</div>
            <div className="cs-fm-col-hd cs-flex-cell cs-copy-title">{t("現有 WISE iEMS AI 功能")}</div>
            <div className="cs-fm-col-hd cs-flex-cell cs-copy-title">{t("EMS 競品 AI 模組")}</div>
          </div>
          <div className="cs-opp-col-hd cs-flex-cluster">
            <svg width="24" height="24" viewBox="0 0 24 23.0414" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.1452 1.32973L16.5549 6.21763L21.9521 7.00126C23.9112 7.28533 24.6948 9.695 23.2745 11.0761L19.3759 14.8768L20.2967 20.2446C20.6297 22.1939 18.5825 23.6828 16.8291 22.7621L12 20.225L7.17087 22.7621C5.41749 23.6828 3.37025 22.1939 3.70329 20.2446L4.62406 14.8768L0.725495 11.0761C-0.694838 9.695 0.0887943 7.28533 2.04787 7.00126L7.44514 6.21763L9.85481 1.32973C10.7364 -0.443242 13.2636 -0.443242 14.1452 1.32973Z" fill="#2AABD8" />
            </svg>
              <span className="cs-copy-title">{t("可發展機會點")}</span>
          </div>

          {/* ── Row 2: 設備管理 ── */}
          <div className="cs-fm-row cs-flex-cluster">
            <div className="cs-fm-module cs-flex-cluster">
              <svg width="29" height="30" viewBox="0 0 28.8947 29.6544" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.60243 29.6544V24.8471H6.56997L2.48377 11.4668C1.76267 11.0662 1.16844 10.4786 0.701063 9.70413C0.233688 8.92962 0 8.1017 0 7.22036C0 5.88501 0.467376 4.74995 1.40213 3.8152C2.33688 2.88045 3.47193 2.41307 4.80729 2.41307C5.84887 2.41307 6.77695 2.71353 7.59151 3.31444C8.40608 3.91535 8.97361 4.68318 9.2941 5.61793H14.4219V4.0155C14.4219 3.56148 14.5754 3.1809 14.8826 2.87377C15.1897 2.56664 15.5703 2.41307 16.0243 2.41307C16.2647 2.41307 16.4984 2.46649 16.7254 2.57332C16.9524 2.68014 17.146 2.84039 17.3062 3.05404L20.0304 0.490156C20.2707 0.249791 20.5578 0.0962256 20.8917 0.0294568C21.2255 -0.037312 21.5527 0.00942642 21.8732 0.169669L28.1227 3.05404C28.4431 3.21429 28.6635 3.44797 28.7837 3.75511C28.9038 4.06224 28.8972 4.3627 28.7636 4.65647C28.6034 4.97696 28.3697 5.18394 28.0626 5.27742C27.7554 5.37089 27.455 5.35086 27.1612 5.21733L21.3924 2.57332L17.6267 6.09866V8.34207L21.3924 11.7873L27.1612 9.14328C27.455 9.00975 27.7621 8.99639 28.0826 9.10322C28.4031 9.21005 28.6301 9.41035 28.7636 9.70413C28.9239 10.0246 28.9372 10.3317 28.8037 10.6255C28.6702 10.9193 28.4431 11.1463 28.1227 11.3066L21.8732 14.2711C21.5527 14.4313 21.2255 14.478 20.8917 14.4113C20.5578 14.3445 20.2707 14.1909 20.0304 13.9506L17.3062 11.3867C17.146 11.5469 16.9524 11.6938 16.7254 11.8274C16.4984 11.9609 16.2647 12.0277 16.0243 12.0277C15.5703 12.0277 15.1897 11.8741 14.8826 11.567C14.5754 11.2598 14.4219 10.8792 14.4219 10.4252V8.82279H9.2941C9.21398 9.03645 9.12718 9.23675 9.0337 9.42371C8.94023 9.61066 8.81337 9.81096 8.65312 10.0246L16.6653 24.8471H22.434V29.6544H1.60243ZM4.80729 8.82279C5.26131 8.82279 5.64189 8.66923 5.94902 8.3621C6.25616 8.05496 6.40972 7.67438 6.40972 7.22036C6.40972 6.76634 6.25616 6.38577 5.94902 6.07863C5.64189 5.7715 5.26131 5.61793 4.80729 5.61793C4.35327 5.61793 3.97269 5.7715 3.66556 6.07863C3.35843 6.38577 3.20486 6.76634 3.20486 7.22036C3.20486 7.67438 3.35843 8.05496 3.66556 8.3621C3.97269 8.66923 4.35327 8.82279 4.80729 8.82279ZM9.85495 24.8471H12.9797L6.08924 12.0277H5.92899L9.85495 24.8471Z" fill="#005796" />
              </svg>
              <span className="cs-copy-title">{t("設備管理")}</span>
            </div>
            <div className="cs-fm-cell cs-flex-cell">
              <ul className="cs-marker-list">
                <li>以問答快速統整設備數據，了解設備運轉模式</li>
                <li>根據設備維修指南於設備異常時提供維修建議</li>
                <li>主動提醒維保須知，並提供設備背景資訊</li>
              </ul>
            </div>
            <div className="cs-fm-cell cs-flex-cell">
              <ul className="cs-marker-list">
                <li>優化資產設備效能：HVAC 系統主動提出降低電費方案</li>
                <li>設備用能異常分析：智慧依設備運轉樣態診斷設備維運方案</li>
              </ul>
            </div>
          </div>
          <div className="cs-opp-cell cs-stack-box">
            <ul className="cs-marker-list">
              <li>設備用能異常分析</li>
              <li>智慧依設備運轉樣態診斷設備維運方案</li>
            </ul>
          </div>

          {/* ── Row 3: 能源管理 ── */}
          <div className="cs-fm-row cs-flex-cluster">
            <div className="cs-fm-module cs-flex-cluster">
              <svg width="26" height="32" viewBox="0 0 25.6389 32.0486" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4959 25.9594L18.7885 16.0243H12.3788L13.5405 6.93051L6.1293 17.6267H11.6977L10.4959 25.9594ZM6.40972 32.0486L8.01215 20.8316H0L14.4219 0H17.6267L16.0243 12.8194H25.6389L9.61458 32.0486H6.40972Z" fill="#005796" />
              </svg>
              <span className="cs-copy-title">{t("能源管理")}</span>
            </div>
            <div className="cs-fm-cell cs-flex-cell">
              <ul className="cs-marker-list">
                <li>以問答快速統整能耗數據，了解場域能耗樣態</li>
                <li>以問答快速統整需量數據，了解需量模式</li>
                <li>主動擬定節能策略</li>
                <li>以表格或圖表彙整能耗資訊盤查結果</li>
                <li>專業關鍵詞說明、系統使用主動引導</li>
              </ul>
            </div>
            <div className="cs-fm-cell cs-flex-cell">
              <ul className="cs-marker-list">
                <li>提出深入節能洞見：監控能源預算</li>
                <li>用電資費方案選擇最佳化：判別能耗使用模式深度解析可行節能方案</li>
              </ul>
            </div>
          </div>
          <div className="cs-opp-cell cs-stack-box">
            <ul className="cs-marker-list">
              <li>用電資費方案選擇最佳化</li>
              <li>判別能耗使用模式深度解析可行節能方案</li>
            </ul>
          </div>
        </div>
      </div>
    </CaseSection>
  );
}
