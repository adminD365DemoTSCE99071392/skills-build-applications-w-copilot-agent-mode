import { useEffect, useState } from 'react'

interface Activity {
  _id?: string
  type: string
  duration: number
  distance?: number
  user?: { name?: string }
}

interface ActivitiesProps {
  apiBaseUrl: string
}

function normalizeResponse<T>(data: T | { data: T } | { items: T }) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'data' in data) return (data as any).data
  if (data && typeof data === 'object' && 'items' in data) return (data as any).items
  return data
}

export default function Activities({ apiBaseUrl }: ActivitiesProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/activities/`)
        const data = await response.json()
        setActivities(normalizeResponse<Activity[]>(data) ?? [])
      } catch (error) {
        setError('Unable to load activities.')
      }
    }

    loadActivities()
  }, [apiBaseUrl])

  return (
    <section className="page-panel">
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <p>
        API: <code>{apiBaseUrl}/activities/</code>
      </p>
      {activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={activity._id ?? index}>
              <strong>{activity.type}</strong> — {activity.duration} min
              {activity.distance ? ` — ${activity.distance} km` : null}
              {activity.user?.name ? ` — ${activity.user.name}` : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
