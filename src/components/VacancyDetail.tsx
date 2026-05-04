import Link from "next/link";
import RecruitmentBreadcrumbs from "@/components/RecruitmentBreadcrumbs";
import VacancyMarkdown from "@/components/VacancyMarkdown";
import type { Vacancy } from "@/lib/vacancies-notion";
import { formatVacancyClosingDate, getRoleTypeUrlSegment } from "@/lib/vacancies-notion";

type VacancyDetailProps = {
  vacancy: Vacancy;
};

export default function VacancyDetail({ vacancy }: VacancyDetailProps) {
  const segment = getRoleTypeUrlSegment(vacancy.roleType);
  const sectionHref = `/join-the-team/${segment}`;
  const sectionLabel =
    vacancy.roleType === "Trustee"
      ? "Trustee Opportunities"
      : vacancy.roleType === "Staff"
        ? "Lead Roles"
        : "Volunteer with Us";

  const desc = (vacancy.shortDescription ?? "").trim();
  const longMd = (vacancy.longDescriptionMarkdown ?? "").trim();
  const apply = (vacancy.applyUrl ?? "").trim();
  const applyIsValid = /^https?:\/\//i.test(apply);

  return (
    <main className="bg-background py-10 text-ink sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RecruitmentBreadcrumbs
          sectionHref={sectionHref}
          sectionLabel={sectionLabel}
          currentLabel={vacancy.title}
        />

        <Link
          href={sectionHref}
          className="inline-flex items-center text-sm font-semibold text-brand-800 underline-offset-2 hover:underline"
        >
          Back to {sectionLabel}
        </Link>

        <div className="mt-6 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-900">
            {vacancy.roleType}
          </span>
          <h1 className="mt-4 text-3xl font-black text-brand-900 sm:text-4xl">{vacancy.title}</h1>
          <p className="mt-3 text-sm text-ink/80">
            <span className="font-semibold text-ink">Closing date: </span>
            {formatVacancyClosingDate(vacancy.closingDate)}
          </p>

          {desc ? (
            <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-ink/90">{desc}</p>
          ) : (
            <p className="mt-6 text-ink/75">Add a short description in Notion to introduce this role here.</p>
          )}

          {longMd ? (
            <div className="mt-10 border-t border-brand-100 pt-10">
              <h2 className="text-xl font-bold text-brand-900">About this role</h2>
              <VacancyMarkdown
                source={longMd}
                className="prose prose-neutral prose-a:text-brand-800 mt-4 max-w-none"
              />
            </div>
          ) : null}

          <div className={`flex flex-wrap gap-3 ${longMd ? "mt-10" : "mt-8"}`}>
            {applyIsValid ? (
              <a
                href={apply}
                className="inline-flex rounded-xl bg-brand-800 px-5 py-3 text-base font-semibold text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
                target="_blank"
                rel="noreferrer"
              >
                Apply
              </a>
            ) : (
              <p className="text-sm text-ink/75">
                Add a valid Apply URL in Notion (including https://) to show the application button.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
