import { useEffect, useState } from 'react'

interface Workout {
  _id?: string
  title: string
  description: string
  duration: number
  difficulty: string
}

interface WorkoutsProps {
  apiBaseUrl: string
}

function normalizeResponse<T>(data: T | { data: T } | { items: T }) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object' && 'data' in data) return (data as any).data
  if (data && typeof data === 'object' && 'items' in data) return (data as any).items
  return data
}

export default function Workouts({ apiBaseUrl }: WorkoutsProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        const data = await response.json()
        setWorkouts(normalizeResponse<Workout[]>(data) ?? [])
      } catch (error) {
        setError('Unable to load workouts.')
      }
    }

    loadWorkouts()
  }, [apiBaseUrl])

  return (
    <section className="page-panel">
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <p>
        API: <code>{apiBaseUrl}/workouts/</code>
      </p>
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id ?? workout.title}>
              <strong>{workout.title}</strong> — {workout.duration} min, {workout.difficulty}
              <p>{workout.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
