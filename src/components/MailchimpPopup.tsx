"use client";

import { useEffect, useRef, useState } from "react";
import MailchimpSubscribeForm from "./MailchimpSubscribeForm";

type MailchimpPopupProps = {
  triggerPercent?: number; // 0-100, default 50
  storageKey?: string; // sessionStorage key to avoid repeat in a session
  disableAutoTrigger?: boolean; // If true, only opens via custom event
};

export default function MailchimpPopup({ triggerPercent = 50, storageKey = "np_mailchimp_popup_shown", disableAutoTrigger = false }: MailchimpPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alreadyShown = typeof window !== "undefined" ? sessionStorage.getItem(storageKey) === "1" : false;
    setHasShown(alreadyShown);
  }, [storageKey]);

  // Listen for custom event to open popup
  useEffect(() => {
    const handleOpenPopup = () => {
      setIsOpen(true);
    };

    window.addEventListener("openMailchimpPopup", handleOpenPopup);
    return () => {
      window.removeEventListener("openMailchimpPopup", handleOpenPopup);
    };
  }, []);

  useEffect(() => {
    if (hasShown || disableAutoTrigger) return;

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

    // Show after a tiny delay to avoid CLS during initial paint if already at 50%
    const id = window.setTimeout(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 500);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasShown, storageKey, triggerPercent, disableAutoTrigger]);

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

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-ink shadow ring-1 ring-brand-100 transition hover:bg-brand-50"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-2xl font-bold text-brand-800">We need your support to get off the ground</h3>
            <p className="mt-2 text-ink/80">
              If this tool helps you, please join our mailing list so we can keep you updated and show how your support makes a difference.
            </p>
          </div>

          <div className="mt-6">
            <MailchimpSubscribeForm />
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


