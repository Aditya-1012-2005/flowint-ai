# Flowint AI — Complete Technical Overview

A single reference for the whole project: what it is, the tech stack (and why),
every dependency, the full file map, every page/component/element, the database,
auth, styling system, and how data flows through it.

_Last updated: 2026-09-05 · v1_

---

## 1. What this project is

**Flowint AI** is the marketing website + lead-capture platform for a startup
that sells simple AI automation to small vendors and local ("lala") businesses
still running on Excel, registers, and manual processes.

It has two sides:

- **Public site** (anyone) — explains the product and captures demo requests.
- **Admin area** (Flowint AI team) — a login-protected dashboard to review and
  manage those leads.

**Scope of v1:** marketing pages + lead form + admin lead management. It is
*not* the automation product itself — just the site that sells it.

---

## 2. Tech Stack (and why each was chosen)

| Layer | Technology | Version | Why |
| ----- | ---------- | ------- | --- |
| Framework | **Next.js** (App Router) | 16.3.4 | Full-stack React — pages, API, and server logic in one project. Server Components + Server Actions mean no separate backend. |
| Language | **TypeScript** | ^5 | Type safety across the whole app. |
| UI library | **React** | 19.2.8 | Component model Next.js is built on. |
| Styling | **Tailwind CSS** | v4 | Utility-first styling; the design system lives in CSS variables. |
| Components | **shadcn/ui** (on **Base UI**) | — | Accessible, unstyled primitives we own the code for (in `components/ui`). Note: this shadcn build uses **Base UI**, not Radix. |
| Icons | **lucide-react** | ^1.41 | Consistent, lightweight icon set. |
| Database | **PostgreSQL** via **Neon** | — | Managed serverless Postgres; pairs cleanly with Vercel. |
| ORM | **Prisma** | 7.10.0 | Type-safe DB access + migrations. Pinned to 7.10.0 (stable) because npm's `latest` points at an 8.0.0 release candidate. |
| DB driver | **@prisma/adapter-neon** + **@neondatabase/serverless** | 7.10 / 1.1 | Neon's serverless driver adapter — the runtime connection for Prisma 7 on Vercel. |
| Auth | **Auth.js (NextAuth v5)** | ^5.0.0-beta | Credentials login, JWT sessions. Chosen over Clerk because there's a single seeded admin, no public sign-up. |
| Passwords | **bcryptjs** | ^3 | Hashes admin passwords (never stored in plain text). |
| Validation | **Zod** | ^4 | One schema validates on both client and server. |
| Forms | **react-hook-form** + **@hookform/resolvers** | ^7 / ^5 | Form state + Zod integration. |
| Toasts | **sonner** | ^2 | Success/error notifications. |
| Deployment | **Vercel** | — | Native Next.js hosting; serverless. |

### Supporting / dev tooling
`ws` (WebSocket for Neon driver in Node) · `class-variance-authority` &
`cn` (component variant/classname helpers) · `tw-animate-css` &
`next-themes` (pulled in by shadcn) · `dotenv` (loads `.env` for Prisma CLI) ·
`tsx` (runs the TS seed script) · **ESLint** + **Prettier** (lint/format) ·
**prettier-plugin-tailwindcss** (sorts Tailwind classes).

---

## 3. Architecture (how the layers connect)

```text
Browser (pages + components)
      │
      ▼
Server Actions  ──►  Auth.js (login/session)
(app/actions)          │
      │                ▼
      ▼         proxy.ts (route protection for /dashboard)
Services (services/*.service.ts)   ← business/data logic
      │
      ▼
Prisma Client (lib/db/prisma.ts)  →  Neon Postgres
```

Rule followed throughout: **UI never talks to the database directly.** It goes
through a Server Action → a service function → Prisma.

---

## 4. Full File Map

```text
FlowintAI/
├── app/                          # Routes, layouts, server actions, API
│   ├── layout.tsx                # Root layout: fonts, metadata, Navbar/Footer/Toaster
│   ├── globals.css               # Tailwind import + design-system CSS variables
│   ├── page.tsx                  # HOME page
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading spinner
│   ├── solutions/page.tsx        # SOLUTIONS page
│   ├── about/page.tsx            # ABOUT page
│   ├── contact/page.tsx          # CONTACT / book-a-demo page
│   ├── login/page.tsx            # Admin LOGIN page (noindex)
│   ├── dashboard/page.tsx        # Admin DASHBOARD (protected, noindex)
│   ├── actions/                  # Server Actions
│   │   ├── lead.ts               #   submitLead (public form)
│   │   ├── auth.ts               #   login / logout
│   │   └── admin-leads.ts        #   setLeadStatus / removeLead (admin only)
│   └── api/auth/[...nextauth]/route.ts   # Auth.js request handler
│
├── components/
│   ├── ui/                       # shadcn primitives (owned code)
│   │   ├── button.tsx  input.tsx  label.tsx  textarea.tsx
│   │   ├── card.tsx  badge.tsx  separator.tsx
│   │   ├── dropdown-menu.tsx  sonner.tsx
│   ├── layout/
│   │   ├── navbar.tsx            # Top nav + mobile menu + CTA
│   │   ├── footer.tsx            # Footer
│   │   └── container.tsx         # Max-width page wrapper
│   └── features/
│       ├── solution-card.tsx     # Reusable solution card
│       ├── contact-form.tsx      # Lead form (client)
│       ├── login-form.tsx        # Admin login form (client)
│       ├── leads-table.tsx       # Dashboard lead list + controls (client)
│       └── logout-button.tsx     # Sign-out button (client)
│
├── lib/
│   ├── db/prisma.ts              # Prisma client singleton + Neon adapter
│   ├── auth/
│   │   ├── auth.config.ts        # Edge-safe auth config (route protection)
│   │   └── auth.ts               # Full auth (Credentials provider + bcrypt)
│   ├── validations/
│   │   ├── lead.ts               # Zod schema for the contact form
│   │   └── auth.ts               # Zod schema for login
│   ├── utils/
│   │   ├── site.ts               # Site name, tagline, nav links
│   │   └── content.ts            # Solutions + how-it-works content data
│   ├── utils.ts                  # cn() classname helper (shadcn)
│   └── generated/prisma/         # Generated Prisma client (gitignored)
│
├── services/                     # Data-access / business logic
│   ├── lead.service.ts           # createLead, listLeads, updateLeadStatus, deleteLead
│   └── admin.service.ts          # getAdminByEmail
│
├── prisma/
│   ├── schema.prisma             # Lead + AdminUser + LeadStatus models
│   ├── seed.ts                   # Seeds the first admin account
│   └── migrations/               # SQL migration history
│
├── docs/                         # REQUIREMENTS, ARCHITECTURE, DATABASE,
│                                 # UI_UX_PLAN, DEPLOYMENT, OVERVIEW (this file)
├── proxy.ts                      # Route protection (Next 16 "middleware")
├── prisma7.config.ts             # Prisma 7 config (migration DB URL)
├── .env / .env.example           # Environment variables (.env is gitignored)
├── PROJECT_STATUS.md             # Live build status
└── README.md                     # How to install/run/deploy
```

---

## 5. Pages (routes) and what's on each

| Route | File | Access | Rendering | Key elements |
| ----- | ---- | ------ | --------- | ------------ |
| `/` | `app/page.tsx` | Public | Static | Hero (headline + 2 CTAs), "the problem" (3 cards), solutions preview (4 cards), how-it-works (3 steps), closing CTA band |
| `/solutions` | `app/solutions/page.tsx` | Public | Static | Header, 4 detailed solution cards (with bullet details), CTA |
| `/about` | `app/about/page.tsx` | Public | Static | Header, mission narrative, 3 "what we believe" cards, CTA |
| `/contact` | `app/contact/page.tsx` | Public | Static shell + client form | Left: 3 selling points. Right: the lead form |
| `/login` | `app/login/page.tsx` | Public (noindex) | Dynamic | Centered card with email + password |
| `/dashboard` | `app/dashboard/page.tsx` | **Admin only** | Dynamic | Lead list, per-lead status + delete, sign-out, empty/error states |
| `/api/auth/*` | route handler | System | — | Auth.js sign-in/out endpoints |

---

## 6. Components / UI elements inventory

### Layout
- **Navbar** (`components/layout/navbar.tsx`) — sticky top bar, brand, desktop
  nav links, amber "Book a Demo" CTA, and a collapsible hamburger menu on mobile.
- **Footer** (`footer.tsx`) — brand, tagline, nav links, copyright.
- **Container** (`container.tsx`) — centers content at `max-w-6xl` with page
  gutters; used on every section.

### Feature components
- **SolutionCard** — icon tile + title + summary (+ optional bullet details).
  Reused on Home (preview) and Solutions (full).
- **ContactForm** *(client)* — react-hook-form + Zod, 5 fields + honeypot,
  inline errors, success state, calls `submitLead`.
- **LoginForm** *(client)* — email/password, Zod-validated, calls `login`.
- **LeadsTable** *(client)* — one card per lead with status badge, contact
  links, message, timestamp, a status `<select>`, and a delete button.
- **LogoutButton** *(client)* — sign-out form calling the `logout` action.

### shadcn/ui primitives (in `components/ui`, code we own)
`button`, `input`, `label`, `textarea`, `card`, `badge`, `separator`,
`dropdown-menu`, `sonner` (toaster).

> Note on buttons: the Base UI `Button` renders a real `<button>` by default.
> When it wraps a link we pass `render={<Link/>}` **and** `nativeButton={false}`
> so it stays a proper anchor.

---

## 7. Design System (the "elements" / styling)

Defined as CSS variables in `app/globals.css`; consumed via Tailwind. **Light
mode only** in v1.

| Token | Value | Use |
| ----- | ----- | --- |
| `--primary` | `#4338CA` (indigo) | Brand color, primary buttons, links |
| `--primary-hover` | `#3730A3` | Primary hover |
| `--cta` | `#D97706` (amber) | **Only** the main "Book a Demo" CTA |
| `--cta-hover` | `#B45309` | CTA hover |
| `--background` | `#FFFFFF` | Page background |
| `--background-subtle` | `#F9FAFB` | Alternating sections |
| `--foreground` | `#111827` | Headings / primary text |
| `--muted-foreground` | `#4B5563` | Body / secondary text |
| `--border` | `#E5E7EB` | Card borders, dividers |
| `--success` | `#059669` | Form success |
| `--destructive` | `#DC2626` | Errors, delete |

- **Font:** Inter (via `next/font`).
- **Radius:** `0.5rem` standard on cards, inputs, buttons.
- **Shadow:** one subtle `shadow-sm` for lifted cards.
- **Spacing:** 8px grid; sections `py-16` (mobile) → `py-24` (desktop).
- **Responsive:** mobile-first; Tailwind breakpoints `md:` (tablet), `lg:`
  (desktop). Nav collapses to a hamburger under `md`.
- **Accessibility:** semantic HTML, labeled inputs, visible focus rings, WCAG-AA
  contrast, keyboard navigable, `aria-label`s on icon-only buttons.

---

## 8. Database

Two tables (`prisma/schema.prisma`):

### `Lead` — a contact-form submission
`id` · `name` · `businessName` · `phone` · `email` · `message` ·
`status` (`NEW` | `CONTACTED` | `CLOSED`, default `NEW`) · `createdAt` ·
`updatedAt`. Indexed on `status` and `createdAt`.

### `AdminUser` — a team member who can log in
`id` · `email` (unique) · `passwordHash` (bcrypt) · `name?` · `createdAt` ·
`updatedAt`.

No relationship between them in v1. Seeded manually — no public sign-up.

---

## 9. Data flows

**Visitor submits a lead**
```text
ContactForm → Zod (client) → submitLead action → Zod (server) →
honeypot check → createLead() → Prisma → Neon → success state
```

**Admin logs in**
```text
LoginForm → login action → Auth.js Credentials → getAdminByEmail() →
bcrypt.compare → JWT session cookie → redirect /dashboard
```

**Admin manages a lead**
```text
/dashboard (server) → listLeads() → render →
status change / delete → setLeadStatus()/removeLead() (auth-guarded) →
Prisma → revalidatePath → UI updates
```

Route protection: `proxy.ts` checks the session before `/dashboard` renders;
signed-out users are redirected to `/login`.

---

## 10. Environment variables

| Variable | Purpose |
| -------- | ------- |
| `DATABASE_URL` | Neon **pooled** connection — runtime queries |
| `DIRECT_URL` | Neon **direct** connection — migrations |
| `AUTH_SECRET` | Auth.js signing secret |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` | First admin (seed only) |

`.env` is **gitignored**; `.env.example` (placeholders) is committed.

---

## 11. Scripts

| Command | Does |
| ------- | ---- |
| `npm run dev` | Start dev server |
| `npm run build` | `prisma generate` + production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run prisma:migrate` | Create/apply migrations |
| `npm run prisma:seed` | Seed the first admin |
| `npm run prisma:studio` | Visual DB browser |

---

## 12. Status & what's next

- **Built & verified end-to-end** against a live Neon DB: lead submit → save,
  admin login → dashboard, status update, sign-out, route protection.
- **Code is on GitHub** (private): `Aditya-1012-2005/flowint-ai`.
- **Remaining:** deploy to Vercel (see `docs/DEPLOYMENT.md`).

See `PROJECT_STATUS.md` for the running log and `docs/` for the deeper
requirement/architecture/database/UI documents.
