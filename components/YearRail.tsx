"use client";

import { useEffect, useState } from "react";

interface YearRailProps {
  years: string[];
}

export default function YearRail({ years }: YearRailProps) {
  const [activeYear, setActiveYear] = useState(years[0]);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".experience-card[data-year]"),
    );

    if (!cards.length) {
      return;
    }

    const updateActiveYear = () => {
      // Use a higher viewport anchor (30% of viewport height) to match the reading focus area
      // since cards scroll to the top of the viewport (under the 80px navbar)
      const viewportAnchor = Math.max(120, window.innerHeight * 0.3);
      const closestCard = cards.reduce(
        (closest, card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportAnchor);

          if (distance < closest.distance) {
            return { card, distance };
          }

          return closest;
        },
        { card: cards[0], distance: Number.POSITIVE_INFINITY },
      );

      const nextYear = closestCard.card.dataset.year ?? years[0];
      setActiveYear(nextYear);
    };

    updateActiveYear();
    window.addEventListener("scroll", updateActiveYear, { passive: true });
    window.addEventListener("resize", updateActiveYear);

    return () => {
      window.removeEventListener("scroll", updateActiveYear);
      window.removeEventListener("resize", updateActiveYear);
    };
  }, [years]);

  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".experience-card[data-year]"),
    );

    if (!cards.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.32,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="year-rail" aria-label="年份快速導覽">
      {years.map((year) => (
        <a
          aria-current={activeYear === year ? "step" : undefined}
          className={activeYear === year ? "is-active" : undefined}
          href={`#year-${year}`}
          key={year}
        >
          {year}
        </a>
      ))}
    </aside>
  );
}
