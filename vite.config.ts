import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel Supabase integration syncs SUPABASE_* / NEXT_PUBLIC_* vars (not VITE_*).
// Bridge them at build time so no manual API key copy is needed on Vercel.
function supabaseEnv(env: Record<string, string>) {
  const url =
    env.VITE_SUPABASE_URL ||
    env.SUPABASE_URL ||
    env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    env.VITE_SUPABASE_ANON_KEY ||
    env.SUPABASE_ANON_KEY ||
    env.SUPABASE_PUBLISHABLE_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  return { url, key };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const { url, key } = supabaseEnv(env);

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(url ?? ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(key ?? ''),
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
