import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

export async function GET() {
  try {
    const allPosts = await getAllBlogPosts();
    const featuredPost = allPosts.find(post => post.featured);
    
    if (!featuredPost) {
      return NextResponse.json({ post: null });
    }
    
    return NextResponse.json({ post: featuredPost });
  } catch (error) {
    console.error('Error fetching featured blog post:', error);
    return NextResponse.json({ post: null }, { status: 500 });
  }
}

