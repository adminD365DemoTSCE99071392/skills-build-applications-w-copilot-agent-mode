import { useEffect, useState } from 'react'

interface User {
  _id?: string
  name: string
  email: string
}

interface UsersProps {
  apiBaseUrl: string
}

function normalizeResponse<T>(data: T | { data: T } | { items: T }) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'data' in data) return (data as any).data
  if (data && typeof data === 'object' && 'items' in data) return (data as any).items
  return data
}

export default function Users({ apiBaseUrl }: UsersProps) {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${apiBaseUrl}/users/`)
        const data = await response.json()
        setUsers(normalizeResponse<User[]>(data) ?? [])
      } catch (error) {
        setError('Unable to load users.')
      }
    }

    loadUsers()
  }, [apiBaseUrl])

  return (
    <section className="page-panel">
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <p>
        API: <code>{apiBaseUrl}/users/</code>
      </p>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id ?? user.email}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
