# SaaS Landing Page — Next.js + WordPress (Headless CMS)

A pixel-perfect landing page built with **Next.js 15 (App Router)** and **Tailwind CSS v4**, sourcing its content from a **headless WordPress** instance via the REST API + ACF.

### Live links

| | URL |
|---|---|
| **Next.js app (production domain)** | https://mainsaaslabs.vynario.com/ |
| **Next.js app (Vercel default)** | https://saaslab-xi.vercel.app/ |
| **Next.js app (latest deployment)** | https://saaslab-3di7hdj7x-chaithrareddy7s-projects.vercel.app/ |
| **WordPress (headless CMS)** | https://saaslabs.vynario.com/ |
| **WordPress REST root** | https://saaslabs.vynario.com/wp-json |
| **Custom global endpoint** | https://saaslabs.vynario.com/wp-json/saas-test/v1/global |
| **Frontend repo (this)** | https://github.com/chaithrareddy7/saaslabs |

---

## 1. Setup Instructions

### Prerequisites
- Node.js 20+
- npm 10+
- A WordPress site with the **ACF** plugin and **ACF to REST API** enabled, plus a page using the `Test-LP` template populated with content.

### Local development
```bash
# 1. Clone & install
git clone https://github.com/chaithrareddy7/saaslabs.git
cd saaslabs
npm install

# 2. Configure environment
cp .env.example .env.local
# then edit .env.local:
#   NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com
#   NEXT_PUBLIC_LANDING_PAGE_SLUG=landingpage

# 3. Run dev server
npm run dev
```

Open http://localhost:3000.

### Production build
```bash
npm run build
npm run start
```

### Deploying to Vercel
1. Import this repo on [vercel.com/new](https://vercel.com/new).
2. Set environment variables in **Settings → Environment Variables**:
   - `NEXT_PUBLIC_WP_API_URL`
   - `NEXT_PUBLIC_LANDING_PAGE_SLUG`
3. Deploy. Vercel auto-detects Next.js and uses Fluid Compute.

---

## 2. Architecture

```
src/
├── app/
│   ├── layout.tsx        Root layout — fetches global content, mounts Header/Footer
│   ├── page.tsx          Server Component — fetches landing page, generateMetadata for SEO
│   ├── loading.tsx       Streaming skeleton (loading state)
│   ├── error.tsx         Client error boundary (API failure UI)
│   ├── not-found.tsx     404 / empty-page state
│   └── globals.css       Tailwind v4 @theme tokens + component primitives
├── components/
│   ├── Header.tsx        Sticky header with desktop mega menu
│   ├── Footer.tsx        Footer with chat-bubble pattern
│   ├── MobileMenu.tsx    Client component — drawer + accordion sub-menus
│   ├── FeatureBlock.tsx  Reusable text+image feature row
│   ├── Button.tsx        Reusable primary/secondary CTA
│   ├── CheckIcon.tsx     Inline SVG check (uses currentColor)
│   └── SocialIcon.tsx    Brand glyphs (FB / X / IG / LI / YT)
└── lib/
    ├── api/wordpress.ts  Service layer — typed wpFetch, getLandingPage, getGlobalContent
    └── types.ts          Strongly-typed ACF field contracts
```

### Architecture decisions

**App Router + Server Components.** `app/page.tsx` is an `async` Server Component that fetches WP data on the server. No client-side waterfalls and no API key ever ships to the browser.

**Service layer.** All WP traffic flows through `lib/api/wordpress.ts`:
- A typed `wpFetch<T>(endpoint)` helper centralises URL construction, headers, and error handling.
- `WordPressAPIError` is thrown for network failures, non-2xx responses, and bad JSON — preserving status code and endpoint for the error boundary.
- `getLandingPage(slug?)` returns the `Test-LP` page (with full ACF body fields) and is consumed by the page Server Component + `generateMetadata`.
- `getGlobalContent()` hits the custom `/wp-json/saas-test/v1/global` endpoint for header/footer data and **never throws** — it swallows errors and returns `null` so the root layout can still render `loading`/`error`/`not-found` even if WP is unreachable.

**ISR with `revalidate: 60`.** The fetch uses `next: { revalidate: 60 }` so pages are cached at the edge and refreshed in the background each minute — content updates in WP propagate within a minute without a redeploy.

**State handling (per Next.js App Router conventions):**
- **Loading** → `app/loading.tsx` renders a skeleton while the page streams.
- **API failures** → `app/error.tsx` is a client component that catches thrown errors (including `WordPressAPIError`) with a "Try again" button.
- **Empty states** → `getLandingPage()` returns `null` when WP has no matching page, which calls `notFound()` and renders `app/not-found.tsx`. Field-level fallbacks (e.g., trust badges) provide sensible defaults so partial CMS data still renders cleanly.

**Type-safe CMS contract.** `lib/types.ts` mirrors every ACF field as a TypeScript interface (`LandingPageACF`, `FeatureBlock`, `ProblemCard`, etc.), so any drift between WP schema and frontend surfaces as a compile error.

**Tailwind v4 with `@theme` tokens.** Design tokens live as CSS variables in `globals.css` under `@theme`:
- `gray-{50…900}` (overrides Tailwind defaults to the JustCall scale)
- `brand-{50,100,300,400,500,600,900}`
- `cream-{25,100}`, `success-500`
- Component primitives: `.heading-display`, `.heading-section`, `.heading-feature`, `.lead`, `.lead-sm`, `.btn-primary`, `.btn-secondary`, `.btn-md/lg`, `.section`, `.container-page/content`

JSX consumes these via named utilities (`bg-cream-25`, `text-brand-500`, etc) — there are zero arbitrary `text-[#XXXXXX]` literals left in the components.

**Reusable components.** Header, Footer, MobileMenu, FeatureBlock, Button, CheckIcon, and SocialIcon are isolated; `page.tsx` is purely a composition file consuming the CMS shape.

**Mobile nav.** `MobileMenu` is the only client component — a hamburger-triggered right-side drawer with accordion sub-menus, body-scroll lock, Escape-key close, and the same CTAs as the desktop header.

**Image handling.** All hero / feature images come from WordPress; `next.config.ts` whitelists `saaslabs.vynario.com` and `placehold.co` under `images.remotePatterns`. Since URLs are CMS-controlled, `unoptimized` is set on `<Image>` to avoid server-side optimization failures on arbitrary remote hosts.

**Responsive design.** Mobile-first with Tailwind breakpoints `sm` (640) / `md` (768) / `lg` (1024). Tested across 360px → 1440px.

---

## 3. Assumptions

- The WordPress instance has **ACF** + **ACF to REST API** plugins active and exposes a page on the `Test-LP` template.
- Default landing page slug is `landingpage` (overridable via `NEXT_PUBLIC_LANDING_PAGE_SLUG`).
- ACF field shape matches the interfaces in `src/lib/types.ts`. Empty / unset fields are coerced to `false` by ACF (which the types reflect via union types like `string | false`).
- The hero, CTA, and feature images already contain any decorative overlays (floating cards, chat bubbles, illustrations) so the frontend renders the image plain — no extra DOM is needed to recreate those overlays.
- Hosting model: WordPress is hosted separately (`saaslabs.vynario.com`); Next.js is deployed to Vercel. The two communicate over the WP REST API.
- The frontend is read-only — no auth, mutations, or admin flows.

---

## 4. Trade-offs

**Server Components + ISR over client-side fetching.**
Faster TTFB and SEO-friendly rendering, but content edits in WP take up to 60s to appear (`revalidate: 60`). Acceptable for a marketing landing page; would switch to on-demand revalidation (webhook from WP → `revalidateTag`) for an editor that needs immediate previews.

**`unoptimized` images.**
Skipping Next.js image optimization keeps things working with any WP-controlled URL but loses automatic format conversion + responsive `srcset` generation. Worth revisiting once the WP image domain set is stable — switch to optimized loading with explicit width/height per slot.

**Hand-coded SVGs for trust-badge / social icons.**
Avoids pulling in an icon library (lucide / heroicons). Trade-off: every new icon needs a dedicated SVG file or branch in `SocialIcon.tsx`. For five social platforms this is fine; at >15 icons I would move to a tree-shakeable icon package.

**Tailwind v4 + arbitrary-value classes.**
The Figma uses very specific pixel measurements (e.g., `text-[56px]`, `tracking-[-2px]`), so styles are full of arbitrary values rather than a curated scale. This trades reusability for fidelity. Tokenizing repeated values (e.g., a `text-h1` utility) would be the next refactor pass.

**Inline structural CSS for the hero / CTA layouts.**
Because the Figma spec is precise about widths (634px text col, 520px image, 100px gap), those magic numbers live in JSX. They're documented by surrounding comments and section headers; pulling them into named utilities would help if more pages reused the pattern.


**Single landing page only.**
`getLandingPage()` is hard-wired to the configured slug. Generalising to dynamic routes (`app/[slug]/page.tsx`) would be a one-file change but wasn't required.

**Plain `fetch` in the service layer.**
No SWR / React Query — Server Components handle caching natively via the Next.js `fetch` extension. Client-side hooks were unnecessary because the page is fully server-rendered.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Lint with `next lint` |

---

## Tech stack

- **Next.js 15** (App Router, Server Components, ISR)
- **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **WordPress** + **ACF** + **ACF to REST API**
- **Vercel** for hosting
