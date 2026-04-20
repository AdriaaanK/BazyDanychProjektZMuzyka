import Link from 'next/link'
import { client } from "@/lib/db"

import { getSongData } from '@/app/actions/song_modify'


export default async function Home() {
  return (
  <>
      <style>

      </style>
      <header>

      <img width="200px" height="200px" src={"/img/logo.png"} id="logo"/>
      <h1>KoncertDanych</h1>
      <nav>
          <Link href="./create" className="a-menu">Polubione utwory</Link>
          <a className="a-menu">Playlisty</a>
          <a className="a-menu">Katalog</a>
          <a className="a-menu">Twoje konto<img src={"/img/profilowe-domyslne.png"} id="profilowe-domyslne"/></a>
      </nav>

      </header>
    <main>

    </main>
    <footer>
        <p>Projekt wykonany przez: <strong>Lidia Boruch, Adrian Krzoski, Mateusz Stolarski, Kacper Szuliński</strong>
        </p>
    </footer>
  </>
  )
}
