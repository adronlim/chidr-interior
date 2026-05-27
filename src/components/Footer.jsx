import { Link } from 'react-router-dom'
import { useProjects } from '../context/ProjectsContext'
import { services } from '../data/settings'

const nav = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const { settings } = useProjects()

  return (
    <footer className="border-t border-charcoal/10 bg-cream dark:border-cream/10 dark:bg-charcoal">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold text-charcoal dark:text-cream">
              CH <span className="text-gold dark:text-gold-light">iDesign</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-charcoal/60 dark:text-cream/60">
              {settings.tagline}.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-charcoal/40 dark:text-cream/40">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-charcoal/70 transition-colors hover:text-gold dark:text-cream/70 dark:hover:text-gold-light"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-charcoal/40 dark:text-cream/40">
              Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70 dark:text-cream/70">
              {services.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-charcoal/40 dark:text-cream/40">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal/70 dark:text-cream/70">
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-gold dark:hover:text-gold-light">
                  {settings.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-gold dark:hover:text-gold-light">
                  {settings.email}
                </a>
              </li>
              <li>{settings.address}</li>
              <li>{settings.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-charcoal/10 pt-6 text-xs text-charcoal/50 dark:border-cream/10 dark:text-cream/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <Link to="/admin" className="hover:text-gold dark:hover:text-gold-light">
            Admin login
          </Link>
        </div>
      </div>
    </footer>
  )
}
