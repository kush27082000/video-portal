import { createClient } from '@/lib/supabase/server'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/lib/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()
  
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error fetching videos:', error)
  }

  const videosList = (videos as Video[]) || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Universal Video Gallery
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Share and watch videos from YouTube, Vimeo, TikTok, and more - all in one place
        </p>
        <Link
          href="/add-video"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Your Video
        </Link>
      </div>

      {/* Videos Grid */}
      {videosList.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No videos yet
          </h2>
          <p className="text-gray-500 mb-6">
            Be the first to add a video to the gallery!
          </p>
          <Link
            href="/add-video"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Add First Video
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Latest Videos ({videosList.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosList.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
