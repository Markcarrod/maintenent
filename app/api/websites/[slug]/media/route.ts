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

    const media = store.getMediaItems(business.id);
    return NextResponse.json({ media });
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
    const { name, url } = body;

    if (!url) return NextResponse.json({ error: 'Image URL required' }, { status: 400 });

    const item = store.addMediaItem({
      businessId: business.id,
      name: name || 'Uploaded Photo',
      url,
      size: '1.4 MB',
      type: 'image/jpeg',
    });

    return NextResponse.json({ success: true, item });
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
    store.deleteMediaItem(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
