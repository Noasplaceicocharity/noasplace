'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogLinkDebuggerProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function BlogLinkDebugger({ href, children, className }: BlogLinkDebuggerProps) {
  const [debugInfo, setDebugInfo] = useState<{
    isProduction: boolean;
    userAgent: string;
    href: string;
  } | null>(null);

  useEffect(() => {
    setDebugInfo({
      isProduction: process.env.NODE_ENV === 'production',
      userAgent: window.navigator.userAgent,
      href: href,
    });
  }, [href]);

  const handleClick = (e: React.MouseEvent) => {
    console.log('Blog link clicked:', {
      href,
      debugInfo,
      timestamp: new Date().toISOString(),
      clickEvent: e
    });

    // Add a small delay to see if navigation happens
    setTimeout(() => {
      console.log('Navigation check:', {
        currentLocation: window.location.href,
        expectedHref: href
      });
    }, 100);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
