import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessId, message, authorName, authorEmail } = body;

    if (!businessId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const rec = store.addFeedback({
      businessId,
      message,
      authorName,
      authorEmail,
    });

    return NextResponse.json({ success: true, feedback: rec });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  const feedbacks = store.getFeedbacks();
  return NextResponse.json({ feedbacks });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }
    const updated = store.updateFeedbackStatus(id, status);
    return NextResponse.json({ success: true, feedback: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
