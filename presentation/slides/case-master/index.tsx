import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import logo from '@assets/logos/hming.svg';

/* ═══════════════ BRAND TOKENS — 換公司只改這一區 ═══════════════ */
/* 值來源：themes/hming-portfolio.md（預設）或 themes/company-<公司>.md。
   套用公司品牌：複製本資料夾成 case-<案例>-<公司>，改本區塊＋上面的 logo import，頁面 JSX 不動。 */

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-case-master'; // 必須含 slide id，不可跨 deck 共用
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
      【專案名稱】
    </h1>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, marginTop: 32, lineHeight: 1.5, maxWidth: 1300 }}>
      【一句話定位：這個專案解了什麼、我在其中的角色】
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
      <InfoRow label="背景" text="【需補充：產品是什麼、當時發生什麼事】" />
      <InfoRow label="我的角色" text="【需補充：負責哪一段、跟誰合作、角色邊界】" />
      <InfoRow label="時程與產出" text="【需補充：多久、交付了什麼】" />
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
      【需補充：一句話說出核心問題，讓面試官立刻懂為什麼值得解】
    </h2>
    <p style={{ fontSize: 34, color: muted, marginTop: 48, lineHeight: 1.6, maxWidth: 1300 }}>
      【需補充：問題的證據——誰受影響、影響多大、不解會怎樣】
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
      <MethodChip>【方法一】</MethodChip>
      <MethodChip>【方法二】</MethodChip>
      <MethodChip>【方法三】</MethodChip>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 56 }}>
      <InsightRow index="01" text="【需補充：關鍵發現一，以及它推翻或確認了什麼】" />
      <InsightRow index="02" text="【需補充：關鍵發現二】" />
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
      <OptionCard label="選項 A · 未採用" title="【方案 A】" desc="【需補充：為什麼不選——代價或風險】" />
      <OptionCard label="選項 B · 採用 ✓" title="【方案 B】" desc="【需補充：為什麼選——判斷依據】" chosen />
    </div>
    <p style={{ fontSize: 30, lineHeight: 1.6, marginTop: 48, maxWidth: 1400 }}>
      【需補充：一句話總結取捨邏輯，展現你的判斷而不只是執行】
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
        【需補充：畫面重點導覽——請面試官看哪裡、這個設計如何回應前面的決策】
      </p>
    </div>
    <ImagePlaceholder hint="【關鍵畫面截圖：最能代表解法的那一頁】" width={920} height={640} />
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
      <ResultRow number="【數字一】" text="【需補充：這個數字代表什麼、怎麼算的】" />
      <ResultRow number="【數字二】" text="【需補充：質化回饋也可以】" />
    </div>
    <p style={{ fontSize: 24, lineHeight: 1.5, color: muted, marginTop: 64 }}>
      ＊【誠信註記：數字的口徑與限制——是團隊成果還是個人、有沒有原始紀錄佐證】
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
  title: '專案介紹公版',
  theme: 'hming-portfolio',
  createdAt: '2026-07-19T06:46:22.184Z',
};

export default [Cover, Context, Problem, Research, Decision, Solution, Results, Reflection, End] satisfies Page[];
