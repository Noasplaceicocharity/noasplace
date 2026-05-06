"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import MailchimpSubscribeForm from "./MailchimpSubscribeForm";
import { theHubDropdownLinks } from "@/data/dreamboardSpaces";

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHubDropdownOpen, setIsHubDropdownOpen] = useState(false);
  const [isFamiliesDropdownOpen, setIsFamiliesDropdownOpen] = useState(false);
  const [isGetInvolvedDropdownOpen, setIsGetInvolvedDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileHubOpen, setIsMobileHubOpen] = useState(false);
  const [isMobileFamiliesOpen, setIsMobileFamiliesOpen] = useState(false);
  const [isMobileGetInvolvedOpen, setIsMobileGetInvolvedOpen] = useState(false);
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
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Desktop Navigation (left) */}
          <div className="flex items-center min-w-0">
            <Link 
              href="/" 
              className="flex items-center shrink-0 group transition-transform duration-300 hover:scale-105"
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
            <nav className="hidden lg:flex items-center gap-1 ml-4 sm:ml-6 lg:ml-8">
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

            {/* The Hub dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsHubDropdownOpen(true)}
              onMouseLeave={() => setIsHubDropdownOpen(false)}
            >
              <Link
                href="/the-hub"
                className={`relative font-medium text-[15px] transition-all duration-200 rounded-lg px-4 py-2.5 flex items-center gap-1.5 ${
                  pathname.startsWith("/the-hub")
                    ? "text-brand-800 font-semibold"
                    : "text-ink/80 hover:text-brand-800"
                }`}
              >
                The Hub
                <svg
                  className={`size-3.5 transition-transform duration-200 ${
                    isHubDropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                {pathname.startsWith("/the-hub") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-800" />
                )}
              </Link>
              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  isHubDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="max-h-[min(75vh,28rem)] min-w-[220px] overflow-y-auto rounded-2xl border border-brand-100/50 bg-white/95 py-2 shadow-xl backdrop-blur-md">
                  {theHubDropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="mx-1 block rounded-lg px-4 py-2 text-sm text-ink/80 transition-all duration-200 hover:bg-brand-50/60 hover:text-brand-800"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Families & Support dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsFamiliesDropdownOpen(true)}
              onMouseLeave={() => setIsFamiliesDropdownOpen(false)}
            >
              <span
                className={`relative flex cursor-default items-center gap-1.5 rounded-lg px-4 py-2.5 text-[15px] font-medium transition-all duration-200 ${
                  pathname.startsWith("/interactive-tools") || pathname.startsWith("/blog")
                    ? "font-semibold text-brand-800"
                    : "text-ink/80 hover:text-brand-800"
                }`}
              >
                Families &amp; Support
                <svg
                  className={`size-3.5 transition-transform duration-200 ${
                    isFamiliesDropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                {(pathname.startsWith("/interactive-tools") || pathname.startsWith("/blog")) && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-800" />
                )}
              </span>
              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  isFamiliesDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="min-w-[200px] rounded-2xl border border-brand-100/50 bg-white/95 py-2 shadow-xl backdrop-blur-md">
                  <Link
                    href="/interactive-tools"
                    className="mx-1 block rounded-lg px-4 py-2.5 text-sm text-ink/80 transition-all duration-200 hover:bg-brand-50/60 hover:text-brand-800"
                  >
                    Interactive Tools
                  </Link>
                  <Link
                    href="/blog"
                    className="mx-1 block rounded-lg px-4 py-2.5 text-sm text-ink/80 transition-all duration-200 hover:bg-brand-50/60 hover:text-brand-800"
                  >
                    Blog
                  </Link>
                </div>
              </div>
            </div>

            {/* Get involved dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsGetInvolvedDropdownOpen(true)}
              onMouseLeave={() => setIsGetInvolvedDropdownOpen(false)}
            >
              <span
                className={`relative flex cursor-default items-center gap-1.5 rounded-lg px-4 py-2.5 text-[15px] font-medium transition-all duration-200 ${
                  pathname.startsWith("/join-the-team")
                    ? "font-semibold text-brand-800"
                    : "text-ink/80 hover:text-brand-800"
                }`}
              >
                Get involved
                <svg
                  className={`size-3.5 transition-transform duration-200 ${
                    isGetInvolvedDropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                {pathname.startsWith("/join-the-team") && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-800" />
                )}
              </span>
              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                  isGetInvolvedDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="min-w-[220px] rounded-2xl border border-brand-100/50 bg-white/95 py-2 shadow-xl backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setShowMailchimpPopup(true)}
                    className="mx-1 block w-full rounded-lg px-4 py-2.5 text-left text-sm text-ink/80 transition-all duration-200 hover:bg-brand-50/60 hover:text-brand-800"
                  >
                    Be a Founding Supporter
                  </button>
                  <Link
                    href="/join-the-team"
                    className="mx-1 block rounded-lg px-4 py-2.5 text-sm text-ink/80 transition-all duration-200 hover:bg-brand-50/60 hover:text-brand-800"
                  >
                    Join the Team
                  </Link>
                  <Link
                    href="/join-the-team/volunteer"
                    className="mx-1 block rounded-lg px-4 py-2.5 text-sm text-ink/80 transition-all duration-200 hover:bg-brand-50/60 hover:text-brand-800"
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </div>

            <NavLink href="/contact" pathname={pathname} label="Contact" />
            </nav>
          </div>

          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMailchimpPopup(true)}
              className="hidden lg:inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-5 py-2.5 text-sm font-semibold text-ink shadow-sm hover:bg-[#ffc533] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
            >
              Be a Founding Supporter
              <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <Link
              href="/donate"
              className="hidden lg:inline-flex items-center justify-center rounded-xl bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-900 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
            >
              Donate
            </Link>
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

        {/* Compact plans bar - We're in Year one, link to full 3-year plan */}
        <Link
          href="/plans"
          className="flex items-center justify-center gap-x-2 sm:gap-x-3 border-t border-brand-100/30 py-2 sm:py-2.5 hover:bg-brand-50/30 transition-colors"
          aria-label="We're in Year one of our 3-year plan - view our plans"
        >
          <span className="text-xs text-ink/70">We're in</span>
          <span className="text-xs font-semibold text-brand-800">Year one</span>
          <span className="text-xs text-ink/70">of our 3-year plan</span>
        </Link>

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[min(90vh,1400px)] opacity-100' : 'max-h-0 opacity-0'
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

              {/* The Hub — collapsible */}
              <div>
                <div className="flex items-center">
                  <Link
                    href="/the-hub"
                    className={`flex-1 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                      pathname.startsWith("/the-hub")
                        ? "bg-brand-50/60 font-semibold text-brand-800"
                        : "text-ink/80 hover:bg-brand-50/40 hover:text-brand-800"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    The Hub
                  </Link>
                  <button
                    type="button"
                    className="rounded-xl p-3 text-ink/60 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                    onClick={() => setIsMobileHubOpen(!isMobileHubOpen)}
                    aria-expanded={isMobileHubOpen}
                    aria-label={isMobileHubOpen ? "Collapse The Hub sections" : "Expand The Hub sections"}
                  >
                    <svg
                      className={`size-4 transition-transform duration-200 ${isMobileHubOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isMobileHubOpen ? "max-h-[32rem] overflow-y-auto opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-brand-100/40 pl-4">
                    {theHubDropdownLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-ink/70 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Families & Support — collapsible */}
              <div>
                <div className="flex items-center">
                  <span
                    className={`flex-1 rounded-xl px-4 py-3 text-base font-medium ${
                      pathname.startsWith("/interactive-tools") || pathname.startsWith("/blog")
                        ? "bg-brand-50/60 font-semibold text-brand-800"
                        : "text-ink/80"
                    }`}
                  >
                    Families &amp; Support
                  </span>
                  <button
                    type="button"
                    className="rounded-xl p-3 text-ink/60 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                    onClick={() => setIsMobileFamiliesOpen(!isMobileFamiliesOpen)}
                    aria-expanded={isMobileFamiliesOpen}
                    aria-label={
                      isMobileFamiliesOpen ? "Collapse Families and Support" : "Expand Families and Support"
                    }
                  >
                    <svg
                      className={`size-4 transition-transform duration-200 ${isMobileFamiliesOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isMobileFamiliesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-brand-100/40 pl-4">
                    <Link
                      href="/interactive-tools"
                      className="block rounded-lg px-3 py-2 text-sm text-ink/70 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Interactive Tools
                    </Link>
                    <Link
                      href="/blog"
                      className="block rounded-lg px-3 py-2 text-sm text-ink/70 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              </div>

              {/* Get involved — collapsible */}
              <div>
                <div className="flex items-center">
                  <span
                    className={`flex-1 rounded-xl px-4 py-3 text-base font-medium ${
                      pathname.startsWith("/join-the-team")
                        ? "bg-brand-50/60 font-semibold text-brand-800"
                        : "text-ink/80"
                    }`}
                  >
                    Get involved
                  </span>
                  <button
                    type="button"
                    className="rounded-xl p-3 text-ink/60 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                    onClick={() => setIsMobileGetInvolvedOpen(!isMobileGetInvolvedOpen)}
                    aria-expanded={isMobileGetInvolvedOpen}
                    aria-label={isMobileGetInvolvedOpen ? "Collapse Get involved" : "Expand Get involved"}
                  >
                    <svg
                      className={`size-4 transition-transform duration-200 ${isMobileGetInvolvedOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isMobileGetInvolvedOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-brand-100/40 pl-4">
                    <button
                      type="button"
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink/70 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                      onClick={() => {
                        setShowMailchimpPopup(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Be a Founding Supporter
                    </button>
                    <Link
                      href="/join-the-team"
                      className="block rounded-lg px-3 py-2 text-sm text-ink/70 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join the Team
                    </Link>
                    <Link
                      href="/join-the-team/volunteer"
                      className="block rounded-lg px-3 py-2 text-sm text-ink/70 transition-all duration-200 hover:bg-brand-50/40 hover:text-brand-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Volunteer
                    </Link>
                  </div>
                </div>
              </div>

              <MobileNavLink href="/contact" pathname={pathname} label="Contact" onClick={() => setIsMobileMenuOpen(false)} />

              <button
                type="button"
                onClick={() => {
                  setShowMailchimpPopup(true);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#FFB800] px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-all duration-200 hover:bg-[#ffc533] hover:shadow-md active:scale-[0.98]"
              >
                Be a Founding Supporter
                <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <Link
                href="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-900 hover:shadow-md active:scale-[0.98]"
              >
                Donate
                <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
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
