import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

export async function GET() {
  try {
    const allPosts = await getAllBlogPosts();
    // Newest first (see mergeBlogPostMetaLists) — homepage blog card shows latest, not CMS "featured"
    const latestPost = allPosts[0] ?? null;

    if (!latestPost) {
      return NextResponse.json({ post: null });
    }

    return NextResponse.json({ post: latestPost });
  } catch (error) {
    console.error('Error fetching latest blog post for homepage:', error);
    return NextResponse.json({ post: null }, { status: 500 });
  }
}

