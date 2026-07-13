import { getTranslations } from 'next-intl/server';
import FooterContent from './FooterContent';

export default async function Footer() {
  const t = await getTranslations('footer');
  return <FooterContent socialLinksLabel={t('socialLinks')} />;
}
