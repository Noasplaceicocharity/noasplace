export type BlogSource = 'markdown' | 'webflow';

export type FeaturedSelectable = {
  slug: string;
  date: string;
  featured?: boolean;
  source: BlogSource;
};

export function pickFeaturedBlogPost<T extends FeaturedSelectable>(posts: T[]): T | null {
  const featuredPosts = posts.filter((post) => post.featured);

  if (featuredPosts.length === 0) {
    return null;
  }

  return [...featuredPosts].sort((a, b) => {
    if (a.source !== b.source) {
      return a.source === 'webflow' ? -1 : 1;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  })[0];
}
