"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MailchimpSubscribeForm from "./MailchimpSubscribeForm";

type SessionPopupProps = {
  triggerPercent?: number; // 0-100, default 50
};

export default function SessionPopup({ triggerPercent = 10 }: SessionPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const storageKey = "np_session_popup_shown";

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


  if (!mounted || !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-popup-title"
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
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-gray-600 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
          <div className="mx-auto max-w-xl text-center">
            {/* Simple Christmas Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-red-50 border border-red-100">
              <span className="text-sm font-semibold text-red-700">Our Christmas Campaign</span>
            </div>
            
            <h3 id="session-popup-title" className="text-2xl sm:text-3xl font-bold text-brand-800 leading-tight mb-4">
              Help Us Make This Dream A Reality
            </h3>
            
            <p className="mt-4 text-base text-ink/70 leading-relaxed">
              Join our community this Christmas and help us build an inclusive hub where every family feels supported, seen, and valued.
            </p>
          </div>

          <div className="mt-6">
            <MailchimpSubscribeForm />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plans"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-lg bg-brand-800 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-brand-900 transition-colors duration-200"
            >
              View Our Three Year Plan
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href="/about#trustees"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-lg border-2 border-brand-800 px-6 py-3 text-base font-semibold text-brand-800 hover:bg-brand-50 transition-colors duration-200"
            >
              Meet the Trustees
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleClose}
              className="text-sm font-medium text-gray-500 underline underline-offset-4 hover:text-gray-700 transition-colors duration-200"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

