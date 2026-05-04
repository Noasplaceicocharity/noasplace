import Link from "next/link";

type RecruitmentBreadcrumbsProps = {
  sectionLabel: string;
  sectionHref: string;
  currentLabel: string;
};

export default function RecruitmentBreadcrumbs({
  sectionLabel,
  sectionHref,
  currentLabel,
}: RecruitmentBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-ink/75">
        <li>
          <Link className="underline-offset-2 hover:underline" href="/">
            Home
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link className="underline-offset-2 hover:underline" href="/join-the-team">
            Join the Team
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link className="underline-offset-2 hover:underline" href={sectionHref}>
            {sectionLabel}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li aria-current="page" className="font-semibold text-ink">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
