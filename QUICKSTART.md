# 🚀 Quick Start Guide

Get VideoPortal running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free)

---

## ⚡ Fast Setup

### 1️⃣ Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Copy all SQL from `supabase-setup.sql` → Paste in SQL Editor → Run
3. Go to Settings → API → Copy these 3 values:
   - Project URL
   - anon key
   - service_role key

### 2️⃣ Local Setup (1 minute)

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and paste your 3 Supabase values
```

### 3️⃣ Run (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## 🎬 First Video

1. Click **Sign Up** → Create account
2. Click **Add Video** → Paste a YouTube URL
3. Watch your video! 🎥

---

## 📦 What You Get

✅ Multi-platform video support (YouTube, Vimeo, TikTok, etc.)  
✅ User authentication  
✅ View counter  
✅ SEO optimization  
✅ Responsive design  
✅ $0 hosting cost  

---

## 📚 Next Steps

- **Detailed Setup**: Read `SETUP.md`
- **Deployment**: Read `DEPLOYMENT.md`
- **Customization**: Read `README.md`

---

## 🆘 Issues?

**Can't connect to Supabase?**
- Check `.env.local` has correct values
- Restart dev server: `Ctrl+C` then `npm run dev`

**Authentication not working?**
- Go to Supabase → Authentication → Providers → Enable Email

**Videos not loading?**
- Make sure you ran `supabase-setup.sql` completely

**Other issues?**
- Check `SETUP.md` Troubleshooting section

---

## 🎯 Test URLs

Try these videos:

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://vimeo.com/148751763
```

---

**That's it! You're ready to go! 🚀**

For detailed instructions, see `SETUP.md`
