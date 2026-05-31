'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAlbumData } from '@/app/actions/album_modify'

export default function AlbumPage() {
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    async function fetchAlbum() {
      if (!id) {
        setLoading(false)
        return
      }

      const data = await getAlbumData(id)
      setAlbum(data)
      setLoading(false)
    }

    fetchAlbum()
  }, [id])

  if (loading) {
    return <p>Ładowanie albumu...</p>
  }

  if (!album) {
    return <p>Nie znaleziono albumu.</p>
  }

  return (
    <main className="album-page">
      <section className="album-header">
        <h1>{album.name}</h1>

        <p>
          <strong>Artysta:</strong> {album.artist}
        </p>

        <p>
          <strong>Data wydania:</strong> {album.release_date}
        </p>

        <p>
          <strong>Liczba utworów:</strong> {album.tracks_count}
        </p>

        <p>
          <strong>Polubienia:</strong> {album.likes_count}
        </p>
      </section>

      <section className="album-tracks">
        <h2>Utwory w albumie</h2>

        {album.tracks.length === 0 ? (
          <p>Brak utworów w tym albumie.</p>
        ) : (
          <div className="album-track-list">
            {album.tracks.map(track => (
              <Link
                key={track.id}
                href={`/display?id=${track.id}`}
                className="album-track"
              >
                <span>{track.title}</span>
                <span>{track.duration}s</span>
                <span>❤️ {track.likes_count}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}