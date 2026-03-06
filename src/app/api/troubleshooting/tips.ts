import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';

interface AuthedRequest extends NextApiRequest {
  user?: {
    uid: string;
  };
}

const troubleshootingTips = [
  {
    id: 1,
    title: 'Check Your Environment Variables',
    description: 'Ensure all necessary environment variables are defined in your .env file and correctly referenced in your code.',
  },
  {
    id: 2,
    title: 'Review Your Build Logs',
    description: 'Look at the build logs to identify any specific errors during the build process. These logs can provide insights into what went wrong.',
  },
  {
    id: 3,
    title: 'Clear Your Cache',
    description: 'Sometimes, issues can arise from stale cached data. Try clearing your browser cache or rebuilding your project.',
  },
  {
    id: 4,
    title: 'Check API Endpoints',
    description: 'Verify that all your API endpoints are correctly configured and responding as expected.',
  },
  {
    id: 5,
    title: 'Consult Next.js Documentation',
    description: 'Refer to the official Next.js documentation for common issues and best practices.',
  },
];

export async function GET(req: AuthedRequest) {
  try {
    return NextResponse.json(troubleshootingTips);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}