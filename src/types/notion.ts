import type { ExtendedRecordMap } from 'notion-types';
export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedDate: string;
  lastEditedTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  author?: string;
  coverImage?: string;
  content?: unknown; // Notion block content
}

export interface NotionPage {
  id: string;
  title: string;
  blocks: ExtendedRecordMap;
}

export interface BlogListResponse {
  posts: NotionPost[];
  hasMore: boolean;
  nextCursor?: string;
}

export interface NotionDatabaseProperty {
  id: string;
  name: string;
  type: string;
}
