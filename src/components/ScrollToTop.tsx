'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // When the pathname changes, scroll to top if there's no hash
    if (!window.location.hash) {
      // Scroll after next paint to avoid layout-shift jumps
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Handle anchor links (hash changes)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Only handle initial hash if explicitly navigating to a hash
    if (window.location.hash && window.performance) {
      const navEntry = window.performance.getEntriesByType('navigation')[0];
      if (navEntry instanceof PerformanceNavigationTiming) {
        // Only scroll to hash if it's not the initial page load
        if (navEntry.type !== 'reload' && navEntry.type !== 'navigate') {
          handleHashChange();
        }
      }
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Force scroll to top on initial page load and disable browser restoration
  useEffect(() => {
    try {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch {}

    if (!window.location.hash) {
      // Do two passes to be extra safe against late layout shifts
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  }, []);

  return null;
}