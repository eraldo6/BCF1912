# BC Frankfurt 1912 Website

A website for BC Frankfurt 1912 e.V., one of Germany's oldest billiard clubs — Karambol, Pool and Snooker.

## Tech Stack

- **Next.js** (App Router)
- **React 19**
- Plain JavaScript (`.jsx`, no TypeScript)
- Custom CSS (no framework)

## Project Structure

```
app/
  layout.jsx      # Root layout: <head> (fonts, meta, favicon), imports globals.css
  page.jsx         # The home page ("/"), renders <AppContent/>
  globals.css      # All styling (design system + components)

components/
  app-content.jsx        # App-level state (language, tweaks) and effects
  sections.jsx            # The page sections (Nav, Hero, Marquee, About, Disciplines,
                           # Experience, Membership, Gallery, News, Contact, Footer)
  visuals.jsx              # SVG decorations (arrows, the hero pool table illustration)
  tweaks-panel.jsx         # Live color/font tweaking tool (dev aid, hidden by default)
  translation-context.jsx  # i18n context + useTranslation hook
  games.jsx                # Match/standings display (not currently wired into the page)

lib/
  translations.js  # EN/DE copy, as { EN: {...}, DE: {...} }

public/
  images/, data/   # Static files served as-is (e.g. /images/floor-plan.png)

docs/              # Project documentation — see below
archive/           # Superseded files kept for reference, not part of the live app
```

## Running Locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve the production build locally
```

## Documentation

- `docs/design_brief.md` — visual design system (colors, typography, components)
- `docs/design.md` — architecture decisions and why they were made
- `docs/TODOS/requirements.md` — original feature requirements
- `docs/TODOS/TASKS.md` — task breakdown

## License

© BC Frankfurt 1912 e.V.
