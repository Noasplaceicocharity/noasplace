import { unstable_cache } from 'next/cache';

const MEMBERS_API_BASE = 'https://members-api.parliament.uk';
const MP_CACHE_TTL = process.env.NODE_ENV === 'development' ? 30 : 86400;

/** UK postcode: area + optional district + sector + unit (e.g. SW1A 1AA, M1 1AA) */
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}$/i;

function normalizePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, ' ').trim().toUpperCase();
}

export function isValidUkPostcode(postcode: string): boolean {
  return UK_POSTCODE_REGEX.test(normalizePostcode(postcode));
}

export interface MpContactResult {
  email: string;
  mpName: string;
  memberId: number;
}

/** Members Search with Location (postcode) returns items as MemberItem[] where value is Member */
interface MembersSearchResponse {
  items?: Array<{ value?: { id?: number; nameDisplayAs?: string }; id?: number; nameDisplayAs?: string }>;
  totalResults?: number;
}

interface ContactInfo {
  type?: string | null;
  typeDescription?: string | null;
  email?: string | null;
}

interface ContactResponse {
  value?: ContactInfo[] | null;
}

async function fetchMemberByPostcodeUncached(postcode: string): Promise<{ memberId: number; mpName: string } | null> {
  const normalized = normalizePostcode(postcode);
  /* Members API: use Location parameter for postcode/constituency lookup (searchText searches names only) */
  const url = `${MEMBERS_API_BASE}/api/Members/Search?Location=${encodeURIComponent(normalized)}&take=1`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[MP lookup] Search failed:', res.status, await res.text());
      }
      return null;
    }
    const data = (await res.json()) as MembersSearchResponse;
    const first = data.items?.[0];
    const member = first?.value ?? first;
    const memberId = member?.id ?? first?.id;
    if (!memberId) return null;
    const name = member?.nameDisplayAs ?? first?.nameDisplayAs ?? 'Your MP';
    return { memberId, mpName: name };
  } catch (error) {
    console.error('MP lookup search error:', error);
    return null;
  }
}

async function fetchContactUncached(memberId: number): Promise<ContactInfo[] | null> {
  const url = `${MEMBERS_API_BASE}/api/Members/${memberId}/Contact`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = (await res.json()) as ContactResponse;
    const list = data.value ?? [];
    return Array.isArray(list) ? list : null;
  } catch (error) {
    console.error('MP contact fetch error:', error);
    return null;
  }
}

function pickEmail(contacts: ContactInfo[]): string | null {
  const withEmail = contacts.filter((c) => c.email && c.email.includes('@'));
  if (withEmail.length === 0) return null;

  const byPreference = (a: ContactInfo, b: ContactInfo): number => {
    const score = (c: ContactInfo): number => {
      const t = ((c.typeDescription ?? c.type) ?? '').toLowerCase();
      if (t.includes('constituency')) return 2;
      if (t.includes('parliament')) return 1;
      return 0;
    };
    return score(b) - score(a);
  };

  withEmail.sort(byPreference);
  const chosen = withEmail[0];
  return chosen.email ?? null;
}

async function getMpEmailUncached(postcode: string): Promise<MpContactResult | null> {
  if (!isValidUkPostcode(postcode)) return null;

  const member = await fetchMemberByPostcodeUncached(postcode);
  if (!member) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MP lookup] No member found for postcode:', postcode.replace(/\s/g, ''));
    }
    return null;
  }

  const contacts = await fetchContactUncached(member.memberId);
  if (!contacts?.length) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MP lookup] No contact list for member', member.memberId, member.mpName);
    }
    return null;
  }

  const email = pickEmail(contacts);
  if (!email) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[MP lookup] No email in contacts for member', member.memberId, member.mpName);
    }
    return null;
  }

  return {
    email,
    mpName: member.mpName,
    memberId: member.memberId,
  };
}

export async function getMpFromPostcode(postcode: string): Promise<{ memberId: number; mpName: string } | null> {
  if (!isValidUkPostcode(postcode)) return null;
  return unstable_cache(
    () => fetchMemberByPostcodeUncached(postcode),
    ['mp-from-postcode-v2', normalizePostcode(postcode)],
    { revalidate: MP_CACHE_TTL }
  )();
}

export async function getMpContact(memberId: number): Promise<MpContactResult | null> {
  const contacts = await unstable_cache(
    () => fetchContactUncached(memberId),
    ['mp-contact-v2', String(memberId)],
    { revalidate: MP_CACHE_TTL }
  )();
  if (!contacts?.length) return null;
  const email = pickEmail(contacts);
  if (!email) return null;
  const memberRes = await fetch(`${MEMBERS_API_BASE}/api/Members/${memberId}`, { headers: { Accept: 'application/json' } });
  const memberData = (await memberRes.json()) as { nameDisplayAs?: string };
  return {
    email,
    mpName: memberData.nameDisplayAs ?? 'Your MP',
    memberId,
  };
}

export async function getMpEmail(postcode: string): Promise<MpContactResult | null> {
  return unstable_cache(
    () => getMpEmailUncached(postcode),
    ['mp-email-v2', normalizePostcode(postcode)],
    { revalidate: MP_CACHE_TTL }
  )();
}
