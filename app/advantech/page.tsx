import type { Metadata } from "next";
import Image from "next/image";
import ProposalTabs from "./ProposalTabs";
import FeatureConnectors from "./FeatureConnectors";
import FlowConnectors from "./FlowConnectors";
import AlarmLevelDemo from "./AlarmLevelDemo";
import VimeoPlayer from "./VimeoPlayer";
import {
  CaseStudyShell,
  CaseSection,
  CaseHeading,
  type TocSection,
} from "../../components/case-study";

export const metadata: Metadata = {
  title: "生成式AI能源管理系統 — Brian Huang",
  description:
    "以生成式 AI 聊天機器人驅動智慧能源與空調維運系統介面設計。研華科技 WISE-iEMS 專案案例研究。",
};

// 「由我負責」標記：卡片 header 右上角的小頭像（對應 Figma 圖例）
function OwnerMark() {
  return (
    <span className="cs-ds-owner">
      <Image src="/avatar/avatar-yellow.png" alt="由我負責" width={22} height={22} />
    </span>
  );
}

const roleCards = [
  {
    num: "01",
    title: "確立目標與設計範圍",
    desc: "與 PM 確立專案目標，協助釐清設計範圍與核心重點，確保 AI Chatbot 設計聚焦於設施管理的實際工作流程。",
  },
  {
    num: "03",
    title: "使用者訪談與團隊工作坊",
    desc: "整理使用者訪談內容，參與團隊工作坊，確保收集的需求與痛點能夠完整對應到專案目標。",
  },
  {
    num: "02",
    title: "競品分析與設計機會點",
    desc: "研究競品功能、設計訪談大綱，協同找出能源管理與設備維護的主要痛點，轉化為設計機會點。",
  },
  {
    num: "04",
    title: "功能設計與原型製作",
    desc: "負責超約預警與模式識別兩項功能的設計，包含線框稿、互動流程與原型，並製作影片分鏡協助利害關係人對齊。",
  },
];

const processSteps = [
  { num: "01", title: "專案啟動與框架設定", desc: "建立專案目標、範疇與時程規劃，確認 AI Chatbot 的核心設計重點。" },
  { num: "02", title: "競品分析", desc: "研究現有 AI 競品功能，識別市場趨勢、差異與設計機會點。" },
  { num: "03", title: "使用者訪談與洞察整理", desc: "與目標用戶訪談，挖掘關鍵需求、行為模式與痛點，轉化為設計依據。" },
  { num: "04", title: "線框稿與介面設計", desc: "設計 AI Chatbot 介面線框，定義資訊架構與核心互動流程。" },
  { num: "05", title: "原型製作與互動流程", desc: "製作互動原型，與工程師協作確保設計符合 GenAI 技術可行性。" },
  { num: "06", title: "互動介面影片", desc: "製作影片展示最終設計體驗，向利害關係人溝通並作為開發對齊依據。" },
];

const tocSections: TocSection[] = [
  { id: 'cs-sec-overview',    title: '專案背景' },
  { id: 'cs-sec-background',  title: '產品背景' },
  { id: 'cs-sec-role',        title: '我的角色' },
  { id: 'cs-sec-process',     title: '設計流程' },
  { id: 'cs-sec-analysis',    title: '競品分析' },
  { id: 'cs-sec-interview',   title: '使用者訪談' },
  { id: 'cs-sec-scenario',    title: '設計情境' },
  { id: 'cs-sec-solution',    title: '設計成果' },
  { id: 'cs-sec-next',        title: '下一步' },
  { id: 'cs-sec-result',      title: '學習反思' },
];

export default function AdventechPage() {
  const hero = (
    <section>
        <div className="cs-hero-cover">
          <div className="cs-hero-cover-img">
            <Image
              src="/projects/advantech-figma/hero-cover.png"
              alt="WISE-iEMS ECOWatch UI"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="cs-hero-info">
          <div className="cs-hero-meta">
            <span className="cs-badge">Early Design Project</span>
            <span className="cs-tags">WEB・B2B・AI Chatbot・UX Design・UI Design</span>
          </div>
          <h1 className="cs-title">
            以生成式 AI 聊天機器人驅動智慧能源與空調維運系統介面設計
          </h1>
          <div className="cs-info-row">
            <div className="cs-info-card">
              <span className="cs-info-label">時間進程</span>
              <span className="cs-info-value">2024.06 – 2024.08</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">我的角色</span>
              <span className="cs-info-value">UIUX 設計師</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">團隊成員</span>
              <span className="cs-info-value">2 位設計師、2 位後端工程師、1 位 PM</span>
            </div>
            <div className="cs-info-card">
              <span className="cs-info-label">負責項目</span>
              <div className="cs-info-tasks">
                <span>競品分析</span>
                <span>終端使用者訪談</span>
                <span>線匡稿</span>
                <span>原型設計</span>
                <span>提案與功能迭代</span>
                <span>產品行銷影片</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  );

  return (
    <CaseStudyShell
      theme="theme-advantech"
      tocSections={tocSections}
      nextNav={{ nextHref: "#", nextLabel: "下一個專案：虛擬貨幣量化交易平台" }}
      hero={hero}
    >

      {/* ── 02 Overview ── */}
      <CaseSection id="cs-sec-overview" title="專案背景">
        <div className="cs-overview-body">
          <p className="cs-body">
            這個專案聚焦於透過 UX/UI 設計優化 ECOWatch 與 HVAC 的 AI Chatbot 體驗，以改善使用者操作流程並提升整體可用性。
          </p>
          <p className="cs-body-muted">
            透過競品研究與終端使用者訪談，我們挖掘出關鍵的市場需求與使用者痛點，進一步作為聊天機器人介面設計方向的依據。設計過程中並非只是單純加入 AI 功能，而是更著重於思考生成式 AI 如何更有效地支援實際的設施管理任務。透過與後端工程師密切合作，我們將這些洞察轉化為更流暢、高效且友善的互動體驗。
          </p>
        </div>
        <div className="cs-overview-img">
          <Image
            src="/projects/advantech-figma/overview-bg.png"
            alt="WISE-iEMS 系統介面與 AI Chatbot 概覽"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
      </CaseSection>

      {/* ── 02.5 Product Background ── */}
      <CaseSection id="cs-sec-background" surface title="認識 ECOWatch 與 HVAC 模組">
        <p className="cs-body-muted" style={{ marginBottom: 32 }}>
          本專案的設計對象為研華科技 WISE-IoT 平台下的兩大能源管理模組。ECOWatch 負責建築能源用量的即時可視化監控；WISE iEMS HVAC 模組則整合 AI 演算法主動優化空調系統能效。兩者共同構成智慧設施管理的核心解決方案，也是本次 AI Chatbot 設計用於整合各項功能的系統。
        </p>
        <div className="cs-product-grid">
          <div className="cs-product-card">
            <div className="cs-product-card-header">
              <div className="cs-product-logo">
                <Image src="/projects/advantech-figma/ecowatch-icon.png" alt="ECOWatch" fill style={{ objectFit: "cover" }} unoptimized />
              </div>
              <h3 className="cs-product-card-name">ECOWatch</h3>
            </div>
            <div className="cs-product-card-divider" />
            <p className="cs-product-card-body">
              監控建築內水、電、氣、熱等公共資源的即時用量，整合子計量、能耗分析、即時告警與自動報表功能，協助設施管理者全面掌握能源消耗狀況。平均可達 3–10% 的節能成效，節省 80% 的人工巡查時間。
            </p>
            <div className="cs-product-tags">
              {["能耗監控", "即時告警", "子計量", "自動報表"].map((t) => (
                <span key={t} className="cs-product-tag">{t}</span>
              ))}
            </div>
            <div className="cs-product-screen">
              <Image
                src="/projects/advantech-figma/ecowatch-screen.png"
                alt="ECOWatch 系統截圖"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                unoptimized
              />
            </div>
          </div>

          <div className="cs-product-card">
            <div className="cs-product-card-header">
              <div className="cs-product-logo">
                <Image src="/projects/advantech-figma/hvac-icon.png" alt="HVAC" fill style={{ objectFit: "cover" }} unoptimized />
              </div>
              <h3 className="cs-product-card-name">HVAC</h3>
            </div>
            <div className="cs-product-card-divider" />
            <p className="cs-product-card-body">
              整合 AI 演算法、IoT 感測與數位孿生技術，對 HVAC（暖通空調）設備進行即時效能監控與異常偵測，透過多維度分析主動化設備運行策略，達到節能降本的目標。
            </p>
            <div className="cs-product-tags">
              {["AI 優化", "異常偵測", "能效診斷", "策略優化"].map((t) => (
                <span key={t} className="cs-product-tag">{t}</span>
              ))}
            </div>
            <div className="cs-product-screen">
              <Image
                src="/projects/advantech-figma/hvac-screen.png"
                alt="HVAC 系統截圖"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                unoptimized
              />
            </div>
          </div>
        </div>
      </CaseSection>

      {/* ── 02.6 My Role ── */}
      <CaseSection id="cs-sec-role" title="我在這個專案做了什麼...">
        <div className="cs-role-radial">
          <svg
            className="cs-role-connectors"
            viewBox="0 0 1440 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="450" y1="161" x2="611" y2="235" />
            <line x1="829" y1="235" x2="990" y2="161" />
            <line x1="450" y1="410" x2="611" y2="336" />
            <line x1="829" y1="336" x2="990" y2="410" />
          </svg>
          <div className="cs-role-center">
            <Image
              src="/projects/advantech-figma/role-center.png"
              alt="專案工作證與工作現場照片"
              fill
              sizes="240px"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
          {roleCards.map((item, index) => (
            <div key={item.num} className={`cs-role-card cs-role-card-${index + 1}`}>
              <span className="cs-role-num">{item.num}</span>
              <h3 className="cs-role-title">{item.title}</h3>
              <p className="cs-role-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* ── 04 Process ── */}
      <section id="cs-sec-process" className="cs-process-bg">
        <div className="cs-process-bg-img">
          <Image
            src="/projects/advantech-figma/process-bg.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
        </div>
        <div className="cs-process-overlay" />
        <div className="cs-process-content">
          <CaseHeading title="設計流程" tone="white" style={{ marginBottom: 8 }} />
          <div className="cs-timeline-alt">
            {/* Row 1: cards above axis (01, 03, 05) */}
            <div className="cs-tl-tops">
              {processSteps.map((step, i) => (
                <div key={`top-${step.num}`} className="cs-tl-top">
                  {i % 2 === 0 && (
                    <>
                      <div className="cs-tl-card">
                        <span className="cs-tl-num">{step.num}</span>
                        <h3 className="cs-tl-title">{step.title}</h3>
                        <p className="cs-tl-desc">{step.desc}</p>
                      </div>
                      <div className="cs-tl-vconn" />
                    </>
                  )}
                </div>
              ))}
            </div>
            {/* Row 2: axis line + dots */}
            <div className="cs-tl-dots-row">
              <div className="cs-tl-axis" />
              {processSteps.map((step) => (
                <div key={`dot-${step.num}`} className="cs-tl-dot-cell">
                  <div className="cs-tl-dot" />
                </div>
              ))}
            </div>
            {/* Row 3: cards below axis (02, 04, 06) */}
            <div className="cs-tl-bottoms">
              {processSteps.map((step, i) => (
                <div key={`bot-${step.num}`} className="cs-tl-bottom">
                  {i % 2 !== 0 && (
                    <>
                      <div className="cs-tl-vconn" />
                      <div className="cs-tl-card">
                        <span className="cs-tl-num">{step.num}</span>
                        <h3 className="cs-tl-title">{step.title}</h3>
                        <p className="cs-tl-desc">{step.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 Competitive Analysis ── */}
      <CaseSection id="cs-sec-analysis" title="從競品功能比較，定義 GenAI Chatbot 的設計機會">
        <p className="cs-body-muted" style={{ marginBottom: 36 }}>
          透過產業 AI 工具、能源管理系統競品與 AI 功能模組比較，釐清聊天機器人不只是搜尋入口，而是能協助使用者完成問題來源、異常診斷與節能決策的工作流程介面。
        </p>

        {/* 01 */}
        <div className="cs-sub-section">
          <h3 className="cs-sub-section-heading">01 / 產業 AI 工具提供的互動模式</h3>
          <p className="cs-sub-section-desc cs-text-muted-blue">
            從 4 個產業 AI 工具中整理出可借鏡的互動模式：摘要、洞察、建議與告警。這些能力可轉化成能源管理場景中的資料理解與主動提醒。
          </p>
          <div className="cs-comp-grid">
            {[
              { title: "Tableau Pulse", tag: "圖表旁呈現洞見", desc: "無需撰寫程式即可建立預測性機器學習模型，減少對數據科學團隊的依賴。", img: "/projects/advantech-figma/comp-ai-tableau.png" },
              { title: "Power BI Copilot", tag: "對話框提供圖表數據摘要", desc: "自動摘要報表、特定頁面或視覺效果，協助使用者快速掌握關鍵資訊。", img: "/projects/advantech-figma/comp-ai-powerbi.png" },
              { title: "Salesforce Einstein GPT", tag: "圖表旁提供建議執行計畫方針", desc: "根據使用者數據與業務需求提出個人化建議，支援後續行動追蹤。", img: "/projects/advantech-figma/comp-ai-salesforce.png" },
              { title: "PagerDuty AIOps", tag: "自動化告警通知視窗", desc: "整合監控系統並根據警報自動通知，協助團隊即時應對事件。", img: "/projects/advantech-figma/comp-ai-pagerduty.png" },
            ].map((item) => (
              <div key={item.title} className="cs-comp-card">
                <div className="cs-comp-card-img">
                  <Image src={item.img} alt={item.title} fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <h4 className="cs-comp-card-title">{item.title}</h4>
                <p className="cs-comp-card-desc">{item.desc}</p>
                <div className="cs-comp-pill">{item.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 02 */}
        <div className="cs-sub-section">
          <h3 className="cs-sub-section-heading">02 / 能源管理與設備管理競品分析</h3>
          <p className="cs-sub-section-desc cs-text-muted-blue">
            市場上的能源管理系統已開始把設備監控、能源分析、成本最佳化與 AI 洞察整合在同一個工作流程中。
          </p>
          <div className="cs-comp-ems-grid">
            {([
              { name: "IBM Maximo Energy Optimization", category: "設備管理 / 能源管理", img: "/projects/advantech-figma/comp-ems-ibm.png",
                items: ["統一能源與資產管理平台，強調遠端可視性與深入見解。", "設備監測、數據分析、遠端監控，並透過 Copilot 對話式 AI 撈取資料與生成視覺報告。"] },
              { name: "ABB Ability Energy and Asset Manager", category: "設備管理", img: "/projects/advantech-figma/comp-ems-abb.png",
                items: ["優化資產效能、延長設備生命週期，並降低停機時間與成本。", "Senseye 預測性維護技術可尋找過去類似事例，支援設備狀態判讀與維護決策。"] },
              { name: "Schneider EcoStruxure Resource Advisor", category: "能源管理", img: "/projects/advantech-figma/comp-ems-schneider.png",
                items: ["可彈性定義數據指標，具擴充性與平台互通性，並支援監控預算。", "Resource Advisor / Efficiency AI 可生成視覺報告並提供能耗洞察。"] },
              { name: "Siemens EnergyIP", category: "能源管理", img: "/projects/advantech-figma/comp-ems-siemens.png",
                items: ["以能源資料管理與費用最佳化為核心，支援能源使用決策。", "主動優化建築物 HVAC 系統節能表現，並降低電費使用。"] },
            ] as { name: string; category: string; img: string; items: string[] }[]).map((item) => (
              <div key={item.name} className="cs-comp-ems-card">
                <div className="cs-comp-ems-img">
                  <Image src={item.img} alt={item.name} fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div className="cs-comp-ems-body">
                  <h4 className="cs-comp-ems-name">{item.name}</h4>
                  <span className="cs-comp-category-pill">{item.category}</span>
                  <ul className="cs-comp-ems-list">
                    {item.items.map((bullet, idx) => <li key={idx}>{bullet}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 */}
        <div className="cs-sub-section">
          <h3 className="cs-sub-section-heading">03 / AI 功能比較與設計機會</h3>
          <p className="cs-sub-section-desc cs-text-muted-blue">
            比對研華已上線的功能與市場競品的區別，找出後續可以深化的機會點。
          </p>
          {/* Grid: 2 cols (feature matrix | opportunity). Rows share height automatically. */}
          <div className="cs-fm-wrap">
            {/* ── Row 1: headers ── */}
            <div className="cs-fm-header">
              <div className="cs-fm-module-hd">管理模組</div>
              <div className="cs-fm-col-hd">現有 WISE iEMS AI 功能</div>
              <div className="cs-fm-col-hd">EMS 競品 AI 模組</div>
            </div>
            <div className="cs-opp-col-hd">
              <svg width="24" height="24" viewBox="0 0 24 23.0414" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1452 1.32973L16.5549 6.21763L21.9521 7.00126C23.9112 7.28533 24.6948 9.695 23.2745 11.0761L19.3759 14.8768L20.2967 20.2446C20.6297 22.1939 18.5825 23.6828 16.8291 22.7621L12 20.225L7.17087 22.7621C5.41749 23.6828 3.37025 22.1939 3.70329 20.2446L4.62406 14.8768L0.725495 11.0761C-0.694838 9.695 0.0887943 7.28533 2.04787 7.00126L7.44514 6.21763L9.85481 1.32973C10.7364 -0.443242 13.2636 -0.443242 14.1452 1.32973Z" fill="#2AABD8" />
              </svg>
              <span>可發展機會點</span>
            </div>

            {/* ── Row 2: 設備管理 ── */}
            <div className="cs-fm-row">
              <div className="cs-fm-module">
                <svg width="29" height="30" viewBox="0 0 28.8947 29.6544" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.60243 29.6544V24.8471H6.56997L2.48377 11.4668C1.76267 11.0662 1.16844 10.4786 0.701063 9.70413C0.233688 8.92962 0 8.1017 0 7.22036C0 5.88501 0.467376 4.74995 1.40213 3.8152C2.33688 2.88045 3.47193 2.41307 4.80729 2.41307C5.84887 2.41307 6.77695 2.71353 7.59151 3.31444C8.40608 3.91535 8.97361 4.68318 9.2941 5.61793H14.4219V4.0155C14.4219 3.56148 14.5754 3.1809 14.8826 2.87377C15.1897 2.56664 15.5703 2.41307 16.0243 2.41307C16.2647 2.41307 16.4984 2.46649 16.7254 2.57332C16.9524 2.68014 17.146 2.84039 17.3062 3.05404L20.0304 0.490156C20.2707 0.249791 20.5578 0.0962256 20.8917 0.0294568C21.2255 -0.037312 21.5527 0.00942642 21.8732 0.169669L28.1227 3.05404C28.4431 3.21429 28.6635 3.44797 28.7837 3.75511C28.9038 4.06224 28.8972 4.3627 28.7636 4.65647C28.6034 4.97696 28.3697 5.18394 28.0626 5.27742C27.7554 5.37089 27.455 5.35086 27.1612 5.21733L21.3924 2.57332L17.6267 6.09866V8.34207L21.3924 11.7873L27.1612 9.14328C27.455 9.00975 27.7621 8.99639 28.0826 9.10322C28.4031 9.21005 28.6301 9.41035 28.7636 9.70413C28.9239 10.0246 28.9372 10.3317 28.8037 10.6255C28.6702 10.9193 28.4431 11.1463 28.1227 11.3066L21.8732 14.2711C21.5527 14.4313 21.2255 14.478 20.8917 14.4113C20.5578 14.3445 20.2707 14.1909 20.0304 13.9506L17.3062 11.3867C17.146 11.5469 16.9524 11.6938 16.7254 11.8274C16.4984 11.9609 16.2647 12.0277 16.0243 12.0277C15.5703 12.0277 15.1897 11.8741 14.8826 11.567C14.5754 11.2598 14.4219 10.8792 14.4219 10.4252V8.82279H9.2941C9.21398 9.03645 9.12718 9.23675 9.0337 9.42371C8.94023 9.61066 8.81337 9.81096 8.65312 10.0246L16.6653 24.8471H22.434V29.6544H1.60243ZM4.80729 8.82279C5.26131 8.82279 5.64189 8.66923 5.94902 8.3621C6.25616 8.05496 6.40972 7.67438 6.40972 7.22036C6.40972 6.76634 6.25616 6.38577 5.94902 6.07863C5.64189 5.7715 5.26131 5.61793 4.80729 5.61793C4.35327 5.61793 3.97269 5.7715 3.66556 6.07863C3.35843 6.38577 3.20486 6.76634 3.20486 7.22036C3.20486 7.67438 3.35843 8.05496 3.66556 8.3621C3.97269 8.66923 4.35327 8.82279 4.80729 8.82279ZM9.85495 24.8471H12.9797L6.08924 12.0277H5.92899L9.85495 24.8471Z" fill="#005796" />
                </svg>
                <span>設備管理</span>
              </div>
              <div className="cs-fm-cell">
                <ul>
                  <li>以問答快速統整設備數據，了解設備運轉模式</li>
                  <li>根據設備維修指南於設備異常時提供維修建議</li>
                  <li>主動提醒維保須知，並提供設備背景資訊</li>
                </ul>
              </div>
              <div className="cs-fm-cell">
                <ul>
                  <li>優化資產設備效能：HVAC 系統主動提出降低電費方案</li>
                  <li>設備用能異常分析：智慧依設備運轉樣態診斷設備維運方案</li>
                </ul>
              </div>
            </div>
            <div className="cs-opp-cell">
              <ul>
                <li>設備用能異常分析</li>
                <li>智慧依設備運轉樣態診斷設備維運方案</li>
              </ul>
            </div>

            {/* ── Row 3: 能源管理 ── */}
            <div className="cs-fm-row">
              <div className="cs-fm-module">
                <svg width="26" height="32" viewBox="0 0 25.6389 32.0486" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4959 25.9594L18.7885 16.0243H12.3788L13.5405 6.93051L6.1293 17.6267H11.6977L10.4959 25.9594ZM6.40972 32.0486L8.01215 20.8316H0L14.4219 0H17.6267L16.0243 12.8194H25.6389L9.61458 32.0486H6.40972Z" fill="#005796" />
                </svg>
                <span>能源管理</span>
              </div>
              <div className="cs-fm-cell">
                <ul>
                  <li>以問答快速統整能耗數據，了解場域能耗樣態</li>
                  <li>以問答快速統整需量數據，了解需量模式</li>
                  <li>主動擬定節能策略</li>
                  <li>以表格或圖表彙整能耗資訊盤查結果</li>
                  <li>專業關鍵詞說明、系統使用主動引導</li>
                </ul>
              </div>
              <div className="cs-fm-cell">
                <ul>
                  <li>提出深入節能洞見：監控能源預算</li>
                  <li>用電資費方案選擇最佳化：判別能耗使用模式深度解析可行節能方案</li>
                </ul>
              </div>
            </div>
            <div className="cs-opp-cell">
              <ul>
                <li>用電資費方案選擇最佳化</li>
                <li>判別能耗使用模式深度解析可行節能方案</li>
              </ul>
            </div>
          </div>
        </div>
      </CaseSection>

      {/* ── 04 User Interview ── */}
      <CaseSection id="cs-sec-interview" surface title="透過專案訪談，理解能源與廠務管理的實際工作流程">
        <p className="cs-body-muted" style={{ marginBottom: 36 }}>
          訪談內部廠務人員與系統整合商（SI），釐清終端使用者在設備能耗盤查、能源分析與報告產出中的痛點，並找出生成式 AI 在 iEMS 中能切入的工作節點。
        </p>

        {/* Persona Cards */}
        <div className="cs-iv-personas">
          <div className="cs-iv-persona">
            <div className="cs-iv-persona-img">
              <Image src="/projects/advantech-figma/interview-persona-factory.png" alt="內部廠務人員" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <div>
              <h3 className="cs-iv-persona-name">內部廠務人員</h3>
              <p className="cs-iv-persona-desc">透過內部廠務人員了解終端使用者真實需求與使用痛點，聚焦場地事務管理、設施維護、園區活動服務與園區機電設備。</p>
            </div>
          </div>
          <div className="cs-iv-persona">
            <div className="cs-iv-persona-img">
              <Image src="/projects/advantech-figma/interview-persona-si.png" alt="系統整合商" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
            <div>
              <h3 className="cs-iv-persona-name">系統整合商（SI）</h3>
              <p className="cs-iv-persona-desc">透過系統整合商了解「機械加工設備製造業」與「電子產品驗證服務業」使用者常見需求與期待，補足不同產業導入情境。</p>
            </div>
          </div>
        </div>

        {/* 01 Factory Workflow */}
        <div className="cs-sub-section">
          <h3 className="cs-sub-section-heading">01 / 內部廠務人員：設備能耗盤查工作流</h3>
          <p className="cs-sub-section-desc cs-text-muted-blue">資深廠務管理人員在設備能耗盤查中，需要從設備異常查找、報修、維修到後續追蹤一路處理，但目前許多判斷仍依賴人工經驗與分散資料。</p>
          <div className="cs-iv-workflow">
            <div className="cs-iv-stage">
              <h4 className="cs-iv-stage-title">設備異常查找</h4>
              <div className="cs-iv-pain"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc">依賴人工設定閾值告警；依賴能管專家或設備商定期盤點設備運轉能效。</p></div>
              <div className="cs-iv-ai"><span className="cs-iv-ai-label">AI 應用機會</span><ul><li>模式識別學習歷史能耗數據，標記異常熱點</li><li>交叉比對設備歷史能耗與背景環境數據</li><li>預測分析可能出現的能耗異常並提前預警</li></ul></div>
            </div>
            <div className="cs-iv-arrow"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am1" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am1)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
            <div className="cs-iv-stage">
              <h4 className="cs-iv-stage-title">設備報修 / 維修</h4>
              <div className="cs-iv-pain"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc">異常排除缺乏標準處理流程；原廠通報處理時間過長；在地設備商未必提供維修支援。</p></div>
              <div className="cs-iv-ai"><span className="cs-iv-ai-label">AI 應用機會</span><ul><li>建議客服系統自主排除問題，加速異常流程</li><li>主動提供異常報告、可能原因與 SOP 維護流程</li><li>快速擴充各家廠牌文件與版本更新，佈建標準流程</li></ul></div>
            </div>
            <div className="cs-iv-arrow"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am2" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am2)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
            <div className="cs-iv-stage">
              <h4 className="cs-iv-stage-title">後續跟進</h4>
              <div className="cs-iv-pain"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc">需要人工追蹤並記錄問題排除結果與改善效益。</p></div>
              <div className="cs-iv-ai cs-iv-ai-grow"><span className="cs-iv-ai-label">AI 應用機會</span><ul><li>自動產出問題紀錄、對應解決方案與效益分析報告</li><li>針對事件生成文字分析與圖表繪製</li></ul></div>
            </div>
          </div>
        </div>

        {/* 02 SI Workflow */}
        <div className="cs-sub-section">
          <h3 className="cs-sub-section-heading">02 / 系統整合商：能源分析工作流</h3>
          <p className="cs-sub-section-desc cs-text-muted-blue">SI 訪談指出，能源分析工作常卡在資料串接、判讀空間與報告產出。當資料不能直接對應設備與能源管理資訊時，使用者很難快速形成可執行的節能決策。</p>
          <div className="cs-iv-workflow">
            <div className="cs-iv-stage">
              <h4 className="cs-iv-stage-title">調用資料</h4>
              <div className="cs-iv-pain"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc">設備資料與能源管理資訊斷聯，無法統整比對並可視化呈現。</p></div>
              <div className="cs-iv-ai"><span className="cs-iv-ai-label">AI 應用機會</span><ul><li>能耗數值結合設備運行狀態</li><li>彙整生產、天氣等資訊評估合理能耗</li><li>依需求比對分析結果並提供決策建議</li></ul></div>
            </div>
            <div className="cs-iv-arrow"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am3" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am3)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
            <div className="cs-iv-stage">
              <h4 className="cs-iv-stage-title">資料分析</h4>
              <div className="cs-iv-pain"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc">缺少判斷空間，不易判讀設備能耗是否正常。</p></div>
              <div className="cs-iv-ai"><span className="cs-iv-ai-label">AI 應用機會</span><ul><li>主動告警異常程度分級</li><li>有效管理個別機台與工單對應能耗基線</li><li>將專家經驗彙整為 AI 生成建議</li></ul></div>
            </div>
            <div className="cs-iv-arrow"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><mask id="am4" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="41"><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="white" /></mask><g mask="url(#am4)"><path d="M0.0129123 0.0211436H47.1355V40.5023H0.0129123V0.0211436Z" fill="#0070C0" /></g></svg></div>
            <div className="cs-iv-stage">
              <h4 className="cs-iv-stage-title">報告產出</h4>
              <div className="cs-iv-pain"><span className="cs-iv-pain-label">痛點</span><p className="cs-iv-pain-desc">產出過程耗時，儀錶板畫面難以直接應用於報告書。</p></div>
              <div className="cs-iv-ai"><span className="cs-iv-ai-label">AI 應用機會</span><ul><li>快速產生申報用報告雛形</li><li>整合數值分析工具，如迴歸分析</li><li>提供需量與容需分析方案評估建議，擬定最佳策略</li></ul></div>
            </div>
          </div>
        </div>

        {/* 訪談綜合洞察 */}
        <div className="cs-synthesis">
          <div className="cs-synthesis-hd">訪談綜合洞察</div>
          <div className="cs-synthesis-body">
            <div className="cs-synthesis-insights">
              {[
                { n: "01", title: "資料與工作流程斷裂", desc: "設備資料、能耗資料、環境資料與維修紀錄分散，使用者需要人工串接才能判斷問題。" },
                { n: "02", title: "判斷依賴經驗", desc: "異常判讀、節能策略與維修建議常依賴專家經驗，缺少可複用的標準流程。" },
                { n: "03", title: "輸出難以直接行動", desc: "報告、問題紀錄與改善效益需要人工整理，導致追蹤與決策成本偏高。" },
              ].map((item) => (
                <div key={item.n} className="cs-synthesis-insight">
                  <div className="cs-synthesis-card">
                    <div className="cs-synthesis-card-heading">
                      <div className="cs-synthesis-badge">{item.n}</div>
                      <p className="cs-synthesis-card-title">{item.title}</p>
                    </div>
                    <p className="cs-synthesis-card-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cs-synthesis-photo">
              <Image src="/projects/advantech-figma/interview-synthesis-photo.png" alt="訪談現場" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
          </div>
        </div>
      </CaseSection>

      {/* ── 05 Design Scenario ── */}
      <CaseSection id="cs-sec-scenario" title="AI 應用情境：從底層機制到介面落地">
        <p className="cs-body-muted" style={{ marginBottom: 48 }}>
          專案研究過後，團隊透過工作坊討論功能優先級，將使用者痛點轉譯為兩個可落地的 AI 應用情境。每個情境都從底層 AI 機制出發，對應到核心功能，最後落到使用者會接觸的介面呈現。
        </p>

        {[
          {
            icon: "/projects/advantech-figma/scenario-icon-1.png",
            titleColor: "#005796",
            title: "情境 1：需量管理決策助手",
            desc: "協助使用者擬定最佳用電方案，提前掌握需量風險，避免超約罰款。",
            ai:   ["短期預測", "分析季節性、趨勢與外部因素，支持下季用電與電費方案選擇。"],
            ai0:  ["短期預測", "基於歷史用電與即時數據，預測近期需量並找出可能超約時段。"],
            ai1:  ["長期預測", "分析季節性、趨勢與外部因素，支持下季用電與電費方案選擇。"],
            fn0:  ["超約風險識別與建議", "即時監控峰值負荷與潛在超約風險，提供調控建議。"],
            fn1:  ["電價與契約容量管理", "評估不同電價策略與契約容量，輔助使用者選擇最佳方案。"],
            ui0:  ["圖表進階資訊與 AI 預測", "在需量圖表中顯示預測與風險提示。"],
            ui1:  ["主動通知需量超約預警", "需量接近超約風險時主動提醒。"],
            ui2:  ["對話式聊天機器人", "以問答方式取得用電與契約策略建議。"],
          },
          {
            icon: "/projects/advantech-figma/scenario-icon-2.png",
            titleColor: "#1e84a6",
            title: "情境 2：設備能效主動維護",
            desc: "主動盤查設備用能模式，偵測異常熱點，並提供維護與能效優化建議。",
            ai:   [],
            ai0:  ["模式識別", "學習歷史能耗資料，辨識正常運行模式並自動標記異常數據點。"],
            ai1:  ["事件分析", "整合維運與能源管理事件，歸納過去維修經驗與異常原因。"],
            fn0:  ["能耗熱點分析", "交叉比對維運、環境與能源資料，找出設備能耗異常來源。"],
            fn1:  ["能效優化方案", "依照維保標準流程與歷史案例，提供原因分析與處理建議。"],
            ui0:  ["E-mail 與系統通知", "運用 Email、系統通知指出設備當前問題。"],
            ui1:  ["異常熱點圖表進階分析", "可視化圖表找出設備異常問題。"],
            ui2:  ["對話式聊天機器人", "以問答方式取得維修設備等建議。"],
          },
        ].map((sc) => (
          <div key={sc.title} className="cs-ds-scenario">
            {/* ── Scenario header ── */}
            <div className="cs-ds-head">
              <Image src={sc.icon} width={48} height={48} alt="" unoptimized />
              <div>
                <h3 className="cs-ds-title" style={{ color: sc.titleColor }}>{sc.title}</h3>
                <p className="cs-ds-subdesc">{sc.desc}</p>
              </div>
            </div>

            {/* ── Flow diagram ── */}
            <div className="cs-ds-flow-wrap">
              {/* Inner box holds the connectors + cards at one shared width so the
                  SVG scrolls together with the cards when the row overflows. */}
              <div className="cs-ds-flow-inner">
              {/* Connector lines are drawn by <FlowConnectors />, which measures the
                  real rendered position of each card (data-flow anchors below) so the
                  lines stay aligned no matter how the cards reflow / change height. */}
              <svg className="cs-ds-svg-overlay" preserveAspectRatio="none" aria-hidden="true" />

              {/* ── Three card columns ── */}
              <div className="cs-ds-flow-cols">
                {/* Column 1: AI Logic */}
                <div>
                  <p className="cs-ds-col-label" style={{ color: "#6b46a3" }}>底層 AI 邏輯</p>
                  <div style={{ marginTop: 27 }}>
                    <div className="cs-ds-card cs-ds-card-ai cs-ds-card-primary" data-flow="ai1">
                      <div className="cs-ds-card-head">
                        <span className="cs-ds-pill" style={{ color: "#6b46a3" }}>{sc.ai0[0]}</span>
                        <OwnerMark />
                      </div>
                      <p className="cs-ds-card-desc">{sc.ai0[1]}</p>
                    </div>
                    <div className="cs-ds-ai-gap" />
                    <div className="cs-ds-card cs-ds-card-ai" data-flow="ai2">
                      <span className="cs-ds-pill" style={{ color: "#6b46a3" }}>{sc.ai1[0]}</span>
                      <p className="cs-ds-card-desc">{sc.ai1[1]}</p>
                    </div>
                  </div>
                </div>

                {/* Column 2: Feature Strategy */}
                <div>
                  <p className="cs-ds-col-label" style={{ color: "#d88400" }}>對應功能策略</p>
                  <div style={{ marginTop: 27 }}>
                    <div className="cs-ds-card cs-ds-card-func cs-ds-card-primary" data-flow="fn1">
                      <div className="cs-ds-card-head">
                        <span className="cs-ds-pill" style={{ color: "#d88400" }}>{sc.fn0[0]}</span>
                        <OwnerMark />
                      </div>
                      <p className="cs-ds-card-desc">{sc.fn0[1]}</p>
                    </div>
                    <div className="cs-ds-ai-gap" />
                    <div className="cs-ds-card cs-ds-card-func" data-flow="fn2">
                      <span className="cs-ds-pill" style={{ color: "#d88400" }}>{sc.fn1[0]}</span>
                      <p className="cs-ds-card-desc">{sc.fn1[1]}</p>
                    </div>
                  </div>
                </div>

                {/* Column 3: UI Presentation */}
                <div>
                  <p className="cs-ds-col-label" style={{ color: "#005796" }}>介面呈現方式</p>
                  <div style={{ marginTop: 37 }}>
                    <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary" data-flow="ui1">
                      <div className="cs-ds-card-head">
                        <span className="cs-ds-pill" style={{ color: "#005796" }}>{sc.ui0[0]}</span>
                        <OwnerMark />
                      </div>
                      <p className="cs-ds-card-desc">{sc.ui0[1]}</p>
                    </div>
                    <div className="cs-ds-ui-gap" />
                    <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary" data-flow="ui2">
                      <div className="cs-ds-card-head">
                        <span className="cs-ds-pill" style={{ color: "#005796" }}>{sc.ui1[0]}</span>
                        <OwnerMark />
                      </div>
                      <p className="cs-ds-card-desc">{sc.ui1[1]}</p>
                    </div>
                    <div className="cs-ds-ui-gap" />
                    <div className="cs-ds-card cs-ds-card-ui cs-ds-card-primary" data-flow="ui3">
                      <div className="cs-ds-card-head">
                        <span className="cs-ds-pill" style={{ color: "#005796" }}>{sc.ui2[0]}</span>
                        <OwnerMark />
                      </div>
                      <p className="cs-ds-card-desc">{sc.ui2[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* Legend: 由我負責 */}
            <div className="cs-ds-legend">
              <OwnerMark />
              <span>：由我負責</span>
            </div>
          </div>
        ))}
        <FlowConnectors />
      </CaseSection>

      {/* ── 06 Solution ── */}
      <CaseSection id="cs-sec-solution" surface className="cs-solution-section" title="設計發想、迭代與最終方案">
        <p className="cs-body-muted" style={{ marginBottom: 56 }}>
          依據前述定義的設計情境，後續迭代將聚焦在幾個會直接影響決策判斷的介面：AI Chatbot、超約預警分析視窗、設備能耗異常分析視窗，以及其中的圖表、資料表與 AI 建議區塊。
        </p>

        {/* ── BrainStorming Block ── */}
        <div className="cs-sol-block">
          <span className="cs-sol-tag" style={{ background: "#e0f8fc", color: "#0072bd" }}>BrainStorming</span>
          <h3 className="cs-sol-blk-title">2 種情境的設計發想</h3>
          <p className="cs-sol-blk-desc cs-text-muted-blue">先從兩個情境拆出核心使用任務與 AI 介入點，定義後續迭代要驗證的頁面入口、通知方式與建議回饋。</p>

          {/* Scenario 1 */}
          <div className="cs-sol-flow" style={{ backgroundImage: "url('/projects/advantech-figma/sol06/flow-sc1.png')" }}>
            <div className="cs-sol-flow-info">
              <p className="cs-sol-flow-label" style={{ color: "#1a87de" }}>Scenario 1</p>
              <p className="cs-sol-flow-name">需求管理決策助手：超約預警</p>
            </div>
          </div>
          <ProposalTabs
            defaultTab={2}
            tabs={[
              {
                label: "提案一：警示通知欄",
                images: [
                  "/projects/advantech-figma/sol06/prop-sc1-t1-01.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t1-02.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t1-03.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t1-04.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t1-05.png",
                ],
                concept: "透過點取 notification bar 形式，直接彈出一個 Pop up modal，提供目前異常的需量分析與高耗能設備列表，針對 AI 建議可給予回饋。",
                reasonTitle: "未採納原因",
                reason: "目前的前端介面與 design system 未有此 bar 設計，需要重新刻新的 component，以最低成本導入 AI 機制來說較為麻煩，且需使用者驗證效益。",
              },
              {
                label: "提案二：系統通知",
                adopted: true,
                images: [
                  "/projects/advantech-figma/sol06/prop-sc1-t2-01.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t2-02.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t2-03.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t2-04.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t2-05.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t2-06.png",
                ],
                concept: "透過點取 notification icon 形式，根據嚴重程度分級進行標籤分類顯示，點擊「了解詳細資訊」獲取目前異常的需量分析與高耗能設備列表，針對 AI 建議可給予回饋。",
                reasonTitle: "採納理由",
                reason: "將不同緊急程度的預警通知提供給使用者，可以讓當前負責人員判斷問題嚴重性，並促使決定是否需要進階的需量分析與能耗改善建議。",
              },
              {
                label: "提案三：圖表按鈕",
                adopted: true,
                images: [
                  "/projects/advantech-figma/sol06/prop-sc1-t3-01.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t3-02.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t3-03.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t3-04.png",
                  "/projects/advantech-figma/sol06/prop-sc1-t3-05.png",
                ],
                concept: "透過點取圖表右上角的警示 button，直接彈出一個 Pop up modal，提供目前異常的需量分析與高耗能設備列表，針對 AI 建議可給予回饋。",
                reasonTitle: "採納理由",
                reason: "目前廠務人員主要視覺鎖定區域為需量分析的折線圖，直接在右上角提供醒目的 button，可以讓使用者快速發覺異常，並且點擊一次即可快速取得預警資訊。",
              },
            ]}
          />

          {/* Scenario 2 */}
          <div className="cs-sol-flow" style={{ backgroundImage: "url('/projects/advantech-figma/sol06/flow-sc2.png')" }}>
            <div className="cs-sol-flow-info">
              <p className="cs-sol-flow-label" style={{ color: "#1e84a6" }}>Scenario 2</p>
              <p className="cs-sol-flow-name" style={{ color: "#083b4c" }}>設備能效主動維護：模式識別</p>
            </div>
          </div>
          <ProposalTabs
            defaultTab={0}
            tabs={[
              {
                label: "提案一：系統通知",
                adopted: true,
                images: [
                  "/projects/advantech-figma/sol06/prop-sc2-t1-01.png",
                  "/projects/advantech-figma/sol06/prop-sc2-t1-02.png",
                  "/projects/advantech-figma/sol06/prop-sc2-t1-03.png",
                  "/projects/advantech-figma/sol06/prop-sc2-t1-04.png",
                ],
                concept: "透過點取 notification icon 形式，根據嚴重程度分級進行標籤分類顯示，點擊「進階分析」獲取目前異常的設備能耗資料與冷卻水溫圖表，可即時接收 AI 建議。",
                reasonTitle: "採納理由",
                reason: "設備能耗問題目前主要由廠務人員手動檢查各項設備，非時刻監控儀表板，為了第一時間通知負責人員，透過系統通知方式（含 Email、簡訊），可以讓負責人員接收到異常後針對性解決狀況。",
              },
              {
                label: "提案二：3D 圖按鈕",
                images: [
                  "/projects/advantech-figma/sol06/prop-sc2-t2-01.png",
                  "/projects/advantech-figma/sol06/prop-sc2-t2-02.png",
                ],
                concept: "透過懸停於異常圖標，了解當前設備問題。",
                reasonTitle: "未採納原因",
                reason: "3D 圖目前僅有預覽線路功能，雖然圖表中快速顯示異常問題很方便，但是與原有維護工程師討論後，在系統實作上較複雜，因此優先順序較後。",
              },
              {
                label: "提案三：圖表按鈕",
                images: [
                  "/projects/advantech-figma/sol06/prop-sc2-t3-01.png",
                  "/projects/advantech-figma/sol06/prop-sc2-t3-02.png",
                  "/projects/advantech-figma/sol06/prop-sc2-t3-03.png",
                ],
                concept: "透過點取報警列表右上角的 button，直接進入到 AI chatbot 對話視窗，自動輸入「分析冰機設備能耗事件？」，了解當前各項冰機運轉情形。",
                reasonTitle: "未採納原因",
                reason: "雖然與超約預警按鈕使用模式一致，但是當前 HVAC 系統主要使用者：廠務人員的工作流程主要圍繞在收到異常通知，才會查看系統，因此本方案與使用者習慣有所出入，因此未採納。",
              },
            ]}
          />
        </div>

        {/* ── Design Iteration Block ── */}
        <div className="cs-sol-block">
          <span className="cs-sol-tag" style={{ background: "#f6f1fd", color: "#7d4fb9", borderRadius: 999 }}>Design Iteration</span>
          <h3 className="cs-sol-blk-title">兩種情境的頁面與元件迭代</h3>
          <p className="cs-sol-blk-desc cs-text-muted-blue">迭代時主要檢視資訊優先級是否清楚、資料呈現是否符合廠務人員的判讀習慣，以及使用者能否在最少的操作成本下，從異常提示一路理解原因並採取下一步行動。</p>

          {/* Board 1: Scenario 1 - AI Chatbot 元件 */}
          <div className="cs-sol-board">
            <div className="cs-sol-bdhd">
              <span className="cs-sol-badge" style={{ background: "#ebf6fe", color: "#0072bd" }}>Scenario 1</span>
              <p className="cs-sol-bdtitle">AI Chatbot 元件</p>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">修正視窗寬度</p>
              <p className="cs-sol-drbody">最初，ECOWatch 與 HVAC 的預設聊天視窗寬度設定為 360px。然而，當使用者需要查看詳細分析內容時，必須點擊按鈕展開聊天視窗，這增加了額外操作步驟，也中斷了整體使用體驗。為了提升可用性，我們將預設聊天視窗寬度<strong>從 360px 調整為 640px</strong>，使其與展開後的版本一致，讓使用者能更直接、順暢地瀏覽分析內容。</p>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">需量走勢圖精細化</p>
              <div className="cs-sol-drbody">
                <p style={{ margin: 0 }}>原本的圖表主要呈現單一時間點的異常狀況，使用者只能看到局部的超約警示與數值，較難理解該異常在整體用電趨勢中的位置，也無法快速判斷後續是否仍存在超約風險。</p>
                <p style={{ margin: "1em 0 0" }}>調整後的圖表擴展為完整的需量分析視覺化，補上更清楚的時間軸、kW 單位、目標需量線與預測需量線，讓使用者能同時掌握歷史用電趨勢與未來預測變化。透過不同顏色區分谷時段、尖時段與預測區段，並加入圖例說明與關鍵數值標記，使用者可以更直覺地判讀高風險時段、比較目標值與預測值，進一步支援後續的能源調度與決策。</p>
              </div>
            </div>
            <div className="cs-sol-ba">
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">Before</div>
                <div className="cs-sol-bacontent">
                  <div style={{ width: "calc(min(607px, 100%) * 360 / 607)", display: "flex", flexDirection: "column" }}>
                    <Image src="/projects/advantech-figma/sol06/iter-chatbot-before.png" alt="Before" width={360} height={461} unoptimized style={{ width: "100%", height: "auto", display: "block" }} />
                    <div className="cs-sol-redline" style={{ width: "100%" }}>
                      <span className="cs-sol-redline-label">360px</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cs-sol-arrow" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">After</div>
                <div className="cs-sol-bacontent">
                  <div style={{ width: "min(607px, 100%)", display: "flex", flexDirection: "column" }}>
                    <Image src="/projects/advantech-figma/sol06/iter-chatbot-after.png" alt="After" width={607} height={452} unoptimized style={{ width: "100%", height: "auto", display: "block" }} />
                    <div className="cs-sol-redline" style={{ width: "100%" }}>
                      <span className="cs-sol-redline-label">640px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Board 2: Scenario 1 - 超約預警分析視窗 */}
          <div className="cs-sol-board">
            <div className="cs-sol-bdhd">
              <span className="cs-sol-badge" style={{ background: "#ebf6fe", color: "#0072bd" }}>Scenario 1</span>
              <p className="cs-sol-bdtitle">超約預警分析視窗</p>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">AI 建議排版順序修正</p>
              <p className="cs-sol-drbody">原本 AI 建議區塊被放在 modal 的最後一列，使用者需要先瀏覽完設備清單與表格內容後才會看到「建議執行方針」，容易被視為補充資訊。調整後將 AI 建議移到 modal 的第一列優先顯示，讓使用者一打開超約預警分析時，就能先看到 AI 深度分析結果、超約原因與建議處理方式。</p>
            </div>
            <div className="cs-sol-ba">
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">Before</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s1a-before.png" alt="Before" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <div className="cs-sol-arrow" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">After</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s1a-after.png" alt="After" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">趨勢預測分析排版修正</p>
              <p className="cs-sol-drbody">原本的版面將大量文字分析與圖表並排呈現，使用者需要一邊閱讀左側長段落，一邊對照右側圖表資訊，整體閱讀動線較分散。調整後將版面改為由上而下的閱讀順序，先在上方呈現最重要的分析摘要，讓使用者一進入畫面就能快速掌握目前風險狀況，強化了資訊層級、閱讀順序與重點辨識效率。</p>
            </div>
            <div className="cs-sol-ba">
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">Before</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s1b-before.png" alt="Before" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <div className="cs-sol-arrow" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">After</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s1b-after.png" alt="After" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">修正設備識別資訊</p>
              <p className="cs-sol-drbody">原本表格使用「設備編號」作為主要識別資訊，與廠務人員實際查找設備的習慣不一致，且超過 10 筆以上的資料讓使用者需要花更多時間瀏覽。調整後將「設備編號」改為使用者更熟悉的「代號」，並將排名精簡為前 10 筆高耗能設備，讓使用者能更快掌握優先改善對象。</p>
            </div>
            <div className="cs-sol-ba">
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">Before</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s1c-before.png" alt="Before" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <div className="cs-sol-arrow" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">After</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s1c-after.png" alt="After" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Board 3: Scenario 2 - 設備能耗異常分析視窗 */}
          <div className="cs-sol-board">
            <div className="cs-sol-bdhd">
              <span className="cs-sol-badge" style={{ background: "#eef8ff", color: "#1e84a6" }}>Scenario 2</span>
              <p className="cs-sol-bdtitle" style={{ color: "#083b4c" }}>設備能耗異常分析視窗</p>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">修正數據來源</p>
              <p className="cs-sol-drbody">原本使用「歷史能耗數據」作為設備異常判斷的主要圖表，偏向呈現耗電量與效能關係，但這些資料並不是廠務人員在日常巡檢中最直接用來判斷設備異常的依據。調整後改為呈現「歷史運轉狀態」，以冷卻水與冰水的進出水溫度變化作為主要分析指標，更符合廠務人員日常巡檢時會查看的設備數據。</p>
            </div>
            <div className="cs-sol-ba">
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">Before</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s2a-before.png" alt="Before" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <div className="cs-sol-arrow" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">After</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s2a-after.png" alt="After" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>
            <div className="cs-sol-dr">
              <p className="cs-sol-drlabel">修正故障備忘錄</p>
              <p className="cs-sol-drbody">原本的故障備忘錄以簡單表格呈現，資訊較扁平，使用者只能看到單一原因與處理方式，較難判斷故障過去發生的頻率與不同可能原因之間的優先順序。調整後加入 AI 深度分析區塊，先整理歷史異常處理方式，讓使用者能快速掌握可能的故障原因，將過去維修紀錄轉化為可參考的診斷摘要。</p>
            </div>
            <div className="cs-sol-ba">
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">Before</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s2b-before.png" alt="Before" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
              <div className="cs-sol-arrow" aria-hidden="true"><svg width="41" height="47" viewBox="0 0 47.1362 40.5292" fill="none" style={{ transform: "rotate(-90deg)" }}><path d="M23.5681 40.5292L0 20.2153H10.157V0H36.9792V20.2153H47.1362L23.5681 40.5292Z" fill="#0070C0" /></svg></div>
              <div className="cs-sol-bapanel">
                <div className="cs-sol-bahd">After</div>
                <div className="cs-sol-bacontent">
                  <Image src="/projects/advantech-figma/sol06/iter-s2b-after.png" alt="After" width={480} height={432} unoptimized style={{ width: "auto", maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Final Feature Block ── */}
        <div className="cs-sol-block">
          <span className="cs-sol-tag" style={{ background: "#fff4e3", color: "#f69418" }}>Final UI Design</span>
          <h3 className="cs-sol-blk-title">最終 3 種 feature 的介面細節</h3>
          <p className="cs-sol-blk-desc cs-text-muted-blue">最終介面聚焦在告警提示、進階分析與建議生成，讓使用者能從異常發現一路走到決策行動。</p>

          {/* Feature 1.1 */}
          <div className="cs-sol-fgroup cs-sol-fgroup-f11">
          <div className="cs-sol-fr">
            <div className="cs-sol-fc">
              <div className="cs-sol-fchead">
                <p className="cs-sol-ftitle">Feature 1.1｜自主需量分析</p>
              </div>
              <div className="cs-sol-fcbody">
                <p className="cs-sol-fsub">由使用者自主操控介面，從預測、超約預警到 AI 建議，讓能源管理不只看圖表，而是能直接支援決策。</p>
                <div className="cs-sol-dpts">
                  <div className="cs-sol-dpt">
                    <p className="cs-sol-dpt-l">超約風險分析</p>
                    <p className="cs-sol-dpt-b">在需量曲線中標記預測高峰、超約風險區間與 AI 說明，讓使用者快速理解問題發生時間點。</p>
                  </div>
                  <div className="cs-sol-dpt">
                    <p className="cs-sol-dpt-l">對話式建議</p>
                    <p className="cs-sol-dpt-b">使用者可以透過 AI Chatbot 查詢需量預測、取得超約提醒，並進一步詢問節能建議或高耗能設備排名，快速掌握能源狀況與下一步行動。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f11-01.png" alt="Feature 1.1 需量分析畫面" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-1.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f11-02.png" alt="Feature 1.1 AI Chatbot 觸發" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="cs-sol-fnote">
              <p>跳出 AI chatbot，並且自動輸入：請問今日需量預測分析？</p>
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-2.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fnote">
              <p>AI chatbot 從資料庫中讀取相關資訊，並整合 LLM 回答框架，提供需量分析與折線圖表。另外，提供問題模組供用戶持續深入提問。</p>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f11-03.png" alt="Feature 1.1 AI 需量分析回覆" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-1.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f11-04.png" alt="Feature 1.1 AI 超約建議" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="cs-sol-fnote">
              <p>點擊「請提供給我避免需量超約的建議。」按鈕，作為新的輸入資訊。AI Chatbot 繼續從資料庫中讀取相關資訊後轉換成結構化文字回覆。</p>
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-2.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fnote">
              <p>點擊「請提供給我高耗能設備排名。」按鈕，作為新的輸入資訊。AI Chatbot 繼續從資料庫中讀取相關資訊後轉換成圖表，依據耗能排名顯示最需要修復的設備列表。</p>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f11-05.png" alt="Feature 1.1 高耗能設備排名" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          </div>

          <div className="cs-sol-fhr" />

          {/* Feature 1.2 */}
          <div className="cs-sol-fgroup cs-sol-fgroup-f12">
          <div className="cs-sol-fr">
            <div className="cs-sol-fc">
              <div className="cs-sol-fchead">
                <p className="cs-sol-ftitle">Feature 1.2｜主動通知預警</p>
              </div>
              <div className="cs-sol-fcbody">
                <p className="cs-sol-fsub">由系統後台間段式預測，將問題嚴重程度分級預告用戶，促成決策者快速擬定解決方案。</p>
                <div className="cs-sol-dpts">
                  <div className="cs-sol-dpt">
                    <p className="cs-sol-dpt-l">超約風險分析</p>
                    <p className="cs-sol-dpt-b">在需量曲線中標記預測高峰、超約風險區間與 AI 說明，讓使用者快速理解問題發生時間點。</p>
                  </div>
                  <div className="cs-sol-dpt">
                    <p className="cs-sol-dpt-l">主動通知</p>
                    <p className="cs-sol-dpt-b">當即時用電預測超約時，透過系統通知提醒風險與建議行動。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f12-01.png" alt="Feature 1.2 系統通知" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-1.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f12-02.png" alt="Feature 1.2 報警等級" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="cs-sol-fnote" style={{ gap: 16 }}>
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">報警等級</p>
                  <div className="cs-sol-dpt-b" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <span>分為三個等級：</span>
                    <span style={{ background: "#FBC7C9", border: "1px solid #DF001A", borderRadius: 4, padding: "0 8px", color: "#DF001A", fontWeight: 700, lineHeight: "22px" }}>嚴重</span>
                    <span>、</span>
                    <span style={{ background: "#FFDAA9", border: "1px solid #FF9300", borderRadius: 4, padding: "0 8px", color: "#FF9300", fontWeight: 700, lineHeight: "22px" }}>中度</span>
                    <span>、</span>
                    <span style={{ background: "#F8E8BA", border: "1px solid #EBC147", borderRadius: 4, padding: "0 8px", color: "#C9A53C", fontWeight: 700, lineHeight: "22px" }}>低度</span>
                  </div>
                </div>
              </div>
              {/* Hover 互動示意圖 */}
              <AlarmLevelDemo
                tooltipLines={[
                  "嚴重：超約將於 1 小時內發生",
                  "中度：超約將於 2 小時內發生",
                  "低度：超約將於 3 小時內發生",
                ]}
              />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-2.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fnote">
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">AI 分析摘要</p>
                  <p className="cs-sol-dpt-b">快速摘要預測異常的時間點，提供處理對策。</p>
                </div>
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">趨勢預測分析</p>
                  <p className="cs-sol-dpt-b">提供報警等級、超約時間點、需量走勢圖分析。</p>
                </div>
              </div>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f12-03.png" alt="Feature 1.2 AI 分析" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-1.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f12-04.png" alt="Feature 1.2 高耗能設備" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="cs-sol-fnote">
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">前 15% 高耗能設備排名</p>
                  <p className="cs-sol-dpt-b">根據當前用電量進行排名，提供前 15% 高耗能設備名稱與位置。</p>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="cs-sol-fhr" />

          {/* Feature 2 */}
          <div className="cs-sol-fgroup cs-sol-fgroup-f2">
          <div className="cs-sol-fr">
            <div className="cs-sol-fc cs-sol-fc--teal">
              <div className="cs-sol-fchead">
                <p className="cs-sol-ftitle">Feature 2｜模式識別</p>
              </div>
              <div className="cs-sol-fcbody">
                <p className="cs-sol-fsub">設備能耗即時監控，當發生問題時可提供該設備的數據、事件進行分析，提供廠務人員及時修繕建議與故障排除方案。</p>
                <div className="cs-sol-dpts">
                  <div className="cs-sol-dpt">
                    <p className="cs-sol-dpt-l">短期異常診斷</p>
                    <p className="cs-sol-dpt-b">設備運轉出現狀況時，可透過 AI 提供問題摘要、從進出水溫度數據、事件資料找出問題來源，並搭配故障排除手冊解決難題。</p>
                  </div>
                  <div className="cs-sol-dpt">
                    <p className="cs-sol-dpt-l">主動通知</p>
                    <p className="cs-sol-dpt-b">當設備能耗異常時，透過系統通知提醒風險與建議行動。</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f2-01.png" alt="Feature 2 模式識別主畫面" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-1.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f2-02.png" alt="Feature 2 設備報警等級" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="cs-sol-fnote" style={{ gap: 16 }}>
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">報警等級</p>
                  <div className="cs-sol-dpt-b" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                    <span>分為三個等級：</span>
                    <span style={{ background: "#FBC7C9", border: "1px solid #DF001A", borderRadius: 4, padding: "0 8px", color: "#DF001A", fontWeight: 700, lineHeight: "22px" }}>嚴重</span>
                    <span>、</span>
                    <span style={{ background: "#FFDAA9", border: "1px solid #FF9300", borderRadius: 4, padding: "0 8px", color: "#FF9300", fontWeight: 700, lineHeight: "22px" }}>中度</span>
                    <span>、</span>
                    <span style={{ background: "#F8E8BA", border: "1px solid #EBC147", borderRadius: 4, padding: "0 8px", color: "#C9A53C", fontWeight: 700, lineHeight: "22px" }}>低度</span>
                  </div>
                </div>
              </div>
              {/* Hover 互動示意圖 */}
              <AlarmLevelDemo
                tooltipLines={[
                  "嚴重：設備用電高出 30% 以上",
                  "中度：設備用電耗能 20%–30%",
                  "低度：設備用電耗能 20% 以下",
                ]}
              />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-2.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fnote">
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">AI 分析摘要</p>
                  <p className="cs-sol-dpt-b">擷取異常點位、設備狀況及處理對策等重要資訊提供給設備管理人員。</p>
                </div>
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">歷史運轉狀態</p>
                  <p className="cs-sol-dpt-b">呈現詳細異常事件說明，提供異常設備過去一個月冰水與冷卻水的進出水溫度變化圖，於圖表中顯示該設備發生異常問題的時間點。</p>
                </div>
              </div>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f2-03.png" alt="Feature 2 AI 異常分析" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-1.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f2-04.png" alt="Feature 2 事件分析" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
            <div className="cs-sol-fnote">
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">事件分析</p>
                  <p className="cs-sol-dpt-b">包含該設備過去發生的詳細事件紀錄，列表中涵蓋事件類別、預期影響、發生時間。</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cs-sol-fconn" aria-hidden="true"><img src="/projects/advantech-figma/sol06/connector-2.svg" alt="" suppressHydrationWarning /></div>
          <div className="cs-sol-fr cs-sol-fr-mid">
            <div className="cs-sol-fnote">
              <div className="cs-sol-dpts">
                <div className="cs-sol-dpt">
                  <p className="cs-sol-dpt-l">故障的建議處理方式</p>
                  <p className="cs-sol-dpt-b">AI 透過維修手冊的資料，結合點位的實際發生異常紀錄，總結故障代碼，指出主要發生原因，並提供排除異常的解決方法。</p>
                </div>
              </div>
            </div>
            <div className="cs-sol-fimg">
              <Image src="/projects/advantech-figma/sol06/final-f2-05.png" alt="Feature 2 故障排除建議" width={960} height={540} unoptimized style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
          </div>
          <FeatureConnectors />
        </div>

        {/* ── UI Video Block ── */}
        <div className="cs-sol-block" style={{ marginBottom: 0 }}>
          <h3 className="cs-sol-blk-title">UI 影片展示</h3>
          <p className="cs-sol-blk-desc cs-text-muted-blue">UI 影片呈現兩個 feature 的完整操作：從觸發告警、查看圖表分析，到取得系統建議與後續處理。</p>
          <div className="cs-sol-vc" style={{ background: "#f6faff", borderColor: "#0072bd" }}>
            <p className="cs-sol-vtitle" style={{ color: "#093060" }}>超約預警操作流程</p>
            <div className="cs-sol-vimg">
              <VimeoPlayer
                videoId="1197912187"
                poster="/projects/advantech-figma/sol06/video-sc1.png"
                title="超約預警操作流程"
              />
            </div>
          </div>
          <div className="cs-sol-vc" style={{ background: "#eef8ff", borderColor: "#135e78" }}>
            <p className="cs-sol-vtitle" style={{ color: "#083b4c" }}>模式識別操作流程</p>
            <div className="cs-sol-vimg">
              <VimeoPlayer
                videoId="1197912188"
                poster="/projects/advantech-figma/sol06/video-sc2.png"
                title="模式識別操作流程"
              />
            </div>
          </div>
        </div>
      </CaseSection>

      {/* ── 07 Next Step ── */}
      <section id="cs-sec-next" className="cs-ns-section">
        <div className="cs-ns-header">
          <h2 className="cs-ns-title">下一步：工程實作與 AI 系統落地</h2>
          <p className="cs-ns-desc cs-text-ink">UI/UX 設計階段完成後，專案將進入工程實作與 AI 能力持續優化階段。設計師已先定義 AI Chatbot 的使用情境、互動流程與介面體驗；接下來，後端工程師將承接這些設計方向，進一步建構 AI 資料庫、訓練模型能力，並將設計中的功能情境轉化為可運作的系統架構。</p>
          <div className="cs-ns-divider" />
        </div>

        <div className="cs-ns-cards">
          <div className="cs-ns-card">
            <div className="cs-ns-card-hd">
              <span className="cs-ns-badge">01</span>
              <h3 className="cs-ns-card-title">RAG 知識庫架構建構</h3>
            </div>
            <div className="cs-ns-divider" />
            <p className="cs-ns-card-text">透過 Azure OpenAI 與本地端 Llama 模型協作，在兼顧廠區資料安全與運算效能的前提下，設計低延遲、高準確度的資料處理流程。資料流將透過 LangChain 進行 Pipeline 封裝，並優化文本切塊與向量檢索機制，讓 AI 能更準確地回應廠務管理、設備維護與能源分析問題，最終封裝為企業內部可使用的知識問答 API。</p>
            <div className="cs-ns-tags">
              {["Azure OpenAI", "Llama", "LangChain", "RAG", "Vector DB"].map((tag) => (
                <span key={tag} className="cs-ns-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="cs-ns-card">
            <div className="cs-ns-card-hd">
              <span className="cs-ns-badge">02</span>
              <h3 className="cs-ns-card-title">削峰填谷電力預測與自動化聯動</h3>
            </div>
            <div className="cs-ns-divider" />
            <p className="cs-ns-card-text">將 AI 預測模型串接至涵蓋多站點的監控環境，讓系統能持續分析每日用電負載曲線，並建立自動化的閾值警報流程。當 AI 預測即將發生用電尖峰或超約風險時，系統能提前觸發警報，協助管理端即時進行電力調度與降載，達到預防性的能源控管目標。</p>
            <div className="cs-ns-tags">
              {["AI 預測模型", "自動化警報", "多站點監控", "負載分析"].map((tag) => (
                <span key={tag} className="cs-ns-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="cs-ns-vision">
          <p className="cs-ns-vision-title">智慧工作流程平台願景</p>
          <p className="cs-ns-vision-text">最終，我們預期這套 AI 系統不只是提升 Chatbot 的回答能力，而是能逐步成為支援廠務管理決策的智慧工作流程平台。隨著 AI 資料庫更加完整、模型判斷能力持續提升，系統將能幫助使用者更快理解數據、預測風險、取得行動建議，進一步提升工作效率，並推動更智慧、即時且資料驅動的能源管理流程。</p>
        </div>
      </section>

      {/* ── 08 Result ── */}
      <section id="cs-sec-result" className="cs-result-bg">
        <div className="cs-result-bg-img">
          <Image
            src="/projects/advantech-result-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.6 }}
          />
        </div>
        <div className="cs-result-overlay" />
        <div className="cs-result-content">
          <CaseHeading title="我學到了什麼..." tone="white" style={{ marginBottom: 8 }} />
          <div className="cs-result-grid">
            {[
              {
                num: "01",
                title: "AI 價值在於融入工作流程，而非只是功能",
                desc: "真正有價值的 AI 不是單純回答問題，而是協助利讀資料、縮短分析時間並在關鍵時刻提供可執行建議。設計 AI 產品前必須先理解使用者的決策流程。",
              },
              {
                num: "02",
                title: "使用者訪談幫助我跳脫設計師的假設",
                desc: "許多看似直覺的互動方式，不一定符合使用者實際習慣。真實回饋讓我意識到設計不能只靠個人直覺，理解不同角色的思考方式讓設計更精準。",
              },
              {
                num: "03",
                title: "跨部門合作讓設計更接近可落地的方案",
                desc: "與工程師合作讓我學到，設計提案必須考量技術限制與 AI 回覆邏輯。設計師的角色是使用者需求與技術實作之間的橋梁。",
              },
              {
                num: "04",
                title: "設計 AI 體驗時，信任感與透明度同樣重要",
                desc: "使用者不只要「問得到答案」，更要「理解答案」並「信任答案」。在 AI 回覆中加入資料來源、判斷邏輯與行動步驟，能有效提升使用意願。",
              },
            ].map((item) => (
              <div key={item.num} className="cs-result-card">
                <span className="cs-result-num">{item.num}</span>
                <h3 className="cs-result-title">{item.title}</h3>
                <p className="cs-result-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CaseStudyShell>
  );
}
