'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
import { createClient } from '@/lib/supabase/client'

interface VideoPlayerProps {
  videoId: string
  url: string
  title?: string | null
}

export default function VideoPlayer({ videoId, url, title }: VideoPlayerProps) {
  const supabase = createClient()

  useEffect(() => {
    const trackView = async () => {
      try {
        await supabase.rpc('increment_view_count', { video_id: videoId })
      } catch (error) {
        console.error('Error tracking view:', error)
      }
    }

    trackView()
  }, [videoId, supabase])

  return (
    <div className="w-full">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          playing={false}
          light={false}
          config={{
            youtube: {
              playerVars: { showinfo: 1 }
            }
          }}
        />
      </div>
      {title && (
        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-4">
          {title}
        </h1>
      )}
    </div>
  )
}
