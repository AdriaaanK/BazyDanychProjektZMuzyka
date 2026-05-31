import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getLikedTracks } from '@/app/actions/likes'

export default async function LikedPage() {
  const tracks = await getLikedTracks()

  if (tracks === null) {
    redirect('/login')
  }

  return (
    <main className="liked-page">
      <h1>Polubione utwory</h1>

      {tracks.length === 0 ? (
        <p>Nie masz jeszcze polubionych utworów.</p>
      ) : (
        <div className="liked-list">
          {tracks.map(track => (
            <Link
              key={track.id}
              href={`/display?id=${track.id}`}
              className="liked-track"
            >
              <h2>{track.title}</h2>
              <p>{track.artist}</p>
              <span>Album: {track.album}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}