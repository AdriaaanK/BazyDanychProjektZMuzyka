import Link from 'next/link'
import { getPlaylistData } from '@/app/actions/playlists'

export default async function PlaylistDetailPage({ params }) {
  const { id } = await params
  const playlist = await getPlaylistData(id)

  if (!playlist) {
    return <main className="p-8 text-white">Nie znaleziono playlisty.</main>
  }

  return (
    <main className="p-8 text-white bg-zinc-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
      <p className="text-zinc-300 mb-6">{playlist.description || 'Brak opisu'}</p>

      {playlist.tracks.length === 0 ? (
        <p>Ta playlista nie ma jeszcze utworów.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {playlist.tracks.map(track => (
            <Link
              key={track.id}
              href={`/display?id=${track.id}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-green-500"
            >
              <h2 className="text-xl font-semibold">{track.title}</h2>
              <p className="text-zinc-300">{track.artist}</p>
              <p className="text-zinc-400 text-sm">{track.genre} • {track.duration}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
