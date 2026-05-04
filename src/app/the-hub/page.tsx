"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedScrollSection } from "@/components/AnimatedScrollSection";
import { dreamboardSpaces } from "@/data/dreamboardSpaces";

export default function TheHubPage() {
  return (
    <main className="bg-background text-ink">
      <section className="relative min-h-[480px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_background.png"
            alt=""
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-white/80" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-purple-200/25 blur-3xl" />
          <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-yellow-200/20 blur-3xl" />
        </div>
        <div className="relative z-20 mx-auto max-w-4xl px-6 pb-16 pt-24 text-center sm:pt-32 sm:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-black leading-tight text-brand-800 sm:text-5xl md:text-6xl"
          >
            The Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mb-4 text-xl font-bold text-ink sm:text-2xl"
          >
            The Noa&apos;s Place Hub we are building in Halifax, West Yorkshire
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-ink/80 sm:text-xl"
          >
            A calm, welcoming, sensory-aware home for neurodivergent and disabled people and their
            families, where you can simply be yourselves and shine.
          </motion.p>
        </div>
      </section>

      <AnimatedScrollSection>
        <section
          id="our-vision"
          className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-brand-50/30 to-white py-20 sm:scroll-mt-28"
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
              >
                <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-brand-800 sm:text-4xl md:text-5xl">
                  What we envision
                </h2>
                <div className="space-y-4 text-lg leading-relaxed text-ink/80">
                  <p>
                    We are developing a dedicated community hub designed specifically for the SEND
                    community: a place where families finally feel they belong.
                  </p>
                  <p>
                    <strong>Noa&apos;s Place will not just be a building; it will be a lifeline.</strong>{" "}
                    Sensory rooms, inclusive play, a community café, event spaces, and a charity shop
                    under one roof, with respite, connection, and practical support when you need it.
                  </p>
                  <p className="font-medium text-brand-800">
                    Early support, not crisis-only support: immediate, understanding help in an
                    environment built around your needs.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative"
              >
                <Image
                  src="/images/The Hub Concept.jpg"
                  alt="Illustration of the inclusive Noa's Place Hub concept"
                  width={1200}
                  height={800}
                  className="w-full rounded-3xl shadow-2xl ring-4 ring-white/50"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>

      <AnimatedScrollSection>
        <section
          id="our-dreamboard"
          className="relative scroll-mt-24 bg-gradient-to-b from-white via-brand-50/20 to-white py-16 sm:scroll-mt-28"
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="mb-3 text-2xl font-extrabold text-ink sm:text-3xl">Our dreamboard</h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-ink/75">
              This is what we imagine the hub will look like. Each area has its own role in helping
              families feel safe, included, and supported.
            </p>
            <nav
              aria-label="Jump to hub spaces"
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
            >
              {dreamboardSpaces.map((space) => (
                <a
                  key={space.id}
                  href={`#${space.id}`}
                  className="rounded-full border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-800 shadow-sm transition hover:border-brand-400 hover:bg-brand-50"
                >
                  {space.title}
                </a>
              ))}
            </nav>
          </div>
        </section>
      </AnimatedScrollSection>

      {dreamboardSpaces.map((space, index) => {
        const imageFirst = index % 2 === 0;
        const copyBlock = (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-extrabold text-brand-800 sm:text-4xl">{space.title}</h2>
            <p className="mb-6 text-lg leading-relaxed text-ink/80">{space.description}</p>
            <ul className="space-y-3 border-l-4 border-brand-800 pl-5">
              {space.features.map((feature) => (
                <li key={feature} className="leading-relaxed text-ink/85">
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        );
        const imageBlock = (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative overflow-hidden rounded-3xl shadow-2xl ring-2 ring-brand-100/50"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={space.image.src}
                alt={space.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={
                  space.id === "event-spaces"
                    ? "scale-125 object-cover object-top sm:scale-110"
                    : "object-cover"
                }
              />
            </div>
          </motion.div>
        );
        return (
          <AnimatedScrollSection key={space.id}>
            <section
              id={space.id}
              className="scroll-mt-24 border-t border-brand-100/60 bg-gradient-to-b from-white via-brand-50/25 to-white py-20 sm:scroll-mt-28 sm:py-24"
            >
              <div className="mx-auto max-w-7xl px-6">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  {imageFirst ? (
                    <>
                      {imageBlock}
                      {copyBlock}
                    </>
                  ) : (
                    <>
                      {copyBlock}
                      {imageBlock}
                    </>
                  )}
                </div>
              </div>
            </section>
          </AnimatedScrollSection>
        );
      })}

      <AnimatedScrollSection>
        <section
          id="bigger-plan"
          className="relative scroll-mt-24 bg-gradient-to-b from-white to-brand-50/40 py-20 sm:scroll-mt-28"
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-extrabold text-brand-800 sm:text-3xl">
              Part of a bigger plan
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-ink/80">
              The hub sits at the heart of our three-year strategy, from listening to families and
              building partnerships to fundraising and opening the doors. Read the full roadmap
              whenever you are ready.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-xl bg-brand-800 px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-brand-900"
              >
                View our plans
                <svg
                  className="ml-2 size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-brand-200 bg-white px-6 py-3.5 text-base font-bold text-brand-800 transition hover:border-brand-400 hover:bg-brand-50/80"
              >
                Get in touch
              </Link>
              <Link
                href="/#dreamboard"
                className="inline-flex items-center justify-center text-sm font-semibold text-ink/70 underline-offset-4 transition hover:text-brand-800 hover:underline"
              >
                See the dreamboard on the home page
              </Link>
            </div>
          </div>
        </section>
      </AnimatedScrollSection>
    </main>
  );
}
