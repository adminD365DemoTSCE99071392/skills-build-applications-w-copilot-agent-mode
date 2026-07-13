import { useEffect, useState } from 'react'

interface Team {
  _id?: string
  name: string
  members?: { name?: string }[]
}

interface TeamsProps {
  apiBaseUrl: string
}

function normalizeResponse<T>(data: T | { data: T } | { items: T }) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'data' in data) return (data as any).data
  if (data && typeof data === 'object' && 'items' in data) return (data as any).items
  return data
}

export default function Teams({ apiBaseUrl }: TeamsProps) {
  const [teams, setTeams] = useState<Team[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${apiBaseUrl}/teams/`)
        const data = await response.json()
        setTeams(normalizeResponse<Team[]>(data) ?? [])
      } catch (error) {
        setError('Unable to load teams.')
      }
    }

    loadTeams()
  }, [apiBaseUrl])

  return (
    <section className="page-panel">
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <p>
        API: <code>{apiBaseUrl}/teams/</code>
      </p>
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team._id ?? team.name}>
              <strong>{team.name}</strong>
              {team.members?.length ? (
                <span> — {team.members.map((member) => member.name ?? 'member').join(', ')}</span>
              ) : (
                <span> — no members</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
