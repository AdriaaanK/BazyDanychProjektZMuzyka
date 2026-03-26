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
  const songData = await client.hGetAll(`track:${songId}`)
  return songData
}