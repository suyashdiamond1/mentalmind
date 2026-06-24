#!/usr/bin/env node
/*
Enable Google provider for Supabase project via Admin API.
Runs on a trusted server. Do NOT store secrets in source.

Usage (PowerShell example):
$env:SUPABASE_URL='https://<project>.supabase.co'; \
$env:SUPABASE_SERVICE_ROLE_KEY='sb_secret_...'; \
$env:GOOGLE_CLIENT_ID='...apps.googleusercontent.com'; \
$env:GOOGLE_CLIENT_SECRET='...'; \
node scripts/enable-google-provider.mjs
*/

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error('Missing required env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET')
  process.exit(1)
}

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
})

async function run() {
  try {
    // Try to get existing custom provider
    try {
      const { data: existing } = await supabase.auth.admin.customProviders.getProvider('custom:google')
      console.log('Existing provider found, updating...')
      const { data, error } = await supabase.auth.admin.customProviders.updateProvider('custom:google', {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        enabled: true
      })
      if (error) {
        console.error('Supabase admin API error (update):', error)
        process.exit(1)
      }
      console.log('Provider update response:')
      console.log(JSON.stringify(data, null, 2))
    } catch (getErr) {
      // If provider doesn't exist, create a custom OIDC provider for Google
      console.log('Provider not found, creating custom provider for Google...')
      const params = {
        identifier: 'custom:google',
        name: 'Google',
        type: 'oidc',
        issuer: 'https://accounts.google.com',
        discovery_url: 'https://accounts.google.com/.well-known/openid-configuration',
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        enabled: true
      }

      const { data, error } = await supabase.auth.admin.customProviders.createProvider(params)
      if (error) {
        console.error('Supabase admin API error (create):', error)
        process.exit(1)
      }
      console.log('Provider create response:')
      console.log(JSON.stringify(data, null, 2))
    }
  } catch (err) {
    console.error('Request failed:', err)
    process.exit(1)
  }
}

run()
