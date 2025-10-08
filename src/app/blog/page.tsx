import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import { format } from 'date-fns';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: "Blog | Noa's Place",
  description: "Read our latest blog posts about Noa's Place, community stories, and resources for families with additional needs.",
  openGraph: {
    title: "Blog | Noa's Place",
    description: "Read our latest blog posts about Noa's Place, community stories, and resources for families with additional needs.",
    url: 'https://noasplace.org.uk/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const tags = await getAllTags();

  return <BlogClient posts={posts} tags={tags} />;
}
