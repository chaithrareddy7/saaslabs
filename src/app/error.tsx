'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Landing page render failed:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md text-center">
        <p className="mb-4 text-5xl" aria-hidden>
          !
        </p>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong</h1>
        <p className="mb-6 text-gray-600">
          We could not load this page right now. The content service may be
          temporarily unavailable.
        </p>
        <p className="mb-6 break-all font-mono text-xs text-gray-400">
          {error.message}
        </p>
        <button onClick={reset} className="btn-primary btn-lg">
          Try again
        </button>
      </div>
    </main>
  );
}
