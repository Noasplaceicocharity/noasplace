import "server-only";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string | null;
  coverImageUrl: string | null;
  published: boolean;
};

const notionToken = process.env.NOTION_TOKEN;
const notionTokenV2 = process.env.NOTION_TOKEN_V2; // Optional cookie token for notion-client
// Support both the correct and commonly misspelled env var just in case
const databaseId =
  process.env.NOTION_DATABASE_ID || process.env.NOATION_DATABASE_ID || "";

// notion-client uses the unofficial API and, if provided, expects token_v2 (NOTION_TOKEN_V2)
const notionContent = new NotionAPI({ auth: notionTokenV2 });

async function notionApi<T>(path: string, body?: unknown): Promise<T> {
  if (!notionToken) throw new Error("NOTION_TOKEN is not set");
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${notionToken}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    // Ensure server side fetch
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Notion API error ${res.status}: ${txt}`);
  }
  return res.json() as Promise<T>;
}

type RichTextItem = {
  plain_text?: string;
};

function getPlainText(richText: RichTextItem[] | undefined): string {
  if (!richText || !Array.isArray(richText)) return "";
  return richText.map((t) => t.plain_text || "").join("");
}

type FilesOrUrlProperty =
  | { type: "files"; files: Array<{ type: "file" | "external"; file?: { url?: string }; external?: { url?: string } }> }
  | { type: "url"; url: string | null };

function extractCoverFromProperty(page: PageObjectResponse): string | null {
  const prop = (page.properties as Record<string, unknown>)["Cover Image"] as FilesOrUrlProperty | undefined;
  if (!prop) return null;
  if (prop.type === "files" && Array.isArray(prop.files) && prop.files.length) {
    const f = prop.files[0];
    if (f.type === "file") return f.file.url || null;
    if (f.type === "external") return f.external.url || null;
  }
  if (prop.type === "url" && prop.url) return prop.url;
  return null;
}

function extractPageCover(page: PageObjectResponse): string | null {
  const cover = page.cover as { type: "file" | "external"; file?: { url?: string }; external?: { url?: string } } | null;
  if (!cover) return null;
  if (cover.type === "file") return cover.file?.url || null;
  if (cover.type === "external") return cover.external?.url || null;
  return null;
}

type TitleProperty = { type: "title"; title: RichTextItem[] };
type RichTextProperty = { type: "rich_text"; rich_text: RichTextItem[] } | { type: "url"; url: string | null };
type DateProperty = { type: "date"; date: { start: string | null } | null };
type CheckboxProperty = { type: "checkbox"; checkbox: boolean };

function mapPageToPost(page: PageObjectResponse): BlogPost | null {
  const props = page.properties as Record<string, unknown>;
  const titleProp = props["Title"] as TitleProperty | undefined;
  const slugProp = props["Slug"] as RichTextProperty | undefined;
  const dateProp = props["Date"] as DateProperty | undefined;
  const publishedProp = props["Published"] as CheckboxProperty | undefined;

  const title = titleProp?.type === "title" ? getPlainText(titleProp.title) : "";
  const slug = slugProp?.type === "rich_text" ? getPlainText(slugProp.rich_text) : slugProp?.type === "url" ? slugProp.url || "" : "";
  const date = dateProp?.type === "date" ? dateProp.date?.start || null : null;
  const published = publishedProp?.type === "checkbox" ? Boolean(publishedProp.checkbox) : false;

  if (!title || !slug) return null;

  const coverFromProp = extractCoverFromProperty(page);
  const coverFromPage = extractPageCover(page);

  return {
    id: page.id,
    title,
    slug,
    date,
    coverImageUrl: coverFromProp || coverFromPage,
    published,
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!databaseId) throw new Error("NOTION_DATABASE_ID is not set");
  const resp = await notionApi<{ results: PageObjectResponse[] }>(
    `/databases/${databaseId}/query`,
    {
      filter: {
        and: [{ property: "Published", checkbox: { equals: true } }],
      },
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: 100,
    }
  );
  const posts = resp.results
    .map((r) => r as PageObjectResponse)
    .map(mapPageToPost)
    .filter((p): p is BlogPost => Boolean(p));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!databaseId) throw new Error("NOTION_DATABASE_ID is not set");
  const resp = await notionApi<{ results: PageObjectResponse[] }>(
    `/databases/${databaseId}/query`,
    {
      filter: {
        and: [{ property: "Slug", rich_text: { equals: slug } }],
      },
      page_size: 1,
    }
  );
  const page = resp.results[0] as PageObjectResponse | undefined;
  if (!page) return null;
  const post = mapPageToPost(page);
  return post;
}

export async function getRecordMapForPage(pageId: string) {
  return notionContent.getPage(pageId);
}


