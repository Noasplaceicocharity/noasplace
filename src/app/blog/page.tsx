import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getPublishedPosts } from "@/lib/notion";

export const dynamic = "force-static";

export const metadata = {
  title: "Blog | Noa's Place",
  description: "Updates, stories, and resources from Noa's Place.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="bg-background">
      <section className="relative isolate overflow-hidden">
        <div className="relative px-6 pt-16 pb-6 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-black text-brand-800 sm:text-5xl md:text-6xl mb-4">
              Blog
            </h1>
            <p className="text-lg text-ink/80 max-w-2xl mx-auto">
              Stories, progress updates, and helpful resources for SEND families.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          {posts.length === 0 ? (
            <p className="text-ink/70">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group rounded-2xl border border-brand-100/60 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  {post.coverImageUrl ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <time className="text-sm text-ink/60">
                      {post.date ? format(new Date(post.date), "d MMM yyyy") : ""}
                    </time>
                    <h2 className="mt-2 text-xl font-extrabold text-ink group-hover:text-brand-800">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className="mt-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center rounded-lg bg-brand-50 px-3 py-2 text-brand-800 font-semibold hover:bg-brand-100"
                      >
                        Read more
                        <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


