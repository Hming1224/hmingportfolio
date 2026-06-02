import Image from 'next/image';

const socialLinks = [
  {
    label: '104 個人履歷',
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

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© Brian Huang 2026 Copyright. All Rights Reserved.</p>
      <div className="social-links" aria-label="社群連結">
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
