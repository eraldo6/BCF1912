# Claude Code Technical Guidelines

## Design System Access

**Claude automatically reads `design_brief.md`** when working on UI/styling tasks.

**No manual invocation needed** - just ask Claude to create or style components.

**When Claude uses design_brief.md:**
- Creating new UI components or pages
- Styling existing components
- Making visual/layout decisions
- Choosing colors, spacing, typography
- Implementing responsive behavior

**Claude skips design_brief.md for:**
- Bug fixes (unless styling-related)
- Backend logic, API routes, database queries
- Business logic or data processing
- Configuration changes
- Dependency updates
- Code refactoring (non-visual)
- Writing tests

---

## Styling Setup

This project uses **plain CSS**, not Tailwind. All styling lives in `app/globals.css`
and is loaded once via `app/layout.jsx` — no utility-class framework, no PostCSS
plugins beyond what Next.js ships with by default.

### Conventions

- **Color system**: CSS custom properties defined in `:root`:
  - `--brass-*` — accent color (warm gold)
  - `--felt-*` — green tones (billiard table)
  - `--ink-*` — dark backgrounds
  - `--bone-*` — light text
- **Components**: named classes (e.g. `.btn-brass`, `.section-title`, `.discipline-row`)
  defined once in `globals.css`, reused via `className` across components.
- **No CSS-in-JS, no Tailwind utility classes.** Add new styles to `globals.css`
  following the existing naming patterns rather than inline `style={{...}}` objects,
  except where the existing code already does so (many components use inline styles
  for one-off layout — match the surrounding code's style when editing it).

## Language

Plain JavaScript (`.jsx`), not TypeScript. No `.tsx` files, no `tsconfig.json`.

## Verification Checklist

After styling changes, verify:
- ✅ New classes/variables added to `app/globals.css`, not a new stylesheet
- ✅ Reused existing CSS variables (`--brass-*`, `--felt-*`, `--ink-*`, `--bone-*`)
  where applicable instead of introducing new color values
- ✅ No Tailwind utility classes, no `.tsx` files

---

## Project Structure

### Pages (app router)

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.jsx` | One-pager — all main sections |
| `/impressum` | `app/impressum/page.jsx` | Legal notice |
| `/mitgliedschaft` | `app/mitgliedschaft/page.jsx` | Membership page |
| `/sportbetrieb` | `app/sportbetrieb/page.jsx` | Sports operations & teams |
| `/vereinshistorie` | `app/vereinshistorie/page.jsx` | Club history |
| `/admin` | `app/admin/page.jsx` | Admin dashboard (auth-protected) |
| `/admin/login` | `app/admin/login/page.jsx` | Admin login |
| `/admin/update-password` | `app/admin/update-password/page.jsx` | Password reset |

> **Note:** The calendar is part of the one-pager (`/`), not a separate subpage. There is no `/calendar` route.

### Main sections on the one-pager (in order)

1. **Hero** — full-bleed image, headline, CTAs
2. **Club / About** — disciplines, gallery
3. **News** — latest posts from Supabase `beitraege`
4. **Turniere** — upcoming + past tournaments from Supabase `turniere`
5. **Kalender** — interactive monthly calendar with event sidebar, data from Supabase `veranstaltungen`; supports `?datum=YYYY-MM-DD` URL param to deep-link a specific day
6. **Kontakt** — contact info, address, membership CTA

### Key components

- `components/sections.jsx` — all one-pager sections
- `components/app-content.jsx` — client wrapper, receives server-fetched props
- `app/page.jsx` — server component, fetches all Supabase data and passes as props
