import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useLocalStorage('techpulse_dark_mode', true)

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  const toggle = () => setDark((d) => !d)

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
