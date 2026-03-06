import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { z } from 'zod';

const app = initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore(app);

const requestSchema = z.object({
  userId: z.string().nonempty(),
  context: z.object({
    topic: z.string().nonempty(),
    issue: z.string().optional(),
  }),
});

export async function POST(request: Request) {
  try {
    const { userId, context } = requestSchema.parse(await request.json());
    
    const suggestions = await getSuggestions(userId, context);
    
    return NextResponse.json({ suggestions });
  } catch (err) {
    return NextResponse.error(
      new Error(err instanceof Error ? err.message : String(err))
    );
  }
}

async function getSuggestions(userId: string, context: { topic: string; issue?: string }) {
  const suggestions: string[] = [];
  
  // Example logic to fetch suggestions based on user context.
  const snapshot = await db.collection('suggestions')
    .where('topic', '==', context.topic)
    .get();

  snapshot.forEach(doc => {
    suggestions.push(doc.data().suggestion);
  });

  return suggestions;
}