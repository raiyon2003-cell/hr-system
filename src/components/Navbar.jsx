import { signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useAuth } from '../hooks/useAuth'

function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/dashboard" className="text-lg font-semibold text-slate-800">
          HR Management
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <Link to="/dashboard" className="hover:text-slate-900">
            Dashboard
          </Link>
          <Link to="/employees" className="hover:text-slate-900">
            Employees
          </Link>
          <span className="hidden text-slate-500 md:block">
            {user?.email || 'User'}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md bg-slate-900 px-3 py-2 text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
