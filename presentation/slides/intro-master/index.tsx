import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import logo from '@assets/logos/hming.svg';
import cursorArrow from '@assets/decorations/cursor-arrow.svg';
import cursorEngineers from '@assets/decorations/cursor-engineers.svg';
import cursorPm from '@assets/decorations/cursor-pm.svg';

/* ═══════════════ BRAND TOKENS — 換公司只改這一區 ═══════════════ */
/* 值來源：themes/hming-portfolio.md（預設）或 themes/company-<公司>.md。
   套用公司品牌：複製本資料夾成 intro-<公司>，改本區塊＋上面的 logo import，頁面 JSX 不動。 */

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-intro-master'; // 必須含 slide id，不可跨 deck 共用
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
  typeScale: { hero: 148, body: 38 },
  radius: 12,
};

const muted = '#8e8e9c';
const line = 'rgba(0, 0, 0, 0.08)';
const surface = '#f9f9f9';
const accentSoft = '#f0f1ff';
const COMPANY = '【公司名】';
/* ═══════════════════════════════════════════════════════════════ */

/* ── 動畫語彙：全部移植自 hmingdesign.com（styles/tokens.css、home.css）──
   shimmer 徽章、heroShine 流光、游標標籤彈簧射入＋漂浮、fadeUp、卡片 hover 浮起。
   scoped `im-` 前綴，module top-level 注入一次。 */
const STYLE_ID = 'osd-anim-intro-master';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
@property --im-shimmer { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
@keyframes im-shimmer-rotate { to { --im-shimmer: 360deg; } }
@keyframes im-fadeup { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes im-shine { 0% { background-position: 150% center; } 100% { background-position: -50% center; } }
@keyframes im-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes im-shoot-tr { from { opacity: 0; transform: translate(110px, -70px); } to { opacity: 1; transform: translate(0, 0); } }
@keyframes im-shoot-r { from { opacity: 0; transform: translate(140px, 0); } to { opacity: 1; transform: translate(0, 0); } }
@keyframes im-shoot-bl { from { opacity: 0; transform: translate(-90px, 100px); } to { opacity: 1; transform: translate(0, 0); } }
@keyframes im-shoot-l { from { opacity: 0; transform: translate(-140px, 0); } to { opacity: 1; transform: translate(0, 0); } }
.im-fadeup { animation: im-fadeup 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.im-shine {
  color: transparent;
  background: linear-gradient(120deg, #4f54c9 0%, #4f54c9 35%, #c1c3ff 50%, #4f54c9 65%, #4f54c9 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  animation: im-shine 3.5s linear infinite;
}
.im-shimmer-wrap {
  display: inline-flex;
  padding: 2px;
  border-radius: 200px;
  background: conic-gradient(from var(--im-shimmer), transparent 0%, transparent 38%, #c4b5fd 47%, #5d62d8 52%, transparent 62%, transparent 100%);
  animation: im-shimmer-rotate 3s linear infinite;
}
.im-shimmer-wrap--band { display: block; border-radius: 14px; }
.im-float { animation: im-float 4s ease-in-out infinite; }
.im-shoot-tr { animation: im-shoot-tr 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 150ms both, im-float 4s ease-in-out 1s infinite; }
.im-shoot-r { animation: im-shoot-r 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 300ms both, im-float 4s ease-in-out 1.15s infinite; }
.im-shoot-bl { animation: im-shoot-bl 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 450ms both, im-float 4s ease-in-out 1.3s infinite; }
.im-duty-l { animation: im-shoot-l 600ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both; }
.im-duty-r { animation: im-shoot-r 600ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both; }
.im-lift { transition: transform 180ms ease, box-shadow 180ms ease; }
.im-lift:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.10); }
.im-lift:hover .im-arrow { transform: translate(4px, -4px); }
.im-arrow { display: inline-block; transition: transform 180ms ease; }
@media (prefers-reduced-motion: reduce) {
  [class^='im-'], [class*=' im-'] { animation: none !important; transition: none !important; }
}
/* PDF 匯出／列印：跳過所有進場動畫，直接呈現完成態 */
@media print {
  [class^='im-'], [class*=' im-'] { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;
  document.head.appendChild(style);
}

// 全 deck 統一轉場：RISE（安靜的上浮＋淡入）；封面用 SETTLE（多一絲 blur），同一家族
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
} as const;

/* ── Icon 系統：lucide 風格 inline SVG（與網站 about 頁 icon 同語系），不引入套件 ── */
const ICON_PATHS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  branch: (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  send: (
    <>
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </>
  ),
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </>
  ),
  pentool: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  usercheck: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" />
    </>
  ),
  box: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  bulb: (
    <>
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22 6 12 13 2 6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
};

const Icon = ({ name, size = 32, color = 'var(--osd-accent)' }: { name: string; size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {ICON_PATHS[name]}
  </svg>
);

// 卡片頂的 icon 方塊（accentSoft 底＋圓角，同網站 skill 卡）
const IconChip = ({ name }: { name: string }) => (
  <div
    style={{
      width: 72,
      height: 72,
      borderRadius: 'var(--osd-radius)',
      background: accentSoft,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Icon name={name} size={36} />
  </div>
);

// 標題下的紫色短分隔線，給每頁一個穩定的節奏錨點
const HeadingRule = () => (
  <div style={{ width: 64, height: 5, borderRadius: 3, background: 'var(--osd-accent)', marginTop: 28 }} />
);

// 網站 tabs 的雙層柔和陰影配方
const cardShadow = '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.06)';

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--osd-accent)', marginBottom: 24 }}>
    {children}
  </div>
);

const Footer = ({ label = '黃宣銘 · 自我介紹' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <>
      {/* 進度條＝網站頂部 scroll progress bar 的簡報版（紫 → 黑漸層） */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 6,
          width: `${(current / total) * 100}%`,
          background: 'linear-gradient(to right, var(--osd-accent), #000000)',
          transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
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
    </>
  );
};

/* ---------- 封面：定位 ---------- */

// 網站 hero 的 Figma 游標標籤：使用者／工程／商業三方，呼應「站在中間翻譯」的定位
const CursorTag = ({
  text,
  color,
  icon,
  className,
  style,
}: {
  text: string;
  color: string;
  icon: string;
  className: string;
  style: React.CSSProperties;
}) => (
  <div className={className} style={{ position: 'absolute', zIndex: 3, pointerEvents: 'none', ...style }}>
    <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 10 }}>
      <img src={icon} style={{ width: 30, height: 40 }} />
      <span
        style={{
          padding: '8px 22px',
          borderRadius: 999,
          fontSize: 26,
          fontWeight: 600,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          background: color,
          marginTop: 26,
        }}
      >
        {text}
      </span>
    </span>
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', gap: 100, alignItems: 'center', overflow: 'hidden' }}>
    <img src={logo} className="im-fadeup" style={{ position: 'absolute', top: 100, left: 160, height: 56 }} />
    <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
      <div className="im-fadeup" style={{ animationDelay: '80ms' }}>
        <span className="im-shimmer-wrap" style={{ marginBottom: 32 }}>
          <span
            style={{
              display: 'inline-flex',
              padding: '12px 32px',
              borderRadius: 200,
              background: '#f3f1ff',
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'var(--osd-accent)',
            }}
          >
            INTERVIEW · {COMPANY} · 【YYYY.MM.DD】
          </span>
        </span>
      </div>
      <p
        className="im-fadeup"
        style={{ fontSize: 44, fontWeight: 700, margin: '36px 0 0', fontFamily: 'var(--osd-font-display)', animationDelay: '160ms' }}
      >
        黃宣銘 Hming Huang
      </p>
      <h1
        className="im-fadeup"
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          margin: '28px 0 0',
          animationDelay: '240ms',
        }}
      >
        把複雜的產品問題，轉成團隊能一起推進的<span className="im-shine">設計決策</span>
      </h1>
      <p className="im-fadeup" style={{ fontSize: 32, color: muted, marginTop: 36, lineHeight: 1.5, animationDelay: '320ms' }}>
        Product Designer · 複雜 B2B 產品 · 【職缺名稱】面試簡報
      </p>
    </div>
    {/* 照片後的紫色量塊，給右半邊一點深度 */}
    <div
      style={{
        position: 'absolute',
        right: 100,
        top: 200,
        width: 560,
        height: 560,
        borderRadius: '50%',
        background: accentSoft,
        zIndex: 0,
      }}
    />
    <div className="im-fadeup" style={{ position: 'relative', zIndex: 1, animationDelay: '200ms' }}>
      <ImagePlaceholder hint="你的個人照片（半身、背景乾淨）" width={420} height={520} />
    </div>
    <CursorTag text="使用者洞察" color="#4B7BEC" icon={cursorArrow} className="im-shoot-tr" style={{ right: 490, top: 214 }} />
    <CursorTag text="工程可行性" color="#26DE81" icon={cursorEngineers} className="im-shoot-r" style={{ right: 96, top: 700 }} />
    <CursorTag text="商業目標" color="#FD9644" icon={cursorPm} className="im-shoot-bl" style={{ right: 556, top: 806 }} />
    <Footer />
  </div>
);

/* ---------- 背景如何形成視角 ---------- */

const PathCard = ({ index, title, desc, icon, delay = 0 }: { index: string; title: string; desc: string; icon: string; delay?: number }) => (
  <div
    className="im-fadeup"
    style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, borderTop: `4px solid var(--osd-accent)`, paddingTop: 32, animationDelay: `${delay}ms` }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon name={icon} size={30} />
      <span style={{ fontSize: 26, fontWeight: 600, color: muted, letterSpacing: '0.12em' }}>{index}</span>
    </div>
    <div style={{ fontSize: 38, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted }}>{desc}</div>
  </div>
);

const Background: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>BACKGROUND</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 700, margin: 0, lineHeight: 1.3, maxWidth: 1500 }}>
      我習慣站在使用者、產品與工程之間，把彼此的語言轉成可執行的決策
    </h2>
    <HeadingRule />
    <div style={{ display: 'flex', gap: 56, marginTop: 88 }}>
      <PathCard index="機械工程" icon="wrench" title="從系統看問題" desc="習慣從結構、系統與限制理解一個問題長什麼樣" delay={120} />
      <PathCard index="電子代工專案管理" icon="clipboard" title="理解怎麼交付" desc="排程、依賴與跨部門協作，知道一件事要上線得過哪些關" delay={240} />
      <PathCard index="產品設計" icon="pentool" title="翻譯成體驗" desc="把需求、研究與限制，轉成使用者好懂、工程能做的設計" delay={360} />
    </div>
    <Footer />
  </div>
);

/* ---------- 核心能力與案例證據 ---------- */

const AbilityCard = ({ title, desc, evidence, icon, delay = 0 }: { title: string; desc: string; evidence: string; icon: string; delay?: number }) => (
  <div
    className="im-fadeup im-lift"
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '44px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <IconChip name={icon} />
    <div style={{ fontSize: 36, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted }}>{desc}</div>
    <div style={{ fontSize: 26, lineHeight: 1.55, color: 'var(--osd-accent)', fontWeight: 600, marginTop: 'auto' }}>
      {evidence}
    </div>
  </div>
);

const Abilities: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>WHAT I DO BEST</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      拆清楚問題、轉成決策、推進上線
    </h2>
    <HeadingRule />
    <div style={{ display: 'flex', gap: 48, marginTop: 64 }}>
      <AbilityCard
        icon="search"
        title="拆解複雜問題"
        desc="整理使用者、商業與技術限制，確認真正要解的問題"
        evidence="Advantech：訪談把被動問答的 Chatbot，收斂成主動決策支援"
        delay={120}
      />
      <AbilityCard
        icon="branch"
        title="把研究轉成決策"
        desc="讓研究不停在洞察，而是影響優先順序與設計方向"
        evidence="Advantech：以超約預警與模式識別，把研究變成 PM 能評估的方案"
        delay={240}
      />
      <AbilityCard
        icon="send"
        title="推進到可交付"
        desc="用 prototype、Design System 與 handoff，把設計推到可驗證、可上線"
        evidence="Crypto Arsenal：核心交易流程與 20+ 頁 RWD 上線，對齊 Storybook 命名"
        delay={360}
      />
    </div>
    <Footer />
  </div>
);

/* ---------- 案例鉤子：兩案各證明一件事 ---------- */

const CaseCard = ({
  name,
  tag,
  hook,
  role,
  status,
  delay = 0,
}: {
  name: string;
  tag: string;
  hook: string;
  role: string;
  status: string;
  delay?: number;
}) => (
  <div
    className="im-fadeup im-lift"
    style={{
      flex: 1,
      position: 'relative',
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '48px 44px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      boxShadow: cardShadow,
      animationDelay: `${delay}ms`,
    }}
  >
    <span className="im-arrow" style={{ position: 'absolute', top: 40, right: 44, fontSize: 40, color: 'var(--osd-accent)' }}>
      ↗
    </span>
    <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--osd-accent)' }}>{tag}</div>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 700, lineHeight: 1.25 }}>{name}</div>
    <div style={{ fontSize: 30, lineHeight: 1.55 }}>{hook}</div>
    <div style={{ fontSize: 24, lineHeight: 1.5, color: muted, marginTop: 'auto' }}>{role}</div>
    <div style={{ fontSize: 24, lineHeight: 1.5, color: muted }}>{status}</div>
  </div>
);

const CasesOverview: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>SELECTED WORK</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 72, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      兩個案例，各證明一件事
    </h2>
    <HeadingRule />
    <div style={{ display: 'flex', gap: 64, marginTop: 64 }}>
      <CaseCard
        name="Advantech AI Chatbot"
        tag="產品判斷與研究轉化"
        hook="訪談讓 AI 從等人提問，轉向主動提醒該先處理什麼。"
        role="2024 · UIUX 設計實習生 · 2.5 個月"
        status="三階段 POC；超約預警於實習結束前啟動後端實作"
        delay={120}
      />
      <CaseCard
        name="Crypto Arsenal"
        tag="跨職能推進與正式上線"
        hook="把站外手動操作搬回產品內，並對齊設計與工程的元件語言。"
        role="2023 · UIUX & PM 實習生 · 8 個月"
        status="核心交易流程與 20+ 個 RWD 頁面正式上線"
        delay={240}
      />
    </div>
    <p style={{ fontSize: 26, color: muted, marginTop: 48 }}>接下來可依職缺需求，深入其中一個案例。</p>
    <Footer />
  </div>
);

/* ---------- AI 與本人的責任邊界 ---------- */

const DutyItem = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, lineHeight: 1.5 }}>
    <Icon name="check" size={26} />
    <span>{text}</span>
  </div>
);

const DutyCard = ({ title, items, icon, entrance }: { title: string; items: [string, string, string, string]; icon: string; entrance: string }) => (
  <div
    className={entrance}
    style={{
      flex: 1,
      background: surface,
      border: `1px solid ${line}`,
      borderRadius: 'var(--osd-radius)',
      padding: '44px 48px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      boxShadow: cardShadow,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700, color: 'var(--osd-accent)' }}>
      <Icon name={icon} size={34} />
      <span>{title}</span>
    </div>
    <DutyItem text={items[0]} />
    <DutyItem text={items[1]} />
    <DutyItem text={items[2]} />
    <DutyItem text={items[3]} />
  </div>
);

const AiBoundary: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>WORKING WITH AI</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 700, margin: 0, lineHeight: 1.3, maxWidth: 1500 }}>
      AI 可以加速執行，但問題、取捨與最後責任不能外包
    </h2>
    <HeadingRule />
    <div style={{ display: 'flex', gap: 48, marginTop: 64 }}>
      <DutyCard title="我負責" icon="usercheck" items={['定義問題與目標', '優先順序與設計取捨', '訂驗收條件', '最終品質與責任']} entrance="im-duty-l" />
      <DutyCard title="AI 協助" icon="cpu" items={['大量盤點與整理', '規格清楚的執行', '重複性的產出', '指定項目的檢查']} entrance="im-duty-r" />
    </div>
    <Footer />
  </div>
);

/* ---------- 公司／JD 客製收尾＋轉場 ---------- */

const FitRow = ({ lead, text, icon, delay = 0 }: { lead: string; text: string; icon: string; delay?: number }) => (
  <div className="im-fadeup" style={{ display: 'flex', gap: 64, borderTop: `1px solid ${line}`, paddingTop: 32, animationDelay: `${delay}ms` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 600, color: 'var(--osd-accent)', width: 240, flexShrink: 0 }}>
      <Icon name={icon} size={28} />
      <span>{lead}</span>
    </div>
    <div style={{ fontSize: 32, lineHeight: 1.5 }}>{text}</div>
  </div>
);

const FitClose: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>WHY THIS ROLE</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
      這些能力，剛好對上{COMPANY}現在要解的題
    </h2>
    <HeadingRule />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 56 }}>
      <FitRow lead="我觀察到" icon="eye" text="【公司產品】正在處理【需補充：產品或市場挑戰】" delay={120} />
      <FitRow lead="這個職缺需要" icon="target" text="【需補充：職缺的核心需求】" delay={240} />
      <FitRow lead="我能帶進來的" icon="briefcase" text="我在【相關案例】做過【需補充：對應的經驗】，可以直接用在【需補充：對方的哪件事】" delay={360} />
    </div>
    <Footer />
  </div>
);

/* ---------- 加入後的前六週（What）＋轉場 ---------- */

const WhatNext: Page = () => (
  <div style={{ ...fill, padding: '120px 160px' }}>
    <Eyebrow>FIRST 6 WEEKS</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
      加入後的前六週，我會這樣開始
    </h2>
    <HeadingRule />
    <div style={{ display: 'flex', gap: 56, marginTop: 56 }}>
      <PathCard index="第 1–2 週" icon="search" title="理解產品與用戶" desc="深入研究【公司產品】的既有流程，釐清體驗痛點，建立基本判斷" delay={120} />
      <PathCard index="第 3–4 週" icon="box" title="接手完整任務" desc="在真實的工作流程裡，找到自己能發揮的節奏和位置" delay={240} />
      <PathCard index="第 5–6 週" icon="bulb" title="提出具體建議" desc="研究競品、找出差異化機會，整理成能和團隊討論的建議" delay={360} />
    </div>
    <p className="im-fadeup" style={{ fontSize: 26, lineHeight: 1.55, color: muted, marginTop: 40, maxWidth: 1500, animationDelay: '480ms' }}>
      計畫會依團隊階段彈性調整；也不確定這些方向和你們現在的規劃有多少交集，最後問答想多了解團隊目前的重心。
    </p>
    {/* 轉場帶套上與封面徽章同款的 shimmer 邊框，首尾呼應 */}
    <div className="im-fadeup" style={{ marginTop: 40, animationDelay: '600ms' }}>
      <div className="im-shimmer-wrap im-shimmer-wrap--band">
        <div
          style={{
            background: accentSoft,
            borderRadius: 'var(--osd-radius)',
            padding: '32px 44px',
            fontSize: 32,
            lineHeight: 1.5,
            fontWeight: 600,
            color: 'var(--osd-accent)',
          }}
        >
          接下來，我想用【主案例】說明我是如何做判斷、取捨並推進交付。
        </div>
      </div>
    </div>
    <div
      className="im-fadeup"
      style={{ display: 'flex', alignItems: 'center', gap: 40, fontSize: 24, color: muted, marginTop: 36, animationDelay: '700ms' }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <Icon name="globe" size={24} color={muted} />
        hmingdesign.com
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <Icon name="mail" size={24} color={muted} />
        hmingdesigner@gmail.com
      </span>
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: '自我介紹公版',
  theme: 'hming-portfolio',
  createdAt: '2026-07-18T19:28:36.771Z',
};

export default [Cover, Background, Abilities, CasesOverview, AiBoundary, FitClose, WhatNext] satisfies Page[];
