import { NextResponse } from 'next/server';

interface Tip {
  id: string;
  title: string;
  description: string;
}

const tips: Tip[] = [
  {
    id: '1',
    title: 'Common Build Issues',
    description: 'Verify your Next.js setup by checking for common build issues like missing dependencies or incorrect configurations in next.config.js.',
  },
  {
    id: '2',
    title: 'Hot Reloading Problems',
    description: 'If you experience issues with hot reloading, try refreshing the browser manually or restarting the development server.',
  },
  {
    id: '3',
    title: 'API Route Errors',
    description: 'Ensure your API routes are set up correctly. Check for typos in the endpoints and ensure they are following the correct structure.',
  },
  {
    id: '4',
    title: 'Performance Optimization',
    description: 'Utilize Next.js built-in performance optimization features like Image Optimization and Static Generation to enhance your app.',
  },
  {
    id: '5',
    title: 'Version Compatibility',
    description: 'Always check the compatibility of your dependencies with the Next.js version you are using to avoid unexpected issues.',
  },
];

export async function GET() {
  try {
    return NextResponse.json(tips);
  } catch (err) {
    return NextResponse.error(new Error(err instanceof Error ? err.message : String(err)));
  }
}