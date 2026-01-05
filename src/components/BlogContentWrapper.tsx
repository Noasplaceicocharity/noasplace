"use client";

import { useEffect } from "react";

export default function BlogContentWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Handle clicks on CTA buttons in blog content
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if clicked element or its parent has the data attribute
      const ctaButton = target.closest('[data-mailchimp-cta]');
      
      if (ctaButton) {
        e.preventDefault();
        e.stopPropagation();
        // Dispatch custom event to open popup
        window.dispatchEvent(new CustomEvent("openMailchimpPopup"));
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return <>{children}</>;
}

