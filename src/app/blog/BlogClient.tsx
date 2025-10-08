'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface BlogClientProps {
  posts: BlogPostMeta[];
  tags: string[];
}

export default function BlogClient({ posts, tags }: BlogClientProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter(post => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find(post => post.featured);
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    return filteredPosts.filter(post => !post.featured);
  }, [filteredPosts]);

  return (
    <main className="bg-background text-ink">
      {/* Hero Section */}
      <section className="relative isolate min-h-[400px] overflow-hidden">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top left puzzle piece */}
          <svg className="absolute -left-12 top-12 h-32 w-32 rotate-[-12deg] text-[#6E3482]/40" viewBox="0 0 100 100" fill="currentColor">
            <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
          </svg>
          {/* Top right infinity */}
          <svg className="absolute -right-12 top-20 h-28 w-44 rotate-12 text-[#40BFBF]/40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="8">
            <path d="M30,25 C30,15 35,10 45,10 C55,10 60,15 60,25 C60,35 55,40 45,40 C35,40 30,35 30,25 M70,25 C70,15 75,10 85,10 C95,10 100,15 100,25 C100,35 95,40 85,40 C75,40 70,35 70,25" />
          </svg>
          {/* Bottom left squiggle */}
          <svg className="absolute -left-8 bottom-32 h-24 w-44 text-[#FFB800]/40" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="6">
            <path d="M0,15 Q25,0 50,15 T100,15" strokeLinecap="round" />
          </svg>
          {/* Scattered dots */}
          <div className="absolute right-1/4 top-1/4 size-6 rounded-full bg-[#6E3482]/30" />
          <div className="absolute left-1/3 bottom-1/3 size-5 rounded-full bg-[#40BFBF]/40" />
          <div className="absolute right-1/3 top-2/3 size-4 rounded-full bg-[#FFB800]/30" />
          {/* Stars */}
          <svg className="absolute right-1/4 bottom-1/4 h-12 w-12 rotate-12 text-[#FFB800]/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
          <svg className="absolute left-1/3 top-1/3 h-10 w-10 -rotate-12 text-[#6E3482]/30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
          </svg>
        </div>

        <div className="relative px-6 pt-16 pb-8 sm:pt-20 sm:pb-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-6">
              Our Blog
            </h1>
            <p className="text-xl font-bold text-ink sm:text-2xl">
              Stories, updates, and resources from our community
            </p>
            {selectedTag && (
              <div className="mt-4">
                <p className="text-lg text-brand-800">
                  Filtering by: <span className="font-bold">{selectedTag}</span>
                </p>
                <Link 
                  href="/blog" 
                  className="inline-flex items-center mt-2 text-sm text-brand-800 hover:text-brand-900 underline"
                >
                  ← Clear filter
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white pt-8 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Tags */}
                {tags.length > 0 && (
                  <div className="rounded-2xl bg-brand-50/30 p-6 border border-brand-100/30">
                    <h3 className="text-lg font-extrabold text-brand-800 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${encodeURIComponent(tag)}`}
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors shadow-sm border ${
                            selectedTag === tag
                              ? 'bg-brand-800 text-white border-brand-800'
                              : 'bg-white text-brand-800 hover:bg-brand-100 border-brand-100/30'
                          }`}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Blog */}
                <div className="rounded-2xl bg-brand-50/30 p-6 border border-brand-100/30">
                  <h3 className="text-lg font-extrabold text-brand-800 mb-4">About Our Blog</h3>
                  <p className="text-sm text-ink/80 leading-relaxed">
                    We share stories from our community, project updates, and resources to support families with additional needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 rounded-full bg-brand-100 flex items-center justify-center mb-6">
                    <svg className="h-12 w-12 text-brand-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-ink mb-2">
                    {selectedTag ? `No posts found for "${selectedTag}"` : 'No blog posts yet'}
                  </h3>
                  <p className="text-ink/60">
                    {selectedTag 
                      ? 'Try selecting a different tag or clear the filter to see all posts.'
                      : 'Check back soon for updates and stories from our community.'
                    }
                  </p>
                  {selectedTag && (
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center mt-4 text-brand-800 hover:text-brand-900 underline"
                    >
                      ← View all posts
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Featured Post */}
                  {featuredPost && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-extrabold text-brand-800 mb-6">Featured Post</h2>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="group block relative overflow-hidden rounded-3xl bg-white shadow-lg border border-brand-100/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                      >
                        {/* Decorative elements */}
                        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity z-10">
                          <svg className="h-12 w-12 text-[#FFB800]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
                          </svg>
                        </div>

                        {/* Featured Image */}
                        {featuredPost.imageUrl && (
                          <div className="relative aspect-[16/9] w-full overflow-hidden">
                            <Image
                              src={featuredPost.imageUrl}
                              alt={featuredPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute top-6 left-6">
                              <span className="inline-flex items-center rounded-full bg-[#FFB800] px-4 py-2 text-sm font-bold text-ink shadow-lg">
                                ⭐ Featured
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-10">
                          <div className="flex items-center gap-4 mb-6">
                            <time className="text-base font-medium text-brand-800">
                              {format(new Date(featuredPost.date), 'dd MMMM yyyy')}
                            </time>
                          </div>

                          <h3 className="text-4xl font-extrabold text-brand-800 group-hover:text-brand-900 transition-colors mb-6 leading-tight">
                            {featuredPost.title}
                          </h3>

                          <p className="text-ink/80 leading-relaxed mb-8 text-xl">
                            {featuredPost.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {featuredPost.tags && featuredPost.tags.length > 0 && (
                                <div className="flex gap-2">
                                  {featuredPost.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800 border border-brand-200/30"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {featuredPost.tags.length > 3 && (
                                    <span className="text-sm text-ink/60">
                                      +{featuredPost.tags.length - 3} more
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="inline-flex items-center text-brand-800 group-hover:text-brand-900 font-bold text-lg group-hover:translate-x-1 transition-all bg-brand-50 px-6 py-3 rounded-full group-hover:bg-brand-100">
                              Read more
                              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Regular Posts Grid */}
                  {regularPosts.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-extrabold text-brand-800 mb-6">
                        {featuredPost ? 'More Posts' : 'All Posts'}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {regularPosts.map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block relative overflow-hidden rounded-2xl bg-white shadow-sm border border-brand-100/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                          >
                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity z-10">
                              <svg className="h-6 w-6 text-[#FFB800]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,2 L15,9 L22,9 L16,14 L18,21 L12,17 L6,21 L8,14 L2,9 L9,9 Z" />
                              </svg>
                            </div>

                            {/* Featured Image */}
                            {post.imageUrl && (
                              <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <Image
                                  src={post.imageUrl}
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              </div>
                            )}
                            
                            <div className="p-6">
                              <div className="flex items-center gap-4 mb-4">
                                <time className="text-sm font-medium text-brand-800">
                                  {format(new Date(post.date), 'dd MMMM yyyy')}
                                </time>
                              </div>

                              <h3 className="text-xl font-extrabold text-brand-800 group-hover:text-brand-900 transition-colors mb-3 leading-tight">
                                {post.title}
                              </h3>

                              <p className="text-ink/80 leading-relaxed mb-6 text-base">
                                {post.excerpt}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  {post.tags && post.tags.length > 0 && (
                                    <div className="flex gap-2">
                                      {post.tags.slice(0, 2).map((tag) => (
                                        <span
                                          key={tag}
                                          className="inline-flex items-center rounded-full bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 border border-brand-200/30"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                      {post.tags.length > 2 && (
                                        <span className="text-xs text-ink/60">
                                          +{post.tags.length - 2} more
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>

                                <div className="inline-flex items-center text-brand-800 group-hover:text-brand-900 font-bold text-sm group-hover:translate-x-1 transition-all bg-brand-50 px-3 py-2 rounded-full group-hover:bg-brand-100">
                                  Read more
                                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
