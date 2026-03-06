import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { z } from 'zod';

const firebaseConfig = {
  credential: applicationDefault(),
};

initializeApp(firebaseConfig);
const db = getFirestore();

interface FeedbackRequest extends NextApiRequest {
  body: {
    name: string;
    email: string;
    message: string;
  };
}

const feedbackSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
});

export default async function handler(req: FeedbackRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const parsedBody = feedbackSchema.parse(req.body);

    const feedbackRef = db.collection('feedback').doc();
    await feedbackRef.set(parsedBody);

    return res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}