"use client";

import { useEffect, useRef, useState } from "react";

const ZEFFY_IFRAME_SRC = "https://www.zeffy.com/embed/donation-form/donate-to-noas-place";
const ZEFFY_EMBED_SCRIPT_SRC = "https://www.zeffy.com/embed/v2/zeffy-embed.js";

export default function DonatePage() {
  const [showFallback, setShowFallback] = useState(false);
  const zeffyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowFallback(false);

    // Zeffy script runs on load; force re-run for client-side navigation.
    document
      .querySelectorAll(`script[src="${ZEFFY_EMBED_SCRIPT_SRC}"]`)
      .forEach((node) => node.parentNode?.removeChild(node));

    if (zeffyContainerRef.current) {
      zeffyContainerRef.current.innerHTML = "";
      const placeholder = document.createElement("div");
      placeholder.className = "zeffy-full-width zeffy-taller";
      placeholder.setAttribute("data-zeffy-embed", "");
      placeholder.setAttribute("data-form-url", "/embed/donation-form/donate-to-noas-place");
      zeffyContainerRef.current.appendChild(placeholder);
    }

    const script = document.createElement("script");
    script.src = ZEFFY_EMBED_SCRIPT_SRC;
    script.async = true;
    script.onerror = () => setShowFallback(true);
    document.body.appendChild(script);

    return () => {
      script.onerror = null;
    };
  }, []);

  return (
    <main className="bg-gradient-to-b from-white via-brand-50/20 to-white">
      <section className="w-full px-6 py-14 sm:px-8 sm:py-20">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Support a SEND family today
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-ink/85">
          Your donation helps families feel supported, seen and valued.
        </p>
        <p className="mx-auto mt-1 max-w-3xl text-center text-lg text-ink/85">
          Together, we can open Noa&apos;s Place and create a safe space where every family belongs.
        </p>

        <section
          id="donation-form"
          className="mt-10"
          aria-label="Donation form"
        >
          <div ref={zeffyContainerRef}>
            <div
              className="zeffy-full-width zeffy-taller"
              data-zeffy-embed
              data-form-url="/embed/donation-form/donate-to-noas-place"
            />
          </div>

          <div data-zeffy-embed-fallback style={{ display: showFallback ? "block" : "none" }}>
            <div className="relative h-[900px] w-full overflow-hidden rounded-2xl border border-brand-100">
              <iframe
                title="Donation form powered by Zeffy"
                className="absolute inset-0 h-full w-full border-0"
                src={ZEFFY_IFRAME_SRC}
                allow="payment"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-brand-100 pt-8">
          <h2 className="text-2xl font-bold tracking-tight text-brand-900">Other ways to donate</h2>
          <p className="mt-2 text-sm text-ink/70">Prefer to donate another way? We&apos;re happy to help.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-100 bg-white/80 p-5">
              <h3 className="text-lg font-semibold text-ink">Over the phone</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                Please call our team on{" "}
                <a className="font-semibold text-brand-800 hover:underline" href="tel:+441422415274">
                  01422 415274
                </a>{" "}
                (9-5pm, Monday to Friday) and we can take a card payment over the phone.
              </p>
              <a
                href="tel:+441422415274"
                className="mt-4 inline-flex items-center rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
              >
                Call 01422 415274
              </a>
            </div>

            <div className="rounded-2xl border border-brand-100 bg-white/80 p-5">
              <h3 className="text-lg font-semibold text-ink">BACS</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                If you want to pay via BACS or have a query about donating, email{" "}
                <a className="font-semibold text-brand-800 hover:underline" href="mailto:hello@noasplace.org.uk">
                  hello@noasplace.org.uk
                </a>{" "}
                or call us on{" "}
                <a className="font-semibold text-brand-800 hover:underline" href="tel:+441422415274">
                  01422 415274
                </a>
                .
              </p>
              <a
                href="mailto:hello@noasplace.org.uk?subject=BACS%20donation%20enquiry"
                className="mt-4 inline-flex items-center rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
              >
                Email us about BACS
              </a>
            </div>
          </div>
        </section>
      </section>

      <style jsx global>{`
        .zeffy-full-width,
        .zeffy-full-width > div,
        .zeffy-full-width iframe {
          width: 100% !important;
          max-width: none !important;
        }
        .zeffy-taller iframe {
          min-height: 900px !important;
        }
      `}</style>
    </main>
  );
}
