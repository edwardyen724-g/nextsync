import { firestore } from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export const addDocument = async (collection: string, data: Record<string, any>): Promise<void> => {
  try {
    await db.collection(collection).add(data);
  } catch (err) {
    throw new Error(`Failed to add document: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const getDocument = async (collection: string, id: string): Promise<Record<string, any> | null> => {
  try {
    const doc = await db.collection(collection).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (err) {
    throw new Error(`Failed to get document: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const updateDocument = async (collection: string, id: string, data: Record<string, any>): Promise<void> => {
  try {
    await db.collection(collection).doc(id).update(data);
  } catch (err) {
    throw new Error(`Failed to update document: ${err instanceof Error ? err.message : String(err)}`);
  }
};

export const deleteDocument = async (collection: string, id: string): Promise<void> => {
  try {
    await db.collection(collection).doc(id).delete();
  } catch (err) {
    throw new Error(`Failed to delete document: ${err instanceof Error ? err.message : String(err)}`);
  }
};