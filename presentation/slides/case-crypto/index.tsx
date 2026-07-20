import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import logo from '@assets/logos/hming.svg';

/* ═══════════════ BRAND TOKENS — 換公司只改這一區 ═══════════════ */
/* 值來源：themes/hming-portfolio.md（預設）或 themes/company-<公司>.md。
   套用公司品牌：複製本資料夾成 case-<案例>-<公司>，改本區塊＋上面的 logo import，頁面 JSX 不動。 */

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-case-crypto'; // 必須含 slide id，不可跨 deck 共用
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
      Crypto 交易平台
    </h1>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, marginTop: 32, lineHeight: 1.5, maxWidth: 1300 }}>
      從助理 PO 到 Design System 與 RWD：把設計 handoff 和跨裝置體驗補起來
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
      <InfoRow label="背景" text="加密貨幣交易平台，前期以 1440／1920 桌機版為主的 desktop-first 開發" />
      <InfoRow label="我的角色" text="助理 PO 與 UIUX 設計師：DS 重整、RWD 補齊、UX 改善排序；Storybook 由前端工程師建置" />
      <InfoRow label="時程與產出" text="20+ user flows 的 DS 重整、20+ 頁 RWD 上線、12+ 項 UX 改善上線" />
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
      設計與前端各說各話：handoff 靠人工翻譯，跨裝置體驗有缺口
    </h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 48, lineHeight: 1.6, maxWidth: 1300 }}>
      Figma UI 與前端元件沒有共用 glossary，交付時要額外解釋哪些畫面能沿用既有元件；20 多個桌機頁面在平板與手機上沒有對應設計
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
      <MethodChip>使用者回饋整理</MethodChip>
      <MethodChip>20+ user flows 盤點</MethodChip>
      <MethodChip>既有元件盤點</MethodChip>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 56 }}>
      <InsightRow index="01" text="命名不一致是 handoff 最大的摩擦：同一個元件在 Figma 和 Storybook 叫不同名字，工程要重新翻譯" />
      <InsightRow index="02" text="交付的畫面大多用得上既有 Storybook 元件，缺的是兩邊命名的對應關係" />
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
      <OptionCard label="選項 A · 未採用" title="從零重建新系統" desc="聲勢大但成本高，也會丟掉前端已經實作好的 Storybook 資產" />
      <OptionCard label="選項 B · 採用 ✓" title="成熟化既有系統" desc="前端建 glossary 與 Storybook，我對齊 Figma 命名，交付圖面用圖釘標出對應元件" chosen />
    </div>
    <p style={{ fontSize: 30, lineHeight: 1.6, marginTop: 48, maxWidth: 1400 }}>
      不是從零建立系統，而是讓既有系統被正確使用——工程看到圖釘就能找到對應實作，handoff 不再需要翻譯。
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
        【需補充：畫面重點導覽——DS 重整前後對照，或 RWD 補齊前後的同一頁】
      </p>
    </div>
    <ImagePlaceholder hint="Design System 對照或 RWD 前後的關鍵截圖" width={920} height={640} />
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
      <ResultRow number="約 +44%" text="同期團隊每個 Sprint 完成的 ticket 約由 64 張增至 92 張" />
      <ResultRow number="20+ 頁" text="補齊桌機頁面的平板與手機版設計並正式上線" />
    </div>
    <p style={{ fontSize: 24, lineHeight: 1.5, color: muted, marginTop: 64 }}>
      ＊Sprint 數字為團隊同期變化的約數，不是我個人單獨的成效；待原始紀錄佐證
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
      <ReflectRow lead="【做錯的事】" text="【需補充：哪裡沒做好、當時為什麼會這樣做】" />
      <ReflectRow lead="【學到的事】" text="【需補充：後來怎麼修正、下次會怎麼做】" />
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
  title: '專案簡報 · Crypto 交易平台',
  theme: 'hming-portfolio',
  createdAt: '2026-07-19T06:46:22.184Z',
};

export default [Cover, Context, Problem, Research, Decision, Solution, Results, Reflection, End] satisfies Page[];
