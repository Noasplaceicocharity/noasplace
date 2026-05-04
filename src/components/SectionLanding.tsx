import Link from "next/link";
import VacancyCard from "@/components/VacancyCard";
import type { Vacancy } from "@/lib/vacancies-notion";

type SectionLandingProps = {
  title: string;
  /** Optional short line directly under the H1 (e.g. a question or strapline). */
  introLead?: string;
  intro: string;
  vacancies: Vacancy[];
  emptyLabel: string;
};

export default function SectionLanding({
  title,
  introLead,
  intro,
  vacancies,
  emptyLabel,
}: SectionLandingProps) {
  const recruitmentEmail = process.env.RECRUITMENT_EMAIL;

  return (
    <main className="bg-background py-10 text-ink sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/join-the-team"
          className="inline-flex items-center text-sm font-semibold text-brand-800 underline-offset-2 hover:underline"
        >
          Back to Join the Team
        </Link>
        <h1 className="mt-4 text-4xl font-black text-brand-900">{title}</h1>
        {introLead ? (
          <p className="mt-3 max-w-3xl text-xl font-semibold text-brand-900">{introLead}</p>
        ) : null}
        <p className="mt-4 max-w-3xl text-lg text-ink/85">{intro}</p>

        {vacancies.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <p className="text-base text-ink">{emptyLabel}</p>
            {recruitmentEmail ? (
              <a
                href={`mailto:${recruitmentEmail}`}
                className="mt-4 inline-flex font-semibold text-brand-800 underline-offset-2 hover:underline"
              >
                {recruitmentEmail}
              </a>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
