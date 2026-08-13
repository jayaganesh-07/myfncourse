import { useState, useEffect } from 'react'

// Generic hook to sync a piece of state with localStorage.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage unavailable (e.g. private mode) — fail silently
    }
  }, [key, value])

  return [value, setValue]
}
