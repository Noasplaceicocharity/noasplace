import Link from 'next/link';
import Image from 'next/image';
import { getPostsByTag, getAllTags } from '@/lib/notion';
import { format } from 'date-fns';
import type { NotionPost } from '@/types/notion';
import type { Metadata } from 'next';

interface TagPageProps {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  
  return {
    title: `${tag} Posts | Noa's Place Blog`,
    description: `Read all posts tagged with "${tag}" on Noa's Place blog`,
    openGraph: {
      title: `${tag} Posts | Noa's Place Blog`,
      description: `Read all posts tagged with "${tag}" on Noa's Place blog`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const tags = await getAllTags();
    return tags.map((tag) => ({
      tag: encodeURIComponent(tag),
    }));
  } catch (error) {
    console.error('Error generating static params for tags:', error);
    return [];
  }
}

// Revalidate every hour
export const revalidate = 60;
export const runtime = 'nodejs';

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  
  let posts: NotionPost[] = [];
  let allTags: string[] = [];
  
  try {
    [posts, allTags] = await Promise.all([
      getPostsByTag(tag, 20),
      getAllTags(),
    ]);
  } catch (error) {
    console.error('Error loading tag page data:', error);
    posts = [];
    allTags = [];
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return 'Date unavailable';
    }
  };

  return (
    <main className="bg-background text-ink">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/30 to-white pt-20 pb-16">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg className="absolute right-0 top-0 h-32 w-32 rotate-90 text-[#40BFBF]/20" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          <div className="absolute left-1/4 top-1/3 size-4 rounded-full bg-[#FFB800]/20" />
          <div className="absolute right-1/3 bottom-1/4 size-3 rounded-full bg-[#6E3482]/20" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-ink/60">
              <li>
                <Link href="/" className="hover:text-brand-800 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-800 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </li>
              <li className="text-ink">
                {tag}
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 mb-6">
              <svg className="mr-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              Tag
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl mb-6">
              {tag}
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-ink/80">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged with "{tag}"
            </p>
          </div>
        </div>
      </section>

      {/* Tags Filter Section */}
      {allTags.length > 0 && (
        <section className="py-8 bg-brand-50/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-ink">Other topics:</span>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-brand-50 transition-colors"
              >
                All Posts
              </Link>
              {allTags.filter(t => t !== tag).slice(0, 8).map((otherTag) => (
                <Link
                  key={otherTag}
                  href={`/blog/tag/${encodeURIComponent(otherTag)}`}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-brand-50 transition-colors"
                >
                  {otherTag}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No posts found</h3>
                <p className="mt-2 text-gray-500">
                  We haven't published any posts with the tag "{tag}" yet.
                </p>
                <div className="mt-6">
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-800 px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-brand-700 transition duration-200"
                  >
                    Browse All Posts
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      {post.coverImage && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-800">
                            {tag}
                          </span>
                          {post.tags.filter(t => t !== tag).slice(0, 2).map((otherTag) => (
                            <span key={otherTag} className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                              {otherTag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-brand-800 transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-ink/80 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm text-ink/60">
                          <span>{formatDate(post.publishedDate)}</span>
                          {post.author && <span>By {post.author}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
