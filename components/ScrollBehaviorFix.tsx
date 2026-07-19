'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ScrollBehaviorFix manages scroll behavior during route transitions and anchor link navigation.
 * 
 * 1. Next.js Route Transitions:
 *    Since `html { scroll-behavior: smooth; }` is removed from global CSS to prevent height-clamping scroll restoration
 *    bugs on route transitions (which left the viewport at y=80px when navigating from a tall page back to home),
 *    the browser's scroll behavior is 'auto' (instant) by default. On route transitions, this component forces
 *    the page to scroll to y=0 instantly, ensuring a clean navigation.
 * 
 * 2. Same-page Anchor Links:
 *    To keep the premium feeling of smooth scrolling for same-page anchor links (e.g. #projects, #year-2024),
 *    this component intercepts click events on local hash anchors and scrolls them smoothly programmatically using
 *    Element.scrollIntoView({ behavior: 'smooth' }), which respects CSS scroll-margin-top.
 */
export default function ScrollBehaviorFix() {
  const pathname = usePathname();

  // Force instant scroll to top on route change (excluding hash changes)
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);

  // Intercept anchor link click events to provide programmatic smooth scroll on same page
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      if (anchor.dataset.scrollScope === 'nearest') return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Check if the link targets an anchor on the same page
      const isHashLink = href.startsWith('#');
      const isHomeHashLink = href.startsWith('/#') && window.location.pathname === '/';

      if (isHashLink || isHomeHashLink) {
        const id = href.includes('#') ? href.split('#')[1] : '';
        const element = id ? document.getElementById(id) : null;
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Use capture phase to intercept click events early
    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
    };
  }, []);

  return null;
}
