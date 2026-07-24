import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiSatellite, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import AuroraBackground from '../components/AuroraBackground'

export default function Signup() {
  const { signup } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (form.name.trim().length < 2) errs.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.'
    if (form.confirm !== form.password) errs.confirm = 'Passwords do not match.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const result = signup(form)
    if (result.success) {
      showToast('Account created — welcome to TechPulse!', 'success')
      navigate('/')
    } else {
      setErrors({ form: result.message })
    }
  }

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden py-16">
      <AuroraBackground />
      <div className="section relative z-10 flex w-full max-w-md flex-col items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora to-nebula text-space-950">
          <FiSatellite size={22} />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-mist">Create your account</h1>
        <p className="mt-1 text-sm text-mist-muted">Sign up to save stories and post reviews.</p>

        <form onSubmit={handleSubmit} className="glass-card mt-8 w-full p-6">
          {errors.form && <p className="mb-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{errors.form}</p>}

          <label className="block text-sm font-medium text-mist">Full name</label>
          <div className="relative mt-1.5">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-muted" size={16} />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Aditi Rao"
              className="w-full rounded-xl border border-white/10 bg-space-900/60 py-2.5 pl-10 pr-4 text-sm text-mist placeholder:text-mist-muted focus:border-aurora focus:outline-none"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}

          <label className="mt-4 block text-sm font-medium text-mist">Email</label>
          <div className="relative mt-1.5">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-muted" size={16} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-space-900/60 py-2.5 pl-10 pr-4 text-sm text-mist placeholder:text-mist-muted focus:border-aurora focus:outline-none"
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}

          <label className="mt-4 block text-sm font-medium text-mist">Password</label>
          <div className="relative mt-1.5">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-muted" size={16} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="At least 6 characters"
              className="w-full rounded-xl border border-white/10 bg-space-900/60 py-2.5 pl-10 pr-10 text-sm text-mist placeholder:text-mist-muted focus:border-aurora focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-mist-muted hover:text-mist"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}

          <label className="mt-4 block text-sm font-medium text-mist">Confirm password</label>
          <div className="relative mt-1.5">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-muted" size={16} />
            <input
              type={showConfirm ? 'text' : 'password'}
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-white/10 bg-space-900/60 py-2.5 pl-10 pr-10 text-sm text-mist placeholder:text-mist-muted focus:border-aurora focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-mist-muted hover:text-mist"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          {errors.confirm && <p className="mt-1 text-xs text-red-400">{errors.confirm}</p>}

          <button type="submit" className="btn-primary mt-6 w-full">
            Create Account <FiArrowRight size={15} />
          </button>

          <p className="mt-5 text-center text-sm text-mist-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-aurora hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
