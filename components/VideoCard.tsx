import Link from 'next/link'
import { Video } from '@/lib/types'
import Image from 'next/image'

interface VideoCardProps {
  video: Video
}

const platformColors: Record<string, string> = {
  youtube: 'bg-red-500',
  vimeo: 'bg-blue-500',
  tiktok: 'bg-black',
  facebook: 'bg-blue-600',
  twitch: 'bg-purple-600',
  dailymotion: 'bg-orange-500',
  other: 'bg-gray-600',
}

export default function VideoCard({ video }: VideoCardProps) {
  const platformColor = platformColors[video.platform || 'other'] || platformColors.other

  return (
    <Link href={`/v/${video.id}`}>
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
        <div className="relative aspect-video bg-gray-200">
          {video.thumbnail_url ? (
            <Image
              src={video.thumbnail_url}
              alt={video.title || 'Video thumbnail'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <div className="text-6xl">🎬</div>
            </div>
          )}
          <div className={`absolute top-2 right-2 ${platformColor} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase`}>
            {video.platform || 'video'}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {video.title || 'Untitled Video'}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{video.view_count.toLocaleString()} views</span>
            </div>
            
            <div className="text-gray-500">
              {new Date(video.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
