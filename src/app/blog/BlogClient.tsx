'use client';

import Link from 'next/link';
import Image from 'next/image';
import MailchimpEmailBar from '@/components/MailchimpEmailBar';
import { BlogPostMeta } from '@/lib/blog';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface BlogClientProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const handleTagToggle = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <main className="bg-background text-ink">
      {/* Headline + mailing list */}
      <section className="relative border-b border-brand-100/40 bg-gradient-to-b from-brand-50/50 via-white to-background">
        <div className="mx-auto max-w-4xl px-6 pt-14 pb-10 text-center sm:pt-20 sm:pb-12">
          <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl">
            Discover our latest news
          </h1>
          <p className="mt-4 text-lg font-semibold text-ink/85 sm:text-xl">
            Stories, updates and resources for families in Halifax and West Yorkshire.
          </p>
          <div className="mt-8">
            <MailchimpEmailBar />
          </div>
        </div>
      </section>

      {tags.length > 0 && (
        <section className="bg-white border-b border-brand-100/30">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
              <div>
                <h2 className="text-lg font-extrabold text-brand-800">Categories</h2>
                <p className="text-sm text-ink/70">
                  Tap a category to filter posts. Tap it again to clear.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  aria-pressed={selectedTag === tag}
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-sm border ${
                    selectedTag === tag
                      ? 'bg-brand-800 text-white border-brand-800'
                      : 'bg-white text-brand-800 hover:bg-brand-100 border-brand-100/30'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main content — 16:9 card grid */}
      <section className="w-full bg-gradient-to-b from-white to-brand-50/20 pt-10 pb-24">
        <div className="w-full">
          {filteredPosts.length === 0 ? (
            <div className="mx-auto max-w-2xl px-6 py-12 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-brand-100">
                <svg className="h-12 w-12 text-brand-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-ink">
                {selectedTag ? `No posts found for "${selectedTag}"` : 'No blog posts yet'}
              </h3>
              <p className="text-ink/60">
                {selectedTag
                  ? 'Try selecting a different category or clear the filter to see all posts.'
                  : 'Check back soon for updates and stories from our community.'}
              </p>
              {selectedTag && (
                <Link href="/blog" className="mt-4 inline-flex items-center text-brand-800 underline hover:text-brand-900">
                  View all posts
                </Link>
              )}
            </div>
          ) : (
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-10">
                {filteredPosts.map((post) => {
                  const isFeaturedCard = Boolean(post.featured);
                  const categoryLabel = post.tags?.[0];
                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-black/10 ring-1 ring-brand-900/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-brand-800/20"
                    >
                      <div className="relative aspect-video w-full shrink-0 bg-brand-50">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-contain transition duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-[#6E3482] via-brand-800 to-[#2d1b36]"
                            aria-hidden
                          />
                        )}
                        {isFeaturedCard && (
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-[#FFB800] px-3 py-1 text-xs font-bold text-ink shadow-md">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                        {categoryLabel ? (
                          <span className="mb-2 inline-flex max-w-full self-start truncate rounded-lg bg-[#6E3482] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                            {categoryLabel}
                          </span>
                        ) : null}
                        <h2 className="line-clamp-3 text-base font-extrabold leading-snug text-brand-900 group-hover:text-brand-800 sm:text-lg">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/75">
                          {post.excerpt}
                        </p>
                        <time
                          className="mt-3 text-xs font-semibold text-ink/55"
                          dateTime={post.date}
                        >
                          {format(new Date(post.date), 'dd MMM yyyy')}
                        </time>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
