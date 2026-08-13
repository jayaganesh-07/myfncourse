import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import { FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/missions', label: 'Missions' },
  { to: '/rockets', label: 'Rockets' },
  { to: '/news', label: 'News' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[#05070f]/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--flame)] pulse-dot" />
          SKYROOT<span className="gradient-text">.AERO</span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-[color:var(--muted)] hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
                <FiUser /> {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium text-[color:var(--muted)] hover:text-white"
              >
                <FiLogOut /> Sign out
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn-launch rounded-full bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] px-5 py-2 text-sm font-semibold text-white"
            >
              Sign in
            </NavLink>
          )}
        </div>

        <button
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[color:var(--line)] bg-[#05070f] px-5 pb-5 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-white/10 text-white' : 'text-[color:var(--muted)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-3 border-t border-[color:var(--line)] pt-3">
            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-[color:var(--muted)]">
                <FiLogOut /> Sign out ({user.name.split(' ')[0]})
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Sign in
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
