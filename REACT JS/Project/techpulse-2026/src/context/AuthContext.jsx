import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('techpulse_users', [])
  const [session, setSession] = useLocalStorage('techpulse_session', null)

  const signup = ({ name, email, password }) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) return { success: false, message: 'An account with this email already exists.' }
    const newUser = { id: `u_${Date.now()}`, name, email, password }
    setUsers([...users, newUser])
    setSession({ id: newUser.id, name: newUser.name, email: newUser.email })
    return { success: true }
  }

  const login = ({ email, password, remember }) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) return { success: false, message: 'Invalid email or password.' }
    setSession({ id: user.id, name: user.name, email: user.email, remember: !!remember })
    return { success: true }
  }

  const logout = () => setSession(null)

  const resetPassword = (email) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
    return exists
  }

  const value = useMemo(
    () => ({ user: session, isAuthenticated: !!session, signup, login, logout, resetPassword }),
    [session, users]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
