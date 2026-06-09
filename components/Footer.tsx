import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('footer');
  const socialLinks = [
    {
      label: t('resume104'),
      href: 'https://pda.104.com.tw/profile/share/8uHDDOioDTQ54dBTGxaQRxX84XjGVAgK',
      graySrc: '/social/104-gray-v2.png',
      colorSrc: '/social/104-color-v2.png',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/brian-huang-a36759128',
      graySrc: '/social/linkedin-gray-v2.png',
      colorSrc: '/social/linkedin-color-v2.png',
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Hming1224',
      graySrc: '/social/github-gray-v2.png',
      colorSrc: '/social/github-color-v2.png',
    },
  ];

  return (
    <footer className="site-footer">
      <p>© Brian Huang 2026 Copyright. All Rights Reserved.</p>
      <div className="social-links" aria-label={t('socialLinks')}>
        {socialLinks.map((link) => (
          <a
            aria-label={link.label}
            className="social-link"
            href={link.href}
            key={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="social-logo social-logo-gray" src={link.graySrc} alt="" width={40} height={40} />
            <Image className="social-logo social-logo-color" src={link.colorSrc} alt="" width={40} height={40} />
          </a>
        ))}
      </div>
    </footer>
  );
}
