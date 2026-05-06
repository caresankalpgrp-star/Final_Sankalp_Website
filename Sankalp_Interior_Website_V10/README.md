# Sankalp_Interior_Website_V10 — Project Backup

This ZIP is a complete snapshot of the project after migrating off Design Arena
and onto **your own Supabase**. Every Design Arena trace has been removed:

- ❌ No `designarena.ai` analytics scripts in `index.html`
- ❌ No reference to old Supabase project `auwnsmyvokjlmfmnpedi`
- ❌ No `FULLSTACK_PROJECT_REF` / `_wake.js` restore-hook calls
- ❌ No Agon Element Picker / arena-recording / arena-views scripts
- ❌ No `emergentintegrations` Python package in `backend/requirements.txt`
- ✅ All API routes (`frontend/api/*.js`) point at YOUR Supabase only
- ✅ Frontend `.env`, backend `.env`, and `vercel.json` use YOUR Supabase keys

## What's in this ZIP

```
Sankalp_Interior_Website_V10/
├── frontend/                    ← THIS is what Vercel deploys
│   ├── api/                     ← Vercel serverless functions (Node.js)
│   ├── public/                  ← Static assets, images, favicon
│   ├── src/                     ← React + TypeScript source
│   │   └── admin/               ← Admin panel pages
│   ├── index.html               ← Cleaned of all tracking scripts
│   ├── vercel.json              ← Routing + env vars
│   ├── vite.config.ts           ← Production-build-ready
│   ├── package.json
│   └── .env / .env.example
├── backend/                     ← Local-only FastAPI for Emergent preview
│                                  (Vercel does NOT use this — see .vercelignore)
├── migration/                   ← One-time scripts used to migrate data
│   ├── migrate_data.py          ← Old Supabase → New Supabase data copy
│   ├── CREATE_CATALOGS_TABLE.sql
│   ├── dumps/                   ← JSON snapshots from old Supabase
│   └── new_dumps/               ← JSON snapshots after migration
├── memory/
│   ├── PRD.md                   ← Full project history
│   └── test_credentials.md      ← Admin login credentials
├── .vercelignore                ← Ensures Vercel ignores backend/
├── .gitignore
└── README.md                    ← This file
```

## Quick-start (push this to a fresh GitHub repo)

```bash
unzip Sankalp_Interior_Website_V10*.zip
cd Sankalp_Interior_Website_V10
git init -b main
git add .
git commit -m "Sankalp Interior Website V10 — clean snapshot"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Deploy to Vercel

1. Vercel → **Add New Project** → Import this repo from GitHub.
2. **Root Directory**: `frontend`
3. **Framework Preset**: `Vite` (auto-detected)
4. **Build Command**: leave blank (uses `npm run build`)
5. **Output Directory**: `dist` (auto-detected)
6. Click **Deploy**.

> All Supabase env vars are baked into `frontend/vercel.json`, so no manual
> environment-variable setup is needed.  
> If you'd rather manage them in the Vercel dashboard, copy them into
> Settings → Environment Variables and remove the `env` block from
> `frontend/vercel.json`.

## Admin login

- URL: `https://YOUR-DOMAIN.vercel.app/admin/login`
- Email: `admin@sankalpinterior.com`
- Password: `Sankalp@2025`

(Change the password from Supabase → Authentication → Users after first login.)

## Heads-up on Vercel auto-deploys

Vercel's **Hobby (free) plan** blocks pushes from non-owner GitHub authors
on private repos. If you keep editing the site through Emergent, every
auto-push will be flagged "Deployment Blocked". Easiest workarounds:

1. After each Emergent push, click **Redeploy** in the Vercel dashboard
   (instant, free).
2. OR make the GitHub repo **Public** — Vercel skips the author check.
3. OR upgrade to Vercel Pro ($20/month).
