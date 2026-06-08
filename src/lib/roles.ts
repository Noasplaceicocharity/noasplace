import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

export type RoleStatus = Database['public']['Enums']['role_status'];
export type CompensationType = Database['public']['Enums']['compensation_type'];
export type EmploymentType = Database['public']['Enums']['employment_type'];
export type SendExperienceLevel = Database['public']['Enums']['send_experience_level'];

export type Role = {
  id: string;
  slug: string;
  roleName: string;
  roleType: string;
  compensationType: CompensationType;
  employmentType: EmploymentType;
  shortDescription: string;
  longDescription: string;
  closingDate: string | null;
  pay: string | null;
  descriptionPdfUrl: string | null;
  status: RoleStatus;
  createdAt: string;
};

type RoleRow = Database['public']['Tables']['roles']['Row'];

function mapRole(row: RoleRow): Role {
  return {
    id: row.id,
    slug: row.slug,
    roleName: row.role_name,
    roleType: row.role_type,
    compensationType: row.compensation_type,
    employmentType: row.employment_type,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    closingDate: row.closing_date,
    pay: row.pay,
    descriptionPdfUrl: row.description_pdf_url,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function formatRolePay(pay: string | null): string | null {
  const value = (pay ?? '').trim();
  return value || null;
}

export function showPayPill(pay: string | null): boolean {
  return formatRolePay(pay) !== null;
}

export function getRoleDescriptionPdfUrl(url: string | null): string | null {
  const value = (url ?? '').trim();
  if (!value || !/^https?:\/\//i.test(value)) return null;
  return value;
}

export function formatRoleClosingDate(iso: string | null, fallback = 'Not set') {
  if (!iso) return fallback;
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function roleSummaryPlainForMeta(text: string): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (!t) return '';
  return t.slice(0, 155);
}

const COMPENSATION_LABELS: Record<CompensationType, string> = {
  paid: 'Paid',
  volunteer: 'Volunteer',
};

const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  full_time: 'Full time',
  part_time: 'Part time',
  freelance: 'Freelance',
  n_a: 'N/A',
};

export function formatCompensationType(value: CompensationType): string {
  return COMPENSATION_LABELS[value];
}

export function formatEmploymentType(value: EmploymentType): string {
  return EMPLOYMENT_LABELS[value];
}

export function showEmploymentTypePill(value: EmploymentType): boolean {
  return value !== 'n_a';
}

export async function getOpenRoles(): Promise<Role[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[roles] getOpenRoles error:', error);
    return [];
  }

  return (data ?? []).map(mapRole);
}

export async function getRoleBySlug(slug: string): Promise<Role | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('roles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'open')
    .maybeSingle();

  if (error) {
    console.error('[roles] getRoleBySlug error:', error);
    return null;
  }

  return data ? mapRole(data) : null;
}
