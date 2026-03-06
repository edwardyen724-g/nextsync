import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextSync',
  description: 'Streamline your Next.js development with real-time collaboration and smart troubleshooting.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="w-full p-4 bg-blue-600 text-white text-center">
              <h1 className="text-3xl font-bold">Transform Your Next.js Development Experience Today!</h1>
              <p className="mt-2">{metadata.description}</p>
            </header>
            <div className="p-5">
              {children}
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;