'use server'

import { client } from "@/lib/db"
import { redirect } from 'next/navigation'

export async function createSong(formData, imageData) {
  const {title, artist, album, genre, duration, release_date, likes_count, image} = Object.fromEntries(formData)
  console.log("poo")
  console.log(image)
  const id = Math.floor(Math.random() * 100000)
  await client.hSet(`track:${id}`, {
    title,
    artist,
    album,
    genre,
    duration,
    release_date,
    likes_count
  })
  redirect('/') 
}

export async function getSongData(songId) {
  let songData = {
    'title': await client.hGet(`track:${songId}`, 'title'),
    'artist': await client.hGet(`track:${songId}`, 'artist'),
    'album': await client.hGet(`track:${songId}`, 'album'),
    'genre': await client.hGet(`track:${songId}`, 'genre'),
    'duration': await client.hGet(`track:${songId}`, 'duration'),
    'release_date': await client.hGet(`track:${songId}`, 'release_date'),
    'likes_count': await client.hGet(`track:${songId}`, 'likes_count'),
    'image': await client.hGet(`track:${songId}`, 'image')
  }
  return songData
}