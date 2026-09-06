import { getTranslations } from 'next-intl/server';
import DotPattern from '@/components/ui/dot-pattern';
import HeroDecorationStage from '@/components/hero-decorations/HeroDecorationStage';
import HeroEntranceController from '@/components/hero-decorations/HeroEntranceController';

export default async function AiImpactHero() {
  const t = await getTranslations('aiImpact');

  return (
    <section className="hero ai-impact-hero" aria-labelledby="ai-impact-title">
      <HeroEntranceController rootSelector=".ai-impact-hero" />
      <DotPattern className="ai-impact-dots ai-impact-dots--base" />
      <DotPattern className="ai-impact-dots ai-impact-dots--highlight" />
      <HeroDecorationStage variant="ai-impact" />

      <div className="hero-copy ai-impact-hero__copy" data-hero-roll-in>
        <p className="ai-impact-eyebrow">{t('eyebrow')}</p>
        <div className="hero-title">
          <h1 id="ai-impact-title">{t('title')}</h1>
          <p className="hero-subtitle">{t('description')}</p>
        </div>
      </div>
    </section>
  );
}
