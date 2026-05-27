import Link from "next/link";

export default function AlwaysOpenVolunteerCard() {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition hover:border-brand-500/50 hover:shadow-md">
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-800">Volunteer</p>
        <h3 className="mt-2 text-2xl font-bold text-brand-900">Volunteer with Us</h3>
        <p className="mt-2 text-sm text-ink/75">
          <span className="font-semibold text-ink">Availability: </span>
          Always open
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/85">
          Come as you are. Our volunteers are the heartbeat of Noa&apos;s Place. It&apos;s flexible,
          rewarding, and a chance to help every family shine.
        </p>
        <Link
          href="/join-the-team/volunteer"
          className="mt-6 inline-flex items-center rounded-lg bg-brand-800 px-4 py-2 font-semibold text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
        >
          Register interest
        </Link>
      </div>
    </article>
  );
}
