import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { NotionPost, BlogListResponse } from '@/types/notion';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getMarkdownPosts(): Promise<BlogListResponse> {
  try {
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.warn('Posts directory does not exist');
      return { posts: [], hasMore: false };
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Process markdown content to HTML
          const processedContent = await remark()
            .use(html, { sanitize: false })
            .process(content);
          const contentHtml = processedContent.toString();

          return {
            id: slug,
            title: data.title || 'Untitled',
            slug,
            excerpt: data.excerpt || '',
            publishedDate: data.date || new Date().toISOString(),
            lastEditedTime: data.date || new Date().toISOString(),
            tags: data.tags || [],
            featured: data.featured || false,
            published: true,
            author: data.author || '',
            coverImage: data.image || '',
            content: contentHtml,
          } as NotionPost & { content: string };
        })
    );

    // Sort by date (newest first)
    allPostsData.sort((a, b) => {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

    return {
      posts: allPostsData,
      hasMore: false,
    };
  } catch (error) {
    console.error('Error reading markdown posts:', error);
    return { posts: [], hasMore: false };
  }
}

export async function getMarkdownPost(slug: string): Promise<(NotionPost & { content: string }) | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Process markdown content to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      title: data.title || 'Untitled',
      slug,
      excerpt: data.excerpt || '',
      publishedDate: data.date || new Date().toISOString(),
      lastEditedTime: data.date || new Date().toISOString(),
      tags: data.tags || [],
      featured: data.featured || false,
      published: true,
      author: data.author || '',
      coverImage: data.image || '',
      content: contentHtml,
    };
  } catch (error) {
    console.error('Error reading markdown post:', error);
    return null;
  }
}

export async function getFeaturedMarkdownPosts(limit: number = 3): Promise<NotionPost[]> {
  const { posts } = await getMarkdownPosts();
  return posts.slice(0, limit);
}

export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}
