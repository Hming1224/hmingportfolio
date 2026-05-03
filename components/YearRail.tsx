'use client';

import { useEffect, useState } from 'react';

interface YearRailProps {
  years: string[];
}

export default function YearRail({ years }: YearRailProps) {
  const [activeYear, setActiveYear] = useState(years[0]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.experience-card[data-year]'));

    if (!cards.length) {
      return;
    }

    const updateActiveYear = () => {
      const viewportAnchor = window.innerHeight * 0.38;
      const closestCard = cards.reduce(
        (closest, card) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportAnchor);

          if (distance < closest.distance) {
            return { card, distance };
          }

          return closest;
        },
        { card: cards[0], distance: Number.POSITIVE_INFINITY },
      );

      setActiveYear(closestCard.card.dataset.year ?? years[0]);
    };

    updateActiveYear();
    window.addEventListener('scroll', updateActiveYear, { passive: true });
    window.addEventListener('resize', updateActiveYear);

    return () => {
      window.removeEventListener('scroll', updateActiveYear);
      window.removeEventListener('resize', updateActiveYear);
    };
  }, [years]);

  return (
    <aside className="year-rail" aria-label="年份快速導覽">
      {years.map((year) => (
        <a className={activeYear === year ? 'is-active' : undefined} href={`#year-${year}`} key={year}>
          {year}
        </a>
      ))}
    </aside>
  );
}
