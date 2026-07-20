import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import logo from '@assets/logos/hming.svg';

/* ═══════════════ BRAND TOKENS — 換公司只改這一區 ═══════════════ */
/* 值來源：themes/hming-portfolio.md（預設）或 themes/company-<公司>.md。
   套用公司品牌：複製本資料夾成 case-<案例>-<公司>，改本區塊＋上面的 logo import，頁面 JSX 不動。 */

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-case-advantech'; // 必須含 slide id，不可跨 deck 共用
if (typeof document !== 'undefined' && !document.getElementById(FONT_LINK_ID)) {
  const link = document.createElement('link');
  link.id = FONT_LINK_ID;
  link.rel = 'stylesheet';
  link.href = FONT_HREF;
  document.head.appendChild(link);
}

// Design panel AST 限制：palette 必須是字面值，禁止 spread / import
export const design: DesignSystem = {
  palette: { bg: '#ffffff', text: '#343434', accent: '#5d62d8' },
  fonts: {
    display: '"Space Grotesk", "PingFang TC", "Noto Sans TC", -apple-system, system-ui, sans-serif',
    body: '"Space Grotesk", "PingFang TC", "Noto Sans TC", -apple-system, system-ui, sans-serif',
  },
  typeScale: { hero: 120, body: 38 },
  radius: 12,
};

const muted = '#8e8e9c';
const line = 'rgba(0, 0, 0, 0.08)';
const surface = '#f9f9f9';
const accentSoft = '#f0f1ff';
const COMPANY = '【公司名】';
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

const Footer = ({ label = '黃宣銘 · 專案簡報' }: { label?: string }) => {
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
    <Eyebrow>CASE STUDY · {COMPANY} 面試</Eyebrow>
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
      Advantech AI Chatbot
    </h1>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, marginTop: 32, lineHeight: 1.5, maxWidth: 1300 }}>
      2.5 個月的 Early Design Campaign：從研究到 POC 提案，最終向 CEO 報告成果
    </p>
    <Footer />
  </div>
);

/* ---------- 專案脈絡 ---------- */

const InfoRow = ({ label, text }: { label: string; text: string }) => (
  <div style={{ display: 'flex', gap: 64, borderTop: `1px solid ${line}`, paddingTop: 36 }}>
    <div style={{ fontSize: 28, fontWeight: 600, color: 'var(--osd-accent)', width: 220, flexShrink: 0 }}>{label}</div>
    <div style={{ fontSize: 36, lineHeight: 1.5 }}>{text}</div>
  </div>
);

const Context: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>CONTEXT</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      專案脈絡
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 64 }}>
      <InfoRow label="背景" text="Advantech ECOWatch 的既定 GenAI 需求：探索 AI Chatbot 如何協助廠務使用者掌握用電狀況" />
      <InfoRow label="我的角色" text="在 PM 與正職設計師帶領下，與另一位設計實習生依 feature 分工；我負責超約預警與模式識別" />
      <InfoRow label="時程與產出" text="2.5 個月，完成期初、期中、期末三階段 POC 提案與迭代" />
    </div>
    <Footer />
  </div>
);

/* ---------- 問題 ---------- */

const Problem: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>PROBLEM</Eyebrow>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 76,
        fontWeight: 700,
        margin: 0,
        lineHeight: 1.3,
        maxWidth: 1500,
      }}
    >
      既定的 GenAI 需求，要落地成廠務使用者真正用得上的功能
    </h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 48, lineHeight: 1.6, maxWidth: 1300 }}>
      【需補充：訪談中聽到的實際痛點或情境，說明為什麼「掌握用電狀況」對廠務是個問題】
    </p>
    <Footer />
  </div>
);

/* ---------- 研究與洞察 ---------- */

const MethodChip = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 28,
      fontWeight: 600,
      padding: '12px 32px',
      background: accentSoft,
      color: 'var(--osd-accent)',
      borderRadius: 200,
      width: 'fit-content',
    }}
  >
    {children}
  </div>
);

const InsightRow = ({ index, text }: { index: string; text: string }) => (
  <div style={{ display: 'flex', gap: 40, borderTop: `1px solid ${line}`, paddingTop: 32, alignItems: 'baseline' }}>
    <span style={{ fontSize: 30, fontWeight: 700, color: 'var(--osd-accent)', width: 64, flexShrink: 0 }}>{index}</span>
    <span style={{ fontSize: 34, lineHeight: 1.55 }}>{text}</span>
  </div>
);

const Research: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>RESEARCH</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      研究與洞察
    </h2>
    <div style={{ display: 'flex', gap: 24, marginTop: 48 }}>
      <MethodChip>使用者訪談</MethodChip>
      <MethodChip>競品研究</MethodChip>
      <MethodChip>功能設計</MethodChip>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 56 }}>
      <InsightRow index="01" text="【需補充：訪談的關鍵發現，它支持了哪個功能方向】" />
      <InsightRow index="02" text="【需補充：競品研究的發現】" />
    </div>
    <Footer />
  </div>
);

/* ---------- 關鍵決策 ---------- */

const OptionCard = ({ label, title, desc, chosen }: { label: string; title: string; desc: string; chosen?: boolean }) => (
  <div
    style={{
      flex: 1,
      background: chosen ? accentSoft : surface,
      border: chosen ? '2px solid var(--osd-accent)' : `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '40px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}
  >
    <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '0.14em', color: chosen ? 'var(--osd-accent)' : muted }}>
      {label}
    </div>
    <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted }}>{desc}</div>
  </div>
);

const Decision: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>KEY DECISION</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      關鍵決策
    </h2>
    <div style={{ display: 'flex', gap: 48, marginTop: 56 }}>
      <OptionCard label="模式識別 · 續留 POC" title="模式識別" desc="價值與技術可行性都還不明確，維持 POC 繼續驗證" />
      <OptionCard label="超約預警 · 優先開發 ✓" title="超約預警" desc="訪談與競品研究都支持它最接近使用者痛點；PM 評估後採納，實習結束前啟動後端實作" chosen />
    </div>
    <p style={{ fontSize: 30, lineHeight: 1.6, marginTop: 48, maxWidth: 1400 }}>
      我的角色是把研究整理成 PM 能評估的方案，讓優先順序有依據——判斷有憑有據，拍板交給對的人。
    </p>
    <Footer />
  </div>
);

/* ---------- 解法展示 ---------- */

const Solution: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', gap: 100, alignItems: 'center' }}>
    <div style={{ width: 480, flexShrink: 0 }}>
      <Eyebrow>SOLUTION</Eyebrow>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
        最後長什麼樣
      </h2>
      <p style={{ fontSize: 30, lineHeight: 1.6, color: muted, marginTop: 40 }}>
        【需補充：畫面重點導覽——超約預警的互動流程如何回應廠務的使用情境】
      </p>
    </div>
    <ImagePlaceholder hint="超約預警或模式識別的 prototype 關鍵畫面" width={920} height={640} />
    <Footer />
  </div>
);

/* ---------- 成效 ---------- */

const ResultRow = ({ number, text }: { number: string; text: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ fontSize: 64, fontWeight: 700, color: 'var(--osd-accent)', fontFamily: 'var(--osd-font-display)' }}>
      {number}
    </div>
    <div style={{ fontSize: 30, lineHeight: 1.5, color: muted }}>{text}</div>
  </div>
);

const Results: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>IMPACT</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      做出了什麼改變
    </h2>
    <div style={{ display: 'flex', gap: 120, marginTop: 72 }}>
      <ResultRow number="3 階段" text="完成期初、期中、期末 POC 提案與迭代，最終向 CEO 報告" />
      <ResultRow number="獲採納" text="超約預警於實習結束前啟動後端實作" />
    </div>
    <p style={{ fontSize: 24, lineHeight: 1.5, color: muted, marginTop: 64 }}>
      ＊實習結束時兩項功能皆未正式上線：超約預警進入後端實作、模式識別停在 POC
    </p>
    <Footer />
  </div>
);

/* ---------- 反思 ---------- */

const ReflectRow = ({ lead, text }: { lead: string; text: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderTop: `1px solid ${line}`, paddingTop: 36 }}>
    <div style={{ fontSize: 38, fontWeight: 700, color: 'var(--osd-accent)' }}>{lead}</div>
    <div style={{ fontSize: 32, lineHeight: 1.55, color: muted }}>{text}</div>
  </div>
);

const Reflection: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>REFLECTION</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      如果重來一次
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44, marginTop: 64 }}>
      <ReflectRow lead="期中提案太快進入功能與 UI" text="預設聽眾都懂 ECOWatch 與廠務情境；非領域聽眾看得懂操作，卻不知道我們要解決什麼" />
      <ReflectRow lead="先講使用者與痛點，再進解法" text="期末版重組提案結構後，非領域聽眾也能跟上脈絡；之後的提案都照這個順序" />
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
      謝謝，歡迎追問細節
    </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 72 }}>
      <ContactRow label="PORTFOLIO" value="https://hmingdesign.com" />
      <ContactRow label="EMAIL" value="hmingdesigner@gmail.com" />
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '專案簡報 · Advantech AI Chatbot',
  theme: 'hming-portfolio',
  createdAt: '2026-07-19T06:46:22.184Z',
};

export default [Cover, Context, Problem, Research, Decision, Solution, Results, Reflection, End] satisfies Page[];
