import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import "../../styles/case-study-nccuspace.css";
import {
  CaseSection,
  CaseStudyShell,
  FlowScrollHint,
  ZoomableImage,
  type TocSection,
} from "../../components/case-study";
import { getNextProject, getProjectBySlug } from "../../data/projects";
import type { Locale } from "../../i18n/routing";
import { createLocalizedMetadata } from "../../lib/metadata";
import { translateNccu, localizeNccuTree } from "./i18n";
import {
  AffinityBoard,
  BrandMindmap,
  CardSortLegend,
  IAFlow,
  NestedListBoard,
  SusTable,
  UseCase1Flow,
  UseCase2Flow,
  UseCase3Flow,
  UseCasePriorityTable,
} from "./components/NccuDiagrams";

const IMG = "/projects/nccuspace";

const roleItems = [
  { label: "類型", value: ["介面重新設計", "團體專案"] },
  { label: "角色", value: ["UX 設計師", "使用者研究員"] },
  { label: "方法", value: ["訪談、問卷", "用例分析", "卡片分類法", "任務 & 易用性測試"] },
  { label: "工具", value: ["FigJam", "Figma"] },
  { label: "時間", value: ["2023.9 - 2024.1"] },
];

const overviewCards = [
  {
    title: "目標",
    body: "在使用政大圖書館場地管理系統預約場地時，常常不能順利預約到想要的空間，因此希望改善預約流程，幫助學生都能順利預約到想要的空間。討論室是同學最常使用的空間，因此選擇以討論室預約流程，優先進行網站再設計。",
  },
  {
    title: "需求",
    body: "了解目前討論室預約系統行為、拆解行為中未被滿足的需求、重新設計資訊架構與預約流程，並重新打造系統品牌形象。",
  },
  {
    title: "原型",
    body: "以預約討論室為第一優化流程，從首頁篩選、查看可預約時段、登記到確認預約，串起一條可測試、可上線的核心流程。",
  },
];

const problemPoints = [
  "切換查詢可預約討論室時很不方便，需要跳回起始頁",
  "想知道哪些時間、空間有空討論室，需要一個一個查",
  "網站中很難直接找到相關的場地空間資訊",
  "預約網站的風格設計與其他圖書館網頁大相徑庭",
];

const testIterations = [
  {
    title: "空間種類下放到 Tab Bar，與時段表做出區隔",
    body: "把空間種類並排讓使用者隨意選擇，想進一步了解可點選查看空間種類差異。",
  },
  {
    title: "日期選項改由篩選列選擇",
    body: "把原先的空間種類換成使用者進站前已知的「預約日期」，上方篩選列放已知資訊，下方空間種類與時段交給使用者當下彈性選擇。",
  },
  {
    title: "篩選結果重點呈現，刪除使用教學選項",
    body: "篩選結果出現在查詢按鈕右側，讓使用者一眼看到有幾筆結果；新手教學改到首次登入時呈現，並提供略過選項。",
  },
  {
    title: "空間時段比較表優化",
    body: "第一版把日期與討論室放在同一層級造成架構不清，調整資訊呈現方式，並依結果多寡彈性調整畫面寬度，避免欄位留白。",
  },
];

const brandPoints = [
  { head: "Logo", body: "以書冊堆疊成建築形象，展現圖書館所提供的討論空間。" },
  { head: "顏色", body: "結合政大自然風景與圖書館網站既有色系，選用大地色系，給學生舒適、有親和力的感覺。" },
  { head: "字體", body: "選用無襯線的源樣黑體，呈現簡約俐落的風格。" },
  { head: "特色", body: "以視覺化表格呈現篩選時段、討論室的結果，方便使用者直接選擇、查看想預約的結果。" },
];

const finalUI = [
  { tag: "用例一", title: "一目瞭然看到可預約時間與空間", src: `${IMG}/ui-case1.jpg`, w: 3200, h: 629, alt: "NCCUSpace 用例一最終介面" },
  { tag: "用例二", title: "篩選時空、找到符合需求空間後預約", src: `${IMG}/ui-case2.jpg`, w: 3200, h: 1022, alt: "NCCUSpace 用例二最終介面" },
  { tag: "用例三", title: "確認預約資訊並修改或取消", src: `${IMG}/ui-case3.jpg`, w: 3200, h: 629, alt: "NCCUSpace 用例三最終介面" },
];

const zoomLabels = { close: "關閉放大圖片", separator: "：", zoom: "點擊放大" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const project = getProjectBySlug("nccuspace", locale);
  const description = project.seoDescription ?? project.description;
  return createLocalizedMetadata(locale, "/nccuspace", {
    en: { title: project.title, description },
    "zh-TW": { title: project.title, description },
  });
}

export default async function NccuSpacePage() {
  const locale = (await getLocale()) as Locale;
  const t = (text: string) => translateNccu(locale, text);
  const project = getProjectBySlug("nccuspace", locale);
  const nextProject = getNextProject(project.slug, locale);

  const tocSections: TocSection[] = [
    { id: "cs-sec-overview", title: t("專案總覽") },
    { id: "cs-sec-problem", title: t("問題定義") },
    { id: "cs-sec-understand", title: t("了解預約行為") },
    { id: "cs-sec-ia", title: t("資訊架構設計") },
    { id: "cs-sec-flow", title: t("介面流程") },
    { id: "cs-sec-test", title: t("任務 & 易用性測試") },
    { id: "cs-sec-brand", title: t("品牌形象") },
    { id: "cs-sec-ui", title: t("最終 UI 成果") },
    { id: "cs-sec-poster", title: t("期末海報 Poster") },
    { id: "cs-sec-reflection", title: t("學習反思") },
  ];

  return (
    <CaseStudyShell
      theme="theme-nccuspace"
      tocSections={tocSections}
      nextNav={{
        nextHref: nextProject.status === "published" ? nextProject.href : undefined,
        homeLabel: t("返回首頁"),
        nextLabel: `${t("下一個專案")}${t("：")}${nextProject.title}`,
      }}
      hero={localizeNccuTree(locale, HeroSection())}
    >
      {localizeNccuTree(locale, OverviewSection())}
      {localizeNccuTree(locale, ProblemSection())}
      {localizeNccuTree(locale, UnderstandSection())}
      {localizeNccuTree(locale, IaSection())}
      {localizeNccuTree(locale, FlowSection())}
      {localizeNccuTree(locale, TestSection())}
      {localizeNccuTree(locale, BrandSection())}
      {localizeNccuTree(locale, FinalUiSection())}
      {localizeNccuTree(locale, PosterSection())}
      {localizeNccuTree(locale, ReflectionSection())}
    </CaseStudyShell>
  );
}

function HeroSection() {
  return (
    <section>
      <div className="cs-hero-cover nccu-hero-cover">
        <div className="cs-hero-cover-img">
          <Image src={`${IMG}/cover.jpg`} alt="NCCUSpace 政大場地管理系統再設計主視覺" fill sizes="100vw" priority />
        </div>
      </div>
      <div className="cs-hero-info nccu-hero-info">
        <div className="cs-hero-meta">
          <span className="cs-tags">WEB・UX Research・IA・UI Design・Branding</span>
        </div>
        <h1 className="cs-title">NCCUSpace 政大場地管理系統｜討論室預約流程再設計</h1>
        <p className="nccu-hero-lead">
          檢視政大圖書館場地管理系統的討論室預約流程，透過訪談、用例分析與易用性測試，重新設計資訊架構、介面流程與品牌形象，讓學生更快預約到想要的空間。
        </p>
        <div className="cs-info-row nccu-info-row">
          {roleItems.map((item) => (
            <div className="cs-info-card" key={item.label}>
              <span className="cs-info-label">{item.label}</span>
              <span className="cs-info-value">
                {item.value.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < item.value.length - 1 ? <br /> : null}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <CaseSection id="cs-sec-overview" title="專案總覽 Overview" className="nccu-section">
      <div className="nccu-lead">
        <span className="nccu-tag">Project Scope</span>
        <h3>把「預約不到想要的討論室」這件事，從研究一路重做到可上線的流程。</h3>
        <p>專案不只是把舊介面換皮，而是先拆解學生實際的預約行為與痛點，再重新設計資訊架構、介面流程與品牌，讓預約變得一目瞭然。</p>
      </div>
      <div className="nccu-card-grid">
        {overviewCards.map((card) => (
          <InfoCard title={card.title} key={card.title}>{card.body}</InfoCard>
        ))}
      </div>
    </CaseSection>
  );
}

function ProblemSection() {
  return (
    <CaseSection id="cs-sec-problem" title="問題定義 Problem" surface className="nccu-section">
      <div className="nccu-lead">
        <span className="nccu-tag">Pain Point</span>
        <h3>透過自身操作經驗與問卷收集，發現政大學生對現有預約流程的不滿意。</h3>
        <p>學生預約討論室主要用於小組報告討論與個人自習，且多數使用網頁版操作，目的就是想預約到可用的空間；但實際操作時卻有不少卡關。</p>
      </div>
      <ul className="nccu-problem-list">
        {problemPoints.map((p, i) => (
          <li key={p}>
            <span className="nccu-problem-num">{`0${i + 1}`}</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </CaseSection>
  );
}

function UnderstandSection() {
  return (
    <CaseSection id="cs-sec-understand" title="了解預約行為 Understand" className="nccu-section">
      <ArticleBlock kicker="訪談" title="深入了解預約需求">
        <p>訪談三位曾使用政大場地管理系統預約討論室的學生，了解預約經驗與行為動機，並把訪談重點整理成便利貼貼在 FigJam，依預約前、中、後分群，最上層淺灰色為彙整後的行為洞見。</p>
      </ArticleBlock>
      {AffinityBoard()}
      <p className="nccu-caption">使用者真正會接觸到介面的時機集中在「預約中」。</p>

      <ArticleBlock kicker="需求排序" title="拆解行為背後的需求並排序">
        <p>根據「預約中」的行為洞見，以動詞名詞分析行為背後的需求與期待，並進行優先排序，由左至右為重要程度高到低。</p>
      </ArticleBlock>
      {UseCasePriorityTable()}

      <ArticleBlock kicker="用例分析" title="用卡片分類法整合成介面">
        <p>先將目前系統的預約行為進行用例拆解，了解完成一項預約任務的各項子行為；再以卡片分類法把用例任務分群，最後整合成介面。</p>
      </ArticleBlock>
      {CardSortLegend()}
    </CaseSection>
  );
}

function IaSection() {
  return (
    <CaseSection id="cs-sec-ia" title="資訊架構設計 Information Architecture" surface className="nccu-section">
      <ArticleBlock title="使用者最在乎能掌握可預約的空間、時間與資訊">
        <p>結合「使用者預約行為用例分析」與「完成預約任務的用例分析」結果，把重要用例對應到三個預約流程頁面，並標注重要（藍）與次要（紫）用例。</p>
      </ArticleBlock>
      <FlowScrollHint label="左右滑動查看分層選單" />
      {NestedListBoard()}

      <ArticleBlock title="依重要用例設計三頁式預約流程">
        <p>讓使用者依序選擇想要的時間、空間、共同使用者，最後獲得成功預約的訊息。</p>
      </ArticleBlock>
      <FlowScrollHint label="左右滑動查看完整架構" />
      {IAFlow()}
    </CaseSection>
  );
}

function FlowSection() {
  return (
    <CaseSection id="cs-sec-flow" title="介面流程 Interface Flow" className="nccu-section">
      <ArticleBlock title="優先設計最重要的三個預約用例">
        <p>挑出最重要的三個用例進行介面流程設計，並以介面（黃色矩形）、行為（藍色圓形）、系統（紫色菱形）區分流程節點。</p>
      </ArticleBlock>
      {FlowLegend()}

      <FlowBlock kicker="用例一" title="使用者能夠一目瞭然看到可預約時間與空間">
        <p>首頁讓使用者快速篩選圖書館分館、空間與預約人數，再進入查看各空間可預約時段的頁面。</p>
        <FlowScrollHint label="左右滑動查看流程" />
        {UseCase1Flow()}
      </FlowBlock>

      <FlowBlock kicker="用例二" title="篩選時間、空間找到符合需求的空間後進行預約">
        <p>接續用例一，選好想要的時間空間，檢查是否登入後，確認預約資訊。</p>
        <FlowScrollHint label="左右滑動查看流程" />
        {UseCase2Flow()}
      </FlowBlock>

      <FlowBlock kicker="用例三" title="使用者能夠確認預約資訊並修改">
        <p>接續用例二，使用者可確認曾經預約的資訊並取消紀錄（此次不測試修改學號流程）。</p>
        <FlowScrollHint label="左右滑動查看流程" />
        {UseCase3Flow()}
      </FlowBlock>
    </CaseSection>
  );
}

function TestSection() {
  return (
    <CaseSection id="cs-sec-test" title="任務 & 易用性測試 Usability Test" surface className="nccu-section">
      <ArticleBlock title="低保真原型任務測試">
        <p>邀請 2 位受試者進行 low-fi prototype 測試，針對三個用例設計測試腳本，以放聲思考法觀察並記錄使用者執行任務時看到的資訊、感受與遇到的困難。</p>
      </ArticleBlock>

      <ArticleBlock kicker="迭代" title="任務測試結果與迭代">
        <p>使用者在任務二「查看討論室頁面」遇到最多困難——介面元件與資訊架構和使用者心理模型不太相符，因此主要針對「查看討論室頁面」做出以下調整：</p>
      </ArticleBlock>
      <ol className="nccu-iter-list">
        {testIterations.map((item, i) => (
          <li key={item.title}>
            <span className="nccu-iter-num">{`0${i + 1}`}</span>
            <div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <ArticleBlock kicker="SUS" title="易用性量表結果">
        <p>SUS Score：（67.5 + 87.5）／ 2 = 79.8（Good）。測試結果顯示，整體介面重新設計對使用者而言是容易理解與學習的。</p>
      </ArticleBlock>
      {SusTable()}
    </CaseSection>
  );
}

function BrandSection() {
  return (
    <CaseSection id="cs-sec-brand" title="品牌形象 Brand" className="nccu-section">
      <ArticleBlock title="以 NCCUSpace 重塑品牌形象">
        <p>把原有的政大場地管理系統，以 NCCUSpace 結合「政大」與「空間運用」命名，強調用簡單的預約步驟，提供輕鬆方便的空間預約體驗，讓學生更專注於工作與學習。未來也可整合政大各處室的空間預約與管理。</p>
      </ArticleBlock>
      <ul className="nccu-brand-points">
        {brandPoints.map((b) => (
          <li key={b.head}>
            <strong>{b.head}</strong>
            <span>{b.body}</span>
          </li>
        ))}
      </ul>
      <FlowScrollHint label="左右滑動查看品牌關鍵字" />
      {BrandMindmap()}
    </CaseSection>
  );
}

function FinalUiSection() {
  return (
    <CaseSection id="cs-sec-ui" title="最終 UI 成果 Final UI" surface className="nccu-section">
      <p className="cs-body-muted nccu-ui-intro">根據測試結果迭代完成 Hi-fi 原型，以下呈現三個核心用例的最終操作介面。</p>
      <div className="nccu-ui-list">
        {finalUI.map((ui) => (
          <figure className="nccu-ui-item" key={ui.tag}>
            <figcaption className="nccu-ui-cap">
              <span className="nccu-ui-tag">{ui.tag}</span>
              <span>{ui.title}</span>
            </figcaption>
            <ZoomableImage
              src={ui.src}
              alt={ui.alt}
              width={ui.w}
              height={ui.h}
              sizes="(max-width: 768px) calc(100vw - 48px), 1200px"
              labels={zoomLabels}
            />
          </figure>
        ))}
      </div>
    </CaseSection>
  );
}

function PosterSection() {
  return (
    <CaseSection id="cs-sec-poster" title="期末海報 Poster" className="nccu-section">
      <div className="nccu-poster">
        <ZoomableImage
          src={`${IMG}/poster.jpg`}
          alt="NCCUSpace 期末海報"
          width={1400}
          height={1982}
          sizes="(max-width: 768px) calc(100vw - 48px), 760px"
          labels={zoomLabels}
        />
      </div>
    </CaseSection>
  );
}

function ReflectionSection() {
  return (
    <CaseSection id="cs-sec-reflection" title="學習反思 Reflections" surface className="nccu-learning-section">
      <div className="nccu-learning-card">
        <ArticleBlock title="Redesign 需要從使用者的行為思考，而非只修改介面">
          <p>原先的介面雖然也能讓使用者成功預約討論室，但透過訪談我們發現，使用者都得先摸索一番才能習慣現有操作。因此我們把預約過程做了詳細的拆解與分析，對應訪談中的洞見重新設計新版介面，幫助使用者更快預約到想要的空間與時段。</p>
        </ArticleBlock>
      </div>
    </CaseSection>
  );
}

/* ── 共用小元件 ── */

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="nccu-info-card">
      <h4>{title}</h4>
      <p>{children}</p>
    </article>
  );
}

function ArticleBlock({ title, kicker, children }: { title: string; kicker?: string; children: ReactNode }) {
  return (
    <section className="nccu-article">
      {kicker ? <p className="nccu-kicker">{kicker}</p> : null}
      <h3>{title}</h3>
      <div className="nccu-copy">{children}</div>
    </section>
  );
}

function FlowBlock({ title, kicker, children }: { title: string; kicker?: string; children: ReactNode }) {
  return (
    <div className="nccu-flow-block">
      <div className="nccu-flow-head">
        {kicker ? <span className="nccu-flow-tag">{kicker}</span> : null}
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
}

function FlowLegend() {
  const items = [
    { tone: "blue", label: "行為（藍色圓形）" },
    { tone: "yellow", label: "介面（黃色矩形）" },
    { tone: "purple", label: "系統（紫色菱形）" },
  ];
  return (
    <div className="nccu-flow-legend">
      {items.map((it) => (
        <span className="nccu-flow-legend-item" key={it.label}>
          <span className={`nccu-flow-legend-dot nccu-flow-legend-dot--${it.tone}`} aria-hidden="true" />
          {it.label}
        </span>
      ))}
    </div>
  );
}
