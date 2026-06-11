import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createPlaylist, getUserPlaylists } from '@/app/actions/playlists'

export default async function PlaylistsPage() {
  const playlists = await getUserPlaylists()

  if (!playlists) {
    redirect('/login')
  }

  return (
    <main className="p-8 text-white bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Twoje playlisty</h1>

      <form action={createPlaylist} className="mb-8 flex flex-col gap-3 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Nazwa playlisty"
          className="rounded px-3 py-2 text-black"
        />
        <textarea
          name="description"
          placeholder="Opis playlisty"
          className="rounded px-3 py-2 text-black"
        />
        <button type="submit" className="rounded bg-green-600 px-4 py-2 font-semibold">
          Utwórz playlistę
        </button>
      </form>

      {playlists.length === 0 ? (
        <p>Nie masz jeszcze żadnych playlist.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {playlists.map(playlist => (
            <Link
              key={playlist.id}
              href={`/playlists/${playlist.id}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-green-500"
            >
              <h2 className="text-xl font-semibold">{playlist.name}</h2>
              <p className="text-zinc-300 mt-1">{playlist.description || 'Brak opisu'}</p>
              <p className="text-sm text-zinc-400 mt-3">Utwory: {playlist.track_count}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
