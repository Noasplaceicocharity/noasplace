import Link from "next/link";
import AlwaysOpenVolunteerCard from "@/components/AlwaysOpenVolunteerCard";
import VacancyCard from "@/components/VacancyCard";
import { getOpenVacancies, type Vacancy } from "@/lib/vacancies-notion";

export const revalidate = 60;

const ROLE_TYPE_ORDER: Record<Vacancy["roleType"], number> = {
  Trustee: 0,
  Staff: 1,
  Volunteer: 2,
};

function sortOpenRoles(vacancies: Vacancy[]): Vacancy[] {
  return [...vacancies].sort((a, b) => {
    const byType = ROLE_TYPE_ORDER[a.roleType] - ROLE_TYPE_ORDER[b.roleType];
    if (byType !== 0) return byType;
    return a.title.localeCompare(b.title, "en-GB");
  });
}

export default async function JoinTheTeamPage() {
  const openVacancies = await getOpenVacancies();
  const listedRoles = sortOpenRoles(
    openVacancies.filter((vacancy) => vacancy.roleType !== "Volunteer")
  );
  const trustees = openVacancies.filter((vacancy) => vacancy.roleType === "Trustee");
  const staff = openVacancies.filter((vacancy) => vacancy.roleType === "Staff");

  const cards: Array<
    | { title: string; description: string; href: string; count: number }
    | { title: string; description: string; href: string; statusLabel: string }
  > = [
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
        "Shape our future. Our lead roles make things happen, from managing our programmes to building the partnerships that help us grow. They can be paid or volunteer. If you're a leader who wants to roll up your sleeves and help us build a more inclusive West Yorkshire, keep an eye here for our latest openings.",
      href: "/join-the-team/lead-roles",
      count: staff.length,
    },
    {
      title: "Volunteer",
      description:
        "Come as you are. Our volunteers are the heartbeat of Noa’s Place. It’s flexible, rewarding, and a chance to help every family shine.",
      href: "/join-the-team/volunteer",
      statusLabel: "Always open. Register your interest",
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
                {"statusLabel" in card
                  ? card.statusLabel
                  : card.count > 0
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

        <section className="mt-16" aria-labelledby="open-roles-heading">
          <h2 id="open-roles-heading" className="text-3xl font-bold text-brand-900">
            Open roles
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {listedRoles.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
            <AlwaysOpenVolunteerCard />
          </div>
        </section>
      </div>
    </main>
  );
}
