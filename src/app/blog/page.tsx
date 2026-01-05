import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import { format } from 'date-fns';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: "Blog | Noa's Place Halifax - SEND Support Stories West Yorkshire",
  description: "Read Noa's Place blog - latest stories, updates & resources for SEND families in Halifax & West Yorkshire. Community stories, support tips & charity news.",
  keywords: "Noa's Place blog Halifax, SEND support blog West Yorkshire, neurodivergent family stories Calderdale, autism support blog Halifax, ADHD awareness Yorkshire, family support resources Halifax, charity blog West Yorkshire",
  openGraph: {
    title: "Blog | Noa's Place Halifax - SEND Support Stories West Yorkshire",
    description: "Read Noa's Place blog - latest stories, updates & resources for SEND families in Halifax & West Yorkshire. Community stories, support tips & charity news.",
    url: 'https://noasplace.org.uk/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://noasplace.org.uk/blog'
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const tags = await getAllTags();

  return <BlogClient posts={posts} tags={tags} />;
}
