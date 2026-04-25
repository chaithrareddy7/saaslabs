import type { WPPage } from '@/lib/types';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const LANDING_PAGE_SLUG = process.env.NEXT_PUBLIC_LANDING_PAGE_SLUG ?? 'landingpage';

if (!WP_API_URL) {
  throw new Error(
    'Missing NEXT_PUBLIC_WP_API_URL environment variable. Set it in .env.local.'
  );
}

export class WordPressAPIError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly endpoint?: string
  ) {
    super(message);
    this.name = 'WordPressAPIError';
  }
}

async function wpFetch<T>(endpoint: string): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
  } catch (networkError) {
    throw new WordPressAPIError(
      `Network error while fetching ${endpoint}: ${(networkError as Error).message}`,
      undefined,
      endpoint
    );
  }

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API returned ${response.status} for ${endpoint}`,
      response.status,
      endpoint
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new WordPressAPIError(
      `Invalid JSON response from ${endpoint}`,
      response.status,
      endpoint
    );
  }
}

export async function getLandingPage(
  slug: string = LANDING_PAGE_SLUG
): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>(
    `/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed=false`
  );

  if (!Array.isArray(pages) || pages.length === 0) {
    return null;
  }

  return pages[0];
}
