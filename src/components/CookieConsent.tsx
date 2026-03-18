'use client';

import React from "react";
import Link from "next/link";

type CookieConsentProps = {
  initiallyConsented: boolean;
};

export default function CookieConsent({ initiallyConsented }: CookieConsentProps) {
  const [isVisible, setIsVisible] = React.useState(!initiallyConsented);

  const setCookie = (name: string, value: string, maxAgeSeconds: number) => {
    document.cookie = `${name}=${value}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax`;
  };

  const handleAccept = () => {
    setCookie('analytics_consent', 'granted', 60 * 60 * 24 * 365); // 1 year
    window.location.reload();
  };

  const handleDecline = () => {
    setCookie('analytics_consent', 'denied', 60 * 60 * 24 * 365); // 1 year
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      {/* Popup card */}
      <div className="relative w-full max-w-md rounded-2xl bg-brand-800 shadow-xl border border-brand-500/30 p-6 sm:p-8 text-white">
        <p className="m-0 text-base leading-relaxed text-white">
          We use cookies on this site to enhance your user experience.
        </p>
        <p className="mt-3 m-0 text-base leading-relaxed text-white">
          By clicking the Accept button, you agree to us doing so.
        </p>
        <p className="mt-4 m-0 text-sm">
          <Link
            href="/cookie-policy"
            className="text-brand-100 hover:text-white underline underline-offset-2"
          >
            More info
          </Link>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2.5 rounded-xl border border-white/80 text-white hover:bg-white/10 transition-colors"
            aria-label="Decline analytics cookies"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2.5 rounded-xl bg-brand-100 text-brand-900 hover:bg-white transition-colors"
            aria-label="Accept analytics cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}


