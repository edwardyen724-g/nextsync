import React from 'react';
import { auth } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

const page: React.FC = () => {
  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Handle successful sign-in (e.g., redirect or display a success message)
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Transform Your Next.js Development Experience Today!</h1>
      <p className="mb-6">
        Streamline your Next.js development with real-time collaboration and smart troubleshooting.
      </p>
      <h2 className="text-2xl font-semibold mb-2">MVP Features:</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Real-time collaboration on code snippets, allowing multiple users to edit and comment live.</li>
        <li>In-app documentation alignment tool that highlights discrepancies and offers direct links to correct sources.</li>
        <li>Integrated navigation guide that helps users quickly find relevant resources and tools specific to their Next.js setup.</li>
        <li>Contextual troubleshooting tips directly in the development environment to resolve common build issues.</li>
        <li>User feedback system to gather insights on pain points for future enhancements.</li>
      </ul>
      <button
        onClick={() => handleSignIn('user@example.com', 'password')}
        className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Get Started
      </button>
    </main>
  );
};

export default page;