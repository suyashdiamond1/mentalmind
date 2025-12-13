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
export const supabase = createClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!,
  {
    auth: {
      persistSession: true, // Keep user logged in across page refreshes
      autoRefreshToken: true, // Automatically refresh expired tokens
      detectSessionInUrl: true, // Support magic link authentication
    },
  }
);

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