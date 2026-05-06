# Sankalp Interior Solution — Project PRD

## Original Problem Statement
User uploaded `sankalp-interior-Website V9.zip` — a website built on **Design Arena AI** with an
embedded Supabase database. Goal:
1. Run the website **as-is** (no UI/UX changes) in the Emergent preview.
2. Extract **all SQL data** (auth_users 1, blog_posts 35, catalogs 11, leads 8,
   projects 10, services 0, testimonials 5) from the Design Arena Supabase.
3. Migrate every table + data into the user's **own newly-created Supabase**.
4. Eliminate any dependency on Design Arena.
5. Create a fresh admin user in the new Supabase.

## Architecture
| Layer | Tech |
|---|---|
| Frontend | React 19 + TypeScript + Vite 7 + Tailwind v4 + Framer Motion (port 3000) |
| Backend | FastAPI (port 8001) — re-implementation of the original Vercel `/api/*.js`
serverless handlers, proxying to Supabase REST + Auth + Storage |
| Database / Auth / Storage | User's own Supabase project `jhrfnnnvivyyjzywnvse` |
| Routing | Kubernetes ingress: `/api/*` → 8001, everything else → 3000 |

## Core Tables (in NEW Supabase)
| Table | Rows after migration | Source of truth |
|---|---|---|
| blog_posts | 35 | OLD (upserted) |
| catalogs | 11 | OLD (table created via SQL Editor, then upserted) |
| leads | 8 | OLD (upserted) |
| projects | 10 | OLD (upserted) |
| services | 6 | NEW retained (OLD was empty; NEW had seeded service rows) |
| testimonials | 6 | OLD upserted (5) + 1 pre-existing NEW row preserved |
| auth.users | 1 | New admin created via Supabase Auth Admin API |

## What's Implemented (2026-05-06)
- Extracted ZIP → moved Vite app to `/app/frontend`, added `start` script & Vite proxy `/api → 8001`
- Frontend `.env` populated with **NEW** Supabase URL + anon key (admin login uses `supabase-js` directly)
- Backend `/app/backend/server.py` rewritten as FastAPI with these routes (1:1 with original Vercel API):
  - `GET/POST/PUT /api/leads`
  - `GET/POST/PUT/DELETE /api/projects`
  - `GET/POST/PUT/DELETE /api/blog` (also `?slug=`)
  - `GET/POST/PUT/DELETE /api/testimonials`
  - `GET/POST/PUT/DELETE /api/services`  ← extended from GET-only
  - `GET/POST/PUT/DELETE /api/catalogs`
  - `POST /api/upload` (Supabase Storage, bucket `sankalp-media`, with `ui-avatars` fallback)
  - `GET /api/sitemap`, `GET /api/robots`, plus `/sitemap.xml` & `/robots.txt` aliases
  - `GET /api/health`
- All Design-Arena env vars/URLs removed; only NEW Supabase credentials used
- Migration scripts in `/app/migration/`:
  - `dump_old.mjs` (legacy), `migrate_data.py` (active — REST-based upsert by id)
  - `CREATE_CATALOGS_TABLE.sql` (run by user in SQL Editor)
  - JSON dumps of OLD and NEW tables for audit
- Verified end-to-end: homepage loads, `/projects` loads, admin login → dashboard shows all real data

### Iteration 2 — Admin upgrades (2026-05-06)
- Created public Supabase Storage bucket `sankalp-media` (5 MB limit)
- New reusable `<ImageUpload />` component (`/app/frontend/src/admin/ImageUpload.tsx`):
  click-or-drop file upload + preset library picker + custom URL paste, with size/MIME validation
- **Image upload now works** in: Projects admin, Blog admin, Catalog admin, Services admin (all 4)
- **NEW `ServicesAdmin`** page: full CRUD (title, slug, price range, timeline, sort order,
  popular toggle, description, dynamic features list with reorder, image upload). Wired into
  `App.tsx` route `/admin/services` and `AdminLayout` sidebar (wrench icon).
- DashboardPage upgraded: 6-stat grid (added Services & Testimonials) + new "Manage Services"
  quick-action card. Lazy-chunked `ServicesAdmin` & `ImageUpload` in vite.config.

## Verified Working
- ✅ Public site renders (home, projects pages screenshot-confirmed)
- ✅ All `/api/*` endpoints return data from new Supabase
- ✅ Admin login at `/admin/login` succeeds via Supabase Auth (token returned)
- ✅ Dashboard widgets show: 8 leads, 10 projects, 6 services, 11 catalog, 35 blog posts, 6 testimonials
- ✅ No outbound calls to `auwnsmyvokjlmfmnpedi.supabase.co` (Design Arena) anywhere
- ✅ E2E browser test (Playwright): Services admin → Add Service → image upload to
  Supabase Storage → save → new card appears (`#7` shown in screenshot, then cleaned up)
- ✅ Test PNG uploaded successfully to `sankalp-media/services/` → public URL accessible

## Backlog / Next Tasks
- P1 — Reset Postgres sequences (`SELECT setval('blog_posts_id_seq', max(id))…`) so
  newly-inserted rows don't collide with imported ids. (Quick SQL one-liner.)
- P1 — Decide policy for the 1 extra row in `testimonials` (id=1 "Priya Sharma") that
  pre-existed in NEW Supabase. Currently retained.
- P2 — Production deployment (Vercel) — push to GitHub via "Save to GitHub" + import to Vercel.
- P2 — Confirm Supabase Storage bucket `sankalp-media` exists (image upload falls back to
  ui-avatars if not). User can create it in Storage tab and mark it Public.
- P3 — Add health check / wake-up endpoint for cold starts (the original `_wake.js` was
  a Design Arena restore hook — no longer needed).

## Engagement Idea
Now that 8 real leads are flowing into your new database, would you like me to plug in a
**WhatsApp + email auto-reply** (e.g. via Twilio + SendGrid/Resend) so every new lead
captured on the contact form instantly gets an SMS/email and you get a notification on
WhatsApp? It usually takes a 30%+ jump in lead conversion vs. waiting hours to call back.
