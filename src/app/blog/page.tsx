import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, getFeaturedPosts, getAllTags } from '@/lib/notion';
import BlogSetupGuide from '@/components/BlogSetupGuide';
import { format } from 'date-fns';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Noa's Place",
  description: "Read our latest updates, stories, and insights from Noa's Place - supporting families with additional needs in Halifax, West Yorkshire.",
  openGraph: {
    title: "Blog | Noa's Place",
    description: "Read our latest updates, stories, and insights from Noa's Place - supporting families with additional needs in Halifax, West Yorkshire.",
  },
};

// Revalidate every hour
export const revalidate = 60;
export const runtime = 'nodejs';

export default async function BlogPage() {
  let posts, featuredPosts, tags;
  
  try {
    [posts, featuredPosts, tags] = await Promise.all([
      getBlogPosts(12),
      getFeaturedPosts(3),
      getAllTags(),
    ]);
  } catch (error) {
    console.error('Error loading blog data:', error);
    posts = { posts: [], hasMore: false };
    featuredPosts = [];
    tags = [];
  }

  // Check if Notion is configured
  const isNotionConfigured = process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID;

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
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
              <span className="block">Our</span>
              <span className="block bg-gradient-to-r from-brand-800 to-brand-500 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-ink/80">
              Stay updated with our journey, stories from our community, and insights about supporting families with additional needs.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Posts Section (since you don't have featured field) */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-bold text-ink mb-12">Recent Posts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
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
                        {/* Tags and featured badge removed since they're not in your schema */}
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
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags Filter Section - Hidden since tags aren't in your schema */}
      {false && tags.length > 0 && (
        <section className="py-8 bg-brand-50/30">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-ink">Filter by topic:</span>
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-brand-50 transition-colors"
              >
                All Posts
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-brand-50 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-ink mb-12">All Posts</h2>
          
          {posts.posts.length === 0 ? (
            !isNotionConfigured ? (
              <BlogSetupGuide />
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto max-w-md">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No blog posts yet</h3>
                  <p className="mt-2 text-gray-500">
                    We're working on creating great content for you. Check back soon!
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.posts.map((post) => (
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
                        {/* Tags removed since they're not in your schema */}
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
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {posts.hasMore && (
            <div className="mt-12 text-center">
              <Link
                href={`/blog?cursor=${posts.nextCursor}`}
                className="inline-flex items-center justify-center rounded-xl bg-brand-800 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-700 transition duration-200"
              >
                Load More Posts
                <svg className="ml-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
