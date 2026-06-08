import Link from 'next/link';
import RecruitmentBreadcrumbs from '@/components/RecruitmentBreadcrumbs';
import RoleApplicationForm from '@/components/RoleApplicationForm';
import VacancyMarkdown from '@/components/VacancyMarkdown';
import type { Role } from '@/lib/roles';
import {
  formatCompensationType,
  formatEmploymentType,
  formatRoleClosingDate,
  formatRolePay,
  getRoleDescriptionPdfUrl,
  showEmploymentTypePill,
  showPayPill,
} from '@/lib/roles';

type RoleDetailProps = {
  role: Role;
};

export default function RoleDetail({ role }: RoleDetailProps) {
  const longMd = (role.longDescription ?? '').trim();
  const descriptionPdfUrl = getRoleDescriptionPdfUrl(role.descriptionPdfUrl);

  return (
    <main className="bg-background py-10 text-ink sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <RecruitmentBreadcrumbs
          sectionHref="/join-the-team"
          sectionLabel="Open opportunities"
          currentLabel={role.roleName}
        />

        <Link
          href="/join-the-team"
          className="inline-flex items-center text-sm font-semibold text-brand-800 underline-offset-2 hover:underline"
        >
          Back to open opportunities
        </Link>

        <div className="mt-6 rounded-3xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-900">
              {role.roleType}
            </span>
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
              {formatCompensationType(role.compensationType)}
            </span>
            {showEmploymentTypePill(role.employmentType) ? (
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
                {formatEmploymentType(role.employmentType)}
              </span>
            ) : null}
            {showPayPill(role.pay) ? (
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
                {formatRolePay(role.pay)}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-black text-brand-900 sm:text-4xl">{role.roleName}</h1>
          <div className="mt-3 space-y-1 text-sm text-ink/80">
            {showPayPill(role.pay) ? (
              <p>
                <span className="font-semibold text-ink">Pay: </span>
                {formatRolePay(role.pay)}
              </p>
            ) : null}
            <p>
              <span className="font-semibold text-ink">Closing date: </span>
              {formatRoleClosingDate(role.closingDate)}
            </p>
          </div>

          {role.shortDescription ? (
            <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-ink/90">
              {role.shortDescription}
            </p>
          ) : null}

          {descriptionPdfUrl ? (
            <div className="mt-8">
              <a
                href={descriptionPdfUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3 text-base font-semibold text-brand-900 transition hover:border-brand-500 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
                target="_blank"
                rel="noreferrer"
                download
              >
                <svg
                  className="size-5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download role description (PDF)
              </a>
            </div>
          ) : null}

          {longMd ? (
            <div className="mt-10 border-t border-brand-100 pt-10">
              <h2 className="text-xl font-bold text-brand-900">About this role</h2>
              <VacancyMarkdown
                source={longMd}
                className="prose prose-neutral prose-a:text-brand-800 mt-4 max-w-none"
              />
            </div>
          ) : null}
        </div>

        <RoleApplicationForm roleId={role.id} roleName={role.roleName} />
      </div>
    </main>
  );
}
