'use server'

import { revalidatePath } from 'next/cache'
import { getCurrentUser } from '@/app/actions/auth'
import { client } from '@/lib/db'

export async function createPlaylist(formData) {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Musisz być zalogowany, aby utworzyć playlistę.' }
  }

  const name = formData.get('name')?.toString().trim()
  const description = formData.get('description')?.toString().trim() || ''

  if (!name) {
    return { error: 'Nazwa playlisty jest wymagana.' }
  }

  const playlistId = await client.incr('playlist:id')

  await client.hSet(`playlist:${playlistId}`, {
    name,
    description,
    created_by: user.userId,
    created_at: new Date().toISOString(),
    track_count: 0
  })

  await client.sAdd(`playlist:${playlistId}:tracks`, '')
  await client.sRem(`playlist:${playlistId}:tracks`, '')
  await client.sAdd(`user:${user.userId}:playlists`, String(playlistId))

  await client.hIncrBy(`user:${user.userId}`, 'playlists_count', 1)

  revalidatePath('/playlists')

  return { success: true, playlistId }
}

export async function getUserPlaylists() {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  const playlistIds = await client.sMembers(`user:${user.userId}:playlists`)
  const playlists = []

  for (const id of playlistIds) {
    const playlist = await client.hGetAll(`playlist:${id}`)

    if (!playlist || !playlist.name) continue

    playlists.push({
      id,
      name: playlist.name,
      description: playlist.description || '',
      created_at: playlist.created_at,
      track_count: Number(playlist.track_count || 0)
    })
  }

  return playlists.sort((a, b) => a.name.localeCompare(b.name))
}

export async function getPlaylistData(playlistId) {
  const playlist = await client.hGetAll(`playlist:${playlistId}`)

  if (!playlist || !playlist.name) {
    return null
  }

  const trackIds = await client.sMembers(`playlist:${playlistId}:tracks`)
  const tracks = []

  for (const id of trackIds) {
    if (!id) continue

    const track = await client.hGetAll(`track:${id}`)

    if (track && track.title) {
      tracks.push({
        id,
        title: track.title,
        artist: track.artist_id ? await client.hGet(`artist:${track.artist_id}`, 'name') : 'Nieznany artysta',
        duration: track.duration,
        genre: track.genre
      })
    }
  }

  return {
    id: playlistId,
    ...playlist,
    tracks
  }
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const user = await getCurrentUser()

  if (!user) {
    return { error: 'Musisz się zalogować.' }
  }

  const playlist = await client.hGetAll(`playlist:${playlistId}`)

  if (!playlist || playlist.created_by !== user.userId) {
    return { error: 'Nie możesz dodać utworu do tej playlisty.' }
  }

  const exists = await client.sIsMember(`playlist:${playlistId}:tracks`, String(trackId))

  if (exists) {
    return { error: 'Ten utwór jest już na tej playliście.' }
  }

  await client.sAdd(`playlist:${playlistId}:tracks`, String(trackId))
  await client.hIncrBy(`playlist:${playlistId}`, 'track_count', 1)

  revalidatePath('/playlists')

  return { success: true }
}
