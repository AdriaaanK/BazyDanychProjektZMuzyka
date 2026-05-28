import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Koncert Danych',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Koncert Danych</title>
      </head>

      <body className={inter.className}>
        <header>

          <img width="200px" href="/" height="200px" src={"/img/logo.png"} id="logo" />
          <Link href="./"><h1>KoncertDanych</h1></Link>
          <nav>
            <Link href="./create" className="a-menu">Polubione utwory</Link>
            <Link href="./display" className="a-menu">Playlisty</Link>
            <a className="a-menu">Katalog</a>
            <a className="a-menu">Twoje konto<img src={"/img/profilowe-domyslne.png"} id="profilowe-domyslne" /></a>
          </nav>

        </header>

        {children}

        <footer>
          <p>Projekt wykonany przez: <strong>Lidia Boruch, Adrian Krzoski, Mateusz Stolarski, Kacper Szuliński</strong>
          </p>
        </footer>
      </body>
    </html>
  )
}
