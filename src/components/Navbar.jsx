import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-cream/80 backdrop-blur-md dark:border-cream/10 dark:bg-charcoal/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-2xl font-semibold leading-none tracking-tight text-charcoal dark:text-cream"
        >
          CH <span className="text-gold dark:text-gold-light">iDesign</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-charcoal/70 transition-colors hover:text-gold dark:text-cream/70 dark:hover:text-gold-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-md text-charcoal/70 transition-colors hover:bg-charcoal/5 hover:text-gold dark:text-cream/70 dark:hover:bg-cream/10 dark:hover:text-gold-light"
          >
            {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream sm:inline-block"
          >
            Get a quote
          </a>

          <Link
            to="/admin"
            className="hidden text-sm text-charcoal/50 transition-colors hover:text-gold dark:text-cream/50 dark:hover:text-gold-light sm:inline-block"
          >
            Admin
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md text-charcoal dark:text-cream md:hidden"
          >
            <span className="text-xl leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-charcoal/10 bg-cream px-6 py-4 dark:border-cream/10 dark:bg-charcoal md:hidden">
          <ul className="space-y-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-charcoal/80 dark:text-cream/80"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="block text-charcoal/50 dark:text-cream/50"
              >
                Admin
              </Link>
            </li>
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-md bg-gold px-4 py-2 font-medium text-white dark:bg-gold-light dark:text-charcoal"
              >
                Get a quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
