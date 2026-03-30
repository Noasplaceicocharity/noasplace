import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { remark } from 'remark';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import { BlogSource } from '@/lib/blog-shared';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');
const WEBFLOW_API_BASE_URL = 'https://api.webflow.com/v2';
const WEBFLOW_CACHE_REVALIDATE = process.env.NODE_ENV === 'development' ? 30 : 300;
export const WEBFLOW_BLOG_CACHE_TAG = 'webflow-blog';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  imageUrl?: string;
  date: string;
  author: string;
  featured?: boolean;
  tags?: string[];
  content: string;
  source: BlogSource;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  imageUrl?: string;
  date: string;
  author: string;
  featured?: boolean;
  tags?: string[];
  source: BlogSource;
}


type WebflowCollectionItem = {
  id?: string;
  lastPublished?: string;
  lastUpdated?: string;
  createdOn?: string;
  fieldData?: Record<string, unknown>;
};

type WebflowCollectionField = {
  type?: string;
  slug?: string;
  validations?: {
    collectionId?: string;
  } | null;
};

type WebflowCollectionSchema = {
  fields?: WebflowCollectionField[];
};

function getMarkdownFileNames(): string[] {
  try {
    return fs.readdirSync(blogDirectory).filter((name) => name.endsWith('.md'));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown);

  return processedContent.toString();
}

function parseMarkdownMeta(fileName: string): BlogPostMeta | null {
  try {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      metaDescription: matterResult.data.metaDescription,
      imageUrl: matterResult.data.imageUrl,
      date: matterResult.data.date,
      author: matterResult.data.author,
      featured: matterResult.data.featured || false,
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      source: 'markdown',
    };
  } catch (error) {
    console.error(`Error reading blog post metadata from ${fileName}:`, error);
    return null;
  }
}

function getMarkdownBlogPostsMeta(): BlogPostMeta[] {
  return getMarkdownFileNames()
    .map(parseMarkdownMeta)
    .filter((post): post is BlogPostMeta => Boolean(post));
}

async function getMarkdownBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const contentHtml = await renderMarkdownToHtml(matterResult.content);

    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      metaDescription: matterResult.data.metaDescription,
      imageUrl: matterResult.data.imageUrl,
      date: matterResult.data.date,
      author: matterResult.data.author,
      featured: matterResult.data.featured || false,
      tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
      content: contentHtml,
      source: 'markdown',
    };
  } catch {
    return null;
  }
}

function normaliseFieldKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-');
}

function getConfiguredFieldNames(envKey: string, fallbacks: string[]): string[] {
  const override = process.env[envKey]?.trim();
  return override ? [override] : fallbacks;
}

function getFieldValue(fieldData: Record<string, unknown>, envKey: string, fallbacks: string[]): unknown {
  const keys = Object.keys(fieldData);
  const candidates = getConfiguredFieldNames(envKey, fallbacks).map(normaliseFieldKey);

  for (const candidate of candidates) {
    const matchingKey = keys.find((key) => normaliseFieldKey(key) === candidate);
    if (matchingKey) {
      return fieldData[matchingKey];
    }
  }

  return undefined;
}

function toStringValue(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object' && value && 'value' in value) {
    return toStringValue((value as { value?: unknown }).value);
  }
  return '';
}

function toBooleanValue(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string') {
    const normalised = value.trim().toLowerCase();
    return ['true', '1', 'yes', 'on'].includes(normalised);
  }
  return false;
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => toStringArray(entry));
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  }

  if (typeof value === 'object' && value) {
    const record = value as Record<string, unknown>;
    if (typeof record.name === 'string') return [record.name.trim()].filter(Boolean);
    if (typeof record.value === 'string') return [record.value.trim()].filter(Boolean);
  }

  return [];
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function toReferenceIds(value: unknown): string[] {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((entry) => toReferenceIds(entry));
  }

  if (typeof value === 'object' && value) {
    const record = value as Record<string, unknown>;
    if (typeof record.id === 'string') return [record.id];
    if (typeof record.value === 'string') return [record.value];
  }

  return [];
}

function toImageUrl(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed || undefined;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const url = toImageUrl(entry);
      if (url) return url;
    }
    return undefined;
  }

  if (typeof value === 'object' && value) {
    const record = value as Record<string, unknown>;
    if (typeof record.url === 'string' && record.url.trim()) return record.url.trim();
    if (typeof record.src === 'string' && record.src.trim()) return record.src.trim();
    if (record.file && typeof record.file === 'object') {
      const nestedUrl = toImageUrl(record.file);
      if (nestedUrl) return nestedUrl;
    }
  }

  return undefined;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function createExcerpt(content: string): string {
  const text = stripHtml(content);
  if (text.length <= 180) return text;
  return `${text.slice(0, 177).trimEnd()}...`;
}

function toBlogMeta(post: BlogPost): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    metaDescription: post.metaDescription,
    imageUrl: post.imageUrl,
    date: post.date,
    author: post.author,
    featured: post.featured,
    tags: post.tags,
    source: post.source,
  };
}

async function fetchWebflowJson<T>(path: string): Promise<T> {
  const apiToken = process.env.WEBFLOW_API_TOKEN;
  if (!apiToken) {
    throw new Error('Missing WEBFLOW_API_TOKEN');
  }

  const response = await fetch(`${WEBFLOW_API_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      accept: 'application/json',
    },
    next: { revalidate: WEBFLOW_CACHE_REVALIDATE, tags: [WEBFLOW_BLOG_CACHE_TAG] },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Webflow API responded with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function sortByDateDescending<T extends { date: string }>(posts: T[]): T[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function mergeBlogPostMetaLists(...lists: BlogPostMeta[][]): BlogPostMeta[] {
  const merged = new Map<string, BlogPostMeta>();

  for (const list of lists) {
    for (const post of list) {
      if (!merged.has(post.slug)) {
        merged.set(post.slug, post);
      }
    }
  }

  return sortByDateDescending(Array.from(merged.values()));
}

function mapWebflowItemToBlogPost(
  item: WebflowCollectionItem,
  categoryNameById: Map<string, string>
): BlogPost | null {
  const fieldData = item.fieldData;
  if (!fieldData) return null;

  const title = toStringValue(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_TITLE_FIELD', ['title', 'name', 'post-title'])
  );
  const slug = toStringValue(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_SLUG_FIELD', ['slug'])
  );
  const content = toStringValue(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_CONTENT_FIELD', ['content', 'body', 'post-body', 'rich-text'])
  );

  if (!title || !slug || !content) return null;

  const excerpt =
    toStringValue(
      getFieldValue(fieldData, 'WEBFLOW_BLOG_EXCERPT_FIELD', ['excerpt', 'summary', 'short-description'])
    ) || createExcerpt(content);

  const metaDescription =
    toStringValue(
      getFieldValue(
        fieldData,
        'WEBFLOW_BLOG_META_DESCRIPTION_FIELD',
        ['meta-description', 'metadescription', 'seo-description', 'description']
      )
    ) || excerpt;

  const imageUrl = toImageUrl(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_IMAGE_FIELD', [
      'image',
      'thumbnail',
      'hero-image',
      'hero image',
      'cover-image',
      'featured-image',
      'main-image',
      'main image',
    ])
  );

  const author =
    toStringValue(
      getFieldValue(fieldData, 'WEBFLOW_BLOG_AUTHOR_FIELD', ['author', 'author-name'])
    ) || "Noa's Place";

  const date =
    toStringValue(
      getFieldValue(fieldData, 'WEBFLOW_BLOG_DATE_FIELD', ['date', 'publish-date', 'published-on', 'post-date'])
    ) ||
    item.lastPublished ||
    item.lastUpdated ||
    item.createdOn;

  const featured = toBooleanValue(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_FEATURED_FIELD', [
      'featured',
      'is-featured',
      'is-this-featured',
      'featured-post',
    ])
  );

  const explicitTags = toStringArray(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_TAGS_FIELD', ['tags', 'categories', 'topics'])
  );
  const categoryReferenceIds = toReferenceIds(
    getFieldValue(fieldData, 'WEBFLOW_BLOG_CATEGORY_FIELD', ['category'])
  );
  const categoryTags = categoryReferenceIds
    .map((id) => categoryNameById.get(id))
    .filter((tag): tag is string => Boolean(tag));
  const tags = uniqueStrings([...explicitTags, ...categoryTags]);

  if (!date) return null;

  return {
    slug,
    title,
    excerpt,
    metaDescription,
    imageUrl,
    date,
    author,
    featured,
    tags,
    content,
    source: 'webflow',
  };
}

async function fetchWebflowBlogCollectionSchemaUncached(): Promise<WebflowCollectionSchema | null> {
  const collectionId = process.env.WEBFLOW_BLOG_COLLECTION_ID;

  if (!collectionId) {
    return null;
  }

  try {
    return await fetchWebflowJson<WebflowCollectionSchema>(`/collections/${collectionId}`);
  } catch (error) {
    console.error('Error fetching Webflow blog collection schema:', error);
    return null;
  }
}

const getCachedWebflowBlogCollectionSchema = unstable_cache(
  fetchWebflowBlogCollectionSchemaUncached,
  ['webflow-blog-collection-schema'],
  { revalidate: WEBFLOW_CACHE_REVALIDATE, tags: [WEBFLOW_BLOG_CACHE_TAG] }
);

async function getWebflowBlogCollectionSchema(): Promise<WebflowCollectionSchema | null> {
  return getCachedWebflowBlogCollectionSchema();
}

function getWebflowCategoryCollectionId(schema: WebflowCollectionSchema | null): string | null {
  const override = process.env.WEBFLOW_BLOG_CATEGORIES_COLLECTION_ID?.trim();
  if (override) return override;

  const categoryField = schema?.fields?.find(
    (field) => normaliseFieldKey(field.slug ?? '') === 'category' && field.type === 'Reference'
  );

  return categoryField?.validations?.collectionId ?? null;
}

async function fetchWebflowCategoryMapUncached(): Promise<Map<string, string>> {
  const schema = await getWebflowBlogCollectionSchema();
  const categoryCollectionId = getWebflowCategoryCollectionId(schema);

  if (!categoryCollectionId) {
    return new Map();
  }

  try {
    const data = await fetchWebflowJson<{ items?: WebflowCollectionItem[] }>(
      `/collections/${categoryCollectionId}/items/live`
    );

    return new Map(
      (data.items ?? [])
        .map((item) => {
          const name = toStringValue(item.fieldData?.name);
          return item.id && name ? [item.id, name] : null;
        })
        .filter((entry): entry is [string, string] => Boolean(entry))
    );
  } catch (error) {
    console.error('Error fetching Webflow blog categories:', error);
    return new Map();
  }
}

const getCachedWebflowCategoryMap = unstable_cache(
  async () => Array.from((await fetchWebflowCategoryMapUncached()).entries()),
  ['webflow-blog-categories'],
  { revalidate: WEBFLOW_CACHE_REVALIDATE, tags: [WEBFLOW_BLOG_CACHE_TAG] }
);

async function getWebflowCategoryMap(): Promise<Map<string, string>> {
  return new Map(await getCachedWebflowCategoryMap());
}

async function fetchWebflowBlogPostsUncached(): Promise<BlogPost[]> {
  const collectionId = process.env.WEBFLOW_BLOG_COLLECTION_ID;

  if (!collectionId || !process.env.WEBFLOW_API_TOKEN) {
    return [];
  }

  try {
    const [data, categoryNameById] = await Promise.all([
      fetchWebflowJson<{ items?: WebflowCollectionItem[] }>(`/collections/${collectionId}/items/live`),
      getWebflowCategoryMap(),
    ]);
    const posts = (data.items ?? [])
      .map((item) => mapWebflowItemToBlogPost(item, categoryNameById))
      .filter((post): post is BlogPost => Boolean(post));

    return sortByDateDescending(posts);
  } catch (error) {
    console.error('Error fetching Webflow blog posts:', error);
    return [];
  }
}

const getCachedWebflowBlogPosts = unstable_cache(
  fetchWebflowBlogPostsUncached,
  ['webflow-blog-posts'],
  { revalidate: WEBFLOW_CACHE_REVALIDATE, tags: [WEBFLOW_BLOG_CACHE_TAG] }
);

async function getWebflowBlogPosts(): Promise<BlogPost[]> {
  return getCachedWebflowBlogPosts();
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const markdownPosts = getMarkdownBlogPostsMeta();
  const webflowPosts = (await getWebflowBlogPosts()).map(toBlogMeta);

  return mergeBlogPostMetaLists(markdownPosts, webflowPosts);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const markdownPost = await getMarkdownBlogPost(slug);
  if (markdownPost) return markdownPost;

  const webflowPosts = await getWebflowBlogPosts();
  return webflowPosts.find((post) => post.slug === slug) ?? null;
}

export async function getFeaturedBlogPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.featured);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const allTags = new Set<string>();

  for (const post of allPosts) {
    for (const tag of post.tags ?? []) {
      allTags.add(tag);
    }
  }

  return Array.from(allTags).sort();
}
