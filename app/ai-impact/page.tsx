import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AiImpactHero from '@/components/ai-impact/AiImpactHero';
import AiImpactContent from '@/components/ai-impact/AiImpactContent';
import type { Locale } from '@/i18n/routing';
import { createLocalizedMetadata } from '@/lib/metadata';
import '@/styles/ai-impact.css';

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;

  return createLocalizedMetadata(locale, '/ai-impact', {
    en: {
      title: 'The AI Impact',
      description: 'How Brian Huang uses AI to clarify decisions, build in small batches, and verify product work.',
    },
    'zh-TW': {
      title: 'The AI Impact',
      description: '黃宣銘如何運用 AI 釐清決策、分批實作，並以可查證結果驗收產品工作。',
    },
  });
}

export default function AiImpactPage() {
  return (
    <main className="ai-impact-page">
      <Navbar variant="aiImpact" />
      <AiImpactHero />
      <AiImpactContent />
      <Footer />
    </main>
  );
}
