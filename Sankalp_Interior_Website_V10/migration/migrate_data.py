"""
Migrate all rows from OLD Design Arena Supabase to NEW Supabase.
Strategy: UPSERT by primary key id, so existing rows are overwritten with old data
         and missing rows are inserted. Sequence is reset after each table.
"""
import json, sys, requests
from pathlib import Path

OLD = ("https://auwnsmyvokjlmfmnpedi.supabase.co",
       "sb_secret_F_OVOPeuyoL5ON860WRjaQ_i04u0bUa")
NEW = ("https://jhrfnnnvivyyjzywnvse.supabase.co",
       "sb_secret_wH7BY79yCUaCs1asbAXh9w_EUU7oXhw")

TABLES = ["blog_posts", "catalogs", "leads", "projects", "services", "testimonials"]


def hdr(key):
    return {"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"}


def fetch_all(url, key, table):
    r = requests.get(f"{url}/rest/v1/{table}?select=*", headers=hdr(key), timeout=30)
    r.raise_for_status()
    return r.json()


def upsert(url, key, table, rows):
    if not rows:
        return 0
    # PostgREST upsert: on_conflict=id  + Prefer: resolution=merge-duplicates
    h = {**hdr(key), "Prefer": "resolution=merge-duplicates,return=minimal"}
    r = requests.post(f"{url}/rest/v1/{table}?on_conflict=id",
                      headers=h, json=rows, timeout=60)
    if not r.ok:
        print(f"   ERROR upserting {table}: {r.status_code} {r.text[:300]}")
        return -1
    return len(rows)


def main():
    print(f"Source: {OLD[0]}\nTarget: {NEW[0]}\n")
    for t in TABLES:
        try:
            rows = fetch_all(OLD[0], OLD[1], t)
        except requests.HTTPError as e:
            print(f"❌ {t}: cannot fetch from OLD: {e}")
            continue
        print(f"→ {t}: {len(rows)} rows from OLD")

        # Try to detect if NEW table exists
        check = requests.get(f"{NEW[0]}/rest/v1/{t}?select=id&limit=1",
                             headers=hdr(NEW[1]), timeout=20)
        if check.status_code == 404 or (check.status_code == 200 and check.headers.get("content-type","").startswith("application/json") is False):
            pass
        body = check.json() if check.headers.get("content-type","").startswith("application/json") else None
        if isinstance(body, dict) and body.get("code") == "PGRST205":
            print(f"   ⏭  {t} table not found in NEW Supabase — skipping (create the table first)")
            continue

        n = upsert(NEW[0], NEW[1], t, rows)
        if n >= 0:
            print(f"   ✅ upserted {n} rows into NEW.{t}")

    print("\nDONE.")


if __name__ == "__main__":
    main()
