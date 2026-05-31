import { getCurrentUserData } from '@/app/actions/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const user = await getCurrentUserData()

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Profil użytkownika
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl max-w-xl space-y-4">
        <div>
          <strong>ID:</strong> {user.id}
        </div>

        <div>
          <strong>Username:</strong> {user.username}
        </div>

        <div>
          <strong>Email:</strong> {user.email}
        </div>

        <div>
          <strong>Data rejestracji:</strong> {user.registered_at}
        </div>

        <div>
          <strong>Liczba playlist:</strong> {user.playlists_count}
        </div>

        <div>
          <strong>Rola:</strong> {user.role}
        </div>
      </div>
    </main>
  )
}