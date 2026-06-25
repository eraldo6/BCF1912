# Architecture Decisions

This is a running log of the technical/architecture decisions made for this project and why — not to be confused with `design_brief.md`, which covers the *visual* design system (colors, typography, components).

## Framework: Next.js with App Router

Migrated the site from a build-less static setup (React + Babel loaded via CDN, JSX compiled live in the browser) to Next.js.

**Why:** No real build tooling, no module system, no path to add a backend. App Router (not the older Pages Router) was chosen because it's the current Next.js standard and gives file-based routing, middleware, and a natural place for server-side code — needed for the planned admin area (see below).

## Language: JavaScript, not TypeScript

Kept plain `.jsx`, no `tsconfig.json`, no `.tsx` files.

**Why:** This is the user's first real web project. Adding TypeScript at the same time as the Next.js migration would stack two new concepts at once. TypeScript can be adopted later, file by file, once the Next.js conventions are familiar.

## Styling: plain CSS, not Tailwind

Kept the existing custom CSS (`app/globals.css`, the `--brass-*`/`--felt-*`/`--ink-*`/`--bone-*` variable system), did not introduce Tailwind.

**Why:** The existing design system already works and is coherent. Switching to Tailwind would mean rewriting every component's styling (utility classes instead of named CSS classes) — a full rewrite, not a config change. `docs/Claude.md` previously assumed a Tailwind v4 + TypeScript setup that was never actually built; it's been corrected to describe the real stack.

## Migration scope: faithful 1:1 port

The Next.js migration preserved existing behavior exactly — no new features, no content changes, no routing changes (site stays a single page, `/`).

**Why:** Keep the framework migration and feature work as separate, independently reviewable changes. Reduces risk of conflating "did the migration break something" with "is this new feature right."

## Every component is a Client Component (`"use client"`)

All files under `components/` have `"use client"` at the top.

**Why:** The app is interactive end-to-end (language switching, hover effects, scroll-reveal, the tweaks panel) — no immediate Server-Component/SSR optimization to chase in this phase. Faithful behavior first; splitting out Server Components is a possible later optimization, not required now.

**Necessary side effect:** Next.js still does an initial render of Client Components on the server (for fast first paint), even though they're marked `"use client"`. The language preference, read from `localStorage`, can't be read during that server pass — `components/app-content.jsx` works around this by initializing `lang` to the static default `"DE"` and reading `localStorage` inside a `useEffect` (client-only, runs after mount) instead of in the `useState` initializer. This avoids a React hydration-mismatch warning. Visible effect: returning visitors who previously chose English see a brief DE→EN flash on first load.

## Translations: kept the existing custom system, did not adopt next-intl

`lib/translations.js` (a flat `{ EN: {...}, DE: {...} }` object) plus `components/translation-context.jsx` (`React.Context` + `useTranslation()`), unchanged in approach from before the migration.

**Why:** next-intl is the Next.js-native i18n library and would give proper per-locale URLs (`/de`, `/en`) — better for SEO, since search engines currently only ever see one language for a single URL. But adopting it means a real locale-routing setup (middleware, restructured message files, every internal link updated) — separate scope from a framework port. Revisit if discoverability via search becomes a priority.

## Archive folder instead of deleting superseded files

Files no longer part of the live app — but judged worth keeping as reference — live under `archive/`, not in version control history alone:

- `archive/calendar-legacy/` — the old standalone `calendar.html`/`calendar.jsx`. Its `Games` component has a more advanced click-a-date calendar than the current `components/games.jsx` and is a useful reference for rebuilding the real calendar feature later (see `docs/TASKS.md` #10).
- `archive/project-history/` — superseded changelogs/docs (old `README.md`, `GAMES_MOVED.md`, `RESTRUCTURE.md`, the original Tailwind/shadcn-based `design_brief.md`) describing prior project states.
- `archive/legacy-static-site/` — the pre-Next.js entry point (`index.html`, `app.jsx`, `vercel.json`) and the one-off `apply_translations.py` script that referenced it.

**Why:** `archive/` is not a Next.js convention — it's a project-specific decision to preserve potentially-useful material without it cluttering the live codebase or being silently lost. Note: `docs/design-references/` (mockup screenshots, competitor research) is *not* in `archive/` — it's still-current reference material the user actively wants, not superseded content, so it lives in `docs/` instead.

## Planned for phase 2 (not yet implemented)

- **Database/backend: Supabase.** Chosen over a custom backend (e.g. a separate Java/Spring service) because the project has no dedicated backend team and the needs are squarely "store data, authenticate users, expose it to the frontend" — not a case that justifies operating a standalone server. Chosen over bare Vercel Postgres because Supabase also includes Auth, Storage, and a dashboard/table editor out of the box — directly useful for the planned board-member admin login, without building those pieces separately.
- **API layer: Next.js API routes / Vercel Serverless Functions** for any server-side logic that needs to keep secrets (e.g. the Supabase service-role key) away from the browser.
- **Admin area (`/admin`)** for board members, gated by middleware checking a Supabase Auth session, with Postgres Row Level Security as the actual enforcement layer (middleware alone doesn't stop someone from calling the Supabase API directly, bypassing the Next.js app).

## Known follow-ups, explicitly out of scope for now

- `public/images/floor-plan.png` has its table-layout labels baked into the image (English text, not translatable, not crisp at all sizes). Flagged for replacement with a coded HTML/CSS or SVG diagram — separate task from the framework migration.
- `components/games.jsx` is converted but not currently rendered anywhere, same as before the migration.
