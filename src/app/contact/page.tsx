"use client";

import React from "react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-background text-ink min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50/40 to-white py-24 sm:py-32">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Puzzle piece */}
          <svg className="absolute -right-12 top-12 h-32 w-32 rotate-12 text-[#6E3482]/20" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          {/* Dots */}
          <div className="absolute left-1/4 top-1/3 size-6 rounded-full bg-[#40BFBF]/30" />
          <div className="absolute right-1/3 bottom-1/4 size-4 rounded-full bg-[#FFB800]/30" />
          {/* Star */}
          <svg className="absolute left-1/3 bottom-1/3 h-10 w-10 rotate-12 text-[#6E3482]/20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-black text-ink sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-brand-800 to-brand-500 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-ink/80 sm:text-2xl">
            We'd love to hear from you. Whether you have questions, want to get involved, or simply want to say hello.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
            
            {/* Email Contact */}
            <div className="rounded-2xl bg-brand-50/60 p-8 shadow-sm ring-1 ring-brand-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-xl bg-[#FFB800] p-3">
                    <svg 
                      className="h-6 w-6 text-ink" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-ink">Email Us</h3>
                  <p className="mt-2 text-ink/80">
                    Send us a message and we'll get back to you as soon as we can.
                  </p>
                  <div className="mt-4">
                    <a
                      href="mailto:hello@noasplace.org.uk"
                      className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-brand-800 font-semibold hover:bg-brand-50 transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
                      aria-label="Send email to hello@noasplace.org.uk"
                    >
                      hello@noasplace.org.uk
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-2xl bg-brand-50/60 p-8 shadow-sm ring-1 ring-brand-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="rounded-xl bg-[#40BFBF] p-3">
                    <svg 
                      className="h-6 w-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-ink">Follow Our Journey</h3>
                  <p className="mt-2 text-ink/80">
                    Stay updated with our progress and connect with our community.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="https://www.facebook.com/noasplaceuk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#1877F2] p-3 text-white hover:bg-[#166fe5] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
                      aria-label="Follow us on Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://www.instagram.com/noasplaceuk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-[#E4405F] p-3 text-white hover:bg-[#d62e4c] transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#E4405F] focus:ring-offset-2"
                      aria-label="Follow us on Instagram"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 bg-brand-50/30">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">
              Other Ways to Connect
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/80">
              There are many ways to be part of our journey and support our mission.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Newsletter */}
            <div className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-100">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                <svg className="h-6 w-6 text-brand-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Newsletter</h3>
              <p className="mt-2 text-sm text-ink/80">
                Get regular updates on our progress and community news.
              </p>
              <Link
                href="/#register-form"
                className="mt-4 inline-flex items-center text-sm font-medium text-brand-800 hover:text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Subscribe now
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Volunteer */}
            <div className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-100">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                <svg className="h-6 w-6 text-brand-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Volunteer</h3>
              <p className="mt-2 text-sm text-ink/80">
                Join our team and help make Noa's Place a reality.
              </p>
              <a
                href="mailto:hello@noasplace.org.uk?subject=Volunteering%20Enquiry"
                className="mt-4 inline-flex items-center text-sm font-medium text-brand-800 hover:text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Get involved
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Partnerships */}
            <div className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-100 sm:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                <svg className="h-6 w-6 text-brand-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">Partnerships</h3>
              <p className="mt-2 text-sm text-ink/80">
                Explore opportunities to partner with us and support our mission.
              </p>
              <a
                href="mailto:hello@noasplace.org.uk?subject=Partnership%20Enquiry"
                className="mt-4 inline-flex items-center text-sm font-medium text-brand-800 hover:text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Learn more
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">
            Ready to Support Our Vision?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/80">
            Join hundreds of others who believe in creating an inclusive space for everyone.
          </p>
          <div className="mt-8">
            <Link
              href="/#register-form"
              className="inline-flex items-center justify-center rounded-xl bg-[#FFB800] px-8 py-4 text-lg font-bold text-ink shadow-lg hover:bg-[#ffc533] hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-800 focus:ring-offset-2"
            >
              Show Your Support
              <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
