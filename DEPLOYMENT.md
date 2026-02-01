# 🚀 Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free)
- Supabase project set up

## Step 1: Prepare Environment Variables

Get your Supabase credentials from your Supabase dashboard:
- Project Settings → API
- Copy the Project URL
- Copy the `anon` public key
- Copy the `service_role` key (keep secret!)

## Step 2: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/video-portal.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [your-project-url]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [your-anon-key]
   SUPABASE_SERVICE_ROLE_KEY = [your-service-role-key]
   ```

5. Click "Deploy"
6. Wait for deployment (2-3 minutes)
7. Your site is live! 🎉

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Step 4: Update Supabase Settings

After deployment, add your Vercel URL to Supabase:

1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Add Site URL: `https://your-app.vercel.app`
4. Add Redirect URLs:
   - `https://your-app.vercel.app/**`

## Step 5: Test Your Deployment

1. Visit your live URL
2. Sign up for an account
3. Add a video
4. Verify everything works!

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:
```bash
git add .
git commit -m "Update features"
git push
```

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Authentication Not Working
- Verify Supabase URL configuration
- Check environment variables
- Ensure RLS policies are set correctly

### Videos Not Loading
- Check Supabase connection
- Verify database tables exist
- Check browser console for errors

## 🔐 Security Best Practices

- Never commit `.env.local` file
- Use environment variables for secrets
- Rotate keys if exposed
- Enable HTTPS only
- Set up proper CORS in Supabase

---

**Need help?** Open an issue on GitHub!
