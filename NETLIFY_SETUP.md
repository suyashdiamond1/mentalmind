# Netlify Deployment Setup Guide

This guide will help you properly configure your AI Nexus application for deployment on Netlify.

## 📋 Prerequisites

Before deploying to Netlify, ensure you have:

1. ✅ A Netlify account (sign up at https://netlify.com)
2. ✅ Your OpenAI API key (get it from https://platform.openai.com/api-keys)
3. ✅ Your Supabase credentials (from your Supabase project dashboard)

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Project

1. Commit all your code changes to your Git repository
2. Ensure your `.env` file is **NOT** committed (it should be in `.gitignore`)
3. Make note of all environment variables you're using locally

### Step 2: Connect to Netlify

1. Log in to your Netlify dashboard (https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your AI Nexus repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 18 or higher

### Step 3: Configure Environment Variables (CRITICAL!)

This is the most important step for your chatbot to work in production!

1. In your Netlify site dashboard, go to:
   ```
   Site settings → Environment variables
   ```

2. Add the following environment variables:

   #### Required for Supabase:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

   #### Required for OpenAI Chatbot:
   ```
   OPENAI_API_KEY=sk-your_openai_api_key_here
   ```

   **Important Notes:**
   - The OpenAI API key must start with `sk-`
   - Do NOT include quotes around the values
   - Copy the exact values from your local `.env` file
   - The `NEXT_PUBLIC_` prefix makes variables accessible in the browser
   - The `OPENAI_API_KEY` should NOT have `NEXT_PUBLIC_` prefix (it's server-side only for security)

3. Click "Save" after adding each variable

### Step 4: Deploy

1. After adding all environment variables, click "Deploy site"
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-site-name.netlify.app`

### Step 5: Test Your Deployment

1. Visit your deployed site URL
2. Try creating an account and logging in
3. Navigate to the Chat page
4. Send a test message to verify the OpenAI chatbot is working
5. Check that all features are functioning correctly

## 🔍 Troubleshooting

### Chatbot Shows "Please try again" Error

**Cause:** OpenAI API key is not configured or invalid

**Solutions:**
1. Verify the `OPENAI_API_KEY` is added to Netlify environment variables
2. Ensure the API key starts with `sk-` and is complete
3. Check that the API key is active in your OpenAI dashboard
4. Verify you have available credits in your OpenAI account
5. Redeploy the site after adding/updating environment variables

### Database Connection Issues

**Cause:** Supabase credentials are missing or incorrect

**Solutions:**
1. Verify both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
2. Check for typos in the environment variable names
3. Ensure you're using the correct values from your Supabase dashboard
4. Redeploy after correcting the variables

### Build Failures

**Cause:** Various reasons including dependencies or code errors

**Solutions:**
1. Check the build logs in Netlify for specific error messages
2. Ensure all dependencies are properly listed in `package.json`
3. Try running `npm run build` locally to catch build errors
4. Verify your Node.js version matches Netlify's requirements

### Site Not Updating After Changes

**Cause:** Cache or deployment issues

**Solutions:**
1. Clear Netlify's cache: Site settings → Build & deploy → Clear cache
2. Trigger a new deployment: Deploys → Trigger deploy → Clear cache and deploy site
3. Ensure your latest changes are committed and pushed to your repository

## 📱 Monitoring Your Site

### Check Build Logs

1. Go to: Deploys → Click on latest deploy
2. Review the build logs for any warnings or errors
3. Check function logs for runtime errors

### Monitor API Usage

1. **OpenAI Dashboard:** https://platform.openai.com/usage
   - Monitor your API usage and costs
   - Check for any rate limit issues
   - Ensure you have sufficient credits

2. **Supabase Dashboard:** https://app.supabase.com
   - Monitor database queries
   - Check authentication logs
   - Review API usage

## 🔐 Security Best Practices

1. **Never commit environment variables** to your repository
2. **Rotate API keys regularly** for security
3. **Monitor your OpenAI usage** to prevent unexpected charges
4. **Use Supabase RLS policies** to protect user data
5. **Keep dependencies updated** to patch security vulnerabilities

## 📞 Getting Help

If you encounter issues:

1. **Check Netlify Docs:** https://docs.netlify.com
2. **OpenAI Support:** https://help.openai.com
3. **Supabase Support:** https://supabase.com/support
4. **Project Support:** studentaihelp@gmail.com

## ✅ Deployment Checklist

Before going live, verify:

- [ ] All environment variables are configured in Netlify
- [ ] OpenAI API key is valid and has credits
- [ ] Supabase project is active and accessible
- [ ] Build completes successfully without errors
- [ ] Chat functionality works in production
- [ ] User authentication works correctly
- [ ] All pages load without errors
- [ ] Mobile responsiveness is working
- [ ] SSL certificate is active (https)

## 🎉 Success!

Once everything is configured correctly:
- Your AI Nexus chatbot will be live and accessible
- Students can access mental health support 24/7
- All conversations are securely stored in Supabase
- The chatbot will provide empathetic, helpful responses

Remember to monitor your OpenAI usage and costs regularly!