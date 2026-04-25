export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <p className="text-5xl mb-4" aria-hidden>
          ?
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Landing page not published yet
        </h1>
        <p className="text-slate-600">
          No page was found at the configured slug. Publish a page in
          WordPress using the Test-LP template to see it here.
        </p>
      </div>
    </main>
  );
}
