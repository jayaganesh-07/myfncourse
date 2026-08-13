import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = signup(form)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="bg-space relative flex min-h-[calc(100vh-1px)] items-center justify-center px-5 py-16">
      <div className="starfield" />
      <div className="relative w-full max-w-md rounded-2xl border border-[color:var(--line)] bg-[color:var(--panel)]/90 p-8 backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--muted)]">New crew registration</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-[color:var(--muted)]">Join to review missions and track your favorite rocket.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-mono text-[color:var(--muted)]" htmlFor="name">Full name</label>
            <div className="flex items-center gap-2 rounded-lg border border-[color:var(--line)] bg-black/30 px-3 py-2.5">
              <FiUser className="text-[color:var(--muted)]" />
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Prajan Kumar"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[color:var(--muted)]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-mono text-[color:var(--muted)]" htmlFor="email">Email</label>
            <div className="flex items-center gap-2 rounded-lg border border-[color:var(--line)] bg-black/30 px-3 py-2.5">
              <FiMail className="text-[color:var(--muted)]" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[color:var(--muted)]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-mono text-[color:var(--muted)]" htmlFor="password">Password</label>
            <div className="flex items-center gap-2 rounded-lg border border-[color:var(--line)] bg-black/30 px-3 py-2.5">
              <FiLock className="text-[color:var(--muted)]" />
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={4}
                value={form.password}
                onChange={handleChange}
                placeholder="At least 4 characters"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[color:var(--muted)]"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="btn-launch w-full rounded-full bg-gradient-to-r from-[color:var(--blue)] to-[color:var(--purple)] py-2.5 text-sm font-semibold text-white"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[color:var(--muted)]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[color:var(--blue)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
