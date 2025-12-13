# 🚀 Deployment Guide

This guide will help you deploy your Student Mental Health Support application to production with proper environment variable configuration.

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ A Supabase account and project set up
2. ✅ An OpenAI API account with billing configured
3. ✅ A Netlify or Vercel account

## 🔑 Environment Variables

Your application requires these environment variables to work in production:

### Required Variables

| Variable Name | Type | Description | Where to Get It |
|--------------|------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Your Supabase project URL | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous/public key | [Supabase Dashboard](https://app.supabase.com) → Project Settings → API |
| `OPENAI_API_KEY` | **Private** | OpenAI API key for server-side use | [OpenAI Platform](https://platform.openai.com/api-keys) |

⚠️ **CRITICAL**: `OPENAI_API_KEY` is server-side only and should NEVER be exposed to the browser!

## 🎯 Deployment Steps

### Option 1: Netlify Deployment

#### Step 1: Connect Your Repository
1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, etc.)
4. Select your repository

#### Step 2: Configure Build Settings
```
Build command: npm run build
Publish directory: .next
```

#### Step 3: Add Environment Variables
1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add each variable:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

4. Click **Save**

#### Step 4: Deploy
1. Click **Deploy site**
2. Wait for build to complete
3. Verify deployment logs show no environment variable errors

#### Step 5: Verify Production Build
1. Visit your deployed site URL
2. Test the chat functionality
3. Check browser console for errors (F12 → Console)
4. Verify OpenAI responses work correctly

### Option 2: Vercel Deployment

#### Step 1: Connect Your Repository
1. Log in to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository

#### Step 2: Configure Environment Variables
1. In project setup, scroll to **Environment Variables**
2. Add each variable for **Production** environment:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Step 3: Deploy
1. Click **Deploy**
2. Wait for build to complete
3. Check deployment logs

#### Step 4: Verify
1. Visit your production URL
2. Test all functionality
3. Monitor logs in Vercel dashboard

## 🔍 Troubleshooting

### Issue: "OpenAI API key is not configured"

**Symptoms:**
- Chat returns error message about API key
- Server logs show configuration errors

**Solutions:**
1. ✅ Verify `OPENAI_API_KEY` is set in deployment platform
2. ✅ Check the key starts with `sk-proj-` or `sk-`
3. ✅ Ensure no extra spaces in the key value
4. ✅ Redeploy after adding variables

### Issue: "Supabase connection failed"

**Symptoms:**
- Login/signup doesn't work
- Database operations fail

**Solutions:**
1. ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` format: `https://xxx.supabase.co`
2. ✅ Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the anon/public key, not service role key
3. ✅ Ensure keys are from the correct Supabase project
4. ✅ Clear browser cache and try again

### Issue: Build fails with "process.env.X is undefined"

**Solutions:**
1. ✅ Ensure all three variables are set in deployment platform
2. ✅ Check for typos in variable names (must match exactly)
3. ✅ Redeploy after fixing variables
4. ✅ Check build logs for specific error details

### Issue: Works locally but not in production

**Common Causes:**
1. ❌ Environment variables not set in deployment platform
2. ❌ Using development `.env` file values instead of production
3. ❌ OpenAI API key has insufficient credits
4. ❌ Supabase project URL/keys are incorrect

**Solutions:**
1. ✅ Double-check all environment variables in deployment settings
2. ✅ Use production-specific keys (not development keys)
3. ✅ Verify OpenAI account has billing configured
4. ✅ Test Supabase connection with production keys

## 🔐 Security Best Practices

### 1. Environment Variables
- ✅ Use different API keys for development and production
- ✅ Never commit `.env` files to version control
- ✅ Rotate keys regularly (every 90 days recommended)
- ✅ Use `.env.example` for documentation only

### 2. OpenAI API Key
- ✅ Only used in server-side code (`/api/*` routes)
- ✅ Never exposed to browser/client-side
- ✅ Set usage limits in OpenAI dashboard
- ✅ Monitor usage to detect anomalies

### 3. Supabase Keys
- ✅ Use anon key for client-side (safe for browser)
- ✅ Never expose service role key
- ✅ Configure Row Level Security (RLS) policies
- ✅ Enable email verification for auth

## 📊 Monitoring Production

### Recommended Monitoring

1. **OpenAI Usage**
   - Monitor API usage in [OpenAI Dashboard](https://platform.openai.com/usage)
   - Set up billing alerts
   - Track token consumption

2. **Supabase Metrics**
   - Monitor database connections in Supabase Dashboard
   - Track authentication events
   - Review query performance

3. **Application Logs**
   - Check deployment logs for errors
   - Monitor server-side errors
   - Track user-reported issues

### Key Metrics to Watch

| Metric | Tool | Alert Threshold |
|--------|------|-----------------|
| OpenAI API errors | Server logs | > 5% error rate |
| Database connection failures | Supabase | > 1% failure rate |
| Build failures | Netlify/Vercel | Any failure |
| API response time | Server logs | > 5 seconds |

## 🆘 Support Resources

### OpenAI
- [API Documentation](https://platform.openai.com/docs)
- [Status Page](https://status.openai.com)
- [Support](https://help.openai.com)

### Supabase
- [Documentation](https://supabase.com/docs)
- [Status Page](https://status.supabase.com)
- [Community Support](https://github.com/supabase/supabase/discussions)

### Netlify
- [Documentation](https://docs.netlify.com)
- [Status Page](https://www.netlifystatus.com)
- [Support Forum](https://answers.netlify.com)

### Vercel
- [Documentation](https://vercel.com/docs)
- [Status Page](https://www.vercel-status.com)
- [Support](https://vercel.com/support)

## ✅ Post-Deployment Checklist

After deploying, verify:

- [ ] Application loads without errors
- [ ] User registration/login works
- [ ] Chat functionality with OpenAI works
- [ ] Database operations succeed
- [ ] No console errors in browser
- [ ] Environment variables are set correctly
- [ ] Build completed successfully
- [ ] SSL certificate is active (https://)
- [ ] All API routes respond correctly
- [ ] Mobile responsiveness works

## 🔄 Updating Environment Variables

If you need to update variables after deployment:

### Netlify
1. Go to Site settings → Environment variables
2. Find the variable to update
3. Click "Edit" and change value
4. Trigger a new deployment

### Vercel
1. Go to Project Settings → Environment Variables
2. Find the variable to update
3. Edit the value
4. Redeploy to apply changes

⚠️ **Important**: Always redeploy after changing environment variables!

---

## 🎉 Success!

If you've followed this guide and all checks pass, your application is now live and production-ready!

Remember to:
- Monitor your API usage regularly
- Keep dependencies updated
- Backup your Supabase database
- Review security settings periodically

Need help? Check the troubleshooting section or reach out to the support resources listed above.