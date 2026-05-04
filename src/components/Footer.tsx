"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

const PDF_BASE =
  "https://pub-c8d04e15fd394bb18ba7c7e5f0129c6b.r2.dev/Policies";

const SAFEGUARDING_PDF = `${PDF_BASE}/Noa%E2%80%99s%20Place%20CIO%20-%20Safeguarding%20Policy%20(Children%20%26%20Adults%20at%20Risk)%20(2).pdf`;
const EDI_PDF = `${PDF_BASE}/Noa%E2%80%99s%20Place%20-%20Equality%2C%20Diversity%20%26%20Inclusion%20Policy%20(1).pdf`;
const COMPLAINTS_PDF = `${PDF_BASE}/Complaints%20%26%20Feedback%20Policy%20-%20Noa%27s%20Place%20CIO.pdf`;

function Dot() {
  return (
    <span className="text-white/50 px-1 select-none" aria-hidden>
      ·
    </span>
  );
}

export default function Footer() {
  const getTimeBasedGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.toLocaleDateString("en-GB", { weekday: "long" });

    let timeOfDay;
    if (hour < 12) timeOfDay = "morning";
    else if (hour < 17) timeOfDay = "afternoon";
    else timeOfDay = "evening";

    return `${dayOfWeek} ${timeOfDay}`;
  };

  const linkClass =
    "text-white/80 hover:text-white transition-colors text-sm";

  return (
    <footer className="bg-brand-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-7 lg:gap-8">
          {/* Column 1 — Logo and description */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center">
              <Image
                src="/images/noas_placewhite_logo_png.png"
                alt="Noa's Place"
                width={120}
                height={120}
                className="h-auto w-[80px] sm:w-[100px]"
              />
            </Link>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-white/80">
              Together we make space for every family to shine
            </p>
            <p className="mb-6 max-w-md text-sm font-bold text-white">
              Have a great rest of your {getTimeBasedGreeting()}!
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/noasplaceuk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Follow us on Facebook"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/noasplaceuk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Follow us on Instagram"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/plans" className={linkClass}>
                  Our Plans
                </Link>
              </li>
              <li>
                <Link href="/the-hub" className={linkClass}>
                  The Hub
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Families & Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Families &amp; Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/interactive-tools" className={linkClass}>
                  Interactive Tools
                </Link>
              </li>
              <li className="pl-3 border-l border-white/20">
                <Link
                  href="/interactive-tools/sensory-overload"
                  className={linkClass}
                >
                  Child Sensory Profile Builder
                </Link>
              </li>
              <li className="pl-3 border-l border-white/20">
                <Link
                  href="/interactive-tools/all-about-me-child"
                  className={linkClass}
                >
                  Child About Me Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Get Involved */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Get Involved
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#founding-supporter"
                  className={linkClass}
                >
                  Be a Founding Supporter
                </Link>
              </li>
              <li>
                <Link href="/join-the-team" className={linkClass}>
                  Join the Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 — Contact & Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact &amp; Newsletter
            </h3>
            <ul className="mb-6 space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="mailto:hello@noasplace.org.uk"
                  className="hover:text-white transition-colors"
                >
                  hello@noasplace.org.uk
                </a>
              </li>
              <li>
                <a
                  href="tel:+441422415274"
                  className="hover:text-white transition-colors"
                >
                  01422 415274
                </a>
              </li>
              <li>Halifax, West Yorkshire</li>
            </ul>
            <h4 className="mb-2 text-base font-semibold text-white">
              Newsletter signup
            </h4>
            <p className="mb-4 text-sm text-white/80">
              Hear about new tools, events and how the hub is taking shape
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/20 pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1 text-left text-xs text-white/65 sm:text-sm">
              <p>
                © {new Date().getFullYear()} Noa&apos;s Place. All rights
                reserved.
              </p>
              <p>
                Noa&apos;s Place CIO — Registered Charity in England &amp;
                Wales No. 1217825
              </p>
            </div>
            <nav
              aria-label="Legal and policies"
              className="flex flex-wrap items-center justify-start gap-y-2 text-xs text-white/70 sm:justify-end sm:text-sm lg:max-w-[55%] lg:text-right"
            >
              <Link
                href="/privacy-policy"
                className="text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Privacy Policy
              </Link>
              <Dot />
              <Link
                href="/cookie-policy"
                className="text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Cookie Policy
              </Link>
              <Dot />
              <a
                href={SAFEGUARDING_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Safeguarding Policy
              </a>
              <Dot />
              <a
                href={EDI_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                EDI Policy
              </a>
              <Dot />
              <a
                href={COMPLAINTS_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                Complaints
              </a>
              <Dot />
              <Link
                href="/policies"
                className="text-white/80 underline-offset-2 hover:text-white hover:underline"
              >
                All Policies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
