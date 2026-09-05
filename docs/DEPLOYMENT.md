# DEPLOYMENT.md — Flowint AI

Target platform: **Vercel** + **Neon Postgres**.

## 1. Required environment variables

Set these in Vercel (Project → Settings → Environment Variables) for the
Production (and Preview) environments:

| Variable       | Value                                                    |
| -------------- | -------------------------------------------------------- |
| `DATABASE_URL` | Neon **pooled** connection string (host has `-pooler`)   |
| `DIRECT_URL`   | Neon **direct** connection string (no `-pooler`)         |
| `AUTH_SECRET`  | Output of `npx auth secret` (a fresh one for production) |

`AUTH_URL` is optional — `trustHost` is enabled, and Vercel provides the host.
The `SEED_ADMIN_*` variables are only needed wherever you run the seed, not at
runtime.

## 2. Database setup (Neon)

1. Create a project at https://neon.tech (free tier is fine).
2. From the dashboard, copy **two** connection strings:
   - Pooled (host contains `-pooler`) → `DATABASE_URL`
   - Direct (no `-pooler`) → `DIRECT_URL`
3. Locally, put both in `.env`, then create the schema and first admin:
   ```bash
   npm run prisma:migrate      # creates the tables
   npm run prisma:seed         # creates the first admin (SEED_ADMIN_* in .env)
   ```
   Migrations run from your machine against Neon; Vercel does not run them.

## 3. Vercel configuration

- **Framework preset:** Next.js (auto-detected)
- **Build command:** default (`next build`) — our `build` script also runs
  `prisma generate`, and `postinstall` does too, so the generated client is
  always present.
- **Install command:** default (`npm install`)
- No `vercel.json` is required.

## 4. Deployment steps

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project** and import the repo.
3. Add the environment variables from section 1.
4. Deploy.
5. After the first deploy, confirm:
   - Public pages load
   - The contact form saves a lead (check Prisma Studio / Neon)
   - `/login` works with the seeded admin, `/dashboard` is protected

## 5. Applying schema changes later

When the Prisma schema changes:

```bash
npm run prisma:migrate      # locally, against Neon (uses DIRECT_URL)
git commit && git push      # Vercel redeploys with the regenerated client
```

## 6. Rollback strategy

- **App:** in Vercel → Deployments, promote a previous successful deployment
  (instant rollback).
- **Database:** migrations are additive for v1; if a migration must be undone,
  use Neon's branching/restore or a corrective migration. Never hand-edit the
  production schema.

## Pre-deploy checklist

```text
✓ DATABASE_URL and DIRECT_URL set (pooled vs direct correct)
✓ AUTH_SECRET set (fresh for production)
✓ Migrations applied to the Neon database
✓ First admin seeded
✓ `npm run build` passes locally
✓ `npm run lint` passes
```
