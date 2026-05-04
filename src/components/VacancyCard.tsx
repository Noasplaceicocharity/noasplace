import Link from "next/link";
import type { Vacancy } from "@/lib/vacancies-notion";
import { formatVacancyClosingDate, getRoleTypeUrlSegment } from "@/lib/vacancies-notion";

type VacancyCardProps = {
  vacancy: Vacancy;
};

function excerpt(text: string, max = 180) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

function isHttpImageUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  const segment = getRoleTypeUrlSegment(vacancy.roleType);
  const href = `/join-the-team/${segment}/${vacancy.slug}`;
  const blurb = excerpt(vacancy.shortDescription ?? "");
  const imageUrl = (vacancy.imageUrl ?? "").trim();
  const showImage = isHttpImageUrl(imageUrl);

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition hover:border-brand-500/50 hover:shadow-md">
      {showImage ? (
        <div className="aspect-[16/9] w-full bg-brand-50">
          <img
            src={imageUrl}
            alt={`${vacancy.title} — role image`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-800">{vacancy.roleType}</p>
        <h3 className="mt-2 text-2xl font-bold text-brand-900">{vacancy.title}</h3>
        <p className="mt-2 text-sm text-ink/75">
          <span className="font-semibold text-ink">Closing date: </span>
          {formatVacancyClosingDate(vacancy.closingDate)}
        </p>
        {blurb ? <p className="mt-3 text-sm leading-relaxed text-ink/85">{blurb}</p> : null}
        <Link
          href={href}
          className="mt-6 inline-flex items-center rounded-lg bg-brand-800 px-4 py-2 font-semibold text-white transition hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
        >
          View role
        </Link>
      </div>
    </article>
  );
}
