import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPost, getNotionPage, getBlogPosts } from '@/lib/notion';
import { NotionRenderer } from '@/components/NotionRenderer';
import { format } from 'date-fns';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Noa's Place Blog`,
    description: post.excerpt || `Read ${post.title} on Noa's Place blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Noa's Place blog`,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.lastEditedTime,
      authors: post.author ? [post.author] : undefined,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `Read ${post.title} on Noa's Place blog`,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const { posts } = await getBlogPosts(50); // Get first 50 posts for static generation
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Revalidate every hour
export const revalidate = 60;
export const runtime = 'nodejs';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const notionPage = await getNotionPage(post.id);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return 'Date unavailable';
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedDate,
    dateModified: post.lastEditedTime,
    author: post.author ? {
      '@type': 'Person',
      name: post.author,
    } : {
      '@type': 'Organization',
      name: "Noa's Place",
    },
    publisher: {
      '@type': 'Organization',
      name: "Noa's Place",
      logo: {
        '@type': 'ImageObject',
        url: 'https://noasplace.org.uk/images/noas place logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="bg-background text-ink">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/30 to-white pt-20">
          {/* Background decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <svg className="absolute right-0 top-0 h-32 w-32 rotate-90 text-[#40BFBF]/20" viewBox="0 0 100 100" fill="currentColor">
              <path d="M70,35 C70,25 65,20 60,20 L40,20 C35,20 30,25 30,35 C30,40 25,45 20,45 C10,45 5,50 5,60 L5,80 C5,85 10,90 20,90 C25,90 30,95 30,100 C30,110 35,115 40,115 L60,115 C65,115 70,110 70,100 C70,95 75,90 80,90 C90,90 95,85 95,80 L95,60 C95,50 90,45 80,45 C75,45 70,40 70,35" />
            </svg>
            <div className="absolute left-1/4 top-1/3 size-4 rounded-full bg-[#FFB800]/20" />
            <div className="absolute right-1/3 bottom-1/4 size-3 rounded-full bg-[#6E3482]/20" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 pb-16">
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
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Post Header */}
            <header className="text-center">
              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800 hover:bg-brand-100 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mx-auto max-w-2xl text-xl text-ink/80 mb-8">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-ink/60">
                <span>Published {formatDate(post.publishedDate)}</span>
                {post.author && (
                  <>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </>
                )}
                {post.featured && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-800">
                      Featured
                    </span>
                  </>
                )}
              </div>
            </header>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative mx-auto max-w-6xl px-6 pb-16">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-4xl px-6">
            <article className="prose prose-lg prose-brand max-w-none">
              {notionPage ? (
                <NotionRenderer recordMap={notionPage.blocks} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-ink/60">Content is loading...</p>
                </div>
              )}
            </article>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="py-16 bg-brand-50/30">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-medium text-ink shadow-sm hover:bg-brand-50 transition duration-200"
              >
                <svg className="mr-2 size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Blog
              </Link>

              {/* Share buttons could go here */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-ink/60">Share this post:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://noasplace.org.uk/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#1DA1F2] p-2 text-white hover:bg-[#1a91da] transition"
                >
                  <span className="sr-only">Share on Twitter</span>
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://noasplace.org.uk/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#1877F2] p-2 text-white hover:bg-[#166fe5] transition"
                >
                  <span className="sr-only">Share on Facebook</span>
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
