import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, customerName, customerPhone, customerEmail, serviceRequested, answers } = body;

    if (!businessId || !customerName || !customerPhone) {
      return NextResponse.json({ error: 'Missing required lead fields' }, { status: 400 });
    }

    const lead = store.addLead({
      businessId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || '',
      serviceRequested: serviceRequested || '',
      answers: answers || {},
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get('businessId') || undefined;
  const leads = store.getLeads(businessId);
  return NextResponse.json({ leads });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }
    const updated = store.updateLeadStatus(id, status);
    return NextResponse.json({ success: true, lead: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
