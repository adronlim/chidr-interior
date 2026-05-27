import { useState } from 'react'
import { useProjects } from '../../context/ProjectsContext'

const fields = [
  { name: 'name', label: 'Company name' },
  { name: 'tagline', label: 'Tagline' },
  { name: 'phone', label: 'Phone' },
  { name: 'email', label: 'Email' },
  { name: 'address', label: 'Address' },
  { name: 'hours', label: 'Business hours' },
]

export default function Settings() {
  const { settings, updateSettings } = useProjects()
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-charcoal outline-none transition-colors focus:border-gold dark:border-cream/20 dark:text-cream dark:focus:border-gold-light'

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-medium">Settings</h1>
      <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">
        Company information shown across the public site.
      </p>

      {saved && (
        <p className="mt-6 rounded-md border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-charcoal dark:border-gold-light/30 dark:text-cream">
          Settings saved.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="block text-sm text-charcoal/70 dark:text-cream/70">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              value={form[f.name]}
              onChange={update}
              className={inputClass}
            />
          </div>
        ))}

        <div>
          <label htmlFor="about" className="block text-sm text-charcoal/70 dark:text-cream/70">
            About text
          </label>
          <textarea
            id="about"
            name="about"
            rows={5}
            value={form.about}
            onChange={update}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
        >
          Save settings
        </button>
      </form>
    </div>
  )
}
