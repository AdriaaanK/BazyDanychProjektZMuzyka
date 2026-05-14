'use client'

import Link from 'next/link'

import { getTrackArray, setupSongGallery } from '@/app/actions/song_modify'
import { useEffect, useState } from 'react'

export default function Home() {
  const [songArray, setSongs] = useState(null)
  const [curPage, setPage] = useState(0)
  const [maxPage, setMax] = useState(1)
  const [loading, setLoading] = useState(true)

  const perPage = 5; let dataArray
  useEffect(() => {
    async function fetchArray() {
      try {
        dataArray = await getTrackArray()
        setMax(Math.floor(dataArray.length / perPage))
        
      } catch (err) {
        console.error(err)
      } finally {
        return dataArray
      }
    }
    async function fetchSongs() {
      try {
        if(!dataArray) await fetchArray()
        let songs = await setupSongGallery(dataArray.slice(curPage * perPage, curPage * perPage + perPage))

        setSongs(songs)
        console.log(curPage, maxPage)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSongs()
  }, [curPage])  
  return (
  <>
    <main>
      <p>
        <button onClick={() => {if(!loading && curPage != 0) {setPage((curPage) => curPage - 1); setLoading(true)}}}>poprzednia strona</button>
        {String(curPage + 1)}
        <button onClick={() => {if(!loading && curPage != maxPage) {setPage((curPage) => curPage + 1); setLoading(true)}}}>nastepna strona</button>
      </p>

      {loading && <div>wczytywanie piosenek</div>}
      {!loading && songArray.map(song => (
          <Link key={song.id} href={"./display?id=" + song.id}>
            <h2>{song.title}</h2>
            <p>{song.artist}</p>
          </Link>
      ))}
    </main>
  </>
  )
}
