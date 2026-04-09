import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useAuth } from '../hooks/useAuth'

function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/dashboard', { replace: true })
    } catch {
      setError('Unable to create account. Use a valid email and 6+ character password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800">
          Signup
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
          <input
            type="password"
            placeholder="Password"
            minLength={6}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {submitting ? 'Creating account...' : 'Signup'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-slate-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
