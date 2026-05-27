import { useState } from 'react'

const empty = { name: '', email: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire up to a real endpoint.
    console.log('contact submission', form)
    setSent(true)
    setForm(empty)
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24">
      <h2 className="text-2xl font-light text-neutral-900">Start a project</h2>
      <p className="mt-2 text-neutral-600">
        Tell us a little about your space and we'll be in touch.
      </p>

      {sent && (
        <p className="mt-6 rounded bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
          Thanks — we received your message.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm text-neutral-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={update}
            required
            className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-neutral-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            required
            className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-neutral-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={update}
            required
            className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
          />
        </div>
        <button
          type="submit"
          className="bg-neutral-900 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
        >
          Send message
        </button>
      </form>
    </section>
  )
}
