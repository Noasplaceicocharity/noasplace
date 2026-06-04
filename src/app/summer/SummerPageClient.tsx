"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedScrollSection } from "@/components/AnimatedScrollSection";
import OurFunders from "@/components/OurFunders";

const ZEFFY_FORM_PATH = "/embed/ticketing/summer-sensory-sessions";
const ZEFFY_IFRAME_SRC = "https://www.zeffy.com/embed/ticketing/summer-sensory-sessions";
const ZEFFY_EMBED_SCRIPT_SRC = "https://www.zeffy.com/embed/v2/zeffy-embed.js";

const SESSION_DATES = [
  "Thursday 30 July 2026",
  "Thursday 6 August 2026",
  "Thursday 13 August 2026",
  "Thursday 20 August 2026",
  "Thursday 27 August 2026",
];

const ZONES = [
  {
    title: "Calm corner",
    tone: "from-brand-50/80 to-white",
    intro: "When everything feels a bit much, this is the place to land.",
    details: "Soft lighting, sensory tents, bean bags, and quiet nooks where your child (or you) can decompress at your own speed.",
  },
  {
    title: "Move & play",
    tone: "from-amber-50/60 to-white",
    intro: "For children who need to move before they can settle.",
    details: "Trampolines, climbing, and a ball pool, with staff keeping a gentle eye on safety so you can relax a little.",
  },
  {
    title: "Focus & create",
    tone: "from-sky-50/50 to-white",
    intro: "Gentle, hands-on activities for children who like something structured to lean into.",
    details: "Sensory trays, sorting games, activity boards, and busy boards designed to engage without rushing anyone.",
  },
  {
    title: "Family space",
    tone: "from-rose-50/40 to-white",
    intro: "Siblings are welcome. So are grandparents, carers, and anyone who matters to your child.",
    details: "Crafts, connection, and room to meet other families who truly get it, without any pressure to join in.",
  },
];

const SESSION_FLOW = [
  {
    phase: "When you arrive",
    detail:
      "We take our time. Calm music, a friendly hello, and a simple visual tour of the room so you know where everything is before your child dives in. No rush at the door.",
  },
  {
    phase: "Explore together",
    detail:
      "Around an hour to wander between zones however suits your family. Stay in one corner all session, or hop about. Our team are there if you need us, and happy to step back if you do not.",
  },
  {
    phase: "Gentle goodbye",
    detail:
      "Lights soften, sounds ease down, and we wind down together. Story time if your child would like it, and a small keepsake to take home.",
  },
];

function SoftHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-bold tracking-tight text-brand-800 ${className}`}>
      {children}
    </h2>
  );
}

export default function SummerPageClient() {
  const [showFallback, setShowFallback] = useState(false);
  const zeffyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowFallback(false);

    document
      .querySelectorAll(`script[src="${ZEFFY_EMBED_SCRIPT_SRC}"]`)
      .forEach((node) => node.parentNode?.removeChild(node));

    if (zeffyContainerRef.current) {
      zeffyContainerRef.current.innerHTML = "";
      const placeholder = document.createElement("div");
      placeholder.className = "zeffy-full-width zeffy-ticketing";
      placeholder.setAttribute("data-zeffy-embed", "");
      placeholder.setAttribute("data-form-url", ZEFFY_FORM_PATH);
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
    <main className="bg-background text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:min-h-[520px]">
          <div className="relative flex flex-col justify-center bg-white px-6 py-16 sm:px-10 sm:py-20 lg:py-24">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex w-fit rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800"
            >
              Free for families · Ages 4–11
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-4xl font-black leading-[1.15] text-brand-800 sm:text-5xl"
            >
              Summer Sensory Sessions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-3 text-lg font-medium text-ink sm:text-xl"
            >
              A calm summer morning or afternoon for neurodivergent children and the people who love them.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-xl text-lg leading-relaxed text-ink/75"
            >
              Calm, flexible, sensory-informed sessions where your child can explore at their own pace, and you can breathe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#book"
                className="inline-flex items-center rounded-full bg-brand-800 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-900"
              >
                Book your place
              </a>
              <a
                href="#what-to-expect"
                className="inline-flex items-center rounded-full px-7 py-3 text-base font-semibold text-brand-800 underline decoration-brand-300 underline-offset-4 transition-colors hover:decoration-brand-500"
              >
                See what a session looks like
              </a>
            </motion.div>

            <OurFunders heading="Funded by" align="left" className="mt-10" />
          </div>

          <div className="flex min-h-[280px] items-center justify-center bg-white px-6 py-10 sm:min-h-[360px] sm:px-10 lg:min-h-[520px] lg:py-12">
            <div className="relative h-[220px] w-full max-w-xs sm:h-[300px] sm:max-w-sm lg:h-[380px] lg:max-w-md">
              <Image
                src="/hero/summer-sessions.png"
                alt="Children enjoying a calm sensory play session"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width: 1024px) 80vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* At a glance — flowing, not four boxes */}
      <section className="border-y border-brand-100/60 bg-brand-50/25 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg leading-loose text-ink/85 sm:text-xl">
            <span className="font-medium text-brand-800">Every Thursday</span> from 30 July to 27 August 2026
            <br className="hidden sm:inline" />
            <span className="text-ink/50 sm:mx-2">·</span>
            <span className="font-medium text-brand-800">10:30am–12pm</span> or <span className="font-medium text-brand-800">1pm–2:30pm</span>
            <br className="hidden sm:inline" />
            <span className="text-ink/50 sm:mx-2">·</span>
            Little Stars Family Hub, Halifax
          </p>
        </div>
      </section>

      <AnimatedScrollSection>
        <section id="what-to-expect" className="scroll-mt-24 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <SoftHeading className="text-2xl sm:text-3xl">Built around real families</SoftHeading>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              We know what it is like when ordinary play sessions feel too loud, too busy, or simply not made for your
              child. These sessions are different on purpose.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              Instead of one crowded room, the space is split into gentle zones. Your child can choose where they feel
              safest, and you can stay close without having to explain or apologise for how they experience the world.
            </p>
            <p className="mt-6 rounded-3xl bg-brand-50/60 px-6 py-5 text-base leading-relaxed text-brand-900/90">
              <strong className="font-semibold text-brand-800">You do not have to perform.</strong> There is no pressure
              to join in, sit still, or stay for the full session. Siblings, carers, and grandparents are all welcome.
              We keep numbers small (around six families) so it never feels overwhelming.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-4xl space-y-6 px-6">
            {ZONES.map((zone, index) => (
              <motion.article
                key={zone.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`rounded-3xl bg-gradient-to-br ${zone.tone} px-7 py-7 sm:px-9 sm:py-8`}
              >
                <h3 className="text-xl font-bold text-brand-800">{zone.title}</h3>
                <p className="mt-2 text-base font-medium text-ink/90">{zone.intro}</p>
                <p className="mt-3 leading-relaxed text-ink/75">{zone.details}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </AnimatedScrollSection>

      <AnimatedScrollSection>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <SoftHeading className="text-2xl sm:text-3xl">What happens in a session?</SoftHeading>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Each visit lasts about 90 minutes. We have thought carefully about arrivals and goodbyes, because those
              moments matter most for many SEND children.
            </p>

            <ol className="mt-10 space-y-10">
              {SESSION_FLOW.map((step, index) => (
                <li key={step.phase} className="relative pl-10">
                  <span
                    className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  {index < SESSION_FLOW.length - 1 && (
                    <span
                      className="absolute left-3.5 top-9 bottom-[-2.25rem] w-px bg-brand-200/80"
                      aria-hidden
                    />
                  )}
                  <h3 className="text-lg font-semibold text-brand-800">{step.phase}</h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{step.detail}</p>
                </li>
              ))}
            </ol>

            <p className="mt-12 text-lg leading-relaxed text-ink/80">
              Before you come, we will share a simple visual map of the space so your child knows what to expect. No
              surprises, no last-minute changes without telling you first.
            </p>
          </div>
        </section>
      </AnimatedScrollSection>

      <AnimatedScrollSection>
        <section className="bg-brand-50/20 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <SoftHeading className="text-2xl sm:text-3xl">When we are open</SoftHeading>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              Five Thursdays across the summer holidays. Pick a morning or afternoon when you book, whichever suits
              your child&apos;s rhythm best.
            </p>

            <ul className="mt-10 space-y-2 text-left sm:mx-auto sm:max-w-md">
              {SESSION_DATES.map((date) => (
                <li
                  key={date}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-lg text-ink/90 transition-colors hover:bg-white/70"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-brand-400" aria-hidden />
                  {date}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
              <p className="text-lg">
                <span className="block text-sm font-medium text-brand-700">Morning</span>
                <span className="font-semibold text-brand-800">10:30am – 12:00pm</span>
              </p>
              <span className="hidden text-brand-300 sm:inline" aria-hidden>
                |
              </span>
              <p className="text-lg">
                <span className="block text-sm font-medium text-brand-700">Afternoon</span>
                <span className="font-semibold text-brand-800">1:00pm – 2:30pm</span>
              </p>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      <section id="book" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <SoftHeading className="text-2xl sm:text-3xl">Reserve a place for your family</SoftHeading>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              Booking is free. Spaces are limited so each session stays calm and supported. If you are unsure which
              time or date might work, just choose what feels closest and reach out. We are happy to help.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-brand-100/80 sm:p-4" aria-label="Summer sensory sessions booking form">
            <div ref={zeffyContainerRef}>
              <div
                className="zeffy-full-width zeffy-ticketing"
                data-zeffy-embed
                data-form-url={ZEFFY_FORM_PATH}
              />
            </div>

            <div data-zeffy-embed-fallback style={{ display: showFallback ? "block" : "none" }}>
              <div className="relative h-[450px] w-full overflow-hidden rounded-2xl">
                <iframe
                  title="Booking form powered by Zeffy"
                  className="absolute inset-0 h-full w-full border-0"
                  src={ZEFFY_IFRAME_SRC}
                  allow="payment"
                />
              </div>
            </div>
          </div>

          <p className="mt-8 text-center leading-relaxed text-ink/70">
            A question before you book? We would love to hear from you.{" "}
            <Link href="/contact" className="font-medium text-brand-800 hover:underline">
              Send us a message
            </Link>{" "}
            or call{" "}
            <a href="tel:+441422415274" className="font-medium text-brand-800 hover:underline">
              01422 415274
            </a>
            .
          </p>
        </div>
      </section>

      <style jsx global>{`
        .zeffy-full-width,
        .zeffy-full-width > div,
        .zeffy-full-width iframe {
          width: 100% !important;
          max-width: none !important;
        }
        .zeffy-ticketing iframe {
          min-height: 450px !important;
        }
      `}</style>
    </main>
  );
}
