import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiSatellite } from 'react-icons/fi'
import { navLinks } from '../data/navigation'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import { useScrollProgress } from '../hooks/useScrollProgress'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const { showToast } = useToast()
  const { scrolled } = useScrollProgress()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    showToast('You have been logged out.', 'info')
    navigate('/')
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-space-950/85 backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="section flex h-16 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-bold text-mist">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-aurora to-nebula text-space-950">
            <FiSatellite size={18} />
          </span>
          TechPulse<span className="text-gradient">2026</span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-aurora' : 'text-mist-muted hover:text-mist'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist-muted transition-colors hover:border-aurora hover:text-aurora"
          >
            {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm text-mist">
                <FiUser size={14} className="text-aurora" />
                {user.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm">
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="btn-outline !px-4 !py-2 text-sm">
                Login
              </NavLink>
              <NavLink to="/signup" className="btn-primary !px-4 !py-2 text-sm">
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-space-950/95 backdrop-blur-xl md:hidden">
          <div className="section flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-white/10 text-aurora' : 'text-mist-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-white/10 pt-4">
              <button onClick={toggle} className="btn-outline !px-4 !py-2 text-sm flex-1">
                {dark ? <FiSun size={14} /> : <FiMoon size={14} />} Theme
              </button>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="btn-outline !px-4 !py-2 text-sm flex-1">
                  <FiLogOut size={14} /> Logout
                </button>
              ) : (
                <NavLink to="/login" onClick={() => setOpen(false)} className="btn-primary !px-4 !py-2 text-sm flex-1">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
