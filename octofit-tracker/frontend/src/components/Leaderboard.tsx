import { useEffect, useState } from 'react'

interface LeaderboardEntry {
  _id?: string
  entityType: 'user' | 'team'
  entityName: string
  score: number
  rank: number
}

interface LeaderboardProps {
  apiBaseUrl: string
}

function normalizeResponse<T>(data: T | { data: T } | { items: T }) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'data' in data) return (data as any).data
  if (data && typeof data === 'object' && 'items' in data) return (data as any).items
  return data
}

export default function Leaderboard({ apiBaseUrl }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${apiBaseUrl}/leaderboard/`)
        const data = await response.json()
        setEntries(normalizeResponse<LeaderboardEntry[]>(data) ?? [])
      } catch (error) {
        setError('Unable to load leaderboard.')
      }
    }

    loadLeaderboard()
  }, [apiBaseUrl])

  return (
    <section className="page-panel">
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <p>
        API: <code>{apiBaseUrl}/leaderboard/</code>
      </p>
      {entries.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <ol>
          {entries
            .sort((a, b) => a.rank - b.rank)
            .map((entry) => (
              <li key={entry._id ?? `${entry.entityName}-${entry.rank}`}>
                <strong>{entry.entityName}</strong> ({entry.entityType}) — {entry.score} pts
              </li>
            ))}
        </ol>
      )}
    </section>
  )
}
