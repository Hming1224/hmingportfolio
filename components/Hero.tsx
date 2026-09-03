import { getTranslations } from 'next-intl/server';
import Button from './ui/Button';
import SplitText from './animate-ui/primitives/texts/SplitText';
import DotPattern from './ui/dot-pattern';
import HeroEntranceController from './hero-decorations/HeroEntranceController';
import HeroBottomGroupCenter from './hero-decorations/HeroBottomGroupCenter';
import HeroDecorationStage from './hero-decorations/HeroDecorationStage';
import AiImpactRevealEntry from './ai-impact/AiImpactRevealEntry';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="hero" id="about">
      <HeroEntranceController />
      <HeroBottomGroupCenter />
      <DotPattern className="[mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,white,transparent)]" />

      <HeroDecorationStage />

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

          <p className="hero-subtitle" data-hero-roll-in>
            {t.rich('description', {
              shiny: (chunks) => <span className="hero-shiny-text">{chunks}</span>,
            })}
          </p>
        </div>

        <div className="hero-actions" data-hero-roll-in>
          <Button href="/about-me" variant="secondary">{t('journey')}</Button>
          <Button href="#projects">{t('works')}</Button>
        </div>
      </div>
      <AiImpactRevealEntry />
    </section>
  );
}
