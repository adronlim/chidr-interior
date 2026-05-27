import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'
import { ADMIN_CREDENTIALS } from '../../data/settings'

export default function Login() {
  const { login } = useProjects()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      navigate(from, { replace: true })
    } else {
      setError('Incorrect email or password.')
    }
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-charcoal outline-none transition-colors focus:border-gold dark:border-cream/20 dark:text-cream dark:focus:border-gold-light'

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      {/* React 19 hoists these to <head>; keep the admin area out of search results */}
      <title>Admin sign in · CH iDesign</title>
      <meta name="robots" content="noindex, nofollow" />
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="block text-center font-display text-3xl font-semibold text-charcoal dark:text-cream"
        >
          CH <span className="text-gold dark:text-gold-light">iDesign</span>
        </Link>
        <p className="mt-2 text-center text-sm text-charcoal/60 dark:text-cream/60">
          Admin sign in
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-charcoal/10 bg-white/50 p-8 dark:border-cream/10 dark:bg-charcoal-soft/40"
        >
          {error && (
            <p className="mb-5 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-charcoal/70 dark:text-cream/70">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className={inputClass}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-sm text-charcoal/70 dark:text-cream/70">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
          >
            Sign in
          </button>

          <p className="mt-5 rounded-md bg-charcoal/5 px-3 py-2 text-center text-xs text-charcoal/60 dark:bg-cream/10 dark:text-cream/60">
            Demo · {ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password}
          </p>
        </form>
      </div>
    </div>
  )
}
