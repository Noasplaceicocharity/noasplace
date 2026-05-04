import Link from "next/link";
import { getVacanciesByType } from "@/lib/vacancies-notion";

export const revalidate = 60;

export default async function JoinTheTeamPage() {
  const [trustees, staff, volunteer] = await Promise.all([
    getVacanciesByType("Trustee"),
    getVacanciesByType("Staff"),
    getVacanciesByType("Volunteer"),
  ]);

  const cards = [
    {
      title: "Become a Trustee",
      description:
        "Help us steer the ship. We’re building a sensory-first sanctuary in Halifax, and we need strategic thinkers (and big hearts) to guide our journey. If you’re passionate about SEND governance and want to help us transition from a growing startup to a lasting community lifeline, we’d love to hear from you.",
      href: "/join-the-team/trustees",
      count: trustees.length,
    },
    {
      title: "Lead Roles",
      description:
        "Shape our future. These volunteer lead roles make things happen, from managing our programs to building the partnerships that help us grow. If you're a leader who wants to roll up your sleeves and help us build a more inclusive West Yorkshire, keep an eye here for our latest openings.",
      href: "/join-the-team/lead-roles",
      count: staff.length,
    },
    {
      title: "Volunteer",
      description:
        "Come as you are. Our volunteers are the heartbeat of Noa’s Place. It’s flexible, rewarding, and a chance to help every family shine.",
      href: "/join-the-team/volunteer",
      count: volunteer.length,
    },
  ];

  return (
    <main className="bg-background py-10 text-ink sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-brand-900 sm:text-5xl">Join the Team</h1>
        <p className="mt-5 max-w-3xl text-lg text-ink/85">
          At Noa&apos;s Place, every role helps children and families in the SEND community feel seen,
          supported and included. Whether you bring strategic leadership, professional expertise or time
          to volunteer, your contribution can make a lasting difference.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <section
              key={card.title}
              className="flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-brand-900">{card.title}</h2>
              <p className="mt-3 flex-grow text-ink/85">{card.description}</p>
              <p className="mt-5 text-sm font-semibold text-brand-800">
                {card.count > 0
                  ? `${card.count} open ${card.count === 1 ? "opportunity" : "opportunities"}`
                  : "No current openings, register your interest"}
              </p>
              <Link
                href={card.href}
                className="mt-5 inline-flex rounded-lg bg-brand-800 px-4 py-2 font-semibold text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
              >
                Explore
              </Link>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
