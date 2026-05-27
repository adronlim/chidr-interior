import { useState } from 'react'

const empty = { title: '', category: 'Residential', location: '', year: '', description: '' }

export default function UploadProject() {
  const [form, setForm] = useState(empty)

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: POST to a real API and persist uploaded images.
    console.log('new project', form)
    setForm(empty)
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-light">Upload project</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm text-neutral-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={update}
            required
            className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm text-neutral-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={update}
            className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
          >
            <option>Residential</option>
            <option>Commercial</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm text-neutral-700">
              Location
            </label>
            <input
              id="location"
              name="location"
              value={form.location}
              onChange={update}
              className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm text-neutral-700">
              Year
            </label>
            <input
              id="year"
              name="year"
              type="number"
              value={form.year}
              onChange={update}
              className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
            />
          </div>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm text-neutral-700">
            Images
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            className="mt-1 w-full text-sm text-neutral-600"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm text-neutral-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={update}
            className="mt-1 w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-900"
          />
        </div>

        <button
          type="submit"
          className="bg-neutral-900 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
        >
          Save project
        </button>
      </form>
    </div>
  )
}
