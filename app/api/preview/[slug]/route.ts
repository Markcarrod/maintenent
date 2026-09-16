import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { generateIndustryContent } from '@/lib/content-generator';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const business = store.getBusinessBySlug(slug);

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    // Record visit: starts 7-day timer ONLY if firstViewedAt is null!
    const { preview, isFirstVisit, isExpired } = store.recordVisit(business.id);
    const content = generateIndustryContent(business);
    const website = store.getWebsite(business.id);

    return NextResponse.json({
      business,
      preview,
      content,
      website,
      isFirstVisit,
      isExpired,
    });
  } catch (error) {
    console.error('Error in preview route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
