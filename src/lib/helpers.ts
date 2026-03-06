import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Auth, UserCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(firebaseApp);

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential | string> => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
};

export const formatErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message : String(error);
};