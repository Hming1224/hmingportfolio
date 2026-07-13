import type { Locale } from '../../i18n/routing';

const caseOverviewLabels = {
  '問題': {
    en: 'Problem',
    'zh-TW': '問題',
  },
  '設計目標': {
    en: 'Design goal',
    'zh-TW': '挑戰',
  },
  '影響': {
    en: 'Impact',
    'zh-TW': '影響',
  },
} as const;

export function getCaseOverviewLabel(locale: Locale, sourceLabel: string) {
  const labels = caseOverviewLabels[sourceLabel as keyof typeof caseOverviewLabels];
  return labels?.[locale] ?? sourceLabel;
}
