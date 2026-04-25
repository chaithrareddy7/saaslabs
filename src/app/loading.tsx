export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-500"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-gray-500">Loading landing page…</p>
      </div>
    </main>
  );
}
