# Forgot Password Feature - Setup & Troubleshooting

## Overview

The "Forgot Password" feature allows users to reset their password through a secure email-based recovery flow.

**Flow:**
1. User navigates to `/forgot-password` and enters their email
2. Supabase sends a recovery email with a secure link containing recovery tokens
3. User clicks the link → redirected to `/auth/reset` with recovery session
4. User sets a new password → password is updated in Supabase

## Setup Requirements

### 1. Supabase Email Configuration

Your Supabase project must have email templates configured:

**Go to:** Supabase Dashboard → Authentication → Email Templates

- **Reset Password Template** must be enabled
- Verify the redirect URL is correct (should include `{{ confirmation_url }}`)
- Default redirect: `http://localhost:4028/auth/reset` (for local dev)

### 2. Environment Variables

Ensure `.env.local` contains valid Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Supabase Authentication Settings

**Go to:** Supabase Dashboard → Project Settings → Auth Settings

- **Confirm email** should be enabled if you want to verify user emails
- **Email templates** must be configured with the reset password template

## How It Works (Technical Details)

### Password Reset Request (`/forgot-password`)

```typescript
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://yoursite.com/auth/reset'
});
```

**What Supabase does:**
1. Looks up the user by email
2. Generates recovery tokens (access_token, refresh_token, type=recovery)
3. Sends email with link: `https://yoursite.com/auth/reset#access_token=...&type=recovery`

### Password Reset Completion (`/auth/reset`)

The recovery link contains tokens in the URL fragment (`#`). The Supabase client automatically:
1. Detects `#access_token=...` in the URL
2. Restores the session using those tokens
3. Recognizes the session type as "recovery"

Then:
```typescript
const { error } = await supabase.auth.updateUser({ password: newPassword });
```

With an active recovery session, `updateUser` can change the password without needing the old password.

## Troubleshooting

### ❌ "No recovery session found" Error

**Cause:** User landed on `/auth/reset` without proper recovery tokens in the URL.

**Solutions:**
1. Check that the recovery email link contains `#access_token=` and `&type=recovery`
2. Verify Supabase email template has correct redirect URL
3. Ensure `detectSessionInUrl: true` in Supabase client config (✅ already set)

### ❌ Recovery Email Never Arrives

**Cause:** Email sending might be disabled or rate-limited in Supabase.

**Solutions:**
1. Check Supabase Dashboard → Logs for email errors
2. Verify SMTP settings if using custom email provider
3. Check spam folder (might be marked as spam)
4. Ensure user email exists in your auth system

### ❌ "Unable to update password" After Setting New Password

**Possible causes:**
- Recovery session expired (tokens are time-limited, usually 1 hour)
- Password is same as current password
- Supabase RLS policy prevents updates

**Solutions:**
1. Request a new recovery email
2. Ensure new password is different from current one
3. Check Supabase RLS policies on `auth.users` table

### ❌ "Session Verification Failed" on Page Load

**Cause:** Recovery session check failed or session wasn't restored.

**Solutions:**
1. Manually click the recovery link from the email again
2. Check browser console for errors: `F12 → Console`
3. Verify Supabase URL/key are correct in `.env.local`

## Testing Locally

### Using Supabase Auth Emails (Default)

```bash
# 1. Ensure .env.local has valid Supabase credentials
# 2. Start dev server
npm run dev

# 3. Go to http://localhost:4028/forgot-password
# 4. Enter a user's email
# 5. Check Supabase Dashboard → Authentication → Users (to confirm user exists)
# 6. Use Supabase email service (requires SMTP configured in Supabase)
```

### Using Supabase "Testing Email" (for development)

In Supabase Dashboard:
1. Go to Authentication → Settings → Email Settings
2. Ensure emails are enabled
3. Some projects provide a test email address

### Manual Testing (Without Real Email)

For testing without sending real emails:

1. Use Supabase CLI to generate a recovery token:
   ```bash
   supabase gen access-token
   ```

2. Manually construct the recovery URL:
   ```
   http://localhost:4028/auth/reset#access_token=YOUR_TOKEN&refresh_token=YOUR_REFRESH&type=recovery&expires_at=TIMESTAMP
   ```

3. Paste into browser

## Key Files

- **Request page:** `src/app/forgot-password/page.tsx`
- **Reset page:** `src/app/auth/reset/page.tsx`
- **Auth context:** `src/contexts/AuthContext.tsx` (requestPasswordReset, updatePassword methods)
- **Login page:** `src/app/login/page.tsx` (has "Forgot password?" link)

## Security Notes

✅ **Safe to use in production:**
- Recovery tokens are single-use and time-limited
- Tokens are only valid for password reset (type=recovery)
- Email-based verification prevents unauthorized password resets
- Session automatically invalidates after password is changed

⚠️ **Best Practices:**
1. Enable email verification in Supabase Auth settings
2. Set appropriate token expiration (usually 1 hour)
3. Log password reset events for security auditing
4. Monitor failed reset attempts (brute force attacks)

## Next Steps

1. ✅ Configure Supabase email templates
2. ✅ Test recovery flow locally
3. ✅ Deploy to production
4. ✅ Monitor recovery emails in production logs

For issues, check Supabase documentation: https://supabase.com/docs/guides/auth/passwords
