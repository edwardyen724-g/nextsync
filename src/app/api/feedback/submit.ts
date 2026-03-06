import { NextResponse } from 'next/server';
import { admin } from '@/lib/firebaseAdmin'; // import your firebase admin instance
import { z } from 'zod';

export interface Feedback {
  userId: string;
  message: string;
  rating: number;
}

const feedbackSchema = z.object({
  userId: z.string(),
  message: z.string().min(1).max(500),
  rating: z.number().min(1).max(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = feedbackSchema.parse(body);

    await admin.firestore().collection('feedbacks').add(parsed);

    return NextResponse.json({ status: 'success', message: 'Feedback submitted successfully.' });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err instanceof Error ? err.message : String(err) }, { status: 400 });
  }
}