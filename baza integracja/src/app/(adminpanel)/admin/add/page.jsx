'use client'

import Link from 'next/link'
import { createSong } from '@/app/actions/song_modify'
import { useState } from 'react'

export default function Create() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData) {
    setLoading(true)
    setError('')

    const result = await createSong(formData, formData.get('image'))

    if (result?.error) {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex">
      {/* Content */}
      <section className="flex-1 p-6 md:p-12">
        {/* Header */}
        <div className="dodajuttt">
          <h1 className="text-4xl font-bold">Dodaj Utwór</h1>
        </div>

        {/* Card */}
        <div className="max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <form action={handleSubmit} className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Song Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Blinding Lights"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Artist */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Artist
                </label>
                <input
                  type="text"
                  name="artist"
                  placeholder="The Weeknd"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Album */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Album
                </label>
                <input
                  type="text"
                  name="album"
                  placeholder="After Hours"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Genre */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  placeholder="Synthwave"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  name="duration"
                  min={1}
                  placeholder="203"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Release Date */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Release Date
                </label>
                <input
                  type="date"
                  name="release_date"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Likes */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Likes Count
                </label>
                <input
                  type="number"
                  name="likes_count"
                  min={0}
                  placeholder="1200"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Cover Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 file:mr-4 file:rounded-lg file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-white hover:file:bg-purple-500"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-500 transition px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Song'}
              </button>

            </div>
          </form>
        </div>
      </section>
    </main>
  )
}