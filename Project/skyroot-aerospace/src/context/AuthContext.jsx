import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'skyroot_users'
const SESSION_KEY = 'skyroot_session'

function readUsers() {
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function writeUsers(users) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Demo-grade auth for a college project: credentials live in localStorage,
// not a real backend. Good enough to gate routes and greet a signed-in user.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(SESSION_KEY))
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else window.localStorage.removeItem(SESSION_KEY)
  }, [user])

  function signup({ name, email, password }) {
    const users = readUsers()
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = { name, email, password }
    writeUsers([...users, newUser])
    setUser({ name, email })
    return { ok: true }
  }

  function login({ email, password }) {
    const users = readUsers()
    const match = users.find((u) => u.email === email && u.password === password)
    if (!match) return { ok: false, error: 'Incorrect email or password.' }
    setUser({ name: match.name, email: match.email })
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
