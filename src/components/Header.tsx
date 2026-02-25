"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import MailchimpSubscribeForm from "./MailchimpSubscribeForm";

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMailchimpPopup, setShowMailchimpPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showMailchimpPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMailchimpPopup]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-brand-100/40" 
          : "bg-white/95 backdrop-blur-sm border-b border-brand-100/20"
      }`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/images/noas place logo.png"
              alt="Noa's Place"
              width={150}
              height={150}
              className="h-auto w-[100px] sm:w-[110px] md:w-[120px] transition-opacity duration-300 group-hover:opacity-90"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {/* About Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link 
                href="/about"
                className={`relative font-medium text-[15px] transition-all duration-200 rounded-lg px-4 py-2.5 flex items-center gap-1.5 group ${
                  pathname === "/about" 
                    ? "text-brand-800 font-semibold" 
                    : "text-ink/80 hover:text-brand-800"
                }`}
              >
                About
                <svg 
                  className={`size-3.5 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
                {pathname === "/about" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-800" />
                )}
              </Link>
              
              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-brand-100/50 py-2 min-w-[180px]">
                  <Link
                    href="/about#our-story"
                    className="block px-4 py-2.5 text-sm text-ink/80 hover:text-brand-800 hover:bg-brand-50/60 transition-all duration-200 rounded-lg mx-1"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/about#our-vision"
                    className="block px-4 py-2.5 text-sm text-ink/80 hover:text-brand-800 hover:bg-brand-50/60 transition-all duration-200 rounded-lg mx-1"
                  >
                    Our Vision
                  </Link>
                  <Link
                    href="/about#trustees"
                    className="block px-4 py-2.5 text-sm text-ink/80 hover:text-brand-800 hover:bg-brand-50/60 transition-all duration-200 rounded-lg mx-1"
                  >
                    Trustees
                  </Link>
                </div>
              </div>
            </div>

            <NavLink href="/plans" pathname={pathname} label="Our Plans" />
            <NavLink href="/interactive-tools" pathname={pathname} label="Interactive Tools" />
            <NavLink href="/blog" pathname={pathname} label="Blog" matchStart />
            <NavLink href="/take-action" pathname={pathname} label="Take Action" matchStart />
            <NavLink href="/contact" pathname={pathname} label="Contact" />
          </nav>
          
          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMailchimpPopup(true)}
              className="hidden lg:inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-5 py-2.5 text-sm font-semibold text-ink shadow-sm hover:bg-[#ffc533] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
            >
              Support Us
              <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-xl hover:bg-brand-50/60 transition-all duration-200 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? 'rotate-45 top-1/2 -translate-y-1/2' 
                      : 'top-0'
                  }`}
                />
                <span 
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`absolute left-0 w-6 h-0.5 bg-ink rounded-full transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? '-rotate-45 top-1/2 -translate-y-1/2' 
                      : 'bottom-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-brand-100/30 bg-white/95 backdrop-blur-sm py-4">
            <div className="px-4 space-y-1">
              {/* About Collapsible Section */}
              <div>
                <div className="flex items-center">
                  <Link
                    href="/about"
                    className={`flex-1 font-medium text-base transition-all duration-200 rounded-xl px-4 py-3 ${
                      pathname === "/about" 
                        ? "text-brand-800 font-semibold bg-brand-50/60" 
                        : "text-ink/80 hover:text-brand-800 hover:bg-brand-50/40"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <button
                    className="p-3 text-ink/60 hover:text-brand-800 transition-all duration-200 rounded-xl hover:bg-brand-50/40"
                    onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  >
                    <svg 
                      className={`size-4 transition-transform duration-200 ${
                        isMobileAboutOpen ? 'rotate-180' : ''
                      }`} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                </div>

                {/* About Submenu - Collapsible */}
                <div 
                  className={`overflow-hidden transition-all duration-200 ${
                    isMobileAboutOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-brand-100/40 pl-4">
                    <Link
                      href="/about#our-story"
                      className="block text-sm text-ink/70 hover:text-brand-800 hover:bg-brand-50/40 transition-all duration-200 rounded-lg px-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/about#our-vision"
                      className="block text-sm text-ink/70 hover:text-brand-800 hover:bg-brand-50/40 transition-all duration-200 rounded-lg px-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Vision
                    </Link>
                    <Link
                      href="/about#trustees"
                      className="block text-sm text-ink/70 hover:text-brand-800 hover:bg-brand-50/40 transition-all duration-200 rounded-lg px-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Trustees
                    </Link>
                  </div>
                </div>
              </div>

              <MobileNavLink href="/plans" pathname={pathname} label="Our Plans" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/interactive-tools" pathname={pathname} label="Interactive Tools" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/blog" pathname={pathname} label="Blog" matchStart onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/take-action" pathname={pathname} label="Take Action" matchStart onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/contact" pathname={pathname} label="Contact" onClick={() => setIsMobileMenuOpen(false)} />

              {/* CTA Buttons */}
              <button
                onClick={() => {
                  setShowMailchimpPopup(true);
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-6 py-3 text-sm font-semibold text-ink shadow-sm hover:bg-[#ffc533] hover:shadow-md active:scale-[0.98] transition-all duration-200 w-full mt-4"
              >
                Support Us
                <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mailchimp Popup Modal - Rendered via Portal */}
      {mounted && showMailchimpPopup && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMailchimpPopup(false);
          }}
        >
          <div
            ref={containerRef}
            className="relative w-full max-w-2xl my-auto rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowMailchimpPopup(false)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-ink shadow ring-1 ring-brand-100 transition hover:bg-brand-50"
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="px-6 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-14">
              <div className="mx-auto max-w-xl text-center">
                <h3 className="text-2xl font-bold text-brand-800">Join Our Mission</h3>
                <p className="mt-2 text-ink/80">
                  Show your support by joining our mailing list. We'll keep you updated on our progress and show how your support makes a difference.
                </p>
              </div>

              <div className="mt-6">
                <MailchimpSubscribeForm />
              </div>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowMailchimpPopup(false)}
                  className="text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
                >
                  No thanks
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

// Helper component for desktop nav links
function NavLink({ 
  href, 
  pathname, 
  label, 
  matchStart = false 
}: { 
  href: string; 
  pathname: string; 
  label: string; 
  matchStart?: boolean;
}) {
  const isActive = matchStart ? pathname.startsWith(href) : pathname === href;
  
  return (
    <Link 
      href={href}
      className={`relative font-medium text-[15px] transition-all duration-200 rounded-lg px-4 py-2.5 ${
        isActive 
          ? "text-brand-800 font-semibold" 
          : "text-ink/80 hover:text-brand-800"
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-800" />
      )}
    </Link>
  );
}

// Helper component for mobile nav links
function MobileNavLink({ 
  href, 
  pathname, 
  label, 
  matchStart = false,
  onClick
}: { 
  href: string; 
  pathname: string; 
  label: string; 
  matchStart?: boolean;
  onClick: () => void;
}) {
  const isActive = matchStart ? pathname.startsWith(href) : pathname === href;
  
  return (
    <Link 
      href={href}
      className={`block font-medium text-base transition-all duration-200 rounded-xl px-4 py-3 ${
        isActive 
          ? "text-brand-800 font-semibold bg-brand-50/60" 
          : "text-ink/80 hover:text-brand-800 hover:bg-brand-50/40"
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
