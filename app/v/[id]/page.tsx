import { createClient } from '@/lib/supabase/server'
import VideoPlayer from '@/components/VideoPlayer'
import ShareButton from '@/components/ShareButton'
import { Video } from '@/lib/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface VideoPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (!video) {
    return {
      title: 'Video Not Found',
    }
  }

  const typedVideo = video as Video

  return {
    title: typedVideo.title || 'Watch Video - VideoPortal',
    description: `Watch this video on VideoPortal - ${typedVideo.view_count} views`,
    openGraph: {
      title: typedVideo.title || 'Watch Video',
      description: `${typedVideo.view_count} views`,
      images: typedVideo.thumbnail_url ? [typedVideo.thumbnail_url] : [],
      type: 'video.other',
    },
    twitter: {
      card: 'player',
      title: typedVideo.title || 'Watch Video',
      images: typedVideo.thumbnail_url ? [typedVideo.thumbnail_url] : [],
    },
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: video, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !video) {
    notFound()
  }

  const typedVideo = video as Video

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <VideoPlayer 
        videoId={typedVideo.id} 
        url={typedVideo.url}
        title={typedVideo.title}
      />

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-6 text-gray-600">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-semibold">{typedVideo.view_count.toLocaleString()} views</span>
          </div>
          
          {typedVideo.platform && (
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold uppercase">
                {typedVideo.platform}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ShareButton />
        </div>
      </div>

      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Original URL:</p>
        <a 
          href={typedVideo.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline break-all"
        >
          {typedVideo.url}
        </a>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Gallery
        </Link>
      </div>
    </div>
  )
}
