import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '../../context/ProjectsContext'
import { categories } from '../../data/projects'

const catOptions = categories.filter((c) => c.value !== 'all')

export default function ProjectsTable() {
  const { projects, updateProject, deleteProject } = useProjects()
  const [editing, setEditing] = useState(null)

  const inputClass =
    'mt-1 w-full rounded-md border border-charcoal/20 bg-transparent px-3 py-2 text-charcoal outline-none transition-colors focus:border-gold dark:border-cream/20 dark:text-cream dark:focus:border-gold-light'

  const saveEdit = (e) => {
    e.preventDefault()
    const { id, ...patch } = editing
    const catLabel =
      catOptions.find((c) => c.value === patch.cat)?.label || patch.cat
    updateProject(id, { ...patch, catLabel })
    setEditing(null)
  }

  const remove = (p) => {
    if (window.confirm(`Delete “${p.name}”? This cannot be undone.`)) {
      deleteProject(p.id)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-medium">Projects</h1>
          <p className="mt-1 text-sm text-charcoal/60 dark:text-cream/60">
            {projects.length} project{projects.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link
          to="/admin/upload"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
        >
          + New project
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-charcoal/10 bg-white/50 dark:border-cream/10 dark:bg-charcoal-soft/40">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/10 text-charcoal/50 dark:border-cream/10 dark:text-cream/50">
            <tr>
              <th className="px-5 py-3 font-medium">Project</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Area</th>
              <th className="px-5 py-3 font-medium">Year</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr
                key={p.id}
                className="border-b border-charcoal/5 last:border-0 dark:border-cream/5"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.img}
                      alt=""
                      className="h-10 w-10 rounded object-cover"
                    />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-charcoal/70 dark:text-cream/70">{p.catLabel}</td>
                <td className="px-5 py-3 text-charcoal/70 dark:text-cream/70">{p.area}</td>
                <td className="px-5 py-3 text-charcoal/70 dark:text-cream/70">{p.year}</td>
                <td className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() =>
                      updateProject(p.id, {
                        status: p.status === 'published' ? 'draft' : 'published',
                      })
                    }
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                      p.status === 'published'
                        ? 'bg-green-500/15 text-green-700 dark:text-green-300'
                        : 'bg-charcoal/10 text-charcoal/60 dark:bg-cream/10 dark:text-cream/60'
                    }`}
                    title="Click to toggle"
                  >
                    {p.status === 'published' ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setEditing({ ...p })}
                      className="text-gold hover:underline dark:text-gold-light"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(p)}
                      className="text-red-600 hover:underline dark:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-charcoal/50 dark:text-cream/50">
                  No projects yet. <Link to="/admin/upload" className="text-gold hover:underline dark:text-gold-light">Add one</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/70 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setEditing(null)}
        >
          <form
            onSubmit={saveEdit}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl bg-cream p-6 dark:bg-charcoal"
          >
            <h2 className="font-display text-2xl font-medium">Edit project</h2>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-sm text-charcoal/70 dark:text-cream/70">Name</label>
                <input
                  value={editing.name}
                  onChange={(e) => setEditing((s) => ({ ...s, name: e.target.value }))}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-charcoal/70 dark:text-cream/70">Category</label>
                  <select
                    value={editing.cat}
                    onChange={(e) => setEditing((s) => ({ ...s, cat: e.target.value }))}
                    className={inputClass}
                  >
                    {catOptions.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 dark:text-cream/70">Status</label>
                  <select
                    value={editing.status}
                    onChange={(e) => setEditing((s) => ({ ...s, status: e.target.value }))}
                    className={inputClass}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-charcoal/70 dark:text-cream/70">Area</label>
                  <input
                    value={editing.area}
                    onChange={(e) => setEditing((s) => ({ ...s, area: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm text-charcoal/70 dark:text-cream/70">Year</label>
                  <input
                    value={editing.year}
                    onChange={(e) => setEditing((s) => ({ ...s, year: e.target.value }))}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-charcoal/70 dark:text-cream/70">Description</label>
                <textarea
                  rows={3}
                  value={editing.desc}
                  onChange={(e) => setEditing((s) => ({ ...s, desc: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-md border border-charcoal/20 px-4 py-2 text-sm text-charcoal transition-colors hover:bg-charcoal/5 dark:border-cream/20 dark:text-cream dark:hover:bg-cream/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-charcoal dark:bg-gold-light dark:text-charcoal dark:hover:bg-cream"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
