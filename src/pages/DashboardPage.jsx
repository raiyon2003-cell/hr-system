import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useAuth } from '../hooks/useAuth'

function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-slate-800">HR Management</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Navigation
          </p>
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="block rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/employees"
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Employees
            </Link>
          </nav>
        </aside>

        <main className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
          <p className="mt-2 text-slate-600">
            This is your dashboard overview.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Signed in as <span className="font-medium text-slate-700">{user?.email}</span>
          </p>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
