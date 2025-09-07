'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isWaving, setIsWaving] = useState(false);

  // Wave animation trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-background px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          {/* Fun animated emoji */}
          <div className="relative">
            <p className={`text-9xl transition-transform duration-500 ${isWaving ? 'animate-wave' : ''}`} 
               style={{ transformOrigin: 'bottom right' }}>
              👋
            </p>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 size-8 rounded-full bg-[#FFB800]/20" />
            <div className="absolute -bottom-6 -left-6 size-12 rounded-full bg-[#40BFBF]/20" />
            <div className="absolute top-1/2 -right-8 size-6 rounded-full bg-[#6E3482]/20" />
          </div>

          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-brand-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-ink tracking-tight sm:text-5xl">
                Oops! Page Not Found
              </h1>
              <p className="mt-1 text-2xl font-bold text-brand-800">
                Looks like this page went on a little adventure!
              </p>
              <p className="mt-3 text-base text-ink/80">
                Don&apos;t worry though - just like how we support families, we&apos;ll help you find your way back home.
              </p>
              
              {/* Fun facts section */}
              <div className="mt-8 bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-ink">While you&apos;re here, did you know?</h2>
                <p className="mt-2 text-ink/80">
                  The number 404 is actually a happy number! If you keep squaring and adding its digits, 
                  you&apos;ll eventually reach 1. Just like how every journey at Noa&apos;s Place leads to a smile! 
                  {/* 4² + 0² + 4² = 32, 3² + 2² = 13, 1² + 3² = 10, 1² + 0² = 1 */}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-xl bg-[#FFB800] px-6 py-3 text-base font-bold text-ink shadow-sm hover:bg-[#ffc533] hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
                >
                  Take me home
                  <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
