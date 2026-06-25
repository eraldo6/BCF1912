# BC Frankfurt 1912 — Design System

You are designing for a premium billiard club website that combines:

* Luxury private club energy
* Competitive sports identity
* Heritage / tradition
* Modern lifestyle branding

Think: **Elite billiard lounge + premium sports club + timeless institution.**

This document describes the design system as actually implemented — colors, typography, and patterns are taken from `app/globals.css`. If you're looking for the *why* behind technical choices (framework, language, styling approach), see `docs/design.md`. This file is about the *visual* system.

---

## Before designing anything

Review `docs/design-references/related-websites/` — screenshots and links of inspiring billiard/premium-sports-club sites, kept from the original research phase. Use them for inspiration, not literal copying — preserve BC Frankfurt's own identity while elevating it.

---

## Core Brand Identity

**Design Goal:** Transform outdated billiard club websites into a premium digital experience that feels like *"Frankfurt's elite home of billiards."*

Every page should communicate: *"This is not just a billiard hall."* It is heritage, skill, prestige, social belonging, lifestyle.

**Avoid:** generic sports template, cheap bar aesthetic, overcrowded layouts, basic local-club design.

**Signature goal:** make visitors think *"I want to be part of this club."*

---

## Core Visual Style

### Luxury dark theme (default, only theme)

All colors are CSS custom properties defined in `:root` in `app/globals.css`, using OKLCH for the brass/felt scales (perceptually even lightness/contrast steps) and hex for ink/bone:

```css
/* Ink — backgrounds, darkest to lighter */
--ink-000: #050506;
--ink-050: #0a0a0c;
--ink-100: #111114;
--ink-300: #232328;

/* Bone — light text */
--bone-100: #f5f1e8;
--bone-300: #c9c3b3;
--bone-500: #8a8478;

/* Felt — green, billiard-table accent */
--felt-900: oklch(0.22 0.05 155);
--felt-700: oklch(0.32 0.07 155);
--felt-500: oklch(0.45 0.09 155);

/* Brass — warm gold, primary accent */
--brass-900: oklch(0.42 0.08 75);
--brass-700: oklch(0.62 0.11 78);
--brass-500: oklch(0.78 0.13 80);
```

Use `--brass-*` for CTAs, highlights, active states. Use `--felt-*` for the billiard-table identity (badges, secondary surfaces). Backgrounds are always `--ink-*`, text is `--bone-*`. Never introduce a new raw hex/color value when an existing variable fits — extend the scale (e.g. add `--brass-200`) if you genuinely need a step that doesn't exist yet.

### Texture

* Subtle felt-inspired gradients and noise (see the SVG noise `background-image` in `globals.css`)
* Soft metallic glow on brass elements (`box-shadow`/`filter: drop-shadow`)
* Circular highlights inspired by cue balls

---

## Container & Layout

```css
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px; /* 0 24px below 768px */
}
```

Use the existing `.container` class for page-width content. Section vertical rhythm and grid patterns are defined per-section in `globals.css` (`.section`, `.section-head`, `.experience-grid`, `.member-grid`, etc.) — follow the naming convention `.{section}-{element}` for new section-specific classes rather than reusing generic utility names.

---

## Typography System

Fonts are loaded via Google Fonts `<link>` tags in `app/layout.jsx` and referenced through CSS variables:

```css
--font-display: "Cormorant Garamond", "Tobias", Georgia, serif;
--font-sans:    "Geist", "Inter Tight", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
--font-mono:    "JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace;
```

- **`--font-display`** — section titles, hero headline, anything that should feel editorial/cinematic. The Tweaks panel lets the display font be swapped live between Cormorant Garamond, Fraunces, Playfair Display, EB Garamond, DM Serif Display — all loaded and available.
- **`--font-sans`** — body copy, UI text.
- **`--font-mono`** — eyebrows, labels, numeric/meta text (section numbers, tags, stats) — gives the "technical/precision" counterpoint to the display serif.

---

## Motion & Animation Principles

Motion should feel smooth, elegant, cue-sport inspired — scroll reveal fades, staggered entrances, parallax hero, hover lift, glow transitions, floating accents. **No animation library is installed** (no Framer Motion) — everything is plain CSS `@keyframes`/`transition`, triggered by an `IntersectionObserver` (in `components/app-content.jsx`) or by React state tied to scroll/mouse events.

Existing primitives to reuse, rather than inventing new ones:

- **Scroll reveal**: add `className="reveal"` (optionally `reveal delay-1` through `delay-4` for staggering) to an element — `globals.css` handles the opacity/transform transition once `.in-view` is added by the observer.
- **Floating accents**: `@keyframes float`, `@keyframes ball-roll`
- **Glow**: `@keyframes pulse-glow`
- **Marquee/continuous scroll**: `@keyframes marquee` (see `.marquee-track`)
- **Parallax**: handled per-component with a scroll-position state + inline `transform`, see `Hero` in `components/sections.jsx`

**Avoid:** gimmicky bounce, overly playful motion, cheap neon effects.

---

## Website Structure

1. **Hero** — full-screen, dark, cinematic. Headline: *"Frankfurt's home of Billard since 1912."* CTAs: Become a Member / Visit the Club.
2. **About / Heritage** — tradition, one of Germany's oldest clubs, community, competitive spirit.
3. **Disciplines** — Karambol, Pool, Snooker as expandable rows (`.discipline-row`).
4. **Experience** — the clubhouse: tables, lounge, bar, trial membership.
5. **Membership** — pricing tiers as cards (`.member-card`, `.featured` for the recommended tier).
6. **Gallery** — photography, masonry/grid with hover zoom.
7. **News** — tournaments, promotions, team results.
8. **Contact** — map, address, opening hours, email (no contact form — this is a members-only club, not a walk-in venue).
9. **Footer**

---

## Component Patterns

No component library (no shadcn/ui) — components are hand-built JSX with named CSS classes defined in `globals.css`. Reuse these before inventing new class names:

- **Buttons**: `.btn.btn-brass` (primary, filled), `.btn.btn-ghost` (secondary, outlined) — both pill-shaped (`border-radius: 999px`), both pair with the `<Arrow/>`/`<ArrowOut/>` icon from `components/visuals.jsx`
- **Cards**: pattern varies per section (`.exp-card`, `.member-card`, the News item layout) but consistently use `--ink-100` background, `1px solid --ink-300` border, and a `border-radius` from the `--radius-*` scale defined in `globals.css`
- **Section header**: `.section-head` + `.section-eyebrow-row` (number + divider + eyebrow label) + `.section-title` — used identically at the top of every section for consistency

---

## Premium UX Principles

* Sticky nav with blur background
* Smooth scrolling, section anchors
* Hover sophistication (subtle, not bouncy)
* Strong CTA hierarchy
* SEO-semantic structure
* Accessibility (alt text, focus states)
* Fast performance — this is why the site runs on Next.js with static rendering rather than the old CDN+Babel setup, see `docs/design.md`

---

## Quality Checklist

Before finalizing a new section or component:

* ✅ Reused existing CSS variables (`--brass-*`, `--felt-*`, `--ink-*`, `--bone-*`, `--font-*`) instead of introducing new raw values
* ✅ Used `.reveal` (+ delay classes) for scroll-in behavior instead of a new animation approach
* ✅ Used `.btn-brass`/`.btn-ghost` for buttons, matched the existing card/section-head patterns
* ✅ No Tailwind utility classes, no shadcn/ui components, no Framer Motion — plain CSS in `globals.css` and JSX in `components/`
* ✅ Mobile-first, containerized (`.container`), works at the 768px breakpoint used throughout
* ✅ Bilingual: new copy goes through `lib/translations.js` + `t("key")`, not hardcoded text
