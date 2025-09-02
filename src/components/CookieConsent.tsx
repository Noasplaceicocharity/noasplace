'use client';

import React from "react";

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
      className="fixed inset-x-0 bottom-0 z-50 bg-brand-900 text-white animate-fade-in"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <p className="m-0 leading-relaxed text-sm md:text-base">
          We use cookies to improve your experience and to understand how our website is used, Choose “Accept” to enable these, or “Decline” to continue without them.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDecline}
            className="px-4 py-2 rounded-md border border-white/80 text-white hover:bg-white/10 transition-colors"
            aria-label="Decline analytics cookies"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-4 py-2 rounded-md bg-brand-100 text-brand-900 hover:bg-brand-500 hover:text-white transition-colors"
            aria-label="Accept analytics cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}


