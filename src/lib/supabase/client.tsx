import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

/**
 * ============================================
 * Supabase Client Configuration
 * ============================================
 * 
 * This file initializes the Supabase client for use throughout the application.
 * 
 * 🔑 ENVIRONMENT VARIABLES REQUIRED:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 * 
 * 🌐 PUBLIC VARIABLES:
 * These variables are prefixed with NEXT_PUBLIC_ which means they are exposed
 * to the browser. This is safe for the anon key as it's designed to be public.
 * 
 * ============================================
 * SETUP INSTRUCTIONS
 * ============================================
 * 
 * For LOCAL DEVELOPMENT:
 * 1. Get your Supabase credentials:
 *    - Go to: https://app.supabase.com
 *    - Select your project
 *    - Go to: Settings → API
 *    - Copy: Project URL and anon/public key
 * 
 * 2. Add to .env file:
 *    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * 
 * For PRODUCTION (Netlify/Vercel):
 * Add both variables to your deployment platform's environment settings
 * 
 * ============================================
 */

// Load environment variables with fallback for better error messages
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('⚠️  SUPABASE CONFIGURATION ERROR');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('');
  console.error('Missing required Supabase environment variables:');
  if (!supabaseUrl) console.error('  ❌ NEXT_PUBLIC_SUPABASE_URL is not set');
  if (!supabaseAnonKey) console.error('  ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  console.error('');
  console.error('📝 To fix this:');
  console.error('');
  console.error('FOR LOCAL DEVELOPMENT:');
  console.error('1. Go to: https://app.supabase.com → Your Project → Settings → API');
  console.error('2. Copy the Project URL and anon/public key');
  console.error('3. Add to .env file:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co');
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...');
  console.error('4. Restart your development server');
  console.error('');
  console.error('FOR PRODUCTION (Netlify/Vercel):');
  console.error('Add both variables to your deployment platform environment settings');
  console.error('');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

/**
 * ==========================================
 * Create Supabase Client
 * ==========================================
 * 
 * This client can be used in both client-side and server-side code.
 * The anon key is safe to use in the browser as Supabase has built-in
 * security through Row Level Security (RLS) policies.
 * 
 * ⚠️ SECURITY NOTE:
 * Always use the anon/public key (not the service role key) for client-side code.
 * The service role key bypasses RLS and should ONLY be used in secure server environments.
 */
// Create the Supabase client only when configuration is present.
// If the environment variables are missing we export a lightweight stub
// that surfaces a clear error instead of crashing during module evaluation.
let _supabase: any = null;
if (supabaseUrl && supabaseAnonKey) {
  _supabase = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: typeof window !== 'undefined',
      },
    }
  );
} else {
  const missing = [];
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.error('Supabase not configured. Missing environment variables:', missing.join(', '));

  // Proxy that throws a clear error when any property is accessed.
  const message = `Supabase is not configured. Set ${missing.join(
    ', '
  )} in your environment (e.g. .env.local) and restart the dev server.`;

  _supabase = new Proxy(
    {},
    {
      get() {
        throw new Error(message);
      },
      apply() {
        throw new Error(message);
      },
      construct() {
        throw new Error(message);
      },
    }
  );
}

export const supabase = _supabase as typeof import('@supabase/supabase-js').SupabaseClient;

/**
 * ==========================================
 * Helper Functions
 * ==========================================
 */

/**
 * Check if Supabase is properly configured
 * 
 * @returns {boolean} True if both required environment variables are set
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}

/**
 * Get Supabase configuration status
 * 
 * @returns {object} Configuration status details
 */
export function getSupabaseConfigStatus() {
  return {
    urlSet: !!supabaseUrl,
    keySet: !!supabaseAnonKey,
    url: supabaseUrl || 'NOT_SET',
    environment: process.env.NODE_ENV || 'development',
  };
}