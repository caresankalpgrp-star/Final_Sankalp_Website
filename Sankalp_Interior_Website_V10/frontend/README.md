# Sankalp Interior Solution — Website

Premium interior design website for **Sankalp Interior Solution**, Kolkata.

## 🌐 Live Website
**www.sankalpinterior.com**

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Backend API | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 📁 Project Structure

```
sankalp-interior/
├── api/                        ← Vercel serverless API routes
│   ├── _supabase.js            ← Supabase client (service-role, server-side)
│   ├── _wake.js                ← Stand-alone (no-op)
│   ├── leads.js                ← Lead form submissions
│   ├── projects.js             ← Portfolio projects (CRUD)
│   ├── blog.js                 ← Blog posts (CRUD)
│   ├── testimonials.js         ← Client testimonials (CRUD)
│   ├── services.js             ← Services (CRUD)
│   ├── catalogs.js             ← Design catalog collections (CRUD)
│   ├── upload.js               ← Image upload to Supabase Storage
│   ├── sitemap.js              ← Dynamic sitemap.xml
│   └── robots.js               ← robots.txt
│
├── src/
│   ├── admin/                  ← Secure admin panel
│   │   ├── LoginPage.tsx       ← Admin login (Supabase Auth)
│   │   ├── AdminLayout.tsx     ← Admin sidebar layout
│   │   ├── DashboardPage.tsx   ← Overview dashboard
│   │   ├── LeadsAdmin.tsx      ← Lead management
│   │   ├── ProjectsAdmin.tsx   ← Portfolio management (with image upload)
│   │   ├── BlogAdmin.tsx       ← Blog post management (with WYSIWYG editor)
│   │   ├── TestimonialsAdmin.tsx
│   │   ├── ServicesAdmin.tsx   ← Services CRUD (with feature-icon picker)
│   │   ├── CatalogAdmin.tsx    ← Design catalog management
│   │   ├── ImageUpload.tsx     ← Reusable image-upload component
│   │   └── RichTextEditor.tsx  ← Tiptap WYSIWYG editor
│   │
│   ├── components/             ← Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LeadForm.tsx        ← Lead capture form
│   │   ├── BeforeAfterSlider.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── ExitPopup.tsx
│   │   └── SectionHeading.tsx
│   │
│   ├── pages/                  ← Public website pages
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── PricingPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── LocationPage.tsx    ← Dynamic SEO location pages
│   │   └── LocationsIndexPage.tsx
│   │
│   ├── seo/                    ← SEO location data
│   │   ├── locationData.ts     ← Base 13 locations
│   │   ├── locationDataExpanded.ts ← 17 additional locations
│   │   └── allLocations.ts     ← Merged dataset (30 locations)
│   │
│   └── lib/
│       ├── api.ts              ← API URL helper
│       └── supabase.ts         ← Frontend Supabase client
│
├── public/
│   ├── images/                 ← Project photos
│   ├── uploads/                ← Logo and uploads
│   └── favicon.svg
│
├── index.html                  ← SEO meta tags + schema
├── vercel.json                 ← Vercel config + env vars
├── .env.example                ← Environment template
└── package.json
```

---

## 🚀 Deploy to Vercel (Step by Step)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Sankalp Interior Solution"
git remote add origin https://github.com/YOUR_USERNAME/sankalp-interior.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to **vercel.com** → **Add New Project**
2. Import your GitHub repository
3. Framework: **Vite** (auto-detected)
4. Click **Deploy**

> ✅ All environment variables are already in `vercel.json` — no manual setup needed!

### 3. Connect Domain
1. Vercel → Project → **Settings** → **Domains**
2. Add `sankalpinterior.com` and `www.sankalpinterior.com`
3. Update DNS at your registrar:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`

---

## 🔐 Admin Panel

| URL | Purpose |
|-----|---------|
| `/admin/login` | Admin login page |
| `/admin` | Dashboard overview |
| `/admin/leads` | View & manage leads |
| `/admin/projects` | Add/edit portfolio projects |
| `/admin/services` | Add/edit services |
| `/admin/catalog` | Add/edit design catalogs |
| `/admin/blog` | Write/edit blog posts (WYSIWYG) |
| `/admin/testimonials` | Manage client reviews |

**Default credentials:**
- Email: `admin@sankalpinterior.com`
- Password: `Sankalp@2025`

> ⚠️ Change the password after first login!

---

## 🗺️ SEO Location Pages (30 locations)

| Region | Locations |
|--------|-----------|
| Kolkata Metro | Kolkata, Howrah, Salt Lake, New Town |
| North Bengal | Siliguri, Darjeeling, Jalpaiguri, Alipurduar, Cooch Behar |
| Industrial Belt | Durgapur, Asansol, Bardhaman, West Burdwan, East Burdwan |
| South Bengal | Kharagpur, Haldia, West Midnapore, East Midnapore |
| Central Bengal | Hooghly, Nadia, Krishnanagar, Ranaghat, Bolpur, Murshidabad |
| 24 Parganas | North 24 Parganas, South 24 Parganas, Barasat, Basirhat |
| Jungle Mahal | Purulia, Bankura |

---

## 📊 Database Tables (Supabase)

| Table | Purpose |
|-------|---------|
| `leads` | Contact form submissions |
| `projects` | Portfolio projects |
| `blog_posts` | Blog articles |
| `testimonials` | Client reviews |
| `services` | Service listings |
| `catalogs` | Design-catalog collections |
| `auth.users` | Admin login (Supabase Auth) |

Image uploads land in the public **`sankalp-media`** Supabase Storage bucket
(folders: `projects/`, `blog/`, `services/`, `catalogs/`, `testimonials/`).

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your Supabase keys in .env

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📞 Business Info

- **Company:** Sankalp Interior Solution
- **Phone:** +91 97482 97025
- **Email:** info@sankalpinterior.com
- **Address:** Office Unit GB02, Oishi Tower-II, Rabindra Pally, Jyangra, VIP Rd, Raghunathpur, Kolkata, WB 700059
- **Website:** www.sankalpinterior.com

---

*Built with ❤️ for Sankalp Interior Solution*
