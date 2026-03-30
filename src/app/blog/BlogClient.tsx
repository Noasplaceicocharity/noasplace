'use client';

import Link from 'next/link';
import Image from 'next/image';
import MailchimpEmailBar from '@/components/MailchimpEmailBar';
import { BlogPostMeta } from '@/lib/blog';
import { pickFeaturedBlogPost } from '@/lib/blog-shared';
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

  /** Featured first, then remaining posts (same card layout for all). */
  const displayPosts = useMemo(() => {
    const featured = pickFeaturedBlogPost(filteredPosts);
    if (!featured) return filteredPosts;
    const rest = filteredPosts.filter((p) => p.slug !== featured.slug);
    return [featured, ...rest];
  }, [filteredPosts]);

  /** All featured posts site-wide, newest first — for the right sidebar. */
  const featuredSidebarPosts = useMemo(() => {
    return [...posts]
      .filter((p) => p.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts]);

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

      {/* Main Content Section — 3-column card grid (main column flush-left on large screens when sidebar is present) */}
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
            <div
              className={`grid w-full grid-cols-1 gap-10 ${featuredSidebarPosts.length > 0 ? 'lg:grid-cols-[minmax(0,1fr)_17.5rem] xl:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-6 xl:gap-x-8' : ''}`}
            >
              <div
                className={`min-w-0 ${featuredSidebarPosts.length > 0 ? 'pl-4 sm:pl-6 lg:pl-8' : 'px-4 sm:px-6 lg:px-8'}`}
              >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-10">
                  {displayPosts.map((post) => {
                    const isFeaturedCard = Boolean(post.featured);
                    const categoryLabel = post.tags?.[0];
                    return (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group relative isolate block aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-xl shadow-black/25 ring-1 ring-white/15 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-white/25"
                      >
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-[#6E3482] via-brand-800 to-[#2d1b36]"
                            aria-hidden
                          />
                        )}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/20"
                          aria-hidden
                        />
                        {isFeaturedCard && (
                          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#FFB800] px-3 py-1 text-xs font-bold text-ink shadow-md">
                            Featured
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-5 sm:p-6">
                          {categoryLabel ? (
                            <span className="mb-3 inline-flex max-w-full self-start truncate rounded-lg bg-[#6E3482] px-3 py-1.5 text-xs font-semibold text-white shadow-md">
                              {categoryLabel}
                            </span>
                          ) : null}
                          <h2 className="line-clamp-2 text-lg font-extrabold leading-snug text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] sm:text-xl">
                            {post.title}
                          </h2>
                          <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-white/92 sm:text-base">
                            {post.excerpt}
                          </p>
                          <time
                            className="mt-3 text-xs font-semibold text-white/75"
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

              {featuredSidebarPosts.length > 0 ? (
                <aside
                  className="hidden min-w-0 shrink-0 pr-4 sm:pr-6 lg:block lg:pr-8"
                  aria-label="Featured posts"
                >
                  <div className="sticky top-24 space-y-5">
                    <h2 className="text-lg font-extrabold text-brand-800 xl:text-xl">
                      Featured
                    </h2>
                    <div className="flex flex-col gap-5">
                      {featuredSidebarPosts.map((post) => {
                        const categoryLabel = post.tags?.[0];
                        return (
                          <Link
                            key={`sidebar-${post.slug}`}
                            href={`/blog/${post.slug}`}
                            className="group flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-brand-900/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-100">
                              {post.imageUrl ? (
                                <Image
                                  src={post.imageUrl}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                  sizes="280px"
                                />
                              ) : (
                                <div
                                  className="absolute inset-0 bg-gradient-to-br from-[#6E3482] to-brand-900"
                                  aria-hidden
                                />
                              )}
                              <span className="absolute left-3 top-3 rounded-full bg-[#FFB800] px-2.5 py-0.5 text-[10px] font-bold text-ink shadow-sm">
                                Featured
                              </span>
                            </div>
                            <div className="flex flex-col p-4">
                              {categoryLabel ? (
                                <span className="mb-2 inline-flex max-w-full self-start truncate rounded-md bg-[#6E3482] px-2.5 py-1 text-[10px] font-semibold text-white">
                                  {categoryLabel}
                                </span>
                              ) : null}
                              <h3 className="line-clamp-3 text-sm font-extrabold leading-snug text-brand-900 group-hover:text-brand-800">
                                {post.title}
                              </h3>
                              <time
                                className="mt-2 text-[11px] font-medium text-ink/55"
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
                </aside>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
