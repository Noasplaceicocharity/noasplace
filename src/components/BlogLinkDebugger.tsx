'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BlogLinkDebuggerProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function BlogLinkDebugger({ href, children, className }: BlogLinkDebuggerProps) {
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<{
    isProduction: boolean;
    userAgent: string;
    href: string;
  } | null>(null);

  useEffect(() => {
    setDebugInfo({
      isProduction: window.location.hostname !== 'localhost',
      userAgent: window.navigator.userAgent,
      href: href,
    });
  }, [href]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Always prevent default to control navigation
    
    console.log('Blog link clicked:', {
      href,
      debugInfo,
      timestamp: new Date().toISOString(),
      clickEvent: e
    });

    // Try multiple navigation methods
    try {
      // Method 1: Next.js router push
      console.log('Attempting Next.js router.push:', href);
      router.push(href);
      
      // Method 2: Fallback to window.location after a delay if router.push fails
      setTimeout(() => {
        if (window.location.pathname === '/blog') {
          console.log('Router.push failed, using window.location:', href);
          window.location.href = href;
        }
      }, 1000);
      
    } catch (error) {
      console.error('Navigation error:', error);
      // Method 3: Direct navigation as fallback
      window.location.href = href;
    }
  };

  return (
    <div className={className} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
}
