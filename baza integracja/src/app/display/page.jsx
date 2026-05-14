'use client'

import Link from 'next/link'
import { getSongData } from '@/app/actions/song_modify'
import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

export default function Display() {
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  useEffect(() => {
    async function fetchSong() {
      try {
        const data = await getSongData(id)

        setSong(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSong()
  }, [])

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
        {Object.entries(song).map(([key, value]) => (
          <div key={key} className="song-field">
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}