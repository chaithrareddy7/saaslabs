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
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <p className="text-5xl mb-4" aria-hidden>
          !
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-slate-600 mb-6">
          We could not load this page right now. The content service may be
          temporarily unavailable.
        </p>
        <p className="text-xs text-slate-400 mb-6 font-mono break-all">
          {error.message}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
