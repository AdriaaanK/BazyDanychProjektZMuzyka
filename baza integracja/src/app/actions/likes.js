'use server'

import { client } from '@/lib/db'
import { getCurrentUser } from '@/app/actions/auth'

export async function toggleLikeTrack(trackId) {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Musisz być zalogowany' }
  }

  const key = `user:${user.userId}:liked_tracks`
  const isLiked = await client.sIsMember(key, String(trackId))

  if (isLiked) {
    await client.sRem(key, String(trackId))
    return { liked: false }
  }

  await client.sAdd(key, String(trackId))
  return { liked: true }
}

export async function isTrackLiked(trackId) {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  return await client.sIsMember(
    `user:${user.userId}:liked_tracks`,
    String(trackId)
  )
}
export async function getLikedTracks() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const likedIds = await client.sMembers(
    `user:${user.userId}:liked_tracks`
  )

  const tracks = []

  for (const id of likedIds) {
    const track = await client.hGetAll(`track:${id}`)

    if (track && track.title) {
      tracks.push({
        id,
        ...track
      })
    }
  }

  return tracks
}