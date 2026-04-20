'use client'

import Link from 'next/link'
import { createSong } from '@/app/actions/song_modify'
import { useState } from "react"

export default function Create() {
  const [error, setError] = useState('')
  const [songData, setData] = useState('')

  async function handleData(id){
    let data = await getSongData(id)
    console.log(data)
    setData(data)
  }

  async function handleSubmit(formData) {
    /* for (const value of formData.values()) {
      console.log(value);
    } */
    const result = await createSong(formData, formData.get("image"))

    if (result?.error) {
      setError(result.error)
    }
  }
  return (
    <>
    <header>
      <nav>
          <Link href="./create" className="a-menu">Polubione utwory</Link>
          <a className="a-menu">Playlisty</a>
          <a className="a-menu">Katalog</a>
          <a className="a-menu">Twoje konto<img src={"/img/profilowe-domyslne.png"} id="profilowe-domyslne"/></a>
      </nav>
    </header>
    <main>
      <button className="btn">Import Songs</button>
      <form action={handleSubmit}>
        <h2>songie song</h2>
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="artist" placeholder="artist" />
        <input type="text" name="album" placeholder="album" />
        <input type="text" name="genre" placeholder="genre" />
        <input type="number" name="duration" min={1} placeholder="duration" />
        <input type="text" name="release_date" placeholder="release_date" />
        <input type="number" name="likes_count" min={1} placeholder="likes_count" />
        <input type="file" name="image" placeholder="image" />
        <button type="submit" className="btn">Add Song</button>
        {
          songData && <p>{songData.title}<br/>{songData.artist}<br/>
          {songData.album}<br/>{songData.genre}<br/>
          {songData.duration}<br/>{songData.release_date}
          {songData.likes_count}<br/>{songData.image}</p>
        }
        {error && <div className="error">{error}</div>}
      </form>
    </main>
    <footer>
        <p>Projekt wykonany przez: <strong>Lidia Boruch, Adrian Krzoski, Mateusz Stolarski, Kacper Szuliński</strong>
        </p>
    </footer>
    </>
  )
}