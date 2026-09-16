import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, domain } = body;

    if (!businessId || !domain) {
      return NextResponse.json({ error: 'Missing businessId or domain' }, { status: 400 });
    }

    const domainRec = store.saveDomain(businessId, domain);
    return NextResponse.json({
      success: true,
      domain: domainRec,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
