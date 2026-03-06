import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextSync',
  description: 'Streamline your Next.js development with real-time collaboration and smart troubleshooting.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Transform Your Next.js Development Experience Today!</h1>
          <p className="mt-2">Real-time collaboration, smart troubleshooting, and much more.</p>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} NextSync. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;