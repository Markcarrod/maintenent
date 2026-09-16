import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { PlanType } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, plan } = body;

    if (!businessId || !plan) {
      return NextResponse.json({ error: 'Missing businessId or plan' }, { status: 400 });
    }

    const preview = store.activatePlan(businessId, plan as PlanType);
    return NextResponse.json({
      success: true,
      message: 'Plan activated successfully. Preview expiration removed.',
      preview,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
