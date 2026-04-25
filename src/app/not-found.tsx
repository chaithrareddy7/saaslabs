export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md text-center">
        <p className="mb-4 text-5xl" aria-hidden>
          ?
        </p>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Landing page not published yet
        </h1>
        <p className="text-gray-600">
          No page was found at the configured slug. Publish a page in WordPress
          using the <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm">Test-LP</code>{' '}
          template to see it here.
        </p>
      </div>
    </main>
  );
}
