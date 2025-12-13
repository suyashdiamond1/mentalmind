import OpenAI from 'openai';

/**
 * ============================================
 * OpenAI Client Configuration (Server-side Only)
 * ============================================
 * 
 * This file initializes and exports the OpenAI client for use throughout the application.
 * 
 * 🔒 SECURITY NOTICE:
 * This file is ONLY used in server-side code (API routes, server components).
 * The OpenAI API key is NEVER exposed to the browser/client-side.
 * 
 * ============================================
 * ENVIRONMENT VARIABLE SETUP
 * ============================================
 * 
 * For LOCAL DEVELOPMENT:
 * 1. Create a .env file in your project root (if not exists)
 * 2. Add: OPENAI_API_KEY=sk-your-actual-api-key-here
 * 3. Get your API key from: https://platform.openai.com/api-keys
 * 4. Restart your development server after adding the key
 * 
 * For PRODUCTION DEPLOYMENT:
 * 
 * ┌─────────────────────────────────────────┐
 * │  NETLIFY DEPLOYMENT                     │
 * └─────────────────────────────────────────┘
 * 1. Go to your Netlify dashboard
 * 2. Navigate to: Site settings → Environment variables
 * 3. Click "Add a variable"
 * 4. Add:
 *    - Key: OPENAI_API_KEY
 *    - Value: sk-your-actual-api-key-here
 * 5. Save and redeploy your site
 * 
 * ┌─────────────────────────────────────────┐
 * │  VERCEL DEPLOYMENT                      │
 * └─────────────────────────────────────────┘
 * 1. Go to your Vercel project dashboard
 * 2. Navigate to: Settings → Environment Variables
 * 3. Add:
 *    - Name: OPENAI_API_KEY
 *    - Value: sk-your-actual-api-key-here
 *    - Environment: Production (or All)
 * 4. Save and redeploy
 * 
 * ⚠️ CRITICAL: Without this environment variable, the chatbot will not work in production!
 * 
 * ============================================
 * TROUBLESHOOTING
 * ============================================
 * 
 * If you see "OpenAI API key is not configured" error:
 * 
 * 1. Check the API key format:
 *    ✓ Starts with "sk-proj-" or "sk-"
 *    ✓ Is at least 20 characters long
 *    ✓ Has no spaces before or after
 * 
 * 2. Verify environment variable is set:
 *    - Local: Check .env file exists and has OPENAI_API_KEY=sk-...
 *    - Production: Check deployment platform settings
 * 
 * 3. Restart/Redeploy:
 *    - Local: Stop and restart dev server (Ctrl+C, then npm run dev)
 *    - Production: Trigger a new deployment after adding variables
 * 
 * 4. Check OpenAI account:
 *    - Verify API key is valid at https://platform.openai.com/api-keys
 *    - Ensure billing is set up and you have credits
 * 
 * ============================================
 */

// ==========================================
// Environment Variable Loading and Validation
// ==========================================

const apiKey = process.env.OPENAI_API_KEY;

// Comprehensive API key validation
const isValidApiKey = apiKey && 
                     apiKey !== 'your-openai-api-key-here' && 
                     apiKey !== 'your_openai_api_key' && 
                     apiKey.length >= 20 &&
                     apiKey.startsWith('sk-');

// ==========================================
// Configuration Error Detection
// ==========================================

if (!isValidApiKey) {
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('⚠️  OPENAI API KEY CONFIGURATION ERROR');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('');
  console.error('The OpenAI API key is not properly configured.');
  console.error('');
  console.error('📝 To fix this:');
  console.error('');
  console.error('FOR LOCAL DEVELOPMENT:');
  console.error('1. Create/update your .env file in the project root');
  console.error('2. Add: OPENAI_API_KEY=sk-your-actual-api-key-here');
  console.error('3. Get your API key from: https://platform.openai.com/api-keys');
  console.error('4. Restart your development server');
  console.error('');
  console.error('FOR NETLIFY DEPLOYMENT:');
  console.error('1. Go to Netlify Dashboard → Site Settings');
  console.error('2. Navigate to: Environment Variables');
  console.error('3. Add new variable:');
  console.error('   - Key: OPENAI_API_KEY');
  console.error('   - Value: sk-your-actual-api-key-here');
  console.error('4. Save and redeploy your site');
  console.error('');
  console.error('FOR VERCEL DEPLOYMENT:');
  console.error('1. Go to Vercel Project → Settings');
  console.error('2. Navigate to: Environment Variables');
  console.error('3. Add new variable:');
  console.error('   - Name: OPENAI_API_KEY');
  console.error('   - Value: sk-your-actual-api-key-here');
  console.error('   - Environment: Production');
  console.error('4. Save and redeploy');
  console.error('');
  console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

/**
 * ==========================================
 * OpenAI Client Initialization
 * ==========================================
 * 
 * This client will be used by API routes to interact with OpenAI's API.
 * The client is configured with the API key from environment variables.
 * 
 * ⚠️ IMPORTANT: This client should ONLY be imported and used in:
 * - API routes (/api/*)
 * - Server components (components using 'use server')
 * - Server-side utilities
 * 
 * ❌ NEVER import this in:
 * - Client components ('use client')
 * - Browser-side code
 * - Frontend utilities
 */
export const openai = new OpenAI({
  apiKey: apiKey || undefined, // Use undefined for better error messages
  // Optional: Add custom configuration
  timeout: 30000, // 30 seconds timeout
  maxRetries: 2, // Retry failed requests twice
});

/**
 * ==========================================
 * Configuration Status Helpers
 * ==========================================
 */

/**
 * Check if OpenAI is properly configured
 * 
 * @returns {boolean} True if the API key is valid and OpenAI client is ready
 * 
 * Usage in API routes:
 * ```typescript
 * if (!isOpenAIConfigured()) {
 *   return NextResponse.json({ error: 'OpenAI not configured' }, { status: 503 });
 * }
 * ```
 */
export function isOpenAIConfigured(): boolean {
  return isValidApiKey;
}

/**
 * Get configuration status for debugging
 * 
 * @returns {object} Configuration status details
 * 
 * Usage for debugging:
 * ```typescript
 * const status = getConfigStatus();
 * console.log('OpenAI config:', status);
 * ```
 * 
 * ⚠️ WARNING: Only use in development mode. Don't expose in production responses.
 */
export function getConfigStatus() {
  return {
    hasApiKey: !!apiKey,
    isValid: isValidApiKey,
    keyPrefix: apiKey ? `${apiKey.substring(0, 7)}...` : 'NOT_SET',
    keyLength: apiKey?.length || 0,
    environment: process.env.NODE_ENV || 'development',
  };
}

/**
 * ==========================================
 * Export Default Client
 * ==========================================
 */
export default openai;