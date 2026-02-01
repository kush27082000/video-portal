// Utility functions for fetching video metadata
// This can be extended with Microlink SDK or other services

export async function fetchVideoMetadata(url: string): Promise<{
  title: string | null
  thumbnail: string | null
}> {
  try {
    // For now, we'll extract basic info from the URL
    // In production, you can use Microlink SDK or similar services
    
    // YouTube specific extraction
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = extractYouTubeId(url)
      if (videoId) {
        return {
          title: `YouTube Video ${videoId}`,
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }
      }
    }

    // Vimeo specific extraction
    if (url.includes('vimeo.com')) {
      const videoId = extractVimeoId(url)
      if (videoId) {
        return {
          title: `Vimeo Video ${videoId}`,
          thumbnail: null
        }
      }
    }

    return {
      title: null,
      thumbnail: null
    }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return {
      title: null,
      thumbnail: null
    }
  }
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
    /(?:youtube\.com\/shorts\/)([^?]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}
