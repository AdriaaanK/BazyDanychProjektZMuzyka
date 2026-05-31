import { getAllUsers } from '@/app/actions/auth'

export default async function AdminUsersPage() {
  const users = await getAllUsers()

  return (
    <main className="admin-users-page">
      <h1>Użytkownicy</h1>

      <section className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Rola</th>
              <th>Playlisty</th>
              <th>Data rejestracji</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={user.role === 'admin' ? 'role-admin' : 'role-user'}>
                    {user.role}
                  </span>
                </td>
                <td>{user.playlists_count}</td>
                <td>{new Date(user.registered_at).toLocaleString('pl-PL')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="empty-users">Brak użytkowników.</p>
        )}
      </section>
    </main>
  )
}