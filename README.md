# 🎬 Universal Video Portal

A Next.js 15 application for sharing and viewing videos from multiple platforms (YouTube, Vimeo, TikTok, etc.) with zero storage costs.

## ✨ Features

- 🎥 **Multi-platform Support**: YouTube, Vimeo, TikTok, Facebook, Twitch, and more
- 🔐 **Authentication**: Supabase Auth with email/password
- 📊 **View Tracking**: Automatic view counter for each video
- 🎨 **Modern UI**: Tailwind CSS with responsive design
- 🔒 **Protected Routes**: Authentication required to add videos
- 🚀 **SEO-Friendly**: Dynamic metadata for social sharing
- 💰 **Zero Cost**: No video storage, only URLs

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Authentication
- **Video Player**: react-player
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/kush27082000/video-portal.git
cd video-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up Supabase database:
Run the SQL from `supabase-setup.sql` in your Supabase SQL Editor

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📖 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [supabase-setup.sql](./supabase-setup.sql) - Database schema

## 🔒 Security

- Never commit `.env.local` file
- Use environment variables for all secrets
- Rotate Supabase keys if exposed
- Enable Row Level Security (RLS) in Supabase

## 📝 License

MIT

## 👤 Author

**kush27082000**
- GitHub: [@kush27082000](https://github.com/kush27082000)
- Email: kushagrasoni27082000@gmail.com

---

Built with ❤️ using Next.js and Supabase
