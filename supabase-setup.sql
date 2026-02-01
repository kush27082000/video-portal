-- VideoPortal Supabase Database Setup
-- Run these commands in your Supabase SQL Editor

-- ============================================
-- 1. CREATE VIDEOS TABLE
-- ============================================

CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  thumbnail_url TEXT,
  platform TEXT,
  view_count INTEGER DEFAULT 0,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_videos_view_count ON videos(view_count DESC);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE RLS POLICIES
-- ============================================

-- Anyone can read videos
CREATE POLICY "Videos are viewable by everyone" 
ON videos FOR SELECT 
USING (true);

-- Authenticated users can insert their own videos
CREATE POLICY "Users can insert their own videos" 
ON videos FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own videos
CREATE POLICY "Users can update their own videos" 
ON videos FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own videos
CREATE POLICY "Users can delete their own videos" 
ON videos FOR DELETE 
USING (auth.uid() = user_id);

-- ============================================
-- 5. CREATE VIDEO_VIEWS TABLE (Optional - for detailed tracking)
-- ============================================

CREATE TABLE video_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_video_views_video_id ON video_views(video_id);
CREATE INDEX idx_video_views_ip ON video_views(viewer_ip);

-- ============================================
-- 6. CREATE RPC FUNCTION FOR VIEW COUNTER
-- ============================================

CREATE OR REPLACE FUNCTION increment_view_count(video_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE videos 
  SET view_count = view_count + 1,
      updated_at = TIMEZONE('utc', NOW())
  WHERE id = video_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. CREATE FUNCTION TO AUTO-UPDATE updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 8. CREATE TRIGGER FOR AUTO-UPDATE
-- ============================================

CREATE TRIGGER update_videos_updated_at 
BEFORE UPDATE ON videos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SETUP COMPLETE!
-- ============================================

-- Next steps:
-- 1. Enable Email authentication in Supabase Dashboard:
--    Authentication > Providers > Enable Email
-- 
-- 2. (Optional) Configure email templates:
--    Authentication > Email Templates
-- 
-- 3. Copy your API keys to .env.local:
--    Project Settings > API
--    - Copy NEXT_PUBLIC_SUPABASE_URL
--    - Copy NEXT_PUBLIC_SUPABASE_ANON_KEY
--    - Copy SUPABASE_SERVICE_ROLE_KEY (keep this secret!)
