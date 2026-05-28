'use client'

import Link from 'next/link'

import { getTrackArray, setupSongGallery, deleteSong } from '@/app/actions/song_modify'
import { useEffect, useState } from 'react'

export default function del() {
  const [songArray, setSongs] = useState(null)
  const [curPage, setPage] = useState(0)
  const [maxPage, setMax] = useState(1)
  const [loading, setLoading] = useState(true)
  const [updateTrigger, startUpdate] = useState(false)

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
  }, [curPage, updateTrigger])  
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
          
            <div key={song.id} className="song-title-div">
              <h2 className="song-title">{song.title}</h2> <button onClick={() => {deleteSong(song.id); startUpdate(!updateTrigger); setLoading(true)}}>Del</button>
            </div>
          
      ))}
    </main>
  </>
  )
}
