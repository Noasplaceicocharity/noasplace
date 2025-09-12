import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import NotionContent from "@/components/NotionContent";
import { getPostBySlug, getAllNotionPosts, getRecordMapForPage } from "@/lib/notion";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllNotionPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Noa's Place`,
    description: "Updates and stories from Noa's Place.",
    openGraph: {
      title: `${post.title} | Noa's Place`,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
    alternates: { canonical: `https://noasplace.org.uk/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const recordMap = await getRecordMapForPage(post.id);

  return (
    <main className="bg-background">
      <article className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8">
          <p className="text-sm text-ink/60">
            {post.date ? format(new Date(post.date), "d MMM yyyy") : ""}
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-800">
            {post.title}
          </h1>
        </header>

        {post.coverImageUrl ? (
          <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
            <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
          </div>
        ) : null}

        <div className="prose prose-lg max-w-none">
          <NotionContent recordMap={recordMap} />
        </div>
      </article>
    </main>
  );
}


