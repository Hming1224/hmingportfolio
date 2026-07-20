import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import logo from '@assets/logos/demo.svg';

/* ═══════════════ BRAND TOKENS — 換公司只改這一區 ═══════════════ */
/* 值來源：themes/hming-portfolio.md（預設）或 themes/company-<公司>.md。
   套用公司品牌：複製本資料夾成 intro-<公司>，改本區塊＋上面的 logo import，頁面 JSX 不動。 */

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-intro-demo'; // 必須含 slide id，不可跨 deck 共用
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

// Design panel AST 限制：palette 必須是字面值，禁止 spread / import
export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: '#1f2723', accent: '#0d7a68' },
  fonts: {
    display: '"DM Sans", "PingFang TC", "Noto Sans TC", -apple-system, system-ui, sans-serif',
    body: '"DM Sans", "PingFang TC", "Noto Sans TC", -apple-system, system-ui, sans-serif',
  },
  typeScale: { hero: 148, body: 38 },
  radius: 12,
};

const muted = '#7d8a84';
const line = 'rgba(0, 0, 0, 0.08)';
const surface = '#f6faf8';
const accentSoft = '#e0f2ee';
const COMPANY = 'DemoCo';
/* ═══════════════════════════════════════════════════════════════ */

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
} as const;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--osd-accent)', marginBottom: 24 }}>
    {children}
  </div>
);

const Footer = ({ label = '黃宣銘 · 自我介紹' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 160,
        right: 160,
        bottom: 64,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        color: muted,
        borderTop: `1px solid ${line}`,
        paddingTop: 20,
      }}
    >
      <span>{label}</span>
      <span style={{ color: 'var(--osd-accent)' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

/* ---------- 封面 ---------- */

const Cover: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <img src={logo} style={{ position: 'absolute', top: 100, left: 160, height: 56 }} />
    <Eyebrow>INTERVIEW · {COMPANY} · 【YYYY.MM.DD】</Eyebrow>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        margin: 0,
      }}
    >
      黃宣銘 Hming
    </h1>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, marginTop: 32, lineHeight: 1.5 }}>
      產品設計師｜UIUX 設計師 · 【職缺名稱】面試簡報
    </p>
    <Footer />
  </div>
);

/* ---------- 今天想聊的 ---------- */

const AgendaRow = ({ index, text }: { index: string; text: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 40 }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--osd-accent)', width: 56 }}>{index}</span>
    <span style={{ fontSize: 40, lineHeight: 1.5 }}>{text}</span>
  </div>
);

const Agenda: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>AGENDA</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      今天想聊的
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 72 }}>
      <AgendaRow index="01" text="關於我 — 我是誰、擅長什麼" />
      <AgendaRow index="02" text="代表作品 — 兩個案例的重點總覽" />
      <AgendaRow index="03" text="我怎麼工作 — 流程與協作方式" />
      <AgendaRow index="04" text={`為什麼是我 — 我能為${COMPANY}帶來什麼`} />
    </div>
    <Footer />
  </div>
);

/* ---------- 關於我 ---------- */

const Keyword = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 32,
      fontWeight: 600,
      padding: '16px 40px',
      background: accentSoft,
      color: 'var(--osd-accent)',
      borderRadius: 200,
      width: 'fit-content',
    }}
  >
    {children}
  </div>
);

const About: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', gap: 100, alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <Eyebrow>ABOUT ME</Eyebrow>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 700, margin: 0, lineHeight: 1.35 }}>
        我擅長先把複雜問題拆清楚，再把研究變成 PM 和工程能一起往下做的設計決策
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 56 }}>
        <Keyword>使用者研究到產品決策</Keyword>
        <Keyword>設計系統與工程 handoff</Keyword>
        <Keyword>AI 協作開發</Keyword>
      </div>
    </div>
    <ImagePlaceholder hint="你的個人照片（半身、背景乾淨）" width={460} height={580} />
    <Footer />
  </div>
);

/* ---------- 我會的事 ---------- */

const SkillCard = ({ title, items }: { title: string; items: [string, string, string] }) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '48px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
    }}
  >
    <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--osd-accent)' }}>{title}</div>
    <div style={{ fontSize: 30, lineHeight: 1.5 }}>{items[0]}</div>
    <div style={{ fontSize: 30, lineHeight: 1.5 }}>{items[1]}</div>
    <div style={{ fontSize: 30, lineHeight: 1.5 }}>{items[2]}</div>
  </div>
);

const Skills: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>SKILLS</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      我會的事
    </h2>
    <div style={{ display: 'flex', gap: 48, marginTop: 72 }}>
      <SkillCard title="產品設計" items={['Wireframe 與 Prototype', 'Figma Design System 重整', '跨裝置 RWD 設計']} />
      <SkillCard title="使用者研究" items={['探索式訪談與訪綱設計', '競品分析', '研究綜整成產品決策']} />
      <SkillCard title="協作與推進" items={['Scrum 助理 PO・Jira', '設計 handoff 與元件標註', 'AI 協作開發']} />
    </div>
    <Footer />
  </div>
);

/* ---------- 代表作品總覽 ---------- */

const CaseCard = ({
  index,
  name,
  problem,
  result,
}: {
  index: string;
  name: string;
  problem: string;
  result: string;
}) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '48px 44px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
    }}
  >
    <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--osd-accent)' }}>{index}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 700, lineHeight: 1.25 }}>{name}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted }}>{problem}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, fontWeight: 600 }}>{result}</div>
  </div>
);

const CasesOverview: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>SELECTED WORK</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      代表作品
    </h2>
    <div style={{ display: 'flex', gap: 64, marginTop: 64 }}>
      <CaseCard
        index="作品一"
        name="Advantech AI Chatbot"
        problem="針對既定 GenAI 需求，探索 Chatbot 如何協助廠務使用者掌握用電狀況"
        result="2.5 個月完成三階段 POC 提案並向 CEO 報告，超約預警獲採納啟動後端實作"
      />
      <CaseCard
        index="作品二"
        name="Crypto 交易平台"
        problem="desktop-first 與雙邊命名不一致，造成 handoff 與跨裝置體驗缺口"
        result="重整 Design System、20+ 頁 RWD 上線，同期 Sprint 產出約 +44%（團隊約數）"
      />
    </div>
    <p style={{ fontSize: 26, color: muted, marginTop: 48 }}>兩個案例各有一份專案簡報，想深入哪個都可以。</p>
    <Footer />
  </div>
);

/* ---------- 我怎麼工作 ---------- */

const StepCard = ({ index, title, desc }: { index: string; title: string; desc: string }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, borderTop: `4px solid var(--osd-accent)`, paddingTop: 32 }}>
    <div style={{ fontSize: 26, fontWeight: 600, color: muted, letterSpacing: '0.12em' }}>{index}</div>
    <div style={{ fontSize: 38, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted }}>{desc}</div>
  </div>
);

const Process: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>HOW I WORK</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      我怎麼工作
    </h2>
    <div style={{ display: 'flex', gap: 56, marginTop: 88 }}>
      <StepCard index="STEP 1" title="搞懂問題" desc="用訪談和競品研究確認問題，必要時修正原本的假設" />
      <StepCard index="STEP 2" title="快速試" desc="先出 wireframe 和 prototype，讓團隊有具體東西可以討論" />
      <StepCard index="STEP 3" title="一起做" desc="用 Jira、prototype 影片和標註過的圖面做 handoff" />
      <StepCard index="STEP 4" title="看結果" desc="蒐集使用者回饋、排定優先級，持續迭代" />
    </div>
    <Footer />
  </div>
);

/* ---------- 為什麼是我 ---------- */

const ReasonRow = ({ lead, text }: { lead: string; text: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: `1px solid ${line}`, paddingTop: 36 }}>
    <div style={{ fontSize: 40, fontWeight: 700 }}>
      <span style={{ color: 'var(--osd-accent)' }}>{lead}</span>
    </div>
    <div style={{ fontSize: 32, lineHeight: 1.5, color: muted }}>{text}</div>
  </div>
);

const WhyMe: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>WHY ME</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      為什麼是我 × {COMPANY}
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 72 }}>
      <ReasonRow lead="【理由一】" text="【需補充：對應職缺需求的具體能力或經驗】" />
      <ReasonRow lead="【理由二】" text="【需補充：你做過最接近這個職缺的事】" />
      <ReasonRow lead="【理由三】" text="【需補充：你對這間公司產品的觀察或想法】" />
    </div>
    <Footer />
  </div>
);

/* ---------- 結尾 ---------- */

const ContactRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{ display: 'flex', gap: 48, alignItems: 'baseline' }}>
    <span style={{ fontSize: 26, fontWeight: 600, color: 'var(--osd-accent)', letterSpacing: '0.12em', width: 180 }}>
      {label}
    </span>
    <span style={{ fontSize: 36 }}>{value}</span>
  </div>
);

const End: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>THANK YOU</Eyebrow>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 120,
        fontWeight: 700,
        margin: 0,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
      }}
    >
      謝謝，期待一起工作
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 72 }}>
      <ContactRow label="PORTFOLIO" value="https://hmingdesign.com" />
      <ContactRow label="EMAIL" value="hmingdesigner@gmail.com" />
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '自我介紹 · DemoCo（品牌切換示範）',
  theme: 'company-demo',
  createdAt: '2026-07-18T19:28:36.771Z',
};

export default [Cover, Agenda, About, Skills, CasesOverview, Process, WhyMe, End] satisfies Page[];
