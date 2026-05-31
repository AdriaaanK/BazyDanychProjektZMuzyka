'use client'

import Link from 'next/link'
import { getSongData } from '@/app/actions/song_modify'
import { useEffect, useState } from 'react'
import { toggleLikeTrack, isTrackLiked } from '@/app/actions/likes'
import { useSearchParams } from 'next/navigation'

export default function Display() {
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  useEffect(() => {
    async function fetchSong() {
      try {
        const data = await getSongData(id)
        setSong(data)
        const likedStatus = await isTrackLiked(id)
        setLiked(likedStatus)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSong()
      }, [])
      async function handleLike() {
      const result = await toggleLikeTrack(id)

      if (result?.error) {
        alert(result.error)
        return
      }

      setLiked(result.liked)
    }
  if (loading) {
    return <p>Loading song...</p>
  }

  if (!song || !id) {
    return <p>Nie znaleziono piosenki.</p>
  }

  return (
    <>
    <div className="song-container">
      <h1>Song Information</h1>

      <div className="song-card">
        <div className="song-field">
          <strong>title:</strong> {song.title}
        </div>

        <div className="song-field">
          <strong>artist:</strong> {song.artist}
        </div>

        <div className="song-field">
          <strong>album:</strong>{' '}
          {song.album_id ? (
            <Link href={`/album?id=${song.album_id}`}>
              {song.album}
            </Link>
          ) : (
            song.album
          )}
        </div>

        <div className="song-field">
          <strong>genre:</strong> {song.genre}
        </div>

        <div className="song-field">
          <strong>duration:</strong> {song.duration}
        </div>

        <div className="song-field">
          <strong>release_date:</strong> {song.release_date}
        </div>

        <div className="song-field">
          <strong>likes_count:</strong> {song.likes_count}
        </div>
      </div>

      <button onClick={handleLike}>
        {liked ? '💔 Usuń z polubionych' : '❤️ Polub utwór'}
      </button>
      
    </div>
    </>
  )
}