'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { validateVideoUrl } from '@/lib/utils/videoValidator'
import { fetchVideoMetadata } from '@/lib/utils/metadata'

export default function AddVideoForm() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate URL
    const validation = validateVideoUrl(url)
    if (!validation.valid) {
      setError(validation.error || 'Invalid URL')
      setLoading(false)
      return
    }

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('You must be logged in to add videos')
        setLoading(false)
        return
      }

      // Fetch metadata
      const metadata = await fetchVideoMetadata(url)

      // Insert video
      const { data, error: insertError } = await supabase
        .from('videos')
        .insert({
          url: url.trim(),
          title: metadata.title,
          thumbnail_url: metadata.thumbnail,
          platform: validation.platform,
          user_id: user.id,
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      // Redirect to the new video page
      router.push(`/v/${data.id}`)
      router.refresh()
    } catch (err) {
      console.error('Error adding video:', err)
      setError('Failed to add video. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Video</h2>
        
        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            disabled={loading}
            required
          />
          <p className="mt-2 text-sm text-gray-500">
            Supports YouTube, Vimeo, TikTok, Facebook, Twitch, DailyMotion, and more
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {loading ? 'Adding Video...' : 'Add Video'}
        </button>
      </div>
    </form>
  )
}
