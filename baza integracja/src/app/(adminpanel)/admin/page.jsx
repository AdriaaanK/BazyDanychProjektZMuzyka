import { getAdminStats } from '@/app/actions/auth'

export default async function AdminPage() {
  const stats = await getAdminStats()

  return (
    <main className="admin-dashboard">
      <h1>Dashboard administratora</h1>

      <section className="stats-grid">
        <div className="stat-card">
          <h2>Użytkownicy</h2>
          <p>{stats.usersCount}</p>
        </div>

        <div className="stat-card">
          <h2>Utwory</h2>
          <p>{stats.tracksCount}</p>
        </div>

        <div className="stat-card">
          <h2>Playlisty</h2>
          <p>{stats.playlistsCount}</p>
        </div>

        <div className="stat-card">
          <h2>Aktywne sesje</h2>
          <p>{stats.sessionsCount}</p>
        </div>
      </section>
    </main>
  )
}