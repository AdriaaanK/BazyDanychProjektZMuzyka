import './globals.css'
import { getCurrentUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { logoutUser } from '@/app/actions/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Koncert Danych',
  description: '',
}

export default async function RootLayout({ children }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'admin') {
    redirect('/')
  }
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
          <Link href="/admin"><h1>Panel Administratora</h1></Link>
          <nav>
            <Link href="/" className="a-menu-left">Wróć</Link>
          </nav>
          <nav>
            <Link href="/admin/songs" className="a-menu">Utwory</Link>
            <Link href="/admin/add" className="a-menu">Dodaj</Link>
            <Link href="/admin/users" className="a-menu">Użytkownicy</Link>
            <Link href="/profile" className="a-menu">{user.username}<img src={"/img/profilowe-domyslne.png"} id="profilowe-domyslne"/>
            </Link>

            <form action={logoutUser}>
              <button
                type="submit"
                className="a-menu"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Wyloguj
              </button>
            </form>
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
