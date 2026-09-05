# REQUIREMENTS.md — Flowint AI

## 1. Project Overview

**Flowint AI** is the marketing / lead-generation website for a startup that helps
small-scale vendors, small businessmen, and family-run local ("lala") businesses
adopt AI-driven automation in place of primitive, manual workflows (commonly
Excel spreadsheets, paper registers, or ad-hoc processes).

The site's job is to:

- Explain what Flowint AI does and why it matters to this audience.
- Present the automation solutions/services on offer.
- Convert visitors into leads (demo requests / inquiries).
- Give the Flowint AI team a simple place to view and manage those leads.

This is v1: a polished public website + a minimal internal lead-management
view. It is **not** yet the product itself (the automation tooling sold to
customers) — that would be a separate, later effort.

## 2. Target Users

Two distinct groups interact with this system:

1. **Prospective customers (public visitors)** — small business owners /
   vendors, generally non-technical, currently relying on Excel or manual
   systems. They browse the site on mobile or desktop and submit an inquiry
   or demo request. They never log in.
2. **Flowint AI internal team (admin)** — reviews and manages submitted
   leads/inquiries.

## 3. User Roles

| Role    | Description            | Access                                                                                               |
| ------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| Visitor | Anonymous public user  | Can browse all public pages, submit the contact/demo form                                            |
| Admin   | Flowint AI team member | Can log in, view all submitted leads, update lead status (new/contacted/closed), delete spam entries |

No self-signup role is needed for v1 — admin accounts are provisioned
manually (seeded), not created via a public sign-up flow.

## 4. Core Features (v1)

1. **Home / Landing page** — hero section with value proposition, problem/solution
   framing (manual Excel-based work → AI automation), how it works, and calls
   to action ("Book a demo" / "Get in touch").
2. **Solutions / Services page** — description of the kinds of automation
   Flowint AI offers (e.g. inventory tracking, billing/invoicing, data entry,
   reporting), presented as clear, non-jargon cards/sections.
3. **About page** — company mission, the problem being solved, who it's for.
4. **Contact / Book a Demo (lead capture)** — form (name, business name,
   phone, email, message/what they need help with) → validated, stored in
   the database, so the team can follow up. This is the primary conversion
   feature of the site.
5. **Admin dashboard** — authenticated, internal-only page listing submitted
   leads with basic filtering/status updates. Protected route, admin role
   only.

## 5. Optional / Future Features (not in v1, noted for roadmap)

- Blog / resources section (SEO content marketing).
- Testimonials / case studies (once the startup has customers).
- Pricing page.
- Multi-language support (many target users may be more comfortable in
  regional languages).
- Email notifications on new lead submission.
- Analytics dashboard for admin (conversion tracking).

## 6. User Stories

- As a visitor, I want to quickly understand what Flowint AI does, so I can
  decide if it's relevant to my business.
- As a visitor, I want to submit my contact details and a brief description
  of my business's problem, so the Flowint AI team can reach out to me.
- As a visitor, I want the site to work well on my phone, since many small
  business owners primarily browse on mobile.
- As an admin, I want to log in securely and see all submitted leads in one
  place, so I don't miss a follow-up.
- As an admin, I want to mark a lead as "contacted" or "closed", so the list
  stays organized.

## 7. Functional Requirements

- FR1: Public pages (Home, Solutions, About, Contact) must be accessible
  without authentication.
- FR2: The contact/demo form must validate all fields (client-side and
  server-side) before submission.
- FR3: Submitted leads must be persisted to the database with a timestamp.
- FR4: Admin login must be required to access `/dashboard` and any lead data.
- FR5: Admin must be able to view a list of leads, see full details of each,
  and update status.
- FR6: The system must return clear success/error feedback on form
  submission.

## 8. Non-Functional Requirements

- Must be fully responsive (mobile-first: mobile, tablet, desktop).
- Must load fast (optimized images, minimal client JS, Lighthouse-friendly).
- Must be accessible (semantic HTML, keyboard navigation, adequate contrast).
- Must have basic SEO (metadata, OpenGraph tags, sitemap) since this is a
  public marketing site meant to be found via search.
- Must run correctly on Vercel's serverless environment.
- Lead form must be protected against spam/bot submission (basic rate
  limiting / honeypot field — no CAPTCHA integration in v1 unless requested).
- No sensitive personal/financial data is collected in v1 — only name,
  business name, phone, email, message. No payments in this version.

## 9. Assumptions

- "Flowint AI" is the final product/brand name (confirmed by you); no
  tagline or logo exists yet — placeholder branding will be used until
  provided.
- v1 scope is the marketing site + lead capture + admin lead view only, not
  the automation product itself.
- A single admin role is sufficient for v1 (no multi-tenant team accounts
  yet).
- No existing design/brand assets (colors, logo, fonts) — a clean, modern
  default design system will be proposed in the UI/UX phase, and can be
  swapped once real branding exists.
- Deployment target is Vercel, database will be Neon or Supabase Postgres
  (to be decided in the architecture phase).
- Local development first, Vercel connection later (per your instruction).

## 10. Edge Cases

- Contact form submitted with invalid/missing fields → inline validation
  errors, no submission.
- Contact form submitted multiple times rapidly (possible bot) → basic rate
  limiting/honeypot rejects it silently or with a generic message.
- Admin session expires while viewing dashboard → redirected to login,
  return path preserved.
- No leads yet in the system → dashboard shows an empty state, not an error.
- Non-admin attempts to access `/dashboard` directly via URL → redirected to
  login (never a raw 403/500).
- Very long business name / message text → truncated safely in the DB
  schema (with max-length validation) rather than erroring.
