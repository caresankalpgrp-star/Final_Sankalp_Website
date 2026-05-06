-- ════════════════════════════════════════════════════════════════════════════
-- Sankalp Interior — `catalogs` table for NEW Supabase
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.catalogs (
  id           BIGSERIAL PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT,
  image_url    TEXT NOT NULL,
  album_url    TEXT NOT NULL,
  alt_text     TEXT,
  category     TEXT,
  sort_order   INTEGER DEFAULT 0,
  active       BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Allow anonymous + service-role read of active catalogs (matches public site behavior)
ALTER TABLE public.catalogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "catalogs_read_active" ON public.catalogs;
CREATE POLICY "catalogs_read_active"
  ON public.catalogs
  FOR SELECT
  TO anon, authenticated
  USING (active = TRUE);

-- Helpful index for ordering
CREATE INDEX IF NOT EXISTS catalogs_sort_idx ON public.catalogs (sort_order);
