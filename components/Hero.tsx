import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
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
import HeroBottomGroupCenter from './hero-decorations/HeroBottomGroupCenter';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="hero" id="about">
      <HeroEntranceController />
      <HeroBottomGroupCenter />
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,white,transparent)]" />

      <div className="hero-decoration-stage" aria-hidden="true">
        {/* Floating decorations */}

        {/* Cursor tags */}
        <CursorTag text="Product Designer" color="#4B7BEC" className="hero-decoration hero-cursor-brian" />
        <CursorTag text="Engineers"        color="#26DE81" icon="/decorations/cursor-engineers.svg" className="hero-decoration hero-cursor-engineers" />
        <CursorTag text="PM"               color="#FD9644" icon="/decorations/cursor-pm.svg"        className="hero-decoration hero-cursor-pm" />

        {/* 底部四個裝飾包成一個 frame（.hero-bottom-group）。
            桌機/平板：display:contents，四個物件沿用各自的絕對定位，frame 不影響版面。
            ≤768px：frame 變成一個固定高度的容器，垂直置中於「我的歷程按鈕底 ↔ 視窗下緣」的空隙，
            四個物件用相對 frame 的固定 top 排出高度順序（wal-pencil 最高 → toggle → 兩個 session 最低）。 */}
        <div className="hero-bottom-group">
          <WireframeFrame label="Session : Build Wow!" size="large" className="hero-decoration hero-frame-large" />
          <ToggleDecoration className="hero-decoration hero-toggle" />
          <AiWidgetFrame label="Fun demo" className="hero-decoration hero-ai-widget" />
          <WalPencilDecoration className="hero-decoration hero-wal-pencil" />
        </div>

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
      </div>

      {/* Main copy */}
      <div className="hero-copy">
        <div className="hero-badge-shimmer-wrap">
          <div className="hero-badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/decorations/badge-icon.png" width={24} height={24} alt="" aria-hidden="true" />
            <span>{t('badge')}</span>
          </div>
        </div>

        <div className="hero-title">
          <SplitText
            tag="h1"
            text={t('greeting')}
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
              sentence={t('taglines')}
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
          <Link className="button button-secondary" href="/about-me">{t('journey')}</Link>
          <a className="button button-primary" href="#projects">{t('works')}</a>
        </div>
      </div>
    </section>
  );
}
