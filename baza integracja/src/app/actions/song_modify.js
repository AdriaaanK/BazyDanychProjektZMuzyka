'use server'
import { createArtist } from '@/app/actions/artist_modify'
import { client } from "@/lib/db"
import { redirect } from 'next/navigation'
import { createAlbum } from '@/app/actions/album_modify'

export async function createSong(formData, imageData) {
  const {title,artist_id,new_artist_name,album_id,new_album_name,genre,duration,release_date,likes_count,image} = Object.fromEntries(formData)
  let finalArtistId = artist_id
  let finalAlbumId = album_id

  if (artist_id === 'new') {
    finalArtistId = await createArtist(new_artist_name)
  }
  if (album_id === 'new') {
    const artistName = await client.hGet(`artist:${finalArtistId}`, 'name')
    finalAlbumId = await createAlbum(new_album_name,artistName,release_date)
  }
  console.log("poo")
  console.log(image)
  const id = await client.incr('track:id')
  await client.hSet(`track:${id}`, {
    title,
    artist_id: finalArtistId,
    album_id: finalAlbumId,
    genre,
    duration,
    release_date,
    likes_count
  })
  if (finalAlbumId) {
    await client.sAdd(`album:${finalAlbumId}:tracks`, String(id))
  }
  redirect('/') 
}

export async function getSongData(songId) {
  songId = Number(songId)

  const track = await client.hGetAll(`track:${songId}`)

  let artistName = 'Nieznany artysta'
  let albumName = 'Nieznany album'

  if (track.album_id) {
    albumName =
      await client.hGet(
        `album:${track.album_id}`,
        'name'
      ) || 'Nieznany album'
  }

  if (track.artist_id) {
    artistName =
      await client.hGet(
        `artist:${track.artist_id}`,
        'name'
      ) || 'Nieznany artysta'
  }

  return {
    title: track.title,
    artist: artistName,
    album: albumName,
    album_id: track.album_id,
    genre: track.genre,
    duration: track.duration,
    release_date: track.release_date,
    likes_count: track.likes_count,
    image: track.image
  }
}

export async function getTrackArray() {
  return await client.keys('track:*')
}

export async function setupSongGallery(songkeys) {
  let songArray = []
  for (const key in songkeys) {
    const songData = await getSongData(songkeys[key].split(":")[1])
    songArray.push({
      "id": songkeys[key].split(":")[1],
      "title": songData.title,
      "artist": songData.artist,
      "image": songData.image
    })
  }
  return songArray
}

export async function deleteSong(id){
  await client.del('track:' + id)
}