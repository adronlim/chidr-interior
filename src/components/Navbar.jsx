import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Work', end: true },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-[0.2em] text-neutral-900">
          CHIDR
        </Link>
        <ul className="flex items-center gap-8 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `transition-colors hover:text-neutral-900 ${
                    isActive ? 'text-neutral-900' : 'text-neutral-500'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
