'use server'

import { client } from '@/lib/db'

export async function getArtists() {
  const keys = await client.keys('artist:*')
  const artists = []

  for (const key of keys) {
    const parts = key.split(':')

    if (parts.length !== 2) continue
    if (key === 'artist:id') continue

    const type = await client.type(key)
    if (type !== 'hash') continue

    const artist = await client.hGetAll(key)

    artists.push({
      id: parts[1],
      name: artist.name,
      listeners_count: artist.listeners_count
    })
  }

  return artists.sort((a, b) => a.name.localeCompare(b.name))
}

export async function createArtist(name) {
  if (!name) {
    return null
  }

  const id = await client.incr('artist:id')

  await client.hSet(`artist:${id}`, {
    name,
    listeners_count: 0
  })

  return id
}