export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-slate-500">Loading landing page...</p>
      </div>
    </main>
  );
}
