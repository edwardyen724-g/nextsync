import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

const collaborations = new Map<string, Array<string>>(); // In-memory store for active collaborations

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.body;

  try {
    // Get the authenticated user's ID
    if (!req.uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Start or join a collaboration session
    if (!collaborations.has(userId)) {
      collaborations.set(userId, []);
    }
    
    const participants = collaborations.get(userId)!;
    if (!participants.includes(req.uid)) {
      participants.push(req.uid);
    }

    return res.status(200).json({ message: 'Collaboration started', participants });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}