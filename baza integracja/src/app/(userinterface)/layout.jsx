import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { getCurrentUser, logoutUser } from '@/app/actions/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Koncert Danych',
  description: '',
}

export default async function RootLayout({ children }) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Koncert Danych</title>
      </head>

      <body className={inter.className}>
        <header>
          <img width="200px" height="200px" src={"/img/logo.png"} id="logo" />

          <Link href="/">
            <h1>KoncertDanych</h1>
          </Link>

          <nav>
            
            {user?.role === 'admin' && (
              <Link href="/admin" className="a-menu-left">
                Panel Admina
              </Link>
            )}
            {user ? (
              <>
                <Link href="/" className="a-menu">Katalog</Link>
                <Link href="/liked" className="a-menu">Polubione utwory</Link>
                <Link href="/playlists" className="a-menu">Playlisty</Link>
                <Link href="/profile" className="a-menu">
                  {user.username}
                  <img
                    src={"/img/profilowe-domyslne.png"}
                    id="profilowe-domyslne"
                  />
                </Link>

                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="a-menu-button"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Wyloguj
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="a-menu">Logowanie</Link>
                <Link href="/register" className="a-menu">Rejestracja</Link>
              </>
            )}
          </nav>
        </header>

        {children}

        <footer>
          <p>
            Projekt wykonany przez:{' '}
            <strong>
              Lidia Boruch, Adrian Krzoski, Mateusz Stolarski, Kacper Szuliński
            </strong>
          </p>
        </footer>
      </body>
    </html>
  )
}