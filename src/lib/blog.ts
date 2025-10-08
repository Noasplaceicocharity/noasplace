import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

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
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => {
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
          tags: matterResult.data.tags || [],
        };
      });

    // Sort posts by date in descending order (newest first)
    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkBreaks)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title,
      excerpt: matterResult.data.excerpt,
      metaDescription: matterResult.data.metaDescription,
      imageUrl: matterResult.data.imageUrl,
      date: matterResult.data.date,
      author: matterResult.data.author,
      featured: matterResult.data.featured || false,
      tags: matterResult.data.tags || [],
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.featured);
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.tags?.includes(tag));
}

export function getAllTags(): string[] {
  try {
    const fileNames = fs.readdirSync(blogDirectory);
    const allTags = new Set<string>();
    
    fileNames
      .filter((name) => name.endsWith('.md'))
      .forEach((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        if (matterResult.data.tags) {
          matterResult.data.tags.forEach((tag: string) => allTags.add(tag));
        }
      });

    return Array.from(allTags).sort();
  } catch (error) {
    console.error('Error reading blog tags:', error);
    return [];
  }
}
