import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase/config'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({ user, loading }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
