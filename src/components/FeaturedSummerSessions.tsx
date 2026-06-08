import Image from "next/image";
import Link from "next/link";

export default function FeaturedSummerSessions() {
  return (
    <section
      className="relative overflow-hidden border-b border-brand-100/60 bg-gradient-to-br from-amber-50/70 via-brand-50/30 to-sky-50/40 py-12 sm:py-16"
      aria-labelledby="featured-summer-heading"
    >
      <div className="pointer-events-none absolute -left-16 top-1/4 h-56 w-56 rounded-full bg-[#FFB800]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-brand-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="inline-flex rounded-full bg-[#FFB800] px-4 py-1.5 text-sm font-bold text-ink shadow-sm">
              Featured event
            </span>
            <h2
              id="featured-summer-heading"
              className="mt-4 text-3xl font-black leading-tight text-brand-800 sm:text-4xl"
            >
              Summer Sensory Sessions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80 sm:text-xl">
              Free, calm mornings and afternoons for neurodivergent children aged 4–11 and the people who love them.
            </p>
            <ul className="mt-6 space-y-2 text-base text-ink/75 sm:text-lg">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-800" aria-hidden />
                <span>
                  <strong className="font-semibold text-brand-800">Every Thursday</strong> · 30 July – 27 August 2026
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-800" aria-hidden />
                <span>
                  <strong className="font-semibold text-brand-800">10:30am–12pm</strong> or{" "}
                  <strong className="font-semibold text-brand-800">1pm–2:30pm</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-800" aria-hidden />
                <span>Little Stars Family Hub, Halifax</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/summer"
                className="inline-flex items-center rounded-full bg-brand-800 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-brand-900"
              >
                Book your place
                <svg className="ml-2 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/summer#what-to-expect"
                className="inline-flex items-center rounded-full px-5 py-3 text-base font-semibold text-brand-800 underline decoration-brand-300 underline-offset-4 transition-colors hover:decoration-brand-500"
              >
                See what to expect
              </Link>
            </div>
          </div>

          <Link
            href="/summer"
            className="group relative mx-auto block w-full max-w-md lg:max-w-none"
            aria-label="Summer Sensory Sessions — view details and book"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-brand-100/80 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
              <Image
                src="/hero/summer-sessions.png"
                alt="Children enjoying a calm sensory play session"
                fill
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-contain p-4 transition duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
