import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

export default async function suggest(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { feature } = req.body;

    if (!feature) {
      return res.status(400).json({ message: 'Feature is required' });
    }

    const suggestionRef = db.collection('navigationSuggestions').doc();
    await suggestionRef.set({
      feature,
      uid: req.user?.uid,
      timestamp: new Date(),
    });

    return res.status(201).json({ message: 'Suggestion added successfully' });
    
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}