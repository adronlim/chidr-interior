import { useState } from 'react'
import { useProjects } from '../context/ProjectsContext'

const empty = { name: '', email: '', message: '' }

function InfoRow({ label, value, href }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40 dark:text-cream/40">
        {label}
      </dt>
      <dd className="mt-2 font-display text-lg text-charcoal/85 dark:text-cream/85">
        {href ? (
          <a href={href} className="transition-colors hover:text-gold dark:hover:text-gold-light">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}

export default function ContactForm() {
  const { settings } = useProjects()
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO (Phase 2): POST to a real enquiry endpoint.
    console.log('contact submission', form)
    setSent(true)
    setForm(empty)
  }

  const inputClass =
    'mt-2 w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-2.5 text-charcoal outline-none transition-colors focus:border-gold dark:border-cream/25 dark:text-cream dark:focus:border-gold-light'

  return (
    <section id="contact">
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-16 px-6 py-24 md:grid-cols-2 md:px-10 md:py-36">
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-gold dark:text-gold-light md:text-xs">
            07 — Get in touch
          </p>
          <h2 className="font-display font-medium leading-[1.02] tracking-tight text-charcoal dark:text-cream text-4xl md:text-6xl">
            Let&rsquo;s design your space.
          </h2>
          <p className="mt-6 max-w-md text-charcoal/70 dark:text-cream/70">
            Tell us a little about your project and we&rsquo;ll be in touch to
            arrange a consultation.
          </p>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            <InfoRow label="Phone" value={settings.phone} href={`tel:${settings.phone.replace(/\s/g, '')}`} />
            <InfoRow label="Email" value={settings.email} href={`mailto:${settings.email}`} />
            <InfoRow label="Studio" value={settings.address} />
            <InfoRow label="Hours" value={settings.hours} />
          </dl>
        </div>

        <div className="md:pl-6 lg:pl-12">
          {sent && (
            <p className="mb-6 border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-charcoal dark:border-gold-light/30 dark:text-cream">
              Thanks — we&rsquo;ve received your message and will reply soon.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-charcoal/50 dark:text-cream/50">
                Name
              </label>
              <input id="name" name="name" value={form.name} onChange={update} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-charcoal/50 dark:text-cream/50">
                Email
              </label>
              <input id="email" name="email" type="email" value={form.email} onChange={update} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-charcoal/50 dark:text-cream/50">
                Message
              </label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={update} required className={inputClass} />
            </div>
            <button
              type="submit"
              className="rounded-sm bg-gold px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
            >
              Send enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
