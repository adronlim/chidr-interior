import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'
import { useTheme } from '../../context/ThemeContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/upload', label: 'Upload' },
  { to: '/admin/settings', label: 'Settings' },
]

export default function AdminLayout() {
  const { logout } = useProjects()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-cream text-charcoal dark:bg-charcoal dark:text-cream">
      {/* React 19 hoists these to <head>; keep the admin area out of search results */}
      <title>Admin · CH iDesign</title>
      <meta name="robots" content="noindex, nofollow" />
      <aside className="flex w-60 flex-col border-r border-charcoal/10 bg-white/50 p-6 dark:border-cream/10 dark:bg-charcoal-soft/40">
        <p className="font-display text-2xl font-semibold">
          CH <span className="text-gold dark:text-gold-light">iDesign</span>
        </p>
        <p className="mb-8 text-xs uppercase tracking-[0.25em] text-charcoal/40 dark:text-cream/40">
          Admin
        </p>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-gold text-white dark:bg-gold-light dark:text-charcoal'
                    : 'text-charcoal/70 hover:bg-charcoal/5 dark:text-cream/70 dark:hover:bg-cream/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-1 pt-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="block w-full rounded-md px-3 py-2 text-left text-sm text-charcoal/70 transition-colors hover:bg-charcoal/5 dark:text-cream/70 dark:hover:bg-cream/10"
          >
            {theme === 'dark' ? '☀ Light mode' : '☾ Dark mode'}
          </button>
          <NavLink
            to="/"
            className="block rounded-md px-3 py-2 text-sm text-charcoal/70 transition-colors hover:bg-charcoal/5 dark:text-cream/70 dark:hover:bg-cream/10"
          >
            View site
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="block w-full rounded-md px-3 py-2 text-left text-sm text-charcoal/70 transition-colors hover:bg-charcoal/5 dark:text-cream/70 dark:hover:bg-cream/10"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  )
}
