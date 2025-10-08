"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white border-b border-brand-100/30 z-50 backdrop-blur-sm bg-white/95">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Small decorative elements */}
        <div className="absolute right-1/4 top-1/2 size-3 rounded-full bg-[#6E3482]/20" />
        <div className="absolute left-1/3 top-1/2 size-2 rounded-full bg-[#40BFBF]/20" />
        <svg className="absolute right-1/3 top-1/2 h-4 w-4 text-[#FFB800]/20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition duration-200">
            <Image
              src="/images/noas place logo.png"
              alt="Noa's Place"
              width={150}
              height={150}
              className="h-auto w-[100px] sm:w-[120px] md:w-[140px]"
              priority
            />
          </Link>

          <div className="flex items-center justify-between flex-1">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {/* About Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link 
                  href="/about"
                  className={`font-medium text-lg transition-all duration-300 rounded-lg px-3 py-2 flex items-center gap-1 ${
                    pathname === "/about" 
                      ? "text-brand-800 font-bold bg-brand-50/80" 
                      : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                  }`}
                >
                  About
                  <svg className="size-4 transition-transform duration-200" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Link>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 pt-1 pb-3 w-48 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-brand-100/30 py-3">
                      <Link
                        href="/about#our-story"
                        className="block mx-2 px-3 py-2 text-sm text-ink hover:bg-brand-50/80 hover:text-brand-800 transition-all duration-300 rounded-lg"
                      >
                        Our Story
                      </Link>
                      <Link
                        href="/about#our-vision"
                        className="block mx-2 px-3 py-2 text-sm text-ink hover:bg-brand-50/80 hover:text-brand-800 transition-all duration-300 rounded-lg"
                      >
                        Our Vision
                      </Link>
                      <Link
                        href="/about#trustees"
                        className="block mx-2 px-3 py-2 text-sm text-ink hover:bg-brand-50/80 hover:text-brand-800 transition-all duration-300 rounded-lg"
                      >
                        Trustees
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href="/plans"
                className={`font-medium text-lg transition-all duration-300 rounded-lg px-3 py-2 ${
                  pathname === "/plans" 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
              >
                Our Plans
              </Link>

              <Link 
                href="/interactive-tools"
                className={`font-medium text-lg transition-all duration-300 rounded-lg px-3 py-2 ${
                  pathname === "/interactive-tools" 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
              >
                Interactive Tools
              </Link>

              <Link 
                href="/blog"
                className={`font-medium text-lg transition-all duration-300 rounded-lg px-3 py-2 ${
                  pathname.startsWith("/blog") 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
              >
                Blog
              </Link>

              <Link 
                href="/contact"
                className={`font-medium text-lg transition-all duration-300 rounded-lg px-3 py-2 ${
                  pathname === "/contact" 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
              >
                Contact
              </Link>
            </nav>
            
            {/* CTA Button */}
            <a
              href={pathname === "/" ? "#register-form" : "/#register-form"}
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-6 py-3 text-base font-bold text-ink shadow-sm hover:bg-[#ffc533] hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
            >
              Support Us
              <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-brand-50 transition duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="size-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="size-6 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-brand-100/30 bg-white/95 backdrop-blur-sm">
            <div className="px-6 py-4 space-y-4">
              {/* About Collapsible Section */}
              <div>
                <div className="flex items-center">
                  <Link
                    href="/about"
                    className={`flex-1 font-medium text-lg transition-all duration-300 rounded-lg px-3 py-3 ${
                      pathname === "/about" 
                        ? "text-brand-800 font-bold bg-brand-50/80" 
                        : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <button
                    className="p-3 text-ink hover:text-brand-800 transition-all duration-300"
                    onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  >
                    <svg 
                      className="size-4 transition-transform duration-200" 
                      style={{ transform: isMobileAboutOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                </div>

                {/* About Submenu - Collapsible */}
                {isMobileAboutOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    <Link
                      href="/about#our-story"
                      className="block text-sm text-ink hover:text-brand-800 hover:bg-brand-50/60 transition-all duration-300 rounded-lg px-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/about#our-vision"
                      className="block text-sm text-ink hover:text-brand-800 hover:bg-brand-50/60 transition-all duration-300 rounded-lg px-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Our Vision
                    </Link>
                    <Link
                      href="/about#trustees"
                      className="block text-sm text-ink hover:text-brand-800 hover:bg-brand-50/60 transition-all duration-300 rounded-lg px-3 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Trustees
                    </Link>
                  </div>
                )}
              </div>

              {/* Our Plans Link */}
              <Link 
                href="/plans"
                className={`block font-medium text-lg transition-all duration-300 rounded-lg px-3 py-3 ${
                  pathname === "/plans" 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Plans
              </Link>

              {/* Interactive Tools Link */}
              <Link 
                href="/interactive-tools"
                className={`block font-medium text-lg transition-all duration-300 rounded-lg px-3 py-3 ${
                  pathname === "/interactive-tools" 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Interactive Tools
              </Link>

              {/* Blog Link */}
              <Link 
                href="/blog"
                className={`block font-medium text-lg transition-all duration-300 rounded-lg px-3 py-3 ${
                  pathname.startsWith("/blog") 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Contact Link */}
              <Link 
                href="/contact"
                className={`block font-medium text-lg transition-all duration-300 rounded-lg px-3 py-3 ${
                  pathname === "/contact" 
                    ? "text-brand-800 font-bold bg-brand-50/80" 
                    : "text-ink hover:text-brand-800 hover:bg-brand-50/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* CTA Button */}
              <a
                href={pathname === "/" ? "#register-form" : "/#register-form"}
                className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-6 py-3 text-base font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200 w-full mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support Us
                <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
