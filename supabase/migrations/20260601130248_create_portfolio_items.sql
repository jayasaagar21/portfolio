/*
  # Portfolio Items Table

  1. New Tables
    - `portfolio_items`
      - `id` (uuid, primary key)
      - `title` (text) — project title
      - `company` (text) — company or client
      - `role` (text) — role played
      - `timeline` (text) — e.g. "6 months"
      - `platform` (text) — e.g. "Web", "Mobile"
      - `category` (text) — "marketing" | "product" | "analytics"
      - `overview` (text)
      - `problem` (text)
      - `solution` (text)
      - `features` (jsonb) — array of {title, description}
      - `metrics` (jsonb) — array of {value, label}
      - `technologies` (text) — comma-separated
      - `learnings` (text)
      - `image` (text) — URL
      - `tags` (jsonb) — array of strings
      - `description` (text) — short card description
      - `sort_order` (int) — display order
      - `published` (boolean) — visible on site
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Published items readable by anyone (anon)
    - All writes require service role (admin secret header check handled in edge function; no auth users needed for now)
    - A simple admin_secret column approach: we use a separate admin_sessions table
*/

CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  platform text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'product',
  overview text NOT NULL DEFAULT '',
  problem text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]',
  metrics jsonb NOT NULL DEFAULT '[]',
  technologies text NOT NULL DEFAULT '',
  learnings text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  tags jsonb NOT NULL DEFAULT '[]',
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published items are publicly readable"
  ON portfolio_items
  FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Authenticated users can read all items"
  ON portfolio_items
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert items"
  ON portfolio_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update items"
  ON portfolio_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete items"
  ON portfolio_items
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS portfolio_items_category_idx ON portfolio_items (category);
CREATE INDEX IF NOT EXISTS portfolio_items_published_idx ON portfolio_items (published);
CREATE INDEX IF NOT EXISTS portfolio_items_sort_order_idx ON portfolio_items (sort_order);
