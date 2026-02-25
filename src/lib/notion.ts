import { Client } from '@notionhq/client';
import { unstable_cache } from 'next/cache';
import { z } from 'zod';

const NOTION_CACHE_REVALIDATE = process.env.NODE_ENV === 'development' ? 10 : 60;

export const TAKE_ACTION_TYPES = ['LETTER_TO_MP', 'SURVEY'] as const;
export type TakeActionType = (typeof TAKE_ACTION_TYPES)[number];

const takeActionTypeSchema = z.enum(TAKE_ACTION_TYPES);

function getNotionClient(): Client | null {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!apiKey || !databaseId) return null;
  return new Client({ auth: apiKey });
}

function getDatabaseId(): string | null {
  return process.env.NOTION_DATABASE_ID ?? null;
}

function getBannerDatabaseId(): string | null {
  return process.env.NOTION_BANNER_DATABASE_ID ?? null;
}

function urlToPlain(prop: { url: string | null } | undefined): string {
  return prop?.url ?? '';
}

function richTextToPlain(prop: { rich_text: Array<{ plain_text: string }> } | undefined): string {
  if (!prop?.rich_text || !Array.isArray(prop.rich_text)) return '';
  return prop.rich_text.map((t) => t.plain_text).join('');
}

function titleToPlain(prop: { title: Array<{ plain_text: string }> } | undefined): string {
  if (!prop?.title || !Array.isArray(prop.title)) return '';
  return prop.title.map((t) => t.plain_text).join('');
}

function selectToPlain(prop: { select: { name: string } | null } | undefined): string {
  return prop?.select?.name ?? '';
}

function multiSelectToArray(prop: { multi_select: Array<{ name: string }> } | undefined): string[] {
  if (!prop?.multi_select || !Array.isArray(prop.multi_select)) return [];
  return prop.multi_select.map((s) => s.name);
}

function checkboxValue(prop: { checkbox?: boolean } | undefined): boolean {
  return Boolean(prop?.checkbox);
}

function getProp<T>(props: Record<string, unknown>, ...keys: string[]): T | undefined {
  for (const key of keys) {
    if (props[key] !== undefined && props[key] !== null) return props[key] as T;
  }
  return undefined;
}

/** Notion API can key properties by name or by id; find first property of given type. */
function getPropByType(
  props: Record<string, unknown>,
  type: 'title' | 'rich_text' | 'select' | 'multi_select' | 'checkbox' | 'url'
): unknown {
  for (const key of Object.keys(props)) {
    const prop = props[key] as { type?: string } | undefined;
    if (prop && typeof prop === 'object' && prop.type === type) return prop;
  }
  return undefined;
}

/** Get all properties of a given type in object iteration order (for multiple rich_text columns). */
function getAllPropsByType(
  props: Record<string, unknown>,
  type: 'rich_text'
): Array<{ rich_text: Array<{ plain_text: string }> }> {
  const out: Array<{ rich_text: Array<{ plain_text: string }> }> = [];
  for (const key of Object.keys(props)) {
    const prop = props[key] as { type?: string; rich_text?: Array<{ plain_text: string }> } | undefined;
    if (prop?.type === type && Array.isArray(prop.rich_text)) out.push(prop as { rich_text: Array<{ plain_text: string }> });
  }
  return out;
}

/** UUID pattern (with hyphens) – e.g. Supabase survey id */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Find Survey ID from any rich_text property whose value looks like a UUID.
 * Notion keys properties by ID, not name, so we scan all rich_text props.
 */
function findSurveyIdFromProps(props: Record<string, unknown>): string | undefined {
  const byName = richTextToPlain(
    getProp(props, 'SurveyId', 'survey_id', 'Survey ID', 'survey id')
  );
  const trimmed = (byName || '').trim();
  if (trimmed && UUID_REGEX.test(trimmed)) return trimmed;

  for (const key of Object.keys(props)) {
    const prop = props[key] as { type?: string; rich_text?: Array<{ plain_text?: string }> } | undefined;
    if (prop?.type !== 'rich_text' || !Array.isArray(prop.rich_text)) continue;
    const text = (prop.rich_text as Array<{ plain_text?: string }>)
      .map((t) => t.plain_text ?? '')
      .join('')
      .trim();
    if (text && UUID_REGEX.test(text)) return text;
  }
  return undefined;
}

/** Infer action type from Type select or from tags (e.g. letter_to_mp, survey). */
function inferType(typeSelect: string, tags: string[]): TakeActionType | undefined {
  const fromSelect = takeActionTypeSchema.safeParse(typeSelect);
  if (fromSelect.success) return fromSelect.data;
  const lower = [...tags].map((t) => t.toLowerCase().replace(/-/g, '_'));
  if (lower.some((t) => t === 'letter_to_mp' || t === 'letter to mp')) return 'LETTER_TO_MP';
  if (lower.some((t) => t === 'survey')) return 'SURVEY';
  return undefined;
}

function parsePageToItem(page: {
  id: string;
  last_edited_time?: string;
  properties: Record<string, unknown>;
}): TakeActionItemParsed | null {
  const props = page.properties as Record<string, unknown>;
  const title =
    titleToPlain(getProp(props, 'Title', 'title', 'Name', 'name')) ||
    titleToPlain(getPropByType(props, 'title') as { title: Array<{ plain_text: string }> } | undefined);
  const slug = (richTextToPlain(getProp(props, 'Slug', 'slug')) || '').trim();
  const statusSelect = selectToPlain(getProp(props, 'Status', 'status'));
  const publishedCheckbox = checkboxValue(getProp(props, 'published', 'Published'));
  const isPublished = statusSelect === 'Published' || publishedCheckbox;
  const typeRaw = selectToPlain(getProp(props, 'Type', 'type'));
  const tags = multiSelectToArray(getProp(props, 'Tags', 'tags')) || multiSelectToArray(getPropByType(props, 'multi_select') as { multi_select: Array<{ name: string }> } | undefined);
  const type = inferType(typeRaw, tags);
  const description = richTextToPlain(getProp(props, 'Description', 'description'));
  const summary = richTextToPlain(getProp(props, 'Summary', 'summary')) || description;
  const body = richTextToPlain(getProp(props, 'Body', 'body'));
  const emailSubject = richTextToPlain(getProp(props, 'EmailSubject', 'subject', 'Subject'));
  const surveyEmbed = richTextToPlain(getProp(props, 'SurveyEmbed', 'surveyEmbed', 'survey_embed'));
  const surveyId = findSurveyIdFromProps(props);
  const updatedAt = page.last_edited_time ?? '';

  if (!title || !slug || !isPublished || !type) return null;

  return {
    id: page.id,
    title,
    slug,
    type,
    tags,
    summary,
    description,
    body,
    emailSubject,
    surveyEmbed,
    surveyId: surveyId || undefined,
    updatedAt,
  };
}

const takeActionItemParsedSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: takeActionTypeSchema,
  tags: z.array(z.string()),
  summary: z.string(),
  description: z.string(),
  body: z.string(),
  emailSubject: z.string(),
  surveyEmbed: z.string(),
  surveyId: z.string().optional(),
  updatedAt: z.string(),
});

type TakeActionItemParsed = z.infer<typeof takeActionItemParsedSchema>;

export const takeActionListItemSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  type: takeActionTypeSchema,
  updatedAt: z.string(),
});

export type TakeActionListItem = z.infer<typeof takeActionListItemSchema>;

export const takeActionItemSchema = takeActionItemParsedSchema;
export type TakeActionItem = z.infer<typeof takeActionItemSchema>;

async function fetchTakeActionItemsUncached(): Promise<TakeActionListItem[]> {
  const notion = getNotionClient();
  const databaseId = getDatabaseId();
  if (!notion || !databaseId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Take Action] Missing NOTION_API_KEY or NOTION_DATABASE_ID – check .env.local');
    }
    return [];
  }

  try {
    const response = await queryNotionDatabase(notion, databaseId);
    const results = response.results;

    if (process.env.NODE_ENV === 'development') {
      console.log('[Take Action] Notion returned', results.length, 'page(s). Property keys on first:', results[0] && 'properties' in (results[0] as object) ? Object.keys((results[0] as { properties: Record<string, unknown> }).properties || {}).slice(0, 15) : 'n/a');
    }

    const items: TakeActionListItem[] = [];
    for (const page of results) {
      const p = page as { object?: string; id?: string; last_edited_time?: string; properties?: Record<string, unknown> };
      if (p.object !== 'page' || !p.properties) continue;
      const parsed = parsePageToItem({
        id: p.id ?? '',
        last_edited_time: p.last_edited_time,
        properties: p.properties,
      });
      if (!parsed) {
        if (process.env.NODE_ENV === 'development' && results.length <= 5) {
          const props = p.properties as Record<string, unknown>;
          const title = titleToPlain(getProp(props, 'Title', 'title', 'Name', 'name')) || titleToPlain(getPropByType(props, 'title') as { title: Array<{ plain_text: string }> } | undefined);
          const slug = (richTextToPlain(getProp(props, 'Slug', 'slug')) || '').trim();
          const pub = checkboxValue(getProp(props, 'published', 'Published')) || checkboxValue(getPropByType(props, 'checkbox') as { checkbox?: boolean } | undefined);
          const statusSel = selectToPlain(getProp(props, 'Status', 'status'));
          const tags = multiSelectToArray(getProp(props, 'Tags', 'tags')) || multiSelectToArray(getPropByType(props, 'multi_select') as { multi_select: Array<{ name: string }> } | undefined);
          console.log('[Take Action] Skipped page – title:', !!title, 'slug:', slug || '(empty)', 'published:', pub, 'Status:', statusSel, 'tags:', tags);
        }
        continue;
      }
      const listItem = takeActionListItemSchema.safeParse({
        slug: parsed.slug,
        title: parsed.title,
        summary: parsed.summary,
        tags: parsed.tags,
        type: parsed.type,
        updatedAt: parsed.updatedAt,
      });
      if (listItem.success) items.push(listItem.data);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Take Action] Published items count:', items.length);
    }
    return items;
  } catch (error) {
    console.error('[Take Action] Notion getTakeActionItems error:', error);
    return [];
  }
}

export const getTakeActionItems = unstable_cache(
  fetchTakeActionItemsUncached,
  ['take-action-items'],
  { revalidate: NOTION_CACHE_REVALIDATE }
);

async function fetchTakeActionItemBySlugUncached(slug: string): Promise<TakeActionItem | null> {
  const notion = getNotionClient();
  const databaseId = getDatabaseId();
  if (!notion || !databaseId) return null;

  try {
    const response = await queryNotionDatabase(notion, databaseId);
    const results = response.results;
    const slugLower = slug.toLowerCase();
    const page = results.find((p: unknown) => {
      const q = p as { object?: string; properties?: Record<string, unknown> };
      if (q.object !== 'page' || !q.properties) return false;
      const s = (richTextToPlain(getProp(q.properties, 'Slug', 'slug')) || '').trim().toLowerCase();
      return s === slugLower;
    }) as { object: string; id: string; last_edited_time?: string; properties: Record<string, unknown> } | undefined;
    if (!page || !page.properties) return null;

    const parsed = parsePageToItem({
      id: page.id,
      last_edited_time: page.last_edited_time,
      properties: page.properties,
    });
    if (!parsed) return null;

    const validated = takeActionItemSchema.safeParse(parsed);
    return validated.success ? validated.data : null;
  } catch (error) {
    console.error('Notion getTakeActionItemBySlug error:', error);
    return null;
  }
}

async function queryNotionDatabase(notion: Client, databaseId: string): Promise<{ results: unknown[] }> {
  const client = notion as Client & {
    dataSources?: { query: (args: { data_source_id: string }) => Promise<{ results?: unknown[] }> };
    databases?: { query: (args: { database_id: string }) => Promise<{ results?: unknown[] }> };
    request?: (args: { path: string; method: string; body?: object }) => Promise<{ results?: unknown[] }>;
  };

  try {
    if (typeof client.dataSources?.query === 'function') {
      const res = await client.dataSources.query({ data_source_id: databaseId });
      return { results: Array.isArray(res?.results) ? res.results : [] };
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Take Action] dataSources.query failed:', (e as Error)?.message);
    }
  }

  try {
    if (typeof client.databases?.query === 'function') {
      const res = await client.databases.query({ database_id: databaseId });
      return { results: Array.isArray(res?.results) ? res.results : [] };
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Take Action] databases.query failed:', (e as Error)?.message);
    }
  }

  if (typeof client.request === 'function') {
    try {
      const res = await client.request({
        path: `databases/${databaseId}/query`,
        method: 'post',
        body: {},
      });
      return { results: Array.isArray((res as { results?: unknown[] })?.results) ? (res as { results: unknown[] }).results : [] };
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Take Action] client.request failed:', (e as Error)?.message);
      }
    }
  }

  const apiKey = process.env.NOTION_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }
      const data = (await res.json()) as { results?: unknown[] };
      return { results: Array.isArray(data.results) ? data.results : [] };
    } catch (e) {
      console.error('[Take Action] Notion API fetch failed:', e);
    }
  }

  throw new Error('Notion client has no query method and direct API fetch failed. Check NOTION_API_KEY and NOTION_DATABASE_ID.');
}

export async function getTakeActionItemBySlug(slug: string): Promise<TakeActionItem | null> {
  return unstable_cache(
    () => fetchTakeActionItemBySlugUncached(slug),
    ['take-action-item', slug],
    { revalidate: NOTION_CACHE_REVALIDATE }
  )();
}

// --- Banner bar (top alert) ---

export type BannerBarItem = {
  name: string;
  bannerText: string;
  buttonText: string;
  link: string;
};

function parsePageToBannerBar(page: {
  id: string;
  properties: Record<string, unknown>;
}): BannerBarItem | null {
  const props = page.properties as Record<string, unknown>;
  // Notion API keys properties by ID, not name – resolve by type (and order for multiple rich_text)
  const name =
    titleToPlain(getProp(props, 'Name', 'name', 'Title', 'title')) ||
    titleToPlain(getPropByType(props, 'title') as { title: Array<{ plain_text: string }> } | undefined);
  const published = checkboxValue(getProp(props, 'Published', 'published')) || checkboxValue(getPropByType(props, 'checkbox') as { checkbox?: boolean } | undefined);
  if (!published) return null;

  const link =
    urlToPlain(getProp(props, 'Link', 'link', 'URL', 'url')) ||
    urlToPlain(getPropByType(props, 'url') as { url: string | null } | undefined) ||
    richTextToPlain(getProp(props, 'Link', 'link'));
  const richTexts = getAllPropsByType(props, 'rich_text');
  const bannerTextFromName = richTextToPlain(getProp(props, 'Banner text', 'banner text', 'Banner Text', 'bannerText'));
  const buttonTextFromName = richTextToPlain(getProp(props, 'Button text', 'button text', 'Button Text', 'buttonText'));
  const bannerText =
    bannerTextFromName ||
    (richTexts.length >= 1 ? richTextToPlain(richTexts[0]) : '') ||
    richTextToPlain(getPropByType(props, 'rich_text') as { rich_text: Array<{ plain_text: string }> } | undefined);
  const buttonText =
    buttonTextFromName ||
    (richTexts.length >= 2 ? richTextToPlain(richTexts[1]) : '');

  if (!bannerText.trim()) return null;

  return {
    name: name || 'Banner',
    bannerText: bannerText.trim(),
    buttonText: (buttonText || '').trim(),
    link: (link || '').trim(),
  };
}

async function fetchPublishedBannerBarUncached(): Promise<BannerBarItem | null> {
  const notion = getNotionClient();
  const databaseId = getBannerDatabaseId();
  if (!notion || !databaseId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Banner Bar] Missing NOTION_API_KEY or NOTION_BANNER_DATABASE_ID');
    }
    return null;
  }

  try {
    const response = await queryNotionDatabase(notion, databaseId);
    const results = response.results;

    if (process.env.NODE_ENV === 'development' && results.length > 0) {
      const first = results[0] as { properties?: Record<string, unknown> };
      const keys = first?.properties ? Object.keys(first.properties) : [];
      console.log('[Banner Bar] Notion returned', results.length, 'page(s). Property keys (IDs):', keys.slice(0, 8).join(', '), keys.length > 8 ? '...' : '');
    }

    for (const page of results) {
      const p = page as { object?: string; id?: string; properties?: Record<string, unknown> };
      if (p.object !== 'page' || !p.properties) continue;
      const parsed = parsePageToBannerBar({
        id: p.id ?? '',
        properties: p.properties,
      });
      if (parsed) return parsed;
    }
    return null;
  } catch (error) {
    console.error('[Banner Bar] Notion getPublishedBannerBar error:', error);
    return null;
  }
}

export const getPublishedBannerBar = unstable_cache(
  fetchPublishedBannerBarUncached,
  ['banner-bar'],
  { revalidate: NOTION_CACHE_REVALIDATE }
);
