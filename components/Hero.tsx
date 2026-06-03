import SplitText from './animate-ui/primitives/texts/SplitText';
import TrueFocus from './animate-ui/primitives/texts/TrueFocus';
import DotPattern from './ui/dot-pattern';
import CursorTag from './hero-decorations/CursorTag';
import WireframeFrame from './hero-decorations/WireframeFrame';
import StickyNote from './hero-decorations/StickyNote';
import ToggleDecoration from './hero-decorations/ToggleDecoration';
import AiWidgetFrame from './hero-decorations/AiWidgetFrame';
import WalPencilDecoration from './hero-decorations/WalPencilDecoration';
import HeroEntranceController from './hero-decorations/HeroEntranceController';

export default function Hero() {
  return (
    <section className="hero" id="about">
      <HeroEntranceController />
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,white,transparent)]" />

      {/* Floating decorations — hidden on mobile */}

      {/* Cursor tags */}
      <CursorTag text="Product Designer" color="#4B7BEC" className="hero-decoration hero-cursor-brian" />
      <CursorTag text="Engineers"        color="#26DE81" icon="/decorations/cursor-engineers.svg" className="hero-decoration hero-cursor-engineers" />
      <CursorTag text="PM"               color="#FD9644" icon="/decorations/cursor-pm.svg"        className="hero-decoration hero-cursor-pm" />

      {/* Wireframe frames */}
      <WireframeFrame label="Session : Build Wow!" size="large" className="hero-decoration hero-frame-large" />

      {/* Toggle decoration */}
      <ToggleDecoration className="hero-decoration hero-toggle" />

      {/* Sticky notes — wrapper div carries the entrance animation; inner StickyNote keeps its rotation.
          .hero-sticky-group 在桌機/平板是 display:contents（不影響各卡的絕對定位）；
          ≤768px 變成一個置中的容器，6 張卡改用相對 group 的固定 px 排成對稱扇形。 */}
      <div className="hero-sticky-group">
        <div className="hero-decoration hero-sticky-1 hero-sticky-idea"><StickyNote text="I have a good idea!"  subtitle="Product Designer"  subtitleColor="#7f714c" color="#FFE299" rotation={-3} /></div>
        <div className="hero-decoration hero-sticky-2 hero-sticky-user-centric"><StickyNote text="User-Centric Design"  subtitle="Product Designer"  subtitleColor="#695e7f" color="#D3BDFF" rotation={4}  /></div>
        <div className="hero-decoration hero-sticky-3 hero-sticky-data-storage"><StickyNote text="Data Storage"         subtitle="Backend Engineer"  subtitleColor="#597a77" color="#B3F4EF" rotation={-4} /></div>
        <div className="hero-decoration hero-sticky-4 hero-sticky-co-work"><StickyNote text="Co-work with AI"      subtitle="Frontend Engineer" subtitleColor="#546d7f" color="#A8DAFF" rotation={3}  /></div>
        <div className="hero-decoration hero-sticky-5 hero-sticky-product-spec"><StickyNote text="Product Spec"         subtitle="Project Manager"   subtitleColor="#7f5751" color="#FFAFA3" rotation={-5} /></div>
        <div className="hero-decoration hero-sticky-6 hero-sticky-how-might"><StickyNote text="How Might We...?"     subtitle="Project Manager"   subtitleColor="#7f6954" color="#FFD3A8" rotation={5}  /></div>
      </div>

      {/* AI widget */}
      <AiWidgetFrame label="Fun demo" className="hero-decoration hero-ai-widget" />

      {/* Walpy + pencil illustration */}
      <WalPencilDecoration className="hero-decoration hero-wal-pencil" />

      {/* Main copy */}
      <div className="hero-copy">
        <div className="hero-badge-shimmer-wrap">
          <div className="hero-badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/decorations/badge-icon.png" width={24} height={24} alt="" aria-hidden="true" />
            <span>2+ 業界專案經驗，目前正在尋找新的機會！</span>
          </div>
        </div>

        <div className="hero-title">
          <SplitText
            tag="h1"
            text="哈囉！我是黃宣銘 Brian Huang"
            delay={42}
            duration={0.72}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 34 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="inherit"
          />

          <div className="hero-taglines">
            <TrueFocus
              sentence="以同理心研究需求|以好奇心探索設計|以清晰思維打造產品"
              separator="|"
              blurAmount={2}
              borderColor="var(--purple)"
              glowColor="rgba(93, 98, 216, 0.35)"
              animationDuration={0.7}
              pauseBetweenAnimations={1.8}
            />
          </div>
        </div>

        <div className="hero-actions">
          <a className="button button-secondary" href="/about-me">我的歷程</a>
          <a className="button button-dark"      href="#projects">查看作品</a>
        </div>
      </div>
    </section>
  );
}
