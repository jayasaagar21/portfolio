import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PortfolioItem = {
  id: string;
  title: string;
  company: string;
  role: string;
  timeline: string;
  platform: string;
  category: 'marketing' | 'product' | 'analytics';
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
