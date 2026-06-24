import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Provide SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
})

console.log('supabase.auth keys:', Object.keys(supabase.auth || {}))
console.log('supabase.auth.admin exists:', Boolean(supabase.auth && supabase.auth.admin))
if (supabase.auth && supabase.auth.admin) {
  console.log('admin keys:', Object.keys(supabase.auth.admin))
  if (supabase.auth.admin.customProviders) {
    console.log('admin.customProviders keys:', Object.keys(supabase.auth.admin.customProviders))
    for (const k of Object.keys(supabase.auth.admin.customProviders)) {
      console.log(`customProviders.${k}:`, typeof supabase.auth.admin.customProviders[k])
    }
  }
  if (supabase.auth.admin.oauth) {
    console.log('admin.oauth keys:', Object.keys(supabase.auth.admin.oauth))
    for (const k of Object.keys(supabase.auth.admin.oauth)) {
      console.log(`oauth.${k}:`, typeof supabase.auth.admin.oauth[k])
    }
  }
}
