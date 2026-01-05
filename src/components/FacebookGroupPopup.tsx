"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type FacebookGroupPopupProps = {
  triggerPercent?: number; // 0-100, default 10
};

export default function FacebookGroupPopup({ triggerPercent = 10 }: FacebookGroupPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const storageKey = "np_facebook_group_popup_shown";

  useEffect(() => {
    setMounted(true);
    
    // Check if popup has already been shown this session
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem(storageKey) === "1";
      setHasShown(alreadyShown);
    }
  }, [storageKey]);

  useEffect(() => {
    if (hasShown) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      if (progress >= triggerPercent) {
        setIsOpen(true);
        sessionStorage.setItem(storageKey, "1");
        setHasShown(true);
      }
    };

    // Check scroll position after a small delay to avoid CLS during initial paint
    const id = window.setTimeout(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 500);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown, triggerPercent, storageKey]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleJoinGroup = () => {
    window.open("https://www.facebook.com/groups/814517921610517/", "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="facebook-popup-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200"
      >
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-gray-600 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
          {/* Image */}
          <div className="mb-6 -mt-4 -mx-6 sm:-mx-8 sm:-mt-6">
            <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
              <Image
                src="/images/noas-place-community.png"
                alt="Noa's Place Community"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="mx-auto max-w-xl text-center">
            <h3 id="facebook-popup-title" className="text-2xl sm:text-3xl font-bold text-brand-800 leading-tight mb-4">
              Help Build Noa's Place With Us
            </h3>
            
            <p className="mt-4 text-base text-ink/70 leading-relaxed mb-2">
              Join our Founding Families Community and be part of shaping Noa's Place from the ground up.
            </p>
            
            <p className="text-base text-ink/70 leading-relaxed">
              Share your ideas, speak into our plans, and help us co-create an inclusive hub that truly serves our community.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleJoinGroup}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-800 to-brand-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:from-brand-900 hover:to-brand-950 transition-all duration-200 border border-brand-700/50"
            >
              <svg className="mr-2 size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Help Build Noa's Place
            </button>
            <button
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-lg border-2 border-brand-800 px-6 py-3 text-base font-semibold text-brand-800 hover:bg-brand-50 transition-colors duration-200"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

