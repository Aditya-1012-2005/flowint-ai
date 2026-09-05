# UI_UX_PLAN.md — Flowint AI

No existing brand assets, so this proposes a fresh, deliberately restrained
design system — easy to swap for real branding later (it's all Tailwind
tokens, not hardcoded values scattered through components).

## 1. Design System

### Tone

The audience is small business owners currently using Excel/manual
processes — often non-technical. The site needs to read as **credible and
calm**, not flashy startup-SaaS. Clear over clever.

### Color Palette

| Token               | Value                   | Use                                                                                                 |
| ------------------- | ----------------------- | --------------------------------------------------------------------------------------------------- |
| `primary`           | `#4338CA` (indigo-700)  | Brand color — headers, links, primary buttons                                                       |
| `primary-hover`     | `#3730A3` (indigo-800)  | Hover state for primary actions                                                                     |
| `accent`            | `#D97706` (amber-600)   | Reserved _only_ for the main conversion CTA ("Book a Demo") — used sparingly so it stays meaningful |
| `background`        | `#FFFFFF`               | Default page background                                                                             |
| `background-subtle` | `#F9FAFB` (gray-50)     | Alternating section backgrounds                                                                     |
| `foreground`        | `#111827` (gray-900)    | Headings, primary text                                                                              |
| `foreground-muted`  | `#4B5563` (gray-600)    | Body copy, secondary text                                                                           |
| `border`            | `#E5E7EB` (gray-200)    | Card borders, dividers                                                                              |
| `success`           | `#059669` (emerald-600) | Form success states                                                                                 |
| `error`             | `#DC2626` (red-600)     | Validation errors                                                                                   |

v1 is **light mode only** — this is a marketing site, not a dashboard tool
used for hours at a time. Dark mode isn't in the requirements; noted as a
possible future addition, not built now.

### Typography

- **Font:** Inter (via `next/font/google` — no extra network request
  overhead, self-hosted at build time).
- **Scale:** Tailwind defaults — `text-sm` (body small), `text-base` (body),
  `text-lg`/`text-xl` (subheadings), `text-3xl`–`text-5xl` (hero/section
  headings, responsive via breakpoint variants).
- **Weight:** `font-semibold`/`font-bold` for headings, `font-normal` for
  body. No more than 2 weights on any single page.

### Border Radius

- `rounded-lg` (8px) as the single standard for cards, inputs, and buttons.
  Consistent, not overly rounded — avoids the generic "AI-generated" bubbly
  look called out as a thing to avoid.

### Shadows

- One subtle shadow token (`shadow-sm`) for cards that need to lift off the
  background (e.g. the contact form card). No layered/glow shadows.

### Spacing

- 8px base grid via Tailwind's default spacing scale. Section vertical
  padding: `py-16` mobile → `py-24` desktop. Consistent horizontal page
  gutter: `px-4` mobile → `px-8` desktop, capped by a `max-w-6xl` container.

## 2. Design Principles

Do:

- Modern, clean, minimal, consistent spacing and color use.
- One accent color used deliberately (the CTA), not scattered everywhere.
- Plain-language copy over technical jargon — the audience is non-technical.

Avoid:

- Gradients as decoration.
- Animation beyond simple hover/focus transitions.
- More than the palette above (no ad-hoc colors per page).
- Overly rounded ("bubbly") components.
- Dense corporate-SaaS layouts with too much competing content per screen.

## 3. Page-Level Notes

- **Home** — hero (headline + subhead + primary CTA), problem/solution
  section, "how it works" (3-step strip), secondary CTA banner before
  footer.
- **Solutions** — 3–4 solution cards (consistent card component: icon,
  title, 1–2 line description), no pricing in v1.
- **About** — single-column narrative, mission + who it's for.
- **Contact/Book a Demo** — form card on `background-subtle`, fields: name,
  business name, phone, email, message; clear success/error state.
- **Login** (admin, unlisted in nav) — minimal centered card, email +
  password only.
- **Dashboard** (admin) — simple table/list of leads (name, business,
  status badge, date), status dropdown per row, empty state when no leads
  exist yet.

## 4. Responsive Design

Mobile-first. Breakpoints follow Tailwind defaults:

- Base (mobile): single column, stacked nav (hamburger menu).
- `md:` (tablet, ≥768px): 2-column grids where relevant (solution cards).
- `lg:` (desktop, ≥1024px): full multi-column layouts, horizontal nav.

The contact form and dashboard table both need explicit mobile layouts
(table → stacked cards on small screens for the dashboard) rather than
horizontal scrolling.

## 5. Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<footer>`, heading hierarchy without
  skipped levels).
- All form inputs have associated `<label>`s (not placeholder-only labels).
- Visible focus rings on all interactive elements (not suppressed via
  `outline-none` without a replacement).
- Color contrast: body text and interactive elements meet WCAG AA against
  their backgrounds (the palette above was chosen with this in mind).
- Full keyboard navigation (nav menu, form, dashboard controls).
- Icon-only buttons (e.g. mobile menu toggle) carry `aria-label`s.
