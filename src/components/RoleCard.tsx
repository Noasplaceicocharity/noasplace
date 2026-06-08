import Link from 'next/link';
import type { Role } from '@/lib/roles';
import {
  formatCompensationType,
  formatEmploymentType,
  formatRoleClosingDate,
  formatRolePay,
  showEmploymentTypePill,
  showPayPill,
} from '@/lib/roles';

type RoleCardProps = {
  role: Role;
};

function excerpt(text: string, max = 180) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).trim()}…`;
}

export default function RoleCard({ role }: RoleCardProps) {
  const href = `/join-the-team/roles/${role.slug}`;
  const blurb = excerpt(role.shortDescription ?? '');

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition hover:border-brand-500/50 hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-900">
            {role.roleType}
          </span>
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
            {formatCompensationType(role.compensationType)}
          </span>
          {showEmploymentTypePill(role.employmentType) ? (
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
              {formatEmploymentType(role.employmentType)}
            </span>
          ) : null}
          {showPayPill(role.pay) ? (
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">
              {formatRolePay(role.pay)}
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-2xl font-bold text-brand-900">{role.roleName}</h3>
        <p className="mt-2 text-sm text-ink/75">
          <span className="font-semibold text-ink">Closing date: </span>
          {formatRoleClosingDate(role.closingDate)}
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
