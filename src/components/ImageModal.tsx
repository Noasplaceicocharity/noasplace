"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  features: string[];
};

export default function ImageModal({ isOpen, onClose, image, title, description, features }: ImageModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Lock body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Only render content if we have valid image data
  const hasValidImage = image.src && image.src.length > 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
      onTransitionEnd={handleAnimationEnd}
    >
      <div
        className={`relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 z-10 rounded-full bg-white p-2 text-ink shadow-lg ring-1 ring-brand-100 transition hover:bg-brand-50"
          aria-label="Close modal"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {hasValidImage && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-brand-50">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover ${
                image.src.includes("all in one rooms") ? "object-center scale-125" : ""
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-brand-800 sm:text-3xl">{title}</h3>
          <p className="mt-4 text-lg text-ink/80">{description}</p>
          <ul className="mt-6 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-ink/80">
                <svg className="mt-1.5 size-4 shrink-0 text-brand-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
