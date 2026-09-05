# Flowint AI

Marketing website and lead-capture platform for **Flowint AI** — a startup
that brings simple, affordable AI automation to small vendors and local
businesses still running on Excel, registers, and manual processes.

## Overview

A public marketing site that explains what Flowint AI does and converts
visitors into leads via a "book a demo" form, plus a private admin dashboard
where the team reviews and manages those leads.

## Features

- Public marketing pages: Home, Solutions, About
- Contact / book-a-demo form with client + server validation and spam honeypot
- Admin authentication (email + password, single admin role)
- Protected admin dashboard: view leads, update status (New / Contacted /
  Closed), delete
- Responsive (mobile-first), accessible, light-mode design system
- SEO metadata and OpenGraph tags on public pages

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI)
- **Database:** PostgreSQL (Neon) via Prisma 7 + Neon serverless driver adapter
- **Auth:** Auth.js (NextAuth v5), Credentials provider, JWT sessions
- **Validation:** Zod + React Hook Form
- **Deployment:** Vercel

## Architecture

```text
UI (pages/components)
  ↓
Server Actions (app/actions) + Auth.js
  ↓
Services (services/*.service.ts)
  ↓
Prisma Client (lib/db/prisma.ts) → Neon Postgres
```

See `docs/` for the full requirements, architecture, database, and UI/UX
documents.

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable              | Purpose                                                       |
| --------------------- | ------------------------------------------------------------- |
| `DATABASE_URL`        | Neon **pooled** connection (host contains `-pooler`); runtime |
| `DIRECT_URL`          | Neon **direct** connection (no `-pooler`); used by migrations |
| `AUTH_SECRET`         | Auth.js signing secret — generate with `npx auth secret`      |
| `SEED_ADMIN_EMAIL`    | Email for the first admin account (seed only)                 |
| `SEED_ADMIN_PASSWORD` | Password for the first admin account (seed only)              |
| `SEED_ADMIN_NAME`     | Optional display name for the first admin                     |

`AUTH_URL` is optional (host is inferred via `trustHost`).

## Database Setup

```bash
# Create the tables from the Prisma schema
npm run prisma:migrate

# Create the first admin account (reads SEED_ADMIN_* from .env)
npm run prisma:seed
```

`prisma generate` runs automatically on `install` and `build`.

## Running Locally

```bash
npm run dev
```

Open http://localhost:3000. Admin login is at `/login`; the dashboard at
`/dashboard` (protected).

## Scripts

| Script                   | Description                          |
| ------------------------ | ------------------------------------ |
| `npm run dev`            | Start the dev server                 |
| `npm run build`          | `prisma generate` + production build |
| `npm run start`          | Start the production server          |
| `npm run lint`           | Run ESLint                           |
| `npm run format`         | Format with Prettier                 |
| `npm run prisma:migrate` | Create/apply migrations (dev)        |
| `npm run prisma:seed`    | Seed the first admin account         |
| `npm run prisma:studio`  | Open Prisma Studio to inspect data   |

## Testing

Manual verification of validation, auth redirects, and empty/error states has
been done in-browser. Automated tests are not yet set up (planned).

## Deployment

See `docs/DEPLOYMENT.md`. In short: push to a Git repo, import into Vercel,
set the environment variables, and deploy. The build regenerates the Prisma
client automatically.

## Project Structure

```text
app/                # App Router pages, layouts, actions, api routes
  actions/          # Server Actions (lead, auth, admin-leads)
  api/auth/         # Auth.js route handler
  dashboard/        # Protected admin dashboard
components/
  ui/               # shadcn/ui primitives
  layout/           # Navbar, Footer, Container
  features/         # ContactForm, LoginForm, LeadsTable, ...
lib/
  db/               # Prisma client singleton
  auth/             # Auth.js config
  validations/      # Zod schemas
  utils/            # Site config, shared content
  generated/prisma/ # Generated Prisma Client (gitignored)
services/           # Data-access / business logic
prisma/             # schema.prisma, seed.ts
docs/               # Requirements, architecture, DB, UI/UX docs
```
