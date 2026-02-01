import { Platform } from '../types'

export const detectPlatform = (url: string): Platform => {
  const patterns: Record<string, RegExp> = {
    youtube: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)/i,
    vimeo: /vimeo\.com/i,
    tiktok: /tiktok\.com/i,
    facebook: /facebook\.com\/.*\/videos/i,
    twitch: /twitch\.tv/i,
    dailymotion: /dailymotion\.com/i,
  }

  for (const [platform, pattern] of Object.entries(patterns)) {
    if (pattern.test(url)) {
      return platform as Platform
    }
  }
  return 'other'
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateVideoUrl = (url: string): { valid: boolean; platform: Platform | null; error?: string } => {
  if (!url || url.trim() === '') {
    return { valid: false, platform: null, error: 'URL is required' }
  }

  if (!isValidUrl(url)) {
    return { valid: false, platform: null, error: 'Invalid URL format' }
  }

  const platform = detectPlatform(url)
  
  return { valid: true, platform }
}
