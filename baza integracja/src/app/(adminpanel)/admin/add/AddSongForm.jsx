'use client'

import { createSong } from '@/app/actions/song_modify'
import { useState } from 'react'

export default function AddSongForm({ artists, albums  }) {
  const [error, setError] = useState('')
  const [albumChoice, setAlbumChoice] = useState('')
  const [loading, setLoading] = useState(false)
  const [artistChoice, setArtistChoice] = useState('')

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
      <section className="flex-1 p-6 md:p-12">
        <div className="dodajuttt">
          <h1 className="text-4xl font-bold">Dodaj Utwór</h1>
        </div>

        <div className="max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div>
                <label className="block mb-2 text-sm text-zinc-400">
                  Artist
                </label>

                <select
                  name="artist_id"
                  value={artistChoice}
                  onChange={(e) => setArtistChoice(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Wybierz artystę</option>

                  {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}

                  <option value="new">Inny...</option>
                </select>

                {artistChoice === 'new' && (
                  <input
                    type="text"
                    name="new_artist_name"
                    placeholder="Nazwa nowego artysty"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                  />
                )}
                </div>

                <div>
                <label className="block mb-2 text-sm text-zinc-400">
                    Album
                </label>

                <select
                    name="album_id"
                    value={albumChoice}
                    onChange={(e) => setAlbumChoice(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Wybierz album</option>

                    {albums.map(album => (
                    <option key={album.id} value={album.id}>
                        {album.name} — {album.artist}
                    </option>
                    ))}

                    <option value="new">Inny...</option>
                </select>

                {albumChoice === 'new' && (
                    <input
                    type="text"
                    name="new_album_name"
                    placeholder="Nazwa nowego albumu"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                )}
                </div>

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

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

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