import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string };
}

initializeApp({ credential: applicationDefault() });

const checkDocumentation = async (req: AuthedRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { documentationId } = req.body;

    if (!documentationId) {
      return res.status(400).json({ message: 'Documentation ID is required.' });
    }

    const docRef = admin.firestore().collection('documentation').doc(documentationId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Documentation not found.' });
    }

    const data = doc.data();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default checkDocumentation;