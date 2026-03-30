import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { WEBFLOW_BLOG_CACHE_TAG } from '@/lib/blog';

function isAuthorised(request: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const secret = process.env.WEBFLOW_REVALIDATE_SECRET;
  if (!secret) {
    return false;
  }

  const requestSecret =
    request.nextUrl.searchParams.get('secret') ||
    request.headers.get('x-revalidate-secret');

  return requestSecret === secret;
}

function revalidateBlogCaches() {
  revalidateTag(WEBFLOW_BLOG_CACHE_TAG);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/api/featured-blog');
}

export async function GET(request: NextRequest) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorised' }, { status: 401 });
  }

  revalidateBlogCaches();

  return NextResponse.json({
    ok: true,
    message: 'Webflow blog cache revalidated.',
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
