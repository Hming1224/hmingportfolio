import type { ReactNode } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ScrollProgress from '../ScrollProgress';
import CaseTOC, { type TocSection } from '../CaseTOC';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';

interface NextNav {
  /** 「返回首頁」連結，預設 '/'。 */
  homeHref?: string;
  homeLabel?: string;
  /** 「下一個專案」連結與文字。 */
  nextHref?: string;
  nextLabel: string;
}

interface CaseStudyShellProps {
  /** 專案主題 class，例如 'theme-advantech'（只覆寫大標主色）。 */
  theme: string;
  /** 各專案客製的 hero section（夾在 Navbar 與 TOC 佈局之間）。 */
  hero: ReactNode;
  /** 頁內目錄項目，同時餵給 CaseTOC。 */
  tocSections: TocSection[];
  /** 底部「下一個專案」導航設定。 */
  nextNav: NextNav;
  /** TOC 佈局內的所有內容 section。 */
  children: ReactNode;
}

/**
 * 案例頁共用外殼：統一頁框、ScrollProgress、Navbar、TOC 佈局、下一專案導航與 Footer。
 * 新增一個案例頁只要：掛 theme、傳 hero、tocSections、nextNav，再把各 section 當 children。
 */
export default function CaseStudyShell({
  theme,
  hero,
  tocSections,
  nextNav,
  children,
}: CaseStudyShellProps) {
  const { homeHref = '/', homeLabel = '返回首頁', nextHref, nextLabel } = nextNav;
  const nextLinkHref = nextHref && nextHref !== '#' ? nextHref : null;

  return (
    <main className={cn('cs-page', theme)}>
      <ScrollProgress />
      <Navbar />

      {hero}

      {/* TOC Layout: wraps all content sections */}
      <div className="cs-toc-layout">
        <aside className="cs-toc-aside">
          <CaseTOC sections={tocSections} />
        </aside>
        <div className="cs-toc-main">{children}</div>
      </div>

      {/* Next Project Nav */}
      <div className="cs-next-nav">
        <Button href={homeHref} prefetch={false} variant="secondary">
          {homeLabel}
        </Button>
        {nextLinkHref ? (
          <Button className="cs-next-project-button" href={nextLinkHref}>
            {nextLabel}
          </Button>
        ) : (
          <Button className="cs-next-project-button" disabled>
            {nextLabel}
          </Button>
        )}
      </div>

      <Footer />
    </main>
  );
}
