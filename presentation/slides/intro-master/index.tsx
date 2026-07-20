import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { ImagePlaceholder, useSlidePageNumber } from '@open-slide/core';
import logo from '@assets/logos/hming.svg';
import cursorArrow from '@assets/decorations/cursor-arrow.svg';
import cursorEngineers from '@assets/decorations/cursor-engineers.svg';
import cursorPm from '@assets/decorations/cursor-pm.svg';
import contactHero from './assets/contact-hero.webp';
import advantechLogo from './assets/advantech-logo.png';
import avatarYellow from './assets/avatar-yellow.png';
import claudeAgent from './assets/claude-agent.svg';
import codexAgent from './assets/codex-agent.svg';
import cryptoArsenalLogo from './assets/crypto-arsenal-logo.png';
import figmaApp from './assets/figma-app.png';
import hackathonPhoto from './assets/hackathon.jpg';
import nccuPhoto from './assets/nccu-ta.jpg';
import openhciPhoto from './assets/openhci.jpg';
import profileSuit from './assets/profile-suit.png';
import tbaLogo from './assets/tba-logo.png';

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
if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById(STYLE_ID);
  const style = existingStyle instanceof HTMLStyleElement ? existingStyle : document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
@property --im-shimmer { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
@keyframes im-shimmer-rotate { to { --im-shimmer: 360deg; } }
@keyframes im-fadeup { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes im-shine { 0% { background-position: 150% center; } 100% { background-position: -50% center; } }
@keyframes im-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes im-float-reverse { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
@keyframes im-node-ripple { 0% { opacity: .68; transform: scale(.72); } 75%, 100% { opacity: 0; transform: scale(1.65); } }
@keyframes im-agent-pop { from { opacity: 0; transform: scale(.52); } to { opacity: 1; transform: scale(1); } }
@keyframes im-shoot-tl { from { opacity: 0; transform: translate(-110px, -70px); } to { opacity: 1; transform: translate(0, 0); } }
@keyframes im-shoot-tr { from { opacity: 0; transform: translate(110px, -70px); } to { opacity: 1; transform: translate(0, 0); } }
@keyframes im-shoot-r { from { opacity: 0; transform: translate(140px, 0); } to { opacity: 1; transform: translate(0, 0); } }
@keyframes im-shoot-br { from { opacity: 0; transform: translate(110px, 70px); } to { opacity: 1; transform: translate(0, 0); } }
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
.im-node-ripple { animation: im-node-ripple 2.4s ease-out infinite; }
.im-node-ripple--delay { animation-delay: 1.2s; }
.im-shoot-tr { animation: im-shoot-tr 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 150ms both, im-float 4s ease-in-out 1s infinite; }
.im-shoot-r { animation: im-shoot-r 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 300ms both, im-float 4s ease-in-out 1.15s infinite; }
.im-shoot-bl { animation: im-shoot-bl 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 450ms both, im-float 4s ease-in-out 1.3s infinite; }
.im-agent-pop { animation: im-agent-pop 650ms cubic-bezier(0.34, 1.56, 0.64, 1) 150ms both, im-float-reverse 4s ease-in-out 950ms infinite; }
.im-cursor-tl { animation: im-shoot-tl 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 180ms both, im-float 4s ease-in-out 1.03s infinite; }
.im-cursor-br { animation: im-shoot-br 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 180ms both, im-float 4s ease-in-out 1.03s infinite; }
.im-cursor-bl { animation: im-shoot-bl 750ms cubic-bezier(0.34, 1.56, 0.64, 1) 180ms both, im-float 4s ease-in-out 1.03s infinite; }
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
  if (!existingStyle) document.head.appendChild(style);
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
  layers: (
    <>
      <polygon points="12 2 22 8.5 12 15 2 8.5" />
      <polyline points="2 15.5 12 22 22 15.5" />
      <polyline points="2 12 12 18.5 22 12" />
    </>
  ),
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
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
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
      <img src={icon} alt="" style={{ width: 30, height: 40 }} />
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

const AgentGlyph = ({ src, alt, size, iconSize, entrance, style }: { src: string; alt: string; size: number; iconSize: number; entrance: string; style: React.CSSProperties }) => (
  <div
    className={entrance}
    style={{
      position: 'absolute',
      zIndex: 2,
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.21),
      background: '#ffffff',
      border: `1px solid ${line}`,
      boxShadow: '0 12px 32px rgba(52, 52, 52, .14)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    <img src={src} alt={alt} style={{ width: iconSize, height: iconSize, display: 'block' }} />
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, padding: '120px 160px', display: 'flex', gap: 100, alignItems: 'center', overflow: 'hidden' }}>
    <img src={logo} alt="Hming" className="im-fadeup" style={{ position: 'absolute', top: 100, left: 160, height: 56 }} />
    <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
      <div className="im-fadeup" style={{ animationDelay: '80ms' }}>
        <span className="im-shimmer-wrap">
          <span
            style={{
              display: 'inline-flex',
              padding: '11px 28px',
              borderRadius: 200,
              background: '#f3f1ff',
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: '0.14em',
              color: 'var(--osd-accent)',
            }}
          >
            INTERVIEW · 2026.07.XX
          </span>
        </span>
      </div>
      <p
        className="im-fadeup"
        style={{ fontSize: 84, fontWeight: 700, margin: '36px 0 0', lineHeight: 1.12, fontFamily: 'var(--osd-font-display)', letterSpacing: '-0.02em', animationDelay: '140ms' }}
      >
        黃宣銘 Brian Huang
      </p>
      <h1
        className="im-fadeup"
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          margin: '24px 0 0',
          animationDelay: '200ms',
        }}
      >
        <span className="im-shine">Product Designer</span>
      </h1>
    </div>
    {/* 照片後的紫色量塊，給右半邊一點深度 */}
    <div
      style={{
        position: 'absolute',
        right: 180,
        top: 200,
        width: 560,
        height: 560,
        borderRadius: '50%',
        background: accentSoft,
        zIndex: 0,
      }}
    />
    <div className="im-fadeup" style={{ position: 'relative', right: 80, zIndex: 1, width: 500, height: 660, marginTop: 94, flexShrink: 0, animationDelay: '200ms' }}>
      <img src={profileSuit} alt="黃宣銘西裝形象照" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', display: 'block' }} />
    </div>
    <AgentGlyph src={figmaApp} alt="Figma" size={72} iconSize={42} entrance="im-agent-pop" style={{ right: 420, top: 166, animationDelay: '270ms, 1070ms' }} />
    <AgentGlyph src={claudeAgent} alt="Claude" size={108} iconSize={68} entrance="im-agent-pop" style={{ right: 158, top: 320, animationDelay: '240ms, 1040ms' }} />
    <AgentGlyph src={codexAgent} alt="Codex" size={90} iconSize={54} entrance="im-agent-pop" style={{ right: 660, top: 600, animationDelay: '150ms, 950ms' }} />
    <CursorTag text="使用者洞察" color="#4B7BEC" icon={cursorArrow} className="im-cursor-tl" style={{ right: 570, top: 214, animationDelay: '300ms, 1150ms' }} />
    <CursorTag text="工程可行性" color="#26DE81" icon={cursorEngineers} className="im-cursor-br" style={{ right: 120, top: 700, animationDelay: '210ms, 1060ms' }} />
    <CursorTag text="商業目標" color="#FD9644" icon={cursorPm} className="im-cursor-bl" style={{ right: 636, top: 806, animationDelay: '180ms, 1030ms' }} />
    <Footer />
  </div>
);

/* ---------- P2：About Me 的背景故事＋設計信念 ---------- */

const DesignValueCard = ({ icon, title, desc, color, soft, delay }: { icon: string; title: string; desc: string; color: string; soft: string; delay: string }) => (
  <div className="im-fadeup im-lift" style={{ position: 'relative', minWidth: 0, height: 430, padding: '34px 30px', borderRadius: 16, background: surface, border: `1px solid ${line}`, boxShadow: cardShadow, overflow: 'hidden', animationDelay: delay }}>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 6, background: color }} />
    <div style={{ width: 64, height: 64, borderRadius: 14, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon name={icon} size={31} color={color} />
    </div>
    <div style={{ fontSize: 31, lineHeight: 1.3, fontWeight: 700, color, marginTop: 30 }}>{title}</div>
    <div style={{ fontSize: 23, lineHeight: 1.55, color: muted, marginTop: 22 }}>{desc}</div>
  </div>
);

const AboutMe: Page = () => (
  <div style={{ ...fill, padding: '82px 160px' }}>
    <Eyebrow>ABOUT ME</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 58, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
      我的背景，塑造了我看待設計的方式
    </h2>
    <HeadingRule />
    <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: 44, marginTop: 46 }}>
      <div className="im-fadeup" style={{ minHeight: 520, padding: 38, borderRadius: 16, background: accentSoft, animationDelay: '100ms' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 118, height: 118, borderRadius: '50%', overflow: 'hidden', background: '#f4d238', boxShadow: '0 12px 28px rgba(52, 52, 52, .12)', flexShrink: 0 }}>
            <img src={avatarYellow} alt="黃宣銘" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontSize: 21, color: 'var(--osd-accent)', fontWeight: 700, letterSpacing: '0.1em' }}>MY BACKGROUND</div>
            <div style={{ fontSize: 28, lineHeight: 1.25, fontWeight: 700, marginTop: 10, whiteSpace: 'nowrap' }}>從工程走進產品設計</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginTop: 34, fontSize: 21, fontWeight: 600 }}>
          <span style={{ padding: '9px 14px', borderRadius: 999, background: '#ffffff' }}>機械工程</span>
          <span style={{ color: 'var(--osd-accent)' }}>→</span>
          <span style={{ padding: '9px 14px', borderRadius: 999, background: '#ffffff' }}>ODM 專案管理</span>
          <span style={{ color: 'var(--osd-accent)' }}>→</span>
          <span style={{ padding: '9px 14px', borderRadius: 999, background: '#ffffff' }}>UIUX</span>
        </div>
        <p style={{ fontSize: 24, lineHeight: 1.55, margin: '30px 0 0' }}>
          這段跨領域歷程，讓我習慣站在工程與使用者中間，把需求與技術限制轉成能落地的設計決策。
        </p>
        <div style={{ borderTop: '1px solid rgba(93, 98, 216, .18)', marginTop: 30, paddingTop: 24 }}>
          <div style={{ fontSize: 19, color: muted, letterSpacing: '0.12em' }}>PERSONALITY</div>
          <div style={{ fontSize: 27, fontWeight: 700, color: 'var(--osd-accent)', marginTop: 10 }}>好奇理解 · 同理溝通 · 務實落地</div>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 22, color: muted, letterSpacing: '0.12em', marginBottom: 18 }}>我的設計信念</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
          <DesignValueCard icon="layers" title="跨領域的眼界" desc="同時理解產品結構、技術限制與人的使用感受，從不同角色之間看見容易被忽略的機會。" color="#5d62d8" soft="rgba(93, 98, 216, .10)" delay="160ms" />
          <DesignValueCard icon="search" title="理解優先於解法" desc="開始設計之前，先釐清問題成因、使用者動機與現實限制，避免只解決表面的症狀。" color="#e8856b" soft="rgba(232, 133, 107, .12)" delay="240ms" />
          <DesignValueCard icon="zap" title="讓複雜變成直覺" desc="產品邏輯可以複雜，但使用者應該能快速理解下一步，順利完成真正想做的事情。" color="#3a9f78" soft="rgba(58, 159, 120, .12)" delay="320ms" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

/* ---------- P3–P5：同一條職涯主線，逐頁說明工作與累積的經驗 ---------- */

const careerStages = [
  { company: 'TBA', date: '2022.11–2023.02', image: tbaLogo, imageAlt: 'Taiwan Blockchain Academia' },
  { company: 'Crypto Arsenal', date: '2023.03–10', image: cryptoArsenalLogo, imageAlt: 'Crypto Arsenal' },
  { company: 'Advantech', date: '2024.06–08', image: advantechLogo, imageAlt: 'Advantech' },
] as const;

const CareerTimeline = ({ active }: { active: number }) => (
  <div className="im-fadeup" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 34, animationDelay: '100ms' }}>
    <div style={{ position: 'absolute', left: 28, right: 28, top: 35, height: 4, background: line }} />
    {careerStages.map((stage, index) => {
      const isActive = index === active;
      return (
        <div key={stage.company} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ position: 'relative', zIndex: 1, width: 70, height: 70, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', border: `3px solid ${isActive ? 'var(--osd-accent)' : '#d8d8dc'}`, boxShadow: isActive ? '0 0 0 8px rgba(93, 98, 216, .12)' : 'none', overflow: 'hidden' }}>
            <img src={stage.image} alt={stage.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', opacity: isActive ? 1 : 0.45 }} />
          </span>
          <div style={{ position: 'relative', zIndex: 1, background: '#ffffff', paddingRight: 22 }}>
            <div style={{ fontSize: 23, fontWeight: 700, color: isActive ? 'var(--osd-accent)' : muted }}>{stage.company}</div>
            <div style={{ fontSize: 19, color: muted, marginTop: 4 }}>{stage.date}</div>
          </div>
        </div>
      );
    })}
  </div>
);

const WorkPoint = ({ index, title, detail }: { index: string; title: string; detail: React.ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '54px 1fr', gap: 20, padding: '20px 0', borderTop: `1px solid ${line}` }}>
    <div style={{ fontSize: 21, color: 'var(--osd-accent)', fontWeight: 700 }}>{index}</div>
    <div>
      <div style={{ fontSize: 27, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 23, lineHeight: 1.45, color: muted, marginTop: 6 }}>{detail}</div>
    </div>
  </div>
);

type CareerChapterProps = {
  active: number;
  title: string;
  field: string;
  role: string;
  context: string;
  points: Array<{ title: string; detail: string }>;
  takeaway: string;
};

const CareerChapter = ({ active, title, field, role, context, points, takeaway }: CareerChapterProps) => {
  const stage = careerStages[active];
  return (
    <div style={{ ...fill, padding: '78px 160px' }}>
      <Eyebrow>CAREER JOURNEY · 0{active + 1}/03</Eyebrow>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 54, fontWeight: 700, margin: 0, lineHeight: 1.2, maxWidth: 1540 }}>{title}</h2>
      <CareerTimeline active={active} />
      <div className="im-fadeup" style={{ display: 'grid', gridTemplateColumns: '430px 1fr', gap: 66, marginTop: 46, animationDelay: '220ms' }}>
        <div style={{ background: accentSoft, borderRadius: 16, padding: 34, minHeight: 388 }}>
          <div style={{ width: 108, height: 108, borderRadius: 20, overflow: 'hidden', background: '#ffffff', boxShadow: cardShadow }}>
            <img src={stage.image} alt={stage.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
          <div style={{ fontSize: 37, fontWeight: 700, marginTop: 24 }}>{stage.company}</div>
          <div style={{ fontSize: 23, color: 'var(--osd-accent)', fontWeight: 600, marginTop: 8 }}>{role}</div>
          <div style={{ fontSize: 25, color: muted, marginTop: 8 }}>{field}</div>
          <div style={{ fontSize: 23, lineHeight: 1.45, marginTop: 24 }}>{context}</div>
        </div>
        <div>
          <div style={{ fontSize: 21, color: muted, letterSpacing: '0.12em', marginBottom: 10 }}>我實際做了什麼</div>
          {points.map((point, index) => <WorkPoint key={point.title} index={`0${index + 1}`} title={point.title} detail={point.detail} />)}
          <div style={{ marginTop: 18, padding: '18px 24px', borderRadius: 12, background: surface, borderLeft: '5px solid var(--osd-accent)', fontSize: 25, lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--osd-accent)' }}>累積的經驗：</strong>{takeaway}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TbaJourney: Page = () => (
  <CareerChapter
    active={0}
    title="先理解陌生場域，才能定義對的產品問題"
    role="Product Designer"
    field="Web3／DID 證書平台"
    context="以 Web3／DID 概念設計的數位證書平台。"
    points={[
      { title: '釐清角色與使用情境', detail: '完成 9 次角色訪談，整理不同利害關係人的需求與認知差異。' },
      { title: '和 PM 收斂產品定位', detail: '把研究發現帶回團隊，重新對齊核心使用者與產品價值。' },
      { title: '用原型修正核心流程', detail: '將定位轉成操作流程，透過回饋持續調整設計假設。' },
    ]}
    takeaway="研究不是證明原本的想法，而是幫助團隊修正假設。"
  />
);

const CryptoJourney: Page = () => (
  <CareerChapter
    active={1}
    title="設計不只提出方案，也要和團隊一起上線"
    role="UIUX & PM Intern"
    field="量化交易產品"
    context="提供量化策略與自動化交易功能的加密貨幣交易平台。"
    points={[
      { title: '把站外操作收回產品內', detail: '整理原本需要人工介入的步驟，重新設計可在站內完成的核心流程。' },
      { title: '與工程協作完成交付', detail: '處理 20+ 響應式頁面，並和跨職能團隊推進功能實作。' },
      { title: '用測試確認流程效率', detail: <>3 項核心流程上線；5 人內部測試由 <span className="im-shine" style={{ fontWeight: 700 }}>約 65 秒縮短至 27 秒</span>。</> },
    ]}
    takeaway="設計只有進入真實產品、被團隊交付，才算完成。"
  />
);

const AdvantechJourney: Page = () => (
  <CareerChapter
    active={2}
    title="把研究證據，轉成團隊能評估的產品方案"
    role="UIUX Design Intern"
    field="B2B AI 能源管理"
    context="整合 GenAI 的 B2B 能源管理系統，協助人員處理異常與用電資訊。"
    points={[
      { title: '理解真實能源管理工作', detail: '訪談內部機電人員與外部系統整合商，整理異常處理與用電管理需求。' },
      { title: '重新整理 GenAI 使用情境', detail: '將被動問答概念轉成異常提醒、排除建議與超約預警等主動支援。' },
      { title: '透過三階段提案推進', detail: '以研究、原型與產品影片溝通方案；超約預警於實習結束前啟動後端實作。' },
    ]}
    takeaway="洞察要變成可比較、可取捨、能推進的方案，才會影響產品決策。"
  />
);

/* ---------- P6：三段經驗收斂成工作方法＋近期 AI 協作界線 ---------- */

const MethodStep = ({ index, icon, title, detail }: { index: string; icon: string; title: string; detail: string }) => (
  <div style={{ flex: 1, padding: '34px 32px', borderLeft: `1px solid ${line}` }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconChip name={icon} />
      <span style={{ fontSize: 22, color: muted }}>{index}</span>
    </div>
    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 28 }}>{title}</div>
    <div style={{ fontSize: 25, lineHeight: 1.5, color: muted, marginTop: 14 }}>{detail}</div>
  </div>
);

const Method: Page = () => (
  <div style={{ ...fill, padding: '96px 160px' }}>
    <Eyebrow>HOW I WORK</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 58, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
      三段經驗，最後收斂成我現在的四步工作方式
    </h2>
    <HeadingRule />
    <div className="im-fadeup" style={{ display: 'flex', marginTop: 50, background: surface, border: `1px solid ${line}`, borderRadius: 16, overflow: 'hidden', boxShadow: cardShadow, animationDelay: '120ms' }}>
      <MethodStep index="01" icon="search" title="理解場域" detail="使用者、產品脈絡與現實限制" />
      <MethodStep index="02" icon="target" title="定義問題" detail="驗證假設，找出真正優先的問題" />
      <MethodStep index="03" icon="branch" title="轉成方案" detail="把證據變成可評估流程與 prototype" />
      <MethodStep index="04" icon="send" title="推進驗證" detail="透過 handoff、系統與檢查完成交付" />
    </div>
    <div className="im-fadeup" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 48, marginTop: 34, padding: '30px 36px', background: accentSoft, borderRadius: 16, animationDelay: '260ms' }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <Icon name="usercheck" size={34} />
        <div><div style={{ fontSize: 25, fontWeight: 700 }}>我負責</div><div style={{ fontSize: 25, lineHeight: 1.5, marginTop: 8 }}>問題、優先順序、設計取捨、驗收與最終責任</div></div>
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <Icon name="cpu" size={34} />
        <div><div style={{ fontSize: 25, fontWeight: 700 }}>近期 AI 協助</div><div style={{ fontSize: 25, lineHeight: 1.5, marginTop: 8 }}>盤點、規格執行、重複產出、指定檢查</div></div>
      </div>
    </div>
    <Footer />
  </div>
);

/* ---------- P7：人性的一面，以 About educator bento 呈現 ---------- */

const CommunityTile = ({ image, eyebrow, title, metric, style }: { image: string; eyebrow: string; title: string; metric: string; style: React.CSSProperties }) => (
  <div className="im-fadeup" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, background: '#222222', ...style }}>
    <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.82), rgba(0,0,0,0) 62%)' }} />
    <div style={{ position: 'absolute', left: 30, right: 30, bottom: 26, color: '#ffffff' }}>
      <div style={{ fontSize: 19, letterSpacing: '0.12em', opacity: 0.78 }}>{eyebrow}</div>
      <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>{title}</div>
    </div>
    <div style={{ position: 'absolute', top: 24, right: 24, padding: '8px 16px', borderRadius: 999, background: '#ffffff', color: 'var(--osd-accent)', fontSize: 21, fontWeight: 700 }}>{metric}</div>
  </div>
);

const Community: Page = () => (
  <div style={{ ...fill, padding: '84px 160px' }}>
    <Eyebrow>BEYOND WORK</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 55, fontWeight: 700, margin: 0, lineHeight: 1.25, maxWidth: 1500 }}>
      我也把設計方法，變成別人能一起使用的東西
    </h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1.62fr 1fr', gridTemplateRows: '235px 235px', gap: 22, marginTop: 42 }}>
      <CommunityTile image={openhciPhoto} eyebrow="OPENHCI 2024 · 設計組組長" title="帶領設計思考集訓" metric="40 位學員" style={{ gridRow: '1 / span 2' }} />
      <CommunityTile image={nccuPhoto} eyebrow="NCCU · 課程助教" title="Figma 教學與專案回饋" metric="60 位／20 組" style={{}} />
      <CommunityTile image={hackathonPhoto} eyebrow="EVOLUTION · 共同籌備" title="陪學員把想法做出來" metric="16 位學員" style={{}} />
    </div>
    <div style={{ fontSize: 25, color: muted, marginTop: 24 }}>說清楚、給具體回饋，也陪團隊一起完成。</div>
    <Footer />
  </div>
);

/* ---------- P8：公司／JD 客製契合鏈 ---------- */

const FitRow = ({ lead, text, icon }: { lead: string; text: string; icon: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 34, alignItems: 'center', minHeight: 112, borderTop: `1px solid ${line}` }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 25, fontWeight: 600, color: 'var(--osd-accent)' }}><Icon name={icon} size={28} />{lead}</div>
    <div style={{ fontSize: 29, lineHeight: 1.45 }}>{text}</div>
  </div>
);

const FitClose: Page = () => (
  <div style={{ ...fill, padding: '96px 160px' }}>
    <Eyebrow>WHY THIS ROLE</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 58, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>
      我的經驗，如何回應{COMPANY}現在的題目
    </h2>
    <HeadingRule />
    <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: 72, marginTop: 50 }}>
      <div className="im-fadeup" style={{ minHeight: 464, background: accentSoft, borderRadius: 16, padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div><div style={{ fontSize: 23, color: 'var(--osd-accent)', fontWeight: 600 }}>COMPANY / PRODUCT</div><div style={{ fontSize: 46, fontWeight: 700, marginTop: 20 }}>{COMPANY}</div></div>
        <ImagePlaceholder hint="公司產品畫面／Logo" width={404} height={230} />
      </div>
      <div>
        <FitRow lead="產品觀察" icon="eye" text="【公司產品】正在處理【具體產品／市場問題】" />
        <FitRow lead="JD 真需求" icon="target" text="這個職缺最需要【一項關鍵能力】" />
        <FitRow lead="相近證據" icon="briefcase" text="我在【案例】曾【真實行動／結果】" />
        <FitRow lead="可帶入價值" icon="send" text="把【能力】用在【具體產品／團隊情境】" />
      </div>
    </div>
    <Footer />
  </div>
);

/* ---------- P9：可依公司階段調整的前六週 ---------- */

const WeekCard = ({ period, title, action, output, icon }: { period: string; title: string; action: string; output: string; icon: string }) => (
  <div style={{ flex: 1, position: 'relative', paddingTop: 52 }}>
    <div style={{ position: 'absolute', top: -14, left: 0, width: 30, height: 30, borderRadius: '50%', background: 'var(--osd-accent)', border: '7px solid #ffffff', boxShadow: `0 0 0 2px var(--osd-accent)` }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: 'var(--osd-accent)', fontSize: 23, fontWeight: 600 }}><Icon name={icon} size={28} />{period}</div>
    <div style={{ fontSize: 38, fontWeight: 700, marginTop: 20 }}>{title}</div>
    <div style={{ fontSize: 27, lineHeight: 1.5, color: muted, marginTop: 18 }}>{action}</div>
    <div style={{ marginTop: 26, padding: '20px 22px', borderRadius: 12, background: accentSoft, fontSize: 25, color: 'var(--osd-accent)', fontWeight: 600 }}>產出｜{output}</div>
  </div>
);

const WhatNext: Page = () => (
  <div style={{ ...fill, padding: '96px 160px' }}>
    <Eyebrow>FIRST 6 WEEKS</Eyebrow>
    <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 700, margin: 0, lineHeight: 1.25 }}>加入後的前六週，我會這樣開始</h2>
    <HeadingRule />
    <div className="im-fadeup" style={{ position: 'relative', display: 'flex', gap: 68, marginTop: 88 }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 4, background: 'var(--osd-accent)' }} />
      <WeekCard period="第 1–2 週" icon="search" title="理解" action="理解【核心流程】、使用者、商業目標與團隊決策方式" output="脈絡與問題地圖" />
      <WeekCard period="第 3–4 週" icon="box" title="參與" action="跟著真實任務協作，接手一個邊界清楚的問題" output="可評估的設計產出" />
      <WeekCard period="第 5–6 週" icon="bulb" title="提出" action="整理觀察、機會與待驗證假設，和團隊對齊下一步" output="討論用建議" />
    </div>
    <p style={{ fontSize: 24, color: muted, marginTop: 42 }}>這是根據公開資訊提出的起點，實際方向會依團隊目前的重心調整。</p>
    <Footer />
  </div>
);

/* ---------- P10：Contact 語彙的安靜收尾，不放 QR Code ---------- */

const ContactMethodRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '64px 150px 1fr', alignItems: 'center', gap: 20, minHeight: 88, borderTop: `1px solid ${line}` }}>
    <div style={{ width: 54, height: 54, borderRadius: 12, background: accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={icon} size={28} /></div>
    <div style={{ fontSize: 22, color: muted }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 600 }}>{value}</div>
  </div>
);

const ThankYou: Page = () => (
  <div style={{ ...fill, overflow: 'hidden' }}>
    <div style={{ height: 380, position: 'relative', overflow: 'hidden' }}>
      <img src={contactHero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.16)' }} />
      <img src={logo} alt="Hming" style={{ position: 'absolute', top: 72, left: 160, height: 54, filter: 'brightness(0) invert(1)' }} />
    </div>
    <div style={{ height: 700, background: surface, padding: '72px 160px 64px', display: 'grid', gridTemplateColumns: '1fr 760px', gap: 100 }}>
      <div className="im-fadeup">
        <div style={{ fontSize: 24, color: 'var(--osd-accent)', fontWeight: 600, letterSpacing: '0.14em' }}>THANK YOU</div>
        <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 96, lineHeight: 1.05, margin: '26px 0 0', fontWeight: 700 }}>謝謝聆聽</h2>
        <p style={{ fontSize: 31, color: muted, marginTop: 30 }}>期待進一步交流。</p>
        <p style={{ fontSize: 24, color: muted, marginTop: 68 }}>黃宣銘 Hming Huang · Product Designer</p>
      </div>
      <div style={{ alignSelf: 'start' }}>
        <ContactMethodRow icon="globe" label="PORTFOLIO" value="hmingdesign.com" />
        <ContactMethodRow icon="mail" label="EMAIL" value="hmingdesigner@gmail.com" />
        <ContactMethodRow icon="usercheck" label="LINKEDIN" value="linkedin.com/in/brian-huang-a36759128" />
      </div>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: '自我介紹公版',
  theme: 'hming-portfolio',
  createdAt: '2026-07-18T19:28:36.771Z',
};

export default [Cover, AboutMe, TbaJourney, CryptoJourney, AdvantechJourney, Method, Community, FitClose, WhatNext, ThankYou] satisfies Page[];
