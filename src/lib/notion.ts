import type { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { getPageTitle } from 'notion-utils';
import type { NotionPost, NotionPage, BlogListResponse } from '@/types/notion';

// Lazy async initialization of Notion client (dynamic import to avoid edge/bundling issues)
let notionClientPromise: Promise<Client | null> | null = null;

async function getNotionClient(): Promise<Client | null> {
  if (notionClientPromise) return notionClientPromise;

  notionClientPromise = (async () => {
    const token = process.env.NOTION_TOKEN;
    if (!token) {
      console.warn('NOTION_TOKEN is not set. Blog functionality will be limited.');
      return null;
    }
    try {
      const { Client } = await import('@notionhq/client');
      const client: Client = new Client({ auth: token });
      return client;
    } catch (error) {
      console.error('Failed to initialize Notion client:', error);
      return null;
    }
  })();

  return notionClientPromise;
}

const notionApi = new NotionAPI();

// Cache for better performance
const cache = new Map();
const CACHE_TTL = 1000 * 30; // 30 seconds for fresher content

interface CacheEntry {
  data: any;
  timestamp: number;
}

function getCachedData(key: string) {
  const entry = cache.get(key) as CacheEntry;
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Get all published blog posts from Notion database
 */
export async function getBlogPosts(
  pageSize: number = 10,
  startCursor?: string
): Promise<BlogListResponse> {
  try {
    const cacheKey = `blog-posts-${pageSize}-${startCursor || 'start'}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    // Get Notion client and return empty result if not configured
    const notionClient = await getNotionClient();
    if (!notionClient) {
      console.warn('Notion client not available. Returning empty blog posts.');
      return { posts: [], hasMore: false };
    }

    // Proceed and handle errors from the SDK in the catch block below

    try {
      const databaseId = process.env.NOTION_DATABASE_ID;
      if (!databaseId) {
        console.warn('NOTION_DATABASE_ID is not configured. Returning empty blog posts.');
        return { posts: [], hasMore: false };
      }

      const response = await queryNotionDatabase(databaseId, {
        filter: {
          property: 'Published',
          checkbox: { equals: true },
        },
        sorts: [
          { property: 'Date', direction: 'descending' },
        ],
        page_size: pageSize,
        start_cursor: startCursor,
      }, notionClient);

    const posts: NotionPost[] = response.results.map((page: any) => mapNotionPageToPost(page));

    const result = {
      posts,
      hasMore: response.has_more,
      nextCursor: response.next_cursor || undefined,
    };

      setCachedData(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error fetching blog posts (inner):', error);
      return { posts: [], hasMore: false };
    }
  } catch (error) {
    console.error('Error fetching blog posts (outer):', error);
    return { posts: [], hasMore: false };
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<NotionPost | null> {
  const cacheKey = `blog-post-${slug}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  // Get Notion client and return null if not configured
  const notionClient = await getNotionClient();
  if (!notionClient) {
    console.warn('Notion client not available. Cannot fetch blog post.');
    return null;
  }

  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      console.warn('NOTION_DATABASE_ID is not configured. Cannot fetch blog post.');
      return null;
    }

    const response = await queryNotionDatabase(databaseId, {
      filter: {
        and: [
          { property: 'Published', checkbox: { equals: true } },
          { property: 'Slug', rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    }, notionClient);

    if (response.results.length === 0) {
      // Fallback: fetch recent published posts and match slug client-side (handles spacing/case issues)
      const fallback = await queryNotionDatabase(databaseId, {
        filter: { property: 'Published', checkbox: { equals: true } },
        sorts: [{ property: 'Date', direction: 'descending' }],
        page_size: 100,
      }, notionClient);

      const mapped = (fallback.results || []).map((p: any) => mapNotionPageToPost(p));
      const match = mapped.find((p: NotionPost) => p.slug.toLowerCase() === slug.toLowerCase());
      if (!match) return null;
      setCachedData(cacheKey, match);
      return match;
    }

    const page = response.results[0] as any;
    const post: NotionPost = mapNotionPageToPost(page);

    setCachedData(cacheKey, post);
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Get Notion page content for rendering
 */
export async function getNotionPage(pageId: string): Promise<NotionPage | null> {
  const cacheKey = `notion-page-${pageId}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    // Use notion-client for better rendering support
    const recordMap = await notionApi.getPage(pageId);
    
    const page: NotionPage = {
      id: pageId,
      title: getPageTitle(recordMap) || 'Untitled',
      blocks: recordMap,
    };

    setCachedData(cacheKey, page);
    return page;
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}

/**
 * Get featured blog posts
 */
export async function getFeaturedPosts(limit: number = 3): Promise<NotionPost[]> {
  const cacheKey = `featured-posts-${limit}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  // Get Notion client and return empty array if not configured
  const notionClient = await getNotionClient();
  if (!notionClient) {
    console.warn('Notion client not available. Returning empty featured posts.');
    return [];
  }

  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
      console.warn('NOTION_DATABASE_ID is not configured. Returning empty featured posts.');
      return [];
    }

    const response = await queryNotionDatabase(databaseId, {
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      sorts: [
        { property: 'Date', direction: 'descending' },
      ],
      page_size: limit,
    }, notionClient);

    const posts: NotionPost[] = response.results.map((page: any) => mapNotionPageToPost(page));

    setCachedData(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

/**
 * Get posts by tag (simplified since tags aren't in your schema)
 */
export async function getPostsByTag(tag: string, pageSize: number = 10): Promise<NotionPost[]> {
  // Since you don't have tags in your schema, just return all published posts
  console.warn('Tags are not implemented in your Notion schema. Returning all posts instead.');
  const { posts } = await getBlogPosts(pageSize);
  return posts;
}

/**
 * Get all unique tags from published posts (simplified since tags aren't in your schema)
 */
export async function getAllTags(): Promise<string[]> {
  // Since you don't have tags in your schema, return empty array
  console.warn('Tags are not implemented in your Notion schema. Returning empty array.');
  return [];
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  if (!title) return 'untitled';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

/**
 * Map Notion page to NotionPost according to your database schema
 */
function mapNotionPageToPost(page: any): NotionPost {
  const properties = (page as any).properties || {};

  // Helper: get property by case-insensitive name
  const getProp = (name: string) => {
    const entry = Object.entries(properties).find(([key]) => key.toLowerCase() === name.toLowerCase());
    return entry ? (entry[1] as any) : undefined;
  };

  // Title: prefer explicit 'Title' property, otherwise first title property
  let title = '';
  const titleProp = getProp('Title') || Object.values(properties).find((p: any) => p?.type === 'title') as any;
  if (titleProp?.type === 'title' && Array.isArray(titleProp.title)) {
    title = titleProp.title.map((t: any) => t.plain_text || t.text?.content || '').join('').trim();
  }
  if (!title) title = 'Untitled';

  // Slug: rich_text
  let slug = '';
  const slugProp = getProp('Slug');
  if (slugProp?.type === 'rich_text' && Array.isArray(slugProp.rich_text)) {
    slug = slugProp.rich_text.map((t: any) => t.plain_text || t.text?.content || '').join('').trim();
  }
  if (!slug) slug = generateSlug(title);

  // Date
  let publishedDate = '';
  const dateProp = getProp('Date');
  if (dateProp?.type === 'date') {
    publishedDate = dateProp.date?.start || '';
  }
  if (!publishedDate) publishedDate = page.created_time;

  // Published (checkbox)
  let published = false;
  const publishedProp = getProp('Published');
  if (publishedProp?.type === 'checkbox') {
    published = Boolean(publishedProp.checkbox);
  }

  // Cover image: files or url property, then fallback to page.cover
  let coverImage = '';
  const coverProp = getProp('Cover Image');
  if (coverProp?.type === 'files' && Array.isArray(coverProp.files) && coverProp.files.length > 0) {
    const f = coverProp.files[0];
    coverImage = f?.file?.url || f?.external?.url || '';
  } else if (coverProp?.type === 'url' && typeof coverProp.url === 'string') {
    coverImage = coverProp.url;
  }
  if (!coverImage && page.cover) {
    coverImage = page.cover?.file?.url || page.cover?.external?.url || '';
  }

  return {
    id: page.id,
    title,
    slug,
    excerpt: '',
    publishedDate,
    lastEditedTime: page.last_edited_time,
    tags: [],
    featured: false,
    published,
    author: '',
    coverImage,
  };
}

/**
 * Clear cache (useful for development)
 */
export function clearNotionCache() {
  cache.clear();
}

/**
 * Helper: query a Notion database using SDK when available, otherwise raw REST fetch
 */
async function queryNotionDatabase(
  databaseId: string,
  params: any,
  client: Client | null
): Promise<any> {
  // Prefer SDK when the method exists
  const hasSdk = client && (client as any).databases && typeof (client as any).databases.query === 'function';
  if (hasSdk) {
    return (client as any).databases.query({
      database_id: databaseId,
      ...params,
    });
  }

  // Fallback to REST API
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error('NOTION_TOKEN not set');

  const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params || {}),
    // @ts-ignore Node.js runtime ensured on pages
    cache: 'no-store',
  } as any);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion REST query failed: ${res.status} ${text}`);
  }
  return res.json();
}
