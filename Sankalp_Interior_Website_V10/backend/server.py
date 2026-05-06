"""
Sankalp Interior Solution — FastAPI backend
Re-implementation of the original Vercel /api/*.js serverless handlers,
proxying to Supabase via service_role key.
"""
import os
import base64
import time
import logging
from pathlib import Path
from typing import Optional, Any, Dict, List

import requests
from fastapi import FastAPI, APIRouter, Request, Response, HTTPException, Query
from fastapi.responses import JSONResponse, PlainTextResponse
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
SUPABASE_BUCKET = os.environ.get("SUPABASE_STORAGE_BUCKET", "sankalp-media")

logger = logging.getLogger("sankalp")
logging.basicConfig(level=logging.INFO)

REST_HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
}

app = FastAPI(title="Sankalp Interior API")
api = APIRouter(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─────────────── helpers ───────────────
def sb_select(table: str, params: Dict[str, str]) -> List[Dict[str, Any]]:
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    r = requests.get(url, headers=REST_HEADERS, params=params, timeout=30)
    r.raise_for_status()
    return r.json()


def sb_insert(table: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    url = f"{SUPABASE_URL}/rest/v1/{table}"
    headers = {**REST_HEADERS, "Prefer": "return=representation"}
    r = requests.post(url, headers=headers, json=payload, timeout=30)
    if not r.ok:
        raise HTTPException(status_code=r.status_code, detail=r.text)
    data = r.json()
    return data[0] if isinstance(data, list) and data else data


def sb_update(table: str, row_id: Any, fields: Dict[str, Any]) -> Dict[str, Any]:
    url = f"{SUPABASE_URL}/rest/v1/{table}?id=eq.{row_id}"
    headers = {**REST_HEADERS, "Prefer": "return=representation"}
    r = requests.patch(url, headers=headers, json=fields, timeout=30)
    if not r.ok:
        raise HTTPException(status_code=r.status_code, detail=r.text)
    data = r.json()
    return data[0] if isinstance(data, list) and data else data


def sb_delete(table: str, row_id: Any) -> None:
    url = f"{SUPABASE_URL}/rest/v1/{table}?id=eq.{row_id}"
    r = requests.delete(url, headers=REST_HEADERS, timeout=30)
    if not r.ok:
        raise HTTPException(status_code=r.status_code, detail=r.text)


# ─────────────── /api/leads ───────────────
@api.get("/leads")
def get_leads():
    return sb_select("leads", {"select": "*", "order": "created_at.desc"})


@api.post("/leads", status_code=201)
async def create_lead(req: Request):
    body = await req.json()
    if not body.get("name") or not body.get("phone"):
        raise HTTPException(status_code=400, detail="Name and phone are required")
    payload = {
        "name": body.get("name"),
        "phone": body.get("phone"),
        "email": body.get("email"),
        "location": body.get("location"),
        "budget": body.get("budget"),
        "property_type": body.get("property_type"),
        "message": body.get("message"),
        "source": body.get("source") or "website",
    }
    return sb_insert("leads", payload)


@api.put("/leads")
async def update_lead(req: Request):
    body = await req.json()
    row_id = body.get("id")
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    return sb_update("leads", row_id, {"status": body.get("status")})


# ─────────────── /api/projects ───────────────
@api.get("/projects")
def get_projects(category: Optional[str] = None, featured: Optional[str] = None):
    params: Dict[str, str] = {"select": "*", "order": "sort_order.asc"}
    if category and category != "all":
        params["category"] = f"eq.{category}"
    if featured == "true":
        params["featured"] = "eq.true"
    return sb_select("projects", params)


@api.post("/projects", status_code=201)
async def create_project(req: Request):
    body = await req.json()
    if not body.get("title") or not body.get("category"):
        raise HTTPException(status_code=400, detail="Title and category required")
    payload = {
        "title": body.get("title"),
        "category": body.get("category"),
        "location": body.get("location"),
        "budget": body.get("budget"),
        "duration": body.get("duration"),
        "area": body.get("area"),
        "description": body.get("description"),
        "image_url": body.get("image_url"),
        "featured": body.get("featured") or False,
        "sort_order": body.get("sort_order") or 0,
    }
    return sb_insert("projects", payload)


@api.put("/projects")
async def update_project(req: Request):
    body = await req.json()
    row_id = body.pop("id", None)
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    return sb_update("projects", row_id, body)


@api.delete("/projects")
async def delete_project(req: Request):
    body = await req.json()
    row_id = body.get("id")
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    sb_delete("projects", row_id)
    return {"ok": True}


# ─────────────── /api/blog ───────────────
@api.get("/blog")
def get_blog(slug: Optional[str] = None):
    if slug:
        rows = sb_select("blog_posts", {"select": "*", "slug": f"eq.{slug}", "limit": "1"})
        if not rows:
            raise HTTPException(status_code=404, detail="Not found")
        return rows[0]
    return sb_select("blog_posts", {"select": "*", "order": "published_at.desc"})


@api.post("/blog", status_code=201)
async def create_blog(req: Request):
    body = await req.json()
    if not body.get("title") or not body.get("slug"):
        raise HTTPException(status_code=400, detail="Title and slug required")
    from datetime import datetime, timezone
    payload = {
        "title": body.get("title"),
        "slug": body.get("slug"),
        "excerpt": body.get("excerpt"),
        "content": body.get("content"),
        "image_url": body.get("image_url"),
        "author": body.get("author"),
        "category": body.get("category"),
        "read_time": body.get("read_time"),
        "published_at": body.get("published_at") or datetime.now(timezone.utc).isoformat(),
    }
    return sb_insert("blog_posts", payload)


@api.put("/blog")
async def update_blog(req: Request):
    body = await req.json()
    row_id = body.pop("id", None)
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    return sb_update("blog_posts", row_id, body)


@api.delete("/blog")
async def delete_blog(req: Request):
    body = await req.json()
    row_id = body.get("id")
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    sb_delete("blog_posts", row_id)
    return {"ok": True}


# ─────────────── /api/testimonials ───────────────
@api.get("/testimonials")
def get_testimonials():
    return sb_select("testimonials", {"select": "*", "order": "sort_order.asc"})


@api.post("/testimonials", status_code=201)
async def create_testimonial(req: Request):
    body = await req.json()
    if not body.get("name") or not body.get("text"):
        raise HTTPException(status_code=400, detail="Name and text required")
    payload = {
        "name": body.get("name"),
        "location": body.get("location"),
        "text": body.get("text"),
        "rating": body.get("rating") or 5,
        "project": body.get("project"),
        "avatar_url": body.get("avatar_url"),
        "sort_order": body.get("sort_order") or 0,
    }
    return sb_insert("testimonials", payload)


@api.put("/testimonials")
async def update_testimonial(req: Request):
    body = await req.json()
    row_id = body.pop("id", None)
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    return sb_update("testimonials", row_id, body)


@api.delete("/testimonials")
async def delete_testimonial(req: Request):
    body = await req.json()
    row_id = body.get("id")
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    sb_delete("testimonials", row_id)
    return {"ok": True}


# ─────────────── /api/services ───────────────
@api.get("/services")
def get_services():
    return sb_select("services", {"select": "*", "order": "sort_order.asc"})


@api.post("/services", status_code=201)
async def create_service(req: Request):
    body = await req.json()
    if not body.get("title") or not body.get("slug"):
        raise HTTPException(status_code=400, detail="Title and slug required")
    payload = {
        "title": body.get("title"),
        "slug": body.get("slug"),
        "description": body.get("description"),
        "price_range": body.get("price_range"),
        "timeline": body.get("timeline"),
        "image_url": body.get("image_url"),
        "features": body.get("features") or [],
        "popular": body.get("popular") or False,
        "sort_order": body.get("sort_order") or 0,
    }
    return sb_insert("services", payload)


@api.put("/services")
async def update_service(req: Request):
    body = await req.json()
    row_id = body.pop("id", None)
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    return sb_update("services", row_id, body)


@api.delete("/services")
async def delete_service(req: Request):
    body = await req.json()
    row_id = body.get("id")
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    sb_delete("services", row_id)
    return {"ok": True}


# ─────────────── /api/catalogs ───────────────
@api.get("/catalogs")
def get_catalogs(all: Optional[str] = None):
    params: Dict[str, str] = {"select": "*", "order": "sort_order.asc"}
    if not all:
        params["active"] = "eq.true"
    return sb_select("catalogs", params)


@api.post("/catalogs", status_code=201)
async def create_catalog(req: Request):
    body = await req.json()
    if not (body.get("title") and body.get("image_url") and body.get("album_url")):
        raise HTTPException(status_code=400, detail="Title, image_url and album_url are required")
    payload = {
        "title": body.get("title"),
        "description": body.get("description"),
        "image_url": body.get("image_url"),
        "album_url": body.get("album_url"),
        "alt_text": body.get("alt_text"),
        "category": body.get("category"),
        "sort_order": body.get("sort_order") or 0,
        "active": body.get("active") if body.get("active") is not None else True,
    }
    return sb_insert("catalogs", payload)


@api.put("/catalogs")
async def update_catalog(req: Request):
    body = await req.json()
    row_id = body.pop("id", None)
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    return sb_update("catalogs", row_id, body)


@api.delete("/catalogs")
async def delete_catalog(req: Request):
    body = await req.json()
    row_id = body.get("id")
    if not row_id:
        raise HTTPException(status_code=400, detail="ID required")
    sb_delete("catalogs", row_id)
    return {"ok": True}


# ─────────────── /api/upload (image upload to Supabase storage) ───────────────
@api.post("/upload")
async def upload_image(req: Request):
    body = await req.json()
    b64 = body.get("base64")
    file_name = body.get("fileName")
    folder = body.get("folder", "testimonials")
    if not b64 or not file_name:
        raise HTTPException(status_code=400, detail="base64 and fileName required")

    # strip data url prefix
    if "," in b64:
        b64 = b64.split(",", 1)[1]
    raw = base64.b64decode(b64)

    ext = (file_name.rsplit(".", 1)[-1] if "." in file_name else "jpg").lower()
    mime_map = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp", "gif": "image/gif"}
    content_type = mime_map.get(ext, "image/jpeg")

    unique_name = f"{folder}/{int(time.time()*1000)}-{os.urandom(4).hex()}.{ext}"
    storage_url = f"{SUPABASE_URL}/storage/v1/object/{SUPABASE_BUCKET}/{unique_name}"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": content_type,
        "x-upsert": "false",
    }
    r = requests.post(storage_url, headers=headers, data=raw, timeout=30)
    if not r.ok:
        # Fallback to ui-avatars placeholder (matches original behavior)
        from urllib.parse import quote
        return {
            "url": f"https://ui-avatars.com/api/?name={quote(file_name)}&background=f07c1e&color=fff&size=200",
            "fallback": True,
            "storage_error": r.text,
        }
    public_url = f"{SUPABASE_URL}/storage/v1/object/public/{SUPABASE_BUCKET}/{unique_name}"
    return {"url": public_url}


# ─────────────── /api/sitemap, /api/robots ───────────────
ALL_LOCATION_SLUGS = [
    "interior-designer-kolkata", "interior-designer-howrah", "interior-designer-salt-lake",
    "interior-designer-new-town", "interior-designer-siliguri", "interior-designer-darjeeling",
    "interior-designer-jalpaiguri", "interior-designer-alipurduar", "interior-designer-cooch-behar",
    "interior-designer-durgapur", "interior-designer-asansol", "interior-designer-bardhaman",
    "interior-designer-west-burdwan", "interior-designer-east-burdwan", "interior-designer-kharagpur",
    "interior-designer-haldia", "interior-designer-west-midnapore", "interior-designer-east-midnapore",
    "interior-designer-hooghly", "interior-designer-nadia", "interior-designer-krishnanagar",
    "interior-designer-ranaghat", "interior-designer-bolpur", "interior-designer-murshidabad",
    "interior-designer-north-24-parganas", "interior-designer-south-24-parganas",
    "interior-designer-barasat", "interior-designer-basirhat", "interior-designer-purulia",
    "interior-designer-bankura",
]
STATIC_PAGES = [
    ("/", "1.0", "weekly"), ("/about", "0.8", "monthly"), ("/services", "0.9", "weekly"),
    ("/projects", "0.8", "weekly"), ("/pricing", "0.9", "weekly"), ("/contact", "0.9", "monthly"),
    ("/blog", "0.8", "daily"), ("/locations", "0.95", "monthly"),
]


@api.get("/sitemap")
def sitemap():
    from datetime import date
    base = "https://www.sankalpinterior.com"
    now = date.today().isoformat()
    parts = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url, pri, cf in STATIC_PAGES:
        parts.append(f"<url><loc>{base}{url}</loc><lastmod>{now}</lastmod>"
                     f"<changefreq>{cf}</changefreq><priority>{pri}</priority></url>")
    for slug in ALL_LOCATION_SLUGS:
        parts.append(f"<url><loc>{base}/{slug}</loc><lastmod>{now}</lastmod>"
                     f"<changefreq>monthly</changefreq><priority>0.85</priority></url>")
    parts.append("</urlset>")
    return Response(content="\n".join(parts), media_type="application/xml")


@api.get("/robots")
def robots():
    txt = ("User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /admin/login\n"
           "Disallow: /api/\n\nSitemap: https://www.sankalpinterior.com/sitemap.xml\n")
    return PlainTextResponse(txt)


@api.get("/health")
def health():
    return {"ok": True, "supabase_url": SUPABASE_URL}


app.include_router(api)


# Also mount /sitemap.xml + /robots.txt at root (mirrors vercel.json rewrites)
@app.get("/sitemap.xml")
def sitemap_root():
    return sitemap()


@app.get("/robots.txt")
def robots_root():
    return robots()
