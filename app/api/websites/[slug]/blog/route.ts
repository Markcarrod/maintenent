import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const business = store.getBusinessBySlug(slug);
    if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 });

    const posts = store.getBlogPosts(business.id);
    return NextResponse.json({ posts });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const business = store.getBusinessBySlug(slug);
    if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 });

    const body = await req.json();
    const { title, content, excerpt, featuredImage, category, status } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const postSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const post = store.createBlogPost({
      businessId: business.id,
      title,
      slug: postSlug,
      featuredImage: featuredImage || business.photos.hero,
      excerpt: excerpt || content.slice(0, 150) + '...',
      content,
      category: category || 'Updates',
      author: business.name,
      publishDate: new Date().toISOString(),
      status: status || 'published',
    });

    return NextResponse.json({ success: true, post });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    const { id, updates } = body;
    const post = store.updateBlogPost(id, updates);
    return NextResponse.json({ success: true, post });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    store.deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
