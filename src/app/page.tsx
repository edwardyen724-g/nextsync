import React from 'react';
import { useAuth } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Adjust path as necessary

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center">
        Transform Your Next.js Development Experience Today!
      </h1>
      <p className="mt-4 text-lg text-center">
        Streamline your Next.js development with real-time collaboration and smart troubleshooting.
      </p>

      <div className="mt-8">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => handleSignIn()}
        >
          Get Started
        </button>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">MVP Features</h2>
        <ul className="mt-4 list-disc list-inside">
          <li>Real-time collaboration on code snippets, allowing multiple users to edit and comment live.</li>
          <li>In-app documentation alignment tool that highlights discrepancies and offers direct links to correct sources.</li>
          <li>Integrated navigation guide that helps users quickly find relevant resources and tools specific to their Next.js setup.</li>
          <li>Contextual troubleshooting tips directly in the development environment to resolve common build issues.</li>
          <li>User feedback system to gather insights on pain points for future enhancements.</li>
        </ul>
      </section>
    </main>
  );
};

const handleSignIn = async () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  
  if (email && password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully signed in!");
    } catch (error) {
      alert(err instanceof Error ? err.message : String(err));
    }
  } else {
    alert("Email and password are required.");
  }
};

export default Home;