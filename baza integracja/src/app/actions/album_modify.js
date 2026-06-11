'use server'

import { client } from '@/lib/db'

export async function getAlbums() {
  const keys = await client.keys('album:*')
  const albums = []

  for (const key of keys) {
    const parts = key.split(':')

    if (parts.length !== 2) continue
    if (key === 'album:id') continue

    const type = await client.type(key)
    if (type !== 'hash') continue

    const album = await client.hGetAll(key)

    albums.push({
      id: parts[1],
      name: album.name,
      artist: album.artist,
      release_date: album.release_date,
      tracks_count: album.tracks_count,
      likes_count: album.likes_count
    })
  }

  return albums.sort((a, b) => a.name.localeCompare(b.name))
}

export async function createAlbum(name, artistName, releaseDate) {
  if (!name) {
    return null
  }

  const id = await client.incr('album:id')

  await client.hSet(`album:${id}`, {
    name,
    artist: artistName || '',
    release_date: releaseDate || '',
    tracks_count: 0,
    likes_count: 0
  })

  await client.sAdd(`album:${id}:tracks`, '')
  await client.sRem(`album:${id}:tracks`, '')

  return id
}
export async function getAlbumData(albumId) {
  const album = await client.hGetAll(`album:${albumId}`)

  if (!album || !album.name) {
    return null
  }

  const trackIds = await client.sMembers(`album:${albumId}:tracks`)
  const tracks = []

  for (const id of trackIds) {
    const track = await client.hGetAll(`track:${id}`)

    if (track && track.title) {
      tracks.push({
        id,
        title: track.title,
        duration: track.duration,
        likes_count: track.likes_count
      })
    }
  }



  return {
    id: albumId,
    ...album,
    tracks
  }
}