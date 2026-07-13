import { NavLink, Routes, Route } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.tsx'
import Leaderboard from './components/Leaderboard.tsx'
import Teams from './components/Teams.tsx'
import Users from './components/Users.tsx'
import Workouts from './components/Workouts.tsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiBaseUrl = `${apiHost}/api`

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>OctoFit Tracker</h1>
        <p className="app-subtitle">
          Frontend uses <code>import.meta.env.VITE_CODESPACE_NAME</code> for Codespaces
          URLs.
        </p>
        <p className="app-note">
          API base URL: <code>{apiBaseUrl}</code>
        </p>
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <section className="home-panel">
                <h2>Multi-tier OctoFit Frontend</h2>
                <p>
                  This React app uses <code>react-router-dom</code> for navigation and
                  Vite environment variables for Codespaces-aware API URLs.
                </p>
                <p>
                  Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>{' '}
                  when running in GitHub Codespaces.
                </p>
                <p>
                  When unset, the app safely falls back to{' '}
                  <code>http://localhost:8000</code>.
                </p>
              </section>
            }
          />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route
            path="*"
            element={
              <section className="home-panel">
                <h2>Page not found</h2>
                <p>Choose a page from the navigation above.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
