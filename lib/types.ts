export interface Video {
  id: string;
  url: string;
  title: string | null;
  thumbnail_url: string | null;
  platform: string | null;
  view_count: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface VideoView {
  id: string;
  video_id: string;
  viewer_ip: string | null;
  viewed_at: string;
}

export type VideoInsert = Omit<Video, 'id' | 'created_at' | 'updated_at' | 'view_count'>;

export type Platform = 'youtube' | 'vimeo' | 'tiktok' | 'facebook' | 'twitch' | 'dailymotion' | 'other';
