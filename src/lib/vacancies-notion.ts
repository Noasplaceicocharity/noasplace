import { unstable_cache } from "next/cache";

export type RoleType = "Trustee" | "Staff" | "Volunteer";
export type RoleTypeUrlSegment = "trustees" | "lead-roles" | "volunteer";
export type VacancyStatus = "Draft" | "Open" | "Closed";

export type Vacancy = {
  id: string;
  title: string;
  slug: string;
  roleType: RoleType;
  /** Plain text from Notion "Short description" (cards / top of detail). */
  shortDescription: string;
  /** Markdown from Notion "Long description" (detail page body). */
  longDescriptionMarkdown: string;
  /** External application page (Notion "Apply URL"). */
  applyUrl: string;
  /** First uploaded file URL from Notion "Card image" (listing cards). */
  imageUrl: string;
  status: VacancyStatus;
  /** ISO date string from Notion "Closing date", or null if unset. */
  closingDate: string | null;
  publishedAt: string | null;
};

type NotionPageLike = {
  id: string;
  properties: Record<string, unknown>;
};

const NOTION_CACHE_REVALIDATE = 60;

function getVacanciesDatabaseId(): string | null {
  return process.env.NOTION_VACANCIES_DB_ID ?? null;
}

function getNotionApiKey(): string | null {
  return process.env.NOTION_API_KEY ?? null;
}

function titleToPlain(prop: { title: Array<{ plain_text: string }> } | undefined): string {
  if (!prop?.title || !Array.isArray(prop.title)) return "";
  return prop.title.map((part) => part.plain_text).join("").trim();
}

function richTextToPlain(prop: { rich_text: Array<{ plain_text: string }> } | undefined): string {
  if (!prop?.rich_text || !Array.isArray(prop.rich_text)) return "";
  return prop.rich_text.map((part) => part.plain_text).join("").trim();
}

function selectToPlain(prop: { select: { name: string } | null } | undefined): string {
  return prop?.select?.name?.trim() ?? "";
}

function dateToIso(prop: { date: { start: string } | null } | undefined): string | null {
  return prop?.date?.start ?? null;
}

function urlToPlain(prop: { url: string | null } | undefined): string {
  return prop?.url?.trim() ?? "";
}

function readNamedProp(
  props: Record<string, unknown>,
  nameToId: Record<string, string> | null,
  name: string
): unknown {
  const id = nameToId?.[name];
  if (id !== undefined && props[id] !== undefined && props[id] !== null) {
    return props[id];
  }
  if (props[name] !== undefined && props[name] !== null) {
    return props[name];
  }
  return undefined;
}

function propAsTitle(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  return titleToPlain(raw as { title: Array<{ plain_text: string }> });
}

/** Notion "text" / rich_text column → plain string. */
function propAsTextOrRichText(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const p = raw as { type?: string; rich_text?: Array<{ plain_text: string }> };
  if (p.type === "rich_text" && Array.isArray(p.rich_text)) {
    return richTextToPlain(p as { rich_text: Array<{ plain_text: string }> });
  }
  return "";
}

function propAsSelect(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  return selectToPlain(raw as { select: { name: string } | null });
}

function propAsDate(raw: unknown): string | null {
  if (!raw || typeof raw !== "object") return null;
  return dateToIso(raw as { date: { start: string } | null });
}

function propAsUrl(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const p = raw as { type?: string; url?: string | null };
  if (p.type === "url") return urlToPlain(p as { url: string | null });
  return "";
}

function fileNameFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const seg = path.split("/").filter(Boolean).pop();
    return seg ? decodeURIComponent(seg) : "";
  } catch {
    return "";
  }
}

/** Notion `files` property → list of display name + URL (external or hosted file). */
function propAsFiles(raw: unknown): { name: string; url: string }[] {
  if (!raw || typeof raw !== "object") return [];
  const p = raw as { type?: string; files?: unknown };
  if (p.type !== "files" || !Array.isArray(p.files)) return [];
  const out: { name: string; url: string }[] = [];
  for (const item of p.files) {
    if (!item || typeof item !== "object") continue;
    const f = item as {
      name?: string;
      external?: { url?: string };
      file?: { url?: string };
    };
    const url = (f.external?.url ?? f.file?.url ?? "").trim();
    if (!url) continue;
    const named = (f.name ?? "").trim();
    const name = named || fileNameFromUrl(url) || "Image";
    out.push({ name, url });
  }
  return out;
}

function firstCardImageUrl(raw: unknown): string {
  return propAsFiles(raw)[0]?.url ?? "";
}

type NotionRichTextAnnotations = {
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  color?: string;
};

type NotionRichTextItem = {
  type?: string;
  plain_text?: string;
  text?: { content: string; link?: { url: string } | null };
  annotations?: NotionRichTextAnnotations;
  href?: string | null;
};

/** Convert Notion rich_text property to Markdown for react-markdown. */
function notionRichTextPropertyToMarkdown(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const p = raw as { type?: string; rich_text?: NotionRichTextItem[] };
  if (p.type !== "rich_text" || !Array.isArray(p.rich_text)) return "";

  let out = "";
  for (const item of p.rich_text) {
    if (item.type === "text" && item.text) {
      let t = item.text.content ?? "";
      t = t.replace(/<br\s*\/?>/gi, " ");
      const a = item.annotations;
      const url = item.text.link?.url ?? item.href ?? undefined;
      if (a?.code) t = `\`${t.replace(/`/g, "")}\``;
      if (a?.bold) {
        let inner = t.trim();
        if (inner.startsWith("**") && inner.endsWith("**") && inner.length > 4) {
          inner = inner.slice(2, -2).trim();
        }
        t = `**${inner}**`;
      }
      if (a?.italic) t = `*${t}*`;
      if (a?.strikethrough) t = `~~${t}~~`;
      if (url) t = `[${t}](${url})`;
      out += t;
    } else {
      out += item.plain_text ?? "";
    }
  }

  out = normalizeSummaryMarkdown(out);
  return out.trim();
}

function fixSplitBoldDelimiters(s: string): string {
  let t = s;
  let prev = "";
  let guard = 0;
  while (t !== prev && guard < 25) {
    prev = t;
    guard += 1;
    t = t.replace(/\*\*([^*\n]+?)\n+\s*\*\*/g, "**$1**");
  }
  return t;
}

function collapseNewlinesInsideBoldSpans(s: string): string {
  return s.replace(/\*\*([^*]+)\*\*/g, (_, inner: string) => {
    const collapsed = inner.replace(/\s*\n\s*/g, " ").replace(/ {2,}/g, " ").trim();
    return `**${collapsed}**`;
  });
}

function normalizeSummaryMarkdown(s: string): string {
  let t = s.replace(/\r\n/g, "\n");
  t = t.replace(/<br\s*\/?>/gi, "\n");
  const lines = t.split("\n");
  const mapped = lines.map((line) => {
    const m = line.match(/^(\s*)[•·▪▫]\s+(.*)$/);
    if (m) return `${m[1]}- ${m[2]}`;
    return line;
  });
  t = mapped.join("\n");
  t = t.replace(/([^\n])\n(-\s)/g, "$1\n\n$2");
  t = fixSplitBoldDelimiters(t);
  t = collapseNewlinesInsideBoldSpans(t);
  for (let i = 0; i < 6 && t.includes("****"); i++) {
    t = t.replace(/\*\*\*\*/g, "**");
  }
  return t;
}

/** Notion text fields often store line breaks as `<br>`; normalise for Markdown. */
function normalizeLineBreakTags(s: string): string {
  return s.replace(/<br\s*\/?>/gi, "\n\n");
}

/** Long description: rich_text → markdown, or plain text / pasted markdown. */
function longDescriptionFromProp(raw: unknown): string {
  if (!raw || typeof raw !== "object") return "";
  const p = raw as { type?: string };
  let md = "";
  if (p.type === "rich_text") md = notionRichTextPropertyToMarkdown(raw);
  else md = propAsTextOrRichText(raw);
  return normalizeLineBreakTags(md).trim();
}

function normalizeSlug(raw: string): string {
  return raw
    .replace(/\*\*/g, "")
    .replace(/^\/+|\/+$/g, "")
    .trim();
}

function toRoleType(value: string): RoleType | null {
  if (value === "Trustee" || value === "Staff" || value === "Volunteer") {
    return value;
  }
  return null;
}

function toStatus(value: string): VacancyStatus | null {
  if (value === "Draft" || value === "Open" || value === "Closed") {
    return value;
  }
  return null;
}

function getSlugFromProps(props: Record<string, unknown>, nameToId: Record<string, string> | null): string {
  const raw = readNamedProp(props, nameToId, "Slug");
  const fromText = propAsTextOrRichText(raw);
  const fromUrl = propAsUrl(raw);
  return normalizeSlug(fromText || fromUrl);
}

function mapVacancyFromPage(
  page: NotionPageLike,
  nameToId: Record<string, string> | null
): Vacancy | null {
  const props = page.properties;

  const roleTypeValue = propAsSelect(readNamedProp(props, nameToId, "Role Type"));
  const roleType = toRoleType(roleTypeValue);
  if (!roleType) return null;

  const statusValue = propAsSelect(readNamedProp(props, nameToId, "Status"));
  const status = toStatus(statusValue);
  if (!status) return null;

  const title = propAsTitle(readNamedProp(props, nameToId, "Title"));
  const slug = getSlugFromProps(props, nameToId);
  if (!title || !slug) return null;

  const shortDescription = propAsTextOrRichText(readNamedProp(props, nameToId, "Short description"));
  const longDescriptionMarkdown = longDescriptionFromProp(readNamedProp(props, nameToId, "Long description"));
  const applyUrl = propAsUrl(readNamedProp(props, nameToId, "Apply URL")).trim();
  const imageUrl = firstCardImageUrl(readNamedProp(props, nameToId, "Card image")).trim();
  const closingDate = propAsDate(readNamedProp(props, nameToId, "Closing date"));

  return {
    id: page.id,
    title,
    slug,
    roleType,
    shortDescription,
    longDescriptionMarkdown,
    applyUrl,
    imageUrl,
    status,
    closingDate,
    publishedAt: propAsDate(readNamedProp(props, nameToId, "Published At")),
  };
}

type NotionApiErrorBody = { message?: string; code?: string };

function logNotionFailure(context: string, response: Response, body: unknown) {
  const err = body as NotionApiErrorBody;
  const msg = err?.message ?? JSON.stringify(body).slice(0, 300);
  console.warn(`[Recruitment] ${context} failed (${response.status}):`, msg);
}

async function fetchVacancyDatabaseNameToIdMap(): Promise<Record<string, string> | null> {
  const apiKey = getNotionApiKey();
  const databaseId = getVacanciesDatabaseId();
  if (!apiKey || !databaseId) return null;

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
    },
    next: { revalidate: NOTION_CACHE_REVALIDATE },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    logNotionFailure("Notion database retrieve", response, body);
    if (
      typeof body === "object" &&
      body !== null &&
      "code" in body &&
      (body as NotionApiErrorBody).code === "object_not_found"
    ) {
      console.warn(
        "[Recruitment] Share the Vacancies database with your Notion integration (Connections), or vacancies will not load."
      );
    }
    return null;
  }

  const data = body as { properties?: Record<string, { id: string }> };
  const map: Record<string, string> = {};
  if (!data.properties) return map;
  for (const [name, meta] of Object.entries(data.properties)) {
    if (meta?.id) map[name] = meta.id;
  }
  return map;
}

const getVacancyDatabaseNameToIdMapCached = unstable_cache(
  async () => fetchVacancyDatabaseNameToIdMap(),
  ["vacancies-notion-db-name-to-id-v5"],
  { revalidate: NOTION_CACHE_REVALIDATE }
);

async function queryVacancyPages(filters: Record<string, unknown>) {
  const apiKey = getNotionApiKey();
  const databaseId = getVacanciesDatabaseId();
  if (!apiKey || !databaseId) {
    console.warn("[Recruitment] Missing NOTION_API_KEY or NOTION_VACANCIES_DB_ID");
    return [];
  }

  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      filter: filters,
      sorts: [{ property: "Published At", direction: "descending" }],
    }),
    next: { revalidate: NOTION_CACHE_REVALIDATE },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    logNotionFailure("Notion database query", response, body);
    return [];
  }
  const data = body as { results?: Array<Record<string, unknown>> };
  const results = Array.isArray(data.results) ? data.results : [];

  return results.filter((result): result is NotionPageLike => "properties" in result && "id" in result);
}

/** Format an ISO date for display (en-GB). */
export function formatVacancyClosingDate(iso: string | null, fallback = "Not set") {
  if (!iso) return fallback;
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Plain text for Open Graph / meta description (already plain; trim and cap length). */
export function vacancySummaryPlainForMeta(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return "";
  return t.slice(0, 155);
}

export function getRoleTypeUrlSegment(roleType: RoleType): RoleTypeUrlSegment {
  if (roleType === "Trustee") return "trustees";
  if (roleType === "Staff") return "lead-roles";
  return "volunteer";
}

export async function getOpenVacancies(): Promise<Vacancy[]> {
  const nameToId = await getVacancyDatabaseNameToIdMapCached();
  const pages = await queryVacancyPages({
    property: "Status",
    select: { equals: "Open" },
  });

  const vacancies = pages.map((page: NotionPageLike) => mapVacancyFromPage(page, nameToId));

  return vacancies.filter((vacancy): vacancy is Vacancy => Boolean(vacancy));
}

export async function getVacanciesByType(type: RoleType): Promise<Vacancy[]> {
  const nameToId = await getVacancyDatabaseNameToIdMapCached();
  const pages = await queryVacancyPages({
    and: [
      { property: "Status", select: { equals: "Open" } },
      { property: "Role Type", select: { equals: type } },
    ],
  });

  const vacancies = pages
    .map((page: NotionPageLike) => mapVacancyFromPage(page, nameToId))
    .filter((vacancy): vacancy is Vacancy => Boolean(vacancy));

  return vacancies;
}

export async function getVacancyBySlug(slug: string): Promise<Vacancy | null> {
  const nameToId = await getVacancyDatabaseNameToIdMapCached();
  const pages = await queryVacancyPages({
    property: "Status",
    select: { equals: "Open" },
  });

  const normalized = normalizeSlug(slug);
  const page = pages.find(
    (item: NotionPageLike) => getSlugFromProps(item.properties, nameToId) === normalized
  );
  if (!page) return null;

  return mapVacancyFromPage(page, nameToId);
}

export const recruitmentRevalidate = NOTION_CACHE_REVALIDATE;
