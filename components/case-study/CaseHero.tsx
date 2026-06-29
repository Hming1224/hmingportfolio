import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import CaseInfoGrid, { type CaseInfoItem } from './CaseInfoGrid';

interface CaseHeroCover {
  src: string;
  alt: string;
  objectPosition?: CSSProperties['objectPosition'];
  sizes?: string;
  unoptimized?: boolean;
}

interface CaseHeroProps {
  cover: CaseHeroCover;
  meta?: ReactNode;
  title: ReactNode;
  infoItems: CaseInfoItem[];
  coverClassName?: string;
  infoClassName?: string;
  infoGridClassName?: string;
}

export default function CaseHero({
  cover,
  meta,
  title,
  infoItems,
  coverClassName,
  infoClassName,
  infoGridClassName,
}: CaseHeroProps) {
  return (
    <section>
      <div className={cn('cs-hero-cover', coverClassName)}>
        <div className="cs-hero-cover-img">
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={cover.sizes}
            style={{ objectFit: 'cover', objectPosition: cover.objectPosition ?? 'center top' }}
            priority
            unoptimized={cover.unoptimized}
          />
        </div>
      </div>

      <div className={cn('cs-hero-info', infoClassName)}>
        {meta ? <div className="cs-hero-meta">{meta}</div> : null}
        <h1 className="cs-title">{title}</h1>
        <CaseInfoGrid items={infoItems} className={infoGridClassName} />
      </div>
    </section>
  );
}
