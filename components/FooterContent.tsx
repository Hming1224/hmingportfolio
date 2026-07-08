import type { CSSProperties } from "react";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/brian-huang-a36759128",
    graySrc: "/social/linkedin-gray-v2.png",
  },
  {
    label: "GitHub",
    href: "https://github.com/Hming1224",
    graySrc: "/social/github-gray-v2.png",
  },
];

export default function FooterContent({ socialLinksLabel }: { socialLinksLabel: string }) {
  return (
    <footer className="site-footer">
      <p>© Brian Huang 2026 Copyright. All Rights Reserved.</p>
      <div className="social-links" aria-label={socialLinksLabel}>
        {socialLinks.map((link) => (
          <a
            aria-label={link.label}
            className="social-link"
            href={link.href}
            key={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className="social-logo"
              style={{ "--social-icon": `url("${link.graySrc}")` } as CSSProperties}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </footer>
  );
}
