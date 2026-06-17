import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim() ?? '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ?? '';

/** True when real Supabase credentials were present at build time. */
export const isSupabaseConfigured = Boolean(
  supabaseUrl.startsWith('http') && supabaseAnonKey.length > 0
);

// createClient throws if url/key are empty — that blanked the entire app in production.
const FALLBACK_URL = 'https://placeholder.supabase.co';
const FALLBACK_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : FALLBACK_URL,
  isSupabaseConfigured ? supabaseAnonKey : FALLBACK_KEY
);

export type PortfolioItem = {
  id: string;
  title: string;
  company: string;
  role: string;
  timeline: string;
  platform: string;
  category: 'marketing' | 'product' | 'analytics' | 'ai';
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  metrics: { value: string; label: string }[];
  technologies: string;
  learnings: string;
  image: string;
  tags: string[];
  description: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};
