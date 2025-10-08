import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import { format } from 'date-fns';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Noa's Place Blog`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      url: `https://noasplace.org.uk/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.imageUrl ? [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
            <div className="flex items-center justify-center gap-4 mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center text-brand-600 hover:text-brand-800 transition-colors font-medium"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
              {post.featured && (
                <span className="inline-flex items-center rounded-full bg-[#FFB800] px-3 py-1 text-sm font-bold text-ink shadow-sm">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="relative aspect-[16/8] w-full max-w-3xl mx-auto overflow-hidden rounded-2xl mb-8">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
            
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-6">
              {post.title}
            </h1>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-ink/80">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time className="font-medium">{format(new Date(post.date), 'dd MMMM yyyy')}</time>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800 border border-brand-200/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white pt-8 pb-24">
        <article className="mx-auto max-w-4xl px-6">
          <div className="blog-content">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>


          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-2xl font-extrabold text-brand-800 mb-6">More from our blog</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href="/blog"
                className="group block rounded-2xl bg-brand-50/30 p-6 border border-brand-100/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <h4 className="text-lg font-extrabold text-brand-800 group-hover:text-brand-600 transition-colors mb-2">
                  View all posts
                </h4>
                <p className="text-ink/60">
                  Explore more stories, updates, and resources from our community.
                </p>
              </Link>
              <Link
                href="/contact"
                className="group block rounded-2xl bg-brand-50/30 p-6 border border-brand-100/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <h4 className="text-lg font-extrabold text-brand-800 group-hover:text-brand-600 transition-colors mb-2">
                  Get in touch
                </h4>
                <p className="text-ink/60">
                  Have a story to share or want to contribute to our blog?
                </p>
              </Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
